
import React, { useMemo, useDeferredValue, useState, Suspense, lazy } from 'react';
import { CATEGORIES } from '../data/categories';
import { TOOLS } from '../data/tools';
import ToolCard from '../components/ToolCard';
import SEOHead from '../components/SEOHead';
import SiteStatus from '../components/SiteStatus';
import RightSideMenu from '../components/RightSideMenu';
import AdSlot from '../components/AdSlot';
import { trackToolClick } from '../utils/attraction';
import { AD_CONFIG } from '../config/ads';

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
    return TOOLS.filter(tool => {
      const searchBlob = `${tool.title} ${tool.description} ${tool.category} ${tool.keywords.join(' ')}`.toLowerCase();
      return searchBlob.includes(query);
    }).slice(0, 40);
  }, [deferredSearch]);

  const handleToolClick = (tool: any) => {
    trackToolClick(tool.slug, tool.category);
    onNavigate('tool', { slug: tool.slug });
  };

  // High-CTR Tool Featured List
  const featuredTools = useMemo(() => {
    return TOOLS.filter(t => t.priority && t.priority >= 195).slice(0, 8);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <SEOHead 
        title="ToolVerse | Global Control Center"
        description="The ultimate directory of 120+ professional tools. Secure, private, and browser-native."
        url="https://toolverse-4gr.pages.dev/"
      />
      
      {/* SOCIAL PROOF MARQUEE (TECHNIQUE 11) */}
      <div className="bg-slate-950 text-white py-2 overflow-hidden border-b border-white/5 relative z-50">
        <div className="animate-marquee whitespace-nowrap flex gap-12">
           {[...Array(2)].map((_, i) => (
             <div key={i} className="flex gap-12 items-center text-[10px] font-black uppercase tracking-[0.3em] opacity-80">
                <span>⚡ Real-Time WASM Core Active</span>
                <span>🔒 Zero Data Upload Policy</span>
                <span>📈 128M Monthly Logic Requests</span>
                <span>🛠️ 120+ Verified Pro Tools</span>
                <span>🧠 Gemini 3.0 Pro Neural Link</span>
             </div>
           ))}
        </div>
      </div>

      {!deferredSearch && (
        <section className="relative pt-24 pb-20 bg-slate-50/50 border-b border-slate-100 overflow-hidden">
          {/* GRADIENT MESH BACKGROUND (TECHNIQUE 8) */}
          <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
             <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-400 rounded-full blur-[140px] animate-pulse"></div>
             <div className="absolute top-1/3 right-1/4 translate-x-1/2 w-[500px] h-[500px] bg-emerald-400 rounded-full blur-[140px] animate-pulse delay-700"></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white border border-slate-200 text-indigo-600 text-[10px] font-black uppercase tracking-[0.3em] mb-10 shadow-xl shadow-indigo-500/5">
               ToolVerse Orchestrator v3.5
            </div>
            <h1 className="text-5xl md:text-9xl font-black text-slate-900 tracking-tighter mb-8 leading-[0.85]">
              Pure Logic. <br /><span className="text-indigo-600 italic">No Latency.</span>
            </h1>
            <p className="text-xl md:text-3xl text-slate-500 font-medium max-w-3xl mx-auto leading-tight mb-16 tracking-tight">
              A high-performance command center for data, <br className="hidden md:block" /> documents, and intelligence.
            </p>

            {/* FEATURED SLIDER (TECHNIQUE 21) */}
            <div className="relative group">
               <div className="flex gap-6 overflow-x-auto no-scrollbar pb-10 px-4 -mx-4 snap-x">
                  {featuredTools.map(tool => (
                    <div key={tool.slug} className="min-w-[280px] md:min-w-[340px] snap-center">
                       <ToolCard tool={tool} onClick={() => handleToolClick(tool)} onToggleFavorite={onToggleFavorite} isFavorite={favorites.includes(tool.slug)} />
                    </div>
                  ))}
               </div>
               <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {[...Array(4)].map((_, i) => <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-indigo-600' : 'bg-slate-200'}`}></div>)}
               </div>
            </div>
          </div>
        </section>
      )}

      <div className="max-w-[1600px] mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="flex-grow space-y-32">
            
            {deferredSearch && searchResults && (
              <section className="animate-in fade-in slide-in-from-bottom-4">
                <div className="flex items-center gap-6 mb-12">
                   <h2 className="text-3xl font-black text-slate-900 tracking-tight">Global Search Results</h2>
                   <div className="h-px flex-grow bg-slate-100"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
                  {searchResults.map(tool => (
                    <ToolCard key={tool.slug} tool={tool} onClick={() => handleToolClick(tool)} isFavorite={favorites.includes(tool.slug)} onToggleFavorite={onToggleFavorite} />
                  ))}
                </div>
              </section>
            )}

            {!deferredSearch && (
              <div className="space-y-40">
                {CATEGORIES.map(category => {
                  const categoryTools = TOOLS.filter(t => t.category === category.id).sort((a,b) => (b.priority || 0) - (a.priority || 0));
                  if (categoryTools.length === 0) return null;

                  return (
                    <section key={category.id} id={`cat-${category.id}`} className="scroll-mt-32">
                      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 border-b-2 border-slate-50 pb-10">
                         <div className="flex items-center gap-6">
                            <div className={`w-16 h-16 ${category.color} text-white rounded-[1.5rem] flex items-center justify-center text-3xl shadow-2xl shadow-indigo-500/10 transform -rotate-3`}>
                               {category.icon}
                            </div>
                            <div>
                               <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight leading-none mb-2">{category.name}</h2>
                               <p className="text-xs text-slate-400 font-black uppercase tracking-[0.2em]">{category.description}</p>
                            </div>
                         </div>
                         <button 
                           onClick={() => onNavigate('category', { id: category.id })}
                           className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl active:scale-95"
                         >
                           Access {category.name} Cluster →
                         </button>
                      </div>

                      {/* BENTO GRID IMPLEMENTATION (TECHNIQUE 5) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
                        {categoryTools.slice(0, 8).map(tool => (
                          <ToolCard 
                            key={tool.slug} 
                            tool={tool} 
                            onClick={() => handleToolClick(tool)} 
                            isFavorite={favorites.includes(tool.slug)}
                            onToggleFavorite={onToggleFavorite}
                          />
                        ))}
                      </div>

                      {/* AD SLOT INTEGRATION (AD VISUALIZATION) */}
                      {categoryTools.length > 4 && (
                        <div className="mt-12">
                           <AdSlot id={AD_CONFIG.slots.mid_content} className="border-2 border-dashed border-indigo-50" />
                        </div>
                      )}
                    </section>
                  );
                })}
              </div>
            )}

            <Suspense fallback={<div className="h-48 skeleton rounded-[3rem]"></div>}>
              <TopSitesSection />
            </Suspense>

            <Suspense fallback={<div className="h-96 skeleton rounded-[4rem]"></div>}>
              <RewardHub />
            </Suspense>
          </div>

          {/* PERSISTENT SIDEBAR CONTROL CENTER */}
          <div className="w-full lg:w-96 flex-shrink-0">
             <RightSideMenu onNavigate={onNavigate} />
          </div>
        </div>
      </div>
      <SiteStatus />
    </div>
  );
};

export default Home;
