
import React, { useState } from 'react';
import { useToolRunner } from '../../core/useToolRunner';
import * as pipeline from './index';

const AutoFillAnalyzer: React.FC = () => {
  const [input, setInput] = useState("");
  const { run, loading, result } = useToolRunner<string, any>(pipeline);

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Paste Input Tag or Field Name</label>
        <textarea 
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder='e.g. <input name="txt_1" id="id_val_99">'
          className="w-full h-40 p-6 bg-slate-50 border border-slate-200 rounded-[2rem] font-mono text-sm outline-none focus:ring-8 focus:ring-indigo-500/5 transition-all shadow-inner"
        />
      </div>

      <button 
        onClick={() => run(input)}
        disabled={loading || !input}
        className="w-full py-8 bg-indigo-600 text-white rounded-[2.5rem] font-black text-xl shadow-2xl transition-all active:scale-95 disabled:opacity-50"
      >
        {loading ? "Analyzing DOM Logic..." : "Analyze Rejection Reason"}
      </button>

      {result && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-500">
           {result.success ? (
             <div className={`p-10 rounded-[3.5rem] border-2 ${result.data.foundIssues ? 'bg-amber-50 border-amber-100' : 'bg-emerald-50 border-emerald-100'}`}>
                <h3 className="text-2xl font-black mb-6 uppercase tracking-tight">Verdict: {result.data.verdict}</h3>
                <ul className="space-y-4 mb-8">
                   {result.data.issues.map((iss: string, i: number) => (
                     <li key={i} className="flex items-start gap-3 p-4 bg-white/50 rounded-2xl border border-white/20 font-bold text-slate-700 text-sm">
                        <span className="text-amber-600">•</span> {iss}
                     </li>
                   ))}
                </ul>
                <div className="p-6 bg-slate-900 rounded-[2rem] text-white">
                   <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-2">Expert Strategy</p>
                   <p className="text-sm font-medium leading-relaxed italic text-slate-300">" {result.explanation} "</p>
                </div>
             </div>
           ) : <div className="p-10 bg-rose-50 rounded-3xl text-rose-700 font-bold border border-rose-100">{result.error}</div>}
        </div>
      )}
    </div>
  );
};

export default AutoFillAnalyzer;
// Exporting pipeline parts for the runner
export { validate } from './validate';
export { normalize } from './normalize';
export { process } from './process';
export { verify } from './verify';
export { explain } from './explain';
