import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { 
  eduStudyPlannerConfig, 
  eduSummaryGeneratorConfig, 
  eduEssayGraderConfig, 
  eduMathSolverConfig, 
  eduQuizCreatorConfig, 
  eduCitationConfig, 
  eduResearchAssistantConfig, 
  eduLanguageTutorConfig, 
  eduConceptExplainerConfig, 
  eduCodingTutorConfig 
} from '../../config/educationTools';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const EDU_ORCHESTRATOR_ROLE = `
You are ToolVerse AI Orchestrator.
You act as an elite Academic Consultant, Pedagogy Expert, and Technical Tutor.
You are not a chatbot. You are the internal brain of ToolVerse platform.

Follow this 9-step output structure strictly:
1. Understanding of User Goal: Summarize intent (Planning, Summarization, Grading, Solving, Testing, Researching, etc.).
2. Best Tool Category: Education Tools.
3. Best Tool Name: The specific education utility used.
4. Required Inputs: What parameters (subject, topic, level, goal, style, etc.) were analyzed.
5. Recommended Settings: Explain why these specific pedagogy settings were used.
6. Processing Steps: Logic used for plan creation, extraction, grading criteria, logic solving, or quiz engineering.
7. Expected Result: The master educational output (Schedule, Summary, Score, Step-by-Step, Quiz, Citation, or Explanation).
8. Optimization Tips: Technical study tips (Active recall techniques, spaced repetition scheduling, writing style fixes).
9. Next Action Suggestion: Technical next step (e.g., Generate Quiz from these notes, Grade the essay now).
`;

const EducationTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const isPlanner = slug === 'edu-study-planner';
  const isSummarizer = slug === 'edu-summary-generator';
  const isGrader = slug === 'edu-essay-grader';
  const isSolver = slug === 'edu-math-solver';
  const isQuizMaker = slug === 'edu-quiz-creator';
  const isCitation = slug === 'edu-citation-architect';
  const isResearch = slug === 'edu-research-assistant';
  const isTutor = slug === 'edu-language-tutor';
  const isExplainer = slug === 'edu-concept-explainer';
  const isCoding = slug === 'edu-coding-tutor';

  const [inputText, setInputText] = useState("");
  const [topic, setTopic] = useState("");
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [orchestrationData, setOrchestrationData] = useState<string | null>(null);

  const activeConfig = isPlanner ? eduStudyPlannerConfig : 
                       isSummarizer ? eduSummaryGeneratorConfig : 
                       isGrader ? eduEssayGraderConfig : 
                       isSolver ? eduMathSolverConfig :
                       isQuizMaker ? eduQuizCreatorConfig :
                       isCitation ? eduCitationConfig :
                       isResearch ? eduResearchAssistantConfig :
                       isTutor ? eduLanguageTutorConfig :
                       isExplainer ? eduConceptExplainerConfig :
                       eduCodingTutorConfig;

  const [options, setOptions] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    activeConfig.options.forEach(opt => initial[opt.id] = (opt as any).default);
    return initial;
  });

  const handleOptionChange = (id: string, value: any) => {
    setOptions(prev => ({ ...prev, [id]: value }));
  };

  const callAIWithRetry = async (prompt: string, modelName: string, attempts = 3): Promise<string> => {
    // Fix: Use process.env.API_KEY directly as per guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    for (let i = 0; i < attempts; i++) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
          config: {
            systemInstruction: EDU_ORCHESTRATOR_ROLE,
            temperature: 0.75,
          }
        });
        return response.text || "";
      } catch (err: any) {
        if (i === attempts - 1) throw err;
        setRetryCount(i + 1);
        await new Promise(resolve => setTimeout(resolve, 2000 * (i + 1)));
      }
    }
    return "";
  };

  const handleRunOrchestrator = async () => {
    if (!inputText.trim() && !topic.trim() && !subject.trim()) {
      onError("Primary inputs are required.");
      return;
    }

    setLoading(true);
    setOrchestrationData(null);
    setRetryCount(0);

    try {
      // Logic for choosing model: Study Planner, Solver, Research and Coding are complex
      const isComplex = [isPlanner, isSolver, isResearch, isCoding].some(val => val);
      const model = isComplex ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview';

      const userTask = `
        User Request: Educational Content Generation
        - Tool Slug: ${slug}
        - Topic: "${topic}"
        - Subject: "${subject}"
        - Content: "${inputText}"
        - Settings: ${JSON.stringify(options)}
      `;

      const result = await callAIWithRetry(userTask, model);
      setOrchestrationData(result);
      onSuccess("Academic Success Orchestrated!");
    } catch (err: any) {
      console.error(err);
      onError("AI is stabilizing. Please try again in 10 seconds.");
    } finally {
      setLoading(false);
      setRetryCount(0);
    }
  };

  const inputSlot = (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Subject / Field</label>
          <input type="text" value={subject} onChange={e => setSubject(e.target.value)} placeholder="e.g. Medieval History" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-slate-700 shadow-inner" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Topic / Exam</label>
          <input type="text" value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g. Midterm 2" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-slate-700 shadow-inner" />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">
          Help context / Data
        </label>
        <textarea
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          placeholder="Paste notes, problems, or describe your needs..."
          className="w-full h-48 p-6 bg-slate-50 border border-slate-200 rounded-3xl focus:ring-8 focus:ring-amber-500/5 outline-none font-medium text-slate-700 shadow-inner resize-none transition-all"
        />
      </div>
    </div>
  );

  const resultSlot = orchestrationData && (
    <div className="space-y-10 animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {orchestrationData.split('\n\n').slice(0, 6).map((step, idx) => {
          if (!step.includes(':')) return null;
          const [title, val] = step.split(':');
          return (
            <div key={idx} className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
              <span className="text-[8px] font-black text-amber-500 uppercase tracking-[0.2em] mb-1 block">{title.trim()}</span>
              <span className="text-[11px] font-bold text-slate-600 line-clamp-2">{val.trim()}</span>
            </div>
          );
        })}
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center">
            <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
            7. Master Output
          </span>
          <button 
            onClick={() => {
              const sections = orchestrationData.split('7. Expected Result:');
              const final = sections.length > 1 ? sections[1].split('8. Optimization Tips:')[0].trim() : orchestrationData;
              navigator.clipboard.writeText(final);
              onSuccess("Copied!");
            }} 
            className="text-[10px] font-black text-slate-400 hover:text-amber-600 uppercase tracking-widest"
          >
            Copy
          </button>
        </div>
        <div className="bg-slate-900 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group border border-slate-800">
           <div className="absolute top-0 left-0 w-1 h-full bg-amber-500/50"></div>
           <div className="text-emerald-400 font-mono text-sm leading-relaxed italic whitespace-pre-wrap">
              {orchestrationData.split('7. Expected Result:')[1]?.split('8. Optimization Tips:')[0]?.trim() || orchestrationData}
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-100">
         <div className="space-y-4">
            <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">8. Expert Tips</span>
            <div className="bg-amber-50/50 p-6 rounded-3xl border border-amber-100 text-xs font-bold text-amber-900 leading-relaxed">
              {orchestrationData.split('8. Optimization Tips:')[1]?.split('9. Next Action Suggestion:')[0]?.trim() || "Review closely."}
            </div>
         </div>
         <div className="space-y-4">
            <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">9. Recommended Next</span>
            <div className="bg-amber-50/50 p-6 rounded-3xl border border-amber-100 text-xs font-black text-amber-900 flex items-center gap-4">
              <div className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm shadow-lg animate-bounce">➔</div>
              {orchestrationData.split('9. Next Action Suggestion:')[1]?.trim() || "Start learning."}
            </div>
         </div>
      </div>
    </div>
  );

  return (
    <ToolLayout
      title={activeConfig.title}
      description={activeConfig.description}
      icon={activeConfig.icon}
      colorClass={activeConfig.colorClass}
      input={inputSlot}
      options={<OptionsPanel options={activeConfig.options as any} values={options} onChange={handleOptionChange} />}
      actions={
        <button 
          onClick={handleRunOrchestrator} 
          disabled={loading}
          className={`w-full py-7 ${activeConfig.colorClass} text-white rounded-[2.5rem] font-black text-2xl shadow-2xl hover:brightness-110 transition-all transform active:scale-95 disabled:opacity-50`}
        >
          {loading ? (retryCount > 0 ? `Retrying AI (${retryCount})...` : "Engaging AI Academic Engine...") : "Process Intelligence"}
        </button>
      }
      result={resultSlot}
    />
  );
};

export default EducationTools;