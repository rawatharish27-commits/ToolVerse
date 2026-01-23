import React, { useMemo, useDeferredValue, useState, useEffect } from 'react';
import { CATEGORIES } from '../data/categories';
import { TOOLS } from '../data/tools';
import ToolCard from '../components/ToolCard';
import AdPlaceholder from '../components/AdPlaceholder';
import SEOHead from '../components/SEOHead';
import SpinWheel from '../components/SpinWheel';
import SiteStatus from '../components/SiteStatus';
import TopSitesSection from '../components/TopSitesSection';
import { getToolPriorityScore } from '../utils/toolPriority';
import { 
  getAttractionState, 
  updateAttractionState, 
  getTopCategories, 
  getToolOfDay,
  trackToolClick 
} from '../utils/attraction';

interface HomeProps {
  onNavigate: (page: string, params?: any) => void;
  searchQuery?: string;
  favorites: string[];
  recent: string[];
  onToggleFavorite: (slug: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate, searchQuery = '', favorites, recent, onToggleFavorite }) => {
  const deferredSearch = useDeferredValue(searchQuery);
  const [mood, setMood] = useState(() => getAttractionState().mood);
  const [points, setPoints] = useState(() => getAttractionState().points);

  useEffect(() => {
    const sync = () => {
      const state = getAttractionState();
      setMood(state.mood);
      setPoints(state.points);
    };
    window.addEventListener('attraction_update', sync);
    return () => window.removeEventListener('attraction_update', sync);
  }, []);

  const changeMood = (newMood: string) => {
    setMood(newMood);
    updateAttractionState({ mood: newMood });
  };

  const topCategories = useMemo(() => getTopCategories(), [points]);
  const dailyTool = useMemo(() => getToolOfDay(TOOLS), []);

  const filteredTools = useMemo(() => {
    const query = deferredSearch.toLowerCase().trim();
    let list = [...TOOLS];

    // Mood-based Reordering
    if (mood === 'learn') {
      list = list.sort((a, b) => (a.category === 'education' || a.category === 'ai' ? -1 : 1));
    } else if (mood === 'money') {
      list = list.sort((a, b) => (a.category === 'calculators' || a.category === 'seo' ? -1 : 1));
    }

    if (!query) return list.sort((a, b) => getToolPriorityScore(b) - getToolPriorityScore(a));

    const queryTerms = query.split(/\s+/);
    return list.filter(tool => {
      const searchBlob = `${tool.title} ${tool.description} ${tool.category} ${tool.keywords.join(' ')}`.toLowerCase();
      return queryTerms.every(term => searchBlob.includes(term));
    }).sort((a, b) => getToolPriorityScore(b) - getToolPriorityScore(a));
  }, [deferredSearch, mood]);

  const recommendedTools = useMemo(() => {
    if (topCategories.length === 0) return TOOLS.slice(0, 4);
    return TOOLS.filter(t => topCategories.includes(t.category)).slice(0, 4);
  }, [topCategories]);

  const trendingTools = useMemo(() => {
    const state = getAttractionState();
    return Object.entries(state.clicks)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(entry => TOOLS.find(t => t.title === entry[0]))
      .filter(Boolean);
  }, [points]);

  const handleToolClick = (tool: any) => {
    trackToolClick(tool.title, tool.category);
    onNavigate('tool', { slug: tool.slug });
  };

  return (
    <div className="animate-in fade-in duration-700">
      <SEOHead 
        title="ToolVerse - World's Largest Free Online Tools Platform"
        description="Access 500+ free online tools. Personalize your workflow, track your progress, and level up your digital utility game."
        url="https://toolverse-4gr.pages.dev/"
      />
      
      {!deferredSearch && (
        <section className="relative overflow-hidden bg-slate-900">
          <SiteStatus />

          <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600 rounded-full blur-[120px] animate-pulse"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 relative z-10 text-center pt-24 pb-32">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
              Experience the Future of Utility
            </div>
            <h1 className="text-5xl sm:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
              Master Every<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-white to-emerald-400">Digital Flow.</span>
            </h1>
            
            {/* MOOD SWITCHER (Step 4) */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
               {[
                 { id: 'default', label: 'All Modes', icon: '🌐' },
                 { id: 'money', label: 'Earn & Grow', icon: '💰' },
                 { id: 'learn', label: 'Learn & Research', icon: '🧠' },
                 { id: 'speed', label: 'Quick Speed', icon: '⚡' }
               ].map(m => (
                 <button 
                  key={m.id}
                  onClick={() => changeMood(m.id)}
                  className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-3 ${
                    mood === m.id 
                    ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-600/40 ring-4 ring-indigo-500/20' 
                    : 'bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10'
                  }`}
                 >
                   <span className="text-xl">{m.icon}</span>
                   {m.label}
                 </button>
               ))}
            </div>

            {/* UNFINISHED BUSINESS REMINDER (Step 5) */}
            {Object.keys(getAttractionState().clicks).length > 0 && (
              <div className="max-w-xl mx-auto bg-indigo-500/10 border border-indigo-500/20 p-6 rounded-[2.5rem] mb-12 flex items-center justify-between group cursor-pointer hover:bg-indigo-500/20 transition-all" onClick={() => document.getElementById('personal-hub')?.scrollIntoView({behavior:'smooth'})}>
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-black shadow-lg shadow-indigo-600/50">
                      {Object.keys(getAttractionState().clicks).length}
                    </div>
                    <div className="text-left">
                       <div className="text-indigo-400 text-[9px] font-black uppercase tracking-widest">Unfinished Business</div>
                       <div className="text-white text-xs font-bold">Continue where you left off...</div>
                    </div>
                 </div>
                 <span className="text-indigo-400 group-hover:translate-x-2 transition-transform">→</span>
              </div>
            )}
          </div>
        </section>
      )}

      <div className="max-w-7xl mx-auto px-4 -mt-20 relative z-20 space-y-24 mb-32">
        
        {/* PERSONAL HUB SECTION (Step 1 & 2) */}
        {!deferredSearch && (
          <section id="personal-hub" className="glass bg-white/95 rounded-[3.5rem] p-8 md:p-16 shadow-2xl border border-white/50 backdrop-blur-3xl shadow-indigo-200/50">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
               <div className="lg:col-span-8 space-y-12">
                  <div>
                    <h3 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.4em] mb-4">Personal Mastery Hub</h3>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter italic">Suggested for You.</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {recommendedTools.map(t => (
                      <ToolCard key={t.slug} tool={t} isMini onClick={() => handleToolClick(t)} isFavorite={favorites.includes(t.slug)} onToggleFavorite={onToggleFavorite} />
                    ))}
                  </div>
               </div>

               <div className="lg:col-span-4 space-y-12 bg-slate-50/50 p-10 rounded-[3rem] border border-slate-100 shadow-inner">
                  <div>
                    <h3 className="text-[10px] font-black text-orange-500 uppercase tracking-[0.4em] mb-4">Trending FOMO</h3>
                    <h2 className="text-2xl font-black text-slate-900">Popular Now</h2>
                  </div>
                  <div className="space-y-4">
                    {trendingTools.length > 0 ? trendingTools.map((t: any) => (
                      <div key={t.slug} onClick={() => handleToolClick(t)} className="flex items-center p-5 bg-white rounded-3xl cursor-pointer border border-transparent hover:border-orange-200 hover:shadow-xl transition-all group">
                         <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center mr-4 text-xl group-hover:scale-110 transition-transform">🔥</div>
                         <div className="flex-grow">
                            <div className="text-xs font-black text-slate-800">{t.title}</div>
                            <div className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">{t.category}</div>
                         </div>
                      </div>
                    )) : (
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest text-center py-10">Exploration needed to trigger trends</p>
                    )}
                  </div>
               </div>
            </div>
          </section>
        )}

        {/* TOOL OF THE DAY (Step 6) */}
        {!deferredSearch && (
          <section className="bg-emerald-600 rounded-[4rem] p-12 md:p-24 text-white relative overflow-hidden group cursor-pointer" onClick={() => handleToolClick(dailyTool)}>
             <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-[100px] group-hover:bg-white/20 transition-all"></div>
             <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="max-w-xl text-center md:text-left space-y-8">
                   <div className="inline-block px-6 py-2 bg-black/20 rounded-full text-[10px] font-black uppercase tracking-[0.5em]">Hero Tool of the Day</div>
                   <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-tight">Master: {dailyTool.title}</h2>
                   <p className="text-emerald-50 text-xl font-medium opacity-80">{dailyTool.description}</p>
                   <button className="px-12 py-6 bg-white text-emerald-600 rounded-[2rem] font-black text-lg shadow-2xl hover:scale-105 active:scale-95 transition-all">Launch Masterclass Tool</button>
                </div>
                <div className="text-[10rem] md:text-[15rem] leading-none opacity-20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700">💎</div>
             </div>
          </section>
        )}

        <SpinWheel />

        <section id="tools-grid" className="py-12">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase italic">The Vault Index</h2>
              <p className="text-lg text-slate-500 font-medium leading-relaxed mt-4">500+ Verified Professional Utilities. No Uploads. 100% Native.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredTools.map(tool => (
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

        <TopSitesSection />
      </div>
    </div>
  );
};

export default Home;