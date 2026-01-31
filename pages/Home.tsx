
import React, { useMemo, useDeferredValue, useState } from 'react';
import { TOOL_REGISTRY } from '../core/toolRegistry';
import { getActiveCategories } from '../core/categoryRegistry';
import ToolCard from '../components/ToolCard';
import SEOHead from '../components/SEOHead';
import SiteStatus from '../components/SiteStatus';
import RewardHub from '../components/RewardHub';
import TopSitesSection from '../components/TopSitesSection';
import InternalLinking from '../components/InternalLinking';
import UniversalSEOLayer from '../components/UniversalSEOLayer';
import ProblemCommandCenter from '../components/ProblemCommandCenter';
import { querySearchIndex } from '../utils/searchEngine';

interface HomeProps {
  onNavigate: (page: string, params?: any) => void;
  favorites: string[];
  recent: string[];
  onToggleFavorite: (slug: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate, favorites, onToggleFavorite }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const deferredSearch = useDeferredValue(searchQuery);

  const searchResults = useMemo(() => {
    return querySearchIndex(deferredSearch);
  }, [deferredSearch]);

  const activeCategories = useMemo(() => getActiveCategories(), []);

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
             Global Node Network: {TOOL_REGISTRY.length} Active Instances
          </div>
          
          <h1 className="text-6xl md:text-[8.5rem] font-black text-white tracking-tighter mb-10 leading-[0.85]">
            Unified <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400 italic">Solvers.</span>
          </h1>
          
          <div className="relative max-w-3xl mx-auto mb-16">
            <input 
              type="text" 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search 500+ utilities (e.g. 50kb photo, resume ATS, ROI...)"
              className="w-full py-8 px-10 bg-white/5 border-2 border-white/10 rounded-[2.5rem] text-xl font-bold text-white outline-none focus:border-indigo-500 focus:bg-white/10 transition-all backdrop-blur-md"
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 bg-indigo-600 text-white p-4 rounded-2xl">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
          </div>
          
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

      {/* PROBLEM COMMAND CENTER */}
      <div id="problem-center" className="max-w-[1600px] mx-auto px-8 pt-32 pb-20">
         <ProblemCommandCenter onSelectProblem={(hubId) => onNavigate('flow', { hubId })} />
      </div>

      <div id="master-hub" className="max-w-[1600px] mx-auto px-8 py-20">
        {/* SEARCH RESULTS VIEW */}
        {deferredSearch && searchResults.length > 0 && (
          <section className="animate-in fade-in slide-in-from-bottom-10 duration-700 mb-32">
            <div className="flex items-center gap-6 mb-12">
              <div className="w-2 h-10 bg-indigo-600 rounded-full"></div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">Resolved Logic Nodes</h2>
              <div className="px-4 py-2 bg-slate-100 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest">{searchResults.length} Matches Found</div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {searchResults.map(result => {
                const tool = TOOL_REGISTRY.find(t => t.slug === result.id);
                if (!tool) return null;
                return (
                  <ToolCard key={tool.slug} tool={tool} onClick={() => onNavigate('tool', { slug: tool.slug })} isFavorite={favorites.includes(tool.slug)} onToggleFavorite={onToggleFavorite} />
                );
              })}
            </div>
          </section>
        )}

        {!deferredSearch && (
          <div className="space-y-40">
            {activeCategories.map(cat => {
              const catTools = TOOL_REGISTRY.filter(t => t.category === cat.id).sort((a,b) => (b.priority || 0) - (a.priority || 0));
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
                             <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-3 ml-1">{cat.toolCount} Utilities Ready</span>
                          </div>
                        </div>
                        <p className="text-xl text-slate-400 font-medium max-w-2xl leading-relaxed">{cat.description}</p>
                     </div>
                     <button onClick={() => onNavigate('category', { id: cat.id })} className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all">View Full Hub ({cat.toolCount}) →</button>
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
  );
};

export default Home;
