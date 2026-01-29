
import React, { useState } from 'react';
import { PROBLEM_HUBS } from '../data/problems';

interface Props {
  onSelectProblem: (id: string) => void;
}

const ProblemCommandCenter: React.FC<Props> = ({ onSelectProblem }) => {
  return (
    <section className="bg-slate-950 p-10 md:p-20 rounded-[4rem] text-white shadow-3xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-20 opacity-5 select-none pointer-events-none">
        <div className="text-[12rem] font-black italic">PROBLEMS</div>
      </div>

      <div className="relative z-10 max-w-4xl">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-[0.4em] mb-10">
          Layer 2: Problem-Centric Intelligence
        </div>
        <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-10 leading-none">
          What barrier are you <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">facing today?</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROBLEM_HUBS.map(hub => (
            <button 
              key={hub.id}
              onClick={() => onSelectProblem(hub.id)}
              className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] hover:bg-white/10 hover:border-indigo-500/50 transition-all text-left group/card"
            >
              <div className="text-5xl mb-6 group-hover/card:scale-110 transition-transform">{hub.icon}</div>
              <h4 className="text-xl font-black mb-2 group-hover/card:text-indigo-400 transition-colors">{hub.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{hub.description}</p>
              <div className="mt-6 flex items-center gap-3">
                 <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 text-[8px] font-black uppercase tracking-widest rounded-lg">
                   {hub.flow.length} STAGES
                 </span>
                 <span className="text-xs font-black text-slate-600 group-hover/card:text-white transition-colors">Start Flow →</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemCommandCenter;
