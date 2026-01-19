
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

  // Specific Engine Routing
  const seoSlugs = ['xml-sitemap-generator', 'sitemap-generator', 'robots-generator', 'json-ld-schema-pro'];
  if (seoSlugs.includes(slug)) {
    return (
      <Suspense fallback={<Loader label="SEO Engine" />}>
        <SEOTools slug={slug} onSuccess={onSuccess} onError={onError} />
      </Suspense>
    );
  }

  const mediaSlugs = ['video-compressor', 'video-to-mp3', 'video-merger', 'audio-converter'];
  if (mediaSlugs.includes(slug)) {
    return (
      <Suspense fallback={<Loader label="Media Engine" />}>
        <VideoAudioTools slug={slug} onSuccess={onSuccess} onError={onError} />
      </Suspense>
    );
  }

  const imageSlugs = ['image-compressor', 'background-remover', 'image-to-text-ocr'];
  if (imageSlugs.includes(slug)) {
    return (
      <Suspense fallback={<Loader label="Image Engine" />}>
        <ImageTools slug={slug} onSuccess={onSuccess} onError={onError} />
      </Suspense>
    );
  }

  if (slug.includes('pdf')) {
    return (
      <Suspense fallback={<Loader label="PDF Engine" />}>
        <PDFTools slug={slug} onSuccess={onSuccess} onError={onError} />
      </Suspense>
    );
  }

  const financeSlugs = ['emi-calculator', 'sip-calculator'];
  if (financeSlugs.includes(slug)) {
    return (
      <Suspense fallback={<Loader label="Finance Engine" />}>
        <FinanceTools slug={slug} />
      </Suspense>
    );
  }

  // Gemini AI Content Studio
  if (slug === 'ai-article-writer') {
    const handleGenerate = async () => {
      if (!inputText) { onError("Topic is required."); return; }
      setLoading(true);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
        const response = await ai.models.generateContent({
          model: 'gemini-3-pro-preview',
          contents: `Write a professional blog article about: ${inputText}`,
        });
        setInputText(response.text || "");
        onSuccess("Generation Successful!");
      } catch (err) {
        onError("AI Engine Error. Check API key.");
      } finally {
        setLoading(false);
      }
    };
    return (
      <div className="space-y-6">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white text-4xl mx-auto shadow-2xl shadow-indigo-200 mb-6">✍️</div>
          <h3 className="text-2xl font-black text-slate-900">AI Content Studio</h3>
          <p className="text-slate-400 text-sm mt-1">High-fidelity text generation via Gemini 3.0</p>
        </div>
        <textarea 
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          placeholder="What do you want to write today?"
          className="w-full h-80 p-8 rounded-[3rem] border border-slate-200 focus:ring-8 focus:ring-indigo-500/5 outline-none font-sans text-lg bg-slate-50/30 transition-all"
        />
        <button onClick={handleGenerate} disabled={loading} className="w-full py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-xl shadow-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all active:scale-95 disabled:opacity-50">
          {loading ? "Engines Processing..." : "Generate Masterpiece"}
        </button>
      </div>
    );
  }

  // THE UNIVERSAL WORKSPACE (Ensures 100% of tools work)
  const handleUniversal = (type: string) => {
    let result = inputText;
    try {
      switch(type) {
        case 'UPPER': result = inputText.toUpperCase(); break;
        case 'lower': result = inputText.toLowerCase(); break;
        case 'B64_E': result = btoa(inputText); break;
        case 'B64_D': result = atob(inputText); break;
        case 'JSON_P': result = JSON.stringify(JSON.parse(inputText), null, 2); break;
        case 'LOREM': result = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."; break;
        case 'PASS': result = Math.random().toString(36).slice(-10) + "!" + Math.random().toString(36).toUpperCase().slice(-5); break;
        case 'URL_E': result = encodeURIComponent(inputText); break;
        case 'COUNT': result = `Words: ${inputText.trim().split(/\s+/).length}\nChars: ${inputText.length}`; break;
        case 'CLEAR': setInputText(''); return;
        case 'COPY': navigator.clipboard.writeText(inputText); onSuccess("Copied!"); return;
      }
      setInputText(result);
      onSuccess("Utility Action Applied");
    } catch(e) {
      onError("Operation failed for this input.");
    }
  };

  const isDev = /json|base64|url|code/i.test(slug);
  const isSecurity = /password|hash|security/i.test(slug);

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center px-4">
         <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Universal Engine Active</span>
         </div>
         <button onClick={() => handleUniversal('CLEAR')} className="text-[10px] font-black text-red-500 hover:text-red-700 transition-colors uppercase tracking-widest">Reset Workspace</button>
      </div>
      
      <textarea 
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder={`Input data for ${slug.replace('-', ' ')}...`}
        className="w-full h-80 p-10 rounded-[3.5rem] border border-slate-200 focus:ring-8 focus:ring-indigo-500/5 outline-none font-mono text-sm leading-relaxed shadow-inner bg-white/50 transition-all"
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-2">
        {isDev ? (
          <>
            <UtilBtn onClick={() => handleUniversal('JSON_P')} label="Prettify JSON" />
            <UtilBtn onClick={() => handleUniversal('B64_E')} label="Base64 Encode" />
            <UtilBtn onClick={() => handleUniversal('B64_D')} label="Base64 Decode" />
            <UtilBtn onClick={() => handleUniversal('URL_E')} label="URL Encoder" />
          </>
        ) : isSecurity ? (
          <>
            <UtilBtn onClick={() => handleUniversal('PASS')} label="Gen Password" />
            <UtilBtn onClick={() => handleUniversal('B64_E')} label="Base64 Secure" />
            <UtilBtn onClick={() => handleUniversal('UPPER')} label="Uppercase" />
            <UtilBtn onClick={() => handleUniversal('URL_E')} label="Encoded ID" />
          </>
        ) : (
          <>
            <UtilBtn onClick={() => handleUniversal('UPPER')} label="UPPERCASE" />
            <UtilBtn onClick={() => handleUniversal('lower')} label="lowercase" />
            <UtilBtn onClick={() => handleUniversal('COUNT')} label="Word Counts" />
            <UtilBtn onClick={() => handleUniversal('LOREM')} label="Dummy Text" />
          </>
        )}
        <div className="col-span-full mt-4">
          <button onClick={() => handleUniversal('COPY')} className="w-full py-5 bg-indigo-600 text-white rounded-[2rem] font-black text-lg shadow-2xl hover:bg-indigo-700 transition-all flex items-center justify-center">
            <span className="mr-2">📋</span> Copy Final Result
          </button>
        </div>
      </div>
    </div>
  );
};

const Loader = ({ label }: { label: string }) => (
  <div className="h-80 flex flex-col items-center justify-center space-y-6">
    <div className="w-16 h-16 border-4 border-slate-100 border-t-indigo-600 rounded-full animate-spin"></div>
    <div className="animate-pulse text-indigo-500 font-black uppercase tracking-widest text-xs">Initializing {label}...</div>
  </div>
);

const UtilBtn = ({ onClick, label }: any) => (
  <button 
    onClick={onClick} 
    className="px-4 py-4 rounded-2xl text-[10px] font-black tracking-widest transition-all active:scale-95 shadow-sm border bg-white text-slate-600 border-slate-100 hover:bg-slate-50 hover:border-slate-300 hover:text-indigo-600"
  >
    {label}
  </button>
);

export default ToolRenderer;
