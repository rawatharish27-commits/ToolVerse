import React, { useState } from 'react';

const GameDiceRoll: React.FC = () => {
  const [value, setValue] = useState<number | string>("🎲");
  const [rolling, setRolling] = useState(false);
  const [result, setResult] = useState("");

  const handleRoll = () => {
    if (rolling) return;
    setRolling(true);
    setResult("");

    let count = 0;
    const interval = setInterval(() => {
      setValue(Math.floor(Math.random() * 6) + 1);
      count++;
      if (count > 15) {
        clearInterval(interval);
        const finalValue = Math.floor(Math.random() * 6) + 1;
        setValue(finalValue);
        
        // Reward Logic
        if (finalValue === 6) {
          setResult("🎉 JACKPOT! You Won Big");
        } else if (finalValue >= 4) {
          setResult("💰 Medium Prize Won");
        } else if (finalValue >= 2) {
          setResult("🎁 Small Prize Won");
        } else {
          setResult("❌ Better Luck Next Time");
        }
        setRolling(false);
      }
    }, 100);
  };

  return (
    <section id="game-dice-roll" className="py-20 bg-slate-50 text-center border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-amber-50 text-amber-600 text-[10px] font-black uppercase tracking-widest mb-6">
          High Stakes Fun
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-12 tracking-tighter">🎲 Dice Roll & Win</h2>

        <div className="flex flex-col items-center justify-center space-y-12">
          <div className={`w-32 h-32 md:w-40 md:h-40 bg-white rounded-[2.5rem] shadow-2xl border-4 border-slate-900 flex items-center justify-center text-6xl md:text-8xl font-black text-slate-900 transition-transform duration-100 ${rolling ? 'animate-bounce rotate-12' : ''}`}>
            {value}
          </div>

          <div className="space-y-6 w-full max-w-md">
            <button 
              onClick={handleRoll}
              disabled={rolling}
              className="w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black text-xl shadow-2xl hover:bg-slate-800 transition-all transform active:scale-95 disabled:opacity-50"
            >
              {rolling ? 'ROLLING...' : 'ROLL DICE'}
            </button>
            
            <div className="min-h-[40px]">
              {result && (
                <p className="text-2xl font-black text-indigo-600 animate-in zoom-in-95 duration-300">
                  {result}
                </p>
              )}
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-200">
               <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Roll 6: Jackpot</div>
               <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Roll 4-5: Medium</div>
               <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Roll 2-3: Small</div>
               <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Roll 1: Try Again</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameDiceRoll;