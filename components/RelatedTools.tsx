
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
  // 🔁 CATEGORY-BASED LINKING RULE
  // Sort by category match first, then by priority score
  const related = TOOLS
    .filter(t => t.slug !== currentSlug)
    .sort((a, b) => {
      const aInCat = a.category === category ? 1 : 0;
      const bInCat = b.category === category ? 1 : 0;
      if (aInCat !== bInCat) return bInCat - aInCat;
      return getToolPriorityScore(b) - getToolPriorityScore(a);
    })
    .slice(0, 6);

  // 🧠 SMART “PEOPLE ALSO USE” (Semantic Signals)
  const semanticMatches = TOOLS
    .filter(t => t.slug !== currentSlug && (t.category === category || t.keywords.some(k => TOOLS.find(curr => curr.slug === currentSlug)?.keywords.includes(k))))
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <div className="space-y-16 mt-24 pt-16 border-t border-slate-100">
      {/* 1. PEOPLE ALSO USE (SEMANTIC CLUSTER) */}
      <section>
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-6">People also use</h3>
        <div className="flex flex-wrap gap-3">
          {semanticMatches.map(tool => (
            <button
              key={tool.slug}
              onClick={() => onNavigate('tool', { slug: tool.slug })}
              className="px-6 py-3 bg-slate-50 hover:bg-indigo-600 hover:text-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-600 transition-all shadow-sm"
            >
              {tool.title}
            </button>
          ))}
        </div>
      </section>

      {/* 2. RELATED UTILITIES (PRIMARY RETENTION) */}
      <section>
        <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center">
          <span className="w-1.5 h-6 bg-indigo-600 rounded-full mr-3"></span>
          Suggested Professional Tools
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {related.map(tool => {
            const tier = calculateToolTier(tool);
            return (
              <button
                key={tool.slug}
                onClick={() => onNavigate('tool', { slug: tool.slug })}
                className="flex flex-col text-left p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:border-indigo-200 transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                   <span className="text-sm font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">{tool.title}</span>
                   {tier === 'TIER_1' && (
                     <span className="text-[8px] bg-amber-100 text-amber-600 px-2 py-1 rounded-lg font-black uppercase tracking-tighter">Popular</span>
                   )}
                </div>
                <p className="text-xs text-slate-400 line-clamp-2 font-medium leading-relaxed">{tool.description}</p>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default RelatedTools;
