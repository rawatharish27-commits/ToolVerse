
import { TOOL_REGISTRY } from "./toolRegistry";
import { CATEGORIES } from "../data/categories";

export interface CategoryInfo {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  toolCount: number;
}

/**
 * ToolVerse Category Orchestrator
 * Derived dynamically from the master tool registry.
 */
export function getActiveCategories(): CategoryInfo[] {
  const categoryMap = new Map<string, number>();
  
  TOOL_REGISTRY.forEach(tool => {
    const catId = tool.category;
    categoryMap.set(catId, (categoryMap.get(catId) || 0) + 1);
  });

  return Array.from(categoryMap.entries()).map(([id, count]) => {
    const meta = CATEGORIES.find(c => c.id === id);
    return {
      id,
      name: meta?.name || id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      slug: id,
      description: meta?.description || `Explore professional ${id} tools optimized for browser-native execution.`,
      icon: meta?.icon || '🛠️',
      color: meta?.color || 'bg-indigo-600',
      toolCount: count
    };
  }).sort((a, b) => b.toolCount - a.toolCount);
}

export function getCategoryById(id: string): CategoryInfo | undefined {
  return getActiveCategories().find(c => c.id === id);
}
