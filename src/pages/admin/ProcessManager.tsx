import React, { useState, useEffect } from 'react';
import { fetchApi } from '../../lib/api';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

interface ProcessStep {
  id: string;
  number: number;
  title: string;
  description: string;
}

const ProcessManager: React.FC = () => {
  const [steps, setSteps] = useState<ProcessStep[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentStep, setCurrentStep] = useState<Partial<ProcessStep>>({});

  const loadSteps = async () => {
    try {
      const data = await fetchApi<ProcessStep[]>('/process-steps');
      setSteps(data.sort((a, b) => a.number - b.number));
    } catch (error) {
      toast.error('ไม่สามารถโหลดข้อมูลขั้นตอนได้');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSteps();
  }, []);

  const handleCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = currentStep.id ? 'PATCH' : 'POST';
    const endpoint = currentStep.id ? `/process-steps/${currentStep.id}` : '/process-steps';

    try {
      await fetchApi(endpoint, {
        method,
        body: JSON.stringify(currentStep),
      });
      toast.success('บันทึกขั้นตอนสำเร็จ');
      setIsEditing(false);
      loadSteps();
    } catch (error: any) {
      toast.error(error.message || 'เกิดข้อผิดพลาด');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('ยืนยันการลบขั้นตอน?')) return;
    try {
      await fetchApi(`/process-steps/${id}`, { method: 'DELETE' });
      toast.success('ลบขั้นตอนสำเร็จ');
      loadSteps();
    } catch (error) {
      toast.error('ไม่สามารถลบขั้นตอนได้');
    }
  };

  if (isLoading) return <div className="text-white">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">จัดการขั้นตอนการทำงาน (Process Steps)</h2>
        <Button onClick={() => { setCurrentStep({ number: steps.length + 1 }); setIsEditing(true); }} className="bg-secondary text-primary">
          <Plus className="w-5 h-5 mr-2" /> เพิ่มขั้นตอน
        </Button>
      </div>

      {isEditing && (
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">{currentStep.id ? 'แก้ไขขั้นตอน' : 'เพิ่มขั้นตอนใหม่'}</h3>
            <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-white"><X /></button>
          </div>
          <form onSubmit={handleCreateOrUpdate} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">ลำดับที่</label>
              <input 
                type="number"
                value={currentStep.number || ''} 
                onChange={e => setCurrentStep({...currentStep, number: parseInt(e.target.value)})}
                className="w-full bg-dark border border-white/10 rounded-lg px-4 py-2 text-white" 
                required 
              />
            </div>
            <div className="md:col-span-3 space-y-2">
              <label className="text-sm text-gray-400">หัวข้อขั้นตอน</label>
              <input 
                value={currentStep.title || ''} 
                onChange={e => setCurrentStep({...currentStep, title: e.target.value})}
                className="w-full bg-dark border border-white/10 rounded-lg px-4 py-2 text-white" 
                required 
              />
            </div>
            <div className="md:col-span-4 space-y-2">
              <label className="text-sm text-gray-400">คำอธิบายรายละเอียด</label>
              <textarea 
                value={currentStep.description || ''} 
                onChange={e => setCurrentStep({...currentStep, description: e.target.value})}
                className="w-full bg-dark border border-white/10 rounded-lg px-4 py-2 text-white h-24" 
                required 
              />
            </div>
            <div className="md:col-span-4 flex justify-end gap-2 mt-4">
              <Button type="button" variant="ghost" onClick={() => setIsEditing(false)}>ยกเลิก</Button>
              <Button type="submit" className="bg-secondary text-primary">บันทึกข้อมูล</Button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {steps.map((step) => (
          <div key={step.id} className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center gap-6 group hover:bg-white/[0.07] transition-all">
            <div className="flex-shrink-0 w-12 h-12 bg-secondary text-primary rounded-full flex items-center justify-center text-2xl font-bold">
              {step.number}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white">{step.title}</h3>
              <p className="text-gray-400 text-sm mt-1">{step.description}</p>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => { setCurrentStep(step); setIsEditing(true); }} className="p-2 text-gray-400 hover:text-secondary"><Pencil className="w-5 h-5" /></button>
              <button onClick={() => handleDelete(step.id)} className="p-2 text-gray-400 hover:text-red-400"><Trash2 className="w-5 h-5" /></button>
            </div>
          </div>
        ))}
        {steps.length === 0 && <div className="text-center py-12 text-gray-500 border border-dashed border-white/10 rounded-2xl">ยังไม่มีข้อมูลขั้นตอนการทำงาน</div>}
      </div>
    </div>
  );
};

export default ProcessManager;
