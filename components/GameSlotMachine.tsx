
import React, { useState } from 'react';
import { updateAttractionState, getAttractionState } from '../utils/attraction';

const SYMBOLS = ["🎰", "🍒", "🍋", "🔔"];

const GameSlotMachine: React.FC = () => {
  const [slots, setSlots] = useState(["❓", "❓", "❓"]);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState("");

  const handleSpin = async () => {
    if (spinning) return;
    
    setSpinning(true);
    setResult("");

    try {
      const response = await fetch("/api/reward", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameId: 'slot' })
      });
      const auth = await response.json();

      if (!auth.success) throw new Error("Connection lost");

      let count = 0;
      const interval = setInterval(() => {
        setSlots([
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
        ]);
        count++;

        if (count > 25) {
          clearInterval(interval);
          setSlots(auth.data.data.slots);
          setResult(auth.data.win ? `🎉 WINNER: ${auth.data.prize}!` : "❌ BETTER LUCK NEXT TIME");
          
          if (auth.data.win) {
            const current = getAttractionState();
            updateAttractionState({ points: current.points + auth.data.xpReward });
          }
          
          setSpinning(false);
        }
      }, 100);

    } catch (e) {
      setResult("SYSTEM ERROR: UNABLE TO REACH ARCADE EDGE.");
      setSpinning(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="max-w-xl w-full p-12 bg-slate-900 rounded-[4rem] shadow-2xl border-b-8 border-slate-800 relative overflow-hidden">
        <div className="flex justify-between mb-10 px-4">
          <div className="flex gap-1.5">
             <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
             <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse delay-75"></div>
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse delay-150"></div>
          </div>
          <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Edge-Sync: Active</div>
        </div>

        <div className="flex justify-center items-center gap-4 md:gap-8 mb-12">
          {slots.map((s, i) => (
            <div 
              key={i} 
              className={`w-24 h-32 md:w-32 md:h-40 bg-white rounded-3xl flex items-center justify-center text-5xl md:text-7xl shadow-inner border-t-4 border-slate-200 ${spinning ? 'animate-pulse' : ''}`}
            >
              {s}
            </div>
          ))}
        </div>

        <button 
          onClick={handleSpin}
          disabled={spinning}
          className="w-full py-8 bg-indigo-600 text-white rounded-[2rem] font-black text-2xl shadow-2xl hover:bg-indigo-500 transition-all transform active:scale-95 disabled:opacity-50"
        >
          {spinning ? 'SYNCING ENGINE...' : 'PULL LEVER'}
        </button>
      </div>

      <div className="mt-12 min-h-[60px] text-center">
         {result && (
           <p className={`text-3xl font-black italic tracking-tighter ${result.includes('WINNER') ? 'text-indigo-600' : 'text-slate-400'}`}>
             {result}
           </p>
         )}
      </div>
    </div>
  );
};

export default GameSlotMachine;
