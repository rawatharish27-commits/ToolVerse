
import React, { useState } from 'react';
import ToolLayout from '../../components/ToolLayout';
import OptionsPanel from '../../components/OptionsPanel';
import OutputController from '../../components/OutputController';

const GST_SLABS = [5, 12, 18, 28];

const GSTCalculator: React.FC = () => {
  const [amount, setAmount] = useState(1000);
  const [slab, setSlab] = useState(18);
  const [mode, setMode] = useState<'add' | 'remove'>('add');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    let base, gst, total;
    if (mode === 'add') {
      base = amount;
      gst = (amount * slab) / 100;
      total = base + gst;
    } else {
      total = amount;
      base = amount / (1 + slab / 100);
      gst = total - base;
    }

    setResult({
      "Base Amount": `₹${base.toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
      "Total GST": `₹${gst.toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
      "CGST (Center)": `₹${(gst/2).toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
      "SGST (State)": `₹${(gst/2).toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
      "Grand Total": `₹${total.toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
      "Tax Slab": `${slab}%`
    });
  };

  return (
    <ToolLayout
      title="GST Calculator (India)"
      description="Multi-slab tax breakdown for FY 24-25 Indian compliance."
      icon="🏷️"
      input={
        <div className="space-y-8">
           <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Initial Amount (INR)</label>
              <input 
                type="number" 
                value={amount} 
                onChange={e => setAmount(Number(e.target.value))}
                className="w-full p-6 bg-slate-50 border-none rounded-3xl text-4xl font-black text-slate-800 outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-inner"
              />
           </div>
           
           <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">GST Slab</label>
                <select 
                  value={slab} 
                  onChange={e => setSlab(Number(e.target.value))}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold"
                >
                  {GST_SLABS.map(s => <option key={s} value={s}>{s}% GST</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Mode</label>
                <select 
                  value={mode} 
                  onChange={e => setMode(e.target.value as any)}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold"
                >
                  <option value="add">Add GST (+)</option>
                  <option value="remove">Remove GST (-)</option>
                </select>
              </div>
           </div>
        </div>
      }
      actions={
        <button 
          onClick={calculate}
          className="w-full py-8 bg-emerald-600 text-white rounded-[2.5rem] font-black text-2xl shadow-2xl active:scale-95 transition-all"
        >
          GENERATE BREAKDOWN
        </button>
      }
      result={result && (
        <div className="space-y-8 animate-in zoom-in-95 duration-500">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(result).map(([k, v]) => (
                <div key={k} className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col gap-1">
                   <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{k}</span>
                   <span className={`text-2xl font-black ${k.includes('Total') ? 'text-emerald-600' : 'text-slate-900'}`}>{v as string}</span>
                </div>
              ))}
           </div>
           <OutputController type="data" data={result} fileName="gst_breakdown.json" onSuccess={() => {}} />
        </div>
      )}
    />
  );
};

export default GSTCalculator;
