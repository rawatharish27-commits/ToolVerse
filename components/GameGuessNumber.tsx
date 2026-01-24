import React, { useState, useMemo } from 'react';

const GameGuessNumber: React.FC = () => {
  const [userGuess, setUserGuess] = useState<string>("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Secret number logic: resets when result is cleared
  const magicNumber = useMemo(() => Math.floor(Math.random() * 5) + 1, [result === ""]);

  const handleGuess = () => {
    const val = parseInt(userGuess);
    if (isNaN(val) || val < 1 || val > 5) {
      setResult("❗ Enter 1, 2, 3, 4, or 5");
      return;
    }

    setLoading(true);
    setResult("");

    setTimeout(() => {
      if (val === magicNumber) {
        setResult("🎉 FREQUENCY MATCHED! You Won! 💎");
      } else {
        setResult("❌ MISMATCH. The frequency was different.");
      }
      setLoading(false);
    }, 600);
  };

  const handleReset = () => {
    setUserGuess("");
    setResult("");
  };

  return (
    <section id="game-guess-number" className="py-20 bg-white text-center border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest mb-6">
          Mind-Sync Challenge
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-12 tracking-tighter uppercase leading-none">🔮 Guess The Magic</h2>

        <div className="max-w-xl mx-auto p-12 bg-slate-900 rounded-[4rem] shadow-2xl border-b-8 border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 opacity-50"></div>
          
          <div className="space-y-10">
            <div className="space-y-4">
              <p className="text-indigo-400 font-black text-[10px] uppercase tracking-[0.4em]">Input Prediction (1-5)</p>
              <input 
                type="number"
                value={userGuess}
                onChange={(e) => setUserGuess(e.target.value)}
                placeholder="?"
                min="1"
                max="5"
                className="w-32 h-32 bg-white/5 border-4 border-indigo-500/30 rounded-3xl text-center text-6xl font-black text-white outline-none focus:border-indigo-400 transition-all shadow-inner"
              />
            </div>

            <button 
              onClick={handleGuess}
              disabled={loading}
              className="w-full py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-xl shadow-2xl hover:bg-indigo-500 transition-all transform active:scale-95 disabled:opacity-50"
            >
              {loading ? 'SYNCING...' : 'UNVEIL DESTINY'}
            </button>
          </div>
        </div>

        <div className="mt-12 min-h-[80px] flex flex-col items-center justify-center space-y-6">
           {result && (
             <>
               <p className={`text-2xl font-black animate-in zoom-in-95 duration-500 uppercase tracking-tight italic ${result.includes('🎉') ? 'text-indigo-600' : 'text-slate-400'}`}>
                 {result}
               </p>
               <button 
                onClick={handleReset}
                className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-indigo-600 underline"
               >
                 Clear Memory & Retry
               </button>
             </>
           )}
           {!result && (
             <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] animate-pulse">
               The magic number is hidden in the vault. Can you sync with it?
             </p>
           )}
        </div>
      </div>
    </section>
  );
};

export default GameGuessNumber;