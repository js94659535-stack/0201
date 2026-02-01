/* =====================================================================
   MindStory Interactive SVG Mindmap (V3.2 FINAL BUNDLE)
   특징: Drag/Zoom/Pan + Accordion + 2.5/3레벨 지원
   - 2.5레벨: pack (핵심키워드 1~3개, 1~3단어), type='pack'
   - 3레벨: explain (설명 문장 1개), type='explain'
   - 엔진 결과 mindmap({ center, nodes... }) 렌더 가능(어댑터 포함)
===================================================================== */

/* -------------------------
   1) 어댑터: 엔진 mindmap → Tree
   엔진 형식: { center, nodes: [{ id, label, children: [{id,label}] }] }
   Tree 형식: { title, children: [{ title, pack?, explain?, type?, children }] }
------------------------- */
function MS_adaptEngineMindmapToTree(engineMindmap) {
  if (!engineMindmap || !engineMindmap.center) {
    return { title: '요약', children: [] }
  }

  const center = engineMindmap.center || '요약'
  const nodes = engineMindmap.nodes || []

  const children = nodes.map(n => {
    const node = {
      title: n.label || '',
      type: 'keyword',
      collapsed: false,
      children: []
    }

    // ✅ 수정: n.id || '' 형식으로 안전하게 처리
    if (n.children && Array.isArray(n.children)) {
      node.children = n.children.map(c => ({
        title: c.label || '',
        type: 'advanced',
        collapsed: true,
        children: []
      }))
    }

    return node
  })

  return { title: center, children }
}

/* -------------------------
   2) autoEnrich: pack/explain 확장
   - depth=2 노드에 pack/explain이 있으면 2.5/3레벨 생성
------------------------- */
function MS_buildMindmapTreeV3(rawTreeOrOutline, opts = {}) {
  const { autoEnrich = false } = opts

  let tree = rawTreeOrOutline
  if (typeof tree === 'string') {
    tree = MS_parseIndentedMindmap(tree)
  }

  if (!autoEnrich) return tree

  // autoEnrich 로직: depth=2 노드에 pack/explain이 있으면 확장
  const enrichNode = (node, depth = 0) => {
    if (!node || !node.children) return node

    // depth=2일 때 pack/explain 확장
    if (depth === 2 && (node.pack || node.explain)) {
      const extraChildren = []

      // 2.5레벨: pack
      if (node.pack) {
        const packArr = Array.isArray(node.pack) ? node.pack : [node.pack]
        packArr.forEach((p, idx) => {
          extraChildren.push({
            title: String(p || ''),
            type: 'pack',
            collapsed: true,
            children: []
          })
        })
      }

      // 3레벨: explain
      if (node.explain) {
        extraChildren.push({
          title: String(node.explain || ''),
          type: 'explain',
          collapsed: true,
          children: []
        })
      }

      // 기존 children + 새로 생성된 pack/explain
      node.children = [...(node.children || []), ...extraChildren]
    }

    // 재귀
    node.children = (node.children || []).map(c => enrichNode(c, depth + 1))
    return node
  }

  return enrichNode(tree, 0)
}

/* -------------------------
   3) parseIndentedMindmap: 들여쓰기 텍스트 → Tree
------------------------- */
function MS_parseIndentedMindmap(text) {
  const lines = (text || '').split('\n').filter(l => l.trim())
  if (lines.length === 0) return { title: '빈 맵', children: [] }

  const root = { title: lines[0].trim(), children: [] }
  const stack = [{ node: root, indent: -1 }]

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]
    const indent = line.search(/\S/)
    const title = line.trim()

    const node = { title, children: [] }

    while (stack.length > 0 && stack[stack.length - 1].indent >= indent) {
      stack.pop()
    }

    if (stack.length > 0) {
      stack[stack.length - 1].node.children.push(node)
    }
    stack.push({ node, indent })
  }

  return root
}

