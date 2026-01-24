
import React, { useState, useMemo, useEffect } from 'react';
import { TOP_SITES, TopSite } from '../data/topSites';
import { trackEvent } from '../utils/analytics';
import { getAIRecommendedSites } from '../services/gemini';

const CATEGORY_ICONS: Record<string, string> = {
  "Search Engines": "🔎",
  "Social Media": "📱",
  "Video & Streaming": "🎥",
  "E-Commerce": "🛒",
  "AI / Tech Tools": "🤖",
  "News & Knowledge": "🧠",
  "Work & Productivity": "🧑‍💼",
  "Finance & Crypto": "💰"
};

const TopSitesSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All Hubs");
  const [userCountry, setUserCountry] = useState<'in' | 'global'>('global');
  const [recommendations, setRecommendations] = useState<TopSite[]>([]);
  
  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const country = (tz.includes("India") || tz.includes("Calcutta")) ? 'in' : 'global';
    setUserCountry(country);
  }, []);

  useEffect(() => {
    const loadAIRecommendations = async () => {
      const CACHE_KEY = `tv_reco_v21_${userCountry}`;
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        const names = JSON.parse(cached);
        setRecommendations(TOP_SITES.filter(s => names.includes(s.name)).slice(0, 6));
      }

      try {
        const raw = localStorage.getItem('tv_site_clicks') || '{}';
        const clicks = JSON.parse(raw);
        const topClicks = Object.entries(clicks)
          .sort((a: any, b: any) => b[1] - a[1])
          .slice(0, 5)
          .map(e => e[0]);

        const aiSuggestedNames = await getAIRecommendedSites(userCountry, topClicks);
        if (aiSuggestedNames && aiSuggestedNames.length > 0) {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify(aiSuggestedNames));
          setRecommendations(TOP_SITES.filter(s => aiSuggestedNames.includes(s.name)).slice(0, 6));
        } else if (!cached) {
          setRecommendations(TOP_SITES.filter(s => s.popular).slice(0, 6));
        }
      } catch (e) {
        if (!cached) setRecommendations(TOP_SITES.filter(s => s.popular).slice(0, 6));
      }
    };
    loadAIRecommendations();
  }, [userCountry]);

  const handleSiteClick = (site: TopSite) => {
    trackEvent('trusted_site_click', site.name);
    const raw = localStorage.getItem('tv_site_clicks') || '{}';
    const clicks = JSON.parse(raw);
    clicks[site.name] = (clicks[site.name] || 0) + 1;
    localStorage.setItem('tv_site_clicks', JSON.stringify(clicks));
    window.open(site.url, '_blank');
  };

  const filteredSites = useMemo(() => {
    let list = TOP_SITES.filter(s => !s.country || s.country === userCountry);
    if (activeCategory === "All Hubs") return list;
    return list.filter(s => s.category === activeCategory);
  }, [activeCategory, userCountry]);

  const categories = useMemo(() => {
    const uniqueCats = Array.from(new Set(TOP_SITES.map(s => s.category)));
    return ["All Hubs", ...uniqueCats];
  }, []);

  return (
    <section className="py-32 bg-white relative overflow-hidden border-y border-slate-100">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-indigo-50 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-50 rounded-full blur-[150px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <div className="inline-flex items-center px-8 py-3 rounded-full bg-indigo-50 text-indigo-600 text-xs font-black uppercase tracking-[0.5em] mb-8 border border-indigo-100 shadow-sm">
            THE POWER USER INDEX
          </div>
          <h2 className="text-6xl md:text-9xl font-black text-slate-900 mb-8 tracking-tighter leading-[0.85]">
            Global <span className="text-indigo-600">Hubs.</span>
          </h2>
          <p className="text-2xl md:text-4xl text-slate-400 max-w-4xl mx-auto font-medium leading-tight">
            Direct access to the web's most powerful platforms. <br className="hidden md:block" />
            Curated by ToolVerse AI for your digital territory.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mb-24">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-10 py-5 rounded-[2rem] text-xs font-black uppercase tracking-widest transition-all duration-500 ${
                activeCategory === cat 
                ? 'bg-indigo-600 text-white shadow-2xl scale-105 border-indigo-500' 
                : 'bg-white text-slate-400 border border-slate-200 hover:border-indigo-400 hover:text-indigo-600 hover:-translate-y-1 shadow-sm'
              }`}
            >
              <span className="mr-3">{cat === "All Hubs" ? "🌍" : CATEGORY_ICONS[cat] || "🔖"}</span>
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
          {filteredSites.map(site => (
            <button 
              key={site.name} 
              onClick={() => handleSiteClick(site)}
              className="brand-card-hover group relative bg-white p-12 rounded-[4rem] border border-slate-100 transition-all flex flex-col items-center gap-8 overflow-hidden shadow-2xl shadow-slate-200/50"
            >
              <div className="relative w-32 h-32 flex-shrink-0 bg-slate-50 rounded-[2.5rem] flex items-center justify-center overflow-hidden border border-slate-100 group-hover:bg-white group-hover:shadow-indigo-200/50 transition-all duration-700">
                <img 
                  loading="lazy"
                  src={`https://logo.clearbit.com/${site.domain}`} 
                  alt={site.name} 
                  className="w-20 h-20 object-contain group-hover:scale-125 transition-transform duration-700"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${site.name}&background=6366f1&color=fff&bold=true&size=256`;
                  }}
                />
              </div>

              <div className="relative text-center w-full">
                <span className="text-3xl md:text-4xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors block tracking-tighter">
                  {site.name}
                </span>
                <span className="text-xs font-black text-slate-300 uppercase tracking-[0.4em] block mt-3 opacity-60">
                  {site.domain}
                </span>
              </div>
              
              <div className="absolute top-0 left-0 w-2 h-0 bg-indigo-600 group-hover:h-full transition-all duration-700"></div>
              
              <div className="mt-4 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                 <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{site.rank} Global</span>
                 <div className="w-1 h-1 rounded-full bg-slate-200 mt-1.5"></div>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{site.visits} Users</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopSitesSection;
