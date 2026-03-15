import React from 'react';
import { useNavigate, useLocation, Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent
} from '@/components/ui/sidebar';
import { 
  Users, 
  MessageSquare, 
  LayoutDashboard, 
  LogOut, 
  Star, 
  Clock, 
  Shield, 
  Image as ImageIcon,
  Briefcase,
  Layers
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const menuItems = [
    { title: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { title: 'Messages', icon: MessageSquare, path: '/admin/messages' },
  ];

  const sectionItems = [
    { title: 'Hero Section', icon: ImageIcon, path: '/admin/hero' },
    { title: 'About & Contact', icon: Shield, path: '/admin/about' },
    { title: 'Practice Areas', icon: Briefcase, path: '/admin/practice-areas' },
    { title: 'Process Steps', icon: Clock, path: '/admin/process' },
    { title: 'Experts', icon: Users, path: '/admin/experts' },
    { title: 'Testimonials', icon: Star, path: '/admin/testimonials' },
    { title: 'Trust Logos', icon: Layers, path: '/admin/trust-logos' },
  ];

  return (
    <SidebarProvider>
      <Sidebar variant="inset" className="border-white/10 bg-white/5">
          <SidebarHeader className="p-6">
            <h2 className="text-xl font-bold text-secondary">TANAWAT ADMIN</h2>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-gray-400">Main</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton 
                        asChild 
                        isActive={location.pathname === item.path}
                        className="hover:bg-white/10 transition-colors"
                      >
                        <Link to={item.path} className="flex items-center gap-3 py-2">
                          <item.icon className="w-5 h-5" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel className="text-gray-400">Content Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {sectionItems.map((item) => (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton 
                        asChild 
                        isActive={location.pathname === item.path}
                        className="hover:bg-white/10 transition-colors"
                      >
                        <Link to={item.path} className="flex items-center gap-3 py-2">
                          <item.icon className="w-5 h-5" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="p-4 border-t border-white/10">
            <div className="mb-4 px-2">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-gray-400 truncate">{user?.email}</p>
            </div>
            <Button 
              onClick={handleLogout}
              variant="ghost" 
              className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-900/20"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Sign Out
            </Button>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="bg-dark">
          <header className="h-16 border-b border-white/10 flex items-center px-6 sticky top-0 bg-dark/80 backdrop-blur-md z-10">
            <SidebarTrigger className="mr-4" />
            <h1 className="text-lg font-semibold">
              {sectionItems.find(i => i.path === location.pathname)?.title || 
               menuItems.find(i => i.path === location.pathname)?.title || 
               'Admin Panel'}
            </h1>
          </header>
          
          <main className="p-8">
            <Outlet />
          </main>
        </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLayout;
