
import { Tool } from '../types';

export const TOOLS: Tool[] = [
  // --- TIER 1: HIGH REVENUE / HIGH TRAFFIC ---
  {
    slug: 'emi-calculator',
    title: 'Professional EMI Calculator',
    category: 'calculators',
    priority: 100,
    description: 'Calculate monthly loan installments with detailed amortization schedules.',
    keywords: ['emi', 'loan calculator', 'finance', 'mortgage'],
    toolType: 'client'
  },
  {
    slug: 'ai-article-writer',
    title: 'AI Article & Blog Generator',
    category: 'ai',
    priority: 98,
    description: 'Generate SEO-optimized content using advanced Gemini AI models.',
    keywords: ['ai writer', 'content generator', 'seo blog'],
    toolType: 'ai'
  },
  {
    slug: 'pdf-merge',
    title: 'Merge PDF Documents',
    category: 'pdf',
    priority: 95,
    description: 'Combine multiple PDF files into a single document instantly.',
    keywords: ['merge pdf', 'combine pdf', 'join pdf'],
    toolType: 'client'
  },
  {
    slug: 'image-compressor',
    title: 'Ultra Image Compressor',
    category: 'image',
    priority: 92,
    description: 'Reduce image size by up to 90% without losing visible quality.',
    keywords: ['compress image', 'reduce size', 'optimize photo'],
    toolType: 'client'
  },
  {
    slug: 'sip-calculator',
    title: 'SIP Investment Calculator',
    category: 'calculators',
    priority: 90,
    description: 'Calculate future wealth from your mutual fund investments.',
    keywords: ['sip', 'mutual fund', 'investment', 'wealth'],
    toolType: 'client'
  },

  // --- TIER 2: UTILITIES & DEV TOOLS ---
  {
    slug: 'json-formatter',
    title: 'JSON Formatter & Validator',
    category: 'dev',
    priority: 85,
    description: 'Prettify, minify, and validate JSON code for developers.',
    keywords: ['json formatter', 'beautify json', 'validate json'],
    toolType: 'client'
  },
  {
    slug: 'base64-encoder',
    title: 'Base64 Encode/Decode',
    category: 'dev',
    priority: 80,
    description: 'Quickly convert text or files to Base64 format and vice versa.',
    keywords: ['base64', 'encode', 'decode'],
    toolType: 'client'
  },
  {
    slug: 'case-converter',
    title: 'Text Case Converter',
    category: 'utility',
    priority: 75,
    description: 'Convert text to UPPERCASE, lowercase, Title Case, or Sentence case.',
    keywords: ['text case', 'uppercase', 'lowercase'],
    toolType: 'client'
  },
  {
    slug: 'password-generator',
    title: 'Secure Password Generator',
    category: 'security',
    priority: 70,
    description: 'Generate cryptographically strong passwords for your accounts.',
    keywords: ['password', 'security', 'generator'],
    toolType: 'client'
  },
  {
    slug: 'word-counter',
    title: 'Word & Character Counter',
    category: 'utility',
    priority: 65,
    description: 'Detailed analysis of text including words, chars, and reading time.',
    keywords: ['word count', 'character count', 'text analysis'],
    toolType: 'client'
  },

  // --- TIER 3: LONG TAIL / SEO ---
  {
    slug: 'xml-sitemap-generator',
    title: 'XML Sitemap Generator',
    category: 'seo',
    priority: 60,
    description: 'Create Google-friendly sitemaps for your website indexing.',
    keywords: ['sitemap', 'seo', 'google sitemap'],
    toolType: 'client'
  },
  {
    slug: 'robots-generator',
    title: 'Robots.txt Generator',
    category: 'seo',
    priority: 55,
    description: 'Generate custom robots.txt files for search engine crawlers.',
    keywords: ['robots.txt', 'seo', 'crawling'],
    toolType: 'client'
  },
  {
    slug: 'lorem-ipsum-generator',
    title: 'Lorem Ipsum Generator',
    category: 'utility',
    priority: 50,
    description: 'Generate placeholder text for your design and development projects.',
    keywords: ['lorem ipsum', 'placeholder text', 'dummy text'],
    toolType: 'client'
  },
  {
    slug: 'unit-converter',
    title: 'Master Unit Converter',
    category: 'utility',
    priority: 45,
    description: 'Convert between hundreds of units for length, weight, and volume.',
    keywords: ['units', 'conversion', 'metric'],
    toolType: 'client'
  },
  {
    slug: 'md5-hash-generator',
    title: 'MD5 Hash Generator',
    category: 'security',
    priority: 40,
    description: 'Generate unique MD5 hashes for any text input.',
    keywords: ['md5', 'hash', 'encryption'],
    toolType: 'client'
  },
  {
    slug: 'url-encoder',
    title: 'URL Encode/Decode',
    category: 'dev',
    priority: 35,
    description: 'Safely encode or decode URLs for web parameters.',
    keywords: ['url encode', 'url decode', 'uri'],
    toolType: 'client'
  }
];
