
import React from 'react';
import { Tool } from '../types';
import { CATEGORIES } from '../data/categories';

interface ToolCardProps {
  tool: Tool;
  onClick: () => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, onClick }) => {
  const category = CATEGORIES.find(c => c.id === tool.category);

  return (
    <div 
      onClick={onClick}
      className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:border-indigo-100 transition-all cursor-pointer flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`w-12 h-12 ${category?.color || 'bg-slate-500'} bg-opacity-10 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
          {category?.icon || '🛠️'}
        </div>
        {tool.toolType === 'ai' && (
          <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-[10px] font-bold uppercase rounded-md flex items-center">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 10-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM13.536 14.95a1 1 0 010-1.414l.707-.707a1 1 0 111.414 1.414l-.707.707a1 1 0 01-1.414 0zM6.464 14.95a1 1 0 01-1.414 0l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 010 1.414z" /></svg>
            AI
          </span>
        )}
      </div>
      <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-2">{tool.title}</h3>
      <p className="text-sm text-slate-500 line-clamp-2 flex-grow">{tool.description}</p>
      <div className="mt-4 pt-4 border-t border-slate-50 flex items-center text-xs font-semibold text-indigo-600 group-hover:translate-x-1 transition-transform">
        Use Tool 
        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
      </div>
    </div>
  );
};

export default ToolCard;
