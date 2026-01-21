import React, { useState, useEffect, useRef } from 'react';
import * as XLSX from 'xlsx';
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { csvViewerConfig, csvToJsonConfig, jsonToCsvConfig, excelViewerConfig, dataCleanerConfig, duplicateRemoverConfig, chartGeneratorConfig } from '../../config/dataTools';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

type ChartPoint = { label: string; value: number };

const DataTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [file, setFile] = useState<File | null>(null);
  const [inputText, setInputText] = useState("");
  const [rows, setRows] = useState<string[][]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ rows: 0, cols: 0, removed: 0 });
  const [jsonOutput, setJsonOutput] = useState("");
  const [csvOutput, setCsvOutput] = useState("");
  
  // Chart State
  const [chartPoints, setChartPoints] = useState<ChartPoint[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Excel Specific State
  const [workbook, setWorkbook] = useState<XLSX.WorkBook | null>(null);
  const [sheetNames, setSheetNames] = useState<string[]>([]);
  const [activeSheet, setActiveSheet] = useState("");

  const [options, setOptions] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    const configs = [csvViewerConfig, csvToJsonConfig, jsonToCsvConfig, excelViewerConfig, dataCleanerConfig, duplicateRemoverConfig, chartGeneratorConfig];
    const target = configs.find(c => c.slug === slug);
    if (target) {
      target.options.forEach(opt => initial[opt.id] = (opt as any).default);
    }
    return initial;
  });

  const handleOptionChange = (id: string, value: any) => {
    setOptions(prev => ({ ...prev, [id]: value }));
  };

  const detectDelimiter = (text: string): string => {
    const delimiters = [",", ";", "\t", "|"];
    let maxCount = 0;
    let selected = ",";

    const firstLine = text.split("\n")[0];
    delimiters.forEach((d) => {
      const count = firstLine.split(d).length;
      if (count > maxCount) {
        maxCount = count;
        selected = d;
      }
    });

    return selected;
  };

  const parseCsvToArrays = (text: string) => {
    const delimiter = options.delimiter === "Auto-Detect" || !options.delimiter 
      ? detectDelimiter(text) 
      : (options.delimiter === "Tab" ? "\t" : options.delimiter);
    
    const lines = text.trim().split(/\r?\n/);
    return lines
      .filter(line => !options.skipEmpty || line.trim().length > 0)
      .map(line => line.split(delimiter));
  };

  const flatten = (obj: any, prefix = "", res: any = {}) => {
    for (const key in obj) {
      const val = obj[key];
      const newKey = prefix ? `${prefix}.${key}` : key;

      if (typeof val === "object" && val !== null && !Array.isArray(val)) {
        flatten(val, newKey, res);
      } else {
        res[newKey] = val;
      }
    }
    return res;
  };

  const loadExcelSheet = (wb: XLSX.WorkBook, sheetName: string) => {
    try {
      const ws = wb.Sheets[sheetName];
      const data: any[][] = XLSX.utils.sheet_to_json(ws, { 
        header: 1, 
        raw: options.renderRaw,
        defval: "" 
      });
      
      if (data.length > 0) {
        setHeaders(data[0].map(h => String(h)));
        const dataRows = data.slice(1).map(r => r.map(c => String(c)));
        setRows(dataRows.slice(0, options.maxRows || 500));
        setStats({ ...stats, rows: dataRows.length, cols: data[0].length });
        setActiveSheet(sheetName);
      }
    } catch (err) {
      onError("Failed to load sheet data.");
    }
  };

  // Chart Rendering Logic
  useEffect(() => {
    if (slug === 'chart-generator' && chartPoints.length > 0) {
      drawChart();
    }
  }, [chartPoints, options.chartType, options.color, options.showValues]);

  const drawChart = () => {
    const canvas = canvasRef.current;
    if (!canvas || chartPoints.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Use device pixel ratio for sharp rendering
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const padding = 60;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    ctx.clearRect(0, 0, width, height);

    const maxVal = Math.max(...chartPoints.map(p => p.value)) * 1.1 || 10;
    const stepX = chartWidth / (chartPoints.length || 1);

    // Draw Axes
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Draw Grid Lines
    ctx.setLineDash([5, 5]);
    for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }
    ctx.setLineDash([]);

    chartPoints.forEach((p, i) => {
      const x = padding + i * stepX + stepX / 2;
      const yVal = (p.value / maxVal) * chartHeight;
      const y = height - padding - yVal;

      if (options.chartType === "Bar") {
        ctx.fillStyle = options.color || "#4f46e5";
        const barWidth = stepX * 0.7;
        // Rounded bar effect
        ctx.beginPath();
        ctx.roundRect(x - barWidth / 2, y, barWidth, yVal, 8);
        ctx.fill();
      } else {
        ctx.fillStyle = options.color || "#4f46e5";
        ctx.strokeStyle = options.color || "#4f46e5";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();

        if (i > 0) {
          const prevX = padding + (i - 1) * stepX + stepX / 2;
          const prevY = height - padding - (chartPoints[i - 1].value / maxVal) * chartHeight;
          ctx.beginPath();
          ctx.moveTo(prevX, prevY);
          ctx.lineTo(x, y);
          ctx.stroke();
        }
      }

      // Draw Labels
      ctx.fillStyle = "#64748b";
      ctx.font = "bold 10px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(p.label, x, height - padding + 20);

      if (options.showValues) {
        ctx.fillStyle = "#1e293b";
        ctx.fillText(p.value.toString(), x, y - 10);
      }
    });
  };

  const processData = async () => {
    setLoading(true);
    let dataToProcess = inputText;

    if (file) {
      if (slug === 'excel-viewer' || file.name.match(/\.(xlsx|xls|csv)$/i)) {
        const reader = new FileReader();
        const buffer: ArrayBuffer = await new Promise((resolve) => {
          reader.onload = () => resolve(reader.result as ArrayBuffer);
          reader.readAsArrayBuffer(file);
        });

        try {
          const wb = XLSX.read(buffer, { type: 'buffer' });
          if (slug === 'excel-viewer') {
            setWorkbook(wb);
            setSheetNames(wb.SheetNames);
            loadExcelSheet(wb, wb.SheetNames[0]);
            onSuccess("Excel Workbook Loaded!");
            setLoading(false);
            return;
          } else {
            const firstSheet = wb.Sheets[wb.SheetNames[0]];
            dataToProcess = XLSX.utils.sheet_to_csv(firstSheet);
          }
        } catch (e) {
          onError("Failed to read spreadsheet file.");
          setLoading(false);
          return;
        }
      } else {
        const reader = new FileReader();
        const text: string = await new Promise((resolve) => {
          reader.onload = () => resolve(String(reader.result || ""));
          reader.readAsText(file);
        });
        dataToProcess = text;
      }
    }

    if (!dataToProcess.trim()) {
      onError("No data to process. Please upload a file or paste text.");
      setLoading(false);
      return;
    }

    setTimeout(() => {
      try {
        if (slug === 'csv-viewer' || slug === 'csv-to-json') {
          const parsed = parseCsvToArrays(dataToProcess);

          if (slug === 'csv-viewer') {
            if (parsed.length > 0) {
              setHeaders(parsed[0]);
              const dataRows = parsed.slice(1);
              setRows(dataRows.slice(0, options.pageSize || 100));
              setStats({ ...stats, rows: dataRows.length, cols: parsed[0].length });
              onSuccess("CSV Parsed Successfully");
            }
          } else if (slug === 'csv-to-json') {
            if (parsed.length < 2) throw new Error("CSV must have at least a header row and one data row.");
            
            const heads = parsed[0].map(h => h.trim());
            const jsonArr = parsed.slice(1).map(row => {
              const obj: Record<string, any> = {};
              heads.forEach((h, i) => {
                const val = row[i]?.trim() ?? "";
                if (!isNaN(val as any) && val !== "") obj[h] = Number(val);
                else if (val.toLowerCase() === "true") obj[h] = true;
                else if (val.toLowerCase() === "false") obj[h] = false;
                else obj[h] = val;
              });
              return obj;
            });

            const output = options.prettyPrint 
              ? JSON.stringify(jsonArr, null, 2) 
              : JSON.stringify(jsonArr);
            
            setJsonOutput(output);
            setStats({ ...stats, rows: jsonArr.length, cols: heads.length });
            onSuccess("Converted to JSON!");
          }
        } else if (slug === 'json-to-csv') {
          const parsed = JSON.parse(dataToProcess);
          if (!Array.isArray(parsed)) throw new Error("JSON input must be an array of objects.");
          
          const flatData = options.flatten ? parsed.map(item => flatten(item)) : parsed;
          const allKeys = new Set<string>();
          flatData.forEach((item: any) => Object.keys(item).forEach(k => allKeys.add(k)));
          
          const heads = Array.from(allKeys);
          const delimiter = options.delimiter === "Tab" ? "\t" : options.delimiter || ",";
          
          const csvRows = flatData.map((item: any) => {
            return heads.map(h => {
              const val = item[h] ?? "";
              const str = String(val).replace(/"/g, '""');
              return str.includes(delimiter) || str.includes('"') || str.includes('\n') ? `"${str}"` : str;
            }).join(delimiter);
          });

          const finalCsv = [heads.join(delimiter), ...csvRows].join("\n");
          setCsvOutput(finalCsv);
          setStats({ ...stats, rows: parsed.length, cols: heads.length });
          onSuccess("Converted to CSV!");
        } else if (slug === 'data-cleaner') {
          let rowsArr = dataToProcess.split(/\r?\n/);
          if (options.trim) rowsArr = rowsArr.map(r => r.trim());
          if (options.lowercase) rowsArr = rowsArr.map(r => r.toLowerCase());
          if (options.removeEmpty) rowsArr = rowsArr.filter(r => r.length > 0);
          if (options.removeDuplicate) rowsArr = Array.from(new Set(rowsArr));
          
          const result = rowsArr.join('\n');
          setCsvOutput(result);
          setStats({ ...stats, rows: rowsArr.length, cols: 0 });
          onSuccess("Data Cleaned Successfully!");
        } else if (slug === 'duplicate-remover') {
          let rowsArr = dataToProcess.split(/\r?\n/).filter(line => line.trim().length > 0);
          const seen = new Set<string>();
          const resultArr: string[] = [];
          let removedCount = 0;
          const delimiter = options.delimiter === "Tab" ? "\t" : options.delimiter;
          const caseSens = options.caseSensitive;

          rowsArr.forEach((line) => {
            let key = line;
            if (options.mode === "By Column") {
              const cols = line.split(delimiter);
              key = cols[options.colIndex] || line;
            }
            const compareKey = caseSens ? key : key.toLowerCase();
            if (!seen.has(compareKey)) {
              seen.add(compareKey);
              resultArr.push(line);
            } else {
              removedCount++;
            }
          });

          setCsvOutput(resultArr.join('\n'));
          setStats({ ...stats, rows: resultArr.length, removed: removedCount, cols: 0 });
          onSuccess(`Removed ${removedCount} duplicates.`);
        } else if (slug === 'chart-generator') {
          const rowsArr = dataToProcess.split(/\r?\n/).map(r => r.trim()).filter(Boolean);
          const points: ChartPoint[] = rowsArr.map(r => {
            const [label, value] = r.split(/[,;\t|]/);
            return { label: label?.trim() || "N/A", value: parseFloat(value) || 0 };
          }).filter(p => !isNaN(p.value));

          if (points.length === 0) throw new Error("No valid label,value pairs found.");
          setChartPoints(points);
          setStats({ ...stats, rows: points.length, cols: 2 });
          onSuccess("Chart Generated!");
        }
      } catch (err: any) {
        onError(err.message || "Failed to process data.");
      } finally {
        setLoading(false);
      }
    }, 200);
  };

  const copyResult = () => {
    const content = slug === 'csv-to-json' ? jsonOutput : (['json-to-csv', 'data-cleaner', 'duplicate-remover'].includes(slug)) ? csvOutput : [headers, ...rows].map(r => r.join(",")).join("\n");
    navigator.clipboard.writeText(content);
    onSuccess("Copied to clipboard!");
  };

  const downloadResult = () => {
    if (slug === 'chart-generator') {
      const canvas = canvasRef.current;
      if (canvas) {
        const link = document.createElement("a");
        link.download = "toolverse_chart.png";
        link.href = canvas.toDataURL("image/png", 1.0);
        link.click();
        onSuccess("Chart Downloaded!");
      }
      return;
    }

    const isJson = slug === 'csv-to-json';
    const isCsv = ['json-to-csv', 'csv-viewer', 'excel-viewer', 'data-cleaner', 'duplicate-remover'].includes(slug);
    const content = isJson ? jsonOutput : isCsv ? (['json-to-csv', 'data-cleaner', 'duplicate-remover'].includes(slug) ? csvOutput : [headers, ...rows].map(r => r.join(",")).join("\n")) : "";
    const blob = new Blob([content], { type: isJson ? 'application/json' : 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = isJson ? "data.json" : (slug === 'excel-viewer' ? `${activeSheet}.csv` : "data.csv");
    a.click();
    URL.revokeObjectURL(url);
  };

  const configMap: Record<string, any> = {
    'csv-viewer': csvViewerConfig,
    'csv-to-json': csvToJsonConfig,
    'json-to-csv': jsonToCsvConfig,
    'excel-viewer': excelViewerConfig,
    'data-cleaner': dataCleanerConfig,
    'duplicate-remover': duplicateRemoverConfig,
    'chart-generator': chartGeneratorConfig
  };
  const currentConfig = configMap[slug] || csvViewerConfig;

  const inputSlot = (
    <div className="space-y-6">
      {slug !== 'excel-viewer' && !file && (
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={slug === 'json-to-csv' ? "Paste JSON array here..." : slug === 'chart-generator' ? "Paste label,value per line (e.g. Jan,100)..." : "Paste CSV or text content here..."}
          className="w-full h-48 p-6 bg-slate-50 border border-slate-200 rounded-3xl focus:ring-8 focus:ring-indigo-500/5 outline-none font-mono text-sm text-slate-700 shadow-inner resize-none"
        />
      )}
      
      {(!inputText || slug === 'excel-viewer') && (
        <div className="p-10 md:p-16 border-4 border-dashed border-slate-100 rounded-[3rem] text-center hover:border-cyan-100 transition-all cursor-pointer group relative">
          <input 
            type="file" 
            accept={slug === 'json-to-csv' ? ".json,.txt" : slug === 'excel-viewer' ? ".xlsx,.xls,.csv" : ".csv,.txt"} 
            onChange={(e) => {
              const f = e.target.files?.[0] || null;
              setFile(f);
              if(f) onSuccess("File Ready");
            }} 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
          />
          <div className="text-7xl mb-6 group-hover:scale-110 transition-transform">
            {slug === 'json-to-json' ? '📜' : slug === 'excel-viewer' ? '📗' : slug === 'chart-generator' ? '📈' : '📄'}
          </div>
          <p className="text-slate-900 font-black text-xl">
            {file ? file.name : `Drop Data File Here`}
          </p>
          <p className="text-slate-400 text-xs font-bold mt-2 uppercase tracking-widest">
            {slug === 'excel-viewer' ? "Supports .xlsx and .xls" : "Supports .csv, .json, and .txt"}
          </p>
        </div>
      )}

      {(file || inputText) && (
        <div className="flex justify-center">
           <button 
            onClick={() => { setFile(null); setInputText(""); setRows([]); setJsonOutput(""); setCsvOutput(""); setWorkbook(null); setSheetNames([]); setStats({ rows:0, cols:0, removed:0 }); setChartPoints([]); }}
            className="text-[10px] font-black text-rose-500 uppercase tracking-widest hover:underline"
           >
             Reset Tool
           </button>
        </div>
      )}
    </div>
  );

  const resultSlot = (jsonOutput || csvOutput || headers.length > 0 || chartPoints.length > 0) && (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-4">
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-wrap gap-8 justify-center">
         <div className="text-center">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Data Items</div>
            <div className="text-2xl font-black text-cyan-600">{stats.rows.toLocaleString()}</div>
         </div>
         {stats.cols > 0 && (
           <div className="text-center">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Columns</div>
              <div className="text-2xl font-black text-cyan-600">{stats.cols}</div>
           </div>
         )}
         {slug === 'duplicate-remover' && stats.removed > 0 && (
           <div className="text-center">
              <div className="text-[10px] font-black text-rose-400 uppercase tracking-widest">Removed</div>
              <div className="text-2xl font-black text-rose-600">{stats.removed.toLocaleString()}</div>
           </div>
         )}
      </div>

      {slug === 'chart-generator' ? (
        <div className="bg-white rounded-[3rem] p-4 md:p-8 border border-slate-100 shadow-xl overflow-hidden flex justify-center">
          <canvas 
            ref={canvasRef} 
            className="w-full h-auto max-w-3xl aspect-[16/10] bg-slate-50/50 rounded-2xl"
          />
        </div>
      ) : (slug === 'csv-to-json' || slug === 'json-to-csv' || slug === 'data-cleaner' || slug === 'duplicate-remover') ? (
        <div className="bg-slate-950 rounded-[2.5rem] p-8 font-mono text-xs border border-slate-800 text-emerald-400 relative group">
          <pre className="overflow-x-auto max-h-[500px] leading-relaxed scrollbar-thin scrollbar-thumb-slate-800">
            {slug === 'csv-to-json' ? jsonOutput : csvOutput}
          </pre>
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm">
          <div className="overflow-x-auto max-h-[500px]">
              <table className="w-full text-left text-sm border-collapse">
                <thead className="sticky top-0 z-10">
                    <tr className="bg-slate-900 text-white">
                      {headers.map((h, i) => (
                        <th key={i} className="px-6 py-4 font-black uppercase tracking-widest text-[10px] border-r border-slate-800 last:border-0">{h}</th>
                      ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {rows.map((row, i) => (
                      <tr key={i} className="hover:bg-cyan-50/30 transition-colors">
                        {row.map((cell, j) => (
                          <td key={j} className="px-6 py-3 text-slate-600 border-r border-slate-50 last:border-0 truncate max-w-[200px]">{cell}</td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </table>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
         {slug !== 'chart-generator' && (
           <button onClick={copyResult} className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl">
             Copy Result
           </button>
         )}
         <button onClick={downloadResult} className={`px-10 py-4 ${currentConfig.colorClass} text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-xl`}>
           {slug === 'chart-generator' ? 'Download Chart (PNG)' : 'Download Result'}
         </button>
      </div>
    </div>
  );

  return (
    <ToolLayout
      title={currentConfig.title}
      description={currentConfig.description}
      icon={currentConfig.icon}
      colorClass={currentConfig.colorClass}
      input={inputSlot}
      options={<OptionsPanel options={currentConfig.options as any} values={options} onChange={handleOptionChange} />}
      actions={
        <button 
          onClick={processData} 
          disabled={loading || (!file && !inputText)}
          className={`w-full py-6 ${currentConfig.colorClass} text-white rounded-[2rem] font-black text-xl shadow-2xl transition-all active:scale-95 disabled:opacity-50`}
        >
          {loading ? "Processing..." : 
           slug === 'csv-to-json' ? "Convert to JSON" : 
           slug === 'json-to-csv' ? "Convert to CSV" : 
           slug === 'excel-viewer' ? "Load Workbook" : 
           slug === 'data-cleaner' ? "Clean Data" : 
           slug === 'duplicate-remover' ? "Deduplicate Data" :
           slug === 'chart-generator' ? "Generate Visualization" :
           "Process Data"}
        </button>
      }
      result={resultSlot}
    />
  );
};

export default DataTools;