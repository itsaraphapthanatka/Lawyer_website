// ข้อมูลจาก API ที่ดึงไว้ตอน build — ให้ HTML ที่ prerender มีเนื้อหาจริง ไม่ใช่สถานะ "กำลังโหลด"
//
// ทุก section โหลดข้อมูลใน useEffect ซึ่งไม่รันตอน prerender ถ้าไม่ทำอะไร HTML ที่ได้จะมีแค่
// โครงหน้า + ข้อความ "Loading" ซึ่งบอท AI อ่านแล้วก็ยังว่างเหมือนเดิม
// ฝั่งเซิร์ฟเวอร์ (vite-react-ssg build): main.tsx เรียก prefetchFor(routePath) แล้วใส่ใน initialState ของหน้านั้น
// ฝั่ง browser: initialState กลับมาทาง window.__INITIAL_STATE__ → seed() ก่อน hydrate ให้ render แรกตรงกับ HTML
// จากนั้น component ยัง fetch ซ้ำใน useEffect ตามเดิม — คนเห็นข้อมูลล่าสุดเสมอ บอทเห็น snapshot ตอน build
// (rebuild เมื่อแอดมินแก้เนื้อหาหน้าแรก/บทความ)
const store = new Map<string, unknown>();

export function seed(data?: Record<string, unknown> | null): void {
  if (!data) return;
  for (const [k, v] of Object.entries(data)) store.set(k, v);
}

/** ล้าง store ก่อน prerender แต่ละหน้า — build รันทุกหน้าใน process เดียว ไม่งั้นหน้าถัดไปอ่านข้อมูลของหน้าก่อนติดมา */
export function reset(): void {
  store.clear();
}

export function preloaded<T>(endpoint: string): T | undefined {
  return store.get(endpoint) as T | undefined;
}

// endpoint ที่แต่ละหน้าใช้ — ใส่เฉพาะที่หน้านั้นต้องการ ไม่งั้นทุกหน้าจะแบกบทความทั้ง 31 ชิ้น (~190 KB) ติดไปด้วย
const SHARED = ['/about']; // Footer + FloatingActions (ปุ่ม LINE) อยู่ทุกหน้า
const PAGE_ENDPOINTS: Record<string, string[]> = {
  '/': ['/hero', '/trust-logos', '/practice-areas', '/process-steps', '/experts', '/testimonials'],
  '/practice-areas': ['/practice-areas'],
  '/blogs': ['/blogs'],
};

type BlogRow = { id: string; published?: boolean; content?: string };

function apiBase(): string {
  // รันเฉพาะใน Node ตอน build — ตั้ง SSG_API_BASE ได้ถ้าจะชี้ API ภายในแทนโดเมนจริง
  const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env;
  return env?.SSG_API_BASE || 'https://tanawat-lawyer.com/api';
}

const memo = new Map<string, Promise<unknown>>(); // ดึงแต่ละ endpoint ครั้งเดียวต่อการ build
function once<T>(endpoint: string): Promise<T> {
  if (!memo.has(endpoint)) {
    memo.set(
      endpoint,
      fetch(`${apiBase()}${endpoint}`).then((r) => {
        if (!r.ok) throw new Error(`SSG prefetch ${endpoint} → HTTP ${r.status}`);
        return r.json();
      }),
    );
  }
  return memo.get(endpoint) as Promise<T>;
}

/** ข้อมูลสำหรับหน้า routePath — เรียกตอน build เท่านั้น */
export async function prefetchFor(rawPath: string): Promise<Record<string, unknown>> {
  // vite-react-ssg ส่ง path มาแบบไม่มี / นำหน้า (เช่น "practice-areas", "blogs/<id>") ยกเว้นหน้าแรกเป็น "/"
  // — ทำให้เป็นรูป "/x" ก่อน ไม่งั้นทุกหน้านอกจากหน้าแรกจะได้แค่ข้อมูลร่วม (รอบ build แรกเป็นแบบนั้นจริง)
  const routePath = '/' + rawPath.replace(/^\/+|\/+$/g, '');
  const out: Record<string, unknown> = {};
  const blogMatch = routePath.match(/^\/blogs\/([^/]+)$/);
  for (const ep of new Set([...SHARED, ...(blogMatch ? [] : PAGE_ENDPOINTS[routePath] ?? [])])) {
    out[ep] = await once(ep);
  }
  if (routePath === '/blogs') {
    // หน้ารายการโชว์แค่ excerpt — ตัด content ออก ไม่ให้ HTML หน้านี้บวม
    out['/blogs'] = ((out['/blogs'] as BlogRow[]) ?? []).map(({ content: _content, ...rest }) => rest);
  }
  if (blogMatch) {
    // หน้าบทความใช้ข้อมูลจากรายการรวม (มี content ครบ) — ไม่ต้องยิง /blogs/:id ทีละหน้า 31 ครั้ง
    const blog = (await once<BlogRow[]>('/blogs')).find((b) => b.id === blogMatch[1]);
    if (blog) out[`/blogs/${blog.id}`] = blog;
  }
  return out;
}

/** path ของบทความที่เผยแพร่แล้ว → vite-react-ssg prerender ให้ (getStaticPaths ของ route blogs/:id) */
export async function blogPaths(): Promise<string[]> {
  const blogs = await once<BlogRow[]>('/blogs');
  return blogs.filter((b) => b.published !== false).map((b) => `blogs/${b.id}`);
}
