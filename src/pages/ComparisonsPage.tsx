import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductItem } from '../types';
import { Check, X, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';

export const ComparisonsPage: React.FC = () => {
  const { products, navigate, openAffiliateModal } = useApp();

  const [selectedIds, setSelectedIds] = useState<string[]>([
    products[0]?.id || 'prod-1',
    products[1]?.id || 'prod-2',
    products[2]?.id || 'prod-3'
  ]);

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 2) {
        setSelectedIds(selectedIds.filter(i => i !== id));
      }
    } else {
      if (selectedIds.length < 4) {
        setSelectedIds([...selectedIds, id]);
      }
    }
  };

  const selectedProducts = products.filter(p => selectedIds.includes(p.id));

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="animate-fadeIn w-full bg-[#FFFFFF] min-h-screen pt-24 pb-20 border-b border-[#E4E8E5]">
      
      {/* HEADER */}
      <div className="bg-[#F7F8F6] border-b border-[#E4E8E5] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E4E8E5] text-[10px] font-black tracking-widest text-[#68736D] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-black" />
            MULTI-PRODUCT COMPARISON MATRIX
          </div>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-[#080808] uppercase tracking-tight">
            TWS COMPARISONS
          </h1>
          <p className="text-xs sm:text-sm text-[#68736D] font-medium mt-1 max-w-2xl">
            Bandingkan spesifikasi teknis, harga, ketahanan baterai, performa ANC, dan fitur utama hingga 4 model TWS secara berdampingan.
          </p>

          {/* SELECTOR PILLS */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="text-xs font-black text-[#080808] uppercase tracking-wider mr-2">Pilih TWS untuk Dibandingkan:</span>
            {products.map(p => {
              const isSelected = selectedIds.includes(p.id);
              return (
                <button
                  key={p.id}
                  onClick={() => toggleSelect(p.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all flex items-center gap-1.5 border ${
                    isSelected
                      ? 'bg-[#25282A] text-[#B9F43A] border-[#25282A]'
                      : 'bg-white text-[#68736D] hover:text-black border-[#E4E8E5]'
                  }`}
                >
                  <span>{p.name.split(' ')[0]} {p.name.split(' ')[1]}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#B9F43A]" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* COMPARISON MATRIX TABLE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="overflow-x-auto scrollbar-none rounded-3xl border border-[#E4E8E5] shadow-sm bg-white">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-[#F7F8F6] border-b border-[#E4E8E5]">
                <th className="p-4 w-48 text-xs font-black text-[#080808] uppercase tracking-wider">Fitur & Spesifikasi</th>
                {selectedProducts.map(p => (
                  <th key={p.id} className="p-4 text-center min-w-[200px] border-l border-[#E4E8E5]">
                    <div className="flex flex-col items-center">
                      <img src={p.imageUrl} alt={p.name} className="w-24 h-24 object-contain mb-2 p-2 bg-white rounded-2xl border border-[#E4E8E5]" />
                      <span className="text-[10px] font-black uppercase text-[#68736D]">{p.brand}</span>
                      <h4 className="font-display font-black text-sm text-[#080808] line-clamp-1">{p.name}</h4>
                      <span className="font-black text-sm text-[#080808] mt-1">{formatRupiah(p.price)}</span>
                      <button
                        onClick={() => openAffiliateModal(p)}
                        className="mt-2 px-3 py-1.5 rounded-full bg-[#25282A] hover:bg-black text-[#B9F43A] font-black text-[10px] uppercase tracking-wider flex items-center gap-1"
                      >
                        <span>Cek Harga</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-[#E4E8E5] text-xs font-medium text-[#080808]">
              <tr>
                <td className="p-4 font-black uppercase bg-[#F7F8F6]">Rating Editorial</td>
                {selectedProducts.map(p => (
                  <td key={p.id} className="p-4 text-center border-l border-[#E4E8E5] font-black text-sm text-[#080808]">
                    ★ {p.rating} / 5 ({p.reviewCount})
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-black uppercase bg-[#F7F8F6]">Noise Cancelling (ANC)</td>
                {selectedProducts.map(p => (
                  <td key={p.id} className="p-4 text-center border-l border-[#E4E8E5]">
                    {p.specs.anc}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-black uppercase bg-[#F7F8F6]">Daya Tahan Baterai</td>
                {selectedProducts.map(p => (
                  <td key={p.id} className="p-4 text-center border-l border-[#E4E8E5]">
                    {p.specs.battery}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-black uppercase bg-[#F7F8F6]">Bluetooth Codec</td>
                {selectedProducts.map(p => (
                  <td key={p.id} className="p-4 text-center border-l border-[#E4E8E5]">
                    <span className="px-2.5 py-1 rounded-md bg-[#F7F8F6] border border-[#E4E8E5] font-extrabold">
                      {p.specs.codec}
                    </span>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-black uppercase bg-[#F7F8F6]">Mikrofon Panggilan</td>
                {selectedProducts.map(p => (
                  <td key={p.id} className="p-4 text-center border-l border-[#E4E8E5]">
                    {p.specs.microphone}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-black uppercase bg-[#F7F8F6]">Ketahanan Air (IP Rating)</td>
                {selectedProducts.map(p => (
                  <td key={p.id} className="p-4 text-center border-l border-[#E4E8E5]">
                    {p.specs.waterResistance}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-black uppercase bg-[#F7F8F6]">Bobot per Earbud</td>
                {selectedProducts.map(p => (
                  <td key={p.id} className="p-4 text-center border-l border-[#E4E8E5]">
                    {p.specs.weight}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-black uppercase bg-[#F7F8F6]">Multipoint Connection</td>
                {selectedProducts.map(p => (
                  <td key={p.id} className="p-4 text-center border-l border-[#E4E8E5]">
                    {p.specs.multipoint || 'Ya'}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-black uppercase bg-[#F7F8F6]">Kelebihan Utama</td>
                {selectedProducts.map(p => (
                  <td key={p.id} className="p-4 text-left border-l border-[#E4E8E5] align-top">
                    <ul className="space-y-1 text-[11px] text-emerald-800 font-semibold">
                      {p.pros.slice(0, 2).map((pr, i) => (
                        <li key={i}>✓ {pr}</li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
