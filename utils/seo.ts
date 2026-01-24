import { Tool, ToolCategory } from '../types';
import { SITE_CONFIG } from '../config/site';

/**
 * ToolVerse CTR Intelligence v5.0
 * Implements Query-Based Title Rewriting & Automated Schema Factory
 */

export const getHighCTRTitle = (tool: Tool): string => {
  const year = new Date().getFullYear();
  const title = tool.title;

  // Pattern 1: High-RPM Finance/Tax (Geo + Year)
  if (tool.category === 'calculators') {
    return `Best Free ${title} India (${year} Updated) – Accurate & Easy`;
  }

  // Pattern 2: Privacy-First Security (Trust Pattern)
  if (tool.category === 'security' || tool.category === 'network') {
    return `${title} Online – Secure & Private (No Login, No Data Stored)`;
  }

  // Pattern 3: Developer Utilities (Action + Benefit)
  if (tool.category === 'dev' || tool.category === 'data') {
    return `Free ${title} – Format, Validate & Minify Code Instantly`;
  }

  // Pattern 4: Document/PDF (Professional Pattern)
  if (tool.category === 'pdf' || tool.category === 'office') {
    return `Professional ${title} – Free Tool to Edit & Convert Documents`;
  }

  // Pattern 5: Default (Intent-Based)
  return `How to use ${title} Online – Free ${year} Professional Utility`;
};

/**
 * Automated FAQ Schema Factory
 * Generates SEO-compliant JSON-LD based on tool metadata
 */
export const getAutoFaqSchema = (tool: Tool) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Is this ${tool.title} free to use?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes, our ${tool.title} is 100% free. You can use it without any registration, signup, or hidden daily limits.`
        }
      },
      {
        "@type": "Question",
        "name": `Is my data safe with the ${tool.title}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Absolutely. ToolVerse uses browser-native logic. Your files are processed locally and never uploaded to any server, ensuring total privacy.`
        }
      },
      {
        "@type": "Question",
        "name": `Can I use ${tool.title} on a smartphone?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes, ToolVerse is fully responsive. You can use this utility on any Android, iOS, or desktop device via your browser.`
        }
      }
    ]
  };
};

/**
 * Breadcrumb Schema Factory
 */
export const getBreadcrumbSchema = (category: ToolCategory, tool: Tool) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": SITE_CONFIG.baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": category.name,
        "item": `${SITE_CONFIG.baseUrl}/category/${category.id}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": tool.title,
        "item": `${SITE_CONFIG.baseUrl}/tools/${tool.slug}`
      }
    ]
  };
};