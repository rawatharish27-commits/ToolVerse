import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import ToolLayout from '../ToolLayout';
import { executeTool } from '../../services/executionEngine';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

/**
 * Professional Edge Orchestrator v5.2
 * UI for Cloudflare Edge logic tools.
 */
const GeneralTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [inputVal, setInputVal] = useState('');
  const [outputVal, setOutputVal] = useState('');
  const [qrUrl, setQrUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);

  useEffect(() => {
    setInputVal('');
    setOutputVal('');
    setQrUrl('');
    setTerminalLogs([]);
    if (slug === 'password-generator' || slug === 'lorem-ipsum-generator') {
      handleProcess();
    }
  }, [slug]);

  const addLog = (msg: string) => {
    setTerminalLogs(prev => [...prev.slice(-4), `> ${msg}`]);
  };

  const handleProcess = async () => {
    if (slug === 'qr-code-generator') {
      if (!inputVal) return onError("URL or text required for QR.");
      try {
        const url = await QRCode.toDataURL(inputVal, { width: 512, margin: 2 });
        setQrUrl(url);
        onSuccess("QR Code Generated Locally");
      } catch (e) { onError("Generation failed."); }
      return;
    }

    setLoading(true);
    setTerminalLogs(["Initializing Edge Isolate...", "Verifying Protocol..."]);
    
    try {
      addLog(`Connecting to ${slug} node...`);
      const res = await executeTool({
        slug,
        category: 'utility',
        input: inputVal
      });

      if (res.success) {
        addLog("Payload processed successfully.");
        const finalData = typeof res.data === 'string' ? res.data : (res.data.output || JSON.stringify(res.data, null, 2));
        setOutputVal(finalData);
        onSuccess("Cloud Processing Complete");
      } else {
        addLog("Error: Node rejected payload.");
        onError(res.error || "Execution failure.");
      }
    } catch (err) {
      addLog("Critical: Gateway Unreachable.");
      onError("Connection failed.");
    } finally {
      setLoading(false);
    }
  };

  const inputSlot = (
    <div className="space-y-6">
      {slug !== 'password-generator' && slug !== 'lorem-ipsum-generator' && (
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Raw Payload Input</label>
          <textarea 
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder={slug === 'qr-code-generator' ? "Enter URL or text..." : "Paste raw data for cloud analysis..."}
            className="w-full h-48 p-6 bg-slate-50 border border-slate-200 rounded-[2rem] outline-none font-mono text-sm text-slate-700 shadow-inner resize-none focus:ring-8 focus:ring-indigo-500/5 transition-all"
          />
        </div>
      )}
      
      {(slug === 'password-generator' || slug === 'lorem-ipsum-generator') && (
        <div className="py-12 text-center bg-indigo-50/30 rounded-[3rem] border border-dashed border-indigo-100 flex flex-col items-center">
          <div className="text-7xl mb-6 animate-pulse">☁️</div>
          <p className="text-indigo-900 font-black text-lg">Cloudflare Edge Generator</p>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px] mt-1">Isolate Instance: Ready</p>
        </div>
      )}

      {loading && terminalLogs.length > 0 && (
        <div className="bg-slate-900 p-6 rounded-2xl font-mono text-[10px] text-emerald-500/80 space-y-1 shadow-2xl">
          {terminalLogs.map((log, i) => <div key={i} className="animate-pulse">{log}</div>)}
        </div>
      )}
    </div>
  );

  return (
    <ToolLayout
      title={slug.replace(/-/g, ' ')}
      description="Hardened Cloudflare Edge utility node."
      icon="🛡️"
      colorClass="bg-indigo-700"
      input={inputSlot}
      actions={
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <button 
            onClick={handleProcess} 
            disabled={loading} 
            className="flex-grow py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-xl shadow-2xl hover:bg-indigo-700 transition-all transform active:scale-95 disabled:opacity-50"
          >
            {loading ? "Synchronizing..." : "Execute Logic Node"}
          </button>
          {(outputVal || qrUrl) && (
            <button 
              onClick={() => { navigator.clipboard.writeText(outputVal || inputVal); onSuccess("Copied!"); }}
              className="py-6 px-10 bg-slate-900 text-white rounded-[2rem] font-black text-xl shadow-xl hover:bg-slate-800 transition-all"
            >
              Copy Result
            </button>
          )}
        </div>
      }
      result={(outputVal || qrUrl) && (
        <div className="animate-in zoom-in-95 duration-500">
          {qrUrl ? (
            <div className="flex flex-col items-center py-6">
              <div className="p-4 bg-white rounded-[3rem] shadow-2xl border border-slate-100">
                <img src={qrUrl} alt="QR" className="w-64 h-64 rounded-2xl" />
              </div>
              <a href={qrUrl} download={`qr_${Date.now()}.png`} className="mt-8 px-10 py-4 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 shadow-lg">Save QR Image</a>
            </div>
          ) : (
            <div className="relative group">
               <div className="absolute top-4 left-6 text-[8px] font-black text-slate-500 uppercase tracking-widest z-10">Output Buffer</div>
               <textarea 
                readOnly 
                value={outputVal} 
                className="w-full h-64 p-10 bg-slate-950 text-emerald-400 font-mono text-xs border-none outline-none resize-none rounded-[3rem] shadow-2xl scrollbar-thin scrollbar-thumb-slate-800" 
              />
            </div>
          )}
        </div>
      )}
    />
  );
};

export default GeneralTools;