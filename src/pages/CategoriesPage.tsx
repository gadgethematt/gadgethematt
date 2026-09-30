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
  ArrowRight,
  Layers
} from 'lucide-react';

export const CategoriesPage: React.FC = () => {
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
    <div className="animate-fadeIn w-full bg-[#FFFFFF] min-h-screen pt-24 pb-20 border-b border-[#E4E8E5]">
      
      {/* HEADER */}
      <div className="bg-[#F7F8F6] border-b border-[#E4E8E5] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E4E8E5] text-[10px] font-black tracking-widest text-[#68736D] uppercase mb-3">
            <Layers className="w-3.5 h-3.5 text-black" />
            DIREKTORI KATEGORI LENGKAP
          </div>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-[#080808] uppercase tracking-tight">
            CATEGORIES
          </h1>
          <p className="text-xs sm:text-sm text-[#68736D] font-medium mt-1 max-w-2xl">
            Jelajahi seluruh kategori rekomendasi TWS berdasarkan fungsionalitas, spesifikasi, dan kebutuhan spesifik Anda.
          </p>
        </div>
      </div>

      {/* CATEGORIES GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate(`/categories/${cat.slug}`)}
              className="bg-[#F7F8F6] rounded-3xl p-6 border border-[#E4E8E5] hover:border-[#25282A] hover:bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#B9F43A] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                  {getIcon(cat.iconName)}
                </div>

                <h3 className="font-display font-black text-lg text-[#080808] uppercase tracking-tight mb-2 group-hover:text-black transition-colors">
                  {cat.name}
                </h3>

                <p className="text-xs text-[#68736D] leading-relaxed mb-4 line-clamp-3 font-normal">
                  {cat.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E4E8E5] flex items-center justify-between text-xs font-bold">
                <span className="text-[#68736D]">
                  {cat.productCount} Produk • {cat.articleCount} Artikel
                </span>

                <span className="text-[#080808] group-hover:text-[#080808] flex items-center gap-1 font-black uppercase text-[11px]">
                  <span>Jelajahi</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
