import { useState, useEffect } from 'react';
import { Menu, X, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'เกี่ยวกับเรา', href: '#about' },
    { name: 'สาขาที่เชี่ยวชาญ', href: '#practice-areas' },
    { name: 'ผู้เชี่ยวชาญของเรา', href: '#experts' },
    { name: 'ขั้นตอนการทำงาน', href: '#process' },
    { name: 'รีวิวจากลูกค้า', href: '#testimonials' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-dark/90 backdrop-blur-md border-b border-white/10'
        : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-primary text-secondary">
              <Scale className="w-6 h-6" />
            </div>
            <span className="text-xl font-serif font-bold tracking-tight text-white uppercase tracking-widest">
              สำนักงาน <span className="text-secondary">ธนวัฒน์ทนายความ</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="text-sm font-medium text-gray-300 hover:text-secondary transition-colors"
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              onClick={() => scrollToSection('#booking')}
              className="bg-primary hover:bg-navy-800 text-white px-6 py-2.5 rounded-lg text-sm font-bold border border-secondary/30 transition-all shadow-lg shadow-black/20"
            >
              ปรึกษากฎหมายกับเรา
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-dark-light rounded-lg shadow-xl mt-2 p-4 border border-white/10">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-left text-gray-300 font-medium py-2 hover:text-secondary transition-colors"
                >
                  {link.name}
                </button>
              ))}
              <hr className="border-white/10" />
              <Button
                onClick={() => scrollToSection('#booking')}
                className="bg-primary hover:bg-navy-800 text-white w-full"
              >
                ปรึกษากฎหมายกับเรา
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;
