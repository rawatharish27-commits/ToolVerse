
import React, { useState } from 'react';
import { PipelineRunner } from '../../core/pipeline';
import { validate } from './validate';
import { normalize } from './normalize';
import { process } from './process';
import { verify } from './verify';
import { explain } from './explain';

const GovtComplianceTool: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    if (!file) return;
    setLoading(true);
    const res = await PipelineRunner.run('govt-image-compliance-tool', 
      { validate, normalize, process, verify, explain }, 
      file
    );
    setResult(res);
    setLoading(false);
  };

  return (
    <div className="space-y-10">
      <div className="p-16 border-4 border-dashed border-slate-100 rounded-[3rem] text-center hover:border-indigo-100 transition-all cursor-pointer relative group">
        <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer" />
        <div className="text-7xl mb-6 group-hover:scale-110 transition-transform">📄</div>
        <p className="font-black text-slate-700 text-xl">{file ? file.name : "Stage Final Upload File"}</p>
      </div>

      <button onClick={handleRun} disabled={loading || !file} className="w-full py-8 bg-slate-900 text-white rounded-[2.5rem] font-black text-2xl shadow-2xl active:scale-95 transition-all">
        {loading ? "Running Audit..." : "Initiate Compliance Scan"}
      </button>

      {result && (
        <div className={`p-10 rounded-[3.5rem] border-2 ${result.success && result.data.passed ? 'bg-emerald-50 border-emerald-100' : 'bg-rose-50 border-rose-100'}`}>
           <h3 className="text-2xl font-black mb-6 uppercase tracking-tighter">Audit Result</h3>
           {result.success ? (
             <div className="space-y-4">
                {result.data.findings.length > 0 ? (
                   result.data.findings.map((f: string, i: number) => <div key={i} className="text-rose-600 font-bold">● {f}</div>)
                ) : <div className="text-emerald-600 font-bold text-lg">✓ Your file is compliant with standard Govt rules.</div>}
                <p className="pt-6 border-t font-medium text-slate-500 italic">" {result.explanation} "</p>
             </div>
           ) : <p className="text-rose-600 font-bold">{result.error}</p>}
        </div>
      )}
    </div>
  );
};

export default GovtComplianceTool;
