
import React, { useState, useEffect } from 'react';

interface CountryMetric {
  code: string;
  today: number;
  total: number;
}

const SiteStatus: React.FC = () => {
  const [globalToday, setGlobalToday] = useState<number>(0);
  const [globalTotal, setGlobalTotal] = useState<number>(0);
  const [countryBreakdown, setCountryBreakdown] = useState<CountryMetric[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [userCC, setUserCC] = useState("GL");

  const NAMESPACE = 'toolverse_production_v10';
  const API_BASE = 'https://api.counterapi.dev/v1';

  const fetchRealStats = async () => {
    const todayStr = new Date().toISOString().split('T')[0];
    
    try {
      // 1. Fetch Global Totals
      const [resT, resL] = await Promise.all([
        fetch(`${API_BASE}/${NAMESPACE}_daily_${todayStr}`),
        fetch(`${API_BASE}/${NAMESPACE}_total_hits`)
      ]);
      
      const dT = await resT.json();
      const dL = await resL.json();
      
      setGlobalToday(dT.count || 0);
      setGlobalTotal(dL.count || 0);

      // 2. Fetch High-Traffic Clusters (Top ISO Codes)
      const targetCC = ['IN', 'US', 'GB', 'DE', 'CA', 'AU', 'BR', 'AE', 'SG', 'FR'];
      const metrics = await Promise.all(targetCC.map(async (cc) => {
        const [cLife, cDay] = await Promise.all([
          fetch(`${API_BASE}/${NAMESPACE}_country_${cc}`),
          fetch(`${API_BASE}/${NAMESPACE}_c_daily_${todayStr}_${cc}`)
        ]);
        const dCL = await cLife.json();
        const dCD = await cDay.json();
        return { code: cc, total: dCL.count || 0, today: dCD.count || 0 };
      }));

      setCountryBreakdown(metrics.filter(m => m.total > 0).sort((a, b) => b.total - a.total));
    } catch (e) {
      console.warn("Analytics Sync Failure");
    }
  };

  useEffect(() => {
    // Register current hit
    fetch('/api/stats', { method: 'POST' })
      .then(r => r.json())
      .then(d => { if(d.success) setUserCC(d.data.country); });

    fetchRealStats();
    const interval = setInterval(fetchRealStats, 60000); // 1-minute sync
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-950 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-8 py-8 flex flex-wrap items-center justify-between gap-10">
        
        {/* Metric: Today Active */}
        <div className="flex items-center gap-5">
          <div className="relative">
             <div className="w-3 h-3 bg-indigo-500 rounded-full animate-ping absolute inset-0"></div>
             <div className="w-3 h-3 bg-indigo-600 rounded-full relative"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Visitors Today</span>
            <span className="text-white font-black text-3xl tabular-nums tracking-tighter">
              {globalToday.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Metric: Lifetime Total */}
        <div className="flex items-center gap-5 md:border-l border-white/10 md:pl-10">
          <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Total Logic Hits</span>
            <span className="text-white font-black text-3xl tabular-nums tracking-tighter">
              {globalTotal.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Metric: Geo Dashboard Toggle */}
        <button 
          onClick={() => setShowModal(true)}
          className="bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-4 rounded-2xl transition-all group flex items-center gap-5 ml-auto"
        >
          <div className="flex flex-col items-start">
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] leading-none mb-1.5">Global Cluster Distribution</span>
            <span className="text-white font-black text-sm uppercase">View Live Reach →</span>
          </div>
          <span className="text-3xl group-hover:scale-125 transition-transform">🌍</span>
        </button>
      </div>

      {/* Analytics Drilldown Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-slate-950/95 backdrop-blur-2xl animate-in fade-in duration-300">
          <div className="bg-white rounded-[4rem] w-full max-w-2xl overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-500">
            <div className="p-12 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
               <div className="space-y-1">
                 <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Geo-Distribution</h2>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Verified Edge Nodes: {userCC} Instance Active</p>
               </div>
               <button onClick={() => setShowModal(false)} className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-slate-400 hover:text-rose-500 font-black shadow-sm transition-all hover:rotate-90">✕</button>
            </div>
            
            <div className="p-12 max-h-[50vh] overflow-y-auto no-scrollbar">
               <div className="space-y-3">
                  <div className="flex items-center justify-between px-8 py-3 text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-4">
                    <span>Region Cluster</span>
                    <div className="flex gap-16">
                      <span className="w-20 text-right">Today</span>
                      <span className="w-20 text-right">Lifetime</span>
                    </div>
                  </div>
                  {countryBreakdown.map((m) => (
                    <div key={m.code} className="flex items-center justify-between p-6 bg-white border border-slate-100 rounded-[2rem] hover:border-indigo-200 hover:shadow-xl transition-all group">
                       <div className="flex items-center gap-5">
                          <img src={`https://purecatbeforesunlight.github.io/country-flag-emoji-json/png/64/${m.code}.png`} className="w-10 h-7 object-cover rounded-lg shadow-sm" alt={m.code} />
                          <span className="font-black text-slate-700 text-lg uppercase tracking-tight">{m.code} Node</span>
                       </div>
                       <div className="flex items-center gap-16">
                          <div className="flex flex-col items-end w-20">
                            <span className="text-indigo-600 font-black text-xl leading-none">{m.today.toLocaleString()}</span>
                            <span className="text-[8px] font-black text-indigo-300 uppercase mt-1">Hits</span>
                          </div>
                          <div className="flex flex-col items-end w-20 border-l border-slate-100 pl-8">
                            <span className="text-slate-900 font-black text-xl leading-none">{m.total.toLocaleString()}</span>
                            <span className="text-[8px] font-black text-slate-300 uppercase mt-1">Total</span>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="p-10 bg-slate-900 text-center">
               <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em]">
                 Logic Core Decided at Cloudflare Edge • Sync Frequency: 60s
               </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SiteStatus;
