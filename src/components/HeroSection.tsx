import React, { useState } from 'react';
import { TransparentTwsEarbuds } from './TransparentTwsEarbuds';
import { ProductColor, NavTab } from '../types';
import { audioService } from '../utils/audio';
import { ShoppingBag, ChevronRight, Volume2, ArrowDown } from 'lucide-react';
import { GadgetHematLogo } from './GadgetHematLogo';

interface HeroSectionProps {
  onOpenAffiliate: () => void;
  onNavigate: (tab: NavTab) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenAffiliate, onNavigate }) => {
  const [productColor, setProductColor] = useState<ProductColor>('pearl');
  const [isBassPlaying, setIsBassPlaying] = useState(false);

  const handleBassDemo = () => {
    audioService.playBassSample(() => {
      setIsBassPlaying(false);
    });
    setIsBassPlaying(true);
  };

  return (
    <section className="relative w-full h-screen min-h-[660px] max-h-screen overflow-hidden bg-gradient-to-b from-white via-[#f6f7f9] to-[#e8eaee] text-neutral-900 flex flex-col justify-between pt-16 pb-16 sm:pb-6 select-none">
      
      {/* 1. BACKGROUND STUDIO AMBIENCE & SILK FLOWING RIBBON (Sesuai Referensi HAVIT Space S1) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-20">
        
        {/* Giant Watermark Typography behind product: "SPACE S1" (ATMOS / HAVIT aesthetic) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none opacity-[0.038] tracking-widest font-black font-display text-[16vw] sm:text-[18vw] leading-none text-black">
          SPACE S1
        </div>

        {/* Soft Pearlescent Studio Light Bloom in Center */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-b from-white/90 via-slate-100/50 to-transparent rounded-full blur-[100px]" />

        {/* Flowing White/Silver Silk Wave Ribbon along bottom (Identik dengan foto referensi HAVIT Space S1) */}
        <div className="absolute inset-x-0 bottom-0 h-52 sm:h-72 pointer-events-none overflow-hidden opacity-85">
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 320"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="silkWaveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="35%" stopColor="#f1f5f9" stopOpacity="0.8" />
                <stop offset="65%" stopColor="#e2e8f0" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.5" />
              </linearGradient>
              <linearGradient id="silkWaveGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
                <stop offset="50%" stopColor="#f8fafc" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {/* Back silk layer */}
            <path
              d="M0,192 C280,120 480,260 840,160 C1140,80 1320,220 1440,180 L1440,320 L0,320 Z"
              fill="url(#silkWaveGrad2)"
            />

            {/* Front glossy silk ribbon */}
            <path
              d="M0,140 C320,240 560,90 920,210 C1200,300 1360,150 1440,190 L1440,320 L0,320 Z"
              fill="url(#silkWaveGrad1)"
            />
            {/* Subtle silver edge highlight on silk */}
            <path
              d="M0,140 C320,240 560,90 920,210 C1200,300 1360,150 1440,190"
              stroke="#ffffff"
              strokeWidth="2"
              strokeOpacity="0.9"
            />
          </svg>
        </div>
      </div>

      {/* 2. HERO MAIN CONTENT STAGE */}
      <div className="relative z-20 w-full flex-1 flex items-center justify-center px-4 sm:px-8 max-w-7xl mx-auto">
        
        {/* Left & Right Layout:
            Kiri: Nama Web "gadgethematt" dan Logo
            Kanan: "Mute the Noise, Own the Show"
        */}
        <div className="absolute inset-0 flex items-center justify-between pointer-events-none px-4 sm:px-8 md:px-12">
          
          {/* SEBELAH KIRI: NAMA WEB GADGETHEMATT & LOGO */}
          <div className="flex flex-col items-start z-10 max-w-[48%] sm:max-w-md pointer-events-auto">
            
            {/* Logo GH Emblem */}
            <div className="mb-4">
              <GadgetHematLogo size="lg" showText={false} variant="dark" />
            </div>

            {/* Nama Web: gadgethematt */}
            <h1 
              id="hero-brand-name"
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-black tracking-tight leading-[0.95] font-display uppercase"
            >
              gadget<br />hematt
            </h1>

            {/* Sub-label Student Tech & Audio */}
            <div className="mt-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
              <span className="text-[11px] sm:text-xs font-black tracking-[0.2em] text-neutral-600 uppercase">
                STUDENT TECH & AUDIO
              </span>
            </div>
          </div>

          {/* SEBELAH KANAN: MUTE THE NOISE, OWN THE SHOW */}
          <div className="flex flex-col items-end text-right z-10 max-w-[48%] sm:max-w-md pointer-events-auto">
            
            {/* Tagline Headline: Mute the Noise. */}
            <h2 
              id="hero-poster-tagline"
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-black tracking-tighter leading-[0.9] font-display"
            >
              Mute the<br />Noise.
            </h2>
            
            {/* Sub-tagline: Own the Show. */}
            <p className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-neutral-800 tracking-tight mt-2 sm:mt-3 font-display">
              Own the Show.
            </p>

            <div className="mt-3 flex items-center justify-end gap-2">
              <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-white/90 border border-neutral-300 text-neutral-700 shadow-sm backdrop-blur-md">
                SPACE S1 • WIRELESS
              </span>
            </div>
          </div>
        </div>

        {/* Center Floating TWS (White, Silver & Black Studio Finish) */}
        <TransparentTwsEarbuds 
          color={productColor}
          isBassActive={isBassPlaying}
          onAudioTest={handleBassDemo}
        />
      </div>

      {/* 3. BOTTOM CONTROL BAR: COLORWAY SWITCHER & CRISP BLACK CTA */}
      <div className="relative z-30 w-full px-6 sm:px-10 lg:px-14 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left Bottom: Colorway & 40Hz Audio Test */}
        <div className="flex items-center gap-3">
          
          {/* Color Selector (White, Titanium Silver, Jet Black) */}
          <div className="flex items-center gap-2 p-1.5 rounded-full bg-white/95 border border-neutral-300 shadow-sm backdrop-blur-md">
            <button
              onClick={() => setProductColor('pearl')}
              title="Pearl White Matte"
              className={`w-6 h-6 rounded-full bg-white border border-neutral-300 shadow-inner transition-transform ${
                productColor === 'pearl' ? 'ring-2 ring-black scale-110' : 'hover:scale-105'
              }`}
            />
            <button
              onClick={() => setProductColor('titanium')}
              title="Brushed Silver / Titanium"
              className={`w-6 h-6 rounded-full bg-neutral-400 border border-neutral-500 shadow-inner transition-transform ${
                productColor === 'titanium' ? 'ring-2 ring-black scale-110' : 'hover:scale-105'
              }`}
            />
            <button
              onClick={() => setProductColor('onyx')}
              title="Jet Black Onyx"
              className={`w-6 h-6 rounded-full bg-black border border-neutral-800 shadow-inner transition-transform ${
                productColor === 'onyx' ? 'ring-2 ring-black scale-110' : 'hover:scale-105'
              }`}
            />
          </div>

          {/* Bass Test Button */}
          <button
            id="hero-bass-test-btn"
            onClick={handleBassDemo}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
              isBassPlaying
                ? 'bg-black text-white shadow-lg animate-pulse'
                : 'bg-white hover:bg-neutral-100 text-neutral-900 border border-neutral-300 shadow-sm'
            }`}
          >
            <Volume2 className={`w-3.5 h-3.5 ${isBassPlaying ? 'text-white' : 'text-neutral-700'}`} />
            <span>{isBassPlaying ? 'Audio 40Hz Berbunyi...' : 'Uji Audio Pure Bass'}</span>
          </button>
        </div>

        {/* Center / Right: Stark Black Luxury Pill CTA Button */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            id="hero-affiliate-cta"
            onClick={onOpenAffiliate}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 sm:px-9 sm:py-4 rounded-full bg-black hover:bg-neutral-800 text-white font-extrabold text-sm sm:text-base tracking-wide transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 shadow-2xl border border-neutral-800"
          >
            <ShoppingBag className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" />
            <span className="font-display">Cek Harga Terbaik di Shopee / Tokopedia</span>
            <ChevronRight className="w-4 h-4 text-neutral-300 group-hover:translate-x-1.5 transition-transform" />
          </button>

          {/* Quick jump to Gear Arena */}
          <button
            onClick={() => onNavigate('gear')}
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-neutral-600 hover:text-black transition-colors"
          >
            <span>Katalog Lengkap</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce text-neutral-900" />
          </button>
        </div>
      </div>
    </section>
  );
};
