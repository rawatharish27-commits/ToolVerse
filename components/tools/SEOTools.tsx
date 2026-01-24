
import React, { useState } from 'react';
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { executeTool } from '../../services/executionEngine';
import { metaTagGeneratorConfig } from '../../config/seoTools';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const SEOTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [options, setOptions] = useState<Record<string, any>>({});

  const handleRun = async () => {
    if (!input.trim()) return onError("URL or context required.");
    setLoading(true);
    const res = await executeTool({ slug, category: 'seo', input, options });
    if (res.success) {
      setResult(res.data);
      onSuccess("SEO Audit Complete!");
    } else {
      onError(res.error || "Audit failed.");
    }
    setLoading(false);
  };

  return (
    <ToolLayout
      title={slug.replace(/-/g, ' ')}
      description="Deep SEO Heuristic Analysis"
      icon="🔍"
      input={
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Enter URL or content for analysis..."
          className="w-full h-32 p-5 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-mono text-sm"
        />
      }
      actions={
        <button onClick={handleRun} disabled={loading} className="w-full py-5 bg-blue-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:bg-blue-700">
          {loading ? "Running Intelligence Core..." : "Run SEO Diagnostic"}
        </button>
      }
      result={result && (
        <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl">
          <pre className="text-emerald-400 font-mono text-xs whitespace-pre-wrap leading-relaxed">{result}</pre>
        </div>
      )}
    />
  );
};

export default SEOTools;
