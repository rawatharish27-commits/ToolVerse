
// Fix: Updated import to use TOOL_REGISTRY which is exported from core/toolRegistry instead of TOOLS
import { TOOL_REGISTRY } from '../core/toolRegistry';

const BASE_URL = 'https://toolverse-4gr.pages.dev';

/**
 * Procedural XML Generator
 * Ensures all 100 nodes are indexed for high-traffic discovery.
 */
export function generateSitemap() {
  const staticRoutes = ['', '/directory', '/about', '/privacy', '/terms'];
  // Fix: Changed TOOLS.map to TOOL_REGISTRY.map to align with the exported member
  const toolRoutes = TOOL_REGISTRY.map(t => `/tools/${t.slug}`);
  
  const all = [...staticRoutes, ...toolRoutes];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all.map(route => `
  <url>
    <loc>${BASE_URL}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
</urlset>`;

  return xml.trim();
}