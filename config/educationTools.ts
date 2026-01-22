export const eduStudyPlannerConfig = {
  slug: "edu-study-planner",
  title: "AI Study Planner",
  description: "Architect a custom examination preparation schedule with milestones and habit-tracking nodes.",
  icon: "📅",
  colorClass: "bg-amber-600",
  options: [
    { id: "duration", type: "select", label: "Plan Duration", values: ["7 Days", "30 Days", "90 Days", "Custom"], default: "30 Days" },
    { id: "intensity", type: "select", label: "Daily Intensity", values: ["Light (1-2 hrs)", "Medium (3-5 hrs)", "Heavy (6+ hrs)"], default: "Medium (3-5 hrs)" },
    { id: "focusMode", type: "select", label: "Learning Style", values: ["Visual", "Textual", "Active Recall", "Spaced Repetition"], default: "Active Recall" },
    { id: "goal", type: "select", label: "Primary Goal", values: ["Exam Prep", "Skill Mastery", "Deep Research", "Maintenance"], default: "Exam Prep" }
  ],
};

export const eduSummaryGeneratorConfig = {
  slug: "edu-summary-generator",
  title: "AI Note Summarizer",
  description: "Synthesize large academic texts into condensed summaries, flashcards, and key takeaways.",
  icon: "📝",
  colorClass: "bg-amber-500",
  options: [
    { id: "length", type: "select", label: "Summary Length", values: ["Executive (Bullet points)", "Standard", "Comprehensive"], default: "Standard" },
    { id: "format", type: "select", label: "Output Nodes", values: ["Summary Only", "Flashcard Set", "Q&A Format", "Mixed"], default: "Mixed" },
    { id: "readability", type: "select", label: "Target Level", values: ["Student", "Expert", "ELI5"], default: "Student" }
  ],
};

export const eduEssayGraderConfig = {
  slug: "edu-essay-grader",
  title: "AI Essay Auditor",
  description: "Deep academic audit of essays for grammar, logical consistency, and source integration.",
  icon: "🎓",
  colorClass: "bg-amber-700",
  options: [
    { id: "academicLevel", type: "select", label: "Grade Level", values: ["High School", "Undergraduate", "Post-Graduate"], default: "Undergraduate" },
    { id: "rubric", type: "select", label: "Grading Rubric", values: ["Standard", "Critical Analysis", "Creative", "Strict"], default: "Standard" },
    { id: "feedbackDepth", type: "select", label: "Feedback Detail", values: ["Score Only", "Critique & Score", "Line-by-line Fixes"], default: "Critique & Score" }
  ],
};

export const eduMathSolverConfig = {
  slug: "edu-math-solver",
  title: "AI Math Logic Solver",
  description: "Provide step-by-step logic and mathematical reasoning for complex equations and word problems.",
  icon: "🔢",
  colorClass: "bg-amber-600",
  options: [
    { id: "branch", type: "select", label: "Math Branch", values: ["Algebra", "Calculus", "Statistics", "Geometry", "Physics Math"], default: "Algebra" },
    { id: "explanationStyle", type: "select", label: "Step Detail", values: ["Concise", "Tutorial Style", "Formula Breakdown"], default: "Tutorial Style" }
  ],
};

export const eduQuizCreatorConfig = {
  slug: "edu-quiz-creator",
  title: "AI Smart Quiz Maker",
  description: "Generate structured examination material (MCQs, True/False, Fill-ins) from any input text.",
  icon: "❓",
  colorClass: "bg-amber-500",
  options: [
    { id: "questionCount", type: "select", label: "Question Count", values: ["5", "10", "20", "50"], default: "10" },
    { id: "difficulty", type: "select", label: "Difficulty", values: ["Easy", "Medium", "Hard", "Competitive"], default: "Medium" },
    { id: "type", type: "select", label: "Question Mix", values: ["MCQs Only", "True/False Only", "Mixed", "Open Ended"], default: "Mixed" }
  ],
};

export const eduCitationConfig = {
  slug: "edu-citation-architect",
  title: "AI Citation Architect",
  description: "Generate platform-perfect citations and bibliographies with zero-error formatting.",
  icon: "🖋️",
  colorClass: "bg-amber-800",
  options: [
    { id: "style", type: "select", label: "Citation Style", values: ["APA 7th", "MLA 9th", "Chicago", "Harvard", "IEEE"], default: "APA 7th" },
    { id: "sourceType", type: "select", label: "Source Type", values: ["Website", "Book", "Journal", "Video", "Report"], default: "Website" }
  ],
};

export const eduResearchAssistantConfig = {
  slug: "edu-research-assistant",
  title: "AI Research Architect",
  description: "Strategize thesis topics, source mapping, and research hierarchies for academic success.",
  icon: "🔬",
  colorClass: "bg-amber-900",
  options: [
    { id: "stage", type: "select", label: "Research Stage", values: ["Topic Selection", "Source Mining", "Outline Creation", "Final Review"], default: "Outline Creation" },
    { id: "field", type: "select", label: "Research Field", values: ["STEM", "Humanities", "Social Sciences", "Business"], default: "STEM" }
  ],
};

export const eduLanguageTutorConfig = {
  slug: "edu-language-tutor",
  title: "AI Language Architect",
  description: "Expert linguistic coaching with scenario-based practice and grammatical architecture.",
  icon: "🗣️",
  colorClass: "bg-amber-600",
  options: [
    { id: "targetLang", type: "select", label: "Target Language", values: ["English", "Spanish", "French", "German", "Japanese", "Hindi"], default: "Spanish" },
    { id: "level", type: "select", label: "Proficiency", values: ["Beginner (A1)", "Intermediate (B1)", "Advanced (C1)"], default: "Beginner (A1)" },
    { id: "mode", type: "select", label: "Session Mode", values: ["Grammar Lab", "Conversation Practice", "Vocabulary Boost"], default: "Conversation Practice" }
  ],
};

export const eduConceptExplainerConfig = {
  slug: "edu-concept-explainer",
  title: "AI Concept Master (ELI5)",
  description: "Simplification engine for complex theories, historical events, or scientific laws.",
  icon: "💡",
  colorClass: "bg-amber-500",
  options: [
    { id: "targetAge", type: "select", label: "Complexity Level", values: ["5 Year Old", "10 Year Old", "High Schooler", "Non-Expert Adult"], default: "10 Year Old" },
    { id: "analogyUsage", type: "toggle", label: "Use Creative Analogies", default: true }
  ],
};

export const eduCodingTutorConfig = {
  slug: "edu-coding-tutor",
  title: "AI Coding Logic Tutor",
  description: "Mental model builder for programming concepts, bug-fixing logic, and syntax mastery.",
  icon: "💻",
  colorClass: "bg-amber-700",
  options: [
    { id: "language", type: "select", label: "Coding Language", values: ["Python", "JavaScript", "C++", "Java", "SQL"], default: "Python" },
    { id: "style", type: "select", label: "Tutor Style", values: ["Socratic (Ask Qs)", "Explanation First", "Interactive Code"], default: "Explanation First" }
  ],
};
