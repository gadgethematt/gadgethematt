import React, { useEffect, useRef, useState } from 'react';
import productCaseImg from '../assets/images/tws_product_case_1790083633867.jpg';
import { ProductColor } from '../types';

interface TransparentTwsEarbudsProps {
  color?: ProductColor;
  isBassActive?: boolean;
  onAudioTest?: () => void;
}

export const TransparentTwsEarbuds: React.FC<TransparentTwsEarbudsProps> = ({
  color = 'pearl',
  isBassActive = false,
  onAudioTest,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imageProcessed, setImageProcessed] = useState(false);
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });

  // Process image on HTML5 Canvas to strip white background completely
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = productCaseImg;

    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = img.naturalWidth || 600;
      canvas.height = img.naturalHeight || 600;

      // Draw original image
      ctx.drawImage(img, 0, 0);

      try {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        // Iterate through all pixels and strip pure/near-white background
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // Threshold for white background detection
          const brightness = (r + g + b) / 3;
          if (r > 218 && g > 218 && b > 218) {
            // Smooth edge feathering
            if (brightness > 240) {
              data[i + 3] = 0; // 100% transparent
            } else {
              const alphaRatio = (240 - brightness) / 22;
              data[i + 3] = Math.floor(data[i + 3] * Math.max(0, Math.min(1, alphaRatio)));
            }
          }
        }

        ctx.putImageData(imgData, 0, 0);
        setImageProcessed(true);
      } catch (err) {
        console.warn('Canvas pixel processing fallback', err);
        setImageProcessed(true);
      }
    };
  }, []);

  // Parallax mouse tilt effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = ((e.clientX / innerWidth) - 0.5) * 12;
      const y = ((e.clientY / innerHeight) - 0.5) * 12;
      setMouseTilt({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      id="tws-hero-visual-stage"
      className="relative z-20 flex flex-col items-center justify-center select-none cursor-pointer group"
      onClick={onAudioTest}
      title="Uji suara audio TWS"
    >
      {/* Subtle Studio Glow Backdrop (Dark Graphite & Soft Light Halo matching download (6).jpg) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
        
        {/* Soft Circular Studio Ambient Disk */}
        <div 
          className="w-[320px] h-[320px] sm:w-[440px] sm:h-[440px] md:w-[540px] md:h-[540px] rounded-full transition-all duration-700 opacity-60 group-hover:opacity-80 group-hover:scale-105"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.08) 0%, rgba(60, 64, 72, 0.25) 45%, transparent 70%)',
          }}
        />

        {/* Dynamic Acoustic Pulse Rings */}
        {isBassActive && (
          <>
            <div className="absolute w-[360px] h-[360px] sm:w-[500px] sm:h-[500px] rounded-full border border-neutral-400/30 animate-ping duration-1000" />
            <div className="absolute w-[440px] h-[440px] sm:w-[620px] sm:h-[620px] rounded-full border border-neutral-500/20 animate-ping duration-1000 delay-150" />
          </>
        )}
      </div>

      {/* 2. FLOATING PRODUCT CONTAINER (3D Tilt & Continuous Floating Motion) */}
      <div
        className="relative transition-transform duration-300 ease-out"
        style={{
          transform: `perspective(1000px) rotateX(${-mouseTilt.y}deg) rotateY(${mouseTilt.x}deg)`,
        }}
      >
        {/* Continuous Floating Motion Wrapper */}
        <div className="animate-float-smooth flex flex-col items-center">
          <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[480px] md:h-[480px] lg:w-[540px] lg:h-[540px] flex items-center justify-center">
            
            {/* HTML5 Canvas with White Background Completely Removed */}
            <canvas
              ref={canvasRef}
              className={`w-full h-full object-contain filter transition-all duration-500 drop-shadow-[0_30px_50px_rgba(0,0,0,0.55)] group-hover:scale-[1.03] ${
                imageProcessed ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                filter: color === 'onyx' 
                  ? 'brightness(0.7) contrast(1.25) drop-shadow(0 30px 45px rgba(0, 0, 0, 0.6))' 
                  : color === 'titanium'
                  ? 'brightness(0.92) contrast(1.15) drop-shadow(0 30px 45px rgba(0, 0, 0, 0.5))'
                  : 'brightness(1.05) contrast(1.05) drop-shadow(0 32px 50px rgba(0, 0, 0, 0.45))'
              }}
            />

            {/* Seamless Crisp SVG Vector Render of TWS Earbuds & Case Fallback */}
            {!imageProcessed && (
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 500 500" className="w-[85%] h-[85%] animate-pulse">
                  <defs>
                    <linearGradient id="caseGradientCharcoal" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#e5e7eb" />
                      <stop offset="50%" stopColor="#9ca3af" />
                      <stop offset="100%" stopColor="#4b5563" />
                    </linearGradient>
                    <linearGradient id="lidInteriorCharcoal" x1="0%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#111827" />
                      <stop offset="100%" stopColor="#1f2937" />
                    </linearGradient>
                  </defs>
                  <path d="M120,240 C120,180 380,180 380,240 C380,340 330,420 250,420 C170,420 120,340 120,240 Z" fill="url(#caseGradientCharcoal)" />
                  <ellipse cx="250" cy="220" rx="110" ry="42" fill="url(#lidInteriorCharcoal)" />
                  <circle cx="210" cy="170" r="32" fill="#ffffff" />
                  <rect x="202" y="170" width="16" height="52" rx="8" fill="#e2e8f0" />
                  <circle cx="290" cy="165" r="32" fill="#ffffff" />
                  <rect x="282" y="165" width="16" height="52" rx="8" fill="#e2e8f0" />
                </svg>
              </div>
            )}
          </div>

          {/* Deep Oval Ground Contact Shadow */}
          <div 
            className="w-[200px] sm:w-[280px] md:w-[360px] h-6 -mt-4 md:-mt-6 rounded-[100%] transition-all duration-500 blur-md transform group-hover:scale-95"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.25) 55%, transparent 80%)'
            }}
          />
        </div>
      </div>
    </div>
  );
};
