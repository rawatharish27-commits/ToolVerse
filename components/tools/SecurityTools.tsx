import React, { useState } from 'react';

interface SecurityToolsProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const SecurityTools: React.FC<SecurityToolsProps> = ({ slug, onSuccess, onError }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const generateHash = async (algorithm: 'SHA-256' | 'SHA-512' | 'SHA-1') => {
    if (!input) return;
    try {
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

  const calculateEntropy = () => {
    if (!input) return;
    const charSets = {
      lower: /[a-z]/.test(input) ? 26 : 0,
      upper: /[A-Z]/.test(input) ? 26 : 0,
      numbers: /[0-9]/.test(input) ? 10 : 0,
      symbols: /[^a-zA-Z0-9]/.test(input) ? 33 : 0
    };
    const R = Object.values(charSets).reduce((a, b) => a + b, 0);
    const L = input.length;
    const entropy = Math.log2(Math.pow(R, L));
    setOutput(`Password: ${input}\nLength: ${L}\nCharset Size: ${R}\nEntropy: ${entropy.toFixed(2)} bits\nStrength: ${entropy > 60 ? 'Excellent' : entropy > 40 ? 'Moderate' : 'Weak'}`);
    onSuccess("Entropy Calculated");
  };

  const encodeFileToBase64 = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const reader = new FileReader();
      reader.onload = () => {
        setOutput(reader.result as string);
        onSuccess("File Encoded to Base64");
      };
      reader.readAsDataURL(file);
    } catch (e) {
      onError("Encoding Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500 max-w-2xl mx-auto py-8">
      <div className="text-center">
        <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center text-white text-4xl mx-auto shadow-2xl mb-6">🛡️</div>
        <h3 className="text-3xl font-black text-slate-900 capitalize tracking-tight">{slug.replace(/-/g, ' ')}</h3>
      </div>

      {slug === 'base64-file-encoder' ? (
        <div className="p-10 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2.5rem] text-center hover:border-indigo-400 transition-all cursor-pointer">
          <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} className="hidden" id="sec-file-input" />
          <label htmlFor="sec-file-input" className="cursor-pointer">
            <div className="text-4xl mb-4">📄</div>
            <p className="font-black text-slate-600">{file ? file.name : 'Select file for Base64'}</p>
          </label>
        </div>
      ) : (
        <textarea 
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Enter data or password..."
          className="w-full h-48 p-8 rounded-[2.5rem] border border-slate-200 focus:ring-8 focus:ring-indigo-500/5 outline-none font-mono text-sm bg-slate-50 shadow-inner"
        />
      )}

      <div className="flex flex-col sm:flex-row gap-4">
        {slug === 'sha512-hash-generator' && (
          <button onClick={() => generateHash('SHA-512')} className="w-full py-6 bg-indigo-600 text-white rounded-2xl font-black text-lg">Generate SHA-512</button>
        )}
        {slug === 'password-entropy-analyzer' && (
          <button onClick={calculateEntropy} className="w-full py-6 bg-indigo-600 text-white rounded-2xl font-black text-lg">Analyze Entropy</button>
        )}
        {slug === 'base64-file-encoder' && (
          <button onClick={encodeFileToBase64} disabled={!file || loading} className="w-full py-6 bg-indigo-600 text-white rounded-2xl font-black text-lg disabled:opacity-50">Encode to Base64</button>
        )}
      </div>

      {output && (
        <div className="p-8 bg-slate-900 rounded-[2.5rem] text-emerald-400 font-mono text-sm break-all relative group animate-in slide-in-from-top-4">
           <div className="mb-4 text-[9px] font-black text-slate-500 uppercase tracking-widest">Security Output</div>
           <pre className="whitespace-pre-wrap">{output}</pre>
           <button 
            onClick={() => { navigator.clipboard.writeText(output); onSuccess("Copied!"); }}
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