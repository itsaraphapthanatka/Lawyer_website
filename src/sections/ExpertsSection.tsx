import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

const ExpertsSection = () => {
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
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = sectionRef.current?.querySelectorAll('.fade-up');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const experts = [
    {
      name: 'ทนายธนวัฒน์ พามี',
      position: 'หุ้นส่วนผู้จัดการ',
      image: '/images/expert-1.jpg',
      specialty: 'กฎหมายองค์กรและการควบรวมกิจการ',
    },
    {
      name: 'ทนายฉัตรชัย คำใส',
      position: 'หัวหน้าแผนกกฎหมายครอบครัว',
      image: '/images/expert-2.jpg',
      specialty: 'กฎหมายครอบครัวและมรดก',
    },
    {
      name: 'ทนายปฏิภัทร ศรีมงคลกุล',
      position: 'ผู้เชี่ยวชาญด้านการดำเนินคดี',
      image: '/images/expert-3.jpg',
      specialty: 'การต่อสู้คดีอาญาและคดีแพ่ง',
    },
  ];

  return (
    <section
      id="experts"
      ref={sectionRef}
      className="py-24 bg-dark"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="fade-up opacity-0 translate-y-8 transition-all duration-700 text-secondary text-sm font-bold uppercase tracking-widest mb-4">
          พบกับผู้เชี่ยวชาญของเรา
        </h2>
        <h3 className="fade-up opacity-0 translate-y-8 transition-all duration-700 delay-100 text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-16">
          ผู้เชี่ยวชาญด้านกฎหมายที่โดดเด่น
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {experts.map((expert, index) => (
            <div
              key={expert.name}
              className={`fade-up opacity-0 translate-y-8 transition-all duration-700 group`}
              style={{ transitionDelay: `${(index + 2) * 100}ms` }}
            >
              <div className="relative mb-6 rounded-2xl overflow-hidden aspect-[3/4]">
                <img
                  src={expert.image}
                  alt={expert.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8 text-left">
                  <p className="text-secondary font-bold text-sm mb-2">{expert.position}</p>
                  <Button className="w-full bg-secondary text-primary py-3 rounded-lg font-bold text-sm hover:bg-secondary/90">
                    ดูประวัติทั้งหมด
                  </Button>
                </div>
              </div>
              <h4 className="text-2xl font-serif font-bold text-white mb-1">{expert.name}</h4>
              <p className="text-secondary font-medium text-sm uppercase tracking-widest">{expert.position}</p>
              <p className="text-gray-400 text-sm mt-2">{expert.specialty}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertsSection;
