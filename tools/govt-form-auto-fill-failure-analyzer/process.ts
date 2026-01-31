
/**
 * Auto-Fill Logic Node
 * Scans HTML attributes to identify 'autocomplete=off' or session-based randomness.
 */
export async function process(input: string) {
  const findings = [];
  
  if (input.includes('autocomplete="off"') || input.includes('autocomplete=off')) {
    findings.push("Explicit Block: Portal explicitly forbids browser storage via 'autocomplete=off'.");
  }

  if (input.includes('type="password"')) {
    findings.push("Security Context: Field is marked as password; browsers won't fill without manual auth.");
  }

  if (!input.includes('id=') && !input.includes('name=')) {
    findings.push("Identity Fault: No stable ID/Name detected. Browser can't map this field.");
  }

  return {
    found: findings.length > 0,
    findings,
    verdict: findings.length > 0 ? "Portal-Side Restriction" : "Browser Config Issue"
  };
}
