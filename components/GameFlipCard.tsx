
import React, { useState } from 'react';
import { updateAttractionState, getAttractionState } from '../utils/attraction';

const GameFlipCard: React.FC = () => {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const [result, setResult] = useState("");
  const [winningIndex, setWinningIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFlip = async (index: number) => {
    if (flippedIndex !== null || loading) return;
    setLoading(true);

    try {
      const response = await fetch("/api/reward", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameId: 'flip', options: { picked: index } })
      });
      const auth = await response.json();
      
      // Determine a fake winning index based on backend win/loss to show user
      const serverWin = auth.data.win;
      const actualWinner = serverWin ? index : (index + 1) % 3;
      
      setWinningIndex(actualWinner);
      setFlippedIndex(index);
      
      setTimeout(() => {
        setResult(serverWin ? "🎉 MASTER DRAW! YOU WON" : "❌ DEFEAT. TRY AGAIN");
        if (serverWin) {
          const current = getAttractionState();
          updateAttractionState({ points: current.points + auth.data.xpReward });
        }
        setLoading(false);
      }, 400);

    } catch (e) {
      setResult("GATEWAY ERROR");
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFlippedIndex(null);
    setResult("");
    setWinningIndex(null);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center gap-4 md:gap-8 perspective-1000 mb-12">
        {[0, 1, 2].map((i) => (
          <div 
            key={i}
            onClick={() => handleFlip(i)}
            className={`relative w-24 h-36 md:w-32 md:h-48 cursor-pointer transition-transform duration-500 transform-style-3d ${flippedIndex === i ? 'rotate-y-180' : 'hover:-translate-y-2'}`}
          >
            <div className="absolute inset-0 bg-slate-900 rounded-3xl flex items-center justify-center border-4 border-slate-800 shadow-xl backface-hidden">
              <div className="text-4xl font-black text-white opacity-20">?</div>
            </div>
            <div className="absolute inset-0 bg-white rounded-3xl flex items-center justify-center border-4 border-slate-900 shadow-xl rotate-y-180 backface-hidden">
              <div className="text-5xl">
                {i === winningIndex ? '🎁' : '❌'}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="min-h-[100px] flex flex-col items-center justify-center space-y-6">
        {result && (
          <>
            <p className={`text-2xl font-black uppercase italic ${result.includes('🎉') ? 'text-indigo-600' : 'text-slate-400'}`}>
              {result}
            </p>
            <button 
              onClick={handleReset}
              className="px-8 py-3 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl"
            >
              CLEAR TABLE
            </button>
          </>
        )}
      </div>
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

export default GameFlipCard;
