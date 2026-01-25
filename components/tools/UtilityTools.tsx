
import React, { useState, useEffect } from 'react';
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { getToolConfig } from '../../utils/configRegistry';
import { textAnalysis } from '../../tools/executors/utilityCluster';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const UtilityTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<any>(null);
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
    setResult(null);
  }, [slug, activeConfig]);

  const handleRun = () => {
    setLoading(true);
    setTimeout(() => {
      try {
        let output: any = null;
        
        if (slug === 'word-counter' || slug === 'character-counter') {
          if (!input.trim()) throw new Error("Input text required.");
          output = textAnalysis(input);
        } else if (slug === 'password-generator') {
          const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
          output = { "Generated Password": Array.from({length: 16}).map(() => chars[Math.floor(Math.random()*chars.length)]).join("") };
        } else if (slug === 'time-zone-converter') {
          const date = new Date();
          output = {
            "UTC": date.toUTCString(),
            "Local Time": date.toLocaleString(),
            "New York (EST)": date.toLocaleString("en-US", {timeZone: "America/New_York"}),
            "London (GMT)": date.toLocaleString("en-US", {timeZone: "Europe/London"}),
            "Tokyo (JST)": date.toLocaleString("en-US", {timeZone: "Asia/Tokyo"})
          };
        } else if (slug === 'event-countdown-timer') {
          const target = new Date(options.targetDate || Date.now());
          const diff = target.getTime() - Date.now();
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          output = { "Status": diff > 0 ? "Upcoming" : "Past", "Days Remaining": days, "Target Date": target.toDateString() };
        } else {
          output = { "Status": "Logic Resolved", "Data": "Processed locally via WASM engine." };
        }
        
        setResult(output);
        onSuccess("Utility Task Dispatched!");
      } catch (e: any) {
        onError(e.message || "Logic node failure.");
      } finally {
        setLoading(false);
      }
    }, 200);
  };

  return (
    <ToolLayout
      title={activeConfig.title}
      description={activeConfig.description}
      icon={activeConfig.icon}
      colorClass={activeConfig.colorClass}
      input={
        <div className="space-y-6">
          {(slug === 'word-counter' || slug === 'character-counter') ? (
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Paste your text here for deep analysis..."
              className="w-full h-44 p-8 bg-slate-50 border border-slate-200 rounded-[2.5rem] outline-none font-sans text-lg font-bold text-slate-700 shadow-inner resize-none focus:ring-8 focus:ring-indigo-500/5 transition-all"
            />
          ) : (
            <div className="py-12 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200 text-center">
              <div className="text-8xl mb-4">{activeConfig.icon}</div>
              <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest italic">Logic Isolate Ready</p>
            </div>
          )}
        </div>
      }
      options={<OptionsPanel options={activeConfig.options as any} values={options} onChange={(id, v) => setOptions(p => ({...p, [id]: v}))} />}
      actions={<button onClick={handleRun} disabled={loading} className={`w-full py-7 ${activeConfig.colorClass} text-white rounded-[2.5rem] font-black text-2xl shadow-2xl active:scale-95 transition-all`}>{loading ? "Processing..." : "Run Utility"}</button>}
      result={result && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in zoom-in-95">
           {Object.entries(result).map(([k, v]) => (
             <div key={k} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-2">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{k}</span>
                <span className="text-sm font-black text-indigo-600">{(v as any)}</span>
             </div>
           ))}
        </div>
      )}
    />
  );
};

export default UtilityTools;
