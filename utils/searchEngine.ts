
import { Tool } from '../types';
import { TOOLS } from '../data/tools';
import { CATEGORIES } from '../data/categories';

/**
 * ToolVerse Search Engine v12.0
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
        subtitle: 'Master Logic Cluster',
        icon: cat.icon,
        score: 200 // Maximum priority
      });
    }
  });

  // 2. Tool Registry Exhaustive Scan
  TOOLS.forEach(tool => {
    let score = 0;
    const title = tool.title.toLowerCase();
    const slug = tool.slug.toLowerCase();
    const keywords = tool.keywords.map(k => k.toLowerCase());
    const desc = tool.description.toLowerCase();

    // Exact Title Match
    if (title === q) score += 500;
    // Prefix Match
    else if (title.startsWith(q)) score += 300;
    // Partial Title Match
    else if (title.includes(q)) score += 150;
    // Keyword/Slug Overlap
    else if (slug.includes(q)) score += 100;
    else if (keywords.some(k => k.includes(q))) score += 80;
    // Context/Description Match
    else if (desc.includes(q)) score += 30;

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

  // 3. Deduplication & Final Ranking
  return results
    .sort((a, b) => b.score - a.score)
    .filter((v, i, a) => a.findIndex(t => t.id === v.id) === i)
    .slice(0, 15); // Expanded results for Mega experience
};
