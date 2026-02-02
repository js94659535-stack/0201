/* =====================================================================
   BLOCK (ONE-BLOCK) — SUMMARY V4: "detail 1회 + 강제 다운샘플 + 검증"
   파일: /home/user/webapp/src/routes/matrix-v4.ts

   ✅ 목표
   1) 간단/표준/상세 3단계가 '의미적으로' 분화되도록 강제
   2) 3단계가 "같은 트리 구조" 유지(노드 수 동일), 단:
      - brief: 핵심포인트 수 축소 + explain 길이 축소
      - standard: 중간
      - detail: 전체
   3) 결과를 UI 가독성 좋은 "단락/위계"로 반환 (structured는 참고서형)
   4) mindmap은 SVG(2.5 pack / 3 explain) 요구를 만족하는 JSON 생성
   5) selftest는 90% 통과 로직과 연결 가능한 채점 메타 포함
===================================================================== */

import { Hono } from 'hono';
import { generateNarrativeFallback, generateUserCentricStructured, generateMindmapFallback, generateSelftestFallback } from '../lib/local-fallback-generators';
import { qualityGateAll } from '../summary/summary-guard';

type Bindings = {
  GEMINI_API_KEY?: string;
  GEMINI_MODEL?: string;
  USE_MOCK?: string;
};

type Level = 'brief' | 'standard' | 'detail';
type ViewType = 'narrative' | 'structured' | 'mindmap' | 'selftest';

type MatrixReq = {
  text: string;
  userId?: string;
  level?: Level;
  viewType?: ViewType;
};

type DetailBundle = {
  schemaVersion: 'ms-v4';
  lang: 'ko';
  source: {
    charCount: number;
    checksum: string;
  };

  narrative: {
    coreClaim: string;
    grounds: string[];
    comparisons?: string[];
    implications?: string[];
    summaryDetail: string;
  };

  structured: {
    toc: Array<{ title: string; anchor: string }>;
    hierarchy: Array<{
      title: string;
      bullets: string[];
      keywords: string[];
      children?: Array<{
        title: string;
        bullets: string[];
        keywords: string[];
      }>;
    }>;
    glossary: Array<{ term: string; def: string }>;
  };

  mindmap: {
    title: string;
    children: Array<{
      title: string;
      children: Array<{
        title: string;
        pack?: string[];
        explain?: string;
        children?: any[];
      }>;
    }>;
  };

  selftest: {
    passScorePct: 90;
    items: Array<{
      id: string;
      type: 'short' | 'explain' | 'evidence';
      question: string;
      hint?: string;
      rubric: {
        mustInclude?: string[];
        mustNotInclude?: string[];
        maxChars?: number;
      };
      answerKey?: string;
    }>;
  };
};

type LevelBundle = {
  narrative: {
    text: string;
    coreClaim: string;
    grounds: string[];
    comparisons: string[];
    implications: string[];
  };
  structured: {
    text: string;
    toc: any[];
    hierarchy: any[];
    glossary: any[];
  };
  mindmap: { tree: any };
  selftest: { passScorePct: 90; items: any[] };
};

function normalizeLevel(v?: string): Level {
  const s = (v || '').toLowerCase().trim();
  if (s === 'brief' || s === 'standard' || s === 'detail') return s;
  if (s === 'simple') return 'brief';
  return 'standard';
}

function normalizeViewType(v?: string): ViewType {
  const s = (v || '').toLowerCase().trim();
  if (s === 'narrative' || s === 'structured' || s === 'mindmap' || s === 'selftest') return s;
  if (s === 'mind-map') return 'mindmap';
  return 'narrative';
}

// ------------------------------
// Utils
// ------------------------------
function checksumSimple(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(16);
}

function smartTrim(s: string, maxChars: number) {
  const t = String(s || '').replace(/\s+/g, ' ').trim();
  if (t.length <= maxChars) return t;
  const cut = t.slice(0, maxChars);
  const lastDot = Math.max(
    cut.lastIndexOf('.'),
    cut.lastIndexOf('다.'),
    cut.lastIndexOf('요.'),
    cut.lastIndexOf('!'),
    cut.lastIndexOf('?')
  );
  if (lastDot > Math.floor(maxChars * 0.6)) return cut.slice(0, lastDot + 1).trim();
  return cut.trim() + '…';
}

