
import React, { useState, useMemo, Suspense, lazy } from 'react';
import { PROBLEM_HUBS } from '../data/problems';
import ToolPage from './ToolPage';

interface Props {
  hubId: string;
  onNavigate: (page: string, params?: any) => void;
}

const GuidedFlowPage: React.FC<Props> = ({ hubId, onNavigate }) => {
  const [step, setStep] = useState(0);
  const hub = useMemo(() => PROBLEM_HUBS.find(h => h.id === hubId), [hubId]);

  if (!hub) return <div className="p-40 text-center font-black">PROBLEM CLUSTER OFFLINE</div>;

  const currentStep = hub.flow[step];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Dynamic Flow Header */}
      <div className="sticky top-20 z-[100] bg-slate-900 text-white p-6 border-b border-white/10">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
           <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-xl font-black shadow-lg shadow-indigo-600/20">
                {step + 1}
              </div>
              <div>
                <h2 className="text-xl font-black tracking-tight">{hub.title}</h2>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Stage: {currentStep.instruction}</p>
              </div>
           </div>
           
           <div className="flex gap-4">
              {step > 0 && (
                <button onClick={() => setStep(p => p - 1)} className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all">← Previous</button>
              )}
              {step < hub.flow.length - 1 ? (
                <button onClick={() => setStep(p => p + 1)} className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl transition-all active:scale-95">Next Stage →</button>
              ) : (
                <button onClick={() => onNavigate('home')} className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl transition-all">Flow Complete ✓</button>
              )}
           </div>
        </div>
      </div>

      {/* Progress Line */}
      <div className="h-1.5 w-full bg-slate-200">
        <div 
          className="h-full bg-indigo-600 transition-all duration-700 ease-out"
          style={{ width: `${((step + 1) / hub.flow.length) * 100}%` }}
        />
      </div>

      <div className="max-w-[1600px] mx-auto py-12 px-8">
         <div className="bg-white rounded-[4rem] p-10 md:p-20 shadow-3xl border border-slate-100">
            <Suspense fallback={<div className="h-96 flex items-center justify-center animate-pulse font-black text-slate-300">Synchronizing Logic Isolate...</div>}>
               <ToolPage slug={currentStep.toolSlug} onNavigate={onNavigate} />
            </Suspense>
         </div>

         {/* Contextual Flow Assistance */}
         <div className="mt-12 p-8 bg-indigo-50 rounded-[2.5rem] border border-indigo-100 flex items-center justify-between">
            <div className="flex items-center gap-6">
               <div className="text-4xl">💡</div>
               <div>
                  <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1">Strategy Intelligence</p>
                  <p className="text-sm font-bold text-indigo-900 leading-relaxed italic">
                    "This flow identifies structural mismatches before you attempt another upload. Step {step + 1} is critical for metadata integrity."
                  </p>
               </div>
            </div>
            <button onClick={() => setStep(p => p + 1)} className="px-6 py-3 text-[9px] font-black text-indigo-400 hover:text-indigo-700 uppercase tracking-widest">Skip if verified →</button>
         </div>
      </div>
    </div>
  );
};

export default GuidedFlowPage;
