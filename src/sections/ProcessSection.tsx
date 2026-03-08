import { useEffect, useRef } from 'react';

const ProcessSection = () => {
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

  const steps = [
    {
      number: '1',
      title: 'การสอบถามเบื้องต้น',
      description: 'ความสัมพันธ์ของเราเริ่มต้นด้วยกระบวนการรับข้อมูลอย่างละเอียดเพื่อทำความเข้าใจลักษณะเฉพาะของสถานการณ์ของคุณ',
    },
    {
      number: '2',
      title: 'การวางแผนกลยุทธ์',
      description: 'การปรึกษาหารือเชิงลึกกับพาร์ทเนอร์อาวุโสเพื่อร่างแผนที่นำทางทางกฎหมายและกรอบเวลาที่กำหนดขึ้นเฉพาะคุณ',
    },
    {
      number: '3',
      title: 'การดำเนินการทางกฎหมาย',
      description: 'การดำเนินการตามกลยุทธ์ที่ตกลงกันไว้อย่างรวดเร็วและเด็ดขาด พร้อมการอัปเดตและการสนับสนุนอย่างต่อเนื่อง',
    },
  ];

  return (
    <section
      id="process"
      ref={sectionRef}
      className="py-24 bg-dark-light/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <h2 className="fade-up opacity-0 translate-y-8 transition-all duration-700 text-secondary text-sm font-bold uppercase tracking-widest mb-4">
              ขั้นตอนการทำงาน
            </h2>
            <h3 className="fade-up opacity-0 translate-y-8 transition-all duration-700 delay-100 text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-8 leading-tight">
              แนวทางที่คล่องตัวสู่ความเป็นเลิศทางกฎหมาย
            </h3>
            <p className="fade-up opacity-0 translate-y-8 transition-all duration-700 delay-200 text-lg text-gray-400 mb-8">
              เราปฏิบัติตามวิธีการสามขั้นตอนที่เข้มงวดเพื่อให้แน่ใจว่าลูกค้าทุกคนจะได้รับความสนใจเป็นพิเศษและผลลัพธ์ที่ดีที่สุด
            </p>

            <div className="space-y-8">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className={`fade-up opacity-0 translate-y-8 transition-all duration-700 flex gap-6`}
                  style={{ transitionDelay: `${(index + 3) * 100}ms` }}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-secondary font-bold text-xl border border-secondary/30">
                    {step.number}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-white">{step.number}. {step.title}</h4>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="fade-up opacity-0 translate-y-8 transition-all duration-700 delay-400 relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/images/process-lawyer.jpg"
              alt="ทนายความเซ็นเอกสาร"
              className="w-full h-full object-cover aspect-square"
            />
            <div className="absolute inset-0 bg-primary/30 mix-blend-multiply" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
