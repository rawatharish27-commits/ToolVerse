import React, { useState, useMemo } from 'react';

const GameBalloonPop: React.FC = () => {
  const [poppedIndex, setPoppedIndex] = useState<number | null>(null);
  const [result, setResult] = useState("");

  // Probability Engine: Randomly select 2 winning balloons out of 5
  const winningIndices = useMemo(() => {
    const indices = new Set<number>();
    while (indices.size < 2) {
      indices.add(Math.floor(Math.random() * 5));
    }
    return Array.from(indices);
  }, [result === ""]);

  const handlePop = (index: number) => {
    if (poppedIndex !== null) return;
    
    setPoppedIndex(index);
    
    setTimeout(() => {
      if (winningIndices.includes(index)) {
        setResult("🎉 Incredible! You popped a winning balloon! 🎁");
      } else {
        setResult("💥 POP! Nothing inside this one. Try again!");
      }
    }, 200);
  };

  const handleReset = () => {
    setPoppedIndex(null);
    setResult("");
  };

  return (
    <section id="game-balloon-pop" className="py-20 bg-slate-50 text-center border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-rose-50 text-rose-600 text-[10px] font-black uppercase tracking-widest mb-6">
          Instant Dopamine
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-12 tracking-tighter">🎈 Balloon Pop & Win</h2>

        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12">
          {[0, 1, 2, 3, 4].map((i) => (
            <div 
              key={i}
              onClick={() => handlePop(i)}
              className={`
                relative w-20 h-28 md:w-32 md:h-44 cursor-pointer transition-all duration-300 transform 
                ${poppedIndex === null ? 'hover:scale-110 hover:-translate-y-4' : ''}
                ${poppedIndex === i ? 'scale-90 opacity-100' : poppedIndex !== null ? 'opacity-30 grayscale' : 'animate-bounce-slow'}
                flex items-center justify-center bg-white border-2 border-slate-100 rounded-full shadow-lg
              `}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="text-5xl md:text-7xl select-none">
                {poppedIndex === i 
                  ? (winningIndices.includes(i) ? '🎉' : '💥') 
                  : '🎈'
                }
              </div>
              
              {/* String Decor */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-0.5 h-10 bg-slate-200"></div>
              
              {poppedIndex === null && (
                <div className="absolute -top-2 bg-indigo-600 text-white text-[7px] font-black uppercase px-2 py-0.5 rounded-full shadow-lg">
                  POP
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="min-h-[100px] flex flex-col items-center justify-center space-y-6 pt-4">
          {result && (
            <>
              <p className={`text-2xl font-black animate-in zoom-in-95 duration-300 ${result.includes('🎉') ? 'text-rose-600' : 'text-slate-400'}`}>
                {result}
              </p>
              <button 
                onClick={handleReset}
                className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-rose-600 transition-all shadow-2xl"
              >
                Reset Board
              </button>
            </>
          )}
          {!result && (
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
              2 Balloons contain hidden prizes. Can you find them?
            </p>
          )}
        </div>
      </div>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default GameBalloonPop;