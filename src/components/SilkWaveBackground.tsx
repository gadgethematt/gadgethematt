import React from 'react';
import heroPosterImg from '../assets/images/tws_hero_poster_1790083618042.jpg';

interface SilkWaveBackgroundProps {
  isBassActive?: boolean;
}

export const SilkWaveBackground: React.FC<SilkWaveBackgroundProps> = ({ isBassActive }) => {
  return (
    <div id="silk-wave-container" className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      {/* Studio lighting radial gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-[#fcfdfd] via-[#f3f5f8] to-[#e4e7ec] transition-colors duration-700"
      />

      {/* Subtle Studio Keylight Center Spot */}
      <div 
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[1000px] h-[75vh] rounded-full blur-3xl transition-opacity duration-700 ${
          isBassActive ? 'opacity-90 scale-105 bg-gradient-to-tr from-sky-100/60 via-white/80 to-indigo-100/50' : 'opacity-70 bg-gradient-to-tr from-white via-[#ffffff] to-[#e9ecf1]'
        }`}
      />

      {/* Photorealistic Silk Wave Layer (from generated poster shot) blended seamlessly at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-[42vh] md:h-[48vh] opacity-60 mix-blend-multiply overflow-hidden pointer-events-none">
        <img
          src={heroPosterImg}
          alt="Silk wave texture"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-bottom filter contrast-[1.05] brightness-[1.02] animate-silk-drift"
        />
        {/* Soft fade-out gradient to integrate silk into white background */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#f3f5f8]/40 to-[#f3f5f8]" />
      </div>

      {/* Fluid Vector Silk Wave Ribbon in Foreground for Crisp Edge Definition */}
      <svg 
        className="absolute bottom-0 left-0 w-full h-[32vh] min-h-[160px] text-white/85" 
        viewBox="0 0 1440 320" 
        fill="none" 
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="silkGlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="45%" stopColor="#f0f3f6" stopOpacity="0.95" />
            <stop offset="75%" stopColor="#e5e9ef" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
          </linearGradient>
          <filter id="silkShadow" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="-8" stdDeviation="16" floodColor="#9aa0a6" floodOpacity="0.12" />
          </filter>
        </defs>
        
        {/* Secondary undulating wave */}
        <path
          d="M0,160 C320,240 420,80 720,180 C1020,280 1200,120 1440,210 L1440,320 L0,320 Z"
          fill="url(#silkGlowGrad)"
          opacity="0.65"
          filter="url(#silkShadow)"
          className="transition-all duration-1000"
        />

        {/* Primary flowing silk ribbon crest */}
        <path
          d="M0,230 C280,140 500,290 840,190 C1140,110 1320,240 1440,190 L1440,320 L0,320 Z"
          fill="#ffffff"
          opacity="0.88"
          filter="url(#silkShadow)"
        />
      </svg>

      {/* Subtle Studio Floor Reflection Gradient */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/70 to-transparent" />
    </div>
  );
};
