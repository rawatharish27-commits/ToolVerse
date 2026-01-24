
export function jsonFormatter(input: any) {
  try {
    const raw = typeof input.text === 'string' ? input.text : JSON.stringify(input.text);
    const obj = JSON.parse(raw);
    return { 
      formatted: JSON.stringify(obj, null, input.indent || 2),
      valid: true,
      size: raw.length
    };
  } catch (e: any) {
    throw new Error(`Invalid JSON: ${e.message}`);
  }
}
