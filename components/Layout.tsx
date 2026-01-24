
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
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div 
              className="flex items-center cursor-pointer group shrink-0"
              onClick={() => onNavigate('home')}
            >
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm mr-3 shadow-md">TV</div>
              <span className="text-lg font-black tracking-tight text-slate-900">
                Tool<span className="text-indigo-600">Verse</span>
              </span>
            </div>

            <div className="flex-grow max-w-xl mx-8 hidden md:block relative">
              <input 
                ref={searchInputRef}
                type="text" 
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="Quick search 500+ tools..." 
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium text-sm"
              />
              <svg className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>

            <div className="flex items-center gap-4">
               <div className="hidden lg:flex items-center bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 gap-3">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Level {level}</span>
                  <div className="w-px h-3 bg-slate-200"></div>
                  <span className="text-xs font-black text-indigo-600">{points} XP</span>
               </div>
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg md:hidden"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" strokeWidth="2" strokeLinecap="round"/></svg>
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 p-6 space-y-2">
             <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="Search..." 
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl mb-4"
              />
             {CATEGORIES.slice(0, 8).map(cat => (
               <button key={cat.id} onClick={() => { setIsMobileMenuOpen(false); onNavigate('category', { id: cat.id }); }} className="w-full p-4 text-left text-xs font-bold uppercase tracking-widest hover:bg-indigo-50 rounded-xl flex items-center gap-3">
                 <span>{cat.icon}</span> {cat.name}
               </button>
             ))}
          </div>
        )}
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-white border-t border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">© 2026 ToolVerse World Ecosystem</p>
          <div className="flex flex-wrap justify-center gap-8 text-[9px] font-bold uppercase tracking-widest text-slate-400">
            <button onClick={() => onNavigate('privacy')} className="hover:text-indigo-600">Privacy</button>
            <button onClick={() => onNavigate('terms')} className="hover:text-indigo-600">Terms</button>
            <button onClick={() => onNavigate('contact')} className="hover:text-indigo-600">Support</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
