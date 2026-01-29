
export async function process(input: string) {
  const issues: string[] = [];
  const suggestions: string[] = [];

  // Check for autocomplete="off"
  if (input.includes('autocomplete="off"') || input.includes('autocomplete=off')) {
    issues.push("Explicit Block: The portal has 'autocomplete=off' enabled for this field.");
    suggestions.push("Manually type your data. The portal developers have intentionally blocked browser saving for security.");
  }

  // Check for dynamic IDs
  if (/\d{5,}/.test(input)) {
    issues.push("Dynamic IDs: Field IDs seem to change per session (e.g., id_948273).");
    suggestions.push("The browser cannot 'remember' this field because its identity changes every time you visit.");
  }

  // Check for missing name/id
  if (!input.includes('name=') && !input.includes('id=')) {
    issues.push("Missing Identity: Input tag lacks standard 'name' or 'id' attributes.");
    suggestions.push("Without a name or ID, browsers have no anchor to link your saved data to.");
  }

  // Check for obscure naming
  const commonNames = ['name', 'address', 'first', 'last', 'dob', 'gender'];
  const isObscure = !commonNames.some(cn => input.includes(cn));
  if (isObscure && input.length > 5) {
    issues.push("Obscure Attributes: The field uses generic naming (e.g., 'txt_1') instead of semantic naming.");
    suggestions.push("Try a browser extension like 'RoboForm' or 'Dashlane' which uses advanced scanning to bypass bad HTML naming.");
  }

  return {
    foundIssues: issues.length > 0,
    issues,
    suggestions,
    status: issues.length > 0 ? "PORTAL_LIMITATION" : "BROWSER_CONFIG_ISSUE"
  };
}
