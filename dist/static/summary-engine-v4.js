/* =========================================================
   SUMMARY ENGINE V4 (FINAL) - for Genspark integration
   포함:
   - 요약률(brief/standard/detail) 강제
   - 서술/구조화/마인드맵 3형식
   - 예습/시험(심화) 문항 생성
   - 셀프테스트(내용확인형) + 80% 통과 게이트용 채점키
   - 할루시네이션 방지(원문 근거 스팬 + 원문 외 추론 금지)
   - 토큰 절약(단일 JSON 호출 + chunk-map-reduce 옵션 + 캐시 키)
========================================================= */

/** ---------- Utils ---------- */
function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }

// 공백 제거 기준(한국어 친화)
function countKoreanFriendlyChars(s) {
  return String(s || '').replace(/\s+/g, '').length;
}

// 줄바꿈/비정상 공백 정리 (문장 깨짐 방지)
function normalizeText(raw) {
  if (!raw) return '';
  return raw
    .replace(/\r/g, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/([가-힣])\s+([가-힣])/g, '$1 $2') // 과도 결합 방지(최소)
    .trim();
}

// 문장 분리(최소 안전 버전): 마침표/물음표/느낌표 + 줄바꿈을 경계로
function splitSentences(text) {
  const t = normalizeText(text);
  if (!t) return [];
  const chunks = t
    .replace(/\n+/g, ' \n ')
    .split(/(?<=[\.\?\!]|다\.)\s+|\n+/g)
    .map(s => s.trim())
    .filter(Boolean);

  // 너무 짧은 조각은 앞에 붙여 문장 깨짐 완화
  const out = [];
  for (const s of chunks) {
    if (!out.length) { out.push(s); continue; }
    const last = out[out.length - 1];
    if (s.length < 8 && last.length < 200) out[out.length - 1] = (last + ' ' + s).trim();
    else out.push(s);
  }
  return out;
}

// 매우 단순한 중복 제거(정규화 후 해시)
function dedupeSentences(sents) {
  const seen = new Set();
  const out = [];
  for (const s of sents) {
    const key = s.replace(/\s+/g, '').slice(0, 120);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(s);
  }
  return out;
}

// 모드별 목표 비율(원문 대비)
function getModeTargets(mode) {
  // 사용자가 확정한 비율 철학 반영:
  // brief 12~15%, standard 25~30%, detail 45~55%
  if (mode === 'brief')   return { minPct: 12, maxPct: 15 };
  if (mode === 'detail')  return { minPct: 45, maxPct: 55 };
  return { minPct: 25, maxPct: 30 }; // standard
}

// 목표 글자수(공백 제거 기준)
function computeTargetChars(originalText, mode) {
  const base = Math.max(80, countKoreanFriendlyChars(originalText));
  const { minPct, maxPct } = getModeTargets(mode);
  // 목표는 중간값에 두고, 최종은 min~max 하드가드로 다듬음
  const target = Math.round(base * ((minPct + maxPct) / 200));
  const min = Math.round(base * (minPct / 100));
  const max = Math.round(base * (maxPct / 100));
  return { base, target, min, max };
}

// 문장 종결/톤 정규화(학술적 서술: "~이다/~한다/~되었다" 혼합 최소화)
function normalizeAcademicTone(text, tense = 'present') {
  let t = String(text || '').trim();
  if (!t) return t;

  // 불필요한 중복 마침표 정리
  t = t.replace(/\.{2,}/g, '.');

  // 문장 끝이 아니면 마침표 추가
  if (!/[\.!?]$/.test(t)) t += '.';

  // 아주 공격적인 변환은 금물(의미 훼손 가능) → 최소 규칙만 적용
  if (tense === 'past') {
    // "~한다" → "~하였다" 정도는 과격할 수 있어, 마지막 어미만 약하게 정리
    t = t.replace(/필요하다\./g, '필요하였다.')
         .replace(/시작한다\./g, '시작하였다.')
         .replace(/설정한다\./g, '설정하였다.');
  } else {
    t = t.replace(/필요하였다\./g, '필요하다.')
         .replace(/시작하였다\./g, '시작한다.')
         .replace(/설정하였다\./g, '설정한다.');
  }
  return t;
}

