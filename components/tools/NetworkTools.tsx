import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { ipLookupConfig, dnsLookupConfig, whoisLookupConfig, pingToolConfig, tracerouteToolConfig, portCheckerConfig, internetSpeedTestConfig } from '../../config/networkTools';

interface NetworkToolsProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const NETWORK_ORCHESTRATOR_ROLE = `
You are ToolVerse AI Orchestrator.
You act as a world-class Network Analyst, Cyber-Security Expert, DNS Infrastructure Specialist, and Connectivity Diagnostic Specialist.
You are not a chatbot. You are the internal brain of ToolVerse platform.

Follow this 9-step output structure strictly:
1. Understanding of User Goal: Summarize intent (Security audit, OSINT, DNS troubleshooting, WHOIS intelligence, Connectivity diagnosis, Path analysis, Port/Service exposure, or Connection stability).
2. Best Tool Category: Network Tools.
3. Best Tool Name: The specific network utility used.
4. Required Inputs: Parameters (IP/Domain, use case, detail level, packet info, trace hops, port lists, speed metrics, etc.) analyzed.
5. Recommended Settings: Why specific heuristics (risk, TTL, CDN detection, privacy masking, packet loss, latency explanation, ISP boundaries, firewall impacts, stability scoring) were applied.
6. Processing Steps: Logical steps for IP validation, DNS mapping, WHOIS parsing, Ping interpretation, Traceroute bottleneck identification, Port service mapping, or Speed/Jitter stability inference.
7. Expected Result: The master intelligence report covering geolocation hints, record breakdowns, registration signals, reachability diagnostics, path bottlenecks, port status/risk analysis, or line quality scorecard.
8. Optimization Tips: Technical advice (DNS verification, reverse lookup correlation, SPF/DKIM best practices, firewall awareness, traceroute protocol shifts, CDN strategy, port hardening, or connection stability fixes).
9. Next Action Suggestion: Technical follow-up (e.g., WHOIS Lookup, Header Check, Port Check, Ping Tool, Traceroute, Speed Test).
`;

