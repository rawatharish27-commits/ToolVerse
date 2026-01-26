
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { CATEGORIES } from '../data/categories';
import { TOOLS } from '../data/tools';
import { getAttractionState, getUserLevel } from '../utils/attraction';
import { querySearchIndex, SearchResult } from '../utils/searchEngine';

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
  
  // Advanced Search State
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const syncState = () => setPoints(getAttractionState().points);
    syncState();
    window.addEventListener('attraction_update', syncState);
    
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('attraction_update', syncState);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const level = useMemo(() => getUserLevel(points), [points]);

  const suggestions = useMemo(() => querySearchIndex(searchQuery), [searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onSearch(val);
    setShowSuggestions(val.length > 0);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      if (selectedIndex >= 0) {
        const item = suggestions[selectedIndex];
        handleSelectSuggestion(item);
      } else {
        setShowSuggestions(false);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (item: SearchResult) => {
    setShowSuggestions(false);
    onSearch(""); // Clear for next time
    if (item.type === 'tool') onNavigate('tool', { slug: item.id });
    else if (item.type === 'category') onNavigate('category', { id: item.id });
    else if (item.type === 'intent') {
      onSearch(item.id.replace('intent-', '')); 
    }
  };

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

          {/* Advanced Search Node */}
          <div ref={searchRef} className="flex-grow max-w-lg relative">
            <div className="relative group">
              <input 
                ref={inputRef}
                type="text" 
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
                onFocus={() => searchQuery.length > 0 && setShowSuggestions(true)}
                placeholder="Search 500+ logic nodes..." 
                className="w-full pl-11 pr-5 py-3 bg-slate-100 border-none rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:bg-white transition-all font-bold text-slate-700 text-sm shadow-inner"
              />
              <svg className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${searchQuery ? 'text-indigo-500' : 'text-slate-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeWidth="3" strokeLinecap="round"/></svg>
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-[2rem] shadow-3xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300 z-[300]">
                <div className="p-2">
                  <div className="px-4 py-2 text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 mb-1">
                    Direct Navigation
                  </div>
                  {suggestions.map((item, idx) => (
                    <div 
                      key={item.id}
                      onClick={() => handleSelectSuggestion(item)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all ${selectedIndex === idx ? 'bg-indigo-50 translate-x-1' : 'hover:bg-slate-50'}`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${item.type === 'intent' ? 'bg-amber-100 text-amber-600' : item.type === 'category' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-600'}`}>
                        {item.icon}
                      </div>
                      <div className="flex-grow">
                        <div className="text-xs font-black text-slate-900 leading-none mb-1">
                          {item.title}
                        </div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{item.subtitle}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
             <div className="flex flex-col items-end mr-1">
                <span className="text-[6px] font-black text-indigo-400 uppercase tracking-widest leading-none mb-1">NETWORK NODE</span>
                <span className="text-[10px] font-bold tracking-tight text-slate-900">{points} XP</span>
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
             <span className="font-black text-xs text-slate-400 uppercase tracking-[0.3em]">Command Center</span>
             <button onClick={() => setIsMenuOpen(false)} className="w-8 h-8 flex items-center justify-center text-slate-300 hover:text-rose-500 font-black">✕</button>
          </div>

          <nav className="flex-grow overflow-y-auto no-scrollbar p-4 space-y-1">
             <button 
              onClick={() => { onNavigate('home'); setIsMenuOpen(false); }}
              className="w-full p-4 flex items-center gap-4 rounded-2xl hover:bg-slate-50 text-slate-600 mb-2 transition-all"
             >
                <span className="text-lg">🏠</span>
                <span className="text-[11px] font-black uppercase tracking-widest">Master Core</span>
             </button>

             {CATEGORIES.map(cat => {
               const catTools = TOOLS.filter(t => t.category === cat.id);
               return (
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
                       {catTools.length > 0 ? catTools.slice(0, 20).map(tool => (
                         <button 
                          key={tool.slug}
                          onClick={() => { onNavigate('tool', { slug: tool.slug }); setIsMenuOpen(false); }}
                          className="w-full text-left p-2.5 text-[11px] font-bold text-slate-400 hover:text-indigo-600 transition-colors truncate"
                         >
                           {tool.title}
                         </button>
                       )) : (
                         <span className="block p-2 text-[10px] text-slate-300 italic">Syncing nodes...</span>
                       )}
                       <button onClick={() => { onNavigate('category', { id: cat.id }); setIsMenuOpen(false); }} className="w-full text-left p-2.5 text-[9px] font-black text-indigo-400 uppercase hover:underline">Explore Category Hub →</button>
                     </div>
                   )}
                 </div>
               );
             })}
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