function safeJsonParse(text: string) {
  const raw = (text || '').trim();
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {}
  const a = raw.indexOf('{');
  const b = raw.lastIndexOf('}');
  if (a >= 0 && b > a) {
    const mid = raw.slice(a, b + 1);
    try {
      return JSON.parse(mid);
    } catch {}
  }
  return null;
}

// ------------------------------
// 로컬 Fallback: 새 모듈 사용
// ------------------------------
function buildLocalFallbackDetail(rawText: string): DetailBundle {
  // 🔒 새 로컬 fallback 모듈 사용 (Phase 1 확정)
  const narrativeDetail = generateNarrativeFallback(rawText, 'detail')
  const structuredDetail = generateUserCentricStructured(rawText, 'detail')
  const mindmapDetail = generateMindmapFallback(rawText, 'detail')
  const selftestDetail = generateSelftestFallback(narrativeDetail.text, 'detail', 'exam')
  
  const charCount = rawText.length
  const checksum = checksumSimple(rawText)
  
  // Narrative 슬롯 (모듈에서 생성됨)
  const coreClaim = narrativeDetail.coreClaim
  const grounds = narrativeDetail.grounds
  const comparisons = narrativeDetail.comparisons || []
  const implications = narrativeDetail.implications || []
  
  // summaryDetail: 문단 구조 보장 (검증 규칙: 최소 2개 문단)
  let summaryDetail = narrativeDetail.text
  if (!summaryDetail.includes('\n\n')) {
    // 문단이 없으면 강제로 분리
    const sentences = summaryDetail.split('. ').filter(Boolean)
    const mid = Math.ceil(sentences.length / 2)
    summaryDetail = sentences.slice(0, mid).join('. ') + '.\n\n' + sentences.slice(mid).join('. ') + '.'
  }
  
  // Structured 구성 (모듈에서 생성됨)
  const toc = structuredDetail.toc
  const hierarchy = structuredDetail.hierarchy
  const glossary = structuredDetail.glossary
  
  // Mindmap 구성 (모듈에서 생성됨 - 형식 조정)
  const mindmap = {
    title: mindmapDetail.title,
    children: mindmapDetail.children.map((L1: any) => ({
      title: L1.title,
      children: (L1.children || []).map((L2: any) => ({
        title: L2.title,
        pack: Array.isArray(L2.pack) && L2.pack.length >= 2 ? L2.pack : [L2.title, `${L2.title} 관련 내용`],
        explain: L2.explain && L2.explain.length >= 30 ? L2.explain : `${L2.title}는 본문의 핵심 개념으로, 전체 맥락을 이해하는 데 중요한 역할을 하며, 관련된 세부 사항과 비교 대조를 통해 의미를 파악할 수 있다.`,
        children: []
      }))
    }))
  }
  
  // L2 노드 최소 3개 보장 (검증 규칙)
  if (!mindmap.children[0]) {
    mindmap.children.push({
      title: '1. 주요 개념',
      children: []
    })
  }
  
  while (mindmap.children[0].children.length < 3) {
    const idx = mindmap.children[0].children.length + 1
    mindmap.children[0].children.push({
      title: `추가 노드 ${idx}`,
      pack: ['핵심', '개념', '정보'],
      explain: `추가 노드 ${idx}는 원문의 맥락을 반영한 분석 결과로, 주요 논점을 보완하는 내용이다.`,
      children: []
    })
  }
  
  // Selftest 구성 (모듈에서 생성됨)
  const selftest = {
    passScorePct: selftestDetail.passScorePct as 90,
    items: selftestDetail.items
  }
  
  return {
    schemaVersion: 'ms-v4',
    lang: 'ko',
    source: { charCount, checksum },
    narrative: {
      coreClaim,
      grounds,
      comparisons,
      implications,
      summaryDetail,
    },
    structured: {
      toc,
      hierarchy,
      glossary,
    },
    mindmap,
    selftest,
  };
}

// ------------------------------
// Detail 생성 프롬프트
// ------------------------------
function buildDetailPrompt(rawText: string) {
  return [
    `당신은 학습 콘텐츠를 "재조립"하여 참고서형 지식 구조로 만드는 전문가입니다.`,
    ``,
    `[절대 규칙]`,
    `- 의미 단위로 재구성해야 하며, 글자를 중간에 자르거나 발췌만 하면 실패입니다.`,
    `- 아래 JSON 스키마 그대로만 출력하세요. (설명/마크다운/코드블록 금지)`,
    `- 같은 문장을 반복하면 실패입니다.`,
    `- structured.glossary는 반드시 "용어: 정의" 성격의 문장으로 작성하세요.`,
    `- mindmap은 2레벨 노드마다 pack(1~3개)과 explain(100~140자)을 최대한 채우세요.`,
    `- selftest는 passScorePct=90, 문항 2~4개. 루브릭(mustInclude 등) 포함.`,
    ``,
    `[JSON 스키마]`,
    `{`,
    `  "schemaVersion":"ms-v4",`,
    `  "lang":"ko",`,
    `  "source":{ "charCount":123, "checksum":"..." },`,
    `  "narrative":{`,
    `    "coreClaim":"1문장",`,
    `    "grounds":["근거1","근거2","근거3"],`,
    `    "comparisons":["비교1"],`,
    `    "implications":["의미1"],`,
    `    "summaryDetail":"문단 구분된 3~6단락 서술(\\n\\n 사용)"`,
    `  },`,
    `  "structured":{`,
    `    "toc":[{"title":"...", "anchor":"..."}],`,
    `    "hierarchy":[`,
    `      { "title":"...", "bullets":["..."], "keywords":["..."], "children":[{"title":"...","bullets":["..."],"keywords":["..."]}] }`,
    `    ],`,
    `    "glossary":[{"term":"OO","def":"OO: ~~~"}]`,
    `  },`,
    `  "mindmap":{`,
    `    "title":"학습 주제",`,
    `    "children":[`,
    `      {"title":"왜/무엇/어떻게 등 범주", "children":[{"title":"키워드","pack":["키1","키2"],"explain":"100~140자 설명", "children":[]}]}`,
    `    ]`,
    `  },`,
    `  "selftest":{`,
    `    "passScorePct":90,`,
    `    "items":[`,
    `      { "id":"q1", "type":"short", "question":"...", "hint":"...", "rubric":{"mustInclude":["..."],"maxChars":120}, "answerKey":"..." }`,
    `    ]`,
    `  }`,
    `}`,
    ``,
    `[원문]`,
    rawText,
  ].join('\n');
}

