
import React, { useState } from 'react';
import { updateAttractionState, getAttractionState } from '../utils/attraction';

const GameCoinToss: React.FC = () => {
  const [tossing, setTossing] = useState(false);
  const [outcome, setOutcome] = useState<"HEAD" | "TAIL" | null>(null);
  const [result, setResult] = useState("");

  const handleToss = async (userChoice: "HEAD" | "TAIL") => {
    if (tossing) return;
    
    setTossing(true);
    setOutcome(null);
    setResult("");

    try {
      const response = await fetch("/api/reward", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameId: 'toss', options: { choice: userChoice } })
      });
      const auth = await response.json();

      setTimeout(() => {
        const finalOutcome = auth.data.win ? userChoice : (userChoice === "HEAD" ? "TAIL" : "HEAD");
        setOutcome(finalOutcome);
        setResult(auth.data.win ? "🎉 MASTER OF FLIP!" : "❌ MISMATCH");
        
        if (auth.data.win) {
          const current = getAttractionState();
          updateAttractionState({ points: current.points + auth.data.xpReward });
        }
        setTossing(false);
      }, 1000);
    } catch (e) {
      setResult("ERROR");
      setTossing(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-12">
      <div className={`relative w-32 h-32 md:w-48 md:h-48 perspective-1000 ${tossing ? 'animate-toss' : ''}`}>
         <div className="w-full h-full bg-gradient-to-br from-amber-400 to-amber-600 rounded-full border-8 border-amber-700 shadow-2xl flex items-center justify-center text-6xl md:text-8xl select-none">
           {outcome === "HEAD" ? "🙂" : outcome === "TAIL" ? "🦅" : "🪙"}
         </div>
      </div>

      <div className="space-y-6 w-full max-w-md">
        <div className="flex gap-4">
          <button onClick={() => handleToss("HEAD")} disabled={tossing} className="flex-grow py-5 bg-white border-4 border-slate-900 text-slate-900 rounded-2xl font-black text-lg shadow-xl disabled:opacity-50">HEAD</button>
          <button onClick={() => handleToss("TAIL")} disabled={tossing} className="flex-grow py-5 bg-slate-900 text-white border-4 border-slate-900 rounded-2xl font-black text-lg shadow-xl disabled:opacity-50">TAIL</button>
        </div>
        <div className="min-h-[40px] text-center">
           {result && <p className="text-2xl font-black uppercase italic text-indigo-600">{result}</p>}
        </div>
      </div>
      <style>{`
        @keyframes toss {
          0% { transform: translateY(0) rotateX(0); }
          50% { transform: translateY(-150px) rotateX(900deg); }
          100% { transform: translateY(0) rotateX(1800deg); }
        }
        .animate-toss { animation: toss 1s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
      `}</style>
    </div>
  );
};

export default GameCoinToss;
