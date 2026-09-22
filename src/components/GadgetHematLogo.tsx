import React from 'react';

interface GadgetHematLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  variant?: 'light' | 'dark' | 'white'; // 'white' = crisp pure white/silver for dark graphite backgrounds
  textOrientation?: 'horizontal' | 'vertical';
}

export const GadgetHematLogo: React.FC<GadgetHematLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  variant = 'white',
  textOrientation = 'horizontal',
}) => {
  const iconDimensions = {
    sm: { w: 46, h: 28, text: 'text-sm' },
    md: { w: 60, h: 36, text: 'text-base' },
    lg: { w: 84, h: 52, text: 'text-xl' },
    xl: { w: 120, h: 74, text: 'text-3xl' },
  }[size];

  const isWhite = variant === 'white' || variant === 'light';
  const mainFill = isWhite ? '#ffffff' : '#111111';
  const circuitTraceColor = isWhite ? '#202225' : '#ffffff'; // contrasting trace inside G
  const circuitStroke = isWhite ? '#9ca3af' : '#4b5563';
  const starBodyFill = isWhite ? '#ffffff' : '#171717';
  const starGlintFill = '#fbbf24'; // subtle warm champagne glint like reference photo
  const brandTextColor = isWhite ? 'text-white' : 'text-neutral-900';

  return (
    <div className={`inline-flex ${textOrientation === 'vertical' ? 'flex-col items-start gap-2' : 'items-center gap-3'} select-none ${className}`}>
      {/* GH Vector Monogram - Precision replica of WhatsApp Image 2026-09-22 at 15.40.01.jpeg */}
      <svg
        width={iconDimensions.w}
        height={iconDimensions.h}
        viewBox="0 0 170 105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 group-hover:scale-105 drop-shadow-sm"
      >
        <defs>
          {/* Star flare gradient for authentic sparkling shimmer */}
          <radialGradient id="ghStarFlare" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="40%" stopColor="#f3f4f6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#9ca3af" stopOpacity="0.7" />
          </radialGradient>
        </defs>

        <g>
          {/* ================= LETTER G ================= */}
          {/* Serif Top Hook & Flowing Geometric Body */}
          <path
            d="M 66 32 C 61 17 48 10 32 10 C 12 10 2 27 2 53 C 2 78 15 94 38 94 C 54 94 67 82 68 64 C 66 54 57 48 45 48 C 34 48 28 54 23 59 C 19 63 15 61 13 56 C 11 49 15 42 24 38 C 34 33 49 35 58 45 C 61 48 65 48 67 45 C 70 40 68 34 66 32 Z"
            fill={mainFill}
          />
          
          {/* Top serif teardrop terminal */}
          <path
            d="M 33 10 C 42 10 52 14 58 23 C 55 26 49 23 41 22 C 31 21 22 25 18 33 C 16 30 17 23 22 17 C 26 12 30 10 33 10 Z"
            fill={mainFill}
          />

          {/* Electronic Circuit Traces etched directly onto the lower bowl of G (from user logo) */}
          {/* Trace 1 - Outer curve */}
          <path
            d="M 12 74 C 20 86 36 88 48 81"
            stroke={circuitTraceColor}
            strokeWidth="3.2"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="12" cy="74" r="3.2" fill={circuitTraceColor} />
          <circle cx="12" cy="74" r="1.4" fill={mainFill} />

          {/* Trace 2 - Inner curve with node */}
          <path
            d="M 21 66 C 28 76 41 78 52 70"
            stroke={circuitTraceColor}
            strokeWidth="2.8"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="21" cy="66" r="2.8" fill={circuitTraceColor} />
          <circle cx="21" cy="66" r="1.2" fill={mainFill} />

          {/* Trace 3 - Solder node on right tail */}
          <path
            d="M 32 58 C 37 66 46 66 55 58"
            stroke={circuitTraceColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="55" cy="58" r="2.6" fill={circuitTraceColor} />
          <circle cx="55" cy="58" r="1.1" fill={mainFill} />

          {/* ================= LETTER H ================= */}
          {/* Left upright pillar */}
          <rect x="76" y="24" width="13" height="69" rx="1.5" fill={mainFill} />
          {/* Horizontal crossbar */}
          <rect x="88" y="53" width="23" height="12" rx="1" fill={mainFill} />
          {/* Right upright pillar */}
          <rect x="110" y="24" width="13" height="69" rx="1.5" fill={mainFill} />

          {/* ================= 4 SPARKLE STARS AT TOP-RIGHT OF H ================= */}
          {/* Star 1: Primary Large Sparkling Star (Right over top of H) */}
          <g transform="translate(126, 18)">
            <path
              d="M 0 -18 Q 1.3 -3.5 16 0 Q 1.3 3.5 0 18 Q -1.3 3.5 -16 0 Q -1.3 -3.5 0 -18 Z"
              fill="url(#ghStarFlare)"
            />
            {/* Bright Center Glare */}
            <circle cx="0" cy="0" r="2.6" fill="#ffffff" />
          </g>

          {/* Star 2: Upper Right Star */}
          <g transform="translate(144, 9)">
            <path
              d="M 0 -10 Q 0.9 -2 9 0 Q 0.9 2 0 10 Q -0.9 2 -9 0 Q -0.9 -2 0 -10 Z"
              fill="url(#ghStarFlare)"
            />
            <circle cx="0" cy="0" r="1.5" fill="#ffffff" />
          </g>

          {/* Star 3: Far Right Star */}
          <g transform="translate(155, 23)">
            <path
              d="M 0 -11 Q 0.9 -2.2 10 0 Q 0.9 2.2 0 11 Q -0.9 2.2 -10 0 Q -0.9 -2.2 0 -11 Z"
              fill="url(#ghStarFlare)"
            />
            <circle cx="0" cy="0" r="1.6" fill="#ffffff" />
          </g>

          {/* Star 4: Lower Small Accent Star */}
          <g transform="translate(148, 38)">
            <path
              d="M 0 -7 Q 0.6 -1.4 6 0 Q 0.6 1.4 0 7 Q -0.6 1.4 -6 0 Q -0.6 -1.4 0 -7 Z"
              fill="url(#ghStarFlare)"
            />
            <circle cx="0" cy="0" r="1" fill="#ffffff" />
          </g>
        </g>
      </svg>

      {/* Brand Text: gadgethematt */}
      {showText && (
        <div className="flex flex-col">
          <span className={`font-black tracking-[0.14em] uppercase ${brandTextColor} font-display leading-tight ${iconDimensions.text}`}>
            gadgethematt
          </span>
          <span className={`text-[9px] font-extrabold tracking-[0.24em] uppercase -mt-0.5 ${isWhite ? 'text-neutral-400' : 'text-neutral-500'}`}>
            STUDENT TECH & AUDIO
          </span>
        </div>
      )}
    </div>
  );
};
