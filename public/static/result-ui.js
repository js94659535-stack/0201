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
   * 기본 렌더러 (마크다운/프리 텍스트)
   */
  function renderDefault(container, data) {
    container.innerHTML = '';

    if (!data) {
      container.innerHTML = '<div class="meta">결과가 없습니다.</div>';
      return;
    }

    // narrative
    if (currentView === 'narrative' && data.narrative) {
      const pre = document.createElement('pre');
      pre.style.whiteSpace = 'pre-wrap';
      pre.style.lineHeight = '1.6';
      pre.textContent = data.narrative;
      container.appendChild(pre);
      return;
    }

    // structured
    if (currentView === 'structured' && data.structured) {
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
      return;
    }

    // mindmap
    if (currentView === 'mindmap' && data.mindmap) {
      const title = document.createElement('h3');
      title.textContent = '마인드맵 (간이)';
      container.appendChild(title);

      const center = document.createElement('div');
      center.className = 'badge';
      center.textContent = '🌟 ' + (data.mindmap.center || '핵심');
      container.appendChild(center);

      const ul = document.createElement('ul');
      (data.mindmap.nodes || [])
        .filter((n) => n.id !== 'c')
        .forEach((node) => {
          const li = document.createElement('li');
          li.textContent = node.label || '';
          ul.appendChild(li);
        });
      container.appendChild(ul);
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
        qText.textContent = `Q${i + 1}. ${q.question || ''}`;
        qBox.appendChild(qText);

        const hint = document.createElement('div');
        hint.className = 'meta';
        hint.textContent = '힌트: ' + (q.answerHint || '');
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
