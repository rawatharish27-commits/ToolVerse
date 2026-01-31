
import React, { useMemo, useState } from 'react';
import { TOOL_REGISTRY } from '../core/toolRegistry';
import { getCategoryById } from '../core/categoryRegistry';
import ToolCard from '../components/ToolCard';
import AdSenseManager from '../components/AdSenseManager';
import SEOHead from '../components/SEOHead';
import UniversalSEOLayer from '../components/UniversalSEOLayer';

interface Props {
  categoryId: string;
  onNavigate: (page: string, params?: any) => void;
}

const CategoryPage: React.FC<Props> = ({ categoryId, onNavigate }) => {
  const [activeSub, setActiveSub] = useState<string>('All');
  
  const category = useMemo(() => getCategoryById(categoryId), [categoryId]);
  
  // Dynamic Tool Filtering & Sorting
  const categoryTools = useMemo(() => 
    TOOL_REGISTRY.filter(t => t.category === categoryId)
         .sort((a, b) => (b.priority || 0) - (a.priority || 0)), 
    [categoryId]
  );

  // Auto-Clustering logic for sub-navigation
  const clusters = useMemo(() => {
    const subs = new Set<string>();
    categoryTools.forEach(t => {
      const type = t.title.toLowerCase().includes('calculator') ? 'Calculators' : 
                   t.title.toLowerCase().includes('analyzer') || t.title.toLowerCase().includes('checker') ? 'Diagnostics' :
                   'Processors';
      subs.add(type);
    });
    return ['All', ...Array.from(subs)];
  }, [categoryTools]);

  const filteredTools = useMemo(() => {
    if (activeSub === 'All') return categoryTools;
    return categoryTools.filter(t => {
       const type = t.title.toLowerCase().includes('calculator') ? 'Calculators' : 
                    t.title.toLowerCase().includes('analyzer') || t.title.toLowerCase().includes('checker') ? 'Diagnostics' :
                    'Processors';
       return type === activeSub;
    });
  }, [categoryTools, activeSub]);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-20">
         <div className="text-center space-y-6">
            <div className="text-9xl grayscale opacity-20">📂</div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter">CATEGORY_NOT_RESOLVED</h2>
            <button onClick={() => onNavigate('home')} className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-black text-xs uppercase tracking-widest">Back to Origin</button>
         </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <SEOHead 
        title={`${category.name} Solutions Hub`} 
        description={`Access ${category.toolCount} professional ${category.name} tools. High-performance browser-native nodes with zero upload privacy.`} 
        url={`/category/${categoryId}`} 
      />
      <UniversalSEOLayer category={category as any} />

      <section className="bg-slate-950 py-32 md:py-48 px-6 text-center relative overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/15 via-transparent to-transparent"></div>
         <div className="max-w-4xl mx-auto px-6 relative z-10">
            <div className="inline-flex items-center px-6 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-[10px] font-black uppercase tracking-[0.4em] mb-12">
               Active Logic Hub v5.0
            </div>
            <h1 className="text-7xl md:text-[9rem] font-black text-white tracking-tighter mb-10 leading-[0.8]">
              {category.name}
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 font-medium italic max-w-2xl mx-auto leading-relaxed">
              " {category.description} "
            </p>
         </div>
      </section>

      <div className="max-w-[1600px] mx-auto px-8 py-16">
         <div className="flex flex-col md:flex-row items-center justify-between mb-24 border-b border-slate-100 pb-12 gap-8">
            <div className="flex flex-col items-start">
               <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.3em] mb-2">{category.toolCount} Intelligence Nodes Ready</h3>
               <p className="text-xs text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                 Registry Sync: Verified
               </p>
            </div>
            
            <div className="flex flex-wrap gap-3 justify-center">
               {clusters.map(sub => (
                 <button
                   key={sub}
                   onClick={() => setActiveSub(sub)}
                   className={`px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all transform active:scale-95 ${
                     activeSub === sub ? 'bg-indigo-600 text-white shadow-2xl' : 'bg-slate-50 text-slate-400 hover:bg-slate-100 border border-transparent hover:border-slate-200'
                   }`}
                 >
                   {sub}
                 </button>
               ))}
            </div>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {filteredTools.map(tool => (
              <ToolCard 
                key={tool.slug} 
                tool={tool} 
                onClick={() => onNavigate('tool', { slug: tool.slug })} 
              />
            ))}
         </div>

         <div className="mt-32">
            <AdSenseManager slotId={`CAT_${categoryId.toUpperCase()}_AUTO_MID`} type="mid" />
         </div>
         
         <div className="mt-48 p-16 bg-slate-50 rounded-[4rem] border border-slate-100 relative overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20">
               <div className="space-y-8">
                  <h4 className="text-2xl font-black text-slate-900 tracking-tight">The {category.name} Ecosystem</h4>
                  <p className="text-slate-500 font-medium leading-relaxed">
                    Our {category.name} cluster implements the latest in browser-native technology. By moving logic execution from our servers to your device, we guarantee 100% data privacy.
                  </p>
               </div>
               <div className="space-y-6">
                  <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Trending in this Cluster</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                     {categoryTools.slice(0, 4).map(t => (
                        <button 
                           key={t.slug}
                           onClick={() => onNavigate('tool', { slug: t.slug })}
                           className="text-left p-4 bg-white hover:bg-indigo-50 border border-slate-100 rounded-2xl transition-all"
                        >
                           <span className="text-[11px] font-black text-slate-700 block line-clamp-1">{t.title}</span>
                           <span className="text-[8px] font-bold text-indigo-400 uppercase tracking-tighter">Launch Node →</span>
                        </button>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default CategoryPage;
