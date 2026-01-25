
import React, { useState } from 'react';
import { updateAttractionState, getAttractionState } from '../utils/attraction';

const GameSpinWheel: React.FC = () => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState("");
  const [rotateDeg, setRotateDeg] = useState(0);

  const handleSpin = async () => {
    if (spinning) return;
    setSpinning(true);
    setResult("");

    try {
      const response = await fetch("/api/reward", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameId: 'spin' })
      });
      const auth = await response.json();

      if (!auth.success) throw new Error("Connection Error");

      setRotateDeg(auth.data.data.deg);

      setTimeout(() => {
        setResult(auth.data.win ? `🏆 PRIZE UNLOCKED: ${auth.data.prize}!` : "❌ TRY AGAIN TOMORROW");
        
        if (auth.data.win) {
          const current = getAttractionState();
          updateAttractionState({ points: current.points + auth.data.xpReward });
        }
        
        setSpinning(false);
      }, 4000);

    } catch (e) {
      setResult("GATEWAY UNAVAILABLE");
      setSpinning(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative inline-block mb-12">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[40px] border-t-slate-900 drop-shadow-2xl"></div>
        
        <div 
          className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full border-[12px] border-slate-900 relative transition-transform duration-[4000ms] cubic-bezier(0.1, 0, 0, 1) shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden"
          style={{ 
            transform: `rotate(${rotateDeg}deg)`,
            background: 'conic-gradient(#6366f1 0deg 90deg, #10b981 90deg 180deg, #f59e0b 180deg 270deg, #ef4444 270deg 360deg)'
          }}
        >
          <div className="absolute top-[15%] left-1/2 -translate-x-1/2 font-black text-xs text-white">💎 LIFETIME</div>
          <div className="absolute top-1/2 right-[5%] -translate-y-1/2 font-black text-xs text-white rotate-90">💰 $50 CREDIT</div>
          <div className="absolute bottom-[15%] left-1/2 -translate-x-1/2 font-black text-xs text-white rotate-180">🛡️ NO ADS</div>
          <div className="absolute top-1/2 left-[5%] -translate-y-1/2 font-black text-xs text-white -rotate-90">🏅 BADGE</div>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white rounded-full border-8 border-slate-900 shadow-xl flex items-center justify-center font-black text-slate-900 text-sm">TV</div>
        </div>
      </div>

      <div className="space-y-6 w-full max-w-sm">
        <button 
          onClick={handleSpin}
          disabled={spinning}
          className="w-full py-7 bg-indigo-600 text-white rounded-[2.5rem] font-black text-2xl shadow-2xl hover:bg-indigo-700 transition-all transform active:scale-95 disabled:opacity-50"
        >
          {spinning ? 'VALIDATING...' : 'SPIN TO WIN'}
        </button>
        
        <div className="min-h-[50px] text-center">
          {result && (
            <p className="text-2xl font-black text-indigo-600 animate-in zoom-in-95 duration-300">
              {result}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameSpinWheel;