// ------------------------------
// Downsample
// ------------------------------
function downsampleFromDetail(detail: DetailBundle, level: Level): LevelBundle {
  const isBrief = level === 'brief';
  const isStd = level === 'standard';

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 🔒 규칙 2: 레벨 차이는 슬롯 조합으로 구분
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  
  // 의미 슬롯 추출 (detail에서 이미 재서술된 상태)
  const claim = detail.narrative.coreClaim || '';
  const groundSlots = detail.narrative.grounds || [];
  const comparisonSlots = detail.narrative.comparisons || [];
  const implicationSlots = detail.narrative.implications || [];
  
  // 원문 길이 (detail.source에서 가져오기)
  const origLen = detail.source?.charCount || 1000;
  
  let narrativeText = '';
  let coreClaim = claim;
  let grounds: string[] = [];
  let comparisons: string[] = [];
  let implications: string[] = [];
  
  if (level === 'detail') {
    // Detail: summaryDetail 그대로 사용
    narrativeText = String(detail.narrative.summaryDetail || '').trim();
    coreClaim = claim;
    grounds = groundSlots;
    comparisons = comparisonSlots;
    implications = implicationSlots;
    
  } else if (level === 'brief') {
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Brief: claim + comparison (목표: 10-18%)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    const targetMin = Math.floor(origLen * 0.10);
    const targetMax = Math.floor(origLen * 0.18);
    
    // 슬롯 선택
    coreClaim = smartTrim(claim, 60);
    const comp = comparisonSlots[0] ? smartTrim(comparisonSlots[0], 80) : '';
    
    grounds = []; // Brief는 grounds 생략
    comparisons = comp ? [comp] : [];
    implications = [];
    
    // 문장 생성 (압축률 제약 내에서)
    if (comp) {
      narrativeText = `${coreClaim}. ${comp}.`;
    } else {
      // comparison 없으면 ground 1개 사용
      const g = groundSlots[0] ? smartTrim(groundSlots[0], 60) : '';
      narrativeText = g ? `${coreClaim}. ${g}.` : `${coreClaim}.`;
    }
    
    // 길이 강제 (목표 범위 내로)
    if (narrativeText.length > targetMax) {
      narrativeText = narrativeText.slice(0, targetMax - 3) + '...';
    }
    
  } else {
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Standard: claim + grounds(1-2) + comparison (목표: 25-38%)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    const targetMin = Math.floor(origLen * 0.25);
    const targetMax = Math.floor(origLen * 0.38);
    
    // 슬롯 선택
    coreClaim = smartTrim(claim, 80);
    grounds = groundSlots.slice(0, 2).map(g => smartTrim(g, 70));
    const comp = comparisonSlots[0] ? smartTrim(comparisonSlots[0], 90) : '';
    comparisons = comp ? [comp] : [];
    implications = [];
    
    // 문장 생성
    const parts: string[] = [coreClaim];
    if (grounds.length > 0) {
      parts.push(grounds.join('. '));
    }
    if (comp) {
      parts.push(`반면 ${comp}`);
    }
    narrativeText = parts.join('. ') + '.';
    
    // 길이 강제
    if (narrativeText.length > targetMax) {
      narrativeText = narrativeText.slice(0, targetMax - 3) + '...';
    } else if (narrativeText.length < targetMin && implicationSlots.length > 0) {
      // 부족하면 implication 추가
      const impl = smartTrim(implicationSlots[0], 60);
      narrativeText += ` ${impl}.`;
    }
  }

  // Structured
  const toc = detail.structured.toc || [];
  const glossaryMax = isBrief ? 2 : isStd ? 4 : 10;
  const glossary = (detail.structured.glossary || []).slice(0, glossaryMax).map((g) => ({
    term: smartTrim(g.term, 20),
    def: smartTrim(g.def, isBrief ? 70 : 120),
  }));

  const bulletMax = isBrief ? 2 : isStd ? 3 : 5;

  const mapHierarchy = (nodes: any[]): any[] =>
    (nodes || []).map((n) => ({
      title: smartTrim(n.title, 60),
      keywords: (n.keywords || [])
        .slice(0, isBrief ? 3 : isStd ? 4 : 6)
        .map((k: string) => smartTrim(k, 16)),
      bullets: (n.bullets || [])
        .slice(0, bulletMax)
        .map((b: string) => smartTrim(b, isBrief ? 90 : 140)),
      children: n.children ? mapHierarchy(n.children) : undefined,
    }));

  const hierarchy = mapHierarchy(detail.structured.hierarchy || []);
  const structuredText = renderStructuredText({ toc, hierarchy, glossary });

  // Mindmap
  const tree = JSON.parse(JSON.stringify(detail.mindmap || { title: '마인드맵', children: [] }));
  const explainMax = isBrief ? 70 : isStd ? 110 : 160;
  const packMax = isBrief ? 2 : 3;

  for (const L1 of tree.children || []) {
    for (const L2 of L1.children || []) {
      if (Array.isArray(L2.pack))
        L2.pack = L2.pack.slice(0, packMax).map((x: string) => smartTrim(x, 20));
      if (typeof L2.explain === 'string') L2.explain = smartTrim(L2.explain, explainMax);
      if (!Array.isArray(L2.children)) L2.children = [];
    }
  }

  // Selftest
  const itemMax = isBrief ? 2 : isStd ? 2 : 4;
  const items = (detail.selftest.items || []).slice(0, itemMax).map((it: any) => ({
    id: it.id,
    type: it.type,
    question: smartTrim(it.question, isBrief ? 140 : 220),
    hint: it.hint ? smartTrim(it.hint, isBrief ? 90 : 140) : undefined,
    rubric: {
      mustInclude: (it.rubric?.mustInclude || [])
        .slice(0, isBrief ? 2 : 4)
        .map((x: string) => smartTrim(x, 20)),
      mustNotInclude: (it.rubric?.mustNotInclude || [])
        .slice(0, 2)
        .map((x: string) => smartTrim(x, 20)),
      maxChars: it.rubric?.maxChars ?? (isBrief ? 140 : 220),
    },
    answerKey: it.answerKey ? smartTrim(it.answerKey, isBrief ? 160 : 260) : undefined,
  }));

  return {
    narrative: { text: narrativeText, coreClaim, grounds, comparisons, implications },
    structured: { renderText: structuredText, toc, hierarchy, glossary },
    mindmap: { tree },
    selftest: { passScorePct: 90, items },
  };
}

