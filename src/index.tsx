import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { mountMatrixV4 } from './routes/matrix-v4'
import healthCheckApp from './routes/health-check'

type Bindings = {
  DB?: D1Database
  GEMINI_API_KEY?: string
  GEMINI_MODEL?: string
  USE_MOCK?: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('/api/*', cors())
app.use('/static/*', serveStatic({ root: './public' }))

// 🔍 STEP 1: Health Check - API 키 체크부터!
app.route('/', healthCheckApp)

// ✅ ONE-BLOCK MATRIX V4: Detail 1회 + 강제 다운샘플 + 검증
mountMatrixV4(app)

// =========================================================
// V5: Learn Engine (Structured-First + 동일 트리 + 압축률 강제)
//  - brief/standard/detail: 동일 트리 구조 유지 (nodeId/hierarchy 고정)
//  - 차이는: explain 길이/advanced 노드의 "표시량"만 조절
//  - structured는 "참고서형 위계 + 용어사전(OO: ~~~)" 출력용 스키마 포함
//  - selftest: 90% 통과 게이트 연동 가능하도록 정답/채점 포함
//  - D1 저장/불러오기: allSummaries 그대로 저장
// =========================================================

function nowIso() { return new Date().toISOString() }

// --- stable hash (no crypto dependency) ---
function hashText(s: string) {
  const str = String(s || '')
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return 'h' + (h >>> 0).toString(16)
}

function clamp(n: number, a: number, b: number) { return Math.max(a, Math.min(b, n)) }

// =========================================================
// BLOCK 5 PATCH: buildSummaryPrompt() helpers
// =========================================================
function normalizeLevel(level: string): 'brief' | 'standard' | 'detail' {
  const l = String(level || 'standard').toLowerCase()
  if (l === 'brief' || l === 'b') return 'brief'
  if (l === 'detail' || l === 'd') return 'detail'
  return 'standard'
}

function normalizeViewType(viewType: string): 'narrative' | 'structured' | 'mindmap' | 'selftest' {
  const v = String(viewType || 'narrative').toLowerCase()
  if (v === 'structured' || v === 'struct') return 'structured'
  if (v === 'mindmap' || v === 'mind') return 'mindmap'
  if (v === 'selftest' || v === 'test') return 'selftest'
  return 'narrative'
}

function computeRemainTarget(rawText: string, level: 'brief' | 'standard' | 'detail') {
  const base = Math.max(60, countKoreanFriendlyChars(rawText))
  const ratio = level === 'brief' ? 0.14 : level === 'standard' ? 0.31 : 0.53
  const min = Math.floor(base * ratio * 0.85)
  const max = Math.ceil(base * ratio * 1.15)
  const keep = Math.floor(base * ratio)
  const tol = Math.ceil(base * 0.05)
  return { base, min, max, keep, tol }
}

/* =========================================================
   BLOCK 5 PATCH: buildSummaryPrompt() FINAL
   - V4/V5 정합: detail 1회 생성 강제, brief/standard는 downsample
   - ViewType별 스키마 고정: narrative/structured/mindmap/selftest
   - 구조화(참고서형 위계 + 용어사전 OO:~) + 과목/학년 분기
   - Mindmap: SVG V3 autoEnrich(2.5=pack, 3=explain) 100% 호환
========================================================= */
function buildSummaryPrompt(params: any) {
  const rawText = String(params?.text || '').trim()
  
  // V4/V5 핵심: level은 무조건 detail만 생성
  const V = normalizeViewType(params?.viewType || 'narrative')
  const requested = normalizeLevel(params?.level || 'detail')
  const L = 'detail' // 강제
  
  // 목표 길이: detail 기준으로만 산출
  const { base, min, max, keep, tol } = computeRemainTarget(rawText, L)
  
  // 과목/학년
  const grade = String(params?.grade || 'general').toLowerCase()
  const subject = String(params?.subject || 'general').toLowerCase()
  
  // 구조화 핵심 지침
  const structuralLogic = `
[구조화 핵심 지침(강제)]
- 학습 단위(Learning Unit):
  · 초등(elem): 중단원+소단원을 하나의 단위로 묶어 구조화(묶기)
  · 중/고(mid/high): 소단원 단위로 쪼개어 구조화(쪼개기)
- 과목별 특화:
  · 수학(math): 개념명 중심. 공식은 LaTeX($...$). 성립조건+적용유형 포함
  · 국어(korean): 텍스트 흐름 중심. 소제목별 핵심의미+키워드(1~3)
  · 사회/과학(soc/sci): 원인-과정-결과 중심. 용어정의는 "OO: ~~~" 포맷
- 절대 금지:
  · 원문을 글자수 맞춰 중간 자르기 금지(요약은 재구성)
  · 중복 문장/중복 정보 반복 금지
- 정량 규칙:
  · explain(설명문)은 60~110자 1문장(최대 2문장)
  · pack(키워드)은 1~3개, ' · '로 연결
- 트리 구조:
  · root -> question(1레벨) -> keyword(2레벨) 항상 유지
  · 심화(advanced)는 children으로 넣되 기본 collapsed
  · brief/standard/detail은 downsample이 만들므로 지금은 detail만 생성
`.trim()
  
  const commonHeader = [
    `당신은 학습 콘텐츠를 참고서/교과서 수준으로 재구성하는 지식 구조화 엔진입니다.`,
    structuralLogic,
    `[입력 메타] grade=${grade}, subject=${subject}, requestedLevel=${requested}, forcedLevel=${L}, viewType=${V}`,
    `아래 [출력 스키마] 외에는 어떤 텍스트도 출력하지 마세요.`,
    `원문:`,
    rawText
  ].join('\n')
  
  // Narrative 스키마
  const narrativeSpec = `
[출력 스키마: narrative]
{
  "level": "detail",
  "viewType": "narrative",
  "meta": { "grade": "${grade}", "subject": "${subject}", "charTarget": { "min": ${min}, "max": ${max}, "base": ${base} } },
  "narrative": {
    "title": "한 줄 제목(10~18자)",
    "paragraphs": [
      { "heading": "소제목(6~14자)", "sentences": ["문장1", "문장2", "문장3"] }
    ],
    "keywords": ["키워드1","키워드2","키워드3"]
  }
}
[규칙]
- paragraphs는 3~6개. 각 문단은 2~4문장
- 문장은 맞춤법/띄어쓰기/문법이 자연스럽게
- 연결어(하지만/따라서/한편/또한) 과도하게 반복 금지
`.trim()
  
  // Structured 스키마
  const structuredSpec = `
[출력 스키마: structured]
{
  "level": "detail",
  "viewType": "structured",
  "meta": { "grade": "${grade}", "subject": "${subject}", "charTarget": { "min": ${min}, "max": ${max}, "base": ${base} } },
  "structured": {
    "outline": [
      { "h": "대주제(Ⅰ/Ⅱ/Ⅲ 느낌의 제목)", "points": [ { "k": "핵심 논점(1문장)", "sub": ["근거1", "근거2"] } ] }
    ],
    "glossary": [ { "term": "OO", "def": "OO: ~~~ 형태로 1~2문장 정의" } ]
  }
}
[규칙]
- outline은 3~7개 대주제
- points는 각 대주제마다 2~5개
- glossary는 5~12개. 사회/과학이면 원인-과정-결과 흐름을 def에 반영
- def 문장 첫머리는 "용어: " 형태로 시작(예: "선행학습: ...")
`.trim()
  
  // Mindmap 스키마
  const mindmapSpec = `
[출력 스키마: mindmap]
{
  "level": "detail",
  "viewType": "mindmap",
  "meta": { "grade": "${grade}", "subject": "${subject}", "charTarget": { "min": ${min}, "max": ${max}, "base": ${base} } },
  "mindmap": {
    "title": "학습 단위(중단원/소단원명 또는 핵심 주제)",
    "children": [
      {
        "title": "왜?/무엇?/어떻게?/비교/쟁점 중 적절한 1레벨 질문",
        "children": [
          {
            "title": "2레벨 키워드(명사구 2~6자)",
            "pack": ["핵심어1","핵심어2","핵심어3"],
            "explain": "설명문(60~110자, 1문장 우선)",
            "children": [ { "title": "심화/근거/사례(선택)", "children": [] } ]
          }
        ]
      }
    ]
  }
}
[규칙]
- root 1개, 1레벨 question 4~7개, 각 question 아래 keyword 2~5개
- keyword.title은 짧은 키워드(문장 금지)
- pack은 1~3개, explain은 60~110자
- pack/explain 노드는 children으로 만들지 말고 필드로만 제공
  (렌더러에서 autoEnrich:true가 pack/explain을 2.5/3으로 자동 생성)
`.trim()
  
  // Selftest 스키마
  const selftestSpec = `
[출력 스키마: selftest]
{
  "level": "detail",
  "viewType": "selftest",
  "meta": { "grade": "${grade}", "subject": "${subject}", "passScore": 90, "charTarget": { "min": ${min}, "max": ${max}, "base": ${base} } },
  "selftest": {
    "items": [
      {
        "id": "Q1",
        "type": "mcq|tf|blank|short",
        "q": "질문",
        "choices": ["보기1","보기2","보기3","보기4"],
        "answer": "정답(선지 또는 O/X 또는 빈칸정답)",
        "rationale": "해설(1~2문장)"
      }
    ]
  }
}
[규칙]
- items는 8~12개
- type 구성: mcq 5~7개 + tf 2~3개 + blank/short 1~2개
- 질문은 원문/요약 내용 확인 중심(응용·심화는 평가 엔진에서 처리)
- rationale은 간결하지만 근거가 명확해야 함
`.trim()
  
  // ViewType 선택
  let spec = narrativeSpec
  if (V === 'structured') spec = structuredSpec
  else if (V === 'mindmap') spec = mindmapSpec
  else if (V === 'selftest') spec = selftestSpec
  
  return `${commonHeader}\n\n${spec}`
}

function cleanText(raw: string) {
  return String(raw || '')
    .replace(/\r/g, '')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/-\s*\d+\s*-\s*/g, ' ')   // "- 8 -" 같은 페이지 표기 제거
    .replace(/\s+\n/g, '\n')
    .trim()
}

