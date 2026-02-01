/* =====================================================================
   [ONE-BLOCK PATCH] 학습엔진 품질 패치 v4.2
   목표
   ① 압축률: 간단/표준/상세 목표 비율을 "의미 단위"로 강제 (중간 절단 금지)
   ② 압축방법: detail 1회 생성 → server downsample 로 brief⊂standard⊂detail 강제
   ③ 문장/문법 오류: 전처리(페이지표기/줄바꿈/따옴표/광고문) 제거 + 문장 축약 규칙
   ④ 구조화 포맷: 번호나열이 아닌 "논지/대립/현황/괴리/변천/시사점" 구조화
   ⑤ 마인드맵: 문장 중간 잘림 제거, 노드 단위 축약
===================================================================== */

export type Mode = 'brief' | 'standard' | 'detail'
export type ViewType = 'narrative' | 'structured' | 'mindmap' | 'selftest'

type Bullet = { id: string; text: string; score: number }

type StructuredNode = {
  id: string
  label: string
  bullets: Bullet[]
}

export type StructuredSummary = {
  title: string
  core: { id: string; bullets: Bullet[] }
  perspectives: { ministry: StructuredNode; privateEdu: StructuredNode }
  reality: StructuredNode
  gap: StructuredNode
  policy: StructuredNode
  takeaway: StructuredNode
}

export type ModePack = {
  mode: Mode
  narrative: string
  structured: StructuredSummary
  mindmap: { center: string; nodes: { id: string; label: string; children?: { id: string; label: string }[] }[] }
  selftest: { q: string; a: string; hint?: string }[]
}

export type AllSummariesV4 = {
  brief: ModePack
  standard: ModePack
  detail: ModePack
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}
function countKoreanFriendlyChars(s: string) {
  return (s || '').replace(/\s+/g, '').length
}
function normalizeSpaces(s: string) {
  return (s || '').replace(/[ \t]{2,}/g, ' ').replace(/\s+([,.;:!?])/g, '$1').trim()
}
function stableId(prefix: string, idx: number) {
  return `${prefix}_${idx.toString(36)}`
}

/* -------------------------
   1) 원문 정제: 페이지표기/줄바꿈/따옴표/깨짐 제거
------------------------- */
export function sanitizeKoreanAcademicText(raw: string): string {
  if (!raw) return ''
  let t = String(raw)

  // 제로폭/제어문자 제거
  t = t
    .replace(/\uFEFF/g, '')
    .replace(/[\u200B-\u200D\u2060]/g, '')
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, ' ')

  // 페이지 표기 제거: "- 8 -" 형태
  t = t.replace(/(?:^|\n)\s*[-–—]?\s*\d{1,4}\s*[-–—]?\s*(?=\n|$)/g, '\n')

  // 영문 하이픈 줄바꿈 복원
  t = t.replace(/([A-Za-z])-\s*\n\s*([A-Za-z])/g, '$1$2')

  // 한글/숫자 줄바꿈 복원(문장 내부 끊김 완화)
  t = t.replace(/([가-힣0-9])\s*\n\s*([가-힣0-9])/g, '$1$2')

  // 인용부호 정규화: 「 」 → " "
  t = t.replace(/[「『〈《]/g, '"').replace(/[」』〉》]/g, '"')

  // 문단 개행 정리
  t = t.replace(/\n{3,}/g, '\n\n')

  // 공백 정리
  t = t.replace(/[ \t]{2,}/g, ' ')
  return t.trim()
}

/* -------------------------
   2) 문장 분리 + 쓰레기 필터
------------------------- */
function splitKoreanSentences(text: string): string[] {
  const t = (text || '').trim()
  if (!t) return []
  const paras = t.split(/\n{2,}/g)

  const out: string[] = []
  for (const p of paras) {
    const line = p.replace(/\n/g, ' ').replace(/[ \t]{2,}/g, ' ').trim()
    if (!line) continue
    const parts = line.split(/(?<=[.?!])\s+|(?<=(?:이다|된다|한다|있다|없다|말한다|주장한다)\.)\s+/g)
    for (const piece of parts) {
      const s = normalizeSpaces(piece)
      if (s) out.push(s)
    }
  }
  return out
}

