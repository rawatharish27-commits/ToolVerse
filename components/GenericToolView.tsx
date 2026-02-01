
import React, { useState, useEffect, useMemo } from 'react';
import ToolLayout from './ToolLayout';
import OptionsPanel from './OptionsPanel';
import ToolLoader from './ToolLoader';
import OutputController from './OutputController';
import { executeTool } from '../core/executeTool';
import { executeOnEdge } from '../services/toolApi';
import { trackToolClick } from '../utils/attraction';
import ToolSEOContent from './ToolSEOContent';

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
  const [engineType, setEngineType] = useState<'local' | 'neural'>('local');

  useEffect(() => {
    let active = true;
    const load = async () => {
      setLoading(true);
      try {
        // Dynamic detection of local logic nodes
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
          // If no local logic found, switch to Edge AI Orchestrator
          setEngineType('neural');
          // Basic UI for AI parameters
          setUiSchema([
            { id: 'context', label: 'Additional Context (Optional)', type: 'text', default: '' },
            { id: 'detail', label: 'Precision Level', type: 'select', values: ['Standard', 'High-Detail', 'Scientific'], default: 'Standard' }
          ]);
          setOptions({ context: '', detail: 'Standard' });
        } else {
          setEngineType('local');
          setLogic({ process: proc, validate: val, normalize: norm, verify: ver, explain: exp });
          if (cfg?.options) {
            setUiSchema(cfg.options);
            const defaults: any = {};
            cfg.options.forEach((o: any) => defaults[o.id] = o.default);
            setOptions(defaults);
          }
        }
      } catch (e) {
        if (active) setEngineType('neural');
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => { active = false; };
  }, [slug]);

  const handleRun = async () => {
    setLoading(true);
    setResult(null);
    
    let res;
    if (engineType === 'local') {
      res = await executeTool({ input: options, ...logic });
    } else {
      // Direct Neural Path for A-Z coverage
      const aiRes = await executeOnEdge(slug, category, { ...options, toolTitle: title });
      res = aiRes.success ? {
        success: true,
        data: aiRes.data,
        explanation: `Intelligence Node: ${title} resolved via Neural Logic.`
      } : { success: false, error: aiRes.error };
    }

    setResult(res);
    setLoading(false);
    trackToolClick(slug, category);
  };

  return (
    <ToolLayout
      title={title}
      description={description}
      icon={icon}
      input={
        <div className="space-y-10">
           <div className={`p-12 rounded-[3rem] border-2 border-dashed text-center flex flex-col items-center ${engineType === 'local' ? 'bg-slate-50 border-slate-200' : 'bg-indigo-50/30 border-indigo-100'}`}>
              <div className="text-8xl mb-6">{icon}</div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] italic">
                {engineType === 'local' ? 'Stateless Local Isolate Active' : 'Edge Neural Node Active'}
              </p>
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
          className={`w-full py-8 text-white rounded-[2.5rem] font-black text-2xl shadow-2xl transition-all transform active:scale-95 disabled:opacity-50 ${engineType === 'local' ? 'bg-slate-900' : 'bg-indigo-600'}`}
        >
          {loading ? "Engaging Logic Node..." : `Execute ${title}`}
        </button>
      }
      result={result && (
        <div className="space-y-10 animate-in zoom-in-95 duration-500">
           {result.success ? (
             <>
               <OutputController 
                 type={typeof result.data === 'string' ? 'text' : 'data'}
                 data={result.data} 
                 fileName={`toolverse_${slug}.json`}
                 onSuccess={() => {}} 
               />
               <div className="p-8 bg-indigo-50 rounded-[2.5rem] border border-indigo-100 italic font-medium text-indigo-900 text-sm leading-relaxed">
                 " {result.explanation} "
               </div>
             </>
           ) : (
             <div className="p-10 bg-rose-50 rounded-[2.5rem] border border-rose-100 text-rose-700 font-bold">
               Operational Error: {result.error}
             </div>
           )}
        </div>
      )}
      footer={<ToolSEOContent tool={{ slug, title, description, category: category as any, keywords: [] }} />}
    />
  );
};

export default GenericToolView;
