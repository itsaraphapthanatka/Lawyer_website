import { useEffect, useRef } from 'react';
import { Check, Shield, Award, Users, Scale, MapPin, Phone, Clock } from 'lucide-react';

const AboutSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            },
            { threshold: 0.1 }
        );

        const elements = sectionRef.current?.querySelectorAll('.fade-up');
        elements?.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const features = [
        {
            title: 'ความน่าเชื่อถือ',
            description: 'ดำเนินคดีด้วยความซื่อสัตย์ โปร่งใส ให้ความสำคัญกับประโยชน์ของลูกความที่เป็นหลัก',
            icon: <Shield className="w-6 h-6 text-secondary" />,
        },
        {
            title: 'ประสบการณ์สูง',
            description: 'ทีมทนายความที่มีประสบการณ์รวมกว่า 100 ปี ผ่านคดีความมากมายทุกประเภท',
            icon: <Award className="w-6 h-6 text-secondary" />,
        },
        {
            title: 'ทีมงานมืออาชีพ',
            description: 'ทีมทนายความที่มีคุณภาพ พร้อมให้คำปรึกษาและดูแลคดีอย่างใกล้ชิด',
            icon: <Users className="w-6 h-6 text-secondary" />,
        },
        {
            title: 'บริการครบวงจร',
            description: 'ให้บริการทางกฎหมายครบวงจร ตั้งแต่การให้คำปรึกษาจนถึงการบังคับคดี',
            icon: <Scale className="w-6 h-6 text-secondary" />,
        },
    ];

    const checklist = [
        'ให้คำปรึกษากฎหมาย 24 ชั่วโมง',
        'บริการจดทะเบียนธุรกิจ',
        'ทีมทนายความมืออาชีพ',
        'รับว่าความคดีแพ่ง อาญา ปกครอง',
        'การบังคับคดีครบวงจร',
        'ประสบการณ์กว่า 30 ปี',
    ];

    return (
        <section
            id="about"
            ref={sectionRef}
            className="py-24 bg-dark overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-start">

                    {/* Left Column: Text Content */}
                    <div className="fade-up opacity-0 translate-y-8 transition-all duration-700">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-bold uppercase tracking-widest mb-6">
                            เกี่ยวกับเรา
                        </div>

                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-8 leading-tight">
                            สำนักงาน <br />
                            <span className="text-secondary">ธนวัฒน์ทนายความ</span>
                        </h2>

                        <div className="space-y-6 text-gray-400 text-lg leading-relaxed mb-10">
                            <p>
                                สำนักงานธนวัฒน์ทนายความ ก่อตั้งขึ้นด้วยอุดมการณ์ในการให้บริการด้านกฎหมาย
                                ที่มีความเที่ยงตรง ยุติธรรม และซื่อตรง เรามีทีมทนายความเป็นมีประสบการณ์และความเชี่ยวชาญ
                                ในการว่าความคดีทุกประเภท พร้อมให้บริการด้วยความมุ่งมั่นและซื่อตรงต่อลูกความ
                            </p>
                            <p>
                                เราให้บริการด้านกฎหมายครบวงจร ตั้งแต่การให้คำปรึกษา การว่าความในศาลชั้นต้น
                                ศาลอุทธรณ์ ศาลฎีกา ไปจนถึงการบังคับคดี รวมถึงบริการจดทะเบียนธุรกิจและที่ปรึกษากฎหมายประจำบริษัท
                            </p>
                        </div>

                        {/* Checklist */}
                        <div className="grid sm:grid-cols-2 gap-4 mb-12">
                            {checklist.map((item, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-secondary/20 flex items-center justify-center">
                                        <Check className="w-3 h-3 text-secondary" strokeWidth={3} />
                                    </div>
                                    <span className="text-gray-300 font-medium">{item}</span>
                                </div>
                            ))}
                        </div>

                        {/* Contact Info Box */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <MapPin className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="text-white font-bold mb-1">ที่อยู่</h4>
                                        <p className="text-gray-400 text-sm">
                                            43 ซ.อุดมสุข 53 แยก 4 แขวงหนองบอน เขตประเวศ กรุงเทพมหานคร 10250
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <Phone className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="text-white font-bold mb-1">โทรศัพท์</h4>
                                        <p className="text-gray-400 text-sm">02-743-4025-6, 08-98765-789</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <Clock className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="text-white font-bold mb-1">เวลาทำการ</h4>
                                        <p className="text-gray-400 text-sm">จันทร์-ศุกร์ 8:30-17:30 น.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Feature Cards */}
                    <div className="grid sm:grid-cols-2 gap-6 lg:mt-12">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className={`fade-up opacity-0 translate-y-8 transition-all duration-700 bg-[#1a232e] border border-white/5 p-8 rounded-2xl hover:border-secondary/30 transition-all group`}
                                style={{ transitionDelay: `${(index + 1) * 150}ms` }}
                            >
                                <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AboutSection;
