import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { dbService } from '../services/dbService';
import { Save, ArrowLeft, Check, Image as ImageIcon, Trash2 } from 'lucide-react';

export const AdminProductFormPage: React.FC = () => {
  const { editingId, setAdminRoute, products } = useApp();

  const [name, setName] = useState('');
  const [brand, setBrand] = useState('Anker Soundcore');
  const [category, setCategory] = useState('ANC TWS');
  const [price, setPrice] = useState<number | ''>(1399000);
  const [oldPrice, setOldPrice] = useState<number | ''>(1999000);
  const [rating, setRating] = useState<number | ''>(4.8);
  const [badge, setBadge] = useState('Best Recommendation');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('/src/assets/images/soundcore_liberty_5_1790729961290.jpg');
  const [status, setStatus] = useState<'published' | 'draft'>('published');
  
  // Specs
  const [anc, setAnc] = useState('Adaptive ANC (-48dB)');
  const [battery, setBattery] = useState('10 Jam (48 Jam Case)');
  const [codec, setCodec] = useState('LDAC, AAC, SBC');
  const [mic, setMic] = useState('6 Mic AI Noise Reduction');
  const [waterRes, setWaterRes] = useState('IPX4');
  const [weight, setWeight] = useState('4.8g per earbud');
  const [conn, setConn] = useState('Bluetooth 5.3 Multipoint');

  // Link
  const [tokopediaUrl, setTokopediaUrl] = useState('https://vt.tokopedia.com/t/ZS9AfThNusdPL-onCes/');

  const [prosInput, setProsInput] = useState('Suara bass punchy\nANC adaptif sunyi');
  const [consInput, setConsInput] = useState('Case licin');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (editingId) {
      const p = products.find(prod => prod.id === editingId);
      if (p) {
        setName(p.name);
        setBrand(p.brand);
        setCategory(p.category);
        setPrice(p.price);
        setOldPrice(p.oldPrice || '');
        setRating(p.rating);
        setBadge(p.badge || '');
        setTagline(p.tagline || '');
        setDescription(p.description);
        setImageUrl(p.imageUrl);
        setStatus(p.status || 'published');
        setAnc(p.specs.anc || '');
        setBattery(p.specs.battery || '');
        setCodec(p.specs.codec || '');
        setMic(p.specs.microphone || '');
        setWaterRes(p.specs.waterResistance || '');
        setWeight(p.specs.weight || '');
        setConn(p.specs.connectivity || '');
        setTokopediaUrl(p.tokopediaUrl || '');
        setProsInput((p.pros || []).join('\n'));
        setConsInput((p.cons || []).join('\n'));
      }
    }
  }, [editingId, products]);

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!name.trim()) errs.name = 'Product name is required.';
    if (!category.trim()) errs.category = 'Category is required.';
    if (!price || Number(price) <= 0) errs.price = 'Price must be a positive number.';
    if (tokopediaUrl && !tokopediaUrl.startsWith('http')) {
      errs.tokopediaUrl = 'Tokopedia Affiliate Link must be a valid URL starting with http:// or https://';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    dbService.saveProduct({
      id: editingId || undefined,
      name,
      brand,
      category,
      price: Number(price),
      oldPrice: oldPrice ? Number(oldPrice) : undefined,
      rating: Number(rating) || 4.8,
      badge,
      tagline,
      description,
      imageUrl,
      status,
      specs: {
        anc,
        battery,
        codec,
        microphone: mic,
        waterResistance: waterRes,
        weight,
        connectivity: conn
      },
      tokopediaUrl,
      pros: prosInput.split('\n').filter(Boolean),
      cons: consInput.split('\n').filter(Boolean)
    });

    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setAdminRoute('products');
    }, 1200);
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* HEADER */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E4E8E5]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setAdminRoute('products')}
            className="p-2 rounded-xl bg-[#F7F8F6] border border-[#E4E8E5] text-black hover:bg-neutral-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="font-display font-black text-xl text-[#080808] uppercase">
              {editingId ? 'EDIT PRODUK TWS' : 'TAMBAH PRODUK BARU'}
            </h2>
            <p className="text-xs text-[#68736D]">Kelola informasi spesifikasi, gambar, dan Tokopedia affiliate link.</p>
          </div>
        </div>

        {saved && (
          <div className="px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black flex items-center gap-1.5 shadow-xs">
            <Check className="w-4 h-4 text-emerald-700" />
            <span>Product Successfully Saved!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* MAIN FORM */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-white border border-[#E4E8E5] shadow-xs space-y-5">
          
          {/* BASIC INFORMATION */}
          <div className="border-b border-[#E4E8E5] pb-4">
            <h3 className="font-display font-black text-sm uppercase text-[#080808] mb-3">
              Basic Information
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-black text-[#080808] uppercase block mb-1">
                  Product Name <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Anker Soundcore Liberty 5 ANC Earbuds"
                  className="w-full p-3 rounded-xl bg-[#F7F8F6] border border-[#E4E8E5] text-xs font-bold text-[#080808] focus:outline-none focus:border-black"
                />
                {errors.name && <p className="text-[11px] font-bold text-rose-600 mt-1">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-black text-[#080808] uppercase block mb-1">Brand / Merk</label>
                  <input
                    type="text"
                    required
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#F7F8F6] border border-[#E4E8E5] text-xs font-bold text-[#080808]"
                  />
                </div>

                <div>
                  <label className="text-xs font-black text-[#080808] uppercase block mb-1">
                    Category <span className="text-rose-600">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#F7F8F6] border border-[#E4E8E5] text-xs font-bold text-[#080808]"
                  >
                    <option value="ANC TWS">ANC TWS</option>
                    <option value="Budget TWS">Budget TWS</option>
                    <option value="Premium TWS">Premium TWS</option>
                    <option value="Gaming TWS">Gaming TWS</option>
                    <option value="Sports TWS">Sports TWS</option>
                  </select>
                  {errors.category && <p className="text-[11px] font-bold text-rose-600 mt-1">{errors.category}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-black text-[#080808] uppercase block mb-1">
                    Harga (Rp) <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : '')}
                    className="w-full p-2.5 rounded-xl bg-[#F7F8F6] border border-[#E4E8E5] text-xs font-bold text-[#080808]"
                  />
                  {errors.price && <p className="text-[11px] font-bold text-rose-600 mt-1">{errors.price}</p>}
                </div>

                <div>
                  <label className="text-xs font-black text-[#080808] uppercase block mb-1">Harga Coret / Normal (Rp)</label>
                  <input
                    type="number"
                    value={oldPrice}
                    onChange={(e) => setOldPrice(e.target.value ? Number(e.target.value) : '')}
                    className="w-full p-2.5 rounded-xl bg-[#F7F8F6] border border-[#E4E8E5] text-xs font-bold text-[#080808]"
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
                    onChange={(e) => setRating(e.target.value ? Number(e.target.value) : '')}
                    className="w-full p-2.5 rounded-xl bg-[#F7F8F6] border border-[#E4E8E5] text-xs font-bold text-[#080808]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-black text-[#080808] uppercase block mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tuliskan ringkasan ulasan produk..."
                  className="w-full p-3 rounded-xl bg-[#F7F8F6] border border-[#E4E8E5] text-xs font-medium text-[#080808] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* AFFILIATE LINK TOKOPEDIA */}
          <div className="border-b border-[#E4E8E5] pb-4 space-y-3">
            <h3 className="font-display font-black text-sm uppercase text-emerald-900 flex items-center gap-1.5">
              <span>Tokopedia Affiliate Link</span>
            </h3>
            
            <div>
              <label className="font-bold block text-[10px] uppercase text-emerald-800 mb-1">
                Tokopedia Affiliate URL
              </label>
              <input
                type="text"
                value={tokopediaUrl}
                onChange={(e) => setTokopediaUrl(e.target.value)}
                placeholder="https://vt.tokopedia.com/t/..."
                className="w-full p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-200 font-mono text-xs text-[#080808] focus:outline-none"
              />
              <p className="text-[10px] text-[#68736D] mt-1">
                Jika diisi, tombol "Beli di Tokopedia" pada katalog publik akan langsung mengarah ke tautan ini.
              </p>
              {errors.tokopediaUrl && <p className="text-[11px] font-bold text-rose-600 mt-1">{errors.tokopediaUrl}</p>}
            </div>
          </div>

          {/* SPECS FORM GRID */}
          <div className="space-y-3">
            <h3 className="font-display font-black text-sm uppercase text-[#080808]">Spesifikasi Teknis</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div><label className="font-bold block text-[10px] uppercase text-[#68736D]">ANC</label><input type="text" value={anc} onChange={e=>setAnc(e.target.value)} className="w-full p-2 rounded-lg bg-[#F7F8F6] border border-[#E4E8E5]" /></div>
              <div><label className="font-bold block text-[10px] uppercase text-[#68736D]">Baterai</label><input type="text" value={battery} onChange={e=>setBattery(e.target.value)} className="w-full p-2 rounded-lg bg-[#F7F8F6] border border-[#E4E8E5]" /></div>
              <div><label className="font-bold block text-[10px] uppercase text-[#68736D]">Audio Codec</label><input type="text" value={codec} onChange={e=>setCodec(e.target.value)} className="w-full p-2 rounded-lg bg-[#F7F8F6] border border-[#E4E8E5]" /></div>
              <div><label className="font-bold block text-[10px] uppercase text-[#68736D]">Mikrofon</label><input type="text" value={mic} onChange={e=>setMic(e.target.value)} className="w-full p-2 rounded-lg bg-[#F7F8F6] border border-[#E4E8E5]" /></div>
              <div><label className="font-bold block text-[10px] uppercase text-[#68736D]">Ketahanan Air</label><input type="text" value={waterRes} onChange={e=>setWaterRes(e.target.value)} className="w-full p-2 rounded-lg bg-[#F7F8F6] border border-[#E4E8E5]" /></div>
              <div><label className="font-bold block text-[10px] uppercase text-[#68736D]">Konektivitas</label><input type="text" value={conn} onChange={e=>setConn(e.target.value)} className="w-full p-2 rounded-lg bg-[#F7F8F6] border border-[#E4E8E5]" /></div>
            </div>
          </div>

        </div>

        {/* RIGHT SIDEBAR: PUBLISHING & IMAGE */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* PUBLISHING STATUS & ACTIONS */}
          <div className="p-6 rounded-3xl bg-white border border-[#E4E8E5] shadow-xs space-y-4">
            <h3 className="font-display font-black text-sm uppercase text-[#080808]">Publishing</h3>
            
            <div>
              <label className="text-xs font-black text-[#080808] uppercase block mb-1.5">Status Produk</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'published' | 'draft')}
                className="w-full p-2.5 rounded-xl bg-[#F7F8F6] border border-[#E4E8E5] text-xs font-bold text-[#080808]"
              >
                <option value="published">Published (Tampil di Katalog Publik)</option>
                <option value="draft">Draft (Sembunyikan dari Publik)</option>
              </select>
            </div>

            <div className="pt-2 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setAdminRoute('products')}
                className="py-3 px-3 rounded-2xl bg-[#F7F8F6] hover:bg-[#E4E8E5] text-[#080808] font-bold text-xs uppercase transition-colors text-center"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="py-3 px-3 rounded-2xl bg-[#B9F43A] hover:bg-[#a3e028] text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md transition-all hover:scale-105"
              >
                <Save className="w-4 h-4" />
                <span>{editingId ? 'Save Changes' : 'Save Product'}</span>
              </button>
            </div>
          </div>

          {/* PRODUCT IMAGE SECTION */}
          <div className="p-6 rounded-3xl bg-white border border-[#E4E8E5] shadow-xs space-y-4">
            <h3 className="font-display font-black text-sm uppercase text-[#080808]">Product Image</h3>

            <div>
              <label className="text-xs font-black text-[#080808] uppercase block mb-1">Image URL</label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://..."
                className="w-full p-2.5 rounded-xl bg-[#F7F8F6] border border-[#E4E8E5] text-xs font-mono text-[#080808]"
              />
            </div>

            <div>
              <label className="text-xs font-black text-[#080808] uppercase block mb-1">Atau Upload File Gambar</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageFileChange}
                className="w-full text-xs font-medium text-[#68736D] file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-[#25282A] file:text-white hover:file:bg-black"
              />
            </div>

            {imageUrl ? (
              <div className="relative w-full h-44 bg-[#F7F8F6] p-3 rounded-2xl border border-[#E4E8E5] flex items-center justify-center group overflow-hidden">
                <img src={imageUrl} alt="Product Preview" className="max-h-full object-contain" />
                <button
                  type="button"
                  onClick={() => setImageUrl('')}
                  className="absolute top-2 right-2 p-1.5 rounded-xl bg-rose-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove Image"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="w-full h-32 bg-[#F7F8F6] rounded-2xl border border-dashed border-[#E4E8E5] flex flex-col items-center justify-center text-[#68736D]">
                <ImageIcon className="w-6 h-6 mb-1 text-neutral-400" />
                <span className="text-xs font-bold">No Image Selected</span>
              </div>
            )}
          </div>

          {/* BADGE & EXTRA */}
          <div className="p-6 rounded-3xl bg-white border border-[#E4E8E5] shadow-xs space-y-3">
            <div>
              <label className="text-xs font-black text-[#080808] uppercase block mb-1">Badge Tag</label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="Contoh: Best Recommendation 2026"
                className="w-full p-2.5 rounded-xl bg-[#F7F8F6] border border-[#E4E8E5] text-xs font-bold text-[#080808]"
              />
            </div>
          </div>

        </div>

      </form>

    </div>
  );
};
