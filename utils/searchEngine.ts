
import { Tool } from '../types';
import { TOOLS } from '../data/tools';
import { CATEGORIES } from '../data/categories';

/**
 * ToolVerse Intent Mapping (Synonyms & Common Queries)
 * Maps common human phrases to tool capabilities.
 */
const INTENT_MAP: Record<string, string[]> = {
  "make smaller": ["compress", "size", "reduce"],
  "change format": ["convert", "format", "transcode"],
  "govt form": ["rejection", "passport", "signature", "signature-upload-fix-tool", "why-upload-rejected-analyzer"],
  "job application": ["resume", "cv", "ats", "resume-rejection-analyzer"],
  "fix photo": ["blur", "clarity", "noise", "signature-upload-fix-tool"],
  "website seo": ["google", "rank", "sitemap", "meta", "robots"],
  "money math": ["salary", "emi", "loan", "interest"],
  "lock file": ["password", "protect", "encrypt"],
  "extract text": ["ocr", "scan", "read"],
};

export interface SearchResult {
  type: 'tool' | 'category' | 'intent';
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  score: number;
}

/**
 * Advanced Search Engine logic
 */
export const querySearchIndex = (query: string): SearchResult[] => {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const results: SearchResult[] = [];

  // 1. Check Intent Map for common query strings
  Object.entries(INTENT_MAP).forEach(([key, tags]) => {
    if (key.includes(q)) {
      results.push({
        type: 'intent',
        id: `intent-${key}`,
        title: `Fix my ${key}`,
        subtitle: `Suggested for: ${tags.slice(0, 2).join(', ')}`,
        icon: '💡',
        score: 0.9
      });
    }
  });

  // 2. Category Matching
  CATEGORIES.forEach(cat => {
    if (cat.name.toLowerCase().includes(q) || cat.id.includes(q)) {
      results.push({
        type: 'category',
        id: cat.id,
        title: `${cat.name} Cluster`,
        subtitle: 'Logic Category',
        icon: cat.icon,
        score: 0.85
      });
    }
  });

  // 3. Tool Matching (The Core)
  TOOLS.forEach(tool => {
    let score = 0;
    const title = tool.title.toLowerCase();
    const desc = tool.description.toLowerCase();
    const slug = tool.slug.toLowerCase();
    const keywords = tool.keywords.map(k => k.toLowerCase());

    // Perfect Match
    if (title === q) score += 1.0;
    // Starts with
    else if (title.startsWith(q)) score += 0.9;
    // Includes in title
    else if (title.includes(q)) score += 0.8;
    // Includes in slug
    else if (slug.includes(q)) score += 0.7;
    // Includes in keywords
    else if (keywords.some(k => k.includes(q))) score += 0.6;
    // Includes in description
    else if (desc.includes(q)) score += 0.4;

    if (score > 0) {
      const category = CATEGORIES.find(c => c.id === tool.category);
      results.push({
        type: 'tool',
        id: tool.slug,
        title: tool.title,
        subtitle: category?.name,
        icon: category?.icon || '🛠️',
        score
      });
    }
  });

  // Sort by score and remove duplicates
  return results
    .sort((a, b) => b.score - a.score)
    .filter((v, i, a) => a.findIndex(t => t.id === v.id) === i)
    .slice(0, 8);
};
