
import React, { Suspense, lazy, useState } from 'react';
import { TOOL_REGISTRY } from '../tools/registry';

// Dynamic loaders for atomic tools
const ImageKbReducer = lazy(() => import('../tools/image-size-reducer-kb/index'));

interface ToolRendererProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const ToolRenderer: React.FC<ToolRendererProps> = ({ slug, onSuccess, onError }) => {
  const metadata = TOOL_REGISTRY.find(t => t.slug === slug);

  if (!metadata) {
    return <div className="p-20 text-center font-black text-slate-300">FATAL: LOGIC NODE [${slug}] NOT REGISTERED</div>;
  }

  return (
    <div className="relative">
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center h-96 gap-6">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Mounting Isolate...</p>
        </div>
      }>
        {slug === 'image-size-reducer-kb' && <ImageKbReducer onSuccess={onSuccess} onError={onError} />}
        {/* Further tools mapped here as they are built */}
      </Suspense>
    </div>
  );
};

export default ToolRenderer;
