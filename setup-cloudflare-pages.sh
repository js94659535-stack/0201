#!/bin/bash

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║     Cloudflare Pages 자동 배포 설정 가이드                      ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

# 색상 정의
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}📋 설정 정보${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "GitHub 저장소: js94659535-stack/0201"
echo "Branch: main"
echo "현재 Worker: calm-fire-35e3.9535mind.workers.dev"
echo ""

echo -e "${YELLOW}⚠️  주의: 이 스크립트는 가이드입니다. 실제 설정은 브라우저에서 수행하세요.${NC}"
echo ""

echo -e "${GREEN}1단계: Cloudflare Dashboard 접속${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "브라우저에서 열기: https://dash.cloudflare.com/"
echo ""
read -p "Dashboard를 열었습니까? (y/n): " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Dashboard를 먼저 열어주세요."
    exit 1
fi

echo ""
echo -e "${GREEN}2단계: Pages 프로젝트 생성${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1. 왼쪽 메뉴에서 'Workers & Pages' 클릭"
echo "2. 'Create application' 버튼 클릭"
echo "3. 'Pages' 탭 선택"
echo "4. 'Connect to Git' 클릭"
echo ""
read -p "여기까지 완료했습니까? (y/n): " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "위 단계를 먼저 완료해주세요."
    exit 1
fi

echo ""
echo -e "${GREEN}3단계: GitHub 저장소 연결${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1. 'Connect GitHub' 클릭 (최초 1회)"
echo "2. GitHub 로그인 및 권한 승인"
echo "3. Repository 검색: '0201'"
echo "4. 'js94659535-stack/0201' 선택"
echo "5. 'Begin setup' 클릭"
echo ""
read -p "저장소를 선택했습니까? (y/n): " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "저장소를 먼저 선택해주세요."
    exit 1
fi

echo ""
echo -e "${GREEN}4단계: Build 설정${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "다음 값을 입력하세요:"
echo ""
echo "  Project name: mindstory-0201"
echo "  Production branch: main"
echo "  Framework preset: None"
echo "  Build command: npm run build"
echo "  Build output directory: dist"
echo "  Root directory: (비워두기)"
echo ""
read -p "Build 설정을 완료했습니까? (y/n): " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Build 설정을 먼저 완료해주세요."
    exit 1
fi

echo ""
echo -e "${GREEN}5단계: 환경 변수 설정${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Environment variables 섹션에서:"
echo ""
echo "  Variable name: GEMINI_API_KEY"
echo "  Value: [당신의 Gemini API 키]"
echo ""
echo "  Variable name: NODE_VERSION"
echo "  Value: 18"
echo ""
read -p "환경 변수를 추가했습니까? (y/n): " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "⚠️  환경 변수가 없으면 LLM이 작동하지 않습니다!"
    echo "나중에 Settings → Environment variables에서 추가 가능합니다."
fi

echo ""
echo -e "${GREEN}6단계: 배포 시작${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "'Save and Deploy' 버튼 클릭"
echo ""
echo "배포 진행 중... (약 2-3분 소요)"
echo ""
read -p "배포가 시작되었습니까? (y/n): " -n 1 -r
echo ""

echo ""
echo -e "${GREEN}✅ 설정 완료!${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "이제부터 'git push origin main'을 하면 자동으로 배포됩니다!"
echo ""
echo "배포 URL은 다음 중 하나입니다:"
echo "  - https://mindstory-0201.pages.dev"
echo "  - https://0201.pages.dev"
echo "  - 또는 Cloudflare에서 생성한 랜덤 URL"
echo ""
echo "배포 완료 후 아래 명령어로 테스트하세요:"
echo ""
echo "  curl https://your-url.pages.dev/api/health"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
