import React, { useRef, useEffect, useState } from 'react';

const GameScratchCard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [result, setResult] = useState("");
  const [isScratched, setIsScratched] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🎯 Probability Engine
    const rand = Math.random() * 100;
    let reward = "";
    if (rand < 2) reward = "🎉 JACKPOT!";
    else if (rand < 10) reward = "💰 Medium Prize!";
    else if (rand < 40) reward = "🎁 Small Prize!";
    else reward = "❌ Better Luck Next Time";
    setResult(reward);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initial State
    ctx.fillStyle = "#cbd5e1";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Pattern on scratch area
    ctx.strokeStyle = "#94a3b8";
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 10) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }

    ctx.fillStyle = "#64748b";
    ctx.font = "black 14px Inter";
    ctx.textAlign = "center";
    ctx.fillText("SCRATCH TO REVEAL", canvas.width / 2, canvas.height / 2 + 5);

    let isDrawing = false;

    const scratch = (e: any) => {
      if (!isDrawing) return;
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 25, 0, Math.PI * 2);
      ctx.fill();
      
      if (!isScratched) setIsScratched(true);
    };

    const start = () => isDrawing = true;
    const end = () => isDrawing = false;

    canvas.addEventListener("mousedown", start);
    canvas.addEventListener("mouseup", end);
    canvas.addEventListener("mousemove", scratch);
    canvas.addEventListener("touchstart", start);
    canvas.addEventListener("touchend", end);
    canvas.addEventListener("touchmove", scratch);

    setLoading(false);

    return () => {
      canvas.removeEventListener("mousedown", start);
      canvas.removeEventListener("mouseup", end);
      canvas.removeEventListener("mousemove", scratch);
      canvas.removeEventListener("touchstart", start);
      canvas.removeEventListener("touchend", end);
      canvas.removeEventListener("touchmove", scratch);
    };
  }, []);

  return (
    <section id="game-scratch-card" className="py-20 bg-white text-center border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-6">
          Instant Wins
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-12 tracking-tighter">🎫 Scratch & Win</h2>
        
        <div className="relative w-[320px] h-[160px] mx-auto border-[6px] border-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl bg-slate-50 group hover:scale-105 transition-transform duration-500">
          {/* Result Layer (Hidden Underneath) */}
          <div className="absolute inset-0 flex items-center justify-center font-black text-3xl text-indigo-600 bg-white">
            {result}
          </div>
          
          {/* Scratch Layer */}
          <canvas 
            ref={canvasRef} 
            width={320} 
            height={160} 
            className="absolute top-0 left-0 cursor-crosshair z-10"
          />
        </div>

        <div className="mt-10 space-y-4">
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">
            {isScratched ? "Lucky reveal! Come back tomorrow for more." : "Use your mouse or finger to scratch the surface"}
          </p>
          <div className="flex justify-center gap-4">
             <button 
               onClick={() => window.location.reload()}
               className="px-8 py-3 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl"
             >
               Reset Board
             </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameScratchCard;