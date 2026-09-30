import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Award, HeartHandshake, Sparkles } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="animate-fadeIn w-full bg-[#FFFFFF] min-h-screen pt-24 pb-20 border-b border-[#E4E8E5]">
      
      <div className="bg-[#F7F8F6] border-b border-[#E4E8E5] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <span className="px-3 py-1 rounded-full bg-white border border-[#E4E8E5] text-[10px] font-black tracking-widest text-[#68736D] uppercase mb-3 inline-block">
            TENTANG PLATFORM MEDIA
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-[#080808] uppercase tracking-tight">
            TENTANG GADGET HEMATT
          </h1>
          <p className="text-sm sm:text-base text-[#68736D] font-medium mt-2 leading-relaxed">
            GADGET HEMATT adalah media ulasan, panduan belanja, komparasi, dan rujukan affiliasi True Wireless Stereo (TWS) paling transparan untuk mahasiswa dan penikmat audio Indonesia.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        
        <div className="prose max-w-none text-[#080808] space-y-4 text-sm sm:text-base font-normal">
          <h3 className="font-display font-black text-xl uppercase">Visi & Komitmen Editorial</h3>
          <p>
            Kami percaya bahwa mendapatkan perangkat audio nirkabel berkualitas tinggi dengan Active Noise Cancellation (ANC) tangguh dan mikrofon jernih tidak harus menguras kantong mahasiswa. Di GADGET HEMATT, setiap produk yang diulas melalui pengujian objektif harian di laboratorium audio kami.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-[#F7F8F6] border border-[#E4E8E5]">
            <ShieldCheck className="w-8 h-8 text-black mb-3" />
            <h4 className="font-display font-black text-base text-[#080808] uppercase mb-1">Objektif & Tanpa Bias</h4>
            <p className="text-xs text-[#68736D]">Pengujian independen dari tim audio tanpa intervensi pesanan atau tawaran bayaran produsen.</p>
          </div>

          <div className="p-6 rounded-3xl bg-[#F7F8F6] border border-[#E4E8E5]">
            <Award className="w-8 h-8 text-black mb-3" />
            <h4 className="font-display font-black text-base text-[#080808] uppercase mb-1">Jaminan Mall Resmi</h4>
            <p className="text-xs text-[#68736D]">Seluruh tautan mengarahkan pembaca langsung ke toko resmi terverifikasi di Tokopedia Official Store.</p>
          </div>

          <div className="p-6 rounded-3xl bg-[#F7F8F6] border border-[#E4E8E5]">
            <HeartHandshake className="w-8 h-8 text-black mb-3" />
            <h4 className="font-display font-black text-base text-[#080808] uppercase mb-1">Ramah Kantong Mahasiswa</h4>
            <p className="text-xs text-[#68736D]">Menyediakan promo khusus dan voucher ter-update untuk menghemat budget pembelian.</p>
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-[#25282A] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <span className="text-[10px] font-black tracking-widest uppercase text-[#B9F43A]">MULAI JELAJAHI</span>
            <h3 className="font-display font-black text-2xl text-white">Temukan TWS Impian Anda Hari Ini</h3>
          </div>
          <button
            onClick={() => navigate('/katalog')}
            className="px-6 py-3 rounded-2xl bg-[#B9F43A] text-black font-black text-xs uppercase tracking-wider hover:bg-[#a3e028] transition-colors shrink-0"
          >
            Buka Katalog TWS →
          </button>
        </div>

      </div>
    </div>
  );
};
