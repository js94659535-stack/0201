import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'

type Bindings = {
  DB?: D1Database
  GEMINI_API_KEY?: string
  GEMINI_MODEL?: string // optional
  USE_MOCK?: string // "true"|"false"
}

const app = new Hono<{ Bindings: Bindings }>()

// ------------------------------
// Helpers
// ------------------------------
const MEM_CACHE = new Map<string, { data: any; createdAt: number }>()
const MEM_CACHE_TTL_MS = 1000 * 60 * 60 * 24 * 7 // 7 days
let __SCHEMA_READY__ = false

function nowIso() {
  return new Date().toISOString()
}
function safeStr(v: any) {
  return v == null ? '' : String(v)
}
function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

function normalizeMode(v: any): 'brief' | 'standard' | 'detail' {
  const s = safeStr(v).trim().toLowerCase()
  if (!s) return 'standard'
  if (s === 'brief' || s === 'simple' || s === 'short' || s === 'lite') return 'brief'
  if (s === 'detail' || s === 'detailed' || s === 'full') return 'detail'
  return 'standard'
}
function normalizeViewType(v: any): 'narrative' | 'structured' | 'mindmap' | 'selftest' {
  const s = safeStr(v).trim().toLowerCase()
  if (!s) return 'narrative'
  if (s === 'narrative' || s === 'structured' || s === 'mindmap' || s === 'selftest') return s
  if (s === 'mind-map' || s === 'mind_map') return 'mindmap'
  return 'narrative'
}
function normalizeKind(v: any): 'summary' | 'concept' | 'exam' {
  const s = safeStr(v).trim().toLowerCase()
  if (s === 'concept') return 'concept'
  if (s === 'exam') return 'exam'
  return 'summary'
}

// ✅ 개선된 문장 분리: 인용부호/괄호 예외 처리
function splitSentences(text: string) {
  const t = (text || '').replace(/\s+/g, ' ').trim()
  if (!t) return []
  
  // 문장 경계: .,?,! 뒤 공백 또는 "다/요/죠" 뒤 공백
  // 단, "..." 또는 "문장." 같은 경우는 분리하지 않음
  const parts: string[] = []
  let current = ''
  let inQuote = false
  
  for (let i = 0; i < t.length; i++) {
    const char = t[i]
    const next = t[i + 1]
    
    // 인용부호 추적
    if (char === '"' || char === '"' || char === '"') {
      inQuote = !inQuote
    }
    
    current += char
    
    // 문장 종료 조건: 인용부호 밖에서 종결 기호 + 공백
    if (!inQuote && /[\.\?\!]/.test(char) && next === ' ') {
      // "..." 같은 연속 마침표는 무시
      if (!(char === '.' && current.endsWith('...'))) {
        parts.push(current.trim())
        current = ''
        i++ // 공백 건너뛰기
      }
    }
    // 한국어 종결어미 처리
    else if (!inQuote && /[다요죠]/.test(char) && next === ' ') {
      parts.push(current.trim())
      current = ''
      i++
    }
  }
  
  // 마지막 남은 문장
  if (current.trim()) {
    parts.push(current.trim())
  }
  
  return parts.length ? parts : [t]
}

// 로컬 요약: "중간 자르기" 금지. 문장 중요도 기반 추출(압축)
const KO_STOP = new Set([
  '그리고','그러나','하지만','또한','및','또','또는','즉','때문에','따라서','그래서','한편','이것','그것','저것',
  '에서','으로','에게','부터','까지','보다','처럼','같이','의','가','이','은','는','을','를','과','와','도','만',
  '하다','된다','있다','없다','이다','아니다','수','등','및','것','들','좀','매우','정말'
])

// ✅ 의미론적 동의어 사전 (semantic synonyms)
const SEMANTIC_GROUPS = [
  new Set(['안식처', '힐링', '치유', '여유', '안정', '위로', '휴식', '쉼', '평온', '평화']),
  new Set(['생태계', '자연', '환경', '서식지', '숲', '공간', '장소']),
  new Set(['학습', '공부', '교육', '배움', '활동', '체험', '경험']),
  new Set(['기술', '방법', '수단', '방식']),
  new Set(['오감', '감각', '느낌', '감성', '정서', '심리']),  // ✅ 오감 관련 통합
  new Set(['탐색', '탐구', '관찰', '발견']),
  new Set(['성장', '발달', '발전', '향상'])
]

function normalizeSemantics(keywords: Set<string>): Set<string> {
  const normalized = new Set<string>()
  for (const kw of keywords) {
    let found = false
    for (const group of SEMANTIC_GROUPS) {
      if (group.has(kw)) {
        // 그룹의 대표 단어 (첫 번째)를 사용
        normalized.add(Array.from(group)[0])
        found = true
        break
      }
    }
    if (!found) {
      normalized.add(kw)
    }
  }
  return normalized
}

// ✅ 종결어미 정교한 제거 + 현재형 통일
function normalizeEnding(text: string): string {
  let result = text.trim()
  
  // ✅ 핵심 원칙: 현재형 어간 추출, 과거형은 원문 유지
  
  // 1) 명사형 종결: "말하는 것입니다" → "말하는 것"
  if (result.endsWith('것입니다')) {
    return result.slice(0, -3)
  }
  if (result.endsWith('것이다')) {
    return result.slice(0, -2)
  }
  if (result.endsWith('바입니다')) {
    return result.slice(0, -3)
  }
  if (result.endsWith('바이다')) {
    return result.slice(0, -2)
  }
  
  // 2) 진행형: "하고 있습니다" → "하고 있"
  if (result.endsWith('하고 있습니다')) {
    return result.slice(0, -4)
  }
  if (result.endsWith('고 있습니다')) {
    return result.slice(0, -4)
  }
  
  // 3) 과거형은 원문 그대로 유지 (학술성)
  // "정의하였습니다", "발전시켰습니다" → 그대로 반환
  if (result.includes('하였') || result.includes('시켰') || result.includes('았습니다') || result.includes('었습니다')) {
    return result  // ✅ 원문 그대로 유지
  }
  
  // 4) 동사 + 합니다: "경험합니다" → "경험"
  if (result.endsWith('합니다')) {
    return result.slice(0, -3)
  }
  
  // 6) 일반 종결어미
  if (result.endsWith('습니다')) {
    return result.slice(0, -3)
  }
  if (result.endsWith('입니다')) {
    return result.slice(0, -3)
  }
  if (result.endsWith('니다')) {
    return result.slice(0, -2)
  }
  
  // 7) 현재형 동사
  if (result.endsWith('한다')) {
    return result.slice(0, -2)
  }
  if (result.endsWith('는다')) {
    return result.slice(0, -2)
  }
  if (result.endsWith('이다')) {
    return result.slice(0, -2)
  }
  
  // 8) 최후 후보
  if (result.endsWith('다')) {
    return result.slice(0, -1)
  }
  if (result.endsWith('요')) {
    return result.slice(0, -1)
  }
  
  return result
}

function tokenize(text: string) {
  // 한글/영문/숫자 토큰 + 어간 정규화
  return (text || '')
    .toLowerCase()
    .replace(/[^0-9a-z가-힣\s]/g, ' ')
    .split(/\s+/)
    .map((w) => w.trim())
    .map((w) => {
      // 조사/어미 제거로 어간 추출
      return w
        .replace(/에게$/g, '')
        .replace(/에서$/g, '')
        .replace(/으로$/g, '')
        .replace(/를$/g, '')
        .replace(/을$/g, '')
        .replace(/의$/g, '')
        .replace(/하는$/g, '하')
        .replace(/하$/g, '하')
    })
    .filter((w) => w.length >= 2 && !KO_STOP.has(w))
}

