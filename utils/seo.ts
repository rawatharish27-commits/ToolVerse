
import { Tool, ToolCategory } from '../types';
import { SITE_CONFIG } from '../config/site';

/**
 * ToolVerse CTR Intelligence v6.0
 * Implements Google Search Dominance Patterns
 */

export const getHighCTRTitle = (tool: Tool): string => {
  const year = new Date().getFullYear();
  const title = tool.title;

  // Updated category slug comparison for finance
  if (tool.category === 'finance-analysis') {
    return `Best ${title} India (${year}) – 100% Accurate Take-Home Calc`;
  }

  // Updated category slug comparisons for media and pdf
  if (tool.category === 'media-acceptance' || tool.category === 'pdf-diagnostics') {
    return `${title} Online – No Upload, 100% Private & Instant (${year})`;
  }

  // Removed obsolete 'ai' and 'social' comparisons as they are no longer in CategorySlug
  return `Free ${title} Online – Professional Tools by Harish Rawat (${year})`;
};

/**
 * Automated JSON-LD Schema Factory
 * Ensures Rich Snippets in Search Results
 */
export const getAutoFaqSchema = (tool: Tool) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Is the ${tool.title} tool safe for sensitive data?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Absolutely. ToolVerse processes the ${tool.title} entirely in your browser using local logic nodes. Your files never leave your device, ensuring total privacy.`
        }
      },
      {
        "@type": "Question",
        "name": `Who developed the ${tool.title}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `This tool was architected and developed by Harish Rawat as part of the ToolVerse professional utility ecosystem.`
        }
      }
    ]
  };
};

export const getBreadcrumbSchema = (category: ToolCategory, tool: Tool) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_CONFIG.baseUrl },
      { "@type": "ListItem", "position": 2, "name": category.name, "item": `${SITE_CONFIG.baseUrl}/category/${category.id}` },
      { "@type": "ListItem", "position": 3, "name": tool.title, "item": `${SITE_CONFIG.baseUrl}/tools/${tool.slug}` }
    ]
  };
};