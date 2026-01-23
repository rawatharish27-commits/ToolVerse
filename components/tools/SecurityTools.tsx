import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { passwordStrengthConfig, hashGeneratorConfig, encryptorConfig, decryptorConfig } from '../../config/securityTools';
import SparkMD5 from 'spark-md5';

interface SecurityToolsProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const SECURITY_ORCHESTRATOR_ROLE = `
You are ToolVerse AI Orchestrator.
You act as a world-class Cybersecurity Analyst, Cryptography Expert, and Threat Modeling Specialist.
You are not a chatbot. You are the internal brain of ToolVerse platform.

Follow this 9-step output structure strictly:
1. Understanding of User Goal: Summarize intent (Password audit, encryption, decryption, integrity check, or encoding).
2. Best Tool Category: Security Tools.
3. Best Tool Name: The specific security utility used.
4. Required Inputs: What parameters (password, key, iterations, cipher, salt, etc.) were analyzed.
5. Recommended Settings: Explain why specific entropy, algorithm selection, or derivation rounds were used.
6. Processing Steps: Logical steps for entropy calculation, PBKDF2 derivation, AES block processing, or tag verification.
7. Expected Result: The master risk report including strength scores, attack timelines, or integrity verification signals.
8. Optimization Tips: Technical advice (MFA, Salt length, PBKDF2 best practices, or symmetric vs asymmetric logic).
9. Next Action Suggestion: Technical follow-up (e.g., Password Generator, Decryptor, or Hash Checker).
`;

