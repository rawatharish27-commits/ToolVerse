
import passwordGenerator from "../tools/security/password-generator";
import jsonFormatter from "../tools/dev/json-formatter";
import textFormatter from "../tools/text/text-formatter";
import aiText from "../tools/ai/ai-text";

type ToolExecutor = (input: any, env?: any) => Promise<any> | any;

const registry: Record<string, ToolExecutor> = {
  "password-generator": passwordGenerator,
  "json-formatter": jsonFormatter,
  "text-formatter": textFormatter,
  "ai-text": aiText,
  "ai-article-generator": aiText,
  "ai-grammar-fixer": aiText,
  "ai-seo-optimizer": aiText,
  "meta-tag-generator": aiText
};

export function getToolExecutor(toolId: string): ToolExecutor {
  const executor = registry[toolId];
  if (!executor) throw new Error(`Tool [${toolId}] not provisioned on Edge.`);
  return executor;
}
