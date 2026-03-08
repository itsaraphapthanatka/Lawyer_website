import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, Phone } from 'lucide-react';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);

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

    const elements = heroRef.current?.querySelectorAll('.fade-up');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative pt-32 pb-24 lg:pt-40 lg:pb-40 overflow-hidden bg-dark"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/40 via-transparent to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="max-w-2xl">
            <div className="fade-up opacity-0 translate-y-8 transition-all duration-700 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-bold uppercase tracking-widest mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
              </span>
              ทนายความมืออาชีพ
            </div>

            <h1 className="fade-up opacity-0 translate-y-8 transition-all duration-700 delay-100 text-4xl sm:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-8 text-white">
              บริการด้านกฎหมาย<span className="italic text-secondary">ครบวงจร</span>
            </h1>

            <p className="fade-up opacity-0 translate-y-8 transition-all duration-700 delay-200 text-lg text-gray-400 mb-10 leading-relaxed">
              ประสบการณ์กว่า 30 ปี ให้คำปรึกษาและว่าความทุกประเภทคดี โดยทีมทนายความที่มีความเชี่ยวชาญและประสบการณ์สูง พร้อมดูแลคุณด้วยความซื่อสัตย์และมุ่งมั่น
            </p>

            <div className="fade-up opacity-0 translate-y-8 transition-all duration-700 delay-300 flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => scrollToSection('#booking')}
                className="flex items-center justify-center gap-2 bg-primary hover:bg-navy-800 text-white px-8 py-6 rounded-xl text-lg font-bold transition-all shadow-xl shadow-primary/20 border border-secondary/20"
              >
                ปรึกษากฎหมายกับเรา
                <MessageSquare className="w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection('#contact')}
                className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white px-8 py-6 rounded-xl text-lg font-bold border border-white/20 transition-all"
              >
                โทรเลย
                <Phone className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="fade-up opacity-0 translate-y-8 transition-all duration-700 delay-400 relative">
            <div className="absolute -inset-4 bg-secondary/20 rounded-2xl blur-2xl opacity-30" />
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <img
                src="/images/hero-lawyer.jpg"
                alt="ทนายความมืออาชีพ"
                className="w-full h-full object-cover"
              />
              {/* Overlay Card */}
              <div className="absolute bottom-6 left-6 right-6 p-6 bg-dark/90 backdrop-blur-lg rounded-xl border border-white/10">
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex -space-x-3">
                    <div className="h-10 w-10 rounded-full border-2 border-dark bg-gray-500 overflow-hidden">
                      <img src="/images/expert-1.jpg" alt="ทนาย" className="w-full h-full object-cover" />
                    </div>
                    <div className="h-10 w-10 rounded-full border-2 border-dark bg-gray-400 overflow-hidden">
                      <img src="/images/expert-2.jpg" alt="ทนาย" className="w-full h-full object-cover" />
                    </div>
                    <div className="h-10 w-10 rounded-full border-2 border-dark bg-gray-300 overflow-hidden">
                      <img src="/images/expert-3.jpg" alt="ทนาย" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="text-sm font-medium text-white">ได้รับความไว้วางใจจากลูกค้ากว่า 500+ ราย</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
