
import React, { Suspense, lazy } from 'react';

const ImageKbReducer = lazy(() => import('../tools/image-size-reducer-kb/index'));

interface ToolPageProps {
  slug: string;
}

const ToolPage: React.FC<ToolPageProps> = ({ slug }) => {
  const renderTool = () => {
    switch (slug) {
      case 'image-size-reducer-kb': return <ImageKbReducer />;
      default: return <div className="p-20 text-center font-black text-slate-300 uppercase tracking-widest">Logic Node [${slug}] Not Resolved</div>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-10 pb-32">
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Booting Isolate Environment...</p>
        </div>
      }>
        {renderTool()}
      </Suspense>
    </div>
  );
};

export default ToolPage;
