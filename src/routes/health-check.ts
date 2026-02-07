/* =====================================================================
   🔍 HEALTH CHECK & ENV DEBUG ENDPOINT
   파일: /home/user/webapp/src/routes/health-check.ts
   
   목적: API 키 및 환경 변수 전달 상태를 즉시 확인
   엔드포인트: GET /api/health
===================================================================== */

import { Hono } from 'hono';

type Bindings = {
  GEMINI_API_KEY?: string;
  GEMINI_MODEL?: string;
  ANTHROPIC_API_KEY?: string;
  ANTHROPIC_MODEL?: string;
  LOCAL_LLM_URL?: string;
  LOCAL_LLM_MODEL?: string;
  USE_MOCK?: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get('/api/health', (c) => {
  const timestamp = new Date().toISOString();
  
  // 🎯 환경 변수 읽기 (c.env)
  const geminiKey = c.env.GEMINI_API_KEY || '';
  const claudeKey = c.env.ANTHROPIC_API_KEY || '';
  const localUrl = c.env.LOCAL_LLM_URL || '';
  const useMock = c.env.USE_MOCK || '';
  
  // 🎯 키 유효성 검사
  const hasGemini = geminiKey.length > 10;
  const hasClaude = claudeKey.length > 10;
  const hasLocal = localUrl.length > 10;
  
  // 🎯 모든 환경 변수 키 목록
  const envKeys = Object.keys(c.env || {});
  
  // 🎯 상태 판정
  const status = hasGemini || hasClaude || hasLocal ? 'READY' : 'NOT_READY';
  const message = hasGemini 
    ? '✅ Gemini API Key Detected - Ready to serve!'
    : '❌ No valid API keys found - Check Dashboard settings';
  
  return c.json({
    ok: status === 'READY',
    status,
    message,
    timestamp,
    
    env_debug: {
      all_env_keys: envKeys,
      keys_count: envKeys.length,
      
      gemini: {
        detected: hasGemini,
        key_length: geminiKey.length,
        key_preview: geminiKey ? `${geminiKey.slice(0, 10)}...` : 'NOT_SET',
        model: c.env.GEMINI_MODEL || 'gemini-2.0-flash-exp (default)'
      },
      
      claude: {
        detected: hasClaude,
        key_length: claudeKey.length,
        key_preview: claudeKey ? `${claudeKey.slice(0, 10)}...` : 'NOT_SET',
        model: c.env.ANTHROPIC_MODEL || 'claude-3-5-sonnet-20241022 (default)'
      },
      
      local_llm: {
        detected: hasLocal,
        url: localUrl || 'NOT_SET',
        model: c.env.LOCAL_LLM_MODEL || 'llama3.1:8b (default)'
      },
      
      mock_mode: {
        enabled: useMock === 'true',
        value: useMock || 'false'
      }
    },
    
    next_steps: hasGemini ? [
      '✅ API Key detected successfully',
      '✅ Ready to test /api/matrix endpoint',
      '💡 Test with: POST /api/matrix with { text: "테스트", level: "brief" }'
    ] : [
      '❌ No API keys detected',
      '🔧 Go to: Cloudflare Dashboard → Workers & Pages → webapp → Settings',
      '🔧 Add: GEMINI_API_KEY = AIzaSy... (your key)',
      '🔧 Click: Save and Deploy',
      '⏳ Wait: 1-2 minutes for deployment',
      '🔄 Refresh: This page to verify'
    ]
  }, 200, {
    'Cache-Control': 'no-store, no-cache, must-revalidate',
    'X-Health-Check': 'v1',
    'X-Timestamp': timestamp
  });
});

export default app;
