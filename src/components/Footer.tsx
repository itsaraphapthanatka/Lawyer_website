import { Scale, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-dark text-white pt-24 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-secondary text-primary">
                <Scale className="w-6 h-6" />
              </div>
              <span className="text-xl font-serif font-bold tracking-tight uppercase tracking-widest">
                สำนักงาน <span className="text-secondary">ธนวัฒน์ทนายความ</span>
              </span>
            </div>
            <p className="text-gray-400 max-w-sm mb-8 leading-relaxed">
              กำหนดมาตรฐานความเป็นเลิศในการให้คำปรึกษาทางกฎหมาย
              เราเป็นตัวแทนของบริษัทและบุคคลที่ประสบความสำเร็จด้วยความทุ่มเทอย่างไม่ย่อท้อ
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#"
                className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors"
                aria-label="Line"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                </svg>
              </a>
              <a
                href="#"
                className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors"
                aria-label="Website"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c2.348 0 4.49.833 6.176 2.217C16.758 5.431 15.154 6.5 13.5 7.5c-.896-2.104-2.104-4.01-3.5-5.5C11.5 2 11.75 2 12 2zM8.5 3c1.396 1.49 2.604 3.396 3.5 5.5-2.104.896-4.01 2.104-5.5 3.5C6.5 8.5 7.25 5.5 8.5 3zm-5.676 3.176C4.833 4.49 6.652 3.5 8.5 3c-1.25 2.5-2 5.5-2.5 9-1.49-1.396-3.396-2.604-5.5-3.5.896-2.104 2.104-4.01 3.824-5.824zM2 12c0-.25 0-.5.176-.824C4.49 12.167 6.396 13.375 8.5 14.271c-.25 2.229-.25 4.458 0 6.687C5.431 19.758 3.5 17.5 2 15c0-1 0-2 0-3zm6.5 9c-.25-2.229-.25-4.458 0-6.687 2.104.896 4.01 2.104 5.5 3.5-1.396 1.49-3.396 2.604-5.5 3.187zM12 22c-.25 0-.5 0-.824-.176-1.49-1.396-2.604-3.396-3.5-5.5 2.104-.896 4.01-2.104 5.5-3.5.896 2.104 2.104 4.01 3.5 5.5C16.167 20.51 14.167 22 12 22zm3.5-1c1.396-1.49 2.604-3.396 3.5-5.5 2.104.896 4.01 2.104 5.5 3.5-.896 2.104-2.104 4.01-3.5 5.5-.583-2.104-1.697-4.104-3.5-3.5zm5.676-3.176C19.167 15.833 17.348 16.5 15.5 17c.5-3.5 1.25-6.5 2.5-9 1.49 1.396 3.396 2.604 5.5 3.5-.896 2.104-2.104 4.01-3.824 5.824z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h5 className="text-lg font-bold mb-8 text-secondary">สถานที่ตั้งสำนักงาน</h5>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-secondary mt-1 flex-shrink-0" />
                <span>
                  43 ซ.อุดมสุข 53 แยก 4<br />
                  แขวงหนองบอน เขตประเวศ<br />
                  กรุงเทพมหานคร 10250
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-secondary mt-1 flex-shrink-0" />
                <span>02-743-4025-6<br />08-98765-789</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-secondary mt-1 flex-shrink-0" />
                <span>tanawat_vg@hotmail.com</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-lg font-bold mb-8 text-secondary">ลิงก์ด่วน</h5>
            <ul className="space-y-4 text-gray-400">
              <li>
                <button onClick={() => scrollToSection('#practice-areas')} className="hover:text-secondary transition-colors">
                  สาขาที่เชี่ยวชาญ
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('#experts')} className="hover:text-secondary transition-colors">
                  ผู้เชี่ยวชาญของเรา
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('#booking')} className="hover:text-secondary transition-colors">
                  นัดหมายที่ปรึกษา
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('#testimonials')} className="hover:text-secondary transition-colors">
                  รีวิวจากลูกค้า
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/10 text-center text-gray-500 text-sm">
          <p>© {currentYear} สำนักงานกฎหมายฉัตรชัยและเพื่อน สงวนลิขสิทธิ์</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
