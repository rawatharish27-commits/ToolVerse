
/**
 * PRODUCTION TOOL REGISTRY
 * Manual mapping ensures maximum security and zero-latency lookup.
 */
type ToolExecutor = (input: any, env?: any) => Promise<any> | any;

// Import logic blocks
import passwordGenerator from "../tools/security/password-generator";
import jsonFormatter from "../tools/dev/json-formatter";
import textFormatter from "../tools/text/text-formatter";
import aiText from "../tools/ai/ai-text";

const registry: Record<string, ToolExecutor> = {
  // SECURITY
  "password-generator": passwordGenerator,
  
  // DEV TOOLS
  "json-formatter": jsonFormatter,
  
  // TEXT TOOLS
  "text-formatter": textFormatter,
  
  // AI TOOLS (Centralized Hub)
  "ai-text": aiText,
  "ai-article-generator": aiText,
  "ai-article-rewriter": aiText,
  "ai-grammar-fixer": aiText,
  "ai-tone-converter": aiText,
  "ai-seo-optimizer": aiText,
  "ai-email-generator": aiText,
  "ai-resume-writer": aiText,
  "ai-story-generator": aiText,
  "ai-youtube-script": aiText,
  "ai-product-description": aiText,
  "meta-tag-generator": aiText
};

export function getToolExecutor(toolId: string): ToolExecutor {
  const executor = registry[toolId];
  if (!executor) {
    throw new Error(`Tool [${toolId}] is not currently provisioned on the Edge backend.`);
  }
  return executor;
}
