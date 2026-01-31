
import React, { useState } from 'react';
import { executeTool } from '../../core/executeTool';
import { validate } from './validate';
import { normalize } from './normalize';
import { process } from './process';
import { verify } from './verify';
import { explain } from './explain';
import ToolLayout from '../../components/ToolLayout';

const OtpCalculator: React.FC = () => {
  const [carrier, setCarrier] = useState("jio");
  const [signal, setSignal] = useState(4);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    setLoading(true);
    // Fix: Wrapped arguments in a single object as expected by executeTool
    const res = await executeTool({
      input: { carrier, signal },
      validate,
      normalize,
      process,
      verify,
      explain
    });
    setResult(res);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <ToolLayout
        title="OTP Arrival Probability"
        description="Predict SMS delivery success based on current carrier load."
        icon="🌐"
        input={
          <div className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Network Carrier</label>
              <select 
                value={carrier} 
                onChange={e => setCarrier(e.target.value)}
                className="w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all"
              >
                <option value="jio">Jio / Private (Fiber)</option>
                <option value="airtel">Airtel / Private</option>
                <option value="bsnl">BSNL / Government</option>
                <option value="international">International Roaming</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Signal Strength ({signal}/5)</label>
              <input 
                type="range" min="1" max="5" value={signal}
                onChange={e => setSignal(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
          </div>
        }
        actions={
          <button 
            onClick={handleRun} 
            disabled={loading}
            className="w-full py-8 bg-indigo-600 text-white rounded-[2.5rem] font-black text-2xl shadow-2xl hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? "Simulating Signal Path..." : "Calculate Probability"}
          </button>
        }
        result={result && (
          <div className={`p-10 rounded-[3rem] border-2 animate-in zoom-in-95 duration-500 ${result.success ? 'bg-emerald-50 border-emerald-100' : 'bg-rose-50 border-rose-100'}`}>
            {result.success ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-black text-emerald-900 uppercase">Analysis Resolved</h3>
                  <span className="text-4xl font-black text-slate-900">{Math.round(result.data.probability * 100)}%</span>
                </div>
                <p className="text-lg font-medium text-emerald-800 italic">" {result.explanation} "</p>
              </div>
            ) : (
              <p className="text-rose-700 font-bold">{result.error}</p>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default OtpCalculator;
