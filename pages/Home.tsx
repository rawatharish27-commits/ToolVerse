
import React, { useMemo, useDeferredValue, useState, Suspense, lazy } from 'react';
import { CATEGORIES } from '../data/categories';
import { TOOLS } from '../data/tools';
import ToolCard from '../components/ToolCard';
import SEOHead from '../components/SEOHead';
import SiteStatus from '../components/SiteStatus';
import TopSitesSection from '../components/TopSitesSection';
import { getToolPriorityScore } from '../utils/toolPriority';
import { 
  getAttractionState, 
  getTopCategories, 
  getToolOfDay,
  trackToolClick 
} from '../utils/attraction';

const RewardHub = lazy(() => import('../components/RewardHub'));

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

  const topCategories = useMemo(() => getTopCategories(), []);
  const dailyTool = useMemo(() => getToolOfDay(TOOLS), []);

  const filteredTools = useMemo(() => {
    const query = deferredSearch.toLowerCase().trim();
    let list = [...TOOLS];
    list.sort((a, b) => getToolPriorityScore(b) - getToolPriorityScore(a));

    if (activeCategory) {
      list = list.filter(t => t.category === activeCategory);
    }

    if (!query) return list;

    const queryTerms = query.split(/\s+/);
    return list.filter(tool => {
      const searchBlob = `${tool.title} ${tool.description} ${tool.category} ${tool.keywords.join(' ')}`.toLowerCase();
      return queryTerms.every(term => searchBlob.includes(term));
    });
  }, [deferredSearch, activeCategory]);

  const recommendedTools = useMemo(() => {
    if (topCategories.length === 0) return TOOLS.slice(0, 4);
    return TOOLS.filter(t => topCategories.includes(t.category)).slice(0, 4);
  }, [topCategories]);

  const handleToolClick = (tool: any) => {
    trackToolClick(tool.slug, tool.category);
    onNavigate('tool', { slug: tool.slug });
  };

  return (
    <div className="animate-in fade-in duration-700 bg-slate-50 min-h-screen">
      <SEOHead 
        title="ToolVerse - World's Largest Free Online Tools Hub"
        description="Access over 500 professional online tools. 100% free, no registration, local processing."
        url="https://toolverse-4gr.pages.dev/"
      />
      
      {!deferredSearch && (
        <section className="relative overflow-hidden pt-32 pb-48 hero-gradient">
          <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
            <div className="inline-flex items-center px-5 py-2 rounded-full bg-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-[0.4em] mb-12 shadow-sm border border-indigo-200">
              🚀 THE ULTIMATE MEGA UTILITY HUB
            </div>
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-12 leading-[0.85] text-slate-900">
              Your Daily <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 animate-gradient">Power Pack.</span>
            </h1>
            
            {/* Optimized Search Bar Component-like UI */}
            <div className="max-w-3xl mx-auto mb-16 relative">
               <div className="absolute inset-y-0 left-8 flex items-center pointer-events-none">
                  <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
               </div>
               <div className="w-full h-24 bg-white rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(79,70,229,0.2)] border border-indigo-100 flex items-center pl-20 pr-8">
                  <span className="text-slate-300 text-xl font-medium">Try "Merge PDF" or "AI Article..."</span>
                  <div className="ml-auto flex gap-2">
                    <span className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-black text-slate-400">Ctrl + K</span>
                  </div>
               </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
               {CATEGORIES.slice(0, 10).map(cat => (
                 <button 
                  key={cat.id}
                  onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                  className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 border shadow-sm ${
                    activeCategory === cat.id 
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-xl scale-105' 
                    : 'bg-white border-slate-200 text-slate-500 hover:border-indigo-300'
                  }`}
                 >
                   <span className="text-lg">{cat.icon}</span>
                   {cat.name}
                 </button>
               ))}
            </div>
          </div>
        </section>
      )}

      <div className="max-w-7xl mx-auto px-4 -mt-24 relative z-20 space-y-24 mb-40">
        
        {/* PERSONALIZED DASHBOARD */}
        {!deferredSearch && !activeCategory && (
          <section className="glass-card rounded-[4rem] p-12 md:p-20 shadow-2xl border border-white/50 backdrop-blur-3xl shadow-indigo-100/50">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
               <div className="lg:col-span-8 space-y-12">
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.5em] mb-3">Priority Workspace</h3>
                      <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none italic">Recommended For You</h2>
                    </div>
                    <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">Customize Hub →</button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {recommendedTools.map(t => (
                      <ToolCard key={t.slug} tool={t} isMini onClick={() => handleToolClick(t)} isFavorite={favorites.includes(t.slug)} onToggleFavorite={onToggleFavorite} />
                    ))}
                  </div>
               </div>

               <div className="lg:col-span-4 space-y-10 bg-indigo-50/30 p-12 rounded-[3.5rem] border border-indigo-100/50 shadow-inner">
                  <div>
                    <h3 className="text-[11px] font-black text-emerald-600 uppercase tracking-[0.5em] mb-3">AI Intelligence Pick</h3>
                    <h2 className="text-2xl font-black text-slate-900">Today's Master Tool</h2>
                  </div>
                  <div className="space-y-6">
                      <div onClick={() => handleToolClick(dailyTool)} className="bg-white p-8 rounded-[2.5rem] cursor-pointer border border-transparent hover:border-emerald-200 hover:shadow-2xl transition-all group">
                         <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 text-4xl group-hover:scale-110 transition-transform">💎</div>
                         <div className="space-y-2">
                            <div className="text-lg font-black text-slate-900 group-hover:text-emerald-600 transition-colors">{dailyTool.title}</div>
                            <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed">{dailyTool.description}</p>
                         </div>
                      </div>
                      <button onClick={() => onNavigate('category', { id: dailyTool.category })} className="w-full py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors">
                        Discover Hub: {dailyTool.category} →
                      </button>
                  </div>
               </div>
            </div>
          </section>
        )}

        <TopSitesSection />

        {/* LIGHT LOAD REWARD HUB */}
        <Suspense fallback={
          <div className="h-48 bg-slate-900/5 rounded-[4rem] flex items-center justify-center border-4 border-dashed border-slate-200">
             <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] animate-pulse">Initializing Reward Core...</span>
          </div>
        }>
          <RewardHub />
        </Suspense>

        <section id="vault-index" className="py-12">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="max-w-3xl">
              <div className="text-xs font-black text-indigo-500 uppercase tracking-[0.5em] mb-4">Total Global Ecosystem</div>
              <h2 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter uppercase leading-[0.85]">The Vault Index</h2>
              <p className="text-xl text-slate-500 font-medium leading-relaxed mt-6 max-w-2xl">
                Quick-access to {filteredTools.length} production-grade professional tools. Privacy first. Local processing.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTools.length > 0 ? (
              filteredTools.map(tool => (
                <ToolCard 
                  key={tool.slug} 
                  tool={tool} 
                  onClick={() => handleToolClick(tool)} 
                  isFavorite={favorites.includes(tool.slug)}
                  onToggleFavorite={onToggleFavorite}
                />
              ))
            ) : (
               [...Array(8)].map((_, i) => (
                 <div key={i} className="h-64 rounded-[3.5rem] skeleton opacity-50"></div>
               ))
            )}
          </div>
        </section>
      </div>
      <SiteStatus />
    </div>
  );
};

export default Home;
