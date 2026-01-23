import { GoogleGenAI } from "@google/genai";

// Initialization must use a named parameter and direct process.env.API_KEY
const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const generateArticle = async (topic: string, tone: string): Promise<string> => {
  const ai = getAIClient();
  const prompt = `Write a comprehensive, SEO-optimized blog article about "${topic}" in a ${tone} tone. Use markdown formatting with proper headings, lists, and a strong introduction and conclusion.`;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        temperature: 0.8,
        topK: 40,
        topP: 0.9,
      }
    });
    return response.text || "Failed to generate content.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error occurred while generating content. Please try again.";
  }
};

/**
 * AI Decision Engine for ToolVerse Homepage
 * Decides which 6 sites to feature based on regional context and usage patterns.
 */
export const getAIRecommendedSites = async (country: string, topClicks: string[]): Promise<string[]> => {
  const ai = getAIClient();
  const prompt = `
    You are an AI growth analyst for ToolVerse.
    Recommend top 6 websites to feature on the homepage.
    User context:
    - Country: ${country}
    - Recent user behavior (most clicked): ${topClicks.join(", ")}

    Return ONLY a comma-separated list of EXACT site names from this allowed pool:
    Google, YouTube, Facebook, Instagram, Amazon, Flipkart, Netflix, Wikipedia, Twitter, LinkedIn, Reddit, GitHub, ChatGPT, Notion, Spotify, Canva, Coursera, Binance.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { temperature: 0.5 }
    });
    const text = response.text || "";
    return text.split(',').map(s => s.trim()).filter(s => s.length > 0);
  } catch (e) {
    console.warn("AI Reco Engine Failed, falling back to static logic:", e);
    return [];
  }
};
