
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

const ToolCard: React.FC<ToolCardProps> = ({ tool, onClick, isMini, isFavorite, onToggleFavorite }) => {
  const category = CATEGORIES.find(c => c.id === tool.category);

  if (isMini) {
    return (
      <div 
        onClick={onClick}
        className="group flex items-center p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer relative"
      >
        <div className={`w-10 h-10 ${category?.color || 'bg-slate-500'} bg-opacity-10 rounded-xl flex items-center justify-center text-xl mr-4 group-hover:scale-110 transition-transform`}>
          {category?.icon || '🛠️'}
        </div>
        <div className="flex-grow pr-4">
          <h3 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 line-clamp-1 transition-colors">{tool.title}</h3>
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite?.(tool.slug);
          }}
          className={`text-lg transition-all hover:scale-125 ${isFavorite ? 'text-yellow-400' : 'text-slate-200 hover:text-yellow-400'}`}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </div>
    );
  }

  return (
    <div 
      onClick={onClick}
      className="group bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 hover:shadow-2xl hover:border-indigo-100 transition-all cursor-pointer flex flex-col h-full relative"
    >
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite?.(tool.slug);
        }}
        className={`absolute top-6 right-6 text-2xl transition-all hover:scale-125 z-20 ${isFavorite ? 'text-yellow-400 drop-shadow-sm' : 'text-slate-200 hover:text-yellow-400'}`}
      >
        {isFavorite ? '★' : '☆'}
      </button>

      <div className="flex justify-between items-start mb-6">
        <div className={`w-14 h-14 ${category?.color || 'bg-slate-500'} bg-opacity-10 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform`}>
          {category?.icon || '🛠️'}
        </div>
      </div>
      
      <h3 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors mb-2 leading-tight">{tool.title}</h3>
      <p className="text-sm text-slate-500 line-clamp-2 flex-grow mb-6 leading-relaxed">{tool.description}</p>
      
      <div className="pt-4 border-t border-slate-50 flex items-center text-xs font-black text-indigo-600 uppercase tracking-widest group-hover:translate-x-1 transition-transform">
        Open Tool 
        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
      </div>
    </div>
  );
};

export default ToolCard;
