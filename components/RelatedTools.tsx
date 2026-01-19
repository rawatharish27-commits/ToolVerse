
import React from 'react';
import { TOOLS } from '../data/tools';
import { CategorySlug } from '../types';
import { calculateToolTier, getToolPriorityScore } from '../utils/toolPriority';

interface RelatedToolsProps {
  currentSlug: string;
  category: CategorySlug;
  onNavigate: (page: string, params?: any) => void;
}

const RelatedTools: React.FC<RelatedToolsProps> = ({ currentSlug, category, onNavigate }) => {
  // MONEY FLOW: Sort by category match first, then by dynamic Tier score
  const related = TOOLS
    .filter(t => t.slug !== currentSlug)
    .sort((a, b) => {
      const aInCat = a.category === category ? 1 : 0;
      const bInCat = b.category === category ? 1 : 0;
      if (aInCat !== bInCat) return bInCat - aInCat;
      
      // Secondary sort using the Priority Score engine
      return getToolPriorityScore(b) - getToolPriorityScore(a);
    })
    .slice(0, 6);

  if (related.length === 0) return null;

  return (
    <section className="mt-16 pt-16 border-t border-slate-100">
      <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center">
        <span className="w-1.5 h-6 bg-indigo-600 rounded-full mr-3"></span>
        Suggested Tools for You
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {related.map(tool => {
          const tier = calculateToolTier(tool);
          return (
            <button
              key={tool.slug}
              onClick={() => onNavigate('tool', { slug: tool.slug })}
              className="flex flex-col text-left p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all group"
            >
              <div className="flex justify-between items-start mb-2">
                 <span className="text-sm font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{tool.title}</span>
                 {tier === 'TIER_1' && <span className="text-[8px] bg-amber-100 text-amber-600 px-1.5 py-0.5 rounded font-bold uppercase">Popular</span>}
              </div>
              <span className="text-xs text-slate-400 line-clamp-2">{tool.description}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default RelatedTools;