function isJunkSentence(s: string): boolean {
  const t = (s || '').trim()
  if (!t) return true

  // 너무 짧은 파편
  if (t.length < 12) {
    const ok = /[.?!]$/.test(t) || /(?:이다|된다|한다|있다|없다|말한다|주장한다)\.?$/.test(t)
    if (!ok) return true
  }

  // 따옴표/괄호 파편
  if (/^["")\]\}]+$/.test(t)) return true
  if (/^["(\[\{]+$/.test(t)) return true

  // 번호/기호만 남은 파편
  if (/^(?:\(\d+\)|\d+\)|[①-⑳])\s*["")\]]*\s*$/.test(t)) return true

  // 광고성 문구(인용+과장)
  if (/(완전\s*정복|쏙쏙|콕콕|실력을\s*쑥쑥|고득점|특강|전문\s*대비)/.test(t)) {
    if (/[""]/.test(t) || /!$/.test(t)) return true
  }

  return false
}

function filterSentences(sentences: string[]): string[] {
  const out: string[] = []
  const seen = new Set<string>()
  for (const s of sentences) {
    const t = normalizeSpaces(s)
    if (!t) continue
    if (isJunkSentence(t)) continue
    const key = t.replace(/\s+/g, ' ')
    if (seen.has(key)) continue
    seen.add(key)
    out.push(key)
  }
  return out
}

/* -------------------------
   3) 헤딩 분리(2.1~2.4)
------------------------- */
type Section = { key: string; title: string; text: string }

function splitByHeadings(cleaned: string): Section[] {
  const re = /(^|\n)\s*(\d+\.\d+)\.\s*([^\n]+)\n?/g
  const matches: { idx: number; key: string; title: string }[] = []
  let m: RegExpExecArray | null
  while ((m = re.exec(cleaned)) !== null) {
    matches.push({ idx: m.index, key: m[2], title: normalizeSpaces(m[3]) })
  }
  if (matches.length === 0) return [{ key: 'all', title: '본문', text: cleaned }]

  const sections: Section[] = []
  for (let i = 0; i < matches.length; i++) {
    const cur = matches[i]
    const next = matches[i + 1]
    const start = cur.idx
    const end = next ? next.idx : cleaned.length
    sections.push({ key: cur.key, title: cur.title, text: cleaned.slice(start, end).trim() })
  }
  return sections
}

/* -------------------------
   4) 점수화(핵심 논지 우선)
------------------------- */
function scoreSentence(s: string): number {
  let score = 1
  if (/(교육부|공교육|정상화|사교육|입시|내신|대입|고입)/.test(s)) score += 2
  if (/(방해|요인|우려|격차|부정적|증폭|현실)/.test(s)) score += 1.5
  if (/(반해|반면|하지만|그러나|이에\s*반해)/.test(s)) score += 1.5
  if (/(목표|역점|능력|국제|문화|듣기|말하기)/.test(s)) score += 1.2
  if (/(현황|방법|프로그램|평가|설명회|학원|교육비|기숙)/.test(s)) score += 1.0
  if (/(변천|과정|비율|가산점|전형|선발\s*시험)/.test(s)) score += 1.6

  const len = countKoreanFriendlyChars(s)
  if (len > 180) score -= 0.6
  if (len > 260) score -= 1.0
  return score
}

