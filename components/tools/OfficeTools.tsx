import React, { useState, useEffect } from 'react';
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { getToolConfig } from '../../utils/configRegistry';
import { GoogleGenAI } from "@google/genai";
import { Document, Packer, Paragraph, TextRun } from 'docx';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const OfficeTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const activeConfig = getToolConfig(slug);
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

  const generateDocx = async () => {
    try {
      const doc = new Document({
        sections: [{
          properties: {},
          children: inputText.split('\n').map(line => new Paragraph({
            children: [new TextRun({ text: line, size: (options.fontSize || 12) * 2 })],
          })),
        }],
      });

      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `toolverse_document_${Date.now()}.docx`;
      a.click();
      onSuccess("DOCX Generated Successfully!");
    } catch (e) {
      onError("DOCX Engine Error.");
    }
  };

  const handleRun = async () => {
    if (!inputText.trim()) return onError("Please provide content to process.");
    setLoading(true);
    
    if (slug === 'text-to-docx-converter') {
      await generateDocx();
      setLoading(false);
      return;
    }

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Tool: ${slug}. Content: "${inputText}". Options: ${JSON.stringify(options)}. Provide professional office output.`;
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { systemInstruction: "Professional Office Assistant Node.", temperature: 0.2 }
      });
      setResult(response.text || "");
      onSuccess("Operation Complete!");
    } catch (err) {
      onError("Processing failed.");
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
        <div className="space-y-4">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Work Document Buffer</label>
          <textarea
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder="Paste your text or document details here..."
            className="w-full h-64 p-8 bg-slate-50 border border-slate-200 rounded-[2.5rem] outline-none font-sans text-lg text-slate-700 shadow-inner resize-none focus:ring-8 focus:ring-blue-500/5 transition-all"
          />
        </div>
      }
      options={<OptionsPanel options={activeConfig.options as any} values={options} onChange={(id, val) => setOptions(p => ({ ...p, [id]: val }))} />}
      actions={<button onClick={handleRun} disabled={loading} className={`w-full py-7 ${activeConfig.colorClass} text-white rounded-[2.5rem] font-black text-2xl shadow-2xl`}>{loading ? "Orchestrating..." : "Execute Workspace Operation"}</button>}
      result={result && <div className="p-10 bg-white rounded-[3rem] border border-slate-100 shadow-inner prose prose-slate max-w-none whitespace-pre-wrap">{result}</div>}
    />
  );
};

export default OfficeTools;