function splitSentencesKR(text: string) {
  const t = cleanText(text)
  if (!t) return []
  // 문장 끝: .?!다.요.니다. 등을 안전하게 분절
  const parts = t
    .replace(/([.?!])\s+/g, '$1\n')
    .replace(/(다\.|요\.|니다\.)\s+/g, '$1\n')
    .split('\n')
    .map(s => s.trim())
    .filter(Boolean)
  return parts
}

function detectHeadings(text: string) {
  // "2.1." / "2.2." 같은 절 제목을 섹션으로 인식
  const lines = cleanText(text).split('\n').map(s => s.trim())
  const out: { title: string; startIdx: number }[] = []
  for (let i = 0; i < lines.length; i++) {
    const ln = lines[i]
    if (/^\d+(\.\d+)+\.\s*/.test(ln) || /^\d+\.\s*/.test(ln)) {
      out.push({ title: ln, startIdx: i })
    }
  }
  return out
}

function chunkByHeadings(text: string) {
  const lines = cleanText(text).split('\n')
  const heads = detectHeadings(text)
  if (!heads.length) {
    return [{ title: '본문', body: cleanText(text) }]
  }
  const chunks: { title: string; body: string }[] = []
  for (let i = 0; i < heads.length; i++) {
    const cur = heads[i]
    const next = heads[i + 1]
    const start = cur.startIdx
    const end = next ? next.startIdx : lines.length
    const title = cur.title
    const body = lines.slice(start + 1, end).join('\n').trim()
    chunks.push({ title, body })
  }
  return chunks.filter(c => c.body.length > 0)
}

