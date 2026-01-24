import React, { useState } from 'react';

const GameCoinToss: React.FC = () => {
  const [choice, setChoice] = useState<"HEAD" | "TAIL" | null>(null);
  const [tossing, setTossing] = useState(false);
  const [outcome, setOutcome] = useState<"HEAD" | "TAIL" | null>(null);
  const [result, setResult] = useState("");

  const handleToss = (userChoice: "HEAD" | "TAIL") => {
    if (tossing) return;
    
    setChoice(userChoice);
    setTossing(true);
    setOutcome(null);
    setResult("");

    // Simulate flip animation delay
    setTimeout(() => {
      const finalOutcome = Math.random() < 0.5 ? "HEAD" : "TAIL";
      setOutcome(finalOutcome);
      
      if (userChoice === finalOutcome) {
        setResult("🎉 CORRECT! You mastered the flip!");
      } else {
        setResult("❌ MISMATCH. The coin had other plans.");
      }
      setTossing(false);
    }, 1000);
  };

  const handleReset = () => {
    setChoice(null);
    setOutcome(null);
    setResult("");
  };

  return (
    <section id="game-coin-toss" className="py-20 bg-slate-50 text-center border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-amber-50 text-amber-600 text-[10px] font-black uppercase tracking-widest mb-6">
          50/50 Probability
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-12 tracking-tighter uppercase leading-none">🪙 Coin Toss & Win</h2>

        <div className="flex flex-col items-center justify-center space-y-12">
          {/* Animated Coin */}
          <div className={`relative w-32 h-32 md:w-48 md:h-48 perspective-1000 ${tossing ? 'animate-toss' : ''}`}>
             <div className="w-full h-full bg-gradient-to-br from-amber-400 to-amber-600 rounded-full border-8 border-amber-700 shadow-2xl flex items-center justify-center text-6xl md:text-8xl select-none">
               {outcome === "HEAD" ? "🙂" : outcome === "TAIL" ? "🦅" : "🪙"}
             </div>
          </div>

          <div className="space-y-6 w-full max-w-md">
            {!choice || tossing ? (
              <div className="flex gap-4">
                <button 
                  onClick={() => handleToss("HEAD")}
                  disabled={tossing}
                  className="flex-grow py-5 bg-white border-4 border-slate-900 text-slate-900 rounded-2xl font-black text-lg shadow-xl hover:bg-slate-50 transition-all transform active:scale-95 disabled:opacity-50"
                >
                  HEAD
                </button>
                <button 
                  onClick={() => handleToss("TAIL")}
                  disabled={tossing}
                  className="flex-grow py-5 bg-slate-900 text-white border-4 border-slate-900 rounded-2xl font-black text-lg shadow-xl hover:bg-slate-800 transition-all transform active:scale-95 disabled:opacity-50"
                >
                  TAIL
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="min-h-[40px]">
                  <p className={`text-2xl font-black uppercase tracking-tight italic ${result.includes('🎉') ? 'text-indigo-600' : 'text-slate-400'}`}>
                    {result}
                  </p>
                </div>
                <button 
                  onClick={handleReset}
                  className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg shadow-2xl hover:bg-indigo-700 transition-all"
                >
                  TOSS AGAIN
                </button>
              </div>
            )}
            
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">
              {tossing ? "The coin is in the air..." : !choice ? "Choose a side to begin the duel" : ""}
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes toss {
          0% { transform: translateY(0) rotateX(0); }
          25% { transform: translateY(-100px) rotateX(450deg); }
          50% { transform: translateY(-150px) rotateX(900deg); }
          75% { transform: translateY(-100px) rotateX(1350deg); }
          100% { transform: translateY(0) rotateX(1800deg); }
        }
        .animate-toss {
          animation: toss 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .perspective-1000 { perspective: 1000px; }
      `}</style>
    </section>
  );
};

export default GameCoinToss;