function scoreSentences(sents: string[]) {
  const freq = new Map<string, number>()
  for (const s of sents) {
    for (const w of tokenize(s)) {
      freq.set(w, (freq.get(w) || 0) + 1)
    }
  }
  const scored = sents.map((s, idx) => {
    const words = tokenize(s)
    let score = 0
    for (const w of words) score += (freq.get(w) || 0)
    // 너무 짧은 문장/너무 긴 문장 페널티 약간
    const len = s.length
    const lenPenalty = len < 15 ? 0.7 : len > 180 ? 0.85 : 1
    return { idx, s, score: score * lenPenalty }
  })
  return scored
}

function pickTopByScore(sents: string[], count: number) {
  const scored = scoreSentences(sents)
  const picked = scored
    .slice()
    .sort((a, b) => b.score - a.score)
    .slice(0, clamp(count, 1, Math.max(1, sents.length)))
    .sort((a, b) => a.idx - b.idx)
    .map((x) => x.s)
  return picked
}

// ✅ 서술형 요약 V7: 학술 인용 정리 + 주제별 통합
function buildNarrativeSummary(picked: string[], fullText: string, mode: 'brief'|'standard'|'detail'): string {
  // 1. 텍스트 정제 + 학술 인용 분리
  const cleanedSentences: Array<{ 
    original: string; 
    clean: string; 
    keywords: string[]; 
    citations: string[] 
  }> = []
  
  for (const s of picked) {
    // 학술 인용 추출 (예: "(학자명, 연도)" 또는 "(학자명)" )
    const citationPattern = /\(([^)]+,?\s*\d{4})\)/g
    const citations: string[] = []
    let match
    while ((match = citationPattern.exec(s)) !== null) {
      citations.push(match[1])
    }
    
    // 인용 제거 및 정제
    let clean = s
      .replace(/\(([^)]+,?\s*\d{4})\)/g, '') // 인용 제거
      .replace(/^(그리고|또한|따라서|즉|또|한편|이러한|이와같이|결국|그러나|하지만|더불어|아울러)[,\s]*/g, '')
      .replace(/[\.。\?\!]+$/, '')
      .replace(/\(p\.\s*\d+\)/gi, '')
      .replace(/\[[^\]]*\]/g, '')
      .replace(/\s*-\s*\d+\s*-\s*/g, ' ')
      .replace(/것이\s+다/g, '것이다')  // ✅ "것이 다" → "것이다"
      .replace(/바이\s+다/g, '바이다')  // ✅ "바이 다" → "바이다"
      .replace(/직\s+접/g, '직접')  // ✅ "직 접" → "직접"
      .replace(/만나\s+게/g, '만나게')  // ✅ "만나 게" → "만나게"
      .replace(/자유롭\s+게/g, '자유롭게')  // ✅ "자유롭 게" → "자유롭게"
      .replace(/\s{2,}/g, ' ')  // 연속 공백 제거
      .trim()
    
    if (clean.length < 10) continue
    
    const keywords = tokenize(clean).slice(0, 8)
    cleanedSentences.push({ original: s, clean, keywords, citations })
  }

  if (cleanedSentences.length === 0) return '요약할 내용이 부족합니다.'

  // 2. 키워드 빈도 분석
  const globalFreq = new Map<string, number>()
  for (const sent of cleanedSentences) {
    for (const kw of sent.keywords) {
      globalFreq.set(kw, (globalFreq.get(kw) || 0) + 1)
    }
  }

  // 3. 개념 클러스터링
  const clusters: Array<{ 
    keywords: Set<string>; 
    sentences: Array<{ clean: string; citations: string[] }> 
  }> = []
  
  for (const sent of cleanedSentences) {
    const sentKeywordSet = new Set(sent.keywords)
    
    let matched = false
    for (const cluster of clusters) {
      const overlap = sent.keywords.filter((kw) => cluster.keywords.has(kw)).length
      if (overlap >= 2) {
        cluster.sentences.push({ clean: sent.clean, citations: sent.citations })
        sent.keywords.forEach((kw) => cluster.keywords.add(kw))
        matched = true
        break
      }
    }
    
    if (!matched) {
      clusters.push({
        keywords: new Set(sent.keywords),
        sentences: [{ clean: sent.clean, citations: sent.citations }]
      })
    }
  }

  // 4. 원문 순서 복원
  const clusterWithIdx = clusters.map((cluster) => {
    const firstSentence = cluster.sentences[0].clean
    const originalIdx = cleanedSentences.findIndex((cs) => cs.clean === firstSentence)
    return { ...cluster, originalIdx }
  })

  // 5. 모드별 요약 생성
  if (mode === 'brief') {
    const mainCluster = clusterWithIdx.sort((a, b) => b.sentences.length - a.sentences.length)[0]
    const sent = mainCluster.sentences[0]
    // 인용 통합
    const allCitations = mainCluster.sentences.flatMap(s => s.citations).filter(Boolean)
    const citationStr = allCitations.length > 0 ? `(${allCitations.join('; ')})` : ''
    return `${sent.clean}${citationStr}.`
  }

  if (mode === 'standard') {
    const topClusters = clusterWithIdx
      .sort((a, b) => b.sentences.length - a.sentences.length)
      .slice(0, 3)
      .sort((a, b) => a.originalIdx - b.originalIdx)
    
    if (topClusters.length === 1) {
      const sent = topClusters[0].sentences[0]
      const citations = topClusters[0].sentences.flatMap(s => s.citations).filter(Boolean)
      const citationStr = citations.length > 0 ? `(${citations.join('; ')})` : ''
      return `${sent.clean}${citationStr}.`
    }
    
    // 주어 통합 + 인용 정리
    const bySubject = new Map<string, Array<{ 
      original: string;  // ✅ 원문 그대로 저장
      keywords: Set<string>;
      citations: string[]
    }>>()
    
    // ✅ "오감" 반복 추적을 위한 전역 카운터
    const globalKeywordCount = new Map<string, number>()
    const synonyms: Record<string, string[]> = {
      '오감': ['감각', '감각적 경험', '직접 체험'],
      '탐색': ['탐구', '관찰', '발견'],
      '체험': ['경험', '활동', '학습'],
      '자연': ['숲', '환경', '생태계']
    }
    
    for (const cluster of topClusters) {
      for (const sent of cluster.sentences) {
        const match = sent.clean.match(/^(.+?)[은는이가]\s*(.+)$/)
        if (match) {
          let [, subject, rest] = match
          
          // "유아는" → "유아", "현대인에게" → "현대인" 정규화
          subject = subject.replace(/[에게서로부터]$/g, '').trim()
          
          if (!bySubject.has(subject)) {
            bySubject.set(subject, [])
          }
          
          let cleanRest = rest.trim()
          cleanRest = cleanRest.replace(/[\.。\?\!]+$/g, '').trim()
          
          // ✅ "오감" 등 반복 키워드 치환 (중복 제거 전에 수행)
          for (const [keyword, alternatives] of Object.entries(synonyms)) {
            if (cleanRest.includes(keyword)) {
              const count = globalKeywordCount.get(keyword) || 0
              globalKeywordCount.set(keyword, count + 1)
              
              // 2번째 이후 사용 시 동의어로 치환
              if (count >= 1 && alternatives.length > 0) {
                const altIndex = Math.min(count - 1, alternatives.length - 1)
                cleanRest = cleanRest.replace(keyword, alternatives[altIndex])
              }
            }
          }
          
          // ✅ 원문 보존: 종결어미는 완전히 제거하지 않고 임시 저장
          // 이후 재조립 시 사용
          const rawKeywords = new Set(tokenize(cleanRest))
          const keywords = normalizeSemantics(rawKeywords)
          
          // ✅ "오감" 등 반복 키워드는 중복 판단에서 제외
          const excludeFromDup = new Set(['오감', '감각', '감각적', '체험', '경험', '활동', '학습'])
          for (const ex of excludeFromDup) {
            keywords.delete(ex)
          }
          
          bySubject.get(subject)!.push({ 
            original: cleanRest,  // ✅ 키워드 치환된 텍스트 저장
            keywords,
            citations: sent.citations 
          })
        }
      }
    }
    
    // 의미 통합 + 인용 병합
    const merged: Array<{ text: string; citations: string[] }> = []
    for (const [subject, predicates] of bySubject.entries()) {
      const allCitations = predicates.flatMap(p => p.citations).filter(Boolean)
      
      // ✅ 조사 선택: 받침 여부에 따라 "은/는" 결정
      const lastChar = subject.charAt(subject.length - 1)
      const hasJongsung = /[가-힣]/.test(lastChar) && 
        ((lastChar.charCodeAt(0) - 0xAC00) % 28 !== 0)
      const josa = hasJongsung ? '은' : '는'
      
      if (predicates.length === 1) {
        // ✅ 원문 그대로 사용 (단, 긴 문장은 분리)
        const orig = predicates[0].original
        
        // ✅ 긴 문장 자동 분리 (80자 이상 + 쉼표 2개 이상)
        const commaCount = (orig.match(/,/g) || []).length
        
        if (orig.length > 80 && commaCount >= 2) {
          // 쉼표로 분리 (마지막 부분은 연결)
          const parts = orig.split(',').map(p => p.trim()).filter(p => p.length > 0)
          
          if (parts.length >= 2) {
            // 첫 번째 부분
            merged.push({ 
              text: `${subject}${josa} ${parts[0]}입니다`, 
              citations: []
            })
            // 중간 부분들
            for (let i = 1; i < parts.length - 1; i++) {
              merged.push({ 
                text: `이는 ${parts[i]}입니다`, 
                citations: []
              })
            }
            // 마지막 부분 (인용 포함)
            merged.push({ 
              text: `또한 ${parts[parts.length - 1]}`, 
              citations: predicates[0].citations
            })
          } else {
            // 분리 실패하면 원문 그대로
            merged.push({ 
              text: `${subject}${josa} ${orig}`, 
              citations: allCitations 
            })
          }
        } else {
          // 짧은 문장은 그대로
          merged.push({ 
            text: `${subject}${josa} ${orig}`, 
            citations: allCitations 
          })
        }
      } else {
        // 의미 중복 제거
        const unique: Array<{ original: string; keywords: Set<string>; citations: string[] }> = []
        
        for (const pred of predicates) {
          let isDuplicate = false
          for (const u of unique) {
            const overlap = Array.from(pred.keywords).filter(k => u.keywords.has(k)).length
            const totalKeys = Math.max(pred.keywords.size, u.keywords.size)
            // ✅ 임계값 상향: 0.6 → 0.8 (80% 이상 겹쳐야 중복)
            // "오감" 반복을 보존하기 위해 임계값 강화
            // ✅ totalKeys가 0이면 중복 판단 불가 (모두 다른 문장)
            if (totalKeys > 0 && overlap / totalKeys >= 0.8) {
              if (pred.original.length > u.original.length) {
                u.original = pred.original  // ✅ 원문 교체
                u.keywords = pred.keywords
              }
              u.citations.push(...pred.citations)
              isDuplicate = true
              break
            }
          }
          if (!isDuplicate) {
            unique.push({ 
              original: pred.original,  // ✅ 원문 저장
              keywords: pred.keywords,
              citations: [...pred.citations]
            })
          }
        }
        
        if (unique.length === 1) {
          // ✅ 원문 그대로 사용
          merged.push({ 
            text: `${subject}${josa} ${unique[0].original}`, 
            citations: unique.flatMap(u => u.citations)
          })
        } else if (unique.length === 2) {
          // ✅ 2개: 개별 문장으로 분리 (한 문장에 하나의 생각만)
          // 원문을 그대로 유지하여 과거형/현재형 혼용 방지
          merged.push({ 
            text: `${subject}${josa} ${unique[0].original}`, 
            citations: unique[0].citations
          })
          merged.push({ 
            text: `${subject}${josa} ${unique[1].original}`, 
            citations: unique[1].citations
          })
        } else {
          // ✅ 3개 이상: 각각 독립 문장으로 (한 문장에 하나의 생각만)
          for (let i = 0; i < unique.length; i++) {
            merged.push({ 
              text: `${subject}${josa} ${unique[i].original}`,
              citations: unique[i].citations
            })
          }
        }
      }
    }
    
    // ✅ 최종 문장 생성: 단락 구분 (3개 단락 권장)
    if (merged.length === 0) {
      return '요약할 내용이 부족합니다.'
    }
    
    if (merged.length === 1) {
      const citations = merged[0].citations.filter(Boolean)
      const citStr = citations.length > 0 ? `(${citations.join('; ')})` : ''
      return `${merged[0].text}${citStr}.`
    }
    
    if (merged.length === 2) {
      const cit1 = merged[0].citations.filter(Boolean)
      const cit2 = merged[1].citations.filter(Boolean)
      const citStr1 = cit1.length > 0 ? `(${cit1.join('; ')})` : ''
      const citStr2 = cit2.length > 0 ? `(${cit2.join('; ')})` : ''
      // ✅ 2개는 각각 독립 문장으로 (줄바꿈 없음)
      return `${merged[0].text}${citStr1}. ${merged[1].text}${citStr2}.`
    }
    
    // ✅ 3개 이상: 3개 단락으로 구성 (단락1 + 단락2 + 단락3)
    const paragraphs: string[] = []
    
    // 단락 1
    const p1 = merged[0]
    const cit1 = p1.citations.filter(Boolean)
    const citStr1 = cit1.length > 0 ? `(${cit1.join('; ')})` : ''
    paragraphs.push(`${p1.text}${citStr1}.`)
    
    // 단락 2
    if (merged.length >= 2) {
      const p2 = merged[1]
      const cit2 = p2.citations.filter(Boolean)
      const citStr2 = cit2.length > 0 ? `(${cit2.join('; ')})` : ''
      paragraphs.push(`${p2.text}${citStr2}.`)
    }
    
    // 단락 3 (나머지 모두 포함)
    if (merged.length >= 3) {
      const p3Items = merged.slice(2)
      const p3Texts = p3Items.map(item => {
        const cit = item.citations.filter(Boolean)
        const citStr = cit.length > 0 ? `(${cit.join('; ')})` : ''
        return `${item.text}${citStr}.`
      })
      paragraphs.push(p3Texts.join(' '))
    }
    
    // ✅ 단락 구분: \n\n으로 명확히 분리
    return paragraphs.join('\n\n')
  }

  // 상세 모드
  const topClusters = clusterWithIdx
    .sort((a, b) => b.sentences.length - a.sentences.length)
    .slice(0, 5)
    .sort((a, b) => a.originalIdx - b.originalIdx)
  
  return topClusters.map((cluster, i) => {
    const sent = cluster.sentences[0]
    const citations = cluster.sentences.flatMap(s => s.citations).filter(Boolean)
    const citStr = citations.length > 0 ? `(${citations.join('; ')})` : ''
    
    if (i === 0) return `${sent.clean}${citStr}.`
    if (i === topClusters.length - 1) return `마지막으로 ${sent.clean}${citStr}.`
    return `또한 ${sent.clean}${citStr}.`
  }).join(' ')
}

