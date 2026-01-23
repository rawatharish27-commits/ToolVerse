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
        className="group flex items-center p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-indigo-200 transition-all cursor-pointer relative"
      >
        <div className={`w-16 h-16 ${category?.color || 'bg-slate-500'} bg-opacity-10 rounded-2xl flex items-center justify-center text-4xl mr-6 group-hover:scale-110 transition-transform`}>
          {category?.icon || '🛠️'}
        </div>
        <div className="flex-grow pr-5">
          <h3 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 line-clamp-1 transition-colors leading-tight tracking-tight">{tool.title}</h3>
          <p className="text-[12px] text-slate-400 font-black uppercase tracking-widest mt-1.5">{tool.category}</p>
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite?.(tool.slug);
          }}
          className={`text-4xl transition-all hover:scale-125 ${isFavorite ? 'text-yellow-400' : 'text-slate-100 hover:text-yellow-400'}`}
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
      className="group bg-white rounded-[3.5rem] p-12 shadow-sm border border-slate-100 hover:shadow-[0_40px_80px_-20px_rgba(79,70,229,0.2)] hover:border-indigo-200 transition-all duration-500 cursor-pointer flex flex-col h-full relative overflow-hidden"
    >
      {isTrending && (
        <div className="absolute -right-16 top-8 bg-indigo-600 text-white text-[11px] font-black uppercase tracking-[0.2em] py-2.5 w-56 text-center rotate-45 shadow-xl z-10 pointer-events-none">
          High Traffic
        </div>
      )}

      <button 
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite?.(tool.slug);
        }}
        className={`absolute top-12 right-12 text-5xl transition-all hover:scale-125 z-20 ${isFavorite ? 'text-yellow-400 drop-shadow-md' : 'text-slate-50 hover:text-yellow-400'}`}
      >
        {isFavorite ? '★' : '☆'}
      </button>

      <div className="flex justify-between items-start mb-12">
        <div className={`w-24 h-24 ${category?.color || 'bg-slate-500'} bg-opacity-10 rounded-[2rem] flex items-center justify-center text-6xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-inner`}>
          {category?.icon || '🛠️'}
        </div>
      </div>
      
      <h3 className="text-3xl md:text-4xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors mb-6 leading-[1.1] tracking-tighter">{tool.title}</h3>
      <p className="text-slate-500 line-clamp-3 flex-grow mb-12 text-lg md:text-xl leading-relaxed font-medium">{tool.description}</p>
      
      <div className="pt-10 border-t border-slate-50 flex items-center justify-between">
        <div className="text-sm font-black text-indigo-600 uppercase tracking-widest flex items-center group-hover:translate-x-3 transition-transform">
          Launch Utility
          <svg className="ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
        </div>
        <span className="text-[11px] font-black text-slate-300 uppercase tracking-widest">{category?.name}</span>
      </div>
    </div>
  );
};

export default ToolCard;