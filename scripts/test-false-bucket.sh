#!/bin/bash
# FALSE Bucket 테스트 스크립트
# D1이 설정된 환경에서 실행

set -e

echo "🧪 FALSE Bucket 테스트 시작..."
echo ""

# 1. 짧은 텍스트 (INVALID_TEXT - 기록 안됨)
echo "Test 1: 짧은 텍스트 (20자 미만)"
curl -s -X POST "http://localhost:8787/api/matrix" \
  -H "Content-Type: application/json" \
  -d '{"text":"test","level":"brief"}' | jq '.ok, .error.code'
echo ""

# 2. JSON 파싱 실패 시뮬레이션은 불가능 (Gemini 응답 필요)
# DETAIL_JSON_PARSE_FAIL은 실제 Gemini 호출 시에만 발생

# 3. 정상 요청으로 시스템 작동 확인
echo "Test 2: 정상 요청 (phase1 로컬 폴백)"
RESPONSE=$(curl -s -X POST "http://localhost:8787/api/matrix" \
  -H "Content-Type: application/json" \
  -d '{"text":"인공지능은 데이터를 학습하여 패턴을 인식하는 기술입니다. 머신러닝과 딥러닝이 대표적입니다.","level":"brief"}')

echo $RESPONSE | jq '.ok, .meta.phase, .meta.qa.cross_ok'
echo ""

# 4. FALSE Bucket 조회 (D1이 있을 경우)
echo "Test 3: FALSE Bucket 조회 시도"
echo "Note: D1 바인딩이 설정되어 있어야 합니다."
echo ""

# 5. 마이그레이션 적용 방법 안내
echo "📝 D1 마이그레이션 적용 방법:"
echo ""
echo "1. Cloudflare 대시보드에서 D1 데이터베이스 생성"
echo "   wrangler d1 create webapp-db"
echo ""
echo "2. wrangler.jsonc에 D1 바인딩 추가:"
echo '   [[d1_databases]]'
echo '   binding = "DB"'
echo '   database_name = "webapp-db"'
echo '   database_id = "your-database-id"'
echo ""
echo "3. 마이그레이션 적용:"
echo "   wrangler d1 execute webapp-db --file=migrations/0003_false_bucket.sql"
echo ""
echo "4. FALSE Bucket 조회:"
echo "   wrangler d1 execute webapp-db --command=\"SELECT * FROM ms_false_bucket ORDER BY created_at DESC LIMIT 5\""
echo ""

echo "✅ 테스트 스크립트 완료"
