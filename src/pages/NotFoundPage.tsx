import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Scale, FileText, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

/**
 * หน้า 404 — ผูกกับ <Route path="*"> ใน App.tsx
 *
 * ฝั่ง edge (Caddyfile ของ tanawat-lawyer.com) ตอบ HTTP 404 ให้ path ที่ไม่ตรง
 * route จริงอยู่แล้ว หน้านี้รับหน้าที่ฝั่งคน — บอกว่าไม่เจอและพากลับไปหน้าที่มีจริง
 * ถ้าเพิ่ม route ใหม่ใน App.tsx ต้องไปเพิ่มใน matcher @spa ของ Caddyfile ด้วย
 */
const NotFoundPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const links = [
        { to: '/', icon: Home, label: 'หน้าแรก', desc: 'กลับไปเริ่มต้นใหม่' },
        { to: '/practice-areas', icon: Scale, label: 'บริการของเรา', desc: 'ดูขอบเขตงานที่รับปรึกษา' },
        { to: '/blogs', icon: FileText, label: 'บทความ', desc: 'ความรู้กฎหมายที่น่าสนใจ' },
    ];

    return (
        <div className="min-h-screen bg-dark flex flex-col">
            <Navigation />
            <main className="flex-1">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
                    <p className="text-gold-400 font-serif text-7xl sm:text-8xl font-bold mb-4">404</p>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-6 leading-tight">
                        ไม่พบหน้าที่คุณกำลังมองหา
                    </h1>
                    <p className="text-gray-400 text-lg sm:text-xl max-w-2xl leading-relaxed mb-12">
                        หน้านี้อาจถูกย้าย เปลี่ยนชื่อ หรือลิงก์ที่ใช้อาจพิมพ์ไม่ครบ
                        ลองเลือกจากรายการด้านล่าง หรือติดต่อเราได้โดยตรง
                    </p>

                    <div className="grid gap-4 sm:grid-cols-3 max-w-4xl mb-12">
                        {links.map(({ to, icon: Icon, label, desc }) => (
                            <Link
                                key={to}
                                to={to}
                                className="group rounded-xl border border-white/10 bg-white/5 p-6 transition hover:border-gold-400/50 hover:bg-white/10"
                            >
                                <Icon className="h-6 w-6 text-gold-400 mb-3" />
                                <span className="block text-white font-semibold mb-1">{label}</span>
                                <span className="block text-gray-400 text-sm">{desc}</span>
                            </Link>
                        ))}
                    </div>

                    <Button asChild variant="outline" className="gap-2">
                        <Link to="/">
                            <ArrowLeft className="h-4 w-4" />
                            กลับหน้าแรก
                        </Link>
                    </Button>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default NotFoundPage;
