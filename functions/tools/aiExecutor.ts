
import { GoogleGenAI } from "@google/genai";

/**
 * Backend AI Orchestrator for ToolVerse
 */
export const executeAITask = async (toolId: string, input: any, options: any, env: any) => {
  // Always use process.env.API_KEY as per core rules
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const modelName = toolId.includes('article') ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview';

  const response = await ai.models.generateContent({
    model: modelName,
    contents: `Logic Node: ${toolId}\nInput: ${typeof input === 'string' ? input : JSON.stringify(input)}\nParameters: ${JSON.stringify(options)}`,
    config: {
      systemInstruction: "You are the ToolVerse Neural Engine. Provide high-fidelity, deterministic output for professional utilities. Output only final data.",
      temperature: 0.2,
    }
  });

  return { 
    success: true, 
    data: response.text 
  };
};
