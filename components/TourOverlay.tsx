
import React, { useState } from 'react';

interface TourStep {
  title: string;
  desc: string;
  icon: string;
}

const STEPS: TourStep[] = [
  { title: "System Directory", desc: "Access 500+ tools via the left menu. Categories are optimized for speed.", icon: "📂" },
  { title: "Universal Search", desc: "Instantly find any logic node by keyword. No indexing delay.", icon: "🔍" },
  { title: "Reward Hub", desc: "Win Lifetime Pro access and extra credits by completing daily challenges.", icon: "🎁" },
  { title: "Private Engine", desc: "All files stay in your browser. We never upload your sensitive data.", icon: "🛡️" }
];

const TourOverlay: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    if (current < STEPS.length - 1) {
      setCurrent(current + 1);
    } else {
      localStorage.setItem('tv_tour_completed', 'true');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center bg-slate-950/80 backdrop-blur-xl p-6 animate-in fade-in duration-500">
      <div className="bg-white rounded-[4rem] p-12 max-w-lg w-full text-center shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-indigo-600">
          <div className="h-full bg-emerald-400 transition-all duration-500" style={{ width: `${((current + 1) / STEPS.length) * 100}%` }}></div>
        </div>
        
        <div className="text-8xl mb-10 animate-bounce">{STEPS[current].icon}</div>
        <h3 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-4">Step {current + 1} of {STEPS.length}</h3>
        <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight leading-tight">{STEPS[current].title}</h2>
        <p className="text-slate-500 font-medium mb-12 text-lg leading-relaxed">{STEPS[current].desc}</p>
        
        <div className="flex gap-4">
          <button 
            onClick={onClose}
            className="flex-grow py-5 bg-slate-50 text-slate-400 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all"
          >
            Skip
          </button>
          <button 
            onClick={handleNext}
            className="flex-[2] py-5 bg-indigo-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-xl hover:bg-indigo-700 transition-all transform active:scale-95"
          >
            {current === STEPS.length - 1 ? "Start Dominating" : "Next Segment →"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourOverlay;
