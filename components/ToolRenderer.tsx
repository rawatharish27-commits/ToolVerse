
import React, { useState, lazy, Suspense, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { trackEvent } from '../utils/analytics';

const VideoAudioTools = lazy(() => import('./tools/VideoAudioTools'));
const FinanceTools = lazy(() => import('./tools/FinanceTools'));
const PDFTools = lazy(() => import('./tools/PDFTools'));
const ImageTools = lazy(() => import('./tools/ImageTools'));
const SEOTools = lazy(() => import('./tools/SEOTools'));
const OfficeTools = lazy(() => import('./tools/OfficeTools'));
const GeneralTools = lazy(() => import('./tools/GeneralTools'));

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

  // CATEGORY ROUTING ENGINE
  const isVideoAudio = /video|audio|mp3|mp4|gif|mute|merger|speed|reverse|trimmer|noise|vol|join/i.test(slug);
  const isImage = /image|photo|heic|compressor|resizer|remover|enhancer|ocr|meme|crop|resize|webp|jpg|png|color/i.test(slug) && !slug.includes('video');
  const isPDF = /pdf|word-to-pdf|doc-to-pdf|pdf-to/i.test(slug);
  const isFinance = /calculator|emi|sip|loan|gst|tax|interest|rd|fd|roi|bmi|age|percentage|gpa/i.test(slug);
  const isSEO = /sitemap|robots|schema|og|canonical|meta|ping|keyword|backlink|authority|serp|aud/i.test(slug);
  const isOffice = /csv|xlsx|excel|json|vcard|docx|word|pptx/i.test(slug) && !isSEO;
  const isAI = /ai-|writer|generator|summarizer|paraphraser|checker|builder|caption|script|promp/i.test(slug);
  
  // GENERAL UTILITY (Case converter, Word count, Password Gen, etc)
  const isGeneral = /json-formatter|base64|minifier|lorem|password|qr|word-counter|case-converter/i.test(slug);

  if (isSEO) return <Suspense fallback={<Loader label="SEO Engine" />}><SEOTools slug={slug} onSuccess={onSuccess} onError={onError} /></Suspense>;
  if (isVideoAudio) return <Suspense fallback={<Loader label="Media Lab" />}><VideoAudioTools slug={slug} onSuccess={onSuccess} onError={onError} /></Suspense>;
  if (isImage) return <Suspense fallback={<Loader label="Image Processor" />}><ImageTools slug={slug} onSuccess={onSuccess} onError={onError} /></Suspense>;
  if (isPDF) return <Suspense fallback={<Loader label="PDF Hub" />}><PDFTools slug={slug} onSuccess={onSuccess} onError={onError} /></Suspense>;
  if (isFinance) return <Suspense fallback={<Loader label="Calc Engine" />}><FinanceTools slug={slug} /></Suspense>;
  if (isOffice) return <Suspense fallback={<Loader label="Office Suite" />}><OfficeTools slug={slug} onSuccess={onSuccess} onError={onError} /></Suspense>;
  if (isGeneral) return <Suspense fallback={<Loader label="Utility Engine" />}><GeneralTools slug={slug} onSuccess={onSuccess} onError={onError} /></Suspense>;

  // AI STUDIO ENGINE
  if (isAI) {
    const handleAIGenerate = async () => {
      if (!inputText) { onError("Input is required."); return; }
      setLoading(true);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
        let sys = "You are a professional digital content creator. Provide structured markdown output.";
        if (slug.includes('writer')) sys = "Write a comprehensive 1000-word SEO-optimized article.";
        if (slug.includes('summarizer')) sys = "Provide a concise summary of the following text.";
        if (slug.includes('resume')) sys = "Build a professional resume structure based on user details.";

        const response = await ai.models.generateContent({
          model: 'gemini-3-pro-preview',
          contents: `${sys}\nUser Prompt: ${inputText}`,
        });
        setInputText(response.text || "");
        onSuccess("AI Synthesis Complete");
      } catch (err) {
        onError("AI Engine capacity reached.");
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="space-y-8 md:space-y-12 animate-in fade-in duration-500">
        <div className="text-center">
          <div className="w-16 h-16 md:w-24 md:h-24 bg-indigo-600 rounded-2xl md:rounded-[2.5rem] flex items-center justify-center text-white text-3xl md:text-5xl mx-auto shadow-2xl mb-4 md:mb-6">✨</div>
          <h3 className="text-2xl md:text-3xl font-black text-slate-900 capitalize">{slug.replace(/-/g, ' ')}</h3>
          <p className="text-slate-400 text-xs md:text-sm mt-1 md:mt-2">Next-Gen Content Engineering via Gemini 3.0</p>
        </div>
        <textarea 
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          placeholder="Describe your requirements or paste text..."
          className="w-full h-64 md:h-80 p-6 md:p-10 rounded-2xl md:rounded-[3.5rem] border border-slate-200 focus:ring-8 focus:ring-indigo-500/5 outline-none font-sans text-base md:text-lg bg-white shadow-inner transition-all"
        />
        <button onClick={handleAIGenerate} disabled={loading} className="w-full py-5 md:py-7 bg-indigo-600 text-white rounded-2xl md:rounded-[2rem] font-black text-lg md:text-2xl shadow-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all active:scale-95 disabled:opacity-50">
          {loading ? "Engaging AI Core..." : "Generate Masterpiece"}
        </button>
      </div>
    );
  }

  // LAST RESORT FALLBACK - Simple Text Processor
  return <Suspense fallback={<Loader label="Utility Engine" />}><GeneralTools slug={slug} onSuccess={onSuccess} onError={onError} /></Suspense>;
};

const Loader = ({ label }: { label: string }) => (
  <div className="h-64 md:h-80 flex flex-col items-center justify-center space-y-4 md:space-y-6">
    <div className="w-10 h-10 md:w-12 md:h-12 border-[4px] border-slate-100 border-t-indigo-600 rounded-full animate-spin"></div>
    <div className="animate-pulse text-indigo-500 font-black uppercase tracking-widest text-[9px] md:text-[10px]">Booting {label}...</div>
  </div>
);

export default ToolRenderer;
