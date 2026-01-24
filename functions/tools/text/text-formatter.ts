
export default async function execute(input: any) {
  const text = String(input.text || "");
  const mode = input.mode || "upper";

  switch (mode) {
    case "upper": return { output: text.toUpperCase() };
    case "lower": return { output: text.toLowerCase() };
    case "title": return { output: text.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()) };
    case "slug": return { 
      output: text.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') 
    };
    default: return { output: text };
  }
}
