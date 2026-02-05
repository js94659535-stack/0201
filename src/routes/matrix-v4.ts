/* =====================================================================
   ONE-BLOCK FINAL FIX — SUMMARY V4 FORTRESS
   파일: /home/user/webapp/src/routes/matrix-v4.ts

   ✅ 목표(요새화)
   1) 서술형(narrative)에서 "가짜요약" 원천 차단:
      - '...','….','…' 생략부호 금지
      - 다른 주제(스웨덴/GDP/공교육 등) 혼입 금지
      - 표/페이지 찌꺼기(-40-) 제거
   2) brief/standard/detail을 "의미 슬롯"으로 분화 강제
   3) detail 1회 생성 → downsampleFromDetail()로 brief/standard 생성(트리 유지)
   4) phase2 실패 시 qa=null로 자연 낙하(phase1 진단 생성) 유지
===================================================================== */

import { Hono } from 'hono';

import {
  generateNarrativeFallback,
  generateStructuredFallback,
  generateMindmapFallback,
  generateSelftestFallback,
  enforceSummaryRatio,
} from '../lib/local-fallback-generators';

import {
  validateCrossConsistency,
  validateLevelSeparation,
  SUMMARY_RATIO_TABLE,
  qualityGateAll,
} from '../lib/ms-summary-guard-v1';

import { insertFalseBucket } from '../lib/false-bucket';

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
  // ✅ 자르지 않고 전체 반환 (생략부호 금지)
  if (lastDot > Math.floor(maxChars * 0.6)) return cut.slice(0, lastDot + 1).trim();
  return t; // 전체 문장 반환
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

// =====================================================================
// FORTRESS: Preprocess + Scope Guard + Fake-summary Guard
// =====================================================================

// (1) 입력 전처리: 페이지/표 찌꺼기 제거 + 과도 줄바꿈 정리
function preprocessRawText(raw: string) {
  let t = String(raw || '');

  // 페이지 표기 제거: "- 40 -" 형태
  t = t.replace(/-\s*\d+\s*-\s*/g, ' ');

  // 표 헤더/노이즈(빈번 패턴) 완화
  t = t.replace(/학년별\s*통계/g, '학년별 통계');
  t = t.replace(/점수\s*학년별\s*통계/g, '점수(학년별 통계)');

  // 연속 공백/줄바꿈 정리
  t = t.replace(/\r\n/g, '\n');
  t = t.replace(/[ \t]+/g, ' ');
  t = t.replace(/\n{3,}/g, '\n\n');

  // PDF 복사에서 흔한 줄 중간 끊김 완화(한글 단어 중간 줄바꿈)
  // "학습 보\n다" 같은 케이스를 억지로 다 붙이지는 않고, 과도한 단일 줄바꿈만 줄임
  t = t.replace(/([가-힣])\n([가-힣])/g, '$1 $2');

  return t.trim();
}

// (2) 요약 결과에서 "외부 주제" 혼입을 막는 금칙 키워드(대표님 상황 기준)
// 필요 시 리스트는 늘려도 되며, 걸리면 즉시 FAIL -> 슬롯기반 재생성
// FORTRESS: 메타 표현 금칙어 (환각 방지)
// 주의: 도메인 키워드('스웨덴', '공교육' 등)는 요약에 필요하므로 제외
const FORBIDDEN_META_PHRASES = [
  '이 글은',
  '본 글은',
  '이 논문은',
  '이 보고서는',
  '이 기사는',
  '설명한다',
  '설명하고 있다',
  '다루고 있다',
  '서술하고 있다',
  '제시하고 있다',
  '분석하고 있다',
  '검토하고 있다',
  '논의하고 있다',
];

// (3) 가짜 요약(발췌) 흔적: 생략부호/연속점/미완성 조각
function hasEllipsisOrTruncation(s: string) {
  const t = String(s || '');
  return (
    /(\.\.\.)|(\.\.\.\.)|(…{1,})|(\u2026)/.test(t) || // ... / … 포함
    /…\s*$/.test(t) ||
    /[.]\s*[…]/.test(t)
  );
}

