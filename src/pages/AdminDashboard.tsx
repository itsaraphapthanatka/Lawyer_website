import React, { useState, useEffect } from 'react';
import { fetchApi } from '../lib/api';
import { 
  Users, 
  MessageSquare, 
  Star, 
  ArrowUpRight 
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    experts: 0,
    messages: 0,
    testimonials: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [experts, messages, testimonials] = await Promise.all([
          fetchApi<any[]>('/experts'),
          fetchApi<any[]>('/contact-messages'),
          fetchApi<any[]>('/testimonials'),
        ]);
        
        setStats({
          experts: experts.length,
          messages: messages.length,
          testimonials: testimonials.length,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { title: 'Total Experts', value: stats.experts, icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { title: 'Messages', value: stats.messages, icon: MessageSquare, color: 'text-green-400', bg: 'bg-green-400/10' },
    { title: 'Testimonials', value: stats.testimonials, icon: Star, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white">ยินดีต้อนรับกลับ, Admin</h2>
        <p className="text-gray-400">นี่คือภาพรวมของข้อมูลในเว็บไซต์ของคุณ</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat) => (
          <div key={stat.title} className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <div className="flex justify-between items-start mb-4">
              <div className={`${stat.bg} p-3 rounded-lg`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <button className="text-gray-500 hover:text-white transition-colors">
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </div>
            <h3 className="text-gray-400 text-sm font-medium">{stat.title}</h3>
            <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
        <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-dark border border-white/5 rounded-xl hover:border-secondary/50 transition-all text-sm font-medium">
            Manage Experts
          </button>
          <button className="p-4 bg-dark border border-white/5 rounded-xl hover:border-secondary/50 transition-all text-sm font-medium">
            Check Messages
          </button>
          <button className="p-4 bg-dark border border-white/5 rounded-xl hover:border-secondary/50 transition-all text-sm font-medium">
            Update Pricing
          </button>
          <button className="p-4 bg-dark border border-white/5 rounded-xl hover:border-secondary/50 transition-all text-sm font-medium">
            Edit Hero Content
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
