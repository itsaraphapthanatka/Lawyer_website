// sitemap.mjs — สร้าง dist/sitemap.xml จากหน้าที่ prerender แล้วจริง (รันต่อท้าย npm run build)
//
// ทำไม: เว็บนี้เคยมีแค่ /geo-sitemap.xml (หน้า /geo ที่ระบบ GEO สร้าง) — หน้าหลักกับบทความทั้งหมดไม่อยู่ใน sitemap ไหนเลย
// Bing (ที่ ChatGPT ใช้ค้นเว็บ) จึงรู้จักแค่หน้าแรก · ไล่จากไฟล์ใน dist = ได้ทุกหน้าที่เสิร์ฟจริง ไม่ต้องดูแลรายการเอง
// ข้าม /admin/*, /404 · lastmod ของบทความเอาจาก API (ดึงไม่ได้ก็ไม่ใส่ ดีกว่าใส่วันที่ build ซึ่งไม่จริง)
import { readdirSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const SITE = 'https://tanawat-lawyer.com'
const DIST = new URL('../dist/', import.meta.url).pathname
const SKIP = new Set(['404.html', 'index.html', 'admin.html'])   // admin.html = หน้าล็อกอินหลังบ้าน

const urls = [{ loc: `${SITE}/`, priority: '1.0' }]
for (const f of readdirSync(DIST).sort()) {
  if (f.endsWith('.html') && !SKIP.has(f)) urls.push({ loc: `${SITE}/${f.slice(0, -5)}`, priority: '0.8' })
}

const updated = {}
try {
  const res = await fetch(`${SITE}/api/blogs`, { signal: AbortSignal.timeout(20000) })
  const data = await res.json()
  for (const b of Array.isArray(data) ? data : data.data || []) if (b.id && b.updatedAt) updated[b.id] = b.updatedAt.slice(0, 10)
} catch (e) {
  console.warn(`sitemap: ดึงวันที่บทความไม่ได้ (${e.message}) — ไม่ใส่ lastmod`)
}
const blogDir = join(DIST, 'blogs')
if (existsSync(blogDir)) {
  for (const f of readdirSync(blogDir).sort()) {
    if (!f.endsWith('.html')) continue
    const id = f.slice(0, -5)
    urls.push({ loc: `${SITE}/blogs/${encodeURIComponent(id)}`, priority: '0.6', lastmod: updated[id] })
  }
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')
const body = urls.map((u) =>
  `  <url><loc>${esc(u.loc)}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}<priority>${u.priority}</priority></url>`).join('\n')
writeFileSync(join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`)
console.log(`sitemap: ${urls.length} URL → dist/sitemap.xml`)
