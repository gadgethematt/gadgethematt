import React, { useState } from 'react';
import { Save, Check } from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const [brandName, setBrandName] = useState('GADGET HEMATT');
  const [subtitle, setSubtitle] = useState('STUDENT TECH & AUDIO');
  const [tokopediaTag, setTokopediaTag] = useState('gadgethematt_tokopedia');
  const [disclosureText, setAffiliateDisclosure] = useState('Disclosure: Some links on GADGET HEMATT are affiliate links. We may earn a commission if you purchase through our links, at no additional cost to you.');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl">
      
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-black text-2xl text-[#080808] uppercase">PENGATURAN PLATFORM CMS</h2>
          <p className="text-xs text-[#68736D] mt-0.5">Pengaturan identitas brand, tag tracking Tokopedia affiliate, dan teks legal disclosure.</p>
        </div>

        {saved && (
          <div className="px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black flex items-center gap-1.5 shadow-xs">
            <Check className="w-4 h-4 text-emerald-700" />
            <span>Pengaturan Berhasil Disimpan!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="p-8 rounded-3xl bg-white border border-[#E4E8E5] shadow-xs space-y-6">
        
        <div className="space-y-4">
          <h3 className="font-display font-black text-base text-[#080808] uppercase border-b border-[#E4E8E5] pb-2">
            Identitas Brand & Subtitle
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-black text-[#080808] uppercase block mb-1">Nama Brand Utama</label>
              <input
                type="text"
                value={brandName}
                onChange={e => setBrandName(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#F7F8F6] border border-[#E4E8E5] text-xs font-bold"
              />
            </div>

            <div>
              <label className="text-xs font-black text-[#080808] uppercase block mb-1">Subtitle Tagline</label>
              <input
                type="text"
                value={subtitle}
                onChange={e => setSubtitle(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#F7F8F6] border border-[#E4E8E5] text-xs font-bold"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-display font-black text-base text-[#080808] uppercase border-b border-[#E4E8E5] pb-2">
            Tokopedia Tracking ID
          </h3>

          <div>
            <label className="text-xs font-black text-[#080808] uppercase block mb-1">Tokopedia Affiliate Sub-ID</label>
            <input
              type="text"
              value={tokopediaTag}
              onChange={e => setTokopediaTag(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#F7F8F6] border border-[#E4E8E5] text-xs font-mono"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black text-[#080808] uppercase block">Affiliate Legal Disclosure Text</label>
          <textarea
            rows={3}
            value={disclosureText}
            onChange={e => setAffiliateDisclosure(e.target.value)}
            className="w-full p-3 rounded-xl bg-[#F7F8F6] border border-[#E4E8E5] text-xs font-medium text-[#080808] focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="px-6 py-3 rounded-2xl bg-[#B9F43A] text-black font-black text-xs uppercase tracking-wider hover:bg-[#a3e028] transition-all flex items-center gap-2 shadow-md"
        >
          <Save className="w-4 h-4" />
          <span>Simpan Seluruh Pengaturan</span>
        </button>

      </form>

    </div>
  );
};
