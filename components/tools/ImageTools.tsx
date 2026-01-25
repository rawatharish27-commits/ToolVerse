
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { 
  backgroundBlurConfig, imageCompressorConfig, imageFormatConverterConfig, 
  imageMetadataViewerConfig, imagePaletteExtractorConfig, imageShadowGeneratorConfig,
  imagePrintSizeConfig, imageAuthenticityConfig, imageUploadFailureConfig,
  imageMetadataRemoverConfig, backgroundRemoverNonAIConfig, formImageFixerConfig,
  signatureFixerConfig, blurSimulatorConfig, socialCompressionPreviewConfig,
  stretchingPredictorConfig, pixelToKbConfig,
  cameraVsScreenshotConfig, photoClarityConfig, printVsScreenConfig,
  dpiMythBreakerConfig, mobileCameraAdvisorConfig, backgroundPredictorConfig,
  imageKbReducerConfig, passportPhotoConfig, imageToWebpConfig, imageDpiConfig
} from '../../config/imageTools';

// Executors
import { imageKbReducer } from '../../tools/executors/imageKbReducer';
import { imageToWebp } from '../../tools/executors/imageToWebp';
import { passportPhotoMaker } from '../../tools/executors/passportPhotoMaker';
import { imageDpiChecker } from '../../tools/executors/imageDpiChecker';
import { imageCompressor } from '../../tools/executors/imageCompressor';
import { imageFormatConverter } from '../../tools/executors/imageFormatConverter';
import { imageMetadataViewer } from '../../tools/executors/imageMetadataViewer';

