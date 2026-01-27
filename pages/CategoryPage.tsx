
import React, { useMemo } from 'react';
import { CATEGORIES } from '../data/categories';
import { TOOLS } from '../data/tools';
import { CategorySlug } from '../types';
import ToolCard from '../components/ToolCard';
import AdPlaceholder from '../components/AdPlaceholder';
import SEOHead from '../components/SEOHead';
import UniversalSEOLayer from '../components/UniversalSEOLayer';

interface CategoryPageProps {
  categoryId: CategorySlug;
  onNavigate: (page: string, params?: any) => void;
  favorites: string[];
  onToggleFavorite: (slug: string) => void;
}

/**
 * ToolVerse Exhaustive Category Hub
 * Renders ALL tools belonging to a logic cluster from the Master Registry.
 */
const CategoryPage: React.FC<CategoryPageProps> = ({ categoryId, onNavigate, favorites, onToggleFavorite }) => {
  const category = useMemo(() => CATEGORIES.find(c => c.id === categoryId), [categoryId]);
  
  // LIVE AUDIT: Fetch every single tool mapped to this category ID
  const categoryTools = useMemo(() => 
    TOOLS.filter(t => t.category === categoryId)
      .sort((a, b) => {
        // Sort by Priority, then Alphabetically
        if ((b.priority || 0) !== (a.priority || 0)) {
          return (b.priority || 0) - (a.priority || 0);
        }
        return a.title.localeCompare(b.title);
      }), 
  [categoryId]);

  if (!category) return (
    <div className="h-screen flex flex-col items-center justify-center gap-6">
       <div className="text-8xl">🌫️</div>
       <p className="font-black text-slate-400 uppercase tracking-widest text-sm">Cluster node not resolved.</p>
       <button onClick={() => onNavigate('home')} className="px-12 py-5 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest">Back to master core</button>
    </div>
  );

  return (
    <div className="pb-32 bg-white">
      <SEOHead 
        title={`${category.name} | ${categoryTools.length} Professional Tools`}
        description={`Access all ${categoryTools.length} tools in the ${category.name} hub. ${category.description}.`}
        url={`https://toolverse-4gr.pages.dev/category/${category.id}`}
      />

      <UniversalSEOLayer category={category} />

      <section className="relative h-[50vh] md:h-[60vh] flex items-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
           <img src={category.images[0]} alt={category.name} className="w-full h-full object-cover opacity-30 scale-105" />
           <div className="absolute inset-0 bg-gradient-to-t from-white via-white/5 to-transparent"></div>
           <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent"></div>
        </div>
        <div className="max-w-[1600px] mx-auto px-8 relative z-10 w-full">
          <nav className="flex mb-12 text-[10px] font-black uppercase tracking-[0.3em]">
            <button onClick={() => onNavigate('home')} className="text-white/40 hover:text-white transition-colors">Core Hub</button>
            <span className="mx-4 text-white/10">/</span>
            <span className="text-indigo-400">{category.name} Cluster</span>
          </nav>
          <div className="flex flex-col md:flex-row md:items-end gap-10">
            <div className={`w-24 h-24 md:w-40 md:h-40 ${category.color} text-white rounded-[2.5rem] md:rounded-[3.5rem] flex items-center justify-center text-5xl md:text-7xl shadow-2xl border-[4px] border-white/10 animate-in zoom-in-95 duration-700`}>
              {category.icon}
            </div>
            <div className="space-y-4 max-w-3xl animate-in slide-in-from-left-8 duration-1000">
              <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.8]">
                {category.name}.
              </h1>
              <p className="text-lg md:text-2xl text-slate-300 font-medium leading-relaxed max-w-2xl">
                {category.description} • {categoryTools.length} Utilities Available
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1600px] mx-auto px-8 -mt-20 relative z-20">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:flex-grow">
            <div className="flex items-center justify-between mb-12 bg-white/90 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-100 shadow-xl">
               <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.4em] flex items-center">
                 <span className="w-12 h-1 bg-indigo-600 rounded-full mr-6"></span>
                 Exhaustive Registry (A-Z)
               </h2>
               <div className="px-4 py-2 bg-slate-100 rounded-xl text-[10px] font-black text-slate-400 uppercase">{categoryTools.length} TOTAL</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
              {categoryTools.map((tool, idx) => (
                <div key={tool.slug} style={{ animationDelay: `${idx * 15}ms` }} className="animate-in fade-in">
                  <ToolCard tool={tool} onClick={() => onNavigate('tool', { slug: tool.slug })} isFavorite={favorites.includes(tool.slug)} onToggleFavorite={onToggleFavorite} />
                </div>
              ))}
            </div>
            
            <div className="mt-20"><AdPlaceholder type="inline" /></div>
          </div>
          
          <aside className="lg:w-80 flex-shrink-0 space-y-10">
            <div className="bg-slate-900 p-10 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="font-black text-indigo-400 mb-8 uppercase text-[9px] tracking-[0.3em] border-b border-white/5 pb-4">Logic Clusters</h3>
                <div className="space-y-3">
                  {CATEGORIES.map(cat => (
                    <button 
                      key={cat.id} 
                      onClick={() => onNavigate('category', { id: cat.id })} 
                      className={`flex items-center w-full px-5 py-3.5 rounded-2xl border transition-all ${cat.id === categoryId ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-white/5 border-white/5 hover:bg-white/10 text-slate-400 hover:text-white'}`}
                    >
                      <span className="mr-5 text-xl">{cat.icon}</span>
                      <span className="text-[10px] font-black uppercase tracking-widest">{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