const NetworkTools: React.FC<NetworkToolsProps> = ({ slug, onSuccess, onError }) => {
  const isIPLookup = slug === 'ip-lookup';
  const isDNSLookup = slug === 'dns-lookup';
  const isWHOISLookup = slug === 'whois-lookup';
  const isPingTool = slug === 'ping-tool';
  const isTraceroute = slug === 'traceroute-tool';
  const isPortChecker = slug === 'port-checker';
  const isSpeedTest = slug === 'internet-speed-test';
  
  const [ipAddress, setIpAddress] = useState("");
  const [dnsDomain, setDnsDomain] = useState("");
  const [whoisTarget, setWhoisTarget] = useState("");
  const [whoisRaw, setWhoisRaw] = useState("");
  const [pgTarget, setPgTarget] = useState("");
  const [pgRawOutput, setPgRawOutput] = useState("");
  const [trTarget, setTrTarget] = useState("");
  const [trRaw, setTrRaw] = useState("");
  const [pcTarget, setPcTarget] = useState("");
  const [pcPorts, setPcPorts] = useState("");
  const [pcScanOutput, setPcScanOutput] = useState("");

  const [loading, setLoading] = useState(false);
  const [orchestrationData, setOrchestrationData] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const [options, setOptions] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    const configs = [ipLookupConfig, dnsLookupConfig, whoisLookupConfig, pingToolConfig, tracerouteToolConfig, portCheckerConfig, internetSpeedTestConfig];
    const target = configs.find(c => c.slug === slug);
    if (target) {
      target.options.forEach(opt => initial[opt.id] = (opt as any).default);
    }
    return initial;
  });

  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    if (slug === 'http-header-inspector') {
      setResult({
        "User-Agent": navigator.userAgent,
        "Language": navigator.language,
        "Connection": "keep-alive",
        "Referer": document.referrer || "None",
        "Platform": navigator.platform,
        "Cookies-Enabled": navigator.cookieEnabled ? "Yes" : "No"
      });
    }
  }, [slug]);

  const handleOptionChange = (id: string, value: any) => {
    setOptions(prev => ({ ...prev, [id]: value }));
  };

  const generateMAC = () => {
    const hex = "0123456789ABCDEF";
    let mac = "";
    for (let i = 0; i < 6; i++) {
      mac += hex.charAt(Math.floor(Math.random() * 16));
      mac += hex.charAt(Math.floor(Math.random() * 16));
      if (i < 5) mac += ":";
    }
    setResult({ generated_mac: mac });
    onSuccess("MAC Address Generated");
  };

  const callAIWithRetry = async (prompt: string, modelName: string, attempts = 3): Promise<string> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    for (let i = 0; i < attempts; i++) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
          config: {
            systemInstruction: NETWORK_ORCHESTRATOR_ROLE,
            temperature: 0.7,
          }
        });
        return response.text || "";
      } catch (err: any) {
        console.error(`AI Attempt ${i + 1} failed:`, err);
        if (err.message?.includes("Requested entity was not found")) {
           if (window.aistudio?.openSelectKey) {
             window.aistudio.openSelectKey();
           }
        }
        if (i === attempts - 1) throw err;
        setRetryCount(i + 1);
        await new Promise(resolve => setTimeout(resolve, 2000 * (i + 1)));
      }
    }
    return "";
  };

  const handleRunOrchestrator = async () => {
    if (isIPLookup && !ipAddress.trim()) { onError("Please enter an IP address."); return; }
    if (isDNSLookup && !dnsDomain.trim()) { onError("Please enter a domain name."); return; }
    if (isWHOISLookup && !whoisTarget.trim()) { onError("Please enter a domain or IP."); return; }
    if (isPingTool && !pgTarget.trim()) { onError("Please enter a host or IP."); return; }
    if (isTraceroute && !trTarget.trim()) { onError("Please enter a destination."); return; }
    if (isPortChecker && !pcTarget.trim()) { onError("Please enter a host or IP."); return; }

    setLoading(true);
    setOrchestrationData(null);
    setRetryCount(0);

    try {
      let userTask = "";
      if (isIPLookup) {
        userTask = `Task: Analyze IP "${ipAddress}". Options: ${JSON.stringify(options)}`;
      } else if (isDNSLookup) {
        userTask = `Task: Analyze DNS for "${dnsDomain}". Options: ${JSON.stringify(options)}`;
      } else if (isWHOISLookup) {
        userTask = `Task: Analyze WHOIS for "${whoisTarget}". Raw: "${whoisRaw}". Options: ${JSON.stringify(options)}`;
      } else if (isPingTool) {
        userTask = `Task: Analyze Ping to "${pgTarget}". Raw: "${pgRawOutput}". Options: ${JSON.stringify(options)}`;
      } else if (isTraceroute) {
        userTask = `Task: Analyze Traceroute to "${trTarget}". Raw: "${trRaw}". Options: ${JSON.stringify(options)}`;
      } else if (isPortChecker) {
        userTask = `Task: Analyze Ports for "${pcTarget}". Ports: "${pcPorts}". Raw: "${pcScanOutput}". Options: ${JSON.stringify(options)}`;
      } else if (isSpeedTest) {
        userTask = `
          Task: Estimate and analyze internet speed.
          Test mode: ${options.stTestMode}
          Connection type: ${options.stConnection}
          Primary use case: ${options.stUseCase}
          Number of runs: ${options.stRuns}
          Server preference: ${options.stServerPref}
          Jitter analysis: ${options.stJitterCheck}
          Packet loss estimation: ${options.stPacketLoss}
          Peak/off-peak: ${options.stPeakOffpeak}
          Output style: ${options.stOutput}
          Language: ${options.stLanguage}

          Provide:
          - Download & upload estimates (heuristic)
          - Latency & jitter interpretation
          - Stability score
          - Practical improvement steps
          Do not rely on external speed APIs. Use expert diagnostics.
        `;
      }

      const resultText = await callAIWithRetry(userTask, 'gemini-3-flash-preview');
      setOrchestrationData(resultText);
      onSuccess("Intelligence Report Orchestrated!");
    } catch (err: any) {
      console.error(err);
      onError("Network AI Core is busy. Check your connection and retry.");
    } finally {
      setLoading(false);
    }
  };

  const inputSlot = (
    <div className="space-y-6">
      {isIPLookup ? (
        <div className="space-y-6">
           <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Target IP Address</label>
              <input 
                type="text" 
                value={ipAddress}
                onChange={e => setIpAddress(e.target.value)}
                placeholder="e.g. 8.8.8.8" 
                className="w-full p-6 bg-slate-50 border border-slate-200 rounded-[2rem] focus:ring-8 focus:ring-cyan-500/5 outline-none font-mono text-lg font-bold text-slate-700 shadow-inner transition-all"
              />
           </div>
        </div>
      ) : isDNSLookup ? (
        <div className="space-y-6">
           <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Target Domain Name</label>
              <input 
                type="text" 
                value={dnsDomain}
                onChange={e => setDnsDomain(e.target.value)}
                placeholder="e.g. example.com" 
                className="w-full p-6 bg-slate-50 border border-slate-200 rounded-[2rem] focus:ring-8 focus:ring-cyan-500/5 outline-none font-mono text-lg font-bold text-slate-700 shadow-inner transition-all"
              />
           </div>
        </div>
      ) : isWHOISLookup ? (
        <div className="space-y-6">
           <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Target Domain or IP</label>
              <input 
                type="text" 
                value={whoisTarget}
                onChange={e => setWhoisTarget(e.target.value)}
                placeholder="e.g. google.com" 
                className="w-full p-6 bg-slate-50 border border-slate-200 rounded-[2rem] focus:ring-8 focus:ring-cyan-500/5 outline-none font-mono text-lg font-bold text-slate-700 shadow-inner transition-all"
              />
           </div>
           <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Raw WHOIS Data (Optional)</label>
              <textarea 
                value={whoisRaw}
                onChange={e => setWhoisRaw(e.target.value)}
                placeholder="Paste WHOIS output from terminal here..." 
                className="w-full h-32 p-6 bg-slate-50 border border-slate-200 rounded-[2rem] outline-none font-mono text-xs text-slate-700 shadow-inner transition-all resize-none"
              />
           </div>
        </div>
      ) : isPingTool ? (
        <div className="space-y-6">
           <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Target Host / IP</label>
              <input 
                type="text" 
                value={pgTarget}
                onChange={e => setPgTarget(e.target.value)}
                placeholder="e.g. 8.8.8.8" 
                className="w-full p-6 bg-slate-50 border border-slate-200 rounded-[2rem] outline-none font-mono text-lg font-bold text-slate-700 shadow-inner transition-all"
              />
           </div>
           <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Raw Ping Output (Optional)</label>
              <textarea 
                value={pgRawOutput}
                onChange={e => setPgRawOutput(e.target.value)}
                placeholder="Paste ping output from your terminal..." 
                className="w-full h-32 p-6 bg-slate-50 border border-slate-200 rounded-[2rem] outline-none font-mono text-xs text-slate-700 shadow-inner resize-none"
              />
           </div>
        </div>
      ) : isTraceroute ? (
        <div className="space-y-6">
           <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Destination Host / IP</label>
              <input 
                type="text" 
                value={trTarget}
                onChange={e => setTrTarget(e.target.value)}
                placeholder="e.g. 1.1.1.1" 
                className="w-full p-6 bg-slate-50 border border-slate-200 rounded-[2rem] outline-none font-mono text-lg font-bold text-slate-700 shadow-inner transition-all"
              />
           </div>
           <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Raw Traceroute Output (Optional)</label>
              <textarea 
                value={trRaw}
                onChange={e => setTrRaw(e.target.value)}
                placeholder="Paste traceroute result from your terminal..." 
                className="w-full h-32 p-6 bg-slate-50 border border-slate-200 rounded-[2rem] outline-none font-mono text-xs text-slate-700 shadow-inner resize-none"
              />
           </div>
        </div>
      ) : isPortChecker ? (
        <div className="space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Target Host / IP</label>
                <input 
                  type="text" 
                  value={pcTarget}
                  onChange={e => setPcTarget(e.target.value)}
                  placeholder="e.g. example.com" 
                  className="w-full p-6 bg-slate-50 border border-slate-200 rounded-[2rem] font-mono text-lg font-bold text-slate-700 shadow-inner transition-all"
                />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Ports to Check</label>
                <input 
                  type="text" 
                  value={pcPorts}
                  onChange={e => setPcPorts(e.target.value)}
                  placeholder="e.g. 80, 443" 
                  className="w-full p-6 bg-slate-50 border border-slate-200 rounded-[2rem] font-mono text-lg font-bold text-slate-700 shadow-inner transition-all"
                />
             </div>
           </div>
           <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Raw Scan Output (Optional)</label>
              <textarea 
                value={pcScanOutput}
                onChange={e => setPcScanOutput(e.target.value)}
                placeholder="Paste Nmap or netstat output here..." 
                className="w-full h-32 p-6 bg-slate-50 border border-slate-200 rounded-[2rem] outline-none font-mono text-xs text-slate-700 shadow-inner resize-none"
              />
           </div>
        </div>
      ) : isSpeedTest ? (
        <div className="space-y-12 py-10 flex flex-col items-center">
           <div className="relative w-48 h-48 md:w-64 md:h-64">
              <div className="absolute inset-0 border-8 border-slate-100 rounded-full"></div>
              <div className={`absolute inset-0 border-8 border-cyan-500 rounded-full border-t-transparent ${loading ? 'animate-spin' : ''}`} style={{ transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)' }}></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <div className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter tabular-nums">
                   {loading ? '---' : '0.0'}
                 </div>
                 <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Mbps</div>
              </div>
           </div>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-2xl">
              {[
                { label: 'Download', icon: '⬇️' },
                { label: 'Upload', icon: '⬆️' },
                { label: 'Latency', icon: '📡' },
                { label: 'Jitter', icon: '〰️' }
              ].map((m, i) => (
                <div key={i} className="text-center">
                   <div className="text-2xl mb-1">{m.icon}</div>
                   <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{m.label}</div>
                   <div className="font-black text-slate-700">---</div>
                </div>
              ))}
           </div>
           <div className="p-8 bg-cyan-50 rounded-[2.5rem] border border-cyan-100 flex items-center gap-6 w-full">
              <div className="text-5xl">🚀</div>
              <div>
                 <p className="text-[10px] font-black text-cyan-500 uppercase tracking-widest mb-1">Quality Assessment Engine</p>
                 <p className="text-xs font-bold text-cyan-900 leading-relaxed italic">
                   "Running heuristic connection timing tests. Analyzing packet flight stability and line consistency."
                 </p>
              </div>
           </div>
        </div>
      ) : (
        <div className="text-center py-10">
          <div className="w-20 h-20 bg-cyan-600 rounded-3xl flex items-center justify-center text-white text-4xl mx-auto shadow-2xl mb-6">🌐</div>
          <h3 className="text-3xl font-black text-slate-900 capitalize tracking-tight">{slug.replace(/-/g, ' ')}</h3>
        </div>
      )}

      {!isIPLookup && !isDNSLookup && !isWHOISLookup && !isPingTool && !isTraceroute && !isPortChecker && !isSpeedTest && slug === 'mac-address-generator' && (
        <button onClick={generateMAC} className="w-full py-6 bg-cyan-600 text-white rounded-2xl font-black text-lg">Generate Random MAC</button>
      )}
    </div>
  );

  const activeConfig = isIPLookup ? ipLookupConfig : 
                       isDNSLookup ? dnsLookupConfig : 
                       isWHOISLookup ? whoisLookupConfig : 
                       isPingTool ? pingToolConfig : 
                       isTraceroute ? tracerouteToolConfig : 
                       isPortChecker ? portCheckerConfig : 
                       isSpeedTest ? internetSpeedTestConfig : null;

  const resultSlot = (result || orchestrationData) && (
    <div className="space-y-10 animate-in fade-in slide-in-from-top-4 duration-700">
      {orchestrationData ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {orchestrationData.split('\n\n').slice(0, 6).map((step, idx) => {
              if (!step.includes(':')) return null;
              const [title, val] = step.split(':');
              return (
                <div key={idx} className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                  <span className="text-[8px] font-black text-cyan-500 uppercase tracking-[0.2em] mb-1 block">{title.trim()}</span>
                  <span className="text-[11px] font-bold text-slate-600 line-clamp-2">{val.trim()}</span>
                </div>
              );
            })}
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center px-1">
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
                7. Network Intelligence Report
              </span>
              <button 
                onClick={() => {
                  const sections = orchestrationData.split('7. Expected Result:');
                  const final = sections.length > 1 ? sections[1].split('8. Optimization Tips:')[0].trim() : orchestrationData;
                  navigator.clipboard.writeText(final);
                  onSuccess("Copied!");
                }} 
                className="text-[10px] font-black text-slate-400 hover:text-cyan-600 uppercase tracking-widest"
              >
                Copy Report
              </button>
            </div>
            <div className="bg-slate-900 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group border border-slate-800">
               <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500/50"></div>
               <div className="text-emerald-400 font-mono text-sm leading-relaxed whitespace-pre-wrap italic">
                  {orchestrationData.split('7. Expected Result:')[1]?.split('8. Optimization Tips:')[0]?.trim() || orchestrationData}
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-100">
             <div className="space-y-4">
                <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">8. Expert Refinements</span>
                <div className="bg-amber-50/50 p-6 rounded-3xl border border-amber-100 text-xs font-bold text-amber-900 leading-relaxed italic">
                  {orchestrationData.split('8. Optimization Tips:')[1]?.split('9. Next Action Suggestion:')[0]?.trim() || "Consider infrastructure audit."}
                </div>
             </div>
             <div className="space-y-4">
                <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">9. Recommended Next Action</span>
                <div className="bg-indigo-50/50 p-6 rounded-3xl border border-indigo-100 text-xs font-black text-indigo-900 flex items-center gap-4">
                  <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm shadow-lg animate-bounce">➔</div>
                  {orchestrationData.split('9. Next Action Suggestion:')[1]?.trim() || "Run further validation next."}
                </div>
             </div>
          </div>
        </>
      ) : (
        <div className="bg-slate-950 rounded-[2.5rem] p-8 md:p-12 font-mono text-sm shadow-2xl border border-slate-800 text-emerald-400 overflow-x-auto relative">
          <div className="flex items-center space-x-2 mb-8 border-b border-white/5 pb-4">
            <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Network Diagnostic Output</span>
          </div>
          <pre className="whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );

  return (
    <ToolLayout
      title={activeConfig ? activeConfig.title : slug.replace(/-/g, ' ')}
      description={activeConfig ? activeConfig.description : "Network diagnostic and utility toolkit."}
      icon={activeConfig ? activeConfig.icon : "🌐"}
      colorClass={activeConfig ? activeConfig.colorClass : "bg-cyan-600"}
      input={inputSlot}
      options={activeConfig ? <OptionsPanel options={activeConfig.options as any} values={options} onChange={handleOptionChange} /> : undefined}
      actions={
        (isIPLookup || isDNSLookup || isWHOISLookup || isPingTool || isTraceroute || isPortChecker || isSpeedTest) ? (
          <button 
            onClick={handleRunOrchestrator} 
            disabled={loading}
            className={`w-full py-7 ${activeConfig?.colorClass || 'bg-cyan-600'} text-white rounded-[2.5rem] font-black text-2xl shadow-2xl hover:brightness-110 transition-all transform active:scale-95 disabled:opacity-50`}
          >
            {loading ? (retryCount > 0 ? `Retrying Engine (${retryCount})...` : "Analyzing...") : isSpeedTest ? "Run Speed Analysis" : "Run Diagnostic"}
          </button>
        ) : undefined
      }
      result={resultSlot}
    />
  );
};

export default NetworkTools;