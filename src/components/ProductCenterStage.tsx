import React, { useState, useEffect } from 'react';
import productCaseImg from '../assets/images/tws_product_case_1790083633867.jpg';
import { ProductColor } from '../types';

interface ProductCenterStageProps {
  color: ProductColor;
  isBassActive: boolean;
  onProductClick?: () => void;
}

export const ProductCenterStage: React.FC<ProductCenterStageProps> = ({
  color,
  isBassActive,
  onProductClick,
}) => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 16; // gentle parallax tilt
      const y = (e.clientY / innerHeight - 0.5) * 16;
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Filter styles based on selected color finish
  const getColorFilter = () => {
    switch (color) {
      case 'titanium':
        return 'contrast(1.08) brightness(0.88) saturate(0.8)';
      case 'onyx':
        return 'contrast(1.3) brightness(0.38) saturate(0.2)';
      case 'pearl':
      default:
        return 'contrast(1.02) brightness(1.02) saturate(1.0)';
    }
  };

  return (
    <div 
      id="product-center-stage" 
      className="relative z-20 flex flex-col items-center justify-center cursor-pointer group"
      onClick={onProductClick}
      title="Klik untuk mendengarkan tes audio Pure Bass"
    >
      {/* Acoustic Frequency Wave Rings (Active on Bass Drop) */}
      {isBassActive && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="absolute w-[360px] h-[360px] md:w-[540px] md:h-[540px] rounded-full border border-neutral-900/15 animate-ping duration-1000" />
          <div className="absolute w-[440px] h-[440px] md:w-[680px] md:h-[680px] rounded-full border border-neutral-800/10 animate-ping duration-1000 delay-150" />
          <div className="absolute w-[280px] h-[280px] md:w-[420px] md:h-[420px] rounded-full bg-neutral-900/5 blur-2xl animate-pulse" />
        </div>
      )}

      {/* Floating Product Assembly Container */}
      <div
        className="relative transition-transform duration-300 ease-out"
        style={{
          transform: `perspective(1000px) rotateX(${-mouseOffset.y}deg) rotateY(${mouseOffset.x}deg)`,
        }}
      >
        {/* Continuous Floating Motion Wrapper */}
        <div className="animate-float-smooth flex flex-col items-center">
          {/* Main 3D TWS Case & Earbuds Graphic */}
          <div className="relative w-[310px] h-[310px] sm:w-[390px] sm:h-[390px] md:w-[480px] md:h-[480px] lg:w-[530px] lg:h-[530px] select-none">
            {/* Soft Ambient Product Halo */}
            <div className="absolute inset-4 rounded-full bg-white/60 blur-2xl -z-10" />

            <img
              src={productCaseImg}
              alt="gadgethematt Pure Bass TWS Earbuds & Open Charging Case"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain filter drop-shadow-[0_24px_38px_rgba(0,0,0,0.18)] transition-all duration-700 ease-out group-hover:scale-[1.03]"
              style={{ filter: `${getColorFilter()} drop-shadow(0 28px 45px rgba(17, 19, 21, 0.16))` }}
            />

            {/* Subtle Interactive Status LED on Case */}
            <div 
              className={`absolute left-1/2 bottom-[30%] -translate-x-1/2 w-2 h-2 rounded-full transition-all duration-300 ${
                isBassActive 
                  ? 'bg-emerald-400 shadow-[0_0_12px_#34d399]' 
                  : 'bg-neutral-800 shadow-[0_0_6px_rgba(0,0,0,0.4)]'
              }`} 
            />
          </div>

          {/* Dynamic Floating Ambient Ground Shadow underneath */}
          <div 
            className="w-[200px] sm:w-[260px] md:w-[340px] h-6 -mt-3 md:-mt-6 rounded-[100%] bg-gradient-to-r from-transparent via-neutral-900/18 to-transparent blur-md transition-all duration-500 transform group-hover:scale-90 group-hover:opacity-75"
          />
        </div>
      </div>

      {/* Floating Micro-Badge */}
      <div className="mt-3 md:mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900/80 backdrop-blur-md text-white text-[11px] font-medium tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Ketuk untuk uji suara Bass 40Hz
        </span>
      </div>
    </div>
  );
};
