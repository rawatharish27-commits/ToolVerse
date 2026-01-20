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

  const generateHash = async (algorithm: 'SHA-256' | 'SHA-1') => {
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

  const handleFileHash = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      setOutput(hashHex);
      onSuccess("File Signature Verified");
    } catch (e) {
      onError("File Analysis Error");
    } finally {
      setLoading(false);
    }
  };

  const decodeJWT = () => {
    try {
      const parts = input.split('.');
      if (parts.length !== 3) throw new Error("Invalid JWT Format");
      const header = JSON.parse(atob(parts[0]));
      const payload = JSON.parse(atob(parts[1]));
      setOutput(JSON.stringify({ header, payload }, null, 2));
      onSuccess("JWT Decoded");
    } catch (e) {
      onError("Invalid JWT Token");
    }
  };

  const transformBinary = (toBinary: boolean) => {
    try {
      if (toBinary) {
        setOutput(input.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' '));
      } else {
        const text = input.split(' ').map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
        setOutput(text);
      }
      onSuccess("Transformation Complete");
    } catch (e) {
      onError("Invalid Format");
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

  return (
    <div className="space-y-12 animate-in fade-in duration-500 max-w-2xl mx-auto py-8">
      <div className="text-center">
        <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center text-white text-4xl mx-auto shadow-2xl mb-6">🛡️</div>
        <h3 className="text-3xl font-black text-slate-900 capitalize tracking-tight">{slug.replace(/-/g, ' ')}</h3>
      </div>

      {slug === 'file-hash-checker' ? (
        <div className="p-10 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2.5rem] text-center hover:border-indigo-400 transition-all group">
          <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} className="hidden" id="hash-file-input" />
          <label htmlFor="hash-file-input" className="cursor-pointer block">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📂</div>
            <p className="text-sm font-black text-slate-600 mb-2">{file ? file.name : 'Select file for SHA-256 checksum'}</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Client-Side Verification Only</p>
          </label>
        </div>
      ) : (
        <div className="space-y-6">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Input Source</label>
          <textarea 
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Paste your token, password, or binary data..."
            className="w-full h-48 p-8 rounded-[2.5rem] border border-slate-200 focus:ring-8 focus:ring-indigo-500/5 outline-none font-mono text-sm bg-slate-50 shadow-inner transition-all"
          />
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4">
        {slug === 'sha256-hash-generator' && (
          <button onClick={() => generateHash('SHA-256')} className="w-full py-6 bg-indigo-600 text-white rounded-2xl font-black text-lg shadow-xl hover:bg-indigo-700 transition-all">Generate SHA-256</button>
        )}
        {slug === 'jwt-decoder' && (
          <button onClick={decodeJWT} className="w-full py-6 bg-indigo-600 text-white rounded-2xl font-black text-lg shadow-xl">Decode JWT Payload</button>
        )}
        {slug === 'text-to-binary' && (
          <button onClick={() => transformBinary(true)} className="w-full py-6 bg-indigo-600 text-white rounded-2xl font-black text-lg shadow-xl">Text → Binary</button>
        )}
        {slug === 'binary-to-text' && (
          <button onClick={() => transformBinary(false)} className="w-full py-6 bg-slate-900 text-white rounded-2xl font-black text-lg shadow-xl">Binary → Text</button>
        )}
        {slug === 'file-hash-checker' && (
          <button onClick={handleFileHash} disabled={!file || loading} className="w-full py-6 bg-indigo-600 text-white rounded-2xl font-black text-lg shadow-xl disabled:opacity-50">
            {loading ? 'Analyzing...' : 'Generate Checksum'}
          </button>
        )}
      </div>

      {output && (
        <div className="p-8 bg-slate-900 rounded-[2.5rem] text-emerald-400 font-mono text-sm break-all relative group animate-in slide-in-from-top-4">
           <div className="mb-4 text-[9px] font-black text-slate-500 uppercase tracking-widest">Output Buffer</div>
           <pre className="whitespace-pre-wrap">{output}</pre>
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