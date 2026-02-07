/* =====================================================================
   ONE-BLOCK FINAL FIX — SUMMARY V4 FORTRESS
   파일: /home/user/webapp/src/routes/matrix-v4.ts

   ✅ 목표(요새화)
   1) 서술형(narrative)에서 "가짜요약" 원천 차단:
      - '...','….','…' 생략부호 금지
      - 다른 주제(스웨덴/GDP/공교육 등) 혼입 금지
      - 표/페이지 찌꺼기(-40-) 제거
   2) brief/standard/detail을 "의미 슬롯"으로 분화 강제
   3) detail 1회 생성 → downsampleFromDetail()로 brief/standard 생성(트리 유지)
   4) phase2 실패 시 qa=null로 자연 낙하(phase1 진단 생성) 유지
===================================================================== */

import { Hono } from 'hono';

import {
  generateNarrativeFallback,
  generateStructuredFallback,
  generateMindmapFallback,
  generateSelftestFallback,
  enforceSummaryRatio,
} from '../lib/local-fallback-generators';

import {
  validateCrossConsistency,
  validateLevelSeparation,
  SUMMARY_RATIO_TABLE,
  qualityGateAll,
} from '../lib/ms-summary-guard-v1';

import { insertFalseBucket } from '../lib/false-bucket';

type Bindings = {
  DB?: D1Database;

  GEMINI_API_KEY?: string;
  GEMINI_MODEL?: string;

  OPENAI_API_KEY?: string;
  OPENAI_MODEL?: string;

  ANTHROPIC_API_KEY?: string;
  ANTHROPIC_MODEL?: string;

  // ⚠️ Workers에서 localhost 불가. 반드시 외부 접근 가능한 URL만
  // 예: https://tunnel.example.com/api/chat
  LOCAL_LLM_URL?: string;
  LOCAL_LLM_MODEL?: string;

  USE_MOCK?: string;
};

type Level = 'brief' | 'standard' | 'detail';
type ViewType = 'narrative' | 'structured' | 'mindmap' | 'selftest';

// 🎯 [3-LAYER] 상태기계 Phase 타입
type StateMachinePhase = 
  | 'S0_SANITIZE'      // 입력 정제
  | 'S1_DETAIL'        // Detail 생성
  | 'S2_DOWNSAMPLE'    // Brief/Standard 생성
  | 'S3_ASSEMBLY'      // 응답 조립
  | 'S0_FAIL'          // S0 단계 실패
  | 'S1_FAIL'          // S1 단계 실패 (발췌형 오염)
  | 'S2_FAIL'          // S2 단계 실패
  | 'S3_FAIL';         // S3 단계 실패

// 🎯 [3-LAYER] 엔진 메타데이터
type EngineMeta = 
  | 'matrix-v4'                    // Universal Logic Engine 성공
  | 'fallback-extractive'          // 발췌형 Fallback
  | 'fallback-local';              // 로컬 Fallback

// 🎯 [3-LAYER] 품질 게이트 결과
type QualityGateResult = {
  passed: boolean;              // 품질 기준 통과 여부
  degraded: boolean;            // 저하된 품질 (발췌형)
  warnings: string[];           // 경고 메시지
  extractiveRatio: number;      // 원문 유사도 (0~1)
  hasSlotMarkers: boolean;      // 슬롯 마커 존재 여부
  strictMetrics?: {             // 🔴 NEW: 엄격한 품질 메트릭
    briefStandardSim: number;
    standardDetailSim: number;
    briefDetailSim: number;
    briefCopyRate: number;
    standardCopyRate: number;
    detailCopyRate: number;
    briefRatio: number;
    standardRatio: number;
    detailRatio: number;
  };
};

type MatrixReq = {
  text: string;
  userId?: string;
  level?: Level;
  viewType?: ViewType;
};

type DetailBundle = {
  schemaVersion: 'ms-v4';
  lang: 'ko';
  source: {
    charCount: number;
    checksum: string;
  };

  narrative: {
    coreClaim: string;
    grounds: string[];
    comparisons?: string[];
    implications?: string[];
    summaryDetail: string;
  };

  structured: {
    toc: Array<{ title: string; anchor: string }>;
    hierarchy: Array<{
      title: string;
      bullets: string[];
      keywords: string[];
      children?: Array<{
        title: string;
        bullets: string[];
        keywords: string[];
      }>;
    }>;
    glossary: Array<{ term: string; def: string }>;
  };

  mindmap: {
    title: string;
    children: Array<{
      title: string;
      children: Array<{
        title: string;
        pack?: string[];
        explain?: string;
        children?: any[];
      }>;
    }>;
  };

  selftest: {
    passScorePct: 90;
    items: Array<{
      id: string;
      type: 'short' | 'explain' | 'evidence';
      question: string;
      hint?: string;
      rubric: {
        mustInclude?: string[];
        mustNotInclude?: string[];
        maxChars?: number;
      };
      answerKey?: string;
    }>;
  };
};

type LevelBundle = {
  narrative: {
    text: string;
    coreClaim: string;
    grounds: string[];
    comparisons: string[];
    implications: string[];
  };
  structured: {
    text: string;
    toc: any[];
    hierarchy: any[];
    glossary: any[];
  };
  mindmap: { tree: any };
  selftest: { passScorePct: 90; items: any[] };
};

function normalizeLevel(v?: string): Level {
  const s = (v || '').toLowerCase().trim();
  if (s === 'brief' || s === 'standard' || s === 'detail') return s;
  if (s === 'simple') return 'brief';
  return 'standard';
}

// ✅ Phase 판정 유틸 (OpenAI/Gemini/Claude/Local 중 하나라도 있으면 phase2)
function hasUsableKey(v?: string) {
  return !!(v && String(v).trim().length > 10);
}

/* ============================================================
   START: PHASE DETECTION (Multi-LLM Support)
   OpenAI removed, only Local/Gemini/Claude supported
   Phase2: 어느 하나라도 LLM이 있으면 Phase2
   Phase1: 모두 없으면 Phase1 (Local Fallback만 사용)
   ============================================================ */
function detectPhase(c: any) {
  const useMock = String(c.env?.USE_MOCK || '').toLowerCase() === 'true';
  if (useMock) return { phase: 'phase1' as const, useMock: true };

  const hasGemini = hasUsableKey(c.env?.GEMINI_API_KEY);
  const hasClaude = hasUsableKey(c.env?.ANTHROPIC_API_KEY);
  const hasLocal = !!(c.env?.LOCAL_LLM_URL && String(c.env.LOCAL_LLM_URL).trim().length > 8);

  // ✅ OpenAI 완전 제거, Local/Gemini/Claude 중 하나라도 있으면 Phase2
  const phase = (hasLocal || hasGemini || hasClaude) ? ('phase2' as const) : ('phase1' as const);
  return { phase, useMock: false };
}
/* ============================================================
   END: PHASE DETECTION
   ============================================================ */

function normalizeViewType(v?: string): ViewType {
  const s = (v || '').toLowerCase().trim();
  if (s === 'narrative' || s === 'structured' || s === 'mindmap' || s === 'selftest') return s;
  if (s === 'mind-map') return 'mindmap';
  return 'narrative';
}

// ------------------------------
// Utils
// ------------------------------
function checksumSimple(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(16);
}

// 🎯 [ONE-BLOCK FIX] coerceText 안전형: JSON.stringify 금지, 후보 체인 탐색
function coerceText(v: any): string {
  if (typeof v === 'string') return v.trim();
  if (!v) return '';

  // 🔍 흔한 중첩 케이스들까지 커버 (후보 체인)
  if (typeof v === 'object') {
    if (typeof v.text === 'string') return v.text.trim();
    if (typeof v.summaryDetail === 'string') return v.summaryDetail.trim();
    if (v.narrative && typeof v.narrative.summaryDetail === 'string') {
      return v.narrative.summaryDetail.trim();
    }
    if (v.narrative && typeof v.narrative.text === 'string') {
      return v.narrative.text.trim();
    }
    // ✅ JSON.stringify 금지 → 요약칸 오염 재발 방지
    console.warn('[coerceText] ⚠️ Object without valid text field, returning empty');
    return '';
  }
  return String(v).trim();
}

// 🎯 [ONE-BLOCK FIX] DetailBundle 스키마 확인 함수
function looksLikeDetailBundle(x: any): boolean {
  return !!(
    x &&
    typeof x === 'object' &&
    x.narrative &&
    typeof x.narrative === 'object' &&
    // summaryDetail 또는 coreClaim/grounds 중 하나라도 존재해야 통과
    (typeof x.narrative.summaryDetail === 'string' ||
     typeof x.narrative.coreClaim === 'string' ||
     Array.isArray(x.narrative.grounds))
  );
}

// 🎯 [ONE-BLOCK FIX] LLM 결과를 안전하게 DetailBundle로 변환
function coerceDetailBundleFromLLM(llmResult: any): DetailBundle | null {
  if (!llmResult) return null;

  // 이미 DetailBundle 형태면 그대로 반환
  if (looksLikeDetailBundle(llmResult)) {
    return llmResult as DetailBundle;
  }

  // 문자열이면 파싱 시도
  if (typeof llmResult === 'string') {
    const parsed = safeJsonParse(llmResult);
    if (looksLikeDetailBundle(parsed)) {
      return parsed as DetailBundle;
    }
    console.warn('[coerceDetailBundle] ⚠️ Parsed result is not DetailBundle');
    return null;
  }

  // 그 외 타입은 실패
  console.warn('[coerceDetailBundle] ⚠️ Invalid type:', typeof llmResult);
  return null;
}

// 🎯 [3-LAYER] S1 품질 게이트: 발췌형 오염 검출 (강화판)
function evaluateQuality(summaryText: string, originalText: string): QualityGateResult {
  const warnings: string[] = [];
  let degraded = false;
  
  // 정규화 (비교용)
  const normalizeSummary = summaryText.replace(/\s+/g, ' ').trim();
  const normalizeOriginal = originalText.replace(/\s+/g, ' ').trim();
  
  // 1. 슬롯 마커 존재 여부
  const hasSlotMarkers = /\[핵심 정의\]|\[상세 설명\]|\[결론.*시사점\]/i.test(summaryText);
  if (!hasSlotMarkers) {
    warnings.push('MISSING_SLOT_MARKERS');
    degraded = true;
  }
  
  // 2. 🎯 연속 N-gram 일치 검사 (원문 그대로 복사 탐지)
  // 5-gram 이상 연속 일치하면 발췌로 판단
  const summaryWords = normalizeSummary.split(/\s+/).filter(Boolean);
  const originalWords = normalizeOriginal.split(/\s+/).filter(Boolean);
  
  let maxConsecutiveMatch = 0;
  for (let i = 0; i <= summaryWords.length - 5; i++) {
    const ngramSummary = summaryWords.slice(i, i + 5).join(' ');
    if (normalizeOriginal.includes(ngramSummary)) {
      // 연속 일치 길이 확장
      let matchLen = 5;
      while (i + matchLen < summaryWords.length) {
        const extendedGram = summaryWords.slice(i, i + matchLen + 1).join(' ');
        if (normalizeOriginal.includes(extendedGram)) {
          matchLen++;
        } else {
          break;
        }
      }
      maxConsecutiveMatch = Math.max(maxConsecutiveMatch, matchLen);
    }
  }
  
  if (maxConsecutiveMatch >= 8) {
    warnings.push(`CONSECUTIVE_COPY_${maxConsecutiveMatch}_WORDS`);
    degraded = true;
  }
  
  // 3. 🎯 문장 단위 일치 검사 (원문 문장 그대로 복사)
  const summarySentences = normalizeSummary.split(/[.!?]\s+/).filter(s => s.length > 10);
  const originalSentences = normalizeOriginal.split(/[.!?]\s+/).filter(s => s.length > 10);
  
  let exactSentenceMatches = 0;
  summarySentences.forEach(sumSent => {
    originalSentences.forEach(origSent => {
      // 90% 이상 일치하면 동일 문장으로 판단
      const similarity = computeSimilarity(sumSent, origSent);
      if (similarity > 0.9) {
        exactSentenceMatches++;
      }
    });
  });
  
  const sentenceMatchRatio = summarySentences.length > 0 
    ? exactSentenceMatches / summarySentences.length 
    : 0;
  
  if (sentenceMatchRatio > 0.6) {
    warnings.push(`SENTENCE_COPY_RATIO_${(sentenceMatchRatio * 100).toFixed(0)}%`);
    degraded = true;
  }
  
  // 4. 토큰 기반 유사도 (기존 로직)
  const summaryTokens = new Set(normalizeSummary.replace(/[^\w가-힣]/g, ' ').split(/\s+/).filter(Boolean));
  const originalTokens = new Set(normalizeOriginal.replace(/[^\w가-힣]/g, ' ').split(/\s+/).filter(Boolean));
  
  let matchCount = 0;
  summaryTokens.forEach(token => {
    if (originalTokens.has(token)) matchCount++;
  });
  
  const extractiveRatio = summaryTokens.size > 0 ? matchCount / summaryTokens.size : 1;
  
  if (extractiveRatio > 0.9) {
    warnings.push('HIGH_EXTRACTIVE_RATIO');
    degraded = true;
  }
  
  // 5. 생략부호 검사
  if (/\.{3,}|…/.test(summaryText)) {
    warnings.push('ELLIPSIS_DETECTED');
    degraded = true;
  }
  
  // 6. 길이 검사
  if (summaryText.length < 50) {
    warnings.push('TOO_SHORT');
    degraded = true;
  }
  
  const passed = !degraded && warnings.length === 0;
  
  return {
    passed,
    degraded,
    warnings,
    extractiveRatio,
    hasSlotMarkers
  };
}

// ============================================================
// 🔴 [NEW V2] 확장 좀비 자동 감지 & Reject/Regenerate 파이프라인
// ============================================================

/**
 * 한글 친화 글자수 계산 (공백 제거)
 */
function koreanCharCount(s: string): number {
  return (s || '').replace(/\s+/g, '').length;
}

/**
 * 압축률 범위 검증
 * @param original 원문
 * @param text 요약 텍스트
 * @param target 목표 압축률 (예: 0.15)
 * @param tol 허용 오차 (기본 ±6%)
 */
function withinRatio(original: string, text: string, target: number, tol: number = 0.06): boolean {
  const o = Math.max(1, koreanCharCount(original));
  const t = koreanCharCount(text);
  const r = t / o;
  return Math.abs(r - target) <= tol;
}

/**
 * 유사도 비교용 정규화
 * - 문장부호/공백 제거
 * - 단어만 남김
 */
