
import React, { useMemo } from 'react';
import { Tool, ToolCategory } from '../types';
import { generateMasterSEOContent, generateCategorySEOContent } from '../utils/seoContentEngine';
import { TOOLS } from '../data/tools';
import { SITE_CONFIG } from '../config/site';

interface UniversalSEOLayerProps {
  tool?: Tool;
  category?: ToolCategory;
}

/**
 * ToolVerse SEO Ghost Layer v4.0
 * Injects high-authority semantic text and absolute link matrices into the DOM.
 * 100% Invisible to users. 100% Indexable by Googlebot.
 */
const UniversalSEOLayer: React.FC<UniversalSEOLayerProps> = ({ tool, category }) => {
  const content = useMemo(() => {
    // 1. Specific Tool Authority
    if (tool) return generateMasterSEOContent(tool);
    
    // 2. Specific Category Cluster Authority
    if (category) return generateCategorySEOContent(category);

    // 3. Homepage Global Node Registry (Default Fallback)
    const allLinks = TOOLS.map(t => `<a href="${SITE_CONFIG.baseUrl}/tools/${t.slug}">${t.title}</a>`).join(', ');
    return `
      <article>
        <h1>ToolVerse - The Ultimate Professional Utility Ecosystem</h1>
        <p>ToolVerse is a globally distributed hub for over 220+ professional digital utilities. Our platform architecture is built on a privacy-first philosophy, utilizing client-side WebAssembly and neural logic to process files without server-side uploads.</p>
        
        <section>
          <h2>Global Registry of Logic Nodes</h2>
          <p>Access our complete catalog of browser-native tools across PDF, Image, Video, AI, and Financial clusters:</p>
          <nav>${allLinks}</nav>
        </section>

        <section>
          <h2>Core Architectural Pillars</h2>
          <ul>
            <li><strong>Zero-Upload Data Privacy:</strong> All data residency remains local to the user's browser RAM.</li>
            <li><strong>WASM Execution Performance:</strong> High-speed binary processing for complex document and media tasks.</li>
            <li><strong>Distributed Intelligence:</strong> Advanced neural models deployed at the Edge for creative and analytical support.</li>
          </ul>
        </section>
      </article>
    `;
  }, [tool, category]);

  if (!content) return null;

  return (
    <section 
      id="seo-authority-node"
      aria-hidden="true"
      style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: '0',
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0,0,0,0)',
        whiteSpace: 'nowrap',
        border: '0',
        opacity: 0,
        pointerEvents: 'none',
        zIndex: -1
      }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default UniversalSEOLayer;
