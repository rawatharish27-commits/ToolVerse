import fs from 'fs';
import path from 'path';

/**
 * ToolVerse Sitemap Engine v4.0 (Growth Edition)
 * Centralized base URL for seamless domain migration.
 */

const BASE_URL = 'https://toolverse-4gr.pages.dev'; // Matches config/site.ts

const STATIC_ROUTES = [
  '/',
  '/about',
  '/privacy',
  '/terms',
  '/contact'
];

const CATEGORIES = [
  'ai', 'image', 'video', 'audio', 'pdf', 'dev', 'seo', 'calculators', 
  'unit-converters', 'utility', 'security', 'network', 'office', 
  'education', 'file', 'data', 'social'
];

// Slugs must match data/tools.ts exactly
const EXPANDED_TOOLS = [
  'ai-article-generator', 'ai-article-rewriter', 'ai-grammar-fixer', 'ai-tone-converter',
  'ai-seo-optimizer', 'ai-email-generator', 'ai-resume-writer', 'ai-story-generator',
  'ai-youtube-script', 'ai-product-description',
  'social-caption-generator', 'social-hashtag-generator', 'social-bio-generator',
  'image-compressor', 'background-remover', 'image-resizer', 'image-cropper', 'image-converter',
  'pdf-merge', 'pdf-split', 'pdf-compressor', 'pdf-to-word', 'pdf-ocr',
  'json-formatter', 'base64-encoder', 'html-minifier', 'js-minifier', 'regex-tester',
  'meta-tag-generator', 'xml-sitemap-generator', 'robots-txt-generator',
  'password-strength-checker', 'security-hash-generator', 'qr-code-generator', 'password-generator',
  'compound-interest-calc', 'mortgage-calculator', 'income-tax-planner', 'emi-calculator',
  'ip-lookup', 'dns-lookup', 'what-is-my-ip'
];

function generateSitemap() {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // 1. Core Pages (Priority 1.0)
  STATIC_ROUTES.forEach(route => {
    xml += `  <url>\n    <loc>${BASE_URL}${route === '/' ? '' : route}</loc>\n    <changefreq>${route === '/' ? 'daily' : 'monthly'}</changefreq>\n    <priority>${route === '/' ? '1.0' : '0.5'}</priority>\n  </url>\n`;
  });

  // 2. Hub Clusters (Priority 0.8)
  CATEGORIES.forEach(cat => {
    xml += `  <url>\n    <loc>${BASE_URL}/category/${cat}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
  });

  // 3. Tool Utility Pages (Priority 0.7)
  EXPANDED_TOOLS.forEach(slug => {
    xml += `  <url>\n    <loc>${BASE_URL}/tools/${slug}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
  });

  xml += `</urlset>`;

  const destPath = path.resolve(process.cwd(), 'public/sitemap.xml');
  fs.writeFileSync(destPath, xml);
  console.log(`🚀 GROWTH: Sitemap expanded to ${EXPANDED_TOOLS.length + CATEGORIES.length + STATIC_ROUTES.length} URLs.`);
}

generateSitemap();