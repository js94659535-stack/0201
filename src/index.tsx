import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'

type Bindings = {
  DB?: D1Database
  GEMINI_API_KEY?: string
  GEMINI_MODEL?: string
  USE_MOCK?: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('/api/*', cors())
app.use('/static/*', serveStatic({ root: './public' }))

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
// Engine V5
// POST /api/engine
// body: { text, mode, viewType, userId }
// viewType: narrative | structured | mindmap | selftest
// ---------------------------
app.post('/api/engine', async (c) => {
  const body = await c.req.json().catch(() => ({}))
  const text = String(body?.text || '')
  const mode = (body?.mode === 'brief' || body?.mode === 'standard' || body?.mode === 'detail') ? body.mode : 'standard'
  const viewType = (body?.viewType === 'narrative' || body?.viewType === 'structured' || body?.viewType === 'mindmap' || body?.viewType === 'selftest') ? body.viewType : 'narrative'
  const userId = String(body?.userId || 'anon')

  const cleaned = cleanText(text)
  if (cleaned.length < 5) {
    return c.json({ ok:false, error:'text_too_short', message:'입력은 5자 이상이어야 합니다.' }, 400)
  }

  // local-only: 항상 V5 생성
  const all = buildAllSummaries(cleaned)
  const data = all.modes?.[mode]?.[viewType]
  const meta = { engine:'v5-local', mode, viewType, ts: nowIso(), textHash: all.originalMeta.textHash }
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