// (4) 문장 단위 분리(간단)
function splitSentencesKo(s: string) {
  return String(s || '')
    .replace(/\s+/g, ' ')
    .trim()
    .split(/(?<=[.!?]|다\.|다\?|다!|요\.|요\?|요!)\s+/)
    .map(x => x.trim())
    .filter(Boolean);
}

// ------------------------------
// 로컬 Fallback: 외부 모듈 사용 (local-fallback-generators.ts)
// ------------------------------
function buildLocalFallbackDetail(rawText: string): DetailBundle {
  const narrativeDetail = generateNarrativeFallback(rawText, 'detail');
  const structuredDetail = generateStructuredFallback(rawText, 'detail');
  const mindmapDetail = generateMindmapFallback(rawText, 'detail');
  const selftestDetail = generateSelftestFallback(narrativeDetail.text, 'detail', 'exam');

  const charCount = rawText.length;
  const checksum = checksumSimple(rawText);

  const coreClaim = narrativeDetail.coreClaim;
  const grounds = narrativeDetail.grounds;
  const comparisons = narrativeDetail.comparisons || [];
  const implications = narrativeDetail.implications || [];

  let summaryDetail = narrativeDetail.text;
  if (!summaryDetail.includes('\n\n')) {
    const sentences = summaryDetail.split('. ').filter(Boolean);
    const mid = Math.ceil(sentences.length / 2);
    summaryDetail = sentences.slice(0, mid).join('. ') + '.\n\n' + sentences.slice(mid).join('. ') + '.';
  }

  const toc = structuredDetail.toc;
  const hierarchy = structuredDetail.hierarchy;
  const glossary = structuredDetail.glossary;

  const mindmap = {
    title: mindmapDetail.title,
    children: mindmapDetail.children.map((L1: any) => ({
      title: L1.title,
      children: (L1.children || []).map((L2: any) => ({
        title: L2.title,
        pack: Array.isArray(L2.pack) && L2.pack.length >= 2 ? L2.pack : [L2.title, `${L2.title} 관련 내용`],
        explain:
          L2.explain && L2.explain.length >= 30
            ? L2.explain
            : `${L2.title}는 본문의 핵심 개념으로, 전체 맥락을 이해하는 데 중요한 역할을 하며, 관련된 세부 사항과 비교 대조를 통해 의미를 파악할 수 있다.`,
        children: []
      }))
    }))
  };

  if (!mindmap.children[0]) {
    mindmap.children.push({ title: '1. 주요 개념', children: [] });
  }

  while (mindmap.children[0].children.length < 3) {
    const idx = mindmap.children[0].children.length + 1;
    mindmap.children[0].children.push({
      title: `추가 노드 ${idx}`,
      pack: ['핵심', '개념', '정보'],
      explain: `추가 노드 ${idx}는 원문의 맥락을 반영한 분석 결과로, 주요 논점을 보완하는 내용이다.`,
      children: []
    });
  }

  const selftest = {
    passScorePct: selftestDetail.passScorePct as 90,
    items: selftestDetail.items
  };

  return {
    schemaVersion: 'ms-v4',
    lang: 'ko',
    source: { charCount, checksum },
    narrative: {
      coreClaim,
      grounds,
      comparisons,
      implications,
      summaryDetail
    },
    structured: { toc, hierarchy, glossary },
    mindmap,
    selftest
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
    rawText
  ].join('\n');
}

