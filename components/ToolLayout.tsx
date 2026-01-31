
import React from 'react';
import AdSenseManager from './AdSenseManager';

interface ToolLayoutProps {
  title: string;
  description: string;
  icon: string;
  input: React.ReactNode;
  actions?: React.ReactNode;
  result?: React.ReactNode;
  footer?: React.ReactNode;
}

const ToolLayout: React.FC<ToolLayoutProps> = ({ title, description, icon, input, actions, result, footer }) => {
  const toolId = title.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="animate-in fade-in duration-500">
      {/* 1. TOP BILLBOARD: Reserved Header Space */}
      <AdSenseManager slotId={`${toolId}_TOP`} type="BILLBOARD" className="mb-12" />

      <div className="flex flex-col items-center text-center mb-16 px-4">
        <div className="w-24 h-24 bg-indigo-600 rounded-[2.5rem] flex items-center justify-center text-white text-5xl mb-8 shadow-2xl transform hover:rotate-6 transition-all duration-500">
          {icon}
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-4 leading-none">{title}</h1>
        <p className="text-xl text-slate-500 font-medium italic max-w-2xl leading-relaxed">
          " Professional stateless processing. 100% data residency guaranteed in browser RAM. "
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-12">
          {/* Main Logic Node: Input Section */}
          <div className="bg-white rounded-[3.5rem] p-10 md:p-16 shadow-3xl border border-slate-100 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-2 h-full bg-indigo-600 opacity-20 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="mb-10 flex items-center gap-4">
               <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></div>
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Node Secure: Active</span>
            </div>
            {input}
            <div className="mt-12">{actions}</div>
          </div>

          {/* 2. THE GOLDEN RULE: Result Always Above the In-Flow Ad */}
          {result && (
            <div className="bg-white rounded-[4rem] p-12 md:p-20 shadow-[0_80px_160px_-40px_rgba(79,70,229,0.15)] border-2 border-indigo-50 relative overflow-hidden animate-in zoom-in-95 duration-700">
               <div className="absolute top-0 left-0 w-full h-1.5 bg-indigo-600"></div>
               <div className="mb-6 flex justify-between items-center border-b border-slate-50 pb-6">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-3">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                    Resolved Output
                  </h3>
               </div>
               {result}
            </div>
          )}

          {/* 3. IN-FLOW AD: Strategic placement AFTER user gets value */}
          <AdSenseManager slotId={`${toolId}_MID`} type="INLINE_RESULT" className="my-12" />
        </div>

        <aside className="lg:col-span-4 space-y-12">
          {/* 4. STICKY SIDEBAR: Long-form monetization */}
          <div className="sticky top-32">
             <AdSenseManager slotId={`${toolId}_SIDEBAR`} type="SIDEBAR" />
          </div>
        </aside>
      </div>

      {footer && (
        <div className="mt-20 border-t border-slate-100 pt-16">
          {footer}
        </div>
      )}

      {/* 5. FOOTER ANCHOR: Final Monetization Node */}
      <AdSenseManager slotId={`${toolId}_FOOTER`} type="BOTTOM_ANCHOR" className="mt-20" />
    </div>
  );
};

export default ToolLayout;
