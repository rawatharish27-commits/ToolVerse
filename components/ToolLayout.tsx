
import React from 'react';
import AdSlot from './AdSlot';
import { AD_CONFIG } from '../config/ads';

interface ToolLayoutProps {
  title: string;
  description: string;
  icon: string;
  colorClass?: string;
  input: React.ReactNode;
  options?: React.ReactNode;
  actions?: React.ReactNode;
  result?: React.ReactNode;
  comparison?: React.ReactNode;
  footer?: React.ReactNode;
}

const ToolLayout: React.FC<ToolLayoutProps> = ({
  title,
  description,
  icon,
  colorClass = "bg-indigo-600",
  input,
  options,
  actions,
  result,
  comparison,
  footer
}) => {
  return (
    <div className="animate-in fade-in duration-500 space-y-10">
      {/* Tool Header */}
      <div className="text-center space-y-6 pt-4">
        <div className={`w-20 h-20 md:w-24 md:h-24 ${colorClass} rounded-[2rem] flex items-center justify-center text-white text-4xl md:text-5xl mx-auto shadow-2xl transform hover:rotate-3 transition-transform duration-500`}>
          {icon}
        </div>
        <div className="space-y-3">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight capitalize">{title}</h2>
          <p className="text-slate-500 text-sm md:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className={`${options ? 'lg:col-span-8' : 'lg:col-span-12'} space-y-6`}>
          <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-slate-100 opacity-50"></div>
            {input}
          </div>

          {actions && (
            <div className="flex flex-wrap gap-4 pt-2">
              {actions}
            </div>
          )}
        </div>

        {options && (
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-200 shadow-inner">
               <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center">
                 <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3 animate-pulse"></span>
                 Tool Parameters
               </div>
               <div className="space-y-6">
                {options}
               </div>
            </div>
          </div>
        )}
      </div>

      {comparison && (
        <div className="pt-6">
           <div className="bg-slate-950 rounded-[3rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                <div className="text-9xl font-black italic">DIFF</div>
              </div>
              <div className="relative z-10">
                 {comparison}
              </div>
           </div>
        </div>
      )}

      {/* Result Area */}
      {result && (
        <div className="pt-6 animate-in slide-in-from-top-8 duration-500">
           <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-[0_50px_100px_-20px_rgba(79,70,229,0.12)] border-2 border-indigo-50/50 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"></div>
              <div className="flex justify-between items-center mb-8">
                <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Master Result Output</span>
              </div>
              {result}
           </div>
        </div>
      )}

      {/* STRATEGIC MONETIZATION SLOT - POST RESULT */}
      <AdSlot id={AD_CONFIG.slots.mid_content} className="my-12" variant="result-based" />

      {footer && (
        <div className="pt-10 border-t border-slate-100 opacity-60">
          {footer}
        </div>
      )}
    </div>
  );
};

export default ToolLayout;
