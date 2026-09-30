import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  Sparkles, 
  Menu, 
  X, 
  Disc, 
  ShieldCheck, 
  UserCheck,
  ChevronRight
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentPath, navigate, openAffiliateModal, isAdminLoggedIn } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'HOME', path: '/' },
    { label: 'KATALOG', path: '/katalog' },
    { label: 'REVIEWS', path: '/reviews' },
    { label: 'COMPARISONS', path: '/comparisons' },
    { label: 'BEST TWS', path: '/best-tws' },
    { label: 'BUYING GUIDES', path: '/buying-guides' },
    { label: 'CATEGORIES', path: '/categories' },
  ];

  const handleNav = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const isCurrentActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  return (
    <>
      {/* Top Header - Dark Charcoal (#25282A) background */}
      <header className="fixed top-0 inset-x-0 z-50 bg-[#25282A] text-white shadow-md border-b border-[#373A3D] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* LEFT: BRAND LOGO & SUBTITLE */}
          <div 
            onClick={() => handleNav('/')}
            className="cursor-pointer flex items-center gap-3 group select-none shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-[#B9F43A] flex items-center justify-center text-black font-black text-lg shadow-sm group-hover:scale-105 transition-transform">
              GH
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-lg sm:text-xl tracking-tight leading-none text-white group-hover:text-[#B9F43A] transition-colors uppercase">
                GADGET HEMATT
              </span>
              <span className="text-[9px] sm:text-[10px] font-extrabold tracking-[0.2em] text-[#A0A5A8] uppercase leading-tight mt-0.5">
                STUDENT TECH & AUDIO
              </span>
            </div>
          </div>

          {/* CENTER: DESKTOP NAVIGATION LINKS */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((item) => {
              const active = isCurrentActive(item.path);
              return (
                <button
                  key={item.label}
                  onClick={() => handleNav(item.path)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all ${
                    active
                      ? 'bg-[#B9F43A] text-black font-black shadow-sm'
                      : 'text-[#D0D4D7] hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* RIGHT: SEARCH, AFFILIASI & ADMIN TRIGGER */}
          <div className="flex items-center gap-2.5">
            {/* Search Button */}
            <button
              onClick={() => handleNav('/search')}
              className={`p-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                currentPath === '/search'
                  ? 'bg-white/20 text-[#B9F43A]'
                  : 'text-[#D0D4D7] hover:text-white hover:bg-white/10'
              }`}
              title="Cari TWS & Artikel"
            >
              <Search className="w-4 h-4 text-[#B9F43A]" />
              <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider">SEARCH</span>
            </button>

            {/* Affiliasi Button with Status Indicator */}
            <button
              onClick={() => openAffiliateModal()}
              className="relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B9F43A] hover:bg-[#a3e028] text-black font-extrabold text-xs tracking-wider uppercase shadow-sm transition-all hover:scale-105 active:scale-95 border border-[#B9F43A]"
            >
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>AFFILIASI</span>
              {/* Green status indicator dot */}
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse border border-black/20" />
            </button>

            {/* Admin CMS Access Trigger */}
            <button
              onClick={() => handleNav(isAdminLoggedIn ? '/admin' : '/admin/login')}
              className={`p-2 rounded-full transition-all text-xs font-bold ${
                currentPath.startsWith('/admin')
                  ? 'bg-[#B9F43A] text-black'
                  : 'text-[#A0A5A8] hover:text-white hover:bg-white/10'
              }`}
              title={isAdminLoggedIn ? 'Dashboard Admin CMS' : 'Login Admin CMS'}
            >
              {isAdminLoggedIn ? <ShieldCheck className="w-4 h-4 text-emerald-400" /> : <UserCheck className="w-4 h-4" />}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-white hover:bg-white/10"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE NAV DRAWER */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-0 z-40 bg-[#25282A]/95 backdrop-blur-md pt-20 px-6 pb-8 flex flex-col justify-between animate-fadeIn">
          <div className="flex flex-col gap-2">
            <div className="text-[10px] font-black tracking-[0.2em] text-[#B9F43A] uppercase mb-2">
              PUBLIC NAVIGATION
            </div>
            {navLinks.map((item) => {
              const active = isCurrentActive(item.path);
              return (
                <button
                  key={item.label}
                  onClick={() => handleNav(item.path)}
                  className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm tracking-wider uppercase transition-all flex items-center justify-between ${
                    active
                      ? 'bg-[#B9F43A] text-black font-extrabold'
                      : 'text-[#D0D4D7] hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              );
            })}
          </div>

          <div className="mt-6 pt-6 border-t border-[#373A3D] flex flex-col gap-3">
            <button
              onClick={() => handleNav('/search')}
              className="w-full py-3 rounded-xl bg-white/10 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4 text-[#B9F43A]" />
              <span>Cari TWS & Review</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openAffiliateModal();
              }}
              className="w-full py-3 rounded-xl bg-[#B9F43A] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
            >
              <Sparkles className="w-4 h-4" />
              <span>Akses Kode Voucher Affiliasi</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
