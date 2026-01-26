
import React, { Suspense, lazy, useState } from 'react';
import { TOOLS } from '../data/tools';
import { canRotateKey, incrementKeyRotation } from '../utils/apiQuota';

const AITextTools = lazy(() => import('./tools/AITextTools'));
const AIImageTools = lazy(() => import('./tools/AIImageTools'));
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
  const [keyError, setKeyError] = useState("");

  const tool = TOOLS.find(t => t.slug === slug);
  if (!tool) return <div className="p-20 text-center text-slate-400">Logic Node Disconnected...</div>;

  const handleKeySave = () => {
    if (!canRotateKey()) {
      setKeyError("Daily limit reached. You can only rotate 3 keys per day.");
      return;
    }

    if (customKey.trim().startsWith("AIza")) {
      localStorage.setItem('tv_custom_gemini_key', customKey.trim());
      incrementKeyRotation();
      setShowKeyInput(false);
      onSuccess("Neural Core Re-authenticated! Restarting...");
      setTimeout(() => window.location.reload(), 1000);
    } else {
      setKeyError("Invalid format. Gemini keys must start with 'AIza'.");
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
        <div className="absolute inset-0 z-[100] bg-white/98 backdrop-blur-xl flex flex-col items-center justify-center p-8 md:p-12 text-center rounded-[3rem] animate-in zoom-in-95 duration-300">
           <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center text-3xl mb-8 animate-pulse">⚡</div>
           <h2 className="text-3xl font-black text-slate-900 mb-4">Neural Quota Exhausted</h2>
           <p className="text-slate-500 mb-10 max-w-sm font-medium">System credits for today are used up. To continue, insert your own free API key from Google AI Studio.</p>
           
           <div className="w-full max-w-md space-y-4">
             <input 
               type="password"
               value={customKey}
               onChange={e => { setCustomKey(e.target.value); setKeyError(""); }}
               placeholder="Enter API Key (AIza...)"
               className={`w-full p-6 bg-slate-50 border-2 ${keyError ? 'border-rose-500' : 'border-slate-100'} rounded-2xl font-mono text-sm focus:border-indigo-600 outline-none transition-all shadow-inner`}
             />
             {keyError && <p className="text-rose-600 text-[10px] font-black uppercase tracking-widest">{keyError}</p>}
           </div>
           
           <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full max-w-md">
             <button onClick={handleKeySave} className="flex-1 py-5 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-indigo-700 transition-all active:scale-95">Activate Node</button>
             <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener" className="flex-1 py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-800 transition-all flex items-center justify-center">Get Free Key</a>
           </div>
           
           <p className="mt-8 text-[9px] font-black text-slate-300 uppercase tracking-[0.3em]">Keys are stored in your local browser sandbox only.</p>
        </div>
      )}

      <Suspense fallback={
        <div className="flex flex-col items-center justify-center h-[500px] space-y-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-indigo-100 rounded-full"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div className="text-center">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-2">Syncing Logic Hub</p>
            <p className="text-xs text-slate-300 font-bold">Warping to category-specific isolate...</p>
          </div>
        </div>
      }>
        {(() => {
          const category = tool.category;
          const props = { slug, onSuccess, onError: augmentedOnError };
          
          if (category === 'ai') {
            if (slug.includes('image')) return <AIImageTools {...props} />;
            return <AITextTools {...props} />;
          }
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
          if (['social', 'business'].includes(category)) return <AITextTools {...props} />;
          
          return <GeneralTools {...props} />;
        })()}
      </Suspense>
    </div>
  );
};

export default ToolRenderer;
