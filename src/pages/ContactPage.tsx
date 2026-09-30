import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, ShieldCheck } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="animate-fadeIn w-full bg-[#FFFFFF] min-h-screen pt-24 pb-20 border-b border-[#E4E8E5]">
      
      <div className="bg-[#F7F8F6] border-b border-[#E4E8E5] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <span className="px-3 py-1 rounded-full bg-white border border-[#E4E8E5] text-[10px] font-black tracking-widest text-[#68736D] uppercase mb-3 inline-block">
            LAYANAN HUBUNGI KAMI
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-[#080808] uppercase tracking-tight">
            CONTACT GADGET HEMATT
          </h1>
          <p className="text-xs sm:text-sm text-[#68736D] font-medium mt-1 max-w-2xl">
            Punya pertanyaan mengenai TWS, rekomendasi kerja sama media, atau pertanyaan seputar tautan affiliasi? Tim kami siap membantu.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          <div className="md:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-[#F7F8F6] border border-[#E4E8E5] space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-black text-[#B9F43A]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-black text-[#68736D] uppercase">EMAIL REDAKSI & KERJA SAMA</div>
                  <div className="text-xs font-bold text-[#080808]">redaksi@gadgethematt.id</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-black text-[#B9F43A]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-black text-[#68736D] uppercase">WHATSAPP OFFICIAL MEDIA</div>
                  <div className="text-xs font-bold text-[#080808]">+62 812-8899-7700</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-black text-[#B9F43A]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-black text-[#68736D] uppercase">KANTOR KAMPUS LAB</div>
                  <div className="text-xs font-bold text-[#080808]">Kawasan Student Tech Hub, Jakarta Selatan</div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-[#F7F8F6] border border-[#E4E8E5] space-y-4">
              <h3 className="font-display font-black text-xl text-[#080808] uppercase">Kirim Pesan Ke Redaksi</h3>

              {submitted && (
                <div className="p-3.5 rounded-2xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Pesan Anda telah berhasil dikirim! Tim kami akan membalas segera.</span>
                </div>
              )}

              <div>
                <label className="text-xs font-black text-[#080808] uppercase tracking-wider block mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama Anda"
                  className="w-full p-3 rounded-xl bg-white border border-[#E4E8E5] text-xs font-medium text-[#080808] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-black text-[#080808] uppercase tracking-wider block mb-1">Alamat Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@domain.com"
                  className="w-full p-3 rounded-xl bg-white border border-[#E4E8E5] text-xs font-medium text-[#080808] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-black text-[#080808] uppercase tracking-wider block mb-1">Pesan / Pertanyaan</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tuliskan pertanyaan atau pesan Anda..."
                  className="w-full p-3 rounded-xl bg-white border border-[#E4E8E5] text-xs font-medium text-[#080808] focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-[#25282A] hover:bg-black text-[#B9F43A] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Pesan Sekarang</span>
              </button>
            </form>
          </div>

        </div>
      </div>

    </div>
  );
};
