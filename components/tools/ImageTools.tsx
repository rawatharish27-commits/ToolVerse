
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { TOOLS } from '../../data/tools';
import { 
  imageCompressorConfig, imageFormatConverterConfig, 
  imageMetadataViewerConfig, imagePaletteExtractorConfig, imageShadowGeneratorConfig,
  imagePrintSizeConfig, imageAuthenticityConfig, imageUploadFailureConfig,
  imageMetadataRemoverConfig, backgroundRemoverNonAIConfig, formImageFixerConfig,
  signatureFixerConfig, blurSimulatorConfig, socialCompressionPreviewConfig,
  stretchingPredictorConfig, pixelToKbConfig,
  cameraVsScreenshotConfig, photoClarityConfig, printVsScreenConfig,
  dpiMythBreakerConfig, mobileCameraAdvisorConfig, backgroundPredictorConfig,
  imageKbReducerConfig, passportPhotoConfig, imageToWebpConfig, imageDpiConfig,
  imageSizeReducerKbSelectorConfig, imageDpiCheckerNewConfig, imageCompressorQcConfig,
  imageFormatNewConfig, imageMetadataViewerNewConfig
} from '../../config/imageTools';

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

  // Cropper State
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const toolNode = useMemo(() => TOOLS.find(t => t.slug === slug), [slug]);
  const activeConfig = useMemo(() => [
    imageCompressorConfig, imageFormatConverterConfig, 
    imageMetadataViewerConfig, imagePaletteExtractorConfig, imageShadowGeneratorConfig,
    imagePrintSizeConfig, imageAuthenticityConfig, imageUploadFailureConfig,
    imageMetadataRemoverConfig, backgroundRemoverNonAIConfig, formImageFixerConfig,
    signatureFixerConfig, blurSimulatorConfig, socialCompressionPreviewConfig,
    stretchingPredictorConfig, pixelToKbConfig,
    cameraVsScreenshotConfig, photoClarityConfig, printVsScreenConfig,
    dpiMythBreakerConfig, mobileCameraAdvisorConfig, backgroundPredictorConfig,
    imageKbReducerConfig, passportPhotoConfig, imageToWebpConfig, imageDpiConfig,
    imageSizeReducerKbSelectorConfig, imageDpiCheckerNewConfig, imageCompressorQcConfig,
    imageFormatNewConfig, imageMetadataViewerNewConfig
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
      r.onload = () => { setImageSrc(r.result as string); setOutputUrl(null); setAnalysisData(null); };
      r.readAsDataURL(f);
    }
  };

  const processImage = async () => {
    if (!toolNode?.execute) { onError("Logic node execution not defined for this tool."); return; }
    if (!imageSrc && !slug.includes('myth')) { onError("Source image required."); return; }

    setLoading(true);
    try {
      let result;
      if (slug === 'passport-size-photo-maker') {
        const isUS = options.preset.includes('US');
        result = await toolNode.execute(imageSrc, {
          width: isUS ? 2 : 35,
          height: isUS ? 2 : 45,
          unit: isUS ? 'in' : 'mm',
          dpi: 300,
          backgroundColor: '#FFFFFF',
          crop: croppedAreaPixels
        });
      } else {
        result = await toolNode.execute(sourceFile || options, options);
      }

      if (result.blob) setOutputUrl(URL.createObjectURL(result.blob));
      if (result.data) setAnalysisData(result.data);
      if (result.finalSize) setResultStats({ original: result.originalSize, final: result.finalSize });
      
      onSuccess("Operation Successful");
    } catch (e: any) {
      onError(e.message || "Logic Engine Fault.");
    } finally {
      setLoading(false);
    }
  };

  const isPassport = slug === 'passport-size-photo-maker';

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
            </div>
          ) : (
            <div className="relative">
              {isPassport && !outputUrl ? (
                <div className="h-[400px] w-full relative bg-slate-900 rounded-[2rem] overflow-hidden">
                  <Cropper image={imageSrc} crop={crop} zoom={zoom} aspect={options.preset?.includes('US') ? 1 : 3.5 / 4.5} onCropChange={setCrop} onZoomChange={setZoom} onCropComplete={onCropComplete} />
                </div>
              ) : (
                <div className="relative group text-center">
                  <img src={imageSrc} className="max-h-96 mx-auto rounded-[2rem] shadow-xl border-4 border-white" alt="Source" />
                </div>
              )}
            </div>
          )}
        </div>
      }
      options={<OptionsPanel options={activeConfig.options as any} values={options} onChange={(id, v) => setOptions(p => ({...p, [id]: v}))} />}
      actions={<button onClick={processImage} disabled={loading} className={`w-full py-7 ${activeConfig.colorClass} text-white rounded-[2.5rem] font-black text-2xl shadow-2xl`}>{loading ? "Crunching..." : "Execute Logic"}</button>}
      result={(outputUrl || analysisData) && (
        <div className="space-y-8 animate-in zoom-in-95">
           {resultStats && (
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-6 rounded-2xl text-center"><span className="text-[9px] font-black text-slate-400 block uppercase">Before</span><span className="text-xl font-black">{(resultStats.original / 1024).toFixed(1)} KB</span></div>
                <div className="bg-emerald-50 p-6 rounded-2xl text-center"><span className="text-[9px] font-black text-emerald-500 block uppercase">After</span><span className="text-xl font-black text-emerald-600">{(resultStats.final / 1024).toFixed(1)} KB</span></div>
             </div>
           )}
           {analysisData && (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries(analysisData).map(([k, v]) => (
                  <div key={k} className="bg-slate-50 p-4 rounded-xl flex justify-between items-center"><span className="text-[9px] font-black text-slate-400 uppercase">{k}</span><span className="text-xs font-black ml-4">{(v as string)}</span></div>
                ))}
             </div>
           )}
           {outputUrl && (
             <div className="text-center space-y-6">
               <img src={outputUrl} className="max-h-80 mx-auto rounded-[2rem] shadow-2xl border-4 border-white" alt="Result" />
               <a href={outputUrl} download={`toolverse_${slug}.jpg`} className="px-12 py-5 bg-emerald-600 text-white rounded-2xl font-black shadow-xl inline-block">Download Master Output</a>
             </div>
           )}
        </div>
      )}
    />
  );
};

export default ImageTools;
