import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { 
  emiCalculatorConfig, 
  sipCalculatorConfig, 
  gstCalculatorConfig, 
  loanCalculatorConfig, 
  roiCalculatorConfig, 
  bmiCalculatorConfig,
  currencyConverterConfig,
  compoundInterestConfig,
  mortgageCalculatorConfig,
  incomeTaxPlannerConfig,
  inflationCalculatorConfig,
  ageCalculatorConfig,
  percentageCalculatorConfig,
  discountCalculatorConfig,
  simpleInterestConfig
} from '../../config/calculatorTools';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const FIN_ORCHESTRATOR_ROLE = `You are ToolVerse AI Orchestrator. Output professional financial strategy reports.`;

const EXCHANGE_RATES: Record<string, number> = { USD: 1, EUR: 0.92, GBP: 0.79, INR: 83.15, JPY: 151.20, CAD: 1.35, AUD: 1.53 };

const FinanceTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const configs = [
    emiCalculatorConfig, sipCalculatorConfig, gstCalculatorConfig, 
    loanCalculatorConfig, roiCalculatorConfig, bmiCalculatorConfig,
    currencyConverterConfig, compoundInterestConfig, mortgageCalculatorConfig,
    incomeTaxPlannerConfig, inflationCalculatorConfig, ageCalculatorConfig,
    percentageCalculatorConfig, discountCalculatorConfig, simpleInterestConfig
  ];
  const targetConfig = configs.find(c => c.slug === slug) || emiCalculatorConfig;

  const [options, setOptions] = useState<Record<string, any>>({});
  const [mathResult, setMathResult] = useState<any>(null);
  const [orchestrationData, setOrchestrationData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initial: Record<string, any> = {};
    targetConfig.options.forEach(opt => initial[opt.id] = (opt as any).default);
    setOptions(initial);
    setMathResult(null);
    setOrchestrationData(null);
  }, [slug]);

  const handleOptionChange = (id: string, value: any) => {
    setOptions(prev => ({ ...prev, [id]: value }));
  };

  const calculate = async () => {
    setLoading(true);
    try {
      let mRes: any = null;

      if (slug === 'simple-interest-calc') {
        const P = Number(options.siPrincipal);
        const R = Number(options.siRate);
        const T = Number(options.siTenure);
        const SI = (P * R * T) / 100;
        mRes = { val1: SI.toFixed(2), val2: (P + SI).toFixed(2), val3: P, labels: ["Interest Earned", "Total Maturity", "Principal"] };
      }
      else if (slug === 'age-calculator') {
        const dob = new Date(options.dob);
        const target = options.targetDate ? new Date(options.targetDate) : new Date();
        let years = target.getFullYear() - dob.getFullYear();
        let months = target.getMonth() - dob.getMonth();
        let days = target.getDate() - dob.getDate();
        if (days < 0) { months--; days += 30; }
        if (months < 0) { years--; months += 12; }
        mRes = { val1: years, val2: months, val3: days, labels: ["Years", "Months", "Days"] };
      } 
      else if (slug === 'percentage-calculator') {
        const x = Number(options.valX);
        const y = Number(options.valY);
        let res = 0;
        if (options.mode === "What is X% of Y") res = (x / 100) * y;
        else if (options.mode === "X is what % of Y") res = (x / y) * 100;
        else res = ((y - x) / x) * 100;
        mRes = { val1: res.toFixed(2), val2: x, val3: y, labels: ["Result", "Value X", "Value Y"] };
      }
      else if (slug === 'discount-calculator') {
        const p = Number(options.price);
        const d = Number(options.discount);
        const t = Number(options.tax || 0);
        const savings = (p * d) / 100;
        const subtotal = p - savings;
        const taxVal = (subtotal * t) / 100;
        const final = subtotal + taxVal;
        mRes = { val1: final.toFixed(2), val2: savings.toFixed(2), val3: taxVal.toFixed(2), labels: ["Final Price", "You Save", "Sales Tax"] };
      }
      else if (slug === 'compound-interest-calc') {
        const P = Number(options.ciPrincipal);
        const r = Number(options.ciRate) / 100;
        const t = Number(options.ciTenure);
        const PMT = Number(options.ciContribution);
        const nMap: Record<string, number> = { Yearly: 1, "Half-Yearly": 2, Quarterly: 4, Monthly: 12 };
        const n = nMap[options.ciFrequency];
        const compoundFactor = Math.pow(1 + r/n, n * t);
        const total = (P * compoundFactor) + (PMT * ((compoundFactor - 1) / (r/n)) * (1 + r/n));
        mRes = { val1: total.toFixed(0), val2: (total - P).toFixed(0), val3: P, labels: ["Total Wealth", "Interest", "Invested"] };
      }
      else if (slug === 'emi-calculator') {
        const P = Number(options.principal);
        const r = Number(options.rate) / 12 / 100;
        const n = Number(options.tenure) * 12;
        const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        mRes = { val1: emi.toFixed(0), val2: (emi * n - P).toFixed(0), val3: (emi * n).toFixed(0), labels: ["Monthly EMI", "Interest", "Total Payable"] };
      }

      setMathResult(mRes);
      onSuccess("Calculation Complete!");
    } catch (err) {
      onError("Check input values.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      title={targetConfig.title}
      description={targetConfig.description}
      icon={targetConfig.icon}
      colorClass={targetConfig.colorClass}
      input={<div className="flex flex-col items-center py-8 bg-slate-50 rounded-[3rem] border border-slate-100"><div className="text-7xl mb-4">{targetConfig.icon}</div><p className="text-slate-500 font-black text-sm uppercase tracking-widest">{targetConfig.title} Engine Active</p></div>}
      options={<OptionsPanel options={targetConfig.options as any} values={options} onChange={handleOptionChange} />}
      actions={<button onClick={calculate} disabled={loading} className={`w-full py-7 ${targetConfig.colorClass} text-white rounded-[2.5rem] font-black text-2xl shadow-2xl transition-all active:scale-95 disabled:opacity-50`}>{loading ? "Processing..." : "Calculate Now"}</button>}
      result={mathResult && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-4">
          {mathResult.labels.map((label: string, i: number) => (
            <div key={i} className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-200 text-center shadow-inner">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{label}</div>
              <div className="text-3xl font-black text-slate-900 truncate">
                 {slug === 'age-calculator' ? mathResult[`val${i+1}`] : (slug === 'percentage-calculator' && i === 0 ? `${mathResult.val1}%` : `₹${Number(mathResult[`val${i+1}`]).toLocaleString()}`)}
              </div>
            </div>
          ))}
        </div>
      )}
    />
  );
};

export default FinanceTools;