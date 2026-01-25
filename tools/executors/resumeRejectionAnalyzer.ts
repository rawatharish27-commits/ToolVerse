export function resumeRejectionAnalyzer({
  targetRole,
  experienceYears,
  formatType,
  hasGap,
  containsKeywords
}: {
  targetRole: string;
  experienceYears: number;
  formatType: string;
  hasGap: boolean;
  containsKeywords: boolean;
}) {
  const findings: string[] = [];
  const fixes: string[] = [];
  let score = 100;

  // 1. Format Analysis
  if (formatType === "Multi-Column" || formatType === "Graphics-Heavy") {
    score -= 30;
    findings.push("Non-standard layout detected. ATS (Applicant Tracking Systems) often fail to parse multi-column or graphic-heavy resumes accurately.");
    fixes.push("Switch to a clean, single-column, text-based layout.");
  }
  if (formatType === "Photo-Included") {
    score -= 10;
    findings.push("Photo included. Many western-market recruiters reject resumes with photos due to anti-discrimination policies.");
    fixes.push("Remove the photo unless applying for a role where appearance is a documented requirement (e.g. Acting/Modeling).");
  }

  // 2. Keyword Analysis
  if (!containsKeywords) {
    score -= 40;
    findings.push("JD Keyword mismatch. Your resume lacks the specific terminology found in the Job Description, leading to low ranking in automated filters.");
    fixes.push("Perform a keyword audit of the Job Description and naturally integrate relevant skills and technologies into your bullet points.");
  }

  // 3. Gap Analysis
  if (hasGap) {
    score -= 15;
    findings.push("Employment gaps detected. While common, unexplained gaps can be seen as red flags by conservative hiring managers.");
    fixes.push("Address gaps proactively in a brief 'Professional Note' or use a functional resume section to highlight continuous skill development.");
  }

  // 4. Experience Logic
  if (experienceYears < 1 && targetRole.toLowerCase().includes("senior")) {
    score -= 20;
    findings.push("Seniority mismatch. You are applying for a 'Senior' role with less than 1 year of documented experience.");
    fixes.push("Target 'Junior' or 'Associate' roles to build a solid track record first.");
  }

  let verdict = "Excellent";
  if (score < 40) verdict = "Critical Improvement Needed";
  else if (score < 70) verdict = "Needs Optimization";
  else if (score < 90) verdict = "Good, minor tweaks needed";

  return {
    "ATS Readiness Score": `${score}/100`,
    "Strategic Verdict": verdict,
    "Primary Rejection Risks": findings.length > 0 ? findings : ["No major structural risks detected."],
    "Recommended Action Plan": fixes.length > 0 ? fixes : ["Submit with confidence, but ensure your LinkedIn profile matches exactly."],
    "Recruiter POV": score < 60 ? "Recruiters might spend less than 6 seconds on this due to cluttered formatting or lack of relevant keywords." : "Strong profile with high visibility."
  };
}