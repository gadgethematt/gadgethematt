import React, { useState } from 'react';
import { REVIEWS_DATA, PRODUCTS_CATALOG } from '../data/mockData';
import { ReviewArticle, ProductItem } from '../types';
import { BookOpen, CheckCircle, AlertTriangle, Lightbulb, Star, ExternalLink, Clock, ArrowRight, X, ShieldCheck } from 'lucide-react';

export const CampusReviews: React.FC = () => {
  const [selectedReview, setSelectedReview] = useState<ReviewArticle | null>(null);

  const getProduct = (productId: string): ProductItem | undefined => {
    return PRODUCTS_CATALOG.find(p => p.id === productId);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-neutral-900 pt-24 pb-24 px-4 sm:px-8 max-w-7xl mx-auto">
      
      {/* Header - Silver, White, and Black */}
      <div className="mb-10 text-center sm:text-left pb-8 border-b border-neutral-200">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-300 text-neutral-800 text-xs font-black uppercase tracking-wider mb-2">
          <BookOpen className="w-3.5 h-3.5 text-black" />
          Review & Skenario Mahasiswa
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black font-display tracking-tight">
          Pengujian Nyata di Perkuliahan
        </h2>
        <p className="text-sm sm:text-base text-neutral-600 mt-1 max-w-2xl">
          Pengujian langsung di kafe bising, kamar kos, dan ruang belajar untuk uji kelayakan uang saku mahasiswa.
        </p>
      </div>

      {/* Review Cards Grid - Crisp White & Silver Minimalist */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {REVIEWS_DATA.map((article) => {
          return (
            <article
              key={article.id}
              className="group bg-white border border-neutral-200 hover:border-black rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs text-neutral-500 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-800 border border-neutral-300 font-bold text-[11px]">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-neutral-500 font-medium">
                    <Clock className="w-3 h-3 text-neutral-700" />
                    {article.readTime}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-black group-hover:text-neutral-800 transition-colors mb-2 font-display leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs text-neutral-600 mb-4 line-clamp-2 leading-relaxed">
                  {article.subtitle}
                </p>

                {/* Score badge & author */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-neutral-50 border border-neutral-200 mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-black text-xs">
                      {article.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-black">{article.author}</p>
                      <p className="text-[10px] text-neutral-500">{article.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white border border-neutral-300 shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-black text-black" />
                    <span className="text-xs font-black text-black">{article.verdictScore}/10</span>
                  </div>
                </div>

                {/* Skenario Real */}
                <div className="mb-4">
                  <span className="text-[10px] font-black uppercase text-neutral-400 tracking-wider block mb-1">
                    Skenario Pengujian:
                  </span>
                  <p className="text-xs text-neutral-700 bg-neutral-50 p-3 rounded-xl border border-neutral-200 italic leading-relaxed">
                    "{article.scenario}"
                  </p>
                </div>

                {/* Highlights pros */}
                <div className="space-y-2 mb-5">
                  {article.pros.slice(0, 2).map((pro, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-neutral-700">
                      <CheckCircle className="w-3.5 h-3.5 text-black shrink-0 mt-0.5" />
                      <span>{pro}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Action */}
              <div className="pt-4 border-t border-neutral-100">
                <button
                  onClick={() => setSelectedReview(article)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-neutral-100 hover:bg-black text-neutral-900 hover:text-white rounded-xl text-xs font-bold transition-all shadow-sm group/btn"
                >
                  <span>Baca Ulasan Lengkap & Tips</span>
                  <ArrowRight className="w-4 h-4 text-neutral-600 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all" />
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* FULL REVIEW DETAIL MODAL */}
      {selectedReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-white border border-neutral-300 rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl text-neutral-900">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedReview(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 hover:text-black transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="mb-6 pr-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-800 text-xs font-bold border border-neutral-300">
                  {selectedReview.category}
                </span>
                <span className="text-xs text-neutral-500">• {selectedReview.readTime}</span>
              </div>
              <h3 className="text-2xl font-black text-black font-display leading-tight">
                {selectedReview.title}
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                Ditulis oleh <strong className="text-black">{selectedReview.author}</strong> ({selectedReview.date})
              </p>
            </div>

            {/* Highlight Summary */}
            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 mb-6">
              <span className="text-[10px] font-black uppercase text-black tracking-wider block mb-1">
                Kesimpulan Penguji:
              </span>
              <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-medium">
                {selectedReview.highlightSummary}
              </p>
            </div>

            {/* Pros & Cons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-white border border-neutral-200">
                <span className="flex items-center gap-1.5 text-xs font-bold text-black mb-3">
                  <CheckCircle className="w-4 h-4 text-black" />
                  Kelebihan Nyata
                </span>
                <ul className="space-y-2 text-xs text-neutral-700">
                  {selectedReview.pros.map((p, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-black font-bold">•</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-neutral-200">
                <span className="flex items-center gap-1.5 text-xs font-bold text-neutral-800 mb-3">
                  <AlertTriangle className="w-4 h-4 text-neutral-600" />
                  Catatan Kompromi
                </span>
                <ul className="space-y-2 text-xs text-neutral-600">
                  {selectedReview.cons.map((c, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-neutral-400 font-bold">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Student Tip */}
            <div className="p-4 rounded-2xl bg-neutral-100 border border-neutral-300 text-xs text-neutral-800 flex items-start gap-3 mb-6">
              <Lightbulb className="w-5 h-5 text-black shrink-0 mt-0.5" />
              <div>
                <span className="font-black text-black block mb-0.5">Tips Hemat Mahasiswa:</span>
                <span>{selectedReview.studentTip}</span>
              </div>
            </div>

            {/* Associated Product CTA */}
            {getProduct(selectedReview.relatedProductId) && (
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-300 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] text-neutral-500 font-bold uppercase block">Produk Terkait Diulas:</span>
                  <span className="text-sm font-black text-black line-clamp-1">
                    {getProduct(selectedReview.relatedProductId)?.name}
                  </span>
                  <span className="text-xs font-black text-black">
                    Rp {getProduct(selectedReview.relatedProductId)?.price.toLocaleString('id-ID')}
                  </span>
                </div>
                <a
                  href={getProduct(selectedReview.relatedProductId)?.tokopediaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 bg-black hover:bg-neutral-800 text-white rounded-xl text-xs font-bold shrink-0 shadow-sm"
                >
                  <span>Beli Tokopedia</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
};
