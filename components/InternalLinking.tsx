
import React from 'react';
import { CATEGORIES } from '../data/categories';
import { TOOLS } from '../data/tools';

interface InternalLinkingProps {
  onNavigate: (page: string, params?: any) => void;
}

const InternalLinking: React.FC<InternalLinkingProps> = ({ onNavigate }) => {
  return (
    <section className="bg-white border-t border-slate-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-10 text-center">
          Explore Our Tool Clusters
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-12 gap-y-16">
          {CATEGORIES.map(cat => {
            // Sort category tools by revenue priority before slicing
            const catTools = TOOLS
              .filter(t => t.category === cat.id)
              .sort((a, b) => (b.priority || 0) - (a.priority || 0))
              .slice(0, 8);
              
            if (catTools.length === 0) return null;

            return (
              <div key={cat.id} className="space-y-4">
                <h3 
                  onClick={() => onNavigate('category', { id: cat.id })}
                  className="text-sm font-black text-slate-900 cursor-pointer hover:text-indigo-600 flex items-center"
                >
                  <span className="mr-2 opacity-50">{cat.icon}</span>
                  {cat.name}
                </h3>
                <ul className="space-y-2">
                  {catTools.map(tool => (
                    <li key={tool.slug}>
                      <button 
                        onClick={() => onNavigate('tool', { slug: tool.slug })}
                        className="text-xs text-slate-500 hover:text-indigo-500 hover:underline text-left transition-all"
                      >
                        {tool.title}
                        {tool.priority && tool.priority >= 90 && <span className="ml-1 text-[8px] bg-indigo-50 text-indigo-500 px-1 rounded">HOT</span>}
                      </button>
                    </li>
                  ))}
                  <li>
                     <button 
                      onClick={() => onNavigate('category', { id: cat.id })}
                      className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest hover:text-indigo-600"
                    >
                      View All {cat.name} →
                    </button>
                  </li>
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default InternalLinking;
