import React, { useState, useEffect } from 'react';
import { fetchApi, API_BASE_URL } from '../../lib/api';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, X, Eye, EyeOff, Newspaper, Sparkles, Loader2 } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image?: string;
  author?: string;
  category?: string;
  published: boolean;
  createdAt: string;
}

interface GeneratedBlog {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
}

const resolveImage = (image?: string) => {
  if (!image) return '';
  return image.startsWith('http') ? image : `${API_BASE_URL}${image}`;
};

const BlogManager: React.FC = () => {
  const [items, setItems] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState<Partial<Blog>>({});

  // AI generation state
  const [aiTopic, setAiTopic] = useState('');
  const [aiInstructions, setAiInstructions] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const loadData = async () => {
    try {
      const data = await fetchApi<Blog[]>('/blogs');
      setItems(data);
    } catch (error) {
      toast.error('ไม่สามารถโหลดข้อมูลบทความได้');
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
    const endpoint = currentItem.id ? `/blogs/${currentItem.id}` : '/blogs';

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

  const handleGenerate = async () => {
    if (!aiTopic.trim()) {
      toast.error('กรุณาระบุหัวข้อ/ประเด็นที่ต้องการให้ AI เขียน');
      return;
    }
    setIsGenerating(true);
    try {
      const result = await fetchApi<GeneratedBlog>('/blogs/generate', {
        method: 'POST',
        body: JSON.stringify({
          topic: aiTopic,
          instructions: aiInstructions || undefined,
          category: currentItem.category || undefined,
        }),
      });
      // แปลง path รูปจาก backend ให้เป็น URL เต็ม (สอดคล้องกับ flow อัปโหลด)
      const generatedImage = result.image
        ? result.image.startsWith('http')
          ? result.image
          : `${API_BASE_URL}${result.image}`
        : undefined;
      setCurrentItem({
        ...currentItem,
        title: result.title,
        excerpt: result.excerpt,
        content: result.content,
        category: currentItem.category || result.category,
        // ใช้รูปที่ AI หามาให้ ถ้ายังไม่ได้เลือกรูปเอง (ผู้ใช้เปลี่ยนได้ภายหลัง)
        image: currentItem.image || generatedImage,
      });
      toast.success(
        result.image
          ? 'AI สร้างบทความ + รูปประกอบเรียบร้อย — กรุณาตรวจทานก่อนบันทึก'
          : 'AI สร้างบทความเรียบร้อย (ไม่พบรูปที่เหมาะสม กรุณาเลือกรูปเอง)',
      );
    } catch (error: any) {
      toast.error(error.message || 'AI สร้างบทความไม่สำเร็จ');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('ยืนยันการลบบทความนี้?')) return;
    try {
      await fetchApi(`/blogs/${id}`, { method: 'DELETE' });
      toast.success('ลบข้อมูลสำเร็จ');
      loadData();
    } catch (error) {
      toast.error('ไม่สามารถลบข้อมูลได้');
    }
  };

  if (isLoading) return <div className="text-white">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">จัดการบทความ (Blogs)</h2>
        <Button
          onClick={() => { setCurrentItem({ published: true }); setAiTopic(''); setAiInstructions(''); setIsEditing(true); }}
          className="bg-secondary text-primary hover:bg-white"
        >
          <Plus className="w-5 h-5 mr-2" /> เพิ่มบทความ
        </Button>
      </div>

      {isEditing && (
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl shadow-xl animate-in fade-in slide-in-from-top-4">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">{currentItem.id ? 'แก้ไขบทความ' : 'เพิ่มบทความใหม่'}</h3>
            <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-white"><X /></button>
          </div>
          {/* AI Assistant Panel */}
          <div className="mb-6 rounded-xl border border-secondary/30 bg-secondary/5 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-secondary" />
              <h4 className="font-semibold text-secondary">ผู้ช่วย AI เขียนบทความกฎหมาย</h4>
            </div>
            <p className="text-xs text-gray-400 mb-4">
              ระบุหัวข้อหรือประเด็นทางกฎหมายไทย แล้วให้ AI ร่างบทความให้ (อ้างอิงกฎหมายไทย + ยกตัวอย่างกรณีศึกษา) จากนั้นตรวจทานและแก้ไขก่อนบันทึก
            </p>
            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-sm text-gray-400">หัวข้อ / ประเด็นกฎหมาย</label>
                <input
                  value={aiTopic}
                  onChange={e => setAiTopic(e.target.value)}
                  placeholder="เช่น สิทธิของผู้เช่าเมื่อถูกบอกเลิกสัญญาเช่า, การฟ้องหย่าและสิทธิเลี้ยงดูบุตร"
                  className="w-full bg-dark border border-white/10 rounded-lg px-4 py-2 text-white"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm text-gray-400">คำสั่ง / สไตล์เพิ่มเติม (ไม่บังคับ)</label>
                <textarea
                  value={aiInstructions}
                  onChange={e => setAiInstructions(e.target.value)}
                  placeholder="เช่น เขียนเป็นขั้นตอนที่ทำตามได้, เน้นตัวอย่างคดีจริง, ใช้ภาษากระชับสำหรับผู้เริ่มต้น"
                  className="w-full bg-dark border border-white/10 rounded-lg px-4 py-2 text-white h-16"
                />
              </div>
              <Button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating}
                className="bg-secondary text-primary hover:bg-white disabled:opacity-60"
              >
                {isGenerating ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> กำลังให้ AI เขียน...</>
                ) : (
                  <><Sparkles className="w-4 h-4 mr-2" /> ให้ AI ช่วยเขียน</>
                )}
              </Button>
            </div>
          </div>

          <form onSubmit={handleCreateOrUpdate} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">หัวข้อบทความ (Title)</label>
              <input
                value={currentItem.title || ''}
                onChange={e => setCurrentItem({ ...currentItem, title: e.target.value })}
                className="w-full bg-dark border border-white/10 rounded-lg px-4 py-2 text-white"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">ผู้เขียน (Author)</label>
                <input
                  value={currentItem.author || ''}
                  onChange={e => setCurrentItem({ ...currentItem, author: e.target.value })}
                  className="w-full bg-dark border border-white/10 rounded-lg px-4 py-2 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">หมวดหมู่ (Category)</label>
                <input
                  value={currentItem.category || ''}
                  onChange={e => setCurrentItem({ ...currentItem, category: e.target.value })}
                  className="w-full bg-dark border border-white/10 rounded-lg px-4 py-2 text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400">เกริ่นนำ / สรุปย่อ (Excerpt)</label>
              <textarea
                value={currentItem.excerpt || ''}
                onChange={e => setCurrentItem({ ...currentItem, excerpt: e.target.value })}
                className="w-full bg-dark border border-white/10 rounded-lg px-4 py-2 text-white h-20"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400">เนื้อหาบทความ (Content)</label>
              <textarea
                value={currentItem.content || ''}
                onChange={e => setCurrentItem({ ...currentItem, content: e.target.value })}
                className="w-full bg-dark border border-white/10 rounded-lg px-4 py-2 text-white h-48"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">รูปภาพปก (Cover Image)</label>
              <ImageUpload
                value={currentItem.image}
                onChange={(url) => setCurrentItem({ ...currentItem, image: url })}
              />
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={currentItem.published ?? true}
                onChange={e => setCurrentItem({ ...currentItem, published: e.target.checked })}
                className="w-4 h-4 accent-secondary"
              />
              <span className="text-sm text-gray-300">เผยแพร่บทความ (Published)</span>
            </label>

            <div className="flex justify-end gap-2 mt-4">
              <Button type="button" variant="ghost" onClick={() => setIsEditing(false)}>ยกเลิก</Button>
              <Button type="submit" className="bg-secondary text-primary">บันทึกข้อมูล</Button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden group hover:border-secondary/50 transition-all flex flex-col">
            <div className="aspect-[16/10] bg-primary/30 overflow-hidden">
              {item.image ? (
                <img src={resolveImage(item.image)} alt={item.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Newspaper className="w-10 h-10 text-secondary/40" />
                </div>
              )}
            </div>
            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2 text-xs">
                  {item.category && (
                    <span className="bg-secondary/10 text-secondary px-2 py-1 rounded-full font-bold">{item.category}</span>
                  )}
                  {item.published ? (
                    <span className="inline-flex items-center gap-1 text-green-400"><Eye className="w-3.5 h-3.5" /> เผยแพร่</span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-gray-500"><EyeOff className="w-3.5 h-3.5" /> ซ่อน</span>
                  )}
                </div>
                <div className="flex gap-1">
                  <button onClick={() => { setCurrentItem(item); setAiTopic(''); setAiInstructions(''); setIsEditing(true); }} className="p-2 text-gray-400 hover:text-secondary"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-400 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              <h3 className="text-base font-bold mb-2 line-clamp-2">{item.title}</h3>
              <p className="text-sm text-gray-400 line-clamp-3">{item.excerpt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogManager;
