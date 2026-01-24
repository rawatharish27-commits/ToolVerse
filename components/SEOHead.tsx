import React, { useEffect } from 'react';
import { SITE_CONFIG } from '../config/site';

interface SEOHeadProps {
  title: string;
  description: string;
  url: string;
  type?: 'website' | 'article';
}

/**
 * ToolVerse Native SEO Engine - Discover Edition
 * Implements automated canonical injection for safe domain migration.
 */
const SEOHead: React.FC<SEOHeadProps> = ({ title, description, url, type = 'website' }) => {
  useEffect(() => {
    if (!title) return;

    // 1. Update Document Title
    document.title = `${title} | ${SITE_CONFIG.name}`;

    // 2. Helper to set or create meta tags
    const setMeta = (name: string, content: string, property: boolean = false) => {
      const attr = property ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // 3. Update Standard Meta
    setMeta('description', description);
    setMeta('robots', 'index, follow, max-image-preview:large');
    setMeta('theme-color', SITE_CONFIG.themeColor);

    // 4. Update Open Graph
    setMeta('og:type', type, true);
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:url', url, true);
    setMeta('og:site_name', SITE_CONFIG.name, true);
    setMeta('og:image', 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=1200', true);

    // 5. Update Twitter Meta
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    
    // 6. Automated Canonical Enforcement
    // This ensures that even if accessed via pages.dev, Google sees the config domain
    const currentPath = window.location.pathname;
    const canonicalUrl = `${SITE_CONFIG.baseUrl}${currentPath === '/' ? '' : currentPath}`;
    
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonicalUrl);

  }, [title, description, url, type]);

  return null;
};

export default SEOHead;