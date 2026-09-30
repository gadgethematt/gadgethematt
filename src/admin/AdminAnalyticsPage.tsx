import React from 'react';
import { useApp } from '../context/AppContext';
import { BarChart3, TrendingUp, MousePointerClick, Eye, ShoppingBag } from 'lucide-react';

export const AdminAnalyticsPage: React.FC = () => {
  const { articles, products } = useApp();

  return (
    <div className="space-y-8 animate-fadeIn">
      
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-black text-2xl text-[#080808] uppercase">ANALITIK METRIK & REDIRECT</h2>
          <p className="text-xs text-[#68736D] mt-0.5">Analisis performa konten, trafik pembaca, dan konversi klik affiliasi marketplace.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-[#E4E8E5] shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black uppercase text-[#68736D]">TOTAL ARTIKEL DIBACA</span>
            <Eye className="w-5 h-5 text-black" />
          </div>
          <div className="font-display font-black text-3xl text-[#080808]">28,651</div>
          <div className="text-[11px] font-bold text-emerald-600 mt-1">↑ 18.4% vs bulan lalu</div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#E4E8E5] shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black uppercase text-[#68736D]">KLIK AFFILIASI OUTBOUND</span>
            <MousePointerClick className="w-5 h-5 text-black" />
          </div>
          <div className="font-display font-black text-3xl text-emerald-600">3,482</div>
          <div className="text-[11px] font-bold text-emerald-600 mt-1">↑ 12.1% CTR conversion</div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#E4E8E5] shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black uppercase text-[#68736D]">TWS TERPOPULER</span>
            <ShoppingBag className="w-5 h-5 text-black" />
          </div>
          <div className="font-display font-black text-lg text-[#080808] truncate">Soundcore Liberty 5</div>
          <div className="text-[11px] font-bold text-[#68736D] mt-1">1,840 Redirect Clicks</div>
        </div>
      </div>

      {/* TOP PERFORMING ARTICLES */}
      <div className="p-6 rounded-3xl bg-white border border-[#E4E8E5] shadow-sm space-y-4">
        <h3 className="font-display font-black text-lg text-[#080808] uppercase">Top Converting Articles</h3>
        <div className="space-y-3">
          {articles.map((a, i) => (
            <div key={a.id} className="p-4 rounded-2xl bg-[#F7F8F6] border border-[#E4E8E5] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="font-display font-black text-base text-[#25282A]">#{i + 1}</span>
                <div>
                  <div className="font-bold text-xs text-[#080808]">{a.title}</div>
                  <div className="text-[10px] text-[#68736D]">{a.category} • {a.views || 100} Views</div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-black text-xs text-emerald-700">{a.affiliateClicks || 50} Clicks</div>
                <div className="text-[10px] font-bold text-[#68736D]">{(a.affiliateClicks ? ((a.affiliateClicks / (a.views || 1)) * 100).toFixed(1) : 12.5)}% CTR</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
