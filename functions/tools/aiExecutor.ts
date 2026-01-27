
import { GoogleGenAI } from "@google/genai";

/**
 * Backend AI Orchestrator
 * Centralized logic for Gemini 3.0 Pro & Flash tasks.
 */
export const executeAITask = async (toolId: string, input: any, options: any, env: any) => {
  // Fix: Obtained exclusively from process.env.API_KEY as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Complexity heuristic for model selection
  const modelName = (toolId.includes('article') || toolId.includes('resume')) 
    ? 'gemini-3-pro-preview' 
    : 'gemini-3-flash-preview';

  const response = await ai.models.generateContent({
    model: modelName,
    // Fix: Simplified contents structure for text generation
    contents: `Task: ${toolId}\nInput: ${typeof input === 'string' ? input : JSON.stringify(input)}\nOptions: ${JSON.stringify(options)}`,
    config: {
      systemInstruction: getSystemPrompt(toolId),
      temperature: 0.7,
    },
  });

  return { 
    success: true, 
    type: 'markdown', 
    data: response.text 
  };
};

const getSystemPrompt = (toolId: string): string => {
  const prompts: Record<string, string> = {
    'ai-article-generator': "You are a senior SEO Editor. Create a 1500+ word deep-dive article using Markdown. Focus on semantic keywords and reader retention.",
    'ai-resume-writer': "You are an Executive Recruiter. Rewrite bullet points using the Google XYZ formula: 'Accomplished [X] as measured by [Y], by doing [Z]'.",
    'social-caption-master': "You are a viral growth hacker. Create 5 variations of captions with specific hooks.",
    'ai-grammar-fixer': "You are a professional proofreader. Fix all grammar and spelling while maintaining the original meaning.",
  };

  return prompts[toolId] || "You are a specialized ToolVerse utility agent. Provide high-quality, professional output.";
};
