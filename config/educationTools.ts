export const eduStudyPlannerConfig = {
  slug: "edu-study-planner",
  title: "AI Study Planner",
  description: "Architect a custom examination preparation schedule with milestones and habit-tracking nodes.",
  icon: "📅",
  colorClass: "bg-amber-600",
  options: [
    { id: "spExamDate", type: "text", label: "Exam Date (YYYY-MM-DD)", default: "2024-06-01" },
    { id: "spHours", type: "number", label: "Daily Study Hours", default: 4 },
    { id: "spLevel", type: "select", label: "Education Level", values: ["School", "High School", "College"], default: "High School" },
    { id: "spWeakStrong", type: "select", label: "Focus Preference", values: ["Balanced", "More focus on weak areas"], default: "Balanced" },
    { id: "spRevision", type: "select", label: "Revision Style", values: ["Weekly revision", "Daily revision"], default: "Daily revision" },
    { id: "spBreaks", type: "select", label: "Break Style", values: ["Pomodoro (25-5)", "Long sessions"], default: "Pomodoro (25-5)" },
    { id: "spPlanType", type: "select", label: "Plan Type", values: ["Daily plan", "Weekly plan"], default: "Weekly plan" },
    { id: "spLanguage", type: "select", label: "Language", values: ["English", "Hinglish"], default: "English" }
  ],
};

