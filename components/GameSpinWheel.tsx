import React, { useState } from 'react';

const GameSpinWheel: React.FC = () => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState("");
  const [rotateDeg, setRotateDeg] = useState(0);

  const handleSpin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult("");

    const rand = Math.random() * 100;
    let res = "";
    let deg = 0;

    // 🎯 Probability Engine
    if (rand < 1) { // 1% Jackpot
      res = "🎉 JACKPOT WIN!";
      deg = 360 * 6 + 20;
    } else if (rand < 10) { // 9% Medium
      res = "💰 Medium Prize Won";
      deg = 360 * 6 + 110;
    } else if (rand < 50) { // 40% Small
      res = "🎁 Small Prize Won";
      deg = 360 * 6 + 200;
    } else { // 50% Better Luck
      res = "❌ Better Luck Next Time";
      deg = 360 * 6 + 290;
    }

    setRotateDeg(deg);

    setTimeout(() => {
      setResult(res);
      setSpinning(false);
    }, 4200);
  };

  return (
    <section id="game-spin-wheel" className="py-20 bg-slate-50 text-center border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest mb-6">
          Interactive Rewards
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-12 tracking-tighter">🎁 Lucky Spin & Win</h2>

        <div className="relative inline-block mb-12">
          {/* Wheel Indicator */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-20 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[30px] border-t-slate-900 drop-shadow-xl"></div>
          
          <div 
            className="w-[300px] h-[300px] md:w-[350px] md:h-[350px] rounded-full border-[10px] border-slate-900 relative transition-transform duration-[4000ms] cubic-bezier(0.15, 0, 0.15, 1) shadow-2xl overflow-hidden"
            style={{ 
              transform: `rotate(${rotateDeg}deg)`,
              background: 'conic-gradient(#ffd700 0deg 90deg, #4caf50 90deg 180deg, #03a9f4 180deg 270deg, #f44336 270deg 360deg)'
            }}
          >
            {/* Prize Labels */}
            <div className="absolute top-[15%] left-1/2 -translate-x-1/2 font-black text-xs uppercase text-slate-900">🎉 Jackpot</div>
            <div className="absolute top-1/2 right-[5%] -translate-y-1/2 font-black text-xs uppercase text-slate-900 rotate-90">💰 Medium</div>
            <div className="absolute bottom-[15%] left-1/2 -translate-x-1/2 font-black text-xs uppercase text-slate-900 rotate-180">🎁 Small</div>
            <div className="absolute top-1/2 left-[5%] -translate-y-1/2 font-black text-xs uppercase text-slate-900 -rotate-90">❌ Try Again</div>
            
            {/* Center Cap */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full border-4 border-slate-900 shadow-xl flex items-center justify-center font-black text-slate-900 text-[10px]">WIN</div>
          </div>
        </div>

        <div className="space-y-6">
          <button 
            onClick={handleSpin}
            disabled={spinning}
            className="px-16 py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-xl shadow-2xl hover:bg-indigo-700 transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {spinning ? 'SPINNING...' : 'SPIN NOW'}
          </button>
          
          <div className="min-h-[40px]">
            {result && (
              <p className="text-2xl font-black text-indigo-600 animate-in zoom-in-95 duration-300">
                {result}
              </p>
            )}
          </div>
          
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">Chance of Win: Real-Time Algorithm Active</p>
        </div>
      </div>
    </section>
  );
};

export default GameSpinWheel;