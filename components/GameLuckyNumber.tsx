
import React, { useState } from 'react';
import { updateAttractionState, getAttractionState } from '../utils/attraction';

const GameLuckyNumber: React.FC = () => {
  const [userNum, setUserNum] = useState<string>("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    const num = parseInt(userNum);
    if (isNaN(num) || num < 1 || num > 100) {
      setResult("❗ RANGE: 1–100");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const response = await fetch("/api/reward", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameId: 'lucky', options: { val: num } })
      });
      const auth = await response.json();

      setResult(auth.data.win ? `🎉 JACKPOT! YOU WON!` : `❌ NO MATCH. WINNER: ${Math.floor(Math.random()*100)}`);
      
      if (auth.data.win) {
        const current = getAttractionState();
        updateAttractionState({ points: current.points + auth.data.xpReward });
      }
    } catch (e) {
      setResult("CONNECTION FAILED");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-8 p-10 bg-slate-50 rounded-[3rem] border border-slate-100 shadow-inner">
      <div className="space-y-4">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center block">Prediction Isolate (1-100)</label>
        <input 
          type="number" 
          value={userNum}
          onChange={e => setUserNum(e.target.value)}
          placeholder="?" 
          className="w-full text-center py-6 bg-white border-4 border-slate-200 rounded-[2rem] text-4xl font-black text-slate-900 outline-none focus:border-indigo-500 transition-all shadow-sm"
        />
      </div>

      <button 
        onClick={handleCheck}
        disabled={loading}
        className="w-full py-6 bg-rose-600 text-white rounded-[2rem] font-black text-xl shadow-2xl hover:bg-rose-700 transition-all transform active:scale-95 disabled:opacity-50"
      >
        {loading ? 'SYNCING...' : 'INITIATE DRAW'}
      </button>

      <div className="min-h-[60px] flex items-center justify-center">
        {result && <p className="text-xl font-black text-indigo-600 italic">{result}</p>}
      </div>
    </div>
  );
};

export default GameLuckyNumber;
