#!/bin/bash

echo "=== Matrix V4 진단 스크립트 ==="
echo ""

# 1. 빌드 파일 확인
echo "1. 빌드 파일 확인"
if [ -f "dist/_worker.js" ]; then
  SIZE=$(stat -f%z "dist/_worker.js" 2>/dev/null || stat -c%s "dist/_worker.js" 2>/dev/null)
  echo "   ✅ dist/_worker.js: $SIZE bytes"
  
  # 좀비 코드 확인
  ZOMBIE_COUNT=$(grep -o "_msExtractiveFallback" dist/_worker.js | wc -l)
  echo "   좀비 함수 참조: $ZOMBIE_COUNT 개"
  
  # Phase1 문장 자르기 확인
  SLICE_COUNT=$(grep -o "slice(0, 1)" dist/_worker.js | wc -l)
  echo "   slice(0,1) 패턴: $SLICE_COUNT 개"
else
  echo "   ❌ dist/_worker.js 없음"
fi
echo ""

# 2. 소스 코드 확인
echo "2. 소스 코드 확인"
if [ -f "src/routes/matrix-v4.ts" ]; then
  LINES=$(wc -l < src/routes/matrix-v4.ts)
  echo "   ✅ matrix-v4.ts: $LINES 줄"
  
  # 핵심 함수 존재 여부
  echo "   핵심 함수:"
  grep -q "function isQualityStandardPassed" src/routes/matrix-v4.ts && echo "     ✅ isQualityStandardPassed"
  grep -q "function downsampleFromDetail" src/routes/matrix-v4.ts && echo "     ✅ downsampleFromDetail"
  grep -q "/api/matrix/test-503" src/routes/matrix-v4.ts && echo "     ✅ test-503 엔드포인트"
else
  echo "   ❌ src/routes/matrix-v4.ts 없음"
fi
echo ""

# 3. 프론트엔드 확인
echo "3. 프론트엔드 확인"
if [ -f "public/index.html" ]; then
  # engine 필드 읽기 방식
  if grep -q "const { data, meta, engine, mode, view }" public/index.html; then
    echo "   ✅ 프론트엔드: 최상위에서 engine/mode/view 읽기"
  else
    echo "   ❌ 프론트엔드: 잘못된 경로"
  fi
else
  echo "   ❌ public/index.html 없음"
fi
echo ""

# 4. Git 상태
echo "4. Git 상태"
CURRENT_COMMIT=$(git rev-parse --short HEAD 2>/dev/null)
REMOTE_COMMIT=$(git rev-parse --short origin/main 2>/dev/null)
echo "   로컬 커밋: $CURRENT_COMMIT"
echo "   원격 커밋: $REMOTE_COMMIT"
if [ "$CURRENT_COMMIT" = "$REMOTE_COMMIT" ]; then
  echo "   ✅ 로컬과 원격 동기화됨"
else
  echo "   ⚠️  로컬과 원격 다름"
fi
echo ""

# 5. 환경변수 확인
echo "5. 환경변수 확인 (주의: .env 파일 필요)"
if [ -f ".env" ]; then
  echo "   ✅ .env 파일 존재"
  grep -q "GEMINI_API_KEY" .env && echo "     ✅ GEMINI_API_KEY 설정됨"
  grep -q "LOCAL_LLM_URL" .env && echo "     ✅ LOCAL_LLM_URL 설정됨"
else
  echo "   ⚠️  .env 파일 없음 (Cloudflare 환경변수 사용 중)"
fi
echo ""

echo "=== 진단 완료 ==="
