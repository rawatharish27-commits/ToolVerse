
import React, { useMemo } from 'react';
import { CATEGORIES } from '../data/categories';
import { TOOLS } from '../data/tools';
import ToolCard from '../components/ToolCard';
import AdPlaceholder from '../components/AdPlaceholder';

interface HomeProps {
  onNavigate: (page: string, params?: any) => void;
  searchQuery?: string;
}

const Home: React.FC<HomeProps> = ({ onNavigate, searchQuery = '' }) => {
  const filteredTools = useMemo(() => {
    if (!searchQuery) return TOOLS.slice(0, 12);
    const q = searchQuery.toLowerCase();
    return TOOLS.filter(t => 
      t.title.toLowerCase().includes(q) || 
      t.description.toLowerCase().includes(q) ||
      t.keywords.some(k => k.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 py-24 sm:py-32">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-indigo-500 rounded-full blur-[120px]"></div>
          <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-500 rounded-full blur-[120px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl sm:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            The Ultimate <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400">Mega Tool Platform</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-slate-300 mb-10 font-medium">
            Search and use 500+ premium quality tools for FREE. High-traffic utilities for developers, designers, and marketers.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button 
              onClick={() => {
                const el = document.getElementById('categories');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-10 py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-xl shadow-indigo-500/20 transition-all transform hover:-translate-y-1"
            >
              Browse Categories
            </button>
            <div className="text-slate-400 font-bold hidden sm:block">OR</div>
            <div className="text-white font-bold sm:hidden">Start Searching Above</div>
          </div>
        </div>
      </section>

      {/* Featured Ad */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <AdPlaceholder type="banner" />
      </div>

      {/* Tools Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              {searchQuery ? `Search Results for "${searchQuery}"` : "Featured Tools"}
            </h2>
            <p className="text-slate-500">
              {searchQuery ? `Found ${filteredTools.length} tools matching your query.` : "The most popular tools used by 100k+ monthly users."}
            </p>
          </div>
          {searchQuery && (
            <button onClick={() => window.location.hash = ''} className="text-indigo-600 font-bold mt-4 md:mt-0 underline">Clear Search</button>
          )}
        </div>

        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTools.map(tool => (
              <ToolCard 
                key={tool.slug} 
                tool={tool} 
                onClick={() => onNavigate('tool', { slug: tool.slug })} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-300">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-slate-800">No tools found</h3>
            <p className="text-slate-400">Try searching for keywords like "PDF", "AI", or "Image".</p>
          </div>
        )}
      </section>

      {!searchQuery && (
        <>
          {/* Categories Grid */}
          <section id="categories" className="bg-slate-900 py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-white mb-4">Explore 12+ Categories</h2>
                <p className="text-slate-400 max-w-xl mx-auto">From AI generation to system network utilities, we have everything organized for you.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {CATEGORIES.map(cat => (
                  <div 
                    key={cat.id}
                    onClick={() => onNavigate('category', { id: cat.id })}
                    className="group glass p-8 rounded-3xl hover:bg-white/10 transition-all cursor-pointer border border-white/10"
                  >
                    <div className={`w-14 h-14 ${cat.color} text-white rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                      {cat.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{cat.name}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{cat.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Ad Slot */}
          <div className="max-w-7xl mx-auto px-4 my-16">
            <AdPlaceholder type="inline" />
          </div>

          {/* Stats Section */}
          <section className="py-24 max-w-7xl mx-auto px-4">
            <div className="bg-indigo-600 rounded-[3rem] p-12 md:p-20 text-white flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl shadow-indigo-200">
               <div className="max-w-md text-center md:text-left">
                  <h2 className="text-4xl font-extrabold mb-6">Ready to scale your workflow?</h2>
                  <p className="text-indigo-100 mb-8 font-medium">Join thousands of professionals using ToolVerse daily to simplify their digital tasks.</p>
                  <button className="px-10 py-4 bg-white text-indigo-600 font-bold rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95">Get Started Free</button>
               </div>
               <div className="grid grid-cols-2 gap-8 text-center">
                  <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-sm">
                    <div className="text-3xl font-bold mb-1">500+</div>
                    <div className="text-xs uppercase font-bold text-indigo-200">Tools</div>
                  </div>
                  <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-sm">
                    <div className="text-3xl font-bold mb-1">100%</div>
                    <div className="text-xs uppercase font-bold text-indigo-200">Free</div>
                  </div>
                  <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-sm">
                    <div className="text-3xl font-bold mb-1">24/7</div>
                    <div className="text-xs uppercase font-bold text-indigo-200">Uptime</div>
                  </div>
                  <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-sm">
                    <div className="text-3xl font-bold mb-1">99.9%</div>
                    <div className="text-xs uppercase font-bold text-indigo-200">Success</div>
                  </div>
               </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Home;
