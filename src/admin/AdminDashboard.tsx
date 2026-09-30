import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  FileText, 
  ShoppingBag, 
  Eye, 
  MousePointerClick, 
  TrendingUp, 
  Plus
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { articles, products, setAdminRoute, setEditingId, affiliateLinks } = useApp();

  const totalArticles = articles.length;
  const publishedCount = articles.filter(a => a.status === 'published').length;
  const draftCount = articles.filter(a => a.status === 'draft').length;
  
  const publishedProducts = products.filter(p => p.status === 'published').length;
  const draftProducts = products.filter(p => p.status === 'draft').length;
  const totalProducts = products.length;

  const totalViews = articles.reduce((sum, a) => sum + (a.views || 0), 0);
  const totalClicks = affiliateLinks.reduce((sum, a) => sum + (a.clicks || 0), 0);

  const stats = [
    { label: 'Total Artikel & Review', value: totalArticles, sub: `${publishedCount} Published • ${draftCount} Drafts`, icon: <FileText className="w-5 h-5 text-black" />, color: 'bg-emerald-100 text-emerald-800' },
    { label: 'Katalog Produk TWS', value: totalProducts, sub: `${publishedProducts} Aktif • ${draftProducts} Draft`, icon: <ShoppingBag className="w-5 h-5 text-black" />, color: 'bg-blue-100 text-blue-800' },
    { label: 'Total Pembaca Artikel', value: totalViews.toLocaleString('id-ID'), sub: 'Sesi Pembaca Terverifikasi', icon: <Eye className="w-5 h-5 text-black" />, color: 'bg-purple-100 text-purple-800' },
    { label: 'Klik Tokopedia Affiliate', value: totalClicks.toLocaleString('id-ID'), sub: 'Redirect Tokopedia Official', icon: <MousePointerClick className="w-5 h-5 text-black" />, color: 'bg-[#B9F43A] text-black' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* SEAMLESS INTEGRATED DASHBOARD HERO BANNER */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#25282A] via-[#1f2224] to-[#25282A] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm border border-neutral-800">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B9F43A] text-black font-black text-[10px] tracking-widest uppercase mb-2">
            ADMINISTRATOR CMS
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
            Dashboard Kelola GADGET HEMATT
          </h2>
          <p className="text-xs text-[#A0A5A8] mt-1.5 leading-relaxed font-medium">
            Kelola database produk TWS, ulasan artikel, status publish/draft, dan pantau statistik klik affiliasi Tokopedia secara real-time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => {
              setEditingId(null);
              setAdminRoute('product-new');
            }}
            className="px-4 py-2.5 rounded-2xl bg-[#B9F43A] hover:bg-[#a3e028] text-black font-black text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Produk</span>
          </button>

          <button
            onClick={() => {
              setEditingId(null);
              setAdminRoute('article-new');
            }}
            className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-black text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 border border-white/10"
          >
            <Plus className="w-4 h-4" />
            <span>Tulis Artikel</span>
          </button>
        </div>
      </div>

      {/* REAL COMPUTED STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="p-6 rounded-3xl bg-white border border-[#E4E8E5] shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black uppercase text-[#68736D] tracking-wider">{s.label}</span>
              <div className={`p-2.5 rounded-2xl ${s.color}`}>
                {s.icon}
              </div>
            </div>
            <div className="font-display font-black text-3xl text-[#080808]">{s.value}</div>
            <div className="text-[11px] font-bold text-[#68736D] mt-1.5 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              <span>{s.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* RECENT PRODUCTS & RECENT ARTICLES DATA SUMMARY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* RECENT PRODUCTS TABLE */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white border border-[#E4E8E5] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black tracking-widest uppercase text-[#68736D]">KATALOG PRODUK</span>
              <h3 className="font-display font-black text-lg text-[#080808]">Daftar Produk Terbaru</h3>
            </div>
            <button
              onClick={() => setAdminRoute('products')}
              className="text-xs font-black text-[#080808] hover:text-emerald-700 uppercase"
            >
              Lihat Semua ({products.length}) →
            </button>
          </div>

          {products.length === 0 ? (
            <div className="p-8 text-center bg-[#F7F8F6] rounded-2xl border border-dashed border-[#E4E8E5]">
              <p className="text-xs font-bold text-[#68736D]">Belum ada produk yang tersimpan.</p>
              <button
                onClick={() => {
                  setEditingId(null);
                  setAdminRoute('product-new');
                }}
                className="mt-3 px-4 py-2 rounded-xl bg-[#B9F43A] text-black font-black text-xs uppercase"
              >
                + Tambah Produk Pertama
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#E4E8E5] text-[#68736D] font-black uppercase text-[10px]">
                    <th className="pb-2">Produk</th>
                    <th className="pb-2">Harga</th>
                    <th className="pb-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E4E8E5]">
                  {products.slice(0, 5).map((p) => (
                    <tr key={p.id} className="hover:bg-[#F7F8F6]">
                      <td className="py-2.5 flex items-center gap-2.5">
                        <img src={p.imageUrl} alt={p.name} className="w-8 h-8 object-contain p-0.5 rounded-lg bg-[#F7F8F6] border border-[#E4E8E5]" />
                        <span className="font-bold text-[#080808] truncate max-w-[180px]">{p.name}</span>
                      </td>
                      <td className="py-2.5 font-bold text-[#080808]">
                        Rp {p.price.toLocaleString('id-ID')}
                      </td>
                      <td className="py-2.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                          p.status === 'published' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* RECENT ARTICLES SUMMARY */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-[#E4E8E5] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black tracking-widest uppercase text-[#68736D]">EDITORIAL MEDIA</span>
              <h3 className="font-display font-black text-lg text-[#080808]">Artikel Terbaru</h3>
            </div>
            <button
              onClick={() => setAdminRoute('articles')}
              className="text-xs font-black text-[#080808] hover:text-emerald-700 uppercase"
            >
              Kelola →
            </button>
          </div>

          {articles.length === 0 ? (
            <div className="p-8 text-center bg-[#F7F8F6] rounded-2xl border border-dashed border-[#E4E8E5]">
              <p className="text-xs font-bold text-[#68736D]">Belum ada artikel ulasan.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {articles.slice(0, 4).map((art) => (
                <div key={art.id} className="p-3 rounded-2xl bg-[#F7F8F6] border border-[#E4E8E5] flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs text-[#080808] truncate">{art.title}</h4>
                    <p className="text-[10px] text-[#68736D] mt-0.5">{art.date} • {art.views} views</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase shrink-0 ${
                    art.status === 'published' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {art.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
