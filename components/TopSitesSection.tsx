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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const country = (tz.includes("India") || tz.includes("Calcutta")) ? 'in' : 'global';
    setUserCountry(country);
  }, []);

  useEffect(() => {
    const loadAIRecommendations = async () => {
      const raw = localStorage.getItem('tv_site_clicks') || '{}';
      const clicks = JSON.parse(raw);
      const topClicks = Object.entries(clicks)
        .sort((a: any, b: any) => b[1] - a[1])
        .slice(0, 5)
        .map(e => e[0]);

      const aiSuggestedNames = await getAIRecommendedSites(userCountry, topClicks);
      const recs = TOP_SITES.filter(s => aiSuggestedNames.includes(s.name)).slice(0, 6);
      
      if (recs.length < 3) {
         setRecommendations(TOP_SITES.filter(s => s.popular).slice(0, 6));
      } else {
         setRecommendations(recs);
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
    <section ref={containerRef} className="py-24 bg-[#f8fafc] relative overflow-hidden border-t border-slate-200">
      {/* Premium Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-emerald-500/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-[20%] w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-5 py-2 rounded-full bg-white shadow-sm border border-indigo-100 text-indigo-600 text-xs font-black uppercase tracking-[0.2em] mb-6">
            ✨ Global Verified Directory
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
            The Internet <span className="text-indigo-600">Power Index.</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
            One-click access to 100+ high-traffic global platforms. <br className="hidden md:block" />
            Curated by AI based on your browsing patterns.
          </p>
        </div>

        {/* AI PREDICTIVE ROW */}
        {recommendations.length > 0 && activeCategory === "All Hubs" && (
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-xl shadow-lg shadow-indigo-200">🧠</div>
              <h3 className="text-lg font-black text-slate-800 uppercase tracking-widest">AI Top Picks for You</h3>
              <div className="flex-grow h-[2px] bg-gradient-to-r from-indigo-100 to-transparent"></div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
              {recommendations.map(site => (
                <button 
                  key={`reco-${site.name}`} 
                  onClick={() => handleSiteClick(site)} 
                  className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-indigo-50 flex flex-col items-center gap-4 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 p-2 flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-500">
                    <img src={`https://logo.clearbit.com/${site.domain}`} className="w-full h-full object-contain" alt={site.name} />
                  </div>
                  <span className="text-sm font-bold text-slate-700 group-hover:text-indigo-600">{site.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* CATEGORY NAV */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {useMemo(() => ["All Hubs", ...Array.from(new Set(TOP_SITES.map(s => s.category)))], []).map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-4 rounded-full text-sm font-black uppercase tracking-widest transition-all duration-300 ${
                activeCategory === cat 
                ? 'bg-slate-900 text-white shadow-xl -translate-y-1' 
                : 'bg-white text-slate-500 border border-slate-200 hover:border-indigo-400 hover:text-indigo-600 shadow-sm'
              }`}
            >
              <span className="mr-2">{cat === "All Hubs" ? "🌐" : CATEGORY_ICONS[cat]}</span>
              {cat}
            </button>
          ))}
        </div>

        {/* MAIN BRAND GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSites.map(site => (
            <button 
              key={site.name} 
              onClick={() => handleSiteClick(site)}
              className="group relative bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-[0_20px_50px_-12px_rgba(79,70,229,0.15)] hover:border-indigo-100 transition-all duration-500 flex items-center gap-6 overflow-hidden"
            >
              {/* Animated Glow on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/0 to-indigo-50/0 group-hover:from-indigo-50/50 group-hover:to-transparent transition-all duration-500"></div>
              
              <div className="relative w-16 h-16 flex-shrink-0 bg-slate-50 rounded-2xl flex items-center justify-center overflow-hidden border border-slate-100 group-hover:shadow-inner transition-all duration-500">
                <img 
                  src={`https://logo.clearbit.com/${site.domain}`} 
                  alt={site.name} 
                  className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${site.name}&background=6366f1&color=fff&bold=true&size=128`;
                  }}
                />
              </div>

              <div className="relative flex flex-col text-left min-w-0">
                <span className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                  {site.name}
                </span>
                <span className="text-xs font-medium text-slate-400 uppercase tracking-widest truncate">
                  {site.domain}
                </span>
              </div>

              {/* Hover Badge Info */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0 hidden sm:flex flex-col items-end">
                <span className="text-[10px] font-black bg-indigo-600 text-white px-2 py-1 rounded-lg shadow-lg mb-1 whitespace-nowrap uppercase">
                  Rank {site.rank}
                </span>
                <span className="text-[9px] font-bold text-slate-400 uppercase">{site.visits} visits</span>
              </div>
              
              {/* Visual Indicator */}
              <div className="absolute top-0 left-0 w-1 h-0 bg-indigo-600 group-hover:h-full transition-all duration-500"></div>
            </button>
          ))}
        </div>

        {/* Global Footer Hub Indicator */}
        <div className="mt-24 pt-12 border-t border-slate-200 text-center">
          <p className="text-xs font-black text-slate-400 uppercase tracking-[0.4em] mb-4">
            Authorized Link Gateway • Real-time Traffic Tracking Active
          </p>
          <div className="flex justify-center gap-8 grayscale opacity-30 hover:opacity-100 hover:grayscale-0 transition-all duration-700 cursor-default">
            {marqueeGiants.slice(0, 5).map(s => (
              <img key={`foot-${s.name}`} src={`https://logo.clearbit.com/${s.domain}`} className="h-6 w-auto" alt="Partner" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const marqueeGiants = TOP_SITES.slice(0, 20);

export default TopSitesSection;