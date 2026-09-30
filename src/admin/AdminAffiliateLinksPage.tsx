import React from 'react';
import { useApp } from '../context/AppContext';
import { Link, ExternalLink, MousePointerClick, ShieldCheck } from 'lucide-react';

export const AdminAffiliateLinksPage: React.FC = () => {
  const { affiliateLinks, products } = useApp();

  return (
    <div className="space-y-6 animate-fadeIn">
      
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-black text-2xl text-[#080808] uppercase">MANAJEMEN LINK AFFILIASI</h2>
          <p className="text-xs text-[#68736D] mt-0.5">Pantau jumlah klik per marketplace (Shopee, Tokopedia, Lazada).</p>
        </div>
      </div>

      <div className="p-6 rounded-3xl bg-white border border-[#E4E8E5] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E4E8E5] bg-[#F7F8F6] text-[#68736D] font-black uppercase tracking-wider">
                <th className="p-3">Produk</th>
                <th className="p-3">Marketplace</th>
                <th className="p-3">Affiliate URL</th>
                <th className="p-3">Total Klik Redirect</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E8E5] font-medium text-[#080808]">
              {affiliateLinks.map(aff => (
                <tr key={aff.id} className="hover:bg-[#F7F8F6]">
                  <td className="p-3 font-bold text-[#080808]">{aff.productName}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-0.5 rounded-full font-black text-[10px] uppercase ${
                      aff.marketplace === 'shopee' ? 'bg-orange-100 text-orange-800' :
                      aff.marketplace === 'tokopedia' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {aff.marketplace}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-[#68736D] max-w-xs truncate">{aff.affiliateUrl}</td>
                  <td className="p-3 font-black text-emerald-700">{aff.clicks} Clicks</td>
                  <td className="p-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                      {aff.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
