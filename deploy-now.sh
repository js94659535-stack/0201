#!/bin/bash

echo "=== Cloudflare Worker 배포 스크립트 ==="
echo ""
echo "⚠️  이 스크립트는 Wrangler CLI를 사용합니다."
echo ""

# 1. 최신 빌드
echo "📦 Step 1: 빌드 중..."
npm run build
if [ $? -ne 0 ]; then
  echo "❌ 빌드 실패!"
  exit 1
fi

echo "✅ 빌드 완료: dist/_worker.js"
ls -lh dist/_worker.js

echo ""
echo "📤 Step 2: Wrangler 배포 준비"
echo ""
echo "현재 Worker URL: https://calm-sun-3249.9535mind.workers.dev/"
echo ""
echo "배포 명령어:"
echo ""
echo "  npx wrangler deploy"
echo ""
echo "또는 새 Worker로 배포:"
echo ""
echo "  npx wrangler deploy --name mindstory-matrix-v4-new"
echo ""
echo "⚠️  환경 변수 설정 필요:"
echo "  GEMINI_API_KEY를 Cloudflare Dashboard에서 설정하세요!"
echo ""
echo "설정 방법:"
echo "  1. https://dash.cloudflare.com/"
echo "  2. Workers & Pages → calm-sun-3249 (또는 새 Worker)"
echo "  3. Settings → Variables and Secrets"
echo "  4. Add variable:"
echo "     Name: GEMINI_API_KEY"
echo "     Value: your_actual_api_key"
echo "  5. Save"
echo ""

read -p "지금 배포하시겠습니까? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "🚀 배포 시작..."
  npx wrangler deploy
else
  echo "배포를 건너뛰었습니다."
  echo ""
  echo "수동 배포:"
  echo "  cd /home/user/webapp"
  echo "  npx wrangler deploy"
fi
