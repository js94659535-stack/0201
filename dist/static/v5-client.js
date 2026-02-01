const $ = (id) => document.getElementById(id);
let currentMode = 'standard';
let currentView = 'narrative';
let currentAllSummaries = null;

// Character count
$('inputText').addEventListener('input', (e) => {
    $('charCount').textContent = e.target.value.length + '자';
});

// Mode selection - 클릭 시 즉시 재렌더링
document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
        document.querySelectorAll('.mode-btn').forEach(b => b.classList.replace('bg-blue-600', 'bg-gray-700'));
        btn.classList.replace('bg-gray-700', 'bg-blue-600');
        currentMode = btn.dataset.mode;
        
        // 이미 요약된 결과가 있으면 mode만 바꿔서 재렌더링
        const text = $('inputText').value.trim();
        if (text && $('resultSection').classList.contains('hidden') === false) {
            console.log('[V5 Client] mode 변경으로 재렌더링:', currentMode);
            try {
                const result = await window.MS_V5_renderResult({
                    containerEl: $('resultContent'),
                    inputText: text,
                    userId: 'demo-user',
                    mode: currentMode,
                    viewType: currentView,
                    onSelftestPassed: (r) => {
                        alert('자가테스트 통과! 점수: ' + r.pct + '%');
                    }
                });
                if (result.ok) {
                    $('resultMeta').textContent = '엔진: ' + result.resp.meta.engine + ' | 모드: ' + result.resp.meta.mode + ' | 뷰: ' + result.resp.meta.viewType;
                }
            } catch (err) {
                console.error('[V5 Client] mode 변경 오류:', err);
            }
        }
    });
});

// View selection - 클릭 시 즉시 재렌더링
document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
        document.querySelectorAll('.view-btn').forEach(b => b.classList.replace('bg-green-600', 'bg-gray-700'));
        btn.classList.replace('bg-gray-700', 'bg-green-600');
        currentView = btn.dataset.view;
        
        // 이미 요약된 결과가 있으면 viewType만 바꿔서 재렌더링
        const text = $('inputText').value.trim();
        if (text && $('resultSection').classList.contains('hidden') === false) {
            console.log('[V5 Client] viewType 변경으로 재렌더링:', currentView);
            try {
                const result = await window.MS_V5_renderResult({
                    containerEl: $('resultContent'),
                    inputText: text,
                    userId: 'demo-user',
                    mode: currentMode,
                    viewType: currentView,
                    onSelftestPassed: (r) => {
                        alert('자가테스트 통과! 점수: ' + r.pct + '%');
                    }
                });
                if (result.ok) {
                    $('resultMeta').textContent = '엔진: ' + result.resp.meta.engine + ' | 모드: ' + result.resp.meta.mode + ' | 뷰: ' + result.resp.meta.viewType;
                }
            } catch (err) {
                console.error('[V5 Client] viewType 변경 오류:', err);
            }
        }
    });
});

// Summarize
$('summarizeBtn').addEventListener('click', async () => {
    const text = $('inputText').value.trim();
    if (!text) { alert('텍스트를 입력하세요.'); return; }

    console.log('[V5 Client] 요약 시작:', { mode: currentMode, view: currentView, textLength: text.length });

    $('loadingIndicator').classList.remove('hidden');
    $('errorBox').classList.add('hidden');
    $('resultSection').classList.add('hidden');

    try {
        console.log('[V5 Client] MS_V5_renderResult 호출 전');
        
        if (typeof window.MS_V5_renderResult !== 'function') {
            throw new Error('MS_V5_renderResult가 로드되지 않았습니다. ms-learn-v5.js를 확인하세요.');
        }

        const result = await window.MS_V5_renderResult({
            containerEl: $('resultContent'),
            inputText: text,
            userId: 'demo-user',
            mode: currentMode,
            viewType: currentView,
            onSelftestPassed: (r) => {
                alert('자가테스트 통과! 점수: ' + r.pct + '%');
            }
        });

        console.log('[V5 Client] MS_V5_renderResult 결과:', result);

        $('loadingIndicator').classList.add('hidden');
        if (result.ok) {
            $('resultSection').classList.remove('hidden');
            $('saveBtn').classList.remove('hidden');
            currentAllSummaries = result.resp.allSummaries;
            $('resultMeta').textContent = '엔진: ' + result.resp.meta.engine + ' | 모드: ' + result.resp.meta.mode + ' | 뷰: ' + result.resp.meta.viewType;
        } else {
            $('errorBox').classList.remove('hidden');
            $('errorText').textContent = result.resp?.message || result.resp?.error || '알 수 없는 오류';
        }
    } catch (err) {
        console.error('[V5 Client] 오류:', err);
        $('loadingIndicator').classList.add('hidden');
        $('errorBox').classList.remove('hidden');
        $('errorText').textContent = err.message || String(err);
    }
});

// Save
$('saveBtn').addEventListener('click', async () => {
    if (!currentAllSummaries) { alert('저장할 데이터가 없습니다.'); return; }
    const text = $('inputText').value.trim();
    const result = await window.MS_V5_save('demo-user', text, currentAllSummaries);
    if (result?.ok) {
        alert('저장 완료! ID: ' + result.id);
    } else {
        alert('저장 실패: ' + (result?.message || result?.error || 'unknown'));
    }
});

// Copy
$('copyBtn').addEventListener('click', () => {
    const text = $('resultContent').innerText;
    navigator.clipboard.writeText(text).then(() => alert('복사 완료!'));
});
