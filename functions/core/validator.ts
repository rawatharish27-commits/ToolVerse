
type InputType = "string" | "number" | "boolean" | "object";

/**
 * SCHEMA DEFINITIONS
 * Controls the integrity of data entering the Tool Executors.
 */
const schemas: Record<string, Record<string, InputType>> = {
  "password-generator": { length: "number" },
  "json-formatter": { text: "string" },
  "text-formatter": { text: "string", mode: "string" },
  "ai-text": { text: "string" },
  "ai-article-generator": { text: "string" },
  "meta-tag-generator": { text: "string" }
};

export function validateInput(toolId: string, input: any) {
  const schema = schemas[toolId] || schemas["ai-text"]; // Fallback to basic text for AI tools

  if (!schema) return true;

  for (const key in schema) {
    const value = input[key];
    const expectedType = schema[key];

    if (value === undefined || value === null) {
      throw new Error(`Execution aborted: Missing required parameter [${key}].`);
    }

    if (typeof value !== expectedType) {
      throw new Error(`Execution aborted: Parameter [${key}] must be of type ${expectedType}.`);
    }

    if (expectedType === "string" && value.trim().length === 0) {
      throw new Error(`Execution aborted: [${key}] cannot be an empty string.`);
    }
  }
  return true;
}
