import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Wallet, 
  Crown, 
  VolumeX, 
  Gamepad2, 
  Activity, 
  GraduationCap, 
  BatteryCharging, 
  Mic, 
  ArrowRight 
} from 'lucide-react';

export const BrowseCategories: React.FC = () => {
  const { categories, navigate } = useApp();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wallet': return <Wallet className="w-5 h-5 text-[#92B6E5]" />;
      case 'Crown': return <Crown className="w-5 h-5 text-[#92B6E5]" />;
      case 'VolumeX': return <VolumeX className="w-5 h-5 text-[#92B6E5]" />;
      case 'Gamepad2': return <Gamepad2 className="w-5 h-5 text-[#92B6E5]" />;
      case 'Activity': return <Activity className="w-5 h-5 text-[#92B6E5]" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-[#92B6E5]" />;
      case 'BatteryCharging': return <BatteryCharging className="w-5 h-5 text-[#92B6E5]" />;
      case 'Mic': return <Mic className="w-5 h-5 text-[#92B6E5]" />;
      default: return <VolumeX className="w-5 h-5 text-[#92B6E5]" />;
    }
  };

  return (
    <section className="w-full py-16 bg-[#050608] border-b border-[#1A1F26]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12151A] border border-[#CAD6E2]/15 text-[10px] font-black tracking-widest text-[#92B6E5] uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#92B6E5] animate-pulse" />
              EXPLORE BY USE CASE
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[#F8F9FA] uppercase tracking-tight">
              Browse by Category
            </h2>
            <p className="text-xs sm:text-sm text-[#9AA5B1] mt-1 font-medium">
              Temukan TWS ideal berdasar fitur spesifik, batas anggaran, dan skenario penggunaan harian Anda.
            </p>
          </div>

          <button
            onClick={() => navigate('/categories')}
            className="px-4 py-2 rounded-full bg-[#12151A] hover:bg-[#1A1F26] text-[#F8F9FA] font-extrabold text-xs tracking-wider uppercase transition-colors flex items-center gap-2 shrink-0 border border-[#CAD6E2]/15 hover:border-[#92B6E5]/40 cursor-pointer"
          >
            <span>Semua Kategori ({categories.length}) →</span>
          </button>
        </div>

        {/* CATEGORIES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate(`/categories/${cat.slug}`)}
              className="bg-[#12151A]/85 backdrop-blur-xl rounded-3xl p-6 border border-[#CAD6E2]/12 hover:border-[#92B6E5]/50 hover:bg-[#161B22] shadow-lg hover:shadow-[0_16px_40px_-12px_rgba(146,182,229,0.18)] transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                {/* Icon Box */}
                <div className="w-12 h-12 rounded-2xl bg-[#0B0D10] border border-[#CAD6E2]/15 flex items-center justify-center mb-4 group-hover:border-[#92B6E5]/40 group-hover:scale-110 transition-all shadow-md">
                  {getIcon(cat.iconName)}
                </div>

                <h3 className="font-display font-black text-lg text-[#F8F9FA] uppercase tracking-tight mb-2 group-hover:text-[#92B6E5] transition-colors">
                  {cat.name}
                </h3>

                <p className="text-xs text-[#9AA5B1] leading-relaxed mb-4 line-clamp-2">
                  {cat.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#CAD6E2]/12 flex items-center justify-between text-xs font-bold">
                <span className="text-[#9AA5B1]">
                  {cat.productCount} Produk • {cat.articleCount} Artikel
                </span>

                <span className="text-[#F8F9FA] group-hover:text-[#92B6E5] flex items-center gap-1 font-black uppercase text-[11px] transition-colors">
                  <span>View</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#92B6E5]" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
