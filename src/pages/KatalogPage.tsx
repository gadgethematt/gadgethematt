import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Filter, Star, ExternalLink, X, RotateCcw, ShieldCheck } from 'lucide-react';

export const KatalogPage: React.FC = () => {
  const { products, navigate, openAffiliateModal } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [priceRange, setPriceRange] = useState('all'); // 'under-300', '300-500', '500-1m', '1m-2m', 'above-2m'
  const [ancOnly, setAncOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [mobileFilterOpen, setMobileMenuOpen] = useState(false);

  const brands = useMemo(() => {
    const b = new Set(products.map(p => p.brand));
    return Array.from(b);
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match = p.name.toLowerCase().includes(q) || 
                      p.brand.toLowerCase().includes(q) || 
                      p.category.toLowerCase().includes(q) ||
                      p.description.toLowerCase().includes(q);
        if (!match) return false;
      }

      // Brand
      if (selectedBrand !== 'all' && p.brand !== selectedBrand) return false;

      // ANC
      if (ancOnly && (!p.specs.anc || p.specs.anc.toLowerCase().includes('tidak'))) return false;

      // Rating
      if (minRating > 0 && p.rating < minRating) return false;

      // Price Range
      if (priceRange === 'under-300' && p.price >= 300000) return false;
      if (priceRange === '300-500' && (p.price < 300000 || p.price > 500000)) return false;
      if (priceRange === '500-1m' && (p.price < 500000 || p.price > 1000000)) return false;
      if (priceRange === '1m-2m' && (p.price < 1000000 || p.price > 2000000)) return false;
      if (priceRange === 'above-2m' && p.price <= 2000000) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (a.rank || 99) - (b.rank || 99);
    });
  }, [products, searchQuery, selectedBrand, priceRange, ancOnly, minRating, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedBrand('all');
    setPriceRange('all');
    setAncOnly(false);
    setMinRating(0);
    setSortBy('featured');
  };

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="animate-fadeIn w-full bg-[#FFFFFF] min-h-screen pt-24 pb-16 border-b border-[#E4E8E5]">
      
      {/* HEADER SECTION */}
      <div className="bg-[#F7F8F6] border-b border-[#E4E8E5] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E4E8E5] text-[10px] font-black tracking-widest text-[#68736D] uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B9F43A]" />
            KATALOG RESMI TWS
          </div>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-[#080808] uppercase tracking-tight">
            KATALOG TWS
          </h1>
          <p className="text-xs sm:text-sm text-[#68736D] font-medium mt-1 max-w-2xl">
            Temukan TWS berdasarkan fitur, harga, brand, dan kebutuhan. Diuji dan dikurasi independen oleh tim laboratorium GADGET HEMATT.
          </p>

          {/* Search bar inside Header */}
          <div className="mt-6 max-w-xl relative">
            <Search className="w-5 h-5 text-[#68736D] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari TWS, brand (Anker, Apple, Sony), fitur (ANC, LDAC)..."
              className="w-full pl-12 pr-4 py-3.5 rounded-full bg-white border border-[#E4E8E5] text-sm text-[#080808] placeholder-[#68736D] font-medium focus:outline-none focus:border-[#25282A] shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#68736D] hover:text-black font-bold"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* DESKTOP SIDEBAR FILTERS */}
          <aside className="hidden lg:block w-64 shrink-0 space-y-6 select-none">
            <div className="p-5 rounded-3xl bg-[#F7F8F6] border border-[#E4E8E5] space-y-6">
              
              <div className="flex items-center justify-between pb-3 border-b border-[#E4E8E5]">
                <div className="flex items-center gap-2 font-display font-black text-sm text-[#080808] uppercase tracking-wider">
                  <Filter className="w-4 h-4 text-black" />
                  <span>FILTER PRODUK</span>
                </div>
                <button
                  onClick={resetFilters}
                  className="text-[11px] font-bold text-[#68736D] hover:text-black flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="text-xs font-black text-[#080808] uppercase tracking-wider block mb-2">
                  RENTANG HARGA
                </label>
                <div className="space-y-1.5 text-xs text-[#68736D]">
                  {[
                    { id: 'all', label: 'Semua Harga' },
                    { id: 'under-300', label: 'Di bawah Rp300Ribu' },
                    { id: '300-500', label: 'Rp300Ribu – Rp500Ribu' },
                    { id: '500-1m', label: 'Rp500Ribu – Rp1 Juta' },
                    { id: '1m-2m', label: 'Rp1 Juta – Rp2 Juta' },
                    { id: 'above-2m', label: 'Di atas Rp2 Juta' },
                  ].map(p => (
                    <label key={p.id} className="flex items-center gap-2 cursor-pointer hover:text-black py-0.5">
                      <input
                        type="radio"
                        name="priceRange"
                        checked={priceRange === p.id}
                        onChange={() => setPriceRange(p.id)}
                        className="accent-black"
                      />
                      <span className={priceRange === p.id ? 'font-black text-[#080808]' : ''}>{p.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              <div>
                <label className="text-xs font-black text-[#080808] uppercase tracking-wider block mb-2">
                  BRAND / MERK
                </label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white border border-[#E4E8E5] text-xs font-bold text-[#080808] focus:outline-none"
                >
                  <option value="all">Semua Brand ({brands.length})</option>
                  {brands.map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              {/* Features (ANC) */}
              <div>
                <label className="text-xs font-black text-[#080808] uppercase tracking-wider block mb-2">
                  FITUR SPESIFIK
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#080808]">
                  <input
                    type="checkbox"
                    checked={ancOnly}
                    onChange={(e) => setAncOnly(e.target.checked)}
                    className="accent-black w-4 h-4 rounded"
                  />
                  <span>Hanya dengan ANC Active</span>
                </label>
              </div>

              {/* Rating */}
              <div>
                <label className="text-xs font-black text-[#080808] uppercase tracking-wider block mb-2">
                  MINIMAL RATING
                </label>
                <div className="flex gap-2">
                  {[0, 4.5, 4.8].map(r => (
                    <button
                      key={r}
                      onClick={() => setMinRating(r)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                        minRating === r
                          ? 'bg-[#25282A] text-[#B9F43A] border-[#25282A]'
                          : 'bg-white text-[#68736D] border-[#E4E8E5] hover:text-black'
                      }`}
                    >
                      {r === 0 ? 'Semua' : `${r}★+`}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </aside>

          {/* MAIN PRODUCT GRID AREA */}
          <main className="flex-1">
            
            {/* Top Toolbar: Mobile Filter Trigger & Sort dropdown */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#E4E8E5]">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="lg:hidden px-4 py-2 rounded-xl bg-[#F7F8F6] border border-[#E4E8E5] text-xs font-extrabold text-[#080808] flex items-center gap-2"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>

                <div className="text-xs text-[#68736D] font-medium">
                  Menampilkan <strong className="text-[#080808] font-black">{filteredProducts.length}</strong> TWS Terverifikasi
                </div>
              </div>

              {/* Sort By */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#68736D] font-bold uppercase tracking-wider">Urutkan:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as unknown as typeof sortBy)}
                  className="px-3 py-1.5 rounded-xl bg-[#F7F8F6] border border-[#E4E8E5] text-xs font-black text-[#080808] focus:outline-none cursor-pointer"
                >
                  <option value="featured">Rekomendasi Utama</option>
                  <option value="price-asc">Harga: Termurah</option>
                  <option value="price-desc">Harga: Termahal</option>
                  <option value="rating">Rating Tertinggi</option>
                </select>
              </div>
            </div>

            {/* PRODUCT GRID */}
            {filteredProducts.length === 0 ? (
              <div className="py-16 text-center bg-[#F7F8F6] rounded-3xl border border-[#E4E8E5]">
                <div className="w-12 h-12 rounded-full bg-[#E4E8E5] flex items-center justify-center mx-auto mb-3 text-[#68736D]">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="font-display font-black text-lg text-[#080808] mb-1">
                  Tidak Ada TWS Sesuai Filter
                </h3>
                <p className="text-xs text-[#68736D] mb-4">
                  Coba atur ulang batas harga atau kata kunci pencarian Anda.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 rounded-full bg-[#25282A] text-white text-xs font-bold uppercase tracking-wider"
                >
                  Reset Semua Filter
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-3xl p-5 border border-[#E4E8E5] hover:border-[#25282A] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative"
                  >
                    {/* Top Tag & Rating */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-black tracking-wider uppercase px-2.5 py-1 rounded-full bg-[#B9F43A] text-black">
                        {item.category}
                      </span>
                      
                      <div className="flex items-center gap-1 bg-[#F7F8F6] px-2 py-0.5 rounded-full border border-[#E4E8E5]">
                        <Star className="w-3 h-3 fill-[#080808] text-[#080808]" />
                        <span className="text-[11px] font-black text-[#080808]">{item.rating}</span>
                        <span className="text-[9px] text-[#68736D]">({item.reviewCount})</span>
                      </div>
                    </div>

                    {/* Image */}
                    <div 
                      onClick={() => navigate(`/products/${item.slug}`)}
                      className="relative w-full h-48 my-2 rounded-2xl bg-[#F7F8F6] p-4 flex items-center justify-center cursor-pointer group-hover:bg-slate-100 transition-colors"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Details */}
                    <div>
                      <div className="text-[10px] font-extrabold text-[#68736D] uppercase tracking-wider mb-1">
                        {item.brand}
                      </div>

                      <h3 
                        onClick={() => navigate(`/products/${item.slug}`)}
                        className="font-display font-black text-base text-[#080808] leading-tight group-hover:text-black transition-colors cursor-pointer line-clamp-2 min-h-[2.5rem]"
                      >
                        {item.name}
                      </h3>

                      {/* Specs Tags */}
                      <div className="flex flex-wrap gap-1 my-3">
                        <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-[#F7F8F6] border border-[#E4E8E5] text-[#080808]">
                          {item.specs.anc}
                        </span>
                        <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-[#F7F8F6] border border-[#E4E8E5] text-[#080808]">
                          {item.specs.codec}
                        </span>
                        <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-[#F7F8F6] border border-[#E4E8E5] text-[#080808]">
                          {item.specs.battery}
                        </span>
                      </div>

                      {/* Pricing */}
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="font-display font-black text-lg text-[#080808]">
                          {formatRupiah(item.price)}
                        </span>
                        {item.oldPrice && (
                          <span className="text-xs text-[#68736D] line-through font-medium">
                            {formatRupiah(item.oldPrice)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#E4E8E5]">
                      <button
                        onClick={() => navigate(`/products/${item.slug}`)}
                        className="py-2.5 px-3 rounded-xl bg-[#F7F8F6] hover:bg-[#E4E8E5] text-[#080808] font-extrabold text-[11px] tracking-wide uppercase transition-colors text-center"
                      >
                        Detail & Review
                      </button>

                      <button
                        onClick={() => openAffiliateModal(item)}
                        className="py-2.5 px-3 rounded-xl bg-[#25282A] hover:bg-black text-[#B9F43A] font-black text-[11px] tracking-wide uppercase transition-colors flex items-center justify-center gap-1 shadow-sm"
                      >
                        <span>Cek Harga</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}

          </main>

        </div>
      </div>

      {/* MOBILE FILTER MODAL DRAWER */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-[#E4E8E5] max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#E4E8E5] mb-4">
              <span className="font-display font-black text-base text-[#080808] uppercase">FILTER KATALOG TWS</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-[#68736D] hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Price */}
              <div>
                <label className="text-xs font-black text-[#080808] uppercase tracking-wider block mb-2">RENTANG HARGA</label>
                <div className="space-y-1 text-xs text-[#68736D]">
                  {[
                    { id: 'all', label: 'Semua Harga' },
                    { id: 'under-300', label: 'Di bawah Rp300Ribu' },
                    { id: '300-500', label: 'Rp300Ribu – Rp500Ribu' },
                    { id: '500-1m', label: 'Rp500Ribu – Rp1 Juta' },
                    { id: '1m-2m', label: 'Rp1 Juta – Rp2 Juta' },
                    { id: 'above-2m', label: 'Di atas Rp2 Juta' },
                  ].map(p => (
                    <label key={p.id} className="flex items-center gap-2 py-1">
                      <input
                        type="radio"
                        name="mobilePrice"
                        checked={priceRange === p.id}
                        onChange={() => setPriceRange(p.id)}
                        className="accent-black"
                      />
                      <span>{p.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brand */}
              <div>
                <label className="text-xs font-black text-[#080808] uppercase tracking-wider block mb-2">BRAND</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#E4E8E5] text-xs font-bold"
                >
                  <option value="all">Semua Brand</option>
                  {brands.map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              {/* ANC */}
              <label className="flex items-center gap-2 text-xs font-bold text-[#080808]">
                <input
                  type="checkbox"
                  checked={ancOnly}
                  onChange={(e) => setAncOnly(e.target.checked)}
                  className="accent-black w-4 h-4"
                />
                <span>Hanya dengan ANC Active</span>
              </label>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-2xl bg-[#25282A] text-white font-black text-xs uppercase tracking-wider"
              >
                Terapkan Filter ({filteredProducts.length} Produk)
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
