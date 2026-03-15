import React, { useState, useEffect } from 'react';
import { fetchApi } from '../../lib/api';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

interface PracticeArea {
  id: string;
  title: string;
  description: string;
  icon: string;
  details: string[];
}

const PracticeAreaManager: React.FC = () => {
  const [items, setItems] = useState<PracticeArea[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState<Partial<PracticeArea>>({});

  const loadData = async () => {
    try {
      const data = await fetchApi<PracticeArea[]>('/practice-areas');
      setItems(data);
    } catch (error) {
      toast.error('ไม่สามารถโหลดข้อมูลได้');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = currentItem.id ? 'PATCH' : 'POST';
    const endpoint = currentItem.id ? `/practice-areas/${currentItem.id}` : '/practice-areas';

    try {
      await fetchApi(endpoint, {
        method,
        body: JSON.stringify(currentItem),
      });
      toast.success('บันทึกข้อมูลสำเร็จ');
      setIsEditing(false);
      loadData();
    } catch (error: any) {
      toast.error(error.message || 'เกิดข้อผิดพลาด');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('ยืนยันการลบข้อมูล?')) return;
    try {
      await fetchApi(`/practice-areas/${id}`, { method: 'DELETE' });
      toast.success('ลบข้อมูลสำเร็จ');
      loadData();
    } catch (error) {
      toast.error('ไม่สามารถลบข้อมูลได้');
    }
  };

  const handleDetailChange = (index: number, value: string) => {
    const newDetails = [...(currentItem.details || [])];
    newDetails[index] = value;
    setCurrentItem({ ...currentItem, details: newDetails });
  };

  const addDetail = () => {
    setCurrentItem({ ...currentItem, details: [...(currentItem.details || []), ''] });
  };

  const removeDetail = (index: number) => {
    const newDetails = [...(currentItem.details || [])];
    newDetails.splice(index, 1);
    setCurrentItem({ ...currentItem, details: newDetails });
  };

  if (isLoading) return <div className="text-white">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">จัดการขอบเขตบริการ (Practice Areas)</h2>
        <Button onClick={() => { setCurrentItem({ details: [] }); setIsEditing(true); }} className="bg-secondary text-primary">
          <Plus className="w-5 h-5 mr-2" /> เพิ่มบริการ
        </Button>
      </div>

      {isEditing && (
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">{currentItem.id ? 'แก้ไขบริการ' : 'เพิ่มบริการใหม่'}</h3>
            <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-white"><X /></button>
          </div>
          <form onSubmit={handleCreateOrUpdate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">หัวข้อ (Title)</label>
                <input 
                  value={currentItem.title || ''} 
                  onChange={e => setCurrentItem({...currentItem, title: e.target.value})}
                  className="w-full bg-dark border border-white/10 rounded-lg px-4 py-2 text-white" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">ไอคอน (Lucide Icon Name)</label>
                <input 
                  value={currentItem.icon || ''} 
                  onChange={e => setCurrentItem({...currentItem, icon: e.target.value})}
                  className="w-full bg-dark border border-white/10 rounded-lg px-4 py-2 text-white" 
                  required 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">คำอธิบาย (Description)</label>
              <textarea 
                value={currentItem.description || ''} 
                onChange={e => setCurrentItem({...currentItem, description: e.target.value})}
                className="w-full bg-dark border border-white/10 rounded-lg px-4 py-2 text-white h-24" 
                required 
              />
            </div>
            
            <div className="space-y-3">
              <label className="text-sm text-gray-400">รายละเอียดเพิ่มเติม (Details)</label>
              {currentItem.details?.map((detail, index) => (
                <div key={index} className="flex gap-2">
                  <input 
                    value={detail} 
                    onChange={e => handleDetailChange(index, e.target.value)}
                    className="flex-1 bg-dark border border-white/10 rounded-lg px-4 py-2 text-white" 
                  />
                  <Button type="button" variant="ghost" onClick={() => removeDetail(index)} className="text-red-400">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addDetail} className="w-full border-dashed">
                <Plus className="w-4 h-4 mr-2" /> เพิ่มรายละเอียด
              </Button>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Button type="button" variant="ghost" onClick={() => setIsEditing(false)}>ยกเลิก</Button>
              <Button type="submit" className="bg-secondary text-primary">บันทึกข้อมูล</Button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white/5 border border-white/10 p-6 rounded-2xl group hover:border-secondary/50 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-secondary/10 rounded-lg">
                <span className="text-secondary font-bold">{item.icon}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setCurrentItem(item); setIsEditing(true); }} className="p-2 text-gray-400 hover:text-secondary"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-400 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
            <h3 className="text-lg font-bold mb-2">{item.title}</h3>
            <p className="text-sm text-gray-400 line-clamp-3 mb-4">{item.description}</p>
            <div className="flex flex-wrap gap-2">
              {item.details?.slice(0, 3).map((d, i) => (
                <span key={i} className="text-[10px] bg-white/5 px-2 py-1 rounded-full text-gray-300">{d}</span>
              ))}
              {item.details?.length > 3 && <span className="text-[10px] text-gray-500">+{item.details.length - 3} more</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PracticeAreaManager;
