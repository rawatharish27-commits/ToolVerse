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

  const jsonToXml = (json: string) => {
    try {
      const obj = JSON.parse(json);
      const toXml = (o: any, tab: string = ''): string => {
        let xml = '';
        for (const key in o) {
          if (Array.isArray(o[key])) {
            o[key].forEach((item: any) => {
              xml += `${tab}<${key}>\n${typeof item === 'object' ? toXml(item, tab + '  ') : tab + '  ' + item + '\n'}${tab}</${key}>\n`;
            });
          } else if (typeof o[key] === 'object') {
            xml += `${tab}<${key}>\n${toXml(o[key], tab + '  ')}${tab}</${key}>\n`;
          } else {
            xml += `${tab}<${key}>${o[key]}</${key}>\n`;
          }
        }
        return xml;
      };
      setOutput(`<?xml version="1.0" encoding="UTF-8"?>\n<root>\n${toXml(obj, '  ')}</root>`);
      onSuccess("JSON converted to XML");
    } catch (e) {
      onError("Invalid JSON Format");
    }
  };

  const handleWordToPdf = async () => {
    if (!input) return;
    setLoading(true);
    try {
      const doc = new jsPDF();
      const lines = doc.splitTextToSize(input, 180);
      doc.text(lines, 10, 20);
      doc.save("document_export.pdf");
      onSuccess("PDF Exported Successfully");
    } catch (e) {
      onError("Export Failed");
    } finally {
      setLoading(false);
    }
  };

  const processExcel = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(firstSheet);
        setOutput(JSON.stringify(json, null, 2));
        onSuccess("Excel Data Extracted");
      };
      reader.readAsBinaryString(file);
    } catch (e) {
      onError("Excel Analysis Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500 max-w-2xl mx-auto py-8">
      <div className="text-center">
        <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center text-white text-4xl mx-auto shadow-2xl mb-6">📁</div>
        <h3 className="text-3xl font-black text-slate-900 capitalize tracking-tight">{slug.replace(/-/g, ' ')}</h3>
      </div>

      {slug.includes('excel') ? (
        <div className="p-10 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2.5rem] text-center">
          <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} className="hidden" id="excel-input" />
          <label htmlFor="excel-input" className="cursor-pointer">
            <div className="text-4xl mb-4">📊</div>
            <p className="text-sm font-black text-slate-600">{file ? file.name : 'Select Excel (.xlsx) file'}</p>
          </label>
        </div>
      ) : (
        <div className="space-y-6">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Data Workspace</label>
          <textarea 
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={slug.includes('xml') ? 'Paste JSON here...' : 'Enter your document text...'}
            className="w-full h-64 p-8 rounded-[2.5rem] border border-slate-200 focus:ring-8 focus:ring-blue-500/5 outline-none font-mono text-sm bg-slate-50 shadow-inner"
          />
        </div>
      )}

      <div className="flex gap-4">
        {slug === 'json-to-xml' && (
          <button onClick={() => jsonToXml(input)} className="w-full py-6 bg-blue-600 text-white rounded-2xl font-black text-lg shadow-xl">Transform to XML</button>
        )}
        {slug === 'excel-to-json-pro' && (
          <button onClick={processExcel} disabled={!file} className="w-full py-6 bg-blue-600 text-white rounded-2xl font-black text-lg shadow-xl disabled:opacity-50">Convert to JSON</button>
        )}
        {slug === 'word-to-pdf-lite' && (
          <button onClick={handleWordToPdf} className="w-full py-6 bg-slate-900 text-white rounded-2xl font-black text-lg shadow-xl">Export as PDF</button>
        )}
      </div>

      {output && (
        <div className="p-8 bg-slate-50 rounded-[2.5rem] text-slate-700 font-mono text-xs border border-slate-200 relative animate-in slide-in-from-top-4">
           <div className="mb-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Result View</div>
           <pre className="whitespace-pre-wrap max-h-80 overflow-y-auto">{output}</pre>
           <button 
            onClick={() => { navigator.clipboard.writeText(output); onSuccess("Copied to Clipboard"); }}
            className="absolute top-6 right-6 px-4 py-2 bg-blue-100 text-blue-600 rounded-xl text-[10px] font-black hover:bg-blue-200"
           >
             COPY
           </button>
        </div>
      )}
    </div>
  );
};

export default OfficeTools;