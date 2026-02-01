/**
 * Result UI
 * 역할: 결과 렌더링 + 탭 전환 + 버튼 이벤트 바인딩
 * 전역: window.MS_ResultUI
 */
(function () {
  'use strict';

  if (window.MS_ResultUI) {
    console.warn('[result-ui] Already defined, skipping');
    return;
  }

  if (!window.SummaryPipeline) {
    console.error('[result-ui] ❌ SummaryPipeline not found! Load summary-pipeline.js first.');
    return;
  }

  let currentMode = 'standard';
  let currentView = 'narrative';
  let currentText = '';
  let isLoading = false;

  const MODES = ['brief', 'standard', 'detail'];
  const VIEWS = ['narrative', 'structured', 'mindmap', 'selftest'];

  /**
   * DOM 요소 확보 (없으면 생성)
   */
  function ensureElements() {
    // 모드 탭 컨테이너
    let modeContainer = document.getElementById('modeSeg');
    if (!modeContainer) {
      modeContainer = document.createElement('div');
      modeContainer.id = 'modeSeg';
      modeContainer.className = 'seg';
      document.body.appendChild(modeContainer);
    }

    // 뷰 타입 탭 컨테이너
    let viewContainer = document.getElementById('viewSeg');
    if (!viewContainer) {
      viewContainer = document.createElement('div');
      viewContainer.id = 'viewSeg';
      viewContainer.className = 'seg';
      document.body.appendChild(viewContainer);
    }

    // 결과 표시 영역
    let resultContainer = document.getElementById('out');
    if (!resultContainer) {
      resultContainer = document.createElement('div');
      resultContainer.id = 'out';
      resultContainer.className = 'out';
      document.body.appendChild(resultContainer);
    }

    // 로딩 표시 영역
    let loadingIndicator = document.getElementById('loadingIndicator');
    if (!loadingIndicator) {
      loadingIndicator = document.createElement('div');
      loadingIndicator.id = 'loadingIndicator';
      loadingIndicator.className = 'loading-indicator';
      loadingIndicator.style.display = 'none';
      loadingIndicator.innerHTML = '<span class="spin"></span> 처리 중...';
      document.body.appendChild(loadingIndicator);
    }

    // 에러 표시 영역
    let errorBox = document.getElementById('errorBox');
    if (!errorBox) {
      errorBox = document.createElement('div');
      errorBox.id = 'errorBox';
      errorBox.className = 'error-box';
      errorBox.style.display = 'none';
      document.body.appendChild(errorBox);
    }

    return {
      modeContainer,
      viewContainer,
      resultContainer,
      loadingIndicator,
      errorBox
    };
  }

  /**
   * 모드 탭 버튼 생성/업데이트
   */
  function renderModeTabs(container) {
    container.innerHTML = '';
    MODES.forEach((mode) => {
      const btn = document.createElement('button');
      btn.className = 'btn' + (mode === currentMode ? ' active' : '');
      btn.dataset.mode = mode;
      btn.textContent = mode === 'brief' ? '⚡ 간단' : mode === 'standard' ? '⚖️ 표준' : '🔬 상세';
      btn.onclick = () => handleModeClick(mode);
      container.appendChild(btn);
    });
  }

  /**
   * 뷰 타입 탭 버튼 생성/업데이트
   */
  function renderViewTabs(container) {
    container.innerHTML = '';
    VIEWS.forEach((view) => {
      const btn = document.createElement('button');
      btn.className = 'btn' + (view === currentView ? ' active' : '');
      btn.dataset.view = view;
      btn.textContent =
        view === 'narrative'
          ? '📘 서술형'
          : view === 'structured'
          ? '🧱 구조화'
          : view === 'mindmap'
          ? '🧠 마인드맵'
          : '✅ 자가테스트';
      btn.onclick = () => handleViewClick(view);
      container.appendChild(btn);
    });
  }

  /**
   * 모드 탭 클릭 핸들러
   */
  function handleModeClick(mode) {
    if (isLoading) return;
    currentMode = mode;
    const { modeContainer } = ensureElements();
    renderModeTabs(modeContainer);
    
    // 텍스트가 있으면 자동 재실행
    if (currentText) {
      executeRequest();
    }
  }

  /**
   * 뷰 타입 탭 클릭 핸들러
   */
  function handleViewClick(view) {
    if (isLoading) return;
    currentView = view;
    const { viewContainer } = ensureElements();
    renderViewTabs(viewContainer);
    
    // 텍스트가 있으면 자동 재실행
    if (currentText) {
      executeRequest();
    }
  }

  /**
   * 로딩 표시
   */
  function showLoading(show) {
    isLoading = show;
    const { loadingIndicator } = ensureElements();
    loadingIndicator.style.display = show ? 'block' : 'none';
  }

  /**
   * 에러 표시
   */
  function showError(message) {
    const { errorBox } = ensureElements();
    if (!message) {
      errorBox.style.display = 'none';
      errorBox.textContent = '';
      return;
    }
    errorBox.style.display = 'block';
    errorBox.textContent = message;
  }

  /**
   * 결과 렌더링 (커스텀 렌더러 우선 사용)
   */
  function renderResult(data) {
    const { resultContainer } = ensureElements();

    // 커스텀 렌더러가 있으면 우선 사용
    if (typeof window.MS_renderResultBody === 'function') {
      try {
        window.MS_renderResultBody(resultContainer, data, currentView);
        return;
      } catch (err) {
        console.error('[result-ui] Custom renderer failed:', err);
        // 폴백으로 기본 렌더러 사용
      }
    }

    // 기본 렌더러
    renderDefault(resultContainer, data);
  }

  /**
   * 기본 렌더러 (개선된 가독성 버전)
   */
  function renderDefault(container, data) {
    container.innerHTML = '';

    if (!data) {
      container.innerHTML = '<div class="meta">결과가 없습니다.</div>';
      return;
    }

    // narrative (개선된 버전 사용)
    if (currentView === 'narrative' && data.narrative) {
      if (window.MS_renderNarrativeBetter) {
        container.innerHTML = window.MS_renderNarrativeBetter(data.narrative);
      } else {
        const pre = document.createElement('pre');
        pre.style.whiteSpace = 'pre-wrap';
        pre.style.lineHeight = '1.6';
        pre.textContent = data.narrative;
        container.appendChild(pre);
      }
      return;
    }

    // structured (개선된 버전 사용)
    if (currentView === 'structured' && data.structured) {
      console.log('[DEBUG] Structured rendering:', {
        hasRenderer: !!window.MS_renderStructuredBetter,
        dataType: typeof data.structured,
        structured: data.structured
      });
      
      if (window.MS_renderStructuredBetter) {
        container.innerHTML = window.MS_renderStructuredBetter(data.structured);
      } else {
        const title = document.createElement('h3');
        title.textContent = data.structured.title || '구조화 요약';
        container.appendChild(title);

        const ul = document.createElement('ul');
        (data.structured.bullets || []).forEach((bullet) => {
          const li = document.createElement('li');
          li.textContent = String(bullet).replace(/^[-•]\s*/, '');
          ul.appendChild(li);
        });
        container.appendChild(ul);
      }
      return;
    }

    // mindmap (SVG 렌더링)
    if (currentView === 'mindmap' && data.mindmap) {
      console.log('[DEBUG] Mindmap rendering:', {
        hasRenderer: !!window.MS_renderMindmapFromEngineMindmap,
        dataType: typeof data.mindmap,
        mindmap: data.mindmap
      });
      
      // SVG 마인드맵 렌더링
      if (window.MS_renderMindmapFromEngineMindmap) {
        const wrap = document.createElement('div');
        wrap.className = 'ms-mindmap-wrap';
        wrap.style.cssText = 'height: 560px; border-radius: 16px; border:1px solid rgba(128,128,128,.10); background: rgba(128,128,128,.03); overflow:hidden;';
        container.appendChild(wrap);
        
        try {
          window.MS_renderMindmapFromEngineMindmap(wrap, data.mindmap, { debug: false });
        } catch (err) {
          console.error('[Mindmap] Render error:', err);
          wrap.innerHTML = '<div class="meta" style="padding:20px;">마인드맵 렌더링 오류: ' + err.message + '</div>';
        }
      } else {
        // 폴백: 간이 텍스트 렌더링
        const title = document.createElement('h3');
        title.textContent = '마인드맵 (간이)';
        container.appendChild(title);

        const center = document.createElement('div');
        center.className = 'badge';
        center.textContent = '🌟 ' + (data.mindmap.center || data.mindmap.title || '핵심');
        container.appendChild(center);

        const ul = document.createElement('ul');
        (data.mindmap.nodes || data.mindmap.children || [])
          .filter((n) => n.id !== 'c' && n.id !== data.mindmap.center)
          .forEach((node) => {
            const li = document.createElement('li');
            li.textContent = node.label || node.title || '';
            ul.appendChild(li);
          });
        container.appendChild(ul);
      }
      return;
    }

    // selftest
    if (currentView === 'selftest' && data.selftest) {
      const title = document.createElement('h3');
      title.textContent = data.selftest.title || '셀프테스트';
      container.appendChild(title);

      (data.selftest.questions || []).forEach((q, i) => {
        const qBox = document.createElement('div');
        qBox.style.cssText =
          'padding:10px 12px; border:1px solid rgba(255,255,255,.10); border-radius:12px; background:rgba(255,255,255,.04); margin:10px 0;';

        const qText = document.createElement('div');
        qText.style.cssText = 'font-weight:700; margin-bottom:6px;';
        qText.textContent = `Q${i + 1}. ${q.question || q.q || ''}`;
        qBox.appendChild(qText);

        const hint = document.createElement('div');
        hint.className = 'meta';
        hint.textContent = '힌트: ' + (q.answerHint || q.hint || '');
        qBox.appendChild(hint);

        container.appendChild(qBox);
      });
      return;
    }

    // 폴백
    container.innerHTML = '<div class="meta">선택한 보기 형식에 해당 결과가 없습니다.</div>';
  }

  /**
   * API 요청 실행
   */
  async function executeRequest() {
    if (!currentText || currentText.trim().length < 5) {
      showError('입력 텍스트가 너무 짧습니다. (최소 5자)');
      return;
    }

    showLoading(true);
    showError('');

    try {
      const result = await window.SummaryPipeline.run({
        text: currentText,
        mode: currentMode,
        viewType: currentView,
        userId: 'web_user'
      });

      if (!result.ok) {
        throw new Error(result.error?.message || '요약 실패');
      }

      renderResult(result.data);
    } catch (err) {
      console.error('[result-ui] Request failed:', err);
      showError(err.message || '요약 중 오류가 발생했습니다.');
    } finally {
      showLoading(false);
    }
  }

  /**
   * 텍스트 입력 설정 및 실행
   */
  function setText(text) {
    currentText = text;
    executeRequest();
  }

  /**
   * 초기화
   */
  function init() {
    const elements = ensureElements();
    renderModeTabs(elements.modeContainer);
    renderViewTabs(elements.viewContainer);

    // 입력 텍스트 필드 감지 (있으면 연결)
    const inputField = document.getElementById('inputText');
    if (inputField) {
      inputField.addEventListener('input', (e) => {
        currentText = e.target.value;
      });
    }

    // 요약 버튼 감지 (있으면 연결)
    const summarizeBtn = document.getElementById('summarizeBtn');
    if (summarizeBtn) {
      summarizeBtn.addEventListener('click', executeRequest);
    }

    console.log('[result-ui] ✅ Result UI initialized');
  }

  // ------------------------------
  // D1 Save/Load + Selftest 90% Gate
  // ------------------------------
  const SELFTEST_PASS_SCORE = 90; // ✅ 90%

  function esc(s){ return String(s||'').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }
  
  function cleanPageArtifacts(text){
    return String(text||'')
      .replace(/\n?\s*-\s*\d+\s*-\s*\n?/g, '\n')  // "- 8 -" 제거
      .replace(/[ \t]+\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }

  // API helper
  async function apiJson(url, opts){
    const res = await fetch(url, opts);
    const j = await res.json().catch(()=>null);
    if (!res.ok || !j || j.ok === false) throw new Error((j && j.error) || 'API error');
    return j;
  }

  // Save current session
  window.MS_saveCurrentSession = async function(){
    const userId = window.__MS_USER_ID__ || localStorage.getItem('ms_user_id') || ('user_' + Date.now());
    localStorage.setItem('ms_user_id', userId);
    window.__MS_USER_ID__ = userId;

    const sourceText = (window.__MS_SOURCE_TEXT__ || '').trim();
    const allSummaries = window.__MS_ALL_SUMMARIES__;
    const engineMeta = window.__MS_ENGINE_META__ || {};
    const title = (document.querySelector('#ms-title-input')?.value || '').trim();

    if (!sourceText || sourceText.length < 5) throw new Error('원문이 비어 있습니다');
    if (!allSummaries) throw new Error('allSummaries가 없습니다. 먼저 요약을 생성하세요.');

    const out = await apiJson('/api/session/save', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ userId, title, sourceText, allSummaries, engineMeta, sessionId: window.__MS_SESSION_ID__ || '' })
    });
    window.__MS_SESSION_ID__ = out.sessionId;
    return out;
  };

  // Load session
  window.MS_loadSession = async function(sessionId){
    const userId = window.__MS_USER_ID__ || localStorage.getItem('ms_user_id');
    if (!userId) throw new Error('userId가 없습니다. 먼저 저장을 한 번 실행하세요.');
    const out = await apiJson(`/api/session/load?userId=${encodeURIComponent(userId)}&sessionId=${encodeURIComponent(sessionId)}`);
    window.__MS_SESSION_ID__ = out.session.sessionId;
    window.__MS_USER_ID__ = out.session.userId;
    window.__MS_SOURCE_TEXT__ = out.session.sourceText;
    window.__MS_ALL_SUMMARIES__ = out.session.allSummaries;
    window.__MS_ENGINE_META__ = out.session.engineMeta;
    // 원문 영역에 반영
    const ta = document.querySelector('#inputText') || document.querySelector('textarea');
    if (ta) ta.value = out.session.sourceText;
    // 현재 선택된 mode/view로 다시 렌더
    if (window.MS_renderFromAllSummaries) window.MS_renderFromAllSummaries();
    return out;
  };

  // Selftest submit
  window.MS_submitSelftest = async function(payload){
    const userId = window.__MS_USER_ID__ || localStorage.getItem('ms_user_id');
    if (!userId) throw new Error('userId missing');
    if (!payload || !payload.items) throw new Error('selftest payload missing');
    payload.userId = userId;
    payload.sessionId = payload.sessionId || window.__MS_SESSION_ID__ || '';
    if (!payload.sessionId) throw new Error('sessionId missing (저장 후 진행 권장)');
    payload.viewType = 'selftest';

    payload.spec = payload.spec || {};
    payload.spec.passScore = SELFTEST_PASS_SCORE;

    const out = await apiJson('/api/selftest/submit', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(payload)
    });
    return out; // {score, passed, passScore:90}
  };

  // Improved narrative rendering (paragraphs/quotes)
  window.MS_renderNarrativeBetter = function(text){
    const t = cleanPageArtifacts(text);
    // 섹션 헤더/번호 패턴 앞에서 줄바꿈
    const spaced = t
      .replace(/(\n)?(2\.\d+\.\s)/g, '\n\n$2')
      .replace(/(\n)?(\(\d+\)\s)/g, '\n\n$2')
      .replace(/(\n)?([①②③④⑤⑥⑦⑧⑨⑩]\s)/g, '\n$2')
      .replace(/([.?!])\s+(?=[가-힣A-Z0-9(])/g, '$1\n');

    const paras = spaced.split(/\n{2,}/).map(p=>p.trim()).filter(Boolean);
    return `
      <div class="ms-narrative">
        ${paras.map(p=>{
          const isQuote = /「|」|"|"|\"/.test(p) && p.length > 60;
          return isQuote
            ? `<div class="ms-quote">${esc(p)}</div>`
            : `<p class="ms-paragraph">${esc(p)}</p>`;
        }).join('')}
      </div>
    `;
  };

  // Improved structured rendering (hierarchy)
  window.MS_renderStructuredBetter = function(structured){
    console.log('[MS_renderStructuredBetter] Input:', {
      type: typeof structured,
      isObject: structured && typeof structured === 'object',
      hasTitle: !!(structured && structured.title),
      hasBullets: !!(structured && Array.isArray(structured.bullets)),
      structured: structured
    });
    
    if (structured && typeof structured === 'object' && structured.title && Array.isArray(structured.bullets)){
      return `
        <div class="ms-structured">
          <div class="ms-h1">${esc(structured.title)}</div>
          <ul class="ms-ul">
            ${structured.bullets.map(b=>`<li>${esc(b)}</li>`).join('')}
          </ul>
        </div>
      `;
    }
    // 문자열이면 파싱
    const t = cleanPageArtifacts(structured);
    const lines = t.split('\n').map(s=>s.trim()).filter(Boolean);
    const blocks = [];
    let cur = null;
    for (const line of lines){
      const sec = line.match(/^(2\.\d+\.)\s*(.+)$/);
      const item = line.match(/^\((\d+)\)\s*(.+)$/);
      if (sec){
        if (cur) blocks.push(cur);
        cur = { h: `${sec[1]} ${sec[2]}`, items: [] };
        continue;
      }
      if (!cur) cur = { h: '핵심 구조', items: [] };
      if (item){
        cur.items.push({ k: item[2], subs: [] });
        continue;
      }
      const sub = line.match(/^([①②③④⑤⑥⑦⑧⑨⑩])\s*(.+)$/);
      if (sub && cur.items.length){
        cur.items[cur.items.length-1].subs.push(sub[2]);
      } else if (cur.items.length){
        cur.items[cur.items.length-1].subs.push(line);
      } else {
        cur.items.push({ k: line, subs: [] });
      }
    }
    if (cur) blocks.push(cur);
    return `
      <div class="ms-structured">
        ${blocks.map(b=>`
          <div class="ms-h2">${esc(b.h)}</div>
          <ul class="ms-ul">
            ${b.items.map(it=>`
              <li>
                <div class="ms-key">${esc(it.k)}</div>
                ${it.subs && it.subs.length ? `
                  <ul class="ms-subul">
                    ${it.subs.slice(0,6).map(s=>`<li>${esc(s)}</li>`).join('')}
                  </ul>
                `:''}
              </li>
            `).join('')}
          </ul>
        `).join('')}
      </div>
    `;
  };

  // 전역 노출
  window.MS_ResultUI = {
    init,
    setText,
    renderResult,
    showLoading,
    showError
  };

  // 자동 초기화 (DOM 준비 후)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
