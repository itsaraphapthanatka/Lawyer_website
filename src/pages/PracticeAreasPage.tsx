import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    ShieldCheck
} from 'lucide-react';
import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { fetchApi } from '@/lib/api';

interface PracticeArea {
    id: string;
    title: string;
    description: string;
    icon: string;
    details: string[];
}

const PracticeAreasPage = () => {
    const navigate = useNavigate();
    const [practiceAreas, setPracticeAreas] = useState<PracticeArea[]>([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        const loadPracticeAreas = async () => {
            try {
                const data = await fetchApi<PracticeArea[]>('/practice-areas');
                setPracticeAreas(data);
            } catch (error) {
                console.error('Failed to load practice areas:', error);
            }
        };
        loadPracticeAreas();
    }, []);

    const renderIcon = (iconName: string, props: React.SVGProps<SVGSVGElement>) => {
        const IconComponent = (Icons as any)[iconName] as LucideIcon;
        if (!IconComponent) {
            const FallbackIcon = Icons.HelpCircle as LucideIcon;
            return <FallbackIcon {...props} />;
        }
        return <IconComponent {...props} />;
    };

    return (
        <div className="min-h-screen bg-dark">
            <Navigation />

            <main className="pt-32 pb-24">
                {/* Header Section */}
                <div className="relative mb-20 overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/40 via-transparent to-transparent opacity-50" />
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                        <button
                            onClick={() => navigate('/')}
                            className="inline-flex items-center gap-2 text-secondary hover:text-white transition-colors mb-12 font-bold uppercase tracking-widest text-sm"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            กลับสู่หน้าหลัก
                        </button>
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
                            ความเชี่ยวชาญพิเศษ <br />
                            <span className="text-secondary">ระดับมืออาชีพ</span>
                        </h1>
                        <p className="text-gray-400 text-xl max-w-3xl leading-relaxed">
                            เราให้บริการทางกฎหมายที่ครอบคลุมทุกความต้องการ ด้วยประสบการณ์กว่า 30 ปี และทีมทนายความที่เชี่ยวชาญเฉพาะด้าน เพื่อให้มั่นใจว่าลูกความจะได้รับความยุติธรรมและประโยชน์สูงสุด
                        </p>
                    </div>
                </div>

                {/* Content Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                    {practiceAreas.map((item) => (
                        <div
                            key={item.id}
                            className={`flex flex-col lg:flex-row gap-12 p-8 lg:p-12 rounded-3xl bg-secondary/5 border border-white/5 relative overflow-hidden group hover:border-secondary/30 transition-all duration-500`}
                        >
                            <div className="absolute -right-12 -top-12 w-64 h-64 bg-secondary/5 rounded-full blur-3xl group-hover:bg-secondary/10 transition-colors" />

                            {/* Left Column: Icon and Title */}
                            <div className="lg:w-1/3">
                                <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center text-secondary mb-8 shadow-xl border border-secondary/20">
                                    {renderIcon(item.icon, { className: "w-10 h-10" })}
                                </div>
                                <h2 className="text-3xl font-serif font-bold text-white mb-4 leading-tight">
                                    {item.title}
                                </h2>
                                <p className="text-gray-400 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>

                            {/* Right Column: List of Services */}
                            <div className="lg:w-2/3 grid sm:grid-cols-2 gap-6">
                                {item.details?.map((detail, idx) => (
                                    <div key={idx} className="flex items-center gap-4 group/item">
                                        <div className="h-2 w-2 rounded-full bg-secondary group-hover/item:scale-125 transition-transform" />
                                        <p className="text-gray-300 font-medium group-hover/item:text-white transition-colors">{detail}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 text-center">
                    <div className="bg-[#1a232e] border border-secondary/20 rounded-3xl p-12 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(197,160,89,0.1),transparent)]" />
                        <ShieldCheck className="w-16 h-16 text-secondary mx-auto mb-8 animate-pulse" />
                        <h3 className="text-3xl font-serif font-bold text-white mb-6">ต้องการปรึกษากฎหมายเบื้องต้น?</h3>
                        <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                            หากท่านมีปัญหาหรือข้อสงสัยทางกฎหมาย ทีมงานของเราพร้อมให้คำปรึกษาด้วยความยินดีและซื่อตรง
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                size="lg"
                                onClick={() => navigate('/#booking')}
                                className="bg-primary hover:bg-navy-800 text-white px-10 py-7 rounded-2xl text-lg font-bold transition-all shadow-xl shadow-primary/20 border border-secondary/30"
                            >
                                ติดต่อปรึกษากับเรา
                            </Button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PracticeAreasPage;
