import React, { useState, useMemo } from 'react';
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
  inflationCalculatorConfig
} from '../../config/calculatorTools';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const FIN_ORCHESTRATOR_ROLE = `
You are ToolVerse AI Orchestrator.
You act as a world-class Financial Advisor and Wealth Strategist.
You are not a chatbot. You are the internal brain of ToolVerse platform.

Follow this 9-step output structure strictly:
1. Understanding of User Goal: Summarize goal (Compounding, Mortgage, Tax, or Inflation).
2. Best Tool Category: Finance Tools.
3. Best Tool Name: The specific finance utility used.
4. Required Inputs: What parameters were calculated.
5. Recommended Settings: Explain why these growth/tax/loan settings were analyzed.
6. Processing Steps: Logic for math validation, compounding depth, or tax slab mapping.
7. Expected Result: The master strategy - specific steps to reach the financial goal.
8. Optimization Tips: Technical alpha (Refinancing tips, Tax-saving schemes, Asset allocation).
9. Next Action Suggestion: Technical next step.
`;

const EXCHANGE_RATES: Record<string, number> = {
  USD: 1, EUR: 0.92, GBP: 0.79, INR: 83.15, JPY: 151.20, CAD: 1.35, AUD: 1.53
};

const FinanceTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const isCI = slug === 'compound-interest-calc';
  const isMortgage = slug === 'mortgage-calculator';
  const isTax = slug === 'income-tax-planner';
  const isInflation = slug === 'inflation-calculator';
  const isOrchestrated = isCI || isMortgage || isTax || isInflation;

  const [options, setOptions] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    const configs = [
      emiCalculatorConfig, sipCalculatorConfig, gstCalculatorConfig, 
      loanCalculatorConfig, roiCalculatorConfig, bmiCalculatorConfig,
      currencyConverterConfig, compoundInterestConfig, mortgageCalculatorConfig,
      incomeTaxPlannerConfig, inflationCalculatorConfig
    ];
    const target = configs.find(c => c.slug === slug);
    if (target) {
      target.options.forEach(opt => initial[opt.id] = (opt as any).default);
    }
    return initial;
  });

  const [mathResult, setMathResult] = useState<any>(null);
  const [orchestrationData, setOrchestrationData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleOptionChange = (id: string, value: any) => {
    setOptions(prev => ({ ...prev, [id]: value }));
  };

  const callAIWithRetry = async (prompt: string, modelName: string, attempts = 3): Promise<string> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    for (let i = 0; i < attempts; i++) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
          config: { systemInstruction: FIN_ORCHESTRATOR_ROLE, temperature: 0.7 }
        });
        return response.text || "";
      } catch (err: any) {
        if (i === attempts - 1) throw err;
        await new Promise(resolve => setTimeout(resolve, 2000 * (i + 1)));
      }
    }
    return "";
  };

  const calculate = async () => {
    setLoading(true);
    setMathResult(null);
    setOrchestrationData(null);

    try {
      // 1. Math Core Execution (Client-Side)
      let mRes: any = null;
      if (isCI) {
        const P = Number(options.ciPrincipal);
        const r = Number(options.ciRate) / 100;
        const t = Number(options.ciTenure);
        const PMT = Number(options.ciContribution);
        const nMap: Record<string, number> = { Yearly: 1, "Half-Yearly": 2, Quarterly: 4, Monthly: 12 };
        const n = nMap[options.ciFrequency];
        const pmtN = options.ciContFreq === "Monthly" ? 12 : 1;
        
        // Final Amount = P(1+r/n)^(nt) + PMT * [((1+r/n)^(nt) - 1) / (r/n)]
        const compoundFactor = Math.pow(1 + r/n, n * t);
        const principalGrowth = P * compoundFactor;
        const contributionsGrowth = PMT * ((compoundFactor - 1) / (r/n)) * (1 + r/n);
        const total = principalGrowth + (PMT > 0 ? contributionsGrowth : 0);
        const invested = P + (PMT * pmtN * t);

        mRes = { 
          val1: total.toFixed(0), 
          val2: (total - invested).toFixed(0), 
          val3: invested.toFixed(0),
          labels: ["Total Wealth", "Interest Earned", "Total Invested"]
        };
      } else if (isMortgage) {
        const price = Number(options.mgHomePrice);
        const down = Number(options.mgDownPayment);
        const loan = price - down;
        const r = Number(options.mgRate) / 12 / 100;
        const n = parseInt(options.mgTenure) * 12;
        const emi = (loan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        const monthlyTax = Number(options.mgTax) / 12;
        const monthlyIns = Number(options.mgInsurance) / 12;

        mRes = {
          val1: (emi + monthlyTax + monthlyIns).toFixed(0),
          val2: (emi * n - loan).toFixed(0),
          val3: (emi * n + price - down).toFixed(0),
          labels: ["Monthly P&I + Tax", "Total Interest", "Total Loan Cost"]
        };
      } else if (isTax) {
        const income = Number(options.taxIncome);
        const invest = Number(options.taxInvest);
        let tax = 0;
        if (options.taxRegion === "USA") {
           // Simplified US Federal logic
           if (income < 11000) tax = income * 0.1;
           else if (income < 44000) tax = 1100 + (income - 11000) * 0.12;
           else tax = 5000 + (income - 44000) * 0.22;
        } else {
           tax = (income - invest) * 0.25;
        }
        mRes = {
          val1: (income - tax).toFixed(0),
          val2: tax.toFixed(0),
          val3: invest.toFixed(0),
          labels: ["Estimated Take-home", "Total Tax Liability", "Investments Considered"]
        };
      } else if (isInflation) {
        const amt = Number(options.infAmount);
        const r = Number(options.infRate) / 100;
        const t = Number(options.infYears);
        let res = 0;
        if (options.infMode === "Future Buying Power") {
          res = amt / Math.pow(1 + r, t);
        } else {
          res = amt * Math.pow(1 + r, t);
        }
        mRes = {
          val1: res.toFixed(0),
          val2: (amt - res).toFixed(0),
          val3: options.infRate,
          labels: ["Adjusted Value", "Buying Power Loss", "Avg Inflation %"]
        };
      } else if (slug === 'emi-calculator' || slug === 'loan-calculator') {
        const P = Number(slug === 'emi-calculator' ? options.principal : options.amount);
        const annualRate = Number(options.rate);
        const years = Number(options.tenure);
        const r = annualRate / 12 / 100;
        const n = years * 12;
        const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        mRes = { val1: emi.toFixed(0), val2: (emi * n - P).toFixed(0), val3: (emi * n).toFixed(0), labels: ["Monthly EMI", "Total Interest", "Total Payable"] };
      } else if (slug === 'sip-calculator') {
        const P = Number(options.monthly);
        const r = Number(options.rate) / 12 / 100;
        const n = Number(options.years) * 12;
        const fv = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
        mRes = { val1: (P * n).toFixed(0), val2: (fv - P * n).toFixed(0), val3: fv.toFixed(0), labels: ["Total Invested", "Est. Wealth Gain", "Maturity Value"] };
      } else if (slug === 'currency-converter') {
        const converted = (Number(options.amount) / EXCHANGE_RATES[options.from]) * EXCHANGE_RATES[options.to];
        mRes = { val1: `${options.amount} ${options.from}`, val2: `${converted.toFixed(2)} ${options.to}`, val3: `1 ${options.from} = ${(EXCHANGE_RATES[options.to] / EXCHANGE_RATES[options.from]).toFixed(4)} ${options.to}`, labels: ["Source", "Converted", "Rate"] };
      } else if (slug === 'roi-calculator') {
        const profit = Number(options.returns) - Number(options.investment);
        const roi = (profit / Number(options.investment)) * 100;
        mRes = { val1: profit.toFixed(0), val2: roi.toFixed(2), val3: (roi / Number(options.years || 1)).toFixed(2), labels: ["Net Profit", "Total ROI (%)", "Avg Yearly ROI"] };
      } else if (slug === 'bmi-calculator') {
        const bmi = Number(options.weight) / Math.pow(Number(options.height)/100, 2);
        mRes = { val1: bmi.toFixed(2), val2: bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal" : "Overweight", val3: "Healthy range: 18.5 - 25", labels: ["BMI Score", "Category", "Target"] };
      }

      setMathResult(mRes);

      // 2. AI Strategic Orchestration
      if (isOrchestrated) {
        const prompt = `Tool: ${slug}, Math Result: ${JSON.stringify(mRes)}, Options: ${JSON.stringify(options)}`;
        const aiText = await callAIWithRetry(prompt, 'gemini-3-flash-preview');
        setOrchestrationData(aiText);
      }
      
      onSuccess("Financial Strategy Complete!");
    } catch (err) {
      onError("Calculation engine snag. Check values.");
    } finally {
      setLoading(false);
    }
  };

  const currentConfig = [
    emiCalculatorConfig, sipCalculatorConfig, gstCalculatorConfig, 
    loanCalculatorConfig, roiCalculatorConfig, bmiCalculatorConfig,
    currencyConverterConfig, compoundInterestConfig, mortgageCalculatorConfig,
    incomeTaxPlannerConfig, inflationCalculatorConfig
  ].find(c => c.slug === slug) || emiCalculatorConfig;

  const inputSlot = (
    <div className="space-y-6 py-4 text-center">
      <div className="flex flex-col items-center justify-center p-8 bg-slate-50 rounded-[3rem] border border-slate-100">
        <div className="text-7xl mb-4">{currentConfig.icon}</div>
        <p className="text-slate-500 font-black text-sm uppercase tracking-widest">{currentConfig.title} Engine Active</p>
      </div>
    </div>
  );

  const resultSlot = (mathResult || orchestrationData) && (
    <div className="space-y-10 animate-in fade-in slide-in-from-top-4">
      {/* 1. Numerical Core Result */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mathResult?.labels.map((label: string, i: number) => (
          <div key={i} className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-200 text-center shadow-inner">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{label}</div>
            <div className="text-3xl font-black text-slate-900 truncate">
               {slug === 'roi-calculator' && i > 0 ? `${mathResult[`val${i+1}`]}%` : 
                slug === 'bmi-calculator' || slug === 'currency-converter' ? mathResult[`val${i+1}`] : 
                `₹${Number(mathResult[`val${i+1}`]).toLocaleString()}`}
            </div>
          </div>
        ))}
      </div>

      {/* 2. AI Strategy Overlay (Orchestration) */}
      {orchestrationData && (
        <div className="space-y-10 border-t border-slate-100 pt-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {orchestrationData.split('\n\n').slice(0, 6).map((step, idx) => {
              if (!step.includes(':')) return null;
              const [title, val] = step.split(':');
              return (
                <div key={idx} className="bg-indigo-50/50 p-6 rounded-3xl border border-indigo-100">
                  <span className="text-[8px] font-black text-indigo-500 uppercase tracking-[0.2em] mb-1 block">{title.trim()}</span>
                  <span className="text-[11px] font-bold text-indigo-900 line-clamp-2">{val.trim()}</span>
                </div>
              );
            })}
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center px-1">
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
                7. Professional Wealth Strategy
              </span>
              <button onClick={() => { navigator.clipboard.writeText(orchestrationData); onSuccess("Copied!"); }} className="text-[10px] font-black text-slate-400 uppercase">Copy Report</button>
            </div>
            <div className="bg-slate-900 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group border border-slate-800">
               <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500/50"></div>
               <div className="text-emerald-400 font-mono text-sm leading-relaxed whitespace-pre-wrap italic">
                  {orchestrationData.split('7. Expected Result:')[1]?.split('8. Optimization Tips:')[0]?.trim() || "Calculations verified by AI Core."}
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="bg-amber-50/50 p-8 rounded-[2.5rem] border border-amber-100">
                <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest block mb-4">8. Alpha Strategy Tips</span>
                <div className="text-xs font-bold text-amber-900 leading-relaxed italic">
                  {orchestrationData.split('8. Optimization Tips:')[1]?.split('9. Next Action Suggestion:')[0]?.trim() || "Diversify and hold."}
                </div>
             </div>
             <div className="bg-indigo-900 p-8 rounded-[2.5rem] text-white flex flex-col justify-center">
                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest block mb-4">9. Strategic Next Step</span>
                <div className="flex items-center gap-6">
                   <div className="w-12 h-12 bg-white text-indigo-900 rounded-full flex items-center justify-center text-2xl font-black shadow-lg animate-bounce">➔</div>
                   <div className="text-sm font-black">{orchestrationData.split('9. Next Action Suggestion:')[1]?.trim() || "Analyze tax savings next."}</div>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <ToolLayout
      title={currentConfig.title}
      description={currentConfig.description}
      icon={currentConfig.icon}
      colorClass={currentConfig.colorClass}
      input={inputSlot}
      options={<OptionsPanel options={currentConfig.options as any} values={options} onChange={handleOptionChange} />}
      actions={
        <button 
          onClick={calculate} 
          disabled={loading}
          className={`w-full py-7 ${currentConfig.colorClass} text-white rounded-[2.5rem] font-black text-2xl shadow-2xl transition-all active:scale-95 disabled:opacity-50`}
        >
          {loading ? "Engaging AI Financial Core..." : isOrchestrated ? "Architect My Wealth" : "Calculate Now"}
        </button>
      }
      result={resultSlot}
    />
  );
};

export default FinanceTools;