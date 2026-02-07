#!/bin/bash

echo "=== Cloudflare Pages 배포 후 테스트 ==="
echo ""
echo "⏳ 배포 완료까지 1-2분 대기 중..."
echo ""

# Cloudflare Pages URL (배포 후 업데이트 필요)
PAGES_URL="https://0201.pages.dev"  # 또는 실제 URL

echo "테스트 URL: $PAGES_URL"
echo ""

# Test 1: Health API
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Test 1: Health API"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
curl -s "$PAGES_URL/api/health" | jq '.' 2>/dev/null || curl -s "$PAGES_URL/api/health"
echo ""

# Test 2: Matrix V4
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Test 2: Matrix V4 API"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
curl -s -X POST "$PAGES_URL/api/matrix" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "교육 시스템의 변화는 단순히 기술 도입을 넘어 학습자의 사고방식과 교사의 역할 재정립을 요구한다. 전통적인 주입식 교육에서 벗어나 학습자 중심의 맞춤형 교육이 강조되고 있으며, 이는 교육 철학의 근본적인 전환을 의미한다.",
    "level": "standard",
    "viewType": "narrative"
  }' | jq '.engine, .mode, .view, .ok, .degraded' 2>/dev/null || echo "JSON 파싱 실패"
echo ""

# Test 3: Engine V5
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Test 3: Engine V5 API"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
curl -s -X POST "$PAGES_URL/api/engine" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "교육 시스템의 변화는 단순히 기술 도입을 넘어 학습자의 사고방식과 교사의 역할 재정립을 요구한다.",
    "mode": "standard",
    "viewType": "narrative"
  }' | jq '.ok, .meta.engine' 2>/dev/null || echo "JSON 파싱 실패"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ 테스트 완료"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "예상 결과:"
echo "  Health: ok: true, hasDB: false, hasGeminiKey: true/false"
echo "  Matrix: engine: 'matrix-v4' 또는 'fallback-extractive'"
echo "  Engine: ok: true, meta.engine: 'v5-local'"
echo ""