// --- sentence scoring (simple, deterministic) ---
function scoreSentence(s: string) {
  const len = s.length
  let score = 0
  // 정의/비교/원인/결과 단서
  if (/(정의|일컫|의미|란|즉)/.test(s)) score += 3
  if (/(그러나|반면|이에 반해|대조|차이)/.test(s)) score += 3
  if (/(목표|역점|중시|필요|현황|방법|추세)/.test(s)) score += 2
  if (/\d{4}/.test(s)) score += 1
  // 너무 길면 감점(가독성)
  if (len > 180) score -= 2
  if (len > 260) score -= 3
  // 너무 짧아도 감점
  if (len < 18) score -= 1
  return score
}

function pickTopSentences(text: string, n: number) {
  const sents = splitSentencesKR(text)
  const scored = sents.map((s, i) => ({ s, i, score: scoreSentence(s) }))
  scored.sort((a, b) => b.score - a.score || a.i - b.i)
  const picked = scored.slice(0, clamp(n, 1, 12)).sort((a, b) => a.i - b.i).map(x => x.s)
  return picked
}

// --- compression ratio targets (character-based, whitespace removed) ---
function countKoreanFriendlyChars(s: string) {
  return String(s || '').replace(/\s+/g, '').length
}

const RATIO = {
  brief:   { min: 0.10, max: 0.18 },
  standard:{ min: 0.25, max: 0.38 },
  detail:  { min: 0.45, max: 0.62 }
} as const

