/* =========================================================
   MS_SUMMARY_GUARD_V1 (ONE-BLOCK PATCH)
   목적:
   ① 젠스 프롬프트 사전 교정(요약율/금지표현/필수근거/논점 앵커)
   ② FAIL 로그 누적 + 모델 성향 리포트 생성(간단한 집계)
   ③ 요약→구조화→마인드맵 '논점 일치' QA + 자동 REWRITE
   사용:
   - generateDetail/Structured/Mindmap 호출 전 "build*" 프롬프트 사용
   - 결과 생성 후 "qualityGateAll()"로 검증 + 필요 시 rewrite
   - 실패/재작성은 logFail()로 D1 또는 메모리 저장
   ========================================================= */

type SummaryLevel = 'brief' | 'standard' | 'detail'

export const SUMMARY_RATIO_TABLE = {
  brief: { min: 0.12, max: 0.18, target: 0.15 },
  standard: { min: 0.22, max: 0.30, target: 0.26 },
  detail: { min: 0.35, max: 0.48, target: 0.42 }
} as const

const BANNED_PHRASES = [
  '이 글은', '설명한다', '선행연구', '다양한 관점', '체계적으로 분석', '규정해 왔다'
]

// 이 글(교육 비교) 같은 유형에서 핵심 근거(수치/라벨) 유실을 막기 위한 기본 장치
const REQUIRED_NUMBERS = ['7.6%', '2.8%', '6.5%', '0.2%']

const REQUIRED_ELEMENTS: Record<SummaryLevel, {
  minSentences: number
  mustIncludeComparison: boolean
  minNumbers: number
}> = {
  brief:   { minSentences: 2, mustIncludeComparison: true, minNumbers: 1 },
  standard:{ minSentences: 4, mustIncludeComparison: true, minNumbers: 2 },
  detail:  { minSentences: 6, mustIncludeComparison: true, minNumbers: 3 }
}

function safeStr(v: any) { return v == null ? '' : String(v) }

// 한글 독해 길이(공백/기호 제거) 기준
export function countReadableChars(text: string): number {
  return safeStr(text)
    .replace(/\s+/g, '')
    .replace(/[^\p{L}\p{N}%]/gu, '')
    .length
}

function splitSentences(text: string): string[] {
  return safeStr(text)
    .split(/(?<=[.!?]|다\.)\s+/)
    .map(s => s.trim())
    .filter(Boolean)
}

export function checkSummaryRatio(originalText: string, summaryText: string, level: SummaryLevel) {
  const originLen = countReadableChars(originalText)
  const sumLen = countReadableChars(summaryText)
  const ratio = sumLen / Math.max(originLen, 1)
  const rule = SUMMARY_RATIO_TABLE[level]
  return { ratio, ok: ratio >= rule.min && ratio <= rule.max, rule }
}

function containsAny(hay: string, needles: string[]) {
  const t = safeStr(hay)
  return needles.some(n => t.includes(n))
}

function countContains(hay: string, needles: string[]) {
  const t = safeStr(hay)
  return needles.filter(n => t.includes(n)).length
}

/* ---------------------------------------------------------
   1) 젠스 프롬프트 사전 교정(모델이 '학술 초록 말투'로 흐르는 것 방지)
   - 핵심: 논점 앵커(thesisAnchor) + 필수 근거 규칙 + 금지표현 강제
--------------------------------------------------------- */

export function buildDetailNarrativePrompt(inputText: string, thesisAnchor?: string) {
  const anchor = thesisAnchor || '국가의 공교육 책임 수준(특히 민간 부담 구조)이 사교육·선행학습 문화에 영향을 준다'
  const ratio = SUMMARY_RATIO_TABLE.detail

  return `
역할: 너는 초·중·고 학습자를 위한 '서술요약 생성 엔진'이다.
목표: 원문을 이해한 뒤 '상세(detail) 서술요약'만 생성한다.
요약율: 원문 대비 ${Math.round(ratio.min*100)}~${Math.round(ratio.max*100)}% 범위(의미 단위 압축, 글자 자르기 금지).

절대 금지:
- "${BANNED_PHRASES.join('", "')}" 같은 메타/학술 표현
- "이 글은 ~" "선행연구에서는 ~" 식의 논문 말투

필수 규칙:
① 첫 문장은 중심 논점(논점 앵커)을 포함한다.
  - 논점 앵커(반드시 포함): "${anchor}"
② 한국과 스웨덴 비교 문장을 최소 1개 포함한다.
③ 숫자/퍼센트는 단독으로 쓰지 말고 반드시 '라벨(무엇의 수치)'을 붙인다.
④ 아래 수치 중 최소 3개를 포함한다: ${REQUIRED_NUMBERS.join(', ')}
⑤ 문장은 짧고 명확하게(한 문장 1주장).

출력 형식:
- 자연스러운 한국어 문단 1개(줄바꿈 1~2회 허용)
- JSON/목차/번호 매기기 금지

원문:
"""${inputText}"""
`.trim()
}

