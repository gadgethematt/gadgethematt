import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Star, 
  Clock, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  ShoppingBag, 
  Share2
} from 'lucide-react';

export const ReviewDetailPage: React.FC = () => {
  const { selectedSlug, articles, products, navigate, openAffiliateModal } = useApp();
  const [copiedLink, setCopiedLink] = useState(false);

  const article = articles.find(a => a.slug === selectedSlug || a.id === selectedSlug) || articles[0];
  const relatedProduct = products.find(p => p.id === article?.relatedProductId) || products[0];

  useEffect(() => {
    if (article) {
      document.title = article.seoTitle || `${article.title} - Gadget Hemat`;
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      if (article.seoDescription) {
        metaDesc.setAttribute('content', article.seoDescription);
      }
    }
  }, [article]);

  if (!article) {
    return (
      <div className="pt-32 pb-20 text-center max-w-xl mx-auto px-4">
        <h2 className="text-2xl font-black font-display">Artikel Tidak Ditemukan</h2>
        <button onClick={() => navigate('/blog')} className="mt-4 px-6 py-2 rounded-full bg-[#25282A] text-white text-xs font-bold">
          Kembali ke Blog
        </button>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="animate-fadeIn w-full bg-[#0B0D10] text-[#F2F3F1] min-h-screen pt-24 pb-20 border-b border-[#1E2329]">
      
      {/* BREADCRUMB */}
      <div className="bg-[#14181D] border-b border-[#1E2329] py-4 px-4 sm:px-6 lg:px-8 text-xs font-bold text-[#9AA5B1]">
        <div className="max-w-4xl mx-auto flex items-center gap-2 flex-wrap">
          <button onClick={() => navigate('/')} className="hover:text-[#F2F3F1]">Home</button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button onClick={() => navigate('/blog')} className="hover:text-[#F2F3F1]">Blog</button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#F2F3F1] font-black truncate max-w-xs sm:max-w-md">{article.title}</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* ARTICLE HEADER */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#92B6E5]/15 text-[#92B6E5] border border-[#92B6E5]/25 font-black text-xs uppercase tracking-wider">
              {article.category}
            </span>
            {article.verdictScore && (
              <span className="px-3 py-1 rounded-full bg-[#1E2329] text-[#F2F3F1] border border-[#A9B5C1]/20 font-black text-xs tracking-wider flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {article.verdictScore}/10 Score Verdict
              </span>
            )}
          </div>

          <h1 className="font-display font-black text-3xl sm:text-5xl text-[#F2F3F1] tracking-tight leading-tight">
            {article.title}
          </h1>

          <p className="text-sm sm:text-base text-[#9AA5B1] font-medium leading-relaxed">
            {article.subtitle}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#1E2329] text-xs text-[#9AA5B1]">
            <div className="flex items-center gap-3">
              <img
                src={article.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                alt={article.author}
                className="w-10 h-10 rounded-full object-cover border border-[#A9B5C1]/20"
              />
              <div>
                <div className="font-black text-[#F2F3F1] text-sm">{article.author}</div>
                <div className="text-[11px] text-[#9AA5B1]">{article.authorRole || 'Audio Reviewer'} • {article.date}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#92B6E5]" />{article.readTime}</span>
              <button onClick={handleShare} className="px-3 py-1.5 rounded-full bg-[#1E2329] border border-[#A9B5C1]/20 text-[#F2F3F1] text-xs font-bold hover:border-[#92B6E5]/40 flex items-center gap-1 transition-colors">
                {copiedLink ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-[#92B6E5]" />}
                <span>{copiedLink ? 'Link Tersalin' : 'Bagikan'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* FEATURED IMAGE */}
        <div className="relative w-full h-72 sm:h-96 rounded-3xl overflow-hidden mb-10 bg-[#14181D] border border-[#A9B5C1]/15 shadow-md">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* RELATED PRODUCT QUICK CARD CTA */}
        {relatedProduct && (
          <div className="my-8 p-6 rounded-3xl bg-[#1E2329]/75 backdrop-blur-md border border-[#A9B5C1]/15 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="flex items-center gap-4">
              <img
                src={relatedProduct.imageUrl}
                alt={relatedProduct.name}
                className="w-20 h-20 object-contain p-2 rounded-2xl bg-[#14181D] border border-[#A9B5C1]/15"
              />
              <div>
                <div className="text-[10px] font-black tracking-widest uppercase text-[#A9B5C1]">{relatedProduct.brand}</div>
                <h4 className="font-display font-black text-base text-[#F2F3F1] line-clamp-1">{relatedProduct.name}</h4>
                <div className="text-xs font-bold text-[#92B6E5] mt-0.5">
                  Rp{relatedProduct.price.toLocaleString('id-ID')} • {relatedProduct.specs.anc}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => openAffiliateModal(relatedProduct)}
                className="px-5 py-3 rounded-2xl bg-[#92B6E5] hover:bg-[#A9B5C1] text-[#0B0D10] font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md transition-colors"
              >
                <ShoppingBag className="w-4 h-4 text-[#0B0D10]" />
                <span>Cek Promo Market</span>
              </button>
            </div>
          </div>
        )}

        {/* ARTICLE BODY */}
        <div 
          className="prose prose-invert max-w-none text-[#D9E1E8] text-sm sm:text-base leading-relaxed space-y-4 font-normal [&_h2]:text-[#F2F3F1] [&_h2]:font-display [&_h2]:font-black [&_h2]:text-2xl [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:text-[#F2F3F1] [&_h3]:font-display [&_h3]:font-black [&_h3]:text-xl [&_h3]:mt-6 [&_h3]:mb-3 [&_strong]:text-[#F2F3F1] [&_a]:text-[#92B6E5] [&_a]:underline [&_table]:w-full [&_table]:border-collapse [&_table]:my-6 [&_th]:bg-[#1E2329] [&_th]:text-[#F2F3F1] [&_th]:p-3 [&_th]:border [&_th]:border-[#1E2329] [&_td]:p-3 [&_td]:border [&_td]:border-[#1E2329] [&_td]:bg-[#14181D]/60 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:my-1.5 [&_blockquote]:border-l-4 [&_blockquote]:border-[#92B6E5] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-[#A9B5C1]"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* PROS & CONS GRID */}
        {(article.pros || article.cons) && (
          <div className="my-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-emerald-950/25 border border-emerald-500/30">
              <h4 className="font-display font-black text-sm text-emerald-400 uppercase tracking-wider flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                KELEBIHAN (PROS)
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-emerald-200 font-medium">
                {(article.pros || ['Suara jernih', 'ANC tangguh']).map((p, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-400">•</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-3xl bg-rose-950/25 border border-rose-500/30">
              <h4 className="font-display font-black text-sm text-rose-400 uppercase tracking-wider flex items-center gap-2 mb-3">
                <XCircle className="w-5 h-5 text-rose-400" />
                KEKURANGAN (CONS)
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-rose-200 font-medium">
                {(article.cons || ['Cat bodi rawan tergores']).map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-rose-400">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* VERDICT SUMMARY */}
        <div className="my-10 p-8 rounded-3xl bg-[#1E2329] text-[#F2F3F1] border border-[#A9B5C1]/20 shadow-xl">
          <div className="flex items-center justify-between gap-4 mb-4 pb-4 border-b border-[#A9B5C1]/15">
            <div>
              <span className="text-[10px] font-black tracking-widest uppercase text-[#92B6E5]">VERDICT AKHIR</span>
              <h3 className="font-display font-black text-2xl text-[#F2F3F1]">Kesimpulan Ulasan</h3>
            </div>
            {article.verdictScore && (
              <div className="text-center px-4 py-2 rounded-2xl bg-[#14181D] border border-[#A9B5C1]/20">
                <div className="font-display font-black text-2xl text-[#92B6E5]">{article.verdictScore}</div>
                <div className="text-[9px] uppercase tracking-wider font-extrabold text-[#9AA5B1]">/ 10 SCORE</div>
              </div>
            )}
          </div>

          <p className="text-xs sm:text-sm text-[#9AA5B1] leading-relaxed mb-6 font-medium">
            {article.highlightSummary || article.excerpt}
          </p>

          {relatedProduct && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#A9B5C1]/15">
              <span className="text-xs text-[#9AA5B1] font-bold">Tertarik membeli {relatedProduct.name}?</span>
              <button
                onClick={() => openAffiliateModal(relatedProduct)}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#92B6E5] hover:bg-[#A9B5C1] text-[#0B0D10] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all hover:scale-105"
              >
                <ShoppingBag className="w-4 h-4 text-[#0B0D10]" />
                <span>CEK HARGA TERBAIK SEKARANG</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
