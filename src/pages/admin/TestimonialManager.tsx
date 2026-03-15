import React, { useState, useEffect } from 'react';
import { fetchApi } from '../../lib/api';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, X, Star } from 'lucide-react';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  position: string;
  avatar: string;
  rating: number;
}

const TestimonialManager: React.FC = () => {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState<Partial<Testimonial>>({ rating: 5 });

  const loadData = async () => {
    try {
      const data = await fetchApi<Testimonial[]>('/testimonials');
      setItems(data);
    } catch (error) {
      toast.error('ไม่สามารถโหลดข้อมูลรีวิวได้');
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
    const endpoint = currentItem.id ? `/testimonials/${currentItem.id}` : '/testimonials';

    try {
      await fetchApi(endpoint, {
        method,
        body: JSON.stringify(currentItem),
      });
      toast.success('บันทึกสำเร็จ');
      setIsEditing(false);
      loadData();
    } catch (error: any) {
      toast.error(error.message || 'เกิดข้อผิดพลาด');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('ยืนยันการลบ?')) return;
    try {
      await fetchApi(`/testimonials/${id}`, { method: 'DELETE' });
      toast.success('ลบสำเร็จ');
      loadData();
    } catch (error) {
      toast.error('ไม่สามารถลบได้');
    }
  };

  if (isLoading) return <div className="text-white">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">จัดการคำนิยมจากลูกค้า (Testimonials)</h2>
        <Button onClick={() => { setCurrentItem({ rating: 5 }); setIsEditing(true); }} className="bg-secondary text-primary">
          <Plus className="w-5 h-5 mr-2" /> เพิ่มรีวิว
        </Button>
      </div>

      {isEditing && (
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">{currentItem.id ? 'แก้ไขรีวิว' : 'เพิ่มรีวิวใหม่'}</h3>
            <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-white"><X /></button>
          </div>
          <form onSubmit={handleCreateOrUpdate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">ชื่อลูกค้า</label>
                <input 
                  value={currentItem.author || ''} 
                  onChange={e => setCurrentItem({...currentItem, author: e.target.value})}
                  className="w-full bg-dark border border-white/10 rounded-lg px-4 py-2 text-white" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">ตำแหน่ง / บริษัท</label>
                <input 
                  value={currentItem.position || ''} 
                  onChange={e => setCurrentItem({...currentItem, position: e.target.value})}
                  className="w-full bg-dark border border-white/10 rounded-lg px-4 py-2 text-white" 
                  required 
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Avatar URL</label>
                <input 
                  value={currentItem.avatar || ''} 
                  onChange={e => setCurrentItem({...currentItem, avatar: e.target.value})}
                  className="w-full bg-dark border border-white/10 rounded-lg px-4 py-2 text-white" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Rating (1-5)</label>
                <input 
                  type="number"
                  min="1" max="5"
                  value={currentItem.rating || 5} 
                  onChange={e => setCurrentItem({...currentItem, rating: parseInt(e.target.value)})}
                  className="w-full bg-dark border border-white/10 rounded-lg px-4 py-2 text-white" 
                  required 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400">ข้อความรีวิว (Quote)</label>
              <textarea 
                value={currentItem.quote || ''} 
                onChange={e => setCurrentItem({...currentItem, quote: e.target.value})}
                className="w-full bg-dark border border-white/10 rounded-lg px-4 py-2 text-white h-32" 
                required 
              />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Button type="button" variant="ghost" onClick={() => setIsEditing(false)}>ยกเลิก</Button>
              <Button type="submit" className="bg-secondary text-primary">บันทึกข้อมูล</Button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-1 text-secondary">
                  {[...Array(item.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setCurrentItem(item); setIsEditing(true); }} className="text-gray-400 hover:text-secondary"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(item.id)} className="text-gray-400 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              <p className="text-gray-300 italic mb-6">"{item.quote}"</p>
            </div>
            <div className="flex items-center gap-4">
              <img src={item.avatar} alt={item.author} className="w-12 h-12 rounded-full object-cover border border-white/10" />
              <div>
                <p className="font-bold text-white">{item.author}</p>
                <p className="text-xs text-gray-500">{item.position}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialManager;
