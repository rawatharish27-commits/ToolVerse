
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
 * Renders ALL tools belonging to a logic cluster from the Master Registry (A-Z).
 */
const CategoryPage: React.FC<CategoryPageProps> = ({ categoryId, onNavigate, favorites, onToggleFavorite }) => {
  const category = useMemo(() => CATEGORIES.find(c => c.id === categoryId), [categoryId]);
  
  // MEGA LOGIC: Live Audit of ALL tools mapped to this category ID
  const categoryTools = useMemo(() => 
    TOOLS.filter(t => t.category === categoryId)
      .sort((a, b) => {
        // Priority first, then Alphabetical A-Z
        if ((b.priority || 0) !== (a.priority || 0)) {
          return (b.priority || 0) - (a.priority || 0);
        }
        return a.title.localeCompare(b.title);
      }), 
  [categoryId]);

  if (!category) return (
    <div className="h-screen flex flex-col items-center justify-center gap-6 bg-slate-50">
       <div className="text-9xl grayscale opacity-20">🕳️</div>
       <p className="font-black text-slate-400 uppercase tracking-[0.4em] text-sm">Target node not resolved.</p>
       <button onClick={() => onNavigate('home')} className="px-12 py-5 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl hover:bg-indigo-600 transition-all">Back to Master Hub</button>
    </div>
  );

  return (
    <div className="pb-32 bg-white">
      <SEOHead 
        title={`${category.name} | ${categoryTools.length} Professional Tools`}
        description={`Access all ${categoryTools.length} utilities in the ${category.name} hub. ${category.description}. Private, instant, browser-native.`}
        url={`https://toolverse-4gr.pages.dev/category/${category.id}`}
      />

      <UniversalSEOLayer category={category} />

      {/* MEGA HERO */}
      <section className="relative h-[45vh] md:h-[60vh] flex items-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
           <img src={category.images[0]} alt={category.name} className="w-full h-full object-cover opacity-30 scale-105" />
           <div className="absolute inset-0 bg-gradient-to-t from-white via-white/5 to-transparent"></div>
           <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent"></div>
        </div>
        <div className="max-w-[1600px] mx-auto px-8 relative z-10 w-full">
          <nav className="flex mb-12 text-[10px] font-black uppercase tracking-[0.4em]">
            <button onClick={() => onNavigate('home')} className="text-white/40 hover:text-white transition-colors">Core</button>
            <span className="mx-5 text-white/10">/</span>
            <span className="text-indigo-400">{category.name} Cluster</span>
          </nav>
          <div className="flex flex-col md:flex-row md:items-end gap-12">
            <div className={`w-28 h-28 md:w-44 md:h-44 ${category.color} text-white rounded-[3rem] md:rounded-[4.5rem] flex items-center justify-center text-6xl md:text-8xl shadow-2xl border-[5px] border-white/10 animate-in zoom-in-95 duration-1000`}>
              {category.icon}
            </div>
            <div className="space-y-4 max-w-4xl animate-in slide-in-from-left-8 duration-1000">
              <h1 className="text-6xl md:text-[9rem] font-black text-white tracking-tighter leading-[0.75]">
                {category.name}.
              </h1>
              <p className="text-lg md:text-2xl text-slate-300 font-medium leading-relaxed max-w-2xl">
                {category.description} • {categoryTools.length} Logic Nodes Initialized.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1600px] mx-auto px-8 -mt-24 relative z-20">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:flex-grow">
            {/* Header / Filter Simulation */}
            <div className="flex items-center justify-between mb-16 bg-white/95 backdrop-blur-xl p-10 rounded-[3rem] border border-slate-100 shadow-2xl">
               <div className="flex items-center">
                 <div className="w-1.5 h-10 bg-indigo-600 rounded-full mr-8"></div>
                 <div>
                   <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.5em] mb-1">Logic Node Directory</h2>
                   <p className="text-slate-900 font-black text-lg">A to Z Exhaustive Registry</p>
                 </div>
               </div>
               <div className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest">{categoryTools.length} TOTAL UNITS</div>
            </div>
            
            {/* MEGA GRID: Rendering 100% of tools with no slice */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 animate-in fade-in slide-in-from-bottom-10 duration-1000">
              {categoryTools.map((tool, idx) => (
                <div key={tool.slug} style={{ animationDelay: `${idx * 10}ms` }} className="animate-in fade-in">
                  <ToolCard tool={tool} onClick={() => onNavigate('tool', { slug: tool.slug })} isFavorite={favorites.includes(tool.slug)} onToggleFavorite={onToggleFavorite} />
                </div>
              ))}
            </div>
            
            <div className="mt-32"><AdPlaceholder type="inline" /></div>
          </div>
          
          <aside className="lg:w-80 flex-shrink-0 space-y-12">
            <div className="bg-slate-950 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden group border border-white/5">
              <div className="relative z-10">
                <h3 className="font-black text-indigo-400 mb-10 uppercase text-[10px] tracking-[0.4em] border-b border-white/5 pb-5">Logic Clusters</h3>
                <div className="space-y-4">
                  {CATEGORIES.map(cat => (
                    <button 
                      key={cat.id} 
                      onClick={() => onNavigate('category', { id: cat.id })} 
                      className={`flex items-center w-full px-6 py-4 rounded-[1.5rem] border transition-all ${cat.id === categoryId ? 'bg-indigo-600 border-indigo-500 text-white shadow-xl shadow-indigo-600/20' : 'bg-white/5 border-white/5 hover:bg-white/10 text-slate-500 hover:text-white'}`}
                    >
                      <span className="mr-6 text-2xl">{cat.icon}</span>
                      <span className="text-[11px] font-black uppercase tracking-widest">{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 text-[10rem] opacity-5 group-hover:rotate-12 transition-transform duration-1000">🌐</div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
