import React, { useState, useEffect, useMemo } from 'react';
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { TOOLS } from '../../data/tools';
import { 
  csvToExcelConfig, excelDataCleanerConfig, dataDeduplicationConfig, 
  csvViewerConfig, csvToJsonConfig, jsonToCsvConfig, excelViewerConfig
} from '../../config/dataTools';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const DataTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [file, setFile] = useState<File | null>(null);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState("");
  const [resultData, setResultData] = useState<any>(null);

  const toolNode = useMemo(() => TOOLS.find(t => t.slug === slug), [slug]);
  const activeConfig = useMemo(() => [
    csvToExcelConfig, excelDataCleanerConfig, dataDeduplicationConfig, 
    csvViewerConfig, csvToJsonConfig, jsonToCsvConfig, excelViewerConfig
  ].find(c => c.slug === slug) || csvToExcelConfig, [slug]);

  const [options, setOptions] = useState<Record<string, any>>({});

  useEffect(() => {
    const initial: Record<string, any> = {};
    if (activeConfig.options) {
      activeConfig.options.forEach((opt: any) => initial[opt.id] = opt.default);
    }
    setOptions(initial);
    setResultData(null);
    setInputText("");
    setFile(null);
    setProgress("");
  }, [slug, activeConfig]);

  const handleRun = async () => {
    // Phase E: Instant Validation
    if (!file && !inputText.trim()) { onError("Validation Error: Dataset source is empty."); return; }
    if (file && file.size > 10 * 1024 * 1024) { onError("Payload Rejected: CSV exceeds 10MB limit."); return; }
    if (!toolNode?.execute) { onError("Node Failure: Logic isolate offline."); return; }

    setLoading(true);
    setProgress("Initializing Memory Isolate...");
    
    try {
      await new Promise(r => setTimeout(r, 300));
      setProgress("Parsing Data Schema...");
      
      const result = await toolNode.execute(file || inputText, options);
      
      setProgress("Serializing Output Buffer...");
      setResultData(result);
      onSuccess("Software Process Complete: Data Resolved.");
    } catch (err: any) {
      onError(err.message || "Logic Error: Spreadsheet engine encountered a structural fault.");
    } finally {
      setLoading(false);
      setProgress("");
    }
  };

  return (
    <ToolLayout
      title={activeConfig.title}
      description={activeConfig.description}
      icon={activeConfig.icon}
      colorClass={activeConfig.colorClass}
      input={
        <div className="space-y-8">
           <div className="p-16 border-4 border-dashed border-slate-100 rounded-[3rem] text-center hover:border-cyan-100 transition-all cursor-pointer relative group">
              <input 
                type="file" 
                accept=".csv,.xlsx,.xls,.json" 
                onChange={e => {
                  const f = e.target.files?.[0] || null;
                  setFile(f);
                  if (f) setInputText(""); 
                }} 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
              />
              <div className="text-7xl mb-6 group-hover:scale-110 transition-transform">📊</div>
              <p className="font-black text-slate-700 text-xl">{file ? file.name : "Select Dataset Source"}</p>
              <div className="mt-4 flex justify-center gap-4">
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Max 10MB</span>
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">•</span>
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">CSV / JSON</span>
              </div>
           </div>
           
           {!file && (
             <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Raw Buffer Input</label>
               <textarea 
                 value={inputText} 
                 onChange={e => setInputText(e.target.value)} 
                 placeholder="Paste raw data or JSON array here..." 
                 className="w-full h-44 p-8 bg-slate-50 border border-slate-200 rounded-[2.5rem] outline-none font-mono text-xs shadow-inner focus:ring-8 focus:ring-cyan-500/5 transition-all resize-none" 
               />
             </div>
           )}
        </div>
      }
      options={activeConfig.options?.length > 0 ? <OptionsPanel options={activeConfig.options as any} values={options} onChange={(id, val) => setOptions(p => ({...p, [id]: val}))} /> : undefined}
      actions={
        <button 
          onClick={handleRun} 
          disabled={loading || (!file && !inputText.trim())} 
          className="w-full py-8 bg-cyan-600 text-white rounded-[2.5rem] font-black text-2xl shadow-2xl transition-all active:scale-95 disabled:opacity-50 flex flex-col items-center justify-center gap-1"
        >
          {loading ? (
            <>
              <span className="animate-pulse">{progress}</span>
              <span className="text-[10px] opacity-70 uppercase tracking-widest">Logic Isolate Active</span>
            </>
          ) : "Execute Data Transformation"}
        </button>
      }
      result={resultData && (
        <div className="space-y-8 animate-in zoom-in-95 duration-500">
           <div className="bg-slate-950 p-10 rounded-[4rem] text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-10 opacity-[0.03] select-none pointer-events-none">
                 <div className="text-[12rem] font-black italic">DATA</div>
              </div>
              <div className="relative z-10">
                 <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-6">
                    <div className="flex items-center gap-4">
                       <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                       <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Data Integrity Verified</span>
                    </div>
                    <button 
                      onClick={() => {
                        const str = typeof resultData === 'string' ? resultData : JSON.stringify(resultData, null, 2);
                        navigator.clipboard.writeText(str);
                        onSuccess("Result Copied to Buffer");
                      }}
                      className="text-[10px] font-black text-white/40 hover:text-white uppercase tracking-widest transition-colors"
                    >
                      Copy Output
                    </button>
                 </div>
                 <textarea 
                    readOnly 
                    value={typeof resultData === 'string' ? resultData : JSON.stringify(resultData, null, 2)}
                    className="w-full h-80 bg-transparent text-cyan-400 font-mono text-xs border-none outline-none resize-none scrollbar-thin scrollbar-thumb-white/10"
                 />
              </div>
           </div>

           <div className="flex flex-col sm:flex-row gap-6">
              {resultData && (
                <button 
                  onClick={() => {
                    const str = typeof resultData === 'string' ? resultData : JSON.stringify(resultData, null, 2);
                    const blob = new Blob([str], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `toolverse_${slug}_${Date.now()}.txt`;
                    a.click();
                    onSuccess("Master Export Dispatched");
                  }}
                  className="flex-[2] py-6 bg-slate-900 text-white rounded-[2rem] font-black text-xl shadow-2xl hover:bg-indigo-600 hover:-translate-y-1 transition-all flex items-center justify-center gap-4"
                >
                  <span>💾</span> Save Processed Asset
                </button>
              )}
              <button 
                onClick={() => { setResultData(null); setFile(null); setInputText(""); }}
                className="flex-1 py-6 bg-slate-100 text-slate-400 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all"
              >
                Flush Isolate
              </button>
           </div>

           <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 text-left relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1.5 h-full bg-slate-200"></div>
             <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Phase U: Honest Limitations</h5>
             <p className="text-xs text-slate-500 font-medium leading-relaxed italic">
               Large datasets (>50,000 rows) may trigger browser throttling. Conversions assume RFC 4180 standard for CSV quoting. Complex nested JSON objects are flattened using a simple key-path logic which may not preserve multi-dimensional relationships.
             </p>
           </div>
        </div>
      )}
    />
  );
};

export default DataTools;