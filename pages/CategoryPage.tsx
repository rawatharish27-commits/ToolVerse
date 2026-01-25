
import React from 'react';
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
  const category = CATEGORIES.find(c => c.id === categoryId);
  const categoryTools = TOOLS.filter(t => t.category === categoryId);

  if (!category) return <div>Category not found</div>;

  return (
    <div className="pb-24">
      <SEOHead 
        title={`${category.name} - Free Online Collection`}
        description={category.description + ". Browse the best professional tools in our collection."}
        url={`https://toolverse-4gr.pages.dev/category/${category.id}`}
      />

      {/* Cinematic Hero Section */}
      <section className="relative h-[400px] md:h-[500px] flex items-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
           <img 
            src={category.images[0]} 
            alt={category.name}
            className="w-full h-full object-cover opacity-40 scale-105 animate-slow-zoom"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
           <nav className="flex mb-8 text-xs font-black uppercase tracking-[0.2em]">
            <button onClick={() => onNavigate('home')} className="text-white/50 hover:text-white transition-colors">Home</button>
            <span className="mx-3 text-white/20">/</span>
            <span className="text-indigo-400">{category.name} Hub</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end gap-8">
            <div className={`w-24 h-24 md:w-32 md:h-32 ${category.color} text-white rounded-[2rem] md:rounded-[2.5rem] flex items-center justify-center text-5xl md:text-7xl shadow-2xl shadow-black/50 border-4 border-white/10`}>
              {category.icon}
            </div>
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-none">
                {category.name}
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 font-medium max-w-2xl leading-relaxed">
                {category.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 mt-16 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:flex-grow">
            <div className="flex items-center justify-between mb-12">
               <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.3em] flex items-center">
                 <span className="w-8 h-px bg-slate-200 mr-4"></span>
                 Available Utilities ({categoryTools.length})
               </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {categoryTools.length > 0 ? (
                categoryTools.map(tool => (
                  <ToolCard 
                    key={tool.slug} 
                    tool={tool} 
                    onClick={() => onNavigate('tool', { slug: tool.slug })} 
                    isFavorite={favorites.includes(tool.slug)}
                    onToggleFavorite={onToggleFavorite}
                  />
                ))
              ) : (
                <div className="col-span-full py-20 text-center bg-white rounded-[3rem] border border-slate-100">
                  <div className="text-5xl mb-6 opacity-20">📂</div>
                  <p className="text-slate-400 font-bold uppercase tracking-widest">Expansion in progress...</p>
                </div>
              )}
            </div>
            
            <AdPlaceholder type="inline" />
          </div>

          <aside className="lg:w-80 flex-shrink-0 space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
              <img 
                src={category.images[1]} 
                className="absolute inset-0 w-full h-full object-cover opacity-5 group-hover:opacity-10 transition-opacity" 
                alt="Support visual"
              />
              <div className="relative z-10">
                <h3 className="font-black text-slate-900 mb-6 uppercase text-[10px] tracking-[0.2em] border-b border-slate-100 pb-4">Other Hubs</h3>
                <div className="space-y-2">
                  {CATEGORIES.filter(c => c.id !== categoryId).map(cat => (
                    <button 
                      key={cat.id}
                      onClick={() => onNavigate('category', { id: cat.id })}
                      className="flex items-center w-full px-4 py-3 rounded-2xl hover:bg-slate-50 text-slate-600 transition-all hover:translate-x-1"
                    >
                      <span className="mr-4 text-xl">{cat.icon}</span>
                      <span className="text-xs font-black uppercase tracking-widest">{cat.name}</span>
                    </button>
                  ))}
                </div>
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
