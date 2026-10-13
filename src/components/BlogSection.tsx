import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, Clock, Calendar, User, ArrowRight, Plus, Newspaper, Sparkles } from 'lucide-react';

export const BlogSection: React.FC = () => {
  const { articles, navigate, isAdminLoggedIn, setAdminRoute, setEditingId } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Filter only published articles
  const publishedArticles = articles.filter(a => a.status === 'published');

  // Extract unique categories
  const categories = ['all', ...Array.from(new Set(publishedArticles.map(a => a.category).filter(Boolean)))];

  const filteredArticles = selectedCategory === 'all'
    ? publishedArticles
    : publishedArticles.filter(a => a.category.toLowerCase() === selectedCategory.toLowerCase());

  // Show up to 6 latest articles in the homepage section
  const displayArticles = filteredArticles.slice(0, 6);

  return (
    <section id="blog" className="w-full py-16 bg-[#080A0D] border-b border-[#1A1F26]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12151A] border border-[#CAD6E2]/15 text-[10px] font-black tracking-widest text-[#92B6E5] uppercase mb-2 shadow-xs">
              <BookOpen className="w-3.5 h-3.5 text-[#92B6E5]" />
              <span>BLOG & ARTIKEL RESMI</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[#F8F9FA] uppercase tracking-tight">
              Blog Gadgethematt
            </h2>
            <p className="text-xs sm:text-sm text-[#9AA5B1] mt-1.5 font-medium max-w-2xl leading-relaxed">
              Panduan belanja, ulasan mendalam, edukasi audio, dan tips memilih gadget hemat untuk mahasiswa dan pelajar.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {isAdminLoggedIn && (
              <button
                onClick={() => {
                  setEditingId(null);
                  setAdminRoute('article-new');
                  navigate('/admin');
                }}
                className="px-4 py-2.5 rounded-full bg-[#12151A] text-[#F8F9FA] hover:bg-[#1A1F26] border border-[#CAD6E2]/20 hover:border-[#92B6E5]/40 font-extrabold text-xs tracking-wider uppercase transition-all flex items-center gap-2 shadow-sm cursor-pointer"
                title="Tulis artikel baru di Admin CMS"
              >
                <Plus className="w-3.5 h-3.5 text-[#92B6E5]" />
                <span>+ Tulis Artikel Baru</span>
              </button>
            )}

            <button
              onClick={() => navigate('/blog')}
              className="px-5 py-2.5 rounded-full bg-[#12151A] hover:bg-[#1A1F26] text-[#F8F9FA] font-black text-xs tracking-wider uppercase transition-all flex items-center gap-2 border border-[#CAD6E2]/15 hover:border-[#92B6E5]/40 shadow-sm cursor-pointer"
            >
              <span>Semua Artikel ({publishedArticles.length})</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#92B6E5]" />
            </button>
          </div>
        </div>

        {/* CATEGORY FILTER PILLS (Only display if multiple categories exist) */}
        {categories.length > 2 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap shrink-0 border cursor-pointer ${
                    isActive
                      ? 'bg-[#CAD6E2] text-[#050608] border-[#CAD6E2] shadow-md font-bold'
                      : 'bg-[#12151A]/70 text-[#9AA5B1] hover:text-[#F8F9FA] border-[#CAD6E2]/15 hover:border-[#92B6E5]/40'
                  }`}
                >
                  {cat === 'all' ? `Semua Artikel (${publishedArticles.length})` : cat}
                </button>
              );
            })}
          </div>
        )}

        {/* ARTICLE GRID OR PROPER EMPTY STATE */}
        {displayArticles.length === 0 ? (
          <div className="p-12 sm:p-16 text-center bg-[#0F1217] rounded-3xl border border-dashed border-[#CAD6E2]/20 shadow-md">
            <div className="w-16 h-16 rounded-2xl bg-[#12151A] border border-[#CAD6E2]/15 flex items-center justify-center mx-auto mb-4 text-[#9AA5B1]">
              <Newspaper className="w-8 h-8 text-[#92B6E5]" />
            </div>
            <h3 className="font-display font-black text-xl text-[#F8F9FA] uppercase mb-2">
              Belum Ada Artikel Blog
            </h3>
            <p className="text-xs sm:text-sm text-[#9AA5B1] max-w-md mx-auto leading-relaxed mb-6">
              Artikel yang Anda buat dan terbitkan melalui portal Admin CMS akan otomatis tampil di bagian blog ini secara real-time.
            </p>
            <button
              onClick={() => {
                if (isAdminLoggedIn) {
                  setEditingId(null);
                  setAdminRoute('article-new');
                  navigate('/admin');
                } else {
                  navigate('/admin/login');
                }
              }}
              className="px-6 py-3 rounded-full bg-[#CAD6E2] hover:bg-[#FFFFFF] text-[#050608] font-black text-xs uppercase tracking-wider transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Tulis Artikel Pertama di CMS</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayArticles.map((art) => (
              <article
                key={art.id}
                onClick={() => navigate(`/blog/${art.slug}`)}
                className="bg-[#12151A]/85 backdrop-blur-xl rounded-3xl border border-[#CAD6E2]/12 hover:border-[#92B6E5]/40 p-5 shadow-lg hover:shadow-[0_16px_40px_-12px_rgba(146,182,229,0.18)] transition-all duration-300 flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  {/* Article Thumbnail */}
                  <div className="relative w-full h-52 rounded-2xl overflow-hidden mb-5 bg-[#090B0E] border border-[#CAD6E2]/10">
                    <img
                      src={art.featuredImage}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        // Fallback image if broken
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80';
                      }}
                    />
                    
                    {/* Category Badge */}
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#050608]/90 backdrop-blur-md text-[#92B6E5] font-black text-[10px] tracking-wider uppercase border border-[#CAD6E2]/15 shadow-sm">
                      {art.category || 'Blog'}
                    </span>

                    {/* Read Time */}
                    {art.readTime && (
                      <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-[#050608]/90 backdrop-blur-md text-[#F8F9FA] font-bold text-[10px] flex items-center gap-1 border border-[#CAD6E2]/15 shadow-sm">
                        <Clock className="w-3 h-3 text-[#92B6E5]" />
                        <span>{art.readTime}</span>
                      </span>
                    )}
                  </div>

                  {/* Metadata Row */}
                  <div className="flex items-center gap-3 text-[11px] text-[#9AA5B1] mb-3 font-medium">
                    <span className="flex items-center gap-1.5 font-bold text-[#F2F3F1]">
                      {art.authorAvatar ? (
                        <img src={art.authorAvatar} alt={art.author} className="w-4 h-4 rounded-full object-cover" />
                      ) : (
                        <User className="w-3.5 h-3.5 text-[#92B6E5]" />
                      )}
                      <span>{art.author}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#9AA5B1]" />
                      <span>{art.date}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-black text-lg text-[#F2F3F1] leading-snug group-hover:text-[#92B6E5] transition-colors mb-2 line-clamp-2">
                    {art.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-xs text-[#9AA5B1] leading-relaxed line-clamp-3 mb-4 font-normal">
                    {art.excerpt || art.subtitle}
                  </p>
                </div>

                {/* Footer Link */}
                <div className="pt-4 border-t border-[#A9B5C1]/15 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#A9B5C1]">
                    {art.type === 'buying_guide' ? 'Panduan Belanja' : 'Artikel Blog'}
                  </span>
                  <span className="text-xs font-black text-[#F2F3F1] group-hover:text-[#92B6E5] flex items-center gap-1.5 uppercase tracking-wider transition-colors">
                    <span>Baca Selengkapnya</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#92B6E5] group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* BOTTOM BANNER LINK TO FULL BLOG PAGE */}
        {publishedArticles.length > 3 && (
          <div className="mt-12 text-center">
            <button
              onClick={() => navigate('/blog')}
              className="px-8 py-3.5 rounded-full bg-[#1E2329] hover:bg-[#252C34] text-[#F2F3F1] border border-[#A9B5C1]/20 hover:border-[#92B6E5]/40 font-black text-xs uppercase tracking-widest transition-all shadow-md hover:scale-105 inline-flex items-center gap-2"
            >
              <span>Jelajahi Semua Artikel Blog Gadgethematt</span>
              <ArrowRight className="w-4 h-4 text-[#92B6E5]" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