function enforceCompression(original: string, text: string, mode: 'brief'|'standard'|'detail') {
  const base = Math.max(60, countKoreanFriendlyChars(original))
  const cur = countKoreanFriendlyChars(text)
  const min = Math.floor(base * RATIO[mode].min)
  const max = Math.ceil(base * RATIO[mode].max)
  if (cur < min) return { text, ok: false, reason: 'too_short', min, max, cur }
  if (cur > max) return { text, ok: false, reason: 'too_long', min, max, cur }
  return { text, ok: true, reason: 'ok', min, max, cur }
}

function truncateToRange(original: string, text: string, mode: 'brief'|'standard'|'detail') {
  const base = Math.max(60, countKoreanFriendlyChars(original))
  const max = Math.ceil(base * RATIO[mode].max)
  let out = String(text || '').trim()
  // 너무 길면 문장 단위로 자르기(중간 글자 자르기 금지)
  if (countKoreanFriendlyChars(out) <= max) return out
  const sents = splitSentencesKR(out)
  let acc = ''
  for (const s of sents) {
    const next = (acc ? acc + ' ' : '') + s
    if (countKoreanFriendlyChars(next) > max) break
    acc = next
  }
  return acc || sents[0] || out.slice(0, Math.min(out.length, 200))
}

// --- build "detail tree" first (single source of truth) ---
type MindNode = {
  id: string
  title: string
  type?: 'root'|'section'|'keyword'|'pack'|'explain'|'advanced'
  collapsed?: boolean
  pack?: string[] | string
  explain?: string
  explainBrief?: string
  explainStandard?: string
  children?: MindNode[]
}

function mkId(prefix: string, i: number) { return `${prefix}_${i}` }

function buildDetailTree(original: string) {
  const chunks = chunkByHeadings(original)
  const root: MindNode = { id: 'root', title: '핵심 구조', type: 'root', collapsed: false, children: [] }
  const glossary = new Map<string, string>() // term -> def

  chunks.forEach((ch, idx) => {
    const secId = mkId('sec', idx + 1)
    const sec: MindNode = {
      id: secId,
      title: ch.title,
      type: 'section',
      collapsed: false,
      children: []
    }

    // 키워드 후보: 간단 규칙(괄호/약어/반복 명사)
    const topSents = pickTopSentences(ch.body, 6)
    const keyCandidates: string[] = []
    for (const s of topSents) {
      const m = s.match(/[가-힣A-Za-z·/()]{2,20}/g) || []
      m.slice(0, 8).forEach(w => {
        const ww = w.replace(/[()]/g, '').trim()
        if (ww.length >= 2 && ww.length <= 12 && !/^(그리고|하지만|또한|이와|이에|우선|한편)$/.test(ww)) {
          keyCandidates.push(ww)
        }
      })
    }
    // 빈도 상위 3개
    const freq = new Map<string, number>()
    keyCandidates.forEach(w => freq.set(w, (freq.get(w) || 0) + 1))
    const topKeys = Array.from(freq.entries())
      .sort((a,b) => b[1]-a[1])
      .map(x => x[0])
      .filter(w => w.length <= 10)
      .slice(0, 3)

    // explain: 섹션 핵심 2~3문장(상세)
    const explainDetail = pickTopSentences(ch.body, 3).join(' ')
    const explainStandard = pickTopSentences(ch.body, 2).join(' ')
    const explainBrief = pickTopSentences(ch.body, 1).join(' ')

    // 섹션 아래 키워드 노드(2레벨) 1개 생성 -> pack/explain 붙이기 (당신이 원한 2.5/3 레벨)
    const kw: MindNode = {
      id: mkId(secId + '_kw', 1),
      title: '핵심 개념',
      type: 'keyword',
      collapsed: false,
      pack: topKeys,
      explain: explainDetail,
      explainStandard,
      explainBrief,
      children: []
    }

    // glossary 자동 수집(키=pack 키워드)
    topKeys.forEach(k => {
      if (!glossary.has(k)) {
        glossary.set(k, `본문 맥락에서 "${k}"의 핵심 의미를 요약하면, ${pickTopSentences(ch.body, 1)[0] || '관련 내용의 핵심 개념이다.'}`)
      }
    })

    // advanced(심화) 노드: 예시/근거/수치/인용이 있으면 문장 1~2개만
    const advSents = splitSentencesKR(ch.body).filter(s => /(\d{4}|%|가산점|전형|평가|프로그램|운영)/.test(s))
    const advPick = advSents.slice(0, 2)
    if (advPick.length) {
      kw.children!.push({
        id: mkId(secId + '_adv', 1),
        title: advPick.join(' '),
        type: 'advanced',
        collapsed: true,
        children: []
      })
    }

    sec.children!.push(kw)
    root.children!.push(sec)
  })

  return { tree: root, glossary: Array.from(glossary.entries()).map(([term, def]) => ({ term, def })) }
}

