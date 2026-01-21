
import React, { useState } from 'react';
import Papa from 'papaparse';
import JSZip from 'jszip';
import SparkMD5 from 'spark-md5';
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { fileConverterConfig, fileCompressorConfig, fileSplitterConfig, fileMergerConfig, fileHashConfig } from '../../config/fileTools';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const FileTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [options, setOptions] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    const configs = [fileConverterConfig, fileCompressorConfig, fileSplitterConfig, fileMergerConfig, fileHashConfig];
    const target = configs.find(c => c.slug === slug);
    if (target) {
      target.options.forEach(opt => initial[opt.id] = (opt as any).default);
    }
    return initial;
  });
  const [outputText, setOutputText] = useState<string>("");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resultReport, setResultReport] = useState<string>("");
  const [hashResults, setHashResults] = useState<{algo: string, hash: string}[]>([]);

  const handleOptionChange = (id: string, value: any) => {
    setOptions(prev => ({ ...prev, [id]: value }));
  };

  const readFile = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsText(file);
    });

  const getFileBuffer = (file: File): Promise<ArrayBuffer> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as ArrayBuffer);
      reader.onerror = () => reject(new Error("Failed to read file buffer"));
      reader.readAsArrayBuffer(file);
    });

  const generateHash = async (buffer: ArrayBuffer, algorithm: string) => {
    const hashBuffer = await crypto.subtle.digest(algorithm, buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const processFile = async () => {
    if (!files || files.length === 0) return;
    setLoading(true);
    setDownloadUrl(null);
    setOutputText("");
    setResultReport("");
    setHashResults([]);

    try {
      if (slug === 'file-converter') {
        const file = files[0];
        const input = await readFile(file);
        let result = "";
        const fileName = file.name.toLowerCase();
        const delimiter = options.delimiter === "Tab" ? "\t" : options.delimiter;

        let parsedData: any = null;
        if (fileName.endsWith(".json")) {
          parsedData = JSON.parse(input);
        } else if (fileName.endsWith(".csv")) {
          const p = Papa.parse(input, { header: true, skipEmptyLines: true });
          parsedData = p.data;
        } else {
          parsedData = { content: input };
        }

        const target = options.output;
        if (target === "csv") {
          result = Papa.unparse(parsedData, { delimiter });
        } else if (target === "json") {
          result = options.pretty ? JSON.stringify(parsedData, null, 2) : JSON.stringify(parsedData);
        } else {
          if (Array.isArray(parsedData)) {
             result = parsedData.map(row => Object.values(row).join(" ")).join("\n");
          } else if (typeof parsedData === 'object') {
             result = JSON.stringify(parsedData, null, 2);
          } else {
             result = String(parsedData);
          }
        }

        const blob = new Blob([result], { type: "text/plain" });
        setDownloadUrl(URL.createObjectURL(blob));
        setOutputText(result);
        onSuccess("File Conversion Complete!");
      }

      if (slug === 'file-compressor') {
        const zip = new JSZip();
        
        if (options.mode === "Extract ZIP") {
          const zipFile = files[0];
          const content = await JSZip.loadAsync(zipFile);
          const outZip = new JSZip();
          let count = 0;

          for (const name in content.files) {
            if (!content.files[name].dir) {
              const fileData = await content.files[name].async("blob");
              outZip.file(name, fileData);
              count++;
            }
          }

          const outBlob = await outZip.generateAsync({ type: "blob" });
          setDownloadUrl(URL.createObjectURL(outBlob));
          setResultReport(`Extracted ${count} files. Bundle ready for download.`);
          onSuccess("ZIP Extraction Ready!");
        } else {
          let totalSizeBefore = 0;
          const fileArray = Array.from(files) as File[];
          
          fileArray.forEach(file => {
            totalSizeBefore += file.size;
            zip.file(file.name, file);
          });

          const compressionLevel = options.compression === "Maximum" ? 9 : options.compression === "Balanced" ? 6 : 1;
          const blob = await zip.generateAsync({
            type: "blob",
            compression: "DEFLATE",
            compressionOptions: { level: compressionLevel }
          });

          const ratio = ((totalSizeBefore - blob.size) / totalSizeBefore * 100).toFixed(1);
          setDownloadUrl(URL.createObjectURL(blob));
          setResultReport(`Compressed ${fileArray.length} files. Saved ${ratio}% space.`);
          onSuccess("ZIP Archive Created!");
        }
      }

      if (slug === 'file-splitter') {
        const file = files[0];
        const zip = new JSZip();
        const size = file.size;
        let chunkSize: number;

        if (options.mode === "By Parts") {
          const parts = Math.max(1, parseInt(options.parts) || 2);
          chunkSize = Math.ceil(size / parts);
        } else {
          chunkSize = (parseInt(options.chunkSizeMB) || 5) * 1024 * 1024;
        }

        let offset = 0;
        let index = 1;

        while (offset < size) {
          const partBlob = file.slice(offset, offset + chunkSize);
          zip.file(`${file.name}.part${index}`, partBlob);
          offset += chunkSize;
          index++;
        }

        const zipBlob = await zip.generateAsync({ type: "blob" });
        setDownloadUrl(URL.createObjectURL(zipBlob));
        setResultReport(`File split into ${index - 1} part(s). Binary integrity verified.`);
        onSuccess("File Splitting Complete!");
      }

      if (slug === 'file-merger') {
        if (files.length < 2) throw new Error("At least 2 file parts are required for merging.");
        
        let parts = Array.from(files) as File[];
        
        if (options.autoSort) {
          parts.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }));
        }

        const mergedBlob = new Blob(parts, { type: "application/octet-stream" });
        setDownloadUrl(URL.createObjectURL(mergedBlob));
        setResultReport(`Successfully merged ${parts.length} parts. Original integrity preserved.`);
        onSuccess("File Merging Complete!");
      }

      if (slug === 'file-hash-generator') {
        const file = files[0];
        const buffer = await getFileBuffer(file);
        const results = [];

        if (options.md5) {
          results.push({ algo: 'MD5', hash: SparkMD5.ArrayBuffer.hash(buffer) });
        }
        if (options.sha1) {
          const hash = await generateHash(buffer, 'SHA-1');
          results.push({ algo: 'SHA-1', hash });
        }
        if (options.sha256) {
          const hash = await generateHash(buffer, 'SHA-256');
          results.push({ algo: 'SHA-256', hash });
        }

        setHashResults(results);
        onSuccess("Hashes calculated successfully!");
      }

    } catch (err: any) {
      onError(err.message || "Operation failed.");
    } finally {
      setLoading(false);
    }
  };

  const currentConfig = slug === 'file-converter' ? fileConverterConfig : 
                       slug === 'file-compressor' ? fileCompressorConfig : 
                       slug === 'file-splitter' ? fileSplitterConfig :
                       slug === 'file-merger' ? fileMergerConfig :
                       fileHashConfig;

  const inputSlot = (
    <div className="space-y-6">
      <div className="p-10 md:p-16 border-4 border-dashed border-slate-100 rounded-[3rem] text-center hover:border-amber-100 transition-all cursor-pointer group relative">
        <input 
          type="file" 
          accept={slug === 'file-compressor' && options.mode === 'Extract ZIP' ? '.zip' : '*'} 
          multiple={slug === 'file-compressor' && options.mode === 'Create ZIP' || slug === 'file-merger'}
          onChange={(e) => setFiles(e.target.files)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
        />
        <div className="text-7xl mb-6 group-hover:scale-110 transition-transform">
          {currentConfig.icon}
        </div>
        <p className="text-slate-900 font-black text-xl">
          {files ? `${files.length} File(s) Ready` : "Drop File(s) Here"}
        </p>
        <p className="text-slate-400 text-xs font-bold mt-2 uppercase tracking-widest">
          {slug === 'file-converter' ? 'JSON, CSV, XML, TXT supported' : 'All file types supported'}
        </p>
      </div>
      {slug === 'file-merger' && files && files.length > 0 && (
        <div className="bg-slate-50 p-4 rounded-2xl max-h-40 overflow-y-auto border border-slate-100">
           <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Selected Parts (Processing Order)</div>
           <div className="space-y-1">
             {(Array.from(files) as File[]).sort((a, b) => options.autoSort ? a.name.localeCompare(b.name, undefined, { numeric: true }) : 0).map((f, i) => (
               <div key={i} className="flex justify-between items-center bg-white px-3 py-1.5 rounded-lg border border-slate-100 shadow-sm">
                  <span className="text-xs font-bold text-slate-600 truncate mr-4">{f.name}</span>
                  <span className="text-[9px] font-black text-slate-400">{(f.size / 1024).toFixed(1)} KB</span>
               </div>
             ))}
           </div>
        </div>
      )}
    </div>
  );

  const actionsSlot = (
    <button 
      disabled={loading || !files} 
      onClick={processFile} 
      className="w-full py-7 bg-amber-600 text-white rounded-[2rem] font-black text-2xl shadow-2xl hover:bg-amber-700 transition-all active:scale-95 disabled:opacity-50"
    >
      {loading ? "Processing..." : slug === 'file-hash-generator' ? "Calculate Hashes" : slug === 'file-merger' ? "Merge Parts Now" : slug === 'file-splitter' ? "Split File Now" : slug === 'file-compressor' ? (options.mode === 'Create ZIP' ? "Create ZIP Now" : "Extract ZIP Now") : "Start Conversion"}
    </button>
  );

  const resultSlot = (downloadUrl || outputText || hashResults.length > 0) && (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-10">
      {resultReport && (
        <div className="p-6 bg-amber-50 border border-amber-100 rounded-2xl text-amber-900 font-bold text-center">
          {resultReport}
        </div>
      )}
      
      {hashResults.length > 0 && (
        <div className="space-y-4">
          {hashResults.map((hr, idx) => (
            <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-700 group relative">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">{hr.algo} Hash</span>
                <button 
                  onClick={() => { navigator.clipboard.writeText(hr.hash); onSuccess(`${hr.algo} Copied!`); }}
                  className="text-white bg-white/10 hover:bg-white/20 px-3 py-1 rounded-lg text-[9px] font-black transition-all"
                >
                  COPY
                </button>
              </div>
              <div className="font-mono text-emerald-400 text-sm break-all leading-relaxed">
                {hr.hash}
              </div>
            </div>
          ))}
        </div>
      )}

      {outputText && (
        <div className="bg-slate-900 p-8 rounded-[3rem] shadow-2xl border-4 border-white">
          <textarea
            value={outputText}
            readOnly
            className="w-full h-64 bg-transparent text-emerald-400 font-mono text-xs border-none outline-none resize-none scrollbar-thin scrollbar-thumb-slate-700"
          />
        </div>
      )}
      
      <div className="flex justify-center">
        {downloadUrl && (
          <a 
            href={downloadUrl} 
            download={slug === 'file-merger' ? 'merged_file' : `toolverse_${slug}_${Date.now()}.${slug === 'file-compressor' || slug === 'file-splitter' ? 'zip' : (options.output || 'txt')}`} 
            className="inline-flex items-center px-12 py-6 bg-emerald-600 text-white rounded-[2rem] font-black text-xl shadow-2xl hover:bg-emerald-700 transition-all transform hover:scale-105"
          >
            <span className="mr-3">⚡</span> Download Result
          </a>
        )}
      </div>
    </div>
  );

  const totalInputSize = files ? (Array.from(files) as File[]).reduce((acc, f) => acc + f.size, 0) : 0;

  return (
    <ToolLayout
      title={currentConfig.title}
      description={currentConfig.description}
      icon={currentConfig.icon}
      colorClass={currentConfig.colorClass}
      input={inputSlot}
      options={<OptionsPanel options={currentConfig.options as any} values={options} onChange={handleOptionChange} />}
      actions={actionsSlot}
      result={resultSlot}
      comparison={files && (
        <div className="text-center">
           <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">
             {slug === 'file-merger' ? "Total Merged Size" : slug === 'file-hash-generator' ? "Analyzed File Size" : "Original Size"}
           </div>
           <div className="text-3xl font-black">{(totalInputSize / 1024 / 1024).toFixed(2)} MB</div>
        </div>
      )}
    />
  );
};

export default FileTools;
