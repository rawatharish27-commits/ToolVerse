import React, { useState, useEffect } from 'react';
import JSZip from 'jszip';
import SparkMD5 from 'spark-md5';
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { fileConverterConfig, fileCompressorConfig, fileSplitterConfig, fileMergerConfig, fileHashConfig, fileTypeIdentifierConfig } from '../../config/fileTools';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const FileTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [resultReport, setResultReport] = useState<string>("");

  const activeConfig = [fileConverterConfig, fileCompressorConfig, fileSplitterConfig, fileMergerConfig, fileHashConfig, fileTypeIdentifierConfig].find(c => c.slug === slug) || fileHashConfig;
  const [options, setOptions] = useState<Record<string, any>>({});

  useEffect(() => {
    const initial: Record<string, any> = {};
    activeConfig.options.forEach((opt: any) => initial[opt.id] = opt.default);
    setOptions(initial);
    setResultReport("");
  }, [slug, activeConfig]);

  const identifyFileType = async (file: File) => {
    const buffer = await file.slice(0, 8).arrayBuffer();
    const bytes = new Uint8Array(buffer);
    const hex = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
    
    let type = "Unknown Binary Data";
    if (hex.startsWith("89504E47")) type = "PNG Image File";
    else if (hex.startsWith("FFD8FF")) type = "JPEG Image File";
    else if (hex.startsWith("25504446")) type = "PDF Document";
    else if (hex.startsWith("504B0304")) type = "ZIP/Office Document Archive";
    else if (hex.startsWith("47494638")) type = "GIF Image";
    else if (hex.startsWith("494433")) type = "MP3 Audio File";
    
    setResultReport(`Binary Audit for [${file.name}]:\n\nSignature: 0x${hex}\nDetected Format: ${type}`);
    onSuccess("Identity Verified!");
  };

  const handleRun = async () => {
    if (!files || files.length === 0) return;
    setLoading(true);
    try {
      if (slug === 'file-type-identifier') await identifyFileType(files[0]);
      // ... keep existing Zip/Hash logic
    } catch (e) {
      onError("Operation failed.");
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
        <div className="p-16 border-4 border-dashed border-slate-100 rounded-[3rem] text-center hover:border-amber-100 cursor-pointer relative group">
           <input type="file" onChange={e => setFiles(e.target.files)} className="absolute inset-0 w-full h-full opacity-0 z-10" />
           <div className="text-7xl mb-6">📁</div>
           <p className="font-black text-slate-700">{files ? `${files.length} File(s) Ready` : "Click to Upload Target File"}</p>
        </div>
      }
      options={<OptionsPanel options={activeConfig.options as any} values={options} onChange={(id, v) => setOptions(p => ({...p, [id]: v}))} />}
      actions={<button onClick={handleRun} disabled={loading || !files} className="w-full py-7 bg-amber-600 text-white rounded-[2.5rem] font-black text-2xl shadow-2xl">Execute Binary Analysis</button>}
      result={resultReport && <div className="p-10 bg-slate-900 rounded-[3rem] text-emerald-400 font-mono text-sm shadow-2xl whitespace-pre-wrap">{resultReport}</div>}
    />
  );
};

export default FileTools;