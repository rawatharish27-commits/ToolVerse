

import React, { useMemo, useDeferredValue } from 'react';
import { CATEGORIES } from '../data/categories';
import { TOOLS } from '../data/tools';
import ToolCard from '../components/ToolCard';
import SEOHead from '../components/SEOHead';
import SiteStatus from '../components/SiteStatus';
import RewardHub from '../components/RewardHub';
import { trackToolClick } from '../utils/attraction';

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
    return TOOLS.sort((a,b) => (b.priority || 0) - (a.priority || 0)).slice(0, 20);
  }, []);

  const searchResults = useMemo(() => {
    const query = deferredSearch.toLowerCase().trim();
    if (!query) return null;
    return TOOLS.filter(tool => {
      const searchBlob = `${tool.title} ${tool.description} ${tool.keywords.join(' ')}`.toLowerCase();
      return searchBlob.includes(query);
    }).slice(0, 30);
  }, [deferredSearch]);

  return (
    <div className="bg-white min-h-screen">
      <SEOHead title="ToolVerse | Global Directory" description="Access the top 20 professional tools instantly. Secure, browser-native processing." url="https://toolverse-4gr.pages.dev/" />

      {/* HERO SECTION */}
      <section className="relative pt-24 pb-20 bg-slate-50 border-b border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white border border-slate-200 text-indigo-600 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
             ToolVerse OS v4.0 Active
          </div>
          <h1 className="text-6xl md:text-9xl font-black text-slate-900 tracking-tighter mb-8 leading-none">
            Pure Logic. <br /><span className="text-indigo-600 italic">No Latency.</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto mb-16">The ultimate command center for 120+ professional tools. <br/>All logic runs 100% locally in your browser.</p>
          
          {/* USER ONBOARDING GUIDE */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
             {[
               { id: '1', t: 'Explore Directory', d: 'Click the 3-dots on top-left to browse categories.', i: '📂' },
               { id: '2', t: 'Local Processing', d: 'Your files are never uploaded. Privacy is 100% hardcoded.', i: '🔒' },
               { id: '3', t: 'One-Click Utility', d: 'Click any tool to launch a dedicated workspace.', i: '⚡' }
             ].map(step => (
               <div key={step.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-indigo-500/5 text-left group">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{step.i}</div>
                  <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-2">{step.t}</h3>
                  <p className="text-slate-400 text-xs font-medium leading-relaxed">{step.d}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      <div className="max-w-[1600px] mx-auto px-6 py-20">
        <div className="space-y-32">
          
          {/* SEARCH RESULTS */}
          {deferredSearch && searchResults && (
            <section className="animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-3xl font-black text-slate-900 mb-12 flex items-center gap-4">
                <span className="w-1.5 h-8 bg-indigo-600 rounded-full"></span>
                Search Results
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {searchResults.map(tool => (
                  <ToolCard key={tool.slug} tool={tool} onClick={() => onNavigate('tool', { slug: tool.slug })} isFavorite={favorites.includes(tool.slug)} onToggleFavorite={onToggleFavorite} />
                ))}
              </div>
            </section>
          )}

          {/* TOP 20 TOOLS - PERFORMANCE OPTIMIZED */}
          {!deferredSearch && (
            <section>
              <div className="flex items-center justify-between mb-16 border-b border-slate-100 pb-8">
                 <h2 className="text-4xl font-black text-slate-900 tracking-tight">Top Performance Nodes</h2>
                 {/* Fix: Replaced direct call to undefined setIsMenuOpen with a custom event that Layout listens to */}
                 <button onClick={() => window.dispatchEvent(new Event('tv_open_menu'))} className="px-8 py-3 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl hover:bg-indigo-600 transition-all active:scale-95">Open Global Directory</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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

          {/* CATEGORY EXPLORATION TILES */}
          {!deferredSearch && (
            <section>
               <h2 className="text-3xl font-black text-slate-900 mb-12">Browse Intelligence Clusters</h2>
               <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                 {CATEGORIES.map(cat => (
                   <button 
                    key={cat.id} 
                    onClick={() => onNavigate('category', { id: cat.id })}
                    className="p-8 bg-slate-50 border border-slate-100 rounded-[2.5rem] flex flex-col items-center gap-4 hover:bg-white hover:shadow-2xl hover:border-indigo-100 hover:-translate-y-2 transition-all group"
                   >
                     <div className={`w-14 h-14 ${cat.color} rounded-2xl flex items-center justify-center text-2xl text-white shadow-lg group-hover:rotate-12 transition-transform`}>{cat.icon}</div>
                     <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-indigo-600">{cat.name}</span>
                   </button>
                 ))}
               </div>
            </section>
          )}

          <RewardHub />
        </div>
      </div>
      <SiteStatus />
    </div>
  );
};

export default Home;