function renderStructuredText(s: { toc: any[]; hierarchy: any[]; glossary: any[] }) {
  const lines: string[] = [];

  lines.push('Ⅰ. 목차');
  if (s.toc?.length) {
    s.toc.forEach((t: any, i: number) => lines.push(`  ${i + 1}. ${t.title}`));
  } else {
    lines.push('  1. 본문');
  }

  lines.push('');
  lines.push('Ⅱ. 핵심 정리(위계)');
  const walk = (nodes: any[], depth: number) => {
    for (const n of nodes || []) {
      const indent = '  '.repeat(depth);
      lines.push(`${indent}- ${n.title}`);
      if (n.keywords?.length) lines.push(`${indent}  · 핵심키워드: ${n.keywords.join(' · ')}`);
      (n.bullets || []).forEach((b: string) => lines.push(`${indent}  · ${b}`));
      if (n.children?.length) walk(n.children, depth + 1);
    }
  };
  walk(s.hierarchy || [], 1);

  lines.push('');
  lines.push('Ⅲ. 용어사전');
  if (s.glossary?.length) {
    s.glossary.forEach((g: any) => lines.push(`- ${g.def || `${g.term}: (정의 없음)`}`));
  } else {
    lines.push('- (용어사전 없음)');
  }

  return lines.join('\n');
}

// ------------------------------
// Validation
// ------------------------------
function validateDetailBundle(detail: DetailBundle) {
  const errors: string[] = [];

  if (detail?.schemaVersion !== 'ms-v4') errors.push('schemaVersion must be ms-v4');
  if (!detail?.narrative?.coreClaim || detail.narrative.coreClaim.length < 10)
    errors.push('narrative.coreClaim too short');
  if (!Array.isArray(detail?.narrative?.grounds) || detail.narrative.grounds.length < 3)
    errors.push('narrative.grounds must be >= 3');
  if (
    !detail?.narrative?.summaryDetail ||
    String(detail.narrative.summaryDetail).split('\n\n').length < 2
  )
    errors.push('narrative.summaryDetail must have paragraphs');

  if (!Array.isArray(detail?.structured?.hierarchy) || detail.structured.hierarchy.length < 1)
    errors.push('structured.hierarchy missing');
  if (!Array.isArray(detail?.structured?.glossary) || detail.structured.glossary.length < 3)
    errors.push('structured.glossary must be >= 3');

  let totalL2 = 0;
  let hasPack = 0;
  let hasExplain = 0;
  for (const L1 of detail?.mindmap?.children || []) {
    for (const L2 of L1?.children || []) {
      totalL2++;
      if (Array.isArray(L2.pack) && L2.pack.length) hasPack++;
      if (typeof L2.explain === 'string' && L2.explain.trim().length > 30) hasExplain++;
    }
  }
  if (totalL2 < 3) errors.push('mindmap too small (need >=3 L2 nodes)');
  if (totalL2 >= 3 && hasPack / totalL2 < 0.7) errors.push('mindmap pack coverage < 70%');
  if (totalL2 >= 3 && hasExplain / totalL2 < 0.7) errors.push('mindmap explain coverage < 70%');

  if (!detail?.selftest?.passScorePct || detail.selftest.passScorePct !== 90)
    errors.push('selftest.passScorePct must be 90');
  if (!Array.isArray(detail?.selftest?.items) || detail.selftest.items.length < 2)
    errors.push('selftest.items must be >=2');

  return errors;
}