function localSummary(text: string, mode: 'brief'|'standard'|'detail', viewType: 'narrative'|'structured'|'mindmap'|'selftest') {
  const sents = splitSentences(text)
  const targetCount =
    mode === 'brief' ? clamp(Math.round(sents.length * 0.18), 2, 4)
    : mode === 'standard' ? clamp(Math.round(sents.length * 0.28), 4, 8)
    : clamp(Math.round(sents.length * 0.40), 7, 14)

  const picked = pickTopByScore(sents, targetCount)

  if (viewType === 'narrative') {
    // ✅ 진짜 요약: 발췌 금지, 재진술 + 통합 + 압축
    const narrative = buildNarrativeSummary(picked, text, mode)
    return { kind: 'summary', mode, viewType, narrative }
  }
  if (viewType === 'structured') {
    return {
      kind: 'summary',
      mode,
      viewType,
      structured: {
        title: '구조화 요약',
        bullets: picked.map((x, i) => `- (${i + 1}) ${x}`)
      }
    }
  }
  if (viewType === 'mindmap') {
    const center = (picked[0] || sents[0] || '핵심').slice(0, 40)
    const nodes = [{ id: 'c', label: center, level: 0 }]
    const edges: Array<{ from: string; to: string }> = []
    picked.slice(1).forEach((s, i) => {
      const id = `n${i + 1}`
      nodes.push({ id, label: s.slice(0, 60), level: 1 })
      edges.push({ from: 'c', to: id })
    })
    return { kind: 'summary', mode, viewType, mindmap: { center, nodes, edges } }
  }
  // selftest
  const qs = picked.map((s, i) => ({
    id: `q${i + 1}`,
    type: 'short',
    question: `(${i + 1}) 다음 내용을 한 문장으로 설명해보세요: "${s.slice(0, 70)}"`,
    answerHint: s
  }))
  return { kind: 'summary', mode, viewType, selftest: { title: '셀프테스트', questions: qs } }
}

