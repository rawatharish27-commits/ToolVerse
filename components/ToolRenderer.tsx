import React, { useState, lazy, Suspense, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { TOOLS } from '../data/tools';

// Lazy Load Group Components
const VideoAudioTools = lazy(() => import('./tools/VideoAudioTools'));
const AudioTools = lazy(() => import('./tools/AudioTools'));
const FinanceTools = lazy(() => import('./tools/FinanceTools'));
const UnitConverterTools = lazy(() => import('./tools/UnitConverterTools'));
const PDFTools = lazy(() => import('./tools/PDFTools'));
const ImageTools = lazy(() => import('./tools/ImageTools'));
const SEOTools = lazy(() => import('./tools/SEOTools'));
const OfficeTools = lazy(() => import('./tools/OfficeTools'));
const GeneralTools = lazy(() => import('./tools/GeneralTools'));
const SecurityTools = lazy(() => import('./tools/SecurityTools'));
const NetworkTools = lazy(() => import('./tools/NetworkTools'));
const FileTools = lazy(() => import('./tools/FileTools'));
const DevTools = lazy(() => import('./tools/DevTools'));
const DataTools = lazy(() => import('./tools/DataTools'));
const AITextTools = lazy(() => import('./tools/AITextTools'));
const AIImageTools = lazy(() => import('./tools/AIImageTools'));
const SocialTools = lazy(() => import('./tools/SocialTools'));
const EducationTools = lazy(() => import('./tools/EducationTools'));

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

  const toolData = TOOLS.find(t => t.slug === slug);
  const category = toolData?.category;

  // ROUTING ENGINE BY CATEGORY & SLUG
  if (slug.startsWith('ai-image')) return <Suspense fallback={<Loader label="Art Director" />}><AIImageTools slug={slug} onSuccess={onSuccess} onError={onError} /></Suspense>;
  if (slug.startsWith('edu-')) return <Suspense fallback={<Loader label="Academic Dean" />}><EducationTools slug={slug} onSuccess={onSuccess} onError={onError} /></Suspense>;
  if (category === 'ai') return <Suspense fallback={<Loader label="Orchestrator" />}><AITextTools slug={slug} onSuccess={onSuccess} onError={onError} /></Suspense>;
  if (category === 'social') return <Suspense fallback={<Loader label="Social Strategist" />}><SocialTools slug={slug} onSuccess={onSuccess} onError={onError} /></Suspense>;
  if (category === 'education') return <Suspense fallback={<Loader label="Learning Coach" />}><EducationTools slug={slug} onSuccess={onSuccess} onError={onError} /></Suspense>;
  if (category === 'security') return <Suspense fallback={<Loader label="Security Vault" />}><SecurityTools slug={slug} onSuccess={onSuccess} onError={onError} /></Suspense>;
  if (category === 'network') return <Suspense fallback={<Loader label="Network Diagnostic" />}><NetworkTools slug={slug} onSuccess={onSuccess} onError={onError} /></Suspense>;
  if (category === 'seo') return <Suspense fallback={<Loader label="SEO Engine" />}><SEOTools slug={slug} onSuccess={onSuccess} onError={onError} /></Suspense>;
  if (category === 'video') return <Suspense fallback={<Loader label="Media Lab" />}><VideoAudioTools slug={slug} onSuccess={onSuccess} onError={onError} /></Suspense>;
  if (category === 'audio') return <Suspense fallback={<Loader label="Audio Studio" />}><AudioTools slug={slug} onSuccess={onSuccess} onError={onError} /></Suspense>;
  if (category === 'image') return <Suspense fallback={<Loader label="Image Processor" />}><ImageTools slug={slug} onSuccess={onSuccess} onError={onError} /></Suspense>;
  if (category === 'pdf') return <Suspense fallback={<Loader label="PDF Hub" />}><PDFTools slug={slug} onSuccess={onSuccess} onError={onError} /></Suspense>;
  if (category === 'calculators') return <Suspense fallback={<Loader label="Calc Engine" />}><FinanceTools slug={slug} onSuccess={onSuccess} onError={onError} /></Suspense>;
  if (category === 'unit-converters') return <Suspense fallback={<Loader label="Conversion Lab" />}><UnitConverterTools slug={slug} onSuccess={onSuccess} onError={onError} /></Suspense>;
  if (category === 'office') return <Suspense fallback={<Loader label="Office Suite" />}><OfficeTools slug={slug} onSuccess={onSuccess} onError={onError} /></Suspense>;
  if (category === 'file') return <Suspense fallback={<Loader label="File Lab" />}><FileTools slug={slug} onSuccess={onSuccess} onError={onError} /></Suspense>;
  if (category === 'data') return <Suspense fallback={<Loader label="Data Hub" />}><DataTools slug={slug} onSuccess={onSuccess} onError={onError} /></Suspense>;
  if (category === 'dev') return <Suspense fallback={<Loader label="Dev Studio" />}><DevTools slug={slug} onSuccess={onSuccess} onError={onError} /></Suspense>;
  if (category === 'utility') return <Suspense fallback={<Loader label="Utility Engine" />}><GeneralTools slug={slug} onSuccess={onSuccess} onError={onError} /></Suspense>;

  // Fallback for generic utilities
  return <Suspense fallback={<Loader label="Utility Engine" />}><GeneralTools slug={slug} onSuccess={onSuccess} onError={onError} /></Suspense>;
};

const Loader = ({ label }: { label: string }) => (
  <div className="h-64 md:h-80 flex flex-col items-center justify-center space-y-4 md:space-y-6">
    <div className="w-10 h-10 md:w-12 md:h-12 border-[4px] border-slate-100 border-t-indigo-600 rounded-full animate-spin"></div>
    <div className="animate-pulse text-indigo-500 font-black uppercase tracking-widest text-[9px] md:text-[10px]">Booting {label}...</div>
  </div>
);

export default ToolRenderer;