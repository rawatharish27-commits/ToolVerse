import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';

interface OfficeToolsProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const OfficeTools: React.FC<OfficeToolsProps> = ({ slug, onSuccess, onError }) => {
  const [file, setFile] = useState<File | null>(null);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const jsonToYaml = (json: string) => {
    try {
      const obj = JSON.parse(json);
      const toYaml = (data: any, indent: string = ''): string => {
        let yaml = '';
        for (const key in data) {
          const val = data[key];
          if (typeof val === 'object' && val !== null) {
            yaml += `${indent}${key}:\n${toYaml(val, indent + '  ')}`;
          } else {
            yaml += `${indent}${key}: ${val}\n`;
          }
        }
        return yaml;
      };
      setOutput(toYaml(obj));
      onSuccess("Converted to YAML");
    } catch (e) {
      onError("Invalid JSON");
    }
  };

  const speakText = () => {
    if (!input) return;
    const utterance = new SpeechSynthesisUtterance(input);
    speechSynthesis.speak(utterance);
    onSuccess("Speaking text...");
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500 max-w-2xl mx-auto py-8">
      <div className="text-center">
        <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center text-white text-4xl mx-auto shadow-2xl mb-6">📁</div>
        <h3 className="text-3xl font-black text-slate-900 capitalize tracking-tight">{slug.replace(/-/g, ' ')}</h3>
      </div>

      <div className="space-y-6">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Work Area</label>
        <textarea 
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Paste content here..."
          className="w-full h-64 p-8 rounded-[2.5rem] border border-slate-200 focus:ring-8 focus:ring-blue-500/5 outline-none font-mono text-sm bg-slate-50 shadow-inner"
        />
      </div>

      <div className="flex gap-4">
        {slug === 'json-to-yaml-pro' && (
          <button onClick={() => jsonToYaml(input)} className="w-full py-6 bg-blue-600 text-white rounded-2xl font-black text-lg">Convert to YAML</button>
        )}
        {slug === 'text-to-speech-reader' && (
          <button onClick={speakText} className="w-full py-6 bg-blue-600 text-white rounded-2xl font-black text-lg">Listen (TTS)</button>
        )}
      </div>

      {output && (
        <div className="p-8 bg-slate-50 rounded-[2.5rem] text-slate-700 font-mono text-xs border border-slate-200 relative animate-in slide-in-from-top-4">
           <pre className="whitespace-pre-wrap max-h-80 overflow-y-auto">{output}</pre>
           <button 
            onClick={() => { navigator.clipboard.writeText(output); onSuccess("Copied!"); }}
            className="absolute top-6 right-6 px-4 py-2 bg-blue-100 text-blue-600 rounded-xl text-[10px] font-black"
           >
             COPY
           </button>
        </div>
      )}
    </div>
  );
};

export default OfficeTools;