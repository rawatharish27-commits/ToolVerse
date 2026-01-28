import React, { useState, useMemo } from 'react';
import { TOOLS } from '../data/tools';
import { CATEGORIES } from '../data/categories';
import SEOHead from '../components/SEOHead';
import ToolCard from '../components/ToolCard';

interface DirectoryProps {
  onNavigate: (page: string, params?: any) => void;
  favorites: string[];
  onToggleFavorite: (slug: string) => void;
}

const Directory: React.FC<DirectoryProps> = ({ onNavigate, favorites, onToggleFavorite }) => {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filteredTools = useMemo(() => {
    return TOOLS.filter(t => {
      const matchesCat = filter === 'all' || t.category === filter;
      const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) || 
                            t.description.toLowerCase().includes(search.toLowerCase());
      return matchesCat && matchesSearch;
    }).sort((a, b) => (b.priority || 0) - (a.priority || 0));
  }, [filter, search]);

  return (
    <div className="pb-32 bg-white min-h-screen">
      <SEOHead 
        title="Master Tool Directory | 500+ Professional Utilities" 
        description="Browse our complete index of 500+ browser-native tools. Categorized A-Z list of PDF, Image, AI, and Financial nodes." 
        url="https://toolverse-4gr.pages.dev/directory" 
      />

      <section className="bg-slate-950 py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500 via-transparent to-transparent"></div>
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-8">Master <span className="text-indigo-400 italic">Index.</span></h1>
          <p className="text-xl text-slate-400 font-medium">Exhaustive registry of every active intelligence node in the ToolVerse ecosystem.</p>
        </div>
      </section>

      <div className="max-w-[1600px] mx-auto px-8 -mt-16 relative z-20">
        <div className="bg-white rounded-[3.5rem] shadow-2xl border border-slate-100 p-8 md:p-12 mb-16 flex flex-col md:flex-row gap-8 items-center justify-between">
           <div className="flex-grow w-full max-w-xl">
             <input 
              type="text" 
              placeholder="Live filter 500+ utilities..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full p-6 bg-slate-50 border-none rounded-2xl font-bold text-slate-700 outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-inner"
             />
           </div>
           <div className="flex flex-wrap gap-2 justify-center">
              <button 
                onClick={() => setFilter('all')}
                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === 'all' ? 'bg-indigo-600 text-white shadow-xl' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}
              >All Nodes</button>
              {CATEGORIES.map(cat => (
                <button 
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === cat.id ? 'bg-indigo-600 text-white shadow-xl' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}
                >
                  {cat.icon} {cat.name.split(' ')[0]}
                </button>
              ))}
           </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
           {filteredTools.map(tool => (
             <ToolCard 
              key={tool.slug} 
              tool={tool} 
              onClick={() => onNavigate('tool', { slug: tool.slug })}
              isFavorite={favorites.includes(tool.slug)}
              onToggleFavorite={onToggleFavorite}
             />
           ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="py-40 text-center">
             <div className="text-8xl mb-8 opacity-20">🕳️</div>
             <p className="text-2xl font-black text-slate-300 uppercase tracking-widest">No nodes match your filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Directory;
