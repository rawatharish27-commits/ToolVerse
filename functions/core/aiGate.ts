
/**
 * ToolVerse AI Gatekeeper
 * Defines which engine handles the request based on authorization.
 */

export type AIMode = 'INSTANT_FREE' | 'NEURAL_PRO';

export function getAIMode(isPro: boolean, toolId: string): AIMode {
  // Critical tools always use real AI if they can't be templated
  const mustBeAI = ['ai-code-debugger', 'ai-image-generator'];
  
  if (isPro) return 'NEURAL_PRO';
  if (mustBeAI.includes(toolId)) return 'NEURAL_PRO'; // Small quota for free users on these
  
  return 'INSTANT_FREE';
}