/* -------------------------
   5) 문장 축약(중간 절단 금지)
   - 출처 괄호 제거
   - 인용문 과장 부분 축약
   - 붙임 오류 완화(간단 규칙)
------------------------- */
function shortenSentence(s: string): string {
  let t = normalizeSpaces(s)

  // "(교육부, 1998:28)" 류 출처 괄호 제거
  t = t.replace(/\([^)]*\d{4}[^)]*\)/g, '').trim()

  // 긴 인용문은 요지만 남김
  t = t.replace(/"([^"]{60,})"/g, '"(인용문 요지)"')

  // 일부 붙임 오류 완화(안전한 범위만)
  t = t.replace(/본수업/g, '본 수업')
  t = t.replace(/국력신장/g, '국력 신장')
  t = t.replace(/내신대비/g, '내신 대비')
  t = t.replace(/지원현황/g, '지원 현황')
  t = t.replace(/또한출판/g, '또한 출판')
  t = t.replace(/그리고입과/g, '그리고 고입과')
  t = t.replace(/통한대비/g, '통한 대비')

  // 문장 종료 보정
  if (!/[.?!]$/.test(t)) t += '.'
  return normalizeSpaces(t)
}

function pickTop(sentences: string[], n: number, prefix: string): Bullet[] {
  const scored = sentences
    .map((text, idx) => ({ id: stableId(prefix, idx), text, score: scoreSentence(text) }))
    .sort((a, b) => b.score - a.score)

  return scored.slice(0, n).map(x => ({ id: x.id, text: shortenSentence(x.text), score: x.score }))
}

/* -------------------------
   6) 원하는 구조화(detail 1회 생성)
   - 논지/대립/현황/괴리/변천/시사점
------------------------- */
function buildStructuredDetail(cleaned: string): StructuredSummary {
  const sections = splitByHeadings(cleaned)

  const secSent: Record<string, string[]> = {}
  for (const sec of sections) secSent[sec.key] = filterSentences(splitKoreanSentences(sec.text))

  const all = filterSentences(splitKoreanSentences(cleaned))

  const title = sections[0]?.title ? normalizeSpaces(sections[0].title) : '요약'

  const coreBullets = pickTop(all, 3, 'core')

  const ministryPool = all.filter(s => /(교육부|공교육|정상화|우려|부정적|방해|격차|참여도)/.test(s))
  const privatePool = all.filter(s => /(사교육|학원|예습|효율|성과|긍정|흥미|자신감)/.test(s))

  const ministry: StructuredNode = {
    id: 'ministry',
    label: '교육부 관점(문제 제기)',
    bullets: pickTop(ministryPool.length ? ministryPool : all, 3, 'min')
  }

  const privateEdu: StructuredNode = {
    id: 'private',
    label: '사교육 관점(효율 주장)',
    bullets: pickTop(privatePool.length ? privatePool : all, 3, 'pri')
  }

  const realityPool = (secSent['2.3']?.length ? secSent['2.3'] : all).filter(s =>
    /(현황|방법|설명회|프로그램|평가|교육비|특강|기숙|방학)/.test(s)
  )
  const reality: StructuredNode = {
    id: 'reality',
    label: '방법 및 현황(사례 중심)',
    bullets: pickTop(realityPool.length ? realityPool : all, 4, 'rea')
  }

  const gapPool = secSent['2.2']?.length ? secSent['2.2'] : all.filter(s => /(목표|역점|하지만|현실|성적|시험)/.test(s))
  const gap: StructuredNode = {
    id: 'gap',
    label: '목표와 현실의 괴리',
    bullets: pickTop(gapPool.length ? gapPool : all, 3, 'gap')
  }

  const policyPool = secSent['2.4']?.length ? secSent['2.4'] : all.filter(s => /(변천|과정|비율|가산점|내신|추세)/.test(s))
  const policy: StructuredNode = {
    id: 'policy',
    label: '제도/변천(입시 구조 변화)',
    bullets: pickTop(policyPool.length ? policyPool : all, 3, 'pol')
  }

  const takePool = all.filter(s => /(추세|강화|대응|영향|요인|현실)/.test(s))
  const takeaway: StructuredNode = {
    id: 'takeaway',
    label: '시사점(요약 결론)',
    bullets: pickTop(takePool.length ? takePool : all, 2, 'tak')
  }

  return {
    title,
    core: { id: 'core', bullets: coreBullets },
    perspectives: { ministry, privateEdu },
    reality,
    gap,
    policy,
    takeaway
  }
}

