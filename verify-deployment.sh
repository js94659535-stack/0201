#!/bin/bash
echo "🔍 배포 검증 시작..."
echo ""
echo "1️⃣ GitHub 최신 커밋:"
cd /home/user/webapp && git log --oneline -1
echo ""
echo "2️⃣ 배포 대기 중... (Cloudflare Pages가 빌드 중입니다)"
echo "   예상 완료 시간: $(date -d '+3 minutes' '+%H:%M:%S')"
echo ""
echo "3️⃣ 3분 후 다음 명령어로 확인하세요:"
echo "   curl -s https://YOUR-PROJECT.pages.dev/api/health-check | jq '.buildId'"
echo ""
echo "✅ 예상 BUILD_ID 형식:"
echo "   V4-FORTRESS-LIVE-[2026. 2. 8. 오후 12:XX:XX]-XXXXX"
