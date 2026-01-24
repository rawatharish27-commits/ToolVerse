
export async function aiExecutor(toolId: string, input: any, env: any) {
  const apiKey = env.API_KEY;
  if (!apiKey) throw new Error("API_KEY not configured in backend.");

  const templates: Record<string, string> = {
    'ai-article-generator': "You are an SEO Article Architect. Create a high-value, deep-dive article based on this topic. Format: Markdown.",
    'ai-grammar-fixer': "You are a professional editor. Fix all grammar and spelling errors while maintaining the original tone.",
    'social-caption-generator': "You are a viral social media manager. Create 5 engaging captions with emojis and hashtags.",
    'meta-tag-generator': "You are a Technical SEO Lead. Generate only HTML meta tags. No explanations."
  };

  const systemPrompt = templates[toolId] || "You are a professional tool utility. Provide direct, high-quality results.";
  const userText = typeof input === 'string' ? input : JSON.stringify(input);

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: [{ parts: [{ text: userText }] }]
      })
    }
  );

  const json: any = await res.json();
  const output = json.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!output) throw new Error("AI Engine failed to generate valid content.");

  return { output, type: 'markdown' };
}
