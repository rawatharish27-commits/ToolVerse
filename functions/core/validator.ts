
type InputType = "string" | "number" | "boolean" | "object";

const schemas: Record<string, Record<string, InputType>> = {
  "password-generator": { length: "number" },
  "json-formatter": { text: "string" },
  "text-formatter": { text: "string", mode: "string" },
  "ai-text": { text: "string" }
};

export function validateInput(toolId: string, input: any) {
  const schema = schemas[toolId] || schemas["ai-text"];
  if (!schema) return true;

  for (const key in schema) {
    const value = input[key];
    const expected = schema[key];

    if (value === undefined || value === null) throw new Error(`Missing parameter: ${key}`);
    if (typeof value !== expected) throw new Error(`Invalid type for ${key}: expected ${expected}`);
    if (expected === "string" && value.trim().length === 0) throw new Error(`${key} cannot be empty.`);
  }
  return true;
}
