import React, { useState, useMemo } from 'react';

const GameFlipCard: React.FC = () => {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const [result, setResult] = useState("");
  
  // Randomly assign the winning card once per component mount or reset
  const winningIndex = useMemo(() => Math.floor(Math.random() * 3), [result === "" && flippedIndex === null]);

  const handleFlip = (index: number) => {
    if (flippedIndex !== null) return; // Prevent multiple flips
    
    setFlippedIndex(index);
    
    setTimeout(() => {
      if (index === winningIndex) {
        setResult("🎉 You Found the Winning Card!");
      } else {
        setResult("❌ Wrong Card. Better luck next time!");
      }
    }, 400);
  };

  const handleReset = () => {
    setFlippedIndex(null);
    setResult("");
  };

  return (
    <section id="game-flip-card" className="py-20 bg-white text-center border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest mb-6">
          Probability Logic
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-12 tracking-tighter">🃏 Flip & Win</h2>

        <div className="flex justify-center gap-4 md:gap-8 perspective-1000 mb-12">
          {[0, 1, 2].map((i) => (
            <div 
              key={i}
              onClick={() => handleFlip(i)}
              className={`relative w-24 h-36 md:w-32 md:h-48 cursor-pointer transition-transform duration-500 transform-style-3d ${flippedIndex === i ? 'rotate-y-180' : 'hover:-translate-y-2'}`}
            >
              {/* Front Side (Back of the card) */}
              <div className="absolute inset-0 bg-slate-900 rounded-3xl flex items-center justify-center border-4 border-slate-800 shadow-xl backface-hidden">
                <div className="text-4xl font-black text-white opacity-20">?</div>
              </div>
              
              {/* Back Side (Front of the card) */}
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
              <p className={`text-2xl font-black animate-in zoom-in-95 duration-300 ${result.includes('🎉') ? 'text-indigo-600' : 'text-slate-400'}`}>
                {result}
              </p>
              <button 
                onClick={handleReset}
                className="px-8 py-3 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl"
              >
                Reset Cards
              </button>
            </>
          )}
          {!result && (
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
              {flippedIndex === null ? "Pick a card to reveal your destiny" : "Revealing..."}
            </p>
          )}
        </div>
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </section>
  );
};

export default GameFlipCard;