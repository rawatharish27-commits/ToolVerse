import fs from 'fs';
import path from 'path';

/**
 * ToolVerse Sitemap Engine v6.0 (Mega Dynamic Edition)
 * Automatically syncs with the data/tools.ts inventory.
 */

const BASE_URL = 'https://toolverse-4gr.pages.dev';

const STATIC_ROUTES = [
  '/',
  '/about',
  '/privacy',
  '/terms',
  '/contact'
];

// Helper to extract slugs from tools.ts safely
function getToolSlugs() {
  const filePath = path.resolve(process.cwd(), 'data/tools.ts');
  const content = fs.readFileSync(filePath, 'utf8');
  // Simple regex to find all slug values in the TS file
  const matches = content.match(/slug:\s*['"]([^'"]+)['"]/g);
  return matches ? matches.map(m => m.match(/['"]([^'"]+)['"]/)[1]) : [];
}

function generateSitemap() {
  const toolSlugs = getToolSlugs();
  const categories = [
    'ai', 'social', 'image', 'pdf', 'video', 'audio', 'file', 'data', 'dev', 'seo', 
    'calculators', 'unit-converters', 'utility', 'security', 'network', 'office', 
    'education', 'business'
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Static Pages
  STATIC_ROUTES.forEach(route => {
    xml += `  <url>\n    <loc>${BASE_URL}${route === '/' ? '' : route}</loc>\n    <changefreq>${route === '/' ? 'daily' : 'monthly'}</changefreq>\n    <priority>${route === '/' ? '1.0' : '0.5'}</priority>\n  </url>\n`;
  });

  // Category Clusters
  categories.forEach(cat => {
    xml += `  <url>\n    <loc>${BASE_URL}/category/${cat}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
  });

  // Mega Inventory (504 Tools)
  toolSlugs.forEach(slug => {
    xml += `  <url>\n    <loc>${BASE_URL}/tools/${slug}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
  });

  xml += `</urlset>`;

  const destPath = path.resolve(process.cwd(), 'public/sitemap.xml');
  fs.writeFileSync(destPath, xml);
  console.log(`🚀 MEGA-SITE READY: Sitemap synchronized with ${toolSlugs.length} tools.`);
}

generateSitemap();