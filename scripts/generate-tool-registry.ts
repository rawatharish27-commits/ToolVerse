
import fs from "fs";
import path from "path";
import process from "node:process";

/**
 * TOOLVERSE REGISTRY GENERATOR v1.0
 * Automatically maps physical folders to the master logic index.
 */

const TOOLS_DIR = path.join(process.cwd(), "tools");
const OUT_FILE = path.join(process.cwd(), "core", "toolRegistry.ts");

async function generate() {
  if (!fs.existsSync(TOOLS_DIR)) {
    console.error("Tools directory not found at:", TOOLS_DIR);
    return;
  }

  const toolFolders = fs.readdirSync(TOOLS_DIR)
    .filter(f => fs.statSync(path.join(TOOLS_DIR, f)).isDirectory());

  const tools: any[] = [];

  for (const slug of toolFolders) {
    const metaPath = path.join(TOOLS_DIR, slug, "metadata.json");
    if (!fs.existsSync(metaPath)) {
      console.warn(`⚠️ Skipping ${slug}: metadata.json missing.`);
      continue;
    }

    try {
      const meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
      if (!meta.slug || !meta.category || !meta.name) {
        console.warn(`⚠️ Skipping ${slug}: Invalid metadata fields.`);
        continue;
      }

      tools.push({
        slug: meta.slug,
        name: meta.name,
        category: meta.category,
        description: meta.problemStatement || "Professional logic node.",
        icon: meta.icon || "⚙️"
      });
    } catch (e) {
      console.error(`❌ Failed to parse metadata for ${slug}`);
    }
  }

  // Sort alphabetically by slug for predictable indexing
  tools.sort((a, b) => a.slug.localeCompare(b.slug));

  const registryContent = `
// Fix: Added React import to resolve 'Cannot find namespace React' error in the generated file
import React, { lazy } from 'react';
import { Tool } from '../types';

export interface RegisteredTool extends Tool {
  component: React.ComponentType<any>;
}

/**
 * TOOLVERSE MASTER REGISTRY (Auto-Generated)
 * Total Active Nodes: ${tools.length}
 */
export const TOOL_REGISTRY: RegisteredTool[] = [
${tools.map(t => `  {
    slug: '${t.slug}',
    title: '${t.name}',
    category: '${t.category}' as any,
    description: '${t.description.replace(/'/g, "\\'")}',
    icon: '${t.icon}',
    keywords: [],
    component: lazy(() => import('../tools/${t.slug}/index'))
  }`).join(",\n")}
];

export const ToolRegistry = {
  getTools: () => TOOL_REGISTRY,
  getToolBySlug: (slug: string) => TOOL_REGISTRY.find(t => t.slug === slug),
  getToolsByCategory: (catId: string) => TOOL_REGISTRY.filter(t => t.category === catId)
};
`;

  fs.writeFileSync(OUT_FILE, registryContent.trim());
  console.log(`✅ Success: core/toolRegistry.ts updated with ${tools.length} nodes.`);
}

generate().catch(console.error);