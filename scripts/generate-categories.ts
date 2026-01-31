
import fs from "fs";
import path from "path";
import process from "node:process";

/**
 * TOOLVERSE CATEGORY GENERATOR v1.0
 * Procedurally generates the category hub index from tool metadata.
 */

const TOOLS_DIR = path.join(process.cwd(), "tools");
const OUT_FILE = path.join(process.cwd(), "core", "categoryRegistry.ts");

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

async function generate() {
  if (!fs.existsSync(TOOLS_DIR)) return;

  const toolFolders = fs.readdirSync(TOOLS_DIR)
    .filter(f => fs.statSync(path.join(TOOLS_DIR, f)).isDirectory());

  const cats: Record<string, any> = {};

  for (const slug of toolFolders) {
    const metaPath = path.join(TOOLS_DIR, slug, "metadata.json");
    if (!fs.existsSync(metaPath)) continue;

    try {
      const meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
      const cName = meta.category || "General";
      const cSlug = slugify(cName);

      if (!cats[cSlug]) {
        cats[cSlug] = {
          id: cSlug,
          name: cName,
          description: `Professional ${cName} tools for administrative and creative workflows.`,
          icon: meta.icon || "📁",
          color: "bg-indigo-600", // Default brand color
          tools: []
        };
      }

      cats[cSlug].tools.push({
        slug: slug,
        title: meta.name,
        description: meta.problemStatement || "Logic node."
      });
    } catch (e) {
      console.error(`❌ Error parsing metadata for category: ${slug}`);
    }
  }

  const out = `
/**
 * TOOLVERSE CATEGORY REGISTRY (Auto-Generated)
 * Total Active Clusters: ${Object.keys(cats).length}
 */
export const CATEGORY_REGISTRY: Record<string, any> = ${JSON.stringify(cats, null, 2)};

export function getActiveCategories() {
  return Object.values(CATEGORY_REGISTRY).sort((a, b) => b.tools.length - a.tools.length);
}

export function getCategoryById(id: string) {
  return CATEGORY_REGISTRY[id];
}
`;

  fs.writeFileSync(OUT_FILE, out.trim());
  console.log(`✅ Success: core/categoryRegistry.ts generated with ${Object.keys(cats).length} categories.`);
}

generate().catch(console.error);