function makeTextHash(text: string) {
  if (!text) return 'empty'
  let h1 = 2166136261
  let h2 = 0
  for (let i = 0; i < text.length; i++) {
    const c = text.charCodeAt(i)
    h1 ^= c
    h1 += (h1 << 1) + (h1 << 4) + (h1 << 7) + (h1 << 8) + (h1 << 24)
    h2 = ((h2 << 5) - h2) + c
    h2 |= 0
  }
  const a = (h1 >>> 0).toString(16)
  const b = (Math.abs(h2) >>> 0).toString(16)
  return `${text.length.toString(16)}_${a}_${b}`
}

// ✅ V2: base cache (mode only) + derived cache (mode+viewType)
function baseCacheKey(kind: string, mode: string, text: string, userId: string | null) {
  const th = makeTextHash(text)
  const u = userId || 'anon'
  return `${kind}::${u}::${mode}::base::${th}`
}

function derivedCacheKey(kind: string, mode: string, viewType: string, text: string, userId: string | null) {
  const th = makeTextHash(text)
  const u = userId || 'anon'
  return `${kind}::${u}::${mode}::${viewType}::${th}`
}

async function ensureSchema(db?: D1Database) {
  if (__SCHEMA_READY__) return
  if (!db) {
    __SCHEMA_READY__ = true
    return
  }
  await db.prepare(
    `CREATE TABLE IF NOT EXISTS summary_cache (
      cache_key TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      response_json TEXT NOT NULL,
      created_at TEXT NOT NULL
    );`
  ).run()
  await db.prepare(
    `CREATE INDEX IF NOT EXISTS idx_summary_cache_user_created
     ON summary_cache(user_id, created_at);`
  ).run()
  __SCHEMA_READY__ = true
}

async function getCache(db: D1Database | undefined, key: string) {
  const now = Date.now()
  const m = MEM_CACHE.get(key)
  if (m && now - m.createdAt < MEM_CACHE_TTL_MS) return { hit: true, data: m.data, store: 'mem' as const }
  if (m) MEM_CACHE.delete(key)

  if (!db) return { hit: false as const }
  const row = await db.prepare(`SELECT response_json, created_at FROM summary_cache WHERE cache_key=?`)
    .bind(key)
    .first<{ response_json: string; created_at: string }>()
  if (!row?.response_json) return { hit: false as const }

  try {
    const parsed = JSON.parse(row.response_json)
    MEM_CACHE.set(key, { data: parsed, createdAt: now })
    return { hit: true, data: parsed, store: 'd1' as const }
  } catch {
    return { hit: false as const }
  }
}

async function setCache(db: D1Database | undefined, key: string, userId: string, data: any) {
  const now = Date.now()
  MEM_CACHE.set(key, { data, createdAt: now })
  if (!db) return
  await db.prepare(
    `INSERT OR REPLACE INTO summary_cache(cache_key, user_id, response_json, created_at)
     VALUES (?,?,?,?)`
  ).bind(key, userId, JSON.stringify(data), nowIso()).run()
}

// ------------------------------
// Gemini Engine (Real AI Summary)
// ------------------------------
function wantJson(viewType: string) {
  return viewType === 'structured' || viewType === 'mindmap' || viewType === 'selftest'
}

// ✅ V2: 압축률 고정 (brief 10-15%, standard 25-30%, detail 45-55%)
function buildGeminiPrompt(text: string, mode: 'brief'|'standard'|'detail') {
  const ratio =
    mode === 'brief' ? '원문 길이의 10~15%'
    : mode === 'standard' ? '원문 길이의 25~30%'
    : '원문 길이의 45~55%'

  const base = [
    `당신은 "학습 텍스트 압축 요약" 전문가입니다.`,
    `반드시 "중간 글자 자르기" 같은 방식은 금지합니다.`,
    `문장/의미 단위로 재구성하여 자연스러운 한국어로 요약하세요.`,
    `**압축률 목표: ${ratio}** (필수)`,
    `중복 제거, 핵심 개념/관계/원인-결과/절차가 드러나게 요약하세요.`,
    `원문에 없는 인용(괄호 숫자)이나 정보는 절대 추가하지 마세요.`,
  ].join('\n')

  // ✅ V2: narrative만 생성 (viewType 전환은 로컬 처리)
  const paragraphGuide = text.length < 300 ? '1~2개 문단'
    : text.length < 600 ? '2~3개 문단'
    : '3~4개 문단'
  
  return `${base}\n\n[출력 형식]\n- 한국어 서술 요약 (${paragraphGuide})\n- 원문 길이에 비례하여 단락 수 조정\n\n[원문]\n${text}`
}

// ✅ V2: Derived view 로컬 변환 함수들
function narrativeToStructured(narrative: string): any {
  // 문단을 bullet으로 변환
  const paragraphs = narrative.split(/\n\n+/).filter(p => p.trim())
  const bullets = paragraphs.length > 1 
    ? paragraphs.map((p, i) => `- (${i + 1}) ${p}`)
    : narrative.split(/[\.。]\s+/).filter(s => s.trim()).map((s, i) => `- (${i + 1}) ${s}.`)
  
  return {
    kind: 'summary',
    viewType: 'structured',
    structured: {
      title: '구조화 요약',
      bullets
    }
  }
}

function narrativeToMindmap(narrative: string): any {
  // 첫 문장을 중심으로, 나머지를 노드로
  const sentences = narrative.split(/[\.。]\s+/).filter(s => s.trim()).map(s => s.trim())
  const center = (sentences[0] || '핵심').slice(0, 40)
  const nodes = [{ id: 'c', label: center, level: 0 }]
  const edges: Array<{ from: string; to: string }> = []
  
  sentences.slice(1).forEach((s, i) => {
    const id = `n${i + 1}`
    nodes.push({ id, label: s.slice(0, 60), level: 1 })
    edges.push({ from: 'c', to: id })
  })
  
  return {
    kind: 'summary',
    viewType: 'mindmap',
    mindmap: { center, nodes, edges }
  }
}

function narrativeToSelftest(narrative: string): any {
  // 문장별로 질문 생성
  const sentences = narrative.split(/[\.。]\s+/).filter(s => s.trim()).map(s => s.trim())
  const questions = sentences.map((s, i) => ({
    id: `q${i + 1}`,
    type: 'short',
    question: `(${i + 1}) 다음 내용을 한 문장으로 설명해보세요: "${s.slice(0, 70)}"`,
    answerHint: s
  }))
  
  return {
    kind: 'summary',
    viewType: 'selftest',
    selftest: { title: '셀프테스트', questions }
  }
}

