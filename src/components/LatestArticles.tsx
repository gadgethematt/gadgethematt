import React from 'react';
import { useApp } from '../context/AppContext';
import { Clock, User, ArrowRight, BookOpen } from 'lucide-react';

export const LatestArticles: React.FC = () => {
  const { articles, navigate } = useApp();

  const publishedArticles = articles.filter(a => a.status === 'published').slice(0, 3);

  return (
    <section className="w-full py-16 bg-[#F7F8F6] border-b border-[#E4E8E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E4E8E5] text-[10px] font-black tracking-widest text-[#68736D] uppercase mb-2">
              <BookOpen className="w-3 h-3 text-black" />
              EDITORIAL MEDIA & REVIEWS
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[#080808] uppercase tracking-tight">
              Latest TWS Articles
            </h2>
            <p className="text-xs sm:text-sm text-[#68736D] mt-1 font-medium">
              Ulasan mendalam, uji perbandingan, dan panduan memilih TWS berdasar kebutuhan riil mahasiswa.
            </p>
          </div>

          <button
            onClick={() => navigate('/reviews')}
            className="px-4 py-2 rounded-full bg-white hover:bg-[#E4E8E5] text-[#080808] font-extrabold text-xs tracking-wider uppercase transition-colors flex items-center gap-2 shrink-0 border border-[#E4E8E5]"
          >
            <span>Semua Ulasan →</span>
          </button>
        </div>

        {/* ARTICLES EDITORIAL GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {publishedArticles.map((art) => (
            <article
              key={art.id}
              onClick={() => navigate(`/reviews/${art.slug}`)}
              className="bg-white rounded-3xl border border-[#E4E8E5] hover:border-[#25282A] p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                {/* Article Image Container */}
                <div className="relative w-full h-52 rounded-2xl overflow-hidden mb-5 bg-[#F7F8F6]">
                  <img
                    src={art.featuredImage}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#25282A] text-[#B9F43A] font-black text-[10px] tracking-wider uppercase shadow-md">
                    {art.category}
                  </span>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-3 text-[11px] text-[#68736D] mb-2 font-medium">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3 text-black" />
                    {art.author}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-black" />
                    {art.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display font-black text-lg text-[#080808] leading-snug group-hover:text-black transition-colors mb-2 line-clamp-2">
                  {art.title}
                </h3>

                {/* Excerpt */}
                <p className="text-xs text-[#68736D] leading-relaxed line-clamp-3 mb-4 font-normal">
                  {art.excerpt}
                </p>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-[#E4E8E5] flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#68736D]">{art.date}</span>
                <span className="text-xs font-black text-[#080808] group-hover:text-[#B9F43A] flex items-center gap-1 uppercase tracking-wider">
                  <span>Baca Ulasan</span>
                  <ArrowRight className="w-3.5 h-3.5 text-black" />
                </span>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
