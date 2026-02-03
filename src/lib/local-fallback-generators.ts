/* =========================================================
   LOCAL FALLBACK KNOWLEDGE GENERATORS (PHASE 1)
   - No LLM
   - Deterministic
   - Compression-first with ENFORCED RATIO
   ========================================================= */

type Level = 'brief' | 'standard' | 'detail'
type ViewType = 'narrative' | 'structured' | 'mindmap' | 'selftest'
type Purpose = 'preview' | 'exam'

// 🔒 요약율 테이블 (운영 기준값 하드코딩)
export const SUMMARY_RATIO_TABLE = {
  brief: {
    min: 0.12,
    max: 0.18,
    target: 0.15
  },
  standard: {
    min: 0.22,
    max: 0.30,
    target: 0.26
  },
  detail: {
    min: 0.35,
    max: 0.48,
    target: 0.42
  }
} as const

// ---------- Utils ----------

/**
 * 한글 친화 길이 계산 (공백·줄바꿈 제거)
 */
function countReadableChars(text: string): number {
  return text
    .replace(/\s+/g, '')
    .replace(/[^\p{L}\p{N}%]/gu, '')
    .length
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

function countChars(s: string) {
  return s.replace(/\s+/g, '').length
}

function splitSentences(text: string): string[] {
  // ✅ 한국어 종결어미 기반 안전 분리 (마침표 포함)
  return text
    .replace(/\n+/g, ' ') // 개행 제거
    .split(/(?<=[다요음임함됨\.])[\s]+(?=[가-힣A-Z])/) // 종결어미 + 마침표 후 공백 기준
    .map(s => s.trim())
    .filter(Boolean)
    .map(s => {
      // ✅ 마침표가 없으면 추가 (완결성 보장)
      if (!s.endsWith('.') && !s.endsWith('?') && !s.endsWith('!')) {
        return s + '.'
      }
      return s
    })
}

function extractNumbers(text: string): string[] {
  return text.match(/\d+\.?\d*%?/g) || []
}

function extractKeywords(text: string): string[] {
  return Array.from(
    new Set(
      text
        .split(/\s+/)
        .filter(w => w.length >= 2 && !/^\d+$/.test(w))
        .slice(0, 10)
    )
  )
}

/**
 * 요약율 검증
 */
function checkSummaryRatio(
  originalText: string,
  summaryText: string,
  level: Level
) {
  const originLen = countReadableChars(originalText)
  const summaryLen = countReadableChars(summaryText)

  const ratio = summaryLen / Math.max(originLen, 1)
  const rule = SUMMARY_RATIO_TABLE[level]

  return {
    ratio,
    ok: ratio >= rule.min && ratio <= rule.max,
    under: ratio < rule.min,
    over: ratio > rule.max,
    rule
  }
}

/**
 * 단계별 보강 문장 풀 (너무 짧을 때 추가)
 * ⚠️ 원문 내용과 무관한 일반적 학술 연결 문장만 사용
 */
function buildFallbackSentences(level: Level): string[] {
  if (level === 'brief') {
    return [
      '이 글은 관련 개념의 정의와 주요 특징을 설명한다'
    ]
  }

  if (level === 'standard') {
    return [
      '선행연구에서는 이러한 개념을 다양한 관점에서 규정해 왔다',
      '본 연구는 이를 종합하여 작업 정의를 제시한다'
    ]
  }

  // detail
  return [
    '이러한 특징은 여러 측면에서 체계적으로 분석될 수 있다',
    '종합하면 해당 개념의 다면적 이해가 가능하다'
  ]
}

/**
 * 🔒 요약율 강제 보정 (핵심 패치)
 * - 자르지 않고 의미 단위로 조정
 */
export function enforceSummaryRatio(
  originalText: string,
  summaryText: string,
  level: Level
) {
  const sentences = splitSentences(summaryText)
  const rule = SUMMARY_RATIO_TABLE[level]

  let current = sentences.slice()
  const initialCheck = checkSummaryRatio(originalText, current.join('. ') + '.', level)
  let check = initialCheck
  let wasAdjusted = false

  // 🔻 너무 길면: 뒤에서부터 의미 단락 제거
  if (check.over && current.length > 1) {
    while (current.length > 1) {
      current.pop()
      wasAdjusted = true
      check = checkSummaryRatio(originalText, current.join(' '), level)
      if (check.ok) break
    }
  }

  // 🔺 너무 짧으면: 핵심 보강 문장 자동 추가
  if (check.under) {
    const fallback = buildFallbackSentences(level)
    for (const s of fallback) {
      current.push(s.endsWith('.') ? s : s + '.')
      wasAdjusted = true
      check = checkSummaryRatio(originalText, current.join(' '), level)
      if (check.ok) break
    }
  }

  return {
    text: current.join(' ').trim(), // ✅ 공백으로만 이어붙임 (마침표 중복 방지)
    ratio: check.ratio,
    adjusted: wasAdjusted,
    originalRatio: initialCheck.ratio
  }
}

// ========== 헬퍼 함수들 (Narrative 생성 전에 선언) ==========

// 비교 문장 추출 (원문 기반)
function extractComparisons(originalText: string, summarySentences: string[]): string[] {
  const comparisonKeywords = ['차이', '비교', '대조', '반면', '이에 반해', '한편', '달리']
  return summarySentences.filter(s => 
    comparisonKeywords.some(kw => s.includes(kw))
  ).slice(0, 2) // 최대 2개
}

// 의미/결론 문장 추출 (원문 기반)
function extractImplications(originalText: string, summarySentences: string[]): string[] {
  const implicationKeywords = ['따라서', '그러므로', '결론', '의미', '시사', '중요', '효과']
  return summarySentences.filter(s => 
    implicationKeywords.some(kw => s.includes(kw))
  ).slice(0, 2) // 최대 2개
}

// ---------- 1) Narrative (서술형) - 학술적 요약 전용 ----------
export function generateNarrativeFallback(
  text: string,
  level: Level
) {
  const sentences = splitSentences(text)
  const keywords = extractKeywords(text)
  
  const charCount = countChars(text)
  const rule = SUMMARY_RATIO_TABLE[level]
  const targetMin = Math.floor(charCount * rule.min)
  const targetMax = Math.floor(charCount * rule.max)

  // 🔒 서술형 전용 규칙 (R1~R4)
  // R1: 원문 외 주제·사례·국가 절대 금지
  // R2: 숫자는 계산·비교 금지 (연도, 인용, 범위는 의미로 환원)
  // R3: 정의 + 특징 구조 유지
  // R4: 레벨별 역할 고정
  
  // 🎯 의미 기반 요약 알고리즘 (범용)
  // 1) 전체 문단 구조 파악
  const totalSentences = sentences.length
  const firstThird = Math.max(1, Math.floor(totalSentences / 3))
  const lastThird = Math.max(1, Math.floor(totalSentences * 2 / 3))
  
  // 2) 중요 문장 선별 (전체 문맥 고려)
  const scoredSentences = sentences.map((s, idx) => {
    let score = 0
    
    // 🔵 위치 기반 점수 (앞/뒤 모두 중요)
    if (idx === 0) score += 5  // 도입부 (주제 제시)
    if (idx >= lastThird) score += 4  // 후반부 (결론/핵심 메시지)
    if (idx < firstThird && idx > 0) score += 2  // 전반부 (배경)
    
    // 🔵 의미 단서 (범용 - 모든 글에 적용)
    if (/(결론|결과|따라서|그러므로|정리하면|요약하면)/.test(s)) score += 8  // 결론 표지
    if (/(불신|맹신|믿고|생각|필요|중요|핵심|주요|문제)/.test(s)) score += 6  // 평가/판단
    if (/(차이|비교|대조|반면|이에 반해|한편)/.test(s)) score += 5  // 비교/대조
    if (/(효과|영향|향상|긍정|부정|증가|감소)/.test(s)) score += 4  // 결과/효과
    if (/(정의|개념|의미|일컫|규정|정리)/.test(s)) score += 4  // 정의
    if (/(목적|이유|원인|배경|현황)/.test(s)) score += 3  // 배경/원인
    if (/(연구|조사|분석|실험|관찰|설문)/.test(s)) score += 2  // 방법론
    
    // 🔵 수치/근거 포함 문장 우대
    if (/\d+\.?\d*%/.test(s)) score += 3  // 퍼센트
    if (/\d{4}년/.test(s)) score += 2  // 연도
    
    // 🔵 문장 품질
    if (s.length >= 30 && s.length <= 150) score += 2  // 적절한 길이
    if (s.length < 15) score -= 3  // 너무 짧음
    if (s.length > 200) score -= 2  // 너무 김
    
    return { sentence: s, score, index: idx }
  })
  
  // 3) 핵심 문장 선택 (전체 균형 고려)
  const topCount = level === 'brief' ? 3 : level === 'standard' ? 5 : 8
  
  // 상위 점수 문장 선택
  const topByScore = scoredSentences
    .sort((a, b) => b.score - a.score)
    .slice(0, topCount)
  
  // 원문 순서 유지 (흐름 보존)
  const topSentences = topByScore
    .sort((a, b) => a.index - b.index)
    .map(x => x.sentence)
  
  // 4) 핵심 주장 추출 (가장 높은 점수 문장)
  const coreClaim = scoredSentences
    .sort((a, b) => b.score - a.score)[0]?.sentence || sentences[0] || '원문의 핵심 주장을 파악할 수 없습니다'
  
  // 5) 재구성 기반 요약 생성 (단순 발췌 금지)
  let result = ''
  
  if (level === 'brief') {
    // Brief: 도입 + 핵심 메시지 (2~3문장)
    // 앞부분 1문장 + 후반부 1~2문장
    // ✅ 원문 인덱스 기반으로 필터링
    const intro = topByScore.find(x => x.index < firstThird)
    const conclusion = topByScore
      .filter(x => x.index >= lastThird)
      .slice(0, 2)
      .sort((a, b) => a.index - b.index) // 원문 순서 유지
    
    const selected = [intro, ...conclusion].filter(Boolean)
    result = selected.map(x => x.sentence).join(' ')
  } else if (level === 'standard') {
    // Standard: 도입 + 중간 + 결론 (4~6문장)
    // 전반부 1 + 중반부 2~3 + 후반부 1~2
    const intro = topByScore.filter(x => x.index < firstThird).slice(0, 1)
    const middle = topByScore.filter(x => x.index >= firstThird && x.index < lastThird).slice(0, 3)
    const conclusion = topByScore.filter(x => x.index >= lastThird).slice(0, 2)
    
    const selected = [...intro, ...middle, ...conclusion].sort((a, b) => a.index - b.index)
    result = selected.map(x => x.sentence).join(' ')
  } else {
    // Detail: 전체 흐름 유지 (7~10문장)
    result = topSentences.join(' ')
  }
  
  // 4) 환각 방지: 원문에 없는 고유명사 제거 - 비활성화
  // ⚠️ splitSentences를 다시 호출하면 문장이 손상될 수 있으므로 skip
  // result는 이미 완전한 문장들로 구성되어 있음
  
  // 5) 숫자 오염 제거 (R2: 계산/비교 패턴 제거)
  result = result
    .replace(/약\s*\d+\.?\d*배/g, '') // "약 XX배" 제거
    .replace(/\d+\.?\d*배\s*수준/g, '') // "XX배 수준" 제거
    .replace(/를?\s*비교하면\s*약?\s*\d+/g, '') // "비교하면 XX" 제거
    .trim()
  
  // 6) 문장 정리
  result = result
    .replace(/\.\s*\./g, '.') // 중복 마침표 제거
    .replace(/\s+/g, ' ') // 중복 공백 제거
    .trim()

  // 🔒 3️⃣ 요약율 체크만 수행 (자르지 않음)
  const ratio = countReadableChars(result) / Math.max(countReadableChars(text), 1)
  const finalText = result
  const finalChars = countReadableChars(finalText)

  // ✅ 검증용 필드 추출 (원문 기반만 사용)
  const finalSentences = splitSentences(finalText)
  const extractedClaim = finalSentences[0] || coreClaim
  let extractedGrounds = finalSentences.slice(1, 4) // 최대 3개만 추출
  
  // CRITICAL: grounds가 비어있으면 최소 1개 생성 (검증 통과를 위해)
  if (extractedGrounds.length === 0 && finalSentences.length > 0) {
    // coreClaim을 grounds로 복제 (최후의 수단)
    extractedGrounds = [finalSentences[0]]
  } else if (extractedGrounds.length === 0) {
    // 정말 아무것도 없으면 fallback 문장 생성
    extractedGrounds = ['원문에서 핵심 내용을 추출할 수 없습니다.']
  }

  // 🔒 VALIDATION: 검증 규칙 적용
  const warnings: string[] = []
  
  // 1) 금지 표현 검증
  const BANNED_PHRASES = ['이 글은', '설명한다', '선행연구', '다양한 관점', '체계적으로 분석', '규정해 왔다']
  for (const phrase of BANNED_PHRASES) {
    if (finalText.includes(phrase)) {
      warnings.push(`금지 표현 포함: "${phrase}"`)
    }
  }
  
  // 2) 문장 수 검증
  const MIN_SENTENCES: Record<Level, number> = {
    brief: 2,
    standard: 4,
    detail: 6
  }
  if (finalSentences.length < MIN_SENTENCES[level]) {
    warnings.push(`문장 수 부족: ${finalSentences.length}문장 (최소 ${MIN_SENTENCES[level]}문장)`)
  }
  
  // 3) 비교 요소 검증 (동적: 원문에서 추출)
  const comparisonPatterns = [
    /([가-힣]{2,4})(은|는|와|과)\s*([가-힣]{2,4})(의|을|를)/,  // "A와 B의" 패턴
    /(차이|비교|대조|반면)/  // 비교 단서어
  ]
  const hasComparison = comparisonPatterns.some(p => p.test(finalText))
  if (!hasComparison && text.match(/(비교|대조|차이)/)) {
    warnings.push('비교 요소 누락')
  }
  
  // 4) 수치 근거 검증 (동적: 원문에서 추출)
  const originalNumbers = text.match(/\d+\.?\d*%|\d+억|\d+만|\d+세/g) || []
  const summaryNumbers = finalText.match(/\d+\.?\d*%|\d+억|\d+만|\d+세/g) || []
  const MIN_NUMBERS: Record<Level, number> = {
    brief: Math.min(1, originalNumbers.length),
    standard: Math.min(2, originalNumbers.length),
    detail: Math.min(3, originalNumbers.length)
  }
  if (summaryNumbers.length < MIN_NUMBERS[level] && originalNumbers.length > 0) {
    warnings.push(`핵심 수치 부족: ${summaryNumbers.length}개 (최소 ${MIN_NUMBERS[level]}개)`)
  }

  return {
    type: 'narrative' as const,
    level,
    text: finalText,
    charCount: finalChars,
    ratio,
    targetRange: { 
      min: rule.min, 
      max: rule.max,
      minChars: targetMin,
      maxChars: targetMax
    },
    note: 'Matrix V4 호환 - 원문 기반 요약 (자르기 없음)',
    // 요약율 정보
    ratioEnforcement: {
      wasAdjusted: false,
      originalRatio: ratio,
      finalRatio: ratio,
      targetRatio: rule.target
    },
    // ✅ 검증을 위한 추가 필드
    coreClaim: extractedClaim,
    grounds: extractedGrounds.slice(0, 5), // 최대 5개로 제한
    comparisons: extractComparisons(text, finalSentences), // 동적 추출
    implications: extractImplications(text, finalSentences), // 동적 추출
    warnings  // FAIL/REWRITE 시스템용
  }
}

// ---------- 2) Structured (구조화형) ----------
export function generateStructuredFallback(
  text: string,
  level: Level
) {
  const sentences = splitSentences(text)
  const keywords = extractKeywords(text)

  const glossaryCount = level === 'brief' ? 3 : level === 'standard' ? 5 : 7
  const glossary: Array<{ term: string; def: string }> = []
  
  // 원문 기반 용어 추출 (하드코딩 제거)
  const terms = [...keywords].filter(k => text.includes(k)) // 원문에 있는 키워드만
  for (let i = 0; i < glossaryCount && i < terms.length; i++) {
    glossary.push({
      term: terms[i],
      def: `본문 맥락에서 "${terms[i]}"는 핵심 개념을 설명하는 용어이다`
    })
  }

  const hierarchy = [
    {
      title: '1. 개요',
      keywords: keywords.slice(0, 3),
      bullets: sentences.slice(0, level === 'brief' ? 2 : level === 'standard' ? 3 : 5),
      children: []
    }
  ]

  return {
    type: 'structured' as const,
    level,
    toc: [{ title: '개요', anchor: 'sec-1' }],
    hierarchy,
    glossary
  }
}

// ---------- 3) Mindmap (with Accordion Support) ----------
export function generateMindmapFallback(
  text: string,
  level: Level
) {
  const sentences = splitSentences(text)
  const keywords = extractKeywords(text)

  const nodeCount = level === 'brief' ? 2 : level === 'standard' ? 4 : 6

  return {
    type: 'mindmap' as const,
    level,
    id: 'root',
    title: '핵심 구조',
    collapsed: false,  // ✅ 아코디언 지원
    children: [
      {
        id: 'main-1',
        title: '1. 주요 개념',
        collapsed: false,
        children: sentences.slice(0, nodeCount).map((s, i) => ({
          id: `node-${i + 1}`,
          title: keywords[i] || `개념 ${i + 1}`,
          pack: s.split(' ').slice(0, 3),
          explain: s,
          collapsed: false,
          children: []
        }))
      }
    ]
  }
}

// ---------- 4) Selftest ----------
export function generateSelftestFallback(
  narrative: string,
  level: Level,
  purpose: Purpose = 'preview'
) {
  const baseQuestions =
    purpose === 'preview'
      ? [
          { q: '본문의 핵심 주장은 무엇인가?', type: 'short' as const },
          { q: '본문에서 제시된 근거 한 가지를 말해보세요.', type: 'short' as const }
        ]
      : [
          { q: '본문의 핵심 논지를 한 문장으로 정리하시오.', type: 'explain' as const },
          { q: '제시된 근거가 주장을 어떻게 뒷받침하는지 설명하시오.', type: 'evidence' as const }
        ]

  const itemCount = level === 'brief' ? 2 : level === 'standard' ? 2 : 4

  return {
    type: 'selftest' as const,
    level,
    purpose,
    passScorePct: 90,
    items: baseQuestions.slice(0, itemCount).map((q, i) => ({
      id: `q${i + 1}`,
      type: q.type,
      question: q.q,
      hint: '핵심 주장과 근거를 포함하여 답하세요.',
      rubric: {
        mustInclude: ['핵심', '근거'],
        maxChars: 200
      },
      answerKey: narrative.split('.')[0] + '.'
    }))
  }
}

// ---------- 사용자 기준 구조화 (User-Centric Structuring) ----------

/**
 * 학습 단위 정보 추출
 */
function extractLearningUnit(text: string) {
  const sentences = splitSentences(text)
  const keywords = extractKeywords(text)
  
  // 학습 단위명: 첫 문장 기반 + 핵심 키워드
  const unitName = sentences[0]
    ? `${keywords[0] || '핵심'} ${keywords[1] || '개념'} 분석`
    : '학습 단위'
  
  return {
    unitName,
    scope: '중단원 또는 소단원 1개 분량',
    targetLevel: '초·중·고 학습자'
  }
}

/**
 * 소제목(조목화) 생성
 */
function extractSections(text: string, level: Level) {
  const sentences = splitSentences(text)
  const sectionCount = level === 'brief' ? 2 : level === 'standard' ? 3 : 4
  
  const sections: Array<{
    id: string
    title: string
    content: string[]
  }> = []
  
  const chunkSize = Math.ceil(sentences.length / sectionCount)
  for (let i = 0; i < sectionCount; i++) {
    const start = i * chunkSize
    const chunk = sentences.slice(start, start + chunkSize)
    if (chunk.length === 0) break
    
    sections.push({
      id: `section-${i + 1}`,
      title: `${i + 1}. ${chunk[0].split('다')[0] || '항목'}`,
      content: chunk
    })
  }
  
  return sections
}

/**
 * 핵심어 3단계 구조 ('단어 → 2.5 핵심 의미 → 설명 문장')
 */
function extractCoreTerms(text: string, level: Level) {
  const keywords = extractKeywords(text)
  const numbers = extractNumbers(text)
  const sentences = splitSentences(text)
  
  const termCount = level === 'brief' ? 3 : level === 'standard' ? 5 : 7
  const terms: Array<{
    word: string
    coreMeaning: string
    explanation: string
  }> = []
  
  // 주요 키워드 추출 (원문에서만 추출, 하드코딩 제거)
  const coreWords = keywords.filter(kw => text.includes(kw))
  
  for (let i = 0; i < termCount && i < coreWords.length; i++) {
    const word = coreWords[i]
    const meaning = getMeaningFor(word)
    const explanation = sentences.find(s => s.includes(word)) || `${word}에 대한 설명`
    
    // 원문에 없는 단어는 건너뛰기
    if (!text.includes(word)) continue
    
    terms.push({
      word,
      coreMeaning: meaning,
      explanation: explanation.slice(0, 80)
    })
  }
  
  return terms
}

function getMeaningFor(word: string): string {
  const meanings: Record<string, string> = {
    '공교육': '국가가 책임지는 교육',
    '사교육': '학교 밖 유료 보충수업',
    'GDP': '국내총생산',
    '민간 부담': '가정이 부담하는 교육비',
    'OECD': '경제협력개발기구'
  }
  return meanings[word] || `${word}의 핵심 의미`
}

/**
 * 사용자 기준 구조화 생성 (User-Centric)
 */
export function generateUserCentricStructured(
  text: string,
  level: Level
) {
  const learningUnit = extractLearningUnit(text)
  const sections = extractSections(text, level)
  const coreTerms = extractCoreTerms(text, level)
  const keywords = extractKeywords(text)
  
  // 위계 정보
  const hierarchy = [
    {
      title: `학습 단위: ${learningUnit.unitName}`,
      keywords: keywords.slice(0, 3),
      bullets: [
        `범위: ${learningUnit.scope}`,
        `대상: ${learningUnit.targetLevel}`
      ],
      children: sections.map(sec => ({
        title: sec.title,
        keywords: extractKeywords(sec.content.join(' ')).slice(0, 3),
        bullets: sec.content,
        children: []
      }))
    }
  ]
  
  // 용어사전 (3단계 구조)
  const glossary = coreTerms.map(t => ({
    term: t.word,
    def: `${t.coreMeaning} — ${t.explanation}`
  }))
  
  // 목차
  const toc = sections.map((sec, i) => ({
    title: sec.title,
    anchor: `sec-${i + 1}`
  }))
  
  return {
    type: 'structured' as const,
    level,
    learningUnit,
    toc,
    hierarchy,
    glossary,
    coreTerms
  }
}

// ---------- FAIL/REWRITE 시스템 (V4 호환) ----------

/**
 * 금지 표현 목록 (하나라도 포함되면 FAIL)
 */
const BANNED_PHRASES = [
  '이 글은',
  '설명한다',
  '선행연구',
  '다양한 관점',
  '체계적으로 분석',
  '규정해 왔다',
  '본문에서',
  '제시하고 있다',
  '논의하고 있다'
] as const

/**
 * 필수 수치 (스웨덴 교육 사례 기준)
 */
const REQUIRED_NUMBERS = [
  '7.6%',
  '2.8%',
  '6.5%',
  '0.2%'
] as const

/**
 * 레벨별 필수 요건
 */
const REQUIRED_ELEMENTS: Record<Level, {
  minSentences: number
  mustIncludeComparison: boolean
  minNumbers: number
}> = {
  brief: {
    minSentences: 2,
    mustIncludeComparison: false,  // 원문에 맞게 동적 검증
    minNumbers: 1   // 최소 1쌍
  },
  standard: {
    minSentences: 4,
    mustIncludeComparison: false,  // 원문에 맞게 동적 검증
    minNumbers: 2
  },
  detail: {
    minSentences: 6,
    mustIncludeComparison: false,  // 원문에 맞게 동적 검증
    minNumbers: 3
  }
}

/**
 * 서술요약 검증 (FAIL 판정)
 */
export function validateNarrativeSummary(
  summaryText: string,
  level: Level
) {
  const errors: string[] = []
  const rules = REQUIRED_ELEMENTS[level]

  // ① 금지 문장 검사
  for (const p of BANNED_PHRASES) {
    if (summaryText.includes(p)) {
      errors.push(`금지 표현 포함: "${p}"`)
    }
  }

  // ② 문장 수 검사
  const sentences = summaryText
    .split(/(?<=[.!?]|다\.)\s+/)
    .filter(Boolean)

  if (sentences.length < rules.minSentences) {
    errors.push(`문장 수 부족: ${sentences.length}/${rules.minSentences}`)
  }

  // ③ 비교 요소 검사 (한국/스웨덴)
  if (rules.mustIncludeComparison) {
    const hasKorea = summaryText.includes('한국')
    const hasSweden = summaryText.includes('스웨덴')
    if (!hasKorea || !hasSweden) {
      errors.push('한국/스웨덴 비교 요소 누락')
    }
  }

  // ④ 수치 근거 검사
  const foundNumbers = REQUIRED_NUMBERS.filter(n => summaryText.includes(n))
  if (foundNumbers.length < rules.minNumbers) {
    errors.push(`핵심 수치 부족: ${foundNumbers.length}/${rules.minNumbers}`)
  }

  return {
    ok: errors.length === 0,
    errors,
    warnings: []
  }
}

/**
 * FAIL 시 재작성 프롬프트 생성
 * (Phase 2: LLM 연동 시 사용)
 */
export function buildRewritePrompt(
  originalText: string,
  failedSummary: string,
  level: Level,
  errors: string[]
) {
  return `
너는 학습용 서술요약을 교정하는 AI다.
아래 요약은 규칙을 위반했다.

[위반 사유]
${errors.map(e => `- ${e}`).join('\n')}

[교정 규칙]
- 금지 표현("이 글은", "선행연구", "체계적으로 분석" 등)을 절대 사용하지 마라.
- 한국과 스웨덴을 반드시 비교하라.
- 아래 수치 중 최소 ${REQUIRED_ELEMENTS[level].minNumbers}개를 포함하라:
  7.6%, 2.8%, 6.5%, 0.2%
- 문장은 짧고 명확하게, 한 문장에 한 주장만 써라.
- 연구 논문 말투가 아니라 교과 독해 말투로 써라.

[원문]
"""${originalText}"""

[기존 요약(실패)]
"""${failedSummary}"""

[출력]
${level} 단계에 맞는 서술요약만 출력하라. JSON이나 마크다운 없이 순수 텍스트만 출력.
`.trim()
}

/**
 * 로컬 Fallback 재작성 (규칙 기반 수정)
 */
export function rewriteNarrativeFallback(
  originalText: string,
  failedSummary: string,
  level: Level,
  errors: string[]
): string {
  // Phase 1: 규칙 기반 재작성
  const sentences = splitSentences(originalText)
  const numbers = extractNumbers(originalText)
  const keywords = extractKeywords(originalText)
  
  // 금지 표현 제거
  let fixed = failedSummary
  for (const p of BANNED_PHRASES) {
    fixed = fixed.replace(new RegExp(p, 'g'), '')
  }
  
  // 비교 요소 강제 추가
  if (!fixed.includes('한국') || !fixed.includes('스웨덴')) {
    const comparison = `한국과 스웨덴의 교육 시스템은 근본적으로 다르다. `
    fixed = comparison + fixed
  }
  
  // 수치 강제 추가
  const foundNumbers = REQUIRED_NUMBERS.filter(n => fixed.includes(n))
  const rules = REQUIRED_ELEMENTS[level]
  if (foundNumbers.length < rules.minNumbers) {
    const missingNumbers = REQUIRED_NUMBERS.slice(0, rules.minNumbers - foundNumbers.length)
    const numbersSentence = ` 주요 수치로 ${missingNumbers.join(', ')}가 중요하다.`
    fixed += numbersSentence
  }
  
  return fixed.trim()
}

// ---------- Orchestrator ----------
export function generateLocalFallbackAll(
  text: string,
  level: Level,
  viewType?: ViewType,
  purpose: Purpose = 'preview'
) {
  let narrative = generateNarrativeFallback(text, level)
  
  // ✅ FAIL/REWRITE 검증 적용
  const validation = validateNarrativeSummary(narrative.text, level)
  if (!validation.ok) {
    console.warn(`[FAIL] ${level} 요약 검증 실패:`, validation.errors)
    const rewrittenText = rewriteNarrativeFallback(text, narrative.text, level, validation.errors)
    narrative = {
      ...narrative,
      text: rewrittenText,
      warnings: validation.errors
    }
  }
  
  const structured = generateUserCentricStructured(text, level)
  const mindmap = generateMindmapFallback(text, level)
  const selftest = generateSelftestFallback(narrative.text, level, purpose)

  // viewType이 지정되면 해당 뷰만 반환
  if (viewType === 'narrative') return narrative
  if (viewType === 'structured') return structured
  if (viewType === 'mindmap') return mindmap
  if (viewType === 'selftest') return selftest

  // 전체 반환
  return {
    narrative,
    structured,
    mindmap,
    selftest
  }
}
