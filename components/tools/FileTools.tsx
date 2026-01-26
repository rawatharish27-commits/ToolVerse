
import React, { useState, useEffect, useMemo } from 'react';
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { TOOLS } from '../../data/tools';
import { zipCreatorConfig, zipExtractorConfig, fileFormatConverterConfig } from '../../config/fileTools';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const FileTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [resultFiles, setResultFiles] = useState<{ name: string, blob: Blob }[]>([]);
  const [zipBlob, setZipBlob] = useState<Blob | null>(null);

  const toolNode = useMemo(() => TOOLS.find(t => t.slug === slug), [slug]);
  const activeConfig = useMemo(() => [
    zipCreatorConfig, zipExtractorConfig, fileFormatConverterConfig
  ].find(c => c.slug === slug) || zipCreatorConfig, [slug]);

  useEffect(() => {
    setFiles(null);
    setResultFiles([]);
    setZipBlob(null);
  }, [slug]);

  const handleRun = async () => {
    if (!toolNode?.execute) { onError("File logic node not resolved."); return; }
    if (!files) { onError("File selection required."); return; }

    setLoading(true);
    try {
      const result = await toolNode.execute(slug === 'zip-file-extractor' ? files[0] : files);
      if (Array.isArray(result)) {
        setResultFiles(result);
      } else {
        setZipBlob(result);
      }
      onSuccess("Binary Task Resolved!");
    } catch (err: any) {
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
        <div className="p-16 border-4 border-dashed border-slate-100 rounded-[3rem] text-center hover:border-amber-100 transition-all cursor-pointer relative group">
           <input 
            type="file" 
            multiple={slug === 'zip-file-creator'} 
            onChange={e => setFiles(e.target.files)} 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
           />
           <div className="text-7xl mb-6 group-hover:scale-110 transition-transform">📦</div>
           <p className="font-black text-slate-700 text-xl">{files ? `${files.length} File(s) Staged` : "Staging Area"}</p>
           <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">Supports all binary formats</p>
        </div>
      }
      actions={<button onClick={handleRun} disabled={loading || !files} className={`w-full py-7 ${activeConfig.colorClass} text-white rounded-[2.5rem] font-black text-2xl shadow-2xl transition-all active:scale-95 disabled:opacity-50`}>{loading ? "Synchronizing Archive..." : "Execute Logic"}</button>}
      result={(zipBlob || resultFiles.length > 0) && (
        <div className="space-y-6 animate-in zoom-in-95">
           {zipBlob && (
             <div className="text-center">
                <a 
                  href={URL.createObjectURL(zipBlob)} 
                  download="toolverse_archive.zip"
                  className="px-12 py-5 bg-emerald-600 text-white rounded-2xl font-black shadow-xl inline-block"
                >
                  Download ZIP Archive
                </a>
             </div>
           )}
           {resultFiles.length > 0 && (
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {resultFiles.map((f, i) => (
                  <div key={i} className="bg-slate-50 p-4 rounded-xl flex justify-between items-center group">
                     <span className="text-xs font-bold text-slate-600 truncate mr-4">{f.name}</span>
                     <button 
                      onClick={() => {
                        const url = URL.createObjectURL(f.blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = f.name;
                        a.click();
                      }}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-[9px] font-black uppercase"
                     >Save</button>
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
