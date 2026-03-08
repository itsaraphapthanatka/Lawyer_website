import { useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const BookingSection = () => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('ส่งข้อความสำเร็จ', {
      description: 'ทีมงานของเราได้รับข้อมูลแล้ว และจะติดต่อกลับโดยเร็วที่สุด',
    });
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6 text-white" />,
      title: 'ที่อยู่',
      detail: '43 ซ.อุดมสุข 53 แยก 4 แขวงหนองบอน เขตประเวศ กรุงเทพมหานคร 10250',
      bgColor: 'bg-[#1e2e42]',
    },
    {
      icon: <Phone className="w-6 h-6 text-white" />,
      title: 'โทรศัพท์',
      detail: '02-743-4025-6, 08-98765-789',
      bgColor: 'bg-[#1e2e42]',
    },
    {
      icon: <Mail className="w-6 h-6 text-white" />,
      title: 'อีเมล',
      detail: 'tanawat_vg@hotmail.com',
      bgColor: 'bg-[#1e2e42]',
    },
    {
      icon: <Clock className="w-6 h-6 text-white" />,
      title: 'เวลาทำการ',
      detail: 'จันทร์ - ศุกร์ 08:30 - 17:30 น.',
      bgColor: 'bg-[#1e2e42]',
    },
  ];

  return (
    <section
      id="booking"
      ref={sectionRef}
      className="py-24 bg-[#f8faff] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="fade-up opacity-0 translate-y-8 transition-all duration-700 text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1e2e42] mb-4">
            ปรึกษากฎหมายกับเรา
          </h2>
          <p className="fade-up opacity-0 translate-y-8 transition-all duration-700 delay-100 text-gray-600 max-w-2xl mx-auto">
            ติดต่อเราเพื่อรับคำปรึกษาทางกฎหมายฟรี ทีมงานของเราพร้อมให้คำแนะนำและช่วยเหลือคุณ
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column - Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="fade-up opacity-0 translate-y-8 transition-all duration-700 p-6 rounded-xl bg-white shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow"
                style={{ transitionDelay: `${(index + 2) * 100}ms` }}
              >
                <div className={`w-12 h-12 rounded-lg ${info.bgColor} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  {info.icon}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#1e2e42] mb-1">{info.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{info.detail}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-7 fade-up opacity-0 translate-y-8 transition-all duration-700 delay-400 bg-white rounded-2xl shadow-xl p-8 lg:p-10 border border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-500">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-[#1e2e42]">ส่งข้อความถึงเรา</h4>
                <p className="text-sm text-gray-500">กรอกข้อมูลเพื่อรับคำปรึกษาฟรี</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-[#1e2e42] mb-2">ชื่อ-นามสกุล *</label>
                  <input
                    type="text"
                    required
                    placeholder="กรอกชื่อ-นามสกุล"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all text-gray-700 bg-gray-50/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#1e2e42] mb-2">เบอร์โทรศัพท์ *</label>
                  <input
                    type="tel"
                    required
                    placeholder="กรอกเบอร์โทรศัพท์"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all text-gray-700 bg-gray-50/50"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-[#1e2e42] mb-2">อีเมล</label>
                  <input
                    type="email"
                    placeholder="กรอกอีเมล (ถ้ามี)"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all text-gray-700 bg-gray-50/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#1e2e42] mb-2">หัวข้อที่ต้องการปรึกษา</label>
                  <input
                    type="text"
                    placeholder="เช่น คดีแพ่ง, คดีอาญา"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all text-gray-700 bg-gray-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1e2e42] mb-2">รายละเอียด *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="กรอกรายละเอียดคดีหรือปัญหาทางกฎหมายที่ต้องการปรึกษา"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all text-gray-700 bg-gray-50/50 resize-none"
                ></textarea>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#cc3e35] hover:bg-[#b0352d] text-white py-6 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-red-500/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                <Send className="w-5 h-5" />
                ส่งข้อความ
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-100 text-center text-gray-500 text-sm">
              หรือโทรหาเราที่ <span className="font-bold text-[#1e2e42]">02-743-4025</span> ตลอด 24 ชั่วโมง
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
