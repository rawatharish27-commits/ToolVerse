
import React, { useState } from 'react';
import { PipelineRunner } from '../../core/pipeline';
import { validate } from './validate';
import { normalize } from './normalize';
import { process } from './process';
import { verify } from './verify';
import { explain } from './explain';

const OtpCalculator: React.FC = () => {
  const [carrier, setCarrier] = useState("Jio");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    setLoading(true);
    const res = await PipelineRunner.run('otp-delay-probability-calculator', 
      { validate, normalize, process, verify, explain }, 
      { carrier }
    );
    setResult(res);
    setLoading(false);
  };

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Select Your Network Provider</label>
        <select 
          value={carrier}
          onChange={e => setCarrier(e.target.value)}
          className="w-full p-8 bg-slate-50 border border-slate-200 rounded-[2.5rem] text-2xl font-black outline-none focus:ring-8 focus:ring-indigo-500/5 transition-all shadow-inner"
        >
          <option>Jio</option>
          <option>Airtel</option>
          <option>Vi (Vodafone Idea)</option>
          <option>BSNL</option>
          <option>Other / International</option>
        </select>
      </div>

      <button 
        onClick={handleRun}
        disabled={loading}
        className="w-full py-8 bg-indigo-600 text-white rounded-[2.5rem] font-black text-2xl shadow-2xl transition-all active:scale-95 disabled:opacity-50"
      >
        {loading ? "Simulating Carrier Path..." : "Calculate OTP Probability"}
      </button>

      {result && (
        <div className="animate-in zoom-in-95 duration-500 space-y-6">
           {result.success ? (
             <div className={`p-10 rounded-[3.5rem] border-2 ${result.data.successProb > 85 ? 'bg-emerald-50 border-emerald-100' : 'bg-amber-50 border-amber-100'}`}>
                <div className="flex items-center justify-between mb-8">
                   <div className="space-y-1">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Arrival Probability</span>
                      <div className="text-6xl font-black text-slate-900">{result.data.successProb}%</div>
                   </div>
                   <div className="text-right space-y-1">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Est. Wait</span>
                      <div className="text-4xl font-black text-indigo-600">{result.data.estWait}s</div>
                   </div>
                </div>
                <div className="space-y-3 mb-10">
                   {result.data.findings.map((f: string, i: number) => (
                     <div key={i} className="flex items-center gap-3 p-4 bg-white/50 rounded-2xl border border-slate-100 font-bold text-slate-600 text-sm italic">
                        <span>●</span> {f}
                     </div>
                   ))}
                </div>
                <p className="text-sm font-medium text-slate-500 border-t pt-6 leading-relaxed">
                  " {result.explanation} "
                </p>
             </div>
           ) : <div className="p-10 bg-rose-50 rounded-3xl text-rose-700 font-bold">{result.error}</div>}
        </div>
      )}
    </div>
  );
};

export default OtpCalculator;
