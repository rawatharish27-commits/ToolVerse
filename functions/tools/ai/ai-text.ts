
import { getSystemPrompt, PromptVersion } from "./prompts";

/**
 * AI ORCHESTRATOR
 * Executes LLM tasks with strict input and cost controls.
 */
export default async function execute(input: any, env: any) {
  const apiKey = env.API_KEY;
  if (!apiKey) throw new Error("Cloudflare ENV: API_KEY is missing.");

  const toolId = input.toolId || "ai-text";
  const userText = input.text || input.input || "";

  // 1. Cost Control: Prevent large-context token burning
  if (userText.length > 3000) {
    throw new Error("Input text exceeds the 3000 character limit for AI processing.");
  }

  // 2. Prompt Resolution: Rollout versioning via Environment Variable
  const version = (env.AI_PROMPT_VERSION || 'v1') as PromptVersion;
  const systemInstruction = getSystemPrompt(toolId, version);

  // 3. Execution via Native Fetch (Edge optimized)
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemInstruction }] },
        contents: [{ parts: [{ text: userText }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
        }
      })
    }
  );

  if (!res.ok) {
    const errData: any = await res.json();
    throw new Error(`AI Engine Error: ${errData.error?.message || "Generation failed"}`);
  }

  const json: any = await res.json();
  const output = json.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!output) throw new Error("AI Engine returned an empty response.");

  return { 
    output, 
    type: 'markdown', 
    engine: `gemini-1.5-flash-${version}` 
  };
}
