
import React, { Suspense, lazy } from 'react';
import { TOOLS } from '../data/tools';

// Code Splitting Strategy: Load heavy clusters only when requested.
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

interface ToolRendererProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const ToolRenderer: React.FC<ToolRendererProps> = ({ slug, onSuccess, onError }) => {
  const tool = TOOLS.find(t => t.slug === slug);
  if (!tool) return <div className="p-20 text-center text-slate-400">Logic Node Not Found...</div>;

  const category = tool.category;
  
  // Use Suspense to handle the "Engine Loading" state visually
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center h-96 space-y-4">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Loading Tool Core...</p>
      </div>
    }>
      {(() => {
        const isAIImage = slug.startsWith('ai-image-') || (category === 'image' && slug.includes('ai'));
        if (isAIImage) return <AIImageTools slug={slug} onSuccess={onSuccess} onError={onError} />;

        if (category === 'image') return <ImageTools slug={slug} onSuccess={onSuccess} onError={onError} />;
        if (category === 'video') return <VideoAudioTools slug={slug} onSuccess={onSuccess} onError={onError} />;
        if (category === 'audio') return <AudioTools slug={slug} onSuccess={onSuccess} onError={onError} />;
        if (category === 'pdf') return <PDFTools slug={slug} onSuccess={onSuccess} onError={onError} />;
        if (category === 'dev') return <DevTools slug={slug} onSuccess={onSuccess} onError={onError} />;
        if (category === 'data') return <DataTools slug={slug} onSuccess={onSuccess} onError={onError} />;
        if (category === 'calculators') return <FinanceTools slug={slug} onSuccess={onSuccess} onError={onError} />;
        if (category === 'unit-converters') return <UnitConverterTools slug={slug} onSuccess={onSuccess} onError={onError} />;
        if (category === 'security') return <SecurityTools slug={slug} onSuccess={onSuccess} onError={onError} />;
        if (category === 'network') return <NetworkTools slug={slug} onSuccess={onSuccess} onError={onError} />;
        if (category === 'utility') return <UtilityTools slug={slug} onSuccess={onSuccess} onError={onError} />;

        const useAIOrchestrator = ['ai', 'social', 'office', 'education', 'business', 'seo'].includes(category);
        if (useAIOrchestrator) {
          if (category === 'education') return <EducationTools slug={slug} onSuccess={onSuccess} onError={onError} />;
          if (category === 'seo') return <SEOTools slug={slug} onSuccess={onSuccess} onError={onError} />;
          return <AITextTools slug={slug} onSuccess={onSuccess} onError={onError} />;
        }

        return <GeneralTools slug={slug} onSuccess={onSuccess} onError={onError} />;
      })()}
    </Suspense>
  );
};

export default ToolRenderer;
