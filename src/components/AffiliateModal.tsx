import React, { useState } from 'react';
import { X, ExternalLink, Copy, Check, ShieldCheck, Truck, Zap, ShoppingBag } from 'lucide-react';

interface AffiliateModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUrl?: string;
}

export const AffiliateModal: React.FC<AffiliateModalProps> = ({ 
  isOpen, 
  onClose,
  targetUrl = 'https://vt.tokopedia.com/t/ZS9AfThNusdPL-onCes/' 
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyVoucher = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md">
      {/* Backdrop overlay dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container - Strict Silver, White, and Black Aesthetic */}
      <div 
        id="affiliate-modal"
        className="relative w-full max-w-lg bg-white border border-neutral-300 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 overflow-hidden text-neutral-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Black Stripe */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-black" />

        {/* Close Button */}
        <button
          id="close-affiliate-modal"
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-black transition-colors"
          aria-label="Tutup"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-xs font-black tracking-wide uppercase mb-2 border border-neutral-300">
            <Zap className="w-3.5 h-3.5 text-black" />
            Toko Resmi Terverifikasi
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-black tracking-tight font-display">
            Beli di Tokopedia Official
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1">
            Dapatkan harga terendah resmi flash sale dengan garansi 100% authentic & bebas ongkir.
          </p>
        </div>

        {/* Primary Tokopedia Deal Card */}
        <div className="space-y-4">
          <div className="border border-neutral-300 hover:border-black rounded-2xl p-5 transition-all duration-200 bg-neutral-50 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-black text-white font-black text-xs flex items-center justify-center">
                  T
                </span>
                <div>
                  <span className="font-extrabold text-sm text-black block leading-none">Tokopedia Mall</span>
                  <span className="text-[10px] text-neutral-500 font-semibold">Toko Resmi Terdaftar</span>
                </div>
              </div>
              <button
                onClick={() => copyVoucher('HEMATTOKOPEDIA')}
                className="text-xs font-bold text-neutral-800 hover:text-black flex items-center gap-1 bg-white hover:bg-neutral-100 px-3 py-1.5 rounded-lg border border-neutral-300 shadow-sm"
              >
                {copiedCode === 'HEMATTOKOPEDIA' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-black" />
                    Tersalin!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-neutral-600" />
                    Klaim Promo
                  </>
                )}
              </button>
            </div>

            <div className="text-xs text-neutral-600 mb-4 flex items-center gap-3">
              <span className="flex items-center gap-1 font-semibold text-black">
                <Truck className="w-3.5 h-3.5 text-black" /> Bebas Ongkir XTRA
              </span>
              <span>•</span>
              <span>100% Authentic Beli Lokal</span>
            </div>

            {/* Direct Tokopedia CTA */}
            <a
              id="cta-tokopedia-affiliate"
              href={targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-black hover:bg-neutral-800 text-white font-bold rounded-xl text-xs sm:text-sm transition-all shadow-md active:scale-[0.99]"
            >
              <ShoppingBag className="w-4 h-4 text-white" />
              <span>Buka Sekarang di Tokopedia</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-6 pt-4 border-t border-neutral-200 flex items-center justify-between text-[11px] text-neutral-500">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-black" />
            100% Produk Original Terverifikasi
          </span>
          <span className="font-semibold text-neutral-800">Garansi Pengembalian</span>
        </div>
      </div>
    </div>
  );
};