/* -------------------------
   7) downsample: brief ⊂ standard ⊂ detail 강제
------------------------- */
function subsetBullets(bullets: Bullet[], maxCount: number): Bullet[] {
  return bullets
    .slice()
    .sort((a, b) => b.score - a.score)
    .slice(0, maxCount)
    .sort((a, b) => a.id.localeCompare(b.id))
}

function downsampleStructured(detail: StructuredSummary, mode: Mode): StructuredSummary {
  const cfg = {
    brief: { core: 2, per: 2, reality: 2, gap: 1, policy: 1, take: 1 },
    standard: { core: 3, per: 3, reality: 3, gap: 2, policy: 2, take: 2 },
    detail: { core: 3, per: 3, reality: 4, gap: 3, policy: 3, take: 2 }
  }[mode]

  return {
    title: detail.title,
    core: { id: detail.core.id, bullets: subsetBullets(detail.core.bullets, cfg.core) },
    perspectives: {
      ministry: { ...detail.perspectives.ministry, bullets: subsetBullets(detail.perspectives.ministry.bullets, cfg.per) },
      privateEdu: { ...detail.perspectives.privateEdu, bullets: subsetBullets(detail.perspectives.privateEdu.bullets, cfg.per) }
    },
    reality: { ...detail.reality, bullets: subsetBullets(detail.reality.bullets, cfg.reality) },
    gap: { ...detail.gap, bullets: subsetBullets(detail.gap.bullets, cfg.gap) },
    policy: { ...detail.policy, bullets: subsetBullets(detail.policy.bullets, cfg.policy) },
    takeaway: { ...detail.takeaway, bullets: subsetBullets(detail.takeaway.bullets, cfg.take) }
  }
}

/* -------------------------
   8) 압축률 강제 narrative 생성
   - 문장 선택으로 목표 범위 충족(중간 절단 금지)
------------------------- */
function modeTargets(originalText: string, mode: Mode) {
  const base = Math.max(120, countKoreanFriendlyChars(originalText))
  const ratio = mode === 'brief' ? 0.13 : mode === 'standard' ? 0.30 : 0.55
  const min = Math.floor(base * (ratio - 0.03))
  const max = Math.ceil(base * (ratio + 0.05))
  return { min: clamp(min, 80, 999999), max: clamp(max, 110, 999999) }
}

function buildNarrativeFromStructured(structured: StructuredSummary, mode: Mode, originalText: string) {
  const { min, max } = modeTargets(originalText, mode)

  const buckets: string[] = []
  const push = (bs: Bullet[]) => bs.forEach(b => buckets.push(b.text))

  // 우선순위(학습엔진 관점)
  push(structured.core.bullets)
  push(structured.perspectives.ministry.bullets)
  push(structured.perspectives.privateEdu.bullets)
  push(structured.gap.bullets)
  push(structured.policy.bullets)
  push(structured.reality.bullets)
  push(structured.takeaway.bullets)

  const chosen: string[] = []
  let cur = 0
  for (const s of buckets) {
    const c = countKoreanFriendlyChars(s)
    if (cur + c > max && chosen.length >= 2) continue
    chosen.push(s)
    cur += c
    if (cur >= min && chosen.length >= (mode === 'brief' ? 2 : mode === 'standard' ? 4 : 6)) break
  }

  return normalizeSpaces(chosen.join(' '))
}

/* -------------------------
   9) 마인드맵: "문장 중간 절단" 제거
   - 노드 label은 shortenSentence로만 축약
------------------------- */
function safeNodeLabel(s: string) {
  // 절단이 아니라 "축약"으로 처리
  const t = shortenSentence(s)
  // 너무 길면 쉼표 기준 완만 축약(중간 절단 금지)
  const parts = t.split(/,\s+/g)
  if (parts.length >= 3) return normalizeSpaces(parts.slice(0, 2).join(', ') + '.')
  return t
}

