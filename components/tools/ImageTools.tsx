import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { getImageCompression, runOCRTask, runBatchTask, triggerBatchDownload, downloadZip } from '../../lib/wasm-engines';
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { 
  imageCompressorConfig, 
  backgroundRemoverConfig, 
  imageResizerConfig, 
  imageCropperConfig, 
  imageConverterConfig,
  imageRotatorConfig,
  imageWatermarkConfig,
  imageMetadataRemoverConfig
} from '../../config/imageTools';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const ASPECT_RATIOS: Record<string, number | undefined> = {
  "Free": undefined,
  "1:1": 1,
  "4:3": 4 / 3,
  "16:9": 16 / 9,
  "9:16": 9 / 16,
};

const ImageTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{url: string, name: string, size: number, originalSize: number}[]>([]);
  const [progress, setProgress] = useState(0);
  const [extractedText, setExtractedText] = useState('');
  
  // Cropper State
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const [options, setOptions] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    const configs = [imageCompressorConfig, backgroundRemoverConfig, imageResizerConfig, imageCropperConfig, imageConverterConfig, imageRotatorConfig, imageWatermarkConfig, imageMetadataRemoverConfig];
    const target = configs.find(c => c.slug === slug);
    if (target) {
      target.options.forEach((opt: any) => initial[opt.id] = (opt as any).default);
    }
    return initial;
  });

  const handleOptionChange = (id: string, value: any) => {
    setOptions(prev => ({ ...prev, [id]: value }));
  };

  const onCropComplete = useCallback((_croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    setFiles(selectedFiles);
    
    if ((slug === 'image-cropper' || slug === 'image-rotator') && selectedFiles && selectedFiles.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setImageSrc(reader.result as string));
      reader.readAsDataURL(selectedFiles[0]);
    }
  };

  const processBatch = async () => {
    if (!files || files.length === 0) return;
    try {
      setLoading(true);
      setResults([]);
      setExtractedText('');
      
      const fileArray = Array.from(files);
      const total = fileArray.length;

      let bodyPixNet: any = null;
      if (slug === 'background-remover') {
        const tf = await import('@tensorflow/tfjs');
        const bodyPix = await import('@tensorflow-models/body-pix');
        const multiplier = options.quality === "High Accuracy" ? 1.0 : options.quality === "Balanced" ? 0.75 : 0.5;
        bodyPixNet = await bodyPix.load({
          architecture: 'MobileNetV1',
          outputStride: 16,
          multiplier: multiplier,
          quantBytes: 2
        });
      }

      const processed = await runBatchTask(fileArray, async (file: File, index: number) => {
        let outUrl = '';
        let outName = `toolverse_${file.name.split('.')[0]}`;
        let finalSize = 0;

        try {
          switch (slug) {
            case 'image-watermark': {
               const img = new Image();
               img.src = URL.createObjectURL(file);
               await img.decode();
               const canvas = document.createElement('canvas');
               const ctx = canvas.getContext('2d')!;
               canvas.width = img.width;
               canvas.height = img.height;
               ctx.drawImage(img, 0, 0);

               const scaleFactor = img.width / 1000;
               const fontSize = (options.fontSize || 40) * scaleFactor;
               ctx.font = `bold ${fontSize}px Inter, sans-serif`;
               ctx.fillStyle = options.color.toLowerCase();
               ctx.globalAlpha = (options.opacity || 50) / 100;
               
               const text = options.text || "© ToolVerse";
               const metrics = ctx.measureText(text);
               const padding = 20 * scaleFactor;
               let x = padding, y = padding + fontSize;

               if (options.position === "Center") {
                 x = (canvas.width - metrics.width) / 2;
                 y = (canvas.height + fontSize) / 2;
               } else if (options.position === "Top-Right") {
                 x = canvas.width - metrics.width - padding;
               } else if (options.position === "Bottom-Left") {
                 y = canvas.height - padding;
               } else if (options.position === "Bottom-Right") {
                 x = canvas.width - metrics.width - padding;
                 y = canvas.height - padding;
               }

               ctx.fillText(text, x, y);
               outUrl = canvas.toDataURL('image/png', 0.95);
               finalSize = Math.round(outUrl.length * 0.75);
               outName = `${outName}_watermarked.png`;
               break;
            }

            case 'image-metadata-remover': {
               // Drawing to canvas naturally strips all EXIF metadata as it only copies visual pixels
               const img = new Image();
               img.src = URL.createObjectURL(file);
               await img.decode();
               const canvas = document.createElement('canvas');
               const ctx = canvas.getContext('2d')!;
               canvas.width = img.width;
               canvas.height = img.height;
               ctx.drawImage(img, 0, 0);
               
               const format = `image/${options.format || 'jpeg'}`;
               outUrl = canvas.toDataURL(format, (options.quality || 95) / 100);
               finalSize = Math.round(outUrl.length * 0.75);
               outName = `${outName}_clean.${options.format || 'jpg'}`;
               break;
            }

            case 'image-rotator': {
               const img = new Image();
               img.src = URL.createObjectURL(file);
               await img.decode();
               const canvas = document.createElement('canvas');
               const ctx = canvas.getContext('2d')!;
               const deg = parseInt(options.rotation || "0");
               
               if (deg === 90 || deg === 270) {
                 canvas.width = img.height;
                 canvas.height = img.width;
               } else {
                 canvas.width = img.width;
                 canvas.height = img.height;
               }

               ctx.translate(canvas.width / 2, canvas.height / 2);
               ctx.rotate((deg * Math.PI) / 180);
               ctx.scale(options.flipH ? -1 : 1, options.flipV ? -1 : 1);
               ctx.drawImage(img, -img.width / 2, -img.height / 2);

               const mime = `image/${options.format || 'png'}`;
               outUrl = canvas.toDataURL(mime, 0.95);
               finalSize = Math.round(outUrl.length * 0.75);
               outName = `${outName}_rotated.${options.format || 'png'}`;
               break;
            }

            case 'background-remover': {
              const img = new Image();
              img.src = URL.createObjectURL(file);
              await img.decode();

              const segmentation = await bodyPixNet.segmentPerson(img, {
                internalResolution: 'medium',
                segmentationThreshold: 0.7,
                maxDetections: 1,
                scoreThreshold: 0.3
              });

              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d')!;
              canvas.width = img.width;
              canvas.height = img.height;
              ctx.drawImage(img, 0, 0);

              const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
              const { data } = imageData;

              for (let i = 0; i < segmentation.data.length; i++) {
                if (!segmentation.data[i]) {
                  data[i * 4 + 3] = 0; // Alpha to 0
                }
              }
              
              ctx.putImageData(imageData, 0, 0);
              
              if (options.edgeSmoothing > 0) {
                ctx.filter = `blur(${options.edgeSmoothing / 2}px)`;
                ctx.globalCompositeOperation = 'destination-in';
                ctx.drawImage(canvas, 0, 0);
              }

              outUrl = canvas.toDataURL('image/png');
              finalSize = Math.round(outUrl.length * 0.75);
              outName = `${outName}_no_bg.png`;
              break;
            }

            case 'image-converter': {
              const img = new Image();
              img.src = URL.createObjectURL(file);
              await img.decode();
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d')!;
              canvas.width = img.width;
              canvas.height = img.height;
              const format = options.format || "image/jpeg";
              if (format === "image/jpeg" && options.background !== 'transparent') {
                ctx.fillStyle = options.background === 'black' ? '#000000' : '#FFFFFF';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
              }
              ctx.drawImage(img, 0, 0);
              const quality = (options.quality || 90) / 100;
              outUrl = canvas.toDataURL(format, quality);
              finalSize = Math.round(outUrl.length * 0.75);
              const ext = format.split('/')[1].replace('jpeg', 'jpg');
              outName = `${outName}.${ext}`;
              break;
            }

            case 'image-cropper': {
              if (!imageSrc || !croppedAreaPixels) return null;
              const img = new Image();
              img.src = imageSrc;
              await img.decode();
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d')!;
              canvas.width = croppedAreaPixels.width;
              canvas.height = croppedAreaPixels.height;
              ctx.drawImage(img, croppedAreaPixels.x, croppedAreaPixels.y, croppedAreaPixels.width, croppedAreaPixels.height, 0, 0, croppedAreaPixels.width, croppedAreaPixels.height);
              const mime = `image/${options.format || 'png'}`;
              outUrl = canvas.toDataURL(mime, 0.95);
              finalSize = Math.round(outUrl.length * 0.75);
              outName = `${outName}_cropped.${options.format || 'png'}`;
              break;
            }

            case 'image-compressor': {
              const { default: imageCompression } = await getImageCompression();
              const compressedFile = await imageCompression(file, {
                maxSizeMB: options.maxWidthOrHeight > 2000 ? 2 : 1,
                maxWidthOrHeight: options.maxWidthOrHeight,
                useWebWorker: options.useWebWorker,
                initialQuality: options.quality / 100,
                fileType: options.fileType === 'original' ? undefined : options.fileType
              });
              outUrl = URL.createObjectURL(compressedFile);
              finalSize = compressedFile.size;
              outName = outName + (options.fileType === 'original' ? `.${file.name.split('.').pop()}` : `.${options.fileType.split('/')[1]}`);
              break;
            }

            case 'image-resizer': {
              const img = new Image();
              img.src = URL.createObjectURL(file);
              await img.decode();
              const canvas = document.createElement('canvas');
              let width = img.width;
              let height = img.height;
              if (options.mode === 'Percentage') {
                const scale = options.scale / 100;
                width = Math.round(img.width * scale);
                height = Math.round(img.height * scale);
              } else {
                width = options.width || img.width;
                height = options.height || img.height;
                if (options.maintainAspect) {
                  const ratio = img.width / img.height;
                  if (width / height > ratio) width = Math.round(height * ratio);
                  else height = Math.round(width / ratio);
                }
              }
              canvas.width = width;
              canvas.height = height;
              const ctx = canvas.getContext('2d')!;
              ctx.imageSmoothingEnabled = true;
              ctx.imageSmoothingQuality = 'high';
              ctx.drawImage(img, 0, 0, width, height);
              const format = options.outputFormat === 'original' ? file.type : `image/${options.outputFormat}`;
              const ext = options.outputFormat === 'original' ? file.name.split('.').pop() : options.outputFormat;
              outUrl = canvas.toDataURL(format, 0.92);
              finalSize = Math.round(outUrl.length * 0.75);
              outName = `${outName}_${width}x${height}.${ext}`;
              break;
            }

            case 'image-to-text-ocr': {
              const text = await runOCRTask(file, (p) => setProgress(Math.round(((index + p) / total) * 100)));
              setExtractedText(prev => prev + `\n--- FILE: ${file.name} ---\n${text}\n`);
              break;
            }
              
            default:
              outUrl = URL.createObjectURL(file);
              finalSize = file.size;
          }
        } catch (e) {
          console.error(e);
        }

        setProgress(Math.round(((index + 1) / total) * 100));
        return outUrl ? { url: outUrl, name: outName, size: finalSize, originalSize: file.size } : null;
      });

      const filtered = (processed as any[]).filter(item => Boolean(item));
      setResults(filtered);
      onSuccess(`Successfully processed ${filtered.length} image(s).`);
    } catch (err) {
      onError("Batch processing engine encountered an error.");
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  const handleDownload = () => {
    if (results.length > 1 && options.zipOutput) {
      downloadZip(results, `toolverse_images_${Date.now()}.zip`);
    } else {
      triggerBatchDownload(results);
    }
  };

  const inputSlot = (
    <div className="space-y-6">
      {slug === 'image-cropper' && imageSrc ? (
        <div className="relative h-[400px] md:h-[500px] bg-slate-900 rounded-[2rem] overflow-hidden border-8 border-white shadow-2xl">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={ASPECT_RATIOS[options.aspectRatio || "Free"]}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
      ) : (slug === 'image-rotator' || slug === 'image-watermark') && imageSrc ? (
        <div className="relative p-8 bg-slate-100 rounded-[2.5rem] flex items-center justify-center min-h-[300px] border border-slate-200">
           <img 
            src={imageSrc} 
            alt="Preview" 
            className="max-w-full max-h-[400px] shadow-xl rounded-xl transition-all duration-300" 
            style={slug === 'image-rotator' ? { 
              transform: `rotate(${options.rotation}deg) scaleX(${options.flipH ? -1 : 1}) scaleY(${options.flipV ? -1 : 1})` 
            } : {}} 
           />
        </div>
      ) : (
        <div className="p-10 md:p-16 border-4 border-dashed border-slate-100 rounded-[3rem] text-center hover:border-emerald-100 transition-all cursor-pointer group relative">
          <input 
            type="file" 
            accept="image/*" 
            multiple={slug !== 'image-cropper' && slug !== 'image-rotator' && slug !== 'image-watermark'}
            onChange={handleFileChange} 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
          />
          <div className="text-7xl mb-6 group-hover:scale-110 transition-transform">
            {slug === 'image-resizer' ? '📏' : slug === 'image-cropper' ? '✂️' : slug === 'image-converter' ? '🔄' : slug === 'background-remover' ? '🪄' : slug === 'image-rotator' ? '🔃' : slug === 'image-watermark' ? '🖋️' : slug === 'image-metadata-remover' ? '🕵️' : '🖼️'}
          </div>
          <p className="text-slate-900 font-black text-xl">
            {files ? `${files.length} Image(s) Ready` : "Drop Images Here"}
          </p>
          <p className="text-slate-400 text-xs font-bold mt-2 uppercase tracking-widest">JPG, PNG, WebP, HEIC supported</p>
        </div>
      )}
      
      {slug === 'image-cropper' && imageSrc && (
         <div className="flex items-center space-x-4 px-4">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Zoom Control</span>
            <input 
              type="range" 
              min={1} max={3} step={0.1} 
              value={zoom} 
              onChange={e => setZoom(Number(e.target.value))}
              className="flex-grow h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <button onClick={() => {setImageSrc(null); setFiles(null);}} className="text-[10px] font-black text-red-500 uppercase hover:underline">Reset Image</button>
         </div>
      )}
    </div>
  );

  const activeConfig = slug === 'image-compressor' ? imageCompressorConfig : slug === 'background-remover' ? backgroundRemoverConfig : slug === 'image-resizer' ? imageResizerConfig : slug === 'image-cropper' ? imageCropperConfig : slug === 'image-converter' ? imageConverterConfig : slug === 'image-rotator' ? imageRotatorConfig : slug === 'image-watermark' ? imageWatermarkConfig : slug === 'image-metadata-remover' ? imageMetadataRemoverConfig : null;

  const optionsSlot = activeConfig ? (
    <OptionsPanel 
      options={activeConfig.options as any} 
      values={options} 
      onChange={handleOptionChange} 
    />
  ) : undefined;

  const actionsSlot = (
    <button 
      disabled={loading || !files} 
      onClick={processBatch} 
      className="w-full py-6 bg-emerald-600 text-white rounded-[2rem] font-black text-xl shadow-2xl hover:bg-emerald-700 transition-all active:scale-95 disabled:opacity-50"
    >
      {loading ? `AI Processing (${progress}%)...` : slug === 'image-cropper' ? "Finalize & Crop" : "Start Processing Engine"}
    </button>
  );

  const resultSlot = (
    <div className="space-y-10">
      {results.length > 0 && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
            {results.map((r, i) => (
              <div key={i} className="group relative aspect-square bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                <img src={r.url} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center text-white">
                   <div className="text-[8px] font-black uppercase mb-1">{r.name.split('.').pop()}</div>
                   <div className="text-[9px] font-bold">{(r.size / 1024).toFixed(1)} KB</div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
             <button 
              onClick={handleDownload} 
              className="flex-grow py-5 bg-slate-900 text-white rounded-2xl font-black text-lg shadow-xl hover:bg-slate-800 transition-all"
             >
               {results.length > 1 && options.zipOutput ? 'Download All (ZIP)' : 'Download Result'}
             </button>
             <button 
              onClick={() => {
                results.forEach(r => URL.revokeObjectURL(r.url));
                setResults([]);
                if(slug === 'image-cropper' || slug === 'image-rotator' || slug === 'image-watermark') { setImageSrc(null); setFiles(null); }
              }} 
              className="py-5 px-10 bg-slate-100 text-slate-500 rounded-2xl font-black text-lg hover:bg-slate-200 transition-all"
             >
               Clear Workspace
             </button>
          </div>
        </div>
      )}

      {extractedText && (
        <div className="bg-slate-950 p-8 rounded-[2.5rem] text-left border border-slate-800 shadow-2xl relative">
           <div className="flex justify-between items-center mb-6">
             <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">OCR Output Data</span>
             <button onClick={() => { navigator.clipboard.writeText(extractedText); onSuccess("Copied!"); }} className="text-emerald-400 text-xs font-black uppercase hover:underline">Copy All</button>
           </div>
           <div className="text-sm font-mono text-emerald-500/80 whitespace-pre-wrap max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800 leading-relaxed">
             {extractedText}
           </div>
        </div>
      )}
    </div>
  );

  return (
    <ToolLayout
      title={activeConfig?.title || slug.replace(/-/g, ' ')}
      description={activeConfig?.description || `Professional ${slug.replace(/-/g, ' ')} toolkit for high-performance visual workflows.`}
      icon={activeConfig?.icon || "🖼️"}
      colorClass={activeConfig?.colorClass || "bg-emerald-500"}
      input={inputSlot}
      options={optionsSlot}
      actions={actionsSlot}
      result={(results.length > 0 || extractedText) ? resultSlot : undefined}
    />
  );
};

export default ImageTools;