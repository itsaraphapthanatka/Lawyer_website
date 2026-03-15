import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchApi } from '@/lib/api';
import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

interface PracticeArea {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const PracticeAreasSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [practiceAreas, setPracticeAreas] = useState<PracticeArea[]>([]);

  useEffect(() => {
    // Fetch practice areas from API
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = sectionRef.current?.querySelectorAll('.fade-up');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [practiceAreas]);

  // Dynamic icon component renderer
  const renderIcon = (iconName: string, props: React.SVGProps<SVGSVGElement>) => {
    // Cast Icons to any to bypass the complex type incompatibility
    const IconComponent = (Icons as any)[iconName] as LucideIcon;
    if (!IconComponent) {
      const FallbackIcon = Icons.HelpCircle as LucideIcon;
      return <FallbackIcon {...props} />;
    }
    return <IconComponent {...props} />;
  };

  return (
    <section
      id="practice-areas"
      ref={sectionRef}
      className="py-24 bg-dark"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="fade-up opacity-0 translate-y-8 transition-all duration-700 text-secondary text-sm font-bold uppercase tracking-widest mb-4">
            ความเชี่ยวชาญพิเศษของเรา
          </h2>
          <h3 className="fade-up opacity-0 translate-y-8 transition-all duration-700 delay-100 text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white">
            สาขาการปฏิบัติงานทางกฎหมาย
          </h3>
        </div>

        {/* Practice Areas Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {practiceAreas.map((area, index) => (
            <div
              key={area.title}
              className={`fade-up opacity-0 translate-y-8 transition-all duration-700 group relative bg-dark-light p-8 rounded-2xl border border-white/10 transition-all hover:-translate-y-2 hover:border-secondary/50 shadow-sm hover:shadow-gold`}
              style={{ transitionDelay: `${(index + 2) * 100}ms` }}
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/50 text-secondary group-hover:bg-secondary group-hover:text-primary transition-colors">
                {renderIcon(area.icon, { className: "w-6 h-6" })}
              </div>

              <h4 className="text-xl font-bold mb-3 text-white">{area.title}</h4>

              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {area.description}
              </p>

              <button
                onClick={() => navigate('/practice-areas')}
                className="inline-flex items-center gap-2 text-secondary font-bold text-xs uppercase tracking-widest group-hover:gap-3 transition-all"
              >
                อ่านเพิ่มเติม
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PracticeAreasSection;
