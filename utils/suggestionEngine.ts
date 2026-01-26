
import { TOOLS } from '../data/tools';
import { Tool, CategorySlug } from '../types';

/**
 * Intelligent Task Sequencing
 * Defines logical "Next Steps" based on what the user just did.
 */
const SEQUENCE_MAP: Record<string, string[]> = {
  'resume-rejection-analyzer': ['ats-keyword-gap-finder', 'cover-letter-optimizer', 'resume-builder', 'text-to-docx-converter', 'pdf-compressor'],
  'pdf-compressor': ['pdf-merger', 'pdf-to-jpg-converter', 'pdf-password-protect', 'pdf-metadata-viewer', 'zip-file-creator'],
  'image-kb-reducer': ['passport-size-photo-maker', 'image-dpi-checker', 'signature-upload-fix-tool', 'image-format-converter', 'image-to-webp'],
  'ai-article-generator': ['ai-article-rewriter', 'ai-grammar-fixer', 'ai-seo-optimizer', 'meta-description-length-checker', 'xml-sitemap-generator'],
  'salary-calculator': ['roi-calculator', 'inflation-impact-calculator', 'emi-calculator', 'gst-calculator', 'job-offer-comparison'],
  'qr-code-generator': ['url-encoder-decoder', 'url-safety-checker', 'ip-to-location', 'base64-encoder-decoder', 'uuid-generator'],
};

export const getSmartSuggestions = (currentSlug: string, category: CategorySlug): Tool[] => {
  // 1. Check direct sequence map
  let targetSlugs = SEQUENCE_MAP[currentSlug];

  // 2. If no direct map, find 5 tools from the same category
  if (!targetSlugs) {
    targetSlugs = TOOLS
      .filter(t => t.category === category && t.slug !== currentSlug)
      .slice(0, 5)
      .map(t => t.slug);
  }

  // 3. Absolute fallback: Top priority tools
  if (targetSlugs.length < 5) {
    const fallbacks = TOOLS
      .filter(t => !targetSlugs.includes(t.slug) && t.slug !== currentSlug)
      .sort((a, b) => (b.priority || 0) - (a.priority || 0))
      .slice(0, 5 - targetSlugs.length)
      .map(t => t.slug);
    targetSlugs = [...targetSlugs, ...fallbacks];
  }

  return targetSlugs
    .map(slug => TOOLS.find(t => t.slug === slug))
    .filter((t): t is Tool => !!t)
    .slice(0, 5);
};
