import React, { useState, useEffect } from 'react';
import { NavTab } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { GearArena } from './components/GearArena';
import { CampusReviews } from './components/CampusReviews';
import { BudgetCalculator } from './components/BudgetCalculator';
import { AffiliateModal } from './components/AffiliateModal';
import { GadgetHematLogo } from './components/GadgetHematLogo';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('hero');
  const [isAffiliateOpen, setIsAffiliateOpen] = useState(false);

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#222428] text-white selection:bg-white selection:text-black font-sans antialiased overflow-x-hidden">
      
      {/* 1. Global Navigation Bar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenDeals={() => setIsAffiliateOpen(true)}
      />

      {/* 2. Main SPA View Containers with Smooth Transitions */}
      <main className="w-full">
        {activeTab === 'hero' && (
          <div className="animate-fadeIn">
            <HeroSection 
              onOpenAffiliate={() => setIsAffiliateOpen(true)}
              onNavigate={(tab) => setActiveTab(tab)}
            />
          </div>
        )}

        {activeTab === 'gear' && (
          <div className="animate-fadeIn">
            <GearArena 
              onSelectProduct={() => setIsAffiliateOpen(true)}
            />
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="animate-fadeIn">
            <CampusReviews />
          </div>
        )}

        {activeTab === 'calculator' && (
          <div className="animate-fadeIn">
            <BudgetCalculator />
          </div>
        )}
      </main>

      {/* 3. Global Footer (Clean Minimalist Dark Graphite) */}
      {activeTab !== 'hero' && (
        <footer className="w-full bg-[#1b1d20] border-t border-[#292c31] py-12 px-6 sm:px-12 text-[#8e929a] text-xs">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <GadgetHematLogo size="sm" showText={true} variant="white" />
                <span className="px-2.5 py-0.5 rounded-full bg-[#25282d] border border-[#373a41] text-[#d4d6db] font-bold text-[10px]">
                  Official Affiliate Hub
                </span>
              </div>
              <p className="text-[#787c86] max-w-md text-xs mt-1">
                Portal rekomendasi dan review elektronik terpercaya untuk mahasiswa Indonesia. Link mengarah ke toko resmi bergaransi 100%.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-[#b2b5bd]">
              <button 
                onClick={() => setActiveTab('hero')} 
                className="hover:text-white transition-colors uppercase tracking-wider"
              >
                Space S1
              </button>
              <span>•</span>
              <button 
                onClick={() => setActiveTab('gear')} 
                className="hover:text-white transition-colors uppercase tracking-wider"
              >
                Gear Arena
              </button>
              <span>•</span>
              <button 
                onClick={() => setActiveTab('reviews')} 
                className="hover:text-white transition-colors uppercase tracking-wider"
              >
                Review Kampus
              </button>
              <span>•</span>
              <button 
                onClick={() => setActiveTab('calculator')} 
                className="hover:text-white transition-colors uppercase tracking-wider"
              >
                Budget Smart
              </button>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-[#26282d] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#6d717a] gap-2">
            <p>© 2026 gadgethematt. Hak Cipta Dilindungi. Dibuat untuk Komunitas Mahasiswa.</p>
            <p className="flex items-center gap-1.5">
              <span>Sistem Afiliasi:</span>
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-[#a4a8b1] font-semibold">Toko Resmi Terverifikasi</span>
            </p>
          </div>
        </footer>
      )}

      {/* 4. Global Verified Affiliate Checkout Modal */}
      <AffiliateModal 
        isOpen={isAffiliateOpen} 
        onClose={() => setIsAffiliateOpen(false)} 
      />
    </div>
  );
}
