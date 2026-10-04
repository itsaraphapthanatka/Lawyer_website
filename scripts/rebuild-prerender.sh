#!/usr/bin/env bash
# rebuild-prerender.sh — build หน้า prerender ใหม่เมื่อ "ข้อมูลใน API" หรือ "โค้ดบน main" เปลี่ยน แล้ว deploy
#
# เว็บนี้ prerender ด้วย vite-react-ssg: HTML ที่บอท/Google เห็นคือ snapshot ของข้อมูลตอน build
# แอดมินแก้หน้าแรก/บทความแล้วคนดูเห็นทันที (useEffect ดึงสด) แต่บอทจะเห็นต่อเมื่อ build ใหม่ — cron รายวันเรียกสคริปต์นี้
#
# ลายนิ้วมือ = sha256 ของ API สาธารณะทุก endpoint + commit ของ main → ไม่เปลี่ยนก็จบเงียบ ๆ ไม่ build ไม่ commit
# (ชื่อไฟล์ manifest ของ vite-react-ssg สุ่มใหม่ทุก build จึงเทียบ dist ตรง ๆ ไม่ได้)
# build ใน worktree ที่มี node_modules ถูกชุด แล้ว ff-merge เข้า main ซึ่ง edge bind-mount dist อยู่ = deploy
# ล้มขั้นไหน (API ล่ม, build พัง, หน้าแรกไม่มีเนื้อหา) → exit ก่อนแตะของจริง
set -euo pipefail
R=/website/tanawat-lawyer.com/html/Lawyer_website      # checkout ที่ edge เสิร์ฟ dist (branch main)
WT=/website/tanawat-lawyer.com/ssg-worktree             # worktree สำหรับ build
STAMP=/website/tanawat-lawyer.com/.prerender-stamp
API=https://tanawat-lawyer.com/api
UIDGID="$(id -u):$(id -g)"
log() { echo "$(date '+%F %T') $*"; }

# 1) ลายนิ้วมือ
data=""
for e in hero about practice-areas process-steps experts testimonials trust-logos blogs; do
    body=$(curl -sf --max-time 30 "$API/$e") || { log "API /$e ล้ม — ไม่ build"; exit 1; }
    data="$data$body"
done
data=$(printf '%s' "$data" | sha256sum | cut -c1-16)
# ลายนิ้วมือของ "ซอร์ส" ไม่นับ dist/node_modules — commit ที่สคริปต์นี้สร้างเองแตะแค่ dist จึงไม่ทำให้ build วนซ้ำ
# (รอบแรกใช้ commit ของ main ตรง ๆ แล้ว deploy ก็เลื่อน main → รอบถัดไปเห็นว่า "เปลี่ยน" อีก build ซ้ำทุกวัน)
src=$(git -C "$R" ls-tree -r HEAD | grep -vE $'\t(dist|node_modules)/' | sha256sum | cut -c1-12)
want="$data $src"
if [ -f "$STAMP" ] && [ "$(cat "$STAMP")" = "$want" ]; then
    exit 0
fi
log "มีการเปลี่ยนแปลง (data=$data src=$src) — build ใหม่"

# 2) worktree ตาม main · ลง dependency ใหม่ถ้า lockfile เปลี่ยน
git -C "$WT" merge -q --ff-only main
if [ "$WT/package-lock.json" -nt "$WT/node_modules/.package-lock.json" ]; then
    log "package-lock เปลี่ยน — npm ci"
    docker run --rm --dns 1.1.1.1 -v "$WT:/app" -w /app node:22-slim \
        sh -c "npm ci --no-audit --no-fund --loglevel=error && chown -R $UIDGID /app/node_modules"
fi

# 3) build (ดึง API ตอน build ใน container → ใช้ DNS สาธารณะ)
docker run --rm --dns 1.1.1.1 -v "$WT:/app" -w /app node:22-slim \
    sh -c "npm run build --silent 2>&1 | grep -E 'error|Error|Build finished' | tail -5; chown -R $UIDGID /app/dist /app/node_modules/.vite 2>/dev/null || true"
# หน้าแรกต้องเป็น HTML ที่มีเนื้อหาจริง ไม่งั้นไม่ deploy
if ! grep -q 'data-server-rendered' "$WT/dist/index.html" || [ "$(wc -c < "$WT/dist/index.html")" -lt 20000 ] || [ ! -f "$WT/dist/blogs.html" ]; then
    log "build ได้ของไม่ครบ (index.html $(wc -c < "$WT/dist/index.html") bytes) — ไม่ deploy"; exit 1
fi

# 4) commit dist บน branch ของ worktree → ff-merge main → push
cd "$WT"
git add -A dist
if git diff --cached --quiet; then
    log "dist เหมือนเดิม — ไม่ต้อง deploy"
else
    git commit -q -m "build: prerender $(date +%F) (api $data)"
fi
git -C "$R" merge -q --ff-only "$(git -C "$WT" branch --show-current)"
git -C "$R" push -q origin main 2>/dev/null || log "push origin ไม่สำเร็จ (ของจริงอัปเดตแล้ว ค่อย push ทีหลัง)"
echo "$want" > "$STAMP"
log "deploy แล้ว: main @ $(git -C "$R" rev-parse --short HEAD) · หน้าแรก $(wc -c < "$R/dist/index.html") bytes · บทความ $(ls "$R"/dist/blogs/*.html | wc -l) หน้า"
