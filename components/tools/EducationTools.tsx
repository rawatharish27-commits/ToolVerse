import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { 
  eduStudyPlannerConfig, 
  eduSummaryGeneratorConfig, 
  eduEssayGraderConfig, 
  eduMathSolverConfig, 
  eduQuizGeneratorConfig, 
  eduCitationConfig, 
  eduResearchAssistantConfig, 
  eduLanguageTutorConfig, 
  eduConceptExplainerConfig, 
  eduCodingTutorConfig,
  eduEquationSolverConfig,
  eduFormulaGeneratorConfig,
  eduUnitPracticeConfig,
  eduFlashcardGeneratorConfig,
  eduAssignmentFormatterConfig
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
1. Understanding of User Goal: Summarize intent.
2. Best Tool Category: Education Tools.
3. Best Tool Name: The specific education utility used.
4. Required Inputs: What parameters (subject, topic, level, goal, style, etc.) were analyzed.
5. Recommended Settings: Explain why these specific pedagogy settings were used.
6. Processing Steps: Logic used for content analysis, grading, solving, or quiz engineering.
7. Expected Result: The master educational output (Steps, Quiz, Score, or Citation).
8. Optimization Tips: Technical study tips (Active recall, memory aids).
9. Next Action Suggestion: Technical next step.
`;

const EducationTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const isPlanner = slug === 'edu-study-planner';
  const isSummarizer = slug === 'edu-summary-generator';
  const isGrader = slug === 'edu-essay-grader';
  const isSolver = slug === 'edu-math-solver';
  const isEquationSolver = slug === 'edu-equation-solver';
  const isFormulaGen = slug === 'edu-formula-generator';
  const isUnitPractice = slug === 'edu-unit-practice';
  const isQuizMaker = slug === 'edu-quiz-generator';
  const isFlashcard = slug === 'edu-flashcard-generator';
  const isAssignmentFormatter = slug === 'edu-assignment-formatter';
  const isCitation = slug === 'edu-citation-architect';
  
  // States for dynamic inputs
  const [inputText, setInputText] = useState("");
  const [topic, setTopic] = useState("");
  const [subject, setSubject] = useState("");
  const [studentName, setStudentName] = useState("");
  const [rollId, setRollId] = useState("");
  const [instructor, setInstructor] = useState("");
  
  // Citation Specific States
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [year, setYear] = useState("");
  const [url, setUrl] = useState("");
  const [doi, setDoi] = useState("");
  const [accessDate, setAccessDate] = useState("");
  const [sourceName, setSourceName] = useState("");

  const [loading, setLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [orchestrationData, setOrchestrationData] = useState<string | null>(null);

  const configs = [
    eduStudyPlannerConfig, eduSummaryGeneratorConfig, eduEssayGraderConfig,
    eduMathSolverConfig, eduEquationSolverConfig, eduFormulaGeneratorConfig,
    eduUnitPracticeConfig, eduQuizGeneratorConfig, eduFlashcardGeneratorConfig, 
    eduAssignmentFormatterConfig, eduCitationConfig, eduResearchAssistantConfig, 
    eduLanguageTutorConfig, eduConceptExplainerConfig, eduCodingTutorConfig
  ];
  const activeConfig = configs.find(c => c.slug === slug) || eduStudyPlannerConfig;

  const [options, setOptions] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    activeConfig.options.forEach(opt => initial[opt.id] = (opt as any).default);
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
            systemInstruction: EDU_ORCHESTRATOR_ROLE,
            temperature: 0.7,
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
    const isBasicInputRequired = !isQuizMaker && !isFormulaGen && !isUnitPractice && !isFlashcard && !isPlanner && !isSummarizer && !isAssignmentFormatter && !isCitation;
    if (isBasicInputRequired && !inputText.trim() && !topic.trim() && !subject.trim()) {
      onError("Primary inputs are required.");
      return;
    }

    if (isCitation && (!author.trim() || !topic.trim())) {
      onError("Author and Title are minimum requirements for citation.");
      return;
    }

    if (isFormulaGen && !topic.trim()) {
      onError("Topic name is required for formula generation.");
      return;
    }
    
    if (isUnitPractice && (!subject.trim() || !topic.trim())) {
      onError("Subject and Unit/Chapter are required.");
      return;
    }

    if (isQuizMaker && (!subject.trim() || !topic.trim())) {
      onError("Subject and Topic are required for the quiz.");
      return;
    }

    if ((isFlashcard || isSummarizer || isAssignmentFormatter) && !inputText.trim()) {
      onError("Source content/notes are required.");
      return;
    }

    if (isPlanner && (!topic.trim() || !subject.trim() || !inputText.trim())) {
       onError("Exam Name, Subjects, and Syllabus Status are required for planning.");
       return;
    }

    setLoading(true);
    setOrchestrationData(null);
    setRetryCount(0);

    try {
      const isComplex = [isPlanner, isSolver, isGrader, isEquationSolver, isFormulaGen, isUnitPractice, isQuizMaker, isFlashcard, isSummarizer, isAssignmentFormatter, isCitation].some(val => val);
      const model = isComplex ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview';

      let userTask = "";
      if (isCitation) {
        userTask = `
Generate an academic citation.
Source type: ${options.ctSourceType}
Author(s): ${author}
Title: ${topic}
Website / Journal / Source Context: ${sourceName}
Publisher: ${publisher}
Year: ${year}
URL: ${url}
DOI: ${doi}
Access date: ${accessDate}
Citation style: ${options.ctStyle}
Include in-text citation: ${options.ctInText}
Language: ${options.ctLanguage}

Generate a perfectly formatted citation following the style strictly. Include in-text citation if selected.
`;
      } else if (isFormulaGen) {
        userTask = `Generate formulas for: Topic: ${topic}, Subject: ${options.fgSubject}, Level: ${options.fgChapterLevel}. Output format: ${options.fgFormat}.`;
      } else if (isUnitPractice) {
        userTask = `Create practice questions for: Subject: ${subject}, Unit: ${topic}, Level: ${options.upLevel}, Difficulty: ${options.upDifficulty}.`;
      } else if (isQuizMaker) {
        userTask = `Create a quiz for: Subject: ${subject}, Topic: ${topic}, Level: ${options.qzLevel}, Count: ${options.qzCount}.`;
      } else if (isFlashcard) {
        userTask = `Create flashcards from: Content: ${inputText}, Subject: ${options.fcSubject}, Count: ${options.fcCount}.`;
      } else if (isAssignmentFormatter) {
        userTask = `Format the following assignment: Title: ${topic}, Subject: ${subject}, Content: ${inputText}, Level: ${options.afLevel}, Style: ${options.afFormat}.`;
      } else if (isSummarizer) {
        userTask = `Summarize the following study notes: ${inputText}. Subject: ${options.nsSubject}, Length: ${options.nsLength}, Style: ${options.nsStyle}.`;
      } else if (isPlanner) {
        userTask = `Create a personalized study plan for ${topic}. Subjects: ${subject}. Syllabus: ${inputText}. Exam Date: ${options.spExamDate}, Daily Hours: ${options.spHours}.`;
      } else {
        userTask = `Tool: ${slug}, Subject: "${subject}", Topic: "${topic}", Input: "${inputText}", Config: ${JSON.stringify(options)}`;
      }

      const result = await callAIWithRetry(userTask, model);
      setOrchestrationData(result);
      onSuccess("Academic Result Orchestrated!");
    } catch (err: any) {
      console.error(err);
      onError("AI Core at capacity. Retrying... If error persists, check your API key.");
    } finally {
      setLoading(false);
      setRetryCount(0);
    }
  };

  const inputSlot = (
    <div className="space-y-8">
      {isCitation ? (
        <div className="space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Source Title / Paper Title</label>
                <input type="text" value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g. The Theory of Relativity" className="w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-8 focus:ring-amber-500/5 outline-none font-bold text-slate-700 shadow-inner" />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Author(s)</label>
                <input type="text" value={author} onChange={e => setAuthor(e.target.value)} placeholder="e.g. Albert Einstein" className="w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold text-slate-700" />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Website / Journal Name</label>
                <input type="text" value={sourceName} onChange={e => setSourceName(e.target.value)} placeholder="e.g. Scientific American" className="w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold text-slate-700" />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Publisher</label>
                <input type="text" value={publisher} onChange={e => setPublisher(e.target.value)} placeholder="e.g. Springer" className="w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold text-slate-700" />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Year of Publication</label>
                <input type="text" value={year} onChange={e => setYear(e.target.value)} placeholder="e.g. 1915" className="w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold text-slate-700" />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">URL (if applicable)</label>
                <input type="text" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://..." className="w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold text-slate-700" />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">DOI (if applicable)</label>
                <input type="text" value={doi} onChange={e => setDoi(e.target.value)} placeholder="e.g. 10.1038/..." className="w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold text-slate-700" />
             </div>
             <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Access Date (for Web)</label>
                <input type="text" value={accessDate} onChange={e => setAccessDate(e.target.value)} placeholder="e.g. 2024-03-25" className="w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold text-slate-700" />
             </div>
           </div>
           <div className="p-8 bg-amber-50 rounded-[2.5rem] border border-amber-100 flex items-center gap-6">
              <div className="text-5xl">🖋️</div>
              <div>
                 <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-1">Citation Compliance Core</p>
                 <p className="text-xs font-bold text-amber-900 leading-relaxed italic">
                   "Generating style-accurate references. Ensure all metadata is filled for zero errors."
                 </p>
              </div>
           </div>
        </div>
      ) : isAssignmentFormatter ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Assignment Title</label>
                <input type="text" value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g. Impacts of Climate Change on Biodiversity" className="w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-8 focus:ring-amber-500/5 outline-none font-bold text-slate-700 shadow-inner transition-all" />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Subject</label>
                <input type="text" value={subject} onChange={e => setSubject(e.target.value)} placeholder="e.g. Environmental Science" className="w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold text-slate-700" />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Student Name</label>
                <input type="text" value={studentName} onChange={e => setStudentName(e.target.value)} placeholder="Your Name" className="w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold text-slate-700" />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Roll / ID Number</label>
                <input type="text" value={rollId} onChange={e => setRollId(e.target.value)} placeholder="e.g. 2024-ENV-01" className="w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold text-slate-700" />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Instructor Name</label>
                <input type="text" value={instructor} onChange={e => setInstructor(e.target.value)} placeholder="e.g. Prof. Smith" className="w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold text-slate-700" />
             </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Raw Assignment Content</label>
            <textarea
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder="Paste your rough draft or notes here..."
              className="w-full h-64 p-6 bg-slate-50 border border-slate-200 rounded-3xl focus:ring-8 focus:ring-amber-500/5 outline-none font-medium text-slate-700 shadow-inner resize-none transition-all"
            />
          </div>
        </div>
      ) : isSummarizer ? (
        <div className="space-y-6">
           <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Long Notes / Textbook Excerpt</label>
              <textarea
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder="Paste the long text you want to summarize for exams..."
                className="w-full h-64 p-6 bg-slate-50 border border-slate-200 rounded-3xl focus:ring-8 focus:ring-amber-500/5 outline-none font-medium text-slate-700 shadow-inner resize-none transition-all"
              />
           </div>
        </div>
      ) : isPlanner ? (
        <div className="space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Exam Name</label>
                <input type="text" value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g. Boards, JEE, Finals" className="w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold text-slate-700 shadow-inner" />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Subjects (CSV)</label>
                <input type="text" value={subject} onChange={e => setSubject(e.target.value)} placeholder="Physics, Maths, Chem" className="w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold text-slate-700 shadow-inner" />
             </div>
           </div>
           <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Syllabus Progress / Status</label>
              <textarea
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder="Mention what's completed vs what's remaining..."
                className="w-full h-32 p-6 bg-slate-50 border border-slate-200 rounded-3xl outline-none font-medium text-slate-700 shadow-inner resize-none transition-all"
              />
           </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Subject</label>
              <input type="text" value={subject} onChange={e => setSubject(e.target.value)} placeholder="e.g. History" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-slate-700 shadow-inner" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Specific Topic</label>
              <input type="text" value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g. French Revolution" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-slate-700 shadow-inner" />
            </div>
          </div>
          <textarea
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder="Describe what you need help with..."
            className="w-full h-40 p-6 bg-slate-50 border border-slate-200 rounded-3xl outline-none font-medium text-slate-700 shadow-inner resize-none transition-all"
          />
        </div>
      )}
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
            7. Final Academic Deliverable
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
            Copy Generation
          </button>
        </div>
        <div className="bg-slate-900 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group border border-slate-800">
           <div className="absolute top-0 left-0 w-1 h-full bg-amber-500/50"></div>
           <div className={`text-emerald-400 font-mono text-sm leading-relaxed whitespace-pre-wrap`}>
              {orchestrationData.split('7. Expected Result:')[1]?.split('8. Optimization Tips:')[0]?.trim() || orchestrationData}
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-100">
         <div className="space-y-4">
            <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">8. Expert Strategy</span>
            <div className="bg-amber-50/50 p-6 rounded-3xl border border-amber-100 text-xs font-bold text-amber-900 leading-relaxed italic">
              {orchestrationData.split('8. Optimization Tips:')[1]?.split('9. Next Action Suggestion:')[0]?.trim() || "Focus on key concepts."}
            </div>
         </div>
         <div className="space-y-4">
            <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">9. Recommended Next Action</span>
            <div className="bg-indigo-50/50 p-6 rounded-3xl border border-indigo-100 text-xs font-black text-indigo-900 flex items-center gap-4">
              <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm shadow-lg animate-bounce">➔</div>
              {orchestrationData.split('9. Next Action Suggestion:')[1]?.trim() || "Proceed to study session."}
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
          {loading ? (retryCount > 0 ? `Retrying Engine (${retryCount})...` : "Engaging ToolVerse Orchestrator...") : isPlanner ? "Generate Master Study Plan" : isCitation ? "Generate Citation" : "Process Intelligence"}
        </button>
      }
      result={resultSlot}
    />
  );
};

export default EducationTools;