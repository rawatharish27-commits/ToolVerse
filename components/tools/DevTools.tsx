import React, { useState } from 'react';
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { jsonFormatterConfig, base64Config, jwtDecoderConfig, regexTesterConfig, urlEncoderConfig, htmlCssFormatterConfig, jsMinifierConfig, apiResponseViewerConfig } from '../../config/devTools';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const DevTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [input, setInput] = useState(""); // Primary input / URL
  const [testString, setTestString] = useState(""); // Secondary input for Regex
  const [replaceWith, setReplaceWith] = useState(""); // Replacement string for Regex
  const [file, setFile] = useState<File | null>(null);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [decodedFileType, setDecodedFileType] = useState("");
  
  // API Specific State
  const [apiResult, setApiResult] = useState<any>(null);

  // Size comparison state
  const [sizes, setSizes] = useState({ original: 0, minified: 0 });

  // JWT Specific State
  const [jwtHeader, setJwtHeader] = useState<any>(null);
  const [jwtPayload, setJwtPayload] = useState<any>(null);
  const [jwtSignature, setJwtSignature] = useState("");

  // Regex Specific State
  const [matches, setMatches] = useState<RegExpExecArray[]>([]);
  const [highlightedText, setHighlightedText] = useState("");

  const [options, setOptions] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    const configs = [jsonFormatterConfig, base64Config, jwtDecoderConfig, regexTesterConfig, urlEncoderConfig, htmlCssFormatterConfig, jsMinifierConfig, apiResponseViewerConfig];
    const target = configs.find(c => c.slug === slug);
    if (target) {
      target.options.forEach(opt => initial[opt.id] = (opt as any).default);
    }
    return initial;
  });

  const handleOptionChange = (id: string, value: any) => {
    setOptions(prev => ({ ...prev, [id]: value }));
    if (id === 'mode' || id === 'inputType' || id === 'scope' || id === 'language') {
      setOutput("");
      setDownloadUrl(null);
      setError("");
      setMatches([]);
      setHighlightedText("");
      setDecodedFileType("");
      setApiResult(null);
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

  const processJS = () => {
    let code = input.trim();
    if (!code) return;

    try {
      const originalLen = code.length;
      let minified = code;

      if (!options.preserveComments) {
        minified = minified.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '$1');
      } else {
        minified = minified.replace(/\/\*(?!!|)[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '$1');
      }

      if (options.removeNewlines) {
        minified = minified
          .replace(/\s*([\{\}:;,=\+\-\*\/<>!\?&|])\s*/g, '$1')
          .replace(/\s+/g, ' ')
          .trim();
      } else {
        minified = minified
          .split('\n')
          .map(line => line.trim())
          .filter(line => line.length > 0)
          .join('\n');
      }

      setOutput(minified);
      setSizes({ original: originalLen, minified: minified.length });
      onSuccess("JavaScript Minified!");
    } catch (e) {
      setError("Minification failed. Ensure code is valid.");
      onError("Error processing JS.");
    }
  };

  const processHTMLCSS = () => {
    const code = input.trim();
    if (!code) return;

    try {
      let result = "";
      const isMinify = options.mode === "Minify";
      const indentSize = parseInt(options.indent) || 2;
      const indent = " ".repeat(indentSize);

      let targetLang = options.language;
      if (targetLang === "Auto-Detect") {
        targetLang = (code.includes("{") && code.includes("}") && !code.includes("<")) ? "CSS" : "HTML";
      }

      if (targetLang === "CSS") {
        if (isMinify) {
          result = code
            .replace(/\/\*[\s\S]*?\*\//g, "")
            .replace(/\s*([\{\}:;,])\s*/g, "$1")
            .replace(/\s+/g, " ")
            .trim();
        } else {
          result = code
            .replace(/\s*\{\s*/g, " {\n" + indent)
            .replace(/\s*;\s*/g, ";\n" + indent)
            .replace(/\s*\}\s*/g, "\n}\n")
            .replace(/\n\s*\n/g, "\n")
            .replace(new RegExp(`\\n${indent}$`, 'g'), "\n")
            .trim();
        }
      } else {
        if (isMinify) {
          result = code
            .replace(/<!--[\s\S]*?-->/g, "")
            .replace(/>\s+</g, "><")
            .replace(/\s+/g, " ")
            .trim();
        } else {
          let formatted = "";
          let level = 0;
          const tokens = code.split(/(<[^>]+>)/g);
          
          tokens.forEach(token => {
            if (token.match(/^<\/\w/)) {
              level--;
              formatted += "\n" + indent.repeat(Math.max(0, level)) + token;
            } else if (token.match(/^<\w[^>]*[^\/]>$/) && !token.match(/<(br|hr|img|input|link|meta|area|base|col|command|embed|keygen|param|source|track|wbr)[^>]*>/i)) {
              formatted += "\n" + indent.repeat(level) + token;
              level++;
            } else if (token.match(/^<\w.*\/>$/) || token.match(/^<\w/)) {
              formatted += "\n" + indent.repeat(level) + token;
            } else {
              const text = token.trim();
              if (text) formatted += "\n" + indent.repeat(level) + text;
            }
          });
          result = formatted.trim();
        }
      }
      setOutput(result);
      onSuccess(`${targetLang} ${options.mode} complete!`);
    } catch (e) {
      setError("Failed to process code. Ensure syntax is relatively valid.");
      onError("Formatting error.");
    }
  };

  const processBase64 = async () => {
    setDownloadUrl(null);
    setError("");
    setDecodedFileType("");

    if (options.inputType === "Text") {
      if (!input.trim()) return;
      try {
        if (options.mode === "Encode") {
          let result = btoa(unescape(encodeURIComponent(input)));
          if (options.urlSafe) {
            result = result.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
          }
          setOutput(result);
          onSuccess("Text Encoded to Base64!");
        } else {
          let b64 = input.trim();
          if (options.urlSafe) {
            b64 = b64.replace(/-/g, '+').replace(/_/g, '/');
            while (b64.length % 4) b64 += '=';
          }
          const result = decodeURIComponent(escape(atob(b64)));
          setOutput(result);
          onSuccess("Base64 Decoded to Text!");
        }
      } catch (e) {
        setError("Invalid input. Ensure the text is valid for the selected operation.");
        onError("Base64 Error.");
      }
    } else {
      if (!file) {
        if (options.mode === 'Encode') {
           onError("Please select a file.");
        } else {
           if (!input.trim()) { onError("Paste Base64 to decode to file."); return; }
           try {
              let b64 = input.trim();
              if (b64.includes(',')) b64 = b64.split(',')[1];
              if (options.urlSafe) {
                b64 = b64.replace(/-/g, '+').replace(/_/g, '/');
                while (b64.length % 4) b64 += '=';
              }
              const binary = atob(b64);
              const bytes = new Uint8Array(binary.length);
              for (let i = 0; i < binary.length; i++) {
                bytes[i] = binary.charCodeAt(i);
              }
              const blob = new Blob([bytes], { type: "application/octet-stream" });
              setDownloadUrl(URL.createObjectURL(blob));
              onSuccess("Base64 Decoded to File!");
           } catch(e) {
              setError("Failed to decode pasted string into a binary file.");
           }
        }
        return;
      }
      
      setLoading(true);
      const reader = new FileReader();

      reader.onload = () => {
        try {
          const result = reader.result as string;
          if (options.mode === "Encode") {
            let base64Data = result.split(",")[1];
            if (options.urlSafe) {
              base64Data = base64Data.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
            }
            setOutput(base64Data);
            onSuccess("File successfully encoded!");
          } else {
            let b64 = (reader.result as string).trim();
            if (options.urlSafe) {
              b64 = b64.replace(/-/g, '+').replace(/_/g, '/');
              while (b64.length % 4) b64 += '=';
            }
            const binary = atob(b64);
            const bytes = new Uint8Array(binary.length);
            for (let i = 0; i < binary.length; i++) {
              bytes[i] = binary.charCodeAt(i);
            }
            const blob = new Blob([bytes], { type: "application/octet-stream" });
            setDownloadUrl(URL.createObjectURL(blob));
            onSuccess("Encoded file contents decoded!");
          }
        } catch (e) {
          setError("Failed to process file. Ensure contents are valid for the selected operation.");
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
    setJwtSignature("");
    if (!input.trim()) return;
    
    try {
      const parts = input.trim().split('.');
      if (parts.length !== 3) {
        throw new Error("A valid JWT must have 3 parts separated by dots (header.payload.signature).");
      }

      const header = JSON.parse(base64UrlDecode(parts[0]));
      const payload = JSON.parse(base64UrlDecode(parts[1]));

      setJwtHeader(header);
      setJwtPayload(payload);
      setJwtSignature(parts[2]);
      onSuccess("Token Decoded!");
    } catch (e: any) {
      setError(e.message || "Invalid JWT format or content.");
      onError("Decoding failed.");
    }
  };

  const processRegex = () => {
    setMatches([]);
    setOutput("");
    setHighlightedText("");
    if (!input.trim() || !testString.trim()) return;

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
        
        let lastIdx = 0;
        let htmlParts = [];
        found.forEach((m, i) => {
          htmlParts.push(testString.substring(lastIdx, m.index));
          htmlParts.push(`[[${m[0]}]]`);
          lastIdx = m.index + m[0].length;
        });
        htmlParts.push(testString.substring(lastIdx));
        setHighlightedText(htmlParts.join(""));

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

  const processAPI = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setApiResult(null);
    setError("");
    const startTime = performance.now();
    
    try {
      let url = input.trim();
      if (!url.startsWith('http')) url = 'https://' + url;
      
      const res = await fetch(url, { 
        method: options.method,
        // Using cors proxy is often needed but browsers block cross-origin unless server allows it.
        // We warn the user about CORS if it fails.
      });
      const endTime = performance.now();
      
      const headers: Record<string, string> = {};
      res.headers.forEach((v, k) => headers[k] = v);
      
      const body = await res.text();
      let parsedBody = body;
      let isJson = false;
      try {
        parsedBody = JSON.parse(body);
        isJson = true;
      } catch (e) {}

      setApiResult({
        status: res.status,
        statusText: res.statusText,
        time: Math.round(endTime - startTime),
        headers,
        body: parsedBody,
        isJson
      });
      onSuccess("Response received!");
    } catch (e: any) {
      setError("Request failed. Ensure the URL is correct and supports CORS from browser clients. " + (e.message || ""));
      onError("API Request Failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleProcess = () => {
    setLoading(true);
    setError("");
    setOutput("");
    
    if (slug === 'api-response-viewer') {
       processAPI();
       return;
    }

    setTimeout(() => {
      if (slug === 'json-formatter') processJSON();
      if (slug === 'html-css-formatter') processHTMLCSS();
      if (slug === 'js-minifier') processJS();
      if (slug === 'base64-encoder-decoder') processBase64();
      if (slug === 'jwt-decoder') processJWT();
      if (slug === 'regex-tester') processRegex();
      if (slug === 'url-encoder-decoder') processURL();
      setLoading(false);
    }, 100);
  };

  const downloadResult = () => {
    if (downloadUrl) {
       const a = document.createElement('a');
       a.href = downloadUrl;
       a.download = `decoded_file_${Date.now()}`;
       a.click();
       return;
    }
    let ext = "txt";
    if (slug === 'html-css-formatter') {
      const code = input.trim();
      ext = (code.includes("{") && code.includes("}") && !code.includes("<")) ? "css" : "html";
    } else if (slug === 'js-minifier') {
      ext = "js";
    } else if (slug === 'json-formatter') {
      ext = "json";
    }
    const blob = new Blob([output || (apiResult ? JSON.stringify(apiResult.body, null, 2) : "")], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `toolverse_${slug}_${Date.now()}.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const currentConfig = slug === 'json-formatter' ? jsonFormatterConfig : 
                       slug === 'html-css-formatter' ? htmlCssFormatterConfig :
                       slug === 'js-minifier' ? jsMinifierConfig :
                       slug === 'jwt-decoder' ? jwtDecoderConfig : 
                       slug === 'regex-tester' ? regexTesterConfig :
                       slug === 'url-encoder-decoder' ? urlEncoderConfig :
                       slug === 'api-response-viewer' ? apiResponseViewerConfig :
                       base64Config;

  const inputSlot = (
    <div className="space-y-6">
      {slug === 'base64-encoder-decoder' && options.inputType === "File" ? (
        <div className="space-y-6">
          {options.mode === 'Encode' ? (
            <div className="p-10 md:p-16 border-4 border-dashed border-slate-100 rounded-[3rem] text-center hover:border-slate-200 transition-all cursor-pointer relative group">
              <input 
                type="file" 
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
              />
              <div className="text-7xl mb-6 opacity-50 group-hover:scale-110 transition-transform">📄</div>
              <p className="text-slate-900 font-black text-xl">
                {file ? file.name : "Select File to Encode"}
              </p>
              <p className="text-slate-400 text-xs font-bold mt-2 uppercase tracking-widest">Images, PDFs, and any binary supported</p>
            </div>
          ) : (
            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Paste Base64 String to get file</label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste Base64 here..."
                className="w-full h-48 p-6 bg-slate-50 border border-slate-200 rounded-3xl focus:ring-8 focus:ring-indigo-500/5 outline-none font-mono text-sm text-slate-700 shadow-inner resize-none"
              />
            </div>
          )}
        </div>
      ) : slug === 'regex-tester' ? (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Regular Expression Pattern</label>
            <div className="flex items-center bg-slate-50 rounded-2xl border border-slate-200 focus-within:ring-4 focus-within:ring-indigo-100 transition-all">
              <span className="pl-4 text-slate-300 font-mono text-xl">/</span>
              <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="([a-zA-Z]+)"
                className="flex-grow p-4 bg-transparent border-none outline-none font-mono text-lg text-slate-700"
              />
              <span className="pr-4 text-indigo-400 font-mono font-bold text-xl">
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
        <div className="space-y-4">
          {slug === 'api-response-viewer' && (
            <div className="flex items-center gap-4 bg-slate-100 p-2 rounded-2xl border border-slate-200 shadow-inner">
               <span className="pl-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">{options.method}</span>
               <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="https://api.example.com/data"
                className="flex-grow p-3 bg-white rounded-xl border border-slate-200 outline-none font-mono text-sm"
               />
            </div>
          )}
          {slug !== 'api-response-viewer' && (
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                slug === 'json-formatter' ? "Paste raw JSON..." : 
                slug === 'html-css-formatter' ? `Paste your HTML or CSS code here...` :
                slug === 'js-minifier' ? "Paste JavaScript code here..." :
                slug === 'jwt-decoder' ? "Paste JWT token (header.payload.signature)..." :
                slug === 'url-encoder-decoder' ? (options.mode === 'Encode' ? "Enter URL or query parameters..." : "Enter encoded URL...") :
                options.mode === 'Encode' ? "Paste text to encode..." : "Paste Base64 to decode..."
              }
              className="w-full h-64 p-0 bg-transparent text-slate-700 font-mono text-sm border-none outline-none resize-none placeholder:text-slate-300 scrollbar-thin scrollbar-thumb-slate-100"
            />
          )}
        </div>
      )}
    </div>
  );

  const actionsSlot = (
    <div className="flex flex-col sm:flex-row gap-4 w-full">
      <button 
        onClick={handleProcess} 
        disabled={loading || (slug === 'base64-encoder-decoder' && options.inputType === 'File' && options.mode === 'Encode' ? !file : !input && slug !== 'base64-encoder-decoder')}
        className={`flex-grow py-5 text-white rounded-2xl font-black text-lg shadow-xl transition-all active:scale-95 disabled:opacity-50 ${currentConfig.colorClass}`}
      >
        {loading ? "Working..." : 
         slug === 'json-formatter' ? "Format JSON" : 
         slug === 'html-css-formatter' ? `${options.mode} Code` :
         slug === 'js-minifier' ? "Minify JS" :
         slug === 'jwt-decoder' ? "Inspect JWT" : 
         slug === 'regex-tester' ? "Run Regex Engine" : 
         slug === 'url-encoder-decoder' ? `${options.mode} URL` : 
         slug === 'api-response-viewer' ? "Send Request" :
         `${options.mode} Base64`}
      </button>
      {(output || matches.length > 0 || downloadUrl || jwtPayload || apiResult) && (
        <div className="flex gap-2">
           {(output || apiResult) && (
             <button 
              onClick={() => { navigator.clipboard.writeText(output || (apiResult ? JSON.stringify(apiResult.body, null, 2) : "")); onSuccess("Copied!"); }}
              className="py-5 px-8 bg-indigo-600 text-white rounded-2xl font-black text-lg shadow-xl hover:bg-indigo-700 transition-all"
             >
              Copy Body
             </button>
           )}
          {(output || downloadUrl || apiResult) && (
            <button 
              onClick={downloadResult}
              className="py-5 px-8 bg-slate-900 text-white rounded-2xl font-black text-lg shadow-xl hover:bg-slate-800 transition-all"
            >
              Download
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

      {slug === 'api-response-viewer' && apiResult && (
        <div className="space-y-8 animate-in fade-in slide-in-from-top-4">
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className={`p-6 rounded-2xl border flex justify-between items-center ${apiResult.status < 300 ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-rose-50 border-rose-100 text-rose-700'}`}>
                 <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Status</span>
                 <span className="text-xl font-black">{apiResult.status} {apiResult.statusText}</span>
              </div>
              <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-2xl flex justify-between items-center text-indigo-700">
                 <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Response Time</span>
                 <span className="text-xl font-black">{apiResult.time} ms</span>
              </div>
              <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl flex justify-between items-center text-slate-700">
                 <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Type</span>
                 <span className="text-xl font-black">{apiResult.isJson ? 'JSON' : 'Text/HTML'}</span>
              </div>
           </div>

           {options.includeHeaders && (
             <div className="space-y-4">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Response Headers</div>
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4">
                   {Object.entries(apiResult.headers).map(([k, v]) => (
                     <div key={k} className="flex justify-between border-b border-slate-200 pb-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase truncate mr-4">{k}</span>
                        <span className="text-[10px] font-mono text-slate-600 truncate">{v as string}</span>
                     </div>
                   ))}
                </div>
             </div>
           )}

           <div className="space-y-4">
             <div className="flex justify-between items-center px-1">
                <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Response Body</span>
                <span className="text-[9px] font-bold text-slate-300">Format: {apiResult.isJson ? 'JSON' : 'Plain Text'}</span>
             </div>
             <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 shadow-xl max-h-[500px] overflow-auto scrollbar-thin scrollbar-thumb-slate-700">
                <pre className="text-emerald-400 font-mono text-xs leading-relaxed">
                   {apiResult.isJson ? JSON.stringify(apiResult.body, null, 2) : apiResult.body}
                </pre>
             </div>
           </div>
        </div>
      )}

      {slug === 'jwt-decoder' && jwtPayload && (
        <div className="space-y-12 animate-in fade-in slide-in-from-top-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center px-1">
                 <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Part 1: Header</span>
                 <button onClick={() => { navigator.clipboard.writeText(JSON.stringify(jwtHeader, null, 2)); onSuccess("Header Copied!"); }} className="text-[9px] font-bold text-slate-400 uppercase hover:text-indigo-500 transition-colors">Copy JSON</button>
              </div>
              <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-1 h-full bg-rose-500 opacity-40"></div>
                 <pre className="text-rose-400 font-mono text-[11px] overflow-x-auto whitespace-pre-wrap leading-relaxed">{JSON.stringify(jwtHeader, null, 2)}</pre>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center px-1">
                 <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Part 2: Payload</span>
                 <button onClick={() => { navigator.clipboard.writeText(JSON.stringify(jwtPayload, null, 2)); onSuccess("Payload Copied!"); }} className="text-[9px] font-bold text-slate-400 uppercase hover:text-indigo-500 transition-colors">Copy JSON</button>
              </div>
              <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 opacity-40"></div>
                 <pre className="text-indigo-400 font-mono text-[11px] overflow-x-auto whitespace-pre-wrap leading-relaxed">{JSON.stringify(jwtPayload, null, 2)}</pre>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-10 rounded-[3.5rem] border border-slate-200">
             <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 px-1">Validation & Metadata Analysis</div>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { label: 'Algorithm', val: jwtHeader?.alg || 'N/A', icon: '⚡' },
                  { label: 'Issued At (iat)', val: jwtPayload.iat ? new Date(jwtPayload.iat * 1000).toLocaleString() : 'N/A', icon: '📅' },
                  { label: 'Expires At (exp)', val: jwtPayload.exp ? new Date(jwtPayload.exp * 1000).toLocaleString() : 'N/A', icon: '⏳' },
                  { 
                    label: 'Token Health', 
                    val: (jwtPayload?.exp ? (Date.now() / 1000 > jwtPayload.exp) : null) === null ? 'Permanent' : (Date.now() / 1000 > jwtPayload.exp) ? 'Expired' : 'Active', 
                    color: (jwtPayload?.exp && Date.now() / 1000 > jwtPayload.exp) ? 'text-rose-500' : 'text-emerald-500',
                    icon: (jwtPayload?.exp && Date.now() / 1000 > jwtPayload.exp) ? '❌' : '✅'
                  }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                     <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-lg">{item.icon}</div>
                     <div className="flex flex-col">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter mb-0.5">{item.label}</span>
                        <span className={`text-xs font-black truncate ${item.color || 'text-slate-900'}`}>{item.val}</span>
                     </div>
                  </div>
                ))}
             </div>
          </div>

          {options.showSignature && (
            <div className="space-y-4">
               <div className="flex justify-between items-center px-1">
                  <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Part 3: Encrypted Signature Hash</span>
                  <span className="text-[9px] font-bold text-slate-300 uppercase">Integrity Verification Required</span>
               </div>
               <div className="bg-slate-900 p-8 rounded-[2rem] border border-slate-800 shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 opacity-40"></div>
                  <div className="text-emerald-500 font-mono text-[10px] break-all leading-loose opacity-80">{jwtSignature}</div>
               </div>
            </div>
          )}
        </div>
      )}

      {slug === 'base64-encoder-decoder' && downloadUrl && (
        <div className="bg-slate-50 p-12 rounded-[3rem] border border-slate-200 text-center animate-in zoom-in-95">
           <div className="text-7xl mb-6">📦</div>
           <h3 className="text-2xl font-black text-slate-900 mb-2">Decoded File Ready</h3>
           <p className="text-slate-500 font-medium mb-8">Binary data extracted successfully. Click below to save to your device.</p>
           <button 
             onClick={downloadResult}
             className="px-12 py-5 bg-emerald-600 text-white rounded-2xl font-black text-lg shadow-xl hover:bg-emerald-700 transition-all transform hover:scale-105"
           >
             Download Decoded File
           </button>
        </div>
      )}

      {slug === 'js-minifier' && output && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 flex justify-between items-center">
            <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Original Size</span>
            <span className="text-xl font-black text-indigo-600">{sizes.original.toLocaleString()} chars</span>
          </div>
          <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 flex justify-between items-center">
            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Minified Size</span>
            <span className="text-xl font-black text-emerald-600">{sizes.minified.toLocaleString()} chars</span>
          </div>
          <div className="md:col-span-2 bg-slate-50 p-4 rounded-xl text-center">
             <span className="text-xs font-bold text-slate-500">Savings: <span className="text-emerald-600 font-black">{Math.round((1 - sizes.minified / sizes.original) * 100)}%</span></span>
          </div>
        </div>
      )}

      {slug === 'regex-tester' && matches.length > 0 && options.mode === 'Match' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Analysis: {matches.length} Matches Detected</span>
          </div>

          <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-200">
             <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Live Highlighting</div>
             <div className="font-mono text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
               {highlightedText.split('[[').map((part, i) => {
                 if (part.includes(']]')) {
                   const [match, rest] = part.split(']]');
                   return <React.Fragment key={i}><span className="bg-indigo-600 text-white px-1 rounded font-bold">{match}</span>{rest}</React.Fragment>;
                 }
                 return part;
               })}
             </div>
          </div>

          <div className="space-y-4">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Detailed Match Breakdown</div>
            <div className="grid grid-cols-1 gap-3">
              {matches.map((m, i) => (
                <div key={i} className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-indigo-200 transition-all">
                  <div className="flex justify-between mb-3 items-center">
                     <span className="text-[9px] font-black text-slate-400 uppercase bg-slate-50 px-2 py-1 rounded">Match {i + 1}</span>
                     <span className="text-[9px] font-bold text-slate-300">Start Index: {m.index}</span>
                  </div>
                  <div className="font-mono text-slate-700 break-all bg-slate-50 p-3 rounded-lg border border-slate-100">{m[0]}</div>
                  {m.length > 1 && (
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {Array.from(m).slice(1).map((group, gi) => (
                        <div key={gi} className="p-2 bg-indigo-50/50 rounded-lg border border-indigo-100 text-[10px] flex items-center">
                          <span className="text-indigo-400 font-bold mr-2 flex-shrink-0">Group {gi + 1}:</span>
                          <span className="text-slate-600 font-mono truncate">{group || <em className="opacity-50">undefined</em>}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {output && slug !== 'jwt-decoder' && slug !== 'api-response-viewer' && (
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
      result={(output || error || jwtPayload || matches.length > 0 || downloadUrl || apiResult) ? resultSlot : undefined}
    />
  );
};

export default DevTools;