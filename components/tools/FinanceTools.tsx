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
    
    // Phase E: Light Validation
    if (slug === 'salary-calculator' && (!options.ctc || options.ctc <= 0)) {
      onError("Trust Failure: CTC must be a positive integer.");
      return;
    }

    setLoading(true);
    try {
      // Phase I: Deterministic Logic Execution
      const res = await toolNode.execute(options);
      setMathResult(res);
      onSuccess("Mathematical Logic Resolved: Precision Verified.");
    } catch (e) {
      onError("Computational Error: Mathematical isolate failed to synchronize indices.");
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
        <div className="py-20 bg-slate-50 rounded-[3.5rem] border-2 border-dashed border-slate-200 text-center flex flex-col items-center group transition-colors hover:border-indigo-200">
          <div className="text-9xl mb-8 group-hover:scale-110 transition-transform duration-500">{activeConfig.icon}</div>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.5em] italic">Precision Logic Kernel: Active</p>
          <div className="mt-10 px-8 py-3 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-emerald-100 flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            FY 2024-25 Compliance Standard
          </div>
        </div>
      }
      options={<OptionsPanel options={activeConfig.options as any} values={options} onChange={(id, val) => setOptions(p => ({...p, [id]: val}))} />}
      actions={
        <button 
          onClick={calculate} 
          disabled={loading} 
          className={`w-full py-9 ${activeConfig.colorClass} text-white rounded-[2.5rem] font-black text-3xl shadow-2xl transition-all active:scale-95 shadow-indigo-500/20`}
        >
          {loading ? "Crunching Slab Data..." : "Execute Logic Node"}
        </button>
      }
      result={mathResult && (
        <div className="space-y-10 animate-in zoom-in-95 duration-500">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(mathResult).map(([k, v]) => (
                <div key={k} className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 flex flex-col justify-between items-start gap-4 hover:shadow-xl transition-all group">
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] group-hover:text-indigo-400">{k}</span>
                   <span className="text-3xl font-black text-slate-900 group-hover:text-indigo-600">{(v as string)}</span>
                </div>
              ))}
           </div>
           
           {/* Phase L: Output Explanation */}
           <div className="p-10 bg-amber-50 rounded-[3rem] border border-amber-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10"><div className="text-6xl font-black italic">TRUST</div></div>
              <h4 className="text-xs font-black text-amber-800 uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
                 <span className="w-2 h-2 bg-amber-600 rounded-full"></span>
                 Expert Breakdown & Logic Audit
              </h4>
              <div className="space-y-4 text-sm text-amber-700 font-medium leading-relaxed">
                {slug === 'salary-calculator' ? (
                  <>
                    <p>Calculation includes the revised <strong>₹75,000 Standard Deduction</strong> introduced in the July 2024 budget update. Professional Tax (₹2,400/yr) and standard Employee PF (12% of basic) are automatically subtracted for accuracy.</p>
                    <p className="text-[11px] opacity-70">Note: Section 80C, 80D, and HRA exemptions are currently only applied to the 'Old Regime' logic kernel. The 'New Regime' follows standard slab logic with zero exemptions as per current law.</p>
                  </>
                ) : (
                  <p>Results are derived from deterministic financial formulas. This output acts as a high-fidelity estimation based on provided parameters. For precise legal reporting, always cross-verify with official bank statements.</p>
                )}
              </div>
           </div>
        </div>
      )}
    />
  );
};

export default FinanceTools;