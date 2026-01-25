import React, { useState, useEffect, useCallback, useMemo } from 'react';
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { GoogleGenAI } from "@google/genai";
import { 
  passwordStrengthConfig, charCounterConfig, wordCounterConfig, 
  caseConverterConfig, dateDiffConfig, fileSizeConfig, 
  randomNumberConfig, uuidGeneratorConfig, qrCodeConfig, urlEncoderConfig,
  timeZoneConverterConfig, ageDiffConfig, htmlMinifierConfig, cssBeautifierConfig,
  textSummarizerConfig, countdownGeneratorConfig, uploadRejectionConfig,
  govtRuleDecoderConfig, dpiConflictConfig, statusDecoderConfig, formatTranslatorConfig
} from '../../config/utilityTools';
import { pdfComplianceConfig } from '../../config/pdfTools';
import { applicationStatusMeaningDecoder } from '../../tools/executors/applicationStatusMeaningDecoder';
import { wrongFormatErrorTranslator } from '../../tools/executors/wrongFormatErrorTranslator';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const UtilityTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const activeConfig = useMemo(() => [
    passwordStrengthConfig, charCounterConfig, wordCounterConfig, 
    caseConverterConfig, dateDiffConfig, fileSizeConfig, 
    randomNumberConfig, uuidGeneratorConfig, qrCodeConfig, urlEncoderConfig,
    timeZoneConverterConfig, ageDiffConfig, htmlMinifierConfig, cssBeautifierConfig,
    textSummarizerConfig, countdownGeneratorConfig, uploadRejectionConfig, 
    pdfComplianceConfig, govtRuleDecoderConfig, dpiConflictConfig,
    statusDecoderConfig, formatTranslatorConfig
  ].find(c => c.slug === slug) || qrCodeConfig, [slug]);

  const [options, setOptions] = useState<Record<string, any>>({});

  useEffect(() => {
    const initial: Record<string, any> = {};
    activeConfig.options.forEach((opt: any) => initial[opt.id] = (opt as any).default);
    setOptions(initial);
    setInput("");
    setOutput(null);
    setFile(null);
  }, [slug, activeConfig]);

  const handleOptionChange = (id: string, value: any) => {
    setOptions(prev => ({ ...prev, [id]: value }));
  };

  const processLogic = useCallback(async () => {
    setLoading(true);
    try {
      if (slug === 'application-status-meaning-decoder') {
        if (!input.trim()) throw new Error("Enter status text from portal.");
        const result = applicationStatusMeaningDecoder({
          portal: options.portal,
          status: input,
          daysInStatus: options.daysInStatus
        });
        setOutput(result);
        onSuccess("Status Decoded!");
      }

      else if (slug === 'wrong-format-error-translator') {
        if (!input.trim()) throw new Error("Enter the error message shown by portal.");
        const result = wrongFormatErrorTranslator({
          errorMessage: input,
          fileType: options.fileType,
          extension: options.extension
        });
        setOutput(result);
        onSuccess("Diagnostic Ready!");
      }

      else if (slug === 'dpi-size-conflict-explainer') {
        const { targetKb, targetDpi, widthCm, heightCm } = options;
        const widthIn = widthCm / 2.54;
        const heightIn = heightCm / 2.54;
        const totalPixels = (widthIn * targetDpi) * (heightIn * targetDpi);
        const uncompressedSizeKb = (totalPixels * 3) / 1024;
        const estimatedJpegSizeKb = uncompressedSizeKb / 10;
        const feasibility = targetKb > estimatedJpegSizeKb ? "High" : (targetKb > estimatedJpegSizeKb / 2 ? "Moderate" : "Critical Conflict");
        
        setOutput({
          "Total Resolution": `${Math.round(widthIn * targetDpi)}x${Math.round(heightIn * targetDpi)} px`,
          "Raw Data Size": `${Math.round(uncompressedSizeKb)} KB`,
          "Est. JPEG Size": `${Math.round(estimatedJpegSizeKb)} KB`,
          "Feasibility Status": feasibility,
          "Recommendation": targetKb < estimatedJpegSizeKb ? "Reduce DPI or increase compression." : "Ready to proceed."
        });
        onSuccess("Conflict Analysis Ready!");
      }

      else if (slug === 'govt-rule-decoder') {
        const isCustom = options.preset === 'Custom (Paste Text)';
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        let context = !isCustom ? `Exam: ${options.preset}. File: ${options.fileType}.` : `Text: ${input}`;
        const prompt = `Extract rules from: ${context}. Format JSON: { "TargetFormat": "...", "SizeLimit": "...", "Dimensions": "...", "DPI": "...", "Checklist": ["step1"] }`;
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: prompt,
          config: { responseMimeType: "application/json" }
        });
        setOutput(JSON.parse(response.text || "{}"));
        onSuccess("Rules Decoded!");
      }

      else if (slug === 'pdf-compliance-checker') {
        if (!file) throw new Error("Select a PDF.");
        const sizeMB = file.size / (1024 * 1024);
        let issues = [];
        if (options.standard === 'Govt Portal (SSC/UPSC)' && sizeMB > 0.2) issues.push("Size exceeds 200KB.");
        setOutput({ "Standard": options.standard, "File Size": `${sizeMB.toFixed(2)} MB`, "Status": issues.length > 0 ? "Non-Compliant" : "Valid", "Findings": issues.join(" | ") || "Passed" });
        onSuccess("Audit complete.");
      }

      else if (slug === 'upload-rejection-analyzer') {
        if (!input.trim()) throw new Error("Enter error message.");
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = `Tool: ${slug}. Error: "${input}". Output JSON: {Reason, Fix}.`;
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: prompt,
          config: { responseMimeType: "application/json" }
        });
        setOutput(JSON.parse(response.text || "{}"));
        onSuccess("Diagnostic Ready!");
      }
      
    } catch (err: any) {
      onError(err.message || "Logic failure.");
    } finally {
      setLoading(false);
    }
  }, [slug, input, options, file, onSuccess, onError]);

  return (
    <ToolLayout
      title={activeConfig.title}
      description={activeConfig.description}
      icon={activeConfig.icon}
      colorClass={activeConfig.colorClass}
      input={
        slug === 'pdf-compliance-checker' ? (
          <div className="p-10 border-4 border-dashed border-slate-100 rounded-[3rem] text-center relative group">
             <input type="file" accept="application/pdf" onChange={e => setFile(e.target.files?.[0] || null)} className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer" />
             <div className="text-6xl mb-4">⚖️</div>
             <p className="font-black text-slate-700">{file ? file.name : "Drop PDF for Compliance Audit"}</p>
          </div>
        ) : (slug === 'dpi-size-conflict-explainer' ? (
           <div className="py-12 bg-slate-50/50 rounded-[3rem] border border-dashed border-slate-200 text-center">
             <div className="text-7xl mb-4 opacity-50">{activeConfig.icon}</div>
             <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest">Mathematical Conflict Resolver: Active</p>
          </div>
        ) : (
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={
              slug === 'application-status-meaning-decoder' ? "Paste status text (e.g. 'Application Under Scrutiny')..." :
              slug === 'wrong-format-error-translator' ? "Paste the portal error message..." :
              "Enter content or notification text..."
            }
            className="w-full h-44 p-8 bg-slate-50 border border-slate-200 rounded-[2.5rem] outline-none font-sans text-xl font-bold text-slate-700 shadow-inner resize-none transition-all"
          />
        ))
      }
      options={<OptionsPanel options={activeConfig.options as any} values={options} onChange={handleOptionChange} />}
      actions={<button onClick={processLogic} disabled={loading} className={`w-full py-7 ${activeConfig.colorClass} text-white rounded-[2.5rem] font-black text-2xl shadow-2xl transition-all`}>Execute Logic Node</button>}
      result={output && (
        <div className="grid grid-cols-1 gap-4 animate-in zoom-in-95">
           {Object.entries(output).map(([k, v]) => (
             <div key={k} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{k}</span>
                <span className="text-sm font-black text-indigo-600">
                   {Array.isArray(v) ? (
                      <ul className="list-disc pl-4 text-left">
                        {v.map((item, i) => <li key={i}>{item}</li>)}
                      </ul>
                   ) : (typeof v === 'boolean' ? (v ? "Yes" : "No") : v as any)}
                </span>
             </div>
           ))}
        </div>
      )}
    />
  );
};

export default UtilityTools;