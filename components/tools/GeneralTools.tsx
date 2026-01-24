
import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import ToolLayout from '../ToolLayout';
import { executeTool } from '../../services/executionEngine';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const GeneralTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [inputVal, setInputVal] = useState('');
  const [outputVal, setOutputVal] = useState('');
  const [qrUrl, setQrUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setInputVal('');
    setOutputVal('');
    setQrUrl('');
    if (slug === 'password-generator' || slug === 'lorem-ipsum-generator') {
      handleProcess();
    }
  }, [slug]);

  const handleProcess = async () => {
    // QR Code remains client-side for instant UX (Privacy-safe)
    if (slug === 'qr-code-generator') {
      if (!inputVal) return onError("URL/Text required");
      try {
        const url = await QRCode.toDataURL(inputVal, { width: 512, margin: 2 });
        setQrUrl(url);
        onSuccess("QR Code Generated locally.");
      } catch (e) { onError("QR Generation failed."); }
      return;
    }

    setLoading(true);
    try {
      const res = await executeTool({
        slug,
        category: 'utility',
        input: inputVal
      });

      if (res.success) {
        // Backend returns either 'output' string or object
        const finalData = typeof res.data === 'string' ? res.data : (res.data.output || res.data.formatted || JSON.stringify(res.data, null, 2));
        setOutputVal(finalData);
        onSuccess("Backend Processing Complete");
      } else {
        onError(res.error || "Execution failed.");
      }
    } catch (err) {
      onError("Cloudflare Edge unavailable.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputVal || qrUrl);
    onSuccess("Copied!");
  };

  const inputSlot = (
    <div className="space-y-4">
      {slug !== 'password-generator' && slug !== 'lorem-ipsum-generator' && (
        <textarea 
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder={slug === 'qr-code-generator' ? "Enter URL or text to encode..." : "Paste content for backend processing..."}
          className="w-full h-48 p-6 bg-slate-50 border border-slate-200 rounded-3xl outline-none font-mono text-sm text-slate-700 shadow-inner resize-none"
        />
      )}
      {(slug === 'password-generator' || slug === 'lorem-ipsum-generator') && (
        <div className="py-12 text-center flex flex-col items-center">
          <div className="text-6xl mb-4">☁️</div>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Cloudflare Edge Generator Active</p>
        </div>
      )}
    </div>
  );

  return (
    <ToolLayout
      title={slug.replace(/-/g, ' ')}
      description="Backend-powered professional utility."
      icon="🛠️"
      input={inputSlot}
      actions={
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <button onClick={handleProcess} disabled={loading} className="flex-grow py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg shadow-xl hover:bg-indigo-700 disabled:opacity-50">
            {loading ? "Syncing..." : "Run Tool Logic"}
          </button>
          {(outputVal || qrUrl) && (
            <button onClick={handleCopy} className="py-5 px-10 bg-slate-900 text-white rounded-2xl font-black text-lg shadow-xl">
              Copy Output
            </button>
          )}
        </div>
      }
      result={(outputVal || qrUrl) && (
        <div className="animate-in fade-in">
          {qrUrl ? (
            <div className="flex flex-col items-center py-6">
              <img src={qrUrl} alt="QR" className="w-64 h-64 border-8 border-slate-50 rounded-3xl shadow-2xl mb-6" />
              <a href={qrUrl} download="qr.png" className="text-xs font-black text-indigo-600 uppercase tracking-widest hover:underline">Save Image</a>
            </div>
          ) : (
            <textarea readOnly value={outputVal} className="w-full h-64 p-6 bg-slate-900 text-emerald-400 font-mono text-xs border-none outline-none resize-none rounded-3xl" />
          )}
        </div>
      )}
    />
  );
};

export default GeneralTools;
