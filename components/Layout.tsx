
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
  const [time, setTime] = useState(new Date());
  const [liveVisitors, setLiveVisitors] = useState(1240);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
      setLiveVisitors(prev => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 1000);
    
    const syncState = () => {
      const state = getAttractionState();
      setPoints(state.points);
    };
    syncState();
    window.addEventListener('attraction_update', syncState);
    return () => {
      clearInterval(timer);
      window.removeEventListener('attraction_update', syncState);
    };
  }, []);

  const level = getUserLevel(points);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* GLOBAL STATUS BAR */}
      <div className="bg-slate-950 text-white py-1.5 px-6 flex justify-between items-center text-[9px] font-black uppercase tracking-[0.2em] border-b border-white/5">
         <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
               <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
               {liveVisitors.toLocaleString()} ACTIVE NODES
            </span>
            <span className="hidden md:block opacity-40">|</span>
            <span className="hidden md:block">ESTABLISHED 2026</span>
         </div>
         <div className="flex items-center gap-4">
            <span>{time.toLocaleTimeString()} UTC</span>
            <span className="opacity-40">|</span>
            <span className="text-indigo-400">PRO MODE ACTIVE</span>
         </div>
      </div>

      <header className="sticky top-0 z-[100] bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="flex justify-between items-center h-20 md:h-24">
            <div 
              className="flex items-center cursor-pointer group shrink-0"
              onClick={() => onNavigate('home')}
            >
              <div className="w-11 h-11 bg-slate-900 rounded-[1rem] flex items-center justify-center text-white font-black text-xl mr-4 shadow-2xl group-hover:bg-indigo-600 transition-all duration-500">TV</div>
              <span className="text-2xl font-black tracking-tighter text-slate-900">
                Tool<span className="text-indigo-600 italic">Verse</span>
              </span>
            </div>

            <div className="flex-grow max-w-2xl mx-12 hidden md:block relative">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="Search 120+ functional utilities..." 
                className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-8 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all font-bold text-base shadow-inner"
              />
              <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>

            <div className="flex items-center gap-6">
               <div className="hidden lg:flex items-center bg-slate-900 text-white px-5 py-2.5 rounded-2xl border border-white/10 gap-4 shadow-2xl">
                  <div className="flex flex-col">
                    <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest leading-none mb-1">XP Points</span>
                    <span className="text-xs font-black tracking-tight">{points}</span>
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
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-slate-950 text-white pt-32 pb-12 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600"></div>
        <div className="max-w-[1600px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-32">
             <div className="space-y-8">
                <div className="flex items-center">
                   <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl mr-4">TV</div>
                   <span className="text-3xl font-black tracking-tight">ToolVerse</span>
                </div>
                <p className="text-slate-400 text-base font-medium leading-relaxed">
                  The world's premier production-ready tool ecosystem. 100% Client-side logic for absolute privacy and zero-latency workflows.
                </p>
                <div className="pt-4 border-t border-white/10">
                   <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest block mb-2">Architected & Developed by</span>
                   <span className="text-xl font-black text-white">Harish Rawat</span>
                </div>
             </div>
             
             <div>
                <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-10 border-b border-white/10 pb-4">Core Hubs</h4>
                <ul className="space-y-4 text-sm font-bold text-slate-500">
                   <li><button onClick={() => onNavigate('category', { id: 'image' })} className="hover:text-indigo-400 transition-all">🖼️ Image Lab</button></li>
                   <li><button onClick={() => onNavigate('category', { id: 'pdf' })} className="hover:text-indigo-400 transition-all">📄 PDF Master</button></li>
                   <li><button onClick={() => onNavigate('category', { id: 'calculators' })} className="hover:text-indigo-400 transition-all">🔢 Financial Core</button></li>
                   <li><button onClick={() => onNavigate('category', { id: 'ai' })} className="hover:text-indigo-400 transition-all">🧠 Neural Network</button></li>
                </ul>
             </div>

             <div>
                <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-10 border-b border-white/10 pb-4">Compliance</h4>
                <ul className="space-y-4 text-sm font-bold text-slate-500">
                   <li><button onClick={() => onNavigate('privacy')} className="hover:text-white transition-colors">Privacy & Security</button></li>
                   <li><button onClick={() => onNavigate('terms')} className="hover:text-white transition-colors">Terms of Logic</button></li>
                   <li><button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">Platform Mission</button></li>
                </ul>
             </div>

             <div className="bg-white/5 p-10 rounded-[3rem] border border-white/10 backdrop-blur-xl">
                <h4 className="text-sm font-black mb-4">Enterprise Gateway</h4>
                <p className="text-xs text-slate-400 font-medium mb-8 leading-relaxed">Scale your workflows with private API access and custom logic nodes.</p>
                <button 
                  onClick={() => onNavigate('contact')}
                  className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-indigo-500 transition-all"
                >
                  Contact Engineering
                </button>
             </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
             <div className="text-center md:text-left space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">© 2026 ToolVerse World Ecosystem • Hardened Edge Infrastructure</p>
                <p className="text-[8px] font-bold text-slate-700 uppercase tracking-widest">Designed for Search Engine Dominance & 100% Workability</p>
             </div>
             <div className="flex gap-8 items-center">
                <div className="flex flex-col items-end">
                   <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Global Status</span>
                   <span className="text-xs font-black text-white">OPERATIONAL</span>
                </div>
                <div className="w-12 h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-xl grayscale opacity-50">🛡️</div>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