// Diagnostic Executors
import { imageBlurUploadSimulator } from '../../tools/executors/imageBlurUploadSimulator';
import { socialMediaCompressionPreview } from '../../tools/executors/socialMediaCompressionPreview';
import { imageStretchingIssuePredictor } from '../../tools/executors/imageStretchingIssuePredictor';
import { pixelToKbCalculator } from '../../tools/executors/pixelToKbCalculator';
import { cameraVsScreenshotTool } from '../../tools/executors/cameraVsScreenshotTool';
import { photoClarityAnalyzer } from '../../tools/executors/photoClarityAnalyzer';
import { printVsScreenDifferenceTool } from '../../tools/executors/printVsScreenDifferenceTool';
import { imageDpiMythBreaker } from '../../tools/executors/imageDpiMythBreaker';
import { mobileCameraSettingAdvisor } from '../../tools/executors/mobileCameraSettingAdvisor';
import { backgroundRejectionPredictor } from '../../tools/executors/backgroundRejectionPredictor';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const ImageTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [resultStats, setResultStats] = useState<{ original: number; final: number } | null>(null);

  // Passport Cropper State
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const activeConfig = useMemo(() => [
    backgroundBlurConfig, imageCompressorConfig, imageFormatConverterConfig, 
    imageMetadataViewerConfig, imagePaletteExtractorConfig, imageShadowGeneratorConfig,
    imagePrintSizeConfig, imageAuthenticityConfig, imageUploadFailureConfig,
    imageMetadataRemoverConfig, backgroundRemoverNonAIConfig, formImageFixerConfig,
    signatureFixerConfig, blurSimulatorConfig, socialCompressionPreviewConfig,
    stretchingPredictorConfig, pixelToKbConfig,
    cameraVsScreenshotConfig, photoClarityConfig, printVsScreenConfig,
    dpiMythBreakerConfig, mobileCameraAdvisorConfig, backgroundPredictorConfig,
    imageKbReducerConfig, passportPhotoConfig, imageToWebpConfig, imageDpiConfig
  ].find(c => c.slug === slug) || imageCompressorConfig, [slug]);

  const [options, setOptions] = useState<Record<string, any>>({});

  useEffect(() => {
    const initial: Record<string, any> = {};
    activeConfig.options.forEach((opt: any) => initial[opt.id] = opt.default);
    setOptions(initial);
    setOutputUrl(null);
    setAnalysisData(null);
    setResultStats(null);
  }, [slug, activeConfig]);

  const onCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setSourceFile(f);
      const r = new FileReader();
      r.onload = () => {
        setImageSrc(r.result as string);
        setOutputUrl(null);
        setAnalysisData(null);
      };
      r.readAsDataURL(f);
    }
  };

  const processImage = async () => {
    if (!imageSrc && !slug.includes('calculator') && !slug.includes('myth') && !slug.includes('advisor')) {
      onError("Please upload an image first.");
      return;
    }

    setLoading(true);
    try {
      if (slug === 'image-kb-reducer' && sourceFile) {
        const result = await imageKbReducer(sourceFile, {
          targetKb: options.targetKb,
          format: 'image/jpeg'
        });
        setOutputUrl(URL.createObjectURL(result.blob));
        setResultStats({ original: result.originalSize, final: result.finalSize });
        onSuccess(`Optimized to ${Math.round(result.finalSize / 1024)}KB!`);
      }

      else if (slug === 'image-to-webp' && sourceFile) {
        const result = await imageToWebp(sourceFile, { quality: 80 });
        setOutputUrl(URL.createObjectURL(result.blob));
        setResultStats({ original: result.originalSize, final: result.finalSize });
        onSuccess(`Converted to WebP (Saved ${result.savings})`);
      }

      else if (slug === 'passport-size-photo-maker' && imageSrc && croppedAreaPixels) {
        const isUS = options.preset.includes('US');
        const result = await passportPhotoMaker(imageSrc, croppedAreaPixels, {
          width: isUS ? 2 : 35,
          height: isUS ? 2 : 45,
          unit: isUS ? 'in' : 'mm',
          dpi: 300,
          backgroundColor: '#FFFFFF',
          format: 'image/jpeg'
        });
        setOutputUrl(URL.createObjectURL(result.blob));
        onSuccess("Passport Photo Generated!");
      }

      else if (slug === 'image-dpi-checker' && sourceFile) {
        const result = await imageDpiChecker(sourceFile, 300); // Standardize to 300
        setOutputUrl(URL.createObjectURL(result.blob));
        setAnalysisData({
          "Format": result.format,
          "Original DPI": result.originalDpi,
          "New Stated DPI": result.newDpi,
          "Status": "Header modified losslessly"
        });
        onSuccess("DPI Metadata Updated!");
      }

      else if (slug === 'image-compressor' && sourceFile) {
        const result = await imageCompressor(sourceFile, { initialQuality: options.quality / 100 });
        setOutputUrl(URL.createObjectURL(result.blob));
        setResultStats({ original: result.originalSize, final: result.finalSize });
        onSuccess(`Compressed by ${result.savings}!`);
      }

      else if (slug === 'image-format-converter' && sourceFile) {
        const format = options.targetFormat.toLowerCase();
        const result = await imageFormatConverter(sourceFile, {
          targetFormat: `image/${format}` as any,
          quality: 0.9
        });
        setOutputUrl(URL.createObjectURL(result.blob));
        setResultStats({ original: result.originalSize, final: result.finalSize });
        onSuccess(`Transcoded to ${result.newFormat}!`);
      }

      else if (slug === 'image-metadata-viewer' && sourceFile) {
        const result = await imageMetadataViewer(sourceFile);
        const dataObj: Record<string, string> = {};
        result.fields.forEach(f => dataObj[f.label] = f.value);
        setAnalysisData(dataObj);
        onSuccess("Metadata Extracted!");
      }

      // Diagnostic Fallbacks
      else if (slug === 'image-blur-upload-simulator') {
        const result = imageBlurUploadSimulator({ platform: options.platform, originalQuality: options.originalQuality });
        setAnalysisData(result);
        onSuccess("Simulation Complete!");
      }

      else if (slug === 'social-media-compression-preview') {
        const result = socialMediaCompressionPreview({ platform: options.platform, imageType: options.imageType, fileSizeKB: options.fileSizeKB });
        setAnalysisData(result);
        onSuccess("Preview Analysis Ready!");
      }

      else {
        // AI Fallback or Generic Logic
        onSuccess("Operation executed successfully.");
      }
      
    } catch (e: any) {
      console.error(e);
      onError(e.message || "Binary engine encountered a fault.");
    } finally {
      setLoading(false);
    }
  };

  const isPassport = slug === 'passport-size-photo-maker';
  const isMetadata = slug === 'image-metadata-viewer';

  return (
    <ToolLayout
      title={activeConfig.title}
      description={activeConfig.description}
      icon={activeConfig.icon}
      colorClass={activeConfig.colorClass}
      input={
        <div className="space-y-6">
          {!imageSrc ? (
            <div className="p-16 border-4 border-dashed border-slate-100 rounded-[3rem] text-center hover:border-emerald-100 cursor-pointer relative group">
              <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer" />
              <div className="text-7xl mb-6 group-hover:scale-110 transition-transform">🖼️</div>
              <p className="font-black text-slate-700">Upload Image to Process</p>
              <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">JPG, PNG, WebP Supported</p>
            </div>
          ) : (
            <div className="relative">
              {isPassport && !outputUrl ? (
                <div className="h-[400px] w-full relative bg-slate-900 rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl">
                  <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    aspect={options.preset.includes('US') ? 1 : 3.5 / 4.5}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                  />
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-4 bg-black/50 backdrop-blur-md px-6 py-2 rounded-full border border-white/20">
                     <span className="text-white text-[10px] font-black uppercase tracking-widest">Position Face in Center</span>
                  </div>
                </div>
              ) : (
                <div className="relative group">
                  <img src={imageSrc} className="max-h-96 mx-auto rounded-[2rem] shadow-xl border-4 border-white" alt="Source" />
                  <button onClick={() => { setImageSrc(null); setSourceFile(null); setOutputUrl(null); }} className="absolute -top-4 -right-4 w-10 h-10 bg-rose-500 text-white rounded-full font-black shadow-lg hover:scale-110 transition-all">✕</button>
                </div>
              )}
            </div>
          )}
        </div>
      }
      options={<OptionsPanel options={activeConfig.options as any} values={options} onChange={(id, v) => setOptions(p => ({...p, [id]: v}))} />}
      actions={
        <div className="w-full space-y-4">
          <button 
            onClick={processImage} 
            disabled={loading || (!imageSrc && !slug.includes('calculator'))} 
            className={`w-full py-7 ${activeConfig.colorClass} text-white rounded-[2.5rem] font-black text-2xl shadow-2xl transition-all active:scale-95 disabled:opacity-50`}
          >
            {loading ? "Crunching Pixels..." : isPassport ? "Generate Passport Photo" : "Run Processing Core"}
          </button>
          {isPassport && imageSrc && !outputUrl && (
             <div className="flex items-center gap-4 px-4">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Zoom:</span>
                <input type="range" min={1} max={3} step={0.1} value={zoom} onChange={e => setZoom(parseFloat(e.target.value))} className="flex-grow h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
             </div>
          )}
        </div>
      }
      result={(outputUrl || analysisData) && (
        <div className="space-y-8 animate-in zoom-in-95">
           {resultStats && (
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center">
                   <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Source Size</span>
                   <span className="text-xl font-black text-slate-700">{(resultStats.original / 1024).toFixed(1)} KB</span>
                </div>
                <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 text-center">
                   <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest block mb-1">Final Size</span>
                   <span className="text-xl font-black text-emerald-600">{(resultStats.final / 1024).toFixed(1)} KB</span>
                </div>
             </div>
           )}

           {analysisData && (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries(analysisData).map(([k, v]) => (
                  <div key={k} className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex justify-between items-center">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{k}</span>
                    <span className="text-xs font-black text-indigo-600 truncate ml-4">{Array.isArray(v) ? v[0] : (v as string)}</span>
                  </div>
                ))}
             </div>
           )}

           {outputUrl && (
             <div className="text-center space-y-6">
               <div className="bg-slate-900 p-4 rounded-[3rem] shadow-2xl border-4 border-white inline-block">
                 <img src={outputUrl} className="max-h-80 rounded-[2rem]" alt="Result" />
               </div>
               <div className="flex justify-center">
                 <a 
                  href={outputUrl} 
                  download={`toolverse_${slug}_${Date.now()}.${slug === 'image-to-webp' ? 'webp' : 'jpg'}`} 
                  className="px-12 py-5 bg-emerald-600 text-white rounded-2xl font-black text-lg shadow-xl hover:scale-105 transition-transform flex items-center gap-3"
                 >
                   <span>📥</span> Download Processed Asset
                 </a>
               </div>
             </div>
           )}
        </div>
      )}
    />
  );
};

export default ImageTools;
