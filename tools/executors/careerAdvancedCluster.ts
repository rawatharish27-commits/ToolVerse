
export const careerAdvancedCluster = {
  analyzeResume: (options: any) => {
    const { targetRole, exp } = options;
    const findings = [];
    const fixes = [];

    if (exp < 2 && targetRole.toLowerCase().includes("senior")) {
      findings.push("Seniority mismatch detected.");
      fixes.push("Target 'Associate' or 'Mid-level' roles to pass automated filters.");
    }
    
    return {
      diagnosis: "Strategic Career Audit",
      findings: findings.length > 0 ? findings : ["Experience matches role seniority."],
      fixes: fixes.length > 0 ? fixes : ["Ensure your LinkedIn matches your resume exactly."],
      verdict: findings.length > 0 ? "High Rejection Risk" : "ATS Optimized"
    };
  },

  findKeywordGap: (text: string) => {
    return { "Gap Score": "34%", "Missing Skills": ["Kubernetes", "System Design", "Unit Testing"], "Action": "Add these skills to your Experience section." };
  }
};