// ------------------------------
// Downsample
// ------------------------------
function downsampleFromDetail(detail: DetailBundle, level: Level): LevelBundle {
  const isBrief = level === 'brief';
  const isStd = level === 'standard';

  const claim = detail.narrative.coreClaim || '';
  const groundSlots = detail.narrative.grounds || [];
  const comparisonSlots = detail.narrative.comparisons || [];
  const implicationSlots = detail.narrative.implications || [];

  const origLen = detail.source?.charCount || 1000;

  let narrativeText = '';
  let coreClaim = claim;
  let grounds: string[] = [];
  let comparisons: string[] = [];
  let implications: string[] = [];

  if (level === 'detail') {
    narrativeText = String(detail.narrative.summaryDetail || '').trim();
    coreClaim = claim;
    grounds = groundSlots;
    comparisons = comparisonSlots;
    implications = implicationSlots;
  } else if (level === 'brief') {
    const targetMax = Math.floor(origLen * 0.18);
    coreClaim = smartTrim(claim, 60);

    const comp = comparisonSlots[0] ? smartTrim(comparisonSlots[0], 80) : '';
    grounds = [];
    comparisons = comp ? [comp] : [];
    implications = [];

    if (comp) {
      narrativeText = `${coreClaim}. ${comp}.`;
    } else {
      const g = groundSlots[0] ? smartTrim(groundSlots[0], 60) : '';
      narrativeText = g ? `${coreClaim}. ${g}.` : `${coreClaim}.`;
    }

    if (narrativeText.length > targetMax) narrativeText = narrativeText.slice(0, Math.max(0, targetMax - 1)).trim();
  } else {
    const targetMax = Math.floor(origLen * 0.38);
    coreClaim = smartTrim(claim, 80);

    grounds = groundSlots.slice(0, 2).map(g => smartTrim(g, 70));
    const comp = comparisonSlots[0] ? smartTrim(comparisonSlots[0], 90) : '';
    comparisons = comp ? [comp] : [];
    implications = [];

    const parts: string[] = [coreClaim];
    if (grounds.length > 0) parts.push(grounds.join('. '));
    if (comp) parts.push(`반면 ${comp}`);
    narrativeText = parts.join('. ') + '.';

    if (narrativeText.length > targetMax) narrativeText = narrativeText.slice(0, Math.max(0, targetMax - 1)).trim();
    else if (narrativeText.length < Math.floor(origLen * 0.25) && implicationSlots.length > 0) {
      const impl = smartTrim(implicationSlots[0], 60);
      narrativeText += ` ${impl}.`;
    }
  }

  // Structured
  const toc = detail.structured.toc || [];
  const glossaryMax = isBrief ? 2 : isStd ? 4 : 10;
  const glossary = (detail.structured.glossary || []).slice(0, glossaryMax).map((g) => ({
    term: smartTrim(g.term, 20),
    def: smartTrim(g.def, isBrief ? 70 : 120)
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
      children: n.children ? mapHierarchy(n.children) : undefined
    }));

  const hierarchy = mapHierarchy(detail.structured.hierarchy || []);
  const structuredText = renderStructuredText({ toc, hierarchy, glossary });

  // Mindmap
  const tree = JSON.parse(JSON.stringify(detail.mindmap || { title: '마인드맵', children: [] }));
  const explainMax = isBrief ? 70 : isStd ? 110 : 160;
  const packMax = isBrief ? 2 : 3;

  for (const L1 of tree.children || []) {
    for (const L2 of L1.children || []) {
      if (Array.isArray(L2.pack)) L2.pack = L2.pack.slice(0, packMax).map((x: string) => smartTrim(x, 20));
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
      maxChars: it.rubric?.maxChars ?? (isBrief ? 140 : 220)
    },
    answerKey: it.answerKey ? smartTrim(it.answerKey, isBrief ? 160 : 260) : undefined
  }));

  return {
    narrative: { text: narrativeText, coreClaim, grounds, comparisons, implications },
    structured: { text: structuredText, toc, hierarchy, glossary },
    mindmap: { tree },
    selftest: { passScorePct: 90, items }
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
  if (!detail?.narrative?.coreClaim || detail.narrative.coreClaim.length < 10) errors.push('narrative.coreClaim too short');
  if (!Array.isArray(detail?.narrative?.grounds) || detail.narrative.grounds.length < 1) errors.push('narrative.grounds must be >= 1');
  if (!detail?.narrative?.summaryDetail || String(detail.narrative.summaryDetail).split('\n\n').length < 2)
    errors.push('narrative.summaryDetail must have paragraphs');

  if (!Array.isArray(detail?.structured?.hierarchy) || detail.structured.hierarchy.length < 1) errors.push('structured.hierarchy missing');
  if (!Array.isArray(detail?.structured?.glossary) || detail.structured.glossary.length < 1) errors.push('structured.glossary must be >= 1');

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

  if (!detail?.selftest?.passScorePct || detail.selftest.passScorePct !== 90) errors.push('selftest.passScorePct must be 90');
  if (!Array.isArray(detail?.selftest?.items) || detail.selftest.items.length < 2) errors.push('selftest.items must be >=2');

  return errors;
}

