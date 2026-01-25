
import React, { useState, useEffect } from 'react';
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { getToolConfig } from '../../utils/configRegistry';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const DevTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const activeConfig = getToolConfig(slug);
  const [options, setOptions] = useState<Record<string, any>>({});

  useEffect(() => {
    const initial: Record<string, any> = {};
    if (activeConfig.options) {
      activeConfig.options.forEach((opt: any) => initial[opt.id] = opt.default);
    }
    setOptions(initial);
    setInput("");
    setOutput("");
  }, [slug, activeConfig]);

  const handleRun = () => {
    if (!input.trim()) return onError("Input code required.");
    setLoading(true);
    
    setTimeout(() => {
      try {
        let result = "";
        if (slug === 'json-formatter') {
          result = JSON.stringify(JSON.parse(input), null, options.indent || 2);
        } else if (slug === 'html-minifier') {
          result = input.replace(/\s+/g, ' ').replace(/>\s+</g, '><').trim();
        } else if (slug === 'css-beautifier') {
          result = input
            .replace(/\s*\{\s*/g, " {\n  ")
            .replace(/\s*;\s*/g, ";\n  ")
            .replace(/\s*\}\s*/g, "\n}\n")
            .replace(/\n\s*\n/g, "\n");
        } else if (slug === 'base64-encoder-decoder') {
          result = options.mode === 'Encode' ? btoa(input) : atob(input);
        }
        
        setOutput(result);
        onSuccess("Logic Processed Successfully!");
      } catch (e) {
        onError("Syntax Error: Check your input code.");
      } finally {
        setLoading(false);
      }
    }, 300);
  };

  return (
    <ToolLayout
      title={activeConfig.title}
      description={activeConfig.description}
      icon={activeConfig.icon}
      colorClass={activeConfig.colorClass}
      input={
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={`Paste your ${slug.split('-')[0].toUpperCase()} here...`}
          className="w-full h-64 p-6 bg-slate-900 text-emerald-400 font-mono text-sm rounded-[2rem] outline-none shadow-inner"
        />
      }
      options={<OptionsPanel options={activeConfig.options as any} values={options} onChange={(id, v) => setOptions(p => ({...p, [id]: v}))} />}
      actions={<button onClick={handleRun} disabled={loading} className={`w-full py-6 ${activeConfig.colorClass} text-white rounded-2xl font-black text-xl shadow-xl active:scale-95`}>{loading ? "Crunching Code..." : `Run ${activeConfig.title}`}</button>}
      result={output && (
        <div className="relative group">
           <textarea readOnly value={output} className="w-full h-64 p-8 bg-slate-950 text-indigo-400 font-mono text-sm rounded-[2.5rem] border-none outline-none" />
           <button onClick={() => { navigator.clipboard.writeText(output); onSuccess("Copied!"); }} className="absolute bottom-6 right-8 px-6 py-2 bg-indigo-600 text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:scale-105 transition-all">Copy Result</button>
        </div>
      )}
    />
  );
};

export default DevTools;
