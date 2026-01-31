
/**
 * ATS Isolate Node
 * Checks for multi-column issues, table tags, and non-UTF characters.
 */
export async function process(input: { text: string, hasColumns: boolean, hasTables: boolean }) {
  const errors = [];
  
  if (input.hasColumns) errors.push("Multi-column layout detected: ATS parses left-to-right, often mixing text blocks.");
  if (input.hasTables) errors.push("Table formatting: Many legacy parsers ignore content inside table tags.");
  if (input.text.length < 500) errors.push("Keyword Density Failure: Content too sparse for ranking.");
  
  // Simulation of non-standard bullet points
  if (input.text.includes('➢') || input.text.includes('✔')) {
    errors.push("Custom Bullets: Symbolic indicators may corrupt the text stream.");
  }

  return {
    errors,
    atsRank: Math.max(0, 100 - (errors.length * 20)),
    passed: errors.length < 2
  };
}
