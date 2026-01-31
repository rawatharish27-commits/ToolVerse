
export async function process(input: { usesFlexbox: boolean, usesExternalCss: boolean, htmlSizeKb: number }) {
  const risks = [];
  if (input.usesFlexbox) risks.push("Flexbox is unsupported in Outlook/Gmail (Use Tables).");
  if (input.usesExternalCss) risks.push("External stylesheets are stripped by many clients (Use Inline CSS).");
  if (input.htmlSizeKb > 102) risks.push("Gmail clips emails over 102KB.");

  return {
    breakageRisk: risks.length > 0 ? "High" : "Low",
    risks,
    compatibilityScore: Math.max(0, 100 - (risks.length * 30))
  };
}
