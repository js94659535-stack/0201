/**
 * Summary Pipeline
 * 역할: 간단/표준/상세 + 서술/구조화/마인드맵 조합을 단일 파이프라인으로 처리
 * 전역: window.SummaryPipeline
 */
(function () {
  'use strict';

  if (window.SummaryPipeline || window.MS_SummaryPipeline) {
    console.warn('[summary-pipeline] Already defined, skipping');
    return;
  }

  if (!window.callEngineAPI) {
    console.error('[summary-pipeline] ❌ callEngineAPI not found! Load engine-api-client.js first.');
    return;
  }

  const CACHE_TTL_MS = 1000 * 60 * 5; // 5분
  const cache = new Map(); // key → { result, timestamp }
  const inflightMap = new Map(); // key → Promise

  /**
   * 캐시 키 생성
   */
  function makeCacheKey(text, mode, viewType) {
    const hash = simpleHash(text);
    return `${hash}::${mode}::${viewType}`;
  }

  /**
   * 간단한 해시 함수 (문자열 → 숫자)
   */
  function simpleHash(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = (h << 5) - h + str.charCodeAt(i);
      h = h & h; // 32bit
    }
    return Math.abs(h).toString(36);
  }

  /**
   * 캐시에서 가져오기 (TTL 체크)
   */
  function getCache(key) {
    const entry = cache.get(key);
    if (!entry) return null;

    const age = Date.now() - entry.timestamp;
    if (age > CACHE_TTL_MS) {
      cache.delete(key);
      return null;
    }

    return entry.result;
  }

  /**
   * 캐시에 저장
   */
  function setCache(key, result) {
    cache.set(key, {
      result,
      timestamp: Date.now()
    });
  }

  /**
   * 메인 파이프라인 실행
   * @param {object} params - { text, mode, viewType, userId }
   * @returns {Promise<{ ok, data, meta }>}
   */
  async function run(params) {
    const { text, mode = 'standard', viewType = 'narrative', userId = 'web_user' } = params;

    if (!text || typeof text !== 'string' || text.trim().length < 5) {
      throw new Error('Text must be at least 5 characters');
    }

    const cacheKey = makeCacheKey(text, mode, viewType);

    // 1) 캐시 확인
    const cached = getCache(cacheKey);
    if (cached) {
      return {
        ok: true,
        data: cached,
        meta: { cached: true, source: 'pipeline-cache' }
      };
    }

    // 2) Inflight 확인 (중복 호출 방지)
    if (inflightMap.has(cacheKey)) {
      return inflightMap.get(cacheKey);
    }

    // 3) 새 요청 시작
    const promise = executeRequest(text, mode, viewType, userId, cacheKey);
    inflightMap.set(cacheKey, promise);

    try {
      const result = await promise;
      setCache(cacheKey, result.data);
      return result;
    } finally {
      inflightMap.delete(cacheKey);
    }
  }

  /**
   * 실제 API 호출 (내부 로직)
   */
  async function executeRequest(text, mode, viewType, userId, cacheKey) {
    // ✅ Base narrative 확보 전략:
    // - viewType이 narrative가 아니면, 먼저 narrative를 준비해야 할 수도 있음
    // - 하지만 서버가 derived cache를 지원하므로 직접 호출해도 됨
    // - "먼저 실행하세요" 메시지를 없애기 위해 직접 호출

    try {
      const result = await window.callEngineAPI(text, {
        kind: 'summary',
        mode,
        viewType,
        userId
      });

      return result;
    } catch (err) {
      // 에러 표준화
      console.error('[summary-pipeline] Request failed:', err);
      throw err;
    }
  }

  /**
   * 캐시 초기화 (디버깅/테스트용)
   */
  function clearCache() {
    cache.clear();
    inflightMap.clear();
    console.log('[summary-pipeline] Cache cleared');
  }

  /**
   * 캐시 상태 확인
   */
  function getCacheStats() {
    return {
      cacheSize: cache.size,
      inflightCount: inflightMap.size,
      keys: Array.from(cache.keys())
    };
  }

  // 전역 노출
  const SummaryPipeline = {
    run,
    clearCache,
    getCacheStats
  };

  window.SummaryPipeline = SummaryPipeline;
  window.MS_SummaryPipeline = SummaryPipeline; // 호환성

  console.log('[summary-pipeline] ✅ SummaryPipeline ready');
})();
