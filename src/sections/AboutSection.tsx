import { useEffect, useRef, useState } from 'react';
import { Check, MapPin, Phone, Clock } from 'lucide-react';
import { fetchApi } from '@/lib/api';
import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface AboutData {
    badge: string;
    title: string;
    descriptions: string[];
    checklist: string[];
    address: string;
    phone: string;
    workingHours: string;
    features: {
        title: string;
        description: string;
        icon: string;
    }[];
}

const AboutSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [aboutData, setAboutData] = useState<AboutData | null>(null);

    useEffect(() => {
        const loadAbout = async () => {
            try {
                const data = await fetchApi<AboutData>('/about');
                setAboutData(data);
            } catch (error) {
                console.error('Failed to load about data:', error);
            }
        };
        loadAbout();
    }, []);

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
    }, [aboutData]);

    const renderIcon = (iconName: string, props: React.SVGProps<SVGSVGElement>) => {
        const IconComponent = (Icons as any)[iconName] as LucideIcon;
        if (!IconComponent) {
            const FallbackIcon = Icons.HelpCircle as LucideIcon;
            return <FallbackIcon {...props} />;
        }
        return <IconComponent {...props} />;
    };

    if (!aboutData) return null;

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
                            {aboutData.badge}
                        </div>

                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-8 leading-tight">
                            {aboutData.title.split(' ').map((word, i) => (
                                <span key={i}>
                                    {word.includes('ธนวัฒน์') ? (
                                        <><span className="text-secondary">{word}</span> </>
                                    ) : (
                                        <>{word} </>
                                    )}
                                    {i === 0 && <br />}
                                </span>
                            ))}
                        </h2>

                        <div className="space-y-6 text-gray-400 text-lg leading-relaxed mb-10">
                            {aboutData.descriptions.map((desc, index) => (
                                <p key={index}>{desc}</p>
                            ))}
                        </div>

                        {/* Checklist */}
                        <div className="grid sm:grid-cols-2 gap-4 mb-12">
                            {aboutData.checklist.map((item, index) => (
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
                                            {aboutData.address}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <Phone className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="text-white font-bold mb-1">โทรศัพท์</h4>
                                        <p className="text-gray-400 text-sm">{aboutData.phone}</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <Clock className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="text-white font-bold mb-1">เวลาทำการ</h4>
                                        <p className="text-gray-400 text-sm">{aboutData.workingHours}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Feature Cards */}
                    <div className="grid sm:grid-cols-2 gap-6 lg:mt-12">
                        {aboutData.features.map((feature, index) => (
                            <div
                                key={index}
                                className={`fade-up opacity-0 translate-y-8 transition-all duration-700 bg-[#1a232e] border border-white/5 p-8 rounded-2xl hover:border-secondary/30 transition-all group`}
                                style={{ transitionDelay: `${(index + 1) * 150}ms` }}
                            >
                                <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors">
                                    {renderIcon(feature.icon, { className: "w-6 h-6 text-secondary" })}
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
