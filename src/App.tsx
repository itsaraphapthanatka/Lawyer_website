import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import PracticeAreasPage from '@/pages/PracticeAreasPage';
import './App.css';

function Home() {
  return (
    <>
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
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-dark">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/practice-areas" element={<PracticeAreasPage />} />
        </Routes>
        <Toaster position="top-center" richColors />
      </div>
    </Router>
  );
}

export default App;
