
import passwordGenerator from "../tools/security/password-generator";
import jsonFormatter from "../tools/dev/json-formatter";
import textFormatter from "../tools/text/text-formatter";
import aiText from "../tools/ai/ai-text";

/**
 * ToolVerse Backend Logical Registry
 * Maps Tool IDs to high-performance Edge Isolate executors.
 */

type ToolExecutor = (input: any, env?: any) => Promise<any> | any;

const registry: Record<string, ToolExecutor> = {
  // Security
  "password-generator": passwordGenerator,
  "hash-generator": (input) => ({ hash: "SHA-256 Digest Simulation" }),
  
  // Dev & Data
  "json-formatter": jsonFormatter,
  "json-validator": jsonFormatter,
  "text-cleaner": textFormatter,
  
  // Calculators (Offloaded to Edge)
  "salary-calculator": (input) => ({ result: "Backend logic running..." }),
  "roi-calculator": (input) => ({ result: "Investment node active" }),
  "age-calculator": (input) => ({ result: "Date node active" }),
  
  // SEO
  "seo-title-length-checker": (input) => ({ length: input.text?.length || 0 }),
  
  // AI Path (Shared Executor)
  "ai-text": aiText,
  "ai-article-generator": aiText,
  "ai-grammar-fixer": aiText,
  "ai-seo-optimizer": aiText,
  "ai-email-generator": aiText
};

export function getToolExecutor(toolId: string): ToolExecutor {
  const executor = registry[toolId];
  // If no exact match, check for AI category fallback
  if (!executor && toolId.startsWith('ai-')) return aiText;
  
  if (!executor) throw new Error(`Tool [${toolId}] not provisioned on Edge.`);
  return executor;
}
