import React, { useState, useCallback, useMemo } from 'react';
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { 
  backgroundBlurConfig, imageCompressorConfig, imageFormatConverterConfig, 
  imageMetadataViewerConfig, imagePaletteExtractorConfig, imageShadowGeneratorConfig,
  imagePrintSizeConfig, imageAuthenticityConfig, imageUploadFailureConfig,
  imageMetadataRemoverConfig, backgroundRemoverNonAIConfig, formImageFixerConfig,
  signatureFixerConfig, blurSimulatorConfig, socialCompressionPreviewConfig,
  stretchingPredictorConfig, pixelToKbConfig,
  cameraVsScreenshotConfig, photoClarityConfig, printVsScreenConfig
} from '../../config/imageTools';
import { imageBlurUploadSimulator } from '../../tools/executors/imageBlurUploadSimulator';
import { socialMediaCompressionPreview } from '../../tools/executors/socialMediaCompressionPreview';
import { imageStretchingIssuePredictor } from '../../tools/executors/imageStretchingIssuePredictor';
import { pixelToKbCalculator } from '../../tools/executors/pixelToKbCalculator';
import { cameraVsScreenshotTool } from '../../tools/executors/cameraVsScreenshotTool';
import { photoClarityAnalyzer } from '../../tools/executors/photoClarityAnalyzer';
import { printVsScreenDifferenceTool } from '../../tools/executors/printVsScreenDifferenceTool';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const ImageTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [analysisData, setAnalysisData] = useState<any>(null);

  const activeConfig = useMemo(() => [
    backgroundBlurConfig, imageCompressorConfig, imageFormatConverterConfig, 
    imageMetadataViewerConfig, imagePaletteExtractorConfig, imageShadowGeneratorConfig,
    imagePrintSizeConfig, imageAuthenticityConfig, imageUploadFailureConfig,
    imageMetadataRemoverConfig, backgroundRemoverNonAIConfig, formImageFixerConfig,
    signatureFixerConfig, blurSimulatorConfig, socialCompressionPreviewConfig,
    stretchingPredictorConfig, pixelToKbConfig,
    cameraVsScreenshotConfig, photoClarityConfig, printVsScreenConfig
  ].find(c => c.slug === slug) || imageCompressorConfig, [slug]);

  const [options, setOptions] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    activeConfig.options.forEach((opt: any) => initial[opt.id] = opt.default);
    return initial;
  });

  const isLogicOnly = [
    'social-media-compression-preview', 
    'image-stretching-issue-predictor', 
    'pixel-to-kb-calculator',
    'camera-vs-screenshot-quality-tool',
    'photo-clarity-analyzer',
    'print-vs-screen-image-difference-tool'
  ].includes(slug);

  const processImage = async () => {
    if (!imageSrc && !isLogicOnly && slug !== 'image-blur-upload-simulator') return;
    setLoading(true);
    try {
      if (slug === 'image-blur-upload-simulator') {
        const img = new Image();
        img.src = imageSrc || "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=400";
        await new Promise(r => img.onload = r);
        const result = imageBlurUploadSimulator({
          platform: options.platform,
          originalQuality: options.originalQuality,
          widthPx: img.width,
          heightPx: img.height
        });
        setAnalysisData(result);
        onSuccess("Simulation Complete!");
      }

      else if (slug === 'social-media-compression-preview') {
        const result = socialMediaCompressionPreview({
          platform: options.platform,
          imageType: options.imageType,
          fileSizeKB: options.fileSizeKB
        });
        setAnalysisData(result);
        onSuccess("Preview Analysis Ready!");
      }

      else if (slug === 'image-stretching-issue-predictor') {
        const result = imageStretchingIssuePredictor({
          originalWidth: options.originalWidth,
          originalHeight: options.originalHeight,
          targetWidth: options.targetWidth,
          targetHeight: options.targetHeight,
          context: options.context
        });
        setAnalysisData(result);
        onSuccess("Stretching Prediction Complete!");
      }

      else if (slug === 'pixel-to-kb-calculator') {
        const result = pixelToKbCalculator({
          widthPx: options.widthPx,
          heightPx: options.heightPx,
          format: options.format,
          quality: options.quality
        });
        setAnalysisData(result);
        onSuccess("Size Estimation Complete!");
      }

      else if (slug === 'camera-vs-screenshot-quality-tool') {
        const result = cameraVsScreenshotTool({
          source: options.source,
          useCase: options.useCase,
          compressionLevel: options.compressionLevel,
          containsText: options.containsText
        });
        setAnalysisData(result);
        onSuccess("Quality Duel Complete!");
      }

      else if (slug === 'photo-clarity-analyzer') {
        const result = photoClarityAnalyzer({
          symptom: options.symptom,
          source: options.source,
          useCase: options.useCase,
          lighting: options.lighting,
          motionBlur: options.motionBlur
        });
        setAnalysisData(result);
        onSuccess("Clarity Logic Dispatched!");
      }

      else if (slug === 'print-vs-screen-image-difference-tool') {
        const result = printVsScreenDifferenceTool({
          output: options.output,
          paperType: options.paperType,
          printerType: options.printerType,
          colorMode: options.colorMode,
          brightnessAdjusted: options.brightnessAdjusted
        });
        setAnalysisData(result);
        onSuccess("Difference Audit Ready!");
      }
      
      else {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
        const img = new Image();
        img.src = imageSrc!;
        await new Promise(r => img.onload = r);
        
        canvas.width = img.width;
        canvas.height = img.height;

        if (slug === 'signature-upload-fixer') {
          ctx.drawImage(img, 0, 0);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          const T = options.threshold;

          for (let i = 0; i < data.length; i += 4) {
            const avg = (data[i] + data[i+1] + data[i+2]) / 3;
            const val = avg < T ? 0 : 255;
            data[i] = data[i+1] = data[i+2] = val;
          }
          ctx.putImageData(imageData, 0, 0);

          if (options.autoCrop) {
            let minX = canvas.width, minY = canvas.height, maxX = 0, maxY = 0;
            for (let y = 0; y < canvas.height; y++) {
              for (let x = 0; x < canvas.width; x++) {
                const idx = (y * canvas.width + x) * 4;
                if (data[idx] === 0) {
                  if (x < minX) minX = x;
                  if (x > maxX) maxX = x;
                  if (y < minY) minY = y;
                  if (y > maxY) maxY = y;
                }
              }
            }
            if (maxX > minX) {
              const pad = options.outputPadding;
              const cropW = (maxX - minX) + (pad * 2);
              const cropH = (maxY - minY) + (pad * 2);
              const temp = document.createElement('canvas');
              temp.width = cropW;
              temp.height = cropH;
              const tCtx = temp.getContext('2d')!;
              tCtx.fillStyle = '#FFFFFF';
              tCtx.fillRect(0, 0, cropW, cropH);
              tCtx.drawImage(canvas, minX, minY, maxX - minX, maxY - minY, pad, pad, maxX - minX, maxY - minY);
              const blob: Blob = await new Promise(r => temp.toBlob(b => r(b!), 'image/jpeg', 0.9));
              setOutputUrl(URL.createObjectURL(blob));
            } else {
              const blob: Blob = await new Promise(r => canvas.toBlob(b => r(b!), 'image/jpeg', 0.9));
              setOutputUrl(URL.createObjectURL(blob));
            }
          } else {
            const blob: Blob = await new Promise(r => canvas.toBlob(b => r(b!), 'image/jpeg', 0.9));
            setOutputUrl(URL.createObjectURL(blob));
          }
          onSuccess("Signature Cleaned!");
        }

        else if (slug === 'form-image-auto-fixer') {
          ctx.drawImage(img, 0, 0);
          ctx.filter = options.grayscale ? 'grayscale(100%) contrast(150%) brightness(110%)' : 'contrast(120%) brightness(105%)';
          ctx.drawImage(img, 0, 0);
          const blob: Blob = await new Promise(r => canvas.toBlob(b => r(b!), 'image/jpeg', 0.85));
          setOutputUrl(URL.createObjectURL(blob));
          onSuccess("Form photo optimized!");
        }
      }
    } catch (e) {
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
        isLogicOnly ? (
          <div className="py-12 bg-slate-50/50 rounded-[3rem] border border-dashed border-slate-200 text-center">
             <div className="text-7xl mb-4 opacity-50">{activeConfig.icon}</div>
             <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest">Diagnostic Engine Active</p>
             <p className="text-slate-400 text-[8px] font-bold mt-2 uppercase tracking-widest px-8">Input your parameters in the panel to simulate the effect</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className={`p-16 border-4 border-dashed border-slate-100 rounded-[3rem] text-center hover:border-emerald-100 cursor-pointer relative group ${slug === 'image-blur-upload-simulator' && !imageSrc ? 'bg-slate-50' : ''}`}>
                <input type="file" accept="image/*" onChange={e => {
                  const f = e.target.files?.[0];
                  if (f) {
                    const r = new FileReader();
                    r.onload = () => { setImageSrc(r.result as string); setAnalysisData(null); setOutputUrl(null); };
                    r.readAsDataURL(f);
                  }
                }} className="absolute inset-0 w-full h-full opacity-0 z-10" />
                <div className="text-7xl mb-6 group-hover:scale-110 transition-transform">🖼️</div>
                <p className="font-black text-slate-700">{imageSrc ? "Image Ready" : "Upload Image to Test"}</p>
                {slug === 'image-blur-upload-simulator' && !imageSrc && <p className="text-[10px] font-bold text-slate-400 mt-2">Will use standard test pattern if no image uploaded</p>}
            </div>
          </div>
        )
      }
      options={<OptionsPanel options={activeConfig.options as any} values={options} onChange={(id, v) => setOptions(p => ({...p, [id]: v}))} />}
      actions={<button onClick={processImage} disabled={loading} className={`w-full py-7 ${activeConfig.colorClass} text-white rounded-[2.5rem] font-black text-2xl shadow-2xl transition-all`}>Run Logic Core</button>}
      result={(outputUrl || analysisData) && (
        <div className="space-y-10 animate-in zoom-in-95">
           {analysisData && (
             <div className="grid grid-cols-1 gap-4">
                {Object.entries(analysisData).map(([k, v]) => (
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
           {outputUrl && (
             <div className="text-center">
               <img src={outputUrl} className="max-h-96 mx-auto rounded-[2rem] shadow-2xl border-4 border-white mb-6" />
               <a href={outputUrl} download="toolverse_optimized.jpg" className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest">Download Asset</a>
             </div>
           )}
        </div>
      )}
    />
  );
};

export default ImageTools;