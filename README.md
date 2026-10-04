# tanawat-lawyer.com — เว็บ prerender (vite-react-ssg)

```bash
npm ci
npm run build        # tsc + vite-react-ssg build → dist/ มี HTML ของทุก route (หน้าแรก, practice-areas, blogs, blogs/<id> ทุกบทความ, admin/*, 404)
npm run build:csr    # build แบบ CSR เดิม (ทางถอย) — ใช้คู่กับ Caddy แบบ SPA fallback เท่านั้น
```

- ตอน build จะดึงข้อมูลจาก API จริง (`https://tanawat-lawyer.com/api`, ตั้งทับได้ด้วย `SSG_API_BASE`) มาใส่ใน HTML
  ผ่าน `src/lib/ssgData.ts` — บอท/Google เห็นเนื้อหาจริง ส่วนผู้ใช้ยังได้ข้อมูลล่าสุดจาก `useEffect` เหมือนเดิม
- **แก้เนื้อหาหน้าแรก/บทความในแอดมินแล้วต้อง build ใหม่** จึงจะไปถึงบอท (คนเห็นทันทีอยู่แล้ว)
- edge (Caddy) ต้องเสิร์ฟ `{path}.html` ก่อน และตอบ 404 ด้วย `404.html` — ดู `/website/edge-configs/tanawat-lawyer.com/Caddyfile`

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