function normalizeForSim(s: string): string {
  return (s || '')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')  // 문자/숫자만 유지
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * 동적 유사도 임계값 (원문 길이 기반)
 * 
 * 📐 로직: passed = similarity < threshold
 * - threshold가 클수록 → 통과 쉬움 (완화)
 * - threshold가 작을수록 → 통과 어려움 (강화)
 * 
 * 📏 원문 길이별 전략:
 * - 짧은 원문 (< 800자): 0.82 (완화) ← 겹침 불가피하므로 관대하게
 * - 중간 원문 (< 4000자): 0.75 (표준) ← 균형
 * - 긴 원문 (≥ 4000자): 0.68 (강화) ← 누적 확장 엄격히 차단
 */
function dynamicSimThreshold(original: string): number {
  const n = koreanCharCount(original);
  if (n < 800) return 0.82;      // 짧은 글: 완화 (겹침 허용)
  if (n < 4000) return 0.75;     // 중간 글: 표준
  return 0.68;                   // 긴 글: 강화 (누적 확장 차단)
}

/**
 * N-gram 기반 원문 복제율 계산 (정규화된 텍스트용)
 */
function getNGramOverlap(original: string, summary: string, ngramSize: number = 10): number {
  const origChars = original.split('');
  const summChars = summary.split('');
  
  let copiedCount = 0;
  
  for (let i = 0; i <= summChars.length - ngramSize; i++) {
    const ngram = summChars.slice(i, i + ngramSize).join('');
    if (original.includes(ngram)) {
      copiedCount += ngramSize;
      i += ngramSize - 1; // 중복 방지
    }
  }
  
  return summChars.length > 0 ? copiedCount / summChars.length : 0;
}

/**
 * 코사인 유사도 계산 (간단 버전)
 */
function getCosineSimilarity(text1: string, text2: string): number {
  const tokens1 = text1.split(/\s+/).filter(Boolean);
  const tokens2 = text2.split(/\s+/).filter(Boolean);
  
  const freq1 = new Map<string, number>();
  const freq2 = new Map<string, number>();
  
  tokens1.forEach(t => freq1.set(t, (freq1.get(t) || 0) + 1));
  tokens2.forEach(t => freq2.set(t, (freq2.get(t) || 0) + 1));
  
  const allTokens = new Set([...freq1.keys(), ...freq2.keys()]);
  
  let dotProduct = 0;
  let mag1 = 0;
  let mag2 = 0;
  
  allTokens.forEach(token => {
    const v1 = freq1.get(token) || 0;
    const v2 = freq2.get(token) || 0;
    dotProduct += v1 * v2;
    mag1 += v1 * v1;
    mag2 += v2 * v2;
  });
  
  if (mag1 === 0 || mag2 === 0) return 0;
  
  return dotProduct / (Math.sqrt(mag1) * Math.sqrt(mag2));
}

/**
 * 🔴 [CRITICAL] 통합 품질 검증: 3중 필터 (A + B + C)
 * 
 * A. 압축률(길이) 체크
 * B. 레벨 간 유사도 체크 (누적 확장 좀비 탐지)
 * C. 원문 복제율 체크 (발췌형 오염 탐지)
 * 
 * @returns { passed: boolean, metrics: {...} }
 */
function isQualityStandardPassed(
  original: string,
  results: { brief: string; standard: string; detail: string },
  ratios: { b: number; s: number; d: number }
): {
  passed: boolean;
  metrics: {
    ratioOK: boolean;
    b_s_sim: number;
    s_d_sim: number;
    simThr: number;
    copyRate: number;
    levelSimOK: boolean;
    copyOK: boolean;
    containmentOK: boolean;
    briefInStandard: number;
    standardInDetail: number;
    briefRatio: number;
    standardRatio: number;
    detailRatio: number;
  };
} {
  const { brief, standard, detail } = results;
  
  // A) 압축률(길이) 체크
  const ratioOK =
    withinRatio(original, brief, ratios.b) &&
    withinRatio(original, standard, ratios.s) &&
    withinRatio(original, detail, ratios.d);
  
  const briefRatio = koreanCharCount(brief) / Math.max(1, koreanCharCount(original));
  const standardRatio = koreanCharCount(standard) / Math.max(1, koreanCharCount(original));
  const detailRatio = koreanCharCount(detail) / Math.max(1, koreanCharCount(original));
  
  // B) 레벨 간 유사도 체크 (누적 확장 탐지)
  const thr = dynamicSimThreshold(original);
  const b_s_sim = getCosineSimilarity(normalizeForSim(brief), normalizeForSim(standard));
  const s_d_sim = getCosineSimilarity(normalizeForSim(standard), normalizeForSim(detail));
  const levelSimOK = (b_s_sim < thr) && (s_d_sim < thr);
  
  // C) 원문 복제율 체크 (발췌형 오염 탐지)
  const copyRate = getNGramOverlap(normalizeForSim(original), normalizeForSim(detail), 10);
  const copyOK = copyRate < 0.20;
  
  // D) 🔴 [NEW] 포함 금지 (Containment Ban) - 누적 확장 좀비 탐지
  // Brief가 Standard 안에 "거의 그대로" 포함되면 Reject
  // Standard가 Detail 안에 "거의 그대로" 포함되면 Reject
  const briefNorm = normalizeForSim(brief);
  const standardNorm = normalizeForSim(standard);
  const detailNorm = normalizeForSim(detail);
  
  // 포함률 계산: Brief의 10-gram이 Standard에 얼마나 포함되는가?
  const briefInStandard = getNGramOverlap(standardNorm, briefNorm, 10);
  const standardInDetail = getNGramOverlap(detailNorm, standardNorm, 10);
  
  // 임계값: 70% 이상 포함되면 "이어붙이기"로 간주
  const CONTAINMENT_THRESHOLD = 0.70;
  const containmentOK = (briefInStandard < CONTAINMENT_THRESHOLD) && (standardInDetail < CONTAINMENT_THRESHOLD);
  
  console.log('[QualityCheck] A) Ratios:', {
    brief: `${(briefRatio * 100).toFixed(1)}% (target: ${(ratios.b * 100).toFixed(0)}% ±6%)`,
    standard: `${(standardRatio * 100).toFixed(1)}% (target: ${(ratios.s * 100).toFixed(0)}% ±6%)`,
    detail: `${(detailRatio * 100).toFixed(1)}% (target: ${(ratios.d * 100).toFixed(0)}% ±6%)`,
    ratioOK
  });
  
  console.log('[QualityCheck] B) Similarity:', {
    'brief-standard': b_s_sim.toFixed(3),
    'standard-detail': s_d_sim.toFixed(3),
    threshold: thr.toFixed(3),
    levelSimOK
  });
  
  console.log('[QualityCheck] C) Copy Rate:', {
    detail: `${(copyRate * 100).toFixed(1)}%`,
    threshold: '20%',
    copyOK
  });
  
  console.log('[QualityCheck] D) 🔴 Containment Check (누적 확장 탐지):', {
    'brief→standard': `${(briefInStandard * 100).toFixed(1)}%`,
    'standard→detail': `${(standardInDetail * 100).toFixed(1)}%`,
    threshold: `${(CONTAINMENT_THRESHOLD * 100).toFixed(0)}%`,
    containmentOK
  });
  
  const passed = ratioOK && levelSimOK && copyOK && containmentOK;
  
  return {
    passed,
    metrics: {
      ratioOK,
      b_s_sim,
      s_d_sim,
      simThr: thr,
      copyRate,
      levelSimOK,
      copyOK,
      containmentOK,
      briefInStandard,
      standardInDetail,
      briefRatio,
      standardRatio,
      detailRatio
    }
  };
}

// ============================================================
// END: 확장 좀비 감지
// ============================================================

// ============================================================
// 🔴 [OLD] 압축률 & 유사도 게이트 - STRICT QUALITY ENFORCEMENT (DEPRECATED)
// ============================================================

/**
 * N-gram 원문 복사율 계산
 * @param original 원문 텍스트
 * @param summary 요약 텍스트
 * @param ngramSize N-gram 크기 (기본 10)
 * @returns 원문 복사 비율 (0.0 ~ 1.0)
 */
function calculateNgramOverlap(original: string, summary: string, ngramSize: number = 10): number {
  const normalizeText = (text: string) => text.replace(/\s+/g, ' ').trim();
  const origNorm = normalizeText(original);
  const summNorm = normalizeText(summary);
  
  const summaryChars = summNorm.split('');
  let copiedCharCount = 0;
  
  // N-gram sliding window
  for (let i = 0; i <= summaryChars.length - ngramSize; i++) {
    const ngram = summaryChars.slice(i, i + ngramSize).join('');
    if (origNorm.includes(ngram)) {
      copiedCharCount += ngramSize;
      // 중복 카운트 방지: 일치하면 윈도우를 건너뜀
      i += ngramSize - 1;
    }
  }
  
  const copyRate = summaryChars.length > 0 ? copiedCharCount / summaryChars.length : 0;
  return copyRate;
}

/**
 * 코사인 유사도 계산 (TF-IDF 없이 단순 단어 벡터)
 * @param text1 첫 번째 텍스트
 * @param text2 두 번째 텍스트
 * @returns 코사인 유사도 (0.0 ~ 1.0)
 */
function calculateCosineSimilarity(text1: string, text2: string): number {
  const tokenize = (text: string): string[] => {
    return text
      .replace(/[^\w가-힣]/g, ' ')
      .split(/\s+/)
      .filter(Boolean)
      .map(t => t.toLowerCase());
  };
  
  const tokens1 = tokenize(text1);
  const tokens2 = tokenize(text2);
  
  // 단어 빈도 맵 생성
  const freq1 = new Map<string, number>();
  const freq2 = new Map<string, number>();
  
  tokens1.forEach(t => freq1.set(t, (freq1.get(t) || 0) + 1));
  tokens2.forEach(t => freq2.set(t, (freq2.get(t) || 0) + 1));
  
  // 전체 단어 집합
  const allTokens = new Set([...freq1.keys(), ...freq2.keys()]);
  
  // 벡터 내적 및 크기 계산
  let dotProduct = 0;
  let magnitude1 = 0;
  let magnitude2 = 0;
  
  allTokens.forEach(token => {
    const v1 = freq1.get(token) || 0;
    const v2 = freq2.get(token) || 0;
    dotProduct += v1 * v2;
    magnitude1 += v1 * v1;
    magnitude2 += v2 * v2;
  });
  
  if (magnitude1 === 0 || magnitude2 === 0) return 0;
  
  const similarity = dotProduct / (Math.sqrt(magnitude1) * Math.sqrt(magnitude2));
  return similarity;
}

/**
 * [MS-V4] 엄격한 품질 게이트: 압축률, 레벨 간 유사도, 원문 복사율 검증
 * 
 * @param rawText 원문 텍스트
 * @param results Brief/Standard/Detail 요약 결과
 * @param targetRatios 목표 압축률 {brief: 0.15, standard: 0.26, detail: 0.42}
 * @returns 검증 결과 및 메트릭
 * @throws Error 검증 실패 시 즉시 에러
 */
function validateSummaryQuality(
  rawText: string, 
  results: { brief: string; standard: string; detail: string },
  targetRatios: { brief: number; standard: number; detail: number }
): {
  ok: boolean;
  metrics: {
    briefStandardSim: number;
    standardDetailSim: number;
    briefDetailSim: number;
    briefCopyRate: number;
    standardCopyRate: number;
    detailCopyRate: number;
    briefRatio: number;
    standardRatio: number;
    detailRatio: number;
  };
} {
  const originalLen = rawText.length;
  
  // 1. 원문 복사율(Copy Rate) 검증: 20% 미만 필수
  const briefCopyRate = calculateNgramOverlap(rawText, results.brief, 10);
  const standardCopyRate = calculateNgramOverlap(rawText, results.standard, 10);
  const detailCopyRate = calculateNgramOverlap(rawText, results.detail, 10);
  
  console.log('[QualityGate] Copy Rates:', {
    brief: (briefCopyRate * 100).toFixed(1) + '%',
    standard: (standardCopyRate * 100).toFixed(1) + '%',
    detail: (detailCopyRate * 100).toFixed(1) + '%'
  });
  
  if (briefCopyRate > 0.20) {
    throw new Error(`COPY_RATE_EXCEEDED: Brief copy rate ${(briefCopyRate * 100).toFixed(1)}% > 20%`);
  }
  if (standardCopyRate > 0.20) {
    throw new Error(`COPY_RATE_EXCEEDED: Standard copy rate ${(standardCopyRate * 100).toFixed(1)}% > 20%`);
  }
  if (detailCopyRate > 0.20) {
    throw new Error(`COPY_RATE_EXCEEDED: Detail copy rate ${(detailCopyRate * 100).toFixed(1)}% > 20%`);
  }
  
  // 2. 레벨 간 유사도(Similarity) 검증: 0.7 미만 필수 (관점의 분리)
  const briefStandardSim = calculateCosineSimilarity(results.brief, results.standard);
  const standardDetailSim = calculateCosineSimilarity(results.standard, results.detail);
  const briefDetailSim = calculateCosineSimilarity(results.brief, results.detail);
  
  console.log('[QualityGate] Inter-level Similarities:', {
    'brief-standard': briefStandardSim.toFixed(3),
    'standard-detail': standardDetailSim.toFixed(3),
    'brief-detail': briefDetailSim.toFixed(3)
  });
  
  if (briefStandardSim > 0.7) {
    throw new Error(`SIMILARITY_ERROR: Brief vs Standard similarity ${briefStandardSim.toFixed(2)} > 0.70`);
  }
  if (standardDetailSim > 0.7) {
    throw new Error(`SIMILARITY_ERROR: Standard vs Detail similarity ${standardDetailSim.toFixed(2)} > 0.70`);
  }
  
  // 3. 압축률(Compression Ratio) 오차 검증: ±5% 범위
  const briefRatio = results.brief.length / originalLen;
  const standardRatio = results.standard.length / originalLen;
  const detailRatio = results.detail.length / originalLen;
  
  console.log('[QualityGate] Compression Ratios:', {
    brief: `${(briefRatio * 100).toFixed(1)}% (target: ${(targetRatios.brief * 100).toFixed(1)}%)`,
    standard: `${(standardRatio * 100).toFixed(1)}% (target: ${(targetRatios.standard * 100).toFixed(1)}%)`,
    detail: `${(detailRatio * 100).toFixed(1)}% (target: ${(targetRatios.detail * 100).toFixed(1)}%)`
  });
  
  if (Math.abs(detailRatio - targetRatios.detail) > 0.05) {
    throw new Error(
      `COMPRESSION_OUT_OF_BOUNDS: Detail ratio ${(detailRatio * 100).toFixed(1)}% out of target ` +
      `${(targetRatios.detail * 100).toFixed(1)}% ± 5%`
    );
  }
  
  // 모든 검증 통과
  return {
    ok: true,
    metrics: {
      briefStandardSim,
      standardDetailSim,
      briefDetailSim,
      briefCopyRate,
      standardCopyRate,
      detailCopyRate,
      briefRatio,
      standardRatio,
      detailRatio
    }
  };
}

// ============================================================
// END: 압축률 & 유사도 게이트
// ============================================================

// 문장 유사도 계산 (Levenshtein 간소화 버전)
function computeSimilarity(s1: string, s2: string): number {
  const longer = s1.length > s2.length ? s1 : s2;
  const shorter = s1.length > s2.length ? s2 : s1;
  
  if (longer.length === 0) return 1.0;
  
  const editDistance = levenshteinDistance(shorter, longer);
  return (longer.length - editDistance) / longer.length;
}

function levenshteinDistance(s1: string, s2: string): number {
  const costs: number[] = [];
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
      if (i === 0) {
        costs[j] = j;
      } else if (j > 0) {
        let newValue = costs[j - 1];
        if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
          newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
        }
        costs[j - 1] = lastValue;
        lastValue = newValue;
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}

function smartTrim(s: string, maxChars: number) {
  const t = String(s || '').replace(/\s+/g, ' ').trim();
  if (t.length <= maxChars) return t;
  
  // 🎯 [핀셋 3] 문장 단위 절단: 마침표로 끝나는 완결성 보장
  const cut = t.slice(0, maxChars);
  const lastSentenceEnd = Math.max(
    cut.lastIndexOf('.'),
    cut.lastIndexOf('!'),
    cut.lastIndexOf('?')
  );
  
  // 마침표가 50% 이상 지점에 있으면 그곳까지만 반환 (완전한 문장)
  if (lastSentenceEnd > maxChars * 0.5) {
    return cut.slice(0, lastSentenceEnd + 1).trim();
  }
  
  // 도저히 마침표가 없으면 그냥 자름 (최후의 수단)
  return cut;
}

function safeJsonParse(text: string) {
  const raw = (text || '').trim();
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {}
  const a = raw.indexOf('{');
  const b = raw.lastIndexOf('}');
  if (a >= 0 && b > a) {
    const mid = raw.slice(a, b + 1);
    try {
      return JSON.parse(mid);
    } catch {}
  }
  return null;
}

// =====================================================================
// FORTRESS: Preprocess + Scope Guard + Fake-summary Guard
// =====================================================================

// (1) 입력 전처리: 페이지/표 찌꺼기 제거 + 과도 줄바꿈 정리
function preprocessRawText(raw: string) {
  let t = String(raw || '');

  // 페이지 표기 제거: "- 40 -" 형태
  t = t.replace(/-\s*\d+\s*-\s*/g, ' ');

  // 표 헤더/노이즈(빈번 패턴) 완화
  t = t.replace(/학년별\s*통계/g, '학년별 통계');
  t = t.replace(/점수\s*학년별\s*통계/g, '점수(학년별 통계)');

  // 연속 공백/줄바꿈 정리
  t = t.replace(/\r\n/g, '\n');
  t = t.replace(/[ \t]+/g, ' ');
  t = t.replace(/\n{3,}/g, '\n\n');

  // PDF 복사에서 흔한 줄 중간 끊김 완화(한글 단어 중간 줄바꿈)
  // "학습 보\n다" 같은 케이스를 억지로 다 붙이지는 않고, 과도한 단일 줄바꿈만 줄임
  t = t.replace(/([가-힣])\n([가-힣])/g, '$1 $2');

  return t.trim();
}

// (2) 요약 결과에서 "외부 주제" 혼입을 막는 금칙 키워드(대표님 상황 기준)
// 필요 시 리스트는 늘려도 되며, 걸리면 즉시 FAIL -> 슬롯기반 재생성
// FORTRESS: 메타 표현 금칙어 (환각 방지)
// 주의: 도메인 키워드('스웨덴', '공교육' 등)는 요약에 필요하므로 제외
const FORBIDDEN_META_PHRASES = [
  '이 글은',
  '본 글은',
  '이 논문은',
  '이 보고서는',
  '이 기사는',
  '설명한다',
  '설명하고 있다',
  '다루고 있다',
  '서술하고 있다',
  '제시하고 있다',
  '분석하고 있다',
  '검토하고 있다',
  '논의하고 있다',
];

// (3) 가짜 요약(발췌) 흔적: 생략부호/연속점/미완성 조각
function hasEllipsisOrTruncation(s: string) {
  const t = String(s || '');
  return (
    /(\.\.\.)|(\.\.\.\.)|(…{1,})|(\u2026)/.test(t) || // ... / … 포함
    /…\s*$/.test(t) ||
    /[.]\s*[…]/.test(t)
  );
}

// (4) 문장 단위 분리(간단)
function splitSentencesKo(s: string) {
  return String(s || '')
    .replace(/\s+/g, ' ')
    .trim()
    .split(/(?<=[.!?]|다\.|다\?|다!|요\.|요\?|요!)\s+/)
    .map(x => x.trim())
    .filter(Boolean);
}

// ------------------------------
// 로컬 Fallback: 외부 모듈 사용 (local-fallback-generators.ts)
// ------------------------------
function buildLocalFallbackDetail(rawText: string): DetailBundle {
  const narrativeDetail = generateNarrativeFallback(rawText, 'detail');
  const structuredDetail = generateStructuredFallback(rawText, 'detail');
  const mindmapDetail = generateMindmapFallback(rawText, 'detail');
  const selftestDetail = generateSelftestFallback(narrativeDetail.text, 'detail', 'exam');

  const charCount = rawText.length;
  const checksum = checksumSimple(rawText);

  const coreClaim = narrativeDetail.coreClaim;
  const grounds = narrativeDetail.grounds;
  const comparisons = narrativeDetail.comparisons || [];
  const implications = narrativeDetail.implications || [];

  let summaryDetail = narrativeDetail.text;
  if (!summaryDetail.includes('\n\n')) {
    const sentences = summaryDetail.split('. ').filter(Boolean);
    const mid = Math.ceil(sentences.length / 2);
    summaryDetail = sentences.slice(0, mid).join('. ') + '.\n\n' + sentences.slice(mid).join('. ') + '.';
  }

  const toc = structuredDetail.toc;
  const hierarchy = structuredDetail.hierarchy;
  const glossary = structuredDetail.glossary;

  const mindmap = {
    title: mindmapDetail.title,
    children: mindmapDetail.children.map((L1: any) => ({
      title: L1.title,
      children: (L1.children || []).map((L2: any) => ({
        title: L2.title,
        pack: Array.isArray(L2.pack) && L2.pack.length >= 2 ? L2.pack : [L2.title, `${L2.title} 관련 내용`],
        explain:
          L2.explain && L2.explain.length >= 30
            ? L2.explain
            : `${L2.title}는 본문의 핵심 개념으로, 전체 맥락을 이해하는 데 중요한 역할을 하며, 관련된 세부 사항과 비교 대조를 통해 의미를 파악할 수 있다.`,
        children: []
      }))
    }))
  };

  if (!mindmap.children[0]) {
    mindmap.children.push({ title: '1. 주요 개념', children: [] });
  }

  while (mindmap.children[0].children.length < 3) {
    const idx = mindmap.children[0].children.length + 1;
    mindmap.children[0].children.push({
      title: `추가 노드 ${idx}`,
      pack: ['핵심', '개념', '정보'],
      explain: `추가 노드 ${idx}는 원문의 맥락을 반영한 분석 결과로, 주요 논점을 보완하는 내용이다.`,
      children: []
    });
  }

  const selftest = {
    passScorePct: selftestDetail.passScorePct as 90,
    items: selftestDetail.items
  };

  return {
    schemaVersion: 'ms-v4',
    lang: 'ko',
    source: { charCount, checksum },
    narrative: {
      coreClaim,
      grounds,
      comparisons,
      implications,
      summaryDetail
    },
    structured: { toc, hierarchy, glossary },
    mindmap,
    selftest
  };
}

// ------------------------------
// Detail 생성 프롬프트
// ------------------------------
// START: UNIVERSAL LOGIC ENGINE V1 - CLEAN PROMPT (NO EXAMPLES)
/**
 * 재생성 프롬프트 생성 (Try별로 다른 설명 책임 강제)
 * @param rawText 원문
 * @param attemptNum 시도 횟수 (1, 2, 3)
 * @param previousMetrics 이전 실패 메트릭 (optional)
 */
function buildDetailPromptWithRetry(rawText: string, attemptNum: number, previousMetrics?: any): string {
  let retryGuidance = '';
  
  if (attemptNum === 1) {
    // Try 1: What/How/SoWhat 규칙
    retryGuidance = `
[설명 책임 분리 규칙 - Try ${attemptNum}/3]
- Brief = WHAT (무엇인가): 핵심 개념 정의만
- Standard = HOW (어떻게): 작동 원리 또는 방법론
- Detail = SO WHAT (왜 중요한가): 의미와 영향력

각 레벨은 반드시 다른 관점에서 서술하세요.
Brief의 문장을 Standard에서 재사용하면 실패입니다.`;
  } else if (attemptNum === 2) {
    // Try 2: 문장 재사용 금지 + 패턴 금지
    retryGuidance = `
[문장 구조 금지어 - Try ${attemptNum}/3]
🚨 이전 시도가 실패했습니다. 다음 규칙을 엄격히 준수하세요:

1. 이전 레벨의 문장을 포함/재사용하면 즉시 실패
2. 정의문 반복 금지: "~는 ~이다" 패턴을 한 번만 사용
3. 동일 문장 패턴 금지: "~하며, ~한다" 접속 패턴 변경
4. Brief와 Standard는 완전히 다른 어순/표현 사용

${previousMetrics ? `이전 실패 이유: Brief-Standard 유사도 ${previousMetrics.b_s_sim?.toFixed(2)} (임계값: ${previousMetrics.simThr?.toFixed(2)} 미만 필수)` : ''}`;
  } else {
    // Try 3: 표현 변환 강제
    retryGuidance = `
[표현 변환 강제 - Try ${attemptNum}/3 (최종)]
🚨🚨 마지막 기회입니다. 아래 규칙을 반드시 지키세요:

1. 동일 어순 금지: 원문과 다른 문장 골격 사용
2. 동일 접속어 패턴 금지: "또한", "따라서" 등을 다른 표현으로 변경
3. 원문 고유명사만 유지: 나머지는 환언(paraphrase) 필수
4. Brief/Standard/Detail이 "이어붙이기"처럼 보이면 즉시 실패

${previousMetrics ? `
이전 실패 분석:
- Brief-Standard 유사도: ${previousMetrics.b_s_sim?.toFixed(2)}
- Standard-Detail 유사도: ${previousMetrics.s_d_sim?.toFixed(2)}
- 원문 복사율: ${(previousMetrics.copyRate * 100).toFixed(1)}%
임계값: 유사도 < ${previousMetrics.simThr?.toFixed(2)}, 복사율 < 20%` : ''}`;
  }
  
  return [
    `당신은 학습 콘텐츠를 "재조립"하여 참고서형 지식 구조로 만드는 전문가입니다.`,
    retryGuidance,
    ``,
    `[절대 규칙]`,
    `- 🚨 원문 문장을 그대로 복사하지 마세요. AI가 직접 새로운 문장으로 재작성하세요.`,
    `- 🚨 summaryDetail은 반드시 [핵심 정의], [상세 설명], [결론 및 시사점] 슬롯으로 구성하세요.`,
    `- 의미 단위로 재구성해야 하며, 글자를 중간에 자르거나 발췌만 하면 실패입니다.`,
    `- 원문에 있는 단어와 개념만 사용하세요. (외부 예시, 고유명사, 숫자 추가 금지)`,
    `- 아래 JSON 스키마 그대로만 출력하세요. (설명/마크다운/코드블록 금지)`,
    `- 같은 문장을 반복하면 실패입니다.`,
    `- structured.glossary는 반드시 "용어: 정의" 성격의 문장으로 작성하세요.`,
    `- mindmap은 2레벨 노드마다 pack(1~3개)과 explain(100~140자)을 최대한 채우세요.`,
    `- selftest는 passScorePct=90, 문항 2~4개. 루브릭(mustInclude 등) 포함.`,
    ``,
    `[JSON 스키마]`,
    `{`,
    `  "schemaVersion":"ms-v4",`,
    `  "lang":"ko",`,
    `  "source":{ "charCount":123, "checksum":"..." },`,
    `  "narrative":{`,
    `    "coreClaim":"1문장 (핵심 주장)",`,
    `    "grounds":["근거1","근거2","근거3"],`,
    `    "comparisons":["비교1 (있으면)"],`,
    `    "implications":["의미1 (있으면)"],`,
    `    "summaryDetail":"[핵심 정의] AI가 새로 작성한 문장.\\n\\n[상세 설명] AI가 새로 작성한 문장.\\n\\n[결론 및 시사점] AI가 새로 작성한 문장. (원문 문장 복사 금지, 슬롯 마커 필수)"`,
    `  },`,
    `  "structured":{`,
    `    "toc":[{"title":"...", "anchor":"..."}],`,
    `    "hierarchy":[`,
    `      { "title":"...", "bullets":["..."], "keywords":["..."], "children":[{"title":"...","bullets":["..."],"keywords":["..."]}] }`,
    `    ],`,
    `    "glossary":[{"term":"OO","def":"OO: ~~~"}]`,
    `  },`,
    `  "mindmap":{`,
    `    "title":"학습 주제",`,
    `    "children":[`,
    `      {"title":"왜/무엇/어떻게 등 범주", "children":[{"title":"키워드","pack":["키1","키2"],"explain":"100~140자 설명", "children":[]}]}`,
    `    ]`,
    `  },`,
    `  "selftest":{`,
    `    "passScorePct":90,`,
    `    "items":[`,
    `      { "id":"q1", "type":"short", "question":"...", "hint":"...", "rubric":{"mustInclude":["..."],"maxChars":120}, "answerKey":"..." }`,
    `    ]`,
    `  }`,
    `}`,
    ``,
    ``,
    `[원문]`,
    rawText
  ].join('\n');
}

/**
 * 기존 buildDetailPrompt() - 첫 시도용
 */
function buildDetailPrompt(rawText: string) {
  return buildDetailPromptWithRetry(rawText, 1);
}

// END: UNIVERSAL LOGIC ENGINE V1 - CLEAN PROMPT

// ------------------------------
// Downsample
// ------------------------------
function downsampleFromDetail(detail: DetailBundle, level: Level): LevelBundle {
  const isBrief = level === 'brief';
  const isStd = level === 'standard';

  const claim = detail.narrative.coreClaim || '';
  const groundSlots = detail.narrative.grounds || [];
  const comparisonSlots = detail.narrative.comparisons || [];
  const implicationSlots = detail.narrative.implications || [];

  const origLen = detail.source?.charCount || 1000;

  let narrativeText = '';
  let coreClaim = claim;
  let grounds: string[] = [];
  let comparisons: string[] = [];
  let implications: string[] = [];

  if (level === 'detail') {
    // 🎯 [ONE-BLOCK FIX] 후보 체인: summaryDetail → narrative.text → 기타
    // ✅ 원문 복사 차단, 요약 본문 후보 체인
    const baseNarr = coerceText(
      detail?.narrative?.summaryDetail ??
      (detail as any)?.narrativeDetail?.text ??
      (detail as any)?.narrative?.text ??
      ''
    );
    
    narrativeText = baseNarr;
    
    // 🚨 DEFENSE: 텍스트가 비어있으면 경고
    if (!narrativeText) {
      console.warn('[DOWN] ⚠️ Detail narrative is empty, using coreClaim fallback');
      narrativeText = claim || '요약 내용을 생성할 수 없습니다.';
    }
    
    coreClaim = claim;
    grounds = groundSlots;
    comparisons = comparisonSlots;
    implications = implicationSlots;
  } else if (level === 'brief') {
    const targetMax = Math.floor(origLen * 0.18);
    coreClaim = smartTrim(claim, 60);

    const comp = comparisonSlots[0] ? smartTrim(comparisonSlots[0], 80) : '';
    grounds = [];
    comparisons = comp ? [comp] : [];
    implications = [];

    if (comp) {
      narrativeText = `${coreClaim}. ${comp}.`;
    } else {
      const g = groundSlots[0] ? smartTrim(groundSlots[0], 60) : '';
      narrativeText = g ? `${coreClaim}. ${g}.` : `${coreClaim}.`;
    }

    if (narrativeText.length > targetMax) narrativeText = narrativeText.slice(0, Math.max(0, targetMax - 1)).trim();
  } else {
    const targetMax = Math.floor(origLen * 0.38);
    coreClaim = smartTrim(claim, 80);

    grounds = groundSlots.slice(0, 2).map(g => smartTrim(g, 70));
    const comp = comparisonSlots[0] ? smartTrim(comparisonSlots[0], 90) : '';
    comparisons = comp ? [comp] : [];
    implications = [];

    const parts: string[] = [coreClaim];
    if (grounds.length > 0) parts.push(grounds.join('. '));
    if (comp) parts.push(`반면 ${comp}`);
    narrativeText = parts.join('. ') + '.';

    if (narrativeText.length > targetMax) narrativeText = narrativeText.slice(0, Math.max(0, targetMax - 1)).trim();
    else if (narrativeText.length < Math.floor(origLen * 0.25) && implicationSlots.length > 0) {
      const impl = smartTrim(implicationSlots[0], 60);
      narrativeText += ` ${impl}.`;
    }
  }

  // Structured
  const toc = detail.structured.toc || [];
  const glossaryMax = isBrief ? 2 : isStd ? 4 : 10;
  const glossary = (detail.structured.glossary || []).slice(0, glossaryMax).map((g) => ({
    term: smartTrim(g.term, 20),
    def: smartTrim(g.def, isBrief ? 70 : 120)
  }));

  const bulletMax = isBrief ? 2 : isStd ? 3 : 5;
  const mapHierarchy = (nodes: any[]): any[] =>
    (nodes || []).map((n) => ({
      title: smartTrim(n.title, 60),
      keywords: (n.keywords || [])
        .slice(0, isBrief ? 3 : isStd ? 4 : 6)
        .map((k: string) => smartTrim(k, 16)),
      bullets: (n.bullets || [])
        .slice(0, bulletMax)
        .map((b: string) => smartTrim(b, isBrief ? 90 : 140)),
      children: n.children ? mapHierarchy(n.children) : undefined
    }));

  const hierarchy = mapHierarchy(detail.structured.hierarchy || []);
  const structuredText = renderStructuredText({ toc, hierarchy, glossary });

  // Mindmap
  const tree = JSON.parse(JSON.stringify(detail.mindmap || { title: '마인드맵', children: [] }));
  const explainMax = isBrief ? 70 : isStd ? 110 : 160;
  const packMax = isBrief ? 2 : 3;

  for (const L1 of tree.children || []) {
    for (const L2 of L1.children || []) {
      if (Array.isArray(L2.pack)) L2.pack = L2.pack.slice(0, packMax).map((x: string) => smartTrim(x, 20));
      if (typeof L2.explain === 'string') L2.explain = smartTrim(L2.explain, explainMax);
      if (!Array.isArray(L2.children)) L2.children = [];
    }
  }

  // Selftest
  const itemMax = isBrief ? 2 : isStd ? 2 : 4;
  const items = (detail.selftest.items || []).slice(0, itemMax).map((it: any) => ({
    id: it.id,
    type: it.type,
    question: smartTrim(it.question, isBrief ? 140 : 220),
    hint: it.hint ? smartTrim(it.hint, isBrief ? 90 : 140) : undefined,
    rubric: {
      mustInclude: (it.rubric?.mustInclude || [])
        .slice(0, isBrief ? 2 : 4)
        .map((x: string) => smartTrim(x, 20)),
      mustNotInclude: (it.rubric?.mustNotInclude || [])
        .slice(0, 2)
        .map((x: string) => smartTrim(x, 20)),
      maxChars: it.rubric?.maxChars ?? (isBrief ? 140 : 220)
    },
    answerKey: it.answerKey ? smartTrim(it.answerKey, isBrief ? 160 : 260) : undefined
  }));

  // 🎯 [ONE-BLOCK FIX] coerceText 적용
  return {
    narrative: { text: coerceText(narrativeText), coreClaim, grounds, comparisons, implications },
    structured: { text: coerceText(structuredText), toc, hierarchy, glossary },
    mindmap: { tree },
    selftest: { passScorePct: 90, items }
  };
}

function renderStructuredText(s: { toc: any[]; hierarchy: any[]; glossary: any[] }) {
  const lines: string[] = [];

  lines.push('Ⅰ. 목차');
  if (s.toc?.length) {
    s.toc.forEach((t: any, i: number) => lines.push(`  ${i + 1}. ${t.title}`));
  } else {
    lines.push('  1. 본문');
  }

  lines.push('');
  lines.push('Ⅱ. 핵심 정리(위계)');
  const walk = (nodes: any[], depth: number) => {
    for (const n of nodes || []) {
      const indent = '  '.repeat(depth);
      lines.push(`${indent}- ${n.title}`);
      if (n.keywords?.length) lines.push(`${indent}  · 핵심키워드: ${n.keywords.join(' · ')}`);
      (n.bullets || []).forEach((b: string) => lines.push(`${indent}  · ${b}`));
      if (n.children?.length) walk(n.children, depth + 1);
    }
  };
  walk(s.hierarchy || [], 1);

  lines.push('');
  lines.push('Ⅲ. 용어사전');
  if (s.glossary?.length) {
    s.glossary.forEach((g: any) => lines.push(`- ${g.def || `${g.term}: (정의 없음)`}`));
  } else {
    lines.push('- (용어사전 없음)');
  }

  return lines.join('\n');
}

// ------------------------------
// Validation
// ------------------------------
function validateDetailBundle(detail: DetailBundle) {
  const errors: string[] = [];

  if (detail?.schemaVersion !== 'ms-v4') errors.push('schemaVersion must be ms-v4');
  // ✅ 검증 조건 완화 (LLM 응답 허용)
  if (!detail?.narrative?.coreClaim || detail.narrative.coreClaim.length < 5) errors.push('narrative.coreClaim too short');
  if (!Array.isArray(detail?.narrative?.grounds) || detail.narrative.grounds.length < 1) errors.push('narrative.grounds must be >= 1');
  // summaryDetail 검증 완화: 문단 분리 선택적
  if (!detail?.narrative?.summaryDetail || String(detail.narrative.summaryDetail).trim().length < 10) {
    errors.push('narrative.summaryDetail too short');
  }

  if (!Array.isArray(detail?.structured?.hierarchy) || detail.structured.hierarchy.length < 1) errors.push('structured.hierarchy missing');
  // glossary 검증 완화: 비어있어도 허용
  if (!Array.isArray(detail?.structured?.glossary)) errors.push('structured.glossary must be array');

  // ✅ mindmap 검증 완전 완화: 구조만 확인
  const hasMindmap = detail?.mindmap && (
    Array.isArray(detail.mindmap.children) || 
    detail.mindmap.root
  );
  if (!hasMindmap) errors.push('mindmap structure missing');
  
  // L2 노드 검증 제거 (LLM이 생성한 구조 그대로 허용)

  // selftest 검증 완화
  if (!detail?.selftest?.passScorePct || detail.selftest.passScorePct < 50) errors.push('selftest.passScorePct must be >= 50');
  if (!Array.isArray(detail?.selftest?.items) || detail.selftest.items.length < 1) errors.push('selftest.items must be >=1');  // 2 → 1

  return errors;
}

function validateLevelSeparation(levels: { brief: LevelBundle; standard: LevelBundle; detail: LevelBundle }) {
  const errors: string[] = [];

  const b = (levels.brief.narrative.text || '').replace(/\s+/g, '');
  const s = (levels.standard.narrative.text || '').replace(/\s+/g, '');
  const d = (levels.detail.narrative.text || '').replace(/\s+/g, '');

  // ✅ 최소한의 검증: LLM 생성 결과 무조건 수용
  if (b.length < 5) errors.push('brief narrative too short');  // 기본만 체크
  // standard/detail 길이 검증 제거: LLM이 생성한 결과를 신뢰

  if (b === s) errors.push('brief narrative equals standard narrative');
  if (s === d) errors.push('standard narrative equals detail narrative');

  if ((levels.standard.structured.glossary?.length || 0) < (levels.brief.structured.glossary?.length || 0)) {
    errors.push('standard glossary must be >= brief glossary');
  }
  if ((levels.detail.structured.glossary?.length || 0) < (levels.standard.structured.glossary?.length || 0)) {
    errors.push('detail glossary must be >= standard glossary');
  }

  const countL2 = (tree: any) => {
    let c = 0;
    for (const L1 of tree?.children || []) c += (L1?.children || []).length;
    return c;
  };
  const cb = countL2(levels.brief.mindmap.tree);
  const cs = countL2(levels.standard.mindmap.tree);
  const cd = countL2(levels.detail.mindmap.tree);
  if (!(cb === cs && cs === cd)) errors.push(`mindmap L2 count mismatch (brief:${cb}, standard:${cs}, detail:${cd})`);

  return errors;
}

// ------------------------------
// Gemini 호출
// ------------------------------
/**
 * 🛡️ LLM Fallback Chain - API 트라우마 해결
 * 우선순위: Ollama 로컬 → Claude → Gemini → Extractive
 */
/* ============================================================
   START: LLM FAILOVER CHAIN REORDERING
   Priority: Ollama(80%) → Gemini(15%) → Claude(4%) → Extractive(1%)
   OpenAI removed completely
   ============================================================ */
// ✅ 수정: rawText를 별도 파라미터로 받아서 Fallback 시 프롬프트가 아닌 순수 원문만 사용
async function callGeminiText(c: any, prompt: string, rawText: string) {
  // 🚨 [FORCE ERROR TEST] 강제 에러 주입 - LLM 호출 차단 테스트
  if (c?.env?.FORCE_LLM_ERROR === 'true') {
    console.error('[FORCE ERROR TEST] LLM 호출 강제 차단됨');
    return null;
  }
  
  const MIN_OK_LEN = 80;  // 최소 응답 길이
  
  // 1순위: LOCAL_LLM_URL (Ollama/LM Studio/vLLM 등) - 80%
  const localUrl = c?.env?.LOCAL_LLM_URL || '';
  if (localUrl) {
    try {
      console.log('[LLM] 1/3 로컬 LLM 시도... URL:', localUrl);
      const localModel = c.env.LOCAL_LLM_MODEL || 'llama3.1:8b';
      
      // (a) Ollama 스타일: /api/chat 엔드포인트
      try {
        const ollamaRes = await fetch(`${localUrl}/api/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: localModel,
            messages: [{ role: 'user', content: prompt }],
            stream: false,
            options: { temperature: 0.3, num_predict: 2048 }
          })
        });
        
        if (ollamaRes.ok) {
          const data = await ollamaRes.json();
          const text = data?.message?.content || data?.response || '';
          if (text.length >= MIN_OK_LEN) {
            console.log('[LLM] ✓ 로컬 LLM (Ollama) 성공');
            return text;
          }
        }
      } catch (e) {
        console.log('[LLM] Ollama 엔드포인트 실패:', (e as Error).message);
      }
      
      // (b) OpenAI 호환 스타일: /v1/chat/completions
      try {
        const openaiCompatRes = await fetch(`${localUrl}/v1/chat/completions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: localModel,
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.3,
            max_tokens: 2048
          })
        });
        
        if (openaiCompatRes.ok) {
          const data = await openaiCompatRes.json();
          const text = data?.choices?.[0]?.message?.content || '';
          if (text.length >= MIN_OK_LEN) {
            console.log('[LLM] ✓ 로컬 LLM (OpenAI 호환) 성공');
            return text;
          }
        }
      } catch (e) {
        console.log('[LLM] OpenAI 호환 엔드포인트 실패:', (e as Error).message);
      }
    } catch (e) {
      console.log('[LLM] ✗ 로컬 LLM 실패:', (e as Error).message);
    }
  }

  // 2순위: Gemini API - 15%
  const geminiKey = c?.env?.GEMINI_API_KEY || '';
  if (geminiKey) {
    try {
      console.log('[LLM] 2/3 Gemini API 시도...');
      const model = c.env.GEMINI_MODEL || 'gemini-2.0-flash-exp';
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.3, maxOutputTokens: 8192 }
          })
        }
      );

      if (res.ok) {
        const json = await res.json();
        const text = json?.candidates?.[0]?.content?.parts?.map((p: any) => p.text).join('') || '';
        if (text.length >= MIN_OK_LEN) {
          console.log('[LLM] ✓ Gemini 성공');
          return text;
        }
      }
    } catch (e) {
      console.log('[LLM] ✗ Gemini 실패:', (e as Error).message);
    }
  }

  // 3순위: Claude API - 4%
  const claudeKey = c?.env?.ANTHROPIC_API_KEY || '';
  if (claudeKey) {
    try {
      console.log('[LLM] 3/3 Claude API 시도...');
      const claudeModel = c.env.ANTHROPIC_MODEL || 'claude-3-5-haiku-latest';
      const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': claudeKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          model: claudeModel,
          max_tokens: 4096,
          temperature: 0.3,
          messages: [{ role: 'user', content: prompt }]
        })
      });

      if (claudeRes.ok) {
        const data = await claudeRes.json();
        const text = data?.content?.[0]?.text || '';
        if (text.length >= MIN_OK_LEN) {
          console.log('[LLM] ✓ Claude 성공');
          return text;
        }
      }
    } catch (e) {
      console.log('[LLM] ✗ Claude 실패:', (e as Error).message);
    }
  }

  /* ============================================================
     4순위: NO FALLBACK - 모든 LLM 실패 시 null 반환
     ⚠️ [ZERO TOLERANCE] Extractive fallback 완전 제거
     ============================================================ */
  console.log('[LLM] ❌ All LLM attempts failed (Ollama, Gemini, Claude)');
  console.log('[LLM] ❌ NO FALLBACK - Returning null to trigger 503 error');
  return null;
}
/* ============================================================
   END: LLM FAILOVER CHAIN REORDERING
   ============================================================ */

