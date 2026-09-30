import React from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, Clock, User, ArrowRight } from 'lucide-react';

export const BuyingGuidesPage: React.FC = () => {
  const { articles, navigate } = useApp();

  const guides = articles.filter(a => a.type === 'buying_guide' || a.category.toLowerCase().includes('guide'));

  return (
    <div className="animate-fadeIn w-full bg-[#FFFFFF] min-h-screen pt-24 pb-20 border-b border-[#E4E8E5]">
      
      {/* HEADER */}
      <div className="bg-[#F7F8F6] border-b border-[#E4E8E5] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E4E8E5] text-[10px] font-black tracking-widest text-[#68736D] uppercase mb-3">
            <BookOpen className="w-3.5 h-3.5 text-black" />
            PANDUAN BELANJA CERDAS
          </div>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-[#080808] uppercase tracking-tight">
            BUYING GUIDES
          </h1>
          <p className="text-xs sm:text-sm text-[#68736D] font-medium mt-1 max-w-2xl">
            Panduan praktis memilih TWS berdasarkan anggaran, spesifikasi teknis, fitur Active Noise Cancelling, dan kesesuaian aktivitas harian.
          </p>
        </div>
      </div>

      {/* GUIDES GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guides.map((art) => (
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
                    PANDUAN BELANJA
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
                <span className="text-xs font-black text-[#080808] group-hover:text-[#B9F43A] flex items-center gap-1 uppercase tracking-wider">
                  <span>Baca Panduan</span>
                  <ArrowRight className="w-3.5 h-3.5 text-black" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

    </div>
  );
};