function extractJsonLoose(s: string) {
  const t = (s || '').trim()
  // ```json ... ``` 블록 우선
  const m = t.match(/```json\s*([\s\S]*?)\s*```/i)
  const candidate = m ? m[1].trim() : t
  // 앞뒤 군더더기 제거를 위해 첫 { .. 마지막 } 범위
  const i1 = candidate.indexOf('{')
  const i2 = candidate.lastIndexOf('}')
  if (i1 >= 0 && i2 > i1) {
    const slice = candidate.slice(i1, i2 + 1)
    return JSON.parse(slice)
  }
  return JSON.parse(candidate)
}

// ✅ V2: 압축률 검증 게이트
function validateCompressionRatio(originalText: string, summaryText: string, mode: 'brief'|'standard'|'detail'): { valid: boolean; ratio: number; expected: string } {
  const origLen = originalText.length
  const summLen = summaryText.length
  const ratio = origLen > 0 ? summLen / origLen : 0
  
  let minRatio = 0, maxRatio = 1
  if (mode === 'brief') {
    minRatio = 0.10
    maxRatio = 0.15
  } else if (mode === 'standard') {
    minRatio = 0.25
    maxRatio = 0.30
  } else {
    minRatio = 0.45
    maxRatio = 0.55
  }
  
  const valid = ratio >= minRatio && ratio <= maxRatio
  const expected = `${(minRatio * 100).toFixed(0)}-${(maxRatio * 100).toFixed(0)}%`
  
  return { valid, ratio, expected }
}

// ✅ V2: 안전장치 - 원문에 없는 괄호 인용 제거
function sanitizeCitations(originalText: string, summaryText: string): { cleaned: string; warnings: string[] } {
  const warnings: string[] = []
  
  // 원문의 모든 괄호 패턴 추출
  const origCitations = new Set<string>()
  const citationPattern = /\(([^)]+)\)/g
  let match
  while ((match = citationPattern.exec(originalText)) !== null) {
    origCitations.add(match[1].trim())
  }
  
  // 요약문의 괄호를 검사하고 원문에 없으면 제거
  let cleaned = summaryText
  const summCitations: string[] = []
  
  cleaned = cleaned.replace(/\(([^)]+)\)/g, (fullMatch, inner) => {
    const trimmed = inner.trim()
    summCitations.push(trimmed)
    
    // 원문에 있으면 유지
    if (origCitations.has(trimmed)) {
      return fullMatch
    }
    
    // 원문에 없으면 제거하고 경고
    warnings.push(`제거됨: ${fullMatch}`)
    return ''
  })
  
  // 연속 공백 정리
  cleaned = cleaned.replace(/\s{2,}/g, ' ').trim()
  
  return { cleaned, warnings }
}

