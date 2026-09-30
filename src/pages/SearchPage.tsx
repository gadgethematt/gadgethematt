import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Star, ExternalLink, ArrowRight, BookOpen, Layers, ShoppingBag } from 'lucide-react';

export const SearchPage: React.FC = () => {
  const { searchQuery, setSearchQuery, products, articles, categories, navigate, openAffiliateModal } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | 'products' | 'reviews' | 'categories'>('all');

  const suggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    const matches: string[] = [];

    products.forEach(p => {
      if (p.name.toLowerCase().includes(q) && !matches.includes(p.name)) matches.push(p.name);
      if (p.brand.toLowerCase().includes(q) && !matches.includes(p.brand)) matches.push(p.brand);
    });

    articles.forEach(a => {
      if (a.title.toLowerCase().includes(q) && !matches.includes(a.title)) matches.push(a.title);
    });

    return matches.slice(0, 5);
  }, [searchQuery, products, articles]);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return { products: [], articles: [], categories: [] };

    const q = searchQuery.toLowerCase();

    const matchedProducts = products.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );

    const matchedArticles = articles.filter(a => 
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.tags.some(t => t.toLowerCase().includes(q))
    );

    const matchedCategories = categories.filter(c => 
      c.name.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q)
    );

    return {
      products: matchedProducts,
      articles: matchedArticles,
      categories: matchedCategories
    };
  }, [searchQuery, products, articles, categories]);

  const totalResults = searchResults.products.length + searchResults.articles.length + searchResults.categories.length;

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="animate-fadeIn w-full bg-[#FFFFFF] min-h-screen pt-24 pb-20 border-b border-[#E4E8E5]">
      
      {/* SEARCH HEADER */}
      <div className="bg-[#F7F8F6] border-b border-[#E4E8E5] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <span className="px-3 py-1 rounded-full bg-white border border-[#E4E8E5] text-[10px] font-black tracking-widest text-[#68736D] uppercase mb-3 inline-block">
            GLOBAL SEARCH SYSTEM
          </span>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-[#080808] uppercase mb-4">
            SEARCH GADGET HEMATT
          </h1>

          {/* Search Input Box */}
          <div className="relative">
            <Search className="w-6 h-6 text-[#68736D] absolute left-5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search TWS, brands, features, reviews (misal: Soundcore, ANC, Liberty 5)..."
              className="w-full pl-14 pr-12 py-4 rounded-3xl bg-white border border-[#E4E8E5] text-base text-[#080808] font-bold focus:outline-none focus:border-[#25282A] shadow-md"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-black text-[#68736D] hover:text-black uppercase"
              >
                Clear
              </button>
            )}
          </div>

          {/* AUTOCOMPLETE SUGGESTIONS */}
          {suggestions.length > 0 && (
            <div className="mt-3 p-3 rounded-2xl bg-white border border-[#E4E8E5] shadow-sm flex flex-wrap items-center gap-2 text-xs">
              <span className="font-extrabold text-[#68736D] uppercase">Saran:</span>
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setSearchQuery(s)}
                  className="px-3 py-1 rounded-full bg-[#F7F8F6] border border-[#E4E8E5] text-[#080808] font-bold hover:bg-[#25282A] hover:text-[#B9F43A] transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* RESULTS AREA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {!searchQuery.trim() ? (
          <div className="py-16 text-center max-w-md mx-auto">
            <Search className="w-12 h-12 text-[#68736D] mx-auto mb-3" />
            <h3 className="font-display font-black text-lg text-[#080808] uppercase">Ketik Kata Kunci Pencarian</h3>
            <p className="text-xs text-[#68736D] mt-1 font-medium">
              Cari produk TWS terlaris, ulasan mendalam, atau panduan belanja.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            
            {/* TABS */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E4E8E5]">
              <div className="flex items-center gap-2">
                {[
                  { id: 'all', label: `ALL RESULTS (${totalResults})` },
                  { id: 'products', label: `PRODUCTS (${searchResults.products.length})` },
                  { id: 'reviews', label: `REVIEWS (${searchResults.articles.length})` },
                  { id: 'categories', label: `CATEGORIES (${searchResults.categories.length})` },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as unknown as typeof activeTab)}
                    className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all ${
                      activeTab === tab.id
                        ? 'bg-[#25282A] text-[#B9F43A]'
                        : 'bg-[#F7F8F6] text-[#68736D] hover:text-black border border-[#E4E8E5]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <span className="text-xs font-medium text-[#68736D]">
                Menampilkan hasil untuk "<strong className="text-[#080808] font-black">{searchQuery}</strong>"
              </span>
            </div>

            {/* PRODUCTS TAB OR ALL */}
            {(activeTab === 'all' || activeTab === 'products') && searchResults.products.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-display font-black text-xl text-[#080808] uppercase flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-black" />
                  <span>Produk TWS ({searchResults.products.length})</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.products.map(p => (
                    <div key={p.id} className="p-5 rounded-3xl bg-white border border-[#E4E8E5] hover:border-[#25282A] shadow-sm transition-all flex flex-col justify-between">
                      <div className="flex items-center gap-4 mb-3">
                        <img src={p.imageUrl} alt={p.name} className="w-20 h-20 object-contain p-2 rounded-2xl bg-[#F7F8F6] border border-[#E4E8E5]" />
                        <div>
                          <span className="text-[10px] font-black uppercase text-[#68736D]">{p.brand}</span>
                          <h4 onClick={() => navigate(`/products/${p.slug}`)} className="font-display font-black text-base text-[#080808] cursor-pointer line-clamp-1">{p.name}</h4>
                          <div className="font-black text-sm text-[#080808] mt-1">{formatRupiah(p.price)}</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-2 pt-3 border-t border-[#E4E8E5]">
                        <button onClick={() => navigate(`/products/${p.slug}`)} className="text-xs font-black uppercase text-[#080808]">Detail →</button>
                        <button onClick={() => openAffiliateModal(p)} className="px-3 py-1.5 rounded-xl bg-[#25282A] text-[#B9F43A] font-black text-xs uppercase flex items-center gap-1">
                          <span>Cek Harga</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ARTICLES TAB OR ALL */}
            {(activeTab === 'all' || activeTab === 'reviews') && searchResults.articles.length > 0 && (
              <div className="space-y-4 pt-6">
                <h3 className="font-display font-black text-xl text-[#080808] uppercase flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-black" />
                  <span>Artikel & Reviews ({searchResults.articles.length})</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {searchResults.articles.map(art => (
                    <div key={art.id} onClick={() => navigate(`/reviews/${art.slug}`)} className="p-5 rounded-3xl bg-white border border-[#E4E8E5] hover:border-[#25282A] shadow-sm transition-all cursor-pointer flex gap-4">
                      <img src={art.featuredImage} alt={art.title} className="w-28 h-28 object-cover rounded-2xl bg-[#F7F8F6] shrink-0" />
                      <div>
                        <span className="text-[10px] font-black uppercase text-[#B9F43A] bg-[#25282A] px-2 py-0.5 rounded-md">{art.category}</span>
                        <h4 className="font-display font-black text-base text-[#080808] line-clamp-2 mt-1">{art.title}</h4>
                        <p className="text-xs text-[#68736D] line-clamp-2 mt-1 font-normal">{art.excerpt}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
