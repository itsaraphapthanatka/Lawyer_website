import React, { useState, useEffect } from 'react';
import { fetchApi } from '../../lib/api';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Save, RefreshCw, Plus, Trash2 } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface About {
  id: string;
  badge: string;
  title: string;
  descriptions: string[];
  checklist: string[];
  address: string;
  phone: string;
  workingHours: string;
  officeMap: string;
  features: Feature[];
}

const AboutManager: React.FC = () => {
  const [formData, setFormData] = useState<Partial<About>>({
    descriptions: [''],
    checklist: [''],
    features: [{ title: '', description: '', icon: '' }]
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const loadAbout = async () => {
    try {
      const data = await fetchApi<About>('/about');
      if (data) {
        setFormData(data);
      }
    } catch (error) {
      toast.error('ไม่สามารถโหลดข้อมูล About ได้');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAbout();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await fetchApi('/about', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      toast.success('บันทึกข้อมูล About สำเร็จ');
      loadAbout();
    } catch (error) {
      toast.error('ไม่สามารถบันทึกข้อมูลได้');
    } finally {
      setIsSaving(false);
    }
  };

  const handleArrayChange = (field: 'descriptions' | 'checklist', index: number, value: string) => {
    const newArray = [...(formData[field] || [])];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayItem = (field: 'descriptions' | 'checklist') => {
    setFormData({ ...formData, [field]: [...(formData[field] || []), ''] });
  };

  const removeArrayItem = (field: 'descriptions' | 'checklist', index: number) => {
    const newArray = [...(formData[field] || [])];
    newArray.splice(index, 1);
    setFormData({ ...formData, [field]: newArray });
  };

  const handleFeatureChange = (index: number, field: keyof Feature, value: string) => {
    const newFeatures = [...(formData.features || [])];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setFormData({ ...formData, features: newFeatures });
  };

  const addFeature = () => {
    setFormData({ 
      ...formData, 
      features: [...(formData.features || []), { title: '', description: '', icon: '' }] 
    });
  };

  const removeFeature = (index: number) => {
    const newFeatures = [...(formData.features || [])];
    newFeatures.splice(index, 1);
    setFormData({ ...formData, features: newFeatures });
  };

  if (isLoading) return <div className="text-white">Loading...</div>;

  return (
    <div className="max-w-5xl space-y-8 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">จัดการเนื้อหา About</h2>
          <p className="text-gray-400 text-sm">แก้ไขข้อมูลบริษัท ประวัติ และข้อมูลติดต่อ</p>
        </div>
        <Button onClick={loadAbout} variant="outline" className="border-white/10">
          <RefreshCw className="w-4 h-4 mr-2" /> โหลดใหม่
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl shadow-xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Badge</label>
              <input
                value={formData.badge || ''}
                onChange={e => setFormData({ ...formData, badge: e.target.value })}
                className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Title</label>
              <input
                value={formData.title || ''}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-medium text-gray-400 block">Descriptions (ย่อหน้าคำอธิบาย)</label>
            {formData.descriptions?.map((desc, index) => (
              <div key={index} className="flex gap-2">
                <textarea
                  value={desc}
                  onChange={e => handleArrayChange('descriptions', index, e.target.value)}
                  className="flex-1 bg-dark border border-white/10 rounded-lg px-4 py-2 text-white h-24"
                  required
                />
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={() => removeArrayItem('descriptions', index)}
                  className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={() => addArrayItem('descriptions')} className="w-full border-dashed">
              <Plus className="w-4 h-4 mr-2" /> เพิ่มย่อหน้า
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Address</label>
              <input
                value={formData.address || ''}
                onChange={e => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Phone</label>
              <input
                value={formData.phone || ''}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Working Hours</label>
              <input
                value={formData.workingHours || ''}
                onChange={e => setFormData({ ...formData, workingHours: e.target.value })}
                className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Office Map (Google Maps Embed URL/Iframe)</label>
            <textarea
              value={formData.officeMap || ''}
              onChange={e => setFormData({ ...formData, officeMap: e.target.value })}
              className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white h-24"
              placeholder="ใส่โค้ด iframe หรือ URL ของแผนที่"
            />
            <p className="text-xs text-gray-500 italic">ตัวอย่าง: https://www.google.com/maps/embed?pb=...</p>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl shadow-xl space-y-6">
          <h3 className="text-lg font-semibold">Features (จุดเด่น)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formData.features?.map((feature, index) => (
              <div key={index} className="p-4 border border-white/10 rounded-xl space-y-4 relative bg-dark/30">
                <button 
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs text-gray-400">Title</label>
                    <input
                      value={feature.title}
                      onChange={e => handleFeatureChange(index, 'title', e.target.value)}
                      className="w-full bg-dark border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-gray-400">Icon (Lucide Name)</label>
                    <input
                      value={feature.icon}
                      onChange={e => handleFeatureChange(index, 'icon', e.target.value)}
                      className="w-full bg-dark border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-400">Description</label>
                  <textarea
                    value={feature.description}
                    onChange={e => handleFeatureChange(index, 'description', e.target.value)}
                    className="w-full bg-dark border border-white/10 rounded-lg px-3 py-2 text-white text-sm h-16"
                    required
                  />
                </div>
              </div>
            ))}
          </div>
          <Button type="button" variant="outline" onClick={addFeature} className="w-full border-dashed">
            <Plus className="w-4 h-4 mr-2" /> เพิ่ม Feature
          </Button>
        </div>

        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl shadow-xl space-y-6">
          <h3 className="text-lg font-semibold">Checklist (รายการตรวจสอบ)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.checklist?.map((item, index) => (
              <div key={index} className="flex gap-2">
                <input
                  value={item}
                  onChange={e => handleArrayChange('checklist', index, e.target.value)}
                  className="flex-1 bg-dark border border-white/10 rounded-lg px-4 py-2 text-white"
                  required
                />
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={() => removeArrayItem('checklist', index)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
          <Button type="button" variant="outline" onClick={() => addArrayItem('checklist')} className="w-full border-dashed">
            <Plus className="w-4 h-4 mr-2" /> เพิ่มรายการ
          </Button>
        </div>

        <Button
          type="submit"
          disabled={isSaving}
          className="w-full bg-secondary text-primary hover:bg-white transition-all py-6 text-lg font-bold sticky bottom-8 shadow-2xl z-20"
        >
          <Save className="w-5 h-5 mr-2" />
          {isSaving ? 'กำลังบันทึก...' : 'บันทึกข้อมูลทั้งหมด'}
        </Button>
      </form>
    </div>
  );
};

export default AboutManager;
