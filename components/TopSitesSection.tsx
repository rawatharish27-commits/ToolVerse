
import React, { useState, useMemo, useEffect } from 'react';
import { TOP_SITES, TopSite } from '../data/topSites';
import { trackEvent } from '../utils/analytics';

const TopSitesSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  
  const categories = useMemo(() => {
    const uniqueCats = Array.from(new Set(TOP_SITES.map(s => s.category)));
    return ["All", ...uniqueCats];
  }, []);

  const filteredSites = useMemo(() => {
    if (activeCategory === "All") return TOP_SITES.slice(0, 18);
    return TOP_SITES.filter(s => s.category === activeCategory);
  }, [activeCategory]);

  const handleSiteClick = (site: TopSite) => {
    trackEvent('trusted_site_click', site.name);
    window.open(site.url, '_blank');
  };

  return (
    <section className="py-12 bg-slate-50 rounded-3xl mx-4 my-12 border border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Direct Access Hub</h2>
            <p className="text-xs text-slate-500 font-medium">Quick links to high-authority platforms.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.slice(0, 5).map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                  activeCategory === cat ? 'bg-indigo-600 text-white' : 'bg-white text-slate-400 border border-slate-200 hover:text-indigo-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {filteredSites.map(site => (
            <button 
              key={site.name} 
              onClick={() => handleSiteClick(site)}
              className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-xl hover:border-indigo-200 transition-all group"
            >
              <img 
                loading="lazy"
                src={`https://logo.clearbit.com/${site.domain}`} 
                alt="" 
                className="w-6 h-6 rounded-md object-contain grayscale group-hover:grayscale-0 transition-all"
                onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${site.name[0]}&background=f1f5f9&color=6366f1&bold=true`; }}
              />
              <span className="text-xs font-bold text-slate-600 group-hover:text-indigo-600 truncate">{site.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopSitesSection;
