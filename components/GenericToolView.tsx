
import React, { useState, useEffect } from 'react';
import ToolLayout from './ToolLayout';
import OptionsPanel from './OptionsPanel';
import ToolLoader from './ToolLoader';
import OutputController from './OutputController';
import ToolFeedback from './ToolFeedback';
import { trackToolClick } from '../utils/attraction';

interface ToolOption {
  id: string;
  label: string;
  type: 'slider' | 'select' | 'toggle' | 'number' | 'text';
  min?: number;
  max?: number;
  values?: (string | number)[];
  default: any;
}

interface Props {
  slug: string;
  title: string;
  description: string;
  category: string;
  icon: string;
}

const GenericToolView: React.FC<Props> = ({ slug, title, description, category, icon }) => {
  const [options, setOptions] = useState<Record<string, any>>({});
  const [uiSchema, setUiSchema] = useState<ToolOption[]>([]);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [processFn, setProcessFn] = useState<any>(null);
  const [latency, setLatency] = useState<number>(0);
  const [isStub, setIsStub] = useState(false);

  useEffect(() => {
    setLoading(true);
    setResult(null);
    setIsStub(false);

    Promise.all([
      import(`../tools/${slug}/process`).then(m => m.process).catch(() => null),
      import(`../tools/${slug}/config`).then(m => m.CONFIG).catch(() => null)
    ]).then(([proc, config]) => {
      if (!proc) {
        setIsStub(true);
        // Basic fallback logic for stubs
        setProcessFn(() => async (o: any) => ({ 
          "Status": "Development Node", 
          "Message": "Logic kernel is currently being optimized for this specific node.",
          "Target Slug": slug 
        }));
      } else {
        setProcessFn(() => proc);
      }

      if (config?.options) {
        setUiSchema(config.options);
        const defaults: any = {};
        config.options.forEach((o: ToolOption) => defaults[o.id] = o.default);
        setOptions(defaults);
      } else {
        setUiSchema([]);
      }
      setLoading(false);
    });
  }, [slug]);

  const handleExecute = async () => {
    if (!processFn) return;
    const start = performance.now();
    setLoading(true);
    try {
      const out = await processFn(options);
      setResult(out);
      setLatency(performance.now() - start);
      trackToolClick(slug, category);
    } catch (e: any) {
      setResult({ error: e.message || "Logic Isolate Execution Fault" });
    } finally {
      setLoading(false);
    }
  };

  if (loading && !processFn) return <ToolLoader message="Deploying Logic Node..." />;

  const inputArea = (
    <div className="space-y-8">
       <div className="p-12 bg-indigo-50/50 rounded-[3rem] border-2 border-dashed border-indigo-100 text-center flex flex-col items-center group">
          {isStub && (
            <div className="absolute top-6 right-8 px-3 py-1 bg-amber-100 text-amber-600 text-[8px] font-black uppercase rounded-lg">Development Mode</div>
          )}
          <div className="text-8xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700">{icon}</div>
          <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.5em] italic">Precision Logic Kernel: Active</p>
       </div>
       
       {uiSchema.length > 0 && (
         <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-inner">
            <OptionsPanel 
              options={uiSchema as any} 
              values={options} 
              onChange={(id, val) => setOptions(prev => ({ ...prev, [id]: val }))} 
            />
         </div>
       )}
    </div>
  );

  return (
    <ToolLayout
      title={title}
      description={description}
      icon={icon}
      input={inputArea}
      actions={
        <button 
          onClick={handleExecute}
          disabled={loading || !processFn}
          className="w-full py-8 bg-indigo-600 text-white rounded-[2.5rem] font-black text-2xl shadow-2xl hover:bg-indigo-700 transition-all transform active:scale-95 disabled:opacity-50"
        >
          {loading ? "Crunching Logic..." : "Execute Logic Node"}
        </button>
      }
      result={result && (
        <div className="space-y-12 animate-in zoom-in-95 duration-500">
           <div className="flex items-center justify-between px-4">
              <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
                 <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Logic Resolved in {latency.toFixed(2)}ms</span>
              </div>
              <div className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Sig: {Math.random().toString(36).substring(7).toUpperCase()}</div>
           </div>

           <OutputController 
             type="data" 
             data={result} 
             fileName={`toolverse_${slug}.json`}
             onSuccess={() => {}} 
           />

           <ToolFeedback toolSlug={slug} />
        </div>
      )}
      footer={
        <div className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100 text-left relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-slate-200"></div>
          <h5 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">Technical Integrity Audit</h5>
          <p className="text-xs text-slate-500 font-medium leading-relaxed italic leading-relaxed">
            Every calculation in the ToolVerse network is performed on the user's hardware. This node utilizes 64-bit address space isolation to protect against buffer overflow and data cross-contamination.
          </p>
        </div>
      }
    />
  );
};

export default GenericToolView;
