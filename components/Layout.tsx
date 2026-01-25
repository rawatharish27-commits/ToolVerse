
import React, { useState, useEffect, useRef } from 'react';
import { CATEGORIES } from '../data/categories';
import { getAttractionState, getUserLevel } from '../utils/attraction';

interface LayoutProps {
  children: React.ReactNode;
  onNavigate: (page: string, params?: any) => void;
  onSearch: (query: string) => void;
  searchQuery: string;
}

const Layout: React.FC<LayoutProps> = ({ children, onNavigate, onSearch, searchQuery }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [points, setPoints] = useState(0);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const syncState = () => {
      const state = getAttractionState();
      setPoints(state.points);
    };
    syncState();
    window.addEventListener('attraction_update', syncState);
    return () => window.removeEventListener('attraction_update', syncState);
  }, []);

  const level = getUserLevel(points);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* TECHNIQUE 2: Glassmorphic Header */}
      <header className="sticky top-0 z-[100] bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="flex justify-between items-center h-20 md:h-24">
            <div 
              className="flex items-center cursor-pointer group shrink-0"
              onClick={() => onNavigate('home')}
            >
              <div className="w-11 h-11 bg-slate-900 rounded-[1rem] flex items-center justify-center text-white font-black text-xl mr-4 shadow-2xl group-hover:bg-indigo-600 transition-colors duration-500">TV</div>
              <span className="text-2xl font-black tracking-tighter text-slate-900">
                Tool<span className="text-indigo-600 italic">Verse</span>
              </span>
            </div>

            <div className="flex-grow max-w-2xl mx-12 hidden md:block relative">
              <input 
                ref={searchInputRef}
                type="text" 
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="Search across 120+ professional nodes..." 
                className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:outline-none focus:ring-8 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all font-bold text-base shadow-inner"
              />
              <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>

            <div className="flex items-center gap-6">
               <div className="hidden lg:flex items-center bg-slate-900 text-white px-5 py-2.5 rounded-2xl border border-white/10 gap-4 shadow-2xl">
                  <div className="flex flex-col">
                    <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest leading-none mb-1">Status: Explorer</span>
                    <span className="text-xs font-black tracking-tight">{points} XP</span>
                  </div>
                  <div className="w-px h-6 bg-white/10"></div>
                  <span className="text-lg font-black text-indigo-400">Lvl {level}</span>
               </div>
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-3 text-slate-500 bg-slate-50 hover:bg-slate-100 rounded-2xl md:hidden transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" strokeWidth="3" strokeLinecap="round"/></svg>
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU DIRECTORY */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 p-8 space-y-4 overflow-y-auto max-h-[85vh] animate-in slide-in-from-top duration-500">
             <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="Find a tool..." 
                className="w-full p-5 bg-slate-50 border border-slate-200 rounded-[1.5rem] mb-6 font-bold"
              />
             <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-2 mb-4">Master Directory</h3>
             <div className="grid grid-cols-1 gap-3">
               {CATEGORIES.map(cat => (
                 <button key={cat.id} onClick={() => { setIsMobileMenuOpen(false); onNavigate('category', { id: cat.id }); }} className="w-full p-5 text-left text-xs font-black uppercase tracking-widest hover:bg-indigo-50 rounded-2xl flex items-center gap-4 transition-all border border-slate-50">
                   <span className="text-2xl">{cat.icon}</span> {cat.name}
                 </button>
               ))}
             </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-slate-950 text-white py-24 border-t border-white/5">
        <div className="max-w-[1600px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
             <div className="space-y-6">
                <div className="flex items-center">
                   <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl mr-3">TV</div>
                   <span className="text-2xl font-black tracking-tight">ToolVerse</span>
                </div>
                <p className="text-slate-400 text-sm font-medium leading-relaxed">The global standard for browser-native logic. Secure, private, and 100% free forever.</p>
             </div>
             <div>
                <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-6">Core Clusters</h4>
                <ul className="space-y-3 text-sm font-bold text-slate-500">
                   <li><button onClick={() => onNavigate('category', { id: 'pdf' })} className="hover:text-white transition-colors">PDF Hub</button></li>
                   <li><button onClick={() => onNavigate('category', { id: 'image' })} className="hover:text-white transition-colors">Image Hub</button></li>
                   <li><button onClick={() => onNavigate('category', { id: 'ai' })} className="hover:text-white transition-colors">Neural Hub</button></li>
                </ul>
             </div>
             <div>
                <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-6">Platform</h4>
                <ul className="space-y-3 text-sm font-bold text-slate-500">
                   <li><button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">About Mission</button></li>
                   <li><button onClick={() => onNavigate('privacy')} className="hover:text-white transition-colors">Privacy Policy</button></li>
                   <li><button onClick={() => onNavigate('terms')} className="hover:text-white transition-colors">Terms of Service</button></li>
                </ul>
             </div>
             <div className="bg-white/5 p-8 rounded-[2rem] border border-white/5">
                <h4 className="text-sm font-black mb-2">Join the Network</h4>
                <p className="text-xs text-slate-500 font-medium mb-6">Get notified when we deploy new logic nodes.</p>
                <div className="flex gap-2">
                   <input type="email" placeholder="Email Address" className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs w-full focus:outline-none focus:border-indigo-500" />
                   <button className="bg-indigo-600 p-2 rounded-xl hover:bg-indigo-500 transition-colors">➔</button>
                </div>
             </div>
          </div>
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
             <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600">© 2026 ToolVerse World Ecosystem • Hardened Cloudflare Edge</p>
             <div className="flex gap-6 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all">
                <div className="text-xs font-black">ISO-27001</div>
                <div className="text-xs font-black">GDPR COMPLIANT</div>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
