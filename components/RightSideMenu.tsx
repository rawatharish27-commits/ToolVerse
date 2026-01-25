
import React from 'react';
import { CATEGORIES } from '../data/categories';
import { TOOLS } from '../data/tools';

interface RightSideMenuProps {
  onNavigate: (page: string, params?: any) => void;
}

const RightSideMenu: React.FC<RightSideMenuProps> = ({ onNavigate }) => {
  return (
    <aside className="lg:sticky lg:top-32 space-y-10">
      {/* TECHNIQUE 1: Glassmorphic Control Panel */}
      <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-2xl shadow-slate-200/50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 opacity-20"></div>
        
        <div className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-10 flex items-center gap-4">
          <span className="w-10 h-1 bg-indigo-600 rounded-full"></span>
          System Directory
        </div>

        <nav className="space-y-10 max-h-[65vh] overflow-y-auto no-scrollbar pr-2 pb-10">
          {CATEGORIES.map(category => {
            const categoryTools = TOOLS.filter(t => t.category === category.id).sort((a,b) => (b.priority || 0) - (a.priority || 0));
            if (categoryTools.length === 0) return null;

            return (
              <div key={category.id} className="space-y-5 group/cat">
                <div 
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => {
                    const el = document.getElementById(`cat-${category.id}`);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                    else onNavigate('category', { id: category.id });
                  }}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl group-hover/cat:scale-125 group-hover/cat:rotate-12 transition-all duration-500">{category.icon}</span>
                    <span className="text-[11px] font-black uppercase tracking-widest text-slate-900 group-hover/cat:text-indigo-600 transition-colors">{category.name}</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-300 group-hover/cat:text-indigo-400">{categoryTools.length}</span>
                </div>

                <ul className="space-y-3 ml-6 border-l-2 border-slate-50 pl-6">
                  {categoryTools.slice(0, 10).map(tool => (
                    <li key={tool.slug}>
                      <button 
                        onClick={() => onNavigate('tool', { slug: tool.slug })}
                        className="text-[10px] font-bold text-slate-400 hover:text-indigo-600 hover:translate-x-1 text-left leading-tight transition-all line-clamp-1 flex items-center gap-2 group/tool"
                      >
                        <span className="w-1 h-1 rounded-full bg-slate-200 group-hover/tool:bg-indigo-400 group-hover/tool:scale-150 transition-all"></span>
                        {tool.title}
                      </button>
                    </li>
                  ))}
                  {categoryTools.length > 10 && (
                     <li>
                        <button 
                          onClick={() => onNavigate('category', { id: category.id })}
                          className="text-[9px] font-black text-indigo-400 uppercase tracking-tighter hover:underline"
                        >
                          + {categoryTools.length - 10} More Utilities
                        </button>
                     </li>
                  )}
                </ul>
              </div>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-white via-white to-transparent pt-16">
           <div className="inline-flex items-center w-full px-6 py-3 bg-slate-900 text-white rounded-2xl shadow-xl">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full mr-4 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                {TOOLS.length} Global Logic Nodes Live
              </span>
           </div>
        </div>
      </div>
      
      {/* ENTERPRISE CALL-TO-ACTION */}
      <div className="bg-slate-950 rounded-[3rem] p-10 text-white relative overflow-hidden group shadow-2xl">
         <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
               <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center text-xl">🏢</div>
               <h4 className="text-xs font-black uppercase tracking-widest">Enterprise API</h4>
            </div>
            <p className="text-[11px] text-slate-400 font-medium leading-relaxed mb-8">Scale your operations with bulk processing endpoints and private logic isolation.</p>
            <button 
              onClick={() => onNavigate('contact')}
              className="w-full py-5 bg-white text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-indigo-400 hover:text-white transition-all transform active:scale-95"
            >
              Request Access Node
            </button>
         </div>
         <div className="absolute -bottom-10 -right-10 text-[10rem] opacity-5 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-1000">🚀</div>
      </div>
    </aside>
  );
};

export default RightSideMenu;
