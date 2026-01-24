
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
  const isTrending = tier === 'TIER_1' || (tool.priority && tool.priority >= 95);

  if (isMini) {
    return (
      <div 
        onClick={onClick}
        data-addon-tool={tool.slug}
        data-addon-cat={tool.category}
        className="group flex items-center p-6 bg-white rounded-[2rem] border border-slate-100 hover:border-indigo-300 hover:shadow-xl transition-all cursor-pointer relative overflow-hidden"
      >
        <div className={`w-14 h-14 ${category?.color || 'bg-slate-500'} bg-opacity-10 rounded-xl flex items-center justify-center text-3xl mr-6 group-hover:scale-110 transition-transform`}>
          {category?.icon || '🛠️'}
        </div>
        <div className="flex-grow pr-4">
          <h3 className="text-lg font-black text-slate-900 group-hover:text-indigo-600 line-clamp-1 transition-colors leading-tight tracking-tight">{tool.title}</h3>
          <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em] mt-1">{tool.category}</p>
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); onToggleFavorite?.(tool.slug); }}
          className={`text-2xl transition-all hover:scale-125 ${isFavorite ? 'text-yellow-400' : 'text-slate-100 hover:text-yellow-400'}`}
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
      className="group bg-white rounded-[3.5rem] p-10 border border-slate-100 hover:border-indigo-300 hover:shadow-[0_40px_80px_-20px_rgba(79,70,229,0.15)] transition-all duration-500 cursor-pointer flex flex-col h-full relative overflow-hidden"
    >
      {isTrending && (
        <div className="absolute -right-16 top-8 bg-indigo-600 text-white text-[8px] font-black uppercase tracking-[0.3em] py-2 w-48 text-center rotate-45 shadow-xl z-10">
          TRENDING
        </div>
      )}

      <div className="flex justify-between items-start mb-8">
        <div className={`w-20 h-20 ${category?.color || 'bg-slate-500'} bg-opacity-10 rounded-[1.5rem] flex items-center justify-center text-5xl group-hover:rotate-6 transition-all duration-500`}>
          {category?.icon || '🛠️'}
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); onToggleFavorite?.(tool.slug); }}
          className={`text-4xl transition-all hover:scale-125 z-20 ${isFavorite ? 'text-yellow-400 drop-shadow-xl' : 'text-slate-100 hover:text-yellow-400'}`}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </div>
      
      <h3 className="text-2xl md:text-3xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors mb-4 leading-none tracking-tight">{tool.title}</h3>
      <p className="text-slate-400 line-clamp-2 flex-grow mb-10 text-sm md:text-base leading-relaxed font-medium">{tool.description}</p>
      
      <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
        <div className="text-[9px] font-black text-indigo-600 uppercase tracking-[0.3em] flex items-center group-hover:translate-x-2 transition-transform duration-500">
          LAUNCH TOOL
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
        </div>
      </div>
    </div>
  );
};

export default ToolCard;
