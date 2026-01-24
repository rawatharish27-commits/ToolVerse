
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
      <div className="bg-slate-900 h-1.5 w-full relative z-[60]">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 transition-all duration-1000 shadow-[0_0_15px_rgba(99,102,241,1)]"
          style={{ width: `${progressToNext}%` }}
        />
      </div>

      <header className="sticky top-0 z-50 glass bg-white/95 border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 md:h-24">
            <div 
              className="flex items-center cursor-pointer group flex-shrink-0"
              onClick={() => onNavigate('home')}
            >
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl mr-4 group-hover:scale-110 transition-all shadow-xl">
                TV
              </div>
              <span className="text-2xl md:text-3xl font-black tracking-tighter text-slate-900">
                Tool<span className="text-indigo-600">Verse</span>
              </span>
            </div>

            <div className="hidden lg:flex items-center space-x-10">
               <div className="flex items-center bg-slate-50 px-6 py-3 rounded-full border border-slate-100 gap-5">
                  <div className="flex -space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <span key={i} className={`text-sm ${i < level ? 'text-indigo-500' : 'text-slate-200'}`}>★</span>
                    ))}
                  </div>
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Level {level} Master</span>
                  <div className="w-px h-4 bg-slate-200"></div>
                  <span className="text-sm font-black text-indigo-600">{points} XP</span>
               </div>
            </div>

            <div className="flex items-center space-x-4 md:space-x-8">
              <div className="hidden md:flex relative group">
                <input 
                  ref={searchInputRef}
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => onSearch(e.target.value)}
                  placeholder="Search tools..." 
                  className="w-56 lg:w-72 pl-12 pr-12 py-3.5 rounded-2xl border-2 border-slate-100 focus:outline-none focus:ring-8 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all font-bold text-sm bg-slate-50/50"
                />
                <svg className="absolute left-4 top-4 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-3 text-slate-600 hover:bg-slate-100 rounded-2xl transition-colors"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" /></svg>
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 shadow-2xl p-8 animate-in slide-in-from-top duration-300">
             <div className="grid grid-cols-1 gap-4">
                {CATEGORIES.slice(0, 8).map(cat => (
                  <button key={cat.id} onClick={() => { setIsMobileMenuOpen(false); onNavigate('category', { id: cat.id }); }} className="p-5 text-sm font-black uppercase tracking-widest bg-slate-50 rounded-2xl text-slate-600 flex items-center gap-4 hover:bg-indigo-50 hover:text-indigo-600 transition-all">
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

      <footer className="bg-slate-950 text-slate-500 py-20 md:py-32 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-indigo-600 rounded-[1.5rem] flex items-center justify-center text-white font-black text-2xl mx-auto mb-10 shadow-2xl">TV</div>
          <p className="text-sm font-black uppercase tracking-[0.5em] mb-10 text-slate-700">© 2026 ToolVerse World Ecosystem</p>
          <div className="flex flex-wrap justify-center gap-12 text-xs font-black uppercase tracking-widest">
            <button onClick={() => onNavigate('privacy')} className="hover:text-white transition-colors">Privacy</button>
            <button onClick={() => onNavigate('terms')} className="hover:text-white transition-colors">Terms</button>
            <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">Support</button>
            <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">Mission</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
