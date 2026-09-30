import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, ArrowDown, Volume2, Sparkles, ChevronRight, Disc } from 'lucide-react';
import twsHeroImg from '../assets/images/tws_earpods_hero_1790731073099.jpg';
import silkWaveImg from '../assets/images/space_s1_silk_wave_1790728512734.jpg';

export const HeroSection: React.FC = () => {
  const { navigate, openAffiliateModal, products } = useApp();
  const [productColor, setProductColor] = useState<'pearl' | 'titanium' | 'onyx'>('pearl');
  const [isBassPlaying, setIsBassPlaying] = useState(false);

  const heroProduct = products.find(p => p.slug === 'soundcore-liberty-5') || products[0];

  const handleBassDemo = () => {
    setIsBassPlaying(true);
    // Play 40Hz Pure Bass Audio sample
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(40, audioCtx.currentTime); // 40Hz deep sub bass
      gain.gain.setValueAtTime(0.35, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 2.5);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 2.5);
    } catch {
      // ignore audio context failures
    }

    setTimeout(() => {
      setIsBassPlaying(false);
    }, 2800);
  };

  return (
    <section className="relative w-full min-h-[88vh] bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#e8eee9] text-[#080808] flex flex-col justify-between pt-24 pb-12 overflow-hidden select-none border-b border-[#E4E8E5]">
      
      {/* BACKGROUND STUDIO LIGHTING & LIME ACCENT AMBIENCE */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        {/* Soft Radial Center Lime/Studio Keylight Bloom */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] max-w-[1200px] h-[70vh] bg-gradient-to-tr from-[#B9F43A]/25 via-white/40 to-transparent rounded-full blur-3xl opacity-90" />

        {/* Photorealistic Silk Wave Layer */}
        <div className="absolute inset-x-0 bottom-0 h-[45vh] sm:h-[50vh] opacity-75 mix-blend-multiply overflow-hidden pointer-events-none">
          <img
            src={silkWaveImg}
            alt="Studio Silk Texture"
            className="w-full h-full object-cover object-bottom filter contrast-[1.02] brightness-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#f1f5f9]/40 to-[#f8fafc]" />
        </div>
      </div>

      {/* HERO MAIN STAGE CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col lg:flex-row items-center justify-between gap-8 my-auto">
        
        {/* LEFT SIDE: BRAND TITLE & SUBTITLE */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left z-10 lg:w-[35%]">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#25282A] text-white text-[10px] font-black tracking-[0.2em] uppercase mb-4 shadow-sm border border-neutral-700">
            <span className="w-2 h-2 rounded-full bg-[#B9F43A] animate-pulse" />
            <span>TWS REVIEW & AFFILIATE HUB</span>
          </div>

          {/* Left Title: GADGET HEMATT */}
          <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-7xl xl:text-8xl text-[#080808] tracking-tighter leading-[0.88] uppercase">
            GADGET<br />
            <span className="text-[#080808]">HEMATT</span>
          </h1>

          {/* Subtitle Left: • STUDENT TECH & AUDIO */}
          <div className="mt-4 flex items-center gap-2">
            <span className="text-xs sm:text-sm font-black tracking-[0.22em] text-[#68736D] uppercase">
              • STUDENT TECH & AUDIO
            </span>
          </div>

          <p className="mt-3 text-xs sm:text-sm text-[#68736D] max-w-sm leading-relaxed font-medium">
            Portal ulasan jujur TWS earphone, rekomendasi terbaik mahasiswa, komparasi spesifikasi, dan diskon resmi Shopee & Tokopedia.
          </p>
        </div>

        {/* CENTER: HIGH QUALITY FLOATING TWS EARPODS PRODUCT IMAGE */}
        <div className="relative z-20 flex-1 flex flex-col items-center justify-center my-2 sm:my-0">
          
          {/* Audio Wave Ping Rings on Bass Play */}
          {isBassPlaying && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] rounded-full border-2 border-[#B9F43A] animate-ping duration-1000" />
              <div className="w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] rounded-full border border-black/10 animate-ping duration-1000 delay-150" />
            </div>
          )}

          {/* Floating TWS Earpods Container */}
          <div 
            className="animate-float-smooth relative w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[460px] md:h-[460px] flex items-center justify-center group cursor-pointer"
            onClick={handleBassDemo}
            title="Klik untuk uji audio Pure Bass"
          >
            {/* Ambient Product Halo */}
            <div className="absolute inset-6 rounded-full bg-[#B9F43A]/30 blur-2xl -z-10 group-hover:scale-110 transition-transform" />

            <img
              src={twsHeroImg}
              alt="TWS Earpods True Wireless Stereo"
              className="w-full h-full object-contain filter drop-shadow-[0_25px_40px_rgba(8,8,8,0.22)] transition-all duration-500 group-hover:scale-[1.03] rounded-3xl"
              style={{
                filter: productColor === 'onyx'
                  ? 'brightness(0.65) contrast(1.2) drop-shadow(0 25px 40px rgba(0,0,0,0.35))'
                  : productColor === 'titanium'
                  ? 'brightness(0.90) contrast(1.1) drop-shadow(0 25px 40px rgba(0,0,0,0.25))'
                  : 'brightness(1.02) contrast(1.04) drop-shadow(0 25px 40px rgba(8,8,8,0.20))'
              }}
            />

            {/* Micro Badge Floating Tag */}
            <div className="absolute bottom-4 px-3.5 py-1.5 rounded-full bg-[#25282A] text-white text-[10px] font-extrabold tracking-widest uppercase shadow-md flex items-center gap-1.5 opacity-90 group-hover:opacity-100 border border-neutral-700">
              <Disc className="w-3.5 h-3.5 text-[#B9F43A] animate-spin" style={{ animationDuration: '4s' }} />
              <span>PURE BASS AUDIO 40Hz</span>
            </div>
          </div>

          {/* Soft Ground Contact Shadow */}
          <div className="w-[180px] sm:w-[260px] h-4 -mt-2 rounded-[100%] bg-radial from-black/25 via-black/5 to-transparent blur-md" />
        </div>

        {/* RIGHT SIDE: EDITORIAL HEADLINE "Mute the Noise" & SUBTITLE "Own the Show." */}
        <div className="flex flex-col items-center lg:items-end text-center lg:text-right z-10 lg:w-[35%]">
          
          <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-6xl xl:text-7xl text-[#080808] tracking-tighter leading-[0.90] uppercase">
            Mute the<br />
            Noise.
          </h2>

          <p className="font-display font-black text-2xl sm:text-4xl text-[#080808] tracking-tight mt-2.5">
            Own the Show.
          </p>

          <p className="mt-3 text-xs text-[#68736D] font-medium max-w-xs">
            True Wireless Stereo terbaik untuk kelas, gaming, & nongkrong santai.
          </p>

          {/* COLOR SELECTORS */}
          <div className="mt-6 flex items-center gap-3">
            <span className="text-[10px] font-bold text-[#68736D] uppercase tracking-wider">Pilih Warna TWS:</span>
            <div className="flex items-center gap-2 p-1.5 rounded-full bg-white/80 border border-[#E4E8E5] shadow-xs">
              <button
                onClick={() => setProductColor('pearl')}
                className={`w-5 h-5 rounded-full bg-white border border-neutral-300 shadow-inner transition-transform ${
                  productColor === 'pearl' ? 'ring-2 ring-[#B9F43A] scale-110' : 'hover:scale-105'
                }`}
                title="Pearl White"
              />
              <button
                onClick={() => setProductColor('titanium')}
                className={`w-5 h-5 rounded-full bg-neutral-400 border border-neutral-500 shadow-inner transition-transform ${
                  productColor === 'titanium' ? 'ring-2 ring-[#B9F43A] scale-110' : 'hover:scale-105'
                }`}
                title="Titanium Silver"
              />
              <button
                onClick={() => setProductColor('onyx')}
                className={`w-5 h-5 rounded-full bg-black border border-neutral-800 shadow-inner transition-transform ${
                  productColor === 'onyx' ? 'ring-2 ring-[#B9F43A] scale-110' : 'hover:scale-105'
                }`}
                title="Jet Black Onyx"
              />
            </div>
          </div>
        </div>

      </div>

      {/* BOTTOM ACTION BAR / CTAS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-8 pt-6 border-t border-[#E4E8E5] flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* AUDIO TEST BUTTON */}
        <button
          onClick={handleBassDemo}
          className={`px-4 py-2.5 rounded-full text-xs font-black tracking-wider uppercase transition-all flex items-center gap-2 ${
            isBassPlaying
              ? 'bg-[#B9F43A] text-black shadow-md animate-pulse'
              : 'bg-white hover:bg-[#F7F8F6] text-[#080808] border border-[#E4E8E5] shadow-xs'
          }`}
        >
          <Volume2 className={`w-4 h-4 ${isBassPlaying ? 'text-black' : 'text-[#68736D]'}`} />
          <span>{isBassPlaying ? 'Audio 40Hz Berbunyi...' : '[ 🔊 Uji Audio Pure Bass ]'}</span>
        </button>

        {/* MAIN & SECONDARY CTAS */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => openAffiliateModal(heroProduct)}
            className="px-6 py-3.5 rounded-full bg-[#25282A] hover:bg-black text-white font-black text-xs sm:text-sm tracking-wider uppercase transition-all shadow-md hover:scale-105 flex items-center gap-2 border border-[#25282A]"
          >
            <ShoppingBag className="w-4 h-4 text-[#B9F43A]" />
            <span>CEK HARGA TERBAIK DI SHOPEE / TOKOPEDIA →</span>
          </button>

          <button
            onClick={() => navigate('/katalog')}
            className="px-5 py-3.5 rounded-full bg-white hover:bg-[#F7F8F6] text-[#080808] border border-[#E4E8E5] font-black text-xs sm:text-sm tracking-wider uppercase transition-all flex items-center gap-1.5 shadow-xs"
          >
            <span>Katalog Lengkap ↓</span>
          </button>
        </div>

      </div>
    </section>
  );
};
