
import React, { useState } from 'react';
import { ExecutionResult } from '../core/pipeline';

interface ToolShellProps {
  title: string;
  description: string;
  icon: string;
  children: (execute: () => void, loading: boolean, result: ExecutionResult<any> | null) => React.ReactNode;
  onExecute: () => Promise<ExecutionResult<any>>;
}

const ToolShell: React.FC<ToolShellProps> = ({ title, description, icon, children, onExecute }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ExecutionResult<any> | null>(null);

  const handleRun = async () => {
    setLoading(true);
    setResult(null);
    const res = await onExecute();
    setResult(res);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 animate-in fade-in duration-500">
      <header className="flex items-center gap-6 pb-8 border-b border-slate-100">
        <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-3xl text-white shadow-xl">
          {icon}
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">{title}</h1>
          <p className="text-slate-500 font-medium">{description}</p>
        </div>
      </header>

      <main className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
        {children(handleRun, loading, result)}
      </main>

      {result && (
        <section className={`p-8 rounded-[2rem] border-2 animate-in slide-in-from-bottom-4 duration-500 ${result.success ? 'bg-emerald-50 border-emerald-100' : 'bg-rose-50 border-rose-100'}`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className={`font-black uppercase tracking-widest text-xs ${result.success ? 'text-emerald-600' : 'text-rose-600'}`}>
              {result.success ? 'Success: Verification Complete' : 'Error: Processing Fault'}
            </h3>
            <span className="text-[10px] font-bold text-slate-400 tabular-nums">
              Engine Latency: {result.timing?.toFixed(2)}ms
            </span>
          </div>
          
          {result.success ? (
             <div className="space-y-4">
                <p className="text-slate-700 font-medium leading-relaxed">{result.explanation}</p>
             </div>
          ) : (
             <p className="text-rose-700 font-bold">{result.error}</p>
          )}
        </section>
      )}

      <footer className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden group">
         <div className="relative z-10">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-indigo-400 mb-4">Phase U: Technical Boundaries</h4>
            <ul className="text-xs text-slate-400 space-y-2 font-medium">
               <li>• Execution is 100% stateless (In-RAM processing only)</li>
               <li>• Browser-native isolation ensures no data egress</li>
               <li>• Maximum file payload: 20MB (Client Throttled)</li>
            </ul>
         </div>
         <div className="absolute top-0 right-0 p-8 text-6xl opacity-10 group-hover:scale-110 transition-transform duration-700">🛡️</div>
      </footer>
    </div>
  );
};

export default ToolShell;
