
import { GoogleGenAI } from "@google/genai";

// Initialization must use a named parameter and direct process.env.API_KEY
const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY as string });
};

export const generateArticle = async (topic: string, tone: string): Promise<string> => {
  const ai = getAIClient();
  const prompt = `Write a comprehensive, SEO-optimized blog article about "${topic}" in a ${tone} tone. Use markdown formatting with proper headings, lists, and a strong introduction and conclusion.`;
  
  try {
    const response = await ai.models.generateContent({
      // Using gemini-3-pro-preview for complex reasoning and creative writing tasks
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        temperature: 0.8,
        topK: 40,
        topP: 0.9,
      }
    });
    // Use .text property directly, do not call as a method
    return response.text || "Failed to generate content.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error occurred while generating content. Please try again.";
  }
};