export const eduSummaryGeneratorConfig = {
  slug: "edu-summary-generator",
  title: "AI Notes Summarizer",
  description: "Synthesize long notes or textbook excerpts into condensed, exam-ready summaries and key takeaways.",
  icon: "📝",
  colorClass: "bg-amber-500",
  options: [
    { id: "nsSubject", type: "select", label: "Subject", values: ["General", "Maths", "Physics", "Chemistry", "Biology"], default: "General" },
    { id: "nsLevel", type: "select", label: "Education Level", values: ["School", "High School", "College"], default: "High School" },
    { id: "nsLength", type: "select", label: "Summary Length", values: ["Very short", "Short", "Balanced"], default: "Short" },
    { id: "nsStyle", type: "select", label: "Output Style", values: ["Bulleted points", "Headings + bullets", "Exam-ready notes"], default: "Headings + bullets" },
    { id: "nsFocus", type: "select", label: "Primary Focus", values: ["Key concepts", "Definitions & formulas", "Important facts"], default: "Key concepts" },
    { id: "nsExamples", type: "select", label: "Examples Handling", values: ["Remove examples", "Keep 1 key example"], default: "Keep 1 key example" },
    { id: "nsKeywords", type: "select", label: "Keyword Highlighting", values: ["Highlight keywords", "No highlights"], default: "Highlight keywords" },
    { id: "nsLanguage", type: "select", label: "Output Language", values: ["English", "Hinglish"], default: "English" },
    { id: "nsFormat", type: "select", label: "List Format", values: ["Plain text", "Numbered list"], default: "Plain text" }
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

export const eduEquationSolverConfig = {
  slug: "edu-equation-solver",
  title: "AI Equation Solver",
  description: "Step-by-step solving and verification for linear, quadratic, and systems of equations.",
  icon: "🧮",
  colorClass: "bg-indigo-600",
  options: [
    { id: "eqType", type: "select", label: "Equation Type", values: ["Linear (1 variable)", "Quadratic", "System of equations"], default: "Linear (1 variable)" },
    { id: "method", type: "select", label: "Preferred Method", values: ["Auto", "Substitution", "Elimination", "Factorization", "Quadratic Formula"], default: "Auto" },
    { id: "level", type: "select", label: "Education Level", values: ["School", "High School", "College"], default: "High School" },
    { id: "steps", type: "select", label: "Step Detail", values: ["Show all steps", "Key steps only"], default: "Show all steps" },
    { id: "explain", type: "select", label: "Explanation Depth", values: ["Simple explanation", "Detailed (Academic)"], default: "Detailed (Academic)" },
    { id: "check", type: "select", label: "Verification", values: ["Verify solution", "No verification"], default: "Verify solution" },
    { id: "lang", type: "select", label: "Language", values: ["English", "Hinglish"], default: "English" },
    { id: "format", type: "select", label: "Output Format", values: ["Numbered steps", "Bulleted steps"], default: "Numbered steps" }
  ],
};

export const eduFormulaGeneratorConfig = {
  slug: "edu-formula-generator",
  title: "AI Formula Generator",
  description: "Generate comprehensive, topic-based formula lists with clear explanations and variable units.",
  icon: "🧪",
  colorClass: "bg-amber-600",
  options: [
    { id: "fgSubject", type: "select", label: "Subject", values: ["Mathematics", "Physics", "Chemistry"], default: "Mathematics" },
    { id: "fgChapterLevel", type: "select", label: "Education Level", values: ["School", "High School", "College"], default: "High School" },
    { id: "fgDepth", type: "select", label: "Depth", values: ["Essential formulas", "Complete list"], default: "Essential formulas" },
    { id: "fgExplain", type: "select", label: "Explanation Detail", values: ["Short explanation", "Detailed explanation"], default: "Short explanation" },
    { id: "fgDerivation", type: "select", label: "Derivation", values: ["No derivation", "Include derivation (brief)"], default: "No derivation" },
    { id: "fgExamples", type: "select", label: "Usage Examples", values: ["No examples", "Include examples"], default: "Include examples" },
    { id: "fgUnits", type: "select", label: "Units", values: ["Show units", "No units"], default: "Show units" },
    { id: "fgLanguage", type: "select", label: "Language", values: ["English", "Hinglish"], default: "English" },
    { id: "fgFormat", type: "select", label: "Output Format", values: ["Bulleted", "Table"], default: "Table" }
  ],
};

export const eduUnitPracticeConfig = {
  slug: "edu-unit-practice",
  title: "Unit Practice Tool",
  description: "Generate topic-wise practice questions with solutions and difficulty control for effective self-test sessions.",
  icon: "🎯",
  colorClass: "bg-orange-600",
  options: [
    { id: "upLevel", type: "select", label: "Education Level", values: ["School", "High School", "College"], default: "High School" },
    { id: "upDifficulty", type: "select", label: "Difficulty", values: ["Easy", "Medium", "Hard", "Mixed"], default: "Mixed" },
    { id: "upQuestionType", type: "select", label: "Question Types", values: ["MCQs", "Numericals", "Short Answer", "Mixed"], default: "Mixed" },
    { id: "upCount", type: "select", label: "Question Count", values: ["5", "10", "15"], default: "10" },
    { id: "upTime", type: "select", label: "Time Mode", values: ["No time limit", "Timed (exam mode)"], default: "No time limit" },
    { id: "upExplain", type: "select", label: "Explanation Preference", values: ["Solutions with steps", "Final answers only"], default: "Solutions with steps" },
    { id: "upHints", type: "select", label: "Hints", values: ["Include hints", "No hints"], default: "Include hints" },
    { id: "upLanguage", type: "select", label: "Language", values: ["English", "Hinglish"], default: "English" }
  ],
};

export const eduQuizGeneratorConfig = {
  slug: "edu-quiz-generator",
  title: "AI Quiz Generator",
  description: "Professional learning assessment engine. Generate MCQs, True/False, or Mixed quizzes with instant keys.",
  icon: "❓",
  colorClass: "bg-amber-500",
  options: [
    { id: "qzLevel", type: "select", label: "Education Level", values: ["School", "High School", "College"], default: "High School" },
    { id: "qzDifficulty", type: "select", label: "Difficulty", values: ["Easy", "Medium", "Hard", "Mixed"], default: "Medium" },
    { id: "qzType", type: "select", label: "Question Type", values: ["MCQs", "True/False", "Mixed"], default: "Mixed" },
    { id: "qzCount", type: "select", label: "Number of Questions", values: ["5", "10", "15", "20"], default: "10" },
    { id: "qzTime", type: "select", label: "Time Mode", values: ["No time limit", "Timed (exam mode)"], default: "No time limit" },
    { id: "qzExplain", type: "select", label: "Explanation Detail", values: ["Include explanations", "Answers only"], default: "Include explanations" },
    { id: "qzShuffle", type: "select", label: "Shuffle Order", values: ["Shuffle questions", "No shuffle"], default: "Shuffle questions" },
    { id: "qzLanguage", type: "select", label: "Language", values: ["English", "Hinglish"], default: "English" }
  ],
};

export const eduFlashcardGeneratorConfig = {
  slug: "edu-flashcard-generator",
  title: "AI Flashcard Generator",
  description: "Active recall engine for memory optimization. Convert complex notes into compact study cards with mnemonics.",
  icon: "🗂️",
  colorClass: "bg-amber-500",
  options: [
    { id: "fcSubject", type: "select", label: "Subject", values: ["Maths", "Physics", "Chemistry", "Biology", "General"], default: "General" },
    { id: "fcLevel", type: "select", label: "Education Level", values: ["School", "High School", "College"], default: "High School" },
    { id: "fcCardType", type: "select", label: "Card Type", values: ["Term → Definition", "Question → Answer", "Concept → Example", "Mixed"], default: "Mixed" },
    { id: "fcCount", type: "select", label: "Card Count", values: ["10", "20", "30"], default: "20" },
    { id: "fcDepth", type: "select", label: "Detail Level", values: ["Concise", "Balanced", "Detailed"], default: "Concise" },
    { id: "fcExamples", type: "select", label: "Include Examples", values: ["No examples", "Include examples"], default: "Include examples" },
    { id: "fcMnemonics", type: "select", label: "Mnemonics Aid", values: ["No mnemonics", "Include mnemonics"], default: "Include mnemonics" },
    { id: "fcShuffle", type: "select", label: "Shuffle Order", values: ["Shuffle", "Keep order"], default: "Shuffle" },
    { id: "fcLanguage", type: "select", label: "Language", values: ["English", "Hinglish"], default: "English" }
  ],
};

export const eduAssignmentFormatterConfig = {
  slug: "edu-assignment-formatter",
  title: "AI Assignment Formatter",
  description: "Transform raw notes into professional, submission-ready academic assignments with perfect hierarchy and formal tone.",
  icon: "📝",
  colorClass: "bg-amber-600",
  options: [
    { id: "afLevel", type: "select", label: "Education Level", values: ["School", "College", "University"], default: "College" },
    { id: "afFormat", type: "select", label: "Preferred Structure", values: ["Introduction → Body → Conclusion", "Question–Answer", "Research-style"], default: "Introduction → Body → Conclusion" },
    { id: "afCitation", type: "select", label: "Citation Placeholder", values: ["None", "APA", "MLA", "Chicago"], default: "None" },
    { id: "afTone", type: "select", label: "Tone", values: ["Formal", "Neutral academic"], default: "Formal" },
    { id: "afSpacing", type: "select", label: "Line Spacing", values: ["Single", "1.5", "Double"], default: "1.5" },
    { id: "afLanguage", type: "select", label: "Language", values: ["English", "Hinglish"], default: "English" }
  ],
};

export const eduCitationConfig = {
  slug: "edu-citation-architect",
  title: "AI Citation Architect",
  description: "Generate platform-perfect citations and bibliographies with zero-error formatting.",
  icon: "🖋️",
  colorClass: "bg-amber-800",
  options: [
    { id: "ctStyle", type: "select", label: "Citation Style", values: ["APA", "MLA", "Chicago", "Harvard", "IEEE"], default: "APA" },
    { id: "ctSourceType", type: "select", label: "Source Type", values: ["Book", "Website", "Journal Article", "Research Paper", "Video"], default: "Book" },
    { id: "ctInText", type: "select", label: "In-Text Citation", values: ["Include in-text citation", "Reference only"], default: "Include in-text citation" },
    { id: "ctLanguage", type: "select", label: "Output Language", values: ["English"], default: "English" }
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