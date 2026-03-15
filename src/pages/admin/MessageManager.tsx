import React, { useState, useEffect } from 'react';
import { fetchApi } from '../../lib/api';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Mail, Phone, Calendar, Trash2, CheckCircle, Clock } from 'lucide-react';

interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  topic: string | null;
  details: string;
  status: string;
  createdAt: string;
}

const MessageManager: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const loadMessages = async () => {
    try {
      const data = await fetchApi<ContactMessage[]>('/contact-messages');
      // Sort by newest first
      setMessages(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    } catch (error) {
      toast.error('ไม่สามารถโหลดข้อมูลข้อความได้');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      await fetchApi(`/contact-messages/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
      toast.success('อัปเดตสถานะสำเร็จ');
      if (selectedMessage?.id === id) {
        setSelectedMessage({ ...selectedMessage, status });
      }
      loadMessages();
    } catch (error) {
      toast.error('ไม่สามารถอัปเดตสถานะได้');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('คุณต้องการลบข้อความนี้ใช่หรือไม่?')) return;
    try {
      await fetchApi(`/contact-messages/${id}`, { method: 'DELETE' });
      toast.success('ลบข้อความสำเร็จ');
      setSelectedMessage(null);
      loadMessages();
    } catch (error) {
      toast.error('ไม่สามารถลบข้อความได้');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'NEW': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'READ': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'REPLIED': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  if (isLoading) return <div className="text-white">Loading...</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-160px)]">
      {/* Sidebar List */}
      <div className="lg:col-span-1 border border-white/10 rounded-2xl overflow-hidden flex flex-col bg-white/5">
        <div className="p-4 border-b border-white/10 bg-white/5">
          <h3 className="font-bold">Messages ({messages.length})</h3>
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-white/5">
          {messages.map((msg) => (
            <button
              key={msg.id}
              onClick={() => setSelectedMessage(msg)}
              className={`w-full text-left p-4 hover:bg-white/5 transition-colors ${selectedMessage?.id === msg.id ? 'bg-secondary/10 border-l-4 border-secondary' : 'border-l-4 border-transparent'}`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="font-semibold text-sm truncate pr-2">{msg.name}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getStatusColor(msg.status)}`}>
                  {msg.status}
                </span>
              </div>
              <p className="text-xs text-gray-400 truncate mb-2">{msg.topic || 'ไม่มีหัวข้อ'}</p>
              <p className="text-[10px] text-gray-500">{new Date(msg.createdAt).toLocaleString()}</p>
            </button>
          ))}
          {messages.length === 0 && (
            <div className="p-8 text-center text-gray-500 text-sm">ยังไม่มีข้อความส่งเข้ามา</div>
          )}
        </div>
      </div>

      {/* Message Content */}
      <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col">
        {selectedMessage ? (
          <div className="flex flex-col h-full">
            <div className="p-6 border-b border-white/10 bg-white/5 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-white">{selectedMessage.name}</h3>
                <div className="flex gap-4 mt-2 text-sm text-gray-400">
                  <span className="flex items-center gap-1"><Phone className="w-4 h-4" /> {selectedMessage.phone}</span>
                  {selectedMessage.email && <span className="flex items-center gap-1"><Mail className="w-4 h-4" /> {selectedMessage.email}</span>}
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={() => handleUpdateStatus(selectedMessage.id, selectedMessage.status === 'REPLIED' ? 'READ' : 'REPLIED')}
                  variant="outline"
                  className="border-white/10 hover:bg-white/10"
                >
                  {selectedMessage.status === 'REPLIED' ? <Clock className="w-4 h-4 mr-2" /> : <CheckCircle className="w-4 h-4 mr-2" />}
                  {selectedMessage.status === 'REPLIED' ? 'Mark Unreplied' : 'Mark Replied'}
                </Button>
                <Button 
                  onClick={() => handleDelete(selectedMessage.id)}
                  variant="ghost"
                  className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="flex-1 p-8 overflow-y-auto space-y-6">
              <div>
                <label className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-2 block">Topic</label>
                <p className="text-lg text-secondary font-semibold">{selectedMessage.topic || 'General Inquiry'}</p>
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-2 block">Details</label>
                <div className="bg-dark/50 border border-white/5 p-6 rounded-xl text-gray-200 whitespace-pre-wrap leading-relaxed">
                  {selectedMessage.details}
                </div>
              </div>
              <div className="pt-8 border-t border-white/5 flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Received on {new Date(selectedMessage.createdAt).toLocaleString()}</span>
                <span>ID: {selectedMessage.id}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500 p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <Mail className="w-8 h-8 opacity-20" />
            </div>
            <p className="text-lg">เลือกข้อความเพื่อดูรายละเอียด</p>
            <p className="text-sm opacity-60">ข้อความที่ส่งมาจากหน้าเว็บไซต์จะแสดงที่นี่</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageManager;
