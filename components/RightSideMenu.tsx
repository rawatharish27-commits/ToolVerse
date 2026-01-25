
import React from 'react';
import { CATEGORIES } from '../data/categories';
import { TOOLS } from '../data/tools';

interface RightSideMenuProps {
  onNavigate: (page: string, params?: any) => void;
}

const RightSideMenu: React.FC<RightSideMenuProps> = ({ onNavigate }) => {
  return (
    <aside className="space-y-10">
      <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-200">
        <div className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] mb-8 px-2 border-l-4 border-indigo-600">
          Tool Directory
        </div>

        <nav className="space-y-8 max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 pr-2">
          {CATEGORIES.map(category => {
            const categoryTools = TOOLS.filter(t => t.category === category.id);
            
            // Skip categories with no implemented tools
            if (categoryTools.length === 0) return null;

            return (
              <div key={category.id} className="space-y-3">
                <button 
                  onClick={() => onNavigate('category', { id: category.id })}
                  className="flex items-center gap-3 text-slate-900 hover:text-indigo-600 transition-colors group"
                >
                  <span className="text-lg">{category.icon}</span>
                  <span className="text-xs font-black uppercase tracking-widest">{category.name}</span>
                </button>

                <ul className="space-y-1 ml-4 border-l-2 border-slate-100 pl-4">
                  {categoryTools.map((tool, index) => (
                    <li key={tool.slug} className="relative py-1">
                      <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-3 h-px bg-slate-100"></div>
                      <button 
                        onClick={() => onNavigate('tool', { slug: tool.slug })}
                        className="text-[11px] font-medium text-slate-500 hover:text-indigo-600 hover:underline text-left line-clamp-1 transition-all"
                      >
                        {tool.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </nav>

        <div className="mt-8 pt-6 border-t border-slate-200 text-center">
          <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">
            {TOOLS.length} Professional Tools Active
          </p>
        </div>
      </div>
      
      {/* Visual Support Node */}
      <div className="bg-indigo-600 rounded-[2rem] p-6 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-[9px] font-black uppercase tracking-widest opacity-80 mb-2">Pro Access</p>
          <h4 className="text-sm font-bold leading-tight">Need a custom enterprise tool?</h4>
          <button 
            onClick={() => onNavigate('contact')}
            className="mt-4 px-4 py-2 bg-white text-indigo-600 rounded-lg font-black text-[9px] uppercase tracking-widest shadow-lg"
          >
            Request Node
          </button>
        </div>
        <div className="absolute -bottom-4 -right-4 text-6xl opacity-10 rotate-12">🛠️</div>
      </div>
    </aside>
  );
};

export default RightSideMenu;
