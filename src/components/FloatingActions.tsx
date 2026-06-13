import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import { fetchApi } from '@/lib/api';
import { resolveLineUrl } from '@/lib/line';

/**
 * Floating action buttons shown on the public site (bottom-right):
 *  - "รับคำปรึกษาทาง Line" LINE OA button (only when a LINE OA is configured in admin/About)
 *  - "scroll to top" button (appears after scrolling down)
 * Hidden on /admin pages.
 */
const FloatingActions = () => {
  const { pathname } = useLocation();
  const [lineOa, setLineOa] = useState('');
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    fetchApi<{ lineOa?: string }>('/about')
      .then((d) => setLineOa(d?.lineOa || ''))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (pathname.startsWith('/admin')) return null;

  const lineUrl = resolveLineUrl(lineOa);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {lineUrl && (
        <a
          href={lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="รับคำปรึกษาทาง Line"
          className="flex items-center gap-2 rounded-full bg-[#06C755] hover:bg-[#05b54c] text-white font-bold pl-3 pr-5 py-3 shadow-lg shadow-[#06C755]/30 transition-all hover:scale-105"
        >
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.061-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
          </svg>
          <span>รับคำปรึกษาทาง Line</span>
        </a>
      )}

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="เลื่อนขึ้นด้านบนสุด"
        className={`h-12 w-12 rounded-full bg-secondary text-primary shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white ${
          showTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </div>
  );
};

export default FloatingActions;
