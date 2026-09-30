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
    <section className="w-full py-16 bg-[#FFFFFF] border-b border-[#E4E8E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F7F8F6] border border-[#E4E8E5] text-[10px] font-black tracking-widest text-[#68736D] uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B9F43A]" />
              CURATED SELECTION 2026
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[#080808] uppercase tracking-tight">
              Featured TWS
            </h2>
            <p className="text-xs sm:text-sm text-[#68736D] mt-1 font-medium">
              Earphone TWS pilihan terlaris hasil pengujian ketat laboratorium audio GADGET HEMATT.
            </p>
          </div>

          <button
            onClick={() => navigate('/katalog')}
            className="px-4 py-2 rounded-full bg-[#F7F8F6] hover:bg-[#E4E8E5] text-[#080808] font-extrabold text-xs tracking-wider uppercase transition-colors flex items-center gap-2 shrink-0 border border-[#E4E8E5]"
          >
            <span>Lihat Semua ({publishedProducts.length})</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#080808]" />
          </button>
        </div>

        {/* 4 FEATURED PRODUCTS GRID */}
        {featuredList.length === 0 ? (
          <div className="p-12 text-center bg-[#F7F8F6] rounded-3xl border border-dashed border-[#E4E8E5]">
            <p className="font-bold text-sm text-[#080808]">Belum ada produk yang dipublikasikan.</p>
            <p className="text-xs text-[#68736D] mt-1">Produk baru akan segera hadir di katalog resmi GADGET HEMATT.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredList.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-5 border border-[#E4E8E5] hover:border-[#25282A] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative"
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-black tracking-wider uppercase px-2.5 py-1 rounded-full bg-[#B9F43A] text-black">
                    {item.badge || item.category}
                  </span>
                  
                  <div className="flex items-center gap-1 bg-[#F7F8F6] px-2 py-0.5 rounded-full border border-[#E4E8E5]">
                    <Star className="w-3 h-3 fill-[#080808] text-[#080808]" />
                    <span className="text-[11px] font-black text-[#080808]">{item.rating}</span>
                    <span className="text-[9px] text-[#68736D]">({item.reviewCount})</span>
                  </div>
                </div>

                {/* Product Image */}
                <div 
                  onClick={() => navigate(`/products/${item.slug}`)}
                  className="relative w-full h-48 my-3 rounded-2xl bg-[#F7F8F6] p-4 flex items-center justify-center cursor-pointer group-hover:bg-slate-100 transition-colors"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Product Info */}
                <div>
                  <div className="text-[10px] font-extrabold text-[#68736D] uppercase tracking-wider mb-1">
                    {item.brand}
                  </div>
                  
                  <h3 
                    onClick={() => navigate(`/products/${item.slug}`)}
                    className="font-display font-black text-base text-[#080808] leading-tight group-hover:text-black transition-colors cursor-pointer line-clamp-2 min-h-[2.5rem]"
                  >
                    {item.name}
                  </h3>

                  {/* Feature Tags */}
                  <div className="flex flex-wrap gap-1.5 my-3">
                    <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-[#F7F8F6] border border-[#E4E8E5] text-[#080808]">
                      {item.specs.anc}
                    </span>
                    <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-[#F7F8F6] border border-[#E4E8E5] text-[#080808]">
                      {item.specs.codec}
                    </span>
                    <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-[#F7F8F6] border border-[#E4E8E5] text-[#080808]">
                      {item.specs.battery}
                    </span>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="font-display font-black text-lg text-[#080808]">
                      {formatRupiah(item.price)}
                    </span>
                    {item.oldPrice && (
                      <span className="text-xs text-[#68736D] line-through font-medium">
                        {formatRupiah(item.oldPrice)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#E4E8E5]">
                  <button
                    onClick={() => navigate(`/reviews/${item.slug}`)}
                    className="py-2.5 px-3 rounded-xl bg-[#F7F8F6] hover:bg-[#E4E8E5] text-[#080808] font-extrabold text-[11px] tracking-wide uppercase transition-colors text-center"
                  >
                    Read Review →
                  </button>

                  <button
                    onClick={() => openAffiliateModal(item)}
                    className="py-2.5 px-3 rounded-xl bg-[#25282A] hover:bg-black text-[#B9F43A] font-black text-[11px] tracking-wide uppercase transition-colors flex items-center justify-center gap-1 shadow-xs"
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
