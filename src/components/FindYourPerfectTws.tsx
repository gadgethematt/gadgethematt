import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import twsCaseImg from '../assets/images/tws_product_case_1790083633867.jpg';

export const FindYourPerfectTws: React.FC = () => {
  const { navigate } = useApp();

  return (
    <section className="w-full py-16 bg-[#0B0D10] border-b border-[#1E2329]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full bg-gradient-to-br from-[#14181D] via-[#1E2329] to-[#14181D] rounded-3xl p-8 sm:p-12 lg:p-16 border border-[#A9B5C1]/20 overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          
          {/* ICE BLUE AMBIENT SOUNDSTAGE GLOW */}
          <div className="absolute top-1/2 right-10 -translate-y-1/2 w-96 h-96 bg-[#92B6E5]/15 rounded-full blur-3xl pointer-events-none -z-0" />

          {/* LEFT CONTENT */}
          <div className="relative z-10 max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E2329] border border-[#A9B5C1]/20 text-[10px] font-black tracking-widest text-[#92B6E5] uppercase mb-4 shadow-sm">
              <Sparkles className="w-3 h-3 text-[#92B6E5]" />
              SMART RECOMMENDATION ENGINE
            </div>

            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-[#F2F3F1] uppercase tracking-tighter leading-[0.95]">
              Find Your<br />
              <span className="metallic-text">Perfect TWS</span>
            </h2>

            <p className="mt-4 text-sm sm:text-base text-[#9AA5B1] font-medium leading-relaxed">
              Compare features, read honest reviews, and discover the best TWS for your needs.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => navigate('/katalog')}
                className="px-8 py-4 rounded-full bg-[#92B6E5] hover:bg-[#A9B5C1] text-[#0B0D10] font-black text-xs sm:text-sm tracking-wider uppercase transition-all shadow-lg hover:scale-105 flex items-center gap-2"
              >
                <span>EXPLORE ALL TWS</span>
                <ArrowRight className="w-4 h-4 text-[#0B0D10]" />
              </button>

              <button
                onClick={() => navigate('/comparisons')}
                className="px-6 py-4 rounded-full bg-[#1E2329] hover:bg-[#252C34] text-[#F2F3F1] border border-[#A9B5C1]/20 hover:border-[#92B6E5]/40 font-black text-xs tracking-wider uppercase transition-colors"
              >
                Fitur Komparasi →
              </button>
            </div>

            <div className="mt-6 flex items-center justify-center lg:justify-start gap-4 text-xs font-bold text-[#9AA5B1]">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#92B6E5]" />
                No Sponsored Bias
              </span>
              <span>•</span>
              <span>Direct Affiliate Official Store</span>
            </div>
          </div>

          {/* RIGHT TWS GRAPHIC */}
          <div className="relative z-10 w-full max-w-md h-64 sm:h-80 flex items-center justify-center">
            <div className="animate-float-smooth relative w-full h-full flex items-center justify-center">
              <img
                src={twsCaseImg}
                alt="Find Your Perfect TWS"
                className="max-w-full max-h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)]"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
