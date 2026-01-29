
import React, { useMemo, useDeferredValue, useCallback } from 'react';
import { CATEGORIES } from '../data/categories';
import { TOOLS } from '../data/tools';
import ToolCard from '../components/ToolCard';
import SEOHead from '../components/SEOHead';
import SiteStatus from '../components/SiteStatus';
import RewardHub from '../components/RewardHub';
import TopSitesSection from '../components/TopSitesSection';
import InternalLinking from '../components/InternalLinking';
import UniversalSEOLayer from '../components/UniversalSEOLayer';
import ProblemCommandCenter from '../components/ProblemCommandCenter';

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
      const searchBlob = `${tool.title} ${tool.description} ${tool.keywords.join(' ')} ${tool.category}`.toLowerCase();
      return searchBlob.includes(query);
    }).slice(0, 100);
  }, [deferredSearch]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 100;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <SEOHead title="ToolVerse | 500+ Master Utility Nodes" description="Execute 500+ professional browser-native tools instantly. Privacy hardened, zero-upload architecture." url="https://toolverse-4gr.pages.dev/" />

      {!deferredSearch && <UniversalSEOLayer />}

      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center bg-slate-950 overflow-hidden px-6">
        <div className="absolute inset-0 z-0 pointer-events-none">
           <div className="absolute top-1/4 left-1/4 w-[60vw] h-[60vw] bg-indigo-600/20 rounded-full blur-[150px] animate-pulse"></div>
           <div className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] bg-emerald-600/10 rounded-full blur-[130px] animate-pulse delay-700"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center px-6 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] mb-10 shadow-2xl backdrop-blur-xl">
             <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3 animate-ping"></span>
             Global Node Network: 504 Active Instances
          </div>
          
          <h1 className="text-6xl md:text-[8.5rem] font-black text-white tracking-tighter mb-10 leading-[0.85]">
            Unified <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400 italic">Solvers.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 font-medium max-w-3xl mx-auto mb-16">
            Production-grade utility engine with 500+ stateless logic nodes. <br className="hidden md:block" /> 
            Solving real digital hurdles without data uploads.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
             <button 
              onClick={() => scrollToSection('problem-center')}
              className="px-12 py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-lg shadow-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all group flex items-center gap-3"
             >
               Describe Your Problem
               <span className="group-hover:translate-x-1 transition-transform">↓</span>
             </button>
             <button 
              onClick={() => onNavigate('directory')}
              className="px-12 py-6 bg-white/5 text-white border border-white/10 rounded-[2rem] font-black text-lg shadow-xl hover:bg-white/10 hover:-translate-y-1 transition-all backdrop-blur-sm"
             >
               Full A-Z Index
             </button>
          </div>
        </div>

        <div className="w-full absolute bottom-0 left-0">
          <SiteStatus />
        </div>
      </section>

      {/* PROBLEM COMMAND CENTER - Layer 2 */}
      <div id="problem-center" className="max-w-[1600px] mx-auto px-8 pt-32 pb-20">
         <ProblemCommandCenter onSelectProblem={(hubId) => onNavigate('flow', { hubId })} />
      </div>

      <div className="sticky top-20 z-[100] bg-white/95 backdrop-blur-xl border-b border-slate-100 py-5 no-scrollbar overflow-x-auto shadow-md">
        <div className="max-w-[1600px] mx-auto px-8 flex items-center gap-3">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-4 whitespace-nowrap">Explore Clusters:</div>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => scrollToSection(`cat-${cat.id}`)}
              className="px-5 py-2.5 rounded-full bg-slate-50 border border-slate-100 hover:border-indigo-600 hover:text-indigo-600 text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap flex items-center gap-2"
            >
              <span>{cat.icon}</span> 
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div id="master-hub" className="max-w-[1600px] mx-auto px-8 py-20">
        <div className="space-y-40">
          
          {/* SEARCH RESULTS VIEW */}
          {deferredSearch && searchResults && (
            <section className="animate-in fade-in slide-in-from-bottom-10 duration-700 scroll-mt-32">
              <div className="flex items-center gap-6 mb-12">
                <div className="w-2 h-10 bg-indigo-600 rounded-full"></div>
                <h2 className="text-4xl font-black text-slate-900 tracking-tight">Resolved Logic Nodes</h2>
                <div className="px-4 py-2 bg-slate-100 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest">{searchResults.length} Matches Found</div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {searchResults.map(tool => (
                  <ToolCard key={tool.slug} tool={tool} onClick={() => onNavigate('tool', { slug: tool.slug })} isFavorite={favorites.includes(tool.slug)} onToggleFavorite={onToggleFavorite} />
                ))}
              </div>
            </section>
          )}

          {!deferredSearch && (
            <div className="space-y-40">
              {CATEGORIES.map(cat => {
                const catTools = TOOLS.filter(t => t.category === cat.id).sort((a,b) => (b.priority || 0) - (a.priority || 0));
                if (catTools.length === 0) return null;

                return (
                  <section key={cat.id} id={`cat-${cat.id}`} className="animate-in fade-in duration-1000 scroll-mt-40">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8 border-b border-slate-50 pb-10">
                       <div className="space-y-4">
                          <div className="flex items-center gap-5">
                            <div className={`w-16 h-16 ${cat.color} text-white rounded-[2rem] flex items-center justify-center text-4xl shadow-xl`}>
                              {cat.icon}
                            </div>
                            <div className="flex flex-col">
                               <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none">{cat.name}</h2>
                               <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-3 ml-1">{catTools.length} Professional Utilities Ready</span>
                            </div>
                          </div>
                          <p className="text-xl text-slate-400 font-medium max-w-2xl leading-relaxed">{cat.description}</p>
                       </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                      {catTools.slice(0, 8).map(tool => (
                        <ToolCard 
                          key={tool.slug} 
                          tool={tool} 
                          onClick={() => onNavigate('tool', { slug: tool.slug })} 
                          isFavorite={favorites.includes(tool.slug)}
                          onToggleFavorite={onToggleFavorite}
                        />
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          )}

          <TopSitesSection />
          <RewardHub />
          <InternalLinking onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  );
};

export default Home;
