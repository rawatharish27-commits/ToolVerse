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
  imageMetadataRemoverConfig,
  imageKbReducerConfig,
  imageDpiConfig,
  imageToWebpConfig,
  passportPhotoConfig,
  imageFormatConverterConfig,
  imageMetadataViewerConfig
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

const PASSPORT_PRESETS: Record<string, { w: number, h: number, unit: 'mm' | 'in' }> = {
  "Indian Passport (35x45mm)": { w: 35, h: 45, unit: 'mm' },
  "US Passport (2x2in)": { w: 2, h: 2, unit: 'in' },
  "Schengen Visa (35x45mm)": { w: 35, h: 45, unit: 'mm' },
};

const COMPRESSOR_PRESETS: Record<string, number> = {
  "High Quality (90%)": 0.9,
  "Balanced (75%)": 0.75,
  "Web Optimized (60%)": 0.6,
  "Maximum Compression (40%)": 0.4,
};

const CONVERTER_QUALITY_PRESETS: Record<string, number> = {
  "Lossless": 1.0,
  "High": 0.9,
  "Balanced": 0.75,
  "Minimum Size": 0.3
};

const ImageTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{url: string, name: string, size: number, originalSize: number}[]>([]);
  const [progress, setProgress] = useState(0);
  const [extractedText, setExtractedText] = useState('');
  const [metadataReport, setMetadataReport] = useState<any[]>([]);
  
  // Cropper State
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const [options, setOptions] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    const configs = [imageCompressorConfig, backgroundRemoverConfig, imageResizerConfig, imageCropperConfig, imageConverterConfig, imageRotatorConfig, imageWatermarkConfig, imageMetadataRemoverConfig, imageKbReducerConfig, imageDpiConfig, imageToWebpConfig, passportPhotoConfig, imageFormatConverterConfig, imageMetadataViewerConfig];
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
    
    if ((slug === 'image-cropper' || slug === 'image-rotator' || slug === 'image-watermark' || slug === 'passport-size-photo-maker' || slug === 'image-metadata-viewer') && selectedFiles && selectedFiles.length > 0) {
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
      setMetadataReport([]);
      
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
          if (slug === 'image-metadata-viewer') {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            await img.decode();
            const report = [
               { label: "File Name", value: file.name },
               { label: "Resolution", value: `${img.width} x ${img.height} px` },
               { label: "Format", value: file.type },
               { label: "Size", value: `${(file.size / 1024).toFixed(2)} KB` },
               { label: "Last Modified", value: new Date(file.lastModified).toLocaleString() }
            ];
            setMetadataReport(report);
            onSuccess("Metadata analysis complete.");
            return null;
          }

          if (slug === 'image-format-converter') {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            await img.decode();
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d')!;
            ctx.drawImage(img, 0, 0);

            const formatMap: any = { "JPG": "image/jpeg", "PNG": "image/png", "WebP": "image/webp" };
            const mime = formatMap[options.targetFormat] || "image/png";
            const quality = CONVERTER_QUALITY_PRESETS[options.qualityPreset] || options.customQuality / 100;
            
            outUrl = canvas.toDataURL(mime, quality);
            finalSize = Math.round(outUrl.length * 0.75);
            outName = `${outName}.${options.targetFormat.toLowerCase()}`;
          }

          else if (slug === 'image-compressor') {
            const { default: imageCompression } = await getImageCompression();
            let targetQuality = options.quality / 100;
            if (options.preset !== "Custom (Slider)") {
              targetQuality = COMPRESSOR_PRESETS[options.preset] || 0.75;
            }
            const compressedFile = await imageCompression(file, {
              maxSizeMB: (file.size / 1024 / 1024) > 5 ? 2 : 1,
              maxWidthOrHeight: options.maxWidthOrHeight,
              useWebWorker: options.useWebWorker,
              initialQuality: targetQuality,
              fileType: options.fileType === 'original' ? undefined : options.fileType,
              preserveExif: options.preserveExif
            });
            outUrl = URL.createObjectURL(compressedFile);
            finalSize = compressedFile.size;
            outName = outName + (options.fileType === 'original' ? `.${file.name.split('.').pop()}` : `.${options.fileType.split('/')[1]}`);
          }

          else if (slug === 'passport-size-photo-maker') {
            const img = new Image();
            img.src = imageSrc || URL.createObjectURL(file);
            await img.decode();
            const dpi = parseInt(options.dpi) || 300;
            const mmToIn = 25.4;
            let wMM = options.customWidth, hMM = options.customHeight;
            const preset = PASSPORT_PRESETS[options.preset];
            if (preset) {
               wMM = preset.unit === 'mm' ? preset.w : preset.w * mmToIn;
               hMM = preset.unit === 'mm' ? preset.h : preset.h * mmToIn;
            }
            const widthPx = Math.round((wMM / mmToIn) * dpi);
            const heightPx = Math.round((hMM / mmToIn) * dpi);
            const canvas = document.createElement('canvas');
            canvas.width = widthPx;
            canvas.height = heightPx;
            const ctx = canvas.getContext('2d')!;
            const bgMap: any = { "White": "#FFFFFF", "Light Blue": "#ADD8E6", "Off White": "#FAF9F6", "Transparent": "rgba(0,0,0,0)" };
            ctx.fillStyle = bgMap[options.bg] || "#FFFFFF";
            ctx.fillRect(0, 0, widthPx, heightPx);
            const imgRatio = img.width / img.height;
            const targetRatio = widthPx / heightPx;
            let drawW = widthPx, drawH = heightPx;
            let offsetX = 0, offsetY = 0;
            if (imgRatio > targetRatio) {
              drawW = heightPx * imgRatio;
              offsetX = (widthPx - drawW) / 2;
            } else {
              drawH = widthPx / imgRatio;
              offsetY = (heightPx - drawH) / 2;
            }
            ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
            const format = `image/${options.outputFormat || 'jpeg'}`;
            outUrl = canvas.toDataURL(format, 0.95);
            finalSize = Math.round(outUrl.length * 0.75);
            outName = `${outName}_passport.${options.outputFormat}`;
          }

          else if (slug === 'image-kb-reducer') {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            await img.decode();
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d')!;
            ctx.drawImage(img, 0, 0);
            const targetBytes = (options.targetKb || 50) * 1024;
            const format = `image/${options.format || 'jpeg'}`;
            let minQ = 0.1, maxQ = 1.0, bestBlob: Blob | null = null;
            for (let i = 0; i < 10; i++) {
              const midQ = (minQ + maxQ) / 2;
              const blob: Blob = await new Promise(r => canvas.toBlob(b => r(b!), format, midQ));
              if (blob.size > targetBytes) { maxQ = midQ; } else { bestBlob = blob; minQ = midQ; }
            }
            if (!bestBlob) { bestBlob = await new Promise(r => canvas.toBlob(b => r(b!), format, 0.05)); }
            outUrl = URL.createObjectURL(bestBlob);
            finalSize = bestBlob.size;
            outName = `${outName}_${Math.round(finalSize / 1024)}KB.${options.format}`;
          }

          else if (slug === 'image-to-webp') {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            await img.decode();
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d')!;
            ctx.drawImage(img, 0, 0);
            const quality = options.lossless ? 1.0 : (options.quality || 80) / 100;
            const blob: Blob = await new Promise(r => canvas.toBlob(b => r(b!), 'image/webp', quality));
            outUrl = URL.createObjectURL(blob);
            finalSize = blob.size;
            outName = `${outName}.webp`;
          }

          else if (slug === 'image-dpi-checker') {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            await img.decode();
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d')!;
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const quality = options.targetDpi >= 300 ? 0.95 : 0.85;
            const format = `image/${options.format || 'jpeg'}`;
            outUrl = canvas.toDataURL(format, quality);
            finalSize = Math.round(outUrl.length * 0.75);
            outName = `${outName}_${options.targetDpi}dpi.${options.format}`;
          }

          else if (slug === 'image-watermark') {
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
               if (options.position === "Center") { x = (canvas.width - metrics.width) / 2; y = (canvas.height + fontSize) / 2; } 
               else if (options.position === "Top-Right") { x = canvas.width - metrics.width - padding; } 
               else if (options.position === "Bottom-Left") { y = canvas.height - padding; } 
               else if (options.position === "Bottom-Right") { x = canvas.width - metrics.width - padding; y = canvas.height - padding; }
               ctx.fillText(text, x, y);
               outUrl = canvas.toDataURL('image/png', 0.95);
               finalSize = Math.round(outUrl.length * 0.75);
               outName = `${outName}_watermarked.png`;
          }

          else if (slug === 'image-metadata-remover') {
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
          }

          else if (slug === 'image-rotator') {
               const img = new Image();
               img.src = URL.createObjectURL(file);
               await img.decode();
               const canvas = document.createElement('canvas');
               const ctx = canvas.getContext('2d')!;
               const deg = parseInt(options.rotation || "0");
               if (deg === 90 || deg === 270) { canvas.width = img.height; canvas.height = img.width; } else { canvas.width = img.width; canvas.height = img.height; }
               ctx.translate(canvas.width / 2, canvas.height / 2);
               ctx.rotate((deg * Math.PI) / 180);
               ctx.scale(options.flipH ? -1 : 1, options.flipV ? -1 : 1);
               ctx.drawImage(img, -img.width / 2, -img.height / 2);
               const mime = `image/${options.format || 'png'}`;
               outUrl = canvas.toDataURL(mime, 0.95);
               finalSize = Math.round(outUrl.length * 0.75);
               outName = `${outName}_rotated.${options.format || 'png'}`;
          }

          else if (slug === 'background-remover') {
              const img = new Image();
              img.src = URL.createObjectURL(file);
              await img.decode();
              const segmentation = await bodyPixNet.segmentPerson(img, { internalResolution: 'medium', segmentationThreshold: 0.7, maxDetections: 1, scoreThreshold: 0.3 });
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d')!;
              canvas.width = img.width; canvas.height = img.height;
              ctx.drawImage(img, 0, 0);
              const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
              const { data } = imageData;
              for (let i = 0; i < segmentation.data.length; i++) { if (!segmentation.data[i]) { data[i * 4 + 3] = 0; } }
              ctx.putImageData(imageData, 0, 0);
              if (options.edgeSmoothing > 0) { ctx.filter = `blur(${options.edgeSmoothing / 2}px)`; ctx.globalCompositeOperation = 'destination-in'; ctx.drawImage(canvas, 0, 0); }
              outUrl = canvas.toDataURL('image/png');
              finalSize = Math.round(outUrl.length * 0.75);
              outName = `${outName}_no_bg.png`;
          }

          else if (slug === 'image-converter') {
              const img = new Image();
              img.src = URL.createObjectURL(file);
              await img.decode();
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d')!;
              canvas.width = img.width; canvas.height = img.height;
              const format = options.format || "image/jpeg";
              if (format === "image/jpeg" && options.background !== 'transparent') { ctx.fillStyle = options.background === 'black' ? '#000000' : '#FFFFFF'; ctx.fillRect(0, 0, canvas.width, canvas.height); }
              ctx.drawImage(img, 0, 0);
              const quality = (options.quality || 90) / 100;
              outUrl = canvas.toDataURL(format, quality);
              finalSize = Math.round(outUrl.length * 0.75);
              const ext = format.split('/')[1].replace('jpeg', 'jpg');
              outName = `${outName}.${ext}`;
          }

          else if (slug === 'image-cropper') {
              if (!imageSrc || !croppedAreaPixels) return null;
              const img = new Image(); img.src = imageSrc; await img.decode();
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d')!;
              canvas.width = croppedAreaPixels.width; canvas.height = croppedAreaPixels.height;
              ctx.drawImage(img, croppedAreaPixels.x, croppedAreaPixels.y, croppedAreaPixels.width, croppedAreaPixels.height, 0, 0, croppedAreaPixels.width, croppedAreaPixels.height);
              const mime = `image/${options.format || 'png'}`;
              outUrl = canvas.toDataURL(mime, 0.95);
              finalSize = Math.round(outUrl.length * 0.75);
              outName = `${outName}_cropped.${options.format || 'png'}`;
          }

          else if (slug === 'image-resizer') {
              const img = new Image(); img.src = URL.createObjectURL(file); await img.decode();
              const canvas = document.createElement('canvas');
              let width = img.width; let height = img.height;
              if (options.mode === 'Percentage') { const scale = options.scale / 100; width = Math.round(img.width * scale); height = Math.round(img.height * scale); } 
              else { width = options.width || img.width; height = options.height || img.height; if (options.maintainAspect) { const ratio = img.width / img.height; if (width / height > ratio) width = Math.round(height * ratio); else height = Math.round(width / ratio); } }
              canvas.width = width; canvas.height = height;
              const ctx = canvas.getContext('2d')!; ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
              ctx.drawImage(img, 0, 0, width, height);
              const format = options.outputFormat === 'original' ? file.type : `image/${options.outputFormat}`;
              const ext = options.outputFormat === 'original' ? file.name.split('.').pop() : options.outputFormat;
              outUrl = canvas.toDataURL(format, 0.92);
              finalSize = Math.round(outUrl.length * 0.75);
              outName = `${outName}_${width}x${height}.${ext}`;
          }

          else if (slug === 'image-to-text-ocr') {
              const text = await runOCRTask(file, (p) => setProgress(Math.round(((index + p) / total) * 100)));
              setExtractedText(prev => prev + `\n--- FILE: ${file.name} ---\n${text}\n`);
          }
        } catch (e) {
          console.error(e);
        }

        setProgress(Math.round(((index + 1) / total) * 100));
        return outUrl ? { url: outUrl, name: outName, size: finalSize, originalSize: file.size } : null;
      });

      const filtered = (processed as any[]).filter(item => Boolean(item));
      if (filtered.length > 0) {
        setResults(filtered);
        onSuccess(`Successfully processed ${filtered.length} image(s).`);
      }
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
      ) : (slug === 'image-rotator' || slug === 'image-watermark' || slug === 'passport-size-photo-maker' || slug === 'image-metadata-viewer') && imageSrc ? (
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
            multiple={slug !== 'image-cropper' && slug !== 'image-rotator' && slug !== 'image-watermark' && slug !== 'passport-size-photo-maker' && slug !== 'image-metadata-viewer'}
            onChange={handleFileChange} 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
          />
          <div className="text-7xl mb-6 group-hover:scale-110 transition-transform">
            {slug === 'image-resizer' ? '📏' : slug === 'image-cropper' ? '✂️' : slug === 'image-converter' || slug === 'image-format-converter' ? '🔄' : slug === 'background-remover' ? '🪄' : slug === 'image-rotator' ? '🔃' : slug === 'image-watermark' ? '🖋️' : slug === 'image-metadata-remover' || slug === 'image-metadata-viewer' ? '🕵️' : slug === 'image-kb-reducer' ? '📉' : slug === 'image-to-webp' ? '🕸️' : slug === 'passport-size-photo-maker' ? '🛂' : '🖼️'}
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

  const activeConfig = [
    imageCompressorConfig, backgroundRemoverConfig, imageResizerConfig, imageCropperConfig, 
    imageConverterConfig, imageRotatorConfig, imageWatermarkConfig, imageMetadataRemoverConfig,
    imageKbReducerConfig, imageDpiConfig, imageToWebpConfig, passportPhotoConfig, imageFormatConverterConfig, imageMetadataViewerConfig
  ].find(c => c.slug === slug) || null;

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
      {loading ? `AI Processing (${progress}%)...` : slug === 'image-cropper' ? "Finalize & Crop" : slug === 'image-metadata-viewer' ? "View Hidden Metadata" : "Start Processing Engine"}
    </button>
  );

  const resultSlot = (
    <div className="space-y-10">
      {metadataReport.length > 0 && (
         <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-inner">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 px-1">File Integrity Audit</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {metadataReport.map((item, i) => (
                 <div key={i} className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{item.label}</span>
                    <span className="text-xs font-black text-slate-900 truncate ml-4">{item.value}</span>
                 </div>
               ))}
            </div>
            {options.showAdvanced && (
               <div className="mt-8 bg-slate-900 p-6 rounded-2xl border border-slate-800">
                  <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-2">Internal Headers</div>
                  <pre className="text-emerald-400 font-mono text-[10px] overflow-auto scrollbar-thin scrollbar-thumb-slate-800">
                    {"MIME-Version: 1.0\nContent-Type: " + files![0].type + "\nX-ToolVerse-Audit: Pass"}
                  </pre>
               </div>
            )}
         </div>
      )}

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
                if(slug === 'image-cropper' || slug === 'image-rotator' || slug === 'image-watermark' || slug === 'passport-size-photo-maker' || slug === 'image-metadata-viewer') { setImageSrc(null); setFiles(null); }
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
      result={(results.length > 0 || extractedText || metadataReport.length > 0) ? resultSlot : undefined}
    />
  );
};

export default ImageTools;