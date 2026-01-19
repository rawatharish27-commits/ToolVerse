
import React from 'react';

interface AdPlaceholderProps {
  type: 'banner' | 'sidebar' | 'inline';
}

const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ type }) => {
  const styles = {
    banner: "w-full h-24 md:h-32",
    sidebar: "w-full h-64",
    inline: "w-full h-48 my-8"
  };

  return (
    <div className={`${styles[type]} bg-slate-100 border border-dashed border-slate-300 rounded-lg flex items-center justify-center overflow-hidden`}>
      <div className="text-center p-4">
        <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Advertisement</span>
        <div className="text-slate-300 font-bold text-lg">AdSense {type.toUpperCase()} Slot</div>
        <p className="text-[10px] text-slate-400 mt-1 max-w-[200px] mx-auto">High CPM placement ready for Google AdSense integration.</p>
      </div>
    </div>
  );
};

export default AdPlaceholder;
