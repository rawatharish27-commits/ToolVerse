
import React, { useState } from 'react';
import { CATEGORIES } from '../data/categories';
import { TOOLS } from '../data/tools';

interface LayoutProps {
  children: React.ReactNode;
  onNavigate: (page: string, params?: any) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="sticky top-0 z-[200] bg-white/80 backdrop-blur-xl border-b border-slate-100 h-20">
        <div className="max-w-[1600px] mx-auto px-8 h-full flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 bg-slate-50 rounded-xl hover:bg-indigo-50 transition-colors"
            >
              <span className="w-5 h-0.5 bg-slate-400 rounded-full"></span>
              <span className="w-5 h-0.5 bg-slate-400 rounded-full"></span>
              <span className="w-5 h-0.5 bg-slate-400 rounded-full"></span>
            </button>
            <div onClick={() => onNavigate('home')} className="cursor-pointer group">
              <span className="text-xl font-black tracking-tighter">Tool<span className="text-indigo-600">Verse</span></span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
             <button onClick={() => onNavigate('home')} className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-indigo-600">Home</button>
             <button onClick={() => onNavigate('directory')} className="text-[10px] font-black uppercase tracking-widest text-slate-900 border-b-2 border-indigo-600">Browse All 100 Tools</button>
          </nav>
        </div>
      </header>

      {/* Side Directory Menu */}
      <div className={`fixed inset-0 z-[300] transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
        <aside className={`absolute top-0 left-0 h-full w-80 bg-white shadow-2xl transition-transform duration-300 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col`}>
          <div className="p-8 border-b border-slate-50 flex justify-between items-center">
            <span className="font-black uppercase tracking-widest text-xs">Directory</span>
            <button onClick={() => setIsMenuOpen(false)} className="text-slate-300 hover:text-rose-500 font-black">✕</button>
          </div>
          <div className="flex-grow overflow-y-auto p-6 space-y-8 no-scrollbar">
            {CATEGORIES.map(cat => (
              <div key={cat.id}>
                <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                   <span>{cat.icon}</span> {cat.name}
                </h4>
                <ul className="space-y-2">
                  {TOOLS.filter(t => t.category === cat.id).map(tool => (
                    <li key={tool.slug}>
                      <button 
                        onClick={() => { onNavigate('tool', { slug: tool.slug }); setIsMenuOpen(false); }}
                        className="text-[11px] font-bold text-slate-600 hover:text-indigo-600 transition-colors text-left w-full line-clamp-1"
                      >
                        {tool.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-white border-t border-slate-100 py-12">
        <div className="max-w-[1600px] mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
           <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">© 2026 ToolVerse Engineering</span>
           <div className="flex gap-8">
              <button className="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600">Privacy</button>
              <button className="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600">Terms</button>
              <button className="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600">API</button>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
