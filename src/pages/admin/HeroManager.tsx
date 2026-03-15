import React, { useState, useEffect } from 'react';
import { fetchApi } from '../../lib/api';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Save, RefreshCw } from 'lucide-react';

interface Hero {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  image: string;
  trustedText: string;
}

const HeroManager: React.FC = () => {
  const [formData, setFormData] = useState<Partial<Hero>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const loadHero = async () => {
    try {
      const data = await fetchApi<Hero>('/hero');
      setFormData(data || {});
    } catch (error) {
      toast.error('ไม่สามารถโหลดข้อมูล Hero ได้');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadHero();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // In this system, we only have one Hero entry, so we POST to it (it handles update if exists)
      await fetchApi('/hero', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      toast.success('บันทึกข้อมูล Hero สำเร็จ');
      loadHero();
    } catch (error) {
      toast.error('ไม่สามารถบันทึกข้อมูลได้');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="text-white">Loading...</div>;

  return (
    <div className="max-w-4xl space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">จัดการเนื้อหา Hero (หน้าแรก)</h2>
          <p className="text-gray-400 text-sm">แก้ไขข้อความและรูปภาพในส่วนบนสุดของเว็บไซต์</p>
        </div>
        <Button 
          onClick={loadHero} 
          variant="outline" 
          className="border-white/10 hover:bg-white/5"
        >
          <RefreshCw className="w-4 h-4 mr-2" /> โหลดใหม่
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Edit Form */}
        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Badge Text (ข้อความเล็กด้านบน)</label>
              <input
                value={formData.badge || ''}
                onChange={e => setFormData({ ...formData, badge: e.target.value })}
                className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-secondary transition-colors"
                placeholder="Ex: Trusted Legal Partners"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Main Title (หัวข้อหลัก)</label>
              <textarea
                value={formData.title || ''}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-secondary transition-colors resize-none h-24"
                placeholder="Ex: พิทักษ์สิทธิของคุณ ด้วยความเชี่ยวชาญระดับมืออาชีพ"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Subtitle (คำอธิบาย)</label>
              <textarea
                value={formData.subtitle || ''}
                onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
                className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-secondary transition-colors resize-none h-32"
                placeholder="Ex: เราพร้อมเคียงข้างคุณในทุกปัญหาข้อกฎหมาย..."
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Hero Image URL (รูปภาพพื้นหลัง)</label>
              <input
                value={formData.image || ''}
                onChange={e => setFormData({ ...formData, image: e.target.value })}
                className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-secondary transition-colors"
                placeholder="Ex: https://..."
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Trusted Text (สถิติ/ความเชื่อมั่น)</label>
              <input
                value={formData.trustedText || ''}
                onChange={e => setFormData({ ...formData, trustedText: e.target.value })}
                className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-secondary transition-colors"
                placeholder="Ex: 5,000+ คดีที่ประสบความสำเร็จ"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isSaving}
              className="w-full bg-secondary text-primary hover:bg-white transition-all py-6 text-lg font-bold shadow-[0_0_20px_rgba(212,175,55,0.2)]"
            >
              <Save className="w-5 h-5 mr-2" />
              {isSaving ? 'กำลังบันทึก...' : 'บันทึกการเปลี่ยนแปลง'}
            </Button>
          </form>
        </div>

        {/* Preview */}
        <div className="space-y-6">
          <div className="sticky top-24">
            <h3 className="text-lg font-semibold mb-4 text-gray-400">Live Preview (Mobile Size)</h3>
            <div className="border border-white/10 rounded-[2.5rem] p-4 bg-dark overflow-hidden shadow-2xl">
              <div className="bg-dark/50 aspect-[9/16] rounded-[2rem] overflow-hidden border border-white/5 relative">
                {/* Mock Hero content */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark/90 z-[1]" />
                <img 
                  src={formData.image || 'https://via.placeholder.com/400x800'} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 z-[2] p-6 flex flex-col justify-end">
                  <span className="text-[10px] uppercase font-bold text-secondary mb-2 bg-secondary/10 px-2 py-0.5 rounded-full inline-block self-start">
                    {formData.badge || 'BADGE TEXT'}
                  </span>
                  <h4 className="text-xl font-bold text-white mb-2 leading-tight">
                    {formData.title || 'HERO TITLE'}
                  </h4>
                  <p className="text-[10px] text-gray-300 line-clamp-3 mb-4">
                    {formData.subtitle || 'Subtitle description goes here...'}
                  </p>
                  <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/10">
                    <p className="text-[10px] font-semibold text-secondary">{formData.trustedText || '5,000+ Success Stories'}</p>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center text-xs text-gray-500 mt-4 italic">** นี่เป็นเพียงการแสดงผลตัวอย่างเบื้องต้น **</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroManager;
