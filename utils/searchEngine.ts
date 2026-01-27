
import { Tool } from '../types';
import { TOOLS } from '../data/tools';
import { CATEGORIES } from '../data/categories';

/**
 * ToolVerse Search Engine v11.0
 * Exhaustive logic scan over 300+ nodes.
 */

export interface SearchResult {
  type: 'tool' | 'category' | 'intent';
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  score: number;
}

export const querySearchIndex = (query: string): SearchResult[] => {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const results: SearchResult[] = [];

  // 1. Category Pass (High Weight)
  CATEGORIES.forEach(cat => {
    if (cat.name.toLowerCase().includes(q) || cat.id.includes(q)) {
      results.push({
        type: 'category',
        id: cat.id,
        title: `${cat.name} Hub`,
        subtitle: 'Master Category Cluster',
        icon: cat.icon,
        score: 1.5 // Multiplier
      });
    }
  });

  // 2. Tool Registry Exhaustive Pass
  TOOLS.forEach(tool => {
    let score = 0;
    const title = tool.title.toLowerCase();
    const slug = tool.slug.toLowerCase();
    const keywords = tool.keywords.map(k => k.toLowerCase());
    const desc = tool.description.toLowerCase();

    if (title === q) score += 100;
    else if (title.startsWith(q)) score += 80;
    else if (title.includes(q)) score += 60;
    else if (slug.includes(q)) score += 40;
    else if (keywords.some(k => k.includes(q))) score += 30;
    else if (desc.includes(q)) score += 10;

    if (score > 0) {
      const category = CATEGORIES.find(c => c.id === tool.category);
      results.push({
        type: 'tool',
        id: tool.slug,
        title: tool.title,
        subtitle: category?.name || tool.category,
        icon: category?.icon || '🛠️',
        score
      });
    }
  });

  // 3. Deduction for duplicates and sorting
  return results
    .sort((a, b) => b.score - a.score)
    .filter((v, i, a) => a.findIndex(t => t.id === v.id) === i)
    .slice(0, 12); // Showing more results for Mega feel
};
