
import React, { useState, useRef } from 'react';
import { getImageCompression, runOCRTask, runBatchTask, triggerBatchDownload } from '../../lib/wasm-engines';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const ImageTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{url: string, name: string}[]>([]);
  const [progress, setProgress] = useState(0);
  const [extractedText, setExtractedText] = useState('');
  
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const processBatch = async () => {
    if (!files || files.length === 0) return;
    try {
      setLoading(true);
      setResults([]);
      setExtractedText('');
      
      const fileArray = Array.from(files);
      const total = fileArray.length;

      // Adding explicit type File to callback parameter to fix 'unknown' type errors
      const processed = await runBatchTask(fileArray, async (file: File, index: number) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        await img.decode();
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;
        let outUrl = '';
        let outName = `toolverse_${index}_${file.name}`;

        switch (slug) {
          case 'heic-to-jpg':
          case 'image-compressor':
            const { default: imageCompression } = await getImageCompression();
            const compressed = await imageCompression(file, { maxSizeMB: 1, useWebWorker: true });
            outUrl = URL.createObjectURL(compressed);
            outName = outName.split('.')[0] + '.jpg';
            break;

          case 'photo-enhancer':
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.filter = 'contrast(1.2) brightness(1.05) saturate(1.1)';
            ctx.drawImage(img, 0, 0);
            outUrl = canvas.toDataURL('image/jpeg', 0.95);
            break;

          case 'image-to-text-ocr':
             const text = await runOCRTask(file);
             setExtractedText(prev => prev + `\n--- FILE: ${file.name} ---\n${text}\n`);
             break;

          case 'background-remover':
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imgData.data;
            const r = data[0], g = data[1], b = data[2];
            for (let i = 0; i < data.length; i += 4) {
               if (Math.abs(data[i]-r) < 50 && Math.abs(data[i+1]-g) < 50 && Math.abs(data[i+2]-b) < 50) data[i+3] = 0;
            }
            ctx.putImageData(imgData, 0, 0);
            outUrl = canvas.toDataURL('image/png');
            break;
            
          default:
            outUrl = URL.createObjectURL(file);
        }

        setProgress(Math.round(((index + 1) / total) * 100));
        return outUrl ? { url: outUrl, name: outName } : null;
      });

      // Filter out null results and cast back to the desired result type
      const filtered = (processed as ({url: string, name: string} | null)[]).filter((item): item is {url: string, name: string} => Boolean(item));
      setResults(filtered);
      onSuccess(`Processed ${filtered.length} files successfully!`);
    } catch (err) {
      onError("Batch processing failed.");
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  return (
    <div className="py-12 text-center space-y-10 max-w-lg mx-auto">
      <div className="text-8xl animate-bounce-slow">🚀</div>
      
      <div className="space-y-4">
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">
          {slug === 'image-to-text-ocr' ? 'Upload Scan(s)' : 'Upload Multiple Images'}
        </label>
        <input 
          type="file" 
          accept="image/*" 
          multiple
          onChange={e => setFiles(e.target.files)} 
          className="mx-auto block bg-slate-100 p-4 rounded-2xl w-full" 
        />
      </div>

      <button 
        disabled={loading || !files} 
        onClick={processBatch} 
        className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black text-xl shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
      >
        {loading ? `Processing (${progress}%)...` : "Start Batch Engine"}
      </button>

      {loading && (
         <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full transition-all duration-300" style={{ width: `${progress}%` }} />
         </div>
      )}

      {(results.length > 0 || extractedText) && (
        <div className="pt-8 space-y-6 animate-in slide-in-from-bottom">
          {results.length > 0 && (
            <div className="grid grid-cols-4 gap-2">
              {results.slice(0, 8).map((r, i) => (
                <img key={i} src={r.url} className="w-full h-16 object-cover rounded-lg shadow-sm" />
              ))}
              {results.length > 8 && <div className="flex items-center justify-center text-xs font-bold text-slate-400">+{results.length-8} more</div>}
            </div>
          )}

          {extractedText && (
            <div className="bg-slate-50 p-6 rounded-2xl text-left border border-slate-200">
               <textarea readOnly className="w-full h-48 bg-transparent text-sm font-mono focus:outline-none" value={extractedText} />
            </div>
          )}

          {results.length > 0 && (
            <button onClick={() => triggerBatchDownload(results)} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl">
              Download All ({results.length} files)
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageTools;
