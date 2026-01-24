import React, { useState, useMemo } from 'react';

const GameTreasureBox: React.FC = () => {
  const [pickedIndex, setPickedIndex] = useState<number | null>(null);
  const [result, setResult] = useState("");

  // Randomized winning box
  const winningIndex = useMemo(() => Math.floor(Math.random() * 3), [result === ""]);

  const handlePick = (index: number) => {
    if (pickedIndex !== null) return;
    
    setPickedIndex(index);
    
    setTimeout(() => {
      if (index === winningIndex) {
        setResult("🎉 Incredible! You found the hidden treasure! 💎");
      } else {
        setResult("❌ This box was empty. Better luck next time!");
      }
    }, 300);
  };

  const handleReset = () => {
    setPickedIndex(null);
    setResult("");
  };

  return (
    <section id="game-treasure-box" className="py-20 bg-white text-center border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-amber-50 text-amber-600 text-[10px] font-black uppercase tracking-widest mb-6">
          Mystery Rewards
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-12 tracking-tighter">🧰 Treasure Box Pick</h2>

        <div className="flex justify-center gap-6 md:gap-12 mb-12">
          {[0, 1, 2].map((i) => (
            <div 
              key={i}
              onClick={() => handlePick(i)}
              className={`
                relative w-24 h-24 md:w-40 md:h-40 cursor-pointer transition-all duration-300 transform 
                ${pickedIndex === null ? 'hover:scale-110 hover:-translate-y-2' : ''}
                ${pickedIndex === i ? 'scale-105' : pickedIndex !== null ? 'opacity-50 grayscale' : ''}
                flex items-center justify-center bg-slate-50 border-4 border-slate-900 rounded-[2rem] shadow-xl
              `}
            >
              <div className="text-5xl md:text-7xl">
                {pickedIndex === i 
                  ? (i === winningIndex ? '💎' : '❌') 
                  : '📦'
                }
              </div>
              
              {pickedIndex === null && (
                <div className="absolute -bottom-2 bg-slate-900 text-white text-[8px] font-black uppercase px-3 py-1 rounded-full">
                  PICK ME
                </div>
              )}
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
                className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-2xl"
              >
                Try Another Box
              </button>
            </>
          )}
          {!result && (
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] animate-pulse">
              One box contains the master treasure. Choose wisely.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default GameTreasureBox;