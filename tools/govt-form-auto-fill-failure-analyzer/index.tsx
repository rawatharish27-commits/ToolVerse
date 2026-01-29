
import React, { useState } from 'react';
import { validate } from './validate';
import { normalize } from './normalize';
import { process } from './process';
import { verify } from './verify';
import { explain } from './explain';
import AdSenseManager from '../../components/AdSenseManager';

const AutoFillAnalyzer: React.FC = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRun = async () => {
    setError(null);
    setResult(null);
    
    // Pipeline Execution
    const v = validate(input);
    if (!v.valid) { setError(v.error!); return; }

    setLoading(true);
    try {
      const n = normalize(input);
      const p = await process(n);
      const ver = verify(p);
      if (!ver.secure) throw new Error(ver.error);

      setResult({
        data: p,
        explanation: explain(p)
      });
    } catch (e: any) {
      setError(e.message || "Logic Error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 block mb-4">Paste <input> Tag or Portal URL</label>
        <textarea 
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder='e.g. <input name="txt_1" id="id_val_99">'
          className="w-full h-40 p-6 bg-slate-50 border border-slate-200 rounded-[2rem] font-mono text-sm outline-none focus:ring-8 focus:ring-indigo-500/5 transition-all"
        />
        <button 
          onClick={handleRun}
          disabled={loading || !input}
          className="w-full mt-6 py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-xl shadow-2xl transition-all active:scale-95 disabled:opacity-50"
        >
          {loading ? "Analyzing DOM Tree..." : "Analyze Rejection Reason"}
        </button>
      </div>

      {error && (
        <div className="p-8 bg-rose-50 border border-rose-100 rounded-[2rem] text-rose-600 font-bold text-center">
          ⚠️ {error}
        </div>
      )}

      {result && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="bg-emerald-50 border border-emerald-100 rounded-[3rem] p-10 mb-8">
            <h3 className="text-2xl font-black text-emerald-900 mb-6 tracking-tighter">Diagnostic Report</h3>
            <div className="space-y-6">
              {result.data.issues.map((iss: string, i: number) => (
                <div key={i} className="flex gap-4 items-start">
                  <span className="w-6 h-6 rounded-full bg-emerald-200 flex-shrink-0 flex items-center justify-center text-[10px] font-bold">!</span>
                  <div>
                    <p className="font-bold text-emerald-800">{iss}</p>
                    <p className="text-emerald-600 text-sm mt-1">{result.data.suggestions[i]}</p>
                  </div>
                </div>
              ))}
              {!result.data.foundIssues && (
                <p className="text-emerald-700 font-medium">✓ No anti-autofill attributes detected in this snippet.</p>
              )}
            </div>
            <p className="mt-10 pt-8 border-t border-emerald-200/50 text-emerald-800 font-medium italic">
              " {result.explanation} "
            </p>
          </div>
          
          <AdSenseManager slotId="RESULT_BOTTOM_AF" />
        </div>
      )}
    </div>
  );
};

export default AutoFillAnalyzer;
