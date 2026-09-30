import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  FileText, 
  ShoppingBag, 
  Eye, 
  MousePointerClick, 
  TrendingUp, 
  ArrowUpRight,
  ExternalLink,
  Plus
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { articles, products, setAdminRoute, navigate, setEditingId } = useApp();

  const totalArticles = articles.length || 48;
  const publishedCount = articles.filter(a => a.status === 'published').length || 42;
  const draftCount = articles.filter(a => a.status === 'draft').length || 6;
  const totalProducts = products.length || 24;
  const totalViews = articles.reduce((sum, a) => sum + (a.views || 0), 0) || 28651;
  const totalClicks = articles.reduce((sum, a) => sum + (a.affiliateClicks || 0), 0) || 3482;

  const stats = [
    { label: 'Total Articles', value: totalArticles, sub: `${publishedCount} Published • ${draftCount} Drafts`, icon: <FileText className="w-5 h-5 text-black" />, color: 'bg-emerald-100 text-emerald-800' },
    { label: 'Total Products', value: totalProducts, sub: 'Active in Catalog', icon: <ShoppingBag className="w-5 h-5 text-black" />, color: 'bg-blue-100 text-blue-800' },
    { label: 'Article Views', value: totalViews.toLocaleString('id-ID'), sub: '+18.4% this month', icon: <Eye className="w-5 h-5 text-black" />, color: 'bg-purple-100 text-purple-800' },
    { label: 'Affiliate Clicks', value: totalClicks.toLocaleString('id-ID'), sub: 'Shopee & Tokopedia Redirects', icon: <MousePointerClick className="w-5 h-5 text-black" />, color: 'bg-[#B9F43A] text-black' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* WELCOME BANNER */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#25282A] text-white border border-[#25282A] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div>
          <span className="px-3 py-1 rounded-full bg-[#B9F43A] text-black font-black text-[10px] tracking-widest uppercase">
            ADMINISTRATOR CMS
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-white mt-2">
            Selamat Datang di Dashboard GADGET HEMATT
          </h2>
          <p className="text-xs text-[#A0A5A8] mt-1 font-medium">
            Kelola artikel ulasan, katalog TWS, tautan affiliasi marketplace, dan pantau analitik performa klik pengunjung.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              setEditingId(null);
              setAdminRoute('article-new');
            }}
            className="px-4 py-2.5 rounded-2xl bg-[#B9F43A] text-black font-black text-xs uppercase tracking-wider hover:bg-[#a3e028] transition-all flex items-center gap-1.5 shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Tulis Artikel Baru</span>
          </button>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="p-6 rounded-3xl bg-white border border-[#E4E8E5] shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black uppercase text-[#68736D] tracking-wider">{s.label}</span>
              <div className={`p-2.5 rounded-2xl ${s.color}`}>
                {s.icon}
              </div>
            </div>
            <div className="font-display font-black text-3xl text-[#080808]">{s.value}</div>
            <div className="text-[11px] font-bold text-[#68736D] mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-emerald-600" />
              <span>{s.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* CHARTS SIMULATION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* VIEWS & CLICKS TREND CHART */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-white border border-[#E4E8E5] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black tracking-widest uppercase text-[#68736D]">TRAFFIC ANALYTICS</span>
              <h3 className="font-display font-black text-lg text-[#080808]">Tren Pembaca & Klik Affiliasi (30 Hari)</h3>
            </div>
            <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              +24.5% Conversion
            </span>
          </div>

          {/* Minimal SVG Bar Chart */}
          <div className="h-48 flex items-end justify-between gap-2 pt-6 px-2 border-b border-[#E4E8E5]">
            {[42, 65, 50, 85, 95, 70, 110, 130, 90, 140, 120, 160].map((h, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
                <div 
                  style={{ height: `${h}px` }} 
                  className="w-full bg-[#25282A] rounded-t-lg group-hover:bg-[#B9F43A] transition-colors relative"
                >
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow whitespace-nowrap">
                    {h * 20} Clicks
                  </div>
                </div>
                <span className="text-[9px] font-bold text-[#68736D]">{idx + 1} Feb</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-6 pt-2 text-xs font-bold text-[#68736D]">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#25282A]" /> Halaman Dibaca</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#B9F43A]" /> Shopee & Tokopedia Redirects</span>
          </div>
        </div>

        {/* MARKETPLACE CLICKS BREAKDOWN */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-white border border-[#E4E8E5] shadow-sm space-y-4">
          <div>
            <span className="text-[10px] font-black tracking-widest uppercase text-[#68736D]">CONVERSION SOURCE</span>
            <h3 className="font-display font-black text-lg text-[#080808]">Klik Per Marketplace</h3>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-between">
              <div>
                <div className="text-xs font-black text-orange-900">Shopee Mall</div>
                <div className="text-[10px] font-bold text-orange-700">1,940 Klik (55%)</div>
              </div>
              <span className="font-display font-black text-sm text-orange-950">55%</span>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
              <div>
                <div className="text-xs font-black text-emerald-900">Tokopedia Official</div>
                <div className="text-[10px] font-bold text-emerald-700">1,280 Klik (37%)</div>
              </div>
              <span className="font-display font-black text-sm text-emerald-950">37%</span>
            </div>

            <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-between">
              <div>
                <div className="text-xs font-black text-blue-900">Lazada LazMall</div>
                <div className="text-[10px] font-bold text-blue-700">262 Klik (8%)</div>
              </div>
              <span className="font-display font-black text-sm text-blue-950">8%</span>
            </div>
          </div>
        </div>

      </div>

      {/* RECENT ARTICLES TABLE */}
      <div className="p-6 rounded-3xl bg-white border border-[#E4E8E5] shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black tracking-widest uppercase text-[#68736D]">CONTENT MANAGEMENT</span>
            <h3 className="font-display font-black text-lg text-[#080808]">Artikel & Reviews Terbaru</h3>
          </div>

          <button
            onClick={() => setAdminRoute('articles')}
            className="text-xs font-black text-[#080808] hover:underline uppercase flex items-center gap-1"
          >
            <span>Lihat Semua Artikel</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E4E8E5] bg-[#F7F8F6] text-[#68736D] font-black uppercase tracking-wider">
                <th className="p-3">Gambar</th>
                <th className="p-3">Judul Artikel</th>
                <th className="p-3">Kategori</th>
                <th className="p-3">Status</th>
                <th className="p-3">Dibaca</th>
                <th className="p-3">Klik Affiliasi</th>
                <th className="p-3">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E8E5] font-medium text-[#080808]">
              {articles.slice(0, 5).map(art => (
                <tr key={art.id} className="hover:bg-[#F7F8F6]">
                  <td className="p-3">
                    <img src={art.featuredImage} alt={art.title} className="w-10 h-10 object-cover rounded-xl border border-[#E4E8E5]" />
                  </td>
                  <td className="p-3 font-bold text-[#080808] max-w-xs truncate">{art.title}</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded-full bg-[#F7F8F6] border border-[#E4E8E5] text-[10px] font-bold">{art.category}</span></td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      art.status === 'published' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {art.status}
                    </span>
                  </td>
                  <td className="p-3 font-bold">{art.views || 0}</td>
                  <td className="p-3 font-bold text-emerald-700">{art.affiliateClicks || 0}</td>
                  <td className="p-3">
                    <button
                      onClick={() => navigate(`/reviews/${art.slug}`)}
                      className="p-1 text-black hover:text-emerald-600"
                      title="Preview Artikel"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
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