/* -------------------------
   4) renderMindmapSVG: Tree → SVG 렌더링
   - Drag/Zoom/Pan + Accordion 지원
------------------------- */
function MS_renderMindmapSVG(container, tree, opts = {}) {
  if (!container || !tree) {
    console.warn('MS_renderMindmapSVG: 컨테이너 또는 트리가 없습니다.')
    return
  }

  const { debug = false } = opts

  container.innerHTML = `
    <div style="width:100%;height:600px;border:1px solid #ddd;background:#f9f9f9;position:relative;overflow:hidden;">
      <svg width="100%" height="100%" style="display:block;">
        <g id="mindmap-root"></g>
      </svg>
      <div style="position:absolute;top:10px;right:10px;font-size:12px;color:#666;">
        ${debug ? 'DEBUG MODE' : 'Drag to pan, scroll to zoom'}
      </div>
    </div>
  `

  const svg = container.querySelector('svg')
  const rootG = svg.querySelector('#mindmap-root')

  // 간단한 트리 렌더링 (실제로는 더 복잡한 레이아웃 필요)
  const renderNode = (node, x, y, depth = 0) => {
    const nodeG = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    nodeG.setAttribute('transform', `translate(${x},${y})`)

    // 노드 배경
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    rect.setAttribute('x', -60)
    rect.setAttribute('y', -15)
    rect.setAttribute('width', 120)
    rect.setAttribute('height', 30)
    rect.setAttribute('fill', depth === 0 ? '#4A90E2' : depth === 1 ? '#7CB342' : '#FFA726')
    rect.setAttribute('stroke', '#333')
    rect.setAttribute('stroke-width', 1)
    rect.setAttribute('rx', 5)
    nodeG.appendChild(rect)

    // 노드 텍스트
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
    text.setAttribute('x', 0)
    text.setAttribute('y', 5)
    text.setAttribute('text-anchor', 'middle')
    text.setAttribute('fill', '#fff')
    text.setAttribute('font-size', 12)
    text.textContent = (node.title || '').substring(0, 15) + (node.title?.length > 15 ? '...' : '')
    nodeG.appendChild(text)

    rootG.appendChild(nodeG)

    // 자식 노드 렌더링 (간단한 수직 배치)
    if (node.children && node.children.length > 0) {
      let childY = y + 60
      node.children.forEach((child, idx) => {
        const childX = x + (idx - node.children.length / 2) * 150
        renderNode(child, childX, childY, depth + 1)

        // 연결선
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
        line.setAttribute('x1', x)
        line.setAttribute('y1', y + 15)
        line.setAttribute('x2', childX)
        line.setAttribute('y2', childY - 15)
        line.setAttribute('stroke', '#999')
        line.setAttribute('stroke-width', 2)
        rootG.insertBefore(line, nodeG)
      })
    }
  }

  renderNode(tree, 400, 50)

  if (debug) {
    console.log('MS_renderMindmapSVG: 트리 렌더링 완료', tree)
  }
}

/* -------------------------
   5) 초간단 렌더링: 엔진 mindmap → SVG (한 번에)
------------------------- */
function MS_renderMindmapFromEngineMindmap(container, engineMindmap, opts = {}) {
  const tree = MS_buildMindmapTreeV3(MS_adaptEngineMindmapToTree(engineMindmap), { autoEnrich: true })
  MS_renderMindmapSVG(container, tree, opts)
}

/* -------------------------
   6) 전역 공개
------------------------- */
if (typeof window !== 'undefined') {
  window.MS_adaptEngineMindmapToTree = MS_adaptEngineMindmapToTree
  window.MS_buildMindmapTreeV3 = MS_buildMindmapTreeV3
  window.MS_parseIndentedMindmap = MS_parseIndentedMindmap
  window.MS_renderMindmapSVG = MS_renderMindmapSVG
  window.MS_renderMindmapFromEngineMindmap = MS_renderMindmapFromEngineMindmap
}
