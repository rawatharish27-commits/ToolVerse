
import React, { useMemo } from 'react';
import { CATEGORIES } from '../data/categories';
import { TOOLS } from '../data/tools';
import ToolCard from '../components/ToolCard';
import AdPlaceholder from '../components/AdPlaceholder';
import SEOHead from '../components/SEOHead';
import { getToolPriorityScore } from '../utils/toolPriority';

interface HomeProps {
  onNavigate: (page: string, params?: any) => void;
  searchQuery?: string;
  favorites: string[];
  recent: string[];
  onToggleFavorite: (slug: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate, searchQuery = '', favorites, recent, onToggleFavorite }) => {
  const filteredTools = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    let list = q 
      ? TOOLS.filter(t => 
          t.title.toLowerCase().includes(q) || 
          t.description.toLowerCase().includes(q) ||
          t.keywords.some(k => k.toLowerCase().includes(q)) ||
          t.category.toLowerCase().includes(q)
        )
      : [...TOOLS];
    
    return list.sort((a, b) => getToolPriorityScore(b) - getToolPriorityScore(a));
  }, [searchQuery]);

  const favoriteTools = TOOLS.filter(t => favorites.includes(t.slug));
  const recentTools = TOOLS.filter(t => recent.includes(t.slug));

  return (
    <div className="animate-in fade-in duration-700">
      <SEOHead 
        title="ToolVerse - World's Largest Free Online Tools Platform"
        description="Access 500+ free online tools for PDF, Images, Video, AI, SEO, and Development. Safe, fast, and 100% client-side processing."
        url="https://toolverse.com/"
      />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 pt-32 pb-48 sm:pt-40 sm:pb-60">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
          <div className="absolute -top-1/4 -left-1/4 w-3/4 h-3/4 bg-indigo-600 rounded-full blur-[160px] animate-pulse"></div>
          <div className="absolute -bottom-1/4 -right-1/4 w-3/4 h-3/4 bg-purple-600 rounded-full blur-[160px] animate-pulse"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-xs font-black uppercase tracking-[0.2em] mb-8 animate-bounce-slow">
            <span className="relative flex h-2 w-2 mr-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Live: 500+ Pro Tools Ready
          </div>
          <h1 className="text-5xl sm:text-8xl font-black text-white tracking-tight mb-8 leading-[1.1]">
            One Hub.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-white to-purple-400">Unlimited Power.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-slate-400 mb-12 font-medium leading-relaxed">
            Stop switching tabs. ToolVerse brings every professional utility together in a privacy-first, ultra-fast browser ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
            <button 
              onClick={() => {
                const el = document.getElementById('tools-grid');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-12 py-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-[2rem] font-black text-lg shadow-2xl shadow-indigo-600/30 transition-all transform hover:-translate-y-2 active:scale-95"
            >
              Start Exploring
            </button>
            <div className="text-slate-600 font-black hidden sm:block">OR</div>
            <button 
              onClick={() => document.querySelector('input')?.focus()}
              className="w-full sm:w-auto px-12 py-6 bg-white/5 border border-white/10 text-white rounded-[2rem] font-black text-lg hover:bg-white/10 transition-all backdrop-blur-xl"
            >
              Search Tools
            </button>
          </div>
        </div>
      </section>

      {/* Workspace Section */}
      {!searchQuery && (favorites.length > 0 || recent.length > 0) && (
        <section className="max-w-7xl mx-auto px-4 -mt-32 relative z-20 mb-20">
          <div className="glass bg-white/90 rounded-[3.5rem] p-10 md:p-16 shadow-2xl border border-white/50 backdrop-blur-3xl shadow-indigo-200/50">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
               <div>
                 <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center">
                    <span className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center mr-4 text-xl shadow-lg">📁</span>
                    Your Personal Studio
                 </h2>
                 <p className="text-slate-500 font-medium mt-1">Quick access to your most-used and starred utilities.</p>
               </div>
               <div className="flex gap-3">
                  <div className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-[0.1em] border border-indigo-100">Synchronized Locally</div>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
               {favorites.length > 0 && (
                 <div className="space-y-6">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center">
                       <span className="mr-2">★</span> Starred Tools
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       {favoriteTools.map(t => (
                         <ToolCard key={t.slug} tool={t} isMini onClick={() => onNavigate('tool', { slug: t.slug })} isFavorite={true} onToggleFavorite={onToggleFavorite} />
                       ))}
                    </div>
                 </div>
               )}
               {recent.length > 0 && (
                 <div className="space-y-6">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center">
                       <span className="mr-2">⚡</span> Recent Activity
                    </h3>
                    <div className="space-y-3">
                       {recentTools.map(t => (
                         <div key={t.slug} onClick={() => onNavigate('tool', { slug: t.slug })} className="flex items-center p-4 bg-slate-50 hover:bg-white rounded-3xl cursor-pointer transition-all border border-transparent hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-100/30 group">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mr-5 group-hover:scale-110 transition-transform shadow-sm text-2xl">
                               {CATEGORIES.find(c => c.id === t.category)?.icon || '🛠️'}
                            </div>
                            <div className="flex-grow">
                               <div className="text-sm font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{t.title}</div>
                               <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{t.category}</div>
                            </div>
                            <svg className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 transition-all transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"/></svg>
                         </div>
                       ))}
                    </div>
                 </div>
               )}
            </div>
          </div>
        </section>
      )}

      {/* Search Result / Grid Section */}
      <section id="tools-grid" className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
              {searchQuery ? `Displaying results for "${searchQuery}"` : "Global Tool Library"}
            </h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">
              {searchQuery ? `Found ${filteredTools.length} utilities matching your search criteria.` : "Browse our verified collection of 500+ professional tools across 12 categories."}
            </p>
          </div>
          {searchQuery && (
            <button onClick={() => onNavigate('home')} className="mt-4 md:mt-0 text-indigo-600 font-bold hover:underline flex items-center">
              Clear Search <span className="ml-2">✕</span>
            </button>
          )}
        </div>

        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredTools.map(tool => (
              <ToolCard 
                key={tool.slug} 
                tool={tool} 
                onClick={() => onNavigate('tool', { slug: tool.slug })} 
                isFavorite={favorites.includes(tool.slug)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-40 bg-white rounded-[3rem] border-4 border-dashed border-slate-100 flex flex-col items-center">
            <div className="text-8xl mb-8 animate-bounce-slow">🔍</div>
            <h3 className="text-3xl font-black text-slate-900 mb-4">No utilities found</h3>
            <p className="text-slate-400 max-w-sm mx-auto font-medium">We couldn't find a tool matching that query. Try broader terms like "PDF", "Video", or "Text".</p>
            <button onClick={() => onNavigate('home')} className="mt-8 px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-xl shadow-indigo-100">Explore All Tools</button>
          </div>
        )}
      </section>

      {!searchQuery && (
        <>
          <section id="categories" className="bg-slate-900 py-32 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center mb-24">
                <h2 className="text-4xl sm:text-5xl font-black text-white mb-6 tracking-tight">Explore 12 Specialized Hubs</h2>
                <p className="text-slate-400 max-w-2xl mx-auto text-lg">Every category is a dedicated workspace with its own high-performance engine.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {CATEGORIES.map(cat => (
                  <div 
                    key={cat.id}
                    onClick={() => onNavigate('category', { id: cat.id })}
                    className="group relative p-10 rounded-[3rem] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer overflow-hidden"
                  >
                    <div className={`w-16 h-16 ${cat.color} text-white rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-2xl shadow-black/50 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                      {cat.icon}
                    </div>
                    <h3 className="text-2xl font-black text-white mb-4 tracking-tight">{cat.name}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">{cat.description}</p>
                    <div className="text-xs font-black text-indigo-400 uppercase tracking-widest flex items-center group-hover:translate-x-2 transition-transform">
                      Browse Hub <span className="ml-2">→</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-32 max-w-7xl mx-auto px-4">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[4rem] p-12 md:p-24 text-white flex flex-col lg:flex-row items-center justify-between gap-16 shadow-[0_50px_100px_-20px_rgba(79,70,229,0.3)]">
               <div className="max-w-xl text-center lg:text-left">
                  <h2 className="text-5xl font-black mb-8 leading-tight tracking-tight">Level up your <br />digital workflow.</h2>
                  <p className="text-indigo-100 text-lg mb-12 font-medium leading-relaxed opacity-90">Join professionals from around the globe who rely on ToolVerse for their daily technical and creative tasks. Always free. Always secure.</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <button className="px-12 py-5 bg-white text-indigo-600 font-black rounded-[2rem] shadow-2xl transition-all hover:scale-105 active:scale-95 text-lg">Launch Free Portal</button>
                    <button className="px-12 py-5 bg-indigo-500/30 border border-white/20 text-white font-black rounded-[2rem] backdrop-blur-md transition-all hover:bg-indigo-500/50 text-lg">Documentation</button>
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-6 w-full lg:w-auto">
                  {[
                    { val: "1000+", lab: "Total Tools" },
                    { val: "100%", lab: "Browser Native" },
                    { val: "0.0s", lab: "Upload Latency" },
                    { val: "Private", lab: "Data Policy" }
                  ].map((stat, i) => (
                    <div key={i} className="bg-white/10 p-10 rounded-[2.5rem] backdrop-blur-xl border border-white/10 text-center flex flex-col justify-center shadow-lg transform hover:scale-105 transition-all">
                      <div className="text-4xl font-black mb-2 leading-none">{stat.val}</div>
                      <div className="text-[10px] uppercase font-black text-indigo-200 tracking-[0.2em]">{stat.lab}</div>
                    </div>
                  ))}
               </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Home;
