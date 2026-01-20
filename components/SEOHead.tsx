import React, { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  url: string;
  type?: 'website' | 'article';
}

/**
 * Native SEO Engine for ToolVerse
 * Manages document metadata directly to ensure React 19 compatibility
 * and prevent Error #525 (Suspense mismatch).
 */
const SEOHead: React.FC<SEOHeadProps> = ({ title, description, url, type = 'website' }) => {
  useEffect(() => {
    if (!title || !url) return;

    // 1. Update Document Title
    const fullTitle = `${title} | ToolVerse - The Ultimate Mega Platform`;
    document.title = fullTitle;

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
    setMeta('description', description || "Access 500+ free professional online tools instantly.");
    setMeta('theme-color', '#4f46e5');

    // 4. Update Open Graph
    setMeta('og:type', type, true);
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:url', url, true);
    setMeta('og:site_name', 'ToolVerse', true);
    setMeta('og:image', 'https://toolverse-4gr.pages.dev/og-image.png', true);

    // 5. Update Twitter Meta
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', 'https://toolverse-4gr.pages.dev/og-image.png');
    setMeta('twitter:site', '@toolverse');

    // 6. Update Canonical Link
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', url);

  }, [title, description, url, type]);

  return null;
};

export default SEOHead;