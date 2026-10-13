import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Zap, 
  VolumeX, 
  BatteryCharging, 
  CheckCircle,
  ExternalLink,
  Star,
  Users,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { OFFICIAL_AFFILIATE_LINKS } from '../data/mockData';
import { LiquidAudioCanvas } from './LiquidAudioCanvas';
import { HeroProductViewer3D } from './HeroProductViewer3D';

export const HeroSection: React.FC = () => {
  const { trackClick } = useApp();
  const [selectedColor, setSelectedColor] = useState<string>('silver');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, rotateX: 0, rotateY: 0 });

  const colorOptions = [
    { id: 'silver', name: 'Metallic Pearl Silver', hex: '#F0F4F8', colorHex: '#F2F5F8', metalHex: '#CAD6E2', tint: '#92B6E5' },
    { id: 'black', name: 'Matte Obsidian', hex: '#1C1D1F', colorHex: '#22252A', metalHex: '#606770', tint: '#A9B5C1' },
    { id: 'sage', name: 'Sage Green', hex: '#8BA190', colorHex: '#8BA190', metalHex: '#A2B8A7', tint: '#8BA190' },
    { id: 'skyblue', name: 'Sky Ice Blue', hex: '#95C6E2', colorHex: '#B8D4EE', metalHex: '#CADEEF', tint: '#92B6E5' },
    { id: 'sand', name: 'Sand Cream', hex: '#E6DFC8', colorHex: '#EAE4D2', metalHex: '#D8CCA8', tint: '#E6DFC8' },
    { id: 'slatenavy', name: 'Slate Navy', hex: '#4A6B82', colorHex: '#3D586E', metalHex: '#6B879E', tint: '#4A6B82' }
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width - 0.5;
    const yRatio = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({
      x: xRatio * 22,
      y: yRatio * 22,
      rotateX: -yRatio * 14,
      rotateY: xRatio * 14
    });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
  };

  const handleGrabDeal = () => {
    trackClick('prod-sage-hero', 'gadgethematt Freedom ANC TWS', 'tokopedia');
    window.open(OFFICIAL_AFFILIATE_LINKS.LINK_1, '_blank', 'noopener,noreferrer');
  };

  const activeColorObj = colorOptions.find(c => c.id === selectedColor) || colorOptions[1];

  return (
    <section 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[96vh] flex flex-col justify-center overflow-hidden pt-24 pb-14 select-none bg-[#050608]"
    >
      {/* 3D WEBGL INTERACTIVE LIQUID METAL CHROME ENVIRONMENT */}
      <LiquidAudioCanvas tintHex={activeColorObj.tint} intensity={1.15} />

      {/* SUBTLE CINEMATIC RADIAL LIGHTING & VIGNETTE */}
      <div 
        className="absolute inset-0 pointer-events-none -z-0 opacity-90"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 65% 50%, rgba(146, 182, 229, 0.08) 0%, rgba(11, 13, 16, 0.4) 60%, #050608 100%)'
        }}
      />

      {/* AMBIENT BACKGROUND GLOW GRID LINES */}
      <div 
        className="absolute inset-0 pointer-events-none -z-0 opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(rgba(242, 243, 241, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(242, 243, 241, 0.4) 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }}
      />

      {/* MAIN HERO CONTENT LAYER (HIGH CONTRAST & ACCESSIBLE) */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-8 my-auto">
        
        {/* LEFT COLUMN: EDITORIAL HEADLINE, SPECS, SWATCHES & CTA */}
        <div className="lg:col-span-5 flex flex-col items-start text-left z-20">
          
          {/* Subtle Acoustic Lab Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12151A]/90 border border-[#CAD6E2]/20 text-[11px] font-black tracking-widest text-[#CAD6E2] uppercase mb-6 backdrop-blur-xl shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-[#92B6E5]" />
            <span>LUXURY AUDIO LAB • 2026 EDITION</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-5xl xl:text-6xl text-[#F8F9FA] tracking-tight leading-[1.08] mb-6 drop-shadow-md">
            Unlock Your<br />
            <span className="metallic-text">Audio Freedom.</span>
          </h1>

          {/* Feature Specs with Minimal Clean Smoked Glass Cards */}
          <div className="grid grid-cols-2 gap-2.5 w-full mb-8">
            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#12151A]/75 border border-[#CAD6E2]/12 backdrop-blur-xl text-xs font-semibold text-[#F8F9FA] hover:border-[#92B6E5]/40 transition-colors shadow-sm">
              <Zap className="w-4 h-4 text-[#92B6E5] shrink-0" />
              <span>Ultra-Low Latency TWS</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#12151A]/75 border border-[#CAD6E2]/12 backdrop-blur-xl text-xs font-semibold text-[#F8F9FA] hover:border-[#92B6E5]/40 transition-colors shadow-sm">
              <VolumeX className="w-4 h-4 text-[#92B6E5] shrink-0" />
              <span>Active Noise Cancel</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#12151A]/75 border border-[#CAD6E2]/12 backdrop-blur-xl text-xs font-semibold text-[#F8F9FA] hover:border-[#92B6E5]/40 transition-colors shadow-sm">
              <BatteryCharging className="w-4 h-4 text-[#92B6E5] shrink-0" />
              <span>35+ Hours Playtime</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#12151A]/75 border border-[#CAD6E2]/12 backdrop-blur-xl text-xs font-semibold text-[#F8F9FA] hover:border-[#92B6E5]/40 transition-colors shadow-sm">
              <CheckCircle className="w-4 h-4 text-[#92B6E5] shrink-0" />
              <span>Compact Design</span>
            </div>
          </div>

          {/* Material Swatch Selector */}
          <div className="flex flex-col gap-2 mb-8 w-full">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#9AA5B1]">
              PILIH FINISHING: <strong className="text-[#F8F9FA]">{activeColorObj.name}</strong>
            </span>
            <div className="flex items-center gap-3">
              {colorOptions.map((c) => {
                const isSelected = selectedColor === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedColor(c.id)}
                    className={`relative w-8 h-8 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#92B6E5] cursor-pointer ${
                      isSelected 
                        ? 'ring-2 ring-offset-2 ring-offset-[#050608] ring-[#92B6E5] scale-110 shadow-[0_0_15px_rgba(146,182,229,0.5)]' 
                        : 'hover:scale-105 opacity-80 hover:opacity-100 border border-white/20'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                    aria-label={c.name}
                  >
                    {isSelected && (
                      <span className="absolute inset-0 m-auto w-2 h-2 rounded-full bg-white shadow-xs" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Primary Action CTA Button */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={handleGrabDeal}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#CAD6E2] via-[#E2E8F0] to-[#92B6E5] hover:from-[#FFFFFF] hover:to-[#A9C7EF] text-[#050608] font-black text-sm tracking-wide shadow-[0_8px_32px_-4px_rgba(202,214,226,0.35)] hover:shadow-[0_12px_40px_-4px_rgba(146,182,229,0.65)] transition-all duration-300 hover:scale-[1.03] active:scale-95 flex items-center gap-2 group cursor-pointer"
            >
              <span>Grab the Best Deal</span>
              <span className="group-hover:translate-x-1.5 transition-transform font-black">→</span>
            </button>

            <div className="flex items-center gap-2 text-xs font-semibold text-[#9AA5B1]">
              <ShieldCheck className="w-4 h-4 text-[#92B6E5]" />
              <span>Garansi Resmi 12 Bln</span>
            </div>
          </div>

        </div>

        {/* CENTER/RIGHT COLUMN: IMMERSIVE 3D FLOATING PRODUCT CENTERPIECE (HEROIZED LUXURY AD SHOWCASE) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative z-20 my-6 sm:my-0">
          
          {/* Overhead Dramatic Studio Spotlight Aura (like Apple AirPods Pro advertisement) */}
          <div className="absolute -top-16 w-72 sm:w-96 h-48 bg-radial from-white/10 via-white/3 to-transparent blur-2xl pointer-events-none -z-0" />

          {/* Concentric Acoustic Soundstage Orbit Waves */}
          <div className="absolute w-[360px] sm:w-[500px] h-[360px] sm:h-[500px] rounded-full border border-white/5 animate-liquid-pulse pointer-events-none" />
          <div className="absolute w-[280px] sm:w-[400px] h-[280px] sm:h-[400px] rounded-full border border-[#CAD6E2]/8 pointer-events-none" />

          {/* Deep Ambient Darkness Halo */}
          <div className="absolute w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-radial from-transparent via-[#050608]/50 to-[#050608]/90 pointer-events-none -z-0" />

          {/* Interactive 3D WebGL Product Viewer Container */}
          <div className="relative w-[340px] h-[360px] sm:w-[480px] sm:h-[480px] lg:w-[520px] lg:h-[520px] flex items-center justify-center">
            <HeroProductViewer3D 
              colorHex={activeColorObj.colorHex || '#F2F5F8'}
              metalHex={activeColorObj.metalHex || '#CAD6E2'}
              tintHex={activeColorObj.tint || '#92B6E5'}
              className="w-full h-full"
            />
          </div>

          {/* Soft Liquid Floating Studio Shadow Beneath Product */}
          <div 
            className="w-64 sm:w-88 h-9 -mt-6 rounded-[100%] bg-radial from-black/90 via-black/50 to-transparent blur-2xl pointer-events-none transition-transform duration-300"
            style={{
              transform: `translate3d(${mousePos.x * 0.4}px, 0, 0) scale(${1 - Math.abs(mousePos.y) * 0.01})`
            }}
          />

        </div>

        {/* RIGHT COLUMN: STATS "45K+ Happy Students" & "4.9 Star Rating" IN SMOKED GLASS PANELS */}
        <div className="lg:col-span-2 flex lg:flex-col items-center lg:items-end justify-center lg:justify-center gap-4 z-20 mt-4 lg:mt-0">
          
          {/* 45K+ Happy Students */}
          <div className="p-4 sm:p-5 rounded-3xl bg-[#12151A]/75 border border-[#CAD6E2]/12 backdrop-blur-2xl text-center lg:text-right w-full max-w-[200px] shadow-xl hover:border-[#92B6E5]/35 transition-colors">
            <div className="font-display font-black text-3xl sm:text-4xl text-[#CAD6E2] tracking-tight leading-none mb-1">
              45K+
            </div>
            <div className="text-[11px] sm:text-xs font-bold text-[#9AA5B1] flex items-center justify-center lg:justify-end gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#92B6E5]" />
              <span>Happy Students</span>
            </div>
          </div>

          {/* 4.9 Star Rating */}
          <div className="p-4 sm:p-5 rounded-3xl bg-[#12151A]/75 border border-[#CAD6E2]/12 backdrop-blur-2xl text-center lg:text-right w-full max-w-[200px] shadow-xl hover:border-[#92B6E5]/35 transition-colors">
            <div className="font-display font-black text-3xl sm:text-4xl text-[#F8F9FA] tracking-tight leading-none mb-1">
              4.9
            </div>
            <div className="text-[11px] sm:text-xs font-bold text-[#9AA5B1] flex items-center justify-center lg:justify-end gap-1.5">
              <Star className="w-3.5 h-3.5 fill-[#92B6E5] text-[#92B6E5]" />
              <span>Star Rating</span>
            </div>
          </div>

        </div>

      </div>

      {/* QUICK TOKOPEDIA OFFICIAL TRUST BADGE BAR */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 w-full mt-10 pt-4 border-t border-[#1A1F26] flex flex-wrap items-center justify-between text-xs text-[#9AA5B1]">
        <span className="font-medium flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#92B6E5] animate-ping" />
          <span className="w-2 h-2 -ml-4 rounded-full bg-[#92B6E5]" />
          Katalog Audio Terverifikasi Tokopedia Official Store 2026
        </span>
        <button 
          onClick={handleGrabDeal}
          className="hover:text-[#92B6E5] text-[#F8F9FA] font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <span>Kunjungi Tokopedia Official</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#92B6E5]" />
        </button>
      </div>

    </section>
  );
};
