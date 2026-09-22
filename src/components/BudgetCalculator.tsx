import React, { useState } from 'react';
import { PRODUCTS_CATALOG } from '../data/mockData';
import { Calculator, Check, ExternalLink, Sparkles, ShieldCheck } from 'lucide-react';
import { ProductItem } from '../types';

export const BudgetCalculator: React.FC = () => {
  const [budget, setBudget] = useState<number>(350000);
  const [persona, setPersona] = useState<'skripsi' | 'gamer' | 'ambis'>('skripsi');

  const getRecommendations = (): ProductItem[] => {
    let matches = PRODUCTS_CATALOG.filter(p => p.price <= budget);
    
    if (persona === 'gamer') {
      matches = matches.sort((a, b) => (b.category === 'audio' ? 1 : 0) - (a.category === 'audio' ? 1 : 0));
    } else if (persona === 'skripsi') {
      matches = matches.sort((a, b) => (b.category === 'audio' ? 1 : 0) - (a.category === 'audio' ? 1 : 0));
    } else {
      matches = matches.sort((a, b) => (b.category === 'power' ? 1 : 0) - (a.category === 'power' ? 1 : 0));
    }

    return matches.slice(0, 3);
  };

  const recommendations = getRecommendations();
  const totalRecommendedPrice = recommendations.reduce((acc, curr) => acc + curr.price, 0);
  const remainingBudget = Math.max(0, budget - totalRecommendedPrice);

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-neutral-900 pt-24 pb-24 px-4 sm:px-8 max-w-7xl mx-auto">
      
      {/* Header - Silver, White, and Black */}
      <div className="mb-10 text-center sm:text-left pb-8 border-b border-neutral-200">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-300 text-neutral-800 text-xs font-black uppercase tracking-wider mb-2">
          <Calculator className="w-3.5 h-3.5 text-black" />
          Budget Planner
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black font-display tracking-tight">
          Simulator Gear Sesuai Kantong
        </h2>
        <p className="text-sm sm:text-base text-neutral-600 mt-1 max-w-2xl">
          Geser anggaran bulanan atau sisa uang sakumu untuk mendapatkan rekomendasi kombo gear mahasiswa teroptimal.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Controller */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-neutral-200 shadow-sm">
            <span className="text-xs font-black uppercase text-neutral-400 tracking-wider block mb-1">
              Berapa Budget Maksimalmu?
            </span>
            <div className="flex items-baseline justify-between mb-4">
              <span className="text-3xl sm:text-4xl font-black text-black font-display">
                Rp {budget.toLocaleString('id-ID')}
              </span>
              <span className="text-xs text-neutral-500 font-semibold">
                Rp 80k - Rp 1jt
              </span>
            </div>

            <input
              type="range"
              min="80000"
              max="1000000"
              step="20000"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-black mb-4"
            />

            <div className="flex flex-wrap gap-2 pt-2">
              {[150000, 250000, 350000, 500000].map((preset) => (
                <button
                  key={preset}
                  onClick={() => setBudget(preset)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    budget === preset
                      ? 'bg-black text-white shadow-sm'
                      : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border border-neutral-300'
                  }`}
                >
                  Rp {(preset / 1000).toFixed(0)}k
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-neutral-200 shadow-sm">
            <span className="text-xs font-black uppercase text-neutral-400 tracking-wider block mb-3">
              Fokus Kebutuhan Utama:
            </span>
            
            <div className="space-y-3">
              {[
                {
                  id: 'skripsi',
                  title: '🎓 Pejuang Tugas & Belajar',
                  desc: 'Prioritas kenyamanan: TWS noise reduction dan audio fokus kuliah.',
                },
                {
                  id: 'gamer',
                  title: '🎮 Gamers & Audio Punchy',
                  desc: 'Prioritas bass boosted dan latensi rendah untuk gaming & film.',
                },
                {
                  id: 'ambis',
                  title: '⚡ Mobilitas & Fast Charging',
                  desc: 'Prioritas charger GaN multifungsi untuk laptop & smartphone.',
                },
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() => setPersona(item.id as any)}
                  className={`p-4 rounded-2xl cursor-pointer border transition-all ${
                    persona === item.id
                      ? 'bg-neutral-50 border-black text-neutral-900 shadow-sm'
                      : 'bg-white hover:bg-neutral-50 border-neutral-200 text-neutral-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-bold text-black">{item.title}</h4>
                    {persona === item.id && (
                      <Check className="w-4 h-4 text-black shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-neutral-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-100 border border-neutral-300 text-xs space-y-2">
            <div className="flex justify-between text-neutral-600">
              <span>Total Estimasi Paket Gear:</span>
              <strong className="text-black font-black">Rp {totalRecommendedPrice.toLocaleString('id-ID')}</strong>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Sisa Uang Saku:</span>
              <strong className="text-black font-black">Rp {remainingBudget.toLocaleString('id-ID')}</strong>
            </div>
          </div>

        </div>

        {/* Right Output */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold text-black flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-black" />
              Paket Rekomendasi Terpilih ({recommendations.length} Gear)
            </h3>
            <span className="text-xs text-neutral-500">
              Terkurasi Otomatis
            </span>
          </div>

          {recommendations.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white border border-neutral-200">
              <p className="text-neutral-500 text-sm">
                Budget terlalu minim untuk paket komplit. Geser slider ke minimal Rp 99.000 untuk VIVAN Super Mini GaN Charger Flash Sale!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {recommendations.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-neutral-200 hover:border-black rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all hover:shadow-md"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="w-16 h-16 rounded-2xl bg-neutral-100 border border-neutral-200 flex items-center justify-center shrink-0 overflow-hidden">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain p-1" />
                      ) : (
                        <span className="text-2xl">{item.imageIcon}</span>
                      )}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-800 border border-neutral-200 inline-block mb-1">
                        {item.tag}
                      </span>
                      <h4 className="text-sm font-bold text-black line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5">{item.studentVerdict}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
                    <div className="text-left sm:text-right">
                      <span className="text-xs text-neutral-400 line-through block">
                        Rp {item.originalPrice.toLocaleString('id-ID')}
                      </span>
                      <span className="text-lg font-black text-black">
                        Rp {item.price.toLocaleString('id-ID')}
                      </span>
                    </div>

                    <a
                      href={item.tokopediaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-black hover:bg-neutral-800 text-white font-bold rounded-xl text-xs transition-colors shadow-sm shrink-0"
                    >
                      <span>Beli Tokopedia</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}

              <div className="p-4 rounded-2xl bg-neutral-100 border border-neutral-300 text-neutral-700 text-xs flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-4 h-4 text-black" />
                  Semua gear di atas bergaransi resmi toko Tokopedia.
                </span>
                <span className="font-bold text-black">100% Amanah</span>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
