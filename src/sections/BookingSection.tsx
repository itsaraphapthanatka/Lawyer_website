import { useEffect, useRef, useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { fetchApi } from '@/lib/api';

interface AboutData {
  address: string;
  phone: string;
  workingHours: string;
  officeMap?: string;
}

const BookingSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    topic: '',
    details: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = sectionRef.current?.querySelectorAll('.fade-up');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [aboutData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await fetchApi('/contact-messages', {
        method: 'POST',
        body: JSON.stringify(formData),
      });

      toast.success('ส่งข้อความสำเร็จ', {
        description: 'ทีมงานของเราได้รับข้อมูลแล้ว และจะติดต่อกลับโดยเร็วที่สุด',
      });
      
      // Reset form
      setFormData({ name: '', phone: '', email: '', topic: '', details: '' });
    } catch (error) {
      toast.error('เกิดข้อผิดพลาด', {
        description: 'ไม่สามารถส่งข้อความได้ กรุณาลองใหม่อีกครั้งในภายหลัง',
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactItems = [
    {
      icon: <MapPin className="w-6 h-6 text-white" />,
      title: 'ที่อยู่',
      detail: aboutData?.address || 'กำลังโหลด...',
    },
    {
      icon: <Phone className="w-6 h-6 text-white" />,
      title: 'โทรศัพท์',
      detail: aboutData?.phone || 'กำลังโหลด...',
    },
    {
      icon: <Mail className="w-6 h-6 text-white" />,
      title: 'อีเมล',
      detail: 'tanawat_vg@hotmail.com',
    },
    {
      icon: <Clock className="w-6 h-6 text-white" />,
      title: 'เวลาทำการ',
      detail: aboutData?.workingHours || 'กำลังโหลด...',
    },
  ];

  return (
    <section
      id="booking"
      ref={sectionRef}
      className="py-24 bg-dark overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="fade-up opacity-0 translate-y-8 transition-all duration-700 text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
            ปรึกษากฎหมายกับเรา
          </h2>
          <p className="fade-up opacity-0 translate-y-8 transition-all duration-700 delay-100 text-gray-400 max-w-2xl mx-auto">
            ติดต่อเราเพื่อรับคำปรึกษาทางกฎหมายฟรี ทีมงานของเราพร้อมให้คำแนะนำและช่วยเหลือคุณ
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column - Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            {contactItems.map((info, index) => (
              <div
                key={index}
                className="fade-up opacity-0 translate-y-8 transition-all duration-700 p-6 rounded-xl bg-dark-light border border-white/10 flex items-start gap-4 hover:border-secondary/50 transition-all group"
                style={{ transitionDelay: `${(index + 2) * 100}ms` }}
              >
                <div className={`w-12 h-12 rounded-lg bg-primary flex items-center justify-center flex-shrink-0 shadow-lg group-hover:bg-secondary transition-colors`}>
                  {info.icon}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1 group-hover:text-secondary transition-colors">{info.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{info.detail}</p>
                </div>
              </div>
            ))}

            {/* Office Map */}
            {aboutData?.officeMap && (
              <div className="fade-up opacity-0 translate-y-8 transition-all duration-700 mt-8 rounded-2xl overflow-hidden border border-white/10 h-[300px] shadow-xl">
                <iframe
                  src={aboutData.officeMap.includes('<iframe') 
                    ? aboutData.officeMap.match(/src="([^"]+)"/)?.[1] 
                    : aboutData.officeMap}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Map"
                ></iframe>
              </div>
            )}
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-7 fade-up opacity-0 translate-y-8 transition-all duration-700 delay-400 bg-dark-light rounded-2xl shadow-xl p-8 lg:p-10 border border-white/10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white">ส่งข้อความถึงเรา</h4>
                <p className="text-sm text-gray-500">กรอกข้อมูลเพื่อรับคำปรึกษาฟรี</p>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-300">
                    ชื่อ-นามสกุล <span className="text-secondary">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-dark/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-secondary transition-colors"
                    placeholder="ระบุชื่อ-นามสกุลของคุณ"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-gray-300">
                    เบอร์โทรศัพท์ <span className="text-secondary">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-dark/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-secondary transition-colors"
                    placeholder="08X-XXX-XXXX"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-300">
                  อีเมล <span className="text-secondary">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-dark/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-secondary transition-colors"
                  placeholder="example@email.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="topic" className="text-sm font-medium text-gray-300">
                  หัวข้อที่ต้องการปรึกษา <span className="text-secondary">*</span>
                </label>
                <select
                  id="topic"
                  name="topic"
                  value={formData.topic}
                  onChange={handleInputChange as any}
                  required
                  className="w-full bg-dark/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-secondary transition-colors appearance-none"
                >
                  <option value="" disabled>เลือกหัวข้อที่ตรงกับความต้องการของคุณ</option>
                  <option value="corporate" className="bg-dark">กฎหมายองค์กรและธุรกิจ</option>
                  <option value="family" className="bg-dark">กฎหมายครอบครัว</option>
                  <option value="criminal" className="bg-dark">คดีอาญา</option>
                  <option value="realestate" className="bg-dark">อสังหาริมทรัพย์</option>
                  <option value="other" className="bg-dark">อื่นๆ</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="details" className="text-sm font-medium text-gray-300">
                  รายละเอียดเบื้องต้น
                </label>
                <textarea
                  id="details"
                  name="details"
                  value={formData.details}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full bg-dark/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-secondary transition-colors resize-none"
                  placeholder="อธิบายสถานการณ์หรือคำถามของคุณโดยสังเขป"
                ></textarea>
              </div>

              <div className="pt-2">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`w-full bg-secondary text-primary hover:bg-white transition-all duration-300 py-6 text-lg font-bold group shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  <span className="flex items-center gap-2">
                    {isSubmitting ? 'กำลังส่งข้อมูล...' : 'ส่งข้อความ'}
                    <Send className={`w-5 h-5 ${!isSubmitting && 'group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform'}`} />
                  </span>
                </Button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-white/5 text-center text-gray-500 text-sm">
              หรือโทรหาเราที่ <span className="font-bold text-secondary">{aboutData?.phone || '02-743-4025'}</span> ตลอด 24 ชั่วโมง
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
