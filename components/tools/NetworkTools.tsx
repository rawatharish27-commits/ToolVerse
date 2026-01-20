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
    if (slug === 'what-is-my-ip') {
      fetchIPDetails();
    }
  }, [slug]);

  const fetchIPDetails = async (target?: string) => {
    setLoading(true);
    try {
      const url = target ? `https://ipapi.co/${target}/json/` : `https://ipapi.co/json/`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.error) throw new Error(data.reason);
      setResult(data);
      onSuccess("IP Geolocation Fetched");
    } catch (e: any) {
      onError(e.message || "Failed to fetch network data");
    } finally {
      setLoading(false);
    }
  };

  const handleUrlAction = (action: 'encode' | 'decode') => {
    try {
      const res = action === 'encode' ? encodeURIComponent(input) : decodeURIComponent(input);
      setResult(res);
      onSuccess("URL Transformed");
    } catch (e) {
      onError("Invalid URL Format");
    }
  };

  const renderTerminal = (content: any) => (
    <div className="bg-slate-950 rounded-[2.5rem] p-8 md:p-12 font-mono text-sm shadow-2xl border border-slate-800 text-emerald-400 overflow-x-auto">
      <div className="flex items-center space-x-2 mb-8 border-b border-white/5 pb-4">
        <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
        <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
        <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] ml-4">Network Diagnostic Output</span>
      </div>
      <pre className="whitespace-pre-wrap leading-relaxed">
        {typeof content === 'string' ? content : JSON.stringify(content, null, 2)}
      </pre>
    </div>
  );

  return (
    <div className="space-y-12 animate-in fade-in duration-500 max-w-2xl mx-auto py-8">
      <div className="text-center">
        <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center text-white text-4xl mx-auto shadow-2xl mb-6">🌐</div>
        <h3 className="text-3xl font-black text-slate-900 capitalize tracking-tight">{slug.replace(/-/g, ' ')}</h3>
      </div>

      {(slug === 'ip-lookup-pro' || slug.includes('url')) && (
        <div className="space-y-6">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">
            {slug.includes('ip') ? 'Target IP Address' : 'Source URL / Text'}
          </label>
          <input 
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={slug.includes('ip') ? '8.8.8.8' : 'https://example.com?query=...'}
            className="w-full p-6 rounded-2xl border border-slate-200 focus:ring-8 focus:ring-indigo-500/5 outline-none font-bold text-slate-700 bg-slate-50 transition-all"
          />
        </div>
      )}

      <div className="flex gap-4">
        {slug === 'ip-lookup-pro' && (
          <button onClick={() => fetchIPDetails(input)} disabled={loading} className="w-full py-6 bg-indigo-600 text-white rounded-2xl font-black text-lg shadow-xl hover:bg-indigo-700 transition-all">
            {loading ? 'Routing...' : 'Execute IP Analysis'}
          </button>
        )}
        {slug.includes('url-encoder') && (
          <button onClick={() => handleUrlAction('encode')} className="w-full py-6 bg-indigo-600 text-white rounded-2xl font-black text-lg shadow-xl">Secure Encode</button>
        )}
        {slug.includes('url-decoder') && (
          <button onClick={() => handleUrlAction('decode')} className="w-full py-6 bg-slate-900 text-white rounded-2xl font-black text-lg shadow-xl">Strict Decode</button>
        )}
      </div>

      {result && renderTerminal(result)}
    </div>
  );
};

export default NetworkTools;