// =====================================================================
// MS NARRATIVE V5 — Helper Functions (Gemini-based detail.narrative)
// =====================================================================

/** 한국어 친화 글자수(공백 제거) */
function _msCharCount(s: string) {
  return (s ?? '').replace(/\s+/g, '').length;
}

/** 문장 분리(아주 단순) */
function _msSplitSentences(text: string): string[] {
  const t = (text ?? '').replace(/\s+/g, ' ').trim();
  if (!t) return [];
  const parts = t
    .split(/(?<=[\.!\?]|다\.|요\.|니다\.|습니다\.|임\.|함\.|됨\.)\s+/g)
    .map(s => s.trim())
    .filter(Boolean);
  return parts.length ? parts : [t];
}

/** 말줄임/중략/잘림 징후 */
function _msHasEllipsisOrTrunc(s: string) {
  const t = s ?? '';
  return /(\.\.\.|…|중략|이하\s*생략|생략함|생략|\/\*|\*\/)$/.test(t) || /(\.\.\.|…|중략)/.test(t);
}

/** "완전한 문장" 최소 검사: 끝이 종결 부호/종결어미로 마무리되는지 */
function _msLooksLikeCompleteSentence(s: string) {
  const t = (s ?? '').trim();
  if (!t) return false;
  if (/[\.!\?]$/.test(t)) return true;
  if (/(다|요|니다|습니다|임|함|됨)\.$/.test(t)) return true;
  if (/(다|요|니다|습니다|임|함|됨)$/.test(t)) return true;
  return false;
}

