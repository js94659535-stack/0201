/**
 * Engine API Client
 * 역할: 브라우저에서 /api/engine 및 /api/gens/run 호출 래퍼
 * 전역: window.callEngineAPI(text, options)
 */
(function () {
  'use strict';

  if (window.callEngineAPI) {
    console.warn('[engine-api-client] callEngineAPI already defined, skipping');
    return;
  }

  const DEFAULT_TIMEOUT = 30000; // 30초
  const DEFAULT_ENDPOINT = '/api/engine';

  /**
   * 표준화된 에러 객체 생성
   */
  function createError(code, message, details) {
    const err = new Error(message);
    err.code = code;
    err.details = details;
    return err;
  }

  /**
   * 안전한 JSON 파싱 (방어 코드)
   */
  function safeParseJSON(text) {
    try {
      return JSON.parse(text);
    } catch {
      return null;
    }
  }

  /**
   * fetch with timeout
   */
  function fetchWithTimeout(url, options, timeout) {
    return Promise.race([
      fetch(url, options),
      new Promise((_, reject) =>
        setTimeout(() => reject(createError('TIMEOUT', `Request timeout after ${timeout}ms`)), timeout)
      )
    ]);
  }

  /**
   * 메인 API 호출 함수
   * @param {string} text - 요약할 텍스트
   * @param {object} options - { kind, mode, viewType, userId, endpoint, timeout }
   * @returns {Promise<{ ok, data, meta }>}
   */
  async function callEngineAPI(text, options = {}) {
    const {
      kind = 'summary',
      mode = 'standard',
      viewType = 'narrative',
      userId = 'web_user',
      endpoint = DEFAULT_ENDPOINT,
      timeout = DEFAULT_TIMEOUT
    } = options;

    if (!text || typeof text !== 'string' || text.trim().length < 5) {
      throw createError('INVALID_INPUT', 'Text must be at least 5 characters');
    }

    const payload = {
      kind,
      text: text.trim(),
      mode,
      viewType,
      options: { userId }
    };

    try {
      const response = await fetchWithTimeout(
        endpoint,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        },
        timeout
      );

      // HTTP 에러 체크
      if (!response.ok) {
        const errText = await response.text().catch(() => '');
        const errJson = safeParseJSON(errText);
        const message = errJson?.error?.message || `HTTP ${response.status}: ${response.statusText}`;
        throw createError('HTTP_ERROR', message, { status: response.status, body: errText });
      }

      // JSON 파싱 (방어 코드)
      const text = await response.text();
      const json = safeParseJSON(text);

      if (!json) {
        throw createError('INVALID_JSON', 'Server response is not valid JSON', { body: text });
      }

      // 표준 형태 { ok, data, meta } 기대하되, 없으면 안전하게 처리
      if (json.ok === false) {
        const errMsg = json.error?.message || json.message || 'Unknown server error';
        throw createError('SERVER_ERROR', errMsg, json.error);
      }

      // 성공 응답 정규화
      return {
        ok: json.ok !== false,
        data: json.data || json,
        meta: json.meta || {}
      };
    } catch (err) {
      // 이미 표준화된 에러면 그대로 throw
      if (err.code) throw err;

      // 네트워크 에러 등 표준화
      throw createError('NETWORK_ERROR', err.message || 'Network request failed', { original: err });
    }
  }

  // 전역 노출
  window.callEngineAPI = callEngineAPI;

  console.log('[engine-api-client] ✅ callEngineAPI ready');
})();
