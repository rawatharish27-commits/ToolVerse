
import React, { useState } from 'react';
import { updateAttractionState, getAttractionState } from '../utils/attraction';

const GameDiceRoll: React.FC = () => {
  const [value, setValue] = useState<number | string>("🎲");
  const [rolling, setRolling] = useState(false);
  const [result, setResult] = useState("");

  const handleRoll = async () => {
    if (rolling) return;
    setRolling(true);
    setResult("");

    try {
      const response = await fetch("/api/reward", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameId: 'dice' })
      });
      const auth = await response.json();
      if (!auth.success) throw new Error("Backend Link Failed");

      let count = 0;
      const interval = setInterval(() => {
        setValue(Math.floor(Math.random() * 6) + 1);
        count++;
        if (count > 15) {
          clearInterval(interval);
          const finalValue = auth.data.data.value;
          setValue(finalValue);
          
          setResult(auth.data.win ? `🎉 ${auth.data.prize}! Total Win!` : "❌ NO PRIZE. TRY AGAIN.");
          
          if (auth.data.win) {
            const current = getAttractionState();
            updateAttractionState({ points: current.points + auth.data.xpReward });
          }
          
          setRolling(false);
        }
      }, 100);
    } catch (e) {
      setResult("ARCADE NODE OFFLINE");
      setRolling(false);
    }
  };

  return (
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
          {rolling ? 'SHAKING...' : 'ROLL DICE'}
        </button>
        
        <div className="min-h-[40px] text-center">
          {result && (
            <p className={`text-2xl font-black italic ${result.includes('🎉') ? 'text-indigo-600' : 'text-slate-400'}`}>
              {result}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameDiceRoll;
