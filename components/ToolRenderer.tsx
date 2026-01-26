
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
  const [vaultError, setVaultError] = useState("");

  const tool = TOOLS.find(t => t.slug === slug);
  if (!tool) return <div className="p-20 text-center text-slate-400">Logic Cluster Unavailable.</div>;

  const handleKeySave = () => {
    if (!canRotateKey()) {
      setVaultError("Security Limit: 3 Keys per day maximum reached.");
      return;
    }

    if (customKey.trim().startsWith("AIza")) {
      localStorage.setItem('tv_custom_gemini_key', customKey.trim());
      incrementKeyRotation();
      setShowKeyInput(false);
      onSuccess("Neural Core Authorized! Synchronizing...");
      setTimeout(() => window.location.reload(), 800);
    } else {
      setVaultError("Malformed API Key. Format: AIza...");
    }
  };

  const augmentedOnError = (msg: string, needsKey?: boolean) => {
    if (needsKey) setShowKeyInput(true);
    onError(msg);
  };

  return (
    <div className="relative">
      {/* Neural Vault: AI Key Entry */}
      {showKeyInput && (
        <div className="absolute inset-0 z-[100] bg-white/98 backdrop-blur-2xl flex flex-col items-center justify-center p-8 md:p-12 text-center rounded-[4rem] animate-in zoom-in-95 duration-500 shadow-2xl">
           <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center text-4xl mb-8 animate-pulse">🔒</div>
           <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter">System Credits Exhausted</h2>
           <p className="text-slate-500 mb-10 max-w-sm font-medium">Free system pool is depleted for the hour. Securely insert your own free Gemini API key to continue processing.</p>
           
           <div className="w-full max-w-md space-y-4">
             <input 
               type="password"
               value={customKey}
               onChange={e => { setCustomKey(e.target.value); setVaultError(""); }}
               placeholder="Enter Gemini API Key (AIza...)"
               className={`w-full p-6 bg-slate-50 border-2 ${vaultError ? 'border-rose-500' : 'border-slate-100'} rounded-2xl font-mono text-sm focus:border-indigo-600 outline-none transition-all shadow-inner`}
             />
             {vaultError && <p className="text-rose-600 text-[10px] font-black uppercase tracking-widest">{vaultError}</p>}
           </div>
           
           <div className="flex flex-col sm:flex-row gap-4 mt-10 w-full max-w-md">
             <button onClick={handleKeySave} className="flex-1 py-5 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-indigo-700 transition-all active:scale-95">Verify & Activate</button>
             <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener" className="flex-1 py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2">
               Get Free Key <span>↗</span>
             </a>
           </div>
           <p className="mt-8 text-[9px] font-black text-slate-300 uppercase tracking-[0.4em]">Keys are stored locally. Zero cloud transmission.</p>
        </div>
      )}

      <Suspense fallback={
        <div className="flex flex-col items-center justify-center h-[500px] gap-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-indigo-50 rounded-full"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Orchestrating Logic Environment...</p>
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
