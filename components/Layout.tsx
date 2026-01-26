
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

  useEffect(() => {
    const syncState = () => setPoints(getAttractionState().points);
    syncState();
    window.addEventListener('attraction_update', syncState);
    return () => window.removeEventListener('attraction_update', syncState);
  }, []);

  const level = useMemo(() => getUserLevel(points), [points]);

  // Performance: Debounced search to prevent UI jitter
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  }, [onSearch]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="sticky top-0 z-[200] bg-white/95 backdrop-blur-xl border-b border-slate-50 h-20">
        <div className="max-w-[1600px] mx-auto px-6 h-full flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="w-10 h-10 flex flex-col items-center justify-center gap-1 bg-slate-50 hover:bg-indigo-50 rounded-xl transition-all active:scale-90"
              aria-label="Menu"
            >
               <span className="w-5 h-0.5 bg-slate-400 rounded-full"></span>
               <span className="w-5 h-0.5 bg-slate-400 rounded-full"></span>
               <span className="w-3 h-0.5 bg-slate-400 rounded-full self-start ml-2.5"></span>
            </button>
            <div onClick={() => onNavigate('home')} className="flex items-center cursor-pointer group">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-black text-sm mr-2.5 shadow-lg group-hover:bg-indigo-600 transition-all">TV</div>
              <span className="text-lg font-black tracking-tight hidden sm:block">Tool<span className="text-indigo-600">Verse</span></span>
            </div>
          </div>

          <div className="flex-grow max-w-lg relative hidden md:block">
            <input 
              type="text" 
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search 500+ utilities..." 
              className="w-full pl-11 pr-5 py-2.5 bg-slate-100 border-none rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:bg-white transition-all font-bold text-slate-700 text-sm"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeWidth="3" strokeLinecap="round"/></svg>
          </div>

          <div className="flex items-center gap-3">
             <div className="flex flex-col items-end mr-1">
                <span className="text-[6px] font-black text-indigo-400 uppercase tracking-widest leading-none mb-1">XP POOL</span>
                <span className="text-[10px] font-bold tracking-tight text-slate-900">{points} PTS</span>
             </div>
             <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-[10px] font-black text-white italic">L{level}</div>
          </div>
        </div>
      </header>

      {/* High-Performance Sidebar */}
      <div className={`fixed inset-0 z-[300] transition-all duration-400 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
        <aside className={`absolute top-0 left-0 h-full w-full max-w-xs bg-white shadow-3xl transition-transform duration-400 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col`}>
          <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
             <span className="font-black text-xs text-slate-400 uppercase tracking-[0.3em]">System Directory</span>
             <button onClick={() => setIsMenuOpen(false)} className="w-8 h-8 flex items-center justify-center text-slate-300 hover:text-rose-500 font-black">✕</button>
          </div>

          <nav className="flex-grow overflow-y-auto no-scrollbar p-4 space-y-1">
             {CATEGORIES.map(cat => (
               <div key={cat.id}>
                 <button 
                  onClick={() => setExpandedCat(expandedCat === cat.id ? null : cat.id)}
                  className={`w-full p-4 flex items-center justify-between rounded-2xl transition-all ${expandedCat === cat.id ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' : 'hover:bg-slate-50 text-slate-600'}`}
                 >
                   <div className="flex items-center gap-4">
                     <span className="text-lg">{cat.icon}</span>
                     <span className="text-[11px] font-black uppercase tracking-widest">{cat.name}</span>
                   </div>
                   <span className={`text-[8px] transition-transform duration-300 ${expandedCat === cat.id ? 'rotate-180' : ''}`}>▼</span>
                 </button>
                 
                 {expandedCat === cat.id && (
                   <div className="ml-8 space-y-1 py-2 border-l-2 border-slate-100 pl-4 animate-in slide-in-from-left-2 duration-300">
                     {TOOLS.filter(t => t.category === cat.id).slice(0, 15).map(tool => (
                       <button 
                        key={tool.slug}
                        onClick={() => { onNavigate('tool', { slug: tool.slug }); setIsMenuOpen(false); }}
                        className="w-full text-left p-2.5 text-[11px] font-bold text-slate-400 hover:text-indigo-600 transition-colors truncate"
                       >
                         {tool.title}
                       </button>
                     ))}
                     <button onClick={() => { onNavigate('category', { id: cat.id }); setIsMenuOpen(false); }} className="w-full text-left p-2.5 text-[9px] font-black text-indigo-400 uppercase hover:underline">Explore All Cluster Tools →</button>
                   </div>
                 )}
               </div>
             ))}
          </nav>
        </aside>
      </div>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-slate-950 text-white/40 py-12 px-8 border-t border-white/5 text-center">
         <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-[9px] font-black uppercase tracking-[0.4em]">© 2026 ToolVerse World Ecosystem</p>
            <div className="flex gap-8 text-[9px] font-black uppercase tracking-widest">
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
