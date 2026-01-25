
import React from 'react';
import { Tool } from '../types';
import { CATEGORIES } from '../data/categories';

interface ToolCardProps {
  tool: Tool;
  onClick: () => void;
  isMini?: boolean;
  isFavorite?: boolean;
  onToggleFavorite?: (slug: string) => void;
}

const ToolCard: React.FC<ToolCardProps> = React.memo(({ tool, onClick, isMini, isFavorite, onToggleFavorite }) => {
  const category = CATEGORIES.find(c => c.id === tool.category);

  if (isMini) {
    return (
      <div 
        onClick={onClick}
        className="group flex items-center p-3.5 bg-white rounded-2xl border border-slate-100 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/5 transition-all cursor-pointer relative overflow-hidden"
      >
        <div className={`w-9 h-9 ${category?.color || 'bg-slate-500'} bg-opacity-10 rounded-xl flex items-center justify-center text-lg mr-3 group-hover:scale-110 transition-transform`}>
          {category?.icon || '🛠️'}
        </div>
        <div className="flex-grow pr-2">
          <h3 className="text-sm font-black text-slate-800 group-hover:text-indigo-600 line-clamp-1 transition-colors leading-tight tracking-tight">{tool.title}</h3>
          <p className="text-[7px] text-slate-400 font-black uppercase tracking-widest">{tool.category}</p>
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); onToggleFavorite?.(tool.slug); }}
          className={`text-lg transition-all hover:scale-125 ${isFavorite ? 'text-yellow-400' : 'text-slate-100 group-hover:text-slate-200'}`}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </div>
    );
  }

  return (
    <div 
      onClick={onClick}
      className="group bg-white rounded-[2.5rem] p-8 border border-slate-100 hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 cursor-pointer flex flex-col h-full relative overflow-hidden card-3d"
      data-addon-tool={tool.slug}
      data-addon-cat={tool.category}
    >
      {/* Visual Accents */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 group-hover:bg-indigo-50 transition-colors duration-500"></div>
      
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className={`w-14 h-14 ${category?.color || 'bg-slate-500'} text-white rounded-2xl flex items-center justify-center text-2xl shadow-xl shadow-indigo-500/10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
          {category?.icon || '🛠️'}
        </div>
        <div className="flex gap-2">
           {tool.toolType === 'ai' && (
             <span className="text-[8px] font-black bg-indigo-600 text-white px-2 py-1 rounded-lg uppercase tracking-widest">AI Core</span>
           )}
           {tool.toolType === 'client' && (
             <span className="text-[8px] font-black bg-emerald-100 text-emerald-600 px-2 py-1 rounded-lg uppercase tracking-widest">WASM-Native</span>
           )}
           <button 
            onClick={(e) => { e.stopPropagation(); onToggleFavorite?.(tool.slug); }}
            className={`text-2xl transition-transform hover:scale-125 ${isFavorite ? 'text-yellow-400 drop-shadow-md' : 'text-slate-200 hover:text-slate-300'}`}
          >
            ★
          </button>
        </div>
      </div>
      
      <div className="relative z-10 flex-grow">
        <h3 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors mb-3 leading-tight tracking-tight">{tool.title}</h3>
        <p className="text-slate-500 text-sm line-clamp-3 mb-6 leading-relaxed font-medium">{tool.description}</p>
      </div>
      
      <div className="pt-6 border-t border-slate-50 flex items-center justify-between relative z-10">
         <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest group-hover:text-indigo-500 transition-colors">Production Ready</span>
         </div>
         <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
         </div>
      </div>
    </div>
  );
});

export default ToolCard;