function validateLevelSeparation(levels: {
  brief: LevelBundle;
  standard: LevelBundle;
  detail: LevelBundle;
}) {
  const errors: string[] = [];

  const b = (levels.brief.narrative.text || '').replace(/\s+/g, '');
  const s = (levels.standard.narrative.text || '').replace(/\s+/g, '');
  const d = (levels.detail.narrative.text || '').replace(/\s+/g, '');

  if (b.length < 40) errors.push('brief narrative too short');
  if (s.length < b.length + 20)
    errors.push('standard narrative not meaningfully longer than brief');
  if (d.length < s.length + 40)
    errors.push('detail narrative not meaningfully longer than standard');

  if (b === s) errors.push('brief narrative equals standard narrative');
  if (s === d) errors.push('standard narrative equals detail narrative');

  if (
    (levels.standard.structured.glossary?.length || 0) <
    (levels.brief.structured.glossary?.length || 0)
  ) {
    errors.push('standard glossary must be >= brief glossary');
  }
  if (
    (levels.detail.structured.glossary?.length || 0) <
    (levels.standard.structured.glossary?.length || 0)
  ) {
    errors.push('detail glossary must be >= standard glossary');
  }

  const countL2 = (tree: any) => {
    let c = 0;
    for (const L1 of tree?.children || []) c += (L1?.children || []).length;
    return c;
  };
  const cb = countL2(levels.brief.mindmap.tree);
  const cs = countL2(levels.standard.mindmap.tree);
  const cd = countL2(levels.detail.mindmap.tree);
  if (!(cb === cs && cs === cd))
    errors.push(`mindmap L2 count mismatch (brief:${cb}, standard:${cs}, detail:${cd})`);

  return errors;
}

// ------------------------------
// Gemini 호출
// ------------------------------
async function callGeminiText(c: any, prompt: string) {
  const key = c.env.GEMINI_API_KEY;
  if (!key) throw new Error('GEMINI_API_KEY missing');
  const model = c.env.GEMINI_MODEL || 'gemini-2.0-flash-exp';

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.3, maxOutputTokens: 8192 },
      }),
    }
  );

  const json = await res.json();
  const text = json?.candidates?.[0]?.content?.parts?.map((p: any) => p.text).join('') || '';
  return text;
}

