
export async function process(input: string) {
  const issues: string[] = [];
  const suggestions: string[] = [];

  // Logic: Check for standard 'autocomplete' attributes
  if (!input.includes('autocomplete=')) {
    issues.push("Missing 'autocomplete' attribute. Browsers rely on this tag to identify field types.");
    suggestions.push("Manually type details this time. Modern browsers won't help without this attribute.");
  }

  // Logic: Check for non-standard IDs or Names (Common in legacy portals)
  const legacyPatterns = ['id1', 'txt_1', 'field_val'];
  if (legacyPatterns.some(p => input.includes(p))) {
    issues.push("Obfuscated field ID detected. The portal is using non-descriptive internal names.");
  }

  // Logic: Check for 'autocomplete=off' (The enemy of users)
  if (input.includes('autocomplete="off"') || input.includes('autocomplete=off')) {
    issues.push("The website has explicitly DISALLOWED autofill using 'autocomplete=off'.");
    suggestions.push("Use a password manager extension that ignores this flag, or type manually.");
  }

  return {
    found: issues.length > 0,
    issues,
    suggestions,
    verdict: issues.length > 0 ? "Blocked by Website Code" : "Unknown Local Failure"
  };
}
