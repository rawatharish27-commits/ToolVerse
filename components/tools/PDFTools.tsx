
import React, { useState, useMemo, useEffect } from 'react';
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { TOOLS } from '../../data/tools';
import { 
  pdfCompressorConfig, pdfSplitterConfig, pdfMergerConfig, 
  pdfProtectConfig, pdfUnlockConfig, pdfMetadataConfig, pdfToJpgConfig, 
  jpgToPdfConfig, pdfWatermarkConfig
} from '../../config/pdfTools';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const PDFTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [files, setFiles] = useState<FileList | null>(null);
  const [progress, setProgress] = useState(0);

  const toolNode = useMemo(() => TOOLS.find(t => t.slug === slug), [slug]);
  const activeConfig = useMemo(() => [
    pdfCompressorConfig, pdfSplitterConfig, pdfMergerConfig, pdfToJpgConfig, 
    jpgToPdfConfig, pdfWatermarkConfig, pdfProtectConfig, pdfUnlockConfig, pdfMetadataConfig
  ].find(c => c.slug === slug) || pdfCompressorConfig, [slug]);

  const [options, setOptions] = useState<Record<string, any>>({});

  useEffect(() => {
    const initial: Record<string, any> = {};
    activeConfig.options.forEach((opt: any) => initial[opt.id] = (opt as any).default);
    setOptions(initial);
    setOutputUrl(null);
  }, [slug, activeConfig]);

  const handleRun = async () => {
    if (!toolNode?.execute) { onError("Execution logic missing."); return; }
    if (!files) { onError("Files required."); return; }

    setLoading(true);
    try {
      const result = await toolNode.execute(files[0], options);
      if (result instanceof Blob) {
        setOutputUrl(URL.createObjectURL(result));
        onSuccess("PDF Task Complete");
      }
    } catch (err: any) {
      onError(err.message || "Binary Engine Error.");
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
        <div className="p-10 border-4 border-dashed border-slate-100 rounded-[3rem] text-center hover:border-red-100 cursor-pointer relative group">
           <input type="file" multiple={slug.includes('merger')} accept="application/pdf" onChange={e => setFiles(e.target.files)} className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer" />
           <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">📄</div>
           <p className="font-black text-slate-700">{files ? `${files.length} File(s) Ready` : "Select PDF Source"}</p>
        </div>
      }
      options={<OptionsPanel options={activeConfig.options as any} values={options} onChange={(id, v) => setOptions(p => ({...p, [id]: v}))} />}
      actions={<button onClick={handleRun} disabled={loading} className="w-full py-6 bg-red-600 text-white rounded-[2rem] font-black text-xl shadow-2xl active:scale-95 transition-all">{loading ? "Processing..." : "Run PDF Logic"}</button>}
      result={outputUrl && (
        <div className="text-center mt-6">
           <a href={outputUrl} download={`toolverse_result.pdf`} className="px-12 py-5 bg-emerald-600 text-white rounded-2xl font-black shadow-xl inline-block hover:scale-105 transition-transform">Download Result</a>
        </div>
      )}
    />
  );
};

export default PDFTools;
