
import React, { useState, useEffect } from 'react';
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { getToolConfig } from '../../utils/configRegistry';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const FinanceTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [options, setOptions] = useState<Record<string, any>>({});
  const [mathResult, setMathResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const activeConfig = getToolConfig(slug);

  useEffect(() => {
    const initial: Record<string, any> = {};
    if (activeConfig.options) {
      activeConfig.options.forEach((opt: any) => initial[opt.id] = opt.default);
    }
    setOptions(initial);
    setMathResult(null);
  }, [slug, activeConfig]);

  const calculate = () => {
    setLoading(true);
    setTimeout(() => {
      try {
        let res: any = null;
        if (slug === 'salary-calculator') {
          const ctc = options.ctc || 1200000;
          const monthly = ctc / 12;
          const tax = ctc > 700000 ? (ctc * 0.15) / 12 : 0; // Simple India New Regime logic
          res = {
            "Gross Monthly": `₹${Math.round(monthly).toLocaleString()}`,
            "Monthly Tax (Est)": `₹${Math.round(tax).toLocaleString()}`,
            "Take-Home Pay": `₹${Math.round(monthly - tax - 1800).toLocaleString()}`,
            "Note": "Includes PF and basic tax estimates for FY 24-25."
          };
        } else if (slug === 'roi-calculator') {
          const gain = options.amountReturned - options.amountInvested;
          const roi = (gain / options.amountInvested) * 100;
          res = {
            "Total Gain/Loss": `₹${gain.toLocaleString()}`,
            "Total ROI": `${roi.toFixed(2)}%`,
            "Annualized ROI": `${(roi / options.tenureYears).toFixed(2)}%`,
            "Verdict": roi > 0 ? "Profitable Investment" : "Loss-making Investment"
          };
        }
        setMathResult(res);
        onSuccess("Calculation Complete!");
      } catch (e) {
        onError("Math engine fault.");
      } finally {
        setLoading(false);
      }
    }, 400);
  };

  return (
    <ToolLayout
      title={activeConfig.title}
      description={activeConfig.description}
      icon={activeConfig.icon}
      colorClass={activeConfig.colorClass}
      input={
        <div className="py-12 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200 text-center">
          <div className="text-8xl mb-4">{activeConfig.icon}</div>
          <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest italic">PRO FINANCIAL ISOLATE ACTIVE</p>
        </div>
      }
      options={<OptionsPanel options={activeConfig.options as any} values={options} onChange={(id, val) => setOptions(p => ({...p, [id]: val}))} />}
      actions={<button onClick={calculate} disabled={loading} className={`w-full py-6 ${activeConfig.colorClass} text-white rounded-2xl font-black text-xl shadow-2xl`}>Execute Financial Logic</button>}
      result={mathResult && (
        <div className="grid grid-cols-1 gap-4 animate-in zoom-in-95">
           {Object.entries(mathResult).map(([k, v]) => (
             <div key={k} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-2">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{k}</span>
                <span className="text-sm font-black text-indigo-600">{(v as string)}</span>
             </div>
           ))}
        </div>
      )}
    />
  );
};

export default FinanceTools;