const SecurityTools: React.FC<SecurityToolsProps> = ({ slug, onSuccess, onError }) => {
  const isPasswordChecker = slug === 'password-strength-checker';
  const isHashGenerator = slug === 'security-hash-generator';
  const isEncryptor = slug === 'security-encryptor';
  const isDecryptor = slug === 'security-decryptor';
  const isHashLegacy = slug === 'sha512-hash-generator';
  const isBase64Encoder = slug === 'base64-file-encoder';

  const [input, setInput] = useState('');
  const [passphrase, setPassphrase] = useState('');
  const [output, setOutput] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [orchestrationData, setOrchestrationData] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const [options, setOptions] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    const config = isPasswordChecker ? passwordStrengthConfig :
                   isHashGenerator ? hashGeneratorConfig :
                   isEncryptor ? encryptorConfig :
                   isDecryptor ? decryptorConfig : null;
    if (config) {
      config.options.forEach(opt => initial[opt.id] = (opt as any).default);
    }
    return initial;
  });

  const handleOptionChange = (id: string, value: any) => {
    setOptions(prev => ({ ...prev, [id]: value }));
  };

  const callAIWithRetry = async (prompt: string, modelName: string, attempts = 3): Promise<string> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    for (let i = 0; i < attempts; i++) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
          config: {
            systemInstruction: SECURITY_ORCHESTRATOR_ROLE,
            temperature: 0.7,
          }
        });
        return response.text || "";
      } catch (err: any) {
        if (err.message?.includes("Requested entity was not found")) {
           if (window.aistudio?.openSelectKey) window.aistudio.openSelectKey();
        }
        if (i === attempts - 1) throw err;
        setRetryCount(i + 1);
        await new Promise(resolve => setTimeout(resolve, 2000 * (i + 1)));
      }
    }
    return "";
  };

  // --- CRYPTO ENGINE CORE ---
  
  const bufferToBase64 = (buf: Uint8Array) => btoa(String.fromCharCode(...buf));
  const base64ToBuffer = (b64: string) => Uint8Array.from(atob(b64), c => c.charCodeAt(0));

  const deriveKey = async (pass: string, salt: Uint8Array, iterations: number) => {
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      encoder.encode(pass),
      "PBKDF2",
      false,
      ["deriveKey"]
    );
    return crypto.subtle.deriveKey(
      { name: "PBKDF2", salt, iterations, hash: "SHA-256" },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"]
    );
  };

  const handleEncrypt = async () => {
    if (!input.trim() || !passphrase.trim()) { onError("Input and Passphrase required."); return; }
    setLoading(true);
    try {
      const salt = crypto.getRandomValues(new Uint8Array(16));
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const iterations = parseInt(options.enIterations.replace(/,/g, ''));
      const key = await deriveKey(passphrase, salt, iterations);
      
      const encoder = new TextEncoder();
      const encrypted = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        key,
        encoder.encode(input)
      );

      const combined = new Uint8Array(salt.length + iv.length + encrypted.byteLength);
      combined.set(salt, 0);
      combined.set(iv, salt.length);
      combined.set(new Uint8Array(encrypted), salt.length + iv.length);

      const b64 = bufferToBase64(combined);
      setOutput(b64);

      const userTask = `
        Task: Symmetric Encryption (AES-GCM).
        Input Purpose: "${options.enUseCase}"
        Iterations: "${options.enIterations}"
        Passphrase Provided: [HIDDEN]
        Logic: Authenticated Encryption with PBKDF2 derivation.
        
        Provide: Security audit of the process, key length confirmation, and advice on secure storage.
      `;

      const aiText = await callAIWithRetry(userTask, 'gemini-3-flash-preview');
      setOrchestrationData(aiText);
      onSuccess("Data Encrypted & Audited!");
    } catch (e) {
      onError("Encryption Engine Failure.");
    } finally {
      setLoading(false);
    }
  };

  const handleDecrypt = async () => {
    if (!input.trim() || !passphrase.trim()) { onError("Input and Passphrase required."); return; }
    setLoading(true);
    try {
      const combined = base64ToBuffer(input.trim());
      const salt = combined.slice(0, 16);
      const iv = combined.slice(16, 28);
      const data = combined.slice(28);
      const iterations = 200000; // Standard for ToolVerse

      const key = await deriveKey(passphrase, salt, iterations);
      const decrypted = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv },
        key,
        data
      );

      const decoder = new TextDecoder();
      const result = decoder.decode(decrypted);
      setOutput(result);

      const userTask = `
        Task: Symmetric Decryption (AES-GCM).
        Success: TRUE
        Integrity Mode: "${options.deTamperCheck}"
        Language: "${options.deLanguage}"

        Provide: Integrity verification report and secure data handling tips.
      `;

      const aiText = await callAIWithRetry(userTask, 'gemini-3-flash-preview');
      setOrchestrationData(aiText);
      onSuccess("Data Decrypted & Verified!");
    } catch (e) {
      onError("Decryption failed. Wrong password or tampered data.");
    } finally {
      setLoading(false);
    }
  };

  const handleRunOrchestrator = async () => {
    if (isPasswordChecker && !input.trim()) { onError("Please enter a password to analyze."); return; }
    if (isHashGenerator && !input.trim()) { onError("Please enter text to hash."); return; }
    if (isEncryptor) { handleEncrypt(); return; }
    if (isDecryptor) { handleDecrypt(); return; }

    setLoading(true);
    setOrchestrationData(null);
    setRetryCount(0);

    try {
      let userTask = "";
      if (isPasswordChecker) {
        userTask = `Task: Analyze password strength and attack resistance. Password: "${input}". Options: ${JSON.stringify(options)}`;
      } else if (isHashGenerator) {
        const hashResult = await computeDigest(input, options.hgAlgorithm);
        let finalHash = hashResult;
        if (options.hgUppercase === "Uppercase hex") finalHash = finalHash.toUpperCase();
        setOutput(finalHash);
        userTask = `Task: Cryptographic Hash Generation. Algo: "${options.hgAlgorithm}". Hash: "${finalHash}". Context: "${options.hgUseCase}"`;
      }

      const resultText = await callAIWithRetry(userTask, 'gemini-3-flash-preview');
      setOrchestrationData(resultText);
      onSuccess(isHashGenerator ? "Hash Generated & Audited!" : "Audit Orchestrated!");
    } catch (err: any) {
      onError("Security Core is busy.");
    } finally {
      setLoading(false);
    }
  };

  const computeDigest = async (text: string, algorithm: string): Promise<string> => {
    if (algorithm === "MD5") return SparkMD5.hash(text);
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    try {
      const hashBuffer = await crypto.subtle.digest(algorithm, data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (e) {
      const fallbackBuffer = await crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(fallbackBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }
  };

  const inputSlot = (
    <div className="space-y-6">
      {(isEncryptor || isDecryptor) && (
        <div className="space-y-4">
           <div className="space-y-2">
             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Secret Passphrase</label>
             <input 
              type="password" 
              value={passphrase} 
              onChange={e => setPassphrase(e.target.value)} 
              placeholder="Your encryption key..." 
              className="w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-8 focus:ring-indigo-500/5 outline-none font-bold text-slate-700 shadow-inner transition-all"
             />
           </div>
        </div>
      )}

      <div className="space-y-2">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">
          {isPasswordChecker ? 'Password to Audit' : isEncryptor ? 'Text to Encrypt' : isDecryptor ? 'Encrypted String (Base64)' : 'Input Content'}
        </label>
        <textarea 
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={isDecryptor ? "Paste Encrypted String..." : "Type or paste here..."}
          className={`w-full h-40 p-6 bg-slate-50 border border-slate-200 rounded-[2rem] focus:ring-8 focus:ring-indigo-500/5 outline-none ${isDecryptor ? 'font-mono text-xs' : 'font-sans text-lg font-bold'} text-slate-700 shadow-inner resize-none transition-all`}
        />
      </div>

      <div className="p-8 bg-indigo-50 rounded-[2.5rem] border border-indigo-100 flex items-center gap-6">
        <div className="text-5xl">{isEncryptor ? '🔑' : isDecryptor ? '🔓' : '🛡️'}</div>
        <div>
          <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-1">Cryptographic Engine</p>
          <p className="text-xs font-bold text-indigo-900 leading-relaxed italic">
            {isEncryptor ? '"Utilizing AES-GCM 256-bit. All keys derived locally via PBKDF2."' : isDecryptor ? '"Verifying authentication tag and integrity. No data transmitted."' : '"Running heuristic pattern analysis and entropy calculation."'}
          </p>
        </div>
      </div>
    </div>
  );

  const resultSlot = (output || orchestrationData) && (
    <div className="space-y-10 animate-in fade-in slide-in-from-top-4 duration-700">
      {orchestrationData && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {orchestrationData.split('\n\n').slice(0, 6).map((step, idx) => {
              if (!step.includes(':')) return null;
              const [title, val] = step.split(':');
              return (
                <div key={idx} className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                  <span className="text-[8px] font-black text-indigo-500 uppercase tracking-[0.2em] mb-1 block">{title.trim()}</span>
                  <span className="text-[11px] font-bold text-slate-600 line-clamp-2">{val.trim()}</span>
                </div>
              );
            })}
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center px-1">
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
                7. {isEncryptor ? 'Cipher Output & Audit' : isDecryptor ? 'Cleartext & Verification' : 'Intelligence Report'}
              </span>
            </div>
            {(isEncryptor || isDecryptor || isHashGenerator) && output && (
              <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-3xl mb-4 group relative">
                 <div className="text-[9px] font-black text-indigo-600 uppercase tracking-widest mb-3">{isEncryptor ? 'Encrypted Result' : isDecryptor ? 'Decrypted Result' : 'Computed Hash'}</div>
                 <div className="font-mono text-sm font-black text-indigo-900 break-all">{output}</div>
                 <button onClick={() => { navigator.clipboard.writeText(output); onSuccess("Copied!"); }} className="absolute top-4 right-4 text-[9px] font-black text-indigo-400 uppercase hover:text-indigo-700">Copy</button>
              </div>
            )}
            <div className="bg-slate-900 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group border border-slate-800">
               <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500/50"></div>
               <div className="text-emerald-400 font-mono text-sm leading-relaxed whitespace-pre-wrap italic">
                  {orchestrationData.split('7. Expected Result:')[1]?.split('8. Optimization Tips:')[0]?.trim() || orchestrationData}
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-100">
             <div className="space-y-4">
                <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">8. Expert Hardening Tips</span>
                <div className="bg-amber-50/50 p-6 rounded-3xl border border-amber-100 text-xs font-bold text-amber-900 leading-relaxed">
                  {orchestrationData.split('8. Optimization Tips:')[1]?.split('9. Next Action Suggestion:')[0]?.trim() || "Stay Secure."}
                </div>
             </div>
             <div className="space-y-4">
                <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">9. Strategic Next Action</span>
                <div className="bg-indigo-50/50 p-6 rounded-3xl border border-indigo-100 text-xs font-black text-indigo-900 flex items-center gap-4">
                  <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm shadow-lg animate-bounce">➔</div>
                  {orchestrationData.split('9. Next Action Suggestion:')[1]?.trim() || "Run audit next."}
                </div>
             </div>
          </div>
        </>
      )}
    </div>
  );

  const activeConfig = isPasswordChecker ? passwordStrengthConfig : isHashGenerator ? hashGeneratorConfig : isEncryptor ? encryptorConfig : isDecryptor ? decryptorConfig : null;

  return (
    <ToolLayout
      title={activeConfig?.title || slug.replace(/-/g, ' ')}
      description={activeConfig?.description || "Professional cryptographic utility."}
      icon={activeConfig?.icon || "🛡️"}
      colorClass={activeConfig?.colorClass || "bg-indigo-600"}
      input={inputSlot}
      options={activeConfig ? <OptionsPanel options={activeConfig.options as any} values={options} onChange={handleOptionChange} /> : undefined}
      actions={
        <button 
          onClick={handleRunOrchestrator} 
          disabled={loading}
          className={`w-full py-7 ${activeConfig?.colorClass || 'bg-indigo-600'} text-white rounded-[2.5rem] font-black text-2xl shadow-2xl hover:brightness-110 transition-all active:scale-95 disabled:opacity-50`}
        >
          {loading ? (retryCount > 0 ? `Retrying... (${retryCount})` : "Processing...") : isEncryptor ? "Securely Encrypt Text" : isDecryptor ? "Verify & Decrypt String" : "Analyze Security Risk"}
        </button>
      }
      result={resultSlot}
    />
  );
};

export default SecurityTools;