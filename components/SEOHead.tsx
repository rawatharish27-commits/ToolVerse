
import React, { useEffect } from 'react';
import { Tool } from '../types';

interface Props {
  title?: string;
  description?: string;
  url?: string;
  tool?: Tool;
}

const SEOHead: React.FC<Props> = ({ title, description, url, tool }) => {
  useEffect(() => {
    const finalTitle = tool 
      ? `${tool.title} | Free Online Tool | ToolVerse` 
      : title || "ToolVerse - Professional Utility Hub";
      
    const finalDesc = tool 
      ? `${tool.description} No signup, no data upload. Safe and instant browser-native processing.` 
      : description || "Access 500+ free online tools for PDF, images, AI, and finance.";

    document.title = finalTitle;

    const updateMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    updateMeta('description', finalDesc);
    updateMeta('og:title', finalTitle);
    updateMeta('og:description', finalDesc);
    if (url) updateMeta('og:url', `https://toolverse-4gr.pages.dev${url}`);

  }, [title, description, url, tool]);

  return null;
};

export default SEOHead;
