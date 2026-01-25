
import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { getToolConfig } from '../../utils/configRegistry';
import { cleanData, deduplicate, convertJsonToCsv } from '../../tools/executors/dataCluster';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const DataTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [file, setFile] = useState<File | null>(null);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ rows: 0, cols: 0 });
  const [resultData, setResultData] = useState<any>(null);
  const [previewRows, setPreviewRows] = useState<any[][]>([]);

  const activeConfig = getToolConfig(slug);
  const [options, setOptions] = useState<Record<string, any>>({});

  useEffect(() => {
    const initial: Record<string, any> = {};
    if (activeConfig.options) {
      activeConfig.options.forEach((opt: any) => initial[opt.id] = opt.default);
    }
    setOptions(initial);
    setResultData(null);
    setPreviewRows([]);
  }, [slug, activeConfig]);

  const handleRun = async () => {
    if (!file && !inputText.trim()) {
      onError("Please provide a file or text data.");
      return;
    }

    setLoading(true);
    try {
      let finalBlob: Blob | null = null;
      let finalName = `toolverse_${slug}_result`;

      // Helper: Get data as array of arrays
      let data: any[][] = [];
      if (file) {
        const buffer = await file.arrayBuffer();
        const workbook = XLSX.read(buffer);
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        data = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
      } else {
        const text = inputText.trim();
        if (text.startsWith('[') || text.startsWith('{')) {
          const json = JSON.parse(text);
          data = Array.isArray(json) ? [Object.keys(json[0]), ...json.map(Object.values)] : [Object.keys(json), Object.values(json)];
        } else {
          data = text.split('\n').map(line => line.split(','));
        }
      }

      // Logic Branching
      switch (slug) {
        case 'csv-to-excel-converter':
          const ws = XLSX.utils.aoa_to_sheet(data);
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, options.sheetName || "Data");
          const wbOut = XLSX.write(wb, { type: 'array', bookType: 'xlsx' });
          finalBlob = new Blob([wbOut], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          finalName += ".xlsx";
          break;

        case 'excel-data-cleaner':
          const cleaned = cleanData(data, options);
          const cleanWs = XLSX.utils.aoa_to_sheet(cleaned);
          const cleanWb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(cleanWb, cleanWs, "Cleaned");
          const cleanOut = XLSX.write(cleanWb, { type: 'array', bookType: 'xlsx' });
          finalBlob = new Blob([cleanOut], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          finalName += ".xlsx";
          data = cleaned;
          break;

        case 'data-deduplication-tool':
          const deduped = deduplicate(data, options.caseSensitive);
          const dedupWs = XLSX.utils.aoa_to_sheet(deduped);
          const dedupWb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(dedupWb, dedupWs, "Unique_Records");
          const dedupOut = XLSX.write(dedupWb, { type: 'array', bookType: 'xlsx' });
          finalBlob = new Blob([dedupOut], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          finalName += ".xlsx";
          data = deduped;
          break;

        case 'json-to-csv':
          const csv = XLSX.utils.sheet_to_csv(XLSX.utils.aoa_to_sheet(data));
          finalBlob = new Blob([csv], { type: 'text/csv' });
          finalName += ".csv";
          break;

        default:
          throw new Error("Logic node mapping error.");
      }

      setStats({ rows: data.length, cols: data[0]?.length || 0 });
      setPreviewRows(data.slice(0, 10));
      setResultData({ blob: finalBlob, name: finalName });
      onSuccess("Data Processing Complete!");
    } catch (err: any) {
      onError(err.message || "Failed to process data structure.");
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
           <div className="p-10 border-4 border-dashed border-slate-100 rounded-[3rem] text-center hover:border-cyan-100 transition-all cursor-pointer relative group">
              <input type="file" accept=".csv,.xlsx,.xls,.json" onChange={e => setFile(e.target.files?.[0] || null)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">📊</div>
              <p className="font-black text-slate-700 text-xl">{file ? file.name : "Click to Upload Dataset"}</p>
              <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">CSV, Excel, or JSON accepted</p>
           </div>
           {!file && (
             <textarea 
               value={inputText} 
               onChange={e => setInputText(e.target.value)} 
               placeholder="Or paste your raw data here (CSV or JSON array)..." 
               className="w-full h-40 p-6 bg-slate-50 border border-slate-200 rounded-[2rem] outline-none font-mono text-xs shadow-inner" 
             />
           )}
        </div>
      }
      options={<OptionsPanel options={activeConfig.options as any} values={options} onChange={(id, val) => setOptions(p => ({...p, [id]: val}))} />}
      actions={<button onClick={handleRun} disabled={loading} className={`w-full py-7 ${activeConfig.colorClass} text-white rounded-[2.5rem] font-black text-2xl shadow-2xl transition-all active:scale-95 disabled:opacity-50`}>{loading ? "Crunching Records..." : "Process Data"}</button>}
      result={resultData && (
        <div className="space-y-8 animate-in zoom-in-95">
           <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-wrap justify-center gap-8">
              <div className="text-center">
                 <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Total Rows</span>
                 <span className="text-2xl font-black text-indigo-600">{stats.rows}</span>
              </div>
              <div className="text-center">
                 <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Total Columns</span>
                 <span className="text-2xl font-black text-indigo-600">{stats.cols}</span>
              </div>
           </div>

           <div className="space-y-4">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Preview (Top 10 Rows)</div>
              <div className="overflow-x-auto rounded-3xl border border-slate-100 shadow-sm">
                 <table className="w-full text-left text-xs border-collapse">
                    <tbody className="divide-y divide-slate-50 bg-white">
                       {previewRows.map((row, i) => (
                         <tr key={i}>
                            {row.map((cell, j) => (
                              <td key={j} className="p-4 whitespace-nowrap text-slate-600 font-medium border-r border-slate-50 last:border-r-0">{String(cell)}</td>
                            ))}
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>

           <div className="flex justify-center">
             <a 
               href={URL.createObjectURL(resultData.blob)} 
               download={resultData.name}
               className="px-12 py-5 bg-emerald-600 text-white rounded-2xl font-black text-lg shadow-xl hover:scale-105 transition-transform flex items-center gap-3"
             >
               <span>📥</span> Download Processed File
             </a>
           </div>
        </div>
      )}
    />
  );
};

export default DataTools;