// 연결어 삽입(너무 과하면 부자연스러움 → 2~3종만, 조건부)
function addConnectors(sentences) {
  const out = [];
  for (let i = 0; i < sentences.length; i++) {
    let s = sentences[i].trim();
    if (i === 0) { out.push(s); continue; }

    const prev = out[out.length - 1] || '';
    // 간단 주어 추정(한국어 조사 기반 매우 약한 휴리스틱)
    const prevSubj = prev.match(/^(.+?[은는이가])\s+/)?.[1] || '';
    const currSubj = s.match(/^(.+?[은는이가])\s+/)?.[1] || '';

    if (prevSubj && currSubj && prevSubj === currSubj) {
      // 같은 주어면 주어 반복을 줄이고 "또한"으로 연결
      s = s.replace(/^.+?[은는이가]\s+/, '');
      s = '또한 ' + s;
    } else {
      // 내용 전환/추가
      s = (i % 3 === 0 ? '한편 ' : '이와 더불어 ') + s;
    }
    out.push(s.trim());
  }
  return out;
}

// 길이 가드레일: max 초과 시 문장 단위로 후방 제거 / min 미달 시 원문에서 근거 문장 추가
function enforceRatioBySentences(sentences, originalText, mode) {
  const { min, max } = computeTargetChars(originalText, mode);

  let sents = dedupeSentences(sentences.map(s => s.trim()).filter(Boolean));
  if (!sents.length) return { text: '요약할 내용이 부족합니다.', sents: [] };

  // 우선 연결어 + 톤 정리
  sents = addConnectors(sents).map(s => normalizeAcademicTone(s, 'present'));

  const lenOf = (arr) => countKoreanFriendlyChars(arr.join(' '));
  let curLen = lenOf(sents);

  // max 초과 → 뒤에서부터 제거
  while (curLen > max && sents.length > 1) {
    sents.pop();
    curLen = lenOf(sents);
  }

  // min 미달 → 원문에서 문장 추가(앞쪽 핵심 문장 우선)
  if (curLen < min) {
    const pool = dedupeSentences(splitSentences(originalText));
    for (const p of pool) {
      if (sents.length >= 10) break;
      const key = p.replace(/\s+/g, '').slice(0, 120);
      const exists = sents.some(x => x.replace(/\s+/g, '').includes(key));
      if (exists) continue;
      sents.push(normalizeAcademicTone(p, 'present'));
      curLen = lenOf(sents);
      if (curLen >= min) break;
    }
    // 다시 max 체크
    while (curLen > max && sents.length > 1) {
      sents.pop();
      curLen = lenOf(sents);
    }
  }

  return { text: sents.join(' ').trim(), sents };
}

/** ---------- Hallucination-safe JSON spec ---------- */
const ENGINE_SCHEMA_HINT = `
반드시 JSON만 출력한다. (코드블록 금지)
다음 규칙을 지킨다:
- 원문에 없는 새로운 사실/수치/주장을 만들지 않는다.
- 각 요약/항목/노드는 evidence_spans로 원문 근거 위치를 제공한다.
- evidence_spans는 [{start:int,end:int,quote:string}] 형태이며 quote는 원문에서 발췌(최대 30자)한다.
- narrative는 문장 3~8개로 구성, 문장 경계가 깨지지 않게 한다.
- outline은 3~6개의 상위 항목과 각 항목의 1~3개 하위 포인트로 구성한다.
- mindmap은 중심노드 1개 + 3~6개 가지 + 가지별 1~3개 하위노드로 구성한다.
- self_test는 내용확인형(정답이 원문에 있는) 6문항, 객관식 4지선다+정답키+근거스팬 포함.
- exam_questions는 심화/응용형 4문항, 서술형 또는 단답형, 모범답안(원문 기반) 포함.
`;

/** ---------- Token-saving: single-call engine with optional chunk map-reduce ---------- */
// 외부에서 주입: async function callLLM({system, user, maxTokens, temperature}) => string
// (젠스 환경에 맞게 window.callEngineAPI 또는 서버 API로 연결)
async function defaultCallLLM(payload) {
  if (typeof window !== 'undefined' && typeof window.callEngineAPI === 'function') {
    // window.callEngineAPI(text, options) 형태를 가정
    const text = payload.user;
    const options = { mode: 'json', temperature: payload.temperature ?? 0.2, maxTokens: payload.maxTokens ?? 1200 };
    const res = await window.callEngineAPI(text, options);
    return (res && res.text) ? res.text : String(res || '');
  }
  throw new Error('No LLM caller available. Provide callLLM.');
}

