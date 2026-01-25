
import React, { useMemo, useDeferredValue, useState, Suspense, lazy } from 'react';
import { CATEGORIES } from '../data/categories';
import { TOOLS } from '../data/tools';
import ToolCard from '../components/ToolCard';
import SEOHead from '../components/SEOHead';
import SiteStatus from '../components/SiteStatus';
import RightSideMenu from '../components/RightSideMenu';
import { trackToolClick } from '../utils/attraction';

const RewardHub = lazy(() => import('../components/RewardHub'));
const TopSitesSection = lazy(() => import('../components/TopSitesSection'));

interface HomeProps {
  onNavigate: (page: string, params?: any) => void;
  searchQuery?: string;
  favorites: string[];
  recent: string[];
  onToggleFavorite: (slug: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate, searchQuery = '', favorites, onToggleFavorite }) => {
  const deferredSearch = useDeferredValue(searchQuery);

  const searchResults = useMemo(() => {
    const query = deferredSearch.toLowerCase().trim();
    if (!query) return null;
    const queryTerms = query.split(/\s+/);
    return TOOLS.filter(tool => {
      const searchBlob = `${tool.title} ${tool.description} ${tool.category} ${tool.keywords.join(' ')}`.toLowerCase();
      return queryTerms.every(term => searchBlob.includes(term));
    }).slice(0, 30);
  }, [deferredSearch]);

  const handleToolClick = (tool: any) => {
    trackToolClick(tool.slug, tool.category);
    onNavigate('tool', { slug: tool.slug });
  };

  return (
    <div className="bg-white min-h-screen">
      <SEOHead 
        title="ToolVerse - Ultimate Professional Online Tools Hub"
        description="Access 120+ professional tools for PDF, Image, Finance, and AI. All client-side and secure."
        url="https://toolverse-4gr.pages.dev/"
      />
      
      {/* HERO SECTION */}
      {!deferredSearch && (
        <section className="pt-24 pb-20 border-b border-slate-50 bg-slate-50/50 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500 rounded-full blur-[180px]"></div>
          </div>
          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest mb-8 border border-indigo-100">
               PRO HUB V3.0 • SECURE & PRIVATE
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter mb-6 leading-none">
              The Engine of <br /><span className="text-indigo-600 italic">Everything.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
              120+ Production-ready utilities. No cloud latency. <br className="hidden md:block"/> 100% Client-side privacy.
            </p>
          </div>
        </section>
      )}

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="flex-grow space-y-24">
            
            {/* SEARCH RESULTS VIEW */}
            {deferredSearch && searchResults && (
              <section className="animate-in fade-in slide-in-from-bottom-5">
                <div className="flex items-center gap-4 mb-8">
                   <h2 className="text-2xl font-black text-slate-900">Found {searchResults.length} Tools</h2>
                   <div className="h-px flex-grow bg-slate-100"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {searchResults.map(tool => (
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
            )}

            {/* MEGA DIRECTORY (CATEGORY STATIONS) */}
            {!deferredSearch && CATEGORIES.map(category => {
              const categoryTools = TOOLS.filter(t => t.category === category.id).slice(0, 6);
              if (categoryTools.length === 0) return null;

              return (
                <section key={category.id} className="space-y-8">
                  <div className="flex items-end justify-between border-b-2 border-slate-50 pb-6">
                     <div className="flex items-center gap-5">
                        <div className={`w-14 h-14 ${category.color} rounded-2xl flex items-center justify-center text-3xl shadow-xl`}>
                          {category.icon}
                        </div>
                        <div>
                           <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{category.name}</h3>
                           <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{category.description}</p>
                        </div>
                     </div>
                     <button 
                       onClick={() => onNavigate('category', { id: category.id })}
                       className="px-6 py-3 bg-slate-50 text-indigo-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                     >
                       Explore Full Hub →
                     </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {categoryTools.map(tool => (
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
              );
            })}

            <Suspense fallback={<div className="h-32 skeleton rounded-3xl"></div>}>
              <TopSitesSection />
            </Suspense>

            <Suspense fallback={<div className="h-64 skeleton rounded-3xl"></div>}>
              <RewardHub />
            </Suspense>
          </div>

          {/* PERSISTENT DIRECTORY MENU */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <RightSideMenu onNavigate={onNavigate} />
          </div>
        </div>
      </div>
      <SiteStatus />
    </div>
  );
};

export default Home;
