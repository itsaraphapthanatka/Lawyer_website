import { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';
import { fetchApi } from '@/lib/api';

interface AboutData {
  address: string;
  officeMap?: string;
}

const MapSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [aboutData, setAboutData] = useState<AboutData | null>(null);

  useEffect(() => {
    const loadAbout = async () => {
      try {
        const data = await fetchApi<AboutData>('/about');
        setAboutData(data);
      } catch (error) {
        console.error('Failed to load about data for map:', error);
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [aboutData]);

  if (!aboutData?.officeMap) return null;

  // Extract src from iframe string if necessary
  const mapUrl = aboutData.officeMap.includes('<iframe') 
    ? aboutData.officeMap.match(/src="([^"]+)"/)?.[1] 
    : aboutData.officeMap;

  return (
    <section
      ref={sectionRef}
      className="bg-dark relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="fade-up opacity-0 translate-y-8 transition-all duration-700 bg-dark-light rounded-3xl overflow-hidden border border-white/10 shadow-2xl h-[450px] relative group">
          {/* Overlay Info Card (Optional styled touch) */}
          <div className="absolute top-6 left-6 z-10 hidden md:block max-w-xs bg-dark/80 backdrop-blur-md border border-white/10 p-5 rounded-2xl animate-in fade-in slide-in-from-left-4 duration-1000">
             <div className="flex items-start gap-3">
               <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-secondary" />
               </div>
               <div>
                  <h4 className="text-white font-bold mb-1">ตำแหน่งที่ตั้ง</h4>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {aboutData.address}
                  </p>
               </div>
             </div>
          </div>

          <iframe
            src={mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Office Location Map"
            className="filter grayscale-[20%] contrast-[1.1] hover:grayscale-0 transition-all duration-700"
          ></iframe>
          
          <div className="absolute inset-0 pointer-events-none border-[12px] border-dark-light/5 rounded-3xl"></div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
