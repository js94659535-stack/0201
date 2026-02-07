# 🚀 Cloudflare Pages 배포 가이드

## 문제 상황
- GitHub 저장소: https://github.com/js94659535-stack/0201
- Cloudflare Worker: https://calm-fire-35e3.9535mind.workers.dev/
- **배포된 코드가 다른 프로젝트입니다!**

## 해결 방법

### Option 1: Cloudflare Pages 연결 (권장)

1. **Cloudflare Dashboard 접속**
   - https://dash.cloudflare.com/

2. **Workers & Pages → Create application**
   - "Pages" 탭 선택
   - "Connect to Git" 클릭

3. **GitHub 저장소 연결**
   - Repository: `js94659535-stack/0201`
   - Branch: `main`

4. **Build 설정**
   - Framework preset: `None`
   - Build command: `npm run build`
   - Build output directory: `dist`

5. **환경 변수 설정**
   ```
   GEMINI_API_KEY = your_actual_api_key_here
   NODE_VERSION = 18
   ```

6. **Deploy**
   - "Save and Deploy" 클릭
   - 배포 완료까지 약 1-2분 대기

### Option 2: Wrangler로 직접 배포

```bash
# 1. Wrangler 설치 (없다면)
npm install -g wrangler

# 2. Cloudflare 로그인
wrangler login

# 3. wrangler.toml 생성
cat > wrangler.toml << 'EOF'
name = "mindstory-matrix-v4"
main = "dist/_worker.js"
compatibility_date = "2024-01-01"

[env.production]
vars = { NODE_ENV = "production" }

[[env.production.d1_databases]]
binding = "DB"
database_name = "mindstory_db"
database_id = "your_d1_database_id"
EOF

# 4. 배포
cd /home/user/webapp
npm run build
wrangler deploy
```

### Option 3: 현재 Worker 덮어쓰기

**⚠️ 주의: 이 방법은 기존 Worker를 완전히 덮어씁니다!**

```bash
# 1. Worker 이름 확인
# Cloudflare Dashboard → Workers & Pages → "calm-fire-35e3" 클릭

# 2. wrangler.toml에 이름 추가
echo 'name = "calm-fire-35e3"' >> wrangler.toml

# 3. 배포
wrangler deploy
```

## 배포 확인

```bash
# Health 체크
curl https://your-new-url.pages.dev/api/health | jq '.'

# Matrix V4 테스트
curl -X POST "https://your-new-url.pages.dev/api/matrix" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "테스트 텍스트입니다.",
    "level": "standard",
    "viewType": "narrative"
  }' | jq '.engine'

# 예상 출력: "matrix-v4"
```

## 문제 해결

### Q: "GEMINI_API_KEY is not set" 에러
**A:** Cloudflare Dashboard → Settings → Environment variables에서 추가

### Q: 여전히 테스트 메시지가 나옴
**A:** 브라우저 캐시 문제. Ctrl+Shift+R로 강제 새로고침

### Q: 503 에러가 계속 나옴
**A:** GEMINI_API_KEY가 올바르게 설정되었는지 확인

---

## 🎯 즉시 실행 (가장 빠른 방법)

```bash
# 1. Wrangler 설치
npm install -g wrangler

# 2. 로그인
wrangler login

# 3. 배포
cd /home/user/webapp
npm run build
wrangler deploy --name mindstory-matrix-v4
```

배포 완료 후 새 URL이 출력됩니다!
