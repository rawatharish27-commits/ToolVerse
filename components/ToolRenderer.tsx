import React, { useState, lazy, Suspense } from 'react';
import { GoogleGenAI } from "@google/genai";

// Lazy load category modules for better initial bundle size
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

  // --- Dispatcher logic ---
  
  // SEO Automation - Phase 2 Step 7 Expanded
  const seoSlugs = [
    'xml-sitemap-generator', 'json-ld-schema-pro', 'canonical-tag-generator', 
    'hreflang-tag-generator', 'index-now-ping', 'keyword-density', 'meta-generator', 
    'robots-generator', 'sitemap-generator', 'utm-builder', 'serp-preview', 'speed-test', 
    'broken-link', 'schema-generator', 'og-generator'
  ];
  if (seoSlugs.includes(slug)) {
    return (
      <Suspense fallback={<Loader label="SEO Engine" />}>
        <SEOTools slug={slug} onSuccess={onSuccess} onError={onError} />
      </Suspense>
    );
  }

  // Media (Video/Audio) - Phase 2 Step 4 Expanded
  const mediaSlugs = [
    'video-compressor', 'video-to-mp3', 'audio-converter', 'video-cutter', 'audio-trimmer', 
    'gif-maker', 'screen-recorder', 'video-resizer', 'video-converter-pro', 'audio-converter-pro',
    'video-mute', 'video-merger', 'video-speed-changer', 'audio-reverse', 'video-to-gif-high-res',
    'audio-noise-gate', 'video-metadata-viewer', 'audio-merger-pro'
  ];
  if (mediaSlugs.includes(slug)) {
    return (
      <Suspense fallback={<Loader label="Media Engine" />}>
        <VideoAudioTools slug={slug} onSuccess={onSuccess} onError={onError} />
      </Suspense>
    );
  }

  // Office & Productivity - Phase 2 Step 5 Expanded
  const officeSlugs = [
    'csv-to-xlsx', 'xlsx-to-csv', 'json-to-excel', 'excel-to-pdf', 
    'word-to-pdf-converter', 'pdf-to-docx-converter', 'vcard-generator'
  ];
  if (officeSlugs.includes(slug)) {
    return (
      <Suspense fallback={<Loader label="Office Engine" />}>
        <OfficeTools slug={slug} onSuccess={onSuccess} onError={onError} />
      </Suspense>
    );
  }

  // Image Tools (Phase 2 Step 2 Upgraded)
  const imageSlugs = [
    'heic-to-jpg', 'background-remover', 'photo-enhancer', 'passport-photo-maker', 
    'image-color-extractor', 'image-resizer-pro', 'watermark-adder', 'image-to-text-ocr', 
    'batch-image-converter', 'meme-generator-pro', 'image-compressor', 'meme-generator'
  ];
  if (imageSlugs.includes(slug)) {
    return (
      <Suspense fallback={<Loader label="Image Engine" />}>
        <ImageTools slug={slug} onSuccess={onSuccess} onError={onError} />
      </Suspense>
    );
  }

  // PDF Tools (Phase 2 Step 3 Upgraded)
  if (slug.includes('pdf') || ['word-to-pdf'].includes(slug)) {
    return (
      <Suspense fallback={<Loader label="PDF Engine" />}>
        <PDFTools slug={slug} onSuccess={onSuccess} onError={onError} />
      </Suspense>
    );
  }

  // Finance Tools
  const financeSlugs = [
    'emi-calculator', 'sip-calculator', 'home-loan-calculator', 'personal-loan-calculator', 
    'gst-calculator', 'income-tax-calculator', 'roi-calculator', 'fd-calculator', 'cagr-calculator', 
    'currency-converter'
  ];
  if (financeSlugs.includes(slug)) {
    return (
      <Suspense fallback={<Loader label="Finance Engine" />}>
        <FinanceTools slug={slug} />
      </Suspense>
    );
  }

  // AI Implementation
  if (slug === 'ai-article-writer') {
    const handleGenerate = async () => {
      setLoading(true);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
        const response = await ai.models.generateContent({
          model: 'gemini-3-pro-preview',
          contents: `Write a high-quality article about: ${inputText}`,
        });
        setInputText(response.text || "Empty response.");
        onSuccess("Article Generated!");
      } catch (err) {
        onError("AI generation failed.");
      } finally {
        setLoading(false);
      }
    };
    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">✍️</div>
          <h3 className="text-xl font-bold">AI Content Writer</h3>
        </div>
        <textarea 
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          placeholder="Enter topic or headline..."
          className="w-full h-64 p-6 rounded-3xl border focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        <button 
          onClick={handleGenerate} 
          disabled={loading}
          className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-xl shadow-xl disabled:opacity-50"
        >
          {loading ? "AI is thinking..." : "Generate Pro Article"}
        </button>
      </div>
    );
  }

  // Text Utilities Fallback
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center px-2">
         <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Text Engine Ready</span>
         <button onClick={() => setInputText('')} className="text-[10px] font-bold text-red-500 hover:underline">Clear</button>
      </div>
      <textarea 
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Input content for processing..."
        className="w-full h-64 p-8 rounded-[2.5rem] border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 outline-none font-mono text-sm leading-relaxed"
      />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <UtilBtn onClick={() => setInputText(inputText.toUpperCase())} label="UPPERCASE" />
        <UtilBtn onClick={() => setInputText(inputText.toLowerCase())} label="lowercase" />
        <UtilBtn onClick={() => setInputText(btoa(inputText))} label="Base64" />
        <UtilBtn onClick={() => {
          navigator.clipboard.writeText(inputText);
          onSuccess("Copied!");
        }} label="Copy All" />
      </div>
    </div>
  );
};

const Loader = ({ label }: { label: string }) => (
  <div className="h-64 flex flex-col items-center justify-center space-y-4">
    <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
    <div className="animate-pulse text-indigo-500 font-bold uppercase tracking-widest text-xs">Loading {label}...</div>
  </div>
);

const UtilBtn = ({ onClick, label }: any) => (
  <button onClick={onClick} className="px-4 py-3 bg-slate-100 rounded-xl text-[10px] font-black tracking-widest hover:bg-indigo-600 hover:text-white transition-all">
    {label}
  </button>
);

export default ToolRenderer;