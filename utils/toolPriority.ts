
import { Tool } from '../types';

export type ToolTier = 'TIER_1' | 'TIER_2' | 'TIER_3';

/**
 * Automatically calculates a tool's priority tier based on metadata.
 * TIER_1: High Search Intent & High RPM (Revenue Drivers)
 * TIER_2: High Utility & Viral Potential (Traffic Drivers)
 * TIER_3: Long-tail SEO & Niche Utility (Content Fillers)
 */
export function calculateToolTier(tool: Tool): ToolTier {
  let score = 0;

  // Search Intent Heuristic (Keywords in Slug/Title)
  const highIntentKeywords = /compress|converter|calculator|resize|merge|split|writer|generator|remover|checker/i;
  if (highIntentKeywords.test(tool.slug) || highIntentKeywords.test(tool.title)) {
    score += 8;
  }

  // Category Multiplier
  const highValueCategories = /ai|calculators|seo/i;
  const medValueCategories = /pdf|image|video|office/i;
  
  if (highValueCategories.test(tool.category)) score += 10;
  else if (medValueCategories.test(tool.category)) score += 5;

  // Description Depth (Signifies complexity/SEO value)
  if (tool.longDescription && tool.longDescription.length > 100) score += 4;
  if (tool.faqs && tool.faqs.length > 0) score += 3;

  // Final Tier Decision
  if (score >= 18) return 'TIER_1';
  if (score >= 10) return 'TIER_2';
  return 'TIER_3';
}

/**
 * Returns a priority number for sorting purposes
 */
export function getToolPriorityScore(tool: Tool): number {
  const tier = calculateToolTier(tool);
  if (tier === 'TIER_1') return 100 + (tool.priority || 0);
  if (tier === 'TIER_2') return 50 + (tool.priority || 0);
  return (tool.priority || 0);
}
