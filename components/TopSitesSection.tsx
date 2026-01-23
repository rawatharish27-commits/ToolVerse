import React, { useState, useMemo, useEffect, useRef } from 'react';
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
  "Gaming": "🎮",
  "Finance & Crypto": "💰",
  "Travel & Maps": "🧳",
  "Learning & Freelancing": "🎓"
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
      // PERFORMANCE: Instant render from cache
      const CACHE_KEY = `tv_reco_v3_${userCountry}`;
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

  return (
    <section className="py-24 bg-white relative overflow-hidden border-t border-slate-100">
      {/* Optimized Background (Fast Rendering) */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-indigo-50 to-transparent"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-50 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-2 rounded-full bg-indigo-50 text-indigo-600 text-sm font-black uppercase tracking-[0.2em] mb-6 border border-indigo-100 shadow-sm">
            ✨ Premium Web Hub
          </div>
          <h2 className="text-4xl md:text-7xl font-black text-slate-900 mb-6 tracking-tighter leading-tight">
            The Digital <span className="text-indigo-600">Powerhouse.</span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed">
            One-tap access to 100+ high-traffic global platforms. <br className="hidden md:block" />
            Curated by AI for your daily digital flow.
          </p>
        </div>

        {/* AI SMART BAR */}
        {recommendations.length > 0 && activeCategory === "All Hubs" && (
          <div className="mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-2xl shadow-xl">🧠</div>
              <h3 className="text-xl font-black text-slate-800 uppercase tracking-widest">Personalized Picks</h3>
              <div className="flex-grow h-px bg-slate-200"></div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
              {recommendations.map(site => (
                <button 
                  key={`reco-${site.name}`} 
                  onClick={() => handleSiteClick(site)} 
                  className="brand-card-hover bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 flex flex-col items-center gap-4 transition-all group"
                >
                  <div className="w-20 h-20 rounded-2xl bg-white p-4 flex items-center justify-center shadow-inner overflow-hidden group-hover:scale-110 transition-transform">
                    <img loading="lazy" src={`https://logo.clearbit.com/${site.domain}`} className="w-full h-full object-contain" alt={site.name} />
                  </div>
                  <span className="text-base font-black text-slate-700 group-hover:text-indigo-600">{site.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* CATEGORY NAV (Bigger Buttons) */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {useMemo(() => ["All Hubs", ...Array.from(new Set(TOP_SITES.map(s => s.category)))], []).map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all duration-300 ${
                activeCategory === cat 
                ? 'bg-indigo-600 text-white shadow-2xl scale-105' 
                : 'bg-white text-slate-500 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 shadow-sm'
              }`}
            >
              <span className="mr-2">{cat === "All Hubs" ? "🌐" : CATEGORY_ICONS[cat]}</span>
              {cat}
            </button>
          ))}
        </div>

        {/* MAIN HUB GRID (Large Cards & Fonts) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredSites.map(site => (
            <button 
              key={site.name} 
              onClick={() => handleSiteClick(site)}
              className="brand-card-hover group relative bg-slate-50/50 p-8 rounded-[3rem] border border-slate-100 transition-all flex items-center gap-8 overflow-hidden"
            >
              <div className="relative w-20 h-20 flex-shrink-0 bg-white rounded-3xl flex items-center justify-center overflow-hidden border border-slate-100 shadow-sm group-hover:shadow-indigo-100/50 transition-all">
                <img 
                  loading="lazy"
                  src={`https://logo.clearbit.com/${site.domain}`} 
                  alt={site.name} 
                  className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${site.name}&background=6366f1&color=fff&bold=true&size=128`;
                  }}
                />
              </div>

              <div className="relative flex flex-col text-left min-w-0">
                <span className="text-xl md:text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors truncate tracking-tight">
                  {site.name}
                </span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest truncate mt-1">
                  {site.domain}
                </span>
              </div>

              {/* Hover Performance Badge */}
              <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0 hidden sm:flex flex-col items-end">
                <span className="text-[10px] font-black bg-slate-900 text-white px-3 py-1.5 rounded-xl shadow-lg mb-1 whitespace-nowrap uppercase tracking-widest">
                  Rank {site.rank}
                </span>
                <span className="text-[9px] font-black text-slate-400 uppercase">{site.visits} users</span>
              </div>
              
              <div className="absolute top-0 left-0 w-1.5 h-0 bg-indigo-600 group-hover:h-full transition-all duration-500"></div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopSitesSection;