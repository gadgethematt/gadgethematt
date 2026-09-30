import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { dbService } from '../services/dbService';
import { ProductItem } from '../types';
import { Plus, Edit3, Trash2, ExternalLink, Search, Filter, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const AdminProductsPage: React.FC = () => {
  const { products, setAdminRoute, setEditingId, navigate } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Delete Modal State
  const [productToDelete, setProductToDelete] = useState<ProductItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filtered = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || p.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const confirmDelete = () => {
    if (!productToDelete) return;
    dbService.deleteProduct(productToDelete.id);
    setToastMessage(`Produk "${productToDelete.name}" berhasil dihapus.`);
    setProductToDelete(null);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
    setAdminRoute('product-edit');
  };

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="space-y-6 animate-fadeIn relative">
      
      {/* SUCCESS TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl bg-emerald-900 text-white font-bold text-xs shadow-2xl flex items-center gap-2.5 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-[#B9F43A]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-black text-2xl text-[#080808] uppercase tracking-tight">MANAJEMEN KATALOG TWS</h2>
          <p className="text-xs text-[#68736D] mt-0.5">Kelola database produk TWS, harga, status publish, dan link Tokopedia affiliate.</p>
        </div>

        <button
          onClick={() => {
            setEditingId(null);
            setAdminRoute('product-new');
          }}
          className="px-5 py-3 rounded-2xl bg-[#B9F43A] hover:bg-[#a3e028] text-black font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-md hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>+ TAMBAH PRODUK BARU</span>
        </button>
      </div>

      {/* SEARCH & FILTERS BAR */}
      <div className="p-4 rounded-3xl bg-white border border-[#E4E8E5] shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="w-full md:w-1/2 flex items-center gap-3 px-3 py-2 rounded-2xl bg-[#F7F8F6] border border-[#E4E8E5]">
          <Search className="w-4 h-4 text-[#68736D]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari nama TWS atau brand..."
            className="w-full text-xs font-medium text-[#080808] focus:outline-none bg-transparent"
          />
        </div>

        <div className="w-full md:w-auto flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-[#68736D]" />
            <span className="text-[10px] font-black uppercase text-[#68736D]">Kategori:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-2 rounded-xl bg-[#F7F8F6] border border-[#E4E8E5] text-xs font-bold text-[#080808]"
            >
              <option value="all">Semua Kategori</option>
              <option value="ANC TWS">ANC TWS</option>
              <option value="Budget TWS">Budget TWS</option>
              <option value="Premium TWS">Premium TWS</option>
              <option value="Gaming TWS">Gaming TWS</option>
              <option value="Sports TWS">Sports TWS</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase text-[#68736D]">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="p-2 rounded-xl bg-[#F7F8F6] border border-[#E4E8E5] text-xs font-bold text-[#080808]"
            >
              <option value="all">Semua Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="p-6 rounded-3xl bg-white border border-[#E4E8E5] shadow-xs overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center bg-[#F7F8F6] rounded-2xl border border-dashed border-[#E4E8E5]">
            <p className="font-bold text-sm text-[#080808]">Tidak ada produk yang ditemukan.</p>
            <p className="text-xs text-[#68736D] mt-1">Coba ubah kata kunci pencarian atau filter kategori Anda.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedStatus('all');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#25282A] text-white text-xs font-bold uppercase"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E4E8E5] bg-[#F7F8F6] text-[#68736D] font-black uppercase tracking-wider text-[10px]">
                  <th className="p-3">Produk</th>
                  <th className="p-3">Brand</th>
                  <th className="p-3">Kategori</th>
                  <th className="p-3">Harga</th>
                  <th className="p-3">Tokopedia Affiliate Link</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4E8E5] font-medium text-[#080808]">
                {filtered.map(item => (
                  <tr key={item.id} className="hover:bg-[#F7F8F6] transition-colors">
                    <td className="p-3 flex items-center gap-3">
                      <img src={item.imageUrl} alt={item.name} className="w-10 h-10 object-contain p-1 rounded-xl bg-[#F7F8F6] border border-[#E4E8E5] shrink-0" />
                      <div>
                        <span className="font-bold text-[#080808] max-w-xs block truncate">{item.name}</span>
                        <span className="text-[10px] text-[#68736D]">Dibuat: {item.createdAt}</span>
                      </div>
                    </td>
                    <td className="p-3 text-[#68736D] font-bold">{item.brand}</td>
                    <td className="p-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#B9F43A] text-black font-black text-[10px] uppercase">
                        {item.category}
                      </span>
                    </td>
                    <td className="p-3 font-black text-[#080808]">{formatRupiah(item.price)}</td>
                    <td className="p-3">
                      {item.tokopediaUrl ? (
                        <a
                          href={item.tokopediaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-[10px] hover:underline"
                        >
                          <span>Tokopedia Ready</span>
                          <ExternalLink className="w-3 h-3 text-emerald-600" />
                        </a>
                      ) : (
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                          Affiliate link belum tersedia
                        </span>
                      )}
                    </td>
                    <td className="p-3">
                      <span className={`px-2.5 py-0.5 rounded-full font-black text-[10px] uppercase ${
                        item.status === 'published'
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : 'bg-amber-100 text-amber-900 border border-amber-300'
                      }`}>
                        {item.status || 'published'}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => navigate(`/products/${item.slug}`)}
                          className="p-2 rounded-xl bg-[#F7F8F6] text-[#080808] hover:bg-black hover:text-white transition-colors"
                          title="Preview Produk"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleEdit(item.id)}
                          className="p-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white transition-colors"
                          title="Edit Produk"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => setProductToDelete(item)}
                          className="p-2 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white transition-colors"
                          title="Hapus Produk"
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
      {productToDelete && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-[#E4E8E5] shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="font-display font-black text-lg text-[#080808]">Delete Product?</h3>
              <p className="text-xs text-[#68736D] mt-1 leading-relaxed">
                Are you sure you want to delete <strong className="text-[#080808]">"{productToDelete.name}"</strong>? This action cannot be undone and will remove the product from the catalog.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setProductToDelete(null)}
                className="py-3 px-4 rounded-2xl bg-[#F7F8F6] hover:bg-[#E4E8E5] text-[#080808] font-bold text-xs uppercase"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="py-3 px-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs uppercase shadow-md"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
