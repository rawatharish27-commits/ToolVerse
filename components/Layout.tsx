import React, { useState, useEffect, useRef } from 'react';
import { CATEGORIES } from '../data/categories';
import InternalLinking from './InternalLinking';
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const level = getUserLevel(points);
  const progressToNext = (points % 50) * 2;

  return (
    <div className="min-h-screen flex flex-col selection:bg-indigo-100 selection:text-indigo-900 font-sans overflow-x-hidden">
      
      {/* DOPAMINE PROGRESS BAR */}
      <div className="bg-slate-900 h-1 w-full relative z-[60]">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 transition-all duration-1000 shadow-[0_0_10px_rgba(99,102,241,0.8)]"
          style={{ width: `${progressToNext}%` }}
        />
      </div>

      <header className="sticky top-0 z-50 glass bg-white/95 border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div 
              className="flex items-center cursor-pointer group flex-shrink-0"
              onClick={() => onNavigate('home')}
            >
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl mr-3 group-hover:scale-110 transition-all shadow-lg">
                TV
              </div>
              <span className="text-xl md:text-2xl font-black tracking-tighter text-slate-900">
                Tool<span className="text-indigo-600">Verse</span>
              </span>
            </div>

            <div className="hidden lg:flex items-center space-x-6">
               <div className="flex items-center bg-slate-50 px-4 py-2 rounded-full border border-slate-100 gap-3">
                  <div className="flex -space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <span key={i} className={`text-xs ${i < level ? 'text-indigo-500' : 'text-slate-200'}`}>★</span>
                    ))}
                  </div>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Level {level} Explorer</span>
                  <div className="w-px h-3 bg-slate-200"></div>
                  <span className="text-[10px] font-black text-indigo-600">{points} XP</span>
               </div>
            </div>

            <div className="flex items-center space-x-3 md:space-x-6">
              <div className="hidden md:flex relative group">
                <input 
                  ref={searchInputRef}
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => onSearch(e.target.value)}
                  placeholder="Search 500+ tools..." 
                  className="w-48 lg:w-64 pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-bold text-xs bg-slate-50/50"
                />
                <svg className="absolute left-3.5 top-3 w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" /></svg>
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 shadow-xl p-4 animate-in slide-in-from-top duration-300">
             <div className="flex items-center justify-between bg-indigo-50 p-4 rounded-2xl mb-4">
                <span className="font-black text-indigo-600 text-xs uppercase tracking-widest">Level {level} Explorer</span>
                <span className="font-black text-indigo-900 text-xs">{points} XP</span>
             </div>
             <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.slice(0, 6).map(cat => (
                  <button key={cat.id} onClick={() => { setIsMobileMenuOpen(false); onNavigate('category', { id: cat.id }); }} className="p-3 text-[10px] font-black uppercase tracking-widest bg-slate-50 rounded-xl text-slate-600">{cat.icon} {cat.name}</button>
                ))}
             </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <InternalLinking onNavigate={onNavigate} />

      <footer className="bg-slate-950 text-slate-500 py-16 md:py-24 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-xl mx-auto mb-8 shadow-2xl">TV</div>
          <p className="text-[10px] font-black uppercase tracking-[0.5em] mb-4 text-slate-700">© 2026 ToolVerse Global Ecosystem</p>
          <div className="flex justify-center gap-8 text-[9px] font-black uppercase tracking-widest">
            <button onClick={() => onNavigate('privacy')} className="hover:text-white transition-colors">Privacy</button>
            <button onClick={() => onNavigate('terms')} className="hover:text-white transition-colors">Terms</button>
            <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">Support</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;