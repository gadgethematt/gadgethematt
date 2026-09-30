import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Zap, 
  VolumeX, 
  BatteryCharging, 
  CheckCircle,
  ExternalLink,
  Star,
  Users
} from 'lucide-react';
import sageTwsImg from '../assets/images/gadgethematt_sage_tws_1790732324440.jpg';
import { OFFICIAL_AFFILIATE_LINKS } from '../data/mockData';

export const HeroSection: React.FC = () => {
  const { trackClick } = useApp();
  const [selectedColor, setSelectedColor] = useState<string>('sage');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const colorOptions = [
    { id: 'black', name: 'Matte Obsidian', hex: '#1C1D1F', filter: 'brightness(0.7) contrast(1.15) grayscale(0.5)' },
    { id: 'sage', name: 'Sage Green', hex: '#8BA190', filter: 'none' },
    { id: 'skyblue', name: 'Sky Ice Blue', hex: '#95C6E2', filter: 'hue-rotate(60deg) saturate(1.1)' },
    { id: 'sand', name: 'Sand Cream', hex: '#E6DFC8', filter: 'sepia(0.4) brightness(1.08)' },
    { id: 'slatenavy', name: 'Slate Navy', hex: '#4A6B82', filter: 'hue-rotate(140deg) brightness(0.85)' }
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
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
      className="relative w-full min-h-[92vh] flex flex-col justify-center overflow-hidden pt-20 pb-16 select-none"
      style={{
        background: 'radial-gradient(ellipse at 50% 45%, #E9EFF2 0%, #DDE6E8 45%, #CFD9DC 100%)'
      }}
    >
      {/* GIANT SUBTLE WATERMARK "GH" IN BACKGROUND */}
      <div 
        className="absolute inset-0 flex items-center justify-between px-4 sm:px-16 pointer-events-none -z-0 opacity-[0.22] font-display font-black leading-none select-none text-[#97AAB1]"
        aria-hidden="true"
      >
        <span className="text-[28vw] tracking-tighter -ml-[4vw]">G</span>
        <span className="text-[28vw] tracking-tighter -mr-[4vw]">H</span>
      </div>

      {/* SOFT RADIAL GLOW BEHIND HERO PRODUCT */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-white/60 rounded-full blur-3xl pointer-events-none -z-0" />

      {/* MAIN HERO CONTENT CONTAINER */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-4 my-auto">
        
        {/* LEFT COLUMN: HEADLINE, BULLET SPECS, COLOR SWATCHES & CTA BUTTON */}
        <div className="lg:col-span-4 flex flex-col items-start text-left z-20">
          
          {/* Main Headline */}
          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-5xl xl:text-6xl text-[#1E2528] tracking-tight leading-[1.08] mb-6">
            Unlock Your<br />
            Audio Freedom.
          </h1>

          {/* Feature Specs with Minimal Clean Icons */}
          <div className="space-y-3 mb-7 text-sm font-semibold text-[#4F5D63]">
            <div className="flex items-center gap-3">
              <Zap className="w-4 h-4 text-[#4B7085] shrink-0" />
              <span>Ultra-Low Latency TWS</span>
            </div>
            <div className="flex items-center gap-3">
              <VolumeX className="w-4 h-4 text-[#4B7085] shrink-0" />
              <span>Active Noise Cancellation</span>
            </div>
            <div className="flex items-center gap-3">
              <BatteryCharging className="w-4 h-4 text-[#4B7085] shrink-0" />
              <span>35+ Hours Playtime</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-4 h-4 text-[#4B7085] shrink-0" />
              <span>Compact Design</span>
            </div>
          </div>

          {/* Color Selector Circles */}
          <div className="flex items-center gap-3 mb-8">
            {colorOptions.map((c) => {
              const isSelected = selectedColor === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedColor(c.id)}
                  className={`w-6 h-6 rounded-full transition-all duration-200 ${
                    isSelected ? 'ring-2 ring-offset-2 ring-[#2563EB] scale-110 shadow-xs' : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                  aria-label={c.name}
                />
              );
            })}
          </div>

          {/* Action CTA Button - Bright Modern Blue Pill Button (No price text, as requested) */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleGrabDeal}
              className="px-7 py-3.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-black text-sm tracking-wide shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.03] active:scale-95 flex items-center gap-2 group cursor-pointer"
            >
              <span>Grab the Best Deal</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>

        </div>

        {/* CENTER COLUMN: LARGE FLOATING SAGE GREEN TWS IN OPEN CASE */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative z-20 my-4 sm:my-0">
          
          <div 
            className="relative w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] lg:w-[460px] lg:h-[460px] flex items-center justify-center transition-transform duration-300 ease-out"
            style={{
              transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`
            }}
          >
            {/* The floating TWS earbuds image */}
            <img
              src={sageTwsImg}
              alt="gadgethematt Freedom ANC True Wireless Earbuds"
              className="w-full h-full object-contain filter drop-shadow-[0_25px_35px_rgba(30,45,55,0.24)] animate-float-smooth transition-all duration-500"
              style={{
                filter: activeColorObj.filter !== 'none' 
                  ? `${activeColorObj.filter} drop-shadow(0 25px 35px rgba(30,45,55,0.24))` 
                  : 'drop-shadow(0 25px 35px rgba(30,45,55,0.24))'
              }}
            />
          </div>

          {/* Soft Diffuse Shadow Beneath Product */}
          <div 
            className="w-56 sm:w-80 h-7 -mt-4 rounded-[100%] bg-radial from-slate-900/35 via-slate-800/15 to-transparent blur-lg pointer-events-none transition-transform duration-300"
            style={{
              transform: `translate3d(${mousePos.x * 0.4}px, 0, 0) scale(${1 - Math.abs(mousePos.y) * 0.01})`
            }}
          />

        </div>

        {/* RIGHT COLUMN: STATS "45K+ Happy Students" & "4.9 Star Rating" */}
        <div className="lg:col-span-3 flex lg:flex-col items-center lg:items-end justify-center lg:justify-end gap-10 lg:gap-8 z-20 mt-4 lg:mt-32">
          
          {/* 45K+ Happy Students */}
          <div className="text-center lg:text-right">
            <div className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-[#2563EB] tracking-tight leading-none mb-1">
              45K+
            </div>
            <div className="text-xs sm:text-sm font-bold text-[#4F5D63] flex items-center justify-center lg:justify-end gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Happy Students</span>
            </div>
          </div>

          {/* 4.9 Star Rating */}
          <div className="text-center lg:text-right">
            <div className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-[#2563EB] tracking-tight leading-none mb-1">
              4.9
            </div>
            <div className="text-xs sm:text-sm font-bold text-[#4F5D63] flex items-center justify-center lg:justify-end gap-1.5">
              <Star className="w-3.5 h-3.5 fill-[#2563EB] text-[#2563EB]" />
              <span>Star Rating</span>
            </div>
          </div>

        </div>

      </div>

      {/* QUICK TOKOPEDIA OFFICIAL TRUST BADGE */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 w-full mt-10 pt-4 border-t border-[#CBD7DB]/60 flex flex-wrap items-center justify-between text-xs text-[#52646C]">
        <span className="font-semibold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Katalog Audio Terverifikasi Tokopedia Official Store 2026
        </span>
        <button 
          onClick={handleGrabDeal}
          className="hover:text-[#2563EB] font-bold flex items-center gap-1 transition-colors"
        >
          <span>Kunjungi Tokopedia Official</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

    </section>
  );
};
