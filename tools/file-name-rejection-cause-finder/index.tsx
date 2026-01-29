
import React, { useState } from 'react';
import { PipelineRunner } from '../../core/pipeline';
import { validate } from './validate';
import { normalize } from './normalize';
import { process } from './process';
import { verify } from './verify';
import { explain } from './explain';

const FileNameAuditor: React.FC = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    setLoading(true);
    const res = await PipelineRunner.run('file-name-rejection-cause-finder', 
      { validate, normalize, process, verify, explain }, 
      input
    );
    setResult(res);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <input 
        type="text" 
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Enter filename (e.g. My Photo (1).jpg)"
        className="w-full p-6 bg-slate-50 border-2 border-slate-200 rounded-2xl font-bold text-xl outline-none focus:border-indigo-600 transition-all"
      />
      <button onClick={handleRun} disabled={loading || !input} className="w-full py-6 bg-indigo-600 text-white rounded-2xl font-black text-xl shadow-xl active:scale-95 transition-all">
        {loading ? "Analyzing Bit-Map..." : "Audit Filename Structure"}
      </button>

      {result && (
        <div className={`p-8 rounded-3xl border-2 animate-in zoom-in-95 ${result.success ? 'bg-emerald-50 border-emerald-100' : 'bg-rose-50 border-rose-100'}`}>
          <h3 className="font-black text-xl mb-4">{result.success ? "Verification Complete" : "Stage Fault"}</h3>
          {result.success ? (
            <div className="space-y-4">
              <ul className="space-y-2">
                {result.data.issues.map((iss: string, i: number) => (
                  <li key={i} className="text-rose-600 font-bold flex items-center gap-2"><span>⚠️</span> {iss}</li>
                ))}
                {result.data.safe && <li className="text-emerald-600 font-bold">✓ Standard compliant filename.</li>}
              </ul>
              <p className="text-slate-600 italic border-t pt-4">{result.explanation}</p>
            </div>
          ) : <p className="text-rose-700">{result.error}</p>}
        </div>
      )}
    </div>
  );
};

export default FileNameAuditor;
