import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Building2,
    Users,
    Gavel,
    Home,
    ArrowLeft,
    ShieldCheck,
    Scale
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const PracticeAreasPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const specialties = [
        {
            id: 'corporate',
            icon: <Building2 className="w-10 h-10" />,
            title: 'กฎหมายองค์กรและธุรกิจ',
            description: 'บริการที่ปรึกษาทางธุรกิจเชิงกลยุทธ์ ครอบคลุมตั้งแต่การจดทะเบียนจัดตั้งบริษัท การร่างสัญญาทางการค้า จนถึงการฟ้องร้องดำเนินคดีทางการค้าที่ซับซ้อน',
            details: [
                'การจดทะเบียนบริษัทและห้างหุ้นส่วน',
                'การควบรวมและซื้อกิจการ (M&A)',
                'การร่างและตรวจทานสัญญาทางธุรกิจ',
                'กฎหมายแรงงานและข้อบังคับการทำงาน',
                'การฟ้องร้องดำเนินคดีศาลแพ่งและพาณิชย์',
                'ที่ปรึกษากฎหมายประจำบริษัท (Legal Retainer)'
            ]
        },
        {
            id: 'family',
            icon: <Users className="w-10 h-10" />,
            title: 'กฎหมายครอบครัวและมรดก',
            description: 'เราเข้าใจถึงความละเอียดอ่อนของปัญหาครอบครัว ทีมงานของเราพร้อมให้คำปรึกษาด้วยความใส่ใจ เพื่อผลประโยชน์สูงสุดของท่านและบุคคลที่ท่านรัก',
            details: [
                'การฟ้องหย่าและแบ่งสินสมรส',
                'การรับรองบุตรและอำนาจปกครองบุตร',
                'การร่างพินัยกรรมและจัดการกองมรดก',
                'คดีผิดสัญญาหมั้นและค่าทดแทน',
                'การขอเป็นผู้จัดการมรดก',
                'การไกล่เกลี่ยข้อพิพาทในครอบครัว'
            ]
        },
        {
            id: 'criminal',
            icon: <Gavel className="w-10 h-10" />,
            title: 'การต่อสู้คดีอาญา',
            description: 'กลยุทธ์การป้องกันตัวที่เหนือชั้นสำหรับทุกประเภทคดีอาญา ตั้งแต่คดีทั่วไปจนถึงคดีเศรษฐกิจที่ซับซ้อน โดยทนายความผู้เชี่ยวชาญการว่าความ',
            details: [
                'คดีอาญาทั่วไป (ทำร้ายร่างกาย, ลักทรัพย์ ฯลฯ)',
                'คดีเศรษฐกิจและทุจริตคอร์รัปชัน',
                'คดีเช็คและผิดนัดชำระหนี้',
                'การประกันตัวผู้ต้องหาหรือจำเลย',
                'การรวบรวมพยานหลักฐานเพื่อต่อสู้คดี',
                'การอุทธรณ์และฎีกาคดีอาญา'
            ]
        },
        {
            id: 'real-estate',
            icon: <Home className="w-10 h-10" />,
            title: 'กฎหมายอสังหาริมทรัพย์',
            description: 'บริการให้คำปรึกษาและจัดการธุรกรรมอสังหาริมทรัพย์ระดับพรีเมียม ทั้งเพื่อการอยู่อาศัยและการลงทุนเชิงพาณิชย์',
            details: [
                'การตรวจสอบสถานะทรัพย์สิน (Due Diligence)',
                'การร่างและซื้อขายอสังหาริมทรัพย์',
                'กฎหมายจัดสรรที่ดินและอาคารชุด',
                'ข้อพิพาทเรื่องกรรมสิทธิ์และภาระจำยอม',
                'สัญญาเช่าระยะยาวและเช่าช่วง',
                'คดีขับไล่และผิดสัญญาจะซื้อจะขาย'
            ]
        },
        {
            id: 'administrative',
            icon: <Scale className="w-10 h-10" />,
            title: 'กฎหมายปกครองและภาษี',
            description: 'การฟ้องร้องคดีต่อหน่วยงานรัฐและเจ้าหน้าที่ของรัฐ รวมถึงการวางแผนภาษีและแก้ข้อพิพาททางภาษี',
            details: [
                'การฟ้องขอเพิกถอนคำสั่งทางปกครอง',
                'คดีละเมิดของเจ้าหน้าที่รัฐ',
                'ข้อพิพาทสัญญาทางปกครอง',
                'การวางแผนภาษีอากรสำหรับบุคคลและนิติบุคคล',
                'การอุทธรณ์ภาษีและคดีภาษีอากร',
                'กฎหมายที่ดินและผังเมือง'
            ]
        }
    ];

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
                    {specialties.map((item) => (
                        <div
                            key={item.id}
                            className={`flex flex-col lg:flex-row gap-12 p-8 lg:p-12 rounded-3xl bg-secondary/5 border border-white/5 relative overflow-hidden group hover:border-secondary/30 transition-all duration-500`}
                        >
                            <div className="absolute -right-12 -top-12 w-64 h-64 bg-secondary/5 rounded-full blur-3xl group-hover:bg-secondary/10 transition-colors" />

                            {/* Left Column: Icon and Title */}
                            <div className="lg:w-1/3">
                                <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center text-secondary mb-8 shadow-xl border border-secondary/20">
                                    {item.icon}
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
                                {item.details.map((detail, idx) => (
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
