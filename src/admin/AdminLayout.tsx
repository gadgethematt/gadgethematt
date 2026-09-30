import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AdminRoute } from '../types';
import { 
  LayoutDashboard, 
  FileText, 
  ShoppingBag, 
  Layers, 
  Link, 
  Image as ImageIcon, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  LogOut, 
  Globe, 
  Menu, 
  X,
  Plus
} from 'lucide-react';

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { adminRoute, setAdminRoute, logoutAdmin, navigate } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems: { route: AdminRoute; label: string; icon: React.ReactNode }[] = [
    { route: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { route: 'articles', label: 'Articles & Reviews', icon: <FileText className="w-4 h-4" /> },
    { route: 'products', label: 'Products Catalog', icon: <ShoppingBag className="w-4 h-4" /> },
    { route: 'categories', label: 'Categories', icon: <Layers className="w-4 h-4" /> },
    { route: 'affiliate-links', label: 'Affiliate Links', icon: <Link className="w-4 h-4" /> },
    { route: 'media', label: 'Media Library', icon: <ImageIcon className="w-4 h-4" /> },
    { route: 'comments', label: 'Comments Moderation', icon: <MessageSquare className="w-4 h-4" /> },
    { route: 'analytics', label: 'Analytics & Clicks', icon: <BarChart3 className="w-4 h-4" /> },
    { route: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  const handleNav = (r: AdminRoute) => {
    setAdminRoute(r);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F7F8F6] text-[#080808] flex select-none font-sans">
      
      {/* DARK SIDEBAR (#25282A) */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#25282A] text-white flex flex-col justify-between transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div>
          {/* BRAND */}
          <div className="p-6 border-b border-[#373A3D] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#B9F43A] text-black font-black text-base flex items-center justify-center">
                GH
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-sm tracking-tight text-white uppercase">
                  GADGET HEMATT
                </span>
                <span className="text-[9px] font-extrabold tracking-[0.2em] text-[#B9F43A] uppercase">
                  CMS ADMINISTRATOR
                </span>
              </div>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* MENU */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = adminRoute === item.route || (item.route === 'articles' && (adminRoute === 'article-new' || adminRoute === 'article-edit')) || (item.route === 'products' && (adminRoute === 'product-new' || adminRoute === 'product-edit'));
              return (
                <button
                  key={item.route}
                  onClick={() => handleNav(item.route)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all ${
                    isActive
                      ? 'bg-[#B9F43A] text-black font-black shadow-sm'
                      : 'text-[#D0D4D7] hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className={isActive ? 'text-black' : 'text-[#B9F43A]'}>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* BOTTOM SIDEBAR ACTIONS */}
        <div className="p-4 border-t border-[#373A3D] space-y-2">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-[#D0D4D7] hover:text-white hover:bg-white/10 transition-colors"
          >
            <Globe className="w-4 h-4 text-[#B9F43A]" />
            <span>View Public Website</span>
          </button>

          <button
            onClick={logoutAdmin}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-500/20 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Administrator</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT CONTAINER */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        
        {/* TOP ADMIN BAR */}
        <header className="h-16 bg-white border-b border-[#E4E8E5] px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-black">
              <Menu className="w-5 h-5" />
            </button>
            <span className="font-display font-black text-sm uppercase text-[#080808]">
              {adminRoute.replace('-', ' ').toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNav('article-new')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#25282A] text-[#B9F43A] font-black text-xs uppercase tracking-wider hover:bg-black transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Article</span>
            </button>

            <button
              onClick={() => handleNav('product-new')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#B9F43A] text-black font-black text-xs uppercase tracking-wider hover:bg-[#a3e028] transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Product</span>
            </button>

            <div className="w-8 h-8 rounded-full bg-[#25282A] text-white flex items-center justify-center font-black text-xs border border-[#25282A]">
              ADM
            </div>
          </div>
        </header>

        {/* CONTENT VIEW */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

    </div>
  );
};
