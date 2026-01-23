
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
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const country = (tz.includes("India") || tz.includes("Calcutta")) ? 'in' : 'global';
    setUserCountry(country);
  }, []);

  useEffect(() => {
    const loadAIRecommendations = async () => {
      // PERFORMANCE: Check cache first to prevent slow Gemini API calls on every reload
      const CACHE_KEY = `ai_reco_${userCountry}`;
      const cached = sessionStorage.getItem(CACHE_KEY);
      
      if (cached) {
        const names = JSON.parse(cached);
        setRecommendations(TOP_SITES.filter(s => names.includes(s.name)).slice(0, 6));
        return;
      }

      setIsLoadingAI(true);
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
        } else {
          setRecommendations(TOP_SITES.filter(s => s.popular).slice(0, 6));
        }
      } catch (e) {
        setRecommendations(TOP_SITES.filter(s => s.popular).slice(0, 6));
      } finally {
        setIsLoadingAI(false);
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
      {/* Optimized Performance Gradients */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-emerald-500/5 rounded-full blur-[80px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-2.5 rounded-full bg-white shadow-md border border-indigo-100 text-indigo-600 text-sm font-black uppercase tracking-[0.2em] mb-8">
            ✨ Verified Global Hubs
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 tracking-tight">
            The Internet <span className="text-indigo-600">Power Index.</span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
            One-tap access to 100+ high-traffic global platforms. <br className="hidden md:block" />
            Optimized for speed and security.
          </p>
        </div>

        {/* AI PREDICTIVE ROW (Increased Font) */}
        {recommendations.length > 0 && activeCategory === "All Hubs" && (
          <div className="mb-24">
            <div className="flex items-center gap-5 mb-12">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-2xl shadow-xl shadow-indigo-100">🧠</div>
              <h3 className="text-xl font-black text-slate-800 uppercase tracking-widest">AI Recommendations</h3>
              <div className="flex-grow h-[2px] bg-gradient-to-r from-indigo-100 to-transparent"></div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
              {recommendations.map(site => (
                <button 
                  key={`reco-${site.name}`} 
                  onClick={() => handleSiteClick(site)} 
                  className="bg-white p-8 rounded-[3rem] shadow-sm border border-indigo-50 flex flex-col items-center gap-5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 p-3 flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-500">
                    <img loading="lazy" src={`https://logo.clearbit.com/${site.domain}`} className="w-full h-full object-contain" alt={site.name} />
                  </div>
                  <span className="text-base font-black text-slate-700 group-hover:text-indigo-600">{site.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* CATEGORY NAV (Bigger Buttons) */}
        <div className="flex flex-wrap justify-center gap-5 mb-20">
          {useMemo(() => ["All Hubs", ...Array.from(new Set(TOP_SITES.map(s => s.category)))], []).map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-10 py-5 rounded-3xl text-sm font-black uppercase tracking-widest transition-all duration-300 ${
                activeCategory === cat 
                ? 'bg-slate-900 text-white shadow-2xl -translate-y-1' 
                : 'bg-white text-slate-500 border border-slate-200 hover:border-indigo-400 hover:text-indigo-600 shadow-sm'
              }`}
            >
              <span className="mr-3">{cat === "All Hubs" ? "🌐" : CATEGORY_ICONS[cat]}</span>
              {cat}
            </button>
          ))}
        </div>

        {/* MAIN GRID (Increased Font & Card Size) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredSites.map(site => (
            <button 
              key={site.name} 
              onClick={() => handleSiteClick(site)}
              className="group relative bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-[0_40px_80px_-20px_rgba(79,70,229,0.15)] hover:border-indigo-100 transition-all duration-500 flex items-center gap-8 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/0 to-indigo-50/0 group-hover:from-indigo-50/40 group-hover:to-transparent transition-all duration-500"></div>
              
              <div className="relative w-20 h-20 flex-shrink-0 bg-slate-50 rounded-[1.5rem] flex items-center justify-center overflow-hidden border border-slate-100 group-hover:shadow-inner transition-all duration-500">
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
                <span className="text-lg md:text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                  {site.name}
                </span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest truncate mt-1">
                  {site.domain}
                </span>
              </div>

              {/* Enhanced Info Badge */}
              <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-6 group-hover:translate-x-0 hidden sm:flex flex-col items-end">
                <span className="text-[11px] font-black bg-indigo-600 text-white px-3 py-1.5 rounded-xl shadow-lg mb-2 whitespace-nowrap uppercase">
                  Rank {site.rank}
                </span>
                <span className="text-[10px] font-black text-slate-400 uppercase">{site.visits} active</span>
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
