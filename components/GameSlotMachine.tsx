import React, { useState } from 'react';

const SYMBOLS = ["🎰", "🍒", "🍋", "🔔"];

const GameSlotMachine: React.FC = () => {
  const [slots, setSlots] = useState(["❓", "❓", "❓"]);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState("");

  const handleSpin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult("");

    let count = 0;
    // Fix: Removed .current property access on setInterval return value (timer ID)
    const interval = setInterval(() => {
      setSlots([
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
      ]);
      count++;

      if (count > 20) {
        clearInterval(interval);
        
        // Probability Bias: 
        // 1. Generate 3 random ones
        const finalSlots = [
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
        ];
        
        // 2. Logic Check
        const [a, b, c] = finalSlots;
        setSlots(finalSlots);

        if (a === b && b === c) {
          if (a === "🎰") setResult("🎉 MEGA JACKPOT UNLOCKED!");
          else if (a === "🍒") setResult("💰 Medium Reward Earned");
          else if (a === "🍋") setResult("🎁 Small Bonus Received");
          else setResult("🔔 Almost! No Prize");
        } else {
          setResult("❌ Try Again Tomorrow");
        }
        
        setSpinning(false);
      }
    }, 80);
  };

  return (
    <section id="game-slot-machine" className="py-20 bg-slate-50 text-center border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest mb-6">
          Vegas Core System
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-12 tracking-tighter">🎰 Mini Slot Machine</h2>

        <div className="max-w-xl mx-auto p-12 bg-slate-900 rounded-[4rem] shadow-2xl border-b-8 border-slate-800 relative overflow-hidden">
          {/* Machine Header Decor */}
          <div className="flex justify-between mb-10 px-4">
            <div className="flex gap-1.5">
               <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
               <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse delay-75"></div>
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse delay-150"></div>
            </div>
            <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest">ToolVerse RNG Certified</div>
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
            className="w-full py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-xl shadow-2xl hover:bg-indigo-500 transition-all transform active:scale-95 disabled:opacity-50"
          >
            {spinning ? 'PROCESSING...' : 'PULL LEVER'}
          </button>
        </div>

        <div className="mt-12 min-h-[40px]">
           {result && (
             <p className="text-2xl font-black text-indigo-600 animate-in zoom-in-95 duration-500 uppercase tracking-tight italic">
               {result}
             </p>
           )}
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-8 opacity-40">
           <div className="text-[9px] font-black uppercase tracking-widest flex items-center gap-2">🎰 🎰 🎰 Jackpot</div>
           <div className="text-[9px] font-black uppercase tracking-widest flex items-center gap-2">🍒 🍒 🍒 Medium</div>
           <div className="text-[9px] font-black uppercase tracking-widest flex items-center gap-2">🍋 🍋 🍋 Small</div>
        </div>
      </div>
    </section>
  );
};

export default GameSlotMachine;