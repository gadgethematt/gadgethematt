import React from 'react';
import { NavTab } from '../types';
import { GadgetHematLogo } from './GadgetHematLogo';
import { Gamepad2, BookOpen, Calculator, Headphones, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  onOpenDeals: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenDeals }) => {
  const navItems: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'hero', label: 'SPACE S1', icon: <Headphones className="w-3.5 h-3.5" /> },
    { id: 'gear', label: 'GEAR ARENA', icon: <Gamepad2 className="w-3.5 h-3.5" /> },
    { id: 'reviews', label: 'REVIEW KAMPUS', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: 'calculator', label: 'BUDGET SMART', icon: <Calculator className="w-3.5 h-3.5" /> },
  ];

  return (
    <>
      {/* Top Header - Dark Matte Graphite (Matching download (6).jpg) */}
      <header className="fixed top-0 inset-x-0 z-40 px-4 sm:px-10 py-3.5 bg-[#222428]/85 backdrop-blur-xl border-b border-[#2d3036] transition-all">
        <div className="max-w-[1550px] mx-auto flex items-center justify-between gap-4">
          
          {/* Logo & Student Tech Brand */}
          <div 
            onClick={() => setActiveTab('hero')}
            className="cursor-pointer group select-none flex items-center gap-2"
          >
            <GadgetHematLogo size="sm" showText={true} variant="white" />
          </div>

          {/* Desktop Navigation Links (Clean Uppercase Spaced Links like download (6).jpg) */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-200 ${
                    isActive
                      ? 'text-white bg-[#2f333a] border border-[#40454f] shadow-sm'
                      : 'text-[#9ca0a8] hover:text-white hover:bg-[#2a2d33]'
                  }`}
                >
                  <span className={isActive ? 'text-white' : 'text-[#7d828c]'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action: Quick Affiliate Modal Trigger */}
          <div className="flex items-center gap-2.5">
            <button
              id="header-voucher-btn"
              onClick={onOpenDeals}
              className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2e3239] hover:bg-[#383c45] text-[#e3e5ea] hover:text-white font-bold text-xs tracking-wider uppercase shadow-sm transition-all hover:scale-105 active:scale-95 border border-[#3f434c]"
            >
              <Sparkles className="w-3.5 h-3.5 text-neutral-300" />
              <span>AFILIASI</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Fixed Navigation Dock */}
      <nav className="md:hidden fixed bottom-3 inset-x-3 z-40 bg-[#222428]/95 backdrop-blur-xl border border-[#2f3238] rounded-2xl p-1.5 shadow-[0_10px_25px_rgba(0,0,0,0.4)] flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all ${
                isActive
                  ? 'text-white bg-[#2e3238] font-bold border border-[#3e424a] scale-105'
                  : 'text-[#8e929a] hover:text-white'
              }`}
            >
              <div className="text-base mb-0.5">{item.icon}</div>
              <span className="text-[9px] tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
