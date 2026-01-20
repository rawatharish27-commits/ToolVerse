import React, { useState, useEffect, useRef } from 'react';
import { CATEGORIES } from '../data/categories';
import InternalLinking from './InternalLinking';

interface LayoutProps {
  children: React.ReactNode;
  onNavigate: (page: string, params?: any) => void;
  onSearch: (query: string) => void;
  searchQuery: string;
}

const Layout: React.FC<LayoutProps> = ({ children, onNavigate, onSearch, searchQuery }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut: Press '/' to focus search
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  const closeMenuAndNavigate = (page: string, params?: any) => {
    setIsMobileMenuOpen(false);
    onNavigate(page, params);
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-indigo-100 selection:text-indigo-900 font-sans overflow-x-hidden">
      <header className="sticky top-0 z-50 glass bg-white/95 border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <div 
              className="flex items-center cursor-pointer group flex-shrink-0"
              onClick={() => closeMenuAndNavigate('home')}
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-indigo-600 rounded-xl md:rounded-2xl flex items-center justify-center text-white font-black text-xl mr-3 md:mr-4 group-hover:scale-110 transition-all shadow-lg shadow-indigo-600/20">
                TV
              </div>
              <span className="text-xl md:text-2xl font-black tracking-tighter text-slate-900">
                Tool<span className="text-indigo-600">Verse</span>
              </span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center space-x-8 xl:space-x-12">
              <button onClick={() => closeMenuAndNavigate('home')} className="text-[10px] font-black text-slate-600 hover:text-indigo-600 uppercase tracking-[0.2em] transition-colors">Hub</button>
              <div className="relative group">
                <button className="text-[10px] font-black text-slate-600 group-hover:text-indigo-600 uppercase tracking-[0.2em] flex items-center transition-colors">
                  Categories
                  <svg className="ml-2 w-4 h-4 transform group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
                </button>
                <div className="absolute -left-10 mt-6 w-80 glass bg-white rounded-[2rem] shadow-2xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 p-4">
                  <div className="grid grid-cols-1 gap-1">
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => closeMenuAndNavigate('category', { id: cat.id })}
                        className="flex items-center w-full text-left px-4 py-3 text-xs font-black text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all"
                      >
                        <span className="mr-3 text-xl">{cat.icon}</span>
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <button onClick={() => closeMenuAndNavigate('about')} className="text-[10px] font-black text-slate-600 hover:text-indigo-600 uppercase tracking-[0.2em] transition-colors">About</button>
              <button onClick={() => closeMenuAndNavigate('privacy')} className="text-[10px] font-black text-slate-600 hover:text-indigo-600 uppercase tracking-[0.2em] transition-colors">Privacy</button>
            </nav>

            {/* Search and Mobile Toggle */}
            <div className="flex items-center space-x-3 md:space-x-6">
              <div className="hidden md:flex relative group">
                <input 
                  ref={searchInputRef}
                  type="text" 
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search 500+ tools..." 
                  className="w-48 lg:w-64 xl:w-72 pl-10 pr-10 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-bold text-xs bg-slate-50/50"
                />
                <svg className="absolute left-3.5 top-3.5 w-3.5 h-3.5 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                
                {searchQuery ? (
                  <button 
                    onClick={() => onSearch('')}
                    className="absolute right-3 top-2.5 p-1 text-slate-400 hover:text-indigo-600 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                ) : (
                  <div className="absolute right-3 top-3 text-[9px] font-black text-slate-300 border border-slate-200 rounded px-1 group-hover:border-indigo-200 group-hover:text-indigo-300 pointer-events-none transition-colors">
                    /
                  </div>
                )}
              </div>
              
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" /></svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 shadow-xl max-h-[calc(100vh-4rem)] overflow-y-auto animate-in slide-in-from-top duration-300">
            <div className="px-4 py-6 space-y-6">
              <div className="relative">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search tools..." 
                  className="w-full pl-10 pr-10 py-4 rounded-2xl border border-slate-200 font-bold text-sm bg-slate-50"
                />
                <svg className="absolute left-4 top-4.5 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                {searchQuery && (
                  <button onClick={() => onSearch('')} className="absolute right-4 top-4.5 p-0.5 text-slate-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => closeMenuAndNavigate('category', { id: cat.id })}
                    className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl text-center border border-slate-100 hover:bg-indigo-50 hover:border-indigo-100 transition-all"
                  >
                    <span className="text-3xl mb-2">{cat.icon}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">{cat.name}</span>
                  </button>
                ))}
              </div>

              <div className="pt-6 border-t border-slate-100 space-y-4">
                <button onClick={() => closeMenuAndNavigate('home')} className="block w-full text-left font-black text-slate-600 text-xs uppercase tracking-widest">Home Portal</button>
                <button onClick={() => closeMenuAndNavigate('about')} className="block w-full text-left font-black text-slate-600 text-xs uppercase tracking-widest">About Us</button>
                <button onClick={() => closeMenuAndNavigate('privacy')} className="block w-full text-left font-black text-slate-600 text-xs uppercase tracking-widest">Privacy Center</button>
                <button onClick={() => closeMenuAndNavigate('terms')} className="block w-full text-left font-black text-slate-600 text-xs uppercase tracking-widest">Terms of Use</button>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <InternalLinking onNavigate={closeMenuAndNavigate} />

      <footer className="bg-slate-950 text-slate-500 py-16 md:py-32 overflow-hidden relative border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 mb-16 md:mb-24">
            <div className="col-span-1 md:col-span-2 space-y-8 md:space-y-12">
              <div className="flex items-center">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-indigo-600 rounded-xl md:rounded-2xl flex items-center justify-center text-white font-black text-xl mr-4 shadow-2xl">TV</div>
                <span className="text-2xl md:text-3xl font-black text-white tracking-tighter">ToolVerse</span>
              </div>
              <p className="max-w-lg text-slate-400 text-base md:text-lg leading-relaxed font-medium">
                The most extensive free tool ecosystem on the web. Engineered for privacy, speed, and professional-grade performance.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 col-span-2 lg:col-span-2">
              <div>
                <h3 className="text-white font-black mb-6 md:mb-10 uppercase text-[10px] tracking-[0.4em]">Resource</h3>
                <ul className="space-y-4 md:space-y-6 text-xs font-bold">
                  <li><button onClick={() => closeMenuAndNavigate('home')} className="hover:text-indigo-400 transition-colors">Start Portal</button></li>
                  <li><button onClick={() => closeMenuAndNavigate('about')} className="hover:text-indigo-400 transition-colors">About Story</button></li>
                  <li><button onClick={() => closeMenuAndNavigate('contact')} className="hover:text-indigo-400 transition-colors text-left">Contact Support</button></li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-black mb-6 md:mb-10 uppercase text-[10px] tracking-[0.4em]">Legal</h3>
                <ul className="space-y-4 md:space-y-6 text-xs font-bold">
                  <li><button onClick={() => closeMenuAndNavigate('privacy')} className="hover:text-indigo-400 transition-colors text-left">Privacy Policy</button></li>
                  <li><button onClick={() => closeMenuAndNavigate('terms')} className="hover:text-indigo-400 transition-colors text-left">Terms of Use</button></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-700">
            <p className="text-center md:text-left mb-6 md:mb-0">&copy; 2024 ToolVerse Global. All Rights Reserved.</p>
            <p className="flex items-center bg-white/5 px-6 py-3 rounded-full border border-white/5">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full mr-4 animate-pulse"></span>
              All Systems Operational
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;