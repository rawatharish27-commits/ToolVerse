
import { GoogleGenAI } from "@google/genai";

/**
 * Legacy AI Dispatcher - Syncing with updated SDK standards
 */
export async function aiExecutor(toolId: string, input: any, env: any) {
  // Fix: Obtained exclusively from process.env.API_KEY
  if (!process.env.API_KEY) {
    throw new Error("Missing API_KEY in environment. Configuration required in Cloudflare dashboard.");
  }

  const templates: Record<string, string> = {
    'ai-article-generator': "You are an SEO Article Architect. Create a high-value, deep-dive article based on this topic. Format: Markdown.",
    'ai-grammar-fixer': "You are a professional editor. Fix all grammar and spelling errors while maintaining the original tone.",
    'social-caption-generator': "You are a viral social media manager. Create 5 engaging captions with emojis and hashtags.",
    'meta-tag-generator': "You are a Technical SEO Lead. Generate only HTML meta tags. No explanations."
  };

  const systemInstruction = templates[toolId] || "You are a professional tool utility. Provide direct, high-quality results.";
  const userText = typeof input === 'string' ? input : JSON.stringify(input);

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    // Fix: Simplified contents structure for text generation
    contents: userText,
    config: {
      systemInstruction,
      temperature: 0.7
    }
  });

  const output = response.text;
  if (!output) throw new Error("AI Engine synchronization failed.");

  return { output, type: 'markdown' };
}
