
import React, { useState, useEffect } from 'react';

interface AdProps {
  slotId: string;
  type: 'BILLBOARD' | 'SIDEBAR' | 'INLINE_RESULT' | 'BOTTOM_ANCHOR';
  className?: string;
}

/**
 * ToolVerse Monetization Engine v6.0 (CLS-SAFE)
 * Strictly follows the Golden Rules:
 * 1. Fixed Height Reservation (No content jump)
 * 2. Result-First visibility logic
 * 3. Clear Policy Labeling
 */
const AdSenseManager: React.FC<AdProps> = ({ slotId, type, className = "" }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // STANDARD IAB AD UNIT HEIGHTS (Mandatory for CLS: 0)
  const heightMap = {
    BILLBOARD: "h-[280px]",      // Reserved for 970x250 or 728x90
    SIDEBAR: "h-[600px]",        // Reserved for 300x600 skyscraper
    INLINE_RESULT: "h-[250px]",  // Reserved for 336x280 or 300x250
    BOTTOM_ANCHOR: "h-[100px]"   // Reserved for 728x90 or mobile banners
  };

  useEffect(() => {
    // Delay ad push slightly to ensure main thread is clear for tool logic
    const timer = setTimeout(() => {
      try {
        const adsbygoogle = (window as any).adsbygoogle;
        if (adsbygoogle && typeof adsbygoogle.push === 'function') {
          adsbygoogle.push({});
          setIsLoaded(true);
        }
      } catch (e) {
        console.warn("AdSense logic synchronization deferred:", slotId);
      }
    }, 1200);
    return () => clearTimeout(timer);
  }, [slotId]);

  return (
    <div 
      className={`ad-wrapper relative overflow-hidden bg-slate-50 border border-slate-100 rounded-[2.5rem] flex flex-col items-center justify-center transition-all duration-1000 ${heightMap[type]} ${className}`}
      aria-label="Advertisement"
    >
      {/* Policy Compliance Label (Non-misleading) */}
      <div className="absolute top-4 left-8 z-10 pointer-events-none select-none opacity-40">
        <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">Advertisement</span>
      </div>

      {/* Shimmer/Placeholder Layer */}
      {!isLoaded && (
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer"></div>
      )}

      {/* AdSense Unit */}
      <div className="w-full h-full flex items-center justify-center relative z-10">
        {/* Placeholder text for dev mode */}
        {process.env.NODE_ENV === 'development' && (
           <div className="text-center opacity-10 font-black italic text-5xl select-none group-hover:scale-105 transition-transform duration-700">
             {type} AD NODE
           </div>
        )}
        
        {/* Production AdSense Component */}
        <ins 
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', height: '100%' }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2.5s infinite linear;
        }
      `}</style>
    </div>
  );
};

export default AdSenseManager;
