
import { getSystemPrompt, PromptVersion } from "./prompts";
import { GoogleGenAI } from "@google/genai";
import { getEnv } from "../../core/env";

/**
 * ToolVerse AI Engine - Production v3
 * Strictly follows Gemini SDK rules while maintaining Edge compatibility.
 */
export default async function execute(input: any, env: any) {
  const toolId = input.toolId || "ai-text";
  const userText = input.text || input.input || "";

  if (userText.length > 5000) {
    throw new Error("Input payload exceeds the processing buffer.");
  }

  // Configuration check using safe helper
  const apiKey = getEnv(env, 'API_KEY');
  const version = (env.AI_PROMPT_VERSION || 'v1') as PromptVersion;
  const systemInstruction = getSystemPrompt(toolId, version);

  // SDK Initialization - Uses process.env.API_KEY which is shimmed in gateway
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const isProTask = toolId.includes('article') || toolId.includes('research');
  const modelName = isProTask ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview';

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: [{ parts: [{ text: userText }] }],
      config: {
        systemInstruction,
        temperature: 0.7,
        maxOutputTokens: 3072,
      }
    });

    const output = response.text;

    if (!output) {
      throw new Error("AI Neural Core returned an empty response.");
    }

    return { 
      output, 
      type: 'markdown', 
      meta: {
        model: modelName,
        tokens: output.length / 4,
        processedBy: "ToolVerse-Edge"
      }
    };
  } catch (err: any) {
    if (err.message?.includes("API_KEY_INVALID")) {
      throw new Error("The AI backend is currently undergoing maintenance. Please try again later.");
    }
    throw err;
  }
}
