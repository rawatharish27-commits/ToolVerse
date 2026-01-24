
import { getSystemPrompt, PromptVersion } from "./prompts";
import { GoogleGenAI } from "@google/genai";

/**
 * ToolVerse AI Engine - Edge Core
 * Strictly adheres to Google GenAI SDK guidelines.
 */
export default async function execute(input: any, env: any) {
  // Key check: Guided by system instructions to assume process.env.API_KEY availability
  if (!process.env.API_KEY) {
    throw new Error("CRITICAL: process.env.API_KEY is not accessible in the current execution context. Ensure it is set in Cloudflare Dashboard > Settings > Environment Variables > Production.");
  }

  const toolId = input.toolId || "ai-text";
  const userText = input.text || input.input || "";

  if (userText.length > 3000) {
    throw new Error("Input payload exceeds the 3000 character safety limit for Edge processing.");
  }

  // Versioning from ENV or fallback
  const version = (env.AI_PROMPT_VERSION || 'v1') as PromptVersion;
  const systemInstruction = getSystemPrompt(toolId, version);

  // Initializing SDK as per strict guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: toolId.includes('article') ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview',
      contents: [{ parts: [{ text: userText }] }],
      config: {
        systemInstruction,
        temperature: 0.7,
        maxOutputTokens: 2048,
      }
    });

    const output = response.text;

    if (!output) {
      throw new Error("AI Neural Core returned an empty buffer. Please refine your input.");
    }

    return { 
      output, 
      type: 'markdown', 
      engine: `gemini-3-${version}`,
      timestamp: Date.now()
    };
  } catch (err: any) {
    if (err.message?.includes("API_KEY_INVALID")) {
      throw new Error("The provided API_KEY is invalid. Please check your Google AI Studio credentials.");
    }
    throw err;
  }
}
