/**
 * LLM Fallback Chain - API 트라우마 해결책
 * 
 * 우선순위:
 * 1. Ollama 로컬 (가장 안정적, 무료)
 * 2. Claude API (중간, 안정적)
 * 3. Gemini API (최후)
 * 4. Extractive (LLM 없이)
 */

interface LLMResult {
  text: string;
  source: 'ollama-local' | 'claude' | 'gemini' | 'extractive-fallback';
  success: boolean;
  error?: string;
}

/**
 * Ollama 로컬 LLM 호출
 */
async function callOllamaLocal(prompt: string): Promise<LLMResult> {
  try {
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3.2:3b', // 또는 'gemma2:9b'
        prompt: prompt,
        stream: false,
        options: {
          temperature: 0.3,
          num_predict: 2048
        }
      })
    });

    if (!response.ok) throw new Error('Ollama response not ok');

    const data = await response.json();
    return {
      text: data.response || '',
      source: 'ollama-local',
      success: true
    };
  } catch (e: any) {
    return {
      text: '',
      source: 'ollama-local',
      success: false,
      error: e.message
    };
  }
}

/**
 * Claude API 호출
 */
async function callClaudeAPI(apiKey: string, prompt: string): Promise<LLMResult> {
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 4096,
        temperature: 0.3,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!response.ok) throw new Error('Claude API error');

    const data = await response.json();
    return {
      text: data.content[0]?.text || '',
      source: 'claude',
      success: true
    };
  } catch (e: any) {
    return {
      text: '',
      source: 'claude',
      success: false,
      error: e.message
    };
  }
}

/**
 * Gemini API 호출
 */
async function callGeminiAPI(apiKey: string, prompt: string): Promise<LLMResult> {
  try {
    const model = 'gemini-2.0-flash-exp';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 8192
        }
      })
    });

    if (!response.ok) throw new Error('Gemini API error');

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    return {
      text,
      source: 'gemini',
      success: true
    };
  } catch (e: any) {
    return {
      text: '',
      source: 'gemini',
      success: false,
      error: e.message
    };
  }
}

/**
 * Extractive Fallback (LLM 없이 원문 추출)
 */
function extractiveFallback(rawText: string, targetLength: number): LLMResult {
  const sentences = rawText
    .split(/[.!?]\s+/)
    .filter(s => s.trim().length > 10);

  let result = '';
  for (const sent of sentences) {
    if (result.length + sent.length > targetLength) break;
    result += sent + '. ';
  }

  return {
    text: result.trim() || rawText.slice(0, targetLength),
    source: 'extractive-fallback',
    success: true
  };
}

/**
 * 메인 Fallback Chain
 */
export async function generateSummaryWithFallback(
  c: any,
  prompt: string,
  rawText: string
): Promise<LLMResult> {
  console.log('[LLM Fallback Chain] 시작');

  // 1순위: Ollama 로컬
  console.log('[1/4] Ollama 로컬 시도...');
  const ollamaResult = await callOllamaLocal(prompt);
  if (ollamaResult.success && ollamaResult.text.length > 50) {
    console.log('[✓] Ollama 로컬 성공');
    return ollamaResult;
  }
  console.log('[✗] Ollama 실패:', ollamaResult.error);

  // 2순위: Claude API
  const claudeKey = c?.env?.ANTHROPIC_API_KEY || '';
  if (claudeKey) {
    console.log('[2/4] Claude API 시도...');
    const claudeResult = await callClaudeAPI(claudeKey, prompt);
    if (claudeResult.success && claudeResult.text.length > 50) {
      console.log('[✓] Claude 성공');
      return claudeResult;
    }
    console.log('[✗] Claude 실패:', claudeResult.error);
  }

  // 3순위: Gemini API
  const geminiKey = c?.env?.GEMINI_API_KEY || '';
  if (geminiKey) {
    console.log('[3/4] Gemini API 시도...');
    const geminiResult = await callGeminiAPI(geminiKey, prompt);
    if (geminiResult.success && geminiResult.text.length > 50) {
      console.log('[✓] Gemini 성공');
      return geminiResult;
    }
    console.log('[✗] Gemini 실패:', geminiResult.error);
  }

  // 4순위: Extractive (최후의 수단)
  console.log('[4/4] Extractive Fallback 사용');
  return extractiveFallback(rawText, 500);
}
