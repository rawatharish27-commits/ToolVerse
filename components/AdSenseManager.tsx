
import React from 'react';

interface Props {
  slotId: string;
  type: 'sidebar' | 'bottom' | 'mid';
}

const AdSenseManager: React.FC<Props> = ({ slotId, type }) => {
  const styles = {
    sidebar: "hidden lg:block min-h-[600px] w-full bg-slate-50 border border-slate-100 rounded-3xl",
    bottom: "min-h-[120px] w-full bg-white border-t border-slate-100",
    mid: "min-h-[280px] w-full my-12 bg-slate-50 border border-dashed border-slate-200 rounded-3xl"
  };

  return (
    <div className={`${styles[type]} flex items-center justify-center relative overflow-hidden group`}>
      <div className="absolute top-2 left-4 text-[8px] font-black text-slate-300 uppercase tracking-widest">
        Partner Intelligence
      </div>
      
      {/* Actual AdSense Tag Placeholder */}
      <ins className="adsbygoogle"
           style={{display: 'block'}}
           data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
           data-ad-slot={slotId}
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>

      <div className="text-[10px] font-bold text-slate-400 opacity-20 group-hover:opacity-100 transition-opacity">
        AD SLOT {slotId}
      </div>
    </div>
  );
};

export default AdSenseManager;
