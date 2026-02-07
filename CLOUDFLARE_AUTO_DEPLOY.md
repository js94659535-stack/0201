# 🚀 Cloudflare 자동 배포 설정 가이드

## 목표
GitHub에 `git push`하면 **자동으로 Cloudflare에 배포**

---

## 방법 1: Cloudflare Pages (권장 ⭐)

### 1단계: Cloudflare Pages 프로젝트 생성

1. **Cloudflare Dashboard 접속**
   - https://dash.cloudflare.com/

2. **Workers & Pages → Create application**
   - "Pages" 탭 선택
   - "Connect to Git" 클릭

3. **GitHub 저장소 연결**
   - GitHub 계정 연결 (최초 1회)
   - Repository 선택: `js94659535-stack/0201`
   - Branch: `main` 선택

4. **Build 설정**
   ```
   Framework preset: None
   Build command: npm run build
   Build output directory: dist
   Root directory: (leave empty)
   ```

5. **환경 변수 설정**
   ```
   GEMINI_API_KEY = your_actual_api_key_here
   NODE_VERSION = 18
   ```

6. **Save and Deploy** 클릭

### 2단계: 배포 완료 대기
- 첫 배포: 약 2-3분
- 새 URL 생성: `https://0201.pages.dev` 또는 커스텀 도메인

### 3단계: 자동 배포 확인
```bash
# 로컬에서 테스트 커밋
cd /path/to/your/webapp
echo "# Test" >> README.md
git add README.md
git commit -m "test: Auto deploy test"
git push origin main

# Cloudflare Dashboard에서 자동 배포 시작 확인
# Workers & Pages → Your Project → Deployments
```

---

## 방법 2: Wrangler GitHub Actions (대안)

GitHub Actions를 사용하여 자동 배포 (Worker 방식)

### 1단계: Cloudflare API Token 생성

1. **Cloudflare Dashboard**
   - https://dash.cloudflare.com/profile/api-tokens

2. **Create Token**
   - Template: "Edit Cloudflare Workers"
   - 또는 Custom Token:
     - Permissions:
       - Account → Workers Scripts → Edit
       - Account → Account Settings → Read

3. **Token 복사** (나중에 다시 볼 수 없음!)

### 2단계: GitHub Secrets 설정

1. **GitHub 저장소**
   - https://github.com/js94659535-stack/0201

2. **Settings → Secrets and variables → Actions**

3. **New repository secret** 추가:
   ```
   Name: CLOUDFLARE_API_TOKEN
   Value: [위에서 복사한 토큰]
   ```

4. **Account ID도 추가**:
   ```
   Name: CLOUDFLARE_ACCOUNT_ID
   Value: [Dashboard에서 복사]
   ```
   - Account ID 위치: Cloudflare Dashboard → Workers & Pages → 오른쪽 사이드바

### 3단계: GitHub Actions Workflow 생성

로컬 터미널에서:
```bash
cd /path/to/your/webapp

# Workflow 파일 생성
mkdir -p .github/workflows

cat > .github/workflows/deploy.yml << 'EOF'
name: Deploy to Cloudflare Workers

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to Cloudflare Workers
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          
      - name: Output deployment URL
        run: |
          echo "Deployed to: https://calm-fire-35e3.9535mind.workers.dev/"
EOF

# 커밋 및 푸시
git add .github/workflows/deploy.yml
git commit -m "ci: Add GitHub Actions auto deploy"
git push origin main
```

### 4단계: 배포 확인
- GitHub → Actions 탭에서 배포 진행 상황 확인
- 성공 시 Worker가 자동 업데이트됨

---

## 방법 3: Cloudflare API를 사용한 수동 설정 (고급)

### Wrangler CLI로 프로젝트 설정

```bash
# 1. Wrangler 설치
npm install -g wrangler

# 2. 로그인
wrangler login

# 3. Pages 프로젝트 생성
wrangler pages project create 0201 \
  --production-branch main

# 4. GitHub 연결
wrangler pages deployment create dist \
  --project-name 0201 \
  --branch main
```

---

## 비교표

| 방법 | 장점 | 단점 | 추천도 |
|------|------|------|--------|
| **Cloudflare Pages** | - 가장 간단<br>- UI에서 모든 설정<br>- 자동 프리뷰 배포 | - Worker 기능 일부 제한 | ⭐⭐⭐⭐⭐ |
| **GitHub Actions** | - Worker 완전 지원<br>- 커스텀 워크플로우 | - Secret 설정 필요<br>- Workflow 관리 필요 | ⭐⭐⭐⭐ |
| **Wrangler CLI** | - 완전한 제어<br>- 로컬 테스트 용이 | - 수동 배포<br>- 자동화 없음 | ⭐⭐⭐ |

---

## 추천 방법

### 🌟 **가장 쉬운 방법: Cloudflare Pages**

1. https://dash.cloudflare.com/
2. Workers & Pages → Create → Pages → Connect to Git
3. `js94659535-stack/0201` 선택
4. Build: `npm run build`, Output: `dist`
5. 환경 변수: `GEMINI_API_KEY`
6. Deploy!

**이후 `git push`할 때마다 자동 배포됩니다!** 🎉

---

## 문제 해결

### Q: GitHub 저장소가 안 보임
**A:** Cloudflare에 GitHub 앱 권한 부여 필요
- GitHub → Settings → Applications → Cloudflare Pages
- Repository access → Select repositories → 0201

### Q: 빌드 실패
**A:** Build 명령어 확인
- `npm run build` → `npm ci && npm run build`로 변경

### Q: 환경 변수가 작동 안 함
**A:** 
1. Cloudflare Pages → Settings → Environment variables
2. Production 탭에서 추가
3. Redeploy

---

## 다음 단계

1. ✅ Cloudflare Pages 생성
2. ✅ GitHub 저장소 연결
3. ✅ 자동 배포 확인
4. ✅ 환경 변수 설정
5. ✅ 테스트 커밋 푸시

**모든 설정이 완료되면 이 문서의 맨 위 URL을 알려주세요!**
