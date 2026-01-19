
import React, { useState } from 'react';
import { runMediaTask, getFFmpeg } from '../../lib/wasm-engines';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const VideoAudioTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [processedOutType, setProcessedOutType] = useState('video/mp4');
  const [targetFormat, setTargetFormat] = useState('mp4');

  const processMedia = async () => {
    if (!files || files.length === 0) return;
    try {
      setLoading(true);
      setProgress(0);
      let args: string[] = [];
      let outName = "out.mp4";
      let outType = "video/mp4";

      const file = files[0];
      const inExt = file.name.split('.').pop()?.toLowerCase() || 'mp4';
      const inName = `in.${inExt}`;

      switch (slug) {
        case "video-converter-pro":
        case "video-converter":
          outName = `out.${targetFormat}`;
          outType = targetFormat === 'webm' ? 'video/webm' : 'video/mp4';
          args = ["-i", inName, outName];
          break;
        case "audio-converter-pro":
        case "audio-converter":
          outName = `out.${targetFormat || 'wav'}`;
          outType = `audio/${targetFormat || 'wav'}`;
          args = ["-i", inName, outName];
          break;
        case "video-mute":
          args = ["-i", inName, "-an", "-vcodec", "copy", "out.mp4"];
          break;
        case "video-speed-changer":
          args = ["-i", inName, "-filter:v", "setpts=0.5*PTS", "-filter:a", "atempo=2.0", "out.mp4"];
          break;
        case "audio-reverse":
          args = ["-i", inName, "-af", "areverse", "out.mp3"];
          outName = "out.mp3";
          outType = "audio/mp3";
          break;
        case "video-to-gif-high-res":
        case "gif-maker":
          args = ["-i", inName, "-vf", "fps=15,scale=480:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse", "out.gif"];
          outName = "out.gif";
          outType = "image/gif";
          break;
        case "video-merger": {
          if (files.length < 2) {
             onError("Please select at least 2 videos to merge.");
             setLoading(false);
             return;
          }
          const inputArgs: string[] = [];
          let filterStr = "";
          for(let i=0; i<files.length; i++) {
            inputArgs.push("-i", `file${i}.mp4`);
            filterStr += `[${i}:v][${i}:a]`;
          }
          filterStr += `concat=n=${files.length}:v=1:a=1[v][a]`;
          args = [...inputArgs, "-filter_complex", filterStr, "-map", "[v]", "-map", "[a]", "out.mp4"];
          
          const ff = await getFFmpeg();
          const { fetchFile } = await import("@ffmpeg/util");
          for (let i = 0; i < files.length; i++) {
             await ff.writeFile(`file${i}.mp4`, await fetchFile(files[i]));
          }
          ff.on('progress', ({ progress }) => setProgress(progress * 100));
          await ff.exec(args);
          const data = await ff.readFile("out.mp4");
          const blob = new Blob([data as any], { type: 'video/mp4' });
          setProcessedOutType('video/mp4');
          setOutputUrl(URL.createObjectURL(blob));
          onSuccess("Batch Merger Complete!");
          setLoading(false);
          return;
        }
        case "video-compressor":
          args = ["-i", inName, "-vcodec", "libx264", "-crf", "28", "out.mp4"];
          break;
        case "video-to-mp3":
          args = ["-i", inName, "-q:a", "0", "-map", "a", "out.mp3"];
          outName = "out.mp3";
          outType = "audio/mp3";
          break;
        default:
          args = ["-i", inName, "out.mp4"];
      }

      const data = await runMediaTask(
        [{ name: inName, data: file }],
        args,
        outName,
        p => setProgress(p)
      );

      const blob = new Blob([data as any], { type: outType });
      setProcessedOutType(outType);
      setOutputUrl(URL.createObjectURL(blob));
      onSuccess("Media Task Finished Successfully.");
    } catch (err) {
      console.error(err);
      onError("Media engine failure. Format may not be supported.");
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  return (
    <div className="py-16 text-center space-y-12 max-w-xl mx-auto">
      <div className="w-32 h-32 bg-indigo-50 rounded-[3rem] flex items-center justify-center text-6xl mx-auto shadow-inner">
        {slug.includes('audio') ? '📻' : '🎥'}
      </div>
      
      <div className="space-y-6">
        <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">
           Cloud Source Interface
        </label>
        <div className="relative group">
          <input 
            type="file" 
            multiple={slug === 'video-merger'}
            accept={slug.includes('audio') ? "audio/*" : "video/*"} 
            onChange={e => setFiles(e.target.files)} 
            className="block w-full text-sm text-slate-500 file:mr-4 file:py-4 file:px-8 file:rounded-3xl file:border-0 file:text-[11px] file:font-black file:uppercase file:tracking-widest file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 transition-all cursor-pointer bg-slate-50 p-6 rounded-[2.5rem] border border-dashed border-slate-200 group-hover:border-indigo-300" 
          />
        </div>
      </div>

      {(slug.includes('converter')) && (
        <div className="grid grid-cols-1 gap-4">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-left px-2">Output Target Format</label>
          <select 
            value={targetFormat} 
            onChange={e => setTargetFormat(e.target.value)}
            className="w-full p-5 rounded-3xl border border-slate-200 bg-white font-black text-indigo-600 focus:ring-4 focus:ring-indigo-500/10 outline-none shadow-sm"
          >
            {slug.includes('video') ? (
              <>
                <option value="mp4">MP4 (Standard)</option>
                <option value="webm">WebM (Modern)</option>
                <option value="avi">AVI (Legacy)</option>
              </>
            ) : (
              <>
                <option value="mp3">MP3 (Audio)</option>
                <option value="wav">WAV (Lossless)</option>
                <option value="aac">AAC</option>
              </>
            )}
          </select>
        </div>
      )}

      <div className="space-y-6">
        <button 
          disabled={loading || !files} 
          onClick={processMedia} 
          className="w-full py-7 bg-indigo-600 text-white rounded-[2rem] font-black text-2xl shadow-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all active:scale-95 disabled:opacity-50"
        >
          {loading ? "Engines Working..." : "Initialize Process"}
        </button>
        
        {loading && (
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden shadow-inner">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-indigo-700 h-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      {outputUrl && (
        <div className="space-y-8 pt-12 animate-in fade-in slide-in-from-bottom-10">
          <div className="bg-slate-900 p-4 rounded-[3rem] shadow-2xl border-4 border-white">
            {processedOutType.includes('gif') ? (
              <img src={outputUrl} className="w-full rounded-[2rem]" />
            ) : processedOutType.includes('video') ? (
              <video src={outputUrl} controls className="w-full rounded-[2rem]" />
            ) : (
              <audio src={outputUrl} controls className="w-full mt-4" />
            )}
          </div>
          <a href={outputUrl} download={`toolverse_export_${Date.now()}.${processedOutType.split('/')[1]}`} className="inline-flex items-center px-12 py-6 bg-emerald-600 text-white rounded-[2rem] font-black text-xl shadow-2xl hover:bg-emerald-700 transition-all transform hover:scale-105">
            <span className="mr-3">⚡</span> Download Ready File
          </a>
        </div>
      )}
    </div>
  );
};

export default VideoAudioTools;
