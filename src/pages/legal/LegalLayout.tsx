import { useEffect, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Head } from 'vite-react-ssg';
import { ArrowLeft } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { preloaded } from '@/lib/ssgData';
import { LEGAL_LINKS } from '@/lib/legal';

/**
 * โครงหน้านโยบาย (ความเป็นส่วนตัว · ข้อกำหนดการใช้งาน · คุกกี้)
 * แต่ละหน้ามี title/description/canonical ของตัวเอง (Head ของ vite-react-ssg ใส่ลง HTML ตอน prerender)
 * ช่องทางติดต่อดึงจาก /about ที่ prerender ฝังไว้ทุกหน้าอยู่แล้ว — แก้ที่หลังบ้านแล้วหน้านโยบายเปลี่ยนตาม
 */
export const SITE = 'https://tanawat-lawyer.com';
export const FIRM = 'สำนักงาน ธนวัฒน์ทนายความ';
export const EMAIL = 'tanawat_vg@hotmail.com';
export const UPDATED = '7 พฤศจิกายน 2569';


type About = { address?: string; phone?: string };

export function ContactBlock() {
  const about = preloaded<About>('/about') ?? {};
  return (
    <address className="not-italic rounded-xl border border-white/10 bg-white/5 p-6 text-gray-300 leading-relaxed">
      <strong className="block text-white mb-2">{FIRM}</strong>
      {about.address && <span className="block">{about.address}</span>}
      {about.phone && <span className="block">โทรศัพท์ {about.phone}</span>}
      <span className="block">
        อีเมล <a className="text-secondary hover:underline" href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </span>
    </address>
  );
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-serif font-bold text-white">{title}</h2>
      <div className="space-y-4 text-gray-300 leading-relaxed text-lg">{children}</div>
    </section>
  );
}

export function List({ items }: { items: ReactNode[] }) {
  return (
    <ul className="list-disc pl-6 space-y-2 marker:text-secondary">
      {items.map((it, i) => <li key={i}>{it}</li>)}
    </ul>
  );
}

const LegalLayout = ({ path, title, description, children }: {
  path: string; title: string; description: string; children: ReactNode;
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-dark">
      <Head>
        <title>{`${title} | ${FIRM}`}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${SITE}${path}`} />
      </Head>
      <Navigation />
      <main className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-secondary hover:text-white transition-colors mb-12 font-bold uppercase tracking-widest text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            กลับสู่หน้าหลัก
          </Link>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-4 leading-tight">{title}</h1>
          <p className="text-gray-500 mb-12">ปรับปรุงล่าสุด {UPDATED}</p>
          <div className="space-y-12">{children}</div>
          <nav className="mt-16 pt-8 border-t border-white/10 flex flex-wrap gap-x-6 gap-y-2 text-sm" aria-label="นโยบายอื่น">
            {LEGAL_LINKS.filter((l) => l.to !== path).map((l) => (
              <Link key={l.to} to={l.to} className="text-gray-400 hover:text-secondary transition-colors">{l.label}</Link>
            ))}
          </nav>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LegalLayout;
