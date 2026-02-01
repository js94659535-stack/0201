const $ = (id) => document.getElementById(id);
let currentMode = 'standard';
let currentView = 'narrative';
let currentAllSummaries = null;

// Character count
$('inputText').addEventListener('input', (e) => {
    $('charCount').textContent = e.target.value.length + '자';
});

// Mode selection
document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.mode-btn').forEach(b => b.classList.replace('bg-blue-600', 'bg-gray-700'));
        btn.classList.replace('bg-gray-700', 'bg-blue-600');
        currentMode = btn.dataset.mode;
    });
});

// View selection
document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.view-btn').forEach(b => b.classList.replace('bg-green-600', 'bg-gray-700'));
        btn.classList.replace('bg-gray-700', 'bg-green-600');
        currentView = btn.dataset.view;
    });
});

// Summarize
$('summarizeBtn').addEventListener('click', async () => {
    const text = $('inputText').value.trim();
    if (!text) { alert('텍스트를 입력하세요.'); return; }

    $('loadingIndicator').classList.remove('hidden');
    $('errorBox').classList.add('hidden');
    $('resultSection').classList.add('hidden');

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
