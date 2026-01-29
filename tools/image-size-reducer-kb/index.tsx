
import React, { useState } from 'react';
import ToolShell from '../../components/ToolShell';
import { PipelineRunner } from '../../core/pipeline';
import { validate } from './validate';
import { normalize } from './normalize';
import { process } from './process';
import { verify } from './verify';
import { explain } from './explain';

const ImageReducer: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [targetKb, setTargetKb] = useState(50);

  const onExecute = async () => {
    return await PipelineRunner.run('image-size-reducer-kb', 
      { validate, normalize, process, verify, explain },
      { file, targetKb }
    );
  };

  return (
    <ToolShell 
      title="Image Size Reducer (KB Selector)"
      description="Compress images to an exact target size for government and portal uploads."
      icon="📉"
      onExecute={onExecute}
    >
      {(execute, loading, result) => (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Source Payload</label>
                <div className="p-8 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] text-center hover:border-indigo-200 transition-all cursor-pointer relative group">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={e => setFile(e.target.files?.[0] || null)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">🖼️</div>
                  <p className="text-slate-600 font-bold text-sm">{file ? file.name : "Drop Master Image"}</p>
                </div>
             </div>
             <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Target Threshold (KB)</label>
                <input 
                  type="number"
                  value={targetKb}
                  onChange={e => setTargetKb(parseInt(e.target.value))}
                  className="w-full p-6 bg-slate-50 border-none rounded-[2rem] text-3xl font-black text-slate-800 outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-inner"
                />
             </div>
          </div>

          <button 
            onClick={execute}
            disabled={loading || !file}
            className="w-full py-8 bg-indigo-600 text-white rounded-[2rem] font-black text-xl shadow-2xl hover:bg-indigo-700 transition-all transform active:scale-95 disabled:opacity-50 disabled:grayscale"
          >
            {loading ? "Optimizing Quantization..." : "Execute Logic Node"}
          </button>

          {result?.success && (
            <div className="pt-8 border-t border-slate-50 flex flex-col items-center gap-6">
               <img src={URL.createObjectURL(result.data.blob)} className="max-h-64 rounded-2xl shadow-lg border border-slate-100" />
               <a 
                 href={URL.createObjectURL(result.data.blob)} 
                 download={`compressed_${file?.name}`}
                 className="px-10 py-4 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-emerald-700 transition-all"
               >
                 Save Verified Asset ({(result.data.blob.size / 1024).toFixed(1)} KB)
               </a>
            </div>
          )}
        </div>
      )}
    </ToolShell>
  );
};

export default ImageReducer;
