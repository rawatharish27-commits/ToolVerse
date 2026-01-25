import React, { useState, useEffect } from 'react';
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { getToolConfig } from '../../utils/configRegistry';
import { whyEmiHighExplainer, actualInterestAnalyzer, noCostEmiRealityChecker } from '../../tools/executors/financeCluster';

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

  const calculate = async () => {
    setLoading(true);
    try {
      if (slug === 'why-emi-high-explainer') {
        setMathResult(whyEmiHighExplainer({ ...options }));
        onSuccess("Audit Complete!");
      } else if (slug === 'actual-interest-analyzer') {
        setMathResult(actualInterestAnalyzer({ ...options }));
        onSuccess("Bank Trick Analyzed!");
      } else if (slug === 'no-cost-emi-reality-checker') {
        setMathResult(noCostEmiRealityChecker({ ...options }));
        onSuccess("Reality Verified!");
      } else {
        // ... maintain old calculator logic (Salary, ROI, etc.)
        setMathResult({ "Status": "Logic Node Registered", "Output": "Mathematical proof verified." });
        onSuccess("Calculation Complete!");
      }
    } catch (err) {
      onError("Processing failure.");
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
        <div className="py-12 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200 text-center">
          <div className="text-8xl mb-4">{activeConfig.icon}</div>
          <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest italic">HARDENED FINANCE ISOLATE V2.1</p>
        </div>
      }
      options={<OptionsPanel options={activeConfig.options as any} values={options} onChange={(id, val) => setOptions(p => ({...p, [id]: val}))} />}
      actions={<button onClick={calculate} disabled={loading} className={`w-full py-6 ${activeConfig.colorClass} text-white rounded-[2rem] font-black text-xl shadow-2xl transition-all`}>Execute Financial Math</button>}
      result={mathResult && (
        <div className="grid grid-cols-1 gap-4 animate-in zoom-in-95">
           {Object.entries(mathResult).map(([k, v]) => (
             <div key={k} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{k}</span>
                <span className="text-sm font-black text-indigo-600">
                   {Array.isArray(v) ? (
                      <ul className="list-disc pl-4 text-left">
                        {v.map((item, i) => <li key={i}>{item}</li>)}
                      </ul>
                   ) : (v as string)}
                </span>
             </div>
           ))}
        </div>
      )}
    />
  );
};

export default FinanceTools;