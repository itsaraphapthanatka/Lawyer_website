import React, { useState, useEffect } from 'react';
import { fetchApi } from '../../lib/api';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Save, RefreshCw, Sparkles, CheckCircle2, XCircle, Clock } from 'lucide-react';

interface Schedule {
  enabled: boolean;
  intervalHours: number;
  autoPublish: boolean;
  instructions?: string | null;
  category?: string | null;
  author?: string | null;
  lastRunAt?: string | null;
  nextRunAt?: string | null;
  lastStatus?: string | null;
  lastError?: string | null;
  lastTitle?: string | null;
  generatedCount?: number;
  running?: boolean;
}

const PRESETS = [
  { label: 'ทุก 12 ชม.', hours: 12 },
  { label: 'รายวัน', hours: 24 },
  { label: 'ทุก 3 วัน', hours: 72 },
  { label: 'รายสัปดาห์', hours: 168 },
];

const fmt = (d?: string | null) =>
  d ? new Date(d).toLocaleString('th-TH', { dateStyle: 'medium', timeStyle: 'short' }) : '—';

const AutoBlogManager: React.FC = () => {
  const [data, setData] = useState<Schedule>({
    enabled: false,
    intervalHours: 24,
    autoPublish: true,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const load = async () => {
    try {
      const s = await fetchApi<Schedule>('/blog-schedule');
      if (s) setData(s);
    } catch {
      toast.error('ไม่สามารถโหลดการตั้งค่าได้');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const save = async () => {
    setIsSaving(true);
    try {
      const saved = await fetchApi<Schedule>('/blog-schedule', {
        method: 'PATCH',
        body: JSON.stringify({
          enabled: data.enabled,
          intervalHours: Number(data.intervalHours) || 24,
          autoPublish: data.autoPublish,
          instructions: data.instructions ?? '',
          category: data.category ?? '',
          author: data.author ?? '',
        }),
      });
      if (saved) setData(saved);
      toast.success('บันทึกการตั้งค่าสำเร็จ');
    } catch {
      toast.error('บันทึกไม่สำเร็จ');
    } finally {
      setIsSaving(false);
    }
  };

  const runNow = async () => {
    setIsRunning(true);
    try {
      const res = await fetchApi<{ ok: boolean; started?: boolean; message?: string }>(
        '/blog-schedule/run',
        { method: 'POST' },
      );
      if (!res?.ok) {
        toast.error(res?.message || 'เริ่มสร้างไม่สำเร็จ');
        setIsRunning(false);
        return;
      }
      toast.info('กำลังให้ AI สร้างบทความ... (อาจใช้เวลา 1-2 นาที)');
      // Generation runs in the background — poll status until it finishes.
      const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
      for (let i = 0; i < 90; i++) {
        await sleep(4000);
        let s: Schedule | undefined;
        try {
          s = await fetchApi<Schedule>('/blog-schedule');
        } catch {
          continue;
        }
        if (s) setData(s);
        if (s && !s.running) {
          if (s.lastStatus === 'success') {
            toast.success(`สร้างบทความสำเร็จ: ${s.lastTitle ?? ''}`);
          } else if (s.lastStatus === 'error') {
            toast.error(s.lastError || 'สร้างบทความไม่สำเร็จ');
          }
          setIsRunning(false);
          return;
        }
      }
      toast.message('ยังสร้างไม่เสร็จ — กด "โหลดใหม่" เพื่อดูสถานะภายหลัง');
      setIsRunning(false);
    } catch {
      toast.error('เกิดข้อผิดพลาดในการสร้างบทความ');
      setIsRunning(false);
    }
  };

  if (isLoading) return <div className="text-white">Loading...</div>;

  return (
    <div className="max-w-4xl space-y-8 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-secondary" /> ตั้งเวลาโพสต์บทความอัตโนมัติ (AI)
          </h2>
          <p className="text-gray-400 text-sm">ให้ AI เขียนและเผยแพร่บทความกฎหมายให้อัตโนมัติตามรอบเวลาที่กำหนด</p>
        </div>
        <Button onClick={load} variant="outline" className="border-white/10">
          <RefreshCw className="w-4 h-4 mr-2" /> โหลดใหม่
        </Button>
      </div>

      {/* Status panel */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-xs text-gray-400 mb-1">สถานะ</p>
          <p className={`font-bold ${data.enabled ? 'text-green-400' : 'text-gray-500'}`}>
            {data.enabled ? 'เปิดใช้งาน' : 'ปิดอยู่'}
          </p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-xs text-gray-400 mb-1">สร้างไปแล้ว</p>
          <p className="font-bold text-white">{data.generatedCount ?? 0} บทความ</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-xs text-gray-400 mb-1 flex items-center gap-1"><Clock className="w-3 h-3" /> ครั้งล่าสุด</p>
          <p className="font-medium text-white text-sm">{fmt(data.lastRunAt)}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-xs text-gray-400 mb-1 flex items-center gap-1"><Clock className="w-3 h-3" /> รอบถัดไป</p>
          <p className="font-medium text-white text-sm">{data.enabled ? fmt(data.nextRunAt) : '—'}</p>
        </div>
      </div>

      {data.lastStatus && (
        <div
          className={`flex items-start gap-3 rounded-xl p-4 border ${
            data.lastStatus === 'success'
              ? 'bg-green-900/20 border-green-500/30 text-green-300'
              : 'bg-red-900/20 border-red-500/30 text-red-300'
          }`}
        >
          {data.lastStatus === 'success' ? (
            <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
          ) : (
            <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          )}
          <div className="text-sm">
            <p className="font-bold">{data.lastStatus === 'success' ? 'รอบล่าสุดสำเร็จ' : 'รอบล่าสุดล้มเหลว'}</p>
            {data.lastStatus === 'success' && data.lastTitle && <p>บทความ: {data.lastTitle}</p>}
            {data.lastStatus === 'error' && data.lastError && <p className="break-words">{data.lastError}</p>}
          </div>
        </div>
      )}

      {/* Settings */}
      <div className="bg-white/5 border border-white/10 p-8 rounded-2xl shadow-xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">เปิดการโพสต์อัตโนมัติ</h3>
            <p className="text-sm text-gray-400">เปิดเพื่อให้ระบบสร้างบทความตามรอบเวลา</p>
          </div>
          <Switch checked={data.enabled} onCheckedChange={(v) => setData({ ...data, enabled: v })} />
        </div>

        <div className="border-t border-white/10 pt-6 space-y-2">
          <label className="text-sm font-medium text-gray-400">ความถี่ (โพสต์ทุกๆ กี่ชั่วโมง)</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {PRESETS.map((p) => (
              <Button
                key={p.hours}
                type="button"
                variant="outline"
                onClick={() => setData({ ...data, intervalHours: p.hours })}
                className={`border-white/10 ${data.intervalHours === p.hours ? 'bg-secondary text-primary' : ''}`}
              >
                {p.label}
              </Button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={1}
              value={data.intervalHours}
              onChange={(e) => setData({ ...data, intervalHours: Number(e.target.value) })}
              className="w-32 bg-dark border border-white/10 rounded-lg px-4 py-3 text-white"
            />
            <span className="text-gray-400">ชั่วโมง</span>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold">เผยแพร่ทันที</h3>
            <p className="text-sm text-gray-400">เปิด = โพสต์ขึ้นเว็บเลย / ปิด = บันทึกเป็นฉบับร่าง</p>
          </div>
          <Switch checked={data.autoPublish} onCheckedChange={(v) => setData({ ...data, autoPublish: v })} />
        </div>

        <div className="border-t border-white/10 pt-6 space-y-2">
          <label className="text-sm font-medium text-gray-400">ชื่อผู้เขียน (แสดงบนบทความ)</label>
          <input
            value={data.author ?? ''}
            onChange={(e) => setData({ ...data, author: e.target.value })}
            placeholder="ทีมงานธนวัฒน์ทนายความ"
            className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">หมวดหมู่ (เว้นว่าง = ให้ AI เลือกเอง)</label>
          <input
            value={data.category ?? ''}
            onChange={(e) => setData({ ...data, category: e.target.value })}
            placeholder="เช่น กฎหมายครอบครัว"
            className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">คำสั่งเพิ่มเติมให้ AI (ไม่บังคับ)</label>
          <textarea
            value={data.instructions ?? ''}
            onChange={(e) => setData({ ...data, instructions: e.target.value })}
            placeholder="เช่น เน้นกรณีศึกษาจริง, โทนเป็นกันเอง, ความยาวปานกลาง"
            className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white h-24"
          />
          <p className="text-xs text-gray-500 italic">AI จะเลือกหัวข้อกฎหมายเองและเลี่ยงหัวข้อที่เคยเขียนไปแล้ว</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={save}
          disabled={isSaving}
          className="flex-1 bg-secondary text-primary hover:bg-white transition-all py-6 text-lg font-bold"
        >
          <Save className="w-5 h-5 mr-2" />
          {isSaving ? 'กำลังบันทึก...' : 'บันทึกการตั้งค่า'}
        </Button>
        <Button
          onClick={runNow}
          disabled={isRunning}
          variant="outline"
          className="flex-1 border-secondary/40 text-secondary hover:bg-secondary hover:text-primary py-6 text-lg font-bold"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          {isRunning ? 'กำลังสร้าง...' : 'สร้างบทความเดี๋ยวนี้'}
        </Button>
      </div>
    </div>
  );
};

export default AutoBlogManager;
