import React, { useState, useMemo, useEffect } from 'react';
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { TOOLS } from '../../data/tools';
import { salaryCalculatorConfig, roiCalculatorConfig, emiCalculatorConfig } from '../../config/calculatorTools';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const FinanceTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [options, setOptions] = useState<Record<string, any>>({});
  const [mathResult, setMathResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const toolNode = useMemo(() => TOOLS.find(t => t.slug === slug), [slug]);
  const activeConfig = useMemo(() => [
    salaryCalculatorConfig, roiCalculatorConfig, emiCalculatorConfig
  ].find(c => c.slug === slug) || salaryCalculatorConfig, [slug]);

  useEffect(() => {
    const initial: Record<string, any> = {};
    activeConfig.options.forEach((opt: any) => initial[opt.id] = opt.default);
    setOptions(initial);
    setMathResult(null);
  }, [slug, activeConfig]);

  const calculate = async () => {
    if (!toolNode?.execute) return;
    setLoading(true);
    try {
      const res = await toolNode.execute(options);
      setMathResult(res);
      onSuccess("Financial Logic Resolved");
    } catch (e) {
      onError("Mathematical Isolate Failure.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      title={activeConfig.title}
      description={activeConfig.description}
      icon={activeConfig.icon}
      colorClass={activeConfig.colorClass}
      input={
        <div className="py-12 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200 text-center flex flex-col items-center">
          <div className="text-8xl mb-6">{activeConfig.icon}</div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Logic Kernel: Active</p>
          <div className="mt-8 px-6 py-2 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-100">
            Phase H: Mathematical Precision Verified
          </div>
        </div>
      }
      options={<OptionsPanel options={activeConfig.options as any} values={options} onChange={(id, val) => setOptions(p => ({...p, [id]: val}))} />}
      actions={<button onClick={calculate} disabled={loading} className={`w-full py-8 ${activeConfig.colorClass} text-white rounded-[2.5rem] font-black text-2xl shadow-2xl transition-all active:scale-95`}>{loading ? "Synchronizing Indices..." : "Execute Logic"}</button>}
      result={mathResult && (
        <div className="space-y-8 animate-in zoom-in-95">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(mathResult).map(([k, v]) => (
                <div key={k} className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 flex flex-col justify-between items-start gap-4">
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{k}</span>
                   <span className="text-2xl font-black text-indigo-600">{(v as string)}</span>
                </div>
              ))}
           </div>
           {slug === 'salary-calculator' && (
             <div className="p-8 bg-amber-50 rounded-[2.5rem] border border-amber-100">
                <h4 className="text-xs font-black text-amber-800 uppercase tracking-widest mb-3">Phase L: Output Explanation</h4>
                <p className="text-xs text-amber-700 font-medium leading-relaxed">
                  The result includes the new <strong>₹75,000 Standard Deduction</strong> for FY 24-25. Professional Tax (₹2,400/year) and standard PF (12% of basic) are subtracted. No 80C or HRA deductions are considered for the New Regime.
                </p>
             </div>
           )}
        </div>
      )}
    />
  );
};

export default FinanceTools;
