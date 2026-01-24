import React, { useState, useMemo } from 'react';

const GameLuckyNumber: React.FC = () => {
  const [userNum, setUserNum] = useState<string>("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [revealed, setRevealed] = useState(false);

  // Hidden lucky number for the session
  const luckyNumber = useMemo(() => Math.floor(Math.random() * 100) + 1, []);

  const handleCheck = () => {
    const num = parseInt(userNum);

    if (isNaN(num) || num < 1 || num > 100) {
      setResult("❗ Enter valid number between 1–100");
      return;
    }

    setLoading(true);
    setResult("");
    setRevealed(false);

    // Simulate "Checking the draw"
    setTimeout(() => {
      const diff = Math.abs(luckyNumber - num);
      setRevealed(true);

      if (diff === 0) {
        setResult("🎉 JACKPOT! Exact Match!");
      } else if (diff <= 5) {
        setResult(`💰 Medium Prize! You were very close to ${luckyNumber}!`);
      } else if (diff <= 10) {
        setResult(`🎁 Small Prize! Almost there (Lucky: ${luckyNumber})`);
      } else {
        setResult(`❌ Not Lucky This Time. The number was ${luckyNumber}`);
      }
      setLoading(false);
    }, 800);
  };

  return (
    <section id="game-lucky-number" className="py-20 bg-white text-center border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-rose-50 text-rose-600 text-[10px] font-black uppercase tracking-widest mb-6">
          Prediction Challenge
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-12 tracking-tighter">🔢 Lucky Number Draw</h2>

        <div className="max-w-md mx-auto space-y-8 p-10 bg-slate-50 rounded-[3rem] border border-slate-100 shadow-inner">
          <div className="space-y-4">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Your Number (1-100)</label>
            <input 
              type="number" 
              value={userNum}
              onChange={e => setUserNum(e.target.value)}
              placeholder="00" 
              min="1" 
              max="100"
              className="w-full text-center py-6 bg-white border-4 border-slate-200 rounded-[2rem] text-4xl font-black text-slate-900 outline-none focus:border-indigo-500 transition-all shadow-sm"
            />
          </div>

          <button 
            onClick={handleCheck}
            disabled={loading}
            className="w-full py-6 bg-rose-600 text-white rounded-[2rem] font-black text-xl shadow-2xl hover:bg-rose-700 transition-all transform active:scale-95 disabled:opacity-50"
          >
            {loading ? 'CALCULATING ODDS...' : 'CHECK LUCK'}
          </button>

          <div className="min-h-[60px] flex items-center justify-center">
            {result && (
              <p className={`text-xl font-black animate-in zoom-in-95 duration-300 ${revealed && result.includes('❌') ? 'text-slate-400' : 'text-indigo-600'}`}>
                {result}
              </p>
            )}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 opacity-40">
           <div className="text-[8px] font-black uppercase tracking-widest">Exact: Jackpot</div>
           <div className="text-[8px] font-black uppercase tracking-widest">±5 Range: Medium</div>
           <div className="text-[8px] font-black uppercase tracking-widest">±10 Range: Small</div>
           <div className="text-[8px] font-black uppercase tracking-widest">Miss: Try Again</div>
        </div>
      </div>
    </section>
  );
};

export default GameLuckyNumber;