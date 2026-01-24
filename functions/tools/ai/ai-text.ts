
import { getSystemPrompt, PromptVersion } from "./prompts";
import { GoogleGenAI } from "@google/genai";

export default async function execute(input: any, env: any) {
  const apiKey = env.API_KEY;
  if (!apiKey) throw new Error("Backend API_KEY missing.");

  const toolId = input.toolId || "ai-text";
  const userText = input.text || "";

  if (userText.length > 3000) throw new Error("Input exceeds character limit.");

  const version = (env.AI_PROMPT_VERSION || 'v1') as PromptVersion;
  const systemInstruction = getSystemPrompt(toolId, version);

  const ai = new GoogleGenAI({ apiKey });
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
  if (!output) throw new Error("AI Engine failure.");

  return { output, type: 'markdown', engine: `gemini-3-${version}` };
}
