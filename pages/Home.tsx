
import React, { useMemo, useDeferredValue } from 'react';
import { CATEGORIES } from '../data/categories';
import { TOOLS } from '../data/tools';
import ToolCard from '../components/ToolCard';
import SEOHead from '../components/SEOHead';
import SiteStatus from '../components/SiteStatus';
import RewardHub from '../components/RewardHub';
import TopSitesSection from '../components/TopSitesSection';
import InternalLinking from '../components/InternalLinking';

interface HomeProps {
  onNavigate: (page: string, params?: any) => void;
  searchQuery?: string;
  favorites: string[];
  recent: string[];
  onToggleFavorite: (slug: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate, searchQuery = '', favorites, onToggleFavorite }) => {
  const deferredSearch = useDeferredValue(searchQuery);

  const topTools = useMemo(() => {
    // Only show top 24 tools initially to prevent hanging
    return TOOLS.sort((a,b) => (b.priority || 0) - (a.priority || 0)).slice(0, 24);
  }, []);

  const searchResults = useMemo(() => {
    const query = deferredSearch.toLowerCase().trim();
    if (!query) return null;
    return TOOLS.filter(tool => {
      const searchBlob = `${tool.title} ${tool.description} ${tool.keywords.join(' ')}`.toLowerCase();
      return searchBlob.includes(query);
    }).slice(0, 40);
  }, [deferredSearch]);

  const scrollToContent = () => {
    const el = document.getElementById('main-content');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-white min-h-screen">
      <SEOHead title="ToolVerse | Global Utility Command Center" description="Access the world's most powerful collection of browser-native professional tools. Private, instant, and high-performance." url="https://toolverse-4gr.pages.dev/" />

      {/* ENHANCED HERO */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center bg-slate-50 border-b border-slate-100 overflow-hidden px-6">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
           <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-indigo-200/50 rounded-full blur-[120px] animate-pulse"></div>
           <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-emerald-200/50 rounded-full blur-[100px] animate-pulse delay-700"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center px-5 py-2 rounded-full bg-white border border-slate-200 text-indigo-600 text-[11px] font-black uppercase tracking-[0.3em] mb-12 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
             <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3 animate-ping"></span>
             Unified Logic Ecosystem Active
          </div>
          
          <h1 className="text-7xl md:text-[10rem] font-black text-slate-900 tracking-tighter mb-12 leading-[0.85] animate-in fade-in slide-in-from-bottom-6 duration-1000">
            Pure Force. <br /><span className="text-indigo-600 italic">No Latency.</span>
          </h1>
          
          <p className="text-xl md:text-3xl text-slate-500 font-medium max-w-3xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 leading-relaxed">
            Architect your digital workflow with 500+ logic nodes. <br className="hidden md:block" /> 
            100% private. 100% browser-native.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-24 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
             <button 
              onClick={scrollToContent}
              className="px-12 py-6 bg-slate-900 text-white rounded-[2rem] font-black text-xl shadow-2xl hover:bg-indigo-600 hover:-translate-y-2 transition-all group flex items-center gap-4"
             >
               Launch Workspace
               <span className="group-hover:translate-x-2 transition-transform">→</span>
             </button>
             <button 
              onClick={() => window.dispatchEvent(new Event('tv_open_menu'))}
              className="px-12 py-6 bg-white text-slate-900 border-2 border-slate-100 rounded-[2rem] font-black text-xl shadow-xl hover:border-indigo-100 hover:-translate-y-2 transition-all"
             >
               Browse Directory
             </button>
          </div>
        </div>

        {/* SCROLL INDICATOR */}
        <button 
          onClick={scrollToContent}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50 hover:opacity-100 transition-opacity animate-bounce"
        >
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Scroll to Discover</span>
          <div className="w-6 h-10 border-2 border-slate-300 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-indigo-500 rounded-full"></div>
          </div>
        </button>
      </section>

      <div id="main-content" className="max-w-[1600px] mx-auto px-6 py-32">
        <div className="space-y-40">
          
          {/* SEARCH RESULTS NODE */}
          {deferredSearch && searchResults && (
            <section className="animate-in fade-in slide-in-from-bottom-10 duration-700">
              <div className="flex items-center gap-6 mb-16">
                <div className="w-2 h-10 bg-indigo-600 rounded-full"></div>
                <h2 className="text-5xl font-black text-slate-900 tracking-tight">Active Search Results</h2>
                <div className="px-4 py-2 bg-slate-100 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest">{searchResults.length} Matches</div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {searchResults.map(tool => (
                  <ToolCard key={tool.slug} tool={tool} onClick={() => onNavigate('tool', { slug: tool.slug })} isFavorite={favorites.includes(tool.slug)} onToggleFavorite={onToggleFavorite} />
                ))}
              </div>
            </section>
          )}

          {/* TOP PERFORMANCE GRID */}
          {!deferredSearch && (
            <section className="animate-in fade-in duration-1000">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 border-b border-slate-100 pb-12 gap-8">
                 <div className="space-y-3">
                    <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter">Elite Performance Nodes.</h2>
                    <p className="text-xl text-slate-400 font-medium max-w-xl leading-relaxed">Highly optimized, low-latency tools synchronized for professional workflows.</p>
                 </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                {topTools.map(tool => (
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
          )}

          {/* INTELLIGENCE CATEGORIES */}
          {!deferredSearch && (
            <section className="animate-in fade-in duration-1000 delay-200">
               <div className="text-center mb-24">
                  <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-6">Intelligence Clusters</h2>
                  <p className="text-lg text-slate-400 font-bold uppercase tracking-widest">Warp between domain-specific workspaces</p>
               </div>
               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                 {CATEGORIES.map(cat => (
                   <button 
                    key={cat.id} 
                    onClick={() => onNavigate('category', { id: cat.id })}
                    className="p-12 bg-slate-50 border border-slate-100 rounded-[3.5rem] flex flex-col items-center gap-6 hover:bg-white hover:shadow-2xl hover:border-indigo-100 hover:-translate-y-3 transition-all group relative overflow-hidden"
                   >
                     <div className={`w-20 h-20 ${cat.color} rounded-[1.5rem] flex items-center justify-center text-4xl text-white shadow-2xl shadow-black/10 group-hover:rotate-12 transition-transform duration-500`}>{cat.icon}</div>
                     <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover:text-indigo-600 transition-colors">{cat.name}</span>
                   </button>
                 ))}
               </div>
            </section>
          )}

          <TopSitesSection />
          
          <RewardHub />

          <InternalLinking onNavigate={onNavigate} />
        </div>
      </div>
      <SiteStatus />
    </div>
  );
};

export default Home;
