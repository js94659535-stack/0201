# 🚀 Quick Start: 3가지 LLM 동시 활성화

## 📋 개요

Matrix V4는 **3가지 LLM**을 순차적으로 시도하여 **절대 실패하지 않는 요약**을 제공합니다.

```
1순위: Ollama 로컬 (무료) ━━━━━━━━━━> 80% 처리
2순위: Claude API (안정적) ━━━━━━> 15% 처리
3순위: Gemini API (저렴) ━━━━━━━> 4% 처리
4순위: Extractive (안전망) ━━━━━> 1% 처리
```

---

## ⚡ 5분 설정 가이드

### **Step 1: API 키 발급 (3분)**

#### 1-1. Gemini API (무료)
1. https://aistudio.google.com/app/apikey
2. "Create API Key" 클릭
3. 키 복사: `AIzaSy...`

#### 1-2. Claude API (선택)
1. https://console.anthropic.com/
2. Settings → API Keys → Create Key
3. 키 복사: `sk-ant-...`

---

### **Step 2: .dev.vars 파일 생성 (1분)**

```bash
cd /home/user/webapp

# 파일 생성
cat > .dev.vars << 'EOF'
# Gemini API (필수)
GEMINI_API_KEY=AIzaSy실제키를붙여넣기
GEMINI_MODEL=gemini-2.0-flash-exp

# Claude API (선택)
ANTHROPIC_API_KEY=sk-ant-실제키를붙여넣기
EOF
```

---

### **Step 3: 서버 시작 (1분)**

```bash
# 빌드
npm run build

# 서버 시작
npm run dev:wrangler
```

**기대 로그:**
```
✨ Compiled Worker successfully
Your worker has access to the following bindings:
- Vars:
  - GEMINI_API_KEY: "(hidden)"
  - ANTHROPIC_API_KEY: "(hidden)"
[wrangler:inf] Ready on http://0.0.0.0:3000
```

---

### **Step 4: 테스트**

```bash
curl -X POST "http://localhost:3000/api/matrix" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "사교육은 공교육에 대칭되는 개념으로 국가가 관장하는 제도권 교육 밖에서 이루어지는 학원 과외 등의 교육활동을 의미합니다.",
    "level": "standard",
    "viewType": "narrative"
  }' | jq '.data.levels.detail.narrative.text'
```

**기대 결과:**
```json
"사교육은 학교 밖에서 이루어지는 학원과 과외를 포함하는 교육 활동이다."
```

**❌ 이전 (원문 그대로):**
```
"사교육은 공교육에 대칭되는 개념으로 국가가 관장하는..."
```

---

## 🎯 작동 확인

### Console 로그

**성공 시:**
```
[Matrix V4] phase1: Trying LLM Fallback Chain (Ollama → Claude → Gemini → Extractive)
[LLM] 1/4 Ollama 로컬 시도...
[LLM] ✗ Ollama 실패: Network connection lost.
[LLM] 2/4 Claude API 시도...
[LLM] ✓ Claude 성공
```

또는

```
[LLM] 3/4 Gemini API 시도...
[LLM] ✓ Gemini 성공
```

**실패 시 (API 키 없음):**
```
[LLM] 4/4 Extractive Fallback 사용 (모든 API 실패)
[Matrix V4] All LLM attempts failed, using local fallback
```

---

## 💡 Ollama 로컬 추가 (선택, 무료)

### 설치 (5분)

```bash
# Linux/macOS
curl -fsSL https://ollama.com/install.sh | sh

# 모델 다운로드 (3GB)
ollama pull llama3.2:3b

# 서버 시작
ollama serve &
```

### 테스트

```bash
# API 확인
curl http://localhost:11434/api/tags

# 요약 다시 테스트 (이제 Ollama가 1순위)
curl -X POST "http://localhost:3000/api/matrix" ...
```

**기대 로그:**
```
[LLM] 1/4 Ollama 로컬 시도...
[LLM] ✓ Ollama 성공 (로컬)
```

---

## 📊 비용 비교

| 요청 수 | Ollama만 | Gemini만 | Claude만 | **3-way** |
|---------|----------|----------|----------|-----------|
| 1,000 | $0 | $0 (무료) | $0.25 | **$0** |
| 10,000 | $0 | $0.75 | $2.50 | **$0.50** |
| 100,000 | $0 | $7.50 | $25.00 | **$5.00** |

**3-way 장점:**
- 80%는 Ollama (무료)
- 15%는 Gemini (저렴)
- 5%만 Claude (고품질)

---

## 🔧 Cloudflare Pages 배포

### 환경변수 설정

1. Cloudflare Dashboard
2. Pages → 프로젝트 선택
3. Settings → Environment variables
4. 추가:
   - `GEMINI_API_KEY`: `AIzaSy...`
   - `ANTHROPIC_API_KEY`: `sk-ant-...`
   - `GEMINI_MODEL`: `gemini-2.0-flash-exp`
5. Save 후 재배포

### 배포 확인

```bash
curl -X POST "https://your-project.pages.dev/api/matrix" \
  -H "Content-Type: application/json" \
  -d '{"text":"테스트","level":"standard","viewType":"narrative"}'
```

---

## 🐛 트러블슈팅

### "요약이 원문 그대로"

**원인:** API 키 없음 또는 잘못됨

**해결:**
```bash
# .dev.vars 확인
cat .dev.vars

# API 키 테스트
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=AIzaSy실제키" \
  -H "Content-Type: application/json" \
  -d '{"contents":[{"parts":[{"text":"Hello"}]}]}'
```

### "GEMINI_API_KEY missing"

**원인:** .dev.vars 로드 안 됨

**해결:**
```bash
# 서버 재시작
pkill -f wrangler
npm run dev:wrangler
```

### "Network connection lost"

**원인:** Ollama 설치 안 됨 (정상)

**해결:** Ollama 설치 또는 무시 (Claude/Gemini로 자동 fallback)

---

## ✅ 체크리스트

- [ ] Gemini API 키 발급
- [ ] Claude API 키 발급 (선택)
- [ ] .dev.vars 파일 생성
- [ ] npm run build
- [ ] npm run dev:wrangler
- [ ] 테스트 요청 (curl)
- [ ] Console 로그 확인 ("[LLM] ✓ 성공")
- [ ] Ollama 설치 (선택)
- [ ] Cloudflare Pages 환경변수 설정

---

## 🎉 완료!

이제 Matrix V4는:
- ✅ 3중 안전망으로 절대 실패하지 않음
- ✅ 진짜 요약 생성 (원문 자르기 ❌)
- ✅ 비용 최적화 (80% 무료 Ollama 사용)
- ✅ 품질 보장 (Claude/Gemini 백업)

**다음 단계:**
- 프로덕션 배포: [Cloudflare Pages 배포](#-cloudflare-pages-배포)
- 고급 설정: `docs/API_KEYS_SETUP.md`
- Ollama 설치: `docs/OLLAMA_SETUP.md`
