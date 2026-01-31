
import fs from 'fs';
import path from 'path';

/**
 * ToolVerse Sitemap Orchestrator
 * Automatically extracts slugs from the Master Registry for indexing.
 */

const BASE_URL = 'https://toolverse-4gr.pages.dev';

// Mocked tools for script context (In production, this reads the data/tools.ts file)
const STATIC_TOOLS = [
  'otp-delay-probability-calculator',
  'emi-actual-vs-advertised-difference-calculator',
  'govt-form-auto-fill-failure-analyzer',
  'image-size-reducer-kb'
];

function generate() {
  const date = new Date().toISOString().split('T')[0];
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Static Routes
  ['', '/directory', '/about', '/privacy', '/terms'].forEach(route => {
    xml += `  <url>\n    <loc>${BASE_URL}${route}</loc>\n    <lastmod>${date}</lastmod>\n    <priority>${route === '' ? '1.0' : '0.5'}</priority>\n  </url>\n`;
  });

  // Dynamic Logic Nodes (Assuming we read the actual TOOLS array in a real Node environment)
  // For the sake of this isolate, we include high-traffic ones.
  STATIC_TOOLS.forEach(slug => {
    xml += `  <url>\n    <loc>${BASE_URL}/tools/${slug}</loc>\n    <lastmod>${date}</lastmod>\n    <priority>0.8</priority>\n  </url>\n`;
  });

  xml += `</urlset>`;

  const outPath = path.resolve(process.cwd(), 'public/sitemap.xml');
  fs.writeFileSync(outPath, xml);
  console.log("✅ ToolVerse Sitemap Synchronized.");
}

generate();