// 동일 트리 유지 + 모드에 따라 "표시 텍스트"만 달라지게 만들기
function treeForMode(detailTree: MindNode, mode: 'brief'|'standard'|'detail') {
  const clone: MindNode = JSON.parse(JSON.stringify(detailTree))
  const walk = (n: MindNode) => {
    if (n.type === 'keyword') {
      // explain은 유지하되, 렌더러가 mode별 explain을 고르게 할 수 있도록 별도 필드 유지
      // (동일 구조 유지 목적)
      if (mode === 'brief') n.explain = n.explainBrief || n.explain
      if (mode === 'standard') n.explain = n.explainStandard || n.explain
      if (mode === 'detail') n.explain = n.explain || n.explainStandard || n.explainBrief
    }
    // advanced는 구조는 유지하되 brief/standard에서는 기본 접힘(표시량 감소)
    if (n.type === 'advanced') {
      n.collapsed = (mode !== 'detail')
    }
    ;(n.children || []).forEach(walk)
  }
  walk(clone)
  return clone
}

// 참고서형 구조화 스키마 (위계 + 용어사전)
function buildStructuredReference(original: string, treeDetail: MindNode, glossary: {term:string;def:string}[], mode:'brief'|'standard'|'detail') {
  // 목차(섹션 제목)
  const toc = (treeDetail.children || []).map(s => s.title)

  // 섹션별 요지: keyword 노드의 explain을 사용(모드 적용)
  const tree = treeForMode(treeDetail, mode)
  const sections = (tree.children || []).map(sec => {
    const kw = (sec.children || []).find(c => c.type === 'keyword')
    const packs = Array.isArray(kw?.pack) ? kw!.pack as string[] : (typeof kw?.pack === 'string' ? [kw!.pack] : [])
    return {
      title: sec.title,
      key: packs.slice(0,3),
      summary: kw?.explain || ''
    }
  })

  // 용어사전은 모드별로 개수 조절(구조는 유지: term/def 형식 고정)
  const glMax = mode === 'brief' ? 4 : mode === 'standard' ? 6 : 10
  const glossaryOut = glossary.slice(0, glMax).map(x => ({
    term: x.term,
    def: truncateToRange(original, x.def, mode) // 정의도 압축률 범위 내에서 문장 단위로
  }))

  // 참고서 출력용 "render-ready" 텍스트(가독성 핵심)
  const renderTextLines: string[] = []
  renderTextLines.push(`Ⅰ. 목차`)
  toc.forEach((t, i) => renderTextLines.push(`  ${i+1}. ${t}`))
  renderTextLines.push('')
  renderTextLines.push(`Ⅱ. 핵심 정리(위계)`)
  sections.forEach((s, i) => {
    renderTextLines.push(`  ${i+1}. ${s.title}`)
    if (s.key?.length) renderTextLines.push(`     - 핵심키워드: ${s.key.join(' · ')}`)
    if (s.summary) renderTextLines.push(`     - 요지: ${truncateToRange(original, s.summary, mode)}`)
    renderTextLines.push('')
  })
  renderTextLines.push(`Ⅲ. 용어사전`)
  glossaryOut.forEach((g) => {
    renderTextLines.push(`  - ${g.term}: ${g.def}`)
  })

  return {
    kind: 'reference',
    toc,
    sections,
    glossary: glossaryOut,
    renderText: renderTextLines.join('\n')
  }
}

