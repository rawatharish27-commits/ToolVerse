
import React, { useState } from 'react';
import { useToolRunner } from '../../core/useToolRunner';
import { validate } from './validate';
import { normalize } from './normalize';
import { process } from './process';
import { verify } from './verify';
import { explain } from './explain';

const OtpCalculator: React.FC = () => {
  const [carrier, setCarrier] = useState("Jio");
  const { run, loading, result } = useToolRunner({ validate, normalize, process, verify, explain });

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Select Mobile Operator</label>
        <select 
          value={carrier}
          onChange={e => setCarrier(e.target.value)}
          className="w-full p-6 bg-slate-50 border border-slate-200 rounded-3xl text-xl font-black outline-none focus:ring-8 focus:ring-indigo-500/5 transition-all shadow-inner"
        >
          <option value="government">Government Network (BSNL/MTNL)</option>
          <option value="private">Private Network (Airtel/Jio/Vi)</option>
          <option value="international">International Roaming</option>
        </select>
      </div>

      <button 
        onClick={() => run({ carrier })}
        disabled={loading}
        className="w-full py-8 bg-indigo-600 text-white rounded-[2.5rem] font-black text-2xl shadow-2xl transition-all active:scale-95 disabled:opacity-50"
      >
        {loading ? "Simulating Network Path..." : "Calculate Delivery Probability"}
      </button>

      {result && (
        <div className={`p-10 rounded-[3.5rem] border-2 animate-in zoom-in-95 duration-500 ${result.success ? 'bg-emerald-50 border-emerald-100' : 'bg-rose-50 border-rose-100'}`}>
          {result.success ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Arrival Probability</span>
                <span className="text-4xl font-black text-slate-900">{(result.data as any).probability * 100}%</span>
              </div>
              <p className="text-sm font-bold text-slate-700 italic leading-relaxed">" {result.explanation} "</p>
            </div>
          ) : (
            <p className="text-rose-700 font-bold">{result.error}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default OtpCalculator;
