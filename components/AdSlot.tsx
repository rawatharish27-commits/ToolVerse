
import React, { useEffect, useRef, useState } from 'react';
import { AD_CONFIG } from '../config/ads';

interface AdSlotProps {
  id: string;
  className?: string;
  variant?: 'standard' | 'result-based';
}

const AdSlot: React.FC<AdSlotProps> = ({ id, className = "", variant = 'standard' }) => {
  const adRef = useRef<HTMLModElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!AD_CONFIG.enabled) return;

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !isInitialized) {
        requestAnimationFrame(() => {
          const adsbygoogle = (window as any).adsbygoogle;
          const width = containerRef.current?.offsetWidth || 0;
          if (typeof window !== 'undefined' && adsbygoogle && adRef.current && width > 0) {
            try {
              adsbygoogle.push({});
              setIsInitialized(true);
              observer.disconnect();
            } catch (e) {
              console.warn(`AdSense failed for slot ${id}:`, e);
            }
          }
        });
      }
    }, { threshold: 0.1 });

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [id, isInitialized]);

  if (!AD_CONFIG.enabled) return null;

  const minHeight = variant === 'result-based' ? '300px' : '280px';

  return (
    <div 
      ref={containerRef}
      className={`ad-container overflow-hidden w-full flex flex-col justify-center items-center bg-white border border-slate-100 rounded-[2.5rem] relative group shadow-sm hover:shadow-xl transition-all duration-700 ${className}`}
      style={{ minHeight }}
    >
      {/* TECHNIQUE 20: Sponsored Logic Labeling */}
      <div className="absolute top-6 left-8 flex items-center gap-3 pointer-events-none select-none z-10">
        <div className="w-2 h-2 rounded-full bg-indigo-200 animate-ping"></div>
        <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em]">Partner Intelligence Unit</span>
      </div>
      
      <div className="absolute bottom-6 right-8 text-[8px] font-bold text-slate-200 uppercase tracking-widest z-10">
         Session {Math.random().toString(36).substring(7).toUpperCase()}
      </div>

      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", minHeight, width: '100%' }}
        data-ad-client={AD_CONFIG.publisher_id}
        data-ad-slot={id}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>

      {variant === 'result-based' && (
         <div className="mt-4 px-6 py-2 bg-indigo-50 rounded-full text-[8px] font-black text-indigo-400 uppercase tracking-widest animate-pulse">
           Scroll down for expanded tool clusters
         </div>
      )}
      
      {/* Decorative Shimmer Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/0 via-white/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none duration-700"></div>
    </div>
  );
};

export default AdSlot;
