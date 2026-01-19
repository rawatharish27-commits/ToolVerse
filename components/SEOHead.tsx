
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  url: string;
  type?: 'website' | 'article';
}

const SEOHead: React.FC<SEOHeadProps> = ({ title, description, url, type = 'website' }) => {
  if (!title || !url) return null;

  const fullTitle = `${title} | ToolVerse - The Ultimate Mega Platform`;
  const siteName = "ToolVerse";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || "Access 500+ free professional online tools instantly."} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content="https://toolverse.com/og-image.png" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://toolverse.com/og-image.png" />
      <meta name="twitter:site" content="@toolverse" />

      {/* Prevent Flash of Unstyled Content Meta */}
      <meta name="theme-color" content="#4f46e5" />
    </Helmet>
  );
};

export default SEOHead;
