
import React, { Suspense, lazy, useState } from 'react';
import { TOOLS } from '../data/tools';

const AITextTools = lazy(() => import('./tools/AITextTools'));
const ImageTools = lazy(() => import('./tools/ImageTools'));
const VideoAudioTools = lazy(() => import('./tools/VideoAudioTools'));
const AudioTools = lazy(() => import('./tools/AudioTools'));
const PDFTools = lazy(() => import('./tools/PDFTools'));
const DevTools = lazy(() => import('./tools/DevTools'));
const DataTools = lazy(() => import('./tools/DataTools'));
const SEOTools = lazy(() => import('./tools/SEOTools'));
const FinanceTools = lazy(() => import('./tools/FinanceTools'));
const UnitConverterTools = lazy(() => import('./tools/UnitConverterTools'));
const SecurityTools = lazy(() => import('./tools/SecurityTools'));
const NetworkTools = lazy(() => import('./tools/NetworkTools'));
const EducationTools = lazy(() => import('./tools/EducationTools'));
const UtilityTools = lazy(() => import('./tools/UtilityTools'));
const GeneralTools = lazy(() => import('./tools/GeneralTools'));
const OfficeTools = lazy(() => import('./tools/OfficeTools'));

interface ToolRendererProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string, needsKey?: boolean) => void;
}

const ToolRenderer: React.FC<ToolRendererProps> = ({ slug, onSuccess, onError }) => {
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [customKey, setCustomKey] = useState("");

  const tool = TOOLS.find(t => t.slug === slug);
  if (!tool) return <div className="p-20 text-center text-slate-400">Logic Node Not Found...</div>;

  const handleKeySave = () => {
    if (customKey.startsWith("AIza")) {
      localStorage.setItem('tv_custom_gemini_key', customKey);
      setShowKeyInput(false);
      onSuccess("API Key Synchronized! Restarting tool...");
      window.location.reload();
    } else {
      alert("Invalid Gemini API Key format. It should start with 'AIza'.");
    }
  };

  const augmentedOnError = (msg: string, needsKey?: boolean) => {
    if (needsKey) {
      setShowKeyInput(true);
    }
    onError(msg);
  };

  return (
    <div className="relative">
      {showKeyInput && (
        <div className="absolute inset-0 z-50 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center p-12 text-center rounded-[3rem] animate-in fade-in duration-300">
           <div className="text-6xl mb-6">⚡</div>
           <h2 className="text-3xl font-black text-slate-900 mb-4">AI Quota Reached</h2>
           <p className="text-slate-500 mb-10 max-w-sm">Free system credits are exhausted. Insert your own Gemini API key to continue using this logic node.</p>
           
           <input 
             type="password"
             value={customKey}
             onChange={e => setCustomKey(e.target.value)}
             placeholder="Paste Gemini API Key (starts with AIza...)"
             className="w-full max-w-md p-5 bg-slate-100 border-2 border-indigo-100 rounded-2xl mb-6 font-mono text-sm focus:border-indigo-600 outline-none transition-all"
           />
           
           <div className="flex gap-4">
             <button onClick={handleKeySave} className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">Activate Key</button>
             <a href="https://aistudio.google.com/app/apikey" target="_blank" className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest">Get Free Key</a>
           </div>
           <p className="mt-6 text-[9px] font-black text-slate-300 uppercase tracking-widest">Your key is stored locally and never sent to our servers.</p>
        </div>
      )}

      <Suspense fallback={
        <div className="flex flex-col items-center justify-center h-96 space-y-4">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Warping to Tool Core...</p>
        </div>
      }>
        {(() => {
          const category = tool.category;
          const props = { slug, onSuccess, onError: augmentedOnError };
          if (category === 'image') return <ImageTools {...props} />;
          if (category === 'video') return <VideoAudioTools {...props} />;
          if (category === 'audio') return <AudioTools {...props} />;
          if (category === 'pdf') return <PDFTools {...props} />;
          if (category === 'dev') return <DevTools {...props} />;
          if (category === 'data') return <DataTools {...props} />;
          if (category === 'calculators') return <FinanceTools {...props} />;
          if (category === 'unit-converters') return <UnitConverterTools {...props} />;
          if (category === 'security') return <SecurityTools {...props} />;
          if (category === 'network') return <NetworkTools {...props} />;
          if (category === 'utility') return <UtilityTools {...props} />;
          if (category === 'education') return <EducationTools {...props} />;
          if (category === 'seo') return <SEOTools {...props} />;
          if (category === 'office') return <OfficeTools {...props} />;
          if (['ai', 'social', 'business'].includes(category)) return <AITextTools {...props} />;
          return <GeneralTools {...props} />;
        })()}
      </Suspense>
    </div>
  );
};

export default ToolRenderer;
