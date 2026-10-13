import React from 'react';
import { useApp } from '../context/AppContext';
import { Star, ArrowRight, ExternalLink } from 'lucide-react';

export const FeaturedTws: React.FC = () => {
  const { products, navigate, openAffiliateModal } = useApp();

  // Filter only published products
  const publishedProducts = products.filter(p => p.status === 'published');
  const featuredList = publishedProducts.slice(0, 4);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <section className="w-full py-16 bg-[#080A0D] border-b border-[#1A1F26]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12151A] border border-[#CAD6E2]/15 text-[10px] font-black tracking-widest text-[#92B6E5] uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#92B6E5] animate-pulse" />
              CURATED SELECTION 2026
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[#F8F9FA] uppercase tracking-tight">
              Featured TWS
            </h2>
            <p className="text-xs sm:text-sm text-[#9AA5B1] mt-1 font-medium">
              Earphone TWS pilihan terlaris hasil pengujian ketat laboratorium audio GADGET HEMATT.
            </p>
          </div>

          <button
            onClick={() => navigate('/katalog')}
            className="px-4 py-2 rounded-full bg-[#12151A] hover:bg-[#1A1F26] text-[#F8F9FA] font-extrabold text-xs tracking-wider uppercase transition-colors flex items-center gap-2 shrink-0 border border-[#CAD6E2]/15 hover:border-[#92B6E5]/40 cursor-pointer"
          >
            <span>Lihat Semua ({publishedProducts.length})</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#92B6E5]" />
          </button>
        </div>

        {/* 4 FEATURED PRODUCTS GRID */}
        {featuredList.length === 0 ? (
          <div className="p-12 text-center bg-[#0F1217] rounded-3xl border border-dashed border-[#CAD6E2]/15">
            <p className="font-bold text-sm text-[#F8F9FA]">Belum ada produk yang dipublikasikan.</p>
            <p className="text-xs text-[#9AA5B1] mt-1">Produk baru akan segera hadir di katalog resmi GADGET HEMATT.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredList.map((item) => (
              <div
                key={item.id}
                className="bg-[#12151A]/85 backdrop-blur-xl rounded-3xl p-5 border border-[#CAD6E2]/12 hover:border-[#92B6E5]/45 shadow-lg hover:shadow-[0_16px_40px_-12px_rgba(146,182,229,0.18)] transition-all duration-300 flex flex-col justify-between group relative"
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-black tracking-wider uppercase px-2.5 py-1 rounded-full bg-[#92B6E5]/15 text-[#92B6E5] border border-[#92B6E5]/25">
                    {item.badge || item.category}
                  </span>
                  
                  <div className="flex items-center gap-1 bg-[#0B0D10] px-2 py-0.5 rounded-full border border-[#CAD6E2]/15">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-[11px] font-black text-[#F8F9FA]">{item.rating}</span>
                    <span className="text-[9px] text-[#9AA5B1]">({item.reviewCount})</span>
                  </div>
                </div>

                {/* Product Image */}
                <div 
                  onClick={() => navigate(`/products/${item.slug}`)}
                  className="relative w-full h-48 my-3 rounded-2xl bg-[#090B0E] border border-[#CAD6E2]/10 p-4 flex items-center justify-center cursor-pointer group-hover:border-[#92B6E5]/30 transition-colors"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Product Info */}
                <div>
                  <div className="text-[10px] font-extrabold text-[#CAD6E2] uppercase tracking-wider mb-1">
                    {item.brand}
                  </div>
                  
                  <h3 
                    onClick={() => navigate(`/products/${item.slug}`)}
                    className="font-display font-black text-base text-[#F8F9FA] leading-tight group-hover:text-[#92B6E5] transition-colors cursor-pointer line-clamp-2 min-h-[2.5rem]"
                  >
                    {item.name}
                  </h3>

                  {/* Feature Tags */}
                  <div className="flex flex-wrap gap-1.5 my-3">
                    <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-[#0B0D10] border border-[#CAD6E2]/15 text-[#CAD6E2]">
                      {item.specs.anc}
                    </span>
                    <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-[#0B0D10] border border-[#CAD6E2]/15 text-[#CAD6E2]">
                      {item.specs.codec}
                    </span>
                    <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-[#0B0D10] border border-[#CAD6E2]/15 text-[#CAD6E2]">
                      {item.specs.battery}
                    </span>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="font-display font-black text-lg text-[#F8F9FA]">
                      {formatRupiah(item.price)}
                    </span>
                    {item.oldPrice && (
                      <span className="text-xs text-[#9AA5B1] line-through font-medium">
                        {formatRupiah(item.oldPrice)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#CAD6E2]/12">
                  <button
                    onClick={() => navigate(`/reviews/${item.slug}`)}
                    className="py-2.5 px-3 rounded-xl bg-[#0B0D10] hover:bg-[#1A1F26] text-[#F8F9FA] font-extrabold text-[11px] tracking-wide uppercase transition-colors text-center border border-[#CAD6E2]/15 cursor-pointer"
                  >
                    Lihat Detail →
                  </button>

                  <button
                    onClick={() => openAffiliateModal(item)}
                    className="py-2.5 px-3 rounded-xl bg-[#CAD6E2] hover:bg-[#FFFFFF] text-[#050608] font-black text-[11px] tracking-wide uppercase transition-colors flex items-center justify-center gap-1 shadow-md hover:shadow-[0_0_16px_rgba(202,214,226,0.4)] cursor-pointer"
                  >
                    <span>Cek Harga</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
