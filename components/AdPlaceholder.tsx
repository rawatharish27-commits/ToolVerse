
import React from 'react';

interface AdPlaceholderProps {
  type: 'leaderboard' | 'rectangle' | 'sidebar' | 'inline';
  slotId?: string;
}

const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ type, slotId = "0000000000" }) => {
  const styles = {
    leaderboard: "w-full min-h-[90px] md:min-h-[120px] mb-8",
    rectangle: "w-full aspect-[4/3] md:max-w-[336px] mx-auto",
    sidebar: "w-full min-h-[600px] sticky top-24",
    inline: "w-full min-h-[250px] my-12"
  };

  const labels = {
    leaderboard: "Top Leaderboard (728x90)",
    rectangle: "Large Rectangle (336x280)",
    sidebar: "Vertical Skyscraper (300x600)",
    inline: "In-Article Ad (Responsive)"
  };

  return (
    <div className={`${styles[type]} bg-slate-50 border border-slate-200 rounded-2xl flex flex-col items-center justify-center overflow-hidden relative group`}>
      <div className="absolute top-2 left-4 text-[9px] font-black text-slate-300 uppercase tracking-widest pointer-events-none">
        Advertisement
      </div>
      
      {/* Actual AdSense Tag Placeholder */}
      {/* 
        <ins className="adsbygoogle"
             style={{display: 'block'}}
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot={slotId}
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      */}

      <div className="text-center p-6 transition-all group-hover:scale-105">
        <div className="text-slate-400 font-bold text-sm mb-1">{labels[type]}</div>
        <div className="text-[10px] text-slate-300 font-mono">Slot ID: {slotId}</div>
      </div>

      <div className="absolute bottom-0 w-full h-1 bg-slate-100">
        <div className="h-full bg-indigo-200 w-1/3 animate-shimmer"></div>
      </div>
    </div>
  );
};

export default AdPlaceholder;
