
import React, { useState } from 'react';

interface ToolProps {
  slug: string;
}

const FinanceTools: React.FC<ToolProps> = ({ slug }) => {
  const [p, setP] = useState(0);
  const [r, setR] = useState(0);
  const [t, setT] = useState(0);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [birthDate, setBirthDate] = useState('');

  const calculateResult = () => {
    if (slug.includes('emi')) {
      const rate = r / (12 * 100);
      const months = t * 12;
      return months && rate ? Math.round((p * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1)) : 0;
    }
    if (slug.includes('sip')) {
      const rate = r / (12 * 100);
      const n = t * 12;
      return p && rate && n ? Math.round(p * ((Math.pow(1 + rate, n) - 1) / rate) * (1 + rate)) : 0;
    }
    if (slug.includes('gst')) {
      return Math.round(p * (r / 100));
    }
    if (slug.includes('bmi')) {
      return height ? (weight / Math.pow(height / 100, 2)).toFixed(1) : 0;
    }
    if (slug.includes('age')) {
      if (!birthDate) return 0;
      const today = new Date();
      const birth = new Date(birthDate);
      let age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
      return age;
    }
    return 0;
  };

  const res = calculateResult();

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {slug.includes('bmi') ? (
          <>
            <Input label="Weight (kg)" val={weight} set={setWeight} />
            <Input label="Height (cm)" val={height} set={setHeight} />
          </>
        ) : slug.includes('age') ? (
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Birth Date</label>
            <input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} className="w-full p-5 border rounded-3xl bg-slate-50 font-black focus:ring-4 focus:ring-indigo-100 outline-none" />
          </div>
        ) : (
          <>
            <Input label={slug.includes('sip') ? "Monthly SIP (₹)" : "Principal (₹)"} val={p} set={setP} />
            <Input label={slug.includes('gst') ? "GST %" : "Interest Rate (%)"} val={r} set={setR} />
            <Input label="Tenure (Years)" val={t} set={setT} />
          </>
        )}
      </div>

      <div className="bg-indigo-600 rounded-[3rem] p-12 text-white text-center shadow-2xl shadow-indigo-200">
        <div className="text-[11px] font-black uppercase tracking-[0.3em] opacity-60 mb-4">Calculated Result</div>
        <div className="text-6xl font-black">
          {slug.includes('bmi') ? res : slug.includes('age') ? `${res} Years` : `₹${res.toLocaleString()}`}
        </div>
        <div className="mt-6 text-indigo-200 text-xs font-bold uppercase tracking-widest">
          Professional ToolVerse Engine
        </div>
      </div>
    </div>
  );
};

const Input = ({ label, val, set }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">{label}</label>
    <input type="number" value={val || ''} onChange={e => set(+e.target.value)} className="w-full p-5 border rounded-3xl bg-slate-50 font-black focus:ring-4 focus:ring-indigo-100 outline-none transition-all" />
  </div>
);

export default FinanceTools;
