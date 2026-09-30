import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate, openAffiliateModal } = useApp();

  return (
    <footer className="w-full bg-[#25282A] text-[#A0A5A8] border-t border-[#373A3D] pt-14 pb-8 px-4 sm:px-6 lg:px-8 text-xs select-none">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-[#373A3D]">
        
        {/* BRAND & DESCRIPTION */}
        <div className="md:col-span-2 flex flex-col items-start gap-3">
          <div 
            onClick={() => navigate('/')}
            className="cursor-pointer flex items-center gap-3 group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#B9F43A] flex items-center justify-center text-black font-black text-base shadow-sm">
              GH
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-lg tracking-tight text-white uppercase">
                GADGET HEMATT
              </span>
              <span className="text-[9px] font-extrabold tracking-[0.2em] text-[#B9F43A] uppercase">
                STUDENT TECH & AUDIO
              </span>
            </div>
          </div>

          <p className="text-[#C0C5C8] max-w-md text-xs leading-relaxed mt-1">
            Portal media ulasan, panduan belanja, komparasi, dan rekomendasi True Wireless Stereo (TWS) terpercaya untuk mahasiswa dan penikmat audio di Indonesia.
          </p>

          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-white font-bold text-[10px]">
              <ShieldCheck className="w-3 h-3 text-[#B9F43A]" />
              100% Verified Review
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-white font-bold text-[10px]">
              Shopee & Tokopedia Official Partner
            </span>
          </div>
        </div>

        {/* NAVIGATION */}
        <div className="flex flex-col gap-2">
          <span className="text-white font-black text-xs tracking-widest uppercase mb-1">
            NAVIGASI UTAMA
          </span>
          <button onClick={() => navigate('/')} className="text-left hover:text-[#B9F43A] transition-colors py-1">
            Home
          </button>
          <button onClick={() => navigate('/katalog')} className="text-left hover:text-[#B9F43A] transition-colors py-1">
            Katalog TWS
          </button>
          <button onClick={() => navigate('/reviews')} className="text-left hover:text-[#B9F43A] transition-colors py-1">
            Reviews & Ulasan
          </button>
          <button onClick={() => navigate('/comparisons')} className="text-left hover:text-[#B9F43A] transition-colors py-1">
            Comparisons (Komparasi)
          </button>
          <button onClick={() => navigate('/best-tws')} className="text-left hover:text-[#B9F43A] transition-colors py-1">
            Best TWS Recommendations
          </button>
          <button onClick={() => navigate('/buying-guides')} className="text-left hover:text-[#B9F43A] transition-colors py-1">
            Buying Guides (Panduan)
          </button>
          <button onClick={() => navigate('/categories')} className="text-left hover:text-[#B9F43A] transition-colors py-1">
            Categories (Kategori)
          </button>
        </div>

        {/* INFORMASI & LEGAL */}
        <div className="flex flex-col gap-2">
          <span className="text-white font-black text-xs tracking-widest uppercase mb-1">
            INFORMASI & LEGAL
          </span>
          <button onClick={() => navigate('/about')} className="text-left hover:text-[#B9F43A] transition-colors py-1">
            Tentang GADGET HEMATT
          </button>
          <button onClick={() => navigate('/contact')} className="text-left hover:text-[#B9F43A] transition-colors py-1">
            Hubungi Kami & Karir
          </button>
          <button onClick={() => openAffiliateModal()} className="text-left hover:text-[#B9F43A] transition-colors py-1 flex items-center gap-1">
            <span>Program Affiliasi</span>
            <ExternalLink className="w-3 h-3 text-[#B9F43A]" />
          </button>
          <button onClick={() => navigate('/affiliate')} className="text-left hover:text-[#B9F43A] transition-colors py-1">
            Affiliate Disclosure
          </button>
        </div>
      </div>

      {/* AFFILIATE DISCLOSURE & COPYRIGHT */}
      <div className="max-w-7xl mx-auto pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#8A8F92]">
        <p className="max-w-3xl leading-relaxed text-center md:text-left">
          <strong className="text-white font-semibold">Disclosure:</strong> Some links on GADGET HEMATT are affiliate links. We may earn a commission if you purchase through our links, at no additional cost to you.
        </p>

        <p className="shrink-0 text-center md:text-right font-medium">
          © 2026 GADGET HEMATT. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
