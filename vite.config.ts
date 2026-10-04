import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'
import type { ViteReactSSGOptions } from 'vite-react-ssg'

// prerender ด้วย vite-react-ssg (npm run build) — ให้ HTML มีเนื้อหาจริงสำหรับ Google/บอท AI ที่ไม่รัน JS
const ssgOptions: ViteReactSSGOptions = {
  // /practice-areas -> practice-areas.html : edge ใช้ try {path}.html ได้ตรง ๆ ไม่ต้อง redirect ไป /practice-areas/
  dirStyle: 'flat',
  // prerender ทุก route รวม /admin/* ด้วย — หน้า admin เรนเดอร์เป็นสถานะ "Loading…"/ฟอร์มล็อกอิน (AuthProvider อ่าน
  // localStorage ใน useEffect ไม่ใช่ตอน render) จึงไม่พัง และทำให้ edge มี HTML ตรงตัวให้ทุก URL — ถ้าตัดออกแล้วส่ง
  // index.html (หน้าแรก) แทน React จะ hydrate ไม่ตรงและต้องเรนเดอร์ใหม่ทั้งหน้า · route ที่มี :param / * ตัดตามดีฟอลต์
  // (blogs/:id ถูกขยายเป็น path จริงจาก getStaticPaths ก่อน)
  // vite-react-ssg 0.9.1 ไม่ฝัง initialState ลง HTML ให้ (renderHTML ได้ initialState: null) แต่ฝั่ง browser
  // ยังอ่าน window.__INITIAL_STATE__ (JSON string) อยู่ — ฝังเองตรงนี้ ไม่งั้น hydrate ไม่ตรงกับ HTML ที่มีข้อมูล
  onPageRendered: (_route, html, ctx) => {
    const api = (ctx.initialState as { api?: unknown } | undefined)?.api
    if (!api) return html
    // JSON ซ้อนใน string literal ตามที่ client JSON.parse · escape < > กัน </script> ในเนื้อหาบทความปิดแท็กก่อนเวลา
    const literal = JSON.stringify(JSON.stringify({ api })).replace(/</g, '\\u003c').replace(/>/g, '\\u003e')
    return html.replace('</body>', `<script>window.__INITIAL_STATE__=${literal}</script></body>`)
  },
}

// https://vite.dev/config/
export default defineConfig({
  ssgOptions,
  // Served at the domain root behind nginx; absolute base so hashed assets
  // resolve correctly on nested SPA routes (e.g. /blogs/:id).
  base: '/',
  plugins: [inspectAttr(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // Local dev only: mirror nginx so "/api/*" hits the NestJS backend.
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api/, ''),
      },
    },
  },
});
