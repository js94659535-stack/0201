// =======================================================
// Hierarchical Consistency Enforcer (Snowball + Anchor)
// - brief ⊂ standard ⊂ detail
// - anchor ∈ all
// - connective + fragment + ending style sanitization
// =======================================================

function norm(s: string): string {
  return (s || '')
    .replace(/\s+/g, ' ')
    .replace(/["""]/g, '"')
    .replace(/[''']/g, "'")
    .trim();
}

function splitSentences(text: string): string[] {
  const t = norm(text);
  if (!t) return [];
  // 한국어 문장 분리(단순): 종결부호/어미 기준
  return t
    .replace(/\n+/g, ' ')
    .split(/(?<=[\.\!\?]|다\.|다\!|다\?|한다\.|하였다\.|이다\.)\s+/)
    .map(s => s.trim())
    .filter(Boolean);
}

function sentenceHash(s: string): string {
  // 가벼운 해시(중복 방지용). crypto 없을 때도 동작.
  let h = 2166136261;
  const x = norm(s);
  for (let i = 0; i < x.length; i++) {
    h ^= x.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(16);
}

function dedupeSentences(sentences: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const s of sentences) {
    const key = sentenceHash(s);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(s);
  }
  return out;
}

function removeLeadingConnective(sentence: string): string {
  // 첫 문장 연결어 제거(요청 사항)
  return sentence.replace(/^(또한|그리고|한편|따라서|결과적으로|이와 함께|더불어)\s+/u, '');
}

function fixConnectives(sentences: string[]): string[] {
  // 문장 간 연결어 1개만 허용 + 중복 접속어 제거(간단 버전)
  const cleaned: string[] = [];
  for (let i = 0; i < sentences.length; i++) {
    let s = sentences[i];

    // "또한 그러므로" 같은 중복 접속어 제거
    s = s.replace(/\b(또한|그리고|한편|따라서|결과적으로|이와 함께|더불어)\s+(또한|그리고|한편|따라서|결과적으로|이와 함께|더불어)\b/u, '$2');

    if (i === 0) s = removeLeadingConnective(s);
    cleaned.push(s);
  }
  return cleaned;
}

function academicEnding(text: string): string {
  // 완벽한 형태소 분석은 아니지만, 최소한의 "학술형 느낌"으로 정리
  // - 이미 ~이다/~한다/~하였다 등으로 끝나면 유지
  // - 끝이 애매하면 마침표 부여
  let t = norm(text);
  if (!t) return t;
  if (!/[\.!\?]$/.test(t)) t += '.';
  return t;
}

function sanitizeText(text: string): string {
  // 파편 필터(대표 예시) + 불필요 공백/이상 문자열
  let t = norm(text);

  // 예: "음 과업에서도" 같은 파편이 들어오면 제거/완화 (프로젝트 특성상 규칙 확장 가능)
  t = t.replace(/\b음\s+과업에서도\b/u, '다음 과업에서도');
  t = t.replace(/\b어\b\s*/gu, ''); // 의미 없는 추임새 제거(필요 시)

  // 문장 정제
  let sents = splitSentences(t);
  sents = fixConnectives(sents);
  sents = dedupeSentences(sents);

  return academicEnding(sents.join(' '));
}

function ensureContains(container: string, required: string): string {
  const c = norm(container);
  const r = norm(required);
  if (!r) return container;
  if (c.includes(r)) return container;
  // 포함이 깨지면 앞에 붙여서 강제 만족(1차 Repair)
  return academicEnding(`${r} ${c}`);
}

function ensureAnchorAll(
  anchor: string,
  brief: string,
  standard: string,
  detail: string
): { anchor: string; brief: string; standard: string; detail: string } {
  const a = norm(anchor);
  if (!a) return { anchor, brief, standard, detail };
  return {
    anchor: a,
    brief: ensureContains(brief, a),
    standard: ensureContains(standard, a),
    detail: ensureContains(detail, a),
  };
}

export function enforceHierarchy(payload: {
  anchor: string;
  brief: string;
  standard: string;
  detail: string;
}): {
  anchor: string;
  brief: string;
  standard: string;
  detail: string;
  passes: { anchorAll: boolean; snowball: boolean };
} {
  // 0) sanitize
  let anchor = sanitizeText(payload.anchor || '');
  let brief = sanitizeText(payload.brief || '');
  let standard = sanitizeText(payload.standard || '');
  let detail = sanitizeText(payload.detail || '');

  // 1) anchor in all
  ({ anchor, brief, standard, detail } = ensureAnchorAll(anchor, brief, standard, detail));

  // 2) snowball 포함 관계 강제
  standard = ensureContains(standard, brief);
  detail = ensureContains(detail, standard);

  // 3) 최종 sanitize 한번 더 (삽입 과정에서 연결어/중복 생길 수 있음)
  anchor = sanitizeText(anchor);
  brief = sanitizeText(brief);
  standard = sanitizeText(standard);
  detail = sanitizeText(detail);

  // 4) pass flags
  const passes = {
    anchorAll:
      norm(brief).includes(norm(anchor)) &&
      norm(standard).includes(norm(anchor)) &&
      norm(detail).includes(norm(anchor)),
    snowball:
      norm(standard).includes(norm(brief)) &&
      norm(detail).includes(norm(standard)),
  };

  return { anchor, brief, standard, detail, passes };
}

// =======================================================
// LLM Prompt (1회 호출로 3버전+anchor JSON 생성)
// =======================================================
export function buildHierarchicalNarrativePrompt(
  originalText: string,
  ratios = { brief: 0.15, standard: 0.30, detail: 0.55 }
): string {
  return `
당신은 학술 문장 요약 엔진이다.
아래 원문을 바탕으로 "서술형 요약" 3단계(간단/표준/상세)와 "앵커 문장"을 JSON으로만 출력하라.

[절대 규칙]
- anchor(앵커 문장)은 간단/표준/상세 모두에 반드시 포함되어야 한다.
- 표준 요약은 간단 요약을 반드시 포함해야 한다(문장 단위 포함).
- 상세 요약은 표준 요약을 반드시 포함해야 한다(문장 단위 포함).
- 간단→표준→상세는 정보량만 확장되며, 핵심 주장/결론 흐름은 동일해야 한다.
- 첫 문장은 연결어(또한/그리고/한편/따라서/결과적으로/이와 함께/더불어)로 시작하지 마라.
- 문장 간 연결어는 필요할 때 1개만 사용하고, "또한 그러므로" 같은 중복 접속어는 금지한다.
- 종결 어미는 학술적 어조(~이다, ~한다, ~하였다)를 유지한다.
- 불완전 파편 문장/추임새는 제거하거나 자연스럽게 복원하라.
- 출력은 JSON 단독(설명/마크다운/코드블록 금지).

[길이 목표]
- brief: 원문 대비 약 ${Math.round(ratios.brief * 100)}%
- standard: 원문 대비 약 ${Math.round(ratios.standard * 100)}%
- detail: 원문 대비 약 ${Math.round(ratios.detail * 100)}%

[출력 JSON 스키마]
{
  "anchor": "문장 1개",
  "brief": "…",
  "standard": "…",
  "detail": "…"
}

[원문]
${originalText}
`.trim();
}
