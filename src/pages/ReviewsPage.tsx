import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, Search, Clock, User, ArrowRight, Star } from 'lucide-react';

export const ReviewsPage: React.FC = () => {
  const { articles, navigate } = useApp();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const published = articles.filter(a => a.status === 'published');
  const featured = published[0];

  const filteredArticles = published.filter(art => {
    if (activeCategory !== 'all' && art.category.toLowerCase() !== activeCategory.toLowerCase()) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return art.title.toLowerCase().includes(q) || art.excerpt.toLowerCase().includes(q) || art.tags.some(t => t.toLowerCase().includes(q));
    }
    return true;
  });

  return (
    <div className="animate-fadeIn w-full bg-[#FFFFFF] min-h-screen pt-24 pb-16 border-b border-[#E4E8E5]">
      
      {/* HEADER SECTION */}
      <div className="bg-[#F7F8F6] border-b border-[#E4E8E5] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E4E8E5] text-[10px] font-black tracking-widest text-[#68736D] uppercase mb-3">
            <BookOpen className="w-3.5 h-3.5 text-black" />
            MEDIA LAB & REVIEWS
          </div>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-[#080808] uppercase tracking-tight">
            REVIEWS & ULASAN TWS
          </h1>
          <p className="text-xs sm:text-sm text-[#68736D] font-medium mt-1 max-w-2xl">
            Ulasan jujur independen dari tim audio GADGET HEMATT. Tanpa intervensi sponsor, fokus pada kenyamanan, kualitas microphone, ANC, dan value for money.
          </p>

          {/* Search bar */}
          <div className="mt-6 max-w-xl relative">
            <Search className="w-5 h-5 text-[#68736D] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari ulasan TWS, keyword, atau merk..."
              className="w-full pl-12 pr-4 py-3.5 rounded-full bg-white border border-[#E4E8E5] text-sm text-[#080808] focus:outline-none shadow-sm"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        
        {/* FEATURED REVIEW HERO ARTICLE */}
        {featured && !searchQuery && activeCategory === 'all' && (
          <div
            onClick={() => navigate(`/reviews/${featured.slug}`)}
            className="bg-[#F7F8F6] rounded-3xl p-6 sm:p-8 border border-[#E4E8E5] hover:border-[#25282A] shadow-sm hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 cursor-pointer group"
          >
            <div className="lg:col-span-7 relative h-64 sm:h-80 lg:h-full rounded-2xl overflow-hidden bg-white">
              <img
                src={featured.featuredImage}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#25282A] text-[#B9F43A] font-black text-xs uppercase tracking-wider shadow-md">
                FEATURED REVIEW
              </span>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-xs text-[#68736D] mb-3">
                  <span className="font-extrabold text-[#080808] uppercase">{featured.category}</span>
                  <span>•</span>
                  <span>{featured.date}</span>
                </div>

                <h2 className="font-display font-black text-2xl sm:text-3xl text-[#080808] leading-tight group-hover:text-black transition-colors mb-3">
                  {featured.title}
                </h2>

                <p className="text-xs sm:text-sm text-[#68736D] leading-relaxed mb-6 font-medium">
                  {featured.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E4E8E5] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-[#080808] text-[#080808]" />
                  <span className="font-black text-sm text-[#080808]">{featured.verdictScore}/10 Verdict</span>
                </div>

                <span className="text-xs font-black text-[#080808] group-hover:text-[#B9F43A] flex items-center gap-1 uppercase tracking-wider">
                  <span>Baca Selengkapnya</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* CATEGORY TABS */}
        <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-[#E4E8E5]">
          {[
            { id: 'all', label: 'Semua Artikel' },
            { id: 'reviews', label: 'Ulasan Produk (Reviews)' },
            { id: 'buying guides', label: 'Panduan Belanja' },
            { id: 'comparisons', label: 'Komparasi TWS' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all ${
                activeCategory === tab.id
                  ? 'bg-[#25282A] text-[#B9F43A]'
                  : 'bg-[#F7F8F6] text-[#68736D] hover:text-black border border-[#E4E8E5]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ARTICLES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((art) => (
            <article
              key={art.id}
              onClick={() => navigate(`/reviews/${art.slug}`)}
              className="bg-white rounded-3xl border border-[#E4E8E5] hover:border-[#25282A] p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-4 bg-[#F7F8F6]">
                  <img
                    src={art.featuredImage}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#25282A] text-[#B9F43A] font-black text-[10px] uppercase">
                    {art.category}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-[#68736D] mb-2 font-medium">
                  <span className="flex items-center gap-1"><User className="w-3 h-3 text-black" />{art.author}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-black" />{art.readTime}</span>
                </div>

                <h3 className="font-display font-black text-base text-[#080808] leading-snug group-hover:text-black transition-colors mb-2 line-clamp-2">
                  {art.title}
                </h3>

                <p className="text-xs text-[#68736D] leading-relaxed line-clamp-3 mb-4 font-normal">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E4E8E5] flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#68736D]">{art.date}</span>
                <span className="text-xs font-black text-[#080808] flex items-center gap-1 uppercase">
                  <span>Read →</span>
                </span>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
};
