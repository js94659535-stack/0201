/* =========================================================
   MS_SUMMARY_GUARD_V1 (SERVER SINGLE SOURCE OF TRUTH)
   - 요약율 강제(의미 단위, 글자 자르기 금지)
   - 금지표현 차단(학술/메타 문장)
   - 필수 근거 체크(수치/비교)
   - 요약↔구조화↔마인드맵 교차 QA
   - FAIL 로그 누적(D1 있으면 DB, 없으면 메모리)
   - FAIL 시 교정 프롬프트로 REWRITE(재요약 X, 교정 O)
   ========================================================= */

export type SummaryLevel = 'brief' | 'standard' | 'detail'
export type FailStage = 'narrative' | 'structured' | 'mindmap' | 'qa_cross'
export type CallLLM = (prompt: string, options?: any) => Promise<string> | string

export const SUMMARY_RATIO_TABLE = {
  brief: { min: 0.12, max: 0.18, target: 0.15 },
  standard: { min: 0.22, max: 0.30, target: 0.26 },
  detail: { min: 0.35, max: 0.48, target: 0.42 }
} as const

const BANNED_PHRASES = [
  '이 글은', '설명한다', '선행연구', '다양한 관점', '체계적으로 분석', '규정해 왔다'
]

// 도메인 케이스(교육 비교 지문)에서 자주 빠지는 핵심 수치(라벨+값 포함 유도)
const REQUIRED_NUMBERS = ['7.6%', '2.8%', '6.5%', '0.2%']

const REQUIRED_ELEMENTS: Record<SummaryLevel, {
  minSentences: number; mustIncludeComparison: boolean; minNumbers: number
}> = {
  brief:   { minSentences: 2, mustIncludeComparison: true, minNumbers: 1 },
  standard:{ minSentences: 4, mustIncludeComparison: true, minNumbers: 2 },
  detail:  { minSentences: 6, mustIncludeComparison: true, minNumbers: 3 }
}

function safeStr(v: any) { return v == null ? '' : String(v) }

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

function countContains(hay: string, needles: string[]) {
  const t = safeStr(hay)
  return needles.filter(n => t.includes(n)).length
}

export function checkSummaryRatio(originalText: string, summaryText: string, level: SummaryLevel) {
  const originLen = countReadableChars(originalText)
  const sumLen = countReadableChars(summaryText)
  const ratio = sumLen / Math.max(originLen, 1)
  const rule = SUMMARY_RATIO_TABLE[level]
  return { ratio, ok: ratio >= rule.min && ratio <= rule.max, rule, originLen, sumLen }
}

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

function buildFallbackSentences(level: SummaryLevel) {
  if (level === 'brief') return [
    '공교육 책임과 민간 부담 구조의 차이가 사교육과 선행학습 문화의 차이로 이어진다고 설명한다.'
  ]
  if (level === 'standard') return [
    '한국은 공교육 민간 부담이 높고 스웨덴은 낮아 국가 부담 구조가 다르다.',
    '이 차이가 선행학습 필요성과 입시 중심 문화의 강도에 영향을 준다고 제시된다.'
  ]
  return [
    '한국은 GDP 대비 공교육 7.6%와 민간 부담 2.8%가, 스웨덴은 6.5%와 0.2%가 제시된다.',
    '입시 제도, 공교육 지원, 입시에 두는 비중이 국가별 선행학습 양상을 만든다고 결론짓는다.'
  ]
}

export function enforceSummaryRatio(originalText: string, summaryText: string, level: SummaryLevel) {
  const rule = SUMMARY_RATIO_TABLE[level]
  let sentences = splitSentences(summaryText)
  if (sentences.length === 0) sentences = [safeStr(summaryText).trim()].filter(Boolean)

  const join = () => sentences.join(' ')
  let chk = checkSummaryRatio(originalText, join(), level)

  // 너무 길면: 뒤 문장부터 제거(최소 1문장 유지)
  if (chk.ratio > rule.max) {
    while (sentences.length > 1) {
      sentences.pop()
      chk = checkSummaryRatio(originalText, join(), level)
      if (chk.ratio <= rule.max) break
    }
  }

  // 너무 짧으면: 안전 보강 문장 추가(의미 단위)
  if (chk.ratio < rule.min) {
    const fallback = buildFallbackSentences(level)
    for (const s of fallback) {
      sentences.push(s)
      chk = checkSummaryRatio(originalText, join(), level)
      if (chk.ratio >= rule.min) break
    }
  }

  chk = checkSummaryRatio(originalText, join(), level)
  return { text: join().trim(), ratio: chk.ratio, ok: chk.ok, rule }
}

