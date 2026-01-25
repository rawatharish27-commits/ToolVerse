import React, { useState, useEffect, useRef } from 'react';
import * as XLSX from 'xlsx';
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { getToolConfig } from '../../utils/configRegistry';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const DataTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [file, setFile] = useState<File | null>(null);
  const [inputText, setInputText] = useState("");
  const [rows, setRows] = useState<string[][]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ rows: 0, cols: 0 });
  const [excelBuffer, setExcelBuffer] = useState<ArrayBuffer | null>(null);

  const activeConfig = getToolConfig(slug);
  const [options, setOptions] = useState<Record<string, any>>({});

  useEffect(() => {
    const initial: Record<string, any> = {};
    if (activeConfig.options) {
      activeConfig.options.forEach((opt: any) => initial[opt.id] = opt.default);
    }
    setOptions(initial);
    setRows([]);
    setExcelBuffer(null);
  }, [slug, activeConfig]);

  const processData = async () => {
    setLoading(true);
    try {
      if (slug === 'csv-to-excel-converter') {
        const text = file ? await file.text() : inputText;
        if (!text) throw new Error("No data found.");
        
        const lines = text.trim().split(/\r?\n/).map(l => l.split(','));
        const worksheet = XLSX.utils.aoa_to_sheet(lines);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, options.sheetName || "Sheet1");
        
        const buffer = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });
        setExcelBuffer(buffer);
        setStats({ rows: lines.length, cols: lines[0]?.length || 0 });
        onSuccess("Excel conversion ready!");
      } else {
        // Generic cleaning / dedup logic
        const text = file ? await file.text() : inputText;
        const lines = text.trim().split(/\r?\n/);
        let result = Array.from(new Set(lines)); // Simplistic Dedup
        setRows(result.map(l => [l]));
        setStats({ rows: result.length, cols: 1 });
        onSuccess("Data processed successfully.");
      }
    } catch (err: any) {
      onError(err.message || "Logic failure.");
    } finally {
      setLoading(false);
    }
  };

  const downloadExcel = () => {
    if (!excelBuffer) return;
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `toolverse_export_${Date.now()}.xlsx`;
    a.click();
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
              <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">📄</div>
              <p className="font-black text-slate-700">{file ? file.name : "Click to Upload Data File"}</p>
           </div>
           {!file && <textarea value={inputText} onChange={e => setInputText(e.target.value)} placeholder="Or paste CSV/Data content here..." className="w-full h-40 p-6 bg-slate-50 border border-slate-200 rounded-3xl outline-none font-mono text-sm" />}
        </div>
      }
      options={<OptionsPanel options={activeConfig.options as any} values={options} onChange={(id, val) => setOptions(p => ({...p, [id]: val}))} />}
      actions={
        <button onClick={processData} disabled={loading} className={`w-full py-6 ${activeConfig.colorClass} text-white rounded-[2rem] font-black text-xl shadow-2xl`}>
          {loading ? "Crunching Data..." : "Execute Operation"}
        </button>
      }
      result={(stats.rows > 0 || excelBuffer) && (
        <div className="space-y-6">
           <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Process Statistics</div>
              <div className="text-2xl font-black text-cyan-600">{stats.rows} Records Analyzed</div>
           </div>
           {excelBuffer && (
             <button onClick={downloadExcel} className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black text-lg shadow-xl hover:bg-emerald-700 transition-all">
               Download .XLSX Workbook
             </button>
           )}
        </div>
      )}
    />
  );
};

export default DataTools;