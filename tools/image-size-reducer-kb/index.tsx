import React, { useState, useMemo } from 'react';
import ToolShell from '../../components/ToolShell';
import { PipelineRunner } from '../../core/pipeline';
// Fix: Added ImageReducerInput to imports for use in explicit generic typing of the pipeline runner.
import { validate, ImageReducerInput } from './validate';
import { normalize } from './normalize';
import { process } from './process';
import { verify } from './verify';
import { explain } from './explain';

const ImageReducer: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [targetKb, setTargetKb] = useState(50);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);

  const onExecute = async () => {
    // Fix: Explicitly provided generic types to PipelineRunner.run to ensure result.data is correctly typed as containing a blob and other expected properties.
    const result = await PipelineRunner.run<ImageReducerInput, { blob: Blob, finalSize: number }>('image-size-reducer-kb', 
      { validate, normalize, process, verify, explain },
      { file, targetKb }
    );
    
    // Fix: result.data.blob access is now valid because the type of O has been unified and explicitly defined in the run call.
    if (result.success && result.data?.blob) {
      if (outputUrl) URL.revokeObjectURL(outputUrl);
      setOutputUrl(URL.createObjectURL(result.data.blob));
    }
    
    return result;
  };

  return (
    <ToolShell 
      title="Photo KB Size Reducer"
      description="Compress photos to an exact target size (20kb, 50kb, 100kb) for official uploads."
      icon="📉"
      onExecute={onExecute}
    >
      {(execute, loading, result) => (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Master Image Source</label>
                <div className="p-8 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] text-center hover:border-indigo-200 transition-all cursor-pointer relative group">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={e => {
                      setFile(e.target.files?.[0] || null);
                      setOutputUrl(null);
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">🖼️</div>
                  <p className="text-slate-600 font-bold text-sm">{file ? file.name : "Drop Photo for Reduction"}</p>
                </div>
             </div>
             <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Target KB Limit</label>
                <input 
                  type="number"
                  value={targetKb}
                  onChange={e => setTargetKb(parseInt(e.target.value) || 0)}
                  className="w-full p-6 bg-slate-50 border-none rounded-[2rem] text-3xl font-black text-slate-800 outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-inner"
                />
             </div>
          </div>

          <button 
            onClick={execute}
            disabled={loading || !file}
            className="w-full py-8 bg-indigo-600 text-white rounded-[2rem] font-black text-xl shadow-2xl hover:bg-indigo-700 transition-all transform active:scale-95 disabled:opacity-50 disabled:grayscale"
          >
            {loading ? "Adjusting Quantization..." : "REDUCE PHOTO SIZE NOW"}
          </button>

          {result?.success && outputUrl && (
            <div className="pt-8 border-t border-slate-100 animate-in fade-in slide-in-from-top-4">
              <div className="flex flex-col items-center gap-8">
                <div className="relative group">
                  <img 
                    src={outputUrl} 
                    className="max-h-80 rounded-3xl shadow-2xl border-4 border-white" 
                    alt="Processed result" 
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-md text-white text-[8px] font-black uppercase rounded-lg">
                    {(result.data.finalSize / 1024).toFixed(1)} KB
                  </div>
                </div>
                
                <a 
                  href={outputUrl} 
                  download={`toolverse_reduced_${file?.name || 'image.jpg'}`}
                  className="px-12 py-5 bg-emerald-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:bg-emerald-700 transition-all transform hover:-translate-y-1 flex items-center gap-3"
                >
                  <span>💾</span> Download Optimized Asset
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </ToolShell>
  );
};

export default ImageReducer;