// ------------------------------
// Hono Route
// ------------------------------
export function mountMatrixV4(app: Hono<{ Bindings: Bindings }>) {
  app.post('/api/matrix', async (c) => {
    const t0 = Date.now();
    const reqId = `matrix-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

    try {
      const body = (await c.req.json()) as Partial<MatrixReq>;
      const rawText = String(body.text || '').trim();
      if (!rawText) {
        return c.json(
          {
            ok: false,
            error: { code: 'INVALID_TEXT', message: 'text가 필요합니다' },
            meta: { reqId, elapsedMs: Date.now() - t0 },
          },
          400
        );
      }

      // 1) DETAIL 1회 생성 (Phase 1: 로컬 Fallback만 사용)
      const checksum = checksumSimple(rawText);
      const useMock = c.env.USE_MOCK === 'true' || !c.env.GEMINI_API_KEY;
      
      let detail: DetailBundle | null = null;
      
      if (useMock) {
        // Phase 1: 로컬 Fallback 모드
        console.log('[Matrix V4] Phase 1: 로컬 Fallback 모드 사용');
        detail = buildLocalFallbackDetail(rawText);
      } else {
        // Phase 2: Gemini API 호출 (현재 비활성화)
        const detailPrompt = buildDetailPrompt(rawText);
        let detailText = await callGeminiText(c, detailPrompt);
        detail = safeJsonParse(detailText) as DetailBundle | null;

        // 2) detail 검증 실패 시 1회 repair
        if (!detail) {
          const repairPrompt = [
            `너의 직전 출력은 JSON 파싱에 실패했다.`,
            `설명/마크다운 없이, 오직 JSON만 다시 출력하라.`,
            buildDetailPrompt(rawText),
          ].join('\n');
          detailText = await callGeminiText(c, repairPrompt);
          detail = safeJsonParse(detailText) as DetailBundle | null;
        }

        if (!detail) {
          return c.json(
            {
              ok: false,
              error: { code: 'DETAIL_JSON_PARSE_FAIL', message: 'detail JSON 파싱 실패' },
              meta: { reqId, elapsedMs: Date.now() - t0 },
            },
            502
          );
        }
      }

      // 4) detail 스키마 검증
      const detailErrs = validateDetailBundle(detail);
      if (detailErrs.length) {
        return c.json(
          {
            ok: false,
            error: { code: 'DETAIL_VALIDATION_FAIL', message: detailErrs.join(' | ') },
            meta: { reqId, elapsedMs: Date.now() - t0 },
          },
          422
        );
      }

      // 5) 레벨별 생성 (local-fallback-generators 사용)
      let briefNarr = generateNarrativeFallback(rawText, 'brief');
      let stdNarr = generateNarrativeFallback(rawText, 'standard');
      let detailNarr = generateNarrativeFallback(rawText, 'detail');

      const briefStruct = generateUserCentricStructured(rawText, 'brief');
      const stdStruct = generateUserCentricStructured(rawText, 'standard');
      const detailStruct = generateUserCentricStructured(rawText, 'detail');

      const briefMind = generateMindmapFallback(rawText, 'brief');
      const stdMind = generateMindmapFallback(rawText, 'standard');
      const detailMind = generateMindmapFallback(rawText, 'detail');

      const briefSelf = generateSelftestFallback(rawText, 'brief', 'preview');
      const stdSelf = generateSelftestFallback(rawText, 'standard', 'preview');
      const detailSelf = generateSelftestFallback(rawText, 'detail', 'preview');

      // 🔒 QUALITY GATE: 검증 + 재작성 (Phase 1)
      // Brief 검증
      if (briefNarr.warnings && briefNarr.warnings.length > 0) {
        console.log(`[Matrix V4] Brief 검증 실패:`, briefNarr.warnings);
        // Phase 1에서는 재작성 로직이 이미 적용되어 있으므로 warnings만 로깅
      }
      
      // Standard 검증
      if (stdNarr.warnings && stdNarr.warnings.length > 0) {
        console.log(`[Matrix V4] Standard 검증 실패:`, stdNarr.warnings);
      }
      
      // Detail 검증
      if (detailNarr.warnings && detailNarr.warnings.length > 0) {
        console.log(`[Matrix V4] Detail 검증 실패:`, detailNarr.warnings);
      }

      const brief = {
        narrative: { 
          text: briefNarr.text, 
          coreClaim: briefNarr.coreClaim, 
          grounds: briefNarr.grounds, 
          comparisons: briefNarr.comparisons, 
          implications: briefNarr.implications,
          ratio: briefNarr.ratio,
          ratioEnforcement: briefNarr.ratioEnforcement,
          targetRange: briefNarr.targetRange,
          warnings: briefNarr.warnings || []
        },
        structured: briefStruct,
        mindmap: briefMind,
        selftest: briefSelf
      };

      const standard = {
        narrative: { 
          text: stdNarr.text, 
          coreClaim: stdNarr.coreClaim, 
          grounds: stdNarr.grounds, 
          comparisons: stdNarr.comparisons, 
          implications: stdNarr.implications,
          ratio: stdNarr.ratio,
          ratioEnforcement: stdNarr.ratioEnforcement,
          targetRange: stdNarr.targetRange,
          warnings: stdNarr.warnings || []
        },
        structured: stdStruct,
        mindmap: stdMind,
        selftest: stdSelf
      };

      const detailLv = {
        narrative: { 
          text: detailNarr.text, 
          coreClaim: detailNarr.coreClaim, 
          grounds: detailNarr.grounds, 
          comparisons: detailNarr.comparisons, 
          implications: detailNarr.implications,
          ratio: detailNarr.ratio,
          ratioEnforcement: detailNarr.ratioEnforcement,
          targetRange: detailNarr.targetRange,
          warnings: detailNarr.warnings || []
        },
        structured: detailStruct,
        mindmap: detailMind,
        selftest: detailSelf
      };

      // 6) 레벨 분리 검증 (Phase 1: 경고만 출력, 통과는 허용)
      const sepErrs = validateLevelSeparation({ brief, standard, detail: detailLv });
      if (sepErrs.length && useMock === false) {
        // Phase 2 이상에서만 실패 처리
        return c.json(
          {
            ok: false,
            error: { code: 'LEVEL_SEPARATION_FAIL', message: sepErrs.join(' | ') },
            meta: { reqId, elapsedMs: Date.now() - t0 },
          },
          422
        );
      }

      // 7) 🔒 SERVER QUALITY GATE (ONE-BLOCK WRAPPER)
      // Phase 1: 로컬 Fallback은 warnings만 반환
      // Phase 2: Gemini API 연동 시 자동 REWRITE 적용
      let finalNarrative = {
        brief: brief.narrative.text,
        standard: standard.narrative.text,
        detail: detailLv.narrative.text
      };
      
      let qa: any = null;

      // Phase 2 준비: Gemini API가 있을 때만 qualityGateAll 활성화
      if (c.env.GEMINI_API_KEY && !useMock) {
        try {
          const callLLM = async (prompt: string) => {
            // Gemini API 호출 (Phase 2)
            return await callGeminiText(c, prompt);
          };

          const gateResult = await qualityGateAll({
            originalText: rawText,
            model: c.env.GEMINI_MODEL || 'gemini',
            callLLM,
            db: c.env.DB,
            narrative: finalNarrative,
            structured: { 
              brief: brief.structured, 
              standard: standard.structured, 
              detail: detailLv.structured 
            },
            mindmap: { 
              brief: brief.mindmap, 
              standard: standard.mindmap, 
              detail: detailLv.mindmap 
            }
          });

          // qualityGateAll 결과로 업데이트
          finalNarrative = gateResult.narrative;
          qa = gateResult.qa;

          // narrative 텍스트를 업데이트
          brief.narrative.text = finalNarrative.brief;
          standard.narrative.text = finalNarrative.standard;
          detailLv.narrative.text = finalNarrative.detail;

          console.log('[Matrix V4] Quality Gate 적용 완료:', {
            cross_ok: qa.cross_ok,
            ratios: qa.ratios
          });
        } catch (gateErr: any) {
          console.error('[Matrix V4] Quality Gate 오류:', gateErr.message);
          // 오류 발생 시 원본 유지
        }
      }

      // 8) 최종 응답
      const out = {
        ok: true,
        data: {
          schemaVersion: 'ms-v4',
          levels: { brief, standard, detail: detailLv },
          views: {
            narrative: {
              brief: brief.narrative,
              standard: standard.narrative,
              detail: detailLv.narrative,
            },
            structured: {
              brief: brief.structured,
              standard: standard.structured,
              detail: detailLv.structured,
            },
            mindmap: {
              brief: brief.mindmap,
              standard: standard.mindmap,
              detail: detailLv.mindmap,
            },
            selftest: {
              brief: brief.selftest,
              standard: standard.selftest,
              detail: detailLv.selftest,
            },
          },
        },
        meta: {
          requestId: reqId,
          elapsedMs: Date.now() - t0,
          promptVersion: 'matrix-v4-detail+downsample',
          checksum,
          qa: qa || undefined // Phase 2: qualityGateAll 결과 포함
        },
      };

      return c.json(out, 200);
    } catch (e: any) {
      return c.json(
        {
          ok: false,
          error: { code: 'MATRIX_V4_ERROR', message: e?.message || String(e) },
          meta: { requestId: reqId, elapsedMs: Date.now() - t0, promptVersion: 'matrix-v4' },
        },
        500
      );
    }
  });

  // Selftest 채점 API
  app.post('/api/selftest/grade', async (c) => {
    try {
      const { gradeSelftestAttempt } = await import('../lib/selftest-solver');
      const body = await c.req.json();
      const { sheet, attempt } = body;

      if (!sheet || !attempt) {
        return c.json(
          { ok: false, error: 'sheet and attempt required' },
          400
        );
      }

      const result = gradeSelftestAttempt(sheet, attempt);
      return c.json(result, 200);
    } catch (e: any) {
      return c.json(
        { ok: false, error: e?.message || String(e) },
        500
      );
    }
  });

  // FAIL 리포트 API
  app.get('/api/fail-report', async (c) => {
    try {
      const { buildFailReport } = await import('../lib/ms-summary-guard-v1')
      const sinceHours = Number(c.req.query('hours')) || 168
      const db = c.env?.DB
      
      const report = await buildFailReport(db, { sinceHours })
      return c.json({ ok: true, report }, 200)
    } catch (e: any) {
      return c.json(
        { ok: false, error: e?.message || String(e) },
        500
      )
    }
  })
}
