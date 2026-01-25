
import React, { useState } from 'react';
import { updateAttractionState, getAttractionState } from '../utils/attraction';

const GameBalloonPop: React.FC = () => {
  const [poppedIndex, setPoppedIndex] = useState<number | null>(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePop = async (index: number) => {
    if (poppedIndex !== null || loading) return;
    setLoading(true);

    try {
      const response = await fetch("/api/reward", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameId: 'balloon' })
      });
      const auth = await response.json();

      setPoppedIndex(index);
      setTimeout(() => {
        setResult(auth.data.win ? "🎉 DOPAMINE WIN! 🎁" : "💥 EMPTY POP");
        if (auth.data.win) {
          const current = getAttractionState();
          updateAttractionState({ points: current.points + auth.data.xpReward });
        }
        setLoading(false);
      }, 200);
    } catch (e) {
      setResult("CONNECTION LOST");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12">
      {[0, 1, 2, 3, 4].map((i) => (
        <div 
          key={i}
          onClick={() => handlePop(i)}
          className={`relative w-20 h-28 md:w-32 md:h-44 cursor-pointer transition-all duration-300 transform ${poppedIndex === i ? 'scale-90 opacity-50' : 'hover:scale-110'}`}
        >
          <div className="text-5xl md:text-7xl flex items-center justify-center h-full">
            {poppedIndex === i ? '💥' : '🎈'}
          </div>
          {result && poppedIndex === i && <div className="text-xs font-black text-indigo-600 mt-2">{result}</div>}
        </div>
      ))}
    </div>
  );
};

export default GameBalloonPop;
