import React, { useState, useMemo } from 'react';
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { 
  emiCalculatorConfig, 
  sipCalculatorConfig, 
  gstCalculatorConfig, 
  loanCalculatorConfig, 
  roiCalculatorConfig, 
  bmiCalculatorConfig,
  currencyConverterConfig 
} from '../../config/calculatorTools';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

// Static base rates (Relative to 1 USD)
const EXCHANGE_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  INR: 83.15,
  JPY: 151.20,
  CAD: 1.35,
  AUD: 1.53
};

const FinanceTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [options, setOptions] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    const configs = [
      emiCalculatorConfig, 
      sipCalculatorConfig, 
      gstCalculatorConfig, 
      loanCalculatorConfig, 
      roiCalculatorConfig, 
      bmiCalculatorConfig,
      currencyConverterConfig
    ];
    const target = configs.find(c => c.slug === slug);
    if (target) {
      target.options.forEach(opt => initial[opt.id] = (opt as any).default);
    }
    return initial;
  });

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleOptionChange = (id: string, value: any) => {
    setOptions(prev => ({ ...prev, [id]: value }));
  };

  const calculate = () => {
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      try {
        if (slug === 'emi-calculator' || slug === 'loan-calculator') {
          const P = Number(slug === 'emi-calculator' ? options.principal : options.amount);
          const annualRate = Number(options.rate);
          const years = Number(options.tenure);

          if (!P || !annualRate || !years) {
            onError("Please enter valid numeric values.");
            setLoading(false);
            return;
          }

          const r = annualRate / 12 / 100;
          const n = years * 12;

          const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
          const totalPayable = emi * n;
          const totalInterest = totalPayable - P;

          setResult({
            val1: emi.toFixed(0),
            val2: totalInterest.toFixed(0),
            val3: totalPayable.toFixed(0),
            labels: ["Monthly EMI", "Total Interest", "Total Payable"]
          });
          onSuccess("Calculation Complete!");
        } else if (slug === 'sip-calculator') {
          const P = Number(options.monthly);
          const annualRate = Number(options.rate);
          const years = Number(options.years);

          if (!P || !annualRate || !years) {
            onError("Please enter valid investment details.");
            setLoading(false);
            return;
          }

          const i = annualRate / 12 / 100;
          const n = years * 12;

          const fv = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
          const invested = P * n;
          const gains = fv - invested;

          setResult({
            val1: invested.toFixed(0),
            val2: gains.toFixed(0),
            val3: fv.toFixed(0),
            labels: ["Total Invested", "Est. Wealth Gain", "Maturity Value"]
          });
          onSuccess("SIP Wealth Projection Ready!");
        } else if (slug === 'gst-calculator') {
          const amount = Number(options.amount);
          const rate = Number(options.rate);

          if (!amount || !rate) {
            onError("Amount and Rate are required.");
            setLoading(false);
            return;
          }

          let baseAmount = amount;
          let gstAmount = 0;

          if (options.mode === "Inclusive") {
            baseAmount = amount / (1 + rate / 100);
            gstAmount = amount - baseAmount;
          } else {
            gstAmount = (amount * rate) / 100;
          }

          const totalPayable = options.mode === "Exclusive" ? (baseAmount + gstAmount) : amount;
          const isInterState = options.type.includes("IGST");

          setResult({
            base: baseAmount.toFixed(2),
            gst: gstAmount.toFixed(2),
            cgst: isInterState ? "0.00" : (gstAmount / 2).toFixed(2),
            sgst: isInterState ? "0.00" : (gstAmount / 2).toFixed(2),
            igst: isInterState ? gstAmount.toFixed(2) : "0.00",
            total: totalPayable.toFixed(2),
            labels: ["Net Amount", "Total GST", "Total Payable"]
          });
          onSuccess("GST Breakdown Calculated!");
        } else if (slug === 'roi-calculator') {
          const inv = Number(options.investment);
          const ret = Number(options.returns);
          const years = Number(options.years);

          if (!inv || !ret) {
            onError("Investment and Return amounts are required.");
            setLoading(false);
            return;
          }

          const profit = ret - inv;
          const roi = (profit / inv) * 100;
          let annualized = null;

          if (years && years > 0) {
            annualized = (Math.pow(ret / inv, 1 / years) - 1) * 100;
          }

          setResult({
            val1: profit.toFixed(0),
            val2: roi.toFixed(2),
            val3: annualized !== null ? annualized.toFixed(2) : "N/A",
            labels: ["Net Profit", "Total ROI (%)", "Annualized ROI (%)"]
          });
          onSuccess("ROI Analysis Complete!");
        } else if (slug === 'bmi-calculator') {
          const weight = Number(options.weight);
          const height = Number(options.height);

          if (!weight || !height) {
            onError("Weight and Height are required.");
            setLoading(false);
            return;
          }

          const heightM = height / 100;
          const bmi = weight / (heightM * heightM);
          
          let category = "Normal";
          let color = "text-emerald-500";
          if (bmi < 18.5) { category = "Underweight"; color = "text-blue-500"; }
          else if (bmi >= 18.5 && bmi < 25) { category = "Normal"; color = "text-emerald-500"; }
          else if (bmi >= 25 && bmi < 30) { category = "Overweight"; color = "text-amber-500"; }
          else { category = "Obese"; color = "text-rose-500"; }

          setResult({
            val1: bmi.toFixed(2),
            val2: category,
            val3: `${(18.5 * heightM * heightM).toFixed(1)} - ${(24.9 * heightM * heightM).toFixed(1)} kg`,
            labels: ["Your BMI Score", "Health Category", "Ideal Weight Range"],
            statusColor: color
          });
          onSuccess("Health Metric Calculated!");
        } else if (slug === 'currency-converter') {
          const amount = Number(options.amount);
          const from = options.from;
          const to = options.to;

          if (!amount) {
            onError("Amount is required.");
            setLoading(false);
            return;
          }

          const inUSD = amount / EXCHANGE_RATES[from];
          const converted = inUSD * EXCHANGE_RATES[to];

          setResult({
            val1: `${amount} ${from}`,
            val2: `${converted.toFixed(2)} ${to}`,
            val3: `1 ${from} = ${(EXCHANGE_RATES[to] / EXCHANGE_RATES[from]).toFixed(4)} ${to}`,
            labels: ["Source Amount", "Converted Amount", "Exchange Rate"]
          });
          onSuccess("Currency Converted!");
        }
      } catch (err) {
        onError("Calculation failed.");
      }
      setLoading(false);
    }, 300);
  };

  const currentConfig = slug === 'emi-calculator' ? emiCalculatorConfig : 
                       slug === 'sip-calculator' ? sipCalculatorConfig : 
                       slug === 'gst-calculator' ? gstCalculatorConfig : 
                       slug === 'loan-calculator' ? loanCalculatorConfig : 
                       slug === 'roi-calculator' ? roiCalculatorConfig : 
                       slug === 'bmi-calculator' ? bmiCalculatorConfig : 
                       slug === 'currency-converter' ? currencyConverterConfig : { 
    title: slug.replace(/-/g, ' '), 
    description: "Finance calculation utility.", 
    icon: "🔢", 
    colorClass: "bg-orange-500",
    options: [] 
  };

  const inputSlot = (
    <div className="space-y-8 py-4 text-center">
      <div className="flex flex-col items-center justify-center p-8 bg-slate-50 rounded-[3rem] border border-slate-100">
        <div className="text-6xl mb-4">
          {slug === 'sip-calculator' ? '🚀' : 
           slug === 'gst-calculator' ? '🧾' : 
           slug === 'roi-calculator' ? '📊' : 
           slug === 'bmi-calculator' ? '🏃' : 
           slug === 'currency-converter' ? '💱' : '🏦'}
        </div>
        <p className="text-slate-500 font-black text-sm uppercase tracking-widest">
          {slug === 'sip-calculator' ? 'Wealth Projections Engine Active' : 
           slug === 'gst-calculator' ? 'Indian GST Tax Engine Active' : 
           slug === 'roi-calculator' ? 'ROI Analysis Core Active' :
           slug === 'bmi-calculator' ? 'Health Analytics Engine Active' :
           slug === 'currency-converter' ? 'Forex Conversion Engine Active' :
           'Standard Banking Financial Engine Active'}
        </p>
      </div>
    </div>
  );

  const resultSlot = result && (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 bg-indigo-50 rounded-[2.5rem] border border-indigo-100 text-center">
          <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">{result.labels[0]}</div>
          <div className="text-2xl md:text-3xl font-black text-indigo-600 truncate">
            {slug === 'roi-calculator' || slug === 'bmi-calculator' || slug === 'currency-converter' ? result.val1 : `₹${Number(result.val1 || result.base).toLocaleString()}`}
          </div>
        </div>
        <div className="p-8 bg-amber-50 rounded-[2.5rem] border border-amber-100 text-center">
          <div className="text-[10px] font-black text-amber-400 uppercase tracking-widest mb-2">{result.labels[1]}</div>
          <div className={`text-2xl md:text-3xl font-black ${slug === 'bmi-calculator' ? result.statusColor : 'text-amber-600'} truncate`}>
            {slug === 'roi-calculator' ? `${result.val2}%` : slug === 'bmi-calculator' || slug === 'currency-converter' ? result.val2 : `₹${Number(result.val2 || result.gst).toLocaleString()}`}
          </div>
        </div>
        <div className="p-8 bg-emerald-50 rounded-[2.5rem] border border-emerald-100 text-center">
          <div className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-2">{result.labels[2]}</div>
          <div className="text-xl md:text-2xl font-black text-emerald-600 truncate">
             {slug === 'roi-calculator' ? (result.val3 === "N/A" ? "N/A" : `${result.val3}%`) : slug === 'bmi-calculator' || slug === 'currency-converter' ? result.val3 : `₹${Number(result.val3 || result.total).toLocaleString()}`}
          </div>
        </div>
      </div>

      {slug === 'gst-calculator' && (
        <div className="bg-slate-50 p-8 rounded-[3rem] border border-slate-200">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Tax Breakup Details</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
             <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter mb-1">CGST (Central)</span>
                <span className="text-xl font-black text-slate-900">₹{result.cgst}</span>
             </div>
             <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter mb-1">SGST (State)</span>
                <span className="text-xl font-black text-slate-900">₹{result.sgst}</span>
             </div>
             <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter mb-1">IGST (Integrated)</span>
                <span className="text-xl font-black text-slate-900">₹{result.igst}</span>
             </div>
          </div>
        </div>
      )}

      <div className="flex justify-center">
         <button 
          onClick={() => {
            const sumText = slug === 'gst-calculator' 
              ? `GST Summary:\nBase: ₹${result.base}\nGST: ₹${result.gst}\nCGST: ₹${result.cgst}\nSGST: ₹${result.sgst}\nIGST: ₹${result.igst}\nTotal: ₹${result.total}`
              : slug === 'roi-calculator'
              ? `ROI Report:\nNet Profit: ₹${result.val1}\nTotal ROI: ${result.val2}%\nAnnualized ROI: ${result.val3}%`
              : slug === 'bmi-calculator'
              ? `BMI Report:\nScore: ${result.val1}\nCategory: ${result.val2}\nIdeal Range: ${result.val3}`
              : slug === 'currency-converter'
              ? `Forex Report:\nOriginal: ${result.val1}\nConverted: ${result.val2}\nRate: ${result.val3}`
              : `${currentConfig.title} Summary:\n${result.labels[0]}: ₹${result.val1}\n${result.labels[1]}: ₹${result.val2}\n${result.labels[2]}: ₹${result.val3}`;
            navigator.clipboard.writeText(sumText);
            onSuccess("Details Copied!");
          }}
          className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl"
         >
           Copy Detailed Summary
         </button>
      </div>
    </div>
  );

  return (
    <ToolLayout
      title={currentConfig.title}
      description={currentConfig.description}
      icon={currentConfig.icon}
      colorClass={currentConfig.colorClass}
      input={inputSlot}
      options={currentConfig.options.length > 0 ? <OptionsPanel options={currentConfig.options as any} values={options} onChange={handleOptionChange} /> : undefined}
      actions={
        <button 
          onClick={calculate} 
          disabled={loading}
          className={`w-full py-6 ${currentConfig.colorClass} text-white rounded-[2rem] font-black text-xl shadow-2xl transition-all active:scale-95`}
        >
          {loading ? "Analyzing..." : "Calculate Now"}
        </button>
      }
      result={resultSlot}
    />
  );
};

export default FinanceTools;
