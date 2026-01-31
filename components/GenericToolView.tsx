
import React, { useState, useEffect } from 'react';
import ToolLayout from './ToolLayout';
import OptionsPanel from './OptionsPanel';
import ToolLoader from './ToolLoader';
import OutputController from './OutputController';
import { executeTool } from '../core/executeTool';
import { trackToolClick } from '../utils/attraction';

interface Props {
  slug: string;
  title: string;
  description: string;
  category: string;
  icon: string;
}

const GenericToolView: React.FC<Props> = ({ slug, title, description, category, icon }) => {
  const [logic, setLogic] = useState<any>(null);
  const [options, setOptions] = useState<Record<string, any>>({});
  const [uiSchema, setUiSchema] = useState<any[]>([]);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'loading' | 'ready' | 'stub'>('loading');

  useEffect(() => {
    let active = true;
    const load = async () => {
      setStatus('loading');
      try {
        // Attempt to load logic and config from the tool's folder
        const [proc, cfg, val, norm, ver, exp] = await Promise.all([
          import(`../tools/${slug}/process`).then(m => m.process).catch(() => null),
          import(`../tools/${slug}/config`).then(m => m.CONFIG).catch(() => null),
          import(`../tools/${slug}/validate`).then(m => m.validate).catch(() => null),
          import(`../tools/${slug}/normalize`).then(m => m.normalize).catch(() => null),
          import(`../tools/${slug}/verify`).then(m => m.verify).catch(() => null),
          import(`../tools/${slug}/explain`).then(m => m.explain).catch(() => null)
        ]);

        if (!active) return;

        if (!proc) {
          setStatus('stub');
        } else {
          setLogic({ process: proc, validate: val, normalize: norm, verify: ver, explain: exp });
          if (cfg?.options) {
            setUiSchema(cfg.options);
            const defaults: any = {};
            cfg.options.forEach((o: any) => defaults[o.id] = o.default);
            setOptions(defaults);
          }
          setStatus('ready');
        }
      } catch (e) {
        if (active) setStatus('stub');
      }
    };
    load();
    return () => { active = false; };
  }, [slug]);

  const handleRun = async () => {
    if (status !== 'ready') return;
    setLoading(true);
    setResult(null);
    // Fix: Wrapped arguments in a single object as expected by executeTool to fix the 'Expected 1 arguments, but got 2' error.
    const res = await executeTool({ input: options, ...logic });
    setResult(res);
    setLoading(false);
    trackToolClick(slug, category);
  };

  if (status === 'loading') return <ToolLoader message="Warming up Logic Node..." />;

  if (status === 'stub') return (
    <div className="py-20 text-center space-y-6">
       <div className="text-8xl grayscale opacity-20">🚧</div>
       <h3 className="text-2xl font-black text-slate-300 uppercase tracking-widest">Logic Node Pending</h3>
       <p className="text-slate-400 font-medium italic max-w-sm mx-auto">This tool is in our build pipeline and will be live in the next release cycle.</p>
       <button onClick={() => window.history.back()} className="px-8 py-3 bg-slate-100 text-slate-500 rounded-xl font-black text-[10px] uppercase tracking-widest">Return to Directory</button>
    </div>
  );

  return (
    <ToolLayout
      title={title}
      description={description}
      icon={icon}
      input={
        <div className="space-y-10">
           <div className="p-12 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200 text-center flex flex-col items-center">
              <div className="text-8xl mb-6">{icon}</div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] italic">Stateless Logic Isolate Active</p>
           </div>
           
           {uiSchema.length > 0 && (
             <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-inner">
                <OptionsPanel 
                  options={uiSchema} 
                  values={options} 
                  onChange={(id, val) => setOptions(prev => ({ ...prev, [id]: val }))} 
                />
             </div>
           )}
        </div>
      }
      actions={
        <button 
          onClick={handleRun} 
          disabled={loading}
          className="w-full py-8 bg-indigo-600 text-white rounded-[2.5rem] font-black text-2xl shadow-2xl hover:bg-indigo-700 transition-all transform active:scale-95 disabled:opacity-50"
        >
          {loading ? "Crunching Logic..." : "Execute Tool Logic"}
        </button>
      }
      result={result && (
        <div className="space-y-10 animate-in zoom-in-95 duration-500">
           {result.success ? (
             <>
               <OutputController 
                 type="data" 
                 data={result.data} 
                 fileName={`toolverse_${slug}.json`}
                 onSuccess={() => {}} 
               />
               <div className="p-8 bg-indigo-50 rounded-[2.5rem] border border-indigo-100 italic font-medium text-indigo-900 text-sm">
                 " {result.explanation} "
               </div>
             </>
           ) : (
             <div className="p-10 bg-rose-50 rounded-[2.5rem] border border-rose-100 text-rose-700 font-bold">
               Error: {result.error}
             </div>
           )}
        </div>
      )}
      footer={
        <div className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100 text-left">
          <h5 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">Integrity Audit</h5>
          <p className="text-xs text-slate-500 font-medium leading-relaxed italic">
            This tool processes data locally in your browser RAM. No data is sent to ToolVerse servers.
          </p>
        </div>
      }
    />
  );
};

export default GenericToolView;
