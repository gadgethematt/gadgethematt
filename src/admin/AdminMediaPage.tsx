import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { dbService } from '../services/dbService';
import { Upload, Trash2, Copy, Check, Image as ImageIcon } from 'lucide-react';

export const AdminMediaPage: React.FC = () => {
  const { media } = useApp();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Hapus media ini dari galeri?')) {
      dbService.deleteMedia(id);
    }
  };

  const handleUploadSim = () => {
    const url = window.prompt('Masukkan URL Gambar (misal Unsplash / CDN):', 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80');
    if (url) {
      dbService.addMedia({
        fileName: `image_${Date.now()}.jpg`,
        url,
        size: '420 KB'
      });
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-black text-2xl text-[#080808] uppercase">MEDIA LIBRARY GALLERY</h2>
          <p className="text-xs text-[#68736D] mt-0.5">Kelola aset gambar untuk artikel ulasan, produk, dan banner.</p>
        </div>

        <button
          onClick={handleUploadSim}
          className="px-4 py-2.5 rounded-2xl bg-[#B9F43A] text-black font-black text-xs uppercase tracking-wider hover:bg-[#a3e028] transition-all flex items-center gap-2 shadow-md"
        >
          <Upload className="w-4 h-4" />
          <span>+ UPLOAD GAMBAR BARU</span>
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {media.map(m => (
          <div key={m.id} className="bg-white rounded-3xl p-4 border border-[#E4E8E5] shadow-sm flex flex-col justify-between group">
            <div className="relative w-full h-40 rounded-2xl bg-[#F7F8F6] border border-[#E4E8E5] p-2 overflow-hidden flex items-center justify-center">
              <img src={m.url} alt={m.fileName} className="max-w-full max-h-full object-contain" />
            </div>

            <div className="mt-3">
              <div className="text-xs font-bold text-[#080808] truncate">{m.fileName}</div>
              <div className="text-[10px] text-[#68736D]">{m.size} • {m.uploadDate}</div>
            </div>

            <div className="mt-3 pt-2 border-t border-[#E4E8E5] flex items-center justify-between">
              <button
                onClick={() => handleCopy(m.url, m.id)}
                className="px-2.5 py-1 rounded-lg bg-gray-100 text-[10px] font-bold text-gray-700 hover:bg-black hover:text-white flex items-center gap-1"
              >
                {copiedId === m.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                <span>{copiedId === m.id ? 'Copied' : 'Copy URL'}</span>
              </button>

              <button
                onClick={() => handleDelete(m.id)}
                className="p-1 text-rose-600 hover:text-rose-800"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
