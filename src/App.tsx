import { Outlet } from 'react-router-dom';
import type { RouteRecord } from 'vite-react-ssg';
import { AuthProvider } from '@/context/AuthContext';
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
import BlogsPage from '@/pages/BlogsPage';
import BlogDetailPage from '@/pages/BlogDetailPage';
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
import BlogManager from '@/pages/admin/BlogManager';
import AutoBlogManager from '@/pages/admin/AutoBlogManager';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminLayout from '@/components/AdminLayout';
import NotFoundPage from '@/pages/NotFoundPage';
import FloatingActions from '@/components/FloatingActions';
import { blogPaths } from '@/lib/ssgData';
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

// Layout ครอบทุกหน้า — เดิมอยู่ใน <Router> ของ App และ AuthProvider อยู่ใน main.tsx
// ตอนนี้ main.tsx เป็น entry ของ ViteReactSSG แล้ว จึงต้องย้ายมาไว้ในนี้
const Layout = () => (
  <AuthProvider>
    <div className="min-h-screen bg-dark">
      <Outlet />
      <FloatingActions />
      <Toaster position="top-center" richColors />
    </div>
  </AuthProvider>
);

const adminChildren: RouteRecord[] = [
  { path: 'admin', element: <AdminDashboard /> },
  { path: 'admin/experts', element: <ExpertManager /> },
  { path: 'admin/messages', element: <MessageManager /> },
  { path: 'admin/hero', element: <HeroManager /> },
  { path: 'admin/about', element: <AboutManager /> },
  { path: 'admin/practice-areas', element: <PracticeAreaManager /> },
  { path: 'admin/process', element: <ProcessManager /> },
  { path: 'admin/testimonials', element: <TestimonialManager /> },
  { path: 'admin/trust-logos', element: <TrustLogoManager /> },
  { path: 'admin/blogs', element: <BlogManager /> },
  { path: 'admin/blog-schedule', element: <AutoBlogManager /> },
];

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'practice-areas', element: <PracticeAreasPage /> },
      { path: 'blogs', element: <BlogsPage /> },
      // prerender บทความทุกชิ้นที่เผยแพร่ — รายชื่อดึงจาก API ตอน build (route แบบ :id ไม่ถูก prerender เองถ้าไม่บอก)
      { path: 'blogs/:id', element: <BlogDetailPage />, getStaticPaths: blogPaths },
      { path: 'admin/login', element: <AdminLogin /> },
      { element: <ProtectedRoute />, children: [{ element: <AdminLayout />, children: adminChildren }] },
      // หน้า 404 แบบ prerender (dist/404.html) ให้ edge ส่งเป็น body ของ path ที่ไม่มีจริงพร้อม status 404
      // — ถ้าส่ง index.html (หน้าแรกที่ prerender แล้ว) React จะ hydrate ไม่ตรงแล้วต้องเรนเดอร์ใหม่ทั้งหน้า
      { path: '404', element: <NotFoundPage /> },
      // ต้องอยู่ล่างสุดเสมอ (edge ตอบ HTTP 404 ให้อยู่แล้ว ดู Caddyfile matcher @spa)
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];
