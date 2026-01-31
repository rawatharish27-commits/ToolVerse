
const fs = require('fs');
const path = require('path');

const slug = process.argv[2];
if (!slug) {
  console.error("Usage: node create-tool.js <tool-slug>");
  process.exit(1);
}

const dir = path.join(__dirname, 'tools', slug);

if (fs.existsSync(dir)) {
  console.error(`Error: Tool folder '${slug}' already exists.`);
  process.exit(1);
}

const templates = {
  'metadata.json': JSON.stringify({
    name: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    slug: slug,
    category: "utility",
    subcategory: "general",
    keywords: [slug.replace(/-/g, ' '), "tool", "online"],
    complexity: "low"
  }, null, 2),

  'config.ts': `export const CONFIG = {
  options: [
    { id: 'inputVal', label: 'Parameter', type: 'number', default: 100 }
  ]
};`,

  'process.ts': `/**
 * Logic Isolate: ${slug}
 */
export async function process(input: any) {
  const { inputVal } = input;
  // Core Logic Here
  return {
    "Status": "Verified",
    "Resolved Result": inputVal,
    "Timestamp": new Date().toISOString()
  };
}`,

  'validate.ts': `export function validate(input: any) {
  return { valid: true };
}`,

  'normalize.ts': `export function normalize(input: any) {
  return input;
}`,

  'verify.ts': `export function verify(output: any) {
  return { secure: true };
}`,

  'explain.ts': `export function explain(output: any): string {
  return "Logic executed successfully in browser-native memory.";
}`
};

fs.mkdirSync(dir, { recursive: true });

Object.entries(templates).forEach(([filename, content]) => {
  fs.writeFileSync(path.join(dir, filename), content);
});

console.log(`✅ Success: Tool '${slug}' created at /tools/${slug}/`);
console.log(`👉 Next Step: Add '${slug}' to /core/toolRegistry.ts`);
