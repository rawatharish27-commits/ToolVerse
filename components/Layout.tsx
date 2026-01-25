

import React, { useState, useEffect } from 'react';
import { CATEGORIES } from '../data/categories';
import { TOOLS } from '../data/tools';
import { getAttractionState, getUserLevel } from '../utils/attraction';

interface LayoutProps {
  children: React.ReactNode;
  onNavigate: (page: string, params?: any) => void;
  onSearch: (query: string) => void;
  searchQuery: string;
}

const Layout: React.FC<LayoutProps> = ({ children, onNavigate, onSearch, searchQuery }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedCat, setExpandedCat] = useState<string | null>(null);
  const [time, setTime] = useState(new Date());
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    const syncState = () => setPoints(getAttractionState().points);
    syncState();
    window.addEventListener('attraction_update', syncState);
    
    // Fix: Added event listener to allow sibling/child components (like Home) 
    // to open the navigation drawer using a global event.
    const handleOpenMenu = () => setIsMenuOpen(true);
    window.addEventListener('tv_open_menu', handleOpenMenu);

    return () => {
      clearInterval(timer);
      window.removeEventListener('attraction_update', syncState);
      window.removeEventListener('tv_open_menu', handleOpenMenu);
    };
  }, []);

  const level = getUserLevel(points);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* 1. TOP HEADER NAVIGATION */}
      <header className="sticky top-0 z-[200] bg-white/80 backdrop-blur-2xl border-b border-slate-100 h-20 md:h-24">
        <div className="max-w-[1600px] mx-auto px-6 h-full flex items-center justify-between gap-8">
          
          <div className="flex items-center gap-6">
            {/* THREE DOT MENU TRIGGER */}
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="w-12 h-12 flex flex-col items-center justify-center gap-1.5 bg-slate-50 hover:bg-indigo-50 rounded-2xl transition-all group active:scale-90"
            >
               <span className="w-1.5 h-1.5 bg-slate-400 group-hover:bg-indigo-600 rounded-full transition-colors"></span>
               <span className="w-1.5 h-1.5 bg-slate-400 group-hover:bg-indigo-600 rounded-full transition-colors"></span>
               <span className="w-1.5 h-1.5 bg-slate-400 group-hover:bg-indigo-600 rounded-full transition-colors"></span>
            </button>

            <div onClick={() => onNavigate('home')} className="flex items-center cursor-pointer group">
              <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black text-lg mr-3 group-hover:bg-indigo-600 transition-all">TV</div>
              <span className="text-xl font-black tracking-tighter hidden sm:block">Tool<span className="text-indigo-600 italic">Verse</span></span>
            </div>
          </div>

          <div className="flex-grow max-w-xl relative hidden md:block">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search logic nodes..." 
              className="w-full pl-12 pr-6 py-3.5 bg-slate-100 border-none rounded-2xl focus:ring-4 focus:ring-indigo-500/5 focus:bg-white transition-all font-bold"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeWidth="3" strokeLinecap="round"/></svg>
          </div>

          <div className="flex items-center gap-6">
             <div className="hidden lg:flex flex-col items-end">
                <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest leading-none mb-1">Live Sync</span>
                <span className="text-sm font-black text-slate-900 tabular-nums">{time.toLocaleTimeString()}</span>
             </div>
             <div className="h-10 w-px bg-slate-100 hidden lg:block"></div>
             <div className="flex items-center gap-3 bg-slate-900 text-white px-4 py-2 rounded-2xl shadow-xl">
                <div className="flex flex-col">
                  <span className="text-[7px] font-black text-indigo-400 uppercase tracking-widest leading-none">LVL {level}</span>
                  <span className="text-[10px] font-bold tracking-tight">{points} XP</span>
                </div>
             </div>
          </div>
        </div>
      </header>

      {/* 2. LEFT SIDEBAR DRAWER MENU */}
      <div className={`fixed inset-0 z-[300] transition-all duration-500 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-md" onClick={() => setIsMenuOpen(false)}></div>
        <aside className={`absolute top-0 left-0 h-full w-full max-w-xs md:max-w-sm bg-white shadow-2xl transition-transform duration-500 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col`}>
          <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
             <div className="flex items-center">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black text-sm mr-3">TV</div>
                <span className="font-black text-lg">Directory</span>
             </div>
             <button onClick={() => setIsMenuOpen(false)} className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center font-black hover:bg-rose-50 transition-colors">✕</button>
          </div>

          <nav className="flex-grow overflow-y-auto no-scrollbar p-6 space-y-2">
             {CATEGORIES.map(cat => (
               <div key={cat.id} className="space-y-1">
                 <button 
                  onClick={() => setExpandedCat(expandedCat === cat.id ? null : cat.id)}
                  className={`w-full p-4 flex items-center justify-between rounded-2xl transition-all ${expandedCat === cat.id ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-slate-50 text-slate-600'}`}
                 >
                   <div className="flex items-center gap-4">
                     <span className="text-xl">{cat.icon}</span>
                     <span className="text-xs font-black uppercase tracking-widest">{cat.name}</span>
                   </div>
                   <span className={`text-xs transition-transform duration-300 ${expandedCat === cat.id ? 'rotate-180' : ''}`}>↓</span>
                 </button>
                 
                 {expandedCat === cat.id && (
                   <div className="ml-12 space-y-1 py-2 animate-in slide-in-from-left-2">
                     {TOOLS.filter(t => t.category === cat.id).map(tool => (
                       <button 
                        key={tool.slug}
                        onClick={() => { onNavigate('tool', { slug: tool.slug }); setIsMenuOpen(false); }}
                        className="w-full text-left p-3 text-[11px] font-bold text-slate-500 hover:text-indigo-600 hover:underline transition-all truncate"
                       >
                         {tool.title}
                       </button>
                     ))}
                   </div>
                 )}
               </div>
             ))}
          </nav>

          <div className="p-8 border-t border-slate-100 bg-slate-50">
             <button onClick={() => { onNavigate('contact'); setIsMenuOpen(false); }} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl">Contact Engineering</button>
          </div>
        </aside>
      </div>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-slate-950 text-white py-20 px-8 border-t border-white/5">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
           <div>
             <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">© 2026 ToolVerse Ecosystem • Architected by Harish Rawat</p>
           </div>
           <div className="flex gap-8">
              <button onClick={() => onNavigate('privacy')} className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white">Privacy</button>
              <button onClick={() => onNavigate('terms')} className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white">Terms</button>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;