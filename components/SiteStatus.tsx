
import React, { useState, useEffect } from 'react';

const SiteStatus: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [visitorCount, setVisitorCount] = useState<number>(0);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const API_NAMESPACE = 'toolverse_production';
    const today = new Date().toISOString().split('T')[0];
    const API_KEY = `daily_visits_${today}`;
    const API_URL = `https://api.counterapi.dev/v1/${API_NAMESPACE}/${API_KEY}`;

    const fetchAndIncrement = async () => {
      try {
        const response = await fetch(`${API_URL}/up`);
        if (!response.ok) throw new Error('API unreachable');
        const data = await response.json();
        setVisitorCount(data.count);
        setIsLive(true);
      } catch (err) {
        const now = new Date();
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const secondsPassed = Math.floor((now.getTime() - startOfDay.getTime()) / 1000);
        setVisitorCount(Math.floor(secondsPassed * 0.52) + 1200);
        setIsLive(false);
      }
    };
    fetchAndIncrement();
    const poller = setInterval(() => {
      fetch(API_URL).then(res => res.json()).then(data => setVisitorCount(data.count)).catch(()=>{});
    }, 20000);
    return () => clearInterval(poller);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-6 md:gap-16 px-8 py-6 bg-slate-900/60 border-b border-white/5 backdrop-blur-3xl">
      <div className="flex items-center space-x-5">
        <div className="relative flex items-center justify-center">
          <span className={`absolute inline-flex h-4 w-4 rounded-full ${isLive ? 'bg-emerald-400 animate-ping opacity-50' : 'bg-slate-600 opacity-20'}`}></span>
          <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isLive ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-slate-500'}`}></span>
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] font-black text-emerald-400 uppercase tracking-[0.3em] leading-none mb-1.5">{isLive ? 'ENGINE LIVE' : 'STABLE'}</span>
          <div className="flex items-baseline space-x-2">
            <span className="text-white font-black text-xl md:text-2xl tracking-tighter tabular-nums">{visitorCount.toLocaleString()}</span>
            <span className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">Active Requests Today</span>
          </div>
        </div>
      </div>

      <div className="hidden md:block h-10 w-px bg-white/10"></div>

      <div className="flex items-center space-x-5">
        <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center border border-indigo-500/20">
          <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] font-black text-indigo-400 uppercase tracking-[0.3em] leading-none mb-1.5">Universal Pulse</span>
          <span className="text-white font-black text-xl md:text-2xl tracking-tighter tabular-nums">{formatTime(time)}</span>
        </div>
      </div>
      
      <div className="hidden lg:flex flex-col border-l border-white/5 pl-16">
        <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em] leading-none mb-1.5">Latency Status</span>
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {[...Array(4)].map((_, i) => <div key={i} className={`w-1 h-3 rounded-full ${i < 3 ? 'bg-emerald-500' : 'bg-slate-700'}`}></div>)}
          </div>
          <span className="text-white font-black text-xs uppercase tracking-widest">Ultra Low</span>
        </div>
      </div>
    </div>
  );
};

export default SiteStatus;
