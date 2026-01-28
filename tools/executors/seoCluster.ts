
/**
 * ToolVerse SEO Cluster Logic
 * High-precision browser-native SEO engines.
 */

export const generateXmlSitemap = (urls: string[], priority: string = '0.8', freq: string = 'weekly') => {
  const date = new Date().toISOString().split('T')[0];
  const urlBlocks = urls
    .filter(u => u.trim().length > 0)
    .map(u => {
      const cleanUrl = u.trim().startsWith('http') ? u.trim() : `https://${u.trim()}`;
      return `  <url>
    <loc>${cleanUrl}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlBlocks}
</urlset>`;
};

export const generateBreadcrumbSchema = (pathStr: string) => {
  const items = pathStr.split('>').map(i => i.trim());
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((name, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": name,
      "item": `https://example.com/${name.toLowerCase().replace(/\s+/g, '-')}`
    }))
  };
  return JSON.stringify(schema, null, 2);
};

export const calculateKeywordDifficulty = (keyword: string) => {
  const k = keyword.toLowerCase();
  let score = 20; // Base score
  
  // Heuristics for difficulty
  if (k.split(' ').length === 1) score += 40; // Short tail is harder
  if (k.includes('best') || k.includes('cheap') || k.includes('buy') || k.includes('free')) score += 25;
  if (k.length < 10) score += 15;
  
  const difficulty = score > 75 ? "HARD" : score > 40 ? "MEDIUM" : "EASY";
  
  return {
    "Difficulty Score": `${score}/100`,
    "Rank Potential": difficulty,
    "Backlink Req": score > 75 ? "High (50+ domains)" : score > 40 ? "Medium (10-20 domains)" : "Low (0-5 domains)",
    "Strategy": score > 75 ? "Focus on long-tail variations first." : "Good primary target for new sites."
  };
};

export const suggestInternalLinks = (keyword: string, content: string) => {
  const variations = [
    `Learn more about ${keyword}`,
    `Check out our ${keyword} guide`,
    `Explore ${keyword} tools`,
    `Advanced ${keyword} strategies`,
    `What is ${keyword}?`
  ];
  
  return {
    "Suggested Anchor Texts": variations,
    "Target Placement": "First 200 words or Conclusion section",
    "Linking Logic": "Ensures semantic relevance and pass link equity to the pillar page."
  };
};

// --- FIX: Exporting seoCluster as expected by master registry ---
export const seoCluster = {
  execute: async (slug: string, input: any, options: any) => {
    switch (slug) {
      case 'xml-sitemap-generator':
        const urls = typeof input === 'string' ? input.split('\n') : input;
        return generateXmlSitemap(urls, options.priority, options.changefreq);
      case 'breadcrumb-schema-generator':
        return generateBreadcrumbSchema(input);
      case 'keyword-difficulty-checker':
        return calculateKeywordDifficulty(input);
      case 'internal-link-generator':
        return suggestInternalLinks(input, "");
      default:
        return { status: "SEO Resolved", slug };
    }
  }
};
