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

const AFFILIATE_MAP: Record<string, string> = {
  amazon: "tag=toolverse-21",
  flipkart: "affid=toolverse",
  booking: "aid=123456",
  fiverr: "afp=toolverse",
  udemy: "coupon=TOOLVERSE"
};

const TopSitesSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All Hubs");
  const [userCountry, setUserCountry] = useState<'in' | 'global'>('global');
  const [recommendations, setRecommendations] = useState<TopSite[]>([]);
  const [abVariant, setAbVariant] = useState<'grid' | 'slider'>('grid');
  const [heroLogoIdx, setHeroLogoIdx] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [lang, setLang] = useState('en');

  // 1. Language & Country Switching
  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const country = (tz.includes("India") || tz.includes("Calcutta")) ? 'in' : 'global';
    setUserCountry(country);
    
    const browserLang = navigator.language.startsWith('hi') ? 'hi' : 'en';
    setLang(browserLang);
    document.documentElement.lang = browserLang;

    // Trust Counter Animation
    const target = 128; // Million users
    let cur = 0;
    const interval = setInterval(() => {
      cur += Math.ceil((target - cur) / 10);
      setUserCount(cur);
      if (cur >= target) clearInterval(interval);
    }, 80);

    return () => clearInterval(interval);
  }, []);

  // 2. AI Recs
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
         const localRecs = TOP_SITES.filter(s => topClicks.includes(s.name)).slice(0, 6);
         setRecommendations(localRecs);
      } else {
         setRecommendations(recs);
      }
    };
    loadAIRecommendations();
  }, [userCountry]);

  // 3. Hero Brand Cycler
  const heroGiants = useMemo(() => TOP_SITES.slice(0, 8), []);
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroLogoIdx(prev => (prev + 1) % heroGiants.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [heroGiants]);

  // 4. Affiliate Auto-Tracking & Click Handler
  const handleSiteClick = (site: TopSite) => {
    trackEvent('trusted_site_click', site.name);
    
    const raw = localStorage.getItem('tv_site_clicks') || '{}';
    const clicks = JSON.parse(raw);
    clicks[site.name] = (clicks[site.name] || 0) + 1;
    localStorage.setItem('tv_site_clicks', JSON.stringify(clicks));

    // Append Affiliate Tag if host matches
    let finalUrl = site.url;
    try {
      const urlObj = new URL(finalUrl);
      Object.entries(AFFILIATE_MAP).forEach(([key, param]) => {
        if (urlObj.hostname.includes(key)) {
          const [pKey, pVal] = param.split('=');
          urlObj.searchParams.set(pKey, pVal);
          finalUrl = urlObj.toString();
        }
      });
    } catch (e) {}

    window.open(finalUrl, '_blank');
  };

  // 5. Scroll Reveal
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    const elements = containerRef.current?.querySelectorAll('.reveal-on-scroll');
    elements?.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [activeCategory, recommendations, abVariant]);

  const filteredSites = useMemo(() => {
    let list = TOP_SITES.filter(s => !s.country || s.country === userCountry);
    if (activeCategory === "All Hubs") return list;
    return list.filter(s => s.category === activeCategory);
  }, [activeCategory, userCountry]);

  const marqueeGiants = useMemo(() => TOP_SITES.slice(0, 20), []);

  return (
    <section ref={containerRef} className="py-24 bg-slate-50 relative overflow-hidden border-t border-slate-200">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* TRUST COUNTER */}
        <div className="flex flex-col items-center mb-16 reveal-on-scroll">
           <div className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight text-center">
              {lang === 'hi' ? 'दुनिया भर में ' : 'Used by '}
              <span className="text-indigo-600 tabular-nums">{userCount}</span>
              {lang === 'hi' ? ' मिलियन से अधिक उपयोगकर्ताओं द्वारा उपयोग' : 'M+ million users worldwide'}
           </div>
           <div className="mt-4 h-1 w-20 bg-indigo-100 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600 animate-shimmer" style={{ width: '40%' }}></div>
           </div>
        </div>

        {/* HERO TRUST STRIP */}
        <div className="flex justify-center mb-16 reveal-on-scroll">
           <div className="bg-white px-8 py-4 rounded-full shadow-xl border border-slate-100 flex items-center gap-6">
              <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">Featured Global Hub</span>
              <div className="h-6 w-px bg-slate-100"></div>
              <div className="flex items-center gap-3 w-40 overflow-hidden">
                <img 
                  src={`https://logo.clearbit.com/${heroGiants[heroLogoIdx].domain}`} 
                  className="w-6 h-6 animate-fade-in-down" 
                  alt="Brand"
                  decoding="async"
                />
                <span className="text-xs font-black text-slate-900 uppercase tracking-widest">{heroGiants[heroLogoIdx].name}</span>
              </div>
           </div>
        </div>

        <div className="text-center mb-16 reveal-on-scroll">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-6 shadow-sm">
            {userCountry === 'in' ? (lang === 'hi' ? 'क्षेत्रीय हब: भारत' : 'Regional Hub: India') : 'Global Hub Directory'}
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight italic uppercase">Internet Giants Index</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
            One-click access to the world's most influential web destinations. AI predicts your likely needs based on behavior.
          </p>
        </div>

        {/* AI RECO BAR */}
        {recommendations.length > 0 && activeCategory === "All Hubs" && (
          <div className="mb-20 reveal-on-scroll">
             <div className="flex items-center gap-4 mb-8 px-2">
                <span className="text-xl">🧠</span>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">AI Suggested for You</h3>
                <div className="flex-grow h-px bg-gradient-to-r from-indigo-200 to-transparent"></div>
             </div>
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                {recommendations.map(site => (
                  <button key={`reco-${site.name}`} onClick={() => handleSiteClick(site)} className="bg-white p-4 rounded-3xl shadow-sm border border-indigo-50 flex flex-col items-center gap-3 hover:shadow-2xl hover:-translate-y-1 transition-all group">
                    <img src={`https://logo.clearbit.com/${site.domain}`} className="w-8 h-8 grayscale group-hover:grayscale-0 transition-all duration-500" alt={site.name} decoding="async" />
                    <span className="text-[10px] font-black text-slate-400 group-hover:text-indigo-600 uppercase tracking-widest">{site.name}</span>
                  </button>
                ))}
             </div>
          </div>
        )}

        {/* MARQUEE */}
        <div className="mb-20 relative reveal-on-scroll">
          <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-slate-50 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-slate-50 to-transparent z-10"></div>
          <div className="overflow-hidden py-8">
            <div className="flex animate-scroll-marquee whitespace-nowrap gap-12 items-center">
              {[...marqueeGiants, ...marqueeGiants].map((site, i) => (
                <div key={i} onClick={() => handleSiteClick(site)} className="flex items-center gap-4 opacity-40 hover:opacity-100 transition-opacity cursor-pointer group">
                  <div className="w-8 h-8 rounded-lg overflow-hidden bg-white shadow-sm flex items-center justify-center p-1 border border-slate-100 grayscale group-hover:grayscale-0 transition-all">
                    <img src={`https://logo.clearbit.com/${site.domain}`} alt={site.name} className="w-full h-full object-contain" loading="lazy" decoding="async" />
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-indigo-600">{site.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FILTER BAR */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 px-4 reveal-on-scroll">
          {useMemo(() => ["All Hubs", ...Array.from(new Set(TOP_SITES.map(s => s.category)))], []).map(cat => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); trackEvent('directory_filter_changed', cat); }}
              className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeCategory === cat 
                ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200 -translate-y-1' 
                : 'bg-white text-slate-500 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600'
              }`}
            >
              {cat === "All Hubs" ? "🌐" : CATEGORY_ICONS[cat]} {cat}
            </button>
          ))}
        </div>

        {/* MAIN LOGO GRID WITH AI HEATMAP PREDICTOR */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 relative">
          {filteredSites.map(site => (
            <button 
              key={site.name} 
              onClick={() => handleSiteClick(site)}
              className="reveal-on-scroll group bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-indigo-100 transition-all flex items-center gap-4 relative"
            >
              {/* Heatmap implementation for Popular sites */}
              {site.popular && activeCategory === "All Hubs" && (
                <div className="heat-spot absolute inset-0 -m-4"></div>
              )}
              
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[8px] font-black py-1 px-3 rounded-full opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 z-50 pointer-events-none whitespace-nowrap uppercase tracking-widest border border-white/10 shadow-2xl">
                 Rank {site.rank} • {site.visits} Visits
              </div>
              
              <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-12 h-12 flex-shrink-0 bg-slate-50 rounded-2xl flex items-center justify-center overflow-hidden border border-slate-50 group-hover:scale-110 group-hover:shadow-lg transition-all duration-500 grayscale group-hover:grayscale-0">
                <img 
                  src={`https://logo.clearbit.com/${site.domain}`} 
                  alt={site.name} 
                  className="w-full h-full object-contain p-2"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${site.name}&background=6366f1&color=fff&bold=true`;
                  }}
                />
              </div>
              <div className="flex flex-col min-w-0 text-left">
                <span className="text-[11px] font-black text-slate-800 truncate group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{site.name}</span>
                <span className="text-[8px] font-bold text-slate-300 truncate uppercase tracking-tighter group-hover:text-slate-400">{site.domain}</span>
              </div>
              <div className="ml-auto opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                 <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-20 pt-12 border-t border-slate-200 text-center reveal-on-scroll">
           <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.5em]">Verified Global Hub Index • Affiliate Mode Active</p>
        </div>
      </div>

      <style>{`
        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .reveal-active {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        @keyframes scroll-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-marquee {
          animation: scroll-marquee 50s linear infinite;
        }
        .animate-scroll-marquee:hover {
          animation-play-state: paused;
        }
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.4s ease-out;
        }
      `}</style>
    </section>
  );
};

export default TopSitesSection;