async function callGemini(env: Bindings, prompt: string) {
  const key = safeStr(env.GEMINI_API_KEY).trim()
  if (!key) throw new Error('GEMINI_API_KEY is missing')
  const model = safeStr(env.GEMINI_MODEL).trim() || 'gemini-1.5-flash'

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(key)}`
  
  // ✅ 개선된 설정: 더 넉넉한 토큰 + 안정적인 temperature
  const body = {
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.3,          // 안정적인 출력 (0.2~0.4 권장)
      topP: 0.9,                  // 다양성 제어
      maxOutputTokens: 2048,      // ✅ 긴 원문 대응 (1200 → 2048)
      topK: 40                    // 토큰 선택 범위
    },
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_NONE'
      },
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_NONE'
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_NONE'
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE'
      }
    ]
  }

  // 간단 재시도(429/503)
  let attempt = 0
  let wait = 500
  while (attempt < 3) {
    attempt++
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body)
    })
    if (res.ok) {
      const data: any = await res.json()
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? ''
      return { ok: true, text, raw: data }
    }
    if (res.status === 429 || res.status === 503) {
      await new Promise((r) => setTimeout(r, wait))
      wait *= 2
      continue
    }
    const errText = await res.text().catch(() => '')
    throw new Error(`Gemini error ${res.status}: ${errText.slice(0, 200)}`)
  }
  throw new Error('Gemini retry exceeded')
}

// ------------------------------
// FRONT BUNDLE (optional)
// - 지금 UI는 /api/engine 직호출이므로 필수는 아니지만,
//   기존 구조 호환을 위해 유지
// ------------------------------
const MS_ENGINE_BUNDLE_JS = `/* MindStory Engine Bundle (compat) */
(function(){
  if(window.__MS_ENGINE_BUNDLE__) return;
  window.__MS_ENGINE_BUNDLE__=true;
  window.callEngineAPI = async function(kind, text, options){
    const res = await fetch('/api/engine', {
      method:'POST',
      headers:{'content-type':'application/json'},
      body: JSON.stringify({
        kind,
        text,
        mode: options?.mode || options?.level || 'standard',
        viewType: options?.viewType || options?.displayMode || 'narrative',
        options: { userId: options?.userId || options?.options?.userId || 'web_user' }
      })
    });
    const data = await res.json().catch(()=>({ok:false,error:{message:'bad json'}}));
    return data;
  }
})();`

// ------------------------------
// Middlewares
// ------------------------------
app.use('/api/*', cors())

// ✅ 1) 번들 라우트를 static보다 먼저 (MIME 문제 방지)
app.get('/static/ms-engine-bundle.js', (c) => {
  return c.text(MS_ENGINE_BUNDLE_JS, 200, {
    'content-type': 'application/javascript; charset=utf-8',
    'cache-control': 'no-store'
  })
})

// ✅ 2) favicon 204 (500 방지)
app.get('/favicon.ico', (c) => c.body(null, 204))

// ✅ 3) static은 그 다음
app.use('/static/*', serveStatic({ root: './public' }))

// ------------------------------
// UI (Modern Glass / Dark)
// ------------------------------
app.get('/', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>MindStory - 학습 요약 도우미</title>
  <style>
    :root{
      --bg0:#070A12;
      --bg1:#0B1020;
      --card: rgba(255,255,255,.06);
      --card2: rgba(255,255,255,.10);
      --stroke: rgba(255,255,255,.14);
      --txt: rgba(255,255,255,.92);
      --muted: rgba(255,255,255,.65);
      --muted2: rgba(255,255,255,.45);
      --brand:#8B5CF6;
      --brand2:#22D3EE;
      --danger:#FB7185;
      --ok:#34D399;
      --shadow: 0 18px 60px rgba(0,0,0,.55);
    }
    *{box-sizing:border-box}
    html,body{height:100%}
    body{
      margin:0;
      font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif;
      color:var(--txt);
      background:
        radial-gradient(1200px 800px at 20% 10%, rgba(139,92,246,.25), transparent 60%),
        radial-gradient(900px 700px at 80% 30%, rgba(34,211,238,.18), transparent 60%),
        radial-gradient(1100px 800px at 50% 110%, rgba(16,185,129,.12), transparent 55%),
        linear-gradient(180deg, var(--bg0), var(--bg1));
      overflow-x:hidden;
    }
    .wrap{min-height:100%; display:flex; align-items:center; justify-content:center; padding:28px;}
    .card{
      width:min(1040px, 100%);
      background: linear-gradient(180deg, var(--card), rgba(255,255,255,.04));
      border:1px solid var(--stroke);
      border-radius:22px;
      box-shadow: var(--shadow);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      overflow:hidden;
      position:relative;
    }
    .card::before{
      content:"";
      position:absolute; inset:-2px;
      background: radial-gradient(700px 320px at 30% 0%, rgba(139,92,246,.22), transparent 60%),
                  radial-gradient(520px 260px at 90% 20%, rgba(34,211,238,.18), transparent 60%);
      pointer-events:none;
    }
    .inner{position:relative; padding:22px;}
    .top{
      display:flex; gap:14px; align-items:center; justify-content:space-between;
      padding:18px 22px;
      border-bottom: 1px solid rgba(255,255,255,.10);
      background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02));
    }
    .brand{
      display:flex; align-items:center; gap:12px;
    }
    .logo{
      width:44px; height:44px; border-radius:14px;
      background: radial-gradient(circle at 30% 30%, rgba(255,255,255,.16), rgba(255,255,255,.04)),
                  linear-gradient(135deg, rgba(139,92,246,.9), rgba(34,211,238,.75));
      border:1px solid rgba(255,255,255,.18);
      box-shadow: 0 10px 30px rgba(139,92,246,.22);
      display:flex; align-items:center; justify-content:center;
      font-weight:800;
    }
    .title h1{margin:0; font-size:22px; letter-spacing:.2px}
    .title p{margin:2px 0 0; color:var(--muted); font-size:13px}
    .status{
      display:flex; flex-direction:column; align-items:flex-end; gap:6px;
      color:var(--muted);
      font-size:12px;
    }
    .pill{
      display:inline-flex; align-items:center; gap:8px;
      padding:8px 10px;
      border-radius:999px;
      background: rgba(0,0,0,.18);
      border:1px solid rgba(255,255,255,.12);
    }
    .dot{width:8px; height:8px; border-radius:50%;}
    .dot.ok{background:var(--ok)}
    .dot.bad{background:var(--danger)}
    .grid{
      display:grid;
      grid-template-columns: 1.2fr .8fr;
      gap:18px;
      padding:18px 22px 22px;
    }
    @media (max-width: 900px){
      .grid{grid-template-columns: 1fr;}
      .status{align-items:flex-start}
      .top{flex-direction:column; align-items:flex-start}
    }
    .panel{
      background: rgba(255,255,255,.05);
      border: 1px solid rgba(255,255,255,.12);
      border-radius:18px;
      padding:16px;
      backdrop-filter: blur(10px);
    }
    .label{color:var(--muted); font-size:13px; margin-bottom:10px; display:flex; gap:8px; align-items:center}
    .textarea{
      width:100%;
      min-height:220px;
      resize:vertical;
      padding:14px 14px;
      border-radius:14px;
      border:1px solid rgba(255,255,255,.14);
      background: rgba(0,0,0,.20);
      color:var(--txt);
      outline:none;
      line-height:1.55;
      box-shadow: inset 0 1px 0 rgba(255,255,255,.06);
    }
    .textarea:focus{
      border-color: rgba(139,92,246,.55);
      box-shadow: 0 0 0 4px rgba(139,92,246,.18);
    }
    .row{display:flex; align-items:center; justify-content:space-between; margin-top:10px}
    .count{color:var(--muted2); font-size:12px}
    .segTitle{color:var(--muted); font-size:12px; margin:14px 0 8px}
    .seg{
      display:flex; flex-wrap:wrap; gap:10px;
    }
    .btn{
      appearance:none; border:none; cursor:pointer;
      border-radius:12px;
      padding:10px 12px;
      color:var(--txt);
      background: rgba(255,255,255,.06);
      border:1px solid rgba(255,255,255,.12);
      transition: transform .08s ease, background .15s ease, border-color .15s ease;
      font-size:13px;
      display:inline-flex; align-items:center; gap:8px;
      user-select:none;
    }
    .btn:hover{background: rgba(255,255,255,.10)}
    .btn:active{transform: translateY(1px)}
    .btn.active{
      background: linear-gradient(135deg, rgba(139,92,246,.45), rgba(34,211,238,.18));
      border-color: rgba(139,92,246,.55);
    }
    .btn.primary{
      background: linear-gradient(135deg, rgba(139,92,246,.95), rgba(34,211,238,.55));
      border-color: rgba(255,255,255,.18);
      box-shadow: 0 18px 40px rgba(139,92,246,.18);
      font-weight:700;
    }
    .btn.primary:disabled{
      opacity:.45; cursor:not-allowed; box-shadow:none;
    }
    .btn.ghost{
      background: rgba(0,0,0,.18);
    }
    .actions{display:flex; gap:10px; margin-top:14px}
    .result{
      min-height:220px;
      display:flex; flex-direction:column; gap:10px;
    }
    .resultHead{
      display:flex; align-items:center; justify-content:space-between; gap:10px;
      padding-bottom:10px; border-bottom: 1px solid rgba(255,255,255,.10);
    }
    .resultHead h2{margin:0; font-size:16px}
    .meta{color:var(--muted2); font-size:12px}
    .out{
      background: rgba(0,0,0,.22);
      border: 1px solid rgba(255,255,255,.12);
      border-radius:14px;
      padding:14px;
      line-height:1.6;
      overflow:auto;
    }
    .out h3{margin:0 0 10px; font-size:14px}
    .out ul{margin:8px 0 0; padding-left:18px}
    .out li{margin:6px 0}
    .badge{
      display:inline-flex; align-items:center; gap:8px;
      padding:8px 10px;
      border-radius:999px;
      background: rgba(0,0,0,.20);
      border:1px solid rgba(255,255,255,.12);
      font-size:12px; color:var(--muted);
    }
    .spin{
      width:14px; height:14px;
      border-radius:50%;
      border:2px solid rgba(255,255,255,.22);
      border-top-color: rgba(255,255,255,.75);
      animation: spin 1s linear infinite;
    }
    @keyframes spin{to{transform:rotate(360deg)}}
    .err{
      color: rgba(255,255,255,.92);
      background: rgba(251,113,133,.12);
      border:1px solid rgba(251,113,133,.25);
      padding:10px 12px; border-radius:12px;
      display:none;
    }
    .hint{color:var(--muted2); font-size:12px; margin-top:8px}
  </style>
</head>
<body>
  <div class="wrap">
    <div class="card">
      <div class="top">
        <div class="brand">
          <div class="logo">MS</div>
          <div class="title">
            <h1>MindStory</h1>
            <p>학습 요약 도우미 · 압축 요약 엔진 (AI + 로컬 폴백)</p>
          </div>
        </div>
        <div class="status">
          <div class="pill" id="healthPill">
            <span class="dot bad" id="healthDot"></span>
            <span id="healthText">엔진 연결 확인 중…</span>
          </div>
          <div class="meta" id="healthMeta">—</div>
        </div>
      </div>

      <div class="grid">
        <div class="panel">
          <div class="label">입력 텍스트</div>
          <textarea id="inputText" class="textarea" placeholder="여기에 요약할 텍스트를 붙여넣거나 입력하세요. (텍스트 손실 없이 동작)"></textarea>
          <div class="row">
            <div class="hint">요약은 문장을 "자르지 않고" 의미 단위로 압축합니다.</div>
            <div class="count"><span id="charCount">0</span> 자</div>
          </div>

          <div class="segTitle">요약 모드</div>
          <div class="seg" id="modeSeg">
            <button class="btn" data-mode="brief">⚡ 간단</button>
            <button class="btn active" data-mode="standard">⚖️ 표준</button>
            <button class="btn" data-mode="detail">🔬 상세</button>
          </div>

          <div class="segTitle">보기 형식</div>
          <div class="seg" id="viewSeg">
            <button class="btn active" data-view="narrative">📘 서술형</button>
            <button class="btn" data-view="structured">🧱 구조화</button>
            <button class="btn" data-view="mindmap">🧠 마인드맵</button>
            <button class="btn" data-view="selftest">✅ 자가테스트</button>
          </div>

          <div class="actions">
            <button id="summarizeBtn" class="btn primary" disabled>✨ 요약하기</button>
            <button id="clearBtn" class="btn ghost">🧹 지우기</button>
          </div>
          <div class="err" id="errBox"></div>
        </div>

        <div class="panel result">
          <div class="resultHead">
            <h2>결과</h2>
            <div style="display:flex; gap:10px; align-items:center;">
              <span class="badge" id="runBadge"><span class="spin" id="spin" style="display:none"></span><span id="runText">대기</span></span>
              <button id="copyBtn" class="btn">📋 복사</button>
            </div>
          </div>
          <div class="out" id="out">
            <div class="meta">아직 결과가 없습니다. 오른쪽 상단 상태가 'OK'인지 확인 후 요약을 실행하세요.</div>
          </div>
          <div class="meta" id="resultMeta">—</div>
        </div>
      </div>
    </div>
  </div>

  <script src="/static/ms-engine-bundle.js"></script>
  <script>
    let currentMode = 'standard';
    let currentView = 'narrative';

    const elInput = document.getElementById('inputText');
    const elChar = document.getElementById('charCount');
    const elSumm = document.getElementById('summarizeBtn');
    const elClear = document.getElementById('clearBtn');
    const elOut = document.getElementById('out');
    const elErr = document.getElementById('errBox');
    const elMeta = document.getElementById('resultMeta');
    const elCopy = document.getElementById('copyBtn');
    const elRunBadge = document.getElementById('runBadge');
    const elRunText = document.getElementById('runText');
    const elSpin = document.getElementById('spin');

    const healthDot = document.getElementById('healthDot');
    const healthText = document.getElementById('healthText');
    const healthMeta = document.getElementById('healthMeta');

    function setErr(msg){
      if(!msg){ elErr.style.display='none'; elErr.textContent=''; return; }
      elErr.style.display='block';
      elErr.textContent = msg;
    }
    function setRunning(r){
      elSpin.style.display = r ? 'inline-block' : 'none';
      elRunText.textContent = r ? '실행 중' : '대기';
    }

    function pickActive(seg, key, value){
      seg.querySelectorAll('.btn').forEach(b=>{
        const v = b.dataset[key];
        if(v === value) b.classList.add('active');
        else b.classList.remove('active');
      });
    }

    document.getElementById('modeSeg').addEventListener('click', (e)=>{
      const btn = e.target.closest('.btn');
      if(!btn) return;
      currentMode = btn.dataset.mode;
      pickActive(document.getElementById('modeSeg'), 'mode', currentMode);
    });

    document.getElementById('viewSeg').addEventListener('click', (e)=>{
      const btn = e.target.closest('.btn');
      if(!btn) return;
      currentView = btn.dataset.view;
      pickActive(document.getElementById('viewSeg'), 'view', currentView);
    });

    elInput.addEventListener('input', ()=>{
      const n = elInput.value.length;
      elChar.textContent = n;
      elSumm.disabled = n < 5;
      setErr('');
    });

    elClear.addEventListener('click', ()=>{
      elInput.value = '';
      elChar.textContent = '0';
      elSumm.disabled = true;
      setErr('');
      elOut.innerHTML = '<div class="meta">초기화되었습니다.</div>';
      elMeta.textContent = '—';
    });

    elCopy.addEventListener('click', async ()=>{
      const text = elOut.innerText || '';
      try{
        await navigator.clipboard.writeText(text);
        elCopy.textContent = '✅ 복사됨';
        setTimeout(()=> elCopy.textContent='📋 복사', 1200);
      }catch{
        alert('복사에 실패했습니다.');
      }
    });

    function render(data){
      // data: { kind, mode, viewType, narrative|structured|mindmap|selftest }
      const v = currentView;
      if(v === 'narrative' && data.narrative){
        elOut.innerHTML = '<h3>서술형 요약</h3><div>' + escapeHtml(data.narrative) + '</div>';
        return;
      }
      if(v === 'structured' && data.structured){
        const bullets = data.structured.bullets || [];
        elOut.innerHTML = '<h3>' + escapeHtml(data.structured.title || '구조화 요약') + '</h3><ul>' +
          bullets.map(b=>'<li>' + escapeHtml(String(b).replace(/^[-•]\\s*/,'')) + '</li>').join('') +
        '</ul>';
        return;
      }
      if(v === 'mindmap' && data.mindmap){
        const center = data.mindmap.center || '핵심';
        const nodes = (data.mindmap.nodes || []).filter(n=>n.id !== 'c');
        elOut.innerHTML =
          '<h3>마인드맵(간이)</h3>' +
          '<div style="display:flex; flex-direction:column; gap:10px;">' +
            '<div class="badge">🌟 ' + escapeHtml(center) + '</div>' +
            '<ul>' + nodes.map(n=>'<li>' + escapeHtml(n.label || '') + '</li>').join('') + '</ul>' +
          '</div>';
        return;
      }
      if(v === 'selftest' && data.selftest){
        const qs = data.selftest.questions || [];
        elOut.innerHTML = '<h3>' + escapeHtml(data.selftest.title || '셀프테스트') + '</h3>' +
          qs.map((q,i)=>(
            '<div style="padding:10px 12px; border:1px solid rgba(255,255,255,.10); border-radius:12px; background:rgba(255,255,255,.04); margin:10px 0;">' +
              '<div style="font-weight:700; margin-bottom:6px;">Q' + (i+1) + '. ' + escapeHtml(q.question || '') + '</div>' +
              '<div class="meta">힌트: ' + escapeHtml(q.answerHint || '') + '</div>' +
            '</div>'
          )).join('');
        return;
      }
      elOut.innerHTML = '<div class="meta">선택한 보기 형식에 해당 결과가 없습니다.</div>';
    }

    function escapeHtml(s){
      return String(s).replace(/[&<>"']/g, (m)=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m]));
    }

    async function health(){
      try{
        const r = await fetch('/api/health');
        const j = await r.json();
        if(j.ok){
          healthDot.className = 'dot ok';
          healthText.textContent = '엔진 OK · ' + (j.engineMode || 'unknown');
          healthMeta.textContent = 'db:' + (j.hasDB ? 'on' : 'off') + ' · ' + (j.ts || '');
        }else{
          healthDot.className = 'dot bad';
          healthText.textContent = '엔진 응답 비정상';
          healthMeta.textContent = '';
        }
      }catch{
        healthDot.className = 'dot bad';
        healthText.textContent = '엔진 연결 실패';
        healthMeta.textContent = '';
      }
    }
    health();
    setInterval(health, 8000);

    elSumm.addEventListener('click', async ()=>{
      const text = (elInput.value || '').trim();
      if(text.length < 5) return;

      setErr('');
      setRunning(true);
      elMeta.textContent = '—';

      try{
        const res = await fetch('/api/engine', {
          method:'POST',
          headers:{'content-type':'application/json'},
          body: JSON.stringify({
            kind: 'summary',
            text,
            mode: currentMode,
            viewType: currentView,
            options: { userId: 'web_user' }
          })
        });
        const j = await res.json();
        if(!j.ok){
          throw new Error(j.error?.message || '요약 실패');
        }
        render(j.data);
        const m = j.meta || {};
        elMeta.textContent =
          'engine: ' + (m.engine || 'unknown') +
          ' · cached: ' + (m.cached ? 'true' : 'false') +
          (m.cacheStore ? ('(' + m.cacheStore + ')') : '') +
          ' · ' + (m.elapsedMs != null ? (m.elapsedMs + 'ms') : '');
      }catch(e){
        setErr(e && e.message ? e.message : '요약 중 오류가 발생했습니다.');
      }finally{
        setRunning(false);
      }
    });
  </script>
</body>
</html>`)
})