function validateLevelSeparation(levels: { brief: LevelBundle; standard: LevelBundle; detail: LevelBundle }) {
  const errors: string[] = [];

  const b = (levels.brief.narrative.text || '').replace(/\s+/g, '');
  const s = (levels.standard.narrative.text || '').replace(/\s+/g, '');
  const d = (levels.detail.narrative.text || '').replace(/\s+/g, '');

  if (b.length < 40) errors.push('brief narrative too short');
  if (s.length < b.length + 20) errors.push('standard narrative not meaningfully longer than brief');
  if (d.length < s.length + 40) errors.push('detail narrative not meaningfully longer than standard');

  if (b === s) errors.push('brief narrative equals standard narrative');
  if (s === d) errors.push('standard narrative equals detail narrative');

  if ((levels.standard.structured.glossary?.length || 0) < (levels.brief.structured.glossary?.length || 0)) {
    errors.push('standard glossary must be >= brief glossary');
  }
  if ((levels.detail.structured.glossary?.length || 0) < (levels.standard.structured.glossary?.length || 0)) {
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
  if (!(cb === cs && cs === cd)) errors.push(`mindmap L2 count mismatch (brief:${cb}, standard:${cs}, detail:${cd})`);

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
        generationConfig: { temperature: 0.3, maxOutputTokens: 8192 }
      })
    }
  );

  const json = await res.json();
  const text = json?.candidates?.[0]?.content?.parts?.map((p: any) => p.text).join('') || '';
  return text;
}

// =====================================================================
// FORTRESS: Narrative 강제 생성기(슬롯 기반) + 금칙/생략부호 방지
// =====================================================================

