import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { dbService } from '../services/dbService';
import { Plus, Edit3, Trash2, Eye, Search, ExternalLink } from 'lucide-react';

export const AdminArticlesPage: React.FC = () => {
  const { articles, setAdminRoute, setEditingId, navigate } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = articles.filter(a => 
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
      dbService.deleteArticle(id);
    }
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
    setAdminRoute('article-edit');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
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
          className="px-4 py-2.5 rounded-2xl bg-[#B9F43A] text-black font-black text-xs uppercase tracking-wider hover:bg-[#a3e028] transition-all flex items-center gap-2 shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>+ TULIS ARTIKEL BARU</span>
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="p-4 rounded-3xl bg-white border border-[#E4E8E5] shadow-sm flex items-center gap-3">
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
      <div className="p-6 rounded-3xl bg-white border border-[#E4E8E5] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E4E8E5] bg-[#F7F8F6] text-[#68736D] font-black uppercase tracking-wider">
                <th className="p-3">Gambar</th>
                <th className="p-3">Judul Artikel</th>
                <th className="p-3">Kategori</th>
                <th className="p-3">Penulis</th>
                <th className="p-3">Status</th>
                <th className="p-3">Dibaca</th>
                <th className="p-3">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E8E5] font-medium text-[#080808]">
              {filtered.map(art => (
                <tr key={art.id} className="hover:bg-[#F7F8F6]">
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
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate(`/reviews/${art.slug}`)}
                        className="p-1.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-black hover:text-white"
                        title="Preview Artikel"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleEdit(art.id)}
                        className="p-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white"
                        title="Edit Artikel"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDelete(art.id)}
                        className="p-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white"
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
      </div>

    </div>
  );
};
