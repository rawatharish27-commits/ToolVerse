import React, { useState, useEffect } from 'react';

interface NetworkToolsProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const NetworkTools: React.FC<NetworkToolsProps> = ({ slug, onSuccess, onError }) => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (slug === 'what-is-my-ip') fetchIPDetails();
  }, [slug]);

  const fetchIPDetails = async (target?: string) => {
    setLoading(true);
    try {
      const res = await fetch(`https://ipapi.co/${target || ''}/json/`);
      const data = await res.json();
      setResult(data);
      onSuccess("IP Geolocation Fetched");
    } catch (e) {
      onError("Failed to fetch IP data");
    } finally {
      setLoading(false);
    }
  };

  const calculateSubnet = () => {
    try {
      const [ip, mask] = input.split('/');
      if (!ip || !mask) throw new Error("Format: IP/Mask");
      // Simplified logic for UI representation
      setResult({
        ip_address: ip,
        subnet_mask: mask,
        total_hosts: Math.pow(2, 32 - parseInt(mask)) - 2,
        network_type: parseInt(ip.split('.')[0]) < 128 ? 'Class A' : 'Class B/C'
      });
      onSuccess("Subnet Range Calculated");
    } catch (e) {
      onError("Invalid Format (e.g., 192.168.1.1/24)");
    }
  };

  const renderTerminal = (content: any) => (
    <div className="bg-slate-950 rounded-[2.5rem] p-8 md:p-12 font-mono text-sm shadow-2xl border border-slate-800 text-emerald-400 overflow-x-auto relative">
      <div className="flex items-center space-x-2 mb-8 border-b border-white/5 pb-4">
        <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
        <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
        <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] ml-4">Terminal Output</span>
      </div>
      <pre className="whitespace-pre-wrap leading-relaxed">
        {typeof content === 'string' ? content : JSON.stringify(content, null, 2)}
      </pre>
      <button 
        onClick={() => { navigator.clipboard.writeText(JSON.stringify(content)); onSuccess("Copied Terminal Data"); }}
        className="absolute top-8 right-8 text-[9px] bg-white/5 hover:bg-white/10 text-white px-3 py-1 rounded transition-all uppercase font-black"
      >
        Copy All
      </button>
    </div>
  );

  return (
    <div className="space-y-12 animate-in fade-in duration-500 max-w-2xl mx-auto py-8">
      <div className="text-center">
        <div className="w-20 h-20 bg-cyan-600 rounded-3xl flex items-center justify-center text-white text-4xl mx-auto shadow-2xl mb-6">🌐</div>
        <h3 className="text-3xl font-black text-slate-900 capitalize tracking-tight">{slug.replace(/-/g, ' ')}</h3>
      </div>

      <div className="space-y-6">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Network Input</label>
        <input 
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={slug.includes('subnet') ? '192.168.1.1/24' : 'Enter data...'}
          className="w-full p-6 rounded-2xl border border-slate-200 focus:ring-8 focus:ring-cyan-500/5 outline-none font-bold text-slate-700 bg-slate-50 transition-all"
        />
      </div>

      <div className="flex gap-4">
        {slug === 'ip-lookup-pro' && (
          <button onClick={() => fetchIPDetails(input)} className="w-full py-6 bg-cyan-600 text-white rounded-2xl font-black text-lg shadow-xl">Trace IP Address</button>
        )}
        {slug === 'subnet-calculator' && (
          <button onClick={calculateSubnet} className="w-full py-6 bg-cyan-600 text-white rounded-2xl font-black text-lg shadow-xl">Run Subnet Logic</button>
        )}
        {slug === 'base64-to-image' && (
          <button onClick={() => setResult(input)} className="w-full py-6 bg-slate-900 text-white rounded-2xl font-black text-lg shadow-xl">Render Preview</button>
        )}
      </div>

      {slug === 'base64-to-image' && result && typeof result === 'string' && (
        <div className="p-4 bg-white rounded-[2rem] border-4 border-slate-100 shadow-xl overflow-hidden">
          <img src={result.startsWith('data:') ? result : `data:image/png;base64,${result}`} className="w-full" alt="Base64 Decode" />
        </div>
      )}

      {result && slug !== 'base64-to-image' && renderTerminal(result)}
    </div>
  );
};

export default NetworkTools;