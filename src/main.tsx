import './index.css'
import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './App'

// entry ของ vite-react-ssg — แทน createRoot(document.getElementById('root'))
// เดิม ซึ่งเป็นจุดเดียวในโค้ดที่แตะ browser API ตอน import
export const createRoot = ViteReactSSG({ routes })
