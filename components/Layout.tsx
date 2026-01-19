
import React, { useState, useEffect } from 'react';
import { CATEGORIES } from '../data/categories';
import InternalLinking from './InternalLinking';

interface LayoutProps {
  children: React.ReactNode;
  onNavigate: (page: string, params?: any) => void;
  onSearch?: (query: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onNavigate, onSearch }) => {
  const [searchVal, setSearchVal] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchVal(val);
    if (onSearch) onSearch(val);
  };

  // Synchronize internal state with parent search query if needed
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '' || hash === '#') {
      // Clear search if we're on root but search is empty
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col selection:bg-indigo-100 selection:text-indigo-900 font-sans">
      <header className="sticky top-0 z-50 glass bg-white/90 border-b border-slate-200 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div 
              className="flex items-center cursor-pointer group"
              onClick={() => { setSearchVal(''); onNavigate('home'); }}
            >
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl mr-4 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-xl shadow-indigo-600/20">
                TV
              </div>
              <span className="text-2xl font-black tracking-tighter text-slate-900 group-hover:text-indigo-600 transition-colors">
                Tool<span className="text-indigo-600 group-hover:text-slate-900 transition-colors">Verse</span>
              </span>
            </div>

            <nav className="hidden lg:flex items-center space-x-12">
              <button onClick={() => { setSearchVal(''); onNavigate('home'); }} className="text-xs font-black text-slate-600 hover:text-indigo-600 uppercase tracking-[0.2em] transition-colors">Hub</button>
              <div className="relative group">
                <button className="text-xs font-black text-slate-600 group-hover:text-indigo-600 uppercase tracking-[0.2em] flex items-center transition-colors">
                  Categories
                  <svg className="ml-2 w-4 h-4 transform group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
                </button>
                <div className="absolute -left-10 mt-6 w-80 glass bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 p-6">
                  <div className="grid grid-cols-1 gap-2">
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => { setSearchVal(''); onNavigate('category', { id: cat.id }); }}
                        className="flex items-center w-full text-left px-5 py-4 text-sm font-black text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-2xl transition-all"
                      >
                        <span className="mr-4 text-2xl">{cat.icon}</span>
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <button onClick={() => onNavigate('privacy')} className="text-xs font-black text-slate-600 hover:text-indigo-600 uppercase tracking-[0.2em] transition-colors">Privacy</button>
            </nav>

            <div className="flex items-center space-x-6">
              <div className="hidden sm:flex relative">
                <input 
                  type="text" 
                  value={searchVal}
                  onChange={handleSearchChange}
                  placeholder="Explore 1,000 tools..." 
                  className="w-72 pl-12 pr-6 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-bold text-xs bg-slate-50/50 shadow-inner"
                />
                <svg className="absolute left-4 top-4.5 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <button className="lg:hidden p-4 bg-slate-100 rounded-2xl text-slate-600">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 6h16M4 12h16m-7 6h7" /></svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <InternalLinking onNavigate={(p, pr) => { setSearchVal(''); onNavigate(p, pr); }} />

      <footer className="bg-slate-950 text-slate-500 py-32 overflow-hidden relative border-t border-slate-800">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-indigo-600/5 rounded-full blur-[160px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-24 mb-24">
            <div className="col-span-1 md:col-span-2 space-y-12">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-xl mr-5 shadow-2xl shadow-indigo-600/20">TV</div>
                <span className="text-3xl font-black text-white tracking-tighter">ToolVerse</span>
              </div>
              <p className="max-w-lg text-slate-500 text-lg leading-relaxed font-medium">
                The most extensive free tool ecosystem on the web. Engineered for privacy, speed, and professional-grade performance. Join the 500+ daily utilities revolution.
              </p>
              <div className="flex space-x-8">
                {['Twitter', 'GitHub', 'LinkedIn'].map(social => (
                  <a key={social} href="#" className="text-slate-600 hover:text-indigo-400 font-black text-[10px] uppercase tracking-widest transition-colors">{social}</a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-white font-black mb-10 uppercase text-[10px] tracking-[0.4em]">Resource Hub</h3>
              <ul className="space-y-6 text-sm font-bold">
                <li><button onClick={() => { setSearchVal(''); onNavigate('home'); }} className="hover:text-indigo-400 transition-colors">Start Portal</button></li>
                <li><button onClick={() => { setSearchVal(''); onNavigate('category', { id: 'ai' }); }} className="hover:text-indigo-400 transition-colors">AI Studios</button></li>
                <li><button onClick={() => { setSearchVal(''); onNavigate('category', { id: 'dev' }); }} className="hover:text-indigo-400 transition-colors">Dev Toolkit</button></li>
                <li><button onClick={() => { setSearchVal(''); onNavigate('category', { id: 'seo' }); }} className="hover:text-indigo-400 transition-colors">SEO Engine</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-black mb-10 uppercase text-[10px] tracking-[0.4em]">Integrity</h3>
              <ul className="space-y-6 text-sm font-bold">
                <li><button onClick={() => onNavigate('privacy')} className="hover:text-indigo-400 transition-colors">Privacy Policy</button></li>
                <li><button className="hover:text-indigo-400 transition-colors">Terms of Use</button></li>
                <li><button className="hover:text-indigo-400 transition-colors">Cookie Data</button></li>
                <li><button className="hover:text-indigo-400 transition-colors">Contact Hub</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 pt-16 flex flex-col md:flex-row justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-700">
            <p>&copy; 2024 ToolVerse Global Ecosystem. All Rights Reserved.</p>
            <p className="mt-8 md:mt-0 flex items-center bg-white/5 px-6 py-3 rounded-full border border-white/5">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full mr-4 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
              All Systems Operational
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
