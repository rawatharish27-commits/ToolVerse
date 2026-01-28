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
    <div className="animate-in fade-in duration-500 space-y-12">
      {/* Tool Header - Phase R: SEO Integration */}
      <div className="text-center space-y-6 pt-4">
        <div className={`w-24 h-24 ${colorClass} rounded-[2.5rem] flex items-center justify-center text-white text-5xl mx-auto shadow-2xl transform hover:rotate-3 transition-transform duration-700`}>
          {icon}
        </div>
        <div className="space-y-4">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter capitalize leading-none">{title}</h2>
          <p className="text-slate-500 text-sm md:text-xl font-medium max-w-2xl mx-auto leading-relaxed px-4">
            {description}
          </p>
        </div>
      </div>

      {/* Workspace Grid - Phase G: Performance Aware Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className={`${options ? 'lg:col-span-8' : 'lg:col-span-12'} space-y-8`}>
          <div className="bg-white rounded-[3.5rem] p-8 md:p-12 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] border border-slate-100 relative overflow-hidden transition-shadow hover:shadow-3xl">
            <div className="absolute top-0 left-0 w-2 h-full bg-slate-50 opacity-50"></div>
            {input}
          </div>

          {actions && (
            <div className="flex flex-wrap gap-4 pt-2">
              {actions}
            </div>
          )}
        </div>

        {options && (
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-slate-50 rounded-[3.5rem] p-10 border border-slate-200 shadow-inner sticky top-32">
               <div className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] mb-10 flex items-center gap-3">
                 <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-pulse"></span>
                 Logic Control
               </div>
               <div className="space-y-10">
                {options}
               </div>
               <div className="mt-12 pt-8 border-t border-slate-200 flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm">✓</div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-tight">Deterministic Processing Guaranteed</span>
               </div>
            </div>
          </div>
        )}
      </div>

      {comparison && (
        <div className="pt-6">
           <div className="bg-slate-950 rounded-[3.5rem] p-10 md:p-16 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                <div className="text-[12rem] font-black italic select-none">DIFF</div>
              </div>
              <div className="relative z-10">
                 {comparison}
              </div>
           </div>
        </div>
      )}

      {/* Result Area - Phase K: Incrementally Prepared Output */}
      {result && (
        <div className="pt-10 animate-in slide-in-from-top-12 duration-700">
           <div className="bg-white rounded-[4rem] p-10 md:p-20 shadow-[0_80px_160px_-40px_rgba(79,70,229,0.15)] border-2 border-indigo-50/80 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"></div>
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-4">
                   <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
                   <span className="text-[11px] font-black text-indigo-500 uppercase tracking-[0.4em]">Master Intelligence Output</span>
                </div>
                <div className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Logic Code: {Math.random().toString(36).substring(7).toUpperCase()}</div>
              </div>
              {result}
           </div>
        </div>
      )}

      {/* Strategic Monetization - Load before Footer but after Result */}
      <AdSlot id={AD_CONFIG.slots.mid_content} className="my-20" variant="result-based" />

      {footer && (
        <div className="pt-16 border-t border-slate-100 opacity-60">
          {footer}
        </div>
      )}
    </div>
  );
};

export default ToolLayout;