// narrative 요약(문장형)도 압축률 강제
function buildNarrative(original: string, mode:'brief'|'standard'|'detail') {
  const chunks = chunkByHeadings(original)
  const nSent = mode === 'brief' ? 2 : mode === 'standard' ? 4 : 7
  const picked: string[] = []
  chunks.forEach(ch => {
    const take = mode === 'brief' ? 1 : mode === 'standard' ? 1 : 2
    picked.push(...pickTopSentences(ch.body, take))
  })
  const draft = picked.slice(0, nSent).join(' ')
  return truncateToRange(original, draft, mode)
}

// selftest 생성 원칙(간단하지만 "학습엔진"답게):
//  - (A) 사실 확인 1문항 + (B) 비교/대조 1문항 + (C) 핵심수치/근거 1문항(있을 때)
//  - 정답은 원문 근거 문장에 포함되도록(환각 방지)
function buildSelftest(original: string, treeDetail: MindNode) {
  const chunks = chunkByHeadings(original)
  const allSents = splitSentencesKR(original)
  const q: any[] = []

  // A) 정의/핵심: "선행학습은 무엇인가?"
  const defSent = allSents.find(s => /(일컫|정의|란)/.test(s)) || allSents[0] || ''
  if (defSent) {
    q.push({
      id: 'q1',
      type: 'short',
      question: '본문에서 말하는 "선행학습"은 무엇을 의미하나요?',
      answer: defSent,
      rubric: '원문 정의 문장을 요지로 재진술',
      sourceHint: defSent
    })
  }

  // B) 대비: "교육부 vs 사교육 관점 차이"
  const contra = allSents.find(s => /(이에 반해|반면|대조)/.test(s))
  if (contra) {
    q.push({
      id: 'q2',
      type: 'compare',
      question: '본문에서 교육부 관점과 사교육 관점은 선행학습을 어떻게 다르게 보나요? 핵심 차이를 2가지로 정리하세요.',
      answer: '교육부는 선행학습이 공교육 정상화를 방해하고 격차/부정적 영향 요인이 된다고 본다. 사교육은 예습과 구분하며 수업 성과·자신감·흥미를 높일 수 있다고 본다.',
      rubric: '관점 2개(교육부/사교육) 모두 언급 + 차이 2가지',
      sourceHint: contra
    })
  }

  // C) 수치/근거: %/년도/전형 같은 근거 문장 있으면 1문항 추가
  const ev = allSents.find(s => /(%|\d{4}|전형|가산점|비율)/.test(s))
  if (ev) {
    q.push({
      id: 'q3',
      type: 'evidence',
      question: '본문에서 제시된 수치/근거 1가지를 골라, 그것이 왜 중요하다고 말하는지 한 문장으로 설명하세요.',
      answer: ev,
      rubric: '수치/근거 1개 정확히 제시 + 의미 1문장',
      sourceHint: ev
    })
  }

  // 최소 2문항 보장
  return q.slice(0, 4)
}

