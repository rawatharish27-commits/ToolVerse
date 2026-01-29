
import React, { useState, useMemo } from 'react';
// Fix: Updated import to use PROBLEM_HUBS from the data registry instead of non-existent GUIDED_FLOWS
import { PROBLEM_HUBS } from '../data/problems';

interface ProblemSolverProps {
  onSelectFlow: (slug: string) => void;
}

const ProblemSolver: React.FC<ProblemSolverProps> = ({ onSelectFlow }) => {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    // Fix: Using PROBLEM_HUBS instead of non-existent GUIDED_FLOWS to resolve module errors
    if (!query) return PROBLEM_HUBS;
    const q = query.toLowerCase();
    return PROBLEM_HUBS.filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.description.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <section className="bg-slate-950 p-10 md:p-20 rounded-[4rem] text-white shadow-3xl border border-white/5 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
        <div className="text-[12rem] font-black italic">SOLVE</div>
      </div>
      
      <div className="relative z-10 max-w-4xl">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
           Layer 2: Intelligence Engine
        </div>
        <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-8 leading-none">
          Describe your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">Digital Barrier.</span>
        </h2>
        
        <div className="relative mb-12">
          <input 
            type="text" 
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="e.g. 'My photo is rejected by SSC' or 'PDF won't upload'..."
            className="w-full p-8 bg-white/5 border border-white/10 rounded-[2.5rem] text-xl font-bold outline-none focus:ring-8 focus:ring-indigo-500/10 transition-all placeholder:text-slate-600"
          />
          <div className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black">→</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.slice(0, 4).map(flow => (
            <button 
              // Fix: Changed flow.slug to flow.id to match the ProblemHub interface definition
              key={flow.id}
              onClick={() => onSelectFlow(flow.id)}
              className="flex items-start gap-6 p-8 bg-white/5 border border-white/5 rounded-[2.5rem] hover:bg-white/10 hover:border-indigo-500/50 transition-all text-left group/card"
            >
              <div className="text-5xl group-hover/card:scale-110 transition-transform">{flow.icon}</div>
              <div>
                <h4 className="font-black text-xl mb-2 group-hover/card:text-indigo-400 transition-colors">{flow.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{flow.description}</p>
                <div className="mt-4 flex gap-2">
                   <span className="px-3 py-1 bg-white/5 rounded-lg text-[8px] font-black uppercase tracking-widest text-slate-500">{flow.flow.length} STAGES</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSolver;
