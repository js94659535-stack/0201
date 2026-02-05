# Ollama 로컬 LLM 설정 가이드

## 🎯 Ollama란?

- **무료 오픈소스** 로컬 LLM 실행 도구
- **프라이버시 보장**: 데이터가 외부로 나가지 않음
- **무제한 사용**: API 비용 없음
- **빠른 속도**: 로컬에서 실행

---

## 📦 설치 방법

### Linux / macOS

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

### Windows

[https://ollama.com/download](https://ollama.com/download)에서 다운로드

---

## 🚀 모델 다운로드

### 추천 모델

```bash
# 1. Llama 3.2 (3GB) - 빠르고 가벼움
ollama pull llama3.2:3b

# 2. Gemma2 (9GB) - 고품질 한국어
ollama pull gemma2:9b

# 3. Qwen2.5 (7GB) - 중국어/한국어 최적화
ollama pull qwen2.5:7b
```

---

## ⚡ 서버 시작

```bash
# 백그라운드로 실행
ollama serve &

# 또는 시스템 서비스로 등록 (자동 시작)
# Linux/macOS는 설치 시 자동으로 systemd/launchd 등록됨
```

---

## 🔍 테스트

```bash
# 모델 목록 확인
ollama list

# 대화 테스트
ollama run llama3.2:3b

# API 테스트
curl http://localhost:11434/api/generate -d '{
  "model": "llama3.2:3b",
  "prompt": "한국어로 '인공지능'을 한 문장으로 설명해주세요.",
  "stream": false
}'
```

---

## ✅ Matrix V4와 연동 확인

Ollama가 정상 작동하면:

1. 로컬 개발 서버 시작:
   ```bash
   cd /home/user/webapp
   npm run dev:wrangler
   ```

2. 요약 테스트:
   ```bash
   curl -X POST "http://localhost:3000/api/matrix" \
     -H "Content-Type: application/json" \
     -d '{"text":"인공지능은 학습하는 기술입니다.","level":"standard","viewType":"narrative"}'
   ```

3. Console 로그 확인:
   ```
   [LLM] 1/4 Ollama 로컬 시도...
   [LLM] ✓ Ollama 성공 (로컬)
   ```

---

## 🎯 Fallback Chain 순서

Matrix V4는 다음 순서로 LLM을 시도합니다:

1. **Ollama 로컬** (localhost:11434)
   - 무료, 빠름, 프라이버시
   
2. **Claude API** (ANTHROPIC_API_KEY)
   - 안정적, 고품질
   
3. **Gemini API** (GEMINI_API_KEY)
   - 빠름, 저렴
   
4. **Extractive Fallback**
   - 원문 추출 (최후의 수단)

---

## 📊 리소스 요구사항

| 모델 | 크기 | 메모리 | 속도 | 품질 |
|------|------|--------|------|------|
| llama3.2:3b | 3GB | 4GB | ⚡⚡⚡ | ⭐⭐⭐ |
| gemma2:9b | 9GB | 12GB | ⚡⚡ | ⭐⭐⭐⭐ |
| qwen2.5:7b | 7GB | 8GB | ⚡⚡ | ⭐⭐⭐⭐ |

**추천**: llama3.2:3b (가볍고 빠름)

---

## 🐛 트러블슈팅

### Ollama 연결 실패

```bash
# 서버 상태 확인
curl http://localhost:11434/api/tags

# 재시작
pkill ollama
ollama serve &
```

### 포트 충돌

```bash
# 다른 포트로 시작
OLLAMA_HOST=0.0.0.0:11435 ollama serve &

# 코드에서 포트 변경 (matrix-v4.ts)
http://localhost:11435/api/generate
```

---

## 📚 참고 자료

- 공식 사이트: https://ollama.com
- 모델 라이브러리: https://ollama.com/library
- GitHub: https://github.com/ollama/ollama
