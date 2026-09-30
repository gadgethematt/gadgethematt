import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Star, 
  ChevronRight, 
  ShoppingBag, 
  ExternalLink, 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  Share2,
  AlertCircle
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { selectedSlug, products, navigate, trackClick } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'proscons'>('overview');
  const [copied, setCopied] = useState(false);

  const product = products.find(p => p.slug === selectedSlug || p.id === selectedSlug) || products[0];

  if (!product) {
    return (
      <div className="pt-32 pb-20 text-center max-w-xl mx-auto px-4">
        <h2 className="text-2xl font-black font-display">Produk Tidak Ditemukan</h2>
        <button onClick={() => navigate('/katalog')} className="mt-4 px-6 py-2 rounded-full bg-[#25282A] text-white text-xs font-bold">
          Kembali ke Katalog
        </button>
      </div>
    );
  }

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleGoTokopedia = () => {
    if (!product.tokopediaUrl) return;
    trackClick(product.id, product.name, 'tokopedia');
    window.open(product.tokopediaUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="animate-fadeIn w-full bg-[#FFFFFF] min-h-screen pt-24 pb-20 border-b border-[#E4E8E5]">
      
      {/* BREADCRUMB */}
      <div className="bg-[#F7F8F6] border-b border-[#E4E8E5] py-4 px-4 sm:px-6 lg:px-8 text-xs font-bold text-[#68736D]">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <button onClick={() => navigate('/')} className="hover:text-black">Home</button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button onClick={() => navigate('/katalog')} className="hover:text-black">Katalog</button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#080808] font-black truncate max-w-xs">{product.name}</span>
        </div>
      </div>

      {/* MAIN PRODUCT DETAIL CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: GALLERY */}
          <div className="lg:col-span-6 flex flex-col items-center select-none">
            <div className="relative w-full h-80 sm:h-96 rounded-3xl bg-[#F7F8F6] border border-[#E4E8E5] p-8 flex items-center justify-center shadow-xs overflow-hidden">
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#B9F43A] text-black font-black text-xs uppercase tracking-wider shadow-xs">
                {product.category}
              </span>

              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-contain filter drop-shadow-xl animate-float-smooth"
              />
            </div>

            <div className="flex items-center gap-3 mt-4">
              {(product.gallery || [product.imageUrl]).map((img, i) => (
                <div key={i} className="w-16 h-16 rounded-2xl bg-[#F7F8F6] p-2 border border-[#E4E8E5] cursor-pointer hover:border-black transition-colors">
                  <img src={img} alt="Gallery" className="w-full h-full object-contain" />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: DETAILS & TOKOPEDIA AFFILIATE ACTION */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-black uppercase text-[#68736D] tracking-widest">{product.brand}</span>
                <div className="flex items-center gap-1.5 bg-[#F7F8F6] px-3 py-1 rounded-full border border-[#E4E8E5]">
                  <Star className="w-4 h-4 fill-[#080808] text-[#080808]" />
                  <span className="text-xs font-black text-[#080808]">{product.rating}</span>
                  <span className="text-xs text-[#68736D]">({product.reviewCount} Ulasan)</span>
                </div>
              </div>

              <h1 className="font-display font-black text-3xl sm:text-4xl text-[#080808] leading-tight">
                {product.name}
              </h1>

              {product.tagline && (
                <p className="text-xs sm:text-sm font-semibold text-[#68736D] mt-2">
                  {product.tagline}
                </p>
              )}
            </div>

            {/* PRICING */}
            <div className="p-4 rounded-2xl bg-[#F7F8F6] border border-[#E4E8E5] flex items-baseline justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#68736D] block">HARGA RESMI TOKOPEDIA</span>
                <span className="font-display font-black text-3xl text-[#080808]">
                  {formatRupiah(product.price)}
                </span>
                {product.oldPrice && (
                  <span className="text-xs text-[#68736D] line-through font-medium ml-2">
                    {formatRupiah(product.oldPrice)}
                  </span>
                )}
              </div>

              <button onClick={handleShare} className="p-2.5 rounded-full bg-white border border-[#E4E8E5] text-xs font-bold hover:bg-[#E4E8E5] flex items-center gap-1">
                <Share2 className="w-4 h-4 text-black" />
                <span className="hidden sm:inline">{copied ? 'Tersalin' : 'Share'}</span>
              </button>
            </div>

            {/* DIRECT TOKOPEDIA AFFILIATE BUTTON */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-black uppercase tracking-wider text-[#080808] flex items-center gap-1.5">
                <ShoppingBag className="w-4 h-4 text-black" />
                <span>CEK PROMO & BELI DI TOKOPEDIA OFFICIAL</span>
              </div>

              {product.tokopediaUrl ? (
                <button
                  onClick={handleGoTokopedia}
                  className="w-full py-4 px-6 rounded-2xl bg-[#03AC0E] hover:bg-[#02930c] text-white font-black text-sm tracking-wide uppercase flex items-center justify-between shadow-lg transition-transform hover:scale-[1.01]"
                >
                  <span>Beli di Tokopedia →</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              ) : (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 font-bold text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Affiliate link belum tersedia untuk produk ini.</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-[#68736D] pt-2">
              <span className="flex items-center gap-1 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                100% Produk Original Tokopedia Official Store
              </span>
              <span>Terverifikasi GADGET HEMATT</span>
            </div>

          </div>
        </div>

        {/* TABS & DETAILS SECTION */}
        <div className="mt-16 pt-8 border-t border-[#E4E8E5]">
          
          <div className="flex items-center gap-2 pb-4 border-b border-[#E4E8E5]">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all ${
                activeTab === 'overview' ? 'bg-[#25282A] text-[#B9F43A]' : 'bg-[#F7F8F6] text-[#68736D] border border-[#E4E8E5]'
              }`}
            >
              Ringkasan & Verdict
            </button>

            <button
              onClick={() => setActiveTab('specs')}
              className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all ${
                activeTab === 'specs' ? 'bg-[#25282A] text-[#B9F43A]' : 'bg-[#F7F8F6] text-[#68736D] border border-[#E4E8E5]'
              }`}
            >
              Spesifikasi Lengkap
            </button>

            <button
              onClick={() => setActiveTab('proscons')}
              className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all ${
                activeTab === 'proscons' ? 'bg-[#25282A] text-[#B9F43A]' : 'bg-[#F7F8F6] text-[#68736D] border border-[#E4E8E5]'
              }`}
            >
              Kelebihan & Kekurangan
            </button>
          </div>

          <div className="pt-8">
            {activeTab === 'overview' && (
              <div className="space-y-6 max-w-3xl">
                <h3 className="font-display font-black text-xl text-[#080808] uppercase">Deskripsi & Verdict Ulasan</h3>
                <p className="text-sm text-[#080808] leading-relaxed font-normal">{product.description}</p>
                <div className="p-6 rounded-3xl bg-[#F7F8F6] border border-[#E4E8E5]">
                  <div className="text-xs font-black uppercase text-[#68736D] mb-1">CATATAN PENGUJI</div>
                  <p className="text-sm font-semibold text-[#080808]">{product.verdict}</p>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="max-w-3xl overflow-hidden rounded-3xl border border-[#E4E8E5] bg-white">
                <table className="w-full text-left border-collapse text-xs font-medium">
                  <tbody className="divide-y divide-[#E4E8E5]">
                    <tr className="bg-[#F7F8F6]"><td className="p-4 font-black uppercase w-48 text-[#080808]">Active Noise Cancelling</td><td className="p-4 font-bold text-[#080808]">{product.specs.anc}</td></tr>
                    <tr><td className="p-4 font-black uppercase bg-[#F7F8F6] text-[#080808]">Daya Tahan Baterai</td><td className="p-4 font-bold text-[#080808]">{product.specs.battery}</td></tr>
                    <tr className="bg-[#F7F8F6]"><td className="p-4 font-black uppercase text-[#080808]">Audio Codec</td><td className="p-4 font-bold text-[#080808]">{product.specs.codec}</td></tr>
                    <tr><td className="p-4 font-black uppercase bg-[#F7F8F6] text-[#080808]">Mikrofon</td><td className="p-4 font-bold text-[#080808]">{product.specs.microphone}</td></tr>
                    <tr className="bg-[#F7F8F6]"><td className="p-4 font-black uppercase text-[#080808]">Ketahanan Air</td><td className="p-4 font-bold text-[#080808]">{product.specs.waterResistance}</td></tr>
                    <tr><td className="p-4 font-black uppercase bg-[#F7F8F6] text-[#080808]">Bobot Earbud</td><td className="p-4 font-bold text-[#080808]">{product.specs.weight}</td></tr>
                    <tr className="bg-[#F7F8F6]"><td className="p-4 font-black uppercase text-[#080808]">Konektivitas</td><td className="p-4 font-bold text-[#080808]">{product.specs.connectivity}</td></tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'proscons' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
                <div className="p-6 rounded-3xl bg-emerald-50/70 border border-emerald-200">
                  <h4 className="font-display font-black text-sm text-emerald-900 uppercase mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Kelebihan (Pros)
                  </h4>
                  <ul className="space-y-2 text-xs font-semibold text-emerald-950">
                    {product.pros.map((p, i) => <li key={i}>✓ {p}</li>)}
                  </ul>
                </div>

                <div className="p-6 rounded-3xl bg-rose-50/70 border border-rose-200">
                  <h4 className="font-display font-black text-sm text-rose-900 uppercase mb-3 flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-rose-600" /> Kekurangan (Cons)
                  </h4>
                  <ul className="space-y-2 text-xs font-semibold text-rose-950">
                    {product.cons.map((c, i) => <li key={i}>✕ {c}</li>)}
                  </ul>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
