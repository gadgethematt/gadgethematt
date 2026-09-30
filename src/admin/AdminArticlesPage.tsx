import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { dbService } from '../services/dbService';
import { ReviewArticle } from '../types';
import { Plus, Edit3, Trash2, Search, ExternalLink, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const AdminArticlesPage: React.FC = () => {
  const { articles, setAdminRoute, setEditingId, navigate } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [articleToDelete, setArticleToDelete] = useState<ReviewArticle | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filtered = articles.filter(a => 
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const confirmDelete = () => {
    if (!articleToDelete) return;
    dbService.deleteArticle(articleToDelete.id);
    setToastMessage(`Artikel "${articleToDelete.title}" berhasil dihapus.`);
    setArticleToDelete(null);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
    setAdminRoute('article-edit');
  };

  return (
    <div className="space-y-6 animate-fadeIn relative">
      
      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl bg-emerald-900 text-white font-bold text-xs shadow-2xl flex items-center gap-2.5 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-[#B9F43A]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HEADER & ACTIONS */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-black text-2xl text-[#080808] uppercase">MANAJEMEN ARTIKEL & REVIEWS</h2>
          <p className="text-xs text-[#68736D] mt-0.5">Kelola publikasi review, panduan belanja, dan komparasi TWS.</p>
        </div>

        <button
          onClick={() => {
            setEditingId(null);
            setAdminRoute('article-new');
          }}
          className="px-5 py-3 rounded-2xl bg-[#B9F43A] hover:bg-[#a3e028] text-black font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-md hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>+ TULIS ARTIKEL BARU</span>
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="p-4 rounded-3xl bg-white border border-[#E4E8E5] shadow-xs flex items-center gap-3">
        <Search className="w-4 h-4 text-[#68736D]" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Cari judul artikel, kategori, atau tag..."
          className="w-full text-xs font-medium text-[#080808] focus:outline-none bg-transparent"
        />
      </div>

      {/* TABLE */}
      <div className="p-6 rounded-3xl bg-white border border-[#E4E8E5] shadow-xs overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center bg-[#F7F8F6] rounded-2xl border border-dashed border-[#E4E8E5]">
            <p className="font-bold text-sm text-[#080808]">Tidak ada artikel yang ditemukan.</p>
            <p className="text-xs text-[#68736D] mt-1">Coba gunakan kata kunci pencarian yang lain.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E4E8E5] bg-[#F7F8F6] text-[#68736D] font-black uppercase tracking-wider text-[10px]">
                  <th className="p-3">Gambar</th>
                  <th className="p-3">Judul Artikel</th>
                  <th className="p-3">Kategori</th>
                  <th className="p-3">Penulis</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Dibaca</th>
                  <th className="p-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4E8E5] font-medium text-[#080808]">
                {filtered.map(art => (
                  <tr key={art.id} className="hover:bg-[#F7F8F6] transition-colors">
                    <td className="p-3">
                      <img src={art.featuredImage} alt={art.title} className="w-10 h-10 object-cover rounded-xl border border-[#E4E8E5]" />
                    </td>
                    <td className="p-3 font-bold text-[#080808] max-w-xs truncate">{art.title}</td>
                    <td className="p-3"><span className="px-2.5 py-0.5 rounded-full bg-[#F7F8F6] border border-[#E4E8E5] text-[10px] font-bold">{art.category}</span></td>
                    <td className="p-3 text-[#68736D]">{art.author}</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                        art.status === 'published' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {art.status}
                      </span>
                    </td>
                    <td className="p-3 font-bold">{art.views || 0}</td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => navigate(`/reviews/${art.slug}`)}
                          className="p-2 rounded-xl bg-[#F7F8F6] text-[#080808] hover:bg-black hover:text-white transition-colors"
                          title="Preview Artikel"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleEdit(art.id)}
                          className="p-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white transition-colors"
                          title="Edit Artikel"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => setArticleToDelete(art)}
                          className="p-2 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white transition-colors"
                          title="Hapus Artikel"
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
        )}
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {articleToDelete && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-[#E4E8E5] shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="font-display font-black text-lg text-[#080808]">Delete Article?</h3>
              <p className="text-xs text-[#68736D] mt-1 leading-relaxed">
                Are you sure you want to delete <strong className="text-[#080808]">"{articleToDelete.title}"</strong>? This action cannot be undone.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setArticleToDelete(null)}
                className="py-3 px-4 rounded-2xl bg-[#F7F8F6] hover:bg-[#E4E8E5] text-[#080808] font-bold text-xs uppercase"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="py-3 px-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs uppercase shadow-md"
              >
                Delete Article
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
