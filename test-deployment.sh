#!/bin/bash

WORKER_URL="https://calm-sun-3249.9535mind.workers.dev"

echo "=== Cloudflare Worker 배포 테스트 ==="
echo ""
echo "Worker URL: $WORKER_URL"
echo ""

# Test 1: Root
echo "Test 1: Root (/) - HTML 페이지"
curl -s -w "\nHTTP: %{http_code}\n" "$WORKER_URL/" | head -5
echo ""

# Test 2: Health API
echo "Test 2: Health API (/api/health)"
curl -s -w "\nHTTP: %{http_code}\n" "$WORKER_URL/api/health"
echo ""

# Test 3: Matrix V4
echo "Test 3: Matrix V4 (/api/matrix)"
curl -s -w "\nHTTP: %{http_code}\n" -X POST "$WORKER_URL/api/matrix" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "테스트 텍스트입니다.",
    "level": "standard",
    "viewType": "narrative"
  }'
echo ""

# Test 4: Engine V5
echo "Test 4: Engine V5 (/api/engine)"
curl -s -w "\nHTTP: %{http_code}\n" -X POST "$WORKER_URL/api/engine" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "테스트 텍스트입니다.",
    "mode": "standard",
    "viewType": "narrative"
  }'
echo ""

echo "=== 테스트 완료 ==="
echo ""
echo "예상 결과:"
echo "  Test 1: HTTP 200 (HTML)"
echo "  Test 2: HTTP 200 (JSON with ok: true)"
echo "  Test 3: HTTP 200 or 503 (Matrix V4)"
echo "  Test 4: HTTP 200 (Engine V5)"
echo ""
echo "실제 결과가 404라면 Worker가 구버전입니다!"