export function buildStructuredPrompt(inputText: string, unitTitle: string, thesisAnchor?: string) {
  const anchor = thesisAnchor || '국가의 공교육 책임 수준(특히 민간 부담 구조)이 사교육·선행학습 문화에 영향을 준다'

  return `
역할: 너는 '학습 단위 중심 구조화 엔진'이다(초·중·고 대상).
구조화의 본질: 교과서 위계를 복사하지 말고 학습자가 공부해야 하는 최소 범위로 재조립한다.

반드시 지킬 5요소:
[학습 단위] -> ① 단원 위계 정보(메타) ② 소제목(조목화) ③ 각 단락 핵심어 ④ 개념·용어(OO: ~~~) ⑤(선택) 연결·확장 개념

필수 규칙:
① 중심 논점 앵커를 '학습 단위 요약'에 포함:
- "${anchor}"
② 키워드는 조사/형식어(예: "의", "경우", "등") 금지. 의미 단위만.
③ 수치가 있는 글이면 수치를 라벨과 함께 정리(예: "한국 민간 부담률 2.8%").
④ 결과는 아래 JSON 스키마를 정확히 따른다.

출력 JSON 스키마:
{
  "learning_unit": { "title": "...", "scope": "..." , "hierarchy_info": { "big_unit_meta": "...", "mid_unit_meta": "...", "sub_unit_meta": "..." }, "thesis_anchor": "..." },
  "toc": ["..."],
  "outline": [
    { "id": "A", "title": "...", "keypoints": [ { "core_word": "...", "meaning_2_5": "...", "explain": "..." } ], "numbers": [ { "who":"...", "what":"...", "value":"..." } ] }
  ],
  "glossary": [ { "term":"...", "definition":"...", "note":"..." } ],
  "connections_optional": [ { "concept":"...", "link":"..." } ]
}

학습 단위 제목:
"${unitTitle}"

원문:
"""${inputText}"""
`.trim()
}

export function buildMindmapPrompt(inputText: string, thesisAnchor?: string) {
  const anchor = thesisAnchor || '국가의 공교육 책임 수준(특히 민간 부담 구조)이 사교육·선행학습 문화에 영향을 준다'
  return `
역할: 너는 '학습 마인드맵 데이터 생성 엔진'이다(초·중·고 대상).
중심축: 루트 노드는 반드시 논점 앵커를 담는다.
- 루트(반드시 포함): "${anchor}"

아코디언 요구:
- 각 노드에 "collapsed": true/false를 포함한다.
- 1레벨 자식은 collapsed=false
- 2레벨 이하는 기본 collapsed=true (학습자가 펼치며 학습)

금지:
- 단어 조각(줄바꿈으로 찢어진 토큰) 나열
- 조사/형식어를 노드로 쓰기

필수:
- 한국 vs 스웨덴 비교 브랜치를 최소 1개 포함
- 수치 노드는 라벨+값 형태로 포함(예: "한국 민간 부담률: 2.8%")

출력 JSON 스키마:
{
  "root": {
    "id":"root",
    "label":"...",
    "collapsed": false,
    "children":[
      { "id":"n1", "label":"...", "collapsed": false, "children":[ ... ] }
    ]
  }
}

원문:
"""${inputText}"""
`.trim()
}

/* ---------------------------------------------------------
   2) FAIL 로그 누적 + 모델 성향 리포트(간단 집계)
   - D1 사용 가능하면 DB에 저장, 아니면 메모리 Map에 저장
--------------------------------------------------------- */

