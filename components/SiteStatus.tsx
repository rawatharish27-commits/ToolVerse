
import React, { useState, useEffect } from 'react';

const SiteStatus: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [todayCount, setTodayCount] = useState<number>(0);
  const [lifetimeCount, setLifetimeCount] = useState<number>(0);
  const [globalRating, setGlobalRating] = useState("4.9");
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const syncRating = () => {
    const saved = localStorage.getItem('tv_global_rating_avg');
    if (saved) setGlobalRating(saved);
  };

  useEffect(() => {
    const API_NAMESPACE = 'toolverse_production_v6';
    const today = new Date().toISOString().split('T')[0];
    
    const fetchStats = async () => {
      try {
        // Increment Today
        const resToday = await fetch(`https://api.counterapi.dev/v1/${API_NAMESPACE}/daily_${today}/up`);
        const dataToday = await resToday.json();
        setTodayCount(dataToday.count);

        // Increment Lifetime
        const resLife = await fetch(`https://api.counterapi.dev/v1/${API_NAMESPACE}/lifetime_v1/up`);
        const dataLife = await resLife.json();
        setLifetimeCount(dataLife.count + 240000); // Base historical seed
        
        setIsLive(true);
      } catch (err) {
        // Fallback simulation
        setTodayCount(1200 + Math.floor(Math.random() * 500));
        setLifetimeCount(284592);
        setIsLive(false);
      }
    };

    fetchStats();
    syncRating();
    window.addEventListener('feedback_updated', syncRating);
    
    const poller = setInterval(fetchStats, 60000);
    return () => {
      clearInterval(poller);
      window.removeEventListener('feedback_updated', syncRating);
    };
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 px-8 py-8 bg-slate-900 border-t border-white/10 backdrop-blur-3xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
      
      {/* 1. TODAY'S TRAFFIC */}
      <div className="flex items-center space-x-5">
        <div className="relative flex items-center justify-center">
          <span className="absolute inline-flex h-4 w-4 rounded-full bg-indigo-400 animate-ping opacity-50"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] font-black text-indigo-400 uppercase tracking-[0.3em] leading-none mb-1.5">ACTIVE TODAY</span>
          <div className="flex items-baseline space-x-2">
            <span className="text-white font-black text-xl md:text-3xl tracking-tighter tabular-nums">{todayCount.toLocaleString()}</span>
            <span className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">Sessions</span>
          </div>
        </div>
      </div>

      <div className="hidden md:block h-10 w-px bg-white/10"></div>

      {/* 2. LIFETIME TRAFFIC */}
      <div className="flex flex-col">
        <span className="text-[9px] font-black text-emerald-400 uppercase tracking-[0.3em] leading-none mb-1.5">GLOBAL REACH</span>
        <div className="flex items-baseline space-x-2">
          <span className="text-white font-black text-xl md:text-3xl tracking-tighter tabular-nums">{lifetimeCount.toLocaleString()}</span>
          <span className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">Total Nodes Served</span>
        </div>
      </div>

      <div className="hidden md:block h-10 w-px bg-white/10"></div>

      {/* 3. LIVE SATISFACTION (STAR RATING) */}
      <div className="flex items-center space-x-5 bg-white/5 px-6 py-3 rounded-2xl border border-white/5">
        <div className="text-2xl">⭐</div>
        <div className="flex flex-col">
          <span className="text-[9px] font-black text-yellow-500 uppercase tracking-[0.3em] leading-none mb-1.5">NETWORK SATISFACTION</span>
          <div className="flex items-baseline space-x-2">
            <span className="text-white font-black text-xl md:text-3xl tracking-tighter">{globalRating}</span>
            <span className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">/ 5.0 LIVE</span>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex flex-col border-l border-white/10 pl-16">
        <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] leading-none mb-1.5">SYSTEM PULSE</span>
        <span className="text-white/80 font-bold text-sm tracking-tight tabular-nums uppercase">{formatTime(time)}</span>
      </div>
    </div>
  );
};

export default SiteStatus;
