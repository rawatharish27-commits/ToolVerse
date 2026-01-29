
import React, { useEffect } from 'react';
import { Tool } from '../types';

interface Props {
  tool?: Tool;
  metadata?: any;
}

const SEOManager: React.FC<Props> = ({ tool, metadata }) => {
  useEffect(() => {
    if (tool && metadata) {
      // 1. Unique Canonical Title from Problem Statement
      document.title = `${metadata.problemStatement} | ToolVerse`;
      
      // 2. Unique Meta Description for indexing
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', tool.description + " Resolved with ToolVerse stateless logic.");

      // 3. Canonical Link
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', `https://toolverse-4gr.pages.dev/tools/${tool.slug}`);
    }
  }, [tool, metadata]);

  return null;
};

export default SEOManager;
