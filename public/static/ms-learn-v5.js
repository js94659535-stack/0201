(() => {
  const $ = (id) => document.getElementById(id);

  function escapeHtml(s) {
    return String(s ?? '')
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  }

  // ---------------------------
  // Render: Narrative (가독성 단락)
  // ---------------------------
  function renderNarrative(container, text) {
    const t = String(text || '').trim();
    const paras = t.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
    container.innerHTML = `
      <div class="ms-card">
        ${paras.map(p => `<p class="ms-p">${escapeHtml(p)}</p>`).join('')}
      </div>
    `;
  }

  // ---------------------------
  // Render: Structured Reference (참고서형 위계 + 용어사전)
  // data: { toc, hierarchy, glossary }
  // ---------------------------
  function renderStructured(container, structured) {
    if (!structured || !structured.hierarchy) {
      container.innerHTML = `<div class="ms-card"><div class="ms-muted">구조화 데이터가 없습니다.</div></div>`;
      return;
    }
    
    let html = '<div class="ms-card">';
    
    // I. 목차
    html += '<div class="ms-h2">Ⅰ. 목차</div>';
    if (structured.toc && structured.toc.length) {
      structured.toc.forEach((item, i) => {
        html += `<div class="ms-li">${i + 1}. ${escapeHtml(item.title)}</div>`;
      });
    }
    html += '<div class="ms-gap"></div>';
    
    // II. 핵심 정리(위계)
    html += '<div class="ms-h2">Ⅱ. 핵심 정리(위계)</div>';
    structured.hierarchy.forEach(h => {
      html += `<div class="ms-h3">${escapeHtml(h.title)}</div>`;
      if (h.keywords && h.keywords.length) {
        html += `<div class="ms-line">핵심키워드: ${h.keywords.map(k => escapeHtml(k)).join(' · ')}</div>`;
      }
      if (h.bullets && h.bullets.length) {
        h.bullets.forEach(b => {
          html += `<div class="ms-li">- ${escapeHtml(b)}</div>`;
        });
      }
    });
    html += '<div class="ms-gap"></div>';
    
    // III. 용어사전
    html += '<div class="ms-h2">Ⅲ. 용어사전</div>';
    if (structured.glossary && structured.glossary.length) {
      structured.glossary.forEach(g => {
        html += `<div class="ms-line"><strong>${escapeHtml(g.term)}</strong>: ${escapeHtml(g.def)}</div>`;
      });
    }
    
    html += '</div>';
    container.innerHTML = html;
  }

  // ---------------------------
  // Mindmap SVG + Accordion: 시각화 + 목차형 접기/펼치기
  // ---------------------------
  function renderMindmap(container, mindmapData) {
    // tree 속성이 있으면 사용, 없으면 mindmapData 자체가 tree
    const tree = mindmapData?.tree || mindmapData;
    if (!tree || !tree.title) {
      container.innerHTML = `<div class="ms-card"><div class="ms-muted">마인드맵 데이터가 없습니다.</div></div>`;
      return;
    }
    
    // ① 고유 ID 생성 (중복 방지)
    const uniqueId = 'msMindmapBox_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    const accordionId = 'accordion_' + uniqueId;
    
    container.innerHTML = `
      <div class="ms-mindmap-wrapper">
        <div class="ms-mindmap-svg" id="${uniqueId}" style="width:65%;height:560px;float:left;"></div>
        <div class="ms-mindmap-accordion" id="${accordionId}" style="width:33%;height:560px;float:right;overflow-y:auto;padding:10px;"></div>
        <div style="clear:both;"></div>
      </div>
    `;
    
    // SVG 렌더링
    const box = $(uniqueId);
    if (window.MS_buildMindmapTreeV3 && window.MS_renderMindmapSVG) {
      const enriched = window.MS_buildMindmapTreeV3(tree, { autoEnrich: true });
      window.MS_renderMindmapSVG(box, enriched, { debug: false });
    } else {
      box.innerHTML = `<div class="ms-muted">ms-mindmap-svg.js가 로드되지 않았습니다.</div>`;
    }
    
    // ② 아코디언 렌더링
    renderAccordion($(accordionId), tree);
  }

  // 아코디언 렌더링 (접기/펼치기)
  function renderAccordion(container, node, depth = 0) {
    if (!container || !node) return '';
    
    const hasChildren = node.children && node.children.length > 0;
    const caret = hasChildren ? (node.collapsed ? '▶' : '▼') : '•';
    const indent = '&nbsp;'.repeat(depth * 3);
    
    let html = `
      <div class="acc-node" data-id="${node.id || 'root'}" style="cursor:pointer;padding:4px 0;">
        <span class="acc-caret">${caret}</span>
        <span class="acc-label">${indent}${escapeHtml(node.title || '')}</span>
      </div>
    `;
    
    // explain 표시 (detail 패널)
    if (node.explain && !node.collapsed) {
      html += `<div class="acc-detail" style="margin-left:${depth * 12 + 20}px;font-size:12px;color:rgba(255,255,255,0.7);padding:4px 0;">${escapeHtml(node.explain)}</div>`;
    }
    
    // 자식 노드 재귀 - 전체 HTML 먼저 생성
    if (hasChildren && !node.collapsed) {
      node.children.forEach(child => {
        html += renderAccordionHTML(child, depth + 1);
      });
    }
    
    // 첫 호출에서만 container에 innerHTML 설정
    if (depth === 0) {
      container.innerHTML = html;
      
      // 클릭 이벤트 바인딩
      bindAccordionEvents(container, node);
    }
    
    return html;
  }

  // HTML 생성만 담당 (재귀용)
  function renderAccordionHTML(node, depth = 0) {
    const hasChildren = node.children && node.children.length > 0;
    const caret = hasChildren ? (node.collapsed ? '▶' : '▼') : '•';
    const indent = '&nbsp;'.repeat(depth * 3);
    
    let html = `
      <div class="acc-node" data-id="${node.id || 'root'}" style="cursor:pointer;padding:4px 0;">
        <span class="acc-caret">${caret}</span>
        <span class="acc-label">${indent}${escapeHtml(node.title || '')}</span>
      </div>
    `;
    
    if (node.explain && !node.collapsed) {
      html += `<div class="acc-detail" style="margin-left:${depth * 12 + 20}px;font-size:12px;color:rgba(255,255,255,0.7);padding:4px 0;">${escapeHtml(node.explain)}</div>`;
    }
    
    if (hasChildren && !node.collapsed) {
      node.children.forEach(child => {
        html += renderAccordionHTML(child, depth + 1);
      });
    }
    
    return html;
  }

  // 클릭 이벤트 바인딩 (재귀)
  function bindAccordionEvents(container, node) {
    const nodeEl = container.querySelector(`[data-id="${node.id || 'root'}"]`);
    if (nodeEl && node.children && node.children.length > 0) {
      nodeEl.addEventListener('click', (e) => {
        e.stopPropagation();
        node.collapsed = !node.collapsed;
        renderAccordion(container, node, 0);  // 전체 재렌더링
      });
    }
    
    // 자식 노드들도 재귀적으로 바인딩
    if (node.children && !node.collapsed) {
      node.children.forEach(child => {
        bindAccordionEvents(container, child);
      });
    }
  }

  // ---------------------------
  // Selftest: 90% 통과 게이트
  // - questions: [{id,question,answer,sourceHint}]
  // ---------------------------
  async function renderSelftest(container, questions, onPassed) {
    const qs = Array.isArray(questions) ? questions : [];
    if (!qs.length) {
      container.innerHTML = `<div class="ms-card"><div class="ms-muted">자가테스트 문항이 없습니다.</div></div>`;
      return;
    }

    container.innerHTML = `
      <div class="ms-card">
        <div class="ms-h2">자가테스트</div>
        <div class="ms-muted">90% 이상 통과해야 다음 단계로 진행할 수 있습니다.</div>
        <div class="ms-gap"></div>
        <form id="msSelfForm">
          ${qs.map((q, i) => `
            <div class="ms-q">
              <div class="ms-qtitle">${i+1}. ${escapeHtml(q.question)}</div>
              <textarea class="ms-ta" name="${escapeHtml(q.id)}" rows="3" placeholder="답을 입력하세요"></textarea>
              <div class="ms-hint">힌트: ${escapeHtml(String(q.hint || '').slice(0, 80))}</div>
            </div>
          `).join('')}
          <div class="ms-row">
            <button class="ms-btn" type="submit">채점하기</button>
            <div id="msSelfRes" class="ms-muted"></div>
          </div>
        </form>
      </div>
    `;

    $('msSelfForm').addEventListener('submit', async (ev) => {
      ev.preventDefault();
      const fd = new FormData(ev.target);
      const answers = {};
      for (const [k, v] of fd.entries()) answers[k] = String(v || '');
      const resp = await fetch('/api/selftest/score', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ questions: qs, answers })
      }).then(r => r.json()).catch(() => null);
      const r = resp?.result;
      if (!r) { $('msSelfRes').textContent = '채점 실패'; return; }
      $('msSelfRes').textContent = `점수: ${r.pct}% / ${r.passed ? '통과' : '재도전 필요'}`;
      if (r.passed && typeof onPassed === 'function') onPassed(r);
    });
  }

  // ---------------------------
  // Save/Load (D1)
  // ---------------------------
  async function saveToD1(userId, originalText, allSummaries) {
    const resp = await fetch('/api/saveSummary', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ userId, originalText, allSummaries })
    }).then(r => r.json()).catch(() => null);
    return resp;
  }

  async function loadFromD1(userId, id) {
    const url = `/api/loadSummary?userId=${encodeURIComponent(userId)}&id=${encodeURIComponent(id)}`
    return fetch(url).then(r => r.json()).catch(() => null);
  }

  // ---------------------------
  // Public: 하나의 엔트리로 렌더
  // ---------------------------
  window.MS_V5_renderResult = async function ({
    containerEl,
    inputText,
    userId = 'anon',
    mode = 'standard',
    viewType = 'narrative',
    onSelftestPassed
  }) {
    if (!containerEl) throw new Error('containerEl required');
    const resp = await fetch('/api/matrix', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ text: inputText, userId, level: mode, viewType })
    }).then(r => r.json()).catch(() => null);

    if (!resp?.ok) {
      containerEl.innerHTML = `<div class="ms-card"><div class="ms-muted">오류: ${escapeHtml(resp?.message || resp?.error || 'unknown')}</div></div>`;
      return { ok:false, resp };
    }

    const data = resp.data;
    console.log('[MS Learn V5] API 응답:', data);
    
    // Matrix V4 응답 구조: { views: { narrative: { brief, standard, detail }, ... } }
    const views = data?.views || {};
    const levelData = views[viewType]?.[mode];
    
    // ② viewType 분기를 switch로 고정 (독립 if 4개 → 상호배타적 분기)
    switch (viewType) {
      case 'narrative':
        const text = levelData?.text || '';
        const warnings = levelData?.warnings || [];
        
        // ⚠️ WARNINGS 표시
        let warningHtml = '';
        if (warnings.length > 0) {
          warningHtml = `
            <div class="ms-card" style="background: rgba(255, 87, 51, 0.1); border-color: rgba(255, 87, 51, 0.3);">
              <div class="ms-h3">⚠️ 품질 경고</div>
              <ul class="ms-li" style="margin-left: 20px;">
                ${warnings.map(w => `<li>${escapeHtml(w)}</li>`).join('')}
              </ul>
            </div>
          `;
        }
        
        renderNarrative(containerEl, text);
        if (warningHtml) {
          containerEl.insertAdjacentHTML('afterbegin', warningHtml);
        }
        break;
      case 'structured':
        // local-fallback-generators 구조: { toc, hierarchy, glossary }
        renderStructured(containerEl, levelData);
        break;
      case 'mindmap':
        // local-fallback-generators 구조: { title, children }
        // tree 속성 없이 levelData를 직접 전달
        renderMindmap(containerEl, levelData);
        break;
      case 'selftest':
        const questions = levelData?.items || [];
        await renderSelftest(containerEl, questions, onSelftestPassed);
        break;
      default:
        containerEl.innerHTML = `<div class="ms-card"><div class="ms-muted">알 수 없는 viewType: ${escapeHtml(viewType)}</div></div>`;
    }

    return { ok:true, resp };
  };

  window.MS_V5_save = saveToD1;
  window.MS_V5_load = loadFromD1;

  // ---------------------------
  // Minimal CSS (가독성 향상: 단락/위계)
  // ---------------------------
  function injectCss() {
    if (document.getElementById('ms-v5-css')) return;
    const style = document.createElement('style');
    style.id = 'ms-v5-css';
    style.textContent = `
      .ms-card{
        border-radius:16px;
        padding:16px;
        background: rgba(18,20,26,0.65);
        border: 1px solid rgba(255,255,255,0.12);
        box-shadow: 0 10px 30px rgba(0,0,0,0.25);
        backdrop-filter: blur(10px);
      }
      .ms-p{ line-height:1.75; margin: 10px 0; font-size:14.5px; color: rgba(255,255,255,0.92); }
      .ms-muted{ color: rgba(255,255,255,0.65); font-size: 13px; }
      .ms-h2{ font-size: 16px; font-weight: 700; margin: 10px 0; color: rgba(255,255,255,0.95); }
      .ms-h3{ font-size: 14.5px; font-weight: 700; margin: 10px 0 6px; color: rgba(255,255,255,0.92); }
      .ms-line{ font-size: 14px; line-height: 1.7; margin: 2px 0; color: rgba(255,255,255,0.90); }
      .ms-li{ font-size: 13.8px; line-height: 1.7; margin: 2px 0 2px 10px; color: rgba(255,255,255,0.88); }
      .ms-gap{ height: 10px; }
      .ms-row{ display:flex; gap:10px; align-items:center; margin-top:12px; }
      .ms-btn{
        border-radius: 12px;
        padding: 10px 14px;
        background: rgba(255,255,255,0.10);
        border: 1px solid rgba(255,255,255,0.16);
        color: rgba(255,255,255,0.92);
        cursor: pointer;
      }
      .ms-q{ padding: 10px 0; border-top: 1px solid rgba(255,255,255,0.08); }
      .ms-qtitle{ font-size: 14px; font-weight: 600; margin-bottom: 6px; color: rgba(255,255,255,0.92); }
      .ms-ta{
        width: 100%;
        border-radius: 12px;
        padding: 10px;
        background: rgba(0,0,0,0.25);
        border: 1px solid rgba(255,255,255,0.12);
        color: rgba(255,255,255,0.92);
        outline: none;
      }
      .ms-hint{ margin-top:6px; font-size:12.5px; color: rgba(255,255,255,0.55); }
      
      /* Mindmap Accordion */
      .ms-mindmap-wrapper{ border-radius:16px; overflow:hidden; background: rgba(18,20,26,0.65); padding:10px; }
      .ms-mindmap-accordion{ background: rgba(0,0,0,0.3); border-left: 1px solid rgba(255,255,255,0.12); }
      .acc-node:hover{ background: rgba(255,255,255,0.08); }
      .acc-caret{ display:inline-block; width:16px; font-size:12px; }
      .acc-label{ font-size:13.5px; font-weight:600; color:rgba(255,255,255,0.92); }
      .acc-detail{ line-height:1.5; }
    `;
    document.head.appendChild(style);
  }
  injectCss();

  console.log('[MS Learn V5] ready (compression+reference structured+mindmap+selftest90+D1)');
})();