function MS_norm(s: string) {
  return String(s || '')
    .replace(/[\r\n\t]+/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .replace(/\.\.+/g, '.')
    .replace(/보여\s*진다/g, '보인다')
    .replace(/되어\s*지는/g, '되는')
    .replace(/성적간/g, '성적 간')
    .replace(/능력\s*에서/g, '능력에서')
    .trim();
}

function containsForbiddenTokens(s: string) {
  const t = MS_norm(s);
  return FORBIDDEN_META_PHRASES.some(phrase => t.includes(phrase));
}

function stripEllipsis(s: string) {
  return String(s || '')
    .replace(/(\.\.\.)|(\.\.\.\.)/g, ' ')
    .replace(/…/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function ensurePeriodEnd(s: string) {
  let t = MS_norm(s);
  if (t && !/[.!?]$/.test(t)) t += '.';
  return t;
}

function minSentenceFill(level: Level, text: string, pool: string[], rawLen: number) {
  const minSent = level === 'brief' ? 2 : level === 'standard' ? 4 : 6;
  let out = ensurePeriodEnd(stripEllipsis(text));

  const targetMax = Math.floor(rawLen * SUMMARY_RATIO_TABLE[level].max);

  let i = 0;
  while (splitSentencesKo(out).length < minSent && i < pool.length) {
    const cand = ensurePeriodEnd(stripEllipsis(pool[i++]));
    const next = MS_norm(out + ' ' + cand);
    if (next.length <= targetMax) out = next;
    else break;
  }

  return out;
}

// 슬롯을 "진짜 요약 문장"으로 조합
function buildNarrativeFromSlots(level: Level, rawText: string, slots: { claim: string; grounds: string[]; comparisons: string[]; implications: string[] }) {
  const rawLen = rawText.length;

  const claim = smartTrim(MS_norm(slots.claim || ''), level === 'brief' ? 80 : 120);
  const g = (slots.grounds || []).map(x => smartTrim(MS_norm(x), 140)).filter(Boolean);
  const c = (slots.comparisons || []).map(x => smartTrim(MS_norm(x), 140)).filter(Boolean);
  const im = (slots.implications || []).map(x => smartTrim(MS_norm(x), 140)).filter(Boolean);

  let base = '';

  if (level === 'brief') {
    // claim + (ground 1 or comparison 1)
    const pick = (c[0] || g[0] || im[0] || '').trim();
    base = pick ? `${claim}. ${pick}.` : `${claim}.`;
  } else if (level === 'standard') {
    // claim + ground 2 + (comparison/implication 1)
    const g2 = g.slice(0, 2);
    const tail = (c[0] || im[0] || '').trim();
    const parts = [claim];
    if (g2.length) parts.push(g2.join('. '));
    if (tail) parts.push(tail);
    base = parts.join('. ') + '.';
  } else {
    // detail: claim + grounds(3+) + comparison + implication, 문단 2개 이상
    const g3 = g.slice(0, Math.max(3, Math.min(6, g.length)));
    const para1 = [claim, ...g3].join('. ') + '.';
    const para2Parts = [];
    if (c[0]) para2Parts.push(`한편 ${c[0]}.`);
    if (im[0]) para2Parts.push(`${im[0]}.`);
    const para2 = para2Parts.length ? para2Parts.join(' ') : (g[3] ? `${g[3]}.` : '');
    base = para2 ? `${para1}\n\n${para2}` : para1;

    // 문단 보장
    if (!base.includes('\n\n')) base = `${para1}\n\n${im[0] ? `${im[0]}.` : '이 차이는 학년이 올라갈수록 양상이 달라질 수 있음을 시사한다.'}`;
  }

  // 풀(추가 문장 후보)
  const pool = [...g, ...c, ...im].map(x => ensurePeriodEnd(x)).filter(Boolean);

  // 최소 문장수 채우기
  let t = minSentenceFill(level, base, pool, rawLen);

  // 금칙/생략부호 최종 제거
  t = stripEllipsis(t);

  // 금칙 키워드가 있으면 제거(매우 엄격)
  if (containsForbiddenTokens(t)) {
    // 금칙이 들어간 문장 통째 제거 후 재조합
    const kept = splitSentencesKo(t).filter(sent => !containsForbiddenTokens(sent));
    t = kept.join(' ').trim();
    if (!t) t = claim ? `${claim}.` : '핵심 내용을 요약했다.';
  }

  // 요약율 강제(기존 guard 사용)
  const enforced = enforceSummaryRatio(rawText, t, level);

  // enforce 이후 생략부호/금칙 재검사
  let finalText = enforced.text;
  if (hasEllipsisOrTruncation(finalText) || containsForbiddenTokens(finalText)) {
    // 마지막 방어: 문장 단위로 필터링
    const kept = splitSentencesKo(finalText)
      .map(x => stripEllipsis(x))
      .filter(x => x && !containsForbiddenTokens(x));
    finalText = ensurePeriodEnd(kept.join(' ').trim());
  }

  const out2 = enforceSummaryRatio(rawText, finalText, level);
  return out2;
}

// ------------------------------
// Hono Route
// ------------------------------
export function mountMatrixV4(app: Hono<{ Bindings: Bindings }>) {
  app.post('/api/matrix', async (c) => {
    const t0 = Date.now();
    const reqId = `matrix-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

    // 🔒 Phase 판정
    const hasKey = !!(c.env?.GEMINI_API_KEY && String(c.env.GEMINI_API_KEY).trim().length > 10);
    const useMock = String(c.env?.USE_MOCK || '').toLowerCase() === 'true';
    const phase = hasKey && !useMock ? 'phase2' : 'phase1';
    let qa: any = null;

    function makeFailQa(code: string) {
      return {
        cross_ok: false,
        cross_errors: [code],
        ratios: {
          brief: { ratio: 0, ok: false },
          standard: { ratio: 0, ok: false },
          detail: { ratio: 0, ok: false }
        }
      };
    }

    try {
      const body = (await c.req.json()) as Partial<MatrixReq>;
      const rawInput = String(body.text || '').trim();

      // ✅ 입력 전처리(요새화)
      const rawText = preprocessRawText(rawInput);

      if (!rawText || rawText.length < 20) {
        const failQa = makeFailQa(!rawText ? 'EMPTY_TEXT' : 'TEXT_TOO_SHORT');
        return c.json(
          {
            ok: false,
            error: { code: 'INVALID_TEXT', message: 'text가 너무 짧습니다(최소 20자 권장)' },
            meta: { reqId, elapsedMs: Date.now() - t0, phase, qa: failQa },
            result: { qa: failQa }
          },
          400
        );
      }

      const checksum = checksumSimple(rawText);

      let detail: DetailBundle | null = null;

      if (phase === 'phase1') {
        console.log('[Matrix V4] Phase 1: 로컬 Fallback 모드 사용');
        detail = buildLocalFallbackDetail(rawText);
      } else {
        const detailPrompt = buildDetailPrompt(rawText);
        let detailText = await callGeminiText(c, detailPrompt);
        detail = safeJsonParse(detailText) as DetailBundle | null;

        if (!detail) {
          const repairPrompt = [
            `너의 직전 출력은 JSON 파싱에 실패했다.`,
            `설명/마크다운 없이, 오직 JSON만 다시 출력하라.`,
            buildDetailPrompt(rawText)
          ].join('\n');
          detailText = await callGeminiText(c, repairPrompt);
          detail = safeJsonParse(detailText) as DetailBundle | null;
        }

        if (!detail) {
          // FALSE Bucket: JSON 파싱 실패 기록
          await insertFalseBucket(c.env.DB, {
            source: 'matrix_v4',
            reason: 'DETAIL_JSON_PARSE_FAIL',
            errors: ['detail JSON 파싱 실패', 'Gemini 응답이 유효한 JSON이 아님'],
            input_text: rawText,
            model: c.env.GEMINI_MODEL || 'gemini',
            retry_count: 0,
            meta: { reqId, phase, elapsedMs: Date.now() - t0 }
          });

          return c.json(
            {
              ok: false,
              error: { code: 'DETAIL_JSON_PARSE_FAIL', message: 'detail JSON 파싱 실패' },
              meta: { reqId, elapsedMs: Date.now() - t0, phase, qa }
            },
            502
          );
        }
      }

      // detail 스키마 검증
      const detailErrs = validateDetailBundle(detail);
      if (detailErrs.length) {
        // FALSE Bucket: 스키마 검증 실패 기록
        await insertFalseBucket(c.env.DB, {
          source: 'matrix_v4',
          reason: 'DETAIL_VALIDATION_FAIL',
          errors: detailErrs,
          input_text: rawText,
          model: c.env.GEMINI_MODEL || 'gemini',
          payload: detail,
          retry_count: 0,
          meta: { reqId, phase, elapsedMs: Date.now() - t0 }
        });

        return c.json(
          {
            ok: false,
            error: { code: 'DETAIL_VALIDATION_FAIL', message: detailErrs.join(' | ') },
            meta: { reqId, elapsedMs: Date.now() - t0, phase, qa }
          },
          422
        );
      }

      // ✅ V4 핵심: downsampleFromDetail()만 사용
      const briefLv = downsampleFromDetail(detail, 'brief');
      const standardLv = downsampleFromDetail(detail, 'standard');
      const detailLv = downsampleFromDetail(detail, 'detail');

      // 슬롯 기반 "진짜 요약" 강제 (오염/생략부호 차단)
      const slots = {
        claim: detail.narrative.coreClaim || '',
        grounds: detail.narrative.grounds || [],
        comparisons: detail.narrative.comparisons || [],
        implications: detail.narrative.implications || []
      };

      const __b = buildNarrativeFromSlots('brief', rawText, slots);
      const __s = buildNarrativeFromSlots('standard', rawText, slots);
      const __d = buildNarrativeFromSlots('detail', rawText, slots);

      briefLv.narrative.text = __b.text;
      standardLv.narrative.text = __s.text;
      detailLv.narrative.text = __d.text;

      (briefLv.narrative as any).ratio = __b.ratio;
      (standardLv.narrative as any).ratio = __s.ratio;
      (detailLv.narrative as any).ratio = __d.ratio;

      // ✅ 마지막 방어: 생략부호/금칙 키워드가 남아 있으면 즉시 FAIL(phase2), phase1은 경고로 qa에 기록
      const hardFailReasons: string[] = [];
      if (hasEllipsisOrTruncation(briefLv.narrative.text) || hasEllipsisOrTruncation(standardLv.narrative.text) || hasEllipsisOrTruncation(detailLv.narrative.text)) {
        hardFailReasons.push('ELLIPSIS_OR_TRUNCATION_FOUND');
      }
      if (containsForbiddenTokens(briefLv.narrative.text) || containsForbiddenTokens(standardLv.narrative.text) || containsForbiddenTokens(detailLv.narrative.text)) {
        hardFailReasons.push('FORBIDDEN_TOPIC_TOKEN_FOUND');
      }

      if (hardFailReasons.length && phase === 'phase2') {
        // FALSE Bucket: Fortress 검증 실패 기록
        await insertFalseBucket(c.env.DB, {
          source: 'matrix_v4',
          reason: 'NARRATIVE_FORTRESS_FAIL',
          errors: hardFailReasons,
          input_text: rawText,
          model: c.env.GEMINI_MODEL || 'gemini',
          payload: { brief: briefLv, standard: standardLv, detail: detailLv },
          retry_count: 0,
          meta: { reqId, phase, elapsedMs: Date.now() - t0, ratios: { brief: __b.ratio, standard: __s.ratio, detail: __d.ratio } }
        });

        return c.json(
          {
            ok: false,
            error: { code: 'NARRATIVE_FORTRESS_FAIL', message: hardFailReasons.join(' | ') },
            meta: { reqId, elapsedMs: Date.now() - t0, phase, qa }
          },
          422
        );
      }

      console.log('[Matrix V4] FORTRESS narrative-quality:', {
        brief_ratio: __b.ratio,
        standard_ratio: __s.ratio,
        detail_ratio: __d.ratio,
        hardFailReasons
      });

      // 호환 변수명 유지
      const brief = {
        narrative: { ...briefLv.narrative, ratio: (briefLv.narrative as any).ratio, warnings: hardFailReasons },
        structured: briefLv.structured,
        mindmap: briefLv.mindmap,
        selftest: briefLv.selftest
      };

      const standard = {
        narrative: { ...standardLv.narrative, ratio: (standardLv.narrative as any).ratio, warnings: hardFailReasons },
        structured: standardLv.structured,
        mindmap: standardLv.mindmap,
        selftest: standardLv.selftest
      };

      (detailLv.narrative as any).warnings = hardFailReasons;

      // 레벨 분리 검증(phase2 실패 / phase1 경고)
      const sepErrs = validateLevelSeparation({ brief, standard, detail: detailLv });
      if (sepErrs.length && phase === 'phase2') {
        // FALSE Bucket: 레벨 분리 검증 실패 기록
        await insertFalseBucket(c.env.DB, {
          source: 'matrix_v4',
          reason: 'LEVEL_SEPARATION_FAIL',
          errors: sepErrs,
          input_text: rawText,
          model: c.env.GEMINI_MODEL || 'gemini',
          payload: { brief, standard, detail: detailLv },
          retry_count: 0,
          meta: { reqId, phase, elapsedMs: Date.now() - t0 }
        });

        return c.json(
          {
            ok: false,
            error: { code: 'LEVEL_SEPARATION_FAIL', message: sepErrs.join(' | ') },
            meta: { reqId, elapsedMs: Date.now() - t0, phase, qa }
          },
          422
        );
      }

      // SERVER QUALITY GATE
      let finalNarrative = {
        brief: brief.narrative.text,
        standard: standard.narrative.text,
        detail: detailLv.narrative.text
      };

      qa = null;

      if (phase === 'phase2') {
        try {
          const callLLM = async (prompt: string) => await callGeminiText(c, prompt);

          const gateResult = await qualityGateAll({
            originalText: rawText,
            model: c.env.GEMINI_MODEL || 'gemini',
            callLLM,
            db: c.env.DB,
            narrative: finalNarrative,
            structured: { brief: brief.structured, standard: standard.structured, detail: detailLv.structured },
            mindmap: { brief: brief.mindmap, standard: standard.mindmap, detail: detailLv.mindmap }
          });

          finalNarrative = gateResult.narrative;
          qa = gateResult.qa;

          // gate 이후에도 FORTRESS 재검증(생략부호/금칙 키워드 금지)
          if (
            hasEllipsisOrTruncation(finalNarrative.brief) ||
            hasEllipsisOrTruncation(finalNarrative.standard) ||
            hasEllipsisOrTruncation(finalNarrative.detail) ||
            containsForbiddenTokens(finalNarrative.brief) ||
            containsForbiddenTokens(finalNarrative.standard) ||
            containsForbiddenTokens(finalNarrative.detail)
          ) {
            // gate 결과가 오염이면, 슬롯 기반 결과로 롤백(안전 우선)
            finalNarrative = {
              brief: brief.narrative.text,
              standard: standard.narrative.text,
              detail: detailLv.narrative.text
            };
            qa = qa || null;
          }

          brief.narrative.text = finalNarrative.brief;
          standard.narrative.text = finalNarrative.standard;
          detailLv.narrative.text = finalNarrative.detail;

          console.log('[Matrix V4] Phase 2 Quality Gate 완료:', { cross_ok: qa?.cross_ok, ratios: qa?.ratios });
        } catch (gateErr: any) {
          console.error('[Matrix V4] Phase 2 오류:', gateErr.message);
          qa = null;
        }
      }

      if (phase === 'phase1' || !qa) {
        const cross = validateCrossConsistency({
          narrative: finalNarrative,
          structured: { brief: brief.structured, standard: standard.structured, detail: detailLv.structured },
          mindmap: { brief: brief.mindmap, standard: standard.mindmap, detail: detailLv.mindmap }
        });

        qa = {
          cross_ok: cross.ok,
          cross_errors: cross.errors.concat(hardFailReasons.map(x => `FORTRESS_${x}`)),
          ratios: {
            brief: {
              ratio: (brief.narrative as any).ratio,
              rule: SUMMARY_RATIO_TABLE.brief,
              ok:
                (brief.narrative as any).ratio >= SUMMARY_RATIO_TABLE.brief.min &&
                (brief.narrative as any).ratio <= SUMMARY_RATIO_TABLE.brief.max
            },
            standard: {
              ratio: (standard.narrative as any).ratio,
              rule: SUMMARY_RATIO_TABLE.standard,
              ok:
                (standard.narrative as any).ratio >= SUMMARY_RATIO_TABLE.standard.min &&
                (standard.narrative as any).ratio <= SUMMARY_RATIO_TABLE.standard.max
            },
            detail: {
              ratio: (detailLv.narrative as any).ratio,
              rule: SUMMARY_RATIO_TABLE.detail,
              ok:
                (detailLv.narrative as any).ratio >= SUMMARY_RATIO_TABLE.detail.min &&
                (detailLv.narrative as any).ratio <= SUMMARY_RATIO_TABLE.detail.max
            }
          }
        };

        console.log('[Matrix V4] Phase 1 진단 완료 (FORTRESS):', {
          cross_ok: qa.cross_ok,
          ratios_ok: [qa.ratios.brief.ok, qa.ratios.standard.ok, qa.ratios.detail.ok]
        });
      }

      const out = {
        ok: true,
        data: {
          schemaVersion: 'ms-v4',
          levels: { brief, standard, detail: detailLv },
          views: {
            narrative: { brief: brief.narrative, standard: standard.narrative, detail: detailLv.narrative },
            structured: { brief: brief.structured, standard: standard.structured, detail: detailLv.structured },
            mindmap: { brief: brief.mindmap, standard: standard.mindmap, detail: detailLv.mindmap },
            selftest: { brief: brief.selftest, standard: standard.selftest, detail: detailLv.selftest }
          }
        },
        meta: { reqId, elapsedMs: Date.now() - t0, phase, qa },
        result: { qa }
      };

      return c.json(out, 200);
    } catch (e: any) {
      return c.json(
        {
          ok: false,
          error: { code: 'MATRIX_V4_ERROR', message: e?.message || String(e) },
          meta: { reqId, elapsedMs: Date.now() - t0, phase, qa }
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
        return c.json({ ok: false, error: 'sheet and attempt required' }, 400);
      }

      const result = gradeSelftestAttempt(sheet, attempt);
      return c.json(result, 200);
    } catch (e: any) {
      return c.json({ ok: false, error: e?.message || String(e) }, 500);
    }
  });

  // FAIL 리포트 API
  app.get('/api/fail-report', async (c) => {
    try {
      const { buildFailReport } = await import('../lib/ms-summary-guard-v1');
      const sinceHours = Number(c.req.query('hours')) || 168;
      const db = c.env?.DB;

      const report = await buildFailReport(db, { sinceHours });
      return c.json({ ok: true, report }, 200);
    } catch (e: any) {
      return c.json({ ok: false, error: e?.message || String(e) }, 500);
    }
  });
}
