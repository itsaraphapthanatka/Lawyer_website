import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { API_BASE_URL } from '@/lib/api';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange, label }) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('ไฟล์มีขนาดใหญ่เกินไป (สูงสุด 5MB)');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setIsUploading(true);
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`${API_BASE_URL}/uploads/image`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      // Prefix with backend host if it's a relative path
      const fullUrl = data.url.startsWith('http') ? data.url : `${API_BASE_URL}${data.url}`;
      onChange(fullUrl);
      toast.success('อัปโหลดรูปภาพสำเร็จ');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('ไม่สามารถอัปโหลดรูปภาพได้');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemove = () => {
    onChange('');
  };

  return (
    <div className="space-y-2">
      {label && <label className="text-sm text-gray-400 block">{label}</label>}
      
      <div className="flex flex-col gap-4">
        {value ? (
          <div className="relative w-40 aspect-square rounded-xl overflow-hidden border border-white/10 group">
            <img 
              src={value} 
              alt="Uploaded" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
              <Button 
                type="button"
                variant="outline" 
                size="xs" 
                onClick={() => fileInputRef.current?.click()}
                className="bg-white/10 border-white/20 hover:bg-white/20 text-white text-[10px] h-7 px-2"
              >
                <Upload className="w-3 h-3 mr-1" /> เปลี่ยน
              </Button>
              <Button 
                type="button"
                variant="destructive" 
                size="xs" 
                onClick={handleRemove}
                className="text-[10px] h-7 px-2"
              >
                <X className="w-3 h-3 mr-1" /> ลบ
              </Button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="w-40 aspect-square rounded-xl border-2 border-dashed border-white/10 bg-white/5 hover:bg-white/10 hover:border-secondary/50 transition-all flex flex-col items-center justify-center gap-1 group"
          >
            {isUploading ? (
              <Loader2 className="w-6 h-6 text-secondary animate-spin" />
            ) : (
              <>
                <div className="p-2 bg-white/5 rounded-full group-hover:bg-secondary/20 transition-colors">
                  <ImageIcon className="w-5 h-5 text-gray-400 group-hover:text-secondary" />
                </div>
                <div className="text-[11px] font-medium text-gray-400 group-hover:text-white">อัปโหลดรูป</div>
                <div className="text-[9px] text-gray-500">Max 5MB</div>
              </>
            )}
          </button>
        )}
        
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ImageUpload;