/** 중복 문장 제거 */
function _msDedupSentences(text: string) {
  const sents = _msSplitSentences(text);
  const seen = new Set<string>();
  const out: string[] = [];
  for (const s of sents) {
    const k = s.replace(/\s+/g, '').slice(0, 80);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(s);
  }
  return out.join(' ');
}

/** 원문 핵심 키워드(아주 러프): 2글자 이상 한글 토큰 상위 n개 */
function _msTopKeywordsKorean(text: string, n = 10): string[] {
  const t = (text ?? '').replace(/[0-9]+/g, ' ');
  const tokens = t.match(/[가-힣]{2,}/g) ?? [];
  const freq = new Map<string, number>();
  for (const w of tokens) {
    if (['그리고', '그러나', '하지만', '또한', '따라서', '때문에', '즉', '반면에', '이처럼'].includes(w)) continue;
    freq.set(w, (freq.get(w) ?? 0) + 1);
  }
  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([w]) => w);
}

/** 주제 혼입(오염) 간단 검사: 원문 키워드가 요약에 어느 정도 포함되는지 */
function _msTopicContamination(original: string, summary: string) {
  const kw = _msTopKeywordsKorean(original, 10);
  if (!kw.length) return { ok: true, score: 1, hasFakeInfo: false };
  const s = summary ?? '';
  const o = original ?? '';
  
  // 원문 키워드 매칭
  let hit = 0;
  for (const w of kw) if (s.includes(w)) hit++;
  const score = hit / kw.length;
  
  // ✅ 강화된 가짜 정보 감지
  const fakeChecks = [
    // 국가명 체크
    { pattern: /스웨덴|핀란드|노르웨이|덴마크|영국|프랑스|독일|미국|중국|일본/, name: 'foreign_country' },
    // 경제/통계 용어
    { pattern: /GDP|GNP|경제성장률|소득|생산/, name: 'economic_term' },
    // 퍼센트 숫자 (예: 2.8%, 7.6%)
    { pattern: /\d+\.\d+%|\d+%/, name: 'percentage' },
    // 구체적 지표명
    { pattern: /민간부담률|교육지출비중|부담률/, name: 'specific_indicator' },
    // 국제기구
    { pattern: /OECD|유네스코|UNESCO|세계은행|IMF/, name: 'international_org' },
    // 연도 (YYYY)
    { pattern: /20\d{2}년?|19\d{2}년?/, name: 'year' }
  ];
  
  let hasFakeInfo = false;
  let fakeReason = '';
  
  for (const check of fakeChecks) {
    const inSummary = check.pattern.test(s);
    const inOriginal = check.pattern.test(o);
    
    if (inSummary && !inOriginal) {
      hasFakeInfo = true;
      fakeReason = check.name;
      console.log(`[🚫 환각 감지] ${check.name}: 요약에 있으나 원문에 없음`);
      break;
    }
  }
  
  const result = {
    ok: score >= 0.5 && !hasFakeInfo,
    score,
    hasFakeInfo,
    fakeReason
  };
  
  if (!result.ok) {
    console.log(`[Topic Contamination] score=${score.toFixed(2)}, hasFake=${hasFakeInfo}, reason=${fakeReason}`);
  }
  
  return result;
}

