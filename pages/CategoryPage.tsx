
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { ToolRegistry } from '../core/toolRegistry';
import { getCategoryById } from '../core/categoryRegistry';
import ToolCard from '../components/ToolCard';
import SEOHead from '../components/SEOHead';
import UniversalSEOLayer from '../components/UniversalSEOLayer';

interface Props {
  onNavigate: (page: string, params?: any) => void;
}

const CategoryPage: React.FC<Props> = ({ onNavigate }) => {
  const { id } = useParams<{ id: string }>();
  const category = useMemo(() => getCategoryById(id || ''), [id]);
  
  const categoryTools = useMemo(() => 
    ToolRegistry.getTools().filter(t => t.category === id),
    [id]
  );

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-20">
         <div className="text-9xl grayscale opacity-20 mb-8">📂</div>
         <h2 className="text-3xl font-black text-slate-900 tracking-tighter">CLUSTER_NOT_STAGED</h2>
         <button onClick={() => onNavigate('home')} className="mt-8 px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase text-xs">Return to Logic Hub</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <SEOHead title={`${category.name} Hub | ToolVerse`} description={category.description} />
      <UniversalSEOLayer category={category as any} />

      <section className="bg-slate-950 py-32 px-6 text-center relative overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent"></div>
         <div className="max-w-4xl mx-auto relative z-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-[10px] font-black uppercase tracking-[0.4em] mb-10">Logic Cluster: Node Alpha</span>
            <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter mb-8">{category.name}</h1>
            <p className="text-xl md:text-2xl text-slate-400 font-medium italic max-w-2xl mx-auto">" {category.description} "</p>
         </div>
      </section>

      <div className="max-w-[1600px] mx-auto px-8 py-20">
         <div className="flex items-center justify-between mb-16 border-b border-slate-50 pb-10">
            <div>
               <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">{categoryTools.length} Utilities Found</h3>
               <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1 flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                 Registry Sync: Online
               </p>
            </div>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categoryTools.map(tool => (
              <ToolCard 
                key={tool.slug} 
                tool={tool as any} 
                onClick={() => onNavigate('tool', { slug: tool.slug })} 
              />
            ))}
         </div>
      </div>
    </div>
  );
};

export default CategoryPage;
