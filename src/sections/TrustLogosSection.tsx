import { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api';

interface TrustLogo {
  id: string;
  name: string;
}

const TrustLogosSection = () => {
  const [logos, setLogos] = useState<TrustLogo[]>([]);

  useEffect(() => {
    const loadLogos = async () => {
      try {
        const data = await fetchApi<TrustLogo[]>('/trust-logos');
        setLogos(data);
      } catch (error) {
        console.error('Failed to load trust logos:', error);
      }
    };
    loadLogos();
  }, []);

  if (logos.length === 0) return null;

  return (
    <div className="py-12 border-y border-white/10 bg-dark-light/50">
      <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 hover:opacity-100 transition-all duration-500">
        {logos.map((logo) => (
          <div
            key={logo.id}
            className="flex items-center gap-2 font-serif text-xl font-bold italic text-gray-400 hover:text-secondary transition-colors"
          >
            {logo.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustLogosSection;
