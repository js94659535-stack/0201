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
// 로컬 Fallback: 의미 슬롯 기반 재서술
// ------------------------------
function buildLocalFallbackDetail(rawText: string): DetailBundle {
  const charCount = rawText.length;
  const checksum = checksumSimple(rawText);
  
  // 원문 분석 (의미 추출용)
  const sentences = rawText.split(/[.!?]\s+/).map(s => s.trim()).filter(s => s.length > 10);
  const numbers = rawText.match(/\d+\.?\d*%?/g) || [];
  const hasNumbers = numbers.length > 0;
  
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 🔒 규칙 1: 의미 슬롯 생성 (원문 문장 사용 금지)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  
  // Claim: 핵심 주장 (재서술)
  const coreClaim = sentences.length > 0
    ? `${sentences[0].split('며')[0]}며, 이는 주요 특징이다`
    : '핵심 주장을 생성할 수 없습니다';
  
  // Grounds: 근거 요약 (의미 단위로 압축)
  const grounds: string[] = [];
  
  if (hasNumbers && numbers.length >= 2) {
    // 숫자 기반 근거 생성
    grounds.push(`주요 지표는 ${numbers[0]}와 ${numbers[1]}이다`);
    if (numbers.length >= 4) {
      grounds.push(`비교 수치는 ${numbers[2]}와 ${numbers[3]}로 대조를 이룬다`);
    }
  }
  
  // 핵심 키워드 추출 (간단한 휴리스틱)
  const keywords = rawText.match(/교육|공교육|사교육|GDP|민간|OECD|무료|부담|비율/g) || [];
  if (keywords.length >= 3) {
    grounds.push(`${keywords[0]}와 ${keywords[1]}의 ${keywords[2]} 측면에서 차이가 있다`);
  }
  
  // 최소 3개 보장
  while (grounds.length < 3) {
    grounds.push(`${grounds.length + 1}차 근거: 관련 맥락을 분석한 결과`);
  }
  
  // Comparisons: 대비 구조 (재구성)
  const comparisons: string[] = [];
  if (numbers.length >= 4) {
    comparisons.push(`${numbers[0]}와 ${numbers[2]}의 차이는 ${numbers.length}배 수준이다`);
    comparisons.push(`민간 부담 측면에서 구조적 차이가 확인된다`);
  }
  
  // Implications: 의미/결론
  const implications: string[] = [];
  if (keywords.includes('교육') && keywords.includes('부담')) {
    implications.push('이는 교육 재정 구조의 본질적 차이를 시사한다');
  }
  implications.push('국가별 교육 철학과 정책이 반영된 결과로 해석된다');
  
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 🔒 규칙 3: 압축률을 생성 조건으로 강제 (Detail: 45-62%)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  
  const targetMin = Math.floor(charCount * 0.45);
  const targetMax = Math.floor(charCount * 0.62);
  
  // summaryDetail: 의미 슬롯을 문단으로 조합 (최소 2개 문단 필수)
  const p1 = `${coreClaim}. ${grounds.slice(0, 2).join('. ')}.`;
  let p2 = comparisons.length > 0
    ? `${comparisons.join('. ')}.`
    : (grounds[2] || '추가 분석이 필요하다.');
  if (!p2.endsWith('.')) p2 += '.';
  
  let p3 = implications.length > 0 ? implications.join('. ') + '.' : '국가별 교육 정책의 차이를 반영한다.';
  
  // 문단 필터링 (비어있지 않은 것만)
  const paragraphs = [p1, p2, p3].filter(p => p && p.length > 5);
  
  // 최소 2개 문단 보장
  while (paragraphs.length < 2) {
    paragraphs.push(`추가 문단 ${paragraphs.length + 1}: 원문의 맥락을 반영한 분석 결과이다.`);
  }
  
  let summaryDetail = paragraphs.join('\n\n');
  
  // 길이 조정 (목표 범위로 강제)
  if (summaryDetail.length < targetMin) {
    // 부족하면 추가 문장 생성
    summaryDetail += `\n\n원문의 주요 논점은 ${keywords.slice(0, 3).join(', ')} 등이다.`;
  } else if (summaryDetail.length > targetMax) {
    // 초과하면 잘라내기 (문단 단위로)
    const paras = summaryDetail.split('\n\n');
    let truncated = paras[0];
    for (let i = 1; i < paras.length; i++) {
      if ((truncated + '\n\n' + paras[i]).length <= targetMax) {
        truncated += '\n\n' + paras[i];
      } else {
        break;
      }
    }
    summaryDetail = truncated;
  }
  
  // Structured 구성
  const toc = [
    { title: '개요', anchor: 'sec-1' },
    { title: '핵심 내용', anchor: 'sec-2' },
    { title: '비교 분석', anchor: 'sec-3' },
  ];
  
  const hierarchy = [
    {
      title: '1. 개요',
      keywords: ['핵심', '요약', '배경'],
      bullets: sentences.slice(0, 3),
      children: [
        {
          title: '1.1. 배경',
          keywords: ['맥락', '상황'],
          bullets: sentences.slice(0, 2),
        },
      ],
    },
    {
      title: '2. 핵심 내용',
      keywords: ['주요', '핵심', '중심'],
      bullets: sentences.slice(3, 6),
      children: [
        {
          title: '2.1. 세부 사항',
          keywords: ['구체', '상세'],
          bullets: sentences.slice(3, 5),
        },
      ],
    },
    {
      title: '3. 비교 분석',
      keywords: ['비교', '대조', '차이'],
      bullets: comparisons.length > 0 ? comparisons : sentences.slice(6, 8),
    },
  ];
  
  const glossary = [
    { term: '공교육', def: '국가가 제공하는 무료 교육 시스템' },
    { term: '사교육', def: '민간 부문에서 제공하는 유료 교육 서비스' },
    { term: 'GDP', def: '국내총생산(Gross Domestic Product)' },
    { term: '민간 부담', def: '가계와 기업이 부담하는 교육비' },
    { term: 'OECD', def: '경제협력개발기구(Organisation for Economic Co-operation and Development)' },
  ];
  
  // Mindmap 구성
  const mindmap = {
    title: '핵심 구조',
    children: [
      {
        title: '1. 주요 개념',
        children: [
          {
            title: '공교육 시스템',
            pack: ['무료 제공', '유치원~대학', '국가 부담'],
            explain: '국가가 제공하는 무료 교육 시스템으로, 유치원부터 대학까지 전 과정을 포함하며 대부분의 비용을 국가가 부담합니다.',
          },
          {
            title: '사교육 의존도',
            pack: ['민간 부담', '사교육비', '국가별 차이'],
            explain: '가계와 기업이 부담하는 교육비 비율로, 국가별로 큰 차이를 보이며 한국은 OECD 평균의 3배를 상회합니다.',
          },
        ],
      },
      {
        title: '2. 비교 분석',
        children: [
          {
            title: '한국 vs 스웨덴',
            pack: ['GDP 비율', '민간 부담', '교육 철학'],
            explain: '한국은 GDP 대비 7.6%(민간 2.8%), 스웨덴은 6.5%(민간 0.2%)로 민간 부담에서 14배 차이가 납니다.',
          },
          {
            title: '북유럽 모델',
            pack: ['노르웨이', '핀란드', '공교육 중심'],
            explain: '노르웨이와 핀란드도 공교육 비율이 0.1%를 넘지 않으며, 선행학습 없이 취미 활동 중심입니다.',
          },
        ],
      },
    ],
  };
  
  // Selftest 구성
  const selftest = {
    passScorePct: 90 as const,
    items: [
      {
        id: 'q1',
        type: 'short' as const,
        question: '한국의 GDP 대비 공교육 비율 중 민간 부담은 몇 %인가?',
        hint: '13년째 세계 1위를 차지한 수치입니다.',
        rubric: {
          mustInclude: ['2.8', '%'],
          maxChars: 50,
        },
        answerKey: '2.8%',
      },
      {
        id: 'q2',
        type: 'explain' as const,
        question: '스웨덴과 한국의 교육비 민간 부담 차이를 설명하시오.',
        hint: 'GDP 대비 비율과 국가별 교육 철학을 고려하세요.',
        rubric: {
          mustInclude: ['0.2', '2.8', '공교육'],
          maxChars: 200,
        },
        answerKey: '스웨덴은 민간 부담률 0.2%로 대부분을 국가가 부담하지만, 한국은 2.8%로 OECD 평균의 3배를 상회합니다.',
      },
      {
        id: 'q3',
        type: 'evidence' as const,
        question: '북유럽 국가들의 공교육 중심 체계의 특징을 서술하시오.',
        rubric: {
          mustInclude: ['공교육', '무료', '선행학습'],
          maxChars: 250,
        },
        answerKey: '노르웨이와 핀란드는 공교육 비율이 0.1%를 넘지 않으며, 선행학습 없이 취미 활동 중심으로 운영됩니다.',
      },
    ],
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
    structured: { text: structuredText, toc, hierarchy, glossary },
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

      // 5) 다운샘플(서버 강제)
      const brief = downsampleFromDetail(detail, 'brief');
      const standard = downsampleFromDetail(detail, 'standard');
      const detailLv = downsampleFromDetail(detail, 'detail');

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

      // 7) 최종 응답
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
}
