import React, { useState } from 'react';
import { PRODUCTS_CATALOG } from '../data/mockData';
import { ProductItem } from '../types';
import { ExternalLink, Star, ShieldCheck, Scale, X, ShoppingBag, Truck, Zap } from 'lucide-react';

interface GearArenaProps {
  onSelectProduct?: (product: ProductItem) => void;
}

export const GearArena: React.FC<GearArenaProps> = () => {
  const [compareList, setCompareList] = useState<ProductItem[]>([
    PRODUCTS_CATALOG[0],
    PRODUCTS_CATALOG[1]
  ]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  const toggleCompare = (product: ProductItem) => {
    if (compareList.some(p => p.id === product.id)) {
      setCompareList(compareList.filter(p => p.id !== product.id));
    } else {
      if (compareList.length >= 3) {
        setCompareList([...compareList.slice(1), product]);
      } else {
        setCompareList([...compareList, product]);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-neutral-900 pt-24 pb-24 px-4 sm:px-8 max-w-7xl mx-auto">
      
      {/* Header Banner - Strict Silver, White, and Black Palette */}
      <div className="mb-10 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-neutral-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-100 border border-neutral-300 text-neutral-800 text-xs font-black uppercase tracking-wider mb-2">
            <Zap className="w-3.5 h-3.5 text-black" />
            Katalog Pilihan Terkurasi (Top 3)
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black font-display tracking-tight">
            Gear Arena Mahasiswa
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 mt-1 max-w-xl">
            Rekomendasi 3 gadget esensial mahasiswa terpopuler. Seluruh tautan resmi bergaransi 100% dan bebas ongkir.
          </p>
        </div>

        {/* Compare Trigger Floating Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCompareModal(true)}
            className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-neutral-50 border border-neutral-300 text-neutral-900 text-xs font-bold transition-all shadow-sm hover:border-black"
          >
            <Scale className="w-4 h-4 text-black" />
            <span>Bandingkan Spek ({compareList.length})</span>
            {compareList.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
            )}
          </button>
        </div>
      </div>

      {/* 3 Curated Products Grid - Perfectly Balanced 3-Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 max-w-6xl mx-auto">
        {PRODUCTS_CATALOG.map((product) => {
          const isCompared = compareList.some(p => p.id === product.id);
          const isGoojodoq = product.id === 'goojodoq-j206';

          return (
            <div
              key={product.id}
              className="group relative bg-white hover:bg-neutral-50/40 border border-neutral-200 hover:border-black rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5"
            >
              {/* Product Header & Badges */}
              <div>
                {/* Top Tags Bar */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-black text-white">
                      {product.tag}
                    </span>
                    {product.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-800 border border-neutral-300">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => toggleCompare(product)}
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border transition-colors flex items-center gap-1 ${
                      isCompared
                        ? 'bg-black text-white border-black'
                        : 'text-neutral-500 border-neutral-200 hover:text-black hover:border-neutral-400'
                    }`}
                  >
                    <Scale className="w-3 h-3 text-current" />
                    {isCompared ? 'Terpilih' : '+ Banding'}
                  </button>
                </div>

                {/* Product Image Stage */}
                <div className="w-full h-52 rounded-2xl bg-neutral-100 flex items-center justify-center mb-5 border border-neutral-200 relative overflow-hidden group-hover:border-neutral-400 transition-all">
                  {product.imageUrl ? (
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="w-full h-full object-contain p-2 transform group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <span className="text-6xl transform group-hover:scale-110 transition-transform duration-300">
                      {product.imageIcon}
                    </span>
                  )}

                  {/* Micro Trust Pills (Flash sale / 100% Authentic / Free Shipping) */}
                  <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between text-[9px] font-bold text-neutral-700 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg border border-neutral-200/90 shadow-sm">
                    <span className="flex items-center gap-1 text-black font-extrabold">
                      <Truck className="w-3 h-3 text-black" /> Free shipping
                    </span>
                    <span className="text-neutral-400">•</span>
                    <span className="text-neutral-800">100% Authentic</span>
                  </div>
                </div>

                {/* Rating & Sold Count (from image: 4.8 | 33.3K sold) */}
                <div className="flex items-center gap-2 text-xs text-neutral-800 mb-2">
                  <div className="flex items-center gap-1 font-black text-black bg-neutral-100 px-2 py-0.5 rounded-md border border-neutral-200">
                    <Star className="w-3.5 h-3.5 fill-black text-black" />
                    <span>{product.rating}</span>
                  </div>
                  <span className="text-neutral-500 font-medium">
                    {product.reviewCount >= 1000 ? `${(product.reviewCount / 1000).toFixed(1)}K terjual` : `${product.reviewCount} terjual`}
                  </span>
                  <span className="text-neutral-300">•</span>
                  <span className="text-neutral-600 text-[11px] font-semibold">Beli lokal</span>
                </div>

                {/* Product Title */}
                <h3 className="text-base sm:text-lg font-bold text-black group-hover:text-neutral-900 transition-colors line-clamp-2 mb-2 font-display leading-snug">
                  {product.name}
                </h3>

                {/* Description */}
                <p className="text-xs text-neutral-600 line-clamp-2 mb-4 leading-relaxed">
                  {product.description}
                </p>

                {/* Specs Box */}
                <div className="grid grid-cols-2 gap-2 text-[11px] text-neutral-700 bg-neutral-50 p-3 rounded-2xl border border-neutral-200 mb-4">
                  <div>
                    <span className="block text-[9px] text-neutral-400 font-bold uppercase">Baterai & Daya</span>
                    <span className="font-semibold text-neutral-900 line-clamp-1">{product.specs.battery}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] text-neutral-400 font-bold uppercase">Konektivitas</span>
                    <span className="font-semibold text-neutral-900 line-clamp-1">{product.specs.latency}</span>
                  </div>
                </div>
              </div>

              {/* Price & Primary Link Button to Tokopedia */}
              <div className="pt-4 border-t border-neutral-100">
                {/* Price Display */}
                <div className="flex items-baseline justify-between mb-4">
                  <div>
                    <span className="text-xs text-neutral-400 line-through block font-medium">
                      Rp {product.originalPrice.toLocaleString('id-ID')}
                    </span>
                    <span className="text-2xl font-black text-black font-display tracking-tight">
                      Rp {product.price.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black px-2.5 py-1 rounded-md bg-black text-white">
                      -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </span>
                    <span className="block text-[10px] text-neutral-500 font-bold uppercase mt-1">
                      Flash sale
                    </span>
                  </div>
                </div>

                {/* Primary Direct Affiliate Action Button (Directed to https://vt.tokopedia.com/t/ZS9AfThNusdPL-onCes/) */}
                <a
                  id={`btn-buy-${product.id}`}
                  href={product.tokopediaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 bg-black hover:bg-neutral-800 text-white font-extrabold rounded-2xl text-xs sm:text-sm tracking-wide transition-all shadow-md hover:shadow-xl transform active:scale-[0.98] border border-neutral-800"
                >
                  <ShoppingBag className="w-4 h-4 text-white" />
                  <span>Beli di Tokopedia</span>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-300" />
                </a>

                {/* Secondary Guarantee Tag */}
                <p className="text-[10px] text-neutral-500 text-center mt-2.5 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-black" />
                  <span>100% Authentic • Toko Resmi Tokopedia</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* SPECIFICATION COMPARISON MODAL */}
      {showCompareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl bg-white border border-neutral-300 rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl">
            
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200 mb-6">
              <div>
                <h3 className="text-2xl font-black text-black font-display">
                  Tabel Perbandingan 3 Gear Mahasiswa
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Bandingkan langsung spesifikasi, baterai, koneksi Bluetooth, dan harga resmi.
                </p>
              </div>
              <button
                onClick={() => setShowCompareModal(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 text-neutral-600 hover:text-black hover:bg-neutral-200 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-neutral-200 text-neutral-500">
                    <th className="py-3 px-3 w-1/4 font-bold">Parameter</th>
                    {compareList.map((p) => (
                      <th key={p.id} className="py-3 px-3 font-bold text-black">
                        <div className="flex items-center gap-2">
                          <span className="line-clamp-1">{p.name}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 text-neutral-700">
                  <tr>
                    <td className="py-3 px-3 text-neutral-500 font-semibold">Harga Promo</td>
                    {compareList.map(p => (
                      <td key={p.id} className="py-3 px-3 text-black font-black text-base">
                        Rp {p.price.toLocaleString('id-ID')}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-3 text-neutral-500 font-semibold">Harga Normal</td>
                    {compareList.map(p => (
                      <td key={p.id} className="py-3 px-3 text-neutral-400 line-through">
                        Rp {p.originalPrice.toLocaleString('id-ID')}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-3 text-neutral-500 font-semibold">Baterai & Daya</td>
                    {compareList.map(p => (
                      <td key={p.id} className="py-3 px-3">{p.specs.battery}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-3 text-neutral-500 font-semibold">Koneksi & Latensi</td>
                    {compareList.map(p => (
                      <td key={p.id} className="py-3 px-3 text-black font-bold">{p.specs.latency}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-3 text-neutral-500 font-semibold">Kenyamanan & Bobot</td>
                    {compareList.map(p => (
                      <td key={p.id} className="py-3 px-3">{p.specs.weight}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-3 text-neutral-500 font-semibold">Jaminan Produk</td>
                    {compareList.map(p => (
                      <td key={p.id} className="py-3 px-3 text-neutral-900 font-medium">{p.specs.warranty}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-3 text-neutral-500 font-semibold">Verdict Mahasiswa</td>
                    {compareList.map(p => (
                      <td key={p.id} className="py-3 px-3 text-xs italic text-neutral-600">{p.studentVerdict}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-3 text-neutral-500 font-semibold">Tautan Beli Tokopedia</td>
                    {compareList.map(p => (
                      <td key={p.id} className="py-3 px-3">
                        <a
                          href={p.tokopediaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-black hover:bg-neutral-800 text-white rounded-xl text-xs font-bold text-center shadow-sm"
                        >
                          <span>Beli di Tokopedia</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
