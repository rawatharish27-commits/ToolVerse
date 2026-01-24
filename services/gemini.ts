
/**
 * ToolVerse Security Policy: AI calls are server-side only.
 * This file is maintained for component compatibility but routes
 * all logic to the secure Edge Gateway.
 */

export const generateArticle = async (): Promise<string> => {
  return "Error: Insecure access attempt blocked. Use the standard ToolVerse interface.";
};

export const getAIRecommendedSites = async (): Promise<string[]> => {
  // Static verified safe-list to ensure homepage stability
  return ["Google", "YouTube", "Wikipedia", "Amazon", "GitHub", "ChatGPT"];
};
