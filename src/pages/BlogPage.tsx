import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, Search, Clock, Calendar, User, ArrowRight, Plus, Newspaper, ChevronRight } from 'lucide-react';

export const BlogPage: React.FC = () => {
  const { articles, navigate, isAdminLoggedIn, setAdminRoute, setEditingId } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Only show published articles in public blog
  const publishedArticles = articles.filter(a => a.status === 'published');

  // Categories list
  const categories = ['all', ...Array.from(new Set(publishedArticles.map(a => a.category).filter(Boolean)))];

  const filteredArticles = publishedArticles.filter(art => {
    if (activeCategory !== 'all' && art.category.toLowerCase() !== activeCategory.toLowerCase()) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = art.title.toLowerCase().includes(q);
      const matchExcerpt = (art.excerpt || '').toLowerCase().includes(q);
      const matchTags = (art.tags || []).some(t => t.toLowerCase().includes(q));
      const matchAuthor = (art.author || '').toLowerCase().includes(q);
      return matchTitle || matchExcerpt || matchTags || matchAuthor;
    }
    return true;
  });

  const featured = publishedArticles[0];

  return (
    <div className="animate-fadeIn w-full bg-white min-h-screen pt-20 pb-20 border-b border-[#E4E8E5]">
      
      {/* BREADCRUMB */}
      <div className="bg-[#F7F8F6] border-b border-[#E4E8E5] py-3.5 px-4 sm:px-6 lg:px-8 text-xs font-bold text-[#68736D]">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <button onClick={() => navigate('/')} className="hover:text-black">Home</button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#080808] font-black">Blog & Artikel</span>
        </div>
      </div>

      {/* HEADER SECTION */}
      <div className="bg-[#F7F8F6] border-b border-[#E4E8E5] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E4E8E5] text-[10px] font-black tracking-widest text-[#68736D] uppercase mb-3 shadow-xs">
              <BookOpen className="w-3.5 h-3.5 text-black" />
              <span>EDITORIAL MEDIA & BLOG</span>
            </div>
            <h1 className="font-display font-black text-3xl sm:text-5xl text-[#080808] uppercase tracking-tight">
              BLOG GADGET HEMATT
            </h1>
            <p className="text-xs sm:text-sm text-[#68736D] font-medium mt-2 max-w-2xl leading-relaxed">
              Panduan belanja terpercaya, ulasan audio mendalam, tips hemat, dan komparasi spesifikasi TWS yang dirancang khusus untuk kebutuhan mahasiswa dan pelajar di Indonesia.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {isAdminLoggedIn && (
              <button
                onClick={() => {
                  setEditingId(null);
                  setAdminRoute('article-new');
                  navigate('/admin');
                }}
                className="px-5 py-3 rounded-full bg-[#B9F43A] hover:bg-[#a3e028] text-black font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-md hover:scale-105"
              >
                <Plus className="w-4 h-4" />
                <span>+ Tulis Artikel Baru</span>
              </button>
            )}
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="max-w-7xl mx-auto mt-8">
          <div className="max-w-xl relative">
            <Search className="w-4 h-4 text-[#68736D] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari artikel, panduan TWS, tips audio, atau merk..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-[#E4E8E5] text-xs font-medium text-[#080808] focus:outline-none focus:border-black shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#68736D] hover:text-black"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-10">
        
        {/* CATEGORY FILTER TABS */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap shrink-0 border ${
                  isActive
                    ? 'bg-[#25282A] text-[#B9F43A] border-[#25282A] shadow-xs'
                    : 'bg-[#F7F8F6] text-[#68736D] hover:text-[#080808] border-[#E4E8E5] hover:border-neutral-400'
                }`}
              >
                {cat === 'all' ? `Semua Artikel (${publishedArticles.length})` : cat}
              </button>
            );
          })}
        </div>

        {/* FEATURED ARTICLE (Show when no active search & 'all' category) */}
        {featured && !searchQuery && activeCategory === 'all' && (
          <div
            onClick={() => navigate(`/blog/${featured.slug}`)}
            className="bg-[#F7F8F6] rounded-3xl p-6 sm:p-8 border border-[#E4E8E5] hover:border-[#25282A] shadow-xs hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 cursor-pointer group"
          >
            <div className="lg:col-span-7 relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden bg-white">
              <img
                src={featured.featuredImage}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80';
                }}
              />
              <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-[#25282A] text-[#B9F43A] font-black text-xs uppercase tracking-wider shadow-md">
                ARTIKEL UTAMA
              </span>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between py-2">
              <div>
                <div className="flex items-center gap-3 text-xs text-[#68736D] mb-3 font-medium">
                  <span className="px-2.5 py-0.5 rounded-full bg-white border border-[#E4E8E5] font-black text-[#080808] text-[10px] uppercase">
                    {featured.category}
                  </span>
                  <span>•</span>
                  <span>{featured.date}</span>
                  {featured.readTime && (
                    <>
                      <span>•</span>
                      <span>{featured.readTime}</span>
                    </>
                  )}
                </div>

                <h2 className="font-display font-black text-2xl sm:text-3xl text-[#080808] leading-tight group-hover:text-black mb-3">
                  {featured.title}
                </h2>

                <p className="text-xs sm:text-sm text-[#68736D] leading-relaxed line-clamp-4 font-normal mb-6">
                  {featured.excerpt || featured.subtitle}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E4E8E5] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {featured.authorAvatar ? (
                    <img src={featured.authorAvatar} alt={featured.author} className="w-6 h-6 rounded-full object-cover" />
                  ) : (
                    <User className="w-4 h-4 text-black" />
                  )}
                  <span className="text-xs font-bold text-[#080808]">{featured.author}</span>
                </div>

                <span className="px-4 py-2 rounded-full bg-[#B9F43A] text-black font-black text-xs uppercase tracking-wider flex items-center gap-1.5 group-hover:shadow-md transition-shadow">
                  <span>Baca Sekarang</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ARTICLES GRID */}
        {filteredArticles.length === 0 ? (
          <div className="p-16 text-center bg-[#F7F8F6] rounded-3xl border border-dashed border-[#CBD5E1]">
            <Newspaper className="w-12 h-12 text-[#68736D] mx-auto mb-3" />
            <h3 className="font-display font-black text-lg text-[#080808] uppercase mb-1">
              {searchQuery ? 'Tidak Ada Artikel yang Cocok' : 'Belum Ada Artikel'}
            </h3>
            <p className="text-xs text-[#68736D] max-w-sm mx-auto mb-5 leading-relaxed">
              {searchQuery 
                ? 'Tidak ditemukan artikel dengan kata kunci tersebut. Coba gunakan kata kunci lain.' 
                : 'Artikel blog yang dibuat melalui Admin CMS akan otomatis tampil di sini.'}
            </p>
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="px-5 py-2.5 rounded-full bg-white border border-[#E4E8E5] text-[#080808] font-bold text-xs"
              >
                Hapus Pencarian
              </button>
            ) : (
              <button
                onClick={() => navigate('/admin/login')}
                className="px-6 py-2.5 rounded-full bg-[#B9F43A] text-black font-black text-xs uppercase tracking-wider"
              >
                Masuk ke Admin CMS
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-black text-lg uppercase text-[#080808]">
                Daftar Artikel {activeCategory !== 'all' && `(${activeCategory})`}
              </h3>
              <span className="text-xs font-bold text-[#68736D]">
                Menampilkan {filteredArticles.length} artikel
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((art) => (
                <article
                  key={art.id}
                  onClick={() => navigate(`/blog/${art.slug}`)}
                  className="bg-white rounded-3xl border border-[#E4E8E5] hover:border-[#25282A] p-5 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group"
                >
                  <div>
                    <div className="relative w-full h-52 rounded-2xl overflow-hidden mb-5 bg-[#F7F8F6]">
                      <img
                        src={art.featuredImage}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80';
                        }}
                      />
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#25282A] text-[#B9F43A] font-black text-[10px] tracking-wider uppercase shadow-md">
                        {art.category}
                      </span>
                      {art.readTime && (
                        <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-xs text-white font-bold text-[10px] flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#B9F43A]" />
                          <span>{art.readTime}</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-[#68736D] mb-2 font-medium">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3 text-black" />
                        {art.author}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#68736D]" />
                        {art.date}
                      </span>
                    </div>

                    <h4 className="font-display font-black text-base text-[#080808] leading-snug group-hover:text-black transition-colors mb-2 line-clamp-2">
                      {art.title}
                    </h4>

                    <p className="text-xs text-[#68736D] leading-relaxed line-clamp-3 mb-4 font-normal">
                      {art.excerpt || art.subtitle}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E4E8E5] flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#68736D]">
                      {art.type === 'buying_guide' ? 'Panduan Belanja' : 'Artikel Blog'}
                    </span>
                    <span className="text-xs font-black text-[#080808] group-hover:text-black flex items-center gap-1 uppercase tracking-wider">
                      <span>Baca Artikel</span>
                      <ArrowRight className="w-3.5 h-3.5 text-black group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
