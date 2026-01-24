
import React, { useEffect, useRef, useState } from 'react';
import { AD_CONFIG } from '../config/ads';

interface AdSlotProps {
  id: string;
  className?: string;
  variant?: 'standard' | 'result-based';
}

/**
 * AdSlot - Production Edition
 * Solves layout shift and ensures high-CTR visibility after tool execution.
 */
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
              console.warn(`AdSense push failed for slot ${id}:`, e);
            }
          }
        });
      }
    }, { threshold: 0.1 });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, [id, isInitialized]);

  if (!AD_CONFIG.enabled) return null;

  const minHeight = variant === 'result-based' ? '280px' : '250px';

  return (
    <div 
      ref={containerRef}
      className={`ad-container overflow-hidden w-full flex flex-col justify-center items-center bg-slate-50 border border-slate-100 rounded-[2.5rem] relative ${className}`}
      style={{ minHeight }}
    >
      <div className="absolute top-4 left-6 text-[8px] font-black text-slate-200 uppercase tracking-[0.3em] pointer-events-none select-none z-0">
        Professional Partner Content
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
         <div className="mt-2 text-[8px] font-bold text-slate-300 uppercase tracking-widest animate-pulse">
           Scroll down for more useful tools
         </div>
      )}
    </div>
  );
};

export default AdSlot;
