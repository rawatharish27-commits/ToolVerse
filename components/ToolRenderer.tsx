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
const SocialTools = lazy(() => import('./tools/SocialTools'));
const FileTools = lazy(() => import('./tools/FileTools'));
const PainPointTools = lazy(() => import('./tools/PainPointTools'));

interface ToolRendererProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string, needsKey?: boolean) => void;
}

const ToolRenderer: React.FC<ToolRendererProps> = ({ slug, onSuccess, onError }) => {
  const [showVault, setShowVault] = useState(false);
  const [userKey, setUserKey] = useState("");
  const [vaultError, setVaultError] = useState("");

  const tool = TOOLS.find(t => t.slug === slug);
  if (!tool) return <div className="p-20 text-center text-slate-400">Node Logic Offline.</div>;

  const saveKey = () => {
    if (!canRotateKey()) {
      setVaultError("Safety Limit: 3 Keys per day max.");
      return;
    }
    if (userKey.trim().startsWith("AIza")) {
      localStorage.setItem('tv_custom_gemini_key', userKey.trim());
      incrementKeyRotation();
      setShowVault(false);
      onSuccess("Neural Authenticator Synced!");
      setTimeout(() => window.location.reload(), 800);
    } else {
      setVaultError("Invalid Key Protocol.");
    }
  };

  const customErrorHandler = (msg: string, needsKey?: boolean) => {
    if (needsKey) setShowVault(true);
    onError(msg);
  };

  return (
    <div className="relative">
      {showVault && (
        <div className="absolute inset-0 z-[100] bg-white/95 backdrop-blur-2xl flex flex-col items-center justify-center p-8 text-center rounded-[3.5rem] animate-in zoom-in-95 duration-500">
           <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center text-4xl mb-6 animate-pulse">🔑</div>
           <h2 className="text-3xl font-black text-slate-900 mb-2">Manual Override Required</h2>
           <p className="text-slate-500 mb-8 max-w-sm font-medium">Global credits are empty. Use your own free API key from Google AI Studio to continue.</p>
           
           <div className="w-full max-w-md space-y-4">
             <input 
               type="password"
               value={userKey}
               onChange={e => { setUserKey(e.target.value); setVaultError(""); }}
               placeholder="Enter API Key (AIza...)"
               className={`w-full p-6 bg-slate-50 border-2 ${vaultError ? 'border-rose-500' : 'border-slate-100'} rounded-2xl outline-none font-mono text-sm focus:border-indigo-600 transition-all shadow-inner`}
             />
             {vaultError && <p className="text-rose-600 text-[10px] font-black uppercase tracking-widest">{vaultError}</p>}
           </div>
           
           <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full max-w-md">
             <button onClick={saveKey} className="flex-1 py-5 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">Activate Node</button>
             <a href="https://aistudio.google.com/app/apikey" target="_blank" className="flex-1 py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center">Get Key</a>
           </div>
           <p className="mt-8 text-[9px] font-black text-slate-300 uppercase tracking-widest">Privacy Verified: Keys are stored locally.</p>
        </div>
      )}

      <Suspense fallback={
        <div className="flex flex-col items-center justify-center h-[400px] gap-4">
          <div className="w-12 h-12 border-4 border-indigo-100 rounded-full border-t-indigo-600 animate-spin"></div>
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Synthesizing Logic Cluster...</p>
        </div>
      }>
        {(() => {
          const props = { slug, onSuccess, onError: customErrorHandler };
          const cat = tool.category;
          
          // Route specialized Diagnostic and AI Tools
          if (cat === 'government' || cat === 'career' || cat === 'daily-life' || slug.includes('why') || slug.includes('failure') || slug.includes('rule')) {
            return <PainPointTools {...props} />;
          }

          if (cat === 'ai') return slug.includes('image') ? <AIImageTools {...props} /> : <AITextTools {...props} />;
          if (cat === 'image') return <ImageTools {...props} />;
          if (cat === 'pdf') return <PDFTools {...props} />;
          if (cat === 'data') return <DataTools {...props} />;
          if (cat === 'calculators' || cat === 'finance') return <FinanceTools {...props} />;
          if (cat === 'security') return <SecurityTools {...props} />;
          if (cat === 'network') return <NetworkTools {...props} />;
          if (cat === 'utility' || cat === 'miscellaneous') return <UtilityTools {...props} />;
          if (cat === 'education') return <EducationTools {...props} />;
          if (cat === 'seo') return <SEOTools {...props} />;
          if (cat === 'office') return <OfficeTools {...props} />;
          if (cat === 'social') return <SocialTools {...props} />;
          
          return <GeneralTools {...props} />;
        })()}
      </Suspense>
    </div>
  );
};

export default ToolRenderer;
