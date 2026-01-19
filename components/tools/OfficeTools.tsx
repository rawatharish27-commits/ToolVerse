import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const OfficeTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [jsonInput, setJsonInput] = useState('');

  const processFile = async () => {
    if (!file && !jsonInput) return;
    try {
      setLoading(true);

      switch (slug) {
        case 'csv-to-xlsx': {
          const reader = new FileReader();
          reader.onload = (e) => {
            const data = e.target?.result;
            const workbook = XLSX.read(data, { type: 'binary' });
            XLSX.writeFile(workbook, 'toolverse_converted.xlsx');
            onSuccess("CSV converted to Excel!");
            setLoading(false);
          };
          reader.readAsBinaryString(file!);
          return;
        }

        case 'xlsx-to-csv': {
          const reader = new FileReader();
          reader.onload = (e) => {
            const data = e.target?.result;
            const workbook = XLSX.read(data, { type: 'binary' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const csv = XLSX.utils.sheet_to_csv(firstSheet);
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'toolverse_converted.csv';
            a.click();
            onSuccess("Excel converted to CSV!");
            setLoading(false);
          };
          reader.readAsBinaryString(file!);
          return;
        }

        case 'json-to-excel': {
          const json = JSON.parse(jsonInput);
          const worksheet = XLSX.utils.json_to_sheet(Array.isArray(json) ? json : [json]);
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
          XLSX.writeFile(workbook, 'toolverse_json_export.xlsx');
          onSuccess("JSON converted to Excel!");
          break;
        }

        case 'excel-to-pdf': {
          const reader = new FileReader();
          reader.onload = (e) => {
            const data = e.target?.result;
            const workbook = XLSX.read(data, { type: 'binary' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
            
            const doc = new jsPDF();
            doc.setFontSize(10);
            jsonData.forEach((row: any, i: number) => {
              doc.text(row.join(' | '), 10, 10 + (i * 10));
              if (10 + (i * 10) > 280) doc.addPage();
            });
            doc.save('toolverse_sheet.pdf');
            onSuccess("Excel saved as PDF!");
            setLoading(false);
          };
          reader.readAsBinaryString(file!);
          return;
        }

        case 'vcard-generator': {
          const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:ToolVerse User\nORG:ToolVerse Platform\nTEL;TYPE=WORK,VOICE:+123456789\nEMAIL:user@toolverse.com\nEND:VCARD`;
          const blob = new Blob([vcard], { type: 'text/vcard' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'contact.vcf';
          a.click();
          onSuccess("VCard Generated!");
          break;
        }

        default:
          onError("This office engine task is under development.");
      }
    } catch (err) {
      console.error(err);
      onError("Processing failed. Check file format.");
    } finally {
      if (slug !== 'csv-to-xlsx' && slug !== 'xlsx-to-csv' && slug !== 'excel-to-pdf') {
        setLoading(false);
      }
    }
  };

  return (
    <div className="py-12 text-center space-y-10 max-w-lg mx-auto">
      <div className="text-8xl">📁</div>

      {slug === 'json-to-excel' ? (
        <div className="space-y-4">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest text-left">Paste JSON Data</label>
          <textarea 
            value={jsonInput} 
            onChange={e => setJsonInput(e.target.value)} 
            placeholder='[{"name": "John", "age": 30}, ...]'
            className="w-full h-48 p-4 border rounded-2xl font-mono text-xs focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      ) : (
        <div className="space-y-4">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Select Source File</label>
          <input 
            type="file" 
            onChange={e => setFile(e.target.files?.[0] || null)} 
            className="mx-auto block bg-slate-100 p-4 rounded-2xl w-full" 
          />
        </div>
      )}

      <button 
        disabled={loading || (!file && !jsonInput)} 
        onClick={processFile} 
        className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-xl shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
      >
        {loading ? "Processing Office Data..." : "Run Office Engine"}
      </button>

      <div className="pt-8 text-xs text-slate-400 italic">
        * Professional browser-side conversion. Your files never leave your device.
      </div>
    </div>
  );
};

export default OfficeTools;