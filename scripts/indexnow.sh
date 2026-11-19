#!/usr/bin/env bash
# indexnow.sh — แจ้ง Bing/Yandex/Seznam ผ่าน IndexNow ว่าหน้าใน sitemap.xml มีของใหม่ (rebuild-prerender.sh เรียกหลัง deploy)
# ChatGPT ค้นเว็บผ่านดัชนี Bing — ไม่แจ้ง Bing อาจใช้เวลาหลายสัปดาห์กว่าจะเจอบทความใหม่
# คีย์ไม่ใช่ความลับ (IndexNow ให้วางไฟล์คีย์เปิดสาธารณะที่ราก) — อยู่ที่ public/<คีย์>.txt
# ล้มก็แค่ log ไม่ทำให้ deploy ล้ม
set -uo pipefail
DIR="$(cd "$(dirname "$0")/.." && pwd)"
HOST=tanawat-lawyer.com
keyfile=$(ls "$DIR"/public/*.txt 2>/dev/null | grep -E '/[0-9a-f]{32}\.txt$' | head -1)
[ -n "$keyfile" ] || { echo "indexnow: ไม่พบไฟล์คีย์ใน public/"; exit 0; }
key=$(basename "$keyfile" .txt)
[ -f "$DIR/dist/sitemap.xml" ] || { echo "indexnow: ไม่มี dist/sitemap.xml"; exit 0; }
body=$(python3 - "$DIR/dist/sitemap.xml" "$HOST" "$key" <<'PY'
import json, re, sys
urls = re.findall(r"<loc>([^<]+)</loc>", open(sys.argv[1], encoding="utf-8").read())
host, key = sys.argv[2], sys.argv[3]
print(json.dumps({"host": host, "key": key, "keyLocation": f"https://{host}/{key}.txt", "urlList": urls[:10000]}))
PY
)
code=$(curl -s -o /dev/null -w '%{http_code}' -m 30 -H 'Content-Type: application/json; charset=utf-8' \
    --data "$body" https://api.indexnow.org/indexnow)
echo "indexnow: ส่ง $(grep -o '<loc>' "$DIR/dist/sitemap.xml" | wc -l) URL → HTTP $code (200/202 = รับแล้ว)"