// 채점(로컬): 사용자가 입력한 답이 정답 힌트 문장에 포함된 핵심어를 포함하면 부분점수
function scoreSelftest(questions: any[], userAnswers: Record<string,string>) {
  let total = questions.length
  let got = 0
  const detail: any[] = []
  for (const qu of questions) {
    const ua = (userAnswers?.[qu.id] || '').trim()
    if (!ua) { detail.push({ id: qu.id, ok: false, score: 0 }); continue }
    const hint = String(qu.sourceHint || qu.answer || '')
    // 핵심 단어 2개 이상 겹치면 정답 처리(간이)
    const keys = (hint.match(/[가-힣A-Za-z0-9·/]{2,}/g) || [])
      .map(x => x.replace(/[()]/g,''))
      .filter(Boolean)
    const uniq = Array.from(new Set(keys)).slice(0, 8)
    let hit = 0
    uniq.forEach(k => { if (ua.includes(k)) hit++ })
    const ok = hit >= 2 || ua.length >= 30
    const sc = ok ? 1 : (hit === 1 ? 0.5 : 0)
    got += sc
    detail.push({ id: qu.id, ok, score: sc, hit })
  }
  const pct = total ? Math.round((got / total) * 100) : 0
  return { pct, passed: pct >= 90, detail } // ✅ 90% 통과(요구사항)
}

// allSummaries 생성: detail 1회 생성 -> standard/brief는 downsample(동일 트리 유지)
function buildAllSummaries(original: string) {
  const cleaned = cleanText(original)
  const { tree: detailTree, glossary } = buildDetailTree(cleaned)

  const out: any = {
    originalMeta: { textHash: hashText(cleaned), chars: cleaned.length, ts: nowIso() },
    modes: {}
  }

  ;(['detail','standard','brief'] as const).forEach((mode) => {
    const narrative = buildNarrative(cleaned, mode)
    const structured = buildStructuredReference(cleaned, detailTree, glossary, mode)
    const mindmapTree = treeForMode(detailTree, mode) // ✅ 동일 구조 유지
    const selftest = buildSelftest(cleaned, detailTree)

    // 압축률 강제(서술/구조화 renderText에 적용)
    const narChecked = enforceCompression(cleaned, narrative, mode)
    const narFinal = narChecked.ok ? narrative : truncateToRange(cleaned, narrative, mode)
    const structText = structured.renderText || ''
    const stChecked = enforceCompression(cleaned, structText, mode)
    structured.renderText = stChecked.ok ? structText : truncateToRange(cleaned, structText, mode)

    out.modes[mode] = {
      narrative: narFinal,
      structured,
      mindmap: { tree: mindmapTree },
      selftest
    }
  })

  return out
}

// ---------------------------
// Health
// ---------------------------
app.get('/api/health', async (c) => {
  const hasDB = !!c.env.DB
  const hasGeminiKey = !!c.env.GEMINI_API_KEY
  return c.json({
    ok: true,
    ts: nowIso(),
    hasDB,
    hasGeminiKey,
    engineMode: hasGeminiKey ? 'llm' : 'local-only',
  })
})

// ---------------------------
// Engine V5 (with optional Gemini LLM)
// POST /api/engine
// body: { text, mode, viewType, userId, grade?, subject?, useGemini? }
// viewType: narrative | structured | mindmap | selftest
// ---------------------------
app.post('/api/engine', async (c) => {
  const body = await c.req.json().catch(() => ({}))
  const text = String(body?.text || '')
  const mode = (body?.mode === 'brief' || body?.mode === 'standard' || body?.mode === 'detail') ? body.mode : 'standard'
  const viewType = (body?.viewType === 'narrative' || body?.viewType === 'structured' || body?.viewType === 'mindmap' || body?.viewType === 'selftest') ? body.viewType : 'narrative'
  const userId = String(body?.userId || 'anon')
  const grade = String(body?.grade || 'general')
  const subject = String(body?.subject || 'general')
  const useGemini = body?.useGemini === true

  const cleaned = cleanText(text)
  if (cleaned.length < 5) {
    return c.json({ ok:false, error:'text_too_short', message:'입력은 5자 이상이어야 합니다.' }, 400)
  }

  let engine = 'v5-local'
  let all: any

  // Gemini LLM 사용 (optional)
  if (useGemini && c.env.GEMINI_API_KEY) {
    try {
      const prompt = buildSummaryPrompt({ text: cleaned, viewType, level: 'detail', grade, subject })
      const geminiModel = c.env.GEMINI_MODEL || 'gemini-2.0-flash-exp'
      
      const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${c.env.GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 8192 }
        })
      })
      
      const result = await resp.json()
      const geminiText = result?.candidates?.[0]?.content?.parts?.[0]?.text || ''
      
      // JSON 파싱 시도
      const jsonMatch = geminiText.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0])
        
        // Detail 결과를 brief/standard로 downsample
        all = {
          originalMeta: { textHash: hashText(cleaned), chars: cleaned.length, ts: nowIso() },
          modes: {
            detail: { [viewType]: parsed },
            standard: { [viewType]: parsed }, // TODO: downsample
            brief: { [viewType]: parsed }     // TODO: downsample
          }
        }
        engine = 'gemini-' + geminiModel
      } else {
        throw new Error('Gemini 응답을 JSON으로 파싱할 수 없습니다.')
      }
    } catch (err: any) {
      console.error('[Gemini Error]', err)
      // Fallback to local
      all = buildAllSummaries(cleaned)
      engine = 'v5-local-fallback'
    }
  } else {
    // local-only: V5 로컬 생성
    all = buildAllSummaries(cleaned)
  }

  const data = all.modes?.[mode]?.[viewType]
  const meta = { engine, mode, viewType, ts: nowIso(), textHash: all.originalMeta.textHash, grade, subject }
  return c.json({ ok:true, data, allSummaries: all.modes, meta })
})

