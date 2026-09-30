import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { dbService } from '../services/dbService';
import { Save, ArrowLeft, Check } from 'lucide-react';

export const AdminProductFormPage: React.FC = () => {
  const { editingId, setAdminRoute, products } = useApp();

  const [name, setName] = useState('');
  const [brand, setBrand] = useState('Anker Soundcore');
  const [category, setCategory] = useState('ANC TWS');
  const [price, setPrice] = useState(1399000);
  const [oldPrice, setOldPrice] = useState(1999000);
  const [rating, setRating] = useState(4.8);
  const [badge, setBadge] = useState('Best Recommendation');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('/src/assets/images/soundcore_liberty_5_1790729961290.jpg');
  
  // Specs
  const [anc, setAnc] = useState('Adaptive ANC (-48dB)');
  const [battery, setBattery] = useState('10 Jam (48 Jam Case)');
  const [codec, setCodec] = useState('LDAC, AAC, SBC');
  const [mic, setMic] = useState('6 Mic AI Noise Reduction');
  const [waterRes, setWaterRes] = useState('IPX4');
  const [weight, setWeight] = useState('4.8g per earbud');
  const [conn, setConn] = useState('Bluetooth 5.3 Multipoint');

  // Links
  const [shopeeUrl, setShopeeUrl] = useState('https://shopee.co.id');
  const [tokopediaUrl, setTokopediaUrl] = useState('https://vt.tokopedia.com/t/ZS9AfThNusdPL-onCes/');
  const [lazadaUrl, setLazadaUrl] = useState('https://lazada.co.id');

  const [prosInput, setProsInput] = useState('Suara bass punchy\nANC adaptif sunyi');
  const [consInput, setConsInput] = useState('Case licin');

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (editingId) {
      const p = products.find(prod => prod.id === editingId);
      if (p) {
        setName(p.name);
        setBrand(p.brand);
        setCategory(p.category);
        setPrice(p.price);
        setOldPrice(p.oldPrice || p.price);
        setRating(p.rating);
        setBadge(p.badge || '');
        setTagline(p.tagline || '');
        setDescription(p.description);
        setImageUrl(p.imageUrl);
        setAnc(p.specs.anc);
        setBattery(p.specs.battery);
        setCodec(p.specs.codec);
        setMic(p.specs.microphone);
        setWaterRes(p.specs.waterResistance);
        setWeight(p.specs.weight);
        setConn(p.specs.connectivity);
        setShopeeUrl(p.shopeeUrl);
        setTokopediaUrl(p.tokopediaUrl);
        setLazadaUrl(p.lazadaUrl || '');
        setProsInput((p.pros || []).join('\n'));
        setConsInput((p.cons || []).join('\n'));
      }
    }
  }, [editingId, products]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dbService.saveProduct({
      id: editingId || undefined,
      name,
      brand,
      category,
      price: Number(price),
      oldPrice: Number(oldPrice),
      rating: Number(rating),
      badge,
      tagline,
      description,
      imageUrl,
      specs: {
        anc,
        battery,
        codec,
        microphone: mic,
        waterResistance: waterRes,
        weight,
        connectivity: conn
      },
      shopeeUrl,
      tokopediaUrl,
      lazadaUrl,
      pros: prosInput.split('\n').filter(Boolean),
      cons: consInput.split('\n').filter(Boolean)
    });

    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setAdminRoute('products');
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* HEADER */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E4E8E5]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setAdminRoute('products')}
            className="p-2 rounded-xl bg-[#F7F8F6] border border-[#E4E8E5] text-black hover:bg-neutral-200"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="font-display font-black text-xl text-[#080808] uppercase">
              {editingId ? 'EDIT PRODUK TWS' : 'TAMBAH PRODUK BARU'}
            </h2>
            <p className="text-xs text-[#68736D]">Kelola informasi spesifikasi & link affiliasi marketplace.</p>
          </div>
        </div>

        {saved && (
          <div className="px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-700" />
            <span>Produk Berhasil Disimpan!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* MAIN FORM */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-white border border-[#E4E8E5] shadow-sm space-y-5">
          
          <div>
            <label className="text-xs font-black text-[#080808] uppercase block mb-1">Nama Lengkap Produk TWS</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#F7F8F6] border border-[#E4E8E5] text-sm font-bold text-[#080808] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-black text-[#080808] uppercase block mb-1">Brand / Merk</label>
              <input
                type="text"
                required
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#F7F8F6] border border-[#E4E8E5] text-xs font-bold"
              />
            </div>

            <div>
              <label className="text-xs font-black text-[#080808] uppercase block mb-1">Kategori TWS</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#F7F8F6] border border-[#E4E8E5] text-xs font-bold"
              >
                <option value="ANC TWS">ANC TWS</option>
                <option value="Budget TWS">Budget TWS</option>
                <option value="Premium TWS">Premium TWS</option>
                <option value="Gaming TWS">Gaming TWS</option>
                <option value="Sports TWS">Sports TWS</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-black text-[#080808] uppercase block mb-1">Harga Promo (Rp)</label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl bg-[#F7F8F6] border border-[#E4E8E5] text-xs font-bold"
              />
            </div>

            <div>
              <label className="text-xs font-black text-[#080808] uppercase block mb-1">Harga Normal (Rp)</label>
              <input
                type="number"
                value={oldPrice}
                onChange={(e) => setOldPrice(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl bg-[#F7F8F6] border border-[#E4E8E5] text-xs font-bold"
              />
            </div>

            <div>
              <label className="text-xs font-black text-[#080808] uppercase block mb-1">Rating (1-5)</label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl bg-[#F7F8F6] border border-[#E4E8E5] text-xs font-bold"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-black text-[#080808] uppercase block mb-1">Deskripsi & Verdict Ringkas</label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#F7F8F6] border border-[#E4E8E5] text-xs font-medium text-[#080808] focus:outline-none"
            />
          </div>

          {/* SPECS FORM GRID */}
          <div className="p-4 rounded-2xl bg-[#F7F8F6] border border-[#E4E8E5] space-y-3">
            <span className="text-xs font-black text-[#080808] uppercase block">Spesifikasi Teknis</span>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div><label className="font-bold block text-[10px] uppercase text-[#68736D]">ANC</label><input type="text" value={anc} onChange={e=>setAnc(e.target.value)} className="w-full p-2 rounded-lg bg-white border border-[#E4E8E5]" /></div>
              <div><label className="font-bold block text-[10px] uppercase text-[#68736D]">Baterai</label><input type="text" value={battery} onChange={e=>setBattery(e.target.value)} className="w-full p-2 rounded-lg bg-white border border-[#E4E8E5]" /></div>
              <div><label className="font-bold block text-[10px] uppercase text-[#68736D]">Audio Codec</label><input type="text" value={codec} onChange={e=>setCodec(e.target.value)} className="w-full p-2 rounded-lg bg-white border border-[#E4E8E5]" /></div>
              <div><label className="font-bold block text-[10px] uppercase text-[#68736D]">Mikrofon</label><input type="text" value={mic} onChange={e=>setMic(e.target.value)} className="w-full p-2 rounded-lg bg-white border border-[#E4E8E5]" /></div>
              <div><label className="font-bold block text-[10px] uppercase text-[#68736D]">Ketahanan Air</label><input type="text" value={waterRes} onChange={e=>setWaterRes(e.target.value)} className="w-full p-2 rounded-lg bg-white border border-[#E4E8E5]" /></div>
              <div><label className="font-bold block text-[10px] uppercase text-[#68736D]">Konektivitas</label><input type="text" value={conn} onChange={e=>setConn(e.target.value)} className="w-full p-2 rounded-lg bg-white border border-[#E4E8E5]" /></div>
            </div>
          </div>

          {/* AFFILIATE URLS */}
          <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-200 space-y-3">
            <span className="text-xs font-black text-orange-950 uppercase block">Affiliate Marketplace Links</span>
            
            <div className="space-y-2 text-xs">
              <div>
                <label className="font-extrabold block text-[10px] text-orange-900 uppercase">Shopee Affiliate URL</label>
                <input type="text" value={shopeeUrl} onChange={e=>setShopeeUrl(e.target.value)} className="w-full p-2 rounded-lg bg-white border border-orange-200 font-mono text-[11px]" />
              </div>
              <div>
                <label className="font-extrabold block text-[10px] text-emerald-900 uppercase">Tokopedia Affiliate URL</label>
                <input type="text" value={tokopediaUrl} onChange={e=>setTokopediaUrl(e.target.value)} className="w-full p-2 rounded-lg bg-white border border-emerald-200 font-mono text-[11px]" />
              </div>
              <div>
                <label className="font-extrabold block text-[10px] text-blue-900 uppercase">Lazada Affiliate URL</label>
                <input type="text" value={lazadaUrl} onChange={e=>setLazadaUrl(e.target.value)} className="w-full p-2 rounded-lg bg-white border border-blue-200 font-mono text-[11px]" />
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT ACTIONS */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-[#E4E8E5] shadow-sm space-y-5">
            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-[#B9F43A] hover:bg-[#a3e028] text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all hover:scale-105"
            >
              <Save className="w-4 h-4" />
              <span>{editingId ? 'SIMPAN PERUBAHAN' : 'TAMBAHKAN PRODUK'}</span>
            </button>

            <div>
              <label className="text-xs font-black text-[#080808] uppercase block mb-1">Badge Tag</label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="Contoh: Best Value / Terlaris"
                className="w-full p-2.5 rounded-xl bg-[#F7F8F6] border border-[#E4E8E5] text-xs font-bold"
              />
            </div>

            <div>
              <label className="text-xs font-black text-[#080808] uppercase block mb-1">Gambar Produk (URL Image)</label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#F7F8F6] border border-[#E4E8E5] text-xs font-mono"
              />
              {imageUrl && (
                <div className="w-full h-40 bg-[#F7F8F6] p-3 rounded-xl mt-2 border border-[#E4E8E5] flex items-center justify-center">
                  <img src={imageUrl} alt="Preview" className="max-h-full object-contain" />
                </div>
              )}
            </div>

          </div>
        </div>

      </form>

    </div>
  );
};
