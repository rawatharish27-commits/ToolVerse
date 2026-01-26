
import React, { useEffect } from 'react';
import { SITE_CONFIG } from '../config/site';

interface SEOHeadProps {
  title: string;
  description: string;
  url: string;
  type?: 'website' | 'article';
  schemas?: any[]; 
}

/**
 * ToolVerse SEO Orchestrator v5.0
 * Handles Meta Reset, Canonical Enforcement, and Schema Automation injection.
 */
const SEOHead: React.FC<SEOHeadProps> = ({ title, description, url, type = 'website', schemas = [] }) => {
  useEffect(() => {
    if (!title) return;

    // 1. Update Document Title
    document.title = `${title} | ${SITE_CONFIG.name}`;

    // 2. Meta Tag Helper
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

    // 3. Apply Standard & Social Meta
    setMeta('description', description);
    setMeta('robots', 'index, follow, max-image-preview:large');
    setMeta('theme-color', SITE_CONFIG.themeColor);
    setMeta('og:type', type, true);
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:url', url, true);
    setMeta('og:image', 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=1200', true);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    
    // 4. Canonical Enforcement (Growth Signal)
    const currentPath = window.location.pathname;
    const canonicalUrl = `${SITE_CONFIG.baseUrl}${currentPath === '/' ? '' : currentPath}`;
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonicalUrl);

    // 5. Schema Injection (Hard Reset Logic)
    // Remove all existing ToolVerse generated schemas to prevent GSC duplicates
    document.querySelectorAll('.tv-schema-node').forEach(el => el.remove());
    
    schemas.forEach((schemaObj) => {
      if (!schemaObj) return;
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.className = 'tv-schema-node';
      script.text = JSON.stringify(schemaObj);
      document.head.appendChild(script);
    });

  }, [title, description, url, type, schemas]);

  return null;
};

export default SEOHead;
