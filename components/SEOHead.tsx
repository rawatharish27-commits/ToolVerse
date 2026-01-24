
import React, { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  url: string;
  type?: 'website' | 'article';
}

/**
 * ToolVerse Native SEO Engine - Discover Edition
 * Implements "max-image-preview:large" for Discover traffic
 * and high-CTR title orchestration.
 */
const SEOHead: React.FC<SEOHeadProps> = ({ title, description, url, type = 'website' }) => {
  useEffect(() => {
    if (!title || !url) return;

    // 1. Update Document Title
    document.title = title;

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
    setMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMeta('theme-color', '#4f46e5');

    // 4. Update Open Graph
    setMeta('og:type', type, true);
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:url', url, true);
    setMeta('og:site_name', 'ToolVerse', true);
    setMeta('og:image', 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=1200', true);

    // 5. Update Twitter Meta
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    
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
