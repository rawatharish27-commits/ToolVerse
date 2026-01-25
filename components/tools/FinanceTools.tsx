import React, { useState, useEffect } from 'react';
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { 
  percentageCalculatorConfig, simpleInterestConfig, compoundInterestConfig, 
  ageCalculatorConfig, discountCalculatorConfig, emiCalculatorConfig, 
  bmiCalculatorConfig, gstCalculatorConfig, profitLossConfig, loanCalculatorConfig,
  roiCalculatorConfig, durationCalculatorConfig, salaryCalculatorConfig,
  offerComparisonConfig, hiddenChargesConfig, inflationCalculatorConfig
} from '../../config/calculatorTools';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const FinanceTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [options, setOptions] = useState<Record<string, any>>({});
  const [mathResult, setMathResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const activeConfig = [
    percentageCalculatorConfig, simpleInterestConfig, compoundInterestConfig,
    ageCalculatorConfig, discountCalculatorConfig, emiCalculatorConfig,
    bmiCalculatorConfig, gstCalculatorConfig, profitLossConfig, loanCalculatorConfig,
    roiCalculatorConfig, durationCalculatorConfig, salaryCalculatorConfig,
    offerComparisonConfig, hiddenChargesConfig, inflationCalculatorConfig
  ].find(c => c.slug === slug) || percentageCalculatorConfig;

  useEffect(() => {
    const initial: Record<string, any> = {};
    activeConfig.options.forEach(opt => initial[opt.id] = (opt as any).default);
    setOptions(initial);
    setMathResult(null);
  }, [slug, activeConfig]);

  const calculate = async () => {
    setLoading(true);
    try {
      let res: any = null;
      if (slug === 'salary-calculator') {
        const ctc = options.ctc;
        const bonus = options.bonus;
        const taxable = ctc - bonus - 75000; // Standard Deduction for New Regime 2024
        
        let tax = 0;
        if (taxable > 300000) tax += (Math.min(taxable, 600000) - 300000) * 0.05;
        if (taxable > 600000) tax += (Math.min(taxable, 900000) - 600000) * 0.10;
        if (taxable > 900000) tax += (Math.min(taxable, 1200000) - 900000) * 0.15;
        if (taxable > 1200000) tax += (Math.min(taxable, 1500000) - 1200000) * 0.20;
        if (taxable > 1500000) tax += (taxable - 1500000) * 0.30;
        
        // EPF: 12% of Basic (Assuming Basic is 50% of CTC)
        const pf = Math.min((ctc * 0.5) * 0.12, 1800 * 12);
        const yearlyTakeHome = ctc - tax - pf;
        res = {
          main: `₹${Math.round(yearlyTakeHome/12).toLocaleString()}`,
          label: "Monthly Take-Home",
          secondary: [
            { l: "Yearly Tax", v: `₹${Math.round(tax).toLocaleString()}` },
            { l: "Monthly PF", v: `₹${Math.round(pf/12).toLocaleString()}` },
            { l: "Yearly In-hand", v: `₹${Math.round(yearlyTakeHome).toLocaleString()}` }
          ]
        };
      } else if (slug === 'job-offer-comparison') {
        const net1 = options.base1 + options.stocks1;
        const net2 = options.base2 + options.stocks2;
        const diff = Math.abs(net2 - net1);
        res = {
          main: diff === 0 ? "Equal Value" : `₹${diff.toFixed(1)}L Difference`,
          label: "Annual Total Variance",
          secondary: [
            { l: "Offer 1 Total", v: `${net1} LPA` },
            { l: "Offer 2 Total", v: `${net2} LPA` },
            { l: "Growth Winner", v: net2 > net1 ? "Offer 2" : "Offer 1" }
          ]
        };
      } else if (slug === 'hidden-charges-calculator') {
        const totalPaid = (options.emiAmount * options.tenure) + options.processingFee;
        const extraCost = totalPaid - options.productPrice;
        const effectiveInterest = ((extraCost / options.productPrice) * 100).toFixed(2);
        res = {
          main: `₹${extraCost.toLocaleString()}`,
          label: "Total Hidden Cost",
          secondary: [
            { l: "Total Repayment", v: `₹${totalPaid.toLocaleString()}` },
            { l: "Effective Interest", v: `${effectiveInterest}%` },
            { l: "Real Price Paid", v: `₹${totalPaid.toLocaleString()}` }
          ]
        };
      } else if (slug === 'inflation-impact-calculator') {
        const futureValue = options.amount * Math.pow(1 + options.rate / 100, options.years);
        const purchasingPower = options.amount / Math.pow(1 + options.rate / 100, options.years);
        res = {
          main: `₹${Math.round(purchasingPower).toLocaleString()}`,
          label: "Current Purchasing Power",
          secondary: [
            { l: "Future Cost", v: `₹${Math.round(futureValue).toLocaleString()}` },
            { l: "Value Decline (%)", v: `${Math.round((1 - purchasingPower/options.amount) * 100)}%` }
          ]
        };
      }

      setMathResult(res || { main: "N/A", label: "Result" });
      onSuccess("Calculation Optimized!");
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
          <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest">Financial Node Operational</p>
        </div>
      }
      options={<OptionsPanel options={activeConfig.options as any} values={options} onChange={(id, val) => setOptions(p => ({...p, [id]: val}))} />}
      actions={<button onClick={calculate} disabled={loading} className="w-full py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-xl shadow-2xl">Calculate Now</button>}
      result={mathResult && (
        <div className="p-10 bg-white border-2 border-slate-100 rounded-[3rem] text-center animate-in zoom-in-95">
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">{mathResult.label}</span>
           <div className="text-5xl md:text-7xl font-black text-slate-900">{mathResult.main}</div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
             {mathResult.secondary?.map((s: any, i: number) => (
               <div key={i} className="bg-slate-50 p-4 rounded-xl flex justify-between">
                  <span className="text-[9px] font-black text-slate-400 uppercase">{s.l}</span>
                  <span className="text-sm font-bold text-slate-700">{s.v}</span>
               </div>
             ))}
           </div>
        </div>
      )}
    />
  );
};

export default FinanceTools;