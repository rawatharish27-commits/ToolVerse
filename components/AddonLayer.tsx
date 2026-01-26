
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { getAttractionState, updateAttractionState, trackToolClick, getUserLevel, getToolOfDay } from '../utils/attraction';
import { TOOLS } from '../data/tools';
import { debounce } from '../utils/performance';

const AddonLayer: React.FC = () => {
  const [state, setState] = useState(getAttractionState());
  const [lastReward, setLastReward] = useState<number | null>(null);
  const [showMoodPicker, setShowMoodPicker] = useState(false);

  // OPTIMIZATION: Debounced Badge Injection to prevent Layout Thrash
  const injectBadges = useCallback(debounce(() => {
    const trending = Object.entries(state.clicks)
      .sort((a, b) => (b[1] as number) - (a[1] as number))
      .slice(0, 3)
      .map(i => i[0]);
    
    const tod = getToolOfDay(TOOLS).slug;
    const cards = document.querySelectorAll('[data-addon-tool]');
    
    cards.forEach(el => {
      const slug = el.getAttribute('data-addon-tool');
      const hasBadges = el.querySelector('.ua-badge-injected');
      if (hasBadges) return; // Prevent re-injecting and causing mutations

      if (slug === tod) {
        el.insertAdjacentHTML('afterbegin', `
          <div class="ua-badge-injected ua-badge-tod absolute top-4 left-4 z-30 bg-emerald-500 text-white text-[8px] font-black uppercase px-2 py-1 rounded-lg shadow-xl animate-pulse">
            🛠️ Tool of Day
          </div>
        `);
      } else if (trending.includes(slug || '')) {
        el.insertAdjacentHTML('afterbegin', `
          <div class="ua-badge-injected ua-badge-trending absolute top-4 left-4 z-30 bg-orange-600 text-white text-[8px] font-black uppercase px-2 py-1 rounded-lg shadow-xl">
            🔥 Trending
          </div>
        `);
      }
    });
  }, 150), [state.clicks]);

  useEffect(() => {
    const sync = () => setState(getAttractionState());
    window.addEventListener('ua_update', sync);

    if (!getAttractionState().mood) {
      const timer = setTimeout(() => setShowMoodPicker(true), 2500);
      return () => clearTimeout(timer);
    }

    // Initialize badges
    injectBadges();

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const card = target.closest('[data-addon-tool]');
      if (card) {
        const slug = card.getAttribute('data-addon-tool') || '';
        const cat = card.getAttribute('data-addon-cat') || 'general';
        const gain = trackToolClick(slug, cat);
        setLastReward(gain);
        setTimeout(() => setLastReward(null), 2000);
      }
    };

    // OPTIMIZATION: Throttled MutationObserver
    const observer = new MutationObserver((mutations) => {
      // Only re-process if non-badge nodes were added
      const relevant = mutations.some(m => Array.from(m.addedNodes).some(n => !(n as HTMLElement).classList?.contains('ua-badge-injected')));
      if (relevant) injectBadges();
    });

    window.addEventListener('click', handleClick);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('ua_update', sync);
      window.removeEventListener('click', handleClick);
      observer.disconnect();
    };
  }, [state.clicks, state.mood, injectBadges]);

  const level = getUserLevel(state.points);
  const topCats = useMemo(() => {
    return Object.entries(state.cats)
      .sort((a, b) => (b[1] as number) - (a[1] as number))
      .slice(0, 2)
      .map(i => i[0]);
  }, [state.cats]);

  const setMood = (m: string) => {
    updateAttractionState({ mood: m });
    setShowMoodPicker(false);
  };

  return (
    <>
      <div className="bg-slate-950 text-white py-2 px-4 text-center text-[9px] font-black uppercase tracking-[0.4em] border-b border-white/5 overflow-hidden whitespace-nowrap z-[100] relative">
         <div className="inline-block animate-marquee-text">
            TRUSTED ECOSYSTEM • 128M+ GLOBAL USERS • REAL-TIME WASM PROCESSING • ZERO DATA UPLOADS • VERIFIED PRO TOOLS • 
         </div>
      </div>

      {topCats.length > 0 && (
        <div className="bg-indigo-900 text-white py-3 px-6 text-center text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl animate-in slide-in-from-top duration-1000 z-[90] relative">
          <span className="text-emerald-400 mr-3">Recommended:</span>
          Master {topCats.join(" & ")} tools tuned for your {state.mood} workflow
        </div>
      )}

      {lastReward && (
        <div className="fixed top-28 right-8 z-[200] bg-white border border-indigo-100 px-6 py-4 rounded-[2rem] shadow-[0_20px_50px_rgba(79,70,229,0.3)] animate-bounce flex items-center gap-4">
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-black">+{lastReward}</div>
          <span className="text-[11px] font-black text-slate-900 uppercase tracking-widest">XP Gained!</span>
        </div>
      )}

      {showMoodPicker && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-slate-950/80 backdrop-blur-xl p-6 animate-in fade-in duration-500">
           <div className="bg-white rounded-[4rem] p-12 max-w-lg w-full text-center shadow-2xl border border-white/20">
              <div className="text-7xl mb-8 animate-bounce">🌊</div>
              <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Tune the engine.</h2>
              <p className="text-slate-500 font-medium mb-12">How will you dominate the digital flow today?</p>
              <div className="grid grid-cols-1 gap-4">
                 {[
                   { id: 'pro', label: 'Pro Workflow', icon: '💼', color: 'hover:bg-indigo-50 hover:border-indigo-600' },
                   { id: 'creator', label: 'Creative Studio', icon: '🎨', color: 'hover:bg-emerald-50 hover:border-emerald-600' },
                   { id: 'research', label: 'Academic/Research', icon: '🔬', color: 'hover:bg-amber-50 hover:border-amber-600' }
                 ].map(m => (
                   <button key={m.id} onClick={() => setMood(m.id)} className={`flex items-center gap-6 p-6 rounded-3xl border-2 border-slate-100 transition-all group ${m.color}`}>
                      <span className="text-4xl group-hover:scale-110 transition-transform">{m.icon}</span>
                      <span className="font-black text-slate-700 uppercase tracking-widest text-sm">{m.label}</span>
                   </button>
                 ))}
              </div>
           </div>
        </div>
      )}

      <div className="fixed bottom-10 right-10 z-[150] flex flex-col items-end gap-4 pointer-events-none">
         {Object.keys(state.clicks).length >= 2 && (
            <div className="bg-emerald-600 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl animate-in slide-in-from-right duration-700 pointer-events-auto flex items-center gap-3">
              <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
              Continue where you left off →
            </div>
         )}
         
         <div className="bg-slate-900/95 backdrop-blur-xl border border-white/10 px-6 py-4 rounded-[2.5rem] shadow-2xl flex items-center gap-6 pointer-events-auto hover:scale-105 transition-transform cursor-help">
            <div className="flex flex-col">
               <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-1">Explorer Lvl {level}</span>
               <div className="h-1.5 w-24 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500" style={{ width: `${(state.points % 50) * 2}%` }}></div>
               </div>
               <span className="text-white font-black text-[10px] mt-1.5 tabular-nums">{state.points} Total XP</span>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg">
               {level}
            </div>
         </div>
      </div>

      <style>{`
        .ua-badge-injected {
          pointer-events: none;
          letter-spacing: 0.15em;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee-text {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </>
  );
};

export default AddonLayer;
