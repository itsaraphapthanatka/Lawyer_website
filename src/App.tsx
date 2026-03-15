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
import MapSection from '@/sections/MapSection';
import PracticeAreasPage from '@/pages/PracticeAreasPage';
import AdminLogin from '@/pages/AdminLogin';
import AdminDashboard from '@/pages/AdminDashboard';
import ExpertManager from '@/pages/admin/ExpertManager';
import MessageManager from '@/pages/admin/MessageManager';
import HeroManager from '@/pages/admin/HeroManager';
import AboutManager from '@/pages/admin/AboutManager';
import PracticeAreaManager from '@/pages/admin/PracticeAreaManager';
import ProcessManager from '@/pages/admin/ProcessManager';
import TestimonialManager from '@/pages/admin/TestimonialManager';
import TrustLogoManager from '@/pages/admin/TrustLogoManager';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminLayout from '@/components/AdminLayout';
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
        <MapSection />
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
          <Route path="/admin/login" element={<AdminLogin />} />
          
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/experts" element={<ExpertManager />} />
              <Route path="/admin/messages" element={<MessageManager />} />
              <Route path="/admin/hero" element={<HeroManager />} />
              <Route path="/admin/about" element={<AboutManager />} />
              <Route path="/admin/practice-areas" element={<PracticeAreaManager />} />
              <Route path="/admin/process" element={<ProcessManager />} />
              <Route path="/admin/testimonials" element={<TestimonialManager />} />
              <Route path="/admin/trust-logos" element={<TrustLogoManager />} />
              {/* Other admin routes will go here */}
            </Route>
          </Route>
        </Routes>
        <Toaster position="top-center" richColors />
      </div>
    </Router>
  );
}

export default App;
