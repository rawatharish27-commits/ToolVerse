
import React, { useState, useMemo, useEffect } from 'react';
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { TOOLS } from '../../data/tools';
import { salaryCalculatorConfig, roiCalculatorConfig, emiCalculatorConfig } from '../../config/calculatorTools';
import OutputController from '../OutputController';

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
    
    if (slug === 'salary-calculator' && (!options.ctc || options.ctc <= 0)) {
      onError("Trust Failure: CTC must be a positive integer.");
      return;
    }

    setLoading(true);
    try {
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
        <div className="space-y-12 animate-in zoom-in-95 duration-500">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(mathResult).map(([k, v]) => (
                <div key={k} className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 flex flex-col justify-between items-start gap-4 hover:shadow-xl transition-all group">
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] group-hover:text-indigo-400">{k}</span>
                   <span className="text-3xl font-black text-slate-900 group-hover:text-indigo-600">{(v as string)}</span>
                </div>
              ))}
           </div>
           
           <OutputController 
             type="data" 
             data={mathResult} 
             fileName={`toolverse_finance_${slug}_${Date.now()}.json`}
             onSuccess={onSuccess}
           />
        </div>
      )}
    />
  );
};

export default FinanceTools;
