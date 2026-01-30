// =======================================================
// Structured Summary Hierarchical Consistency Enforcer
// - brief ⊂ standard ⊂ detail (JSON 필드/배열 원소 포함)
// - anchor in all
// =======================================================

interface StructuredOutline {
  purpose: string[];
  background: string[];
  method_or_process: string[];
  results_or_claims: string[];
  implications: string[];
}

interface StructuredSummary {
  anchor: string;
  outline: StructuredOutline;
}

function norm(s: string): string {
  return (s || '')
    .replace(/\s+/g, ' ')
    .replace(/["""]/g, '"')
    .replace(/[''']/g, "'")
    .trim();
}

function normalizeArray(arr: string[]): string[] {
  return (arr || []).map(s => norm(s)).filter(Boolean);
}

function arrayIncludes(container: string[], required: string[]): boolean {
  // 필수 배열의 모든 원소가 컨테이너에 포함되어 있는지 확인
  const containerSet = new Set(container.map(s => norm(s)));
  return required.every(r => containerSet.has(norm(r)));
}

function ensureArrayContains(container: string[], required: string[]): string[] {
  const containerNorm = normalizeArray(container);
  const requiredNorm = normalizeArray(required);
  
  // 이미 포함되어 있으면 그대로 반환
  if (arrayIncludes(containerNorm, requiredNorm)) {
    return containerNorm;
  }
  
  // 포함되지 않은 항목을 앞에 추가 (Snowball repair)
  const containerSet = new Set(containerNorm.map(s => norm(s)));
  const missing = requiredNorm.filter(r => !containerSet.has(norm(r)));
  
  return [...missing, ...containerNorm];
}

function ensureOutlineContains(
  container: StructuredOutline,
  required: StructuredOutline
): StructuredOutline {
  return {
    purpose: ensureArrayContains(container.purpose, required.purpose),
    background: ensureArrayContains(container.background, required.background),
    method_or_process: ensureArrayContains(container.method_or_process, required.method_or_process),
    results_or_claims: ensureArrayContains(container.results_or_claims, required.results_or_claims),
    implications: ensureArrayContains(container.implications, required.implications),
  };
}

function validateSnowball(
  brief: StructuredOutline,
  standard: StructuredOutline,
  detail: StructuredOutline
): { briefInStandard: boolean; standardInDetail: boolean } {
  const briefInStandard =
    arrayIncludes(standard.purpose, brief.purpose) &&
    arrayIncludes(standard.background, brief.background) &&
    arrayIncludes(standard.method_or_process, brief.method_or_process) &&
    arrayIncludes(standard.results_or_claims, brief.results_or_claims) &&
    arrayIncludes(standard.implications, brief.implications);

  const standardInDetail =
    arrayIncludes(detail.purpose, standard.purpose) &&
    arrayIncludes(detail.background, standard.background) &&
    arrayIncludes(detail.method_or_process, standard.method_or_process) &&
    arrayIncludes(detail.results_or_claims, standard.results_or_claims) &&
    arrayIncludes(detail.implications, standard.implications);

  return { briefInStandard, standardInDetail };
}

export function enforceStructuredHierarchy(payload: {
  anchor: string;
  brief: StructuredSummary;
  standard: StructuredSummary;
  detail: StructuredSummary;
}): {
  anchor: string;
  brief: StructuredSummary;
  standard: StructuredSummary;
  detail: StructuredSummary;
  passes: { anchorAll: boolean; snowball: boolean };
} {
  const anchor = norm(payload.anchor || '');
  let brief = payload.brief;
  let standard = payload.standard;
  let detail = payload.detail;

  // 1) Snowball 포함 관계 강제
  standard.outline = ensureOutlineContains(standard.outline, brief.outline);
  detail.outline = ensureOutlineContains(detail.outline, standard.outline);

  // 2) Anchor를 모든 버전에 포함
  if (anchor) {
    [brief, standard, detail].forEach(summary => {
      if (!summary.anchor || !norm(summary.anchor).includes(anchor)) {
        summary.anchor = anchor;
      }
    });
  }

  // 3) 검증
  const snowballCheck = validateSnowball(brief.outline, standard.outline, detail.outline);
  const anchorAll =
    norm(brief.anchor).includes(anchor) &&
    norm(standard.anchor).includes(anchor) &&
    norm(detail.anchor).includes(anchor);

  return {
    anchor,
    brief,
    standard,
    detail,
    passes: {
      anchorAll,
      snowball: snowballCheck.briefInStandard && snowballCheck.standardInDetail,
    },
  };
}

// =======================================================
// LLM Prompt for Structured Summary
// =======================================================
export function buildStructuredPrompt(
  originalText: string,
  ratios = { brief: 0.15, standard: 0.30, detail: 0.55 }
): string {
  return `
당신은 학술 문장 구조화 요약 엔진이다.
아래 원문을 바탕으로 "구조화 요약" 3단계(간단/표준/상세)와 "앵커 문장"을 JSON으로만 출력하라.

[절대 규칙]
- anchor(앵커 문장)은 간단/표준/상세 모두에 반드시 포함되어야 한다.
- 표준 요약은 간단 요약의 모든 필드/배열 원소를 반드시 포함해야 한다.
- 상세 요약은 표준 요약의 모든 필드/배열 원소를 반드시 포함해야 한다.
- 간단→표준→상세는 항목 수만 증가하며, 핵심 구조는 동일해야 한다.
- 각 필드는 배열로 표현하며, 항목은 간결한 문장 형태로 작성한다.
- 출력은 JSON 단독(설명/마크다운/코드블록 금지).

[길이 목표]
- brief: 원문 대비 약 ${Math.round(ratios.brief * 100)}% (핵심 항목만)
- standard: 원문 대비 약 ${Math.round(ratios.standard * 100)}% (배경/근거 추가)
- detail: 원문 대비 약 ${Math.round(ratios.detail * 100)}% (논거/예시/한계 추가)

[출력 JSON 스키마]
{
  "anchor": "핵심 문장 1개",
  "brief": {
    "anchor": "핵심 문장 1개",
    "outline": {
      "purpose": ["목적 항목"],
      "background": [],
      "method_or_process": [],
      "results_or_claims": ["핵심 주장"],
      "implications": []
    }
  },
  "standard": {
    "anchor": "핵심 문장 1개",
    "outline": {
      "purpose": ["목적 항목", "..."],
      "background": ["배경 항목"],
      "method_or_process": ["방법 항목"],
      "results_or_claims": ["핵심 주장", "..."],
      "implications": []
    }
  },
  "detail": {
    "anchor": "핵심 문장 1개",
    "outline": {
      "purpose": ["목적 항목", "..."],
      "background": ["배경 항목", "..."],
      "method_or_process": ["방법 항목", "..."],
      "results_or_claims": ["핵심 주장", "..."],
      "implications": ["시사점 항목"]
    }
  }
}

[원문]
${originalText}
`.trim();
}
