import React, { useState } from 'react';
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { jsonFormatterConfig, base64Config, jwtDecoderConfig, regexTesterConfig, urlEncoderConfig } from '../../config/devTools';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const DevTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [input, setInput] = useState(""); // Primary input
  const [testString, setTestString] = useState(""); // Secondary input for Regex
  const [replaceWith, setReplaceWith] = useState(""); // Replacement string for Regex
  const [file, setFile] = useState<File | null>(null);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  
  // JWT Specific State
  const [jwtHeader, setJwtHeader] = useState<any>(null);
  const [jwtPayload, setJwtPayload] = useState<any>(null);

  // Regex Specific State
  const [matches, setMatches] = useState<RegExpExecArray[]>([]);

  const [options, setOptions] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    const configs = [jsonFormatterConfig, base64Config, jwtDecoderConfig, regexTesterConfig, urlEncoderConfig];
    const target = configs.find(c => c.slug === slug);
    if (target) {
      target.options.forEach(opt => initial[opt.id] = (opt as any).default);
    }
    return initial;
  });

  const handleOptionChange = (id: string, value: any) => {
    setOptions(prev => ({ ...prev, [id]: value }));
    // Clear state on significant option changes
    if (id === 'mode' || id === 'inputType' || id === 'scope') {
      setOutput("");
      setDownloadUrl(null);
      setError("");
      setMatches([]);
    }
  };

  const sortObject = (obj: any): any => {
    if (Array.isArray(obj)) return obj.map(sortObject);
    if (obj !== null && typeof obj === "object") {
      return Object.keys(obj)
        .sort()
        .reduce((acc: any, key) => {
          acc[key] = sortObject(obj[key]);
          return acc;
        }, {});
    }
    return obj;
  };

  const base64UrlDecode = (str: string) => {
    const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, "=");
    return decodeURIComponent(
      atob(padded)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
  };

  const processJSON = () => {
    try {
      let parsed = JSON.parse(input);
      if (options.sortKeys) parsed = sortObject(parsed);
      const result = options.mode === "Minify" ? JSON.stringify(parsed) : JSON.stringify(parsed, null, options.indent);
      setOutput(result);
      onSuccess("JSON Processed!");
    } catch (err: any) {
      setError(err.message || "Invalid JSON syntax.");
      onError("Invalid JSON detected.");
    }
  };

  const processBase64 = async () => {
    setDownloadUrl(null);
    setError("");

    if (options.inputType === "Text") {
      if (!input.trim()) return;
      try {
        if (options.mode === "Encode") {
          setOutput(btoa(unescape(encodeURIComponent(input))));
        } else {
          setOutput(decodeURIComponent(escape(atob(input))));
        }
        onSuccess("Base64 Transformed!");
      } catch (e) {
        setError("Invalid input for the selected Base64 operation.");
        onError("Base64 error.");
      }
    } else {
      if (!file) {
        onError("Please select a file.");
        return;
      }
      setLoading(true);
      const reader = new FileReader();

      reader.onload = () => {
        try {
          const result = reader.result as string;
          if (options.mode === "Encode") {
            const base64Data = result.split(",")[1];
            setOutput(base64Data);
            onSuccess("File encoded to Base64!");
          } else {
            const binary = atob(result.trim());
            const bytes = new Uint8Array(binary.length);
            for (let i = 0; i < binary.length; i++) {
              bytes[i] = binary.charCodeAt(i);
            }
            const blob = new Blob([bytes], { type: "application/octet-stream" });
            setDownloadUrl(URL.createObjectURL(blob));
            setOutput("Binary data decoded successfully.");
            onSuccess("Base64 decoded to binary file!");
          }
        } catch (e) {
          setError("Failed to process file. Ensure input is valid Base64 for decoding.");
          onError("Processing error.");
        } finally {
          setLoading(false);
        }
      };

      if (options.mode === "Encode") {
        reader.readAsDataURL(file);
      } else {
        reader.readAsText(file);
      }
    }
  };

  const processJWT = () => {
    setJwtHeader(null);
    setJwtPayload(null);
    if (!input.trim()) return;
    
    try {
      const parts = input.split('.');
      if (parts.length !== 3) {
        throw new Error("A valid JWT must have 3 parts separated by dots (header.payload.signature).");
      }

      const header = JSON.parse(base64UrlDecode(parts[0]));
      const payload = JSON.parse(base64UrlDecode(parts[1]));

      setJwtHeader(header);
      setJwtPayload(payload);
      onSuccess("Token Decoded!");
    } catch (e: any) {
      setError(e.message || "Invalid JWT format or content.");
      onError("Decoding failed.");
    }
  };

  const processRegex = () => {
    setMatches([]);
    setOutput("");
    if (!input.trim()) return;

    try {
      let flags = "";
      if (options.flagGlobal) flags += "g";
      if (options.flagIgnoreCase) flags += "i";
      if (options.flagMultiline) flags += "m";
      if (options.flagDotAll) flags += "s";
      if (options.flagUnicode) flags += "u";

      const regex = new RegExp(input, flags);

      if (options.mode === "Replace") {
        const result = testString.replace(regex, replaceWith);
        setOutput(result);
        onSuccess("Regex replacement complete!");
      } else {
        const found: RegExpExecArray[] = [];
        let match: RegExpExecArray | null;

        if (flags.includes("g")) {
          while ((match = regex.exec(testString)) !== null) {
            found.push(match);
            if (match.index === regex.lastIndex) regex.lastIndex++;
          }
        } else {
          match = regex.exec(testString);
          if (match) found.push(match);
        }

        setMatches(found);
        if (found.length > 0) onSuccess(`Found ${found.length} matches!`);
        else onSuccess("No matches found.");
      }
    } catch (e: any) {
      setError(e.message || "Invalid Regular Expression.");
      onError("Regex error.");
    }
  };

  const processURL = () => {
    if (!input.trim()) return;
    try {
      let result = "";
      if (options.mode === "Encode") {
        if (options.scope === "Query Params Only") {
          result = input.split('&').map(pair => {
            const [key, val = ""] = pair.split('=');
            return `${encodeURIComponent(key)}=${encodeURIComponent(val)}`;
          }).join('&');
        } else {
          result = encodeURI(input);
        }
      } else {
        if (options.scope === "Query Params Only") {
          result = input.split('&').map(pair => {
            const [key, val = ""] = pair.split('=');
            return `${decodeURIComponent(key)}=${decodeURIComponent(val)}`;
          }).join('&');
        } else {
          result = decodeURI(input);
        }
      }
      setOutput(result);
      onSuccess(`URL ${options.mode}d!`);
    } catch (e: any) {
      setError("Failed to process URL. Ensure valid formatting for the selected mode.");
      onError("URL processing error.");
    }
  };

  const handleProcess = () => {
    setLoading(true);
    setError("");
    setOutput("");
    
    setTimeout(() => {
      if (slug === 'json-formatter') processJSON();
      if (slug === 'base64-encoder-decoder') processBase64();
      if (slug === 'jwt-decoder') processJWT();
      if (slug === 'regex-tester') processRegex();
      if (slug === 'url-encoder-decoder') processURL();
      setLoading(false);
    }, 100);
  };

  const downloadResult = () => {
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `toolverse_${slug}_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const currentConfig = slug === 'json-formatter' ? jsonFormatterConfig : 
                       slug === 'jwt-decoder' ? jwtDecoderConfig : 
                       slug === 'regex-tester' ? regexTesterConfig :
                       slug === 'url-encoder-decoder' ? urlEncoderConfig :
                       base64Config;

  const inputSlot = (
    <div className="space-y-6">
      {slug === 'base64-encoder-decoder' && options.inputType === "File" ? (
        <div className="p-10 border-4 border-dashed border-slate-100 rounded-[2rem] text-center hover:border-slate-200 transition-all cursor-pointer relative">
          <input 
            type="file" 
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
          />
          <div className="text-5xl mb-4 opacity-50">📁</div>
          <p className="text-slate-900 font-black text-sm">
            {file ? file.name : "Choose file to encode/decode"}
          </p>
        </div>
      ) : slug === 'regex-tester' ? (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Pattern</label>
            <div className="flex items-center bg-slate-50 rounded-2xl border border-slate-200 focus-within:ring-4 focus-within:ring-indigo-100 transition-all">
              <span className="pl-4 text-slate-300 font-mono">/</span>
              <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="([a-zA-Z]+)"
                className="flex-grow p-4 bg-transparent border-none outline-none font-mono text-slate-700"
              />
              <span className="pr-4 text-indigo-400 font-mono font-bold">
                /{ (options.flagGlobal?'g':'')+(options.flagIgnoreCase?'i':'')+(options.flagMultiline?'m':'')+(options.flagDotAll?'s':'')+(options.flagUnicode?'u':'') }
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Test String</label>
            <textarea
              value={testString}
              onChange={e => setTestString(e.target.value)}
              placeholder="Paste content to test against regex..."
              className="w-full h-40 p-4 bg-slate-50 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-indigo-100 outline-none font-mono text-sm text-slate-700"
            />
          </div>
          {options.mode === "Replace" && (
            <div className="space-y-2 animate-in slide-in-from-top-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Replace With</label>
              <input 
                type="text" 
                value={replaceWith}
                onChange={e => setReplaceWith(e.target.value)}
                placeholder="$1_replaced"
                className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-indigo-100 outline-none font-mono text-slate-700"
              />
            </div>
          )}
        </div>
      ) : (
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            slug === 'json-formatter' ? "Paste raw JSON..." : 
            slug === 'jwt-decoder' ? "Paste JWT token (header.payload.signature)..." :
            slug === 'url-encoder-decoder' ? (options.mode === 'Encode' ? "Enter URL or query parameters..." : "Enter encoded URL...") :
            options.mode === 'Encode' ? "Paste text to encode..." : "Paste Base64 to decode..."
          }
          className="w-full h-64 p-0 bg-transparent text-slate-700 font-mono text-sm border-none outline-none resize-none placeholder:text-slate-300 scrollbar-thin scrollbar-thumb-slate-100"
        />
      )}
    </div>
  );

  const actionsSlot = (
    <div className="flex flex-col sm:flex-row gap-4 w-full">
      <button 
        onClick={handleProcess} 
        disabled={loading || (slug === 'base64-encoder-decoder' && options.inputType === 'File' ? !file : !input)}
        className={`flex-grow py-5 text-white rounded-2xl font-black text-lg shadow-xl transition-all active:scale-95 disabled:opacity-50 ${currentConfig.colorClass}`}
      >
        {loading ? "Working..." : slug === 'json-formatter' ? "Format JSON" : slug === 'jwt-decoder' ? "Decode JWT Token" : slug === 'regex-tester' ? "Test Regex" : slug === 'url-encoder-decoder' ? `${options.mode} URL` : `${options.mode} Base64`}
      </button>
      {(output || matches.length > 0) && (
        <div className="flex gap-2">
           <button 
            onClick={() => { 
              const val = output || matches.map(m => m[0]).join('\n');
              navigator.clipboard.writeText(val); 
              onSuccess("Copied!"); 
            }}
            className="py-5 px-8 bg-indigo-600 text-white rounded-2xl font-black text-lg shadow-xl hover:bg-indigo-700 transition-all"
          >
            Copy Result
          </button>
          {output && (
            <button 
              onClick={downloadResult}
              className="py-5 px-8 bg-slate-900 text-white rounded-2xl font-black text-lg shadow-xl hover:bg-slate-800 transition-all"
            >
              Download .txt
            </button>
          )}
        </div>
      )}
    </div>
  );

  const resultSlot = (
    <div className="space-y-8">
      {error && (
        <div className="p-6 bg-red-50 border border-red-100 rounded-3xl text-red-600 font-mono text-xs">
          <div className="font-black uppercase tracking-widest mb-1 text-red-400">Error Details</div>
          {error}
        </div>
      )}

      {slug === 'regex-tester' && matches.length > 0 && options.mode === 'Match' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Matches Found: {matches.length}</span>
          </div>
          <div className="space-y-3">
            {matches.map((m, i) => (
              <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex justify-between mb-2">
                   <span className="text-[9px] font-black text-slate-400 uppercase">Match {i + 1}</span>
                   <span className="text-[9px] font-bold text-slate-300">Index: {m.index}</span>
                </div>
                <div className="font-mono text-slate-700 break-all">{m[0]}</div>
                {m.length > 1 && (
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {Array.from(m).slice(1).map((group, gi) => (
                      group && (
                        <div key={gi} className="p-2 bg-white rounded-lg border border-slate-200 text-[10px]">
                          <span className="text-indigo-400 font-bold mr-2">Group {gi + 1}:</span>
                          <span className="text-slate-600 font-mono">{group}</span>
                        </div>
                      )
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {slug === 'jwt-decoder' && jwtPayload && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center px-1">
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Header</span>
                 <button onClick={() => { navigator.clipboard.writeText(JSON.stringify(jwtHeader, null, 2)); onSuccess("Header Copied!"); }} className="text-[9px] font-bold text-indigo-500 uppercase">Copy</button>
              </div>
              <div className="bg-slate-900 p-6 rounded-[2rem] border border-slate-800">
                 <pre className="text-emerald-400 font-mono text-[11px] overflow-x-auto whitespace-pre-wrap">{JSON.stringify(jwtHeader, null, 2)}</pre>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center px-1">
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Payload</span>
                 <button onClick={() => { navigator.clipboard.writeText(JSON.stringify(jwtPayload, null, 2)); onSuccess("Payload Copied!"); }} className="text-[9px] font-bold text-indigo-500 uppercase">Copy</button>
              </div>
              <div className="bg-slate-900 p-6 rounded-[2rem] border border-slate-800">
                 <pre className="text-emerald-400 font-mono text-[11px] overflow-x-auto whitespace-pre-wrap">{JSON.stringify(jwtPayload, null, 2)}</pre>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-200">
             <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Token Insights</div>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Algorithm', val: jwtHeader?.alg || 'Unknown' },
                  { label: 'Issued At', val: jwtPayload.iat ? new Date(jwtPayload.iat * 1000).toLocaleString() : 'N/A' },
                  { label: 'Expires At', val: jwtPayload.exp ? new Date(jwtPayload.exp * 1000).toLocaleString() : 'N/A' },
                  { 
                    label: 'Status', 
                    val: (jwtPayload?.exp ? (Date.now() / 1000 > jwtPayload.exp) : null) === null ? 'No Expiry' : (Date.now() / 1000 > jwtPayload.exp) ? 'Expired ❌' : 'Active ✅', 
                    color: (jwtPayload?.exp && Date.now() / 1000 > jwtPayload.exp) ? 'text-red-500' : 'text-emerald-500' 
                  }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col">
                     <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter mb-1">{item.label}</span>
                     <span className={`text-xs font-black truncate ${(item as any).color || 'text-slate-900'}`}>{item.val}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>
      )}

      {output && slug !== 'jwt-decoder' && (
        <div className="relative group">
          <div className="absolute top-0 right-0 p-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
             <button 
              onClick={() => { navigator.clipboard.writeText(output); onSuccess("Copied!"); }}
              className="px-3 py-1.5 bg-indigo-500 text-white text-[10px] font-black rounded-lg uppercase"
             >
               Quick Copy
             </button>
          </div>
          <textarea
            readOnly
            value={output}
            className="w-full h-80 p-8 bg-slate-900 text-emerald-400 font-mono text-sm border-none outline-none rounded-[2.5rem] resize-none scrollbar-thin scrollbar-thumb-slate-700"
          />
          {downloadUrl && (
            <div className="mt-4 flex justify-center">
              <a 
                href={downloadUrl} 
                download="decoded_output" 
                className="px-8 py-4 bg-emerald-600 text-white rounded-xl font-black text-sm shadow-lg hover:bg-emerald-700 transition-all"
              >
                Download Decoded File
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <ToolLayout
      title={currentConfig.title}
      description={currentConfig.description}
      icon={currentConfig.icon}
      colorClass={currentConfig.colorClass}
      input={inputSlot}
      options={currentConfig.options && currentConfig.options.length > 0 ? <OptionsPanel options={currentConfig.options as any} values={options} onChange={handleOptionChange} /> : undefined}
      actions={actionsSlot}
      result={(output || error || jwtPayload || matches.length > 0) ? resultSlot : undefined}
    />
  );
};

export default DevTools;
