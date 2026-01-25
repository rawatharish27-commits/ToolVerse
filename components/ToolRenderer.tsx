import React from 'react';
import { TOOLS } from '../data/tools';

import AITextTools from './tools/AITextTools';
import AIImageTools from './tools/AIImageTools';
import ImageTools from './tools/ImageTools';
import VideoAudioTools from './tools/VideoAudioTools';
import AudioTools from './tools/AudioTools';
import PDFTools from './tools/PDFTools';
import DevTools from './tools/DevTools';
import DataTools from './tools/DataTools';
import SEOTools from './tools/SEOTools';
import FinanceTools from './tools/FinanceTools';
import UnitConverterTools from './tools/UnitConverterTools';
import SecurityTools from './tools/SecurityTools';
import NetworkTools from './tools/NetworkTools';
import EducationTools from './tools/EducationTools';
import UtilityTools from './tools/UtilityTools';
import GeneralTools from './tools/GeneralTools';

interface ToolRendererProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const ToolRenderer: React.FC<ToolRendererProps> = ({ slug, onSuccess, onError }) => {
  const tool = TOOLS.find(t => t.slug === slug);
  if (!tool) return <div className="p-20 text-center text-slate-400">Tool Logic Pending...</div>;

  const category = tool.category;

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

  const useAIOrchestrator = [
    'ai', 'social', 'office', 'education', 'business', 'seo'
  ].includes(category);

  if (useAIOrchestrator) {
    if (category === 'education') return <EducationTools slug={slug} onSuccess={onSuccess} onError={onError} />;
    if (category === 'seo') return <SEOTools slug={slug} onSuccess={onSuccess} onError={onError} />;
    return <AITextTools slug={slug} onSuccess={onSuccess} onError={onError} />;
  }

  return <GeneralTools slug={slug} onSuccess={onSuccess} onError={onError} />;
};

export default ToolRenderer;