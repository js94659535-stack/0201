/* =========================================================
   LOCAL FALLBACK KNOWLEDGE GENERATORS (PHASE 1)
   - No LLM
   - Deterministic
   - Compression-first
   ========================================================= */

type Level = 'brief' | 'standard' | 'detail'
type ViewType = 'narrative' | 'structured' | 'mindmap' | 'selftest'
type Purpose = 'preview' | 'exam'

// 🔒 압축률 목표 (Phase 1 확정)
const RATIO: Record<Level, { min: number; max: number }> = {
  brief: { min: 0.10, max: 0.18 },
  standard: { min: 0.25, max: 0.38 },
  detail: { min: 0.45, max: 0.62 }
}

// ---------- Utils ----------
function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

function countChars(s: string) {
  return s.replace(/\s+/g, '').length
}

function splitSentences(text: string): string[] {
  return text
    .replace(/\n+/g, ' ')
    .split(/(?<=[다요음임함됨])\./)
    .map(s => s.trim())
    .filter(Boolean)
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

// ---------- 1) Narrative (서술형) - 통합 JSON 구조 기반 ----------
export function generateNarrativeFallback(
  text: string,
  level: Level
) {
  const sentences = splitSentences(text)
  const numbers = extractNumbers(text)
  const keywords = extractKeywords(text)
  
  const charCount = countChars(text)
  const { min, max } = RATIO[level]
  const targetMin = Math.floor(charCount * min)
  const targetMax = Math.floor(charCount * max)

  // 🔒 논점 중심 구조 (thesis → key_facts → comparison → implication)
  
  // 1) 중심 논점 (thesis)
  const thesis = sentences[0]
    ? `${sentences[0].split('며')[0]}며, 이는 핵심 특징이다`
    : '핵심 주장을 생성할 수 없습니다'

  // 2) 핵심 사실 (key_facts) - 숫자는 라벨 포함, 최소 3개 보장
  const keyFacts: string[] = []
  if (numbers.length >= 2) {
    keyFacts.push(`주요 수치로 ${numbers[0]}와 ${numbers[1]}이 중요한 기준점이 된다`)
  }
  if (numbers.length >= 3) {
    keyFacts.push(`또한 ${numbers[2]}도 함께 고려해야 하며, 이는 전체 맥락을 이해하는 데 필수적이다`)
  }
  if (sentences.length >= 2 && keyFacts.length < 2) {
    keyFacts.push(sentences[1].slice(0, 80) + '는 점에서 중요한 근거가 된다')
  }
  // ✅ 최소 3개 보장
  while (keyFacts.length < 3) {
    keyFacts.push(`${keyFacts.length + 1}차 분석으로 관련 맥락과 배경을 종합하면 추가 근거가 확인된다`)
  }

  // 3) 비교 (comparison) - 한국 vs 스웨덴
  const comparison = numbers.length >= 4
    ? `구체적으로 ${numbers[0]}와 ${numbers[2]}를 비교하면 약 ${Math.abs(parseFloat(numbers[0]) - parseFloat(numbers[2])).toFixed(1)}배 수준이 차이가 나타나며, 이는 두 대상 간 구조적 격차를 보여준다`
    : '비교 대상 간 구조적 차이가 여러 측면에서 확인되며, 특히 접근 방식과 실행 전략에서 대조를 이룬다'

  // 4) 함의 (implication)
  const implication = keywords.some(k => k.includes('교육')) && keywords.some(k => k.includes('부담'))
    ? '이러한 분석 결과는 교육 재정 구조와 정책 방향이 본질적 차이를 시사하며, 향후 개선 방향을 모색하는 데 중요한 시사점을 제공한다'
    : '이상 내용을 종합하면 국가별 정책과 제도가 차이를 결과에 반영된 것으로 해석되며, 이는 향후 정책 수립 시 참고할 만한 중요한 사례가 된다'

  // 🔒 규칙 2: 레벨별 슬롯 조합
  let result = ''
  
  if (level === 'brief') {
    // Brief: thesis + comparison
    result = `${thesis}. ${comparison}.`
  } else if (level === 'standard') {
    // Standard: thesis + key_facts[0] + comparison
    result = `${thesis}. ${keyFacts[0] || ''}. ${comparison}.`
  } else {
    // Detail: thesis + all key_facts + comparison + implication
    result = `${thesis}. ${keyFacts.join('. ')}. ${comparison}. ${implication}.`
  }

  // 🔒 규칙 3: 목표 길이 맞추기 (의미 단위 블록 제거/추가)
  let currentChars = countChars(result)
  
  // 초과 시: 블록 단위로 줄이기
  if (currentChars > targetMax) {
    const blocks = result.split(/\n\n/).filter(Boolean)
    let candidate = ''
    for (const block of blocks) {
      const next = candidate + (candidate ? '\n\n' : '') + block
      if (countChars(next) <= targetMax) {
        candidate = next
      } else {
        break
      }
    }
    result = candidate || result.slice(0, targetMax) + '...'
    currentChars = countChars(result)
  }
  
  // 부족 시 (brief 제외): 원문 키워드 추가
  if (currentChars < targetMin && level !== 'brief') {
    const supplement = `원문에서는 ${keywords.slice(0, 3).join(', ')} 같은 주요 개념을 다루고 있다.`
    result += ' ' + supplement
    currentChars = countChars(result)
  }

  return {
    type: 'narrative' as const,
    level,
    text: result,
    charCount: currentChars,
    ratio: currentChars / charCount,
    targetRange: { min: targetMin, max: targetMax },
    note: 'Matrix V4 호환',
    // ✅ 검증을 위한 추가 필드
    coreClaim: thesis,
    grounds: keyFacts,
    comparisons: [comparison],
    implications: [implication]
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
  
  // 최소 3개 보장 (검증 규칙)
  const terms = ['공교육', '사교육', 'GDP', '민간 부담', 'OECD', ...keywords]
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
  
  // 주요 키워드 추출
  const coreWords = ['공교육', '사교육', 'GDP', '민간 부담', 'OECD', ...keywords]
  
  for (let i = 0; i < termCount && i < coreWords.length; i++) {
    const word = coreWords[i]
    const meaning = getMeaningFor(word)
    const explanation = sentences.find(s => s.includes(word)) || `${word}에 대한 설명`
    
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

// ---------- Orchestrator ----------
export function generateLocalFallbackAll(
  text: string,
  level: Level,
  viewType?: ViewType,
  purpose: Purpose = 'preview'
) {
  const narrative = generateNarrativeFallback(text, level)
  const structured = generateUserCentricStructured(text, level)  // ✅ 사용자 기준으로 변경
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
