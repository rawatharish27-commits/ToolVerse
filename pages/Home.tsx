
import React, { useMemo, useDeferredValue, useState, Suspense, lazy, useEffect } from 'react';
import { CATEGORIES } from '../data/categories';
import { TOOLS } from '../data/tools';
import ToolCard from '../components/ToolCard';
import SEOHead from '../components/SEOHead';
import SiteStatus from '../components/SiteStatus';
import { getToolPriorityScore } from '../utils/toolPriority';
import { getTopCategories, getToolOfDay, trackToolClick } from '../utils/attraction';

const RewardHub = lazy(() => import('../components/RewardHub'));
const TopSitesSection = lazy(() => import('../components/TopSitesSection'));
const SpinWheel = lazy(() => import('../components/SpinWheel'));

interface HomeProps {
  onNavigate: (page: string, params?: any) => void;
  searchQuery?: string;
  favorites: string[];
  recent: string[];
  onToggleFavorite: (slug: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate, searchQuery = '', favorites, onToggleFavorite }) => {
  const deferredSearch = useDeferredValue(searchQuery);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Systematic Filtering
  const featuredTools = useMemo(() => {
    return TOOLS.sort((a, b) => getToolPriorityScore(b) - getToolPriorityScore(a)).slice(0, 12);
  }, []);

  const searchResults = useMemo(() => {
    const query = deferredSearch.toLowerCase().trim();
    if (!query) return null;
    const queryTerms = query.split(/\s+/);
    return TOOLS.filter(tool => {
      const searchBlob = `${tool.title} ${tool.description} ${tool.category} ${tool.keywords.join(' ')}`.toLowerCase();
      return queryTerms.every(term => searchBlob.includes(term));
    }).slice(0, 24);
  }, [deferredSearch]);

  const handleToolClick = (tool: any) => {
    trackToolClick(tool.slug, tool.category);
    onNavigate('tool', { slug: tool.slug });
  };

  return (
    <div className="bg-white min-h-screen">
      <SEOHead 
        title="ToolVerse - World's Largest Professional Online Tools Hub"
        description="500+ lightweight professional tools for PDF, images, video, and AI. Fast and private."
        url="https://toolverse-4gr.pages.dev/"
      />
      
      {/* COMPACT HERO */}
      {!deferredSearch && (
        <section className="pt-20 pb-24 border-b border-slate-50 bg-slate-50/30">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
              Access the <span className="text-indigo-600">Ultimate Toolset.</span>
            </h1>
            <p className="text-base text-slate-500 font-medium mb-10">
              500+ Production-ready utilities. No cloud latency. 100% Client-side.
            </p>
            
            <div className="flex flex-wrap justify-center gap-2">
               {CATEGORIES.slice(0, 12).map(cat => (
                 <button 
                  key={cat.id}
                  onClick={() => onNavigate('category', { id: cat.id })}
                  className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-bold text-slate-600 hover:border-indigo-500 hover:text-indigo-600 transition-all flex items-center gap-2"
                 >
                   <span>{cat.icon}</span> {cat.name}
                 </button>
               ))}
            </div>
          </div>
        </section>
      )}

      <div className="max-w-7xl mx-auto px-6 space-y-16 py-12">
        
        {/* SEARCH OR FEATURED */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wider text-xs">
              {deferredSearch ? `Search Results (${searchResults?.length})` : 'Trending Professional Tools'}
            </h2>
            {!deferredSearch && <span className="text-[10px] font-bold text-slate-400">UPDATED REAL-TIME</span>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {(searchResults || featuredTools).map(tool => (
              <ToolCard 
                key={tool.slug} 
                tool={tool} 
                onClick={() => handleToolClick(tool)} 
                isFavorite={favorites.includes(tool.slug)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        </section>

        {/* SYSTEMATIC CATEGORY HUB (REPLACES 500 REPEATED TOOLS) */}
        {!deferredSearch && (
          <section className="py-12 border-t border-slate-100">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">Browse the Vault Clusters</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
               {CATEGORIES.map(cat => (
                 <button 
                  key={cat.id} 
                  onClick={() => onNavigate('category', { id: cat.id })}
                  className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center hover:bg-indigo-50 hover:border-indigo-200 transition-all group"
                 >
                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{cat.icon}</div>
                    <div className="text-xs font-bold text-slate-800">{cat.name}</div>
                    <div className="text-[8px] font-bold text-slate-400 mt-1 uppercase">Explore Cluster</div>
                 </button>
               ))}
            </div>
          </section>
        )}

        <Suspense fallback={<div className="h-32 skeleton rounded-3xl"></div>}>
          <TopSitesSection />
        </Suspense>

        <Suspense fallback={<div className="h-64 skeleton rounded-3xl"></div>}>
          <RewardHub />
        </Suspense>

        {!deferredSearch && (
          <div className="py-12 text-center border-t border-slate-50">
             <p className="text-slate-400 text-xs font-medium">Looking for something specific? Use the global search at the top.</p>
          </div>
        )}
      </div>
      <SiteStatus />
    </div>
  );
};

export default Home;
