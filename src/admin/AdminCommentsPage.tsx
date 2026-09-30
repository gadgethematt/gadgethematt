import React from 'react';
import { useApp } from '../context/AppContext';
import { dbService } from '../services/dbService';
import { Check, EyeOff, Trash2, MessageSquare } from 'lucide-react';

export const AdminCommentsPage: React.FC = () => {
  const { comments } = useApp();

  const handleApprove = (id: string) => {
    dbService.updateCommentStatus(id, 'approved');
  };

  const handleHide = (id: string) => {
    dbService.updateCommentStatus(id, 'hidden');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Hapus komentar ini?')) {
      dbService.deleteComment(id);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-black text-2xl text-[#080808] uppercase">MODERASI KOMENTAR PEMBACA</h2>
          <p className="text-xs text-[#68736D] mt-0.5">Setujui, sembunyikan, atau hapus tanggapan pengunjung pada artikel review.</p>
        </div>
      </div>

      <div className="p-6 rounded-3xl bg-white border border-[#E4E8E5] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E4E8E5] bg-[#F7F8F6] text-[#68736D] font-black uppercase tracking-wider">
                <th className="p-3">Pengunjung</th>
                <th className="p-3">Komentar</th>
                <th className="p-3">Artikel</th>
                <th className="p-3">Tanggal</th>
                <th className="p-3">Status</th>
                <th className="p-3">Aksi Moderasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E8E5] font-medium text-[#080808]">
              {comments.map(c => (
                <tr key={c.id} className="hover:bg-[#F7F8F6]">
                  <td className="p-3">
                    <div className="font-bold">{c.userName}</div>
                    <div className="text-[10px] text-[#68736D]">{c.userEmail}</div>
                  </td>
                  <td className="p-3 max-w-xs leading-relaxed">{c.comment}</td>
                  <td className="p-3 font-bold text-[#68736D]">{c.articleTitle}</td>
                  <td className="p-3 text-[11px] text-[#68736D]">{c.date}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-0.5 rounded-full font-black text-[10px] uppercase ${
                      c.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                      c.status === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-1.5">
                      {c.status !== 'approved' && (
                        <button
                          onClick={() => handleApprove(c.id)}
                          className="px-2 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-[10px] hover:bg-emerald-600 hover:text-white"
                        >
                          Approve
                        </button>
                      )}
                      {c.status !== 'hidden' && (
                        <button
                          onClick={() => handleHide(c.id)}
                          className="px-2 py-1 rounded-lg bg-gray-100 text-gray-700 font-bold text-[10px] hover:bg-gray-600 hover:text-white"
                        >
                          Hide
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="p-1 text-rose-600 hover:text-rose-800"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
