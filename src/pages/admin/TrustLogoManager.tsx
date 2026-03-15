import React, { useState, useEffect } from 'react';
import { fetchApi } from '../../lib/api';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Plus, Trash2, X } from 'lucide-react';

interface TrustLogo {
  id: string;
  name: string;
  logoUrl: string;
  order: number;
}

const TrustLogoManager: React.FC = () => {
  const [logos, setLogos] = useState<TrustLogo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newLogo, setNewLogo] = useState<Partial<TrustLogo>>({});

  const loadLogos = async () => {
    try {
      const data = await fetchApi<TrustLogo[]>('/trust-logos');
      setLogos(data.sort((a, b) => a.order - b.order));
    } catch (error) {
      toast.error('ไม่สามารถโหลดข้อมูลโลโก้ได้');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLogos();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetchApi('/trust-logos', {
        method: 'POST',
        body: JSON.stringify({ ...newLogo, order: logos.length }),
      });
      toast.success('เพิ่มโลโก้สำเร็จ');
      setIsAdding(false);
      setNewLogo({});
      loadLogos();
    } catch (error: any) {
      toast.error(error.message || 'เกิดข้อผิดพลาด');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('ยืนยันการลบโลโก้?')) return;
    try {
      await fetchApi(`/trust-logos/${id}`, { method: 'DELETE' });
      toast.success('ลบข้อมูลสำเร็จ');
      loadLogos();
    } catch (error) {
      toast.error('ไม่สามารถลบข้อมูลได้');
    }
  };

  if (isLoading) return <div className="text-white">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">จัดการโลโก้ความไว้วางใจ (Trust Logos)</h2>
        <Button onClick={() => setIsAdding(true)} className="bg-secondary text-primary">
          <Plus className="w-5 h-5 mr-2" /> เพิ่มโลโก้
        </Button>
      </div>

      {isAdding && (
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">เพิ่มโลโก้ใหม่</h3>
            <button onClick={() => setIsAdding(false)} className="text-gray-400 hover:text-white"><X /></button>
          </div>
          <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">ชื่อบริษัท/หน่วยงาน</label>
              <input 
                value={newLogo.name || ''} 
                onChange={e => setNewLogo({...newLogo, name: e.target.value})}
                className="w-full bg-dark border border-white/10 rounded-lg px-4 py-2 text-white" 
                required 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">URL โลโก้ (ไฟล์รูปภาพ PNG/SVG)</label>
              <input 
                value={newLogo.logoUrl || ''} 
                onChange={e => setNewLogo({...newLogo, logoUrl: e.target.value})}
                className="w-full bg-dark border border-white/10 rounded-lg px-4 py-2 text-white" 
                required 
              />
            </div>
            <div className="md:col-span-2 flex justify-end gap-2 mt-4">
              <Button type="button" variant="ghost" onClick={() => setIsAdding(false)}>ยกเลิก</Button>
              <Button type="submit" className="bg-secondary text-primary">บันทึกโลโก้</Button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {logos.map((logo) => (
          <div key={logo.id} className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col items-center gap-4 relative group">
            <div className="w-full h-12 flex items-center justify-center filter grayscale group-hover:grayscale-0 transition-all opacity-50 group-hover:opacity-100">
              <img src={logo.logoUrl} alt={logo.name} className="max-w-full max-h-full object-contain" />
            </div>
            <p className="text-xs text-gray-400 font-medium truncate w-full text-center">{logo.name}</p>
            <button 
              onClick={() => handleDelete(logo.id)}
              className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustLogoManager;
