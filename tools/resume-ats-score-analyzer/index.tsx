
import React, { useState } from 'react';
import ToolLayout from '../../components/ToolLayout';
import OutputController from '../../components/OutputController';

const ResumeATSAnalyzer: React.FC = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [audit, setAudit] = useState<any>(null);

  const analyze = () => {
    setLoading(true);
    setTimeout(() => {
      const issues = [];
      let score = 95;

      if (text.includes('column') || text.length < 500) {
        issues.push("Potential multi-column layout detected.");
        score -= 20;
      }
      if (!text.toLowerCase().includes('skills') && !text.toLowerCase().includes('experience')) {
        issues.push("Missing primary section headers.");
        score -= 30;
      }
      if (text.match(/[^\x00-\x7F]/g)) {
        issues.push("Non-standard characters/icons found.");
        score -= 10;
      }

      setAudit({
        score: Math.max(0, score),
        issues: issues.length > 0 ? issues : ["No structural blockers found."],
        verdict: score > 80 ? "ATS Optimized" : score > 50 ? "Needs Improvement" : "High Rejection Risk"
      });
      setLoading(false);
    }, 800);
  };

  return (
    <ToolLayout
      title="Resume ATS Auditor"
      description="Audit resume structure for hiring bot compliance."
      icon="🚀"
      input={
        <div className="space-y-6">
           <textarea 
             value={text}
             onChange={e => setText(e.target.value)}
             placeholder="Paste your raw resume text here for structural analysis..."
             className="w-full h-80 p-8 bg-slate-50 border border-slate-200 rounded-[3rem] outline-none font-sans text-sm font-bold text-slate-700 shadow-inner resize-none focus:ring-8 focus:ring-indigo-500/5 transition-all"
           />
        </div>
      }
      actions={
        <button 
          onClick={analyze}
          disabled={loading || text.length < 100}
          className="w-full py-8 bg-indigo-600 text-white rounded-[2.5rem] font-black text-2xl shadow-2xl active:scale-95 transition-all disabled:opacity-50"
        >
          {loading ? "Scanning Document Map..." : "START ATS AUDIT"}
        </button>
      }
      result={audit && (
        <div className="space-y-10 animate-in zoom-in-95 duration-500">
           <div className="flex flex-col md:flex-row gap-8">
              <div className="bg-slate-900 p-12 rounded-[4rem] text-center flex-1">
                 <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">ATS Readiness</span>
                 <div className="text-8xl font-black text-white mt-2 tracking-tighter">{audit.score}%</div>
                 <p className="text-emerald-400 font-black uppercase text-xs mt-4 tracking-widest">{audit.verdict}</p>
              </div>
              <div className="bg-white border-2 border-slate-100 p-10 rounded-[4rem] flex-1">
                 <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6">Structural Findings</h4>
                 <ul className="space-y-4">
                    {audit.issues.map((iss: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-sm font-bold text-slate-600">
                         <span className="text-indigo-600">●</span> {iss}
                      </li>
                    ))}
                 </ul>
              </div>
           </div>
           <div className="p-8 bg-indigo-50 rounded-[2.5rem] border border-indigo-100 italic font-medium text-indigo-900 text-sm">
             " Strategy Note: Modern ATS parsers read resumes from top-to-bottom. Avoid tables and multi-column formats to prevent data fragmentation. "
           </div>
        </div>
      )}
    />
  );
};

export default ResumeATSAnalyzer;
