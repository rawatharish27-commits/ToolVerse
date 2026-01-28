import { GoogleGenAI } from "@google/genai";

/**
 * ToolVerse AI Cluster Engine
 * Responsible for high-value neural synthesis and analytical tasks.
 * Model Selection: Task Complexity Driven.
 */
export const aiCluster = {
  execute: async (slug: string, input: any, options: any) => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Phase A: Select model based on user intent complexity
    const isHeavyTask = slug.includes('article') || slug.includes('writer');
    const modelName = isHeavyTask ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview';

    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: `Execute Logic for Tool ID: ${slug}.\nContext: ${typeof input === 'string' ? input : JSON.stringify(input)}.\nParameters: ${JSON.stringify(options)}`,
        config: {
          systemInstruction: `You are the ToolVerse Neural Engine. 
          Mission: Provide high-fidelity, deterministic output for professional software utilities.
          Rules:
          1. Be concise and authoritative.
          2. Use professional Markdown hierarchy.
          3. If generating articles, focus on semantic keywords and 1500+ word depth.
          4. If analyzing data, provide structural insights.
          Output only the final resolved data.`,
          temperature: 0.7,
        }
      });

      const text = response.text;
      if (!text) throw new Error("Neural Core Sync Failure: No data generated.");
      
      return text;
    } catch (err: any) {
      // Phase M: Error Handling
      if (err.message?.includes("API key")) throw new Error("Trust Failure: Invalid logic key detected.");
      if (err.message?.includes("429")) throw new Error("Operational Fault: Global neural credits at capacity. Try again in 10s.");
      throw err;
    }
  }
};