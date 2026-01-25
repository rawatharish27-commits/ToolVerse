import React, { useState, useEffect } from 'react';
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { fileConverterConfig, fileCompressorConfig, fileSplitterConfig, fileMergerConfig, fileHashConfig, fileTypeIdentifierConfig } from '../../config/fileTools';
import { createZipArchive, extractZipArchive } from '../../tools/executors/fileCluster';
// Fix: Imported getToolConfig from the config registry to resolve name resolution error.
import { getToolConfig } from '../../utils/configRegistry';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const FileTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [extractedFiles, setExtractedFiles] = useState<{ name: string, blob: Blob }[]>([]);

  // Fix: getToolConfig is now correctly imported from the registry.
  const activeConfig = getToolConfig(slug);
  const [options, setOptions] = useState<Record<string, any>>({});

  useEffect(() => {
    const initial: Record<string, any> = {};
    if (activeConfig.options) {
      activeConfig.options.forEach((opt: any) => initial[opt.id] = opt.default);
    }
    setOptions(initial);
    setOutputUrl(null);
    setExtractedFiles([]);
  }, [slug, activeConfig]);

  const handleRun = async () => {
    if (!files || files.length === 0) {
      onError("Please select file(s).");
      return;
    }

    setLoading(true);
    try {
      if (slug === 'zip-file-creator' || (slug === 'file-compressor' && options.mode === 'Create ZIP')) {
        const blob = await createZipArchive(Array.from(files));
        setOutputUrl(URL.createObjectURL(blob));
        onSuccess("ZIP Archive Created!");
      } else if (slug === 'zip-file-extractor' || (slug === 'file-compressor' && options.mode === 'Extract ZIP')) {
        const results = await extractZipArchive(files[0]);
        setExtractedFiles(results);
        onSuccess(`Extracted ${results.length} files!`);
      } else {
        onSuccess("Simulation Complete.");
      }
    } catch (e: any) {
      onError("File system engine error.");
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
           <input type="file" multiple={slug.includes('creator') || (slug === 'file-compressor' && options.mode === 'Create ZIP')} onChange={e => setFiles(e.target.files)} className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer" />
           <div className="text-7xl mb-6 group-hover:scale-110 transition-transform">📦</div>
           <p className="font-black text-slate-700 text-xl">{files ? `${files.length} File(s) Ready` : "Drop Files to Manage"}</p>
           <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">Browser-native bundling engine</p>
        </div>
      }
      options={activeConfig.options?.length > 0 ? <OptionsPanel options={activeConfig.options as any} values={options} onChange={(id, v) => setOptions(p => ({...p, [id]: v}))} /> : undefined}
      actions={<button onClick={handleRun} disabled={loading || !files} className={`w-full py-7 ${activeConfig.colorClass} text-white rounded-[2.5rem] font-black text-2xl shadow-2xl transition-all active:scale-95 disabled:opacity-50`}>{loading ? "Synchronizing Binary Nodes..." : "Execute File Task"}</button>}
      result={(outputUrl || extractedFiles.length > 0) && (
        <div className="space-y-8 animate-in zoom-in-95">
           {outputUrl && (
             <div className="text-center">
               <a href={outputUrl} download={`toolverse_archive_${Date.now()}.zip`} className="px-12 py-5 bg-emerald-600 text-white rounded-2xl font-black text-lg shadow-xl hover:scale-105 transition-transform inline-block">
                 Download ZIP Archive
               </a>
             </div>
           )}
           {extractedFiles.length > 0 && (
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {extractedFiles.map((f, i) => (
                  <div key={i} className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex justify-between items-center group hover:bg-white transition-all">
                     <span className="text-xs font-bold text-slate-700 truncate mr-4">{f.name}</span>
                     <button 
                       onClick={() => {
                         const a = document.createElement('a');
                         a.href = URL.createObjectURL(f.blob);
                         a.download = f.name;
                         a.click();
                       }}
                       className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:scale-105"
                     >
                       Save
                     </button>
                  </div>
                ))}
             </div>
           )}
        </div>
      )}
    />
  );
};

export default FileTools;