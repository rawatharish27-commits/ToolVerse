
import React, { useState, useEffect, useMemo } from 'react';
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { TOOLS } from '../../data/tools';
import { textToDocxConfig, docxMetadataConfig, resumeBuilderConfig } from '../../config/officeTools';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const OfficeTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const toolNode = useMemo(() => TOOLS.find(t => t.slug === slug), [slug]);
  const activeConfig = useMemo(() => [
    textToDocxConfig, docxMetadataConfig, resumeBuilderConfig
  ].find(c => c.slug === slug) || textToDocxConfig, [slug]);

  const [options, setOptions] = useState<Record<string, any>>({});

  useEffect(() => {
    const initial: Record<string, any> = {};
    if (activeConfig.options) {
      activeConfig.options.forEach((opt: any) => initial[opt.id] = opt.default);
    }
    setOptions(initial);
    setInputText("");
    setResult(null);
  }, [slug, activeConfig]);

  const handleRun = async () => {
    if (!toolNode?.execute) { onError("Office Node missing."); return; }
    if (!inputText.trim()) { onError("Input required for document generation."); return; }

    setLoading(true);
    try {
      const output = await toolNode.execute(inputText, options);
      setResult(output);
      onSuccess("Document Logic Resolved!");
    } catch (err: any) {
      onError("Office engine synchronization error.");
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
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Document Content Buffer</label>
          <textarea
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder="Enter text or paste raw content for professional formatting..."
            className="w-full h-64 p-8 bg-slate-50 border border-slate-200 rounded-[3rem] outline-none font-sans text-lg font-bold text-slate-700 shadow-inner resize-none focus:ring-8 focus:ring-indigo-500/5 transition-all"
          />
        </div>
      }
      options={activeConfig.options?.length > 0 ? <OptionsPanel options={activeConfig.options as any} values={options} onChange={(id, val) => setOptions(p => ({ ...p, [id]: val }))} /> : undefined}
      actions={<button onClick={handleRun} disabled={loading} className={`w-full py-7 ${activeConfig.colorClass} text-white rounded-[2.5rem] font-black text-2xl shadow-2xl transition-all active:scale-95`}>{loading ? "Architecting Document..." : "Generate Master Output"}</button>}
      result={result && (
        <div className="animate-in zoom-in-95">
           {result instanceof Blob ? (
             <div className="bg-slate-900 p-10 rounded-[3rem] text-white flex flex-col items-center gap-6">
                <div className="text-6xl">📄</div>
                <div className="text-center">
                   <h4 className="text-xl font-black mb-2">Word Document Ready</h4>
                   <p className="text-slate-400 text-sm">Download your formatted .docx file below.</p>
                </div>
                <button 
                  onClick={() => {
                    const url = URL.createObjectURL(result);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `toolverse_doc_${Date.now()}.docx`;
                    a.click();
                  }}
                  className="px-12 py-5 bg-indigo-600 text-white rounded-2xl font-black shadow-xl"
                >
                  Download .DOCX
                </button>
             </div>
           ) : (
             <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-inner prose max-w-none whitespace-pre-wrap">
                {result}
             </div>
           )}
        </div>
      )}
    />
  );
};

export default OfficeTools;
