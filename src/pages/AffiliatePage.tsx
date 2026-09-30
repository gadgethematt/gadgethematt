import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Sparkles } from 'lucide-react';

export const AffiliatePage: React.FC = () => {
  const { openAffiliateModal } = useApp();

  return (
    <div className="animate-fadeIn w-full bg-[#FFFFFF] min-h-screen pt-24 pb-20 border-b border-[#E4E8E5]">
      
      <div className="bg-[#F7F8F6] border-b border-[#E4E8E5] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <span className="px-3 py-1 rounded-full bg-white border border-[#E4E8E5] text-[10px] font-black tracking-widest text-[#68736D] uppercase mb-3 inline-block">
            AFFILIATE DISCLOSURE & TRANSPARENCY
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-[#080808] uppercase tracking-tight">
            AFFILIATE POLICY & PROGRAM
          </h1>
          <p className="text-xs sm:text-sm text-[#68736D] font-medium mt-1 max-w-2xl">
            Informasi keterbukaan mengenai sistem rujukan dan kemitraan affiliasi GADGET HEMATT dengan Tokopedia Official Store.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-8">
        
        <div className="p-8 rounded-3xl bg-[#F7F8F6] border border-[#E4E8E5] space-y-4">
          <h3 className="font-display font-black text-xl text-[#080808] uppercase flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>Pernyataan Keterbukaan Affiliasi (Disclosure)</span>
          </h3>

          <p className="text-xs sm:text-sm text-[#080808] leading-relaxed font-normal">
            <strong>GADGET HEMATT</strong> adalah situs media ulasan dan panduan belanja independen. Kami bukan toko e-commerce dan tidak menjual produk TWS secara langsung.
          </p>

          <p className="text-xs sm:text-sm text-[#68736D] leading-relaxed font-normal">
            Beberapa tautan pada situs ini merupakan <strong>affiliate links</strong>. Apabila Anda mengeklik tautan tersebut dan melakukan pembelian di platform Tokopedia Official Store, kami mungkin menerima komisi rujukan tanpa ada biaya tambahan sedikit pun bagi Anda.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-[#25282A] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <span className="text-[10px] font-black tracking-widest uppercase text-[#B9F43A]">AMBIL VOUCHER HEMAT</span>
            <h3 className="font-display font-black text-2xl text-white">Lihat Kode Promo Tokopedia Hari Ini</h3>
          </div>

          <button
            onClick={() => openAffiliateModal()}
            className="px-6 py-3.5 rounded-2xl bg-[#B9F43A] text-black font-black text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-[#a3e028] transition-all hover:scale-105"
          >
            <Sparkles className="w-4 h-4 text-black" />
            <span>Buka Modal Affiliasi →</span>
          </button>
        </div>

      </div>
    </div>
  );
};
