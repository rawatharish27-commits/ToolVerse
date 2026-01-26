
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
  }, [slug, activeConfig]);

  const handleRun = async () => {
    if (!toolNode?.execute) { onError("Data Node implementation missing."); return; }
    if (!file && !inputText.trim()) { onError("Source dataset required."); return; }

    setLoading(true);
    try {
      const result = await toolNode.execute(file || inputText, options);
      setResultData(result);
      onSuccess("Data Processing Node Synchronized!");
    } catch (err: any) {
      onError(err.message || "Spreadsheet Engine Fault.");
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
        <div className="space-y-6">
           <div className="p-16 border-4 border-dashed border-slate-100 rounded-[3rem] text-center hover:border-cyan-100 transition-all cursor-pointer relative group">
              <input 
                type="file" 
                accept=".csv,.xlsx,.xls,.json" 
                onChange={e => setFile(e.target.files?.[0] || null)} 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
              />
              <div className="text-7xl mb-6 group-hover:scale-110 transition-transform">📊</div>
              <p className="font-black text-slate-700 text-xl">{file ? file.name : "Upload Data Source"}</p>
              <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">Excel, CSV or JSON supported</p>
           </div>
           {!file && (
             <textarea 
               value={inputText} 
               onChange={e => setInputText(e.target.value)} 
               placeholder="Or paste raw data here..." 
               className="w-full h-32 p-6 bg-slate-50 border border-slate-200 rounded-[2rem] outline-none font-mono text-xs shadow-inner" 
             />
           )}
        </div>
      }
      options={activeConfig.options?.length > 0 ? <OptionsPanel options={activeConfig.options as any} values={options} onChange={(id, val) => setOptions(p => ({...p, [id]: val}))} /> : undefined}
      actions={<button onClick={handleRun} disabled={loading} className={`w-full py-7 ${activeConfig.colorClass} text-white rounded-[2.5rem] font-black text-2xl shadow-2xl transition-all active:scale-95 disabled:opacity-50`}>{loading ? "Crunching Records..." : "Process Dataset"}</button>}
      result={resultData && (
        <div className="space-y-8 animate-in zoom-in-95">
           <div className="bg-slate-900 p-10 rounded-[3rem] text-white flex flex-col items-center gap-6">
              <div className="text-5xl">✅</div>
              <div className="text-center">
                 <h4 className="text-xl font-black mb-2">Processing Success</h4>
                 <p className="text-slate-400 text-sm font-medium">Logical integrity verified at Edge.</p>
              </div>
              {resultData instanceof Blob && (
                <button 
                  onClick={() => {
                    const url = URL.createObjectURL(resultData);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `toolverse_processed_${Date.now()}.xlsx`;
                    a.click();
                    onSuccess("Download started!");
                  }}
                  className="px-12 py-5 bg-emerald-600 text-white rounded-2xl font-black text-lg shadow-xl hover:scale-105 transition-transform"
                >
                  Download Output (.xlsx)
                </button>
              )}
           </div>
        </div>
      )}
    />
  );
};

export default DataTools;