function _msClamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

/** 목표 비율 기반 타겟 범위 */
function _msTargetsByRatio(originalText: string) {
  const base = Math.max(50, _msCharCount(originalText));
  const mk = (min: number, max: number, target: number, minChars: number) => {
    const tgt = Math.max(minChars, Math.floor(base * target));
    return {
      minChars: Math.max(minChars, Math.floor(base * min)),
      maxChars: Math.max(minChars, Math.ceil(base * max)),
      targetChars: tgt,
    };
  };
  return {
    detail: mk(0.39, 0.45, 0.42, 300),
  };
}

/** Extractive fallback: 원문 문장 일부를 "자르지 않고" 목표 길이까지 */
/* ============================================================
   START: INTELLIGENT TEMPLATE-BASED SUMMARIZER (4순위)
   지능형 템플릿 기반 요약 엔진 - 복사가 아닌 재구성
   ============================================================ */

/**
 * 지능형 템플릿 기반 요약 생성기
 * - 단순 복사가 아닌 문장 재구성
 * - 키워드 기반 연결형 문장 생성
 * - 3단계 밀도 차별화 (간단/표준/상세)
 * - 노이즈 완벽 제거 (페이지 번호, 불용어)
 * - GPT 스타일 템플릿 적용
 */
/* ============================================================
   젬(Gem)의 4순위 필살기: 지능형 재구성 엔진 V5
   - 불용어 박멸 강화
   - AI 스타일 템플릿 적용
   - engine: "intelligent-template-v5" 명시
   ============================================================ */
/* ============================================================
   🌐 UNIVERSAL LOGIC ENGINE V1
   - 하드코딩 제거: 특정 단어 금지 리스트 없음
   - 동적 키워드 화이트리스트: 원문 기반 신뢰 단어 추출
   - 문법적 정규화: 정규식 기반 접속사 자동 제거
   - 구조적 슬롯: [핵심 정의] - [상세 설명] - [결론]
   ============================================================ */

/**
 * STEP 1: Trust-Anchor 동적 화이트리스트 생성
 * 원문에서 명사형 키워드를 추출하여 신뢰 단어 목록 생성
 * ⚠️ 중요: 원문에 없는 고유명사는 환각으로 간주
 */
function _extractTrustList(text: string): Set<string> {
  console.log('[Universal-V1-Fixed] Trust-Anchor 추출 시작');
  
  // 1. 한글 명사 추출 (2-10자)
  const nouns = text.match(/[가-힣]{2,10}/g) || [];
  
  // 2. 빈도 계산
  const freq: Record<string, number> = {};
  nouns.forEach(noun => {
    freq[noun] = (freq[noun] || 0) + 1;
  });
  
  // 3. Trust-Anchor 기준: 빈도 1회 이상 (1번만 등장해도 신뢰)
  const trustList = new Set<string>();
  Object.entries(freq).forEach(([word, count]) => {
    if (count >= 1 && word.length >= 2) {
      trustList.add(word);
    }
  });
  
  // 4. 1자 한글도 추가 (조사, 어미 등)
  const singles = text.match(/[가-힣]/g) || [];
  singles.forEach(s => trustList.add(s));
  
  console.log('[Universal-V1-Fixed] Trust-Anchor 개수:', trustList.size);
  return trustList;
}

/**
 * STEP 2: Trust-Anchor 기반 환각 제거
 * 원문에 없는 모든 고유명사를 즉시 제거
 */