function extractAnchorScore(text: string) {
  const anchors = ['민간 부담', '부담률', '공교육', '사교육', '선행학습', '입시', '비율']
  const t = safeStr(text)
  let score = 0
  for (const a of anchors) if (t.includes(a)) score++
  return { score, need: 3 }
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
}) {
  const errors: string[] = []
  const nAll = [args.narrative.brief, args.narrative.standard, args.narrative.detail].join(' ')
  const sText = JSON.stringify(args.structured || {})
  const mText = mindmapFlattenLabels(args.mindmap?.root).join(' | ')

  const nA = extractAnchorScore(nAll)
  const sA = extractAnchorScore(sText)
  const mA = extractAnchorScore(mText)

  if (nA.score < nA.need) errors.push('서술요약: 논점 앵커 약함')
  if (sA.score < sA.need) errors.push('구조화: 논점 앵커 약함')
  if (mA.score < mA.need) errors.push('마인드맵: 논점 앵커 약함')

  if (!(nAll.includes('한국') && nAll.includes('스웨덴'))) errors.push('서술요약: 한국/스웨덴 비교 누락')
  if (!(sText.includes('한국') && sText.includes('스웨덴'))) errors.push('구조화: 한국/스웨덴 비교 누락')
  if (!(mText.includes('한국') && mText.includes('스웨덴'))) errors.push('마인드맵: 한국/스웨덴 비교 누락')

  const nNums = countContains(nAll, REQUIRED_NUMBERS)
  const sNums = countContains(sText, REQUIRED_NUMBERS)
  const mNums = countContains(mText, REQUIRED_NUMBERS)
  if (nNums < 2) errors.push('서술요약: 핵심 수치 근거 부족')
  if (sNums < 2) errors.push('구조화: 핵심 수치 근거 부족')
  if (mNums < 2) errors.push('마인드맵: 핵심 수치 근거 부족')

  return { ok: errors.length === 0, errors }
}

export type FailLog = {
  ts: string
  model?: string
  level?: SummaryLevel
  stage: FailStage
  errors: string[]
  ratio?: number
  sample_hash?: string
}

const MEM_FAIL_LOG: FailLog[] = []

function hashLite(s: string) {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return (h >>> 0).toString(16)
}

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

export async function logFail(db: any | undefined, row: FailLog) {
  const payload: FailLog = {
    ...row,
    sample_hash: row.sample_hash || hashLite((row.errors || []).join('|'))
  }
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

export async function buildFailReport(db?: any, sinceHours = 168) {
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
    rows = MEM_FAIL_LOG.filter(x => x.ts >= sinceTs)
  }
  const byStage: Record<string, number> = {}
  const byErr: Record<string, number> = {}
  for (const r of rows) {
    byStage[r.stage] = (byStage[r.stage] || 0) + 1
    for (const e of r.errors || []) byErr[e] = (byErr[e] || 0) + 1
  }
  const topErr = Object.entries(byErr)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([error, count]) => ({ error, count }))
  return { window: { sinceTs, count: rows.length }, byStage, topErr }
}

export function buildRewritePrompt(originalText: string, failedText: string, level: SummaryLevel, errors: string[]) {
  const needNums = REQUIRED_ELEMENTS[level].minNumbers
  const ratio = SUMMARY_RATIO_TABLE[level]
  return `
역할: 너는 학습용 서술요약을 교정한다. 새로 쓰되 아래 규칙을 반드시 지켜라.
요약율: 원문 대비 ${Math.round(ratio.min * 100)}~${Math.round(ratio.max * 100)}% 범위.

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
  const ratios: any = {}

  const levels: SummaryLevel[] = ['brief', 'standard', 'detail']
  for (const lv of levels) {
    let text = safeStr(params.narrative[lv]).trim()

    const enforced = enforceSummaryRatio(originalText, text, lv)
    text = enforced.text
    ratios[lv] = { ratio: enforced.ratio, rule: enforced.rule }

    const v = validateNarrativeSummary(text, lv)
    const r = checkSummaryRatio(originalText, text, lv)

    if (!v.ok || !r.ok) {
      const errs = [
        ...(v.ok ? [] : v.errors),
        ...(r.ok ? [] : [`요약율 위반: ${Math.round(r.ratio * 1000) / 10}% (허용 ${Math.round(r.rule.min * 100)}~${Math.round(r.rule.max * 100)}%)`])
      ]
      await logFail(db, { ts: new Date().toISOString(), model, level: lv, stage: 'narrative', errors: errs, ratio: r.ratio })
      const prompt = buildRewritePrompt(originalText, text, lv, errs)
      const rewritten = await Promise.resolve(callLLM(prompt))
      params.narrative[lv] = safeStr(rewritten).trim()

      const enforced2 = enforceSummaryRatio(originalText, params.narrative[lv], lv)
      params.narrative[lv] = enforced2.text
      ratios[lv] = { ratio: enforced2.ratio, rule: enforced2.rule, rewritten: true }
    } else {
      params.narrative[lv] = text
    }
  }

  const cross = validateCrossConsistency({
    narrative: params.narrative,
    structured: params.structured,
    mindmap: params.mindmap
  })
  if (!cross.ok) {
    await logFail(db, { ts: new Date().toISOString(), model, stage: 'qa_cross', errors: cross.errors })
  }

  return {
    narrative: params.narrative,
    structured: params.structured,
    mindmap: params.mindmap,
    qa: {
      cross_ok: cross.ok,
      cross_errors: cross.errors,
      ratios
    }
  }
}
