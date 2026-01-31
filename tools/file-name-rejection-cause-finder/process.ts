
/**
 * Filename Logic Node
 * Audits against OS forbidden chars and common Govt portal scripts.
 */
export async function process(name: string) {
  const forbidden = /[<>:"/\\|?*\s]/g;
  const issues = [];

  if (forbidden.test(name)) issues.push("Contains spaces or forbidden symbols.");
  if (name.length > 50) issues.push("Exceeds 50-character limit.");
  if (name.split('.').length > 2) issues.push("Double extension risk (Security block).");
  if (/^[0-9]/.test(name)) issues.push("Starts with a digit (Legacy DB risk).");

  return {
    name,
    issues,
    isSafe: issues.length === 0,
    score: 100 - (issues.length * 25)
  };
}
