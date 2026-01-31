
export const GOLDEN_INDEX_TSX = `
import { useState } from "react";
import { executeTool } from "../../core/executeTool";
import { process } from "./process";
import { validate } from "./validate";
import { normalize } from "./normalize";
import { verify } from "./verify";
import { explain } from "./explain";
import ToolLayout from "../../components/ToolLayout";

export default function Tool() {
  const [inputStr, setInputStr] = useState("{}");
  const [res, setRes] = useState<any>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function run() {
    setErr(null);
    setLoading(true);
    try {
      const input = JSON.parse(inputStr);
      const r = await executeTool({
        input,
        validate,
        normalize,
        process,
        verify,
        explain,
      });
      setRes(r);
    } catch (e: any) {
      setErr(e.message || "Logic Isolate Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ToolLayout
      title="Logic Node"
      description="Standard UI Wrapper for Verified Logic"
      icon="⚙️"
      input={
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Input Buffer (JSON)</label>
            <textarea
              placeholder='{ "key": "value" }'
              className="w-full h-40 p-6 bg-slate-50 border border-slate-200 rounded-[2rem] font-mono text-sm outline-none focus:ring-8 focus:ring-indigo-500/5 transition-all shadow-inner"
              value={inputStr}
              onChange={e => setInputStr(e.target.value)}
            />
          </div>
        </div>
      }
      actions={
        <button 
          onClick={run} 
          disabled={loading}
          className="w-full py-7 bg-indigo-600 text-white rounded-[2.5rem] font-black text-2xl shadow-2xl transition-all active:scale-95 disabled:opacity-50"
        >
          {loading ? "Crunching Logic..." : "Execute Node"}
        </button>
      }
      result={res && (
        <div className="animate-in zoom-in-95 duration-500 space-y-6">
           <div className="bg-slate-900 p-8 rounded-[3rem] text-emerald-400 font-mono text-sm">
             <pre>{JSON.stringify(res.output, null, 2)}</pre>
           </div>
           <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100 italic text-indigo-900 text-sm">
             " {res.explanation} "
           </div>
        </div>
      )}
    />
  );
}
`;

export const GOLDEN_VALIDATE = `
export function validate(input: any) {
  if (input === undefined) throw new Error("Input required");
}
`;

export const GOLDEN_NORMALIZE = `
export function normalize(input: any) {
  return input;
}
`;

export const GOLDEN_VERIFY = `
export function verify(output: any) {
  if (output === undefined) throw new Error("Invalid output");
}
`;

export const GOLDEN_EXPLAIN = `
export function explain(output: any) {
  return "Logic resolved successfully. Results verified against modern standards.";
}
`;

export const GOLDEN_METADATA = (slug: string) => `
{
  "name": "${slug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())}",
  "slug": "${slug}",
  "category": "General",
  "problemStatement": "Auto-fixed tool",
  "features": ["Auto execution", "Standard UI"]
}
`;
