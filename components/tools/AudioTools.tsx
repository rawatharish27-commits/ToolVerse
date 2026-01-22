import React, { useState } from 'react';
import { runMediaTask } from '../../lib/wasm-engines';
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { audioConverterConfig, audioCompressorConfig, audioCutterConfig, audioNoiseRemoverConfig, audioMergerConfig, audioSpeedPitchConfig } from '../../config/audioTools';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const AudioTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [processedOutType, setProcessedOutType] = useState('audio/mpeg');
  const [resultSize, setResultSize] = useState<number>(0);

  const [options, setOptions] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    const configs = [audioConverterConfig, audioCompressorConfig, audioCutterConfig, audioNoiseRemoverConfig, audioMergerConfig, audioSpeedPitchConfig];
    const target = configs.find(c => c.slug === slug);
    if (target) {
      target.options.forEach(opt => initial[opt.id] = opt.default);
    }
    return initial;
  });

  const handleOptionChange = (id: string, value: any) => {
    setOptions(prev => ({ ...prev, [id]: value }));
  };

  const processAudio = async () => {
    if (!files || files.length === 0) return;
    try {
      setLoading(true);
      setProgress(0);
      setOutputUrl(null);
      
      const mimeMap: Record<string, string> = {
        mp3: 'audio/mpeg',
        wav: 'audio/wav',
        aac: 'audio/aac',
        ogg: 'audio/ogg'
      };

      let allInputs: { name: string, data: File | Blob }[] = [];
      let args: string[] = [];
      let outName = "output.mp3";
      let outType = "audio/mpeg";

      switch (slug) {
        case "audio-speed-pitch-control": {
          const file = files[0];
          const inName = `input.${file.name.split('.').pop()}`;
          allInputs = [{ name: inName, data: file }];
          const format = options.format || 'mp3';
          outName = `adjusted_audio.${format}`;
          outType = mimeMap[format] || 'audio/mpeg';

          const tempo = options.tempo || 1.0;
          const pitch = options.pitch || 0;
          
          // Calculate sample rate shift for pitch (1.0 = normal, 2^(semitones/12))
          const pitchFactor = Math.pow(2, pitch / 12);
          const targetSampleRate = 44100 * pitchFactor;
          
          // Filter sequence: Resample to shift pitch -> asetrate back to standard -> adjust tempo
          // Note: asetrate shifts both pitch and speed. atempo corrects speed.
          args = [
            "-i", inName,
            "-af", `asetrate=44100*${pitchFactor},atempo=${(tempo / pitchFactor).toFixed(4)},aresample=44100`,
            outName
          ];
          break;
        }

        case "audio-merger": {
          if (files.length < 2) throw new Error("Select at least 2 audio files to merge.");
          const targetFormat = options.format || 'mp3';
          outName = `merged_${Date.now()}.${targetFormat}`;
          outType = mimeMap[targetFormat] || 'audio/mpeg';
          
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
            args.push("-c:a", targetFormat === 'mp3' ? 'libmp3lame' : 'aac');
          }
          args.push(outName);
          break;
        }

        case "audio-converter": {
          const file = files[0];
          const inExt = file.name.split('.').pop()?.toLowerCase() || 'mp3';
          const inName = `input.${inExt}`;
          allInputs = [{ name: inName, data: file }];

          const targetFormat = options.format || 'mp3';
          outName = `converted_${file.name.split('.')[0]}.${targetFormat}`;
          outType = mimeMap[targetFormat] || 'audio/mpeg';
          
          args = ["-i", inName];
          if (options.bitrate) args.push("-b:a", options.bitrate);
          if (options.sampleRate) args.push("-ar", String(options.sampleRate));
          if (options.channels === "mono") args.push("-ac", "1");
          else if (options.channels === "stereo") args.push("-ac", "2");
          args.push(outName);
          break;
        }

        case "audio-compressor": {
          const file = files[0];
          const inExt = file.name.split('.').pop()?.toLowerCase() || 'mp3';
          const inName = `input.${inExt}`;
          allInputs = [{ name: inName, data: file }];

          const targetFormat = options.format || 'mp3';
          outName = `compressed_${file.name.split('.')[0]}.${targetFormat}`;
          outType = mimeMap[targetFormat] || 'audio/mpeg';
          
          args = ["-i", inName];
          args.push("-b:a", options.bitrate || "64k");
          args.push("-ar", String(options.sampleRate || 22050));
          if (options.channels === "mono") args.push("-ac", "1");
          else if (options.channels === "stereo") args.push("-ac", "2");
          
          args.push(outName);
          break;
        }

        case "audio-cutter": {
          const file = files[0];
          const inExt = file.name.split('.').pop()?.toLowerCase() || 'mp3';
          const inName = `input.${inExt}`;
          allInputs = [{ name: inName, data: file }];

          const targetFormat = options.format || 'mp3';
          outName = `cut_${file.name.split('.')[0]}.${targetFormat}`;
          outType = mimeMap[targetFormat] || 'audio/mpeg';
          
          args = [
            "-ss", options.start || "00:00:00",
            "-i", inName,
            "-to", options.end || "00:00:10"
          ];

          if (options.fastCopy && inExt === targetFormat) {
            args.push("-c", "copy");
          } else {
            args.push("-c:a", targetFormat === 'mp3' ? 'libmp3lame' : 'aac');
          }

          args.push(outName);
          break;
        }

        case "audio-noise-remover": {
          const file = files[0];
          const inExt = file.name.split('.').pop()?.toLowerCase() || 'mp3';
          const inName = `input.${inExt}`;
          allInputs = [{ name: inName, data: file }];

          const targetFormat = options.format || 'mp3';
          outName = `cleaned_${file.name.split('.')[0]}.${targetFormat}`;
          outType = mimeMap[targetFormat] || 'audio/mpeg';
          
          const filterMap: Record<string, string> = {
            Low: "highpass=f=60,lowpass=f=14000,afftdn=nf=-25",
            Medium: "highpass=f=80,lowpass=f=12000,afftdn=nf=-35:om=0.5",
            High: "highpass=f=100,lowpass=f=10000,afftdn=nf=-45:om=0.8"
          };

          const filter = filterMap[options.strength || "Medium"];
          
          args = [
            "-i", inName,
            "-af", filter,
            outName
          ];
          break;
        }

        default:
          throw new Error("Unknown audio tool slug.");
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
      onSuccess(`${slug.replace(/-/g, ' ')} Complete!`);
    } catch (err: any) {
      console.error(err);
      onError(err.message || "Audio engine encountered an error.");
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  const currentConfig = slug === 'audio-converter' ? audioConverterConfig : 
                       slug === 'audio-compressor' ? audioCompressorConfig :
                       slug === 'audio-cutter' ? audioCutterConfig :
                       slug === 'audio-noise-remover' ? audioNoiseRemoverConfig :
                       slug === 'audio-merger' ? audioMergerConfig : 
                       slug === 'audio-speed-pitch-control' ? audioSpeedPitchConfig : null;

  const inputSlot = (
    <div className="space-y-6">
      <div className="p-10 md:p-16 border-4 border-dashed border-slate-100 rounded-[3rem] text-center hover:border-blue-100 transition-all cursor-pointer group relative">
        <input 
          type="file" 
          accept="audio/*" 
          multiple={slug === 'audio-merger'}
          onChange={e => setFiles(e.target.files)} 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
        />
        <div className="text-7xl mb-6 group-hover:scale-110 transition-transform">
          {slug === 'audio-compressor' ? '📉' : slug === 'audio-cutter' ? '✂️' : slug === 'audio-noise-remover' ? '🧹' : slug === 'audio-merger' ? '🧩' : slug === 'audio-speed-pitch-control' ? '🎹' : '🎧'}
        </div>
        <p className="text-slate-900 font-black text-xl">
          {files ? `${files.length} File(s) Ready` : slug === 'audio-merger' ? "Drop Audio Files to Merge" : "Drop Audio File Here"}
        </p>
        <p className="text-slate-400 text-xs font-bold mt-2 uppercase tracking-widest">
          {slug === 'audio-merger' ? "Select files in the order you want them merged" : "MP3, WAV, AAC, OGG supported"}
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
      onClick={processAudio} 
      className="w-full py-7 bg-blue-600 text-white rounded-[2rem] font-black text-2xl shadow-2xl hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50"
    >
      {loading ? `Engine Working (${Math.round(progress)}%)...` : slug === 'audio-merger' ? "Merge Audio Now" : "Start Processing"}
    </button>
  );

  const resultSlot = outputUrl && (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-10">
      <div className="bg-slate-900 p-8 rounded-[3rem] shadow-2xl border-4 border-white flex flex-col items-center">
        <audio src={outputUrl} controls className="w-full mb-4" />
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Format: {processedOutType}</p>
      </div>
      <div className="flex justify-center">
        <a 
          href={outputUrl} 
          download={`toolverse_${slug}_${Date.now()}.${processedOutType.split('/')[1].replace('mpeg', 'mp3')}`} 
          className="inline-flex items-center px-12 py-6 bg-emerald-600 text-white rounded-[2rem] font-black text-xl shadow-2xl hover:bg-emerald-700 transition-all transform hover:scale-105"
        >
          <span className="mr-3">⚡</span> Download Ready Audio
        </a>
      </div>
    </div>
  );

  const totalInputSize = files ? (Array.from(files) as File[]).reduce((acc, f) => acc + f.size, 0) : 0;

  return (
    <ToolLayout
      title={currentConfig?.title || slug.replace(/-/g, ' ')}
      description={currentConfig?.description || "High-performance browser-native audio tool."}
      icon={currentConfig?.icon || "🎧"}
      colorClass={currentConfig?.colorClass || "bg-blue-500"}
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
           <div className="w-12 h-12 flex items-center justify-center text-blue-400 text-2xl font-black">»</div>
           <div className="text-center md:text-right">
              <div className="text-blue-400 text-[10px] font-black uppercase tracking-widest mb-1">Processed Result</div>
              <div className="text-3xl font-black text-emerald-400">
                {(resultSize / 1024 / 1024).toFixed(2)} MB
              </div>
           </div>
        </div>
      )}
    />
  );
};

export default AudioTools;