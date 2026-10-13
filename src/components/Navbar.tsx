import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  ChevronRight, 
  Search,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentPath, navigate, openAffiliateModal, isAdminLoggedIn } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Blog', path: '/blog' },
    { label: 'Budget Gear', path: '/katalog' },
    { label: 'Affiliate', path: '/affiliate' }
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
      {/* Top Header - Smoked Glass Minimalist Liquid Audio Lab */}
      <header className="fixed top-0 inset-x-0 z-50 bg-[#0B0D10]/80 backdrop-blur-xl border-b border-[#A9B5C1]/15 transition-all">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 h-16 flex items-center justify-between gap-4">
          
          {/* LEFT: BRAND "gadgethematt" (clean lowercase sans-serif matching screenshot) */}
          <div 
            onClick={() => handleNav('/')}
            className="cursor-pointer flex items-center select-none shrink-0"
          >
            <span className="font-display font-medium text-xl sm:text-2xl text-[#F2F3F1] tracking-tight hover:text-[#92B6E5] transition-colors">
              gadgethematt
            </span>
          </div>

          {/* CENTER: DESKTOP NAVIGATION (Home, Blog, Budget Gear, Affiliate) */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => {
              const active = isCurrentActive(item.path);
              return (
                <button
                  key={item.label}
                  onClick={() => handleNav(item.path)}
                  className={`text-sm font-medium transition-all ${
                    active
                      ? 'text-[#92B6E5] font-bold drop-shadow-[0_0_8px_rgba(146,182,229,0.3)]'
                      : 'text-[#9AA5B1] hover:text-[#F2F3F1]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* RIGHT: CART & USER ACTION ICONS */}
          <div className="flex items-center gap-4">
            {/* Search Trigger */}
            <button
              onClick={() => handleNav('/search')}
              className="p-2 text-[#9AA5B1] hover:text-[#F2F3F1] hover:bg-white/5 rounded-full transition-colors hidden sm:flex"
              title="Cari TWS & Review"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Shopping Cart Icon (Triggers Tokopedia Voucher / Deals Popup) */}
            <button
              onClick={() => openAffiliateModal()}
              className="relative p-2 text-[#F2F3F1] hover:text-[#92B6E5] hover:bg-white/5 rounded-full transition-colors"
              title="Kode Voucher & Promo Tokopedia"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#92B6E5] animate-pulse" />
            </button>

            {/* User Icon (Triggers Admin CMS Login / Dashboard) */}
            <button
              onClick={() => handleNav(isAdminLoggedIn ? '/admin' : '/admin/login')}
              className={`p-2 rounded-full transition-colors ${
                isAdminLoggedIn 
                  ? 'bg-[#92B6E5] text-[#0B0D10] shadow-xs' 
                  : 'text-[#F2F3F1] hover:text-[#92B6E5] hover:bg-white/5 border border-[#A9B5C1]/15'
              }`}
              title={isAdminLoggedIn ? 'Dashboard Admin CMS' : 'Login Admin CMS'}
            >
              <User className="w-5 h-5" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#F2F3F1] hover:bg-white/5 rounded-xl"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-[#0B0D10]/95 backdrop-blur-2xl pt-20 px-6 pb-8 flex flex-col justify-between animate-fadeIn border-b border-[#A9B5C1]/15">
          <div className="flex flex-col gap-3">
            <div className="text-[10px] font-black tracking-widest text-[#92B6E5] uppercase mb-1">
              NAVIGASI GADGET HEMATT
            </div>
            {navLinks.map((item) => {
              const active = isCurrentActive(item.path);
              return (
                <button
                  key={item.label}
                  onClick={() => handleNav(item.path)}
                  className={`w-full text-left px-4 py-3 rounded-2xl font-bold text-base transition-all flex items-center justify-between ${
                    active
                      ? 'bg-[#1E2329] text-[#92B6E5] border border-[#92B6E5]/30'
                      : 'text-[#F2F3F1] hover:bg-[#1E2329]/60'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-[#9AA5B1]" />
                </button>
              );
            })}
            
            {/* Quick Extra Navigation */}
            <button
              onClick={() => handleNav('/katalog')}
              className="w-full text-left px-4 py-3 rounded-2xl font-medium text-sm text-[#9AA5B1] hover:bg-[#1E2329]/60 flex items-center justify-between"
            >
              <span>Katalog Semua TWS</span>
              <ChevronRight className="w-4 h-4 text-[#9AA5B1]" />
            </button>
            <button
              onClick={() => handleNav('/comparisons')}
              className="w-full text-left px-4 py-3 rounded-2xl font-medium text-sm text-[#9AA5B1] hover:bg-[#1E2329]/60 flex items-center justify-between"
            >
              <span>Fitur Komparasi TWS</span>
              <ChevronRight className="w-4 h-4 text-[#9AA5B1]" />
            </button>
          </div>

          <div className="pt-6 border-t border-[#1E2329] flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openAffiliateModal();
              }}
              className="w-full py-3.5 rounded-full bg-[#92B6E5] text-[#0B0D10] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:bg-[#A9B5C1] transition-colors"
            >
              <Sparkles className="w-4 h-4 text-[#0B0D10]" />
              <span>Klaim Voucher Tokopedia</span>
            </button>

            <button
              onClick={() => handleNav(isAdminLoggedIn ? '/admin' : '/admin/login')}
              className="w-full py-3 rounded-full bg-[#1E2329] text-[#F2F3F1] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-[#A9B5C1]/20 hover:border-[#92B6E5]/40"
            >
              <ShieldCheck className="w-4 h-4 text-[#92B6E5]" />
              <span>{isAdminLoggedIn ? 'Buka Admin CMS' : 'Portal Login Admin'}</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
