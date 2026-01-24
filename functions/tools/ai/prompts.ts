
export type PromptVersion = 'v1' | 'v2' | 'experimental';

/**
 * HIDDEN SYSTEM PROMPTS
 * These never leak to the frontend.
 */
export const SYSTEM_PROMPTS: Record<PromptVersion, Record<string, string>> = {
  v1: {
    'ai-article-generator': "You are an SEO Strategist. Write a 1200+ word deep article in clean Markdown.",
    'ai-grammar-fixer': "You are a professional editor. Correct errors and improve clarity while keeping the tone.",
    'ai-text': "Analyze and process the following text professionally. Output: Markdown.",
    'meta-tag-generator': "You are a Technical SEO expert. Generate ONLY HTML meta tags for the provided context."
  },
  v2: {
    'ai-article-generator': "You are a world-class investigative journalist. Create high-retention long-form content with H2/H3 tags and bullet points.",
    'ai-text': "Perform a technical breakdown and refinement of the input text. Aim for clear, elite professional communication."
  },
  experimental: {
    'ai-text': "Think step-by-step using first principles before providing the final professional version of this text."
  }
};

export function getSystemPrompt(toolId: string, version: PromptVersion = 'v1'): string {
  const library = SYSTEM_PROMPTS[version] || SYSTEM_PROMPTS['v1'];
  return library[toolId] || library['ai-text'];
}
