import React, { useState } from 'react';

interface SecurityToolsProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const SecurityTools: React.FC<SecurityToolsProps> = ({ slug, onSuccess, onError }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const generateHash = async (algorithm: 'SHA-256' | 'SHA-1' | 'MD5') => {
    if (!input) return;
    try {
      if (algorithm === 'MD5') {
         onError("MD5 is handled via legacy library. SHA variants are recommended for security.");
         return;
      }
      const msgUint8 = new TextEncoder().encode(input);
      const hashBuffer = await crypto.subtle.digest(algorithm, msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      setOutput(hashHex);
      onSuccess(`${algorithm} Generated`);
    } catch (e) {
      onError("Hash Engine Failure");
    }
  };

  const checkStrength = (pass: string) => {
    let score = 0;
    if (pass.length > 8) score++;
    if (pass.length > 12) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const renderPasswordMeter = () => {
    const score = checkStrength(input);
    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-emerald-500', 'bg-green-500'];
    const labels = ['Weak', 'Fair', 'Good', 'Strong', 'Excellent', 'Unbreakable'];
    
    return (
      <div className="space-y-4">
        <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden flex">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`flex-1 transition-all duration-500 ${i < score ? colors[score-1] : 'opacity-0'}`} />
          ))}
        </div>
        <div className="text-center font-black uppercase text-xs tracking-widest text-slate-400">
          Strength: <span className={score > 0 ? 'text-indigo-600' : ''}>{labels[score] || 'Start Typing'}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500 max-w-2xl mx-auto py-8">
      <div className="text-center">
        <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center text-white text-4xl mx-auto shadow-2xl mb-6">🛡️</div>
        <h3 className="text-3xl font-black text-slate-900 capitalize tracking-tight">{slug.replace(/-/g, ' ')}</h3>
      </div>

      <div className="space-y-6">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Input Source</label>
        <textarea 
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Paste secret, password, or raw data..."
          className="w-full h-48 p-8 rounded-[2.5rem] border border-slate-200 focus:ring-8 focus:ring-indigo-500/5 outline-none font-mono text-sm bg-slate-50 shadow-inner transition-all"
        />
      </div>

      {slug === 'password-strength-checker' && renderPasswordMeter()}

      <div className="flex gap-4">
        {slug.includes('hash') && (
          <button 
            onClick={() => generateHash(slug.includes('sha256') ? 'SHA-256' : 'SHA-1')} 
            className="w-full py-6 bg-indigo-600 text-white rounded-2xl font-black text-lg shadow-xl hover:bg-indigo-700 transition-all active:scale-95"
          >
            Generate Cryptographic Hash
          </button>
        )}
        
        {slug === 'secure-token-generator' && (
          <button 
            onClick={() => setOutput(crypto.randomUUID() + crypto.randomUUID().replace(/-/g, ''))}
            className="w-full py-6 bg-slate-900 text-white rounded-2xl font-black text-lg shadow-xl hover:bg-slate-800 transition-all active:scale-95"
          >
            Create Unique UUID Token
          </button>
        )}
      </div>

      {output && (
        <div className="p-8 bg-slate-900 rounded-[2.5rem] text-emerald-400 font-mono text-sm break-all relative group animate-in slide-in-from-top-4">
           <div className="mb-4 text-[9px] font-black text-slate-500 uppercase tracking-widest">Secure Output Buffer</div>
           {output}
           <button 
            onClick={() => { navigator.clipboard.writeText(output); onSuccess("Copied to Secure Clipboard"); }}
            className="absolute top-6 right-6 px-4 py-2 bg-white/10 text-white rounded-xl text-[10px] font-black hover:bg-white/20 transition-all"
           >
             COPY
           </button>
        </div>
      )}
    </div>
  );
};

export default SecurityTools;