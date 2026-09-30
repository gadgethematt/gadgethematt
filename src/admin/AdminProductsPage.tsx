import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { dbService } from '../services/dbService';
import { Plus, Edit3, Trash2, ExternalLink, Search } from 'lucide-react';

export const AdminProductsPage: React.FC = () => {
  const { products, setAdminRoute, setEditingId, navigate } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (window.confirm('Hapus produk ini dari katalog?')) {
      dbService.deleteProduct(id);
    }
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
    setAdminRoute('product-edit');
  };

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-black text-2xl text-[#080808] uppercase">MANAJEMEN KATALOG TWS</h2>
          <p className="text-xs text-[#68736D] mt-0.5">Kelola database produk TWS, spesifikasi, dan link affiliasi.</p>
        </div>

        <button
          onClick={() => {
            setEditingId(null);
            setAdminRoute('product-new');
          }}
          className="px-4 py-2.5 rounded-2xl bg-[#B9F43A] text-black font-black text-xs uppercase tracking-wider hover:bg-[#a3e028] transition-all flex items-center gap-2 shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>+ TAMBAH PRODUK BARU</span>
        </button>
      </div>

      {/* SEARCH */}
      <div className="p-4 rounded-3xl bg-white border border-[#E4E8E5] shadow-sm flex items-center gap-3">
        <Search className="w-4 h-4 text-[#68736D]" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Cari produk TWS, brand..."
          className="w-full text-xs font-medium text-[#080808] focus:outline-none bg-transparent"
        />
      </div>

      {/* TABLE */}
      <div className="p-6 rounded-3xl bg-white border border-[#E4E8E5] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E4E8E5] bg-[#F7F8F6] text-[#68736D] font-black uppercase tracking-wider">
                <th className="p-3">Produk</th>
                <th className="p-3">Brand</th>
                <th className="p-3">Harga</th>
                <th className="p-3">Rating</th>
                <th className="p-3">Kategori</th>
                <th className="p-3">Link Shopee / Tokopedia</th>
                <th className="p-3">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E8E5] font-medium text-[#080808]">
              {filtered.map(item => (
                <tr key={item.id} className="hover:bg-[#F7F8F6]">
                  <td className="p-3 flex items-center gap-3">
                    <img src={item.imageUrl} alt={item.name} className="w-10 h-10 object-contain p-1 rounded-xl bg-[#F7F8F6] border border-[#E4E8E5]" />
                    <span className="font-bold text-[#080808] max-w-xs truncate">{item.name}</span>
                  </td>
                  <td className="p-3 text-[#68736D] font-bold">{item.brand}</td>
                  <td className="p-3 font-black text-[#080808]">{formatRupiah(item.price)}</td>
                  <td className="p-3 font-bold">★ {item.rating}</td>
                  <td className="p-3"><span className="px-2.5 py-0.5 rounded-full bg-[#B9F43A] text-black font-black text-[10px]">{item.category}</span></td>
                  <td className="p-3 font-semibold text-emerald-700">Terhubung</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate(`/products/${item.slug}`)}
                        className="p-1.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-black hover:text-white"
                        title="Preview Product"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleEdit(item.id)}
                        className="p-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white"
                        title="Edit Produk"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white"
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
      </div>

    </div>
  );
};
