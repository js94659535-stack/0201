/* =========================================================
   PATCH: Quality Report 분리 + 중복 렌더 제거 + ratio/QA 경고로 화면 막지 않기
   ========================================================= */

const $ = (id) => document.getElementById(id);
let currentMode = 'standard';
let currentView = 'narrative';
let currentAllSummaries = null;
let lastApiResponse = null; // 마지막 API 응답 캐시

// ---------- 1) 품질 리포트 UI 영역 생성 ----------
function ensureQualityReportPanel() {
  let panel = document.getElementById('ms-quality-report');
  if (panel) return panel;

  panel = document.createElement('div');
  panel.id = 'ms-quality-report';
  panel.style.marginTop = '12px';
  panel.style.padding = '12px';
  panel.style.borderRadius = '14px';
  panel.style.background = 'rgba(255,255,255,0.06)';
  panel.style.border = '1px solid rgba(255,255,255,0.10)';
  panel.style.backdropFilter = 'blur(6px)';
  panel.style.color = '#e5e7eb';
  panel.style.fontSize = '13px';
  panel.style.lineHeight = '1.35';

  panel.innerHTML = `
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
      <div style="font-weight:700;">품질 리포트</div>
      <div id="ms-quality-badge" style="padding:2px 8px;border-radius:999px;background:rgba(0,0,0,0.25);font-size:12px;">-</div>
    </div>
    <div id="ms-quality-body" style="white-space:pre-wrap;opacity:0.95;">요약을 생성하면 QA/ratio 상태가 여기에 표시됩니다.</div>
  `;

  // resultMeta 영역 아래에 추가
  const metaEl = $('resultMeta');
  if (metaEl && metaEl.parentNode) {
    metaEl.parentNode.insertBefore(panel, metaEl.nextSibling);
  } else {
    // fallback: resultSection 안에 추가
    const resultSection = $('resultSection');
    if (resultSection) {
      resultSection.appendChild(panel);
    }
  }
  
  return panel;
}

function renderQualityReport(qa, meta) {
  const panel = ensureQualityReportPanel();
  const badge = document.getElementById('ms-quality-badge');
  const body = document.getElementById('ms-quality-body');

  if (!qa) {
    badge.textContent = 'qa: none';
    badge.style.background = 'rgba(0,0,0,0.25)';
    body.textContent = 'QA 정보가 없습니다.';
    return;
  }

  const crossOk = qa.cross_ok === true;
  const ratioLines = [];
  const ratioObj = qa.ratios || {};
  for (const k of ['brief', 'standard', 'detail']) {
    const r = ratioObj[k];
    if (!r) continue;
    ratioLines.push(
      `- ratio.${k}: ${Number(r.ratio).toFixed(3)} (ok=${r.ok}) rule[min=${r.rule?.min}, max=${r.rule?.max}, target=${r.rule?.target}]`
    );
  }

  const errs = Array.isArray(qa.cross_errors) ? qa.cross_errors : [];
  const reqId = meta?.reqId ? String(meta.reqId) : '';

  badge.textContent = crossOk ? 'OK' : 'WARN';
  badge.style.background = crossOk ? 'rgba(34,197,94,0.25)' : 'rgba(245,158,11,0.25)';

  body.textContent =
    `reqId: ${reqId}\n` +
    `phase: ${meta?.phase || '-'} / elapsedMs: ${meta?.elapsedMs ?? '-'}\n` +
    `cross_ok: ${crossOk}\n` +
    (errs.length ? `cross_errors:\n${errs.map(e => `  • ${e}`).join('\n')}\n` : 'cross_errors: (none)\n') +
    (ratioLines.length ? `ratios:\n${ratioLines.join('\n')}\n` : 'ratios: (none)\n');
}

// ---------- 2) "중복 렌더" 방지: views 우선 1곳만 사용 ----------
function pickViewPayload(apiData, level, viewType) {
  // ✅ 권장: views를 1순위로
  const a = apiData?.views?.[viewType]?.[level];
  if (a) return a;

  // ✅ 폴백: levels
  const b = apiData?.levels?.[level]?.[viewType];
  if (b) return b;

  return null;
}

// ---------- 3) API 응답 처리 헬퍼 ----------
async function processMatrixResponse(resp, level, viewType) {
  const data = resp?.data || null;
  
  // ✅ 품질 리포트: meta.qa 또는 result.qa 중 있는 걸 사용
  const qa = resp?.meta?.qa || resp?.result?.qa || null;
  const meta = resp?.meta || null;
  renderQualityReport(qa, meta);

  // ✅ QA/ratio가 WARN이어도 렌더를 막지 않는다
  const payload = pickViewPayload(data, level, viewType);

  if (!payload) {
    console.warn('[V5 Client] payload 없음:', { level, viewType, dataKeys: Object.keys(data || {}) });
    return null;
  }

  console.log('[V5 Client] payload 선택:', {
    level,
    viewType,
    hasText: !!payload.text,
    hasItems: !!payload.items,
    hasTree: !!payload.tree,
    keys: Object.keys(payload).slice(0, 8)
  });

  return payload;
}

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
        if (text && $('resultSection').classList.contains('hidden') === false && lastApiResponse) {
            console.log('[V5 Client] mode 변경으로 재렌더링:', currentMode);
            try {
                // 캐시된 API 응답 재사용
                await processMatrixResponse(lastApiResponse, currentMode, currentView);
                
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
                
                // resultMeta 업데이트 (에러 무시)
                if (result.ok && result.resp?.meta) {
                    const m = result.resp.meta;
                    $('resultMeta').textContent = `phase: ${m.phase || '-'} | 모드: ${currentMode} | 뷰: ${currentView}`;
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
        if (text && $('resultSection').classList.contains('hidden') === false && lastApiResponse) {
            console.log('[V5 Client] viewType 변경으로 재렌더링:', currentView);
            try {
                // 캐시된 API 응답 재사용
                await processMatrixResponse(lastApiResponse, currentMode, currentView);
                
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
                
                // resultMeta 업데이트 (에러 무시)
                if (result.ok && result.resp?.meta) {
                    const m = result.resp.meta;
                    $('resultMeta').textContent = `phase: ${m.phase || '-'} | 모드: ${currentMode} | 뷰: ${currentView}`;
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
        
        // ✅ 핵심: result.ok가 false여도 품질 리포트는 표시하고 화면은 계속
        if (result.resp) {
            lastApiResponse = result.resp; // API 응답 캐시
            await processMatrixResponse(result.resp, currentMode, currentView);
        }
        
        if (result.ok) {
            $('resultSection').classList.remove('hidden');
            $('saveBtn').classList.remove('hidden');
            currentAllSummaries = result.resp.allSummaries;
            
            const m = result.resp.meta || {};
            $('resultMeta').textContent = `phase: ${m.phase || '-'} | 모드: ${currentMode} | 뷰: ${currentView}`;
        } else {
            // ✅ 에러여도 품질 리포트만 보여주고 계속 진행
            console.warn('[V5 Client] 응답 ok=false이지만 품질 리포트 표시 후 계속');
            $('resultSection').classList.remove('hidden'); // 결과 영역은 보여줌
            
            // 에러 메시지를 품질 리포트 하단에 추가
            const panel = ensureQualityReportPanel();
            const errorMsg = result.resp?.message || result.resp?.error || '알 수 없는 오류';
            panel.innerHTML += `<div style="margin-top:8px;padding:8px;background:rgba(239,68,68,0.15);border-radius:8px;color:#fca5a5;">⚠️ ${errorMsg}</div>`;
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

console.log('[V5 Client] Patch loaded: Quality Report + No render blocking on QA warnings');
