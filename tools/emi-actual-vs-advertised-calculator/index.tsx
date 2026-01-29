
import React, { useState } from 'react';
import { PipelineRunner } from '../../core/pipeline';
import { validate } from './validate';
import { normalize } from './normalize';
import { process } from './process';
import { verify } from './verify';
import { explain } from './explain';

const EmiRealityCheck: React.FC = () => {
  const [state, setState] = useState({ amount: 100000, rate: 10, months: 12 });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleRun = async () => {
    setLoading(true);
    const res = await PipelineRunner.run('emi-actual-vs-advertised-calculator', 
      { validate, normalize, process, verify, explain }, 
      state
    );
    setResult(res);
    setLoading(false);
  };

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Loan Amount</label>
          <input 
            type="number" 
            value={state.amount} 
            onChange={e => setState({...state, amount: Number(e.target.value)})}
            className="w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl font-black text-xl"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Advertised Flat Rate (%)</label>
          <input 
            type="number" 
            value={state.rate} 
            onChange={e => setState({...state, rate: Number(e.target.value)})}
            className="w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl font-black text-xl"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Tenure (Months)</label>
          <input 
            type="number" 
            value={state.months} 
            onChange={e => setState({...state, months: Number(e.target.value)})}
            className="w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl font-black text-xl"
          />
        </div>
      </div>

      <button 
        onClick={handleRun}
        disabled={loading}
        className="w-full py-8 bg-emerald-600 text-white rounded-[2.5rem] font-black text-2xl shadow-2xl active:scale-95 transition-all"
      >
        {loading ? "Calculating Real Interest..." : "Expose Real Rate"}
      </button>

      {result && result.success && (
        <div className="space-y-8 animate-in zoom-in-95 duration-500">
           <div className="bg-slate-950 p-12 rounded-[4rem] text-white shadow-3xl border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-5 select-none pointer-events-none text-9xl font-black italic">TRUTH</div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                 <div className="space-y-2">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">True Reducing Rate</span>
                    <div className="text-7xl font-black text-emerald-400 tracking-tighter">{result.data.reducingRate}%</div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Equivalent to Industry Standard</p>
                 </div>
                 
                 <div className="space-y-6 flex flex-col justify-center border-l border-white/10 pl-12">
                    <div className="flex justify-between items-end border-b border-white/5 pb-4">
                       <span className="text-[10px] font-black text-slate-500 uppercase">Monthly EMI</span>
                       <span className="text-2xl font-black">₹{result.data.emi.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-end border-b border-white/5 pb-4">
                       <span className="text-[10px] font-black text-slate-500 uppercase">Total Interest</span>
                       <span className="text-2xl font-black text-rose-400">₹{result.data.totalInterest.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-end">
                       <span className="text-[10px] font-black text-slate-500 uppercase">Interest Markup</span>
                       <span className="text-2xl font-black text-amber-400">{result.data.multiplier}x</span>
                    </div>
                 </div>
              </div>
           </div>

           <div className="p-10 bg-emerald-50 rounded-[3rem] border border-emerald-100 italic font-medium text-emerald-800 leading-relaxed">
             " {result.explanation} "
           </div>
        </div>
      )}
    </div>
  );
};

export default EmiRealityCheck;