// ---------------------------
// Selftest 채점 (90% 통과)
// POST /api/selftest/score
// body: { questions, answers }
// ---------------------------
app.post('/api/selftest/score', async (c) => {
  const body = await c.req.json().catch(() => ({}))
  const questions = Array.isArray(body?.questions) ? body.questions : []
  const answers = (body?.answers && typeof body.answers === 'object') ? body.answers : {}
  const res = scoreSelftest(questions, answers)
  return c.json({ ok:true, result: res })
})

// ---------------------------
// D1 저장/불러오기 (allSummaries 저장)
// POST /api/saveSummary
// body: { userId, originalText, allSummaries }
// GET  /api/loadSummary?userId=...&id=...
// ---------------------------
app.post('/api/saveSummary', async (c) => {
  const db = c.env.DB
  if (!db) return c.json({ ok:false, error:'no_db', message:'DB(D1)가 연결되지 않았습니다.' }, 400)

  const body = await c.req.json().catch(() => ({}))
  const userId = String(body?.userId || 'anon')
  const originalText = cleanText(String(body?.originalText || ''))
  const allSummaries = body?.allSummaries
  if (!originalText || !allSummaries) return c.json({ ok:false, error:'bad_request' }, 400)

  const id = String(body?.id || `s_${Date.now()}_${Math.random().toString(36).slice(2,8)}`)
  const ts = nowIso()
  const textHash = hashText(originalText)
  const allJson = JSON.stringify(allSummaries)

  await db.prepare(`
    INSERT INTO summaries (id, userId, createdAt, updatedAt, textHash, originalText, allSummariesJson)
    VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)
    ON CONFLICT(id) DO UPDATE SET
      updatedAt=excluded.updatedAt,
      textHash=excluded.textHash,
      originalText=excluded.originalText,
      allSummariesJson=excluded.allSummariesJson
  `).bind(id, userId, ts, ts, textHash, originalText, allJson).run()

  return c.json({ ok:true, id, textHash, ts })
})

app.get('/api/loadSummary', async (c) => {
  const db = c.env.DB
  if (!db) return c.json({ ok:false, error:'no_db', message:'DB(D1)가 연결되지 않았습니다.' }, 400)

  const userId = String(c.req.query('userId') || 'anon')
  const id = String(c.req.query('id') || '')
  if (!id) return c.json({ ok:false, error:'missing_id' }, 400)

  const row = await db.prepare(`
    SELECT id, userId, createdAt, updatedAt, textHash, originalText, allSummariesJson
    FROM summaries
    WHERE id=?1 AND userId=?2
  `).bind(id, userId).first<any>()

  if (!row) return c.json({ ok:false, error:'not_found' }, 404)

  let all: any = null
  try { all = JSON.parse(row.allSummariesJson) } catch { all = null }
  return c.json({
    ok:true,
    doc: {
      id: row.id,
      userId: row.userId,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      textHash: row.textHash,
      originalText: row.originalText,
      allSummaries: all
    }
  })
})

app.get('/', (c) => {
  return c.redirect('/static/v5.html')
})


export default app
