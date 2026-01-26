
import React, { useState, useEffect, useMemo, useCallback } from 'react';
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
  const [points, setPoints] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const syncState = () => setPoints(getAttractionState().points);
    syncState();
    window.addEventListener('attraction_update', syncState);
    
    const handleOpenMenu = () => setIsMenuOpen(true);
    window.addEventListener('tv_open_menu', handleOpenMenu);

    const handleScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('attraction_update', syncState);
      window.removeEventListener('tv_open_menu', handleOpenMenu);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const level = useMemo(() => getUserLevel(points), [points]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  }, [onSearch]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="sticky top-0 z-[200] bg-white/80 backdrop-blur-2xl border-b border-slate-100 h-20 md:h-24">
        <div className="max-w-[1600px] mx-auto px-6 h-full flex items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="w-12 h-12 flex flex-col items-center justify-center gap-1.5 bg-slate-50 hover:bg-indigo-50 rounded-2xl transition-all group active:scale-90"
              aria-label="Toggle Menu"
            >
               <span className="w-1.5 h-1.5 bg-slate-400 group-hover:bg-indigo-600 rounded-full"></span>
               <span className="w-1.5 h-1.5 bg-slate-400 group-hover:bg-indigo-600 rounded-full"></span>
               <span className="w-1.5 h-1.5 bg-slate-400 group-hover:bg-indigo-600 rounded-full"></span>
            </button>
            <div onClick={() => onNavigate('home')} className="flex items-center cursor-pointer group">
              <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black text-lg mr-3 group-hover:bg-indigo-600 transition-all shadow-lg shadow-slate-900/10">TV</div>
              <span className="text-xl font-black tracking-tighter hidden sm:block">Tool<span className="text-indigo-600 italic">Verse</span></span>
            </div>
          </div>

          <div className="flex-grow max-w-xl relative hidden md:block">
            <input 
              type="text" 
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search across 500+ logic nodes..." 
              className="w-full pl-12 pr-6 py-3.5 bg-slate-100 border-none rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:bg-white transition-all font-bold text-slate-700"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeWidth="3" strokeLinecap="round"/></svg>
          </div>

          <div className="flex items-center gap-6">
             <div className="flex items-center gap-3 bg-slate-900 text-white px-5 py-2.5 rounded-2xl shadow-xl transition-all cursor-pointer">
                <div className="flex flex-col items-end mr-1">
                  <span className="text-[7px] font-black text-indigo-400 uppercase tracking-widest leading-none mb-1">PRO XP</span>
                  <span className="text-[10px] font-bold tracking-tight">{points}</span>
                </div>
                <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center text-[10px] font-black">L{level}</div>
             </div>
          </div>
        </div>
      </header>

      <div className={`fixed inset-0 z-[300] transition-all duration-500 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-md" onClick={() => setIsMenuOpen(false)}></div>
        <aside className={`absolute top-0 left-0 h-full w-full max-w-xs md:max-w-sm bg-white shadow-2xl transition-transform duration-500 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col`}>
          <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
             <div className="flex items-center">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black text-sm mr-3">TV</div>
                <span className="font-black text-lg text-slate-900">Logic Hub</span>
             </div>
             <button onClick={() => setIsMenuOpen(false)} className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center font-black hover:bg-rose-50 hover:text-rose-500 transition-all">✕</button>
          </div>

          <nav className="flex-grow overflow-y-auto no-scrollbar p-6 space-y-2">
             {CATEGORIES.map(cat => (
               <div key={cat.id} className="space-y-1">
                 <button 
                  onClick={() => setExpandedCat(expandedCat === cat.id ? null : cat.id)}
                  className={`w-full p-4 flex items-center justify-between rounded-2xl transition-all ${expandedCat === cat.id ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' : 'hover:bg-slate-50 text-slate-600'}`}
                 >
                   <div className="flex items-center gap-4">
                     <span className="text-xl">{cat.icon}</span>
                     <span className="text-xs font-black uppercase tracking-widest">{cat.name}</span>
                   </div>
                   <span className={`text-[10px] transition-transform duration-300 font-black ${expandedCat === cat.id ? 'rotate-180' : ''}`}>▼</span>
                 </button>
                 
                 {expandedCat === cat.id && (
                   <div className="ml-8 space-y-1 py-3 border-l-2 border-indigo-100 pl-4 animate-in slide-in-from-left-4 duration-300">
                     {TOOLS.filter(t => t.category === cat.id).slice(0, 15).map(tool => (
                       <button 
                        key={tool.slug}
                        onClick={() => { onNavigate('tool', { slug: tool.slug }); setIsMenuOpen(false); }}
                        className="w-full text-left p-3 text-[11px] font-bold text-slate-500 hover:text-indigo-600 hover:bg-indigo-50/50 rounded-xl transition-all truncate"
                       >
                         {tool.title}
                       </button>
                     ))}
                     <button 
                      onClick={() => { onNavigate('category', { id: cat.id }); setIsMenuOpen(false); }}
                      className="w-full text-left p-3 text-[9px] font-black text-indigo-400 uppercase tracking-widest hover:underline"
                     >
                       Explore All Tools →
                     </button>
                   </div>
                 )}
               </div>
             ))}
          </nav>

          <div className="p-8 border-t border-slate-100 bg-slate-50 grid grid-cols-2 gap-3">
             <button onClick={() => { onNavigate('contact'); setIsMenuOpen(false); }} className="py-4 bg-slate-900 text-white rounded-2xl font-black text-[9px] uppercase tracking-widest shadow-lg active:scale-95 transition-all">Support</button>
             <button onClick={() => { onNavigate('about'); setIsMenuOpen(false); }} className="py-4 bg-white border border-slate-200 text-slate-900 rounded-2xl font-black text-[9px] uppercase tracking-widest active:scale-95 transition-all">About</button>
          </div>
        </aside>
      </div>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-slate-950 text-white py-24 px-8 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 relative z-10">
           <div className="md:col-span-2">
              <div className="flex items-center mb-8">
                 <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-xl mr-4">TV</div>
                 <span className="text-3xl font-black tracking-tighter">ToolVerse</span>
              </div>
              <p className="text-slate-400 font-medium max-w-sm mb-8 leading-relaxed">
                The world's most advanced professional utility ecosystem. 100% private processing with zero cloud storage.
              </p>
           </div>
           <div>
              <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-8">Legal Standards</h4>
              <ul className="space-y-4">
                <li><button onClick={() => onNavigate('privacy')} className="text-slate-400 hover:text-white font-bold text-sm transition-colors">Privacy Protocol</button></li>
                <li><button onClick={() => onNavigate('terms')} className="text-slate-400 hover:text-white font-bold text-sm transition-colors">Terms of Logic</button></li>
              </ul>
           </div>
           <div>
              <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-8">Ecosystem</h4>
              <ul className="space-y-4">
                <li><button onClick={() => onNavigate('about')} className="text-slate-400 hover:text-white font-bold text-sm transition-colors">Core Mission</button></li>
                <li><button onClick={() => onNavigate('home')} className="text-slate-400 hover:text-white font-bold text-sm transition-colors">Performance Nodes</button></li>
              </ul>
           </div>
        </div>
        <div className="max-w-[1600px] mx-auto mt-24 pt-8 border-t border-white/5 text-center md:text-left">
           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600">© 2026 ToolVerse Ecosystem • Architected by Harish Rawat</p>
        </div>
      </footer>

      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-10 left-10 z-[140] w-14 h-14 bg-white border border-slate-200 text-slate-900 rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 hover:bg-indigo-600 hover:text-white hover:-translate-y-2 ${showBackToTop ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'}`}
      >
        <span className="font-black text-xl">↑</span>
      </button>
    </div>
  );
};

export default Layout;
