
import React from 'react';
import { Tool } from '../types';
import { CATEGORIES } from '../data/categories';
import { calculateToolTier } from '../utils/toolPriority';

interface ToolCardProps {
  tool: Tool;
  onClick: () => void;
  isMini?: boolean;
  isFavorite?: boolean;
  onToggleFavorite?: (slug: string) => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, onClick, isMini, isFavorite, onToggleFavorite }) => {
  const category = CATEGORIES.find(c => c.id === tool.category);
  const tier = calculateToolTier(tool);
  const isTrending = tier === 'TIER_1';

  if (isMini) {
    return (
      <div 
        onClick={onClick}
        data-addon-tool={tool.slug}
        data-addon-cat={tool.category}
        className="group flex items-center p-5 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all cursor-pointer relative"
      >
        <div className={`w-12 h-12 ${category?.color || 'bg-slate-500'} bg-opacity-10 rounded-2xl flex items-center justify-center text-2xl mr-5 group-hover:scale-110 transition-transform`}>
          {category?.icon || '🛠️'}
        </div>
        <div className="flex-grow pr-4">
          <h3 className="text-sm font-black text-slate-900 group-hover:text-indigo-600 line-clamp-1 transition-colors leading-tight">{tool.title}</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{tool.category}</p>
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite?.(tool.slug);
          }}
          className={`text-2xl transition-all hover:scale-125 ${isFavorite ? 'text-yellow-400' : 'text-slate-200 hover:text-yellow-400'}`}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </div>
    );
  }

  return (
    <div 
      onClick={onClick}
      data-addon-tool={tool.slug}
      data-addon-cat={tool.category}
      className="group bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 hover:shadow-[0_40px_80px_-20px_rgba(79,70,229,0.15)] hover:border-indigo-100 transition-all duration-500 cursor-pointer flex flex-col h-full relative overflow-hidden"
    >
      {isTrending && (
        <div className="absolute -right-14 top-6 bg-indigo-600 text-white text-[9px] font-black uppercase tracking-[0.2em] py-2 w-48 text-center rotate-45 shadow-xl z-10 pointer-events-none">
          Popular
        </div>
      )}

      <button 
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite?.(tool.slug);
        }}
        className={`absolute top-8 right-8 text-3xl transition-all hover:scale-125 z-20 ${isFavorite ? 'text-yellow-400 drop-shadow-sm' : 'text-slate-100 hover:text-yellow-400'}`}
      >
        {isFavorite ? '★' : '☆'}
      </button>

      <div className="flex justify-between items-start mb-8">
        <div className={`w-16 h-16 ${category?.color || 'bg-slate-500'} bg-opacity-10 rounded-[1.25rem] flex items-center justify-center text-4xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
          {category?.icon || '🛠️'}
        </div>
      </div>
      
      <h3 className="text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors mb-4 leading-tight tracking-tight">{tool.title}</h3>
      <p className="text-slate-500 line-clamp-3 flex-grow mb-8 leading-relaxed font-medium">{tool.description}</p>
      
      <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
        <div className="text-[10px] font-black text-indigo-600 uppercase tracking-widest flex items-center group-hover:translate-x-2 transition-transform">
          Open Utility 
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
        </div>
        <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{category?.name}</span>
      </div>
    </div>
  );
};

export default ToolCard;
