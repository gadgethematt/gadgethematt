import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { dbService } from '../services/dbService';
import { Plus, Trash2, Edit3, Layers, Check } from 'lucide-react';

export const AdminCategoriesPage: React.FC = () => {
  const { categories } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCatId, setEditingCatId] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [iconName, setIconName] = useState('VolumeX');

  const handleOpenNew = () => {
    setEditingCatId(null);
    setName('');
    setDescription('');
    setIconName('VolumeX');
    setModalOpen(true);
  };

  const handleEdit = (cat: typeof categories[0]) => {
    setEditingCatId(cat.id);
    setName(cat.name);
    setDescription(cat.description);
    setIconName(cat.iconName || 'VolumeX');
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Hapus kategori ini?')) {
      dbService.deleteCategory(id);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    dbService.saveCategory({
      id: editingCatId || undefined,
      name,
      description,
      iconName
    });
    setModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-black text-2xl text-[#080808] uppercase">KATEGORI TWS & ARTIKEL</h2>
          <p className="text-xs text-[#68736D] mt-0.5">Kategori otomatis tersedia di publik, filter katalog, dan CMS artikel.</p>
        </div>

        <button
          onClick={handleOpenNew}
          className="px-4 py-2.5 rounded-2xl bg-[#B9F43A] text-black font-black text-xs uppercase tracking-wider hover:bg-[#a3e028] transition-all flex items-center gap-2 shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>+ KATEGORI BARU</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(cat => (
          <div key={cat.id} className="p-6 rounded-3xl bg-white border border-[#E4E8E5] shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="p-2 rounded-xl bg-[#F7F8F6] border border-[#E4E8E5] text-black font-bold">
                  <Layers className="w-5 h-5 text-black" />
                </span>
                <span className="text-[10px] font-black uppercase text-[#68736D] bg-[#F7F8F6] px-2.5 py-1 rounded-full border border-[#E4E8E5]">
                  {cat.productCount} Products • {cat.articleCount} Articles
                </span>
              </div>

              <h3 className="font-display font-black text-lg text-[#080808] uppercase">{cat.name}</h3>
              <p className="text-xs text-[#68736D] mt-1 line-clamp-2">{cat.description}</p>
            </div>

            <div className="pt-3 border-t border-[#E4E8E5] flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#68736D]">slug: /{cat.slug}</span>
              <div className="flex items-center gap-1">
                <button onClick={() => handleEdit(cat)} className="p-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white">
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleDelete(cat.id)} className="p-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL EDIT/NEW */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleSave} className="w-full max-w-md bg-white rounded-3xl p-6 space-y-4 shadow-2xl border border-[#E4E8E5]">
            <h3 className="font-display font-black text-lg text-[#080808] uppercase">
              {editingCatId ? 'Edit Kategori' : 'Tambah Kategori Baru'}
            </h3>

            <div>
              <label className="text-xs font-black text-[#080808] uppercase block mb-1">Nama Kategori</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Contoh: ANC TWS"
                className="w-full p-3 rounded-xl bg-[#F7F8F6] border border-[#E4E8E5] text-xs font-bold"
              />
            </div>

            <div>
              <label className="text-xs font-black text-[#080808] uppercase block mb-1">Deskripsi Kategori</label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#F7F8F6] border border-[#E4E8E5] text-xs font-medium"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-xl bg-gray-100 text-xs font-bold">
                Batal
              </button>
              <button type="submit" className="px-5 py-2 rounded-xl bg-[#B9F43A] text-black font-black text-xs uppercase">
                Simpan
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
