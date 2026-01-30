// =======================================================
// Mindmap Hierarchical Consistency Enforcer
// - brief ⊂ standard ⊂ detail (노드/엣지 포함)
// - 동일 뼈대 확장
// =======================================================

interface MindmapNode {
  id: string;
  label: string;
}

interface MindmapEdge {
  from: string;
  to: string;
  label?: string;
}

interface Mindmap {
  anchorNodeId: string;
  nodes: MindmapNode[];
  edges: MindmapEdge[];
}

function norm(s: string): string {
  return (s || '')
    .replace(/\s+/g, ' ')
    .replace(/["""]/g, '"')
    .replace(/[''']/g, "'")
    .trim();
}

function nodeEquals(a: MindmapNode, b: MindmapNode): boolean {
  return a.id === b.id && norm(a.label) === norm(b.label);
}

function edgeEquals(a: MindmapEdge, b: MindmapEdge): boolean {
  return a.from === b.from && a.to === b.to && norm(a.label || '') === norm(b.label || '');
}

function nodesInclude(container: MindmapNode[], required: MindmapNode[]): boolean {
  return required.every(req =>
    container.some(c => nodeEquals(c, req))
  );
}

function edgesInclude(container: MindmapEdge[], required: MindmapEdge[]): boolean {
  return required.every(req =>
    container.some(c => edgeEquals(c, req))
  );
}

function ensureNodesContain(container: MindmapNode[], required: MindmapNode[]): MindmapNode[] {
  const result = [...container];
  const containerIds = new Set(container.map(n => n.id));
  
  for (const req of required) {
    if (!containerIds.has(req.id)) {
      // 앞에 삽입 (Snowball repair)
      result.unshift(req);
      containerIds.add(req.id);
    }
  }
  
  return result;
}

function ensureEdgesContain(container: MindmapEdge[], required: MindmapEdge[]): MindmapEdge[] {
  const result = [...container];
  
  for (const req of required) {
    if (!container.some(c => edgeEquals(c, req))) {
      result.unshift(req);
    }
  }
  
  return result;
}

export function enforceMindmapHierarchy(payload: {
  anchor: string;
  brief: Mindmap;
  standard: Mindmap;
  detail: Mindmap;
}): {
  anchor: string;
  brief: Mindmap;
  standard: Mindmap;
  detail: Mindmap;
  passes: { anchorAll: boolean; snowball: boolean };
} {
  const anchor = norm(payload.anchor || '');
  let brief = payload.brief;
  let standard = payload.standard;
  let detail = payload.detail;

  // 1) Snowball 포함 관계 강제
  standard.nodes = ensureNodesContain(standard.nodes, brief.nodes);
  standard.edges = ensureEdgesContain(standard.edges, brief.edges);

  detail.nodes = ensureNodesContain(detail.nodes, standard.nodes);
  detail.edges = ensureEdgesContain(detail.edges, standard.edges);

  // 2) Anchor 노드 ID 통일
  const anchorNodeId = brief.anchorNodeId || 'n0';
  brief.anchorNodeId = anchorNodeId;
  standard.anchorNodeId = anchorNodeId;
  detail.anchorNodeId = anchorNodeId;

  // 3) 검증
  const briefInStandard = nodesInclude(standard.nodes, brief.nodes) && edgesInclude(standard.edges, brief.edges);
  const standardInDetail = nodesInclude(detail.nodes, standard.nodes) && edgesInclude(detail.edges, standard.edges);

  const anchorNodeInBrief = brief.nodes.some(n => n.id === anchorNodeId);
  const anchorNodeInStandard = standard.nodes.some(n => n.id === anchorNodeId);
  const anchorNodeInDetail = detail.nodes.some(n => n.id === anchorNodeId);

  return {
    anchor,
    brief,
    standard,
    detail,
    passes: {
      anchorAll: anchorNodeInBrief && anchorNodeInStandard && anchorNodeInDetail,
      snowball: briefInStandard && standardInDetail,
    },
  };
}

// =======================================================
// LLM Prompt for Mindmap
// =======================================================
export function buildMindmapPrompt(
  originalText: string,
  ratios = { brief: 0.15, standard: 0.30, detail: 0.55 }
): string {
  return `
당신은 학술 문장 마인드맵 생성 엔진이다.
아래 원문을 바탕으로 "마인드맵" 3단계(간단/표준/상세)를 JSON으로만 출력하라.

[절대 규칙]
- anchorNodeId는 간단/표준/상세 모두 동일해야 한다 (예: "n0").
- 표준 마인드맵은 간단 마인드맵의 모든 노드와 엣지를 반드시 포함해야 한다.
- 상세 마인드맵은 표준 마인드맵의 모든 노드와 엣지를 반드시 포함해야 한다.
- 간단→표준→상세는 노드/엣지 개수만 증가하며, 핵심 구조는 동일해야 한다.
- 노드 ID는 "n0", "n1", "n2" 형식으로 고유하게 부여한다.
- 출력은 JSON 단독(설명/마크다운/코드블록 금지).

[복잡도 목표]
- brief: 핵심 노드 5~8개
- standard: brief 노드 포함 + 가지 확장 (10~15개)
- detail: standard 포함 + 근거/예시/조건 가지 추가 (20~30개)

[출력 JSON 스키마]
{
  "anchor": "핵심 문장 1개",
  "brief": {
    "anchorNodeId": "n0",
    "nodes": [
      { "id": "n0", "label": "핵심 주제" },
      { "id": "n1", "label": "..." }
    ],
    "edges": [
      { "from": "n0", "to": "n1", "label": "..." }
    ]
  },
  "standard": {
    "anchorNodeId": "n0",
    "nodes": [
      { "id": "n0", "label": "핵심 주제" },
      { "id": "n1", "label": "..." },
      { "id": "n2", "label": "..." }
    ],
    "edges": [
      { "from": "n0", "to": "n1", "label": "..." },
      { "from": "n0", "to": "n2", "label": "..." }
    ]
  },
  "detail": {
    "anchorNodeId": "n0",
    "nodes": [
      { "id": "n0", "label": "핵심 주제" },
      { "id": "n1", "label": "..." },
      { "id": "n2", "label": "..." },
      { "id": "n3", "label": "..." }
    ],
    "edges": [
      { "from": "n0", "to": "n1", "label": "..." },
      { "from": "n0", "to": "n2", "label": "..." },
      { "from": "n1", "to": "n3", "label": "..." }
    ]
  }
}

[원문]
${originalText}
`.trim();
}
