#!/bin/bash

# =============================================================================
# KRY8 Portfolio - API Contact Test Script
# Usage: ./scripts/test-api.sh <BASE_URL>
# Example: ./scripts/test-api.sh https://kry8-portfolio-preview.vercel.app
# =============================================================================

BASE_URL="${1:-http://localhost:3000}"
API_URL="$BASE_URL/api/contact"

echo "=========================================="
echo "Testing API: $API_URL"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test 1: Valid request (should send email)
echo -e "${YELLOW}[TEST 1] Valid request (should return 200 + send email)${NC}"
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","message":"Hello from test script, this is a valid test message.","company":"","ts":0}')

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" = "200" ]; then
  echo -e "${GREEN}✓ Status: $HTTP_CODE${NC}"
  echo "  Response: $BODY"
  echo "  → Check inbox for email"
else
  echo -e "${RED}✗ Status: $HTTP_CODE${NC}"
  echo "  Response: $BODY"
fi
echo ""

# Test 2: Honeypot trap (should NOT send email)
echo -e "${YELLOW}[TEST 2] Honeypot filled (should return 200 but NO email)${NC}"
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{"name":"Bot","email":"bot@spam.com","message":"Buy cheap stuff now!","company":"FILLED_HONEYPOT","ts":0}')

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" = "200" ]; then
  echo -e "${GREEN}✓ Status: $HTTP_CODE (neutral response - good!)${NC}"
  echo "  Response: $BODY"
  echo "  → Should NOT receive email (honeypot triggered)"
else
  echo -e "${RED}✗ Status: $HTTP_CODE${NC}"
  echo "  Response: $BODY"
fi
echo ""

# Test 3: Timing trap (submitted too fast)
echo -e "${YELLOW}[TEST 3] Timing trap - ts=now (should return 200 but NO email)${NC}"
CURRENT_TS=$(date +%s)000  # Current timestamp in ms
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Fast Bot\",\"email\":\"fast@bot.com\",\"message\":\"Submitted too fast!\",\"company\":\"\",\"ts\":$CURRENT_TS}")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" = "200" ]; then
  echo -e "${GREEN}✓ Status: $HTTP_CODE (neutral response - good!)${NC}"
  echo "  Response: $BODY"
  echo "  → Should NOT receive email (timing trap triggered)"
else
  echo -e "${RED}✗ Status: $HTTP_CODE${NC}"
  echo "  Response: $BODY"
fi
echo ""

# Test 4: Too many URLs (spam heuristic)
echo -e "${YELLOW}[TEST 4] Too many URLs (should return 200 but NO email)${NC}"
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{"name":"Spammer","email":"spam@example.com","message":"Check https://spam1.com and https://spam2.com and https://spam3.com for deals!","company":"","ts":0}')

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" = "200" ]; then
  echo -e "${GREEN}✓ Status: $HTTP_CODE (neutral response - good!)${NC}"
  echo "  Response: $BODY"
  echo "  → Should NOT receive email (too many URLs)"
else
  echo -e "${RED}✗ Status: $HTTP_CODE${NC}"
  echo "  Response: $BODY"
fi
echo ""

# Test 5: Invalid data (missing required fields)
echo -e "${YELLOW}[TEST 5] Invalid data - missing fields (should return 200 neutral)${NC}"
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{"name":"X"}')

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" = "200" ]; then
  echo -e "${GREEN}✓ Status: $HTTP_CODE (neutral response - good!)${NC}"
  echo "  Response: $BODY"
else
  echo -e "${RED}✗ Status: $HTTP_CODE${NC}"
  echo "  Response: $BODY"
fi
echo ""

# Test 6: GET method (should be blocked)
echo -e "${YELLOW}[TEST 6] GET method (should return 405)${NC}"
RESPONSE=$(curl -s -w "\n%{http_code}" -X GET "$API_URL")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" = "405" ]; then
  echo -e "${GREEN}✓ Status: $HTTP_CODE (method not allowed - correct!)${NC}"
else
  echo -e "${RED}✗ Status: $HTTP_CODE${NC}"
  echo "  Response: $BODY"
fi
echo ""

echo "=========================================="
echo "Testing Headers"
echo "=========================================="
echo ""

echo -e "${YELLOW}Security Headers:${NC}"
curl -sI "$BASE_URL" | grep -iE "content-security-policy|strict-transport-security|x-content-type-options|referrer-policy|permissions-policy|x-frame-options" | while read -r line; do
  echo -e "${GREEN}✓${NC} $line"
done

echo ""
echo "=========================================="
echo "Tests completed!"
echo "=========================================="
