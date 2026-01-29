
import { LIMITS } from './limits';

export async function process(name: string) {
  const issues = [];
  if (LIMITS.forbiddenRegex.test(name)) issues.push("Contains spaces or forbidden OS characters (< > : \" / \\ | ? *)");
  if (name.length > LIMITS.typicalGovtLimit) issues.push(`Length (${name.length}) exceeds common 50-char portal limit.`);
  if (name.split('.').length > 2) issues.push("Multiple dots detected (Security risk for most portals).");
  
  return {
    name,
    issues,
    safe: issues.length === 0
  };
}
