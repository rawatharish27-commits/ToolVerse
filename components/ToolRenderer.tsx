
import React, { useState, lazy, Suspense, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { trackEvent } from '../utils/analytics';

const VideoAudioTools = lazy(() => import('./tools/VideoAudioTools'));
const FinanceTools = lazy(() => import('./tools/FinanceTools'));
const PDFTools = lazy(() => import('./tools/PDFTools'));
const ImageTools = lazy(() => import('./tools/ImageTools'));
const OfficeTools = lazy(() => import('./tools/OfficeTools'));
const SEOTools = lazy(() => import('./tools/SEOTools'));

interface ToolRendererProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const ToolRenderer: React.FC<ToolRendererProps> = ({ slug, onSuccess, onError }) => {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setInputText('');
  }, [slug]);

  // Specific Engine Routing logic
  const isVideoAudio = /video|audio|mp3|mp4|gif|mute|merger|speed|reverse|trimmer/i.test(slug);
  const isImage = /image|photo|heic|compressor|remover|enhancer|ocr|meme/i.test(slug) && !slug.includes('video');
  const isPDF = /pdf/i.test(slug);
  const isFinance = /calculator|emi|sip|loan|gst|tax/i.test(slug);
  const isSEO = /sitemap|robots|schema|og|canonical|meta|ping/i.test(slug);
  const isOffice = /csv|xlsx|excel|json|vcard|docx|word/i.test(slug) && !isSEO;

  if (isSEO) {
    return (
      <Suspense fallback={<Loader label="SEO Suite" />}>
        <SEOTools slug={slug} onSuccess={onSuccess} onError={onError} />
      </Suspense>
    );
  }

  if (isVideoAudio) {
    return (
      <Suspense fallback={<Loader label="Media Lab" />}>
        <VideoAudioTools slug={slug} onSuccess={onSuccess} onError={onError} />
      </Suspense>
    );
  }

  if (isImage) {
    return (
      <Suspense fallback={<Loader label="Studio" />}>
        <ImageTools slug={slug} onSuccess={onSuccess} onError={onError} />
      </Suspense>
    );
  }

  if (isPDF) {
    return (
      <Suspense fallback={<Loader label="PDF Engine" />}>
        <PDFTools slug={slug} onSuccess={onSuccess} onError={onError} />
      </Suspense>
    );
  }

  if (isFinance) {
    return (
      <Suspense fallback={<Loader label="Finance Engine" />}>
        <FinanceTools slug={slug} />
      </Suspense>
    );
  }

  if (isOffice) {
    return (
      <Suspense fallback={<Loader label="Office Engine" />}>
        <OfficeTools slug={slug} onSuccess={onSuccess} onError={onError} />
      </Suspense>
    );
  }

  // Gemini AI Content Studio
  if (slug === 'ai-article-writer') {
    const handleGenerate = async () => {
      if (!inputText) { onError("Please specify a topic."); return; }
      setLoading(true);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
        const response = await ai.models.generateContent({
          model: 'gemini-3-pro-preview',
          contents: `Create an expert-level, highly detailed blog article about: ${inputText}. Use professional formatting.`,
        });
        setInputText(response.text || "");
        onSuccess("AI masterpiece generated successfully.");
      } catch (err) {
        onError("AI capacity reached or API error. Verify credentials.");
      } finally {
        setLoading(false);
      }
    };
    return (
      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center mb-10">
          <div className="w-24 h-24 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-[2.5rem] flex items-center justify-center text-white text-5xl mx-auto shadow-2xl shadow-indigo-200 mb-8 transform hover:scale-110 transition-transform cursor-pointer">✍️</div>
          <h3 className="text-3xl font-black text-slate-900 tracking-tight">AI Content Studio</h3>
          <p className="text-slate-400 text-sm mt-2 font-medium">Powered by Gemini Pro 3.0 Generation Engine</p>
        </div>
        <textarea 
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          placeholder="Topic, keyword, or summary for your content..."
          className="w-full h-96 p-10 rounded-[3.5rem] border border-slate-200 focus:ring-8 focus:ring-indigo-500/5 outline-none font-sans text-xl leading-relaxed bg-slate-50/50 shadow-inner transition-all placeholder:text-slate-300"
        />
        <button onClick={handleGenerate} disabled={loading} className="w-full py-8 bg-indigo-600 text-white rounded-[2.5rem] font-black text-2xl shadow-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center space-x-4">
          {loading ? (
            <><div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div><span>Thinking...</span></>
          ) : (
            <span>Launch Generation</span>
          )}
        </button>
      </div>
    );
  }

  // --- UNIVERSAL ENGINE: SMART ACTION DISPATCHER ---
  const handleUniversal = (type: string) => {
    if (!inputText && type !== 'LOREM' && type !== 'PASS') {
      onError("Please enter data first.");
      return;
    }
    let result = inputText;
    try {
      switch(type) {
        case 'UPPER': result = inputText.toUpperCase(); break;
        case 'lower': result = inputText.toLowerCase(); break;
        case 'B64_E': result = btoa(inputText); break;
        case 'B64_D': result = atob(inputText); break;
        case 'JSON_P': result = JSON.stringify(JSON.parse(inputText), null, 2); break;
        case 'LOREM': result = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Nullam ac erat ante. Nam elementum, nisi a convallis finibus, lectus eros finibus."; break;
        case 'PASS': result = Math.random().toString(36).slice(-10) + "!" + Math.random().toString(36).toUpperCase().slice(-5) + "@" + Date.now().toString().slice(-4); break;
        case 'URL_E': result = encodeURIComponent(inputText); break;
        case 'URL_D': result = decodeURIComponent(inputText); break;
        case 'COUNT': result = `Total Words: ${inputText.trim().split(/\s+/).length}\nCharacters (with spaces): ${inputText.length}\nCharacters (no spaces): ${inputText.replace(/\s/g, '').length}`; break;
        case 'CLEAR': setInputText(''); return;
        case 'COPY': navigator.clipboard.writeText(inputText); onSuccess("Data copied to clipboard."); return;
      }
      setInputText(result);
      onSuccess("Utility execution successful.");
    } catch(e) {
      onError("Processing Error: Data format invalid for this operation.");
    }
  };

  const isDev = /json|base64|url|code|dev|format/i.test(slug);
  const isSecurity = /password|hash|security|encrypt|decrypt/i.test(slug);

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex justify-between items-center px-4">
         <div className="flex items-center space-x-4">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_12px_rgba(16,185,129,0.6)]"></div>
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Universal Engine V2.0</span>
         </div>
         <button onClick={() => handleUniversal('CLEAR')} className="text-[10px] font-black text-red-500 hover:text-red-700 transition-colors uppercase tracking-[0.2em] px-4 py-2 bg-red-50 rounded-full hover:bg-red-100">Clear Workspace</button>
      </div>
      
      <div className="relative">
        <textarea 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={`Enter input for ${slug.replace('-', ' ')}...`}
          className="w-full h-80 p-10 rounded-[3.5rem] border border-slate-200 focus:ring-8 focus:ring-indigo-500/5 outline-none font-mono text-sm leading-relaxed shadow-inner bg-white/50 transition-all placeholder:text-slate-200"
        />
        <div className="absolute bottom-6 right-10 text-[10px] font-bold text-slate-300 pointer-events-none">
          {inputText.length} chars
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-2">
        {isDev ? (
          <>
            <UtilBtn onClick={() => handleUniversal('JSON_P')} label="Prettify JSON" />
            <UtilBtn onClick={() => handleUniversal('B64_E')} label="Base64 Enc" />
            <UtilBtn onClick={() => handleUniversal('B64_D')} label="Base64 Dec" />
            <UtilBtn onClick={() => handleUniversal('URL_E')} label="URL Encoder" />
          </>
        ) : isSecurity ? (
          <>
            <UtilBtn onClick={() => handleUniversal('PASS')} label="Generate Key" />
            <UtilBtn onClick={() => handleUniversal('B64_E')} label="Mask Data" />
            <UtilBtn onClick={() => handleUniversal('UPPER')} label="Upper-Safe" />
            <UtilBtn onClick={() => handleUniversal('URL_E')} label="Secure URL" />
          </>
        ) : (
          <>
            <UtilBtn onClick={() => handleUniversal('UPPER')} label="UPPERCASE" />
            <UtilBtn onClick={() => handleUniversal('lower')} label="lowercase" />
            <UtilBtn onClick={() => handleUniversal('COUNT')} label="Word Stats" />
            <UtilBtn onClick={() => handleUniversal('LOREM')} label="Dummy Data" />
          </>
        )}
        <div className="col-span-full pt-6">
          <button onClick={() => handleUniversal('COPY')} className="w-full py-6 bg-slate-900 text-white rounded-[2.5rem] font-black text-xl shadow-2xl hover:bg-indigo-600 transition-all flex items-center justify-center space-x-3 group">
            <span className="text-2xl transition-transform group-hover:scale-125">📋</span> 
            <span>Copy Final Output</span>
          </button>
        </div>
      </div>

      <div className="mx-4 p-6 bg-slate-900/5 rounded-3xl border border-slate-900/10 text-[11px] text-slate-500 font-bold text-center leading-relaxed">
        <span className="text-slate-800">🔐 Privacy Check:</span> No data is transmitted. All transformations occur exclusively within your browser's V8 engine instance.
      </div>
    </div>
  );
};

const Loader = ({ label }: { label: string }) => (
  <div className="h-96 flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-500">
    <div className="relative w-20 h-20">
      <div className="absolute inset-0 border-[5px] border-slate-100 rounded-full"></div>
      <div className="absolute inset-0 border-[5px] border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
    </div>
    <div className="text-center">
      <div className="text-indigo-600 font-black uppercase tracking-[0.4em] text-xs mb-2">Engaging Core</div>
      <div className="text-slate-400 font-bold text-[10px] uppercase animate-pulse">{label} Boot Sequence...</div>
    </div>
  </div>
);

const UtilBtn = ({ onClick, label }: any) => (
  <button 
    onClick={onClick} 
    className="px-4 py-5 rounded-[1.5rem] text-[10px] font-black tracking-widest transition-all active:scale-95 shadow-sm border bg-white text-slate-600 border-slate-100 hover:bg-slate-900 hover:text-white hover:border-slate-900 hover:-translate-y-1"
  >
    {label}
  </button>
);

export default ToolRenderer;
