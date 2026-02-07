# 🔍 Cloudflare 환경 변수 재확인 가이드

## 즉시 확인 체크리스트

### 1. Dashboard 접속
- URL: https://dash.cloudflare.com/
- Workers & Pages → Your Project

### 2. Settings → Environment variables 확인

#### ✅ 확인 사항
- [ ] Variable name: `GEMINI_API_KEY` (정확히 대문자)
- [ ] Environment: **Production** (NOT Preview!)
- [ ] Value: 비어있지 않음
- [ ] Value 형식: `AIzaSy...` (약 39자)
- [ ] 저장 완료 확인

#### ❌ 흔한 실수
- Variable name: `Gemini_Api_Key` (대소문자 틀림)
- Variable name: `GEMINI_KEY` (이름 틀림)
- Environment: Preview only (Production에 설정 안 됨)
- Value: 공백 포함 또는 앞뒤 공백
- 저장 안 함 (Add 후 Save 버튼 안 눌렀음)

---

## 설정 방법 (처음부터)

### Step 1: Cloudflare Dashboard
1. https://dash.cloudflare.com/
2. Workers & Pages
3. Your Project 선택

### Step 2: Environment variables
1. 왼쪽 메뉴: Settings
2. Environment variables 클릭
3. Production 탭 선택 (중요!)

### Step 3: Add variable
1. "Add variable" 버튼 클릭
2. 입력:
   ```
   Variable name: GEMINI_API_KEY
   Value: [당신의 API 키]
   ```
3. **저장 확인**: Save 버튼 클릭

### Step 4: 재배포
- Deployments 탭으로 이동
- "Retry deployment" 클릭
- 또는 새 Git push로 자동 배포

---

## API 키 형식 확인

### ✅ 올바른 형식
```
AIzaSyBa1234567890abcdefghijklmnopqrstuv
```
- 시작: `AIzaSy`
- 길이: 약 39자
- 문자: 영문 대소문자 + 숫자

### ❌ 잘못된 형식
```
AIza Sy1234...  (공백 포함)
 AIzaSy1234...  (앞에 공백)
AIzaSy1234...   (뒤에 공백)
```

---

## Gemini API 키 재발급

### 필요한 경우
- 키가 만료됨
- 키를 잃어버림
- 키가 잘못됨

### 발급 방법
1. https://aistudio.google.com/app/apikey
2. "Create API key" 클릭
3. 프로젝트 선택
4. 키 복사 (AIzaSy로 시작)
5. Cloudflare에 붙여넣기

---

## 배포 후 로그 확인

### Cloudflare Pages 로그
1. Deployments 탭
2. 최신 배포 클릭
3. "View build" 클릭
4. 로그에서 검색:
   ```
   [ENV DEBUG] GEMINI_API_KEY:
   ```

### 브라우저 콘솔 로그
1. F12 → Console 탭
2. 요약 버튼 클릭
3. 로그 확인:
   ```
   [ENV DEBUG] GEMINI_API_KEY: AIzaSy1234... (length: 39)
   ```
   또는
   ```
   [ENV DEBUG] GEMINI_API_KEY: NOT SET
   ```

---

## 문제별 해결 방법

### 문제 1: `NOT SET` 로그
**원인:** 환경 변수가 전달되지 않음
**해결:**
1. Cloudflare Dashboard 확인
2. Production 환경에 설정됐는지 확인
3. 재배포

### 문제 2: `EMPTY` 로그
**원인:** 값이 빈 문자열
**해결:**
1. 환경 변수 값 다시 입력
2. 공백 제거 후 저장
3. 재배포

### 문제 3: HTTP 401 에러
**원인:** API 키가 잘못됨
**해결:**
1. Google AI Studio에서 키 재확인
2. 새 키 발급
3. Cloudflare에 재설정
4. 재배포

### 문제 4: HTTP 429 에러
**원인:** API 할당량 초과
**해결:**
1. Google Cloud Console 확인
2. 할당량 증가 요청
3. 또는 다른 프로젝트의 키 사용

---

## 최종 확인

배포 완료 후:
1. ✅ 브라우저 콘솔에 키 길이 표시
2. ✅ Phase2로 감지됨
3. ✅ Gemini API 시도 로그
4. ✅ HTTP 200 응답
5. ✅ 요약 성공

**모든 로그를 캡처해서 공유하면 즉시 진단 가능합니다!**
