import { Toaster } from '@/components/ui/sonner';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HeroSection from '@/sections/HeroSection';
import AboutSection from '@/sections/AboutSection';
import TrustLogosSection from '@/sections/TrustLogosSection';
import PracticeAreasSection from '@/sections/PracticeAreasSection';
import ProcessSection from '@/sections/ProcessSection';
import ExpertsSection from '@/sections/ExpertsSection';
import BookingSection from '@/sections/BookingSection';
import TestimonialsSection from '@/sections/TestimonialsSection';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-dark">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <TrustLogosSection />
        <PracticeAreasSection />
        <ProcessSection />
        <ExpertsSection />
        <BookingSection />
        <TestimonialsSection />
      </main>
      <Footer />
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;
