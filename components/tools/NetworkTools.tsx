import React, { useState, useEffect } from 'react';

interface NetworkToolsProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const NetworkTools: React.FC<NetworkToolsProps> = ({ slug, onSuccess, onError }) => {
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    if (slug === 'http-header-inspector') {
      // Browsers don't allow viewing all request headers directly via JS for security,
      // but we can show client-side detectable headers.
      setResult({
        "User-Agent": navigator.userAgent,
        "Language": navigator.language,
        "Connection": "keep-alive",
        "Referer": document.referrer || "None",
        "Platform": navigator.platform,
        "Cookies-Enabled": navigator.cookieEnabled ? "Yes" : "No"
      });
    }
  }, [slug]);

  const generateMAC = () => {
    const hex = "0123456789ABCDEF";
    let mac = "";
    for (let i = 0; i < 6; i++) {
      mac += hex.charAt(Math.floor(Math.random() * 16));
      mac += hex.charAt(Math.floor(Math.random() * 16));
      if (i < 5) mac += ":";
    }
    setResult({ generated_mac: mac });
    onSuccess("MAC Address Generated");
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500 max-w-2xl mx-auto py-8">
      <div className="text-center">
        <div className="w-20 h-20 bg-cyan-600 rounded-3xl flex items-center justify-center text-white text-4xl mx-auto shadow-2xl mb-6">🌐</div>
        <h3 className="text-3xl font-black text-slate-900 capitalize tracking-tight">{slug.replace(/-/g, ' ')}</h3>
      </div>

      <div className="flex gap-4">
        {slug === 'mac-address-generator' && (
          <button onClick={generateMAC} className="w-full py-6 bg-cyan-600 text-white rounded-2xl font-black text-lg">Generate Random MAC</button>
        )}
      </div>

      {result && (
        <div className="bg-slate-950 rounded-[2.5rem] p-8 md:p-12 font-mono text-sm shadow-2xl border border-slate-800 text-emerald-400 overflow-x-auto relative">
          <div className="flex items-center space-x-2 mb-8 border-b border-white/5 pb-4">
            <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Network Diagnostic Output</span>
          </div>
          <pre className="whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default NetworkTools;