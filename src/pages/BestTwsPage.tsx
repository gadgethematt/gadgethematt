import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Star, Award, CheckCircle2, ShoppingBag, ExternalLink, ShieldCheck } from 'lucide-react';

export const BestTwsPage: React.FC = () => {
  const { products, navigate, openAffiliateModal } = useApp();
  const [selectedSection, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', title: 'Best TWS Overall' },
    { id: 'budget', title: 'Best Budget TWS' },
    { id: 'anc', title: 'Best ANC TWS' },
    { id: 'students', title: 'Best TWS for Students' },
  ];

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="animate-fadeIn w-full bg-[#FFFFFF] min-h-screen pt-24 pb-20 border-b border-[#E4E8E5]">
      
      {/* HEADER */}
      <div className="bg-[#F7F8F6] border-b border-[#E4E8E5] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E4E8E5] text-[10px] font-black tracking-widest text-[#68736D] uppercase mb-3">
            <Award className="w-3.5 h-3.5 text-black" />
            EDITORIAL REKOMENDASI TWS TERBAIK
          </div>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-[#080808] uppercase tracking-tight">
            BEST TWS RECOMMENDATIONS
          </h1>
          <p className="text-xs sm:text-sm text-[#68736D] font-medium mt-1 max-w-2xl">
            Daftar TWS terbaik terperingkat berdasarkan kategori penggunaan, anggaran, dan hasil tes laboratorium audio GADGET HEMATT.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map(c => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all ${
                  selectedSection === c.id
                    ? 'bg-[#25282A] text-[#B9F43A]'
                    : 'bg-white text-[#68736D] hover:text-black border border-[#E4E8E5]'
                }`}
              >
                {c.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CURATED RANKINGS LIST */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8">
        {products.map((item, index) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E4E8E5] hover:border-[#25282A] shadow-sm hover:shadow-xl transition-all duration-300 grid grid-cols-1 md:grid-cols-12 gap-6 relative overflow-hidden"
          >
            {/* Rank Badge */}
            <div className="absolute top-0 left-0 px-4 py-1.5 rounded-br-2xl bg-[#25282A] text-[#B9F43A] font-black text-xs uppercase tracking-wider">
              RANK #{index + 1}
            </div>

            {/* Left Image */}
            <div className="md:col-span-4 flex items-center justify-center p-4 bg-[#F7F8F6] rounded-2xl border border-[#E4E8E5] mt-6 md:mt-0">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-48 h-48 object-contain filter drop-shadow-md"
              />
            </div>

            {/* Right Info */}
            <div className="md:col-span-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-black tracking-widest uppercase text-[#68736D]">{item.brand}</span>
                  <div className="flex items-center gap-1 bg-[#F7F8F6] px-2.5 py-0.5 rounded-full border border-[#E4E8E5]">
                    <Star className="w-3.5 h-3.5 fill-[#080808] text-[#080808]" />
                    <span className="text-xs font-black text-[#080808]">{item.rating}</span>
                  </div>
                </div>

                <h3 
                  onClick={() => navigate(`/products/${item.slug}`)}
                  className="font-display font-black text-2xl text-[#080808] cursor-pointer hover:text-black transition-colors"
                >
                  {item.name}
                </h3>

                <div className="font-display font-black text-xl text-[#080808] my-2">
                  {formatRupiah(item.price)}
                </div>

                <p className="text-xs text-[#68736D] font-medium leading-relaxed mb-4">
                  <strong className="text-[#080808]">Alasan Direkomendasikan:</strong> {item.verdict || item.description}
                </p>

                {/* Pros */}
                <div className="space-y-1 mb-4">
                  {item.pros.slice(0, 2).map((p, i) => (
                    <div key={i} className="text-xs font-semibold text-emerald-800 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-[#E4E8E5] flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => navigate(`/products/${item.slug}`)}
                  className="text-xs font-black text-[#080808] hover:underline uppercase tracking-wider"
                >
                  Lihat Review Lengkap →
                </button>

                <button
                  onClick={() => openAffiliateModal(item)}
                  className="px-6 py-2.5 rounded-2xl bg-[#25282A] hover:bg-black text-[#B9F43A] font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-md transition-all hover:scale-105"
                >
                  <ShoppingBag className="w-4 h-4 text-[#B9F43A]" />
                  <span>CEK HARGA DI MARKETPLACE</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#B9F43A]" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
