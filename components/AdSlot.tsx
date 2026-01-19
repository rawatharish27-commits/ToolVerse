
import React, { useEffect } from 'react';
import { AD_CONFIG } from '../config/ads';

interface AdSlotProps {
  id: string;
  className?: string;
}

const AdSlot: React.FC<AdSlotProps> = ({ id, className = "" }) => {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (e) {
      console.warn("AdSense push failed", e);
    }
  }, [id]);

  if (!AD_CONFIG.enabled) return null;

  return (
    <div className={`ad-container my-8 overflow-hidden min-h-[90px] flex justify-center items-center bg-slate-50 border border-slate-100 rounded-2xl relative ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={AD_CONFIG.publisher_id}
        data-ad-slot={id}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      <div className="absolute text-[9px] font-black text-slate-200 uppercase tracking-widest pointer-events-none select-none">
        Ad Slot: {id}
      </div>
    </div>
  );
};

export default AdSlot;