// ------------------------------
// Health
// ------------------------------
app.get('/api/health', (c) => {
  const hasKey = !!safeStr(c.env.GEMINI_API_KEY).trim()
  const useMock = safeStr(c.env.USE_MOCK).trim().toLowerCase() === 'true'
  return c.json({
    ok: true,
    ts: nowIso(),
    hasDB: !!c.env.DB,
    hasGeminiKey: hasKey,
    engineMode: hasKey && !useMock ? 'gemini+fallback' : 'local-only'
  })
})

// ------------------------------
// Engine
// ------------------------------
app.post('/api/engine', async (c) => {
  const start = Date.now()
  const db = c.env.DB
  await ensureSchema(db)

  let body: any = null
  try {
    body = await c.req.json()
  } catch {
    return c.json({ ok: false, error: { code: 'BAD_JSON', message: '요청 JSON이 올바르지 않습니다.' } }, 400)
  }

  const kind = normalizeKind(body?.kind)
  const text = safeStr(body?.text || '')
  const mode = normalizeMode(body?.mode || body?.level)
  const viewType = normalizeViewType(body?.viewType || body?.displayMode)
  const userId = safeStr(body?.options?.userId || body?.userId || 'anon')

  if (!text.trim() || text.trim().length < 5) {
    return c.json({ ok: false, error: { code: 'NO_TEXT', message: '입력 텍스트가 없습니다.' } }, 200)
  }

  // ✅ V2: derived cache 먼저 확인
  const derivedKey = derivedCacheKey(kind, mode, viewType, text, userId || null)
  const derivedCached = await getCache(db, derivedKey)
  if (derivedCached.hit) {
    return c.json(
      {
        ok: true,
        data: derivedCached.data,
        meta: { cached: true, cacheStore: derivedCached.store, cacheType: 'derived', engine: 'cache', elapsedMs: Date.now() - start }
      },
      200
    )
  }

  // ✅ V2: base cache 확인
  const baseKey = baseCacheKey(kind, mode, text, userId || null)
  const baseCached = await getCache(db, baseKey)
  
  // ✅ Base cache가 있으면 로컬 변환 후 derived cache 저장
  if (baseCached.hit && baseCached.data?.narrative) {
    const baseNarrative = baseCached.data.narrative
    let derivedData: any
    
    if (viewType === 'narrative') {
      derivedData = { kind, mode, viewType, narrative: baseNarrative }
    } else if (viewType === 'structured') {
      derivedData = { kind, mode, ...narrativeToStructured(baseNarrative) }
    } else if (viewType === 'mindmap') {
      derivedData = { kind, mode, ...narrativeToMindmap(baseNarrative) }
    } else {
      derivedData = { kind, mode, ...narrativeToSelftest(baseNarrative) }
    }
    
    await setCache(db, derivedKey, userId || 'anon', derivedData)
    return c.json(
      {
        ok: true,
        data: derivedData,
        meta: { cached: true, cacheStore: 'derived', cacheType: 'converted', engine: 'local-convert', elapsedMs: Date.now() - start }
      },
      200
    )
  }

  // ----------------------------
  // ✅ V2: Gemini 호출 (narrative만 생성, 1회만)
  // ----------------------------
  const hasGemini = !!safeStr(c.env.GEMINI_API_KEY).trim()
  const useMock = safeStr(c.env.USE_MOCK).trim().toLowerCase() === 'true'

  if (kind === 'summary' && hasGemini && !useMock) {
    try {
      const prompt = buildGeminiPrompt(text, mode)
      let narrative = ''
      let compressionValid = false
      let retryCount = 0
      
      // ✅ 압축률 검증 게이트: 최대 2회 시도
      while (retryCount < 2) {
        const g = await callGemini(c.env, prompt)
        narrative = (g.text || '').trim()
        
        // 압축률 검증
        const validation = validateCompressionRatio(text, narrative, mode)
        if (validation.valid) {
          compressionValid = true
          break
        }
        
        retryCount++
        if (retryCount < 2) {
          // 재시도 프롬프트 조정
          const adjustPrompt = `${prompt}\n\n[중요] 이전 시도의 압축률이 ${(validation.ratio * 100).toFixed(1)}%로 목표 범위(${validation.expected})를 벗어났습니다. 반드시 ${validation.expected} 범위로 요약하세요.`
          const g2 = await callGemini(c.env, adjustPrompt)
          narrative = (g2.text || '').trim()
        }
      }
      
      // ✅ 안전장치: 원문에 없는 인용 제거
      const { cleaned, warnings } = sanitizeCitations(text, narrative)
      if (warnings.length > 0) {
        console.warn('[SAFETY] 원문에 없는 인용 제거:', warnings)
      }
      narrative = cleaned
      
      // ✅ Base narrative를 base cache에 저장
      const baseData = { kind: 'summary', mode, viewType: 'narrative', narrative }
      await setCache(db, baseKey, userId || 'anon', baseData)
      
      // ✅ 요청된 viewType에 맞게 derived 생성
      let derivedData: any
      if (viewType === 'narrative') {
        derivedData = baseData
      } else if (viewType === 'structured') {
        derivedData = { kind, mode, ...narrativeToStructured(narrative) }
      } else if (viewType === 'mindmap') {
        derivedData = { kind, mode, ...narrativeToMindmap(narrative) }
      } else {
        derivedData = { kind, mode, ...narrativeToSelftest(narrative) }
      }
      
      await setCache(db, derivedKey, userId || 'anon', derivedData)
      
      return c.json(
        {
          ok: true,
          data: derivedData,
          meta: { 
            cached: false, 
            engine: 'gemini', 
            compressionValid,
            retryCount,
            citationWarnings: warnings.length,
            elapsedMs: Date.now() - start 
          }
        },
        200
      )
    } catch (e: any) {
      // ✅ Gemini 실패 시 로컬 폴백
      const fallback = localSummary(text, mode, viewType)
      await setCache(db, derivedKey, userId || 'anon', fallback)
      
      // Base narrative도 저장 (로컬)
      if (fallback.narrative) {
        const baseData = { kind: 'summary', mode, viewType: 'narrative', narrative: fallback.narrative }
        await setCache(db, baseKey, userId || 'anon', baseData)
      }
      
      return c.json(
        {
          ok: true,
          data: fallback,
          meta: {
            cached: false,
            engine: 'local(fallback)',
            geminiError: e?.message ? String(e.message).slice(0, 180) : 'unknown',
            elapsedMs: Date.now() - start
          }
        },
        200
      )
    }
  }

  // ----------------------------
  // ✅ V2: 로컬 엔진 (항상 동작)
  // ----------------------------
  let result: any

  if (kind === 'summary') {
    result = localSummary(text, mode, viewType)
    
    // Base narrative 저장
    if (result.narrative) {
      const baseData = { kind: 'summary', mode, viewType: 'narrative', narrative: result.narrative }
      await setCache(db, baseKey, userId || 'anon', baseData)
    }
  } else if (kind === 'concept') {
    const sents = splitSentences(text)
    const picked = pickTopByScore(sents, clamp(Math.round(sents.length * 0.25), 6, 10))
    result = {
      kind,
      mode,
      viewType,
      concepts: picked.map((s, i) => ({
        term: `핵심개념${i + 1}`,
        definition: s.slice(0, 120)
      }))
    }
  } else {
    const sents = splitSentences(text)
    const picked = pickTopByScore(sents, clamp(Math.round(sents.length * 0.22), 6, 10))
    result = {
      kind,
      mode,
      viewType,
      items: picked.map((s, i) => ({
        id: `e${i + 1}`,
        type: 'mcq',
        question: `(${i + 1}) 다음 설명의 핵심 요지는 무엇인가요?`,
        choices: [
          '핵심 주장/요지',
          '근거/예시',
          '반박/한계',
          '주제와 무관'
        ],
        answerIndex: 0,
        explanation: s
      }))
    }
  }

  await setCache(db, derivedKey, userId || 'anon', result)
  return c.json(
    {
      ok: true,
      data: result,
      meta: { cached: false, engine: hasGemini && !useMock ? 'local(no-gemini-for-kind)' : 'local', elapsedMs: Date.now() - start }
    },
    200
  )
})

// 404
app.notFound((c) => c.json({ ok: false, error: { code: 'NOT_FOUND', message: 'Route not found' } }, 404))

export default app