function buildMindmapFromStructured(structured: StructuredSummary) {
  const center = structured.title || '핵심'
  const mk = (id: string, label: string, bullets: Bullet[]) => ({
    id,
    label,
    children: bullets.map(b => ({ id: b.id, label: safeNodeLabel(b.text) }))
  })

  const nodes = [
    mk('n_core', '핵심 요지', structured.core.bullets),
    mk('n_min', structured.perspectives.ministry.label, structured.perspectives.ministry.bullets),
    mk('n_pri', structured.perspectives.privateEdu.label, structured.perspectives.privateEdu.bullets),
    mk('n_gap', structured.gap.label, structured.gap.bullets),
    mk('n_pol', structured.policy.label, structured.policy.bullets),
    mk('n_rea', structured.reality.label, structured.reality.bullets),
    mk('n_tak', structured.takeaway.label, structured.takeaway.bullets)
  ]
  return { center, nodes }
}

/* -------------------------
   10) selftest: 구조화 기반 안정 생성
------------------------- */
function buildSelftestFromStructured(structured: StructuredSummary, mode: Mode) {
  const q: { q: string; a: string; hint?: string }[] = []

  q.push({
    q: '교육부는 선행학습을 왜 문제로 보는가?',
    a: structured.perspectives.ministry.bullets[0]?.text || '공교육 정상화 저해 및 격차/태도 악화 우려.',
    hint: '공교육·격차·참여도'
  })

  q.push({
    q: '사교육이 말하는 예습과 선행학습의 차이는 무엇인가?',
    a: structured.perspectives.privateEdu.bullets[0]?.text || '예습은 수업 대비, 선행은 다음 학년 과정의 선학습.',
    hint: '수업 대비 vs 다음 학년'
  })

  if (mode !== 'brief') {
    q.push({
      q: '선행학습이 강화되는 제도적 배경은 무엇인가?',
      a: structured.policy.bullets[0]?.text || '내신 반영비율/전형/가산점 등 구조 변화가 영향을 준다.',
      hint: '내신·전형·비율'
    })
  }

  if (mode === 'detail') {
    q.push({
      q: '선행학습의 현황(방법)에서 핵심 특징 1가지는?',
      a: structured.reality.bullets[0]?.text || '시험 대비 중심 프로그램과 특강/평가 체계가 운영된다.',
      hint: '프로그램·특강·평가'
    })
  }

  return q
}

/* -------------------------
   11) 최종 엔진: 3모드×4뷰 생성
------------------------- */
export function buildAllSummariesV4_Quality(rawText: string): AllSummariesV4 {
  const cleaned = sanitizeKoreanAcademicText(rawText)

  // detail structured 1회 생성
  const structuredDetail = buildStructuredDetail(cleaned)

  // 포함관계 강제 downsample
  const structuredStandard = downsampleStructured(structuredDetail, 'standard')
  const structuredBrief = downsampleStructured(structuredDetail, 'brief')

  // narrative 생성(압축률 목표 + 중간절단 금지)
  const narrativeDetail = buildNarrativeFromStructured(structuredDetail, 'detail', cleaned)
  const narrativeStandard = buildNarrativeFromStructured(structuredStandard, 'standard', cleaned)
  const narrativeBrief = buildNarrativeFromStructured(structuredBrief, 'brief', cleaned)

  const pack = (mode: Mode, structured: StructuredSummary, narrative: string): ModePack => ({
    mode,
    narrative,
    structured,
mindmap: buildMindmapFromStructured(structured),
    selftest: buildSelftestFromStructured(structured, mode)
  })

  return {
    brief: pack('brief', structuredBrief, narrativeBrief),
    standard: pack('standard', structuredStandard, narrativeStandard),
    detail: pack('detail', structuredDetail, narrativeDetail)
  }
}
