import React, { useEffect, useRef, useState } from 'react';
import { AD_CONFIG } from '../config/ads';

interface AdSlotProps {
  id: string;
  className?: string;
}

/**
 * AdSlot - Production Edition
 * Solves "No slot size for availableWidth=0" by ensuring the push
 * only happens once the element is visible and has measured width.
 */
const AdSlot: React.FC<AdSlotProps> = ({ id, className = "" }) => {
  const adRef = useRef<HTMLModElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!AD_CONFIG.enabled) return;

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      
      // Only initialize if visible and not already pushed
      if (entry.isIntersecting && !isInitialized) {
        // Use requestAnimationFrame to ensure layout pass is finished
        requestAnimationFrame(() => {
          const adsbygoogle = (window as any).adsbygoogle;
          
          if (typeof window !== 'undefined' && adsbygoogle && adRef.current) {
            // Final check to ensure width is actually available
            const width = containerRef.current?.offsetWidth || 0;
            if (width > 0) {
              try {
                adsbygoogle.push({});
                setIsInitialized(true);
                observer.disconnect();
              } catch (e) {
                console.warn(`AdSense push failed for slot ${id}:`, e);
              }
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

  return (
    <div 
      ref={containerRef}
      className={`ad-container my-8 overflow-hidden min-h-[250px] w-full flex justify-center items-center bg-slate-50/50 border border-slate-100 rounded-2xl relative ${className}`}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", minHeight: '250px' }}
        data-ad-client={AD_CONFIG.publisher_id}
        data-ad-slot={id}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      <div className="absolute top-2 right-4 text-[9px] font-black text-slate-200 uppercase tracking-widest pointer-events-none select-none z-0">
        Advertisement
      </div>
    </div>
  );
};

export default AdSlot;