import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  ExternalLink, 
  Check, 
  X, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Lightbulb, 
  ShieldCheck, 
  Battery, 
  Mic, 
  Zap, 
  ShoppingBag,
  Star
} from 'lucide-react';
import redmiBudsImg from '../assets/images/redmi_buds_6_play_1790732343833.jpg';
import soundcoreImg from '../assets/images/soundcore_liberty_5_1790729961290.jpg';
import realmeBudsImg from '../assets/images/realme_buds_t310_1790732354332.jpg';
import cmfBudsImg from '../assets/images/cmf_buds_2a_1790732365222.jpg';
import huaweiBudsImg from '../assets/images/huawei_freebuds_se4_1790732378343.jpg';
import { OFFICIAL_AFFILIATE_LINKS } from '../data/mockData';

export const StudentTwsGuideSection: React.FC = () => {
  const { trackClick, navigate } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const studentProducts = [
    {
      id: 'prod-redmi-6-play',
      name: 'Redmi Buds 6 Play',
      brand: 'Xiaomi Redmi',
      badge: 'Juara Budget Pelajar',
      price: 'Rp 139.000',
      oldPrice: 'Rp 199.000',
      rating: 4.8,
      img: redmiBudsImg,
      driver: '10mm Dynamic Bass',
      noiseCancel: 'AI ENC Call Noise Reduction',
      battery: '7.5 Jam (36 Jam Total Case)',
      latency: 'Bluetooth 5.4 Low Latency',
      bestFor: 'Pelajar dengan dana minim yang butuh TWS awet',
      link: OFFICIAL_AFFILIATE_LINKS.LINK_1,
      pros: ['Harga sangat murah under Rp150K', 'Baterai 36 jam sangat awet', 'Bobot ringan 3.6g nyaman seharian'],
      cons: ['Belum ada fitur Active Noise Cancelling (ANC)', 'Case tanpa penutup karet']
    },
    {
      id: 'prod-soundcore-r50i',
      name: 'Soundcore R50i Extra Bass',
      brand: 'Anker Soundcore',
      badge: 'Terlaris 38K+ Terjual',
      price: 'Rp 189.000',
      oldPrice: 'Rp 349.000',
      rating: 4.9,
      img: soundcoreImg,
      driver: '10mm BassUp Driver',
      noiseCancel: 'Dual Mic AI Noise Reduction',
      battery: '10 Jam (30 Jam Total Case)',
      latency: 'Bluetooth 5.3 Fast Sync',
      bestFor: 'Pecinta dentuman bass & musik energik',
      link: OFFICIAL_AFFILIATE_LINKS.LINK_2,
      pros: ['Bass paling tebal di kelasnya', 'Aplikasi Soundcore gratis dengan 22 EQ', 'Garansi ganti baru resmi 18 bulan'],
      cons: ['Ukuran case sedikit tebal di kantong', 'Tidak ada sensor proximity auto-pause']
    },
    {
      id: 'prod-realme-t310',
      name: 'realme Buds T310',
      brand: 'realme',
      badge: 'ANC 46dB Terbaik',
      price: 'Rp 379.000',
      oldPrice: 'Rp 599.000',
      rating: 4.9,
      img: realmeBudsImg,
      driver: '12.4mm Titanized Diaphragm',
      noiseCancel: '46dB Hybrid Active Noise Cancelling',
      battery: '9 Jam (40 Jam Total Case)',
      latency: '45ms Ultra-Low Latency',
      bestFor: 'Fokus belajar di cafe & transportasi ramai',
      link: OFFICIAL_AFFILIATE_LINKS.LINK_3,
      pros: ['Peredam bising ANC 46dB senyap nyata', 'Driver 12.4mm suara sangat bertenaga', 'Bluetooth Multipoint connect 2 gawai'],
      cons: ['Fitur spatial audio butuh HP yang mendukung']
    },
    {
      id: 'prod-cmf-buds-2a',
      name: 'CMF Buds 2a by Nothing',
      brand: 'CMF by Nothing',
      badge: 'Desain Paling Estetik',
      price: 'Rp 449.000',
      oldPrice: 'Rp 699.000',
      rating: 4.8,
      img: cmfBudsImg,
      driver: '12.4mm Bio-Fiber Driver',
      noiseCancel: '42dB Active Noise Cancellation',
      battery: '8 Jam (35.5 Jam Total)',
      latency: 'Game Mode Fast Response',
      bestFor: 'Mahasiswa yang peduli fashion & estetika',
      link: OFFICIAL_AFFILIATE_LINKS.LINK_1,
      pros: ['Desain dial case sangat ikonik dan keren', 'Tuning audio Dirac Opteo jernih berimbang', '42dB ANC dengan Transparency Mode'],
      cons: ['Finishing matte harus dijaga dari benda tajam']
    },
    {
      id: 'prod-huawei-freebuds-se4',
      name: 'Huawei FreeBuds SE 4 ANC',
      brand: 'Huawei',
      badge: 'Mikrofon Jernih untuk Zoom',
      price: 'Rp 499.000',
      oldPrice: 'Rp 799.000',
      rating: 4.8,
      img: huaweiBudsImg,
      driver: '10mm Dynamic Polymer',
      noiseCancel: 'Intelligent ANC & Call Noise Red.',
      battery: '8 Jam (35 Jam Total)',
      latency: 'Bluetooth 5.3 Low Delay',
      bestFor: 'Kuliah online, presentasi Zoom, & maraton telepon',
      link: OFFICIAL_AFFILIATE_LINKS.LINK_2,
      pros: ['Bentuk pebble ergonomis paling nyaman', 'Mikrofon 3-Mic AI sangat jernih untuk Zoom', 'Build quality premium dan solid'],
      cons: ['Aplikasi Huawei AI Life diunduh via browser untuk ponsel Android non-Huawei']
    }
  ];

  const faqs = [
    {
      q: 'Apakah TWS di bawah Rp200 ribuan awet untuk pemakaian harian pelajar?',
      a: 'Sangat awet jika Anda memilih merk resmi terpercaya seperti Redmi Buds 6 Play atau Soundcore R50i. Keduanya menggunakan material polikarbonat kokoh, chip Bluetooth generasi baru yang efisien daya, serta dilengkapi perlindungan garansi resmi Tokopedia Official Store 12 hingga 18 bulan.'
    },
    {
      q: 'Apa perbedaan antara Active Noise Cancellation (ANC) dan Environmental Noise Cancellation (ENC)?',
      a: 'ANC (Active Noise Cancellation) berfungsi meredam suara bising dari luar telinga Anda sehingga Anda mendengar musik/materi dengan lebih tenang (contoh: realme Buds T310 46dB). Sedangkan ENC (Environmental Noise Cancellation) berfungsi menyaring kebisingan sekitar agar lawan bicara mendengar suara mikrofon Anda dengan jelas saat telepon atau kuliah online.'
    },
    {
      q: 'Bagaimana cara merawat baterai TWS agar tidak cepat drop atau bocor?',
      a: 'Hindari menggunakan charger fast-charging watt tinggi (di atas 20W); gunakan adaptor 5V/1A atau port USB laptop. Jangan biarkan baterai case kosong 0% dalam waktu lama, dan hindari menyimpan TWS di tempat bersuhu panas seperti di dalam bagasi motor.'
    },
    {
      q: 'Apakah aman membeli TWS lewat link afiliasi Tokopedia di website ini?',
      a: '100% Aman! Seluruh tombol pembelian di website gadgethematt langsung mengarahkan Anda ke Tokopedia Official Store resmi brand tersebut. Anda mendapatkan produk 100% original, garansi resmi pabrikan, dan bebas ongkir Tokopedia tanpa tambahan biaya sepeser pun.'
    },
    {
      q: 'TWS mana yang paling minim delay untuk main game Mobile Legends atau PUBG?',
      a: 'Pilihan terbaik untuk gaming adalah realme Buds T310 dengan Game Mode latensi rendah 45ms atau gadgethematt Freedom ANC TWS dengan Bluetooth 5.4 (40ms), sehingga suara tembakan dan langkah kaki terdengar sinkron tanpa jeda.'
    }
  ];

  const handleBuy = (item: typeof studentProducts[0]) => {
    trackClick(item.id, item.name, 'tokopedia');
    window.open(item.link, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="rekomendasi-tws-pelajar" className="w-full bg-[#050608] text-[#F8F9FA] py-20 border-b border-[#1A1F26] selection:bg-[#92B6E5] selection:text-[#050608]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* ARTICLE SEO HEADER */}
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12151A] border border-[#CAD6E2]/20 text-[#CAD6E2] font-black text-xs uppercase tracking-wider backdrop-blur-xl shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-[#92B6E5]" />
            <span>PANDUAN BELANJA & REVIEW RESMI 2026</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#F8F9FA] tracking-tight leading-tight">
            Rekomendasi TWS Terbaik 2026 untuk Pelajar: <span className="metallic-text">Murah dan Berkualitas</span>
          </h2>

          <p className="text-sm sm:text-base text-[#9AA5B1] leading-relaxed max-w-3xl mx-auto">
            Uji performa mendalam 5 earphone True Wireless Stereo (TWS) paling diminati pelajar dan mahasiswa di Indonesia. Dilengkapi peredam bising ANC, mikrofon jernih untuk kuliah daring, dan link belanja resmi Tokopedia Official Store.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-[#9AA5B1] pt-2">
            <span>Ditulis oleh: Tim Audio gadgethematt</span>
            <span>•</span>
            <span>Terverifikasi Februari 2026</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-[#CAD6E2]">
              <ShieldCheck className="w-4 h-4 text-[#92B6E5]" />
              Tokopedia Official Partner
            </span>
          </div>
        </div>

        {/* 1. INTERACTIVE COMPARISON TABLE */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <h3 className="font-display font-black text-xl text-[#F8F9FA] uppercase">
              Tabel Perbandingan 5 TWS Pelajar Terbaik
            </h3>
            <span className="text-xs text-[#9AA5B1] font-medium">Geser tabel ke samping pada layar ponsel →</span>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-[#CAD6E2]/12 bg-[#0B0D10]/85 backdrop-blur-xl shadow-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#12151A]/95 border-b border-[#CAD6E2]/12 text-[#CAD6E2] font-black uppercase tracking-wider text-[11px]">
                  <th className="p-4">Produk</th>
                  <th className="p-4">Harga Tokopedia</th>
                  <th className="p-4">Driver Audio</th>
                  <th className="p-4">Noise Cancelling</th>
                  <th className="p-4">Daya Baterai</th>
                  <th className="p-4">Latensi Gaming</th>
                  <th className="p-4 text-center">Beli di Tokopedia</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A1F26] font-medium">
                {studentProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-[#12151A]/60 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <img src={p.img} alt={p.name} className="w-12 h-12 object-contain p-1 rounded-2xl bg-[#050608] border border-[#CAD6E2]/15 shrink-0" />
                      <div>
                        <div className="font-black text-sm text-[#F8F9FA]">{p.name}</div>
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#92B6E5]/15 text-[#92B6E5] border border-[#92B6E5]/25">
                          {p.badge}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-black text-sm text-[#F8F9FA]">{p.price}</div>
                      <div className="text-[10px] text-[#9AA5B1] line-through">{p.oldPrice}</div>
                    </td>
                    <td className="p-4 font-bold text-[#F8F9FA]">{p.driver}</td>
                    <td className="p-4 text-[#9AA5B1]">{p.noiseCancel}</td>
                    <td className="p-4 font-bold text-[#CAD6E2]">{p.battery}</td>
                    <td className="p-4 text-[#9AA5B1]">{p.latency}</td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleBuy(p)}
                        className="px-4 py-2 rounded-xl bg-[#CAD6E2] hover:bg-[#FFFFFF] text-[#050608] font-black text-xs uppercase tracking-wide flex items-center justify-center gap-1.5 shadow-md transition-all hover:scale-105 mx-auto cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Beli</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. IN-DEPTH REVIEW CARDS FOR ALL 5 PRODUCTS */}
        <div className="space-y-8">
          <div>
            <h3 className="font-display font-black text-2xl text-[#F2F3F1] uppercase">
              Ulasan Mendalam 5 Rekomendasi TWS Pelajar
            </h3>
            <p className="text-xs sm:text-sm text-[#9AA5B1] mt-1 font-medium">
              Analisis keunggulan, karakter suara, dan alasan redaksi merekomendasikannya untuk kegiatan belajar harian.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {studentProducts.map((p, idx) => (
              <div 
                key={p.id} 
                className="rounded-3xl border border-[#A9B5C1]/15 bg-[#1E2329]/75 backdrop-blur-md p-6 shadow-sm hover:border-[#92B6E5]/50 hover:shadow-[0_12px_32px_-8px_rgba(146,182,229,0.12)] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#92B6E5]/15 text-[#92B6E5] border border-[#92B6E5]/30">
                      #{idx + 1} {p.badge}
                    </span>
                    <div className="flex items-center gap-1 bg-[#14181D] px-2 py-0.5 rounded-full border border-[#A9B5C1]/15">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-black text-[#F2F3F1]">{p.rating}</span>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="w-full h-48 rounded-2xl bg-[#14181D] border border-[#A9B5C1]/10 p-4 flex items-center justify-center mb-4 group-hover:border-[#92B6E5]/30 transition-colors">
                    <img src={p.img} alt={p.name} className="max-h-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform" />
                  </div>

                  <div className="text-[10px] font-black uppercase tracking-wider text-[#A9B5C1]">{p.brand}</div>
                  <h4 className="font-display font-black text-lg text-[#F2F3F1] leading-tight mb-2">{p.name}</h4>
                  
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="font-display font-black text-xl text-[#F2F3F1]">{p.price}</span>
                    <span className="text-xs text-[#9AA5B1] line-through">{p.oldPrice}</span>
                  </div>

                  {/* Highlights Pros & Cons */}
                  <div className="space-y-2 mb-4 text-xs">
                    <div className="font-bold text-emerald-400">
                      {p.pros.map((pro, i) => (
                        <div key={i} className="flex items-center gap-1.5 py-0.5">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{pro}</span>
                        </div>
                      ))}
                    </div>
                    <div className="font-semibold text-rose-400">
                      {p.cons.map((con, i) => (
                        <div key={i} className="flex items-center gap-1.5 py-0.5">
                          <X className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                          <span>{con}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Direct Tokopedia CTA */}
                <div className="pt-4 border-t border-[#A9B5C1]/15">
                  <button
                    onClick={() => handleBuy(p)}
                    className="w-full py-3.5 px-4 rounded-2xl bg-[#92B6E5] hover:bg-[#A9B5C1] text-[#0B0D10] font-black text-xs uppercase tracking-wide flex items-center justify-between shadow-md transition-transform hover:scale-[1.02]"
                  >
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4" />
                      <span>Beli di Tokopedia</span>
                    </div>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. TIPS MEMILIH TWS UNTUK PELAJAR */}
        <div className="rounded-3xl bg-[#14181D]/90 border border-[#A9B5C1]/15 p-8 sm:p-12 space-y-8 backdrop-blur-md">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#92B6E5] mb-2">
              <Lightbulb className="w-4 h-4" />
              <span>PANDUAN PRAKTIS GADGET HEMATT</span>
            </div>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-[#F2F3F1] uppercase">
              Tips Cerdas Memilih TWS untuk Pelajar & Mahasiswa
            </h3>
            <p className="text-xs sm:text-sm text-[#9AA5B1] mt-1 font-medium">
              Empat aspek penting agar uang jajan Anda tidak terbuang sia-sia untuk TWS yang cepat rusak.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#1E2329]/80 border border-[#A9B5C1]/15">
              <div className="w-10 h-10 rounded-xl bg-[#92B6E5]/15 text-[#92B6E5] border border-[#92B6E5]/25 flex items-center justify-center font-black mb-4">
                <Mic className="w-5 h-5" />
              </div>
              <h4 className="font-display font-black text-sm text-[#F2F3F1] uppercase mb-1">1. Kualitas Mik Telepon</h4>
              <p className="text-xs text-[#9AA5B1] leading-relaxed">
                Pilih TWS dengan teknologi AI ENC (Environmental Noise Cancellation) agar suara vokal Anda tidak tenggelam saat presentasi Zoom atau tugas kelompok.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#1E2329]/80 border border-[#A9B5C1]/15">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 flex items-center justify-center font-black mb-4">
                <Battery className="w-5 h-5" />
              </div>
              <h4 className="font-display font-black text-sm text-[#F2F3F1] uppercase mb-1">2. Baterai Minimal 30 Jam</h4>
              <p className="text-xs text-[#9AA5B1] leading-relaxed">
                Pastikan total waktu pakai dengan charging case minimal 30 jam agar Anda tidak perlu repot mencari colokan listrik di kampus setiap hari.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#1E2329]/80 border border-[#A9B5C1]/15">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/25 flex items-center justify-center font-black mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="font-display font-black text-sm text-[#F2F3F1] uppercase mb-1">3. Bluetooth 5.3 / 5.4</h4>
              <p className="text-xs text-[#9AA5B1] leading-relaxed">
                Versi Bluetooth terbaru memberikan latensi lebih rendah, jangkauan sinyal lebih jauh, dan koneksi bebas putus saat HP berada di dalam ransel.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#1E2329]/80 border border-[#A9B5C1]/15">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/25 flex items-center justify-center font-black mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-display font-black text-sm text-[#F2F3F1] uppercase mb-1">4. Garansi Resmi Terjamin</h4>
              <p className="text-xs text-[#9AA5B1] leading-relaxed">
                Selalu beli dari Tokopedia Official Store resmi agar mendapatkan klaim garansi ganti baru 12-18 bulan jika terjadi kendala pada unit.
              </p>
            </div>
          </div>
        </div>

        {/* 4. FAQ ACCORDION SECTION */}
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase text-[#92B6E5]">
              <HelpCircle className="w-4 h-4" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-[#F2F3F1] uppercase">
              Pertanyaan Seputar TWS Pelajar
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div 
                  key={i} 
                  className="rounded-2xl border border-[#A9B5C1]/15 bg-[#1E2329]/80 overflow-hidden shadow-xs transition-all hover:border-[#92B6E5]/30"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full p-5 text-left font-display font-black text-sm sm:text-base text-[#F2F3F1] flex items-center justify-between gap-4 hover:bg-[#1E2329] transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 shrink-0 text-[#92B6E5]" /> : <ChevronDown className="w-4 h-4 shrink-0 text-[#9AA5B1]" />}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#9AA5B1] leading-relaxed border-t border-[#A9B5C1]/10 animate-fadeIn">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