type FailLog = {
  ts: string
  model?: string
  level?: SummaryLevel
  stage: 'narrative' | 'structured' | 'mindmap' | 'qa_cross'
  errors: string[]
  ratio?: number
  sample_hash?: string
}

const MEM_FAIL_LOG: FailLog[] = []

export async function ensureFailLogTable(db?: any) {
  if (!db) return
  await db.prepare(`
    CREATE TABLE IF NOT EXISTS ms_fail_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ts TEXT NOT NULL,
      model TEXT,
      level TEXT,
      stage TEXT NOT NULL,
      errors TEXT NOT NULL,
      ratio REAL,
      sample_hash TEXT
    )
  `).run()
}

function hashLite(s: string) {
  // 가벼운 해시(중복집계용)
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return (h >>> 0).toString(16)
}

export async function logFail(db: any | undefined, row: FailLog) {
  const payload: FailLog = { ...row, sample_hash: row.sample_hash || hashLite((row.errors || []).join('|')) }
  MEM_FAIL_LOG.push(payload)

  if (!db) return
  await ensureFailLogTable(db)
  await db.prepare(`
    INSERT INTO ms_fail_logs (ts, model, level, stage, errors, ratio, sample_hash)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).bind(
    payload.ts,
    payload.model || null,
    payload.level || null,
    payload.stage,
    JSON.stringify(payload.errors || []),
    payload.ratio ?? null,
    payload.sample_hash || null
  ).run()
}

export async function buildFailReport(db?: any, opts?: { sinceHours?: number }) {
  const sinceHours = opts?.sinceHours ?? 168 // 7 days
  const sinceTs = new Date(Date.now() - sinceHours * 3600_000).toISOString()

  let rows: FailLog[] = []
  if (db) {
    await ensureFailLogTable(db)
    const r = await db.prepare(`
      SELECT ts, model, level, stage, errors, ratio, sample_hash
      FROM ms_fail_logs
      WHERE ts >= ?
      ORDER BY ts DESC
      LIMIT 500
    `).bind(sinceTs).all()

    rows = (r?.results || []).map((x: any) => ({
      ts: x.ts,
      model: x.model,
      level: x.level,
      stage: x.stage,
      errors: JSON.parse(x.errors || '[]'),
      ratio: x.ratio,
      sample_hash: x.sample_hash
    }))
  } else {
    rows = MEM_FAIL_LOG.filter(x => x.ts >= sinceTs).slice().reverse()
  }

  // 집계
  const byStage: Record<string, number> = {}
  const byErr: Record<string, number> = {}
  for (const r of rows) {
    byStage[r.stage] = (byStage[r.stage] || 0) + 1
    for (const e of r.errors || []) byErr[e] = (byErr[e] || 0) + 1
  }

  // 상위 에러 10개
  const topErr = Object.entries(byErr)
    .sort((a,b) => b[1]-a[1])
    .slice(0, 10)
    .map(([k,v]) => ({ error: k, count: v }))

  return {
    window: { sinceTs, count: rows.length },
    byStage,
    topErr,
    notes: [
      '상위 에러가 "금지 표현"에 몰리면: 프롬프트/리라이트 금지어 강화가 우선',
      '상위 에러가 "수치 부족"이면: numbers 최소 포함 규칙을 강화',
      '상위 에러가 "논점 앵커 불일치"면: 구조화/마인드맵도 앵커를 강제'
    ]
  }
}

/* ---------------------------------------------------------
   3) 논점 일치 QA(요약 ↔ 구조화 ↔ 마인드맵)
   - 핵심: thesisAnchor(논점 앵커) + 한국/스웨덴 비교 + 수치 근거
--------------------------------------------------------- */

export function validateNarrativeSummary(summaryText: string, level: SummaryLevel) {
  const errors: string[] = []
  const rules = REQUIRED_ELEMENTS[level]
  const t = safeStr(summaryText)

  for (const p of BANNED_PHRASES) if (t.includes(p)) errors.push(`금지 표현 포함: "${p}"`)

  const sentences = splitSentences(t)
  if (sentences.length < rules.minSentences) errors.push(`문장 수 부족: ${sentences.length}/${rules.minSentences}`)

  if (rules.mustIncludeComparison) {
    if (!(t.includes('한국') && t.includes('스웨덴'))) errors.push('한국/스웨덴 비교 요소 누락')
  }

  const foundNums = countContains(t, REQUIRED_NUMBERS)
  if (foundNums < rules.minNumbers) errors.push(`핵심 수치 부족: ${foundNums}/${rules.minNumbers}`)

  return { ok: errors.length === 0, errors }
}

function extractAnchorFromText(text: string, dynamicAnchors?: string[]) {
  // 동적 앵커 우선 사용 (detail.narrative에서 추출된 키워드)
  // 없으면 기본 앵커 사용 (하위 호환)
  const anchorCandidates = dynamicAnchors || [
    '민간 부담',
    '공교육 책임',
    '사교육',
    '선행학습',
    '입시'
  ]
  const t = safeStr(text)
  let score = 0
  for (const c of anchorCandidates) if (t.includes(c)) score++
  // 동적 앵커 사용 시 임계값 낮춤 (최소 2개)
  const need = dynamicAnchors ? Math.min(2, dynamicAnchors.length) : 3
  return { score, need }
}

function mindmapFlattenLabels(root: any): string[] {
  const out: string[] = []
  const walk = (n: any) => {
    if (!n) return
    if (typeof n.label === 'string') out.push(n.label)
    const kids = Array.isArray(n.children) ? n.children : []
    for (const k of kids) walk(k)
  }
  walk(root)
  return out
}

export function validateCrossConsistency(args: {
  narrative: { brief: string; standard: string; detail: string }
  structured: any
  mindmap: any
  detailSlots?: { coreClaim?: string; grounds?: string[]; comparisons?: string[]; implications?: string[] }
}) {
  const errors: string[] = []

  const sText = JSON.stringify(args.structured || {})
  const mLabels = mindmapFlattenLabels(args.mindmap?.root).join(' | ')
  const nAll = [args.narrative.brief, args.narrative.standard, args.narrative.detail].join(' ')

  // 동적 앵커 추출 (detailSlots에서)
  let dynamicAnchors: string[] = []
  if (args.detailSlots) {
    const { coreClaim, grounds, comparisons, implications } = args.detailSlots
    // coreClaim과 grounds에서 명사구 추출 (간단한 키워드 추출)
    const allSlotText = [
      coreClaim || '',
      ...(grounds || []),
      ...(comparisons || []),
      ...(implications || [])
    ].join(' ')
    
    // 2-5글자 명사구 추출 (간단한 패턴: 한글 2-5자 연속)
    const matches = allSlotText.match(/[\uAC00-\uD7AF]{2,5}/g) || []
    // 빈도수 기준 상위 5개 추출
    const freq: Record<string, number> = {}
    for (const m of matches) {
      freq[m] = (freq[m] || 0) + 1
    }
    dynamicAnchors = Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([word]) => word)
  }

  // ① 앵커(핵심 개념군) 최소 포함
  const nAnchor = extractAnchorFromText(nAll, dynamicAnchors.length > 0 ? dynamicAnchors : undefined)
  const sAnchor = extractAnchorFromText(sText, dynamicAnchors.length > 0 ? dynamicAnchors : undefined)
  const mAnchor = extractAnchorFromText(mLabels, dynamicAnchors.length > 0 ? dynamicAnchors : undefined)

  // 앵커 검사 완화: 동적 앵커 사용 시 임계값을 낮춤
  if (nAnchor.score < nAnchor.need) {
    if (dynamicAnchors.length > 0 && nAnchor.score >= 1) {
      // 동적 앵커에서 1개 이상 발견되면 경고만
      // errors.push('서술요약: 논점 앵커 약함 (경고)')
    } else {
      errors.push('서술요약: 논점 앵커(핵심 개념군) 약함')
    }
  }
  if (sAnchor.score < sAnchor.need) {
    if (dynamicAnchors.length > 0 && sAnchor.score >= 1) {
      // errors.push('구조화: 논점 앵커 약함 (경고)')
    } else {
      errors.push('구조화: 논점 앵커(핵심 개념군) 약함')
    }
  }
  if (mAnchor.score < mAnchor.need) {
    if (dynamicAnchors.length > 0 && mAnchor.score >= 1) {
      // errors.push('마인드맵: 논점 앵커 약함 (경고)')
    } else {
      errors.push('마인드맵: 논점 앵커(핵심 개념군) 약함')
    }
  }

  // ② 비교 요소 존재 (동적 앵커가 있으면 유연하게 체크)
  if (dynamicAnchors.length > 0) {
    // 동적 앵커 사용 시: 비교 슬롯에서 국가/개체명 추출하여 검증
    const comparisonText = (args.detailSlots?.comparisons || []).join(' ')
    const entities = comparisonText.match(/[가-힣]{2,4}/g) || []
    const uniqueEntities = Array.from(new Set(entities))
    
    // 최소 2개의 서로 다른 개체가 있어야 비교로 인정
    if (uniqueEntities.length < 2) {
      errors.push('서술요약: 비교 요소 부족 (최소 2개 필요)')
    } else {
      // 서술요약/구조화/마인드맵에 각각 비교 개체가 포함되어 있는지 확인
      const entity1 = uniqueEntities[0]
      const entity2 = uniqueEntities[1]
      
      if (!(nAll.includes(entity1) && nAll.includes(entity2))) {
        errors.push(`서술요약: ${entity1}/${entity2} 비교 누락`)
      }
      if (!(sText.includes(entity1) && sText.includes(entity2))) {
        errors.push(`구조화: ${entity1}/${entity2} 비교 누락`)
      }
      if (!(mLabels.includes(entity1) && mLabels.includes(entity2))) {
        errors.push(`마인드맵: ${entity1}/${entity2} 비교 누락`)
      }
    }
  } else {
    // 기본 앵커 사용 시: 한국/스웨덴 하드코딩 체크 (하위 호환)
    if (!(nAll.includes('한국') && nAll.includes('스웨덴'))) errors.push('서술요약: 한국/스웨덴 비교 누락')
    if (!(sText.includes('한국') && sText.includes('스웨덴'))) errors.push('구조화: 한국/스웨덴 비교 누락')
    if (!(mLabels.includes('한국') && mLabels.includes('스웨덴'))) errors.push('마인드맵: 한국/스웨덴 비교 누락')
  }

  // ③ 수치 근거(최소 2개는 구조화/마인드맵에 있어야 학습 근거가 선명)
  // 동적 수치 추출: 원문에서 %나 숫자를 포함한 패턴 찾기
  const extractNumbers = (text: string): string[] => {
    const patterns = [
      /\d+\.?\d*%/g,           // 7.6%, 2.8% 등
      /\d+억/g,                // 100억 등
      /\d+만/g,                // 1만 등
      /\d{4}년/g,              // 2024년 등
      /\d+(?:배|회|개|명|건)/g // 2배, 3회 등
    ]
    const matches = new Set<string>()
    for (const pattern of patterns) {
      const found = text.match(pattern)
      if (found) found.forEach(m => matches.add(m))
    }
    return Array.from(matches)
  }
  
  // detailSlots의 모든 텍스트에서 수치 추출
  let requiredNumbers = REQUIRED_NUMBERS // 기본값
  if (args.detailSlots) {
    const allSlotText = [
      args.detailSlots.coreClaim || '',
      ...(args.detailSlots.grounds || []),
      ...(args.detailSlots.comparisons || []),
      ...(args.detailSlots.implications || [])
    ].join(' ')
    const extracted = extractNumbers(allSlotText)
    if (extracted.length >= 2) {
      requiredNumbers = extracted // 추출된 수치가 2개 이상이면 사용
    }
  }
  
  const nNums = countContains(nAll, requiredNumbers)
  const sNums = countContains(sText, requiredNumbers)
  const mNums = countContains(mLabels, requiredNumbers)

  // 수치 검증 완화: 동적 수치 사용 시 최소 1개만 요구
  const minRequired = (args.detailSlots && requiredNumbers.length >= 2) ? 1 : 2
  
  if (nNums < minRequired) errors.push(`서술요약: 핵심 수치 근거 부족 (${nNums}/${minRequired})`)
  if (sNums < minRequired) errors.push(`구조화: 핵심 수치 근거 부족 (${sNums}/${minRequired})`)
  if (mNums < minRequired) errors.push(`마인드맵: 핵심 수치 근거 부족 (${mNums}/${minRequired})`)

  return { ok: errors.length === 0, errors }
}

/* ---------------------------------------------------------
   4) 자동 REWRITE (FAIL 시 교정 프롬프트로만 재작성)
--------------------------------------------------------- */

export function buildRewritePrompt(originalText: string, failedText: string, level: SummaryLevel, errors: string[]) {
  const needNums = REQUIRED_ELEMENTS[level].minNumbers
  const ratio = SUMMARY_RATIO_TABLE[level]

  return `
역할: 너는 학습용 서술요약을 '교정'한다. 새로 쓰되, 아래 규칙을 반드시 지켜라.
요약율: 원문 대비 ${Math.round(ratio.min*100)}~${Math.round(ratio.max*100)}% 범위.

위반 사유:
${errors.map(e => `- ${e}`).join('\n')}

교정 규칙:
① 금지 표현("${BANNED_PHRASES.join('", "')}")을 절대 쓰지 마라.
② 한국과 스웨덴을 반드시 비교하라(한 문장 이상).
③ 아래 수치 중 최소 ${needNums}개를 포함하라: ${REQUIRED_NUMBERS.join(', ')}
   - 숫자는 반드시 라벨을 붙여라(예: "한국 민간 부담률 2.8%").
④ 문장은 짧게, 한 문장 한 주장.
⑤ 연구 논문 말투 금지, 교과 독해 말투로 작성.

원문:
"""${originalText}"""

실패한 요약:
"""${failedText}"""

출력:
${level} 단계 서술요약 문단만 출력하라.
`.trim()
}

/* ---------------------------------------------------------
   5) 통합 게이트: 요약율 + 금지표현 + 필수근거 + 교차 QA
   - callLLM은 프로젝트에 있는 함수로 연결하세요(window.callEngineAPI 등)
--------------------------------------------------------- */

type CallLLM = (prompt: string, options?: any) => Promise<string> | string

export async function qualityGateAll(params: {
  originalText: string
  model?: string
  callLLM: CallLLM
  db?: any
  narrative: { brief: string; standard: string; detail: string }
  structured: any
  mindmap: any
}) {
  const { originalText, model, callLLM, db } = params

  // ① 단계별 서술요약 검증 + 요약율 검증 + REWRITE
  const levels: SummaryLevel[] = ['brief', 'standard', 'detail']
  for (const lv of levels) {
    const before = safeStr(params.narrative[lv])
    const v = validateNarrativeSummary(before, lv)
    const r = checkSummaryRatio(originalText, before, lv)

    if (!v.ok || !r.ok) {
      const errs = [
        ...(v.ok ? [] : v.errors),
        ...(r.ok ? [] : [`요약율 위반: ${Math.round(r.ratio*1000)/10}% (허용 ${Math.round(r.rule.min*100)}~${Math.round(r.rule.max*100)}%)`])
      ]
      await logFail(db, { ts: new Date().toISOString(), model, level: lv, stage: 'narrative', errors: errs, ratio: r.ratio })
      const prompt = buildRewritePrompt(originalText, before, lv, errs)
      const after = await Promise.resolve(callLLM(prompt))
      params.narrative[lv] = safeStr(after).trim()
    }
  }

  // ② 교차 논점 QA(요약↔구조화↔마인드맵)
  const cross = validateCrossConsistency({
    narrative: params.narrative,
    structured: params.structured,
    mindmap: params.mindmap
  })

  if (!cross.ok) {
    await logFail(db, { ts: new Date().toISOString(), model, stage: 'qa_cross', errors: cross.errors })
    // 교차 불일치가 나면, 가장 안전한 재작성은 "상세 서술요약(detail)" 재교정 후 다운샘플 재생성(프로젝트 정책)
    // 여기서는 최소 개입으로: detail만 재작성하도록 안내 프롬프트를 반환
  }

  return {
    narrative: params.narrative,
    structured: params.structured,
    mindmap: params.mindmap,
    cross_ok: cross.ok,
    cross_errors: cross.errors
  }
}
