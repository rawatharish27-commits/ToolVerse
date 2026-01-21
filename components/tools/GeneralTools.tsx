import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import ToolLayout from '../ToolLayout';

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
    if (slug === 'password-generator' || slug === 'lorem-ipsum-generator') {
      handleProcess();
    }
  }, [slug]);

  const handleProcess = async () => {
    setLoading(true);
    try {
      let result = '';
      
      switch (slug) {
        case 'json-formatter':
          result = JSON.stringify(JSON.parse(inputVal), null, 4);
          break;
        case 'base64-encoder':
          result = btoa(inputVal);
          break;
        case 'base64-decoder':
          result = atob(inputVal);
          break;
        case 'html-minifier':
          result = inputVal.replace(/\n/g, '').replace(/\s\s+/g, ' ');
          break;
        case 'lorem-ipsum-generator':
          const words = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat".split(" ");
          result = Array.from({ length: 150 }).map(() => words[Math.floor(Math.random() * words.length)]).join(" ") + ".";
          break;
        case 'password-generator':
          const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
          result = Array.from({ length: 16 }).map(() => charset[Math.floor(Math.random() * charset.length)]).join("");
          break;
        case 'qr-code-generator':
          if (!inputVal) throw new Error("URL/Text required");
          const url = await QRCode.toDataURL(inputVal, { width: 512, margin: 2 });
          setQrUrl(url);
          onSuccess("QR Code Generated");
          setLoading(false);
          return;
        default:
          result = inputVal.split('').reverse().join('');
      }

      setOutputVal(result);
      if (!['password-generator', 'lorem-ipsum-generator'].includes(slug) || inputVal) {
        onSuccess("Processing Complete");
      }
    } catch (err) {
      onError("Processing failed. Please check input format.");
    }
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputVal || qrUrl);
    onSuccess("Copied to clipboard!");
  };

  const inputSlot = (
    <>
      {slug !== 'password-generator' && slug !== 'lorem-ipsum-generator' && (
        <textarea 
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder={slug === 'qr-code-generator' ? "Enter URL or text to encode..." : "Paste your content here..."}
          className="w-full h-64 md:h-80 p-0 text-slate-700 font-mono text-base bg-transparent border-none outline-none resize-none placeholder:text-slate-300 scrollbar-thin scrollbar-thumb-slate-100"
        />
      )}
      {(slug === 'password-generator' || slug === 'lorem-ipsum-generator') && (
        <div className="py-20 text-center flex flex-col items-center">
          <div className="text-6xl mb-6 opacity-20">⚙️</div>
          <p className="text-slate-400 font-medium">Automated generation engine active.</p>
        </div>
      )}
    </>
  );

  const actionsSlot = (
    <div className="flex flex-col sm:flex-row gap-4 w-full">
      <button 
        onClick={handleProcess} 
        disabled={loading}
        className="flex-grow py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg shadow-xl hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-50"
      >
        {loading ? "Processing..." : slug === 'password-generator' ? "Generate Password" : slug === 'lorem-ipsum-generator' ? "Generate Placeholder Text" : "Run Processing"}
      </button>
      {(outputVal || qrUrl) && (
        <button onClick={handleCopy} className="py-5 px-10 bg-slate-900 text-white rounded-2xl font-black text-lg shadow-xl hover:bg-slate-800 transition-all">
          Copy to Clipboard
        </button>
      )}
    </div>
  );

  const resultSlot = (
    <div className="space-y-6">
      {qrUrl && (
        <div className="flex flex-col items-center justify-center py-6">
          <div className="p-6 bg-white rounded-[2rem] shadow-2xl border border-slate-100 mb-8">
            <img src={qrUrl} alt="QR Code" className="w-64 h-64 md:w-80 md:h-80" />
          </div>
          <a href={qrUrl} download="toolverse_qr.png" className="px-8 py-3 bg-indigo-50 text-indigo-600 rounded-xl font-black text-xs tracking-widest uppercase hover:bg-indigo-100 transition-colors">
            Save as Image
          </a>
        </div>
      )}

      {outputVal && (
        <textarea 
          readOnly 
          value={outputVal}
          className="w-full h-64 p-0 text-slate-700 font-mono text-base bg-transparent border-none outline-none resize-none scrollbar-thin scrollbar-thumb-slate-100"
        />
      )}
    </div>
  );

  return (
    <ToolLayout
      title={slug.replace(/-/g, ' ')}
      description={`Professional ${slug.replace(/-/g, ' ')} for high-performance developer and office workflows.`}
      icon="🛠️"
      input={inputSlot}
      actions={actionsSlot}
      result={(outputVal || qrUrl) ? resultSlot : undefined}
    />
  );
};

export default GeneralTools;