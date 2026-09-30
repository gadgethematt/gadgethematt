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
      case 'Wallet': return <Wallet className="w-6 h-6 text-black" />;
      case 'Crown': return <Crown className="w-6 h-6 text-black" />;
      case 'VolumeX': return <VolumeX className="w-6 h-6 text-black" />;
      case 'Gamepad2': return <Gamepad2 className="w-6 h-6 text-black" />;
      case 'Activity': return <Activity className="w-6 h-6 text-black" />;
      case 'GraduationCap': return <GraduationCap className="w-6 h-6 text-black" />;
      case 'BatteryCharging': return <BatteryCharging className="w-6 h-6 text-black" />;
      case 'Mic': return <Mic className="w-6 h-6 text-black" />;
      default: return <VolumeX className="w-6 h-6 text-black" />;
    }
  };

  return (
    <section className="w-full py-16 bg-[#FFFFFF] border-b border-[#E4E8E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F7F8F6] border border-[#E4E8E5] text-[10px] font-black tracking-widest text-[#68736D] uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B9F43A]" />
              EXPLORE BY USE CASE
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[#080808] uppercase tracking-tight">
              Browse by Category
            </h2>
            <p className="text-xs sm:text-sm text-[#68736D] mt-1 font-medium">
              Temukan TWS ideal berdasar fitur spesifik, batas anggaran, dan skenario penggunaan harian Anda.
            </p>
          </div>

          <button
            onClick={() => navigate('/categories')}
            className="px-4 py-2 rounded-full bg-[#F7F8F6] hover:bg-[#E4E8E5] text-[#080808] font-extrabold text-xs tracking-wider uppercase transition-colors flex items-center gap-2 shrink-0 border border-[#E4E8E5]"
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
              className="bg-[#F7F8F6] rounded-3xl p-6 border border-[#E4E8E5] hover:border-[#25282A] hover:bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                {/* Icon Box */}
                <div className="w-12 h-12 rounded-2xl bg-[#B9F43A] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                  {getIcon(cat.iconName)}
                </div>

                <h3 className="font-display font-black text-lg text-[#080808] uppercase tracking-tight mb-2 group-hover:text-black transition-colors">
                  {cat.name}
                </h3>

                <p className="text-xs text-[#68736D] leading-relaxed mb-4 line-clamp-2">
                  {cat.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E4E8E5] flex items-center justify-between text-xs font-bold">
                <span className="text-[#68736D]">
                  {cat.productCount} Produk • {cat.articleCount} Artikel
                </span>

                <span className="text-[#080808] group-hover:text-[#080808] flex items-center gap-1 font-black uppercase text-[11px]">
                  <span>View</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
