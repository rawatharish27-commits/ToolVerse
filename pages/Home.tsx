
import React, { useMemo, useDeferredValue, useState, useEffect } from 'react';
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

  const searchResults = useMemo(() => {
    const query = deferredSearch.toLowerCase().trim();
    if (!query) return null;
    return TOOLS.filter(tool => {
      const searchBlob = `${tool.title} ${tool.description} ${tool.keywords.join(' ')}`.toLowerCase();
      return searchBlob.includes(query);
    }).slice(0, 40);
  }, [deferredSearch]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="bg-white min-h-screen">
      <SEOHead title="ToolVerse | 150+ Professional Utility Nodes" description="The world's most powerful collection of browser-native professional tools. Private, instant, and high-performance." url="https://toolverse-4gr.pages.dev/" />

      {/* ENHANCED HERO */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center bg-slate-950 overflow-hidden px-6">
        <div className="absolute inset-0 z-0 pointer-events-none">
           <div className="absolute top-1/4 left-1/4 w-[60vw] h-[60vw] bg-indigo-600/20 rounded-full blur-[150px] animate-pulse"></div>
           <div className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] bg-emerald-600/10 rounded-full blur-[130px] animate-pulse delay-700"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-[11px] font-black uppercase tracking-[0.3em] mb-12 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-700">
             <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full mr-3 animate-ping shadow-[0_0_10px_#6366f1]"></span>
             Neural Node Network Active
          </div>
          
          <h1 className="text-6xl md:text-[9rem] font-black text-white tracking-tighter mb-12 leading-[0.8] animate-in fade-in slide-in-from-bottom-6 duration-1000">
            Digital <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400 italic">Command.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 font-medium max-w-4xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 leading-relaxed">
            Execute over 150 high-traffic professional nodes with zero latency. <br className="hidden md:block" /> 
            100% Client-Side. No Data Uploads.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-24 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
             <button 
              onClick={() => scrollToSection('tool-browser')}
              className="px-14 py-7 bg-indigo-600 text-white rounded-[2.5rem] font-black text-xl shadow-[0_30px_60px_-15px_rgba(99,102,241,0.5)] hover:bg-indigo-700 hover:-translate-y-2 transition-all group flex items-center gap-4"
             >
               Launch Workspace
               <span className="group-hover:translate-x-2 transition-transform">↓</span>
             </button>
             <button 
              onClick={() => window.dispatchEvent(new Event('tv_open_menu'))}
              className="px-14 py-7 bg-white/5 text-white border border-white/10 rounded-[2.5rem] font-black text-xl shadow-xl hover:bg-white/10 hover:-translate-y-2 transition-all backdrop-blur-sm"
             >
               Browse Directory
             </button>
          </div>
        </div>

        <div className="w-full absolute bottom-0 left-0">
          <SiteStatus />
        </div>
      </section>

      {/* QUICK CATEGORY NAV */}
      <div className="sticky top-20 z-[100] bg-white/90 backdrop-blur-md border-b border-slate-100 py-4 no-scrollbar overflow-x-auto shadow-sm">
        <div className="max-w-[1600px] mx-auto px-6 flex gap-3">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => scrollToSection(`section-${cat.id}`)}
              className="px-5 py-2.5 rounded-full bg-slate-50 border border-slate-100 hover:border-indigo-600 hover:text-indigo-600 text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap"
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div id="tool-browser" className="max-w-[1600px] mx-auto px-6 py-20">
        <div className="space-y-40">
          
          {/* SEARCH RESULTS NODE */}
          {deferredSearch && searchResults && (
            <section className="animate-in fade-in slide-in-from-bottom-10 duration-700">
              <div className="flex items-center gap-6 mb-16">
                <div className="w-2 h-10 bg-indigo-600 rounded-full"></div>
                <h2 className="text-5xl font-black text-slate-900 tracking-tight">Search Results</h2>
                <div className="px-4 py-2 bg-slate-100 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest">{searchResults.length} Nodes Found</div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {searchResults.map(tool => (
                  <ToolCard key={tool.slug} tool={tool} onClick={() => onNavigate('tool', { slug: tool.slug })} isFavorite={favorites.includes(tool.slug)} onToggleFavorite={onToggleFavorite} />
                ))}
              </div>
            </section>
          )}

          {/* MASTER CATEGORY BROWSER - ALL TOOLS */}
          {!deferredSearch && (
            <div className="space-y-32">
              {CATEGORIES.map(cat => {
                const catTools = TOOLS.filter(t => t.category === cat.id).sort((a,b) => (b.priority || 0) - (a.priority || 0));
                if (catTools.length === 0) return null;

                return (
                  <section key={cat.id} id={`section-${cat.id}`} className="animate-in fade-in duration-1000 scroll-mt-40">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                       <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <div className={`w-14 h-14 ${cat.color} text-white rounded-2xl flex items-center justify-center text-3xl shadow-xl shadow-black/10`}>
                              {cat.icon}
                            </div>
                            <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none">{cat.name}</h2>
                          </div>
                          <p className="text-xl text-slate-400 font-medium max-w-2xl leading-relaxed">{cat.description}</p>
                       </div>
                       <button 
                        onClick={() => onNavigate('category', { id: cat.id })}
                        className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-indigo-600 transition-all"
                       >
                         View All {cat.name} →
                       </button>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                      {catTools.map(tool => (
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
