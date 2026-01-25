
import React, { useState } from 'react';
import { updateAttractionState, getAttractionState } from '../utils/attraction';

const GameTreasureBox: React.FC = () => {
  const [pickedIndex, setPickedIndex] = useState<number | null>(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [winIndex, setWinIndex] = useState<number | null>(null);

  const handlePick = async (index: number) => {
    if (pickedIndex !== null || loading) return;
    setLoading(true);
    
    try {
      const response = await fetch("/api/reward", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameId: 'treasure', options: { choice: index } })
      });
      const auth = await response.json();
      
      const serverWin = auth.data.win;
      setWinIndex(serverWin ? index : (index + 1) % 3);
      setPickedIndex(index);

      setTimeout(() => {
        setResult(serverWin ? "🎉 TREASURE FOUND! 💎" : "❌ EMPTY VAULT");
        if (serverWin) {
          const current = getAttractionState();
          updateAttractionState({ points: current.points + auth.data.xpReward });
        }
        setLoading(false);
      }, 500);

    } catch (e) {
      setResult("GATEWAY ERROR");
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPickedIndex(null);
    setResult("");
    setWinIndex(null);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center gap-6 md:gap-12 mb-12">
        {[0, 1, 2].map((i) => (
          <div 
            key={i}
            onClick={() => handlePick(i)}
            className={`
              relative w-24 h-24 md:w-40 md:h-40 cursor-pointer transition-all duration-500 transform 
              ${pickedIndex === null ? 'hover:scale-110 hover:-translate-y-3' : ''}
              ${pickedIndex === i ? 'scale-105' : pickedIndex !== null ? 'opacity-40 grayscale scale-90' : ''}
              flex items-center justify-center bg-slate-50 border-4 border-slate-900 rounded-[2.5rem] shadow-2xl
            `}
          >
            <div className="text-5xl md:text-7xl select-none">
              {pickedIndex === i 
                ? (i === winIndex ? '💎' : '💨') 
                : '📦'
              }
            </div>
            
            {pickedIndex === null && (
              <div className="absolute -bottom-3 bg-indigo-600 text-white text-[8px] font-black uppercase px-4 py-1.5 rounded-full shadow-lg">
                OPEN
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="min-h-[120px] flex flex-col items-center justify-center space-y-6">
        {result ? (
          <>
            <p className={`text-3xl font-black uppercase italic ${result.includes('🎉') ? 'text-indigo-600' : 'text-slate-400'}`}>
              {result}
            </p>
            <button 
              onClick={handleReset}
              className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-2xl transform active:scale-95"
            >
              Reset Vaults
            </button>
          </>
        ) : (
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] animate-pulse">
            Secure logic node authorized. Pick a vault.
          </p>
        )}
      </div>
    </div>
  );
};

export default GameTreasureBox;
