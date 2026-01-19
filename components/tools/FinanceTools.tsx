import React, { useState } from 'react';

interface ToolProps {
  slug: string;
}

const FinanceTools: React.FC<ToolProps> = ({ slug }) => {
  const [p, setP] = useState(0);
  const [r, setR] = useState(0);
  const [t, setT] = useState(0);
  const [inv, setInv] = useState(0);
  const [ret, setRet] = useState(0);

  const renderEMI = () => {
    const rate = r / (12 * 100);
    const months = t * (slug.includes('loan') ? 12 : 1);
    const emi = months && rate ? (p * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1) : 0;
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Input label="Principal (₹)" val={p} set={setP} />
          <Input label="Interest Rate (% p.a.)" val={r} set={setR} />
          <Input label={slug.includes('loan') ? "Tenure (Years)" : "Months"} val={t} set={setT} />
        </div>
        <Result label="Monthly EMI" value={`₹${Math.round(emi).toLocaleString()}`} color="bg-indigo-600" />
      </div>
    );
  };

  const renderSIP = () => {
    const rate = r / (12 * 100);
    const n = t * 12;
    const fv = p && rate && n ? p * ((Math.pow(1 + rate, n) - 1) / rate) * (1 + rate) : 0;
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Input label="Monthly SIP (₹)" val={p} set={setP} />
          <Input label="Exp. Return (%)" val={r} set={setR} />
          <Input label="Years" val={t} set={setT} />
        </div>
        <Result label="Future Wealth" value={`₹${Math.round(fv).toLocaleString()}`} color="bg-emerald-500" />
      </div>
    );
  };

  if (slug === 'emi-calculator' || slug === 'home-loan-calculator' || slug === 'personal-loan-calculator') return renderEMI();
  if (slug === 'sip-calculator') return renderSIP();
  
  return <div className="p-10 text-center text-slate-400">Calculator under fine-tuning...</div>;
};

const Input = ({ label, val, set }: any) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-slate-500 uppercase">{label}</label>
    <input type="number" value={val || ''} onChange={e => set(+e.target.value)} className="w-full p-4 border rounded-2xl focus:ring-2 focus:ring-indigo-500" />
  </div>
);

const Result = ({ label, value, color }: any) => (
  <div className={`${color} rounded-[2rem] p-8 text-white text-center shadow-xl`}>
    <div className="text-xs font-bold uppercase opacity-80 mb-2">{label}</div>
    <div className="text-4xl font-black">{value}</div>
  </div>
);

export default FinanceTools;