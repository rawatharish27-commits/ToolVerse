
import React, { useState, useMemo } from 'react';
import { TOP_SITES, TopSite } from '../data/topSites';

const TopSitesSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  
  const filteredSites = useMemo(() => {
    if (activeCategory === "All") return TOP_SITES.slice(0, 18);
    return TOP_SITES.filter(s => s.category === activeCategory);
  }, [activeCategory]);

  return (
    <section className="py-10 bg-white rounded-3xl mx-4 my-10 border border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Authoritative Platforms</h2>
            <p className="text-[11px] text-slate-500 font-medium">Instant access to primary digital hubs.</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {["All", "Search Engines", "Social Media", "AI / Tech Tools"].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all ${
                  activeCategory === cat ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-400 border border-slate-200 hover:text-indigo-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-2">
          {filteredSites.map(site => (
            <button 
              key={site.name} 
              onClick={() => window.open(site.url, '_blank')}
              className="flex items-center gap-2.5 p-2.5 bg-slate-50 border border-transparent rounded-xl hover:border-indigo-200 hover:bg-white transition-all group"
            >
              <img 
                loading="lazy"
                src={`https://logo.clearbit.com/${site.domain}`} 
                className="w-5 h-5 rounded-md object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all"
                alt=""
                onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${site.name[0]}&background=f1f5f9&color=6366f1&bold=true`; }}
              />
              <span className="text-[11px] font-bold text-slate-600 group-hover:text-indigo-600 truncate">{site.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopSitesSection;