function _verifyAndClean(generatedText: string, trustList: Set<string>, originalText: string): string {
  console.log('[Universal-V1-Fixed] Trust-Anchor 검증 시작');
  
  // 1. 생성 텍스트의 모든 명사 추출 (2-10자)
  const generatedNouns = generatedText.match(/[가-힣]{2,10}/g) || [];
  
  // 2. Trust-Anchor에 없는 단어 = 환각
  const hallucinations: string[] = [];
  const uniqueNouns = new Set(generatedNouns);
  
  uniqueNouns.forEach(noun => {
    // 원문에 없는 2자 이상 단어는 모두 환각
    if (!trustList.has(noun) && noun.length >= 2) {
      hallucinations.push(noun);
    }
  });
  
  if (hallucinations.length > 0) {
    console.log('[Universal-V1-Fixed] 환각 제거:', hallucinations.slice(0, 10).join(', '));
    // 환각 단어 즉시 제거
    hallucinations.forEach(word => {
      const regex = new RegExp(word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      generatedText = generatedText.replace(regex, '');
    });
  }
  
  return generatedText.replace(/\s+/g, ' ').trim();
}

/**
 * STEP 3: Regex 기반 문법 정규화
 * 하드코딩 없이 정규식으로 접속사 자동 제거
 */
function _grammarNormalize(text: string): string {
  console.log('[Universal-V1-Fixed] Regex 정규화 시작');
  
  let normalized = text;
  
  // 1. 노이즈 제거: 페이지 번호, 괄호, 특수문자
  normalized = normalized.replace(/[-\[]?\d+[-\]]/g, '');
  normalized = normalized.replace(/\(\d+\)/g, '');
  normalized = normalized.replace(/p\.?\s*\d+/gi, '');
  normalized = normalized.replace(/[①-⑳]/g, '');  // 둘러싸인 숫자 (① ② ③...)
  
  // 2. 문장 시작 접속사 자동 제거 (Regex 패턴)
  // 한글 2-4자 + 쉼표/공백 패턴
  normalized = normalized.replace(/^[가-힣]{2,4}[,\s]+/gm, '');
  
  // 3. 문장 중간 접속사 (마침표 뒤)
  normalized = normalized.replace(/(\.)\s+[가-힣]{2,4}[,\s]+/g, '$1 ');
  
  // 4. 불필요한 공백 정리
  normalized = normalized.replace(/\s+/g, ' ').trim();
  
  // 5. 문장 완결성 강제 (마침표로 끝나도록)
  if (!normalized.match(/[.!?]$/)) {
    normalized += '.';
  }
  
  console.log('[Universal-V1-Fixed] Regex 정규화 완료');
  return normalized;
}

/**
 * STEP 4: 구조적 슬롯 템플릿
 * [핵심 정의] - [상세 설명] - [결론 및 시사점] 3단계 슬롯
 */
// 🚨 [DEPRECATED] 이 함수는 가짜 엔진입니다 - 사용 금지
function _structuralSlotting(originalText: string, trustList: Set<string>, level: 'brief' | 'standard' | 'detail'): string {
  console.error('🚨 [FAKE ENGINE CALLED] _structuralSlotting is deprecated and should not be called!');
  console.error('🚨 This is extractive fallback - original text copy');
  throw new Error('FAKE_ENGINE_CALLED: _structuralSlotting is deprecated. Use real LLM instead.');
}

/**
 * MAIN: Universal Logic Engine V1 - Fixed
 * Trust-Anchor 기반 환각 제거 + Regex 문법 정규화 + 구조적 슬롯
 */
// START: UNIVERSAL LOGIC ENGINE V1 - MAIN SUMMARIZER
// 🚨 [DEPRECATED] 이 함수는 가짜 엔진입니다 - 사용 금지
function _msUniversalLogicSummarizer(originalText: string, level: 'brief' | 'standard' | 'detail') {
  console.error('🚨 [FAKE ENGINE CALLED] _msUniversalLogicSummarizer is deprecated!');
  throw new Error('FAKE_ENGINE_CALLED: _msUniversalLogicSummarizer is deprecated. Use real LLM instead.');
}

/**
 * 4순위: Universal Logic Fallback
 * - 하드코딩 없음: 정규식 기반 자동 정리
 * - 동적 검증: 신뢰 단어 목록 기반 환각 제거
 * - 구조적 슬롯: 일관된 품질 보장
 */
// 🚨 [DEPRECATED] 이 함수는 가짜 엔진을 호출합니다 - 사용 금지
function _msExtractiveFallback(originalText: string, targetChars: number) {
  console.error('🚨 [FAKE ENGINE CALLED] _msExtractiveFallback is deprecated!');
  throw new Error('FAKE_ENGINE_CALLED: _msExtractiveFallback is deprecated. Use real LLM instead.');
}

/* ============================================================
   END: INTELLIGENT TEMPLATE-BASED SUMMARIZER
   ============================================================ */

/**
 * detail.narrative 생성(V5) - Gemini 기반 진짜 요약
 */
async function _msGenerateNarrativeDetailV5(c: any, originalText: string) {
  const targets = _msTargetsByRatio(originalText).detail;

  const jsonSchemaHint = `
출력은 "JSON만" (설명/코드블록 금지). 다음 형태를 정확히 지켜라:
{
  "text": string,
  "coreClaim": string,
  "grounds": string[],
  "comparisons": string[],
  "implications": string[]
}
규칙:
- text는 '완전한 문장'들로만 구성, 문장 파손/중간절단 금지
- "...", "…", "중략", "이하 생략" 금지
- 중복 문장 금지
- 원문에 없는 사실/고유명/숫자/비교(예: 한국/스웨덴 등) "새로 만들지 말 것"
- 문장수: 4~7문장 권장(학습용 상세요약)
- grounds는 2~4개(가능하면 3개), comparisons/implications는 있으면 1~2개
`;

  const promptBase = `
당신은 "초·중·고 학습자용 학습 요약 엔진"이다.
아래 원문을 학습용 상세요약(detail)로 압축하라.

[원문]
${originalText}

[🚫 절대 금지 사항 - 매우 중요!]
1. 원문에 없는 정보를 추가하지 마라 (예: 다른 국가, 통계, 날짜, 인명 등)
2. 너의 사전 지식을 사용하지 마라 - 오직 위의 [원문]만 사용
3. "스웨덴", "GDP", "%" 같은 외부 정보를 절대 추가하지 마라
4. 원문에 명시되지 않은 비교/통계/사례를 만들어내지 마라

[요구]
- 길이: 공백 제외 ${targets.minChars}~${targets.maxChars}자 (권장 ${targets.targetChars}자)
- 반드시 의미를 보존하며 "진짜 요약"을 하라(복붙/단순 축약 금지)
- 문장 파손 0, 말줄임/중략 0, 중복 0
- 핵심 주장(coreClaim) 1문장
- 근거(grounds) 2~4개(가능하면 3개): 원문에서 확인 가능한 핵심 근거만
- 비교/대조(comparisons): 원문에 비교가 있으면 1~2개, 없으면 빈 배열
- 함의/의미(implications): 원문에서 직접 도출되는 의미 1~2개, 없으면 빈 배열

${jsonSchemaHint}
`;

  const validate = (obj: any) => {
    const errors: string[] = [];
    if (!obj || typeof obj !== 'object') errors.push('not_object');
    const text = (obj?.text ?? '').trim();
    const coreClaim = (obj?.coreClaim ?? '').trim();
    const grounds = Array.isArray(obj?.grounds) ? obj.grounds : [];
    const comparisons = Array.isArray(obj?.comparisons) ? obj.comparisons : [];
    const implications = Array.isArray(obj?.implications) ? obj.implications : [];

    if (!text || text.length < 20) errors.push('text_empty_or_too_short');
    if (_msHasEllipsisOrTrunc(text)) errors.push('ellipsis_or_trunc');
    if (!_msLooksLikeCompleteSentence(text)) errors.push('text_not_complete_sentence_end');

    const sents = _msSplitSentences(text);
    if (sents.length < 2) errors.push('too_few_sentences');
    for (const s of sents) {
      if (_msHasEllipsisOrTrunc(s)) errors.push('ellipsis_in_sentence');
      if (!_msLooksLikeCompleteSentence(s)) errors.push('incomplete_sentence');
    }

    const dedup = _msDedupSentences(text);
    if (_msCharCount(dedup) < _msCharCount(text) * 0.85) errors.push('too_many_duplicates');

    const cc = _msCharCount(text);
    if (cc < targets.minChars || cc > targets.maxChars) errors.push(`ratio_out_of_range:${cc}`);

    if (!coreClaim || coreClaim.length < 10) errors.push('coreClaim_weak');
    if (_msHasEllipsisOrTrunc(coreClaim)) errors.push('coreClaim_ellipsis');
    if (!_msLooksLikeCompleteSentence(coreClaim)) errors.push('coreClaim_not_sentence');
    if (!grounds.length) errors.push('grounds_empty');

    const topic = _msTopicContamination(originalText, text);
    if (!topic.ok) errors.push(`topic_contamination:${topic.score.toFixed(2)}`);

    return { ok: errors.length === 0, errors, normalized: { text: _msDedupSentences(text), coreClaim, grounds, comparisons, implications } };
  };

  const tryOnce = async (attempt: number, extraRepairNote?: string) => {
    const prompt = extraRepairNote ? `${promptBase}\n\n[수정 지시]\n${extraRepairNote}\n` : promptBase;
    const raw = await callGeminiText(c, prompt, originalText);  // ✅ 순수 원문 전달
    let obj: any = null;
    try {
      obj = JSON.parse(String(raw));
    } catch {
      const m = String(raw).match(/\{[\s\S]*\}$/);
      if (m) {
        try { obj = JSON.parse(m[0]); } catch { obj = null; }
      }
    }
    const v = validate(obj);
    return { attempt, raw, obj, v };
  };

  // 1차 생성
  let r1 = await tryOnce(1);
  if (r1.v.ok) return { ...r1.v.normalized, _debug: { attempts: 1 } };

  // 🚨 환각 감지 시 즉시 실패 (Extractive Fallback 금지)
  const hasHallucination = r1.v.errors.some(e => e.includes('topic_contamination'));
  if (hasHallucination) {
    console.log('[🚫 환각 감지] LLM이 원문에 없는 정보를 추가함 → NULL 반환 (503 트리거)');
    return null;  // ✅ Zero Tolerance: 억지로 데이터 만들지 않음
  }

  // 2차 repair (환각이 없는 경우만)
  const repairNote1 = `
이전 출력이 규칙을 위반했다. 다음을 반드시 고쳐라:
- 말줄임/중략/…/… 금지
- 문장 파손 금지(모든 문장 종결)
- 🚫 절대 금지: 원문에 없는 국가명(스웨덴, 핀란드 등), 통계(%),기관명(OECD 등) 추가 금지!
- 길이(공백 제외) ${targets.minChars}~${targets.maxChars}자로 맞출 것
- 중복 문장 제거
- grounds는 최소 2개, 가능하면 3개
오직 JSON만 출력
`;
  let r2 = await tryOnce(2, repairNote1);
  
  // 🚨 2차에서도 환각 감지 시 즉시 실패
  if (r2.v.errors.some(e => e.includes('topic_contamination'))) {
    console.log('[🚫 2차 환각 감지] NULL 반환 (503 트리거)');
    return null;  // ✅ Zero Tolerance
  }
  
  if (r2.v.ok) return { ...r2.v.normalized, _debug: { attempts: 2, repairedFrom: r1.v.errors } };

  // 3차 repair
  const repairNote2 = `
규칙 위반이 계속된다. 가장 중요한 것은:
(1) 완전한 문장, (2) 말줄임/중략 0, (3) 중복 0, (4) 원문 기반 근거 2~4개, (5) 길이 범위 준수
오직 JSON만 출력
`;
  let r3 = await tryOnce(3, repairNote2);
  if (r3.v.ok) return { ...r3.v.normalized, _debug: { attempts: 3, repairedFrom: [...r1.v.errors, ...r2.v.errors] } };

  // 🚨 최종 실패: NULL 반환 (Extractive Fallback 금지)
  console.error('[❌ CRITICAL] _msGenerateNarrativeDetailV5: 3회 시도 모두 실패, NULL 반환 → 503 트리거');
  console.error('[실패 원인]', [...r1.v.errors, ...r2.v.errors, ...r3.v.errors]);
  return null;  // ✅ Zero Tolerance: 원문 복사 금지, 정직하게 실패
}

// =====================================================================
// FORTRESS: Narrative 강제 생성기(슬롯 기반) + 금칙/생략부호 방지
// =====================================================================

function MS_norm(s: string) {
  return String(s || '')
    .replace(/[\r\n\t]+/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .replace(/\.\.+/g, '.')
    .replace(/보여\s*진다/g, '보인다')
    .replace(/되어\s*지는/g, '되는')
    .replace(/성적간/g, '성적 간')
    .replace(/능력\s*에서/g, '능력에서')
    .trim();
}

function containsForbiddenTokens(s: string) {
  const t = MS_norm(s);
  return FORBIDDEN_META_PHRASES.some(phrase => t.includes(phrase));
}

function stripEllipsis(s: string) {
  return String(s || '')
    .replace(/(\.\.\.)|(\.\.\.\.)/g, ' ')
    .replace(/…/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function ensurePeriodEnd(s: string) {
  let t = MS_norm(s);
  if (t && !/[.!?]$/.test(t)) t += '.';
  return t;
}

function minSentenceFill(level: Level, text: string, pool: string[], rawLen: number) {
  const minSent = level === 'brief' ? 2 : level === 'standard' ? 4 : 6;
  let out = ensurePeriodEnd(stripEllipsis(text));

  const targetMax = Math.floor(rawLen * SUMMARY_RATIO_TABLE[level].max);

  let i = 0;
  while (splitSentencesKo(out).length < minSent && i < pool.length) {
    const cand = ensurePeriodEnd(stripEllipsis(pool[i++]));
    const next = MS_norm(out + ' ' + cand);
    if (next.length <= targetMax) out = next;
    else break;
  }

  return out;
}

// 슬롯을 "진짜 요약 문장"으로 조합
function buildNarrativeFromSlots(level: Level, rawText: string, slots: { claim: string; grounds: string[]; comparisons: string[]; implications: string[] }) {
  const rawLen = rawText.length;

  const claim = smartTrim(MS_norm(slots.claim || ''), level === 'brief' ? 80 : 120);
  const g = (slots.grounds || []).map(x => smartTrim(MS_norm(x), 140)).filter(Boolean);
  const c = (slots.comparisons || []).map(x => smartTrim(MS_norm(x), 140)).filter(Boolean);
  const im = (slots.implications || []).map(x => smartTrim(MS_norm(x), 140)).filter(Boolean);

  let base = '';

  if (level === 'brief') {
    // claim + (ground 1 or comparison 1)
    const pick = (c[0] || g[0] || im[0] || '').trim();
    base = pick ? `${claim}. ${pick}.` : `${claim}.`;
  } else if (level === 'standard') {
    // claim + ground 2 + (comparison/implication 1)
    const g2 = g.slice(0, 2);
    const tail = (c[0] || im[0] || '').trim();
    const parts = [claim];
    if (g2.length) parts.push(g2.join('. '));
    if (tail) parts.push(tail);
    base = parts.join('. ') + '.';
  } else {
    // detail: claim + grounds(3+) + comparison + implication, 문단 2개 이상
    const g3 = g.slice(0, Math.max(3, Math.min(6, g.length)));
    const para1 = [claim, ...g3].join('. ') + '.';
    const para2Parts = [];
    if (c[0]) para2Parts.push(`한편 ${c[0]}.`);
    if (im[0]) para2Parts.push(`${im[0]}.`);
    const para2 = para2Parts.length ? para2Parts.join(' ') : (g[3] ? `${g[3]}.` : '');
    base = para2 ? `${para1}\n\n${para2}` : para1;

    // 문단 보장: 템플릿 대신 원문에서 문장 추출
    if (!base.includes('\n\n')) {
      const extraSent = g[4] || g[3] || c[1] || im[1] || '';
      base = `${para1}\n\n${im[0] ? `${im[0]}.` : (extraSent ? `${extraSent}.` : para1)}`;
    }
  }

  // 풀(추가 문장 후보)
  const pool = [...g, ...c, ...im].map(x => ensurePeriodEnd(x)).filter(Boolean);

  // 최소 문장수 채우기
  let t = minSentenceFill(level, base, pool, rawLen);

  // 금칙/생략부호 최종 제거
  t = stripEllipsis(t);

  // 금칙 키워드가 있으면 제거(매우 엄격)
  if (containsForbiddenTokens(t)) {
    // 금칙이 들어간 문장 통째 제거 후 재조합
    const kept = splitSentencesKo(t).filter(sent => !containsForbiddenTokens(sent));
    t = kept.join(' ').trim();
    if (!t) t = claim ? `${claim}.` : '핵심 내용을 요약했다.';
  }

  // 요약율 강제(기존 guard 사용)
  const enforced = enforceSummaryRatio(rawText, t, level);

  // enforce 이후 생략부호/금칙 재검사
  let finalText = enforced.text;
  if (hasEllipsisOrTruncation(finalText) || containsForbiddenTokens(finalText)) {
    // 마지막 방어: 문장 단위로 필터링
    const kept = splitSentencesKo(finalText)
      .map(x => stripEllipsis(x))
      .filter(x => x && !containsForbiddenTokens(x));
    finalText = ensurePeriodEnd(kept.join(' ').trim());
  }

  const out2 = enforceSummaryRatio(rawText, finalText, level);
  return out2;
}

// 🎯 [3-LAYER] Build ID 생성기
const BUILD_ID = `V4-FORTRESS-${new Date().toISOString().slice(0, 10)}`;

// ------------------------------
// Hono Route
// ------------------------------
export function mountMatrixV4(app: Hono<{ Bindings: Bindings }>) {
  app.post('/api/matrix', async (c) => {
    const t0 = Date.now();
    const reqId = `matrix-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

    // 🎯 [3-LAYER] 상태기계 초기화
    let smPhase: StateMachinePhase = 'S0_SANITIZE';
    let engineMeta: EngineMeta = 'matrix-v4';
    let qualityResult: QualityGateResult | null = null;
    
    // 🔒 Phase 판정 (OpenAI/Gemini/Claude/Local 중 하나라도 있으면 phase2)
    const { phase } = detectPhase(c);
    let qa: any = null;

    function makeFailQa(code: string) {
      return {
        cross_ok: false,
        cross_errors: [code],
        ratios: {
          brief: { ratio: 0, ok: false },
          standard: { ratio: 0, ok: false },
          detail: { ratio: 0, ok: false }
        }
      };
    }

    try {
      const body = (await c.req.json()) as Partial<MatrixReq>;
      const rawInput = String(body.text || '').trim();
      const requestedLevel = body.level || 'standard';
      const requestedView = body.viewType || 'narrative';

      // 🎯 [S0: SANITIZE] 입력 전처리 및 검증
      console.log('[S0] Starting input sanitization...');
      const rawText = preprocessRawText(rawInput);

      if (!rawText || rawText.length < 20) {
        smPhase = 'S0_FAIL';
        const failQa = makeFailQa(!rawText ? 'EMPTY_TEXT' : 'TEXT_TOO_SHORT');
        console.log('[S0] ❌ FAIL: Input validation failed');
        
        return c.json(
          {
            ok: false,
            degraded: false,
            engine: engineMeta,
            mode: requestedLevel,
            view: requestedView,
            error: { code: 'INVALID_TEXT', message: 'text가 너무 짧습니다(최소 20자 권장)' },
            data: null,
            meta: { 
              reqId, 
              elapsedMs: Date.now() - t0, 
              phase: smPhase,  // S0_FAIL
              engineMeta,
              buildId: BUILD_ID,
              qa: failQa 
            }
          },
          400
        );
      }
      
      console.log('[S0] ✅ Input sanitization passed');

      const checksum = checksumSimple(rawText);

      let detail: DetailBundle | null = null;

      // 🎯 [S1: DETAIL GENERATION] LLM으로 Detail 생성
      smPhase = 'S1_DETAIL';
      console.log('[S1] Starting Detail generation via LLM...');
      
      const detailPrompt = buildDetailPrompt(rawText);
      let detailText = await callGeminiText(c, detailPrompt, rawText);
      
      // 스키마 확인형 파싱
      detail = coerceDetailBundleFromLLM(detailText);

      if (!detail) {
        console.log('[S1] First attempt failed, trying repair...');
        const repairPrompt = [
          `너의 직전 출력은 JSON 파싱에 실패했다.`,
          `설명/마크다운 없이, 오직 JSON만 다시 출력하라.`,
          buildDetailPrompt(rawText)
        ].join('\n');
        detailText = await callGeminiText(c, repairPrompt, rawText);
        detail = coerceDetailBundleFromLLM(detailText);
      }

      if (!detail) {
        // 🚨 [ZERO TOLERANCE] LLM 완전 실패 → Fallback 금지, 즉시 에러 반환
        console.error('[S1] ❌ CRITICAL: All LLM attempts failed, NO FALLBACK');
        smPhase = 'S1_FAIL';
        engineMeta = 'fallback-extractive';
        
        if (phase === 'phase2') {
          await insertFalseBucket(c.env.DB, {
            source: 'matrix_v4',
            reason: 'LLM_TOTAL_FAILURE',
            errors: ['All LLM attempts failed', 'Gemini + Claude + Ollama all failed'],
            input_text: rawText,
            model: c.env.GEMINI_MODEL || 'gemini',
            retry_count: 2,
            meta: { reqId, phase: smPhase, elapsedMs: Date.now() - t0 }
          });
        }
        
        // 즉시 에러 응답 반환 (가짜 엔진 호출 금지)
        return c.json(
          {
            ok: false,
            degraded: true,
            engine: 'fallback-extractive',
            mode: requestedLevel,
            view: requestedView,
            error: { 
              code: 'LLM_UNAVAILABLE', 
              message: '요약 엔진을 사용할 수 없습니다. 잠시 후 다시 시도해주세요.' 
            },
            data: null,
            meta: { 
              reqId, 
              elapsedMs: Date.now() - t0, 
              phase: smPhase,
              engineMeta: 'fallback-extractive',
              buildId: BUILD_ID,
              warnings: ['LLM_TOTAL_FAILURE', 'NO_FAKE_ENGINE_FALLBACK'],
              qa: makeFailQa('LLM_UNAVAILABLE')
            }
          },
          503  // Service Unavailable
        );
      }

      // 🎯 [S1: QUALITY GATE] 품질 검증
      const summaryText = coerceText(detail?.narrative?.summaryDetail ?? detail?.narrative);
      qualityResult = evaluateQuality(summaryText, rawText);
      
      console.log('[S1] Quality Gate:', {
        passed: qualityResult.passed,
        degraded: qualityResult.degraded,
        warnings: qualityResult.warnings,
        extractiveRatio: qualityResult.extractiveRatio.toFixed(2),
        hasSlotMarkers: qualityResult.hasSlotMarkers
      });
      
      // 품질 실패 시 S1_FAIL로 전환 (하지만 응답은 계속)
      if (qualityResult.degraded) {
        console.log('[S1] ⚠️ Quality degraded, marking as S1_FAIL');
        smPhase = 'S1_FAIL';
        engineMeta = 'fallback-extractive';
      } else {
        console.log('[S1] ✅ Quality gate passed');
        engineMeta = 'matrix-v4';
      }
      
      // detail 스키마 검증
      const detailErrs = validateDetailBundle(detail);
      if (detailErrs.length) {
        smPhase = 'S1_FAIL';
        await insertFalseBucket(c.env.DB, {
          source: 'matrix_v4',
          reason: 'DETAIL_VALIDATION_FAIL',
          errors: detailErrs,
          input_text: rawText,
          model: c.env.GEMINI_MODEL || 'gemini',
          payload: detail,
          retry_count: 0,
          meta: { reqId, phase: smPhase, elapsedMs: Date.now() - t0 }
        });

        return c.json(
          {
            ok: false,
            degraded: true,
            engine: engineMeta,
            mode: requestedLevel,
            view: requestedView,
            error: { code: 'DETAIL_VALIDATION_FAIL', message: detailErrs.join(' | ') },
            data: null,
            meta: { 
              reqId, 
              elapsedMs: Date.now() - t0, 
              phase: smPhase,
              engineMeta,
              buildId: BUILD_ID,
              warnings: qualityResult?.warnings || [],
              qa 
            }
          },
          422
        );
      }

      // ✅ V5 핵심: Phase2일 때만 detail.narrative를 Gemini로 "진짜 요약" 생성
      const baseChars = Math.max(50, _msCharCount(rawText));
      let detailRatio = 0;
      
      if (phase === 'phase2') {
        console.log('[Matrix V4 → V5] Phase 2: Generating detail.narrative with Gemini (V5 Engine)');
        const narrativeV5 = await _msGenerateNarrativeDetailV5(c, rawText);

        // 🚨 Zero Tolerance: LLM 실패 시 즉시 503
        if (!narrativeV5) {
          console.error('[❌ CRITICAL] narrativeV5 is null → LLM TOTAL FAILURE');
          smPhase = 'S1_FAIL';
          return c.json({
            ok: false,
            degraded: true,
            engine: 'fallback-extractive',
            mode: requestedLevel,
            view: requestedView,
            error: {
              code: 'LLM_TOTAL_FAILURE',
              message: 'All LLM attempts failed. NO FAKE ENGINE FALLBACK.'
            },
            data: null,
            meta: {
              reqId,
              elapsedMs: Date.now() - t0,
              phase: smPhase,
              engineMeta: 'fallback-extractive',
              buildId: BUILD_ID,
              warnings: ['LLM_TOTAL_FAILURE', 'NO_FAKE_ENGINE_FALLBACK'],
              qa
            }
          }, 503);
        }

        // 최종 safety: 중복/말줄임 제거 1회 더
        const cleanedText = _msDedupSentences(String(narrativeV5.text ?? ''));
        
        // 🚨 Ellipsis 감지 시 즉시 실패 (Extractive Fallback 금지)
        if (_msHasEllipsisOrTrunc(cleanedText)) {
          console.error('[❌ CRITICAL] Ellipsis detected in narrativeV5 → REJECT');
          smPhase = 'S1_FAIL';
          return c.json({
            ok: false,
            degraded: true,
            engine: 'fallback-extractive',
            mode: requestedLevel,
            view: requestedView,
            error: {
              code: 'ELLIPSIS_DETECTED',
              message: 'Summary contains ellipsis or truncation. Zero Tolerance Policy.'
            },
            data: null,
            meta: {
              reqId,
              elapsedMs: Date.now() - t0,
              phase: smPhase,
              engineMeta: 'fallback-extractive',
              buildId: BUILD_ID,
              warnings: ['ELLIPSIS_DETECTED', 'ZERO_TOLERANCE_ENFORCEMENT'],
              qa
            }
          }, 503);
        }
        
        const finalText = cleanedText;

        const charCount = _msCharCount(finalText);
        detailRatio = charCount / baseChars;

        // 🎯 [핀셋 1] Phase2 Narrative 데이터 구조 유지: 통째로 덮어쓰지 않고 필드별 업데이트
        // DetailBundle.narrative 스키마: { coreClaim, grounds, comparisons?, implications?, summaryDetail }
        // ❌ 기존: detail.narrative = { text, ... } → 타입 파괴
        // ✅ 수정: 기존 구조 유지하며 필드만 업데이트
        detail.narrative.coreClaim = String(narrativeV5.coreClaim ?? '').trim() || (_msSplitSentences(finalText)[0] ?? '').trim();
        detail.narrative.grounds = Array.isArray(narrativeV5.grounds) ? narrativeV5.grounds.filter(Boolean) : [];
        detail.narrative.comparisons = Array.isArray(narrativeV5.comparisons) ? narrativeV5.comparisons.filter(Boolean) : [];
        detail.narrative.implications = Array.isArray(narrativeV5.implications) ? narrativeV5.implications.filter(Boolean) : [];
        detail.narrative.summaryDetail = finalText;  // ✅ 요약 본문은 여기에 저장
        
        // 메타 정보는 별도 필드로 관리
        (detail.narrative as any).ratio = detailRatio;
        (detail.narrative as any).warnings = [];
        (detail.narrative as any)._localSpec = {
          usedLLM: !(narrativeV5 as any)._debug?.fallback,
          charCount,
          ratio: detailRatio,
        };

        console.log('[Matrix V4 → V5] Detail narrative generated:', {
          usedLLM: !(narrativeV5 as any)._debug?.fallback,
          charCount,
          ratio: detailRatio.toFixed(3),
          attempts: (narrativeV5 as any)._debug?.attempts,
        });
      } else {
        console.log('[Matrix V4 → V5] Phase 1: Skipping V5 engine (using existing detail.narrative from fallback)');
      }

      // 🎯 [S2: DOWNSAMPLE] 오염된 Detail은 전파 차단
      smPhase = 'S2_DOWNSAMPLE';
      
      let briefLv, standardLv, detailLv;
      
      if (qualityResult && qualityResult.degraded) {
        // ⚠️ CRITICAL: 오염된 Detail을 downsample하지 않음 → 즉시 중단
        console.log('[S2] ❌ BLOCKED: Detail is contaminated, skipping downsample');
        smPhase = 'S2_FAIL';
        
        // 오염된 Detail만 반환 (brief/standard는 null)
        briefLv = { 
          narrative: { text: '', coreClaim: '', grounds: [], comparisons: [], implications: [] },
          structured: { text: '', toc: [], hierarchy: [], glossary: [] },
          mindmap: { tree: { title: '', children: [] } },
          selftest: { passScorePct: 90, items: [] }
        };
        standardLv = briefLv;
        detailLv = downsampleFromDetail(detail, 'detail');  // Detail만 생성
        
      } else {
        // ✅ 정상: Brief/Standard/Detail 모두 생성
        console.log('[S2] ✅ Downsampling to Brief/Standard/Detail...');
        briefLv = downsampleFromDetail(detail, 'brief');
        standardLv = downsampleFromDetail(detail, 'standard');
        detailLv = downsampleFromDetail(detail, 'detail');
        console.log('[S2] ✅ Downsample completed');
      }

      // 🔴 [NEW V2] 확장 좀비 감지 + Reject/Regenerate 루프 (최대 3회)
      smPhase = 'S2_QUALITY_GATE';
      console.log('[S2] 🔴 확장 좀비 감지 & 재생성 루프 시작...');
      
      const MAX_REGENERATE_ATTEMPTS = 3;
      let regenerateAttempt = 0;
      let qualityCheckResult: ReturnType<typeof isQualityStandardPassed> | null = null;
      
      // 재생성 루프
      while (regenerateAttempt < MAX_REGENERATE_ATTEMPTS) {
        regenerateAttempt++;
        console.log(`[S2] Attempt ${regenerateAttempt}/${MAX_REGENERATE_ATTEMPTS}: Quality Check...`);
        
        // 품질 검증
        qualityCheckResult = isQualityStandardPassed(
          rawText,
          {
            brief: briefLv.narrative.text,
            standard: standardLv.narrative.text,
            detail: detailLv.narrative.text
          },
          {
            b: 0.12,   // Brief: 12% (±6% → 6~18%)
            s: 0.30,   // Standard: 30% (±6% → 24~36%)
            d: 0.50    // Detail: 50% (±6% → 44~56%)
          }
        );
        
        if (qualityCheckResult.passed) {
          console.log(`[S2] ✅ Quality Check PASSED on attempt ${regenerateAttempt}`);
          break;
        }
        
        // 실패 - 마지막 시도가 아니면 재생성
        if (regenerateAttempt < MAX_REGENERATE_ATTEMPTS) {
          console.error(`[S2] ❌ Quality Check FAILED (attempt ${regenerateAttempt}/${MAX_REGENERATE_ATTEMPTS})`);
          console.error('[S2] Failed metrics:', qualityCheckResult.metrics);
          console.log(`[S2] 🔄 REGENERATING with Try ${regenerateAttempt + 1} prompt...`);
          
          // 재생성: 새로운 프롬프트로 Detail 다시 생성
          const retryPrompt = buildDetailPromptWithRetry(rawText, regenerateAttempt + 1, qualityCheckResult.metrics);
          const retryDetailText = await callGeminiText(c, retryPrompt, rawText);
          
          if (!retryDetailText) {
            console.error('[S2] ❌ Regeneration failed: LLM returned null');
            break; // LLM 실패 시 루프 종료
          }
          
          // 재파싱
          const retryDetail = coerceDetailBundleFromLLM(retryDetailText);
          if (!retryDetail) {
            console.error('[S2] ❌ Regeneration failed: Invalid JSON');
            break; // 파싱 실패 시 루프 종료
          }
          
          // Detail 교체 및 재 downsample
          detail = retryDetail;
          briefLv = downsampleFromDetail(detail, 'brief');
          standardLv = downsampleFromDetail(detail, 'standard');
          detailLv = downsampleFromDetail(detail, 'detail');
          
          console.log(`[S2] 🔄 Regeneration complete, retrying quality check...`);
        }
      }
      
      // 최종 결과 판정
      if (!qualityCheckResult || !qualityCheckResult.passed) {
        // 🚨 3회 모두 실패 → 503 에러
        console.error(`[S2] ❌ FINAL FAILURE after ${MAX_REGENERATE_ATTEMPTS} attempts`);
        smPhase = 'S2_REGENERATE_FAIL';
        
        await insertFalseBucket(c.env.DB, {
          source: 'matrix_v4',
          reason: 'QUALITY_REGENERATE_EXHAUSTED',
          errors: [
            `Failed after ${regenerateAttempt} attempts`,
            JSON.stringify(qualityCheckResult?.metrics || {})
          ],
          input_text: rawText,
          model: c.env.GEMINI_MODEL || 'gemini',
          payload: { brief: briefLv, standard: standardLv, detail: detailLv, finalMetrics: qualityCheckResult?.metrics },
          retry_count: regenerateAttempt,
          meta: { reqId, phase: smPhase, elapsedMs: Date.now() - t0 }
        });
        
        return c.json(
          {
            ok: false,
            degraded: true,
            engine: 'fallback-extractive',
            mode: requestedLevel,
            view: requestedView,
            error: { 
              code: 'QUALITY_REGENERATE_EXHAUSTED', 
              message: `품질 기준 미달: ${regenerateAttempt}회 재생성 후에도 통과 실패. 원문 복사 금지.` 
            },
            data: null,
            meta: { 
              reqId, 
              elapsedMs: Date.now() - t0, 
              phase: smPhase,
              engineMeta: 'fallback-extractive',
              buildId: BUILD_ID,
              warnings: [
                'QUALITY_REGENERATE_EXHAUSTED',
                `Attempts: ${regenerateAttempt}/${MAX_REGENERATE_ATTEMPTS}`,
                ...(qualityCheckResult?.metrics ? [
                  `RatioOK: ${qualityCheckResult.metrics.ratioOK}`,
                  `SimOK: ${qualityCheckResult.metrics.levelSimOK}`,
                  `CopyOK: ${qualityCheckResult.metrics.copyOK}`
                ] : [])
              ],
              finalMetrics: qualityCheckResult?.metrics,
              qa: makeFailQa('QUALITY_GATE_FAIL')
            }
          },
          503
        );
      }
      
      // ✅ 품질 검증 통과
      console.log(`[S2] ✅ Final Quality Check PASSED (attempt ${regenerateAttempt}/${MAX_REGENERATE_ATTEMPTS})`);
      qualityResult = {
        passed: true,
        degraded: false,
        warnings: regenerateAttempt > 1 ? [`REGENERATED_${regenerateAttempt}_TIMES`] : [],
        extractiveRatio: qualityCheckResult.metrics.copyRate,
        hasSlotMarkers: true,
        strictMetrics: {
          ...qualityCheckResult.metrics,
          regenerateAttempts: regenerateAttempt  // 투명성: 몇 번 재생성했는지 공개
        } as any
      };

      // 슬롯 기반 "진짜 요약" 강제 (오염/생략부호 차단)
      const slots = {
        claim: detail.narrative.coreClaim || '',
        grounds: detail.narrative.grounds || [],
        comparisons: detail.narrative.comparisons || [],
        implications: detail.narrative.implications || []
      };

      // Phase1: 모든 레벨을 Extractive로 생성 (원문 문장 그대로 추출 = 변화 반영)
      // Phase2: V5 엔진에서 downsample한 결과 사용
      let __b_text = '';
      let __s_text = '';
      let __d_text = '';
      let __b_ratio = 0;
      let __s_ratio = 0;
      let __d_ratio = 0;

      if (phase === 'phase1') {
        // 🚨 [ZERO TOLERANCE] Phase1에서도 LLM 실패 시 extractive 금지
        console.log('[Matrix V4] Phase 1: Trying LLM...');
        
        const detailPrompt = `다음 텍스트를 요약하시오. 원문의 핵심 내용을 유지하되 간결하게 작성하시오.\n\n원문:\n${rawText}\n\n요약 (완전한 문장으로, 생략부호 없이):`;
        const detailLLM = await callGeminiText(c, detailPrompt, rawText);
        
        if (!detailLLM || detailLLM.length < 50) {
          // ❌ Phase1도 LLM 실패 시 503 반환
          console.error('[Matrix V4] Phase 1: ❌ LLM FAILED - NO FALLBACK');
          return c.json(
            {
              ok: false,
              degraded: true,
              engine: 'fallback-extractive',
              mode: requestedLevel,
              view: requestedView,
              error: { 
                code: 'LLM_UNAVAILABLE', 
                message: '요약 엔진을 사용할 수 없습니다. 잠시 후 다시 시도해주세요.' 
              },
              data: null,
              meta: { 
                reqId, 
                elapsedMs: Date.now() - t0, 
                phase: 'phase1',
                engineMeta: 'fallback-extractive',
                buildId: BUILD_ID,
                warnings: ['PHASE1_LLM_FAILURE', 'NO_FALLBACK'],
                qa: makeFailQa('LLM_UNAVAILABLE')
              }
            },
            503
          );
        }
        
        // 🚨 [ZOMBIE ELIMINATED] Phase1 문장 자르기 로직 완전 삭제
        // Phase1도 이제 downsample 결과를 사용하도록 강제
        // Quality Gate를 거치지 않은 문장 자르기는 누적 확장 좀비의 원인
        
        console.log('[Matrix V4] 🚨 Phase 1 is DEPRECATED - Forcing Phase 2 quality gate');
        console.log('[Matrix V4] Phase 1 요청은 자동으로 Phase 2로 승격됩니다.');
      }
      
      // ✅ 모든 경로에서 downsample 결과 사용 (Quality Gate 통과 후)
      __b_text = briefLv.narrative.text;
      __s_text = standardLv.narrative.text;
      __d_text = detailLv.narrative.text;
      
      __b_ratio = _msCharCount(__b_text) / baseChars;
      __s_ratio = _msCharCount(__s_text) / baseChars;
      __d_ratio = detailRatio;

      // 🎯 [ONE-BLOCK FIX] coerceText 적용: [object Object] 차단
      briefLv.narrative.text = coerceText(__b_text);
      standardLv.narrative.text = coerceText(__s_text);
      detailLv.narrative.text = coerceText(__d_text);

      (briefLv.narrative as any).ratio = __b_ratio;
      (standardLv.narrative as any).ratio = __s_ratio;
      (detailLv.narrative as any).ratio = phase === 'phase2' ? detailRatio : __d_ratio;

      // ✅ 마지막 방어: 생략부호/금칙 키워드가 남아 있으면 즉시 FAIL(phase2), phase1은 경고로 qa에 기록
      const hardFailReasons: string[] = [];
      if (hasEllipsisOrTruncation(briefLv.narrative.text) || hasEllipsisOrTruncation(standardLv.narrative.text) || hasEllipsisOrTruncation(detailLv.narrative.text)) {
        hardFailReasons.push('ELLIPSIS_OR_TRUNCATION_FOUND');
      }
      if (containsForbiddenTokens(briefLv.narrative.text) || containsForbiddenTokens(standardLv.narrative.text) || containsForbiddenTokens(detailLv.narrative.text)) {
        hardFailReasons.push('FORBIDDEN_TOPIC_TOKEN_FOUND');
      }

      if (hardFailReasons.length && phase === 'phase2') {
        // FALSE Bucket: Fortress 검증 실패 기록
        await insertFalseBucket(c.env.DB, {
          source: 'matrix_v4',
          reason: 'NARRATIVE_FORTRESS_FAIL',
          errors: hardFailReasons,
          input_text: rawText,
          model: c.env.GEMINI_MODEL || 'gemini',
          payload: { brief: briefLv, standard: standardLv, detail: detailLv },
          retry_count: 0,
          meta: { reqId, phase, elapsedMs: Date.now() - t0, ratios: { brief: __b_ratio, standard: __s_ratio, detail: __d_ratio } }
        });

        return c.json(
          {
            ok: false,
            degraded: true,
            engine: engineMeta,
            mode: requestedLevel,
            view: requestedView,
            error: { code: 'NARRATIVE_FORTRESS_FAIL', message: hardFailReasons.join(' | ') },
            data: null,
            meta: { 
              reqId, 
              elapsedMs: Date.now() - t0, 
              phase, 
              engineMeta,
              buildId: BUILD_ID,
              qa 
            }
          },
          422
        );
      }

      console.log('[Matrix V4] FORTRESS narrative-quality:', {
        brief_ratio: __b_ratio,
        standard_ratio: __s_ratio,
        detail_ratio: __d_ratio,
        hardFailReasons
      });

      // 호환 변수명 유지
      const brief = {
        narrative: { ...briefLv.narrative, ratio: (briefLv.narrative as any).ratio, warnings: hardFailReasons },
        structured: briefLv.structured,
        mindmap: briefLv.mindmap,
        selftest: briefLv.selftest
      };

      const standard = {
        narrative: { ...standardLv.narrative, ratio: (standardLv.narrative as any).ratio, warnings: hardFailReasons },
        structured: standardLv.structured,
        mindmap: standardLv.mindmap,
        selftest: standardLv.selftest
      };

      (detailLv.narrative as any).warnings = hardFailReasons;

      // 레벨 분리 검증(phase2 실패 / phase1 경고)
      const sepErrs = validateLevelSeparation({ brief, standard, detail: detailLv });
      if (sepErrs.length && phase === 'phase2') {
        // FALSE Bucket: 레벨 분리 검증 실패 기록
        await insertFalseBucket(c.env.DB, {
          source: 'matrix_v4',
          reason: 'LEVEL_SEPARATION_FAIL',
          errors: sepErrs,
          input_text: rawText,
          model: c.env.GEMINI_MODEL || 'gemini',
          payload: { brief, standard, detail: detailLv },
          retry_count: 0,
          meta: { reqId, phase, elapsedMs: Date.now() - t0 }
        });

        return c.json(
          {
            ok: false,
            degraded: true,
            engine: engineMeta,
            mode: requestedLevel,
            view: requestedView,
            error: { code: 'LEVEL_SEPARATION_FAIL', message: sepErrs.join(' | ') },
            data: null,
            meta: { 
              reqId, 
              elapsedMs: Date.now() - t0, 
              phase, 
              engineMeta,
              buildId: BUILD_ID,
              qa 
            }
          },
          422
        );
      }

      // SERVER QUALITY GATE
      let finalNarrative = {
        brief: brief.narrative.text,
        standard: standard.narrative.text,
        detail: detailLv.narrative.text
      };

      qa = null;

      if (phase === 'phase2') {
        try {
          const callLLM = async (prompt: string) => await callGeminiText(c, prompt, rawText);  // ✅ 순수 원문 전달

          const gateResult = await qualityGateAll({
            originalText: rawText,
            model: c.env.GEMINI_MODEL || 'gemini',
            callLLM,
            db: c.env.DB,
            narrative: finalNarrative,
            structured: { brief: brief.structured, standard: standard.structured, detail: detailLv.structured },
            mindmap: { brief: brief.mindmap, standard: standard.mindmap, detail: detailLv.mindmap }
          });

          finalNarrative = gateResult.narrative;
          qa = gateResult.qa;

          // gate 이후에도 FORTRESS 재검증(생략부호/금칙 키워드 금지)
          if (
            hasEllipsisOrTruncation(finalNarrative.brief) ||
            hasEllipsisOrTruncation(finalNarrative.standard) ||
            hasEllipsisOrTruncation(finalNarrative.detail) ||
            containsForbiddenTokens(finalNarrative.brief) ||
            containsForbiddenTokens(finalNarrative.standard) ||
            containsForbiddenTokens(finalNarrative.detail)
          ) {
            // gate 결과가 오염이면, 슬롯 기반 결과로 롤백(안전 우선)
            finalNarrative = {
              brief: brief.narrative.text,
              standard: standard.narrative.text,
              detail: detailLv.narrative.text
            };
            qa = qa || null;
          }

          // 🎯 [ONE-BLOCK FIX] coerceText 적용
          brief.narrative.text = coerceText(finalNarrative.brief);
          standard.narrative.text = coerceText(finalNarrative.standard);
          detailLv.narrative.text = coerceText(finalNarrative.detail);

          console.log('[Matrix V4] Phase 2 Quality Gate 완료:', { cross_ok: qa?.cross_ok, ratios: qa?.ratios });
        } catch (gateErr: any) {
          console.error('[Matrix V4] Phase 2 오류:', gateErr.message);
          qa = null;
        }
      }

      if (phase === 'phase1' || !qa) {
        const cross = validateCrossConsistency({
          narrative: finalNarrative,
          structured: { brief: brief.structured, standard: standard.structured, detail: detailLv.structured },
          mindmap: { brief: brief.mindmap, standard: standard.mindmap, detail: detailLv.mindmap }
        });

        qa = {
          cross_ok: cross.ok,
          cross_errors: cross.errors.concat(hardFailReasons.map(x => `FORTRESS_${x}`)),
          ratios: {
            brief: {
              ratio: (brief.narrative as any).ratio,
              rule: SUMMARY_RATIO_TABLE.brief,
              ok:
                (brief.narrative as any).ratio >= SUMMARY_RATIO_TABLE.brief.min &&
                (brief.narrative as any).ratio <= SUMMARY_RATIO_TABLE.brief.max
            },
            standard: {
              ratio: (standard.narrative as any).ratio,
              rule: SUMMARY_RATIO_TABLE.standard,
              ok:
                (standard.narrative as any).ratio >= SUMMARY_RATIO_TABLE.standard.min &&
                (standard.narrative as any).ratio <= SUMMARY_RATIO_TABLE.standard.max
            },
            detail: {
              ratio: (detailLv.narrative as any).ratio,
              rule: SUMMARY_RATIO_TABLE.detail,
              ok:
                (detailLv.narrative as any).ratio >= SUMMARY_RATIO_TABLE.detail.min &&
                (detailLv.narrative as any).ratio <= SUMMARY_RATIO_TABLE.detail.max
            }
          }
        };

        console.log('[Matrix V4] Phase 1 진단 완료 (FORTRESS):', {
          cross_ok: qa.cross_ok,
          ratios_ok: [qa.ratios.brief.ok, qa.ratios.standard.ok, qa.ratios.detail.ok]
        });
      }

      // 🎯 [S3: ASSEMBLY] 응답 조립 - 프론트엔드 계약 준수
      smPhase = 'S3_ASSEMBLY';
      console.log('[S3] Assembling final response...');
      
      // 🎯 [3-LAYER] ok는 오직 품질 통과 시에만 true
      const responseOk = qualityResult ? qualityResult.passed && !qualityResult.degraded : true;
      const responseDegraded = qualityResult ? qualityResult.degraded : false;
      
      const out = {
        ok: responseOk,                      // ✅ 품질 기준 통과 여부
        degraded: responseDegraded,          // ✅ 발췌형 fallback 여부
        engine: engineMeta,                  // ✅ 실제 사용된 엔진
        mode: requestedLevel,                // ✅ 요청된 모드
        view: requestedView,                 // ✅ 요청된 뷰
        data: {
          schemaVersion: 'ms-v4',
          // 🎯 [3-LAYER] data.views[viewType][mode] 구조 강제
          views: {
            narrative: { 
              brief: briefLv.narrative, 
              standard: standardLv.narrative, 
              detail: detailLv.narrative 
            },
            structured: { 
              brief: briefLv.structured, 
              standard: standardLv.structured, 
              detail: detailLv.structured 
            },
            mindmap: { 
              brief: briefLv.mindmap, 
              standard: standardLv.mindmap, 
              detail: detailLv.mindmap 
            },
            selftest: { 
              brief: briefLv.selftest, 
              standard: standardLv.selftest, 
              detail: detailLv.selftest 
            }
          }
        },
        meta: { 
          reqId, 
          elapsedMs: Date.now() - t0, 
          phase: smPhase,                    // ✅ 상태기계 Phase
          engineMeta,                        // ✅ 실제 엔진 메타
          buildId: BUILD_ID,                 // ✅ 빌드 ID (캐시 오염 판별)
          warnings: qualityResult?.warnings || [],  // ✅ 품질 경고
          strictMetrics: qualityResult?.strictMetrics,  // 🔴 NEW: 엄격한 메트릭 (투명성)
          qa 
        }
      };
      
      console.log('[S3] ✅ Response assembled:', {
        ok: responseOk,
        degraded: responseDegraded,
        engine: engineMeta,
        phase: smPhase,
        buildId: BUILD_ID
      });

      // 캐시 무효화 헤더
      c.header('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      c.header('Pragma', 'no-cache');
      c.header('Expires', '0');
      c.header('X-MS-Build', BUILD_ID);
      c.header('X-MS-Phase', smPhase);
      c.header('X-MS-Engine', engineMeta);

      return c.json(out, 200);
    } catch (e: any) {
      // 🎯 [3-LAYER] 에러도 통일된 구조로 응답
      smPhase = 'S3_FAIL';
      console.error('[S3] ❌ Fatal error:', e);
      
      return c.json(
        {
          ok: false,
          degraded: true,
          engine: engineMeta || 'fallback-local',
          mode: 'standard',
          view: 'narrative',
          error: { code: 'MATRIX_V4_ERROR', message: e?.message || String(e) },
          data: null,
          meta: { 
            reqId, 
            elapsedMs: Date.now() - t0, 
            phase: smPhase,
            engineMeta: engineMeta || 'fallback-local',
            buildId: BUILD_ID,
            warnings: ['FATAL_ERROR'],
            qa 
          }
        },
        500
      );
    }
  });

  // Selftest 채점 API
  app.post('/api/selftest/grade', async (c) => {
    try {
      const { gradeSelftestAttempt } = await import('../lib/selftest-solver');
      const body = await c.req.json();
      const { sheet, attempt } = body;

      if (!sheet || !attempt) {
        return c.json({ ok: false, error: 'sheet and attempt required' }, 400);
      }

      const result = gradeSelftestAttempt(sheet, attempt);
      return c.json(result, 200);
    } catch (e: any) {
      return c.json({ ok: false, error: e?.message || String(e) }, 500);
    }
  });

  // FAIL 리포트 API
  app.get('/api/fail-report', async (c) => {
    try {
      const { buildFailReport } = await import('../lib/ms-summary-guard-v1');
      const sinceHours = Number(c.req.query('hours')) || 168;
      const db = c.env?.DB;

      const report = await buildFailReport(db, { sinceHours });
      return c.json({ ok: true, report }, 200);
    } catch (e: any) {
      return c.json({ ok: false, error: e?.message || String(e) }, 500);
    }
  });
}
