import React from 'react';
import { useApp } from '../context/AppContext';
import { X, ExternalLink, Sparkles, Copy, Check, ShoppingBag, ShieldCheck, AlertCircle } from 'lucide-react';

export const AffiliateModal: React.FC = () => {
  const { isAffiliateModalOpen, closeAffiliateModal, selectedAffiliateProduct, trackClick } = useApp();
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  if (!isAffiliateModalOpen) return null;

  const product = selectedAffiliateProduct;

  const vouchers = [
    {
      code: 'HEMATTOKOPEDIA',
      platform: 'Tokopedia Official Store',
      discount: 'Bebas Ongkir + Flash Promo Cashback',
      bg: 'bg-emerald-50 border-emerald-200 text-emerald-800'
    }
  ];

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleGoTokopedia = () => {
    if (!product || !product.tokopediaUrl) return;
    trackClick(product.id, product.name, 'tokopedia');
    window.open(product.tokopediaUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E4E8E5] overflow-hidden">
        
        {/* CLOSE BUTTON */}
        <button
          onClick={closeAffiliateModal}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#F7F8F6] text-neutral-600 hover:text-black hover:bg-neutral-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* HEADER */}
        <div className="flex items-center gap-2 mb-2">
          <span className="p-1.5 rounded-lg bg-[#B9F43A] text-black">
            <Sparkles className="w-4 h-4" />
          </span>
          <span className="text-xs font-black tracking-widest text-[#68736D] uppercase font-display">
            TOKOPEDIA AFFILIATE DEALS
          </span>
        </div>

        <h3 className="text-2xl font-black text-[#080808] font-display tracking-tight leading-snug mb-1">
          {product ? product.name : 'Voucher Tokopedia Official'}
        </h3>
        
        <p className="text-xs text-[#68736D] mb-6">
          Dapatkan jaminan produk 100% Original Tokopedia Official Store dengan garansi resmi dan bebas ongkir.
        </p>

        {/* VOUCHER CODES */}
        <div className="space-y-3 mb-6">
          <div className="text-[11px] font-extrabold tracking-wider uppercase text-[#080808]">
            KODE VOUCHER TOKOPEDIA
          </div>
          {vouchers.map(v => (
            <div key={v.code} className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 ${v.bg}`}>
              <div>
                <div className="text-xs font-black uppercase tracking-wider">{v.platform}</div>
                <div className="text-xs font-semibold mt-0.5">{v.discount}</div>
              </div>
              <button
                onClick={() => handleCopy(v.code)}
                className="px-3.5 py-2 rounded-xl bg-black text-white text-xs font-bold flex items-center gap-1.5 hover:bg-neutral-800 transition-colors shrink-0"
              >
                {copiedCode === v.code ? <Check className="w-3.5 h-3.5 text-[#B9F43A]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode === v.code ? 'Tersalin' : v.code}</span>
              </button>
            </div>
          ))}
        </div>

        {/* MARKETPLACE CTA BUTTON */}
        {product && (
          <div className="space-y-2.5">
            <div className="text-[11px] font-extrabold tracking-wider uppercase text-[#080808]">
              BELI DI TOKOPEDIA OFFICIAL
            </div>
            
            {product.tokopediaUrl ? (
              <button
                onClick={handleGoTokopedia}
                className="w-full py-4 px-5 rounded-2xl bg-[#03AC0E] hover:bg-[#02930c] text-white font-black text-sm tracking-wide flex items-center justify-between shadow-md transition-transform hover:scale-[1.01]"
              >
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4" />
                  <span>Beli di Tokopedia</span>
                </div>
                <ExternalLink className="w-4 h-4" />
              </button>
            ) : (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 font-bold text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Affiliate link belum tersedia untuk produk ini.</span>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-[#E4E8E5] flex items-center justify-between text-[10px] text-[#68736D]">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Garansi Resmi Tokopedia Official Store
          </span>
          <span>Official Affiliate Partner</span>
        </div>
      </div>
    </div>
  );
};
