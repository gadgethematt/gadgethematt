import React from 'react';
import { useApp } from '../context/AppContext';
import { ChevronRight, Star, ExternalLink, ArrowRight } from 'lucide-react';

export const CategoryDetailPage: React.FC = () => {
  const { selectedSlug, categories, products, articles, navigate, openAffiliateModal } = useApp();

  const category = categories.find(c => c.slug === selectedSlug || c.id === selectedSlug) || categories[0];

  const categoryProducts = products.filter(p => 
    p.category.toLowerCase().includes(category?.slug?.split('-')[0] || '') ||
    p.category.toLowerCase().includes(category?.name.toLowerCase() || '') ||
    category?.slug === 'budget-tws' && p.price <= 500000 ||
    category?.slug === 'premium-tws' && p.price > 1500000
  );

  const categoryArticles = articles.filter(a => 
    a.category.toLowerCase().includes(category?.name.toLowerCase() || '') ||
    a.tags.some(t => t.toLowerCase().includes(category?.slug || ''))
  );

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  if (!category) {
    return (
      <div className="pt-32 pb-20 text-center max-w-xl mx-auto px-4">
        <h2 className="text-2xl font-black font-display">Kategori Tidak Ditemukan</h2>
        <button onClick={() => navigate('/categories')} className="mt-4 px-6 py-2 rounded-full bg-[#25282A] text-white text-xs font-bold">
          Kembali ke Kategori
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn w-full bg-[#FFFFFF] min-h-screen pt-24 pb-20 border-b border-[#E4E8E5]">
      
      {/* BREADCRUMB */}
      <div className="bg-[#F7F8F6] border-b border-[#E4E8E5] py-4 px-4 sm:px-6 lg:px-8 text-xs font-bold text-[#68736D]">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <button onClick={() => navigate('/')} className="hover:text-black">Home</button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button onClick={() => navigate('/categories')} className="hover:text-black">Categories</button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#080808] font-black">{category.name}</span>
        </div>
      </div>

      {/* HEADER */}
      <div className="bg-[#F7F8F6] border-b border-[#E4E8E5] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <span className="px-3 py-1 rounded-full bg-[#B9F43A] text-black font-black text-xs uppercase tracking-wider mb-3 inline-block">
            KATEGORI SPESIFIK
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-[#080808] uppercase tracking-tight">
            {category.name}
          </h1>
          <p className="text-xs sm:text-sm text-[#68736D] font-medium mt-2 max-w-2xl">
            {category.description}
          </p>
        </div>
      </div>

      {/* PRODUCTS SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        <div>
          <h2 className="font-display font-black text-2xl text-[#080808] uppercase mb-6">
            Rekomendasi Produk {category.name}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(categoryProducts.length > 0 ? categoryProducts : products.slice(0, 3)).map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-5 border border-[#E4E8E5] hover:border-[#25282A] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative"
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-black tracking-wider uppercase px-2.5 py-1 rounded-full bg-[#B9F43A] text-black">
                    {item.category}
                  </span>
                  
                  <div className="flex items-center gap-1 bg-[#F7F8F6] px-2 py-0.5 rounded-full border border-[#E4E8E5]">
                    <Star className="w-3 h-3 fill-[#080808] text-[#080808]" />
                    <span className="text-[11px] font-black text-[#080808]">{item.rating}</span>
                  </div>
                </div>

                <div 
                  onClick={() => navigate(`/products/${item.slug}`)}
                  className="relative w-full h-44 my-2 rounded-2xl bg-[#F7F8F6] p-4 flex items-center justify-center cursor-pointer overflow-hidden"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

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

                  <div className="font-display font-black text-lg text-[#080808] my-3">
                    {formatRupiah(item.price)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#E4E8E5]">
                  <button
                    onClick={() => navigate(`/products/${item.slug}`)}
                    className="py-2.5 px-3 rounded-xl bg-[#F7F8F6] hover:bg-[#E4E8E5] text-[#080808] font-extrabold text-[11px] uppercase"
                  >
                    Detail
                  </button>

                  <button
                    onClick={() => openAffiliateModal(item)}
                    className="py-2.5 px-3 rounded-xl bg-[#25282A] hover:bg-black text-[#B9F43A] font-black text-[11px] uppercase flex items-center justify-center gap-1 shadow-sm"
                  >
                    <span>Cek Harga</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ARTICLES SECTION */}
        {categoryArticles.length > 0 && (
          <div className="pt-8 border-t border-[#E4E8E5]">
            <h2 className="font-display font-black text-2xl text-[#080808] uppercase mb-6">
              Artikel & Ulasan {category.name}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryArticles.map((art) => (
                <article
                  key={art.id}
                  onClick={() => navigate(`/reviews/${art.slug}`)}
                  className="bg-white rounded-3xl border border-[#E4E8E5] p-5 hover:shadow-lg transition-all cursor-pointer group"
                >
                  <img src={art.featuredImage} alt={art.title} className="w-full h-40 object-cover rounded-2xl mb-4 bg-[#F7F8F6]" />
                  <h3 className="font-display font-black text-base text-[#080808] group-hover:text-black line-clamp-2 mb-2">{art.title}</h3>
                  <p className="text-xs text-[#68736D] line-clamp-2 mb-4">{art.excerpt}</p>
                  <span className="text-xs font-black text-[#080808] flex items-center gap-1 uppercase">Baca Artikel →</span>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
