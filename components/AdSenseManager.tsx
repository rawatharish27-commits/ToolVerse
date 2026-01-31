
import React, { useState, useEffect } from 'react';

interface AdProps {
  slotId: string;
  type: 'BILLBOARD' | 'SIDEBAR' | 'INLINE' | 'FOOTER';
  className?: string;
  showOnlyOnResult?: boolean;
  hasResult?: boolean;
}

const AdSenseManager: React.FC<AdProps> = ({ slotId, type, className = "", showOnlyOnResult, hasResult }) => {
  const [isReady, setIsReady] = useState(false);

  const STYLES = {
    BILLBOARD: "min-h-[280px] aspect-[16/9] w-full",
    SIDEBAR: "min-h-[600px] aspect-[1/2] w-full",
    INLINE: "min-h-[250px] w-full",
    FOOTER: "min-h-[100px] w-full"
  };

  useEffect(() => {
    if (showOnlyOnResult && !hasResult) return;

    const timer = setTimeout(() => {
      try {
        const adsbygoogle = (window as any).adsbygoogle;
        if (adsbygoogle) {
          adsbygoogle.push({});
          setIsReady(true);
        }
      } catch (e) {
        console.warn("AdSense deferred:", slotId);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [slotId, hasResult, showOnlyOnResult]);

  if (showOnlyOnResult && !hasResult) return null;

  return (
    <div 
      className={`relative overflow-hidden bg-slate-50 border border-slate-100 rounded-[3rem] flex items-center justify-center transition-all duration-700 ${STYLES[type]} ${className}`}
    >
      <div className="absolute top-4 left-8 opacity-20 select-none pointer-events-none">
        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Sponsored Intelligence Node</span>
      </div>

      {!isReady && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
      )}

      <ins 
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', height: '100%' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      
      <style>{`
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        .animate-shimmer { animation: shimmer 2.5s infinite linear; }
      `}</style>
    </div>
  );
};

export default AdSenseManager;
