import { useEffect, useRef, useState } from 'react';
import { Star } from 'lucide-react';
import { fetchApi } from '@/lib/api';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  position: string;
  avatar: string;
  rating: number;
}

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    // Fetch testimonials from API
    const loadTestimonials = async () => {
      try {
        const data = await fetchApi<Testimonial[]>('/testimonials');
        setTestimonials(data);
      } catch (error) {
        console.error('Failed to load testimonials:', error);
      }
    };
    loadTestimonials();
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
  }, [testimonials]);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-24 bg-dark"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="fade-up opacity-0 translate-y-8 transition-all duration-700 text-secondary text-sm font-bold uppercase tracking-widest mb-4">
            รีวิวจากลูกค้า
          </h2>
          <h3 className="fade-up opacity-0 translate-y-8 transition-all duration-700 delay-100 text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white">
            เรื่องราวความสำเร็จของลูกค้า
          </h3>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`fade-up opacity-0 translate-y-8 transition-all duration-700 p-8 rounded-2xl bg-dark-light border border-white/10`}
              style={{ transitionDelay: `${(index + 2) * 100}ms` }}
            >
              {/* Stars */}
              <div className="flex text-secondary mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-400 mb-8 italic leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full overflow-hidden">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-white">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
