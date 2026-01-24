
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

const ToolCard: React.FC<ToolCardProps> = React.memo(({ tool, onClick, isMini, isFavorite, onToggleFavorite }) => {
  const category = CATEGORIES.find(c => c.id === tool.category);
  const tier = calculateToolTier(tool);
  const isTrending = tier === 'TIER_1' || (tool.priority && tool.priority >= 95);

  if (isMini) {
    return (
      <div 
        onClick={onClick}
        data-addon-tool={tool.slug}
        data-addon-cat={tool.category}
        className="group flex items-center p-3.5 bg-white rounded-xl border border-slate-100 hover:border-indigo-200 hover:shadow-sm transition-all cursor-pointer relative overflow-hidden"
      >
        <div className={`w-10 h-10 ${category?.color || 'bg-slate-500'} bg-opacity-10 rounded-lg flex items-center justify-center text-xl mr-3 group-hover:scale-110 transition-transform`}>
          {category?.icon || '🛠️'}
        </div>
        <div className="flex-grow pr-2">
          <h3 className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 line-clamp-1 transition-colors leading-tight">{tool.title}</h3>
          <p className="text-[7px] text-slate-400 font-bold uppercase tracking-wider">{tool.category}</p>
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); onToggleFavorite?.(tool.slug); }}
          className={`text-lg transition-all hover:scale-110 ${isFavorite ? 'text-yellow-400' : 'text-slate-100 hover:text-yellow-400'}`}
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
      className="group bg-white rounded-2xl p-6 border border-slate-100 hover:border-indigo-300 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col h-full relative overflow-hidden"
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`w-12 h-12 ${category?.color || 'bg-slate-500'} bg-opacity-10 rounded-xl flex items-center justify-center text-2xl group-hover:scale-105 transition-all`}>
          {category?.icon || '🛠️'}
        </div>
        {isTrending && (
          <span className="bg-indigo-50 text-indigo-600 text-[8px] font-black uppercase px-2 py-1 rounded-md">Trending</span>
        )}
      </div>
      
      <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-2 leading-snug">{tool.title}</h3>
      <p className="text-slate-500 text-xs line-clamp-2 flex-grow mb-4 leading-relaxed font-medium">{tool.description}</p>
      
      <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
         <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-indigo-500">Launch Utility</span>
         <button 
          onClick={(e) => { e.stopPropagation(); onToggleFavorite?.(tool.slug); }}
          className={`text-xl ${isFavorite ? 'text-yellow-400' : 'text-slate-200'}`}
        >
          ★
        </button>
      </div>
    </div>
  );
});

export default ToolCard;
