import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { dbService } from '../services/dbService';
import { 
  Star, 
  Clock, 
  User, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  ShoppingBag, 
  ExternalLink,
  MessageSquare,
  Send,
  ShieldCheck,
  Share2,
  Copy
} from 'lucide-react';

export const ReviewDetailPage: React.FC = () => {
  const { selectedSlug, articles, products, navigate, openAffiliateModal, trackClick, comments } = useApp();
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentText, setCommentText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const article = articles.find(a => a.slug === selectedSlug || a.id === selectedSlug) || articles[0];
  const relatedProduct = products.find(p => p.id === article?.relatedProductId) || products[0];

  const approvedComments = comments.filter(c => c.articleId === article?.id && c.status === 'approved');

  if (!article) {
    return (
      <div className="pt-32 pb-20 text-center max-w-xl mx-auto px-4">
        <h2 className="text-2xl font-black font-display">Artikel Tidak Ditemukan</h2>
        <button onClick={() => navigate('/reviews')} className="mt-4 px-6 py-2 rounded-full bg-[#25282A] text-white text-xs font-bold">
          Kembali ke Ulasan
        </button>
      </div>
    );
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) return;

    dbService.addComment({
      articleId: article.id,
      articleTitle: article.title,
      userName: commentName,
      userEmail: commentEmail,
      comment: commentText
    });

    setCommentText('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="animate-fadeIn w-full bg-[#FFFFFF] min-h-screen pt-24 pb-20 border-b border-[#E4E8E5]">
      
      {/* BREADCRUMB */}
      <div className="bg-[#F7F8F6] border-b border-[#E4E8E5] py-4 px-4 sm:px-6 lg:px-8 text-xs font-bold text-[#68736D]">
        <div className="max-w-4xl mx-auto flex items-center gap-2 flex-wrap">
          <button onClick={() => navigate('/')} className="hover:text-black">Home</button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button onClick={() => navigate('/reviews')} className="hover:text-black">Reviews</button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#080808] font-black truncate max-w-xs sm:max-w-md">{article.title}</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* ARTICLE HEADER */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#B9F43A] text-black font-black text-xs uppercase tracking-wider">
              {article.category}
            </span>
            {article.verdictScore && (
              <span className="px-3 py-1 rounded-full bg-[#25282A] text-white font-black text-xs tracking-wider flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-[#B9F43A] text-[#B9F43A]" />
                {article.verdictScore}/10 Score Verdict
              </span>
            )}
          </div>

          <h1 className="font-display font-black text-3xl sm:text-5xl text-[#080808] tracking-tight leading-tight">
            {article.title}
          </h1>

          <p className="text-sm sm:text-base text-[#68736D] font-medium leading-relaxed">
            {article.subtitle}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#E4E8E5] text-xs text-[#68736D]">
            <div className="flex items-center gap-3">
              <img
                src={article.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                alt={article.author}
                className="w-10 h-10 rounded-full object-cover border border-[#E4E8E5]"
              />
              <div>
                <div className="font-black text-[#080808] text-sm">{article.author}</div>
                <div className="text-[11px]">{article.authorRole || 'Audio Reviewer'} • {article.date}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-black" />{article.readTime}</span>
              <button onClick={handleShare} className="px-3 py-1.5 rounded-full bg-[#F7F8F6] border border-[#E4E8E5] text-xs font-bold hover:bg-[#E4E8E5] flex items-center gap-1">
                {copiedLink ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-black" />}
                <span>{copiedLink ? 'Link Tersalin' : 'Bagikan'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* FEATURED IMAGE */}
        <div className="relative w-full h-72 sm:h-96 rounded-3xl overflow-hidden mb-10 bg-[#F7F8F6] border border-[#E4E8E5] shadow-md">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* RELATED PRODUCT QUICK CARD CTA */}
        {relatedProduct && (
          <div className="my-8 p-6 rounded-3xl bg-[#F7F8F6] border border-[#E4E8E5] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="flex items-center gap-4">
              <img
                src={relatedProduct.imageUrl}
                alt={relatedProduct.name}
                className="w-20 h-20 object-contain p-2 rounded-2xl bg-white border border-[#E4E8E5]"
              />
              <div>
                <div className="text-[10px] font-black tracking-widest uppercase text-[#68736D]">{relatedProduct.brand}</div>
                <h4 className="font-display font-black text-base text-[#080808] line-clamp-1">{relatedProduct.name}</h4>
                <div className="text-xs font-bold text-[#080808] mt-0.5">
                  Rp{relatedProduct.price.toLocaleString('id-ID')} • {relatedProduct.specs.anc}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => openAffiliateModal(relatedProduct)}
                className="px-5 py-3 rounded-2xl bg-[#25282A] hover:bg-black text-[#B9F43A] font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md"
              >
                <ShoppingBag className="w-4 h-4 text-[#B9F43A]" />
                <span>Cek Promo Market</span>
              </button>
            </div>
          </div>
        )}

        {/* ARTICLE BODY */}
        <div 
          className="prose max-w-none text-[#080808] text-sm sm:text-base leading-relaxed space-y-4 font-normal"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* PROS & CONS GRID */}
        {(article.pros || article.cons) && (
          <div className="my-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-emerald-50/70 border border-emerald-200">
              <h4 className="font-display font-black text-sm text-emerald-900 uppercase tracking-wider flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                KELEBIHAN (PROS)
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-emerald-950 font-medium">
                {(article.pros || ['Suara jernih', 'ANC tangguh']).map((p, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-600">•</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-3xl bg-rose-50/70 border border-rose-200">
              <h4 className="font-display font-black text-sm text-rose-900 uppercase tracking-wider flex items-center gap-2 mb-3">
                <XCircle className="w-5 h-5 text-rose-600" />
                KEKURANGAN (CONS)
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-rose-950 font-medium">
                {(article.cons || ['Cat bodi rawan tergores']).map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-rose-600">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* VERDICT SUMMARY */}
        <div className="my-10 p-8 rounded-3xl bg-[#25282A] text-white border border-[#25282A] shadow-xl">
          <div className="flex items-center justify-between gap-4 mb-4 pb-4 border-b border-white/10">
            <div>
              <span className="text-[10px] font-black tracking-widest uppercase text-[#B9F43A]">VERDICT AKHIR</span>
              <h3 className="font-display font-black text-2xl text-white">Kesimpulan Ulasan</h3>
            </div>
            {article.verdictScore && (
              <div className="text-center px-4 py-2 rounded-2xl bg-white/10 border border-white/20">
                <div className="font-display font-black text-2xl text-[#B9F43A]">{article.verdictScore}</div>
                <div className="text-[9px] uppercase tracking-wider font-extrabold">/ 10 SCORE</div>
              </div>
            )}
          </div>

          <p className="text-xs sm:text-sm text-[#D0D4D7] leading-relaxed mb-6 font-medium">
            {article.highlightSummary || article.excerpt}
          </p>

          {relatedProduct && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
              <span className="text-xs text-[#A0A5A8] font-bold">Tertarik membeli {relatedProduct.name}?</span>
              <button
                onClick={() => openAffiliateModal(relatedProduct)}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#B9F43A] hover:bg-[#a3e028] text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all hover:scale-105"
              >
                <ShoppingBag className="w-4 h-4 text-black" />
                <span>CEK HARGA TERBAIK SEKARANG</span>
              </button>
            </div>
          )}
        </div>

        {/* COMMENTS SECTION */}
        <div className="my-12 pt-8 border-t border-[#E4E8E5]">
          <h3 className="font-display font-black text-xl text-[#080808] uppercase mb-6 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-black" />
            <span>Diskusi & Komentar ({approvedComments.length})</span>
          </h3>

          {/* Comment list */}
          <div className="space-y-4 mb-8">
            {approvedComments.length === 0 ? (
              <p className="text-xs text-[#68736D] italic">Belum ada komentar publik. Jadilah yang pertama memberikan tanggapan!</p>
            ) : (
              approvedComments.map(c => (
                <div key={c.id} className="p-4 rounded-2xl bg-[#F7F8F6] border border-[#E4E8E5]">
                  <div className="flex items-center justify-between text-xs font-bold text-[#080808] mb-1">
                    <span>{c.userName}</span>
                    <span className="text-[10px] text-[#68736D]">{c.date}</span>
                  </div>
                  <p className="text-xs text-[#68736D] leading-relaxed">{c.comment}</p>
                </div>
              ))
            )}
          </div>

          {/* Add comment form */}
          <form onSubmit={handleCommentSubmit} className="p-6 rounded-3xl bg-[#F7F8F6] border border-[#E4E8E5] space-y-4">
            <h4 className="font-display font-black text-sm text-[#080808] uppercase">Tulis Tanggapan Anda</h4>
            
            {submitted && (
              <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Komentar berhasil dikirim dan menunggu moderasi admin.</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                required
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                placeholder="Nama Lengkap Anda"
                className="p-3 rounded-xl bg-white border border-[#E4E8E5] text-xs font-medium text-[#080808] focus:outline-none"
              />
              <input
                type="email"
                required
                value={commentEmail}
                onChange={(e) => setCommentEmail(e.target.value)}
                placeholder="Email Anda"
                className="p-3 rounded-xl bg-white border border-[#E4E8E5] text-xs font-medium text-[#080808] focus:outline-none"
              />
            </div>

            <textarea
              required
              rows={3}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Bagikan pendapat atau pertanyaan Anda tentang TWS ini..."
              className="w-full p-3 rounded-xl bg-white border border-[#E4E8E5] text-xs font-medium text-[#080808] focus:outline-none resize-none"
            />

            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-[#25282A] text-white text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 hover:bg-black transition-colors"
            >
              <Send className="w-3.5 h-3.5 text-[#B9F43A]" />
              <span>Kirim Komentar</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
