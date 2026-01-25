export function atsKeywordGapFinder(resumeText: string, jdText: string) {
  const resumeWords = new Set(resumeText.toLowerCase().match(/\w+/g) || []);
  const jdWords = jdText.toLowerCase().match(/\w+/g) || [];
  
  const stopwords = ["the", "and", "with", "from", "your", "that"];
  const criticalKeywords = jdWords.filter(w => w.length > 3 && !stopwords.includes(w));
  
  const uniqueCritical = Array.from(new Set(criticalKeywords));
  const missing = uniqueCritical.filter(w => !resumeWords.has(w)).slice(0, 15);
  
  return {
    "Matching Score": `${Math.round(((uniqueCritical.length - missing.length) / uniqueCritical.length) * 100)}%`,
    "Missing Critical Keywords": missing,
    "Keyword Density": resumeText.length > 0 ? `${(resumeWords.size / (resumeText.split(' ').length) * 100).toFixed(1)}%` : "0%",
    "Recommendation": "Integrate the missing keywords naturally into your bullet points, especially in the Skills and Experience sections."
  };
}

export function resumeFormatChecker({ hasColumns, hasTables, hasImages }: any) {
  const issues = [];
  let risk = "Low";

  if (hasColumns) {
    issues.push("Multi-column layouts can confuse older ATS systems which parse line-by-line.");
    risk = "Medium";
  }
  if (hasTables) {
    issues.push("Tables often cause data misalignment in automated parsing results.");
    risk = "High";
  }
  if (hasImages) {
    issues.push("Graphics and charts are ignored by ATS; ensure all info is in plain text.");
  }

  return {
    "ATS Readability Risk": risk.toUpperCase(),
    "Detected Formatting Issues": issues.length > 0 ? issues : ["Format appears clean and standard."],
    "Pro Tip": "Use a simple top-to-bottom single column layout for 99% ATS compatibility."
  };
}

export function resumeFileNameChecker(filename: string) {
  const lower = filename.toLowerCase();
  const isGood = lower.includes('resume') && (lower.includes('cv') || lower.match(/[a-z]/));
  const isProfessional = !lower.includes('final') && !lower.includes('copy') && !lower.includes('v2');
  
  return {
    "Professionalism Score": isProfessional ? "High" : "Low",
    "ATS Friendliness": lower.endsWith('.pdf') || lower.endsWith('.docx') ? "Excellent" : "Risky",
    "Critique": isProfessional ? "Looks good." : "Avoid words like 'final', 'v2', or 'copy' in the name.",
    "Best Filename Suggestion": "FirstName_LastName_Resume_Role.pdf"
  };
}