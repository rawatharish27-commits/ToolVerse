
import { GoogleGenAI } from "@google/genai";

/**
 * Backend AI Orchestrator
 * Hidden Prompt Templates reside here.
 */
export const executeAITask = async (toolId: string, input: any, options: any, env: any) => {
  const apiKey = env.API_KEY || process.env.API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is not configured in backend environment.");

  const ai = new GoogleGenAI({ apiKey });
  const model = ai.models.generateContent({
    model: toolId.includes('article') ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview',
    config: {
      systemInstruction: getSystemPrompt(toolId),
      temperature: 0.7,
    },
    contents: [{ role: 'user', parts: [{ text: `User Input: ${input}\nOptions: ${JSON.stringify(options)}` }] }]
  });

  const response = await model;
  return { 
    success: true, 
    type: 'markdown', 
    data: response.text 
  };
};

const getSystemPrompt = (toolId: string): string => {
  const prompts: Record<string, string> = {
    'ai-article-generator': "You are a senior SEO Editor. Create a 1500+ word deep-dive article using HTML/Markdown. Focus on semantic keywords and reader retention. Start directly with the content.",
    'ai-resume-writer': "You are an Executive Recruiter. Rewrite bullet points using the Google XYZ formula: 'Accomplished [X] as measured by [Y], by doing [Z]'.",
    'social-caption-master': "You are a viral growth hacker. Create 5 variations of captions with specific hooks for Gen-Z and Millennial audiences.",
    'meta-tag-generator': "You are an SEO technical lead. Return valid HTML meta tags. Do not explain anything, just provide code.",
  };

  return prompts[toolId] || "You are a specialized ToolVerse utility agent. Provide high-quality, professional output based on user requirements.";
};
