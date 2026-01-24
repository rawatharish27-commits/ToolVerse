
export type PromptVersion = 'v1' | 'v2';

export const SYSTEM_PROMPTS: Record<PromptVersion, Record<string, string>> = {
  v1: {
    'ai-article-generator': "You are an SEO Strategist. Create a high-quality article in Markdown.",
    'ai-text': "Process input professionally. Output Markdown."
  },
  v2: {
    'ai-article-generator': "You are a world-class investigative journalist. Write advanced Markdown with H2/H3 tags.",
    'ai-text': "Analyze and enhance the provided text with technical precision."
  }
};

export function getSystemPrompt(toolId: string, version: PromptVersion = 'v1'): string {
  const lib = SYSTEM_PROMPTS[version] || SYSTEM_PROMPTS['v1'];
  return lib[toolId] || lib['ai-text'];
}
