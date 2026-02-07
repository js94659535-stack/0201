#!/bin/bash

# Cloudflare Pages 배포 URL (실제 도메인으로 교체 필요)
API_URL="${API_URL:-https://your-cloudflare-pages-url.pages.dev/api/matrix}"

# 테스트 요청
curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -H "Cache-Control: no-cache" \
  -d '{
    "text": "교육 시스템의 변화는 단순히 교육 방법의 변화뿐만 아니라 사회 전체의 인식 변화를 필요로 한다. 교사의 역할이 지식 전달자에서 학습 촉진자로 바뀌면서, 학생들은 수동적 학습자가 아닌 능동적 참여자가 되어야 한다. 이러한 변화는 교육과정, 평가 방식, 그리고 학교 문화 전반에 걸친 혁신을 요구한다.",
    "level": "standard",
    "viewType": "narrative"
  }' \
  2>/dev/null | jq '.' || echo "Failed to parse JSON response"