/** ---------- Core: buildSummaryPackage ---------- */
async function buildSummaryPackage({
  originalText,
  mode = 'standard',              // 'brief' | 'standard' | 'detail'
  callLLM = defaultCallLLM,
  cacheGet, cacheSet,              // optional (token save)
  forceChunking = false,           // very long text
  chunkCharLimit = 3500            // 공백제거 기준 chunk 목표
} = {}) {
  const source = normalizeText(originalText);
  if (!source || countKoreanFriendlyChars(source) < 30) {
    return {
      ok: false,
      error: '원문이 너무 짧습니다.',
      mode,
      narrative: '',
      outline: null,
      mindmap: null,
      self_test: [],
      exam_questions: [],
      keywords: [],
    };
  }

  // 캐시 키(토큰 절약)
  const cacheKey = 'SUMV4:' + mode + ':' + (source.slice(0, 120) + '|' + source.length);
  if (cacheGet) {
    const hit = await cacheGet(cacheKey);
    if (hit) return hit;
  }

  // 길면 chunk-map-reduce (토큰 절약 + 안정성)
  const baseLen = countKoreanFriendlyChars(source);
  const useChunk = forceChunking || baseLen > 12000;

  const { target, min, max } = computeTargetChars(source, mode);

  async function oneShotLLM(text, tag = '') {
    const userPrompt =
`[역할] 당신은 한국어 교육학/심리측정 논문 스타일의 요약 엔진이다.
[목표] 모드=${mode} / 공백제거 글자수 목표=${target} (허용범위 ${min}~${max})
[입력 원문]
${text}

[출력 형식]
${ENGINE_SCHEMA_HINT}

[추가 요구]
- narrative는 문장 단위로 깨지지 않게 작성하고, 연결어(또한/한편/이와 더불어)를 과하지 않게 사용한다.
- 원문 인용(저자, 연도)은 원문에 있는 것만 유지한다.
- ${tag ? `현재는 ${tag} 결과를 만들고 있다.` : ''}`;

    const raw = await callLLM({
      system: 'You output ONLY valid JSON. Never include markdown fences.',
      user: userPrompt,
      maxTokens: 1500,
      temperature: 0.2
    });

    return raw;
  }

  function safeJsonParse(raw) {
    const s = String(raw || '').trim();
    // JSON 앞뒤 쓰레기 제거(가끔 모델이 안내문을 붙임)
    const first = s.indexOf('{');
    const last = s.lastIndexOf('}');
    if (first >= 0 && last > first) {
      const cut = s.slice(first, last + 1);
      return JSON.parse(cut);
    }
    return JSON.parse(s);
  }

  // chunking
  let merged = null;
  if (useChunk) {
    // 원문을 문장 기준으로 누적 chunk
    const sents = splitSentences(source);
    const chunks = [];
    let cur = [];
    let curLen = 0;
    for (const s of sents) {
      const sl = countKoreanFriendlyChars(s);
      if (curLen + sl > chunkCharLimit && cur.length) {
        chunks.push(cur.join(' '));
        cur = [s];
        curLen = sl;
      } else {
        cur.push(s);
        curLen += sl;
      }
    }
    if (cur.length) chunks.push(cur.join(' '));

    // 각 chunk 요약(JSON) → 마지막에 reduce
    const partials = [];
    for (let i = 0; i < chunks.length; i++) {
      const raw = await oneShotLLM(chunks[i], `부분요약 ${i + 1}/${chunks.length}`);
      try { partials.push(safeJsonParse(raw)); }
      catch { /* 무시하고 다음 */ }
    }

    // reduce: partials를 다시 하나로
    const reduceInput =
`[부분 요약들]
${JSON.stringify(partials).slice(0, 9000)}

[원문(요약률 계산용)]
길이=${baseLen}

[요구]
- 부분 요약의 공통 핵심을 통합하여 최종 JSON 1개를 만든다.
- 중복을 제거하고, narrative/outline/mindmap/self_test/exam_questions를 다시 구성한다.
- 원문 밖 정보는 금지.
- 모드=${mode}, 글자수 ${min}~${max}를 반드시 준수.`;

    const reducedRaw = await callLLM({
      system: 'You output ONLY valid JSON. Never include markdown fences.',
      user: reduceInput + '\n\n' + ENGINE_SCHEMA_HINT,
      maxTokens: 1600,
      temperature: 0.2
    });

    merged = safeJsonParse(reducedRaw);
  } else {
    const raw = await oneShotLLM(source);
    merged = safeJsonParse(raw);
  }

  // ----- Post-Validate & Guardrails -----
  const out = {
    ok: true,
    mode,
    // 세 형식 모두 제공(젠스 UI에서 탭/버튼으로 선택)
    narrative: '',
    outline: null,
    mindmap: null,
    self_test: [],
    exam_questions: [],
    keywords: [],
    evidence_index: [] // 전체 근거(선택)
  };

  // narrative: 문자열 or 문장 배열 모두 수용
  let narrativeText = '';
  if (Array.isArray(merged?.narrative)) narrativeText = merged.narrative.join(' ');
  else narrativeText = String(merged?.narrative || '');

  // 문장 경계 안전 폴백: LLM 결과가 깨졌으면 추출형으로 다시 구성
  let narrativeSents = splitSentences(narrativeText);
  narrativeSents = dedupeSentences(narrativeSents);

  if (!narrativeSents.length || narrativeSents.some(s => s.length < 8)) {
    // 폴백: 원문에서 중요 문장(앞쪽+연구문제 포함)을 최소 구성
    const pool = dedupeSentences(splitSentences(source));
    narrativeSents = pool.slice(0, mode === 'brief' ? 3 : mode === 'detail' ? 8 : 5);
  }

  // 요약률 강제
  const enforced = enforceRatioBySentences(narrativeSents, source, mode);
  out.narrative = enforced.text;

  // outline/mindmap/keywords
  out.outline = merged?.outline || merged?.structured || null;
  out.mindmap = merged?.mindmap || null;
  out.keywords = merged?.keywords || merged?.key_terms || [];

  // self_test: 6문항(내용확인형) 강제
  const st = Array.isArray(merged?.self_test) ? merged.self_test : [];
  out.self_test = st.slice(0, 6).map((q, idx) => ({
    id: q.id || `ST${idx + 1}`,
    type: 'mcq4',
    question: q.question || '',
    choices: q.choices || q.options || [],
    answer: q.answer || q.correct || '',
    rationale: q.rationale || '',
    evidence_spans: q.evidence_spans || []
  })).filter(q => q.question && Array.isArray(q.choices) && q.choices.length >= 3);

  // exam_questions: 4문항(심화/응용) 강제
  const ex = Array.isArray(merged?.exam_questions) ? merged.exam_questions : [];
  out.exam_questions = ex.slice(0, 4).map((q, idx) => ({
    id: q.id || `EX${idx + 1}`,
    type: q.type || 'short_answer',
    question: q.question || '',
    model_answer: q.model_answer || q.answer || '',
    evidence_spans: q.evidence_spans || []
  })).filter(q => q.question);

  out.evidence_index = merged?.evidence_index || [];

  // 최종 안전장치: narrative가 여전히 너무 짧거나 길면 추출형으로 재조정
  const { min: minC, max: maxC } = computeTargetChars(source, mode);
  const finalLen = countKoreanFriendlyChars(out.narrative);
  if (finalLen < minC || finalLen > maxC) {
    const pool = dedupeSentences(splitSentences(source));
    const pickN = mode === 'brief' ? 3 : mode === 'detail' ? 9 : 6;
    const enforced2 = enforceRatioBySentences(pool.slice(0, pickN), source, mode);
    out.narrative = enforced2.text;
  }

  if (cacheSet) await cacheSet(cacheKey, out);
  return out;
}

/** ---------- Self-test gate (80% pass rule) ---------- */
function gradeSelfTest(selfTestItems, userAnswers) {
  const items = Array.isArray(selfTestItems) ? selfTestItems : [];
  const ans = userAnswers || {};
  let correct = 0;
  for (const it of items) {
    const ua = ans[it.id];
    if (!ua) continue;
    if (String(ua).trim() === String(it.answer).trim()) correct++;
  }
  const total = items.length || 1;
  const score = Math.round((correct / total) * 100);
  return {
    total,
    correct,
    score,
    passed: score >= 80
  };
}

/** ---------- Export to window for Gens UI ---------- */
if (typeof window !== 'undefined') {
  window.MS_SummaryEngineV4 = {
    buildSummaryPackage,
    gradeSelfTest,
    splitSentences,
    normalizeText,
    countKoreanFriendlyChars
  };
}
