import './index.css'
import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './App'
import { prefetchFor, reset, seed } from './lib/ssgData'

// entry ของ vite-react-ssg — แทน createRoot(document.getElementById('root')) เดิม
// ซึ่งเป็นจุดเดียวในโค้ดที่แตะ browser API ตอน import
export const createRoot = ViteReactSSG({ routes }, async ({ isClient, initialState, routePath }) => {
  if (isClient) {
    // ข้อมูลที่ฝังมากับหน้า (window.__INITIAL_STATE__) → ให้ render แรกตรงกับ HTML ที่ prerender ไว้ ไม่งั้น hydrate พัง
    seed(initialState.api as Record<string, unknown> | undefined)
    return
  }
  // ตอน build: ดึงข้อมูลจริงจาก API ใส่ใน HTML ของหน้านี้ — บอทที่ไม่รัน JS เห็นเนื้อหา ไม่ใช่ "กำลังโหลด"
  if (routePath === undefined) return   // lib เรียกครั้งแรกเพื่ออ่าน routes เฉย ๆ ยังไม่ได้เรนเดอร์หน้าไหน
  reset()
  const data = await prefetchFor(routePath)
  seed(data)
  initialState.api = data   // vite.config.ts (onPageRendered) ฝังลง HTML เป็น window.__INITIAL_STATE__
})
