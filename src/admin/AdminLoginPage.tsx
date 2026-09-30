import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Lock, Mail, ArrowRight } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const { loginAdmin, navigate } = useApp();
  const [email, setEmail] = useState('admin@gadgethematt.id');
  const [password, setPassword] = useState('admin123');
  const [rememberMe, setRememberMe] = useState(true);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginAdmin();
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center p-4 select-none">
      <div className="w-full max-w-4xl bg-white rounded-3xl border border-[#E4E8E5] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12">
        
        {/* LEFT BRAND SECTION */}
        <div className="md:col-span-5 bg-[#25282A] text-white p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#B9F43A]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#B9F43A] text-black font-black text-xl flex items-center justify-center">
                GH
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-lg tracking-tight text-white uppercase">
                  GADGET HEMATT
                </span>
                <span className="text-[10px] font-extrabold tracking-[0.2em] text-[#B9F43A] uppercase">
                  STUDENT TECH & AUDIO
                </span>
              </div>
            </div>

            <div className="pt-8 space-y-3">
              <h2 className="font-display font-black text-3xl text-white uppercase leading-tight">
                CMS ADMIN PORTAL
              </h2>
              <p className="text-xs text-[#A0A5A8] leading-relaxed font-medium">
                Sistem manajemen konten independen untuk artikel ulasan TWS, katalog produk, link affiliasi marketplace, dan analitik.
              </p>
            </div>
          </div>

          <div className="relative z-10 pt-8 border-t border-white/10 flex items-center gap-2 text-xs font-bold text-[#A0A5A8]">
            <ShieldCheck className="w-4 h-4 text-[#B9F43A]" />
            <span>Secure CMS Panel v2.5</span>
          </div>
        </div>

        {/* RIGHT LOGIN FORM */}
        <div className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-6">
          
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F7F8F6] border border-[#E4E8E5] text-[10px] font-black tracking-widest text-[#68736D] uppercase mb-3">
              <Lock className="w-3 h-3 text-black" />
              AUTHENTICATION REQUIRED
            </div>
            <h3 className="font-display font-black text-2xl text-[#080808] uppercase">
              ADMIN LOGIN
            </h3>
            <p className="text-xs text-[#68736D] mt-1 font-medium">
              Masukkan kredensial administrator Anda untuk mengelola platform.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-black text-[#080808] uppercase block mb-1">Email Administrator</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#68736D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#F7F8F6] border border-[#E4E8E5] text-xs font-bold text-[#080808] focus:outline-none focus:border-[#25282A]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-black text-[#080808] uppercase block mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#68736D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#F7F8F6] border border-[#E4E8E5] text-xs font-bold text-[#080808] focus:outline-none focus:border-[#25282A]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-[#68736D] pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="accent-black w-4 h-4 rounded"
                />
                <span>Remember me</span>
              </label>

              <button type="button" onClick={() => alert('Demo Credentials: admin@gadgethematt.id / admin123')} className="hover:text-black">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-[#25282A] hover:bg-black text-[#B9F43A] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-[1.01]"
            >
              <span>MASUK DASHBOARD CMS</span>
              <ArrowRight className="w-4 h-4 text-[#B9F43A]" />
            </button>
          </form>

          <div className="pt-4 border-t border-[#E4E8E5] flex items-center justify-between text-xs font-bold">
            <button onClick={() => navigate('/')} className="text-[#68736D] hover:text-black">
              ← Kembali ke Website Publik
            </button>
            <span className="text-[10px] text-[#68736D] bg-[#F7F8F6] px-2.5 py-1 rounded-full border border-[#E4E8E5]">
              Demo Mode Active
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
