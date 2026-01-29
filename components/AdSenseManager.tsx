
import React from 'react';

interface Props {
  slotId: string;
  className?: string;
}

/**
 * ToolVerse AdSense Orchestrator
 * Ensures 0 layout shift and result-first ordering.
 */
const AdSenseManager: React.FC<Props> = ({ slotId, className = "" }) => {
  return (
    <div 
      className={`min-h-[280px] w-full flex items-center justify-center bg-slate-50 border border-dashed border-slate-200 rounded-3xl overflow-hidden relative group transition-all hover:bg-slate-100 ${className}`}
    >
      <div className="absolute top-2 left-4 text-[9px] font-black text-slate-300 uppercase tracking-widest pointer-events-none">
        Partner Intelligence Module
      </div>
      
      {/* 
        Production Tag:
        <ins className="adsbygoogle"
             style={{display: 'block'}}
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot={slotId}
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      */}

      <div className="text-center p-6 select-none">
        <div className="text-slate-400 font-bold text-xs mb-1 uppercase tracking-tighter">System Sponsored Slot</div>
        <div className="text-[10px] text-slate-300 font-mono">ID: {slotId} • Waiting for Result</div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-50">
        <div className="h-full bg-indigo-200 w-1/4 animate-shimmer"></div>
      </div>
    </div>
  );
};

export default AdSenseManager;
