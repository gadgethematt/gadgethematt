import React from 'react';
import { useApp } from '../context/AppContext';
import { X, ExternalLink, Sparkles, Copy, Check, ShoppingBag, ShieldCheck } from 'lucide-react';

export const AffiliateModal: React.FC = () => {
  const { isAffiliateModalOpen, closeAffiliateModal, selectedAffiliateProduct, trackClick } = useApp();
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  if (!isAffiliateModalOpen) return null;

  const product = selectedAffiliateProduct;

  const vouchers = [
    {
      code: 'HEMATSHOPEE',
      platform: 'Shopee Mall',
      discount: 'Diskon 50% / Extra Cashback 20K',
      bg: 'bg-orange-50 border-orange-200 text-orange-800'
    },
    {
      code: 'HEMATTOKOPEDIA',
      platform: 'Tokopedia Official',
      discount: 'Bebas Ongkir + Flash Coupon',
      bg: 'bg-emerald-50 border-emerald-200 text-emerald-800'
    },
    {
      code: 'HEMATLAZADA',
      platform: 'Lazada LazMall',
      discount: 'Bonus Voucher Rp25.000',
      bg: 'bg-blue-50 border-blue-200 text-blue-800'
    }
  ];

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleGoMarketplace = (marketplace: 'shopee' | 'tokopedia' | 'lazada') => {
    if (!product) return;
    let url = product.tokopediaUrl;
    if (marketplace === 'shopee') url = product.shopeeUrl;
    if (marketplace === 'lazada') url = product.lazadaUrl || product.tokopediaUrl;

    trackClick(product.id, product.name, marketplace);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
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
            VERIFIED AFFILIATE DEALS
          </span>
        </div>

        <h3 className="text-2xl font-black text-[#080808] font-display tracking-tight leading-snug mb-1">
          {product ? product.name : 'Voucher & Link Resmi Toko'}
        </h3>
        
        <p className="text-xs text-[#68736D] mb-6">
          Dapatkan jaminan produk 100% Original, garansi resmi, dan potongan harga khusus rujukan GADGET HEMATT.
        </p>

        {/* VOUCHER CODES */}
        <div className="space-y-3 mb-6">
          <div className="text-[11px] font-extrabold tracking-wider uppercase text-[#080808]">
            KODE VOUCHER HEMAT TERSEDIA
          </div>
          {vouchers.map(v => (
            <div key={v.code} className={`p-3 rounded-2xl border flex items-center justify-between gap-3 ${v.bg}`}>
              <div>
                <div className="text-xs font-black uppercase tracking-wider">{v.platform}</div>
                <div className="text-xs font-semibold mt-0.5">{v.discount}</div>
              </div>
              <button
                onClick={() => handleCopy(v.code)}
                className="px-3 py-1.5 rounded-xl bg-black text-white text-xs font-bold flex items-center gap-1.5 hover:bg-neutral-800 transition-colors shrink-0"
              >
                {copiedCode === v.code ? <Check className="w-3.5 h-3.5 text-[#B9F43A]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode === v.code ? 'Tersalin' : v.code}</span>
              </button>
            </div>
          ))}
        </div>

        {/* MARKETPLACE CTA BUTTONS */}
        {product && (
          <div className="space-y-2.5">
            <div className="text-[11px] font-extrabold tracking-wider uppercase text-[#080808]">
              PILIH MARKETPLACE
            </div>
            
            <button
              onClick={() => handleGoMarketplace('shopee')}
              className="w-full py-3.5 px-5 rounded-2xl bg-[#EE4D2D] hover:bg-[#d83f1f] text-white font-black text-sm tracking-wide flex items-center justify-between shadow-md transition-transform hover:scale-[1.01]"
            >
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                <span>CEK HARGA TERBAIK DI SHOPEE</span>
              </div>
              <ExternalLink className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleGoMarketplace('tokopedia')}
              className="w-full py-3.5 px-5 rounded-2xl bg-[#03AC0E] hover:bg-[#02930c] text-white font-black text-sm tracking-wide flex items-center justify-between shadow-md transition-transform hover:scale-[1.01]"
            >
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                <span>CEK HARGA TERBAIK DI TOKOPEDIA</span>
              </div>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-[#E4E8E5] flex items-center justify-between text-[10px] text-[#68736D]">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Garansi Resmi & Beli Lokal
          </span>
          <span>Official Affiliate Partner</span>
        </div>
      </div>
    </div>
  );
};
