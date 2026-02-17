#!/bin/sh
set -eu

API_URL="${API_URL:-http://localhost:4321/api/config}"
NEW_URL="${1:-}"
TOKEN="${2:-}"

if [ -z "$NEW_URL" ] || [ -z "$TOKEN" ]; then
  echo "Missing required arguments: <new_url> <token>"
  echo "Usage: sh scripts/test-update-config.sh <new_url> <token>"
  exit 1
fi

printf 'POST %s\n' "$API_URL"
printf 'url=%s\n' "$NEW_URL"

curl -sS -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d "{\"url\":\"$NEW_URL\"}"

echo
