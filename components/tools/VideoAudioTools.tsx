import React, { useState, useEffect } from 'react';
import { runMediaTask, getFFmpeg } from '../../lib/wasm-engines';
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { 
  videoCompressorConfig, 
  videoConverterConfig, 
  videoToGifConfig, 
  videoTrimmerConfig, 
  videoMergerConfig,
  videoThumbnailConfig,
  videoAudioExtractorConfig,
  videoSpeedConfig
} from '../../config/videoTools';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const RESOLUTION_MAP: Record<string, string> = {
  "1080p": "1920:1080",
  "720p": "1280:720",
  "480p": "854:480",
  "360p": "640:360",
};

const BITRATE_MAP: Record<string, string> = {
  "High": "4000k",
  "Medium": "2000k",
  "Low": "1000k",
  "Ultra Low": "500k",
};

const VideoAudioTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [processedOutType, setProcessedOutType] = useState('video/mp4');
  const [resultSize, setResultSize] = useState<number>(0);

  const [options, setOptions] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    const configs = [videoCompressorConfig, videoConverterConfig, videoToGifConfig, videoTrimmerConfig, videoMergerConfig, videoThumbnailConfig, videoAudioExtractorConfig, videoSpeedConfig];
    const target = configs.find(c => c.slug === slug || (slug.includes('converter') && c.slug.includes('converter')));
    if (target) {
      target.options.forEach(opt => initial[opt.id] = (opt as any).default);
    }
    return initial;
  });

  const handleOptionChange = (id: string, value: any) => {
    setOptions(prev => ({ ...prev, [id]: value }));
  };

  const processMedia = async () => {
    if (!files || files.length === 0) return;
    try {
      setLoading(true);
      setProgress(0);
      setOutputUrl(null);
      
      let args: string[] = [];
      let outName = "output.mp4";
      let outType = "video/mp4";
      let allInputs: { name: string, data: File | Blob }[] = [];

      switch (slug) {
        case "video-thumbnail-extractor": {
          const file = files[0];
          const inName = `input.${file.name.split('.').pop()}`;
          allInputs = [{ name: inName, data: file }];
          outName = `thumbnail.${options.format || 'jpg'}`;
          outType = options.format === 'png' ? 'image/png' : 'image/jpeg';
          
          args = [
            "-ss", options.time || "00:00:01",
            "-i", inName,
            "-vframes", "1",
          ];

          if (options.scale !== 'Source') {
             args.push("-vf", `scale=${RESOLUTION_MAP[options.scale]}`);
          }
          
          args.push(outName);
          break;
        }

        case "video-audio-extractor": {
          const file = files[0];
          const inName = `input.${file.name.split('.').pop()}`;
          allInputs = [{ name: inName, data: file }];
          const format = options.format || 'mp3';
          outName = `extracted_audio.${format}`;
          outType = format === 'wav' ? 'audio/wav' : format === 'aac' ? 'audio/aac' : 'audio/mpeg';
          
          args = ["-i", inName, "-vn"];
          if (format === 'mp3') {
            args.push("-ab", options.bitrate || "320k", "-f", "mp3");
          } else {
            args.push("-acodec", "copy");
          }
          args.push(outName);
          break;
        }

        case "video-speed-controller": {
          const file = files[0];
          const inName = `input.${file.name.split('.').pop()}`;
          allInputs = [{ name: inName, data: file }];
          outName = "speed_adjusted.mp4";
          outType = "video/mp4";

          const speed = parseFloat(options.speed || "2.0");
          const setpts = (1 / speed).toFixed(4);
          const atempo = speed.toFixed(4);
          
          // Handle audio speed separately if needed (tempo limit is 0.5-2.0 per filter)
          let audioFilter = "";
          if (speed >= 0.5 && speed <= 2.0) {
            audioFilter = `atempo=${atempo}`;
          } else if (speed > 2.0) {
            audioFilter = "atempo=2.0,atempo=" + (speed / 2.0).toFixed(4);
          } else {
            audioFilter = "atempo=0.5,atempo=" + (speed / 0.5).toFixed(4);
          }

          args = [
            "-i", inName,
            "-vf", `setpts=${setpts}*PTS`,
            "-af", audioFilter,
            "-c:v", "libx264",
            "-preset", "ultrafast",
            "-crf", "28",
            outName
          ];
          break;
        }

        case "video-merger": {
          if (files.length < 2) throw new Error("Select at least 2 videos to merge.");
          const targetFormat = options.format || 'mp4';
          outName = `merged_${Date.now()}.${targetFormat}`;
          outType = `video/${targetFormat}`;
          
          const fileArray = Array.from(files) as File[];
          const inputFiles = fileArray.map((f, i) => ({
            name: `input${i}.${f.name.split('.').pop()}`,
            data: f
          }));

          const concatContent = inputFiles.map(f => `file '${f.name}'`).join('\n');
          const concatBlob = new Blob([concatContent], { type: 'text/plain' });
          
          allInputs = [...inputFiles, { name: 'concat.txt', data: concatBlob }];
          
          args = ["-f", "concat", "-safe", "0", "-i", "concat.txt"];
          if (options.fastCopy) {
            args.push("-c", "copy");
          } else {
            args.push("-c:v", "libx264", "-crf", "23", "-c:a", "aac");
          }
          args.push(outName);
          break;
        }

        case "video-trimmer": {
          const file = files[0];
          const inExt = file.name.split('.').pop()?.toLowerCase() || 'mp4';
          const inName = `input.${inExt}`;
          allInputs = [{ name: inName, data: file }];

          const targetFormat = options.format || 'mp4';
          outName = `trimmed_${file.name.split('.')[0]}.${targetFormat}`;
          outType = `video/${targetFormat}`;
          
          args = [
            "-ss", options.start || "00:00:00",
            "-i", inName,
            "-to", options.end || "00:00:10"
          ];

          if (options.fastCopy) {
            args.push("-c", "copy");
          } else {
            args.push("-c:v", "libx264", "-crf", "23", "-c:a", "aac");
          }

          args.push(outName);
          break;
        }

        case "video-compressor": {
          const file = files[0];
          const inExt = file.name.split('.').pop()?.toLowerCase() || 'mp4';
          const inName = `input.${inExt}`;
          allInputs = [{ name: inName, data: file }];

          outName = `compressed_${file.name.split('.')[0]}.${options.format || 'mp4'}`;
          outType = (options.format === 'webm') ? 'video/webm' : 'video/mp4';
          
          args = ["-i", inName];
          const filters = [];
          if (options.resolution !== 'Original') {
            filters.push(`scale=${RESOLUTION_MAP[options.resolution]}`);
          }
          if (filters.length > 0) args.push("-vf", filters.join(','));
          if (options.fps !== 'Original') args.push("-r", String(options.fps));
          args.push("-b:v", BITRATE_MAP[options.bitrate]);
          if (options.mute) args.push("-an");
          args.push(outName);
          break;
        }
        
        case "video-converter-pro":
        case "video-converter": {
          const file = files[0];
          const inExt = file.name.split('.').pop()?.toLowerCase() || 'mp4';
          const inName = `input.${inExt}`;
          allInputs = [{ name: inName, data: file }];

          const targetFormat = options.format || 'mp4';
          outName = `converted_${file.name.split('.')[0]}.${targetFormat}`;
          outType = targetFormat === 'gif' ? 'image/gif' : `video/${targetFormat}`;
          
          args = ["-i", inName];
          const filters = [];
          if (options.resolution && options.resolution !== 'Original') {
            filters.push(`scale=${RESOLUTION_MAP[options.resolution]}`);
          }
          if (targetFormat === 'gif') {
            filters.push("fps=10,scale=480:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse");
          }
          if (filters.length > 0) args.push("-vf", filters.join(','));
          if (options.audio === false && targetFormat !== 'gif') {
            args.push("-an");
          }
          args.push(outName);
          break;
        }

        case "video-to-gif-high-res":
        case "gif-maker": {
          const file = files[0];
          const inExt = file.name.split('.').pop()?.toLowerCase() || 'mp4';
          const inName = `input.${inExt}`;
          allInputs = [{ name: inName, data: file }];

          const w = options.width || 480;
          const fps = options.fps || 15;
          const start = options.start || "00:00:00";
          const duration = options.duration || 5;
          
          const paletteFilter = `fps=${fps},scale=${w}:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse`;
          
          outName = "output.gif";
          outType = "image/gif";
          
          args = [
            "-ss", start,
            "-t", String(duration),
            "-i", inName,
            "-vf", paletteFilter
          ];

          if (options.loop) {
            args.push("-loop", "0");
          } else {
            args.push("-loop", "-1");
          }

          args.push(outName);
          break;
        }

        default:
          const file = files[0];
          const inExt = file.name.split('.').pop()?.toLowerCase() || 'mp4';
          const inName = `input.${inExt}`;
          allInputs = [{ name: inName, data: file }];
          args = ["-i", inName, "output.mp4"];
      }

      const data = await runMediaTask(
        allInputs,
        args,
        outName,
        p => setProgress(p)
      );

      const blob = new Blob([data as any], { type: outType });
      setResultSize(blob.size);
      setProcessedOutType(outType);
      setOutputUrl(URL.createObjectURL(blob));
      onSuccess("Media Processing Complete!");
    } catch (err: any) {
      console.error(err);
      onError(err.message || "Media engine encountered an error.");
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  const currentConfig = slug === 'video-compressor' ? videoCompressorConfig : 
                       (slug === 'video-converter-pro' || slug === 'video-converter') ? videoConverterConfig :
                       (slug === 'video-to-gif-high-res' || slug === 'gif-maker') ? videoToGifConfig :
                       slug === 'video-trimmer' ? videoTrimmerConfig :
                       slug === 'video-merger' ? videoMergerConfig : 
                       slug === 'video-thumbnail-extractor' ? videoThumbnailConfig :
                       slug === 'video-audio-extractor' ? videoAudioExtractorConfig :
                       slug === 'video-speed-controller' ? videoSpeedConfig :
                       null;

  const inputSlot = (
    <div className="space-y-6">
      <div className="p-10 md:p-16 border-4 border-dashed border-slate-100 rounded-[3rem] text-center hover:border-purple-100 transition-all cursor-pointer group relative">
        <input 
          type="file" 
          accept={slug.includes('audio') && slug !== 'video-audio-extractor' ? "audio/*" : "video/*"} 
          multiple={slug === 'video-merger'}
          onChange={e => setFiles(e.target.files)} 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
        />
        <div className="text-7xl mb-6 group-hover:scale-110 transition-transform">
          {slug === 'video-audio-extractor' ? '🎵' : slug === 'video-thumbnail-extractor' ? '🖼️' : slug === 'video-speed-controller' ? '⏩' : slug.includes('audio') ? '📻' : '🎥'}
        </div>
        <p className="text-slate-900 font-black text-xl">
          {files ? `${files.length} File(s) Ready` : `Drop Video Here`}
        </p>
        <p className="text-slate-400 text-xs font-bold mt-2 uppercase tracking-widest">
          {slug === 'video-merger' ? "Select multiple clips to combine" : "MP4, WebM, AVI, MOV supported"}
        </p>
      </div>
    </div>
  );

  const optionsSlot = currentConfig ? (
    <OptionsPanel 
      options={currentConfig.options as any} 
      values={options} 
      onChange={handleOptionChange} 
    />
  ) : undefined;

  const actionsSlot = (
    <button 
      disabled={loading || !files} 
      onClick={processMedia} 
      className="w-full py-7 bg-purple-600 text-white rounded-[2rem] font-black text-2xl shadow-2xl hover:bg-purple-700 transition-all active:scale-95 disabled:opacity-50"
    >
      {loading ? `Engine Working (${Math.round(progress)}%)...` : "Start Processing"}
    </button>
  );

  const resultSlot = outputUrl && (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-10">
      <div className="bg-slate-900 p-4 rounded-[3rem] shadow-2xl border-4 border-white overflow-hidden">
        {processedOutType.includes('gif') || processedOutType.includes('image') ? (
          <img src={outputUrl} className="w-full rounded-[2rem]" alt="Result" />
        ) : processedOutType.includes('video') ? (
          <video src={outputUrl} controls className="w-full rounded-[2rem]" />
        ) : (
          <audio src={outputUrl} controls className="w-full mt-4" />
        )}
      </div>
      <div className="flex justify-center">
        <a 
          href={outputUrl} 
          download={`toolverse_${slug}_${Date.now()}.${processedOutType.split('/')[1].replace('mpeg', 'mp3').replace('jpeg', 'jpg')}`} 
          className="inline-flex items-center px-12 py-6 bg-emerald-600 text-white rounded-[2rem] font-black text-xl shadow-2xl hover:bg-emerald-700 transition-all transform hover:scale-105"
        >
          <span className="mr-3">⚡</span> Download Ready File
        </a>
      </div>
    </div>
  );

  const totalInputSize = files ? (Array.from(files) as File[]).reduce((acc, f) => acc + f.size, 0) : 0;

  return (
    <ToolLayout
      title={currentConfig?.title || slug.replace(/-/g, ' ')}
      description={currentConfig?.description || "High-performance browser-native video tool."}
      icon={currentConfig?.icon || "🎥"}
      colorClass={currentConfig?.colorClass || "bg-purple-600"}
      input={inputSlot}
      options={optionsSlot}
      actions={actionsSlot}
      result={resultSlot}
      comparison={files && outputUrl && (
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="text-center md:text-left">
              <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Source Size</div>
              <div className="text-3xl font-black">{(totalInputSize / 1024 / 1024).toFixed(2)} MB</div>
           </div>
           <div className="w-12 h-12 flex items-center justify-center text-purple-400 text-2xl font-black">»</div>
           <div className="text-center md:text-right">
              <div className="text-purple-400 text-[10px] font-black uppercase tracking-widest mb-1">Processed Result</div>
              <div className="text-3xl font-black text-emerald-400">
                {(resultSize / 1024 / 1024).toFixed(2)} MB
              </div>
           </div>
        </div>
      )}
    />
  );
};

export default VideoAudioTools;