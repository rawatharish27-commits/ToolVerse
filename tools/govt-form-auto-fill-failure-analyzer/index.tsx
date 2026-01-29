
import React, { useState } from 'react';
import { PipelineRunner } from '../../core/pipeline';
import { validate } from './validate';
import { normalize } from './normalize';
import { process } from './process';
import { verify } from './verify';
import { explain } from './explain';

const AutoFillAnalyzer: React.FC = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleRun = async () => {
    setLoading(true);
    const res = await PipelineRunner.run('govt-form-auto-fill-failure-analyzer', 
      { validate, normalize, process, verify, explain }, 
      input
    );
    setResult(res);
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Paste the Input Tag or Field Name</label>
        <textarea 
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder='e.g. <input name="txt_1" id="id_val_99"> or just "txt_1"'
          className="w-full h-40 p-6 bg-slate-50 border border-slate-200 rounded-[2rem] font-mono text-sm outline-none focus:ring-8 focus:ring-indigo-500/5 transition-all shadow-inner"
        />
        <p className="text-[10px] text-slate-400 px-2 italic">Tip: Right-click the field on the portal and select 'Inspect' to find this code.</p>
      </div>

      <button 
        onClick={handleRun}
        disabled={loading || !input}
        className="w-full py-8 bg-indigo-600 text-white rounded-[2.5rem] font-black text-xl shadow-2xl transition-all active:scale-95 disabled:opacity-50"
      >
        {loading ? "Analyzing DOM Pattern..." : "Find Blocking Reason"}
      </button>

      {result && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-500">
           {result.success ? (
             <div className={`p-10 rounded-[3.5rem] border-2 ${result.data.found ? 'bg-amber-50 border-amber-100' : 'bg-emerald-50 border-emerald-100'}`}>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white text-2xl font-black ${result.data.found ? 'bg-amber-600' : 'bg-emerald-600'}`}>
                    {result.data.found ? '!' : '✓'}
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tight">Verdict: {result.data.verdict}</h3>
                </div>
                
                <ul className="space-y-4 mb-8">
                   {result.data.issues.map((iss: string, i: number) => (
                     <li key={i} className="flex items-start gap-3 p-4 bg-white/50 rounded-2xl border border-white/20 font-bold text-slate-700 text-sm italic">
                        <span className="text-amber-600">•</span> {iss}
                     </li>
                   ))}
                </ul>

                <div className="p-6 bg-slate-900 rounded-[2rem] text-white">
                   <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-2">Technical Insight</p>
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
