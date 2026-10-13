import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate, openAffiliateModal } = useApp();

  return (
    <footer className="w-full bg-[#08090C] text-[#9AA5B1] border-t border-[#1E2329] pt-14 pb-8 px-4 sm:px-6 lg:px-8 text-xs select-none">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-[#1E2329]">
        
        {/* BRAND & DESCRIPTION */}
        <div className="md:col-span-2 flex flex-col items-start gap-3">
          <div 
            onClick={() => navigate('/')}
            className="cursor-pointer flex items-center gap-3 group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#92B6E5] flex items-center justify-center text-[#0B0D10] font-black text-base shadow-sm">
              GH
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-lg tracking-tight text-[#F2F3F1] uppercase">
                GADGET HEMATT
              </span>
              <span className="text-[9px] font-extrabold tracking-[0.2em] text-[#92B6E5] uppercase">
                STUDENT TECH & AUDIO
              </span>
            </div>
          </div>

          <p className="text-[#9AA5B1] max-w-md text-xs leading-relaxed mt-1">
            Portal media ulasan, panduan belanja, komparasi, dan rekomendasi True Wireless Stereo (TWS) terpercaya untuk mahasiswa dan penikmat audio di Indonesia.
          </p>

          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1E2329] text-[#F2F3F1] border border-[#A9B5C1]/15 font-bold text-[10px]">
              <ShieldCheck className="w-3 h-3 text-[#92B6E5]" />
              100% Verified Review
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1E2329] text-[#F2F3F1] border border-[#A9B5C1]/15 font-bold text-[10px]">
              Tokopedia Official Store Partner
            </span>
          </div>
        </div>

        {/* NAVIGATION */}
        <div className="flex flex-col gap-2">
          <span className="text-[#F2F3F1] font-black text-xs tracking-widest uppercase mb-1">
            NAVIGASI UTAMA
          </span>
          <button onClick={() => navigate('/')} className="text-left hover:text-[#92B6E5] transition-colors py-1">
            Home
          </button>
          <button onClick={() => navigate('/blog')} className="text-left hover:text-[#92B6E5] transition-colors py-1 flex items-center gap-2">
            <span>Blog & Artikel</span>
            <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-[#92B6E5] text-[#0B0D10]">BARU</span>
          </button>
          <button onClick={() => navigate('/katalog')} className="text-left hover:text-[#92B6E5] transition-colors py-1">
            Katalog Gadget
          </button>
          <button onClick={() => navigate('/comparisons')} className="text-left hover:text-[#92B6E5] transition-colors py-1">
            Comparisons (Komparasi)
          </button>
          <button onClick={() => navigate('/best-tws')} className="text-left hover:text-[#92B6E5] transition-colors py-1">
            Best TWS Recommendations
          </button>
          <button onClick={() => navigate('/buying-guides')} className="text-left hover:text-[#92B6E5] transition-colors py-1">
            Buying Guides (Panduan)
          </button>
          <button onClick={() => navigate('/categories')} className="text-left hover:text-[#92B6E5] transition-colors py-1">
            Categories (Kategori)
          </button>
        </div>

        {/* INFORMASI & LEGAL */}
        <div className="flex flex-col gap-2">
          <span className="text-[#F2F3F1] font-black text-xs tracking-widest uppercase mb-1">
            INFORMASI & LEGAL
          </span>
          <button onClick={() => navigate('/about')} className="text-left hover:text-[#92B6E5] transition-colors py-1">
            Tentang GADGET HEMATT
          </button>
          <button onClick={() => navigate('/contact')} className="text-left hover:text-[#92B6E5] transition-colors py-1">
            Hubungi Kami & Karir
          </button>
          <button onClick={() => openAffiliateModal()} className="text-left hover:text-[#92B6E5] transition-colors py-1 flex items-center gap-1">
            <span>Program Affiliasi</span>
            <ExternalLink className="w-3 h-3 text-[#92B6E5]" />
          </button>
          <button onClick={() => navigate('/affiliate')} className="text-left hover:text-[#92B6E5] transition-colors py-1">
            Affiliate Disclosure
          </button>
        </div>
      </div>

      {/* AFFILIATE DISCLOSURE & COPYRIGHT */}
      <div className="max-w-7xl mx-auto pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#6B7785]">
        <p className="max-w-3xl leading-relaxed text-center md:text-left">
          <strong className="text-[#F2F3F1] font-semibold">Disclosure:</strong> Some links on GADGET HEMATT are affiliate links. We may earn a commission if you purchase through our links, at no additional cost to you.
        </p>

        <p className="shrink-0 text-center md:text-right font-medium">
          © 2026 GADGET HEMATT. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
