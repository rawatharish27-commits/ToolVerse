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
          outName = `out.${targetFormat}`;
          outType = targetFormat === 'webm' ? 'video/webm' : 'video/mp4';
          args = ["-i", inName, outName];
          break;
        case "audio-converter-pro":
          outName = `out.${targetFormat}`;
          outType = `audio/${targetFormat}`;
          args = ["-i", inName, outName];
          break;
        case "video-mute":
          args = ["-i", inName, "-an", "-vcodec", "copy", "out.mp4"];
          break;
        case "video-speed-changer":
          // Simple 2x speed as default for demo, can be parameterized
          args = ["-i", inName, "-filter:v", "setpts=0.5*PTS", "-filter:a", "atempo=2.0", "out.mp4"];
          break;
        case "audio-reverse":
          args = ["-i", inName, "-af", "areverse", "out.mp3"];
          outName = "out.mp3";
          outType = "audio/mp3";
          break;
        case "audio-noise-gate":
          // Using acompand filter as a basic noise gate / compressor
          args = ["-i", inName, "-af", "compand=0.3|0.3:6:-70/-70|-60/-20|10/-10", "out.mp3"];
          outName = "out.mp3";
          outType = "audio/mp3";
          break;
        case "video-to-gif-high-res":
          // Optimized 2-pass palette generation for high quality GIF
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
          // Using concat filter
          let filterStr = "";
          const inputArgs: string[] = [];
          for(let i=0; i<files.length; i++) {
            inputArgs.push("-i", `file${i}.mp4`);
            filterStr += `[${i}:v][${i}:a]`;
          }
          filterStr += `concat=n=${files.length}:v=1:a=1[v][a]`;
          args = [...inputArgs, "-filter_complex", filterStr, "-map", "[v]", "-map", "[a]", "out.mp4"];
          
          // Custom media task because of multiple inputs
          const ff = await getFFmpeg();
          for (let i = 0; i < files.length; i++) {
             const { fetchFile } = await import("@ffmpeg/util");
             await ff.writeFile(`file${i}.mp4`, await fetchFile(files[i]));
          }
          ff.on('progress', ({ progress }) => setProgress(progress * 100));
          await ff.exec(args);
          const data = await ff.readFile("out.mp4");
          const blob = new Blob([data as any], { type: 'video/mp4' });
          setProcessedOutType('video/mp4');
          setOutputUrl(URL.createObjectURL(blob));
          onSuccess("Videos Merged!");
          setLoading(false);
          return;
        }
        
        // Standard single-file fallback logic (from Phase 1)
        case "video-compressor":
          args = ["-i", inName, "-b:v", "500k", "out.mp4"];
          break;
        case "video-to-mp3":
          args = ["-i", inName, "-q:a", "0", "-map", "a", "out.mp3"];
          outName = "out.mp3";
          outType = "audio/mp3";
          break;
        case "video-cutter":
          args = ["-i", inName, "-t", "10", "-c", "copy", "out.mp4"];
          break;
        case "video-resizer":
          args = ["-i", inName, "-vf", "scale=640:360", "out.mp4"];
          break;
        case "gif-maker":
          args = ["-i", inName, "-vf", "fps=10,scale=320:-1:flags=lanczos", "out.gif"];
          outName = "out.gif";
          outType = "image/gif";
          break;
        case "audio-converter":
          args = ["-i", inName, "out.wav"];
          outName = "out.wav";
          outType = "audio/wav";
          break;
        case "audio-trimmer":
          args = ["-i", inName, "-t", "15", "-c", "copy", "out.mp3"];
          outName = "out.mp3";
          outType = "audio/mp3";
          break;
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
      onSuccess("Processing complete!");
    } catch (err) {
      console.error(err);
      onError("Processing failed. Engine error.");
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  const getEmoji = () => {
    if (slug.includes('video')) return '🎥';
    if (slug.includes('audio')) return '📻';
    return '🎞️';
  };

  const isMultiFile = slug === 'video-merger' || slug === 'audio-merger-pro';

  return (
    <div className="py-12 text-center space-y-10 max-w-md mx-auto">
      <div className="text-8xl">{getEmoji()}</div>
      
      <div className="space-y-4">
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">
          {slug.includes('audio') ? 'Select Audio File(s)' : 'Select Video File(s)'}
        </label>
        <input 
          type="file" 
          multiple={isMultiFile}
          accept={slug.includes('audio') ? "audio/*" : "video/*"} 
          onChange={e => setFiles(e.target.files)} 
          className="mx-auto block bg-slate-100 p-4 rounded-2xl w-full" 
        />
      </div>

      {(slug === 'video-converter-pro' || slug === 'audio-converter-pro') && (
        <div className="flex flex-col items-center gap-2">
          <label className="text-xs font-bold text-slate-500 uppercase">Target Format</label>
          <select 
            value={targetFormat} 
            onChange={e => setTargetFormat(e.target.value)}
            className="p-3 border rounded-xl w-full bg-white shadow-sm font-bold text-indigo-600"
          >
            {slug === 'video-converter-pro' ? (
              <>
                <option value="mp4">MP4</option>
                <option value="webm">WebM</option>
                <option value="avi">AVI</option>
                <option value="mkv">MKV</option>
              </>
            ) : (
              <>
                <option value="mp3">MP3</option>
                <option value="wav">WAV</option>
                <option value="aac">AAC</option>
                <option value="flac">FLAC</option>
              </>
            )}
          </select>
        </div>
      )}

      <div className="space-y-4">
        <button 
          disabled={loading || !files} 
          onClick={processMedia} 
          className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-xl shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
        >
          {loading ? "Processing..." : "Start Engine"}
        </button>
        
        {loading && (
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-indigo-600 h-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      {outputUrl && (
        <div className="space-y-4 pt-8 animate-in slide-in-from-bottom">
          {processedOutType.includes('gif') ? (
            <img src={outputUrl} className="mx-auto rounded-2xl shadow-xl border-4 border-white" />
          ) : processedOutType.includes('video') ? (
            <video src={outputUrl} controls className="w-full rounded-2xl shadow-2xl border-4 border-white" />
          ) : (
            <audio src={outputUrl} controls className="mx-auto w-full" />
          )}
          <a href={outputUrl} download={`toolverse_${slug}.${processedOutType.split('/')[1]}`} className="inline-block px-10 py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-xl">
            Download Result
          </a>
        </div>
      )}
    </div>
  );
};

export default VideoAudioTools;