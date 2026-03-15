import React, { useState, useEffect } from 'react';
import { fetchApi } from '../../lib/api';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';

interface Expert {
  id: string;
  name: string;
  position: string;
  specialty: string;
  image: string;
}

const ExpertManager: React.FC = () => {
  const [experts, setExperts] = useState<Expert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentExpert, setCurrentExpert] = useState<Partial<Expert>>({});

  const loadExperts = async () => {
    try {
      const data = await fetchApi<Expert[]>('/experts');
      setExperts(data);
    } catch (error) {
      toast.error('ไม่สามารถโหลดข้อมูลผู้เชี่ยวชาญได้');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadExperts();
  }, []);

  const handleCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = currentExpert.id ? 'PATCH' : 'POST';
    const endpoint = currentExpert.id ? `/experts/${currentExpert.id}` : '/experts';

    try {
      await fetchApi(endpoint, {
        method,
        body: JSON.stringify(currentExpert),
      });
      toast.success(currentExpert.id ? 'อัปเดตข้อมูลสำเร็จ' : 'เพิ่มผู้เชี่ยวชาญสำเร็จ');
      setIsEditing(false);
      loadExperts();
    } catch (error: any) {
      toast.error(error.message || 'เกิดข้อผิดพลาด');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('คุณต้องการลบผู้เชี่ยวชาญท่านนี้ใช่หรือไม่?')) return;

    try {
      await fetchApi(`/experts/${id}`, { method: 'DELETE' });
      toast.success('ลบข้อมูลสำเร็จ');
      loadExperts();
    } catch (error) {
      toast.error('ไม่สามารถลบข้อมูลได้');
    }
  };

  if (isLoading) return <div className="text-white">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">จัดการรายชื่อผู้เชี่ยวชาญ</h2>
        <Button onClick={() => { setCurrentExpert({}); setIsEditing(true); }} className="bg-secondary text-primary hover:bg-white">
          <Plus className="w-5 h-5 mr-2" /> เพิ่มผู้เชี่ยวชาญ
        </Button>
      </div>

      {isEditing && (
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl shadow-xl animate-in fade-in slide-in-from-top-4">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">{currentExpert.id ? 'แก้ไขข้อมูล' : 'เพิ่มผู้เชี่ยวชาญใหม่'}</h3>
            <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-white"><X /></button>
          </div>
          <form onSubmit={handleCreateOrUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">ชื่อ-นามสกุล</label>
              <input 
                value={currentExpert.name || ''} 
                onChange={e => setCurrentExpert({...currentExpert, name: e.target.value})}
                className="w-full bg-dark border border-white/10 rounded-lg px-4 py-2 text-white" 
                required 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">ตำแหน่ง</label>
              <input 
                value={currentExpert.position || ''} 
                onChange={e => setCurrentExpert({...currentExpert, position: e.target.value})}
                className="w-full bg-dark border border-white/10 rounded-lg px-4 py-2 text-white" 
                required 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">ความเชี่ยวชาญ (Specialty)</label>
              <input 
                value={currentExpert.specialty || ''} 
                onChange={e => setCurrentExpert({...currentExpert, specialty: e.target.value})}
                className="w-full bg-dark border border-white/10 rounded-lg px-4 py-2 text-white" 
                required 
              />
            </div>
            <div className="md:col-span-2 flex flex-col gap-2">
              <label className="text-sm text-gray-400">รูปภาพผู้เชี่ยวชาญ</label>
              <ImageUpload
                value={currentExpert.image}
                onChange={(url) => setCurrentExpert({ ...currentExpert, image: url })}
              />
            </div>
            <div className="md:col-span-2 flex justify-end gap-2 mt-4">
              <Button type="button" variant="ghost" onClick={() => setIsEditing(false)}>ยกเลิก</Button>
              <Button type="submit" className="bg-secondary text-primary">บันทึกข้อมูล</Button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="px-6 py-4 font-semibold">ผู้เชี่ยวชาญ</th>
              <th className="px-6 py-4 font-semibold">ตำแหน่ง / ความเชี่ยวชาญ</th>
              <th className="px-6 py-4 font-semibold text-right">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {experts.map((expert) => (
              <tr key={expert.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={expert.image} alt={expert.name} className="w-10 h-10 rounded-full object-cover border border-white/10" />
                    <div>
                      <p className="font-medium text-white">{expert.name}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-white text-sm">{expert.position}</p>
                  <p className="text-gray-400 text-xs">{expert.specialty}</p>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => { setCurrentExpert(expert); setIsEditing(true); }}
                      className="p-2 text-gray-400 hover:text-secondary transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(expert.id)}
                      className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpertManager;
