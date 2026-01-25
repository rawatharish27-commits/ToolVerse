
/**
 * ToolVerse Utility Cluster Logic
 * Optimized for zero-latency browser-native execution.
 */

export const textAnalysis = (text: string) => {
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, '').length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lines = text.split(/\r\n|\r|\n/).filter(l => l.length > 0).length;
  const readingTime = Math.ceil(words / 200); // Avg 200 wpm
  
  return {
    "Characters": chars,
    "Characters (No Space)": charsNoSpaces,
    "Word Count": words,
    "Line Count": lines,
    "Estimated Reading Time": `${readingTime} min`,
    "Speaking Time": `${Math.ceil(words / 130)} min`
  };
};

export const caseConverter = (text: string, mode: string) => {
  switch (mode) {
    case 'UPPERCASE': return text.toUpperCase();
    case 'lowercase': return text.toLowerCase();
    case 'Title Case': return text.toLowerCase().split(' ').map(w => w.charAt(0).toUpperCase() + w.substring(1)).join(' ');
    case 'Sentence case': return text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase());
    case 'camelCase': return text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
    case 'snake_case': return text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.map(x => x.toLowerCase()).join('_') || text;
    default: return text;
  }
};

export const dateDifference = (start: string, end: string) => {
  const d1 = new Date(start);
  const d2 = new Date(end);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return {
    "Total Days": diffDays.toLocaleString(),
    "Weeks": (diffDays / 7).toFixed(1),
    "Months (approx)": (diffDays / 30.44).toFixed(1),
    "Years (approx)": (diffDays / 365.25).toFixed(2),
    "Hours": (diffDays * 24).toLocaleString(),
    "Seconds": (diffDays * 24 * 3600).toLocaleString()
  };
};

export const fileSizeConvert = (value: number, from: string) => {
  const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  let bytes = value;
  const fromIdx = units.indexOf(from);
  if (fromIdx > 0) bytes = value * Math.pow(1024, fromIdx);

  const results: Record<string, string> = {};
  units.forEach((unit, i) => {
    const val = bytes / Math.pow(1024, i);
    results[unit] = val < 1 ? val.toFixed(4) : val.toLocaleString(undefined, { maximumFractionDigits: 2 });
  });
  return results;
};

export const checkPasswordStrength = (pwd: string) => {
  let score = 0;
  if (pwd.length > 8) score += 20;
  if (pwd.length > 12) score += 20;
  if (/[A-Z]/.test(pwd)) score += 20;
  if (/[0-9]/.test(pwd)) score += 20;
  if (/[^A-Za-z0-9]/.test(pwd)) score += 20;

  const entropy = pwd ? Math.floor(Math.log2(72 ** pwd.length)) : 0;
  
  return {
    "Strength Score": `${score}%`,
    "Entropy Bits": `${entropy} bits`,
    "Crack Time (Est)": entropy < 40 ? "Instantly" : entropy < 60 ? "Few hours" : entropy < 80 ? "Several years" : "Centuries",
    "Complexity": score < 40 ? "WEAK" : score < 80 ? "MODERATE" : "STRONG",
    "Recommendation": score < 100 ? "Add special characters and increase length." : "Excellent password security."
  };
};
