
export default async function execute(input: any) {
  try {
    const raw = String(input.text).trim();
    const obj = JSON.parse(raw);
    const formatted = JSON.stringify(obj, null, input.indent || 2);
    
    return { 
      formatted,
      minified: JSON.stringify(obj),
      nodeCount: Object.keys(obj).length,
      isValid: true
    };
  } catch (e: any) {
    throw new Error(`Malformed JSON: ${e.message}`);
  }
}
