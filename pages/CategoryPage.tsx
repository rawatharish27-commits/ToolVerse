
import React, { useMemo } from 'react';
import { CATEGORIES } from '../data/categories';
import { TOOLS } from '../data/tools';
import { CategorySlug } from '../types';
import ToolCard from '../components/ToolCard';
import AdPlaceholder from '../components/AdPlaceholder';
import SEOHead from '../components/SEOHead';

interface CategoryPageProps {
  categoryId: CategorySlug;
  onNavigate: (page: string, params?: any) => void;
  favorites: string[];
  onToggleFavorite: (slug: string) => void;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ categoryId, onNavigate, favorites, onToggleFavorite }) => {
  const category = useMemo(() => CATEGORIES.find(c => c.id === categoryId), [categoryId]);
  const categoryTools = useMemo(() => 
    TOOLS.filter(t => t.category === categoryId).sort((a,b) => (b.priority || 0) - (a.priority || 0)), 
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
        title={`${category.name} | Professional Logic Node Cluster`}
        description={category.description + ". Secure, browser-native tool collection."}
        url={`https://toolverse-4gr.pages.dev/category/${category.id}`}
      />

      {/* DYNAMIC CATEGORY HERO */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
           <img 
            src={category.images[0]} 
            alt={category.name}
            className="w-full h-full object-cover opacity-30 scale-105 animate-slow-zoom"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-white via-white/5 to-transparent"></div>
           <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent"></div>
        </div>
        
        <div className="max-w-[1600px] mx-auto px-8 relative z-10 w-full">
           <nav className="flex mb-12 text-[10px] font-black uppercase tracking-[0.3em]">
            <button onClick={() => onNavigate('home')} className="text-white/40 hover:text-white transition-colors">Master Hub</button>
            <span className="mx-4 text-white/10">/</span>
            <span className="text-indigo-400">{category.name} Space</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end gap-12">
            <div className={`w-32 h-32 md:w-48 md:h-48 ${category.color} text-white rounded-[3rem] md:rounded-[4rem] flex items-center justify-center text-6xl md:text-8xl shadow-2xl shadow-black/50 border-[6px] border-white/10 animate-in zoom-in-95 duration-700`}>
              {category.icon}
            </div>
            <div className="space-y-6 max-w-3xl animate-in slide-in-from-left-8 duration-1000">
              <h1 className="text-6xl md:text-[8rem] font-black text-white tracking-tighter leading-[0.8] drop-shadow-2xl">
                {category.name}.
              </h1>
              <p className="text-xl md:text-3xl text-slate-300 font-medium leading-relaxed">
                {category.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1600px] mx-auto px-8 -mt-24 relative z-20">
        <div className="flex flex-col lg:flex-row gap-16">
          
          <div className="lg:flex-grow">
            <div className="flex items-center justify-between mb-16 bg-white/80 backdrop-blur-xl p-8 rounded-[3rem] border border-slate-100 shadow-xl">
               <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.4em] flex items-center">
                 <span className="w-12 h-1 bg-indigo-600 rounded-full mr-6"></span>
                 Available Logic Nodes ({categoryTools.length})
               </h2>
               <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-200"></div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
              {categoryTools.length > 0 ? (
                categoryTools.map((tool, idx) => (
                  <div key={tool.slug} className="animate-in fade-in zoom-in-95" style={{ animationDelay: `${idx * 50}ms` }}>
                    <ToolCard 
                      tool={tool} 
                      onClick={() => onNavigate('tool', { slug: tool.slug })} 
                      isFavorite={favorites.includes(tool.slug)}
                      onToggleFavorite={onToggleFavorite}
                    />
                  </div>
                ))
              ) : (
                <div className="col-span-full py-40 text-center bg-white rounded-[4rem] border border-slate-100 shadow-inner">
                  <div className="text-8xl mb-8 opacity-20 animate-bounce">🏗️</div>
                  <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-sm">Cluster optimization in progress...</p>
                </div>
              )}
            </div>
            
            <AdPlaceholder type="inline" />
          </div>

          <aside className="lg:w-96 flex-shrink-0 space-y-12">
            <div className="bg-slate-900 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden group">
              <img 
                src={category.images[1]} 
                className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-1000" 
                alt=""
              />
              <div className="relative z-10">
                <h3 className="font-black text-indigo-400 mb-10 uppercase text-[10px] tracking-[0.3em] border-b border-white/5 pb-6">Parallel Hubs</h3>
                <div className="space-y-4">
                  {CATEGORIES.filter(c => c.id !== categoryId).slice(0, 8).map(cat => (
                    <button 
                      key={cat.id}
                      onClick={() => onNavigate('category', { id: cat.id })}
                      className="flex items-center w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-indigo-600 hover:border-indigo-600 text-slate-300 hover:text-white transition-all hover:translate-x-3 group/item"
                    >
                      <span className="mr-6 text-2xl group-hover/item:scale-125 transition-transform">{cat.icon}</span>
                      <span className="text-[11px] font-black uppercase tracking-widest">{cat.name}</span>
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => window.dispatchEvent(new Event('tv_open_menu'))}
                  className="w-full mt-12 py-5 bg-white text-slate-900 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest hover:bg-indigo-100 transition-all"
                >
                  View Global Directory
                </button>
              </div>
            </div>
            <AdPlaceholder type="sidebar" />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
