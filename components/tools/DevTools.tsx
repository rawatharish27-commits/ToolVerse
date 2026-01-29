
import React, { useState, useEffect, useMemo } from 'react';
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { TOOLS } from '../../data/tools';
import { getToolConfig } from '../../utils/configRegistry';
import OutputController from '../OutputController';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const DevTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<Record<string, any>>({});

  const toolNode = useMemo(() => TOOLS.find(t => t.slug === slug), [slug]);
  const activeConfig = useMemo(() => getToolConfig(slug), [slug]);

  useEffect(() => {
    const initial: Record<string, any> = {};
    if (activeConfig.options) {
      activeConfig.options.forEach((opt: any) => initial[opt.id] = opt.default);
    }
    setOptions(initial);
    setInput("");
    setOutput("");
  }, [slug, activeConfig]);

  const handleRun = async () => {
    if (!input.trim()) return onError("Input data required.");
    if (!toolNode?.execute) return onError("Logic node not resolved.");

    setLoading(true);
    try {
      const res = await toolNode.execute(input, options);
      const finalStr = typeof res === 'string' ? res : JSON.stringify(res, null, 2);
      setOutput(finalStr);
      onSuccess("Development Logic Node Synchronized!");
    } catch (e: any) {
      onError(e.message || "Compiler/Logic Engine Fault.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      title={activeConfig.title}
      description={activeConfig.description}
      icon={activeConfig.icon}
      colorClass={activeConfig.colorClass}
      input={
        <div className="space-y-4">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Source Buffer</label>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={`Paste your code or target text here...`}
            className="w-full h-64 p-8 bg-slate-900 text-emerald-400 font-mono text-xs rounded-[2rem] outline-none shadow-2xl focus:ring-8 focus:ring-indigo-500/5 transition-all"
          />
        </div>
      }
      options={activeConfig.options?.length > 0 ? <OptionsPanel options={activeConfig.options as any} values={options} onChange={(id, v) => setOptions(p => ({...p, [id]: v}))} /> : undefined}
      actions={<button onClick={handleRun} disabled={loading} className={`w-full py-7 ${activeConfig.colorClass} text-white rounded-[2.5rem] font-black text-2xl shadow-2xl transition-all active:scale-95 disabled:opacity-50`}>{loading ? "Crunching Logic..." : `Execute ${activeConfig.title}`}</button>}
      result={output && (
        <OutputController 
          type="data" 
          data={output} 
          fileName={`toolverse_dev_${slug}_${Date.now()}.txt`}
          onSuccess={onSuccess}
        />
      )}
    />
  );
};

export default DevTools;
