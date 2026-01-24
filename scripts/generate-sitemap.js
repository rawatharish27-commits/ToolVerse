const fs = require('fs');
const path = require('path');

/**
 * ToolVerse Sitemap Engine v2.0
 * Standardized for Cloudflare Pages Root serving.
 */

const BASE_URL = 'https://toolverse-4gr.pages.dev';

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

// MUST match the slugs in data/tools.ts exactly
const PRIMARY_TOOLS = [
  'ai-article-generator',
  'ai-article-rewriter',
  'image-compressor',
  'background-remover',
  'pdf-merge',
  'pdf-to-word',
  'emi-calculator',
  'json-formatter',
  'meta-tag-generator',
  'password-generator'
];

function generateSitemap() {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // 1. Static Pages
  STATIC_ROUTES.forEach(route => {
    xml += `  <url>\n    <loc>${BASE_URL}${route === '/' ? '' : route}</loc>\n    <changefreq>${route === '/' ? 'daily' : 'monthly'}</changefreq>\n  </url>\n`;
  });

  // 2. Category Hubs
  CATEGORIES.forEach(cat => {
    xml += `  <url>\n    <loc>${BASE_URL}/category/${cat}</loc>\n    <changefreq>weekly</changefreq>\n  </url>\n`;
  });

  // 3. Tool Pages (Fixed to plural /tools/ to match App.tsx)
  PRIMARY_TOOLS.forEach(slug => {
    xml += `  <url>\n    <loc>${BASE_URL}/tools/${slug}</loc>\n    <changefreq>monthly</changefreq>\n  </url>\n`;
  });

  xml += `</urlset>`;

  // Force write to public folder - Vite copies this to root on build
  const destPath = path.resolve(process.cwd(), 'public/sitemap.xml');
  fs.writeFileSync(destPath, xml);
  console.log(`✅ SEO SUCCESS: Sitemap generated at ${destPath}`);
}

generateSitemap();