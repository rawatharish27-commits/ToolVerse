
import { TOOL_REGISTRY } from '../core/toolRegistry';
import { CATEGORY_REGISTRY } from '../core/categoryRegistry';

const BASE_URL = 'https://toolverse-4gr.pages.dev';

/**
 * Procedural XML Generator
 * Ensures all 100 tools AND all category hubs are indexed.
 */
export function generateSitemap() {
  const staticRoutes = ['', '/directory', '/about', '/privacy', '/terms'];
  const toolRoutes = TOOL_REGISTRY.map(t => `/tool/${t.slug}`);
  const catRoutes = Object.keys(CATEGORY_REGISTRY).map(id => `/category/${id}`);
  
  const all = [...staticRoutes, ...toolRoutes, ...catRoutes];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all.map(route => `
  <url>
    <loc>${BASE_URL}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === '' ? '1.0' : route.includes('category') ? '0.9' : '0.8'}</priority>
  </url>`).join('')}
</urlset>`;

  return xml.trim();
}
