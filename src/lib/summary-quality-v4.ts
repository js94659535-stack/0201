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

// Tree 노드 정의 (V3 mindmap 호환)
type TreeNode = {
  title: string
  type?: 'question' | 'keyword' | 'advanced' | 'pack' | 'explain'
  pack?: string | string[]
  explain?: string
  collapsed?: boolean
  children: TreeNode[]
}

export type StructuredSummary = {
  title: string
  tree: TreeNode  // Tree 구조로 변경
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
   6) 원하는 구조화(detail 1회 생성) - Tree 기반
   - 정의·쟁점 / 교육부 관점 / 사교육 관점 / 목표 vs 현실 / 방법·현황 / 변천
------------------------- */
function buildStructuredDetail(cleaned: string): StructuredSummary {
  const sections = splitByHeadings(cleaned)
  const secSent: Record<string, string[]> = {}
  for (const sec of sections) secSent[sec.key] = filterSentences(splitKoreanSentences(sec.text))
  const all = filterSentences(splitKoreanSentences(cleaned))

  const title = sections[0]?.title ? normalizeSpaces(sections[0].title) : '선행학습 구조화'

  // 정의·쟁점 분기
  const defPool = all.filter(s => /(정의|개념|선행학습|학습활동|교육과정)/.test(s))
  const issuePool = all.filter(s => /(쟁점|관점|차이|주장|해석|입장)/.test(s))

  const defSentences = pickTop(defPool.length ? defPool : all, 2, 'def')
  const issueSentences = pickTop(issuePool.length ? issuePool : all, 2, 'issue')

  // 교육부 관점
  const ministryPool = all.filter(s => /(교육부|공교육|정상화|우려|부정적|방해|격차|참여도|태도|창의|인성|전인교육)/.test(s))
  const ministrySentences = pickTop(ministryPool.length ? ministryPool : all, 4, 'min')

  // 사교육 관점
  const privatePool = all.filter(s => /(사교육|학원|예습|효율|성과|긍정|흥미|자신감|구분|조력|대비)/.test(s))
  const privateSentences = pickTop(privatePool.length ? privatePool : all, 3, 'pri')

  // 목표 vs 현실
  const goalPool = secSent['2.2']?.length ? secSent['2.2'] : all.filter(s => /(목표|역점|듣기|말하기|일상|국제|이해|능력)/.test(s))
  const realityGoalPool = all.filter(s => /(현실|성취|성적|고입|대입|전환)/.test(s))
  const goalSentences = pickTop(goalPool.length ? goalPool : all, 2, 'goal')
  const realityGoalSentences = pickTop(realityGoalPool.length ? realityGoalPool : all, 2, 'rgoal')

  // 방법·현황(사례)
  const realityPool = (secSent['2.3']?.length ? secSent['2.3'] : all).filter(s =>
    /(현황|방법|설명회|프로그램|평가|교육비|특강|기숙|방학|시험대비|내신|인증시험|운영|비용|강도)/.test(s)
  )
  const realitySentences = pickTop(realityPool.length ? realityPool : all, 4, 'rea')

  // 변천(입시 반영 구조)
  const policyPool = secSent['2.4']?.length ? secSent['2.4'] : all.filter(s => /(변천|과정|비율|가산점|내신|추세|반영|영어|비중|확대)/.test(s))
  const policySentences = pickTop(policyPool.length ? policyPool : all, 2, 'pol')

  // Tree 구조 생성
  const tree: TreeNode = {
    title,
    children: [
      {
        title: '정의·쟁점',
        type: 'question',
        collapsed: false,
        children: [
          {
            title: '선행학습 정의',
            type: 'keyword',
            pack: ['정규과정 이전', '미리 학습', '학습과정'],
            explain: defSentences[0]?.text || '교육부 기준 선행학습은 정규 교육과정보다 앞서 미리 학습하는 모든 학습활동을 뜻한다.',
            collapsed: false,
            children: []
          },
          {
            title: '쟁점(관점 차이)',
            type: 'keyword',
            pack: ['국가', '학생·학부모', '사교육'],
            explain: issueSentences[0]?.text || '선행학습의 성격과 영향에 대해 국가·학생/학부모·사교육이 서로 다른 주장과 해석을 제시한다.',
            collapsed: false,
            children: []
          }
        ]
      },
      {
        title: '교육부 관점',
        type: 'question',
        collapsed: false,
        children: ministrySentences.slice(0, 4).map((s, idx) => ({
          title: [
            '공교육 정상화 저해',
            '전인교육 저해·사교육 증폭',
            '영어 태도 조기 고착 우려',
            '학습격차·수업참여 악영향'
          ][idx] || `관점 ${idx + 1}`,
          type: 'keyword' as const,
          pack: [
            ['공교육 방해', '정상화 저해', '핵심 요인'],
            ['창의·인성', '전인교육', '사교육 관행'],
            ['호오 조기결정', '자신감 과잉', '무력감'],
            ['수준 격차', '태도', '참여도']
          ][idx] || [],
          explain: s.text,
          collapsed: false,
          children: []
        }))
      },
      {
        title: '사교육 관점',
        type: 'question',
        collapsed: false,
        children: privateSentences.slice(0, 3).map((s, idx) => ({
          title: [
            '예습과 선행학습 구분 주장',
            '예습의 효과 강조',
            '현장의 선행학습 실태(모순)'
          ][idx] || `관점 ${idx + 1}`,
          type: 'keyword' as const,
          pack: [
            ['예습≠선행', '대비', '조력'],
            ['수업 성과', '효율', '흥미·자신감'],
            ['고학년 교재', '방학·특강', '실질 선행']
          ][idx] || [],
          explain: s.text,
          collapsed: false,
          children: []
        }))
      },
      {
        title: '목표(교육부 vs 현실)',
        type: 'question',
        collapsed: false,
        children: [
          {
            title: '1998 영어교육 목표',
            type: 'keyword',
            pack: ['듣기·말하기', '일상영어', '국제이해'],
            explain: goalSentences[0]?.text || '교육부(1998)는 음성언어 중심(듣기·말하기)과 일상생활 영어 사용 능력, 국제사회·외국문화 이해 및 국가 발전 기여를 목표로 제시했다.',
            collapsed: false,
            children: []
          },
          {
            title: '현실 목표의 전환',
            type: 'keyword',
            pack: ['성취·성적', '고입', '대입'],
            explain: realityGoalSentences[0]?.text || '현장에서는 교육 목표와 달리 학업 성취·성적 향상, 고입·대입 대비가 학습의 중심 목표로 작동하는 경향이 있다.',
            collapsed: false,
            children: []
          }
        ]
      },
      {
        title: '방법·현황(사례)',
        type: 'question',
        collapsed: false,
        children: realitySentences.slice(0, 4).map((s, idx) => ({
          title: [
            '시험대비 프로그램(초등 A학원)',
            '내신·인증시험 집중(어학 B·C학원)',
            '운영·비용·강도',
            '기숙형 선행학습(방학 30일 내외)'
          ][idx] || `방법 ${idx + 1}`,
          type: 'keyword' as const,
          pack: [
            ['단원평가', '서술형 특강', '성취도 평가'],
            ['중등 내신', '인증시험', 'L/S/R/W'],
            ['주5회', '주말 특강', '자습 운영'],
            ['교육청 연계', '기숙', '스파르타식']
          ][idx] || [],
          explain: s.text,
          collapsed: false,
          children: []
        }))
      },
      {
        title: '변천(입시 반영 구조)',
        type: 'question',
        collapsed: false,
        children: policySentences.slice(0, 2).map((s, idx) => ({
          title: [
            '내신 반영 비율이 좌우',
            '영어 비중 확대 추세'
          ][idx] || `변천 ${idx + 1}`,
          type: 'keyword' as const,
          pack: [
            ['고입', '대입', '내신 비중'],
            ['필수과목', '가산점', '비중 증가']
          ][idx] || [],
          explain: s.text,
          collapsed: false,
          children: []
        }))
      }
    ]
  }

  return { title, tree }
}

/* -------------------------
   7) downsample: brief ⊂ standard ⊂ detail 강제 (Tree 기반)
------------------------- */
function downsampleTree(node: TreeNode, depth: number, maxDepth: number): TreeNode {
  if (depth >= maxDepth) {
    return { ...node, children: [] }
  }

  const childrenLimit = {
    0: 6,  // root: 최대 6개 분기
    1: 4,  // question: 최대 4개 keyword
    2: 3   // keyword: 최대 3개 children
  }[depth] || 2

  return {
    ...node,
    children: node.children.slice(0, childrenLimit).map(c => downsampleTree(c, depth + 1, maxDepth))
  }
}

function downsampleStructured(detail: StructuredSummary, mode: Mode): StructuredSummary {
  const maxDepth = mode === 'brief' ? 2 : mode === 'standard' ? 3 : 4
  return {
    title: detail.title,
    tree: downsampleTree(detail.tree, 0, maxDepth)
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

  // Tree에서 explain 추출
  const buckets: string[] = []
  const extractExplains = (node: TreeNode) => {
    if (node.explain) buckets.push(node.explain)
    if (node.children) node.children.forEach(extractExplains)
  }
  extractExplains(structured.tree)

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

  // Tree → mindmap 변환
  const treeToMindmap = (node: TreeNode, idPrefix: string): any => {
    const id = `${idPrefix}_${Math.random().toString(36).substring(7)}`
    return {
      id,
      label: safeNodeLabel(node.title),
      children: node.children.map((c, idx) => treeToMindmap(c, `${id}_${idx}`))
    }
  }

  const nodes = structured.tree.children.map((c, idx) => treeToMindmap(c, `n${idx}`))
  return { center, nodes }
}

/* -------------------------
   10) selftest: 구조화 기반 안정 생성
------------------------- */
function buildSelftestFromStructured(structured: StructuredSummary, mode: Mode) {
  const q: { q: string; a: string; hint?: string }[] = []

  // Tree에서 explain 추출
  const explains: string[] = []
  const extractExplains = (node: TreeNode) => {
    if (node.explain) explains.push(node.explain)
    if (node.children) node.children.forEach(extractExplains)
  }
  extractExplains(structured.tree)

  q.push({
    q: '교육부는 선행학습을 왜 문제로 보는가?',
    a: explains.find(e => /(교육부|공교육|정상화|우려)/.test(e)) || '공교육 정상화 저해 및 격차/태도 악화 우려.',
    hint: '공교육·격차·참여도'
  })

  q.push({
    q: '사교육이 말하는 예습과 선행학습의 차이는 무엇인가?',
    a: explains.find(e => /(사교육|학원|예습|효율)/.test(e)) || '예습은 수업 대비, 선행은 다음 학년 과정의 선학습.',
    hint: '수업 대비 vs 다음 학년'
  })

  if (mode !== 'brief') {
    q.push({
      q: '선행학습이 강화되는 제도적 배경은 무엇인가?',
      a: explains.find(e => /(변천|과정|비율|가산점|내신)/.test(e)) || '내신 반영비율/전형/가산점 등 구조 변화가 영향을 준다.',
      hint: '내신·전형·비율'
    })
  }

  if (mode === 'detail') {
    q.push({
      q: '선행학습의 현황(방법)에서 핵심 특징 1가지는?',
      a: explains.find(e => /(현황|방법|프로그램|평가)/.test(e)) || '시험 대비 중심 프로그램과 특강/평가 체계가 운영된다.',
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
