
import { Tool } from '../types';

export const TOOLS: Tool[] = [
  // AI TOOLS
  {
    slug: 'ai-article-writer',
    title: 'AI Article & Blog Writer',
    category: 'ai',
    description: 'Generate high-quality, SEO-optimized blog posts instantly with AI.',
    keywords: ['ai writer', 'blog generator', 'article writer'],
    toolType: 'ai'
  },
  {
    slug: 'background-remover',
    title: 'AI Background Remover',
    category: 'ai',
    description: 'Remove background from images instantly using advanced AI.',
    keywords: ['remove background', 'bg remover', 'transparent image'],
    toolType: 'ai'
  },
  {
    slug: 'text-to-speech',
    title: 'AI Text to Speech',
    category: 'ai',
    description: 'Convert any text into natural-sounding speech using advanced AI voices.',
    keywords: ['tts', 'text to speech', 'ai voice'],
    toolType: 'ai'
  },

  // IMAGE TOOLS
  {
    slug: 'image-compressor',
    title: 'Image Compressor',
    category: 'image',
    description: 'Compress images online for free without losing quality.',
    keywords: ['compress image', 'image optimizer'],
    toolType: 'client'
  },
  {
    slug: 'image-resizer',
    title: 'Image Resizer',
    category: 'image',
    description: 'Resize images to specific dimensions in pixels.',
    keywords: ['resize image', 'scale photo'],
    toolType: 'client'
  },
  {
    slug: 'color-picker',
    title: 'Online Color Picker',
    category: 'image',
    description: 'Select colors from a palette or image and get HEX/RGB codes.',
    keywords: ['color picker', 'hex finder', 'eye dropper'],
    toolType: 'client'
  },

  // PDF TOOLS
  {
    slug: 'pdf-merge',
    title: 'Merge PDF Online',
    category: 'pdf',
    description: 'Combine multiple PDF documents into one single file.',
    keywords: ['merge pdf', 'combine pdf'],
    toolType: 'client'
  },
  {
    slug: 'pdf-split',
    title: 'Split PDF Online',
    category: 'pdf',
    description: 'Extract pages from your PDF or split each page.',
    keywords: ['split pdf', 'separate pdf'],
    toolType: 'client'
  },

  // DEVELOPER TOOLS
  {
    slug: 'json-formatter',
    title: 'JSON Formatter',
    category: 'dev',
    description: 'Format, beautify, and validate JSON code.',
    keywords: ['json formatter', 'beautify json'],
    toolType: 'client'
  },
  {
    slug: 'markdown-to-html',
    title: 'Markdown to HTML',
    category: 'dev',
    description: 'Convert Markdown text to clean HTML code instantly.',
    keywords: ['markdown converter', 'md to html'],
    toolType: 'client'
  },
  {
    slug: 'lorem-ipsum',
    title: 'Lorem Ipsum Generator',
    category: 'dev',
    description: 'Generate placeholder text for your designs and layouts.',
    keywords: ['lorem ipsum', 'dummy text'],
    toolType: 'client'
  },
  {
    slug: 'base64-tool',
    title: 'Base64 Encoder/Decoder',
    category: 'dev',
    description: 'Encode text to Base64 format or decode it.',
    keywords: ['base64', 'encode base64'],
    toolType: 'client'
  },

  // SEO TOOLS
  {
    slug: 'meta-tag-generator',
    title: 'Meta Tag Generator',
    category: 'seo',
    description: 'Create SEO meta tags for your website to improve search ranking.',
    keywords: ['meta tags', 'seo tags', 'header tags'],
    toolType: 'client'
  },
  {
    slug: 'robots-txt-generator',
    title: 'Robots.txt Generator',
    category: 'seo',
    description: 'Generate a robots.txt file for your website easily.',
    keywords: ['robots.txt', 'seo file'],
    toolType: 'client'
  },
  {
    slug: 'sitemap-generator',
    title: 'XML Sitemap Generator',
    category: 'seo',
    description: 'Create an XML sitemap for search engine indexing.',
    keywords: ['sitemap', 'xml sitemap'],
    toolType: 'client'
  },

  // UTILITY TOOLS
  {
    slug: 'word-counter',
    title: 'Word Counter',
    category: 'utility',
    description: 'Count words, characters, and sentences in your text.',
    keywords: ['word count', 'character counter'],
    toolType: 'client'
  },
  {
    slug: 'case-converter',
    title: 'Case Converter',
    category: 'utility',
    description: 'Change text case between UPPER, lower, and Title Case.',
    keywords: ['text case', 'uppercase'],
    toolType: 'client'
  },
  {
    slug: 'unit-converter',
    title: 'Unit Converter',
    category: 'utility',
    description: 'Convert length, weight, and temperature units.',
    keywords: ['unit converter', 'metric converter'],
    toolType: 'client'
  },
  {
    slug: 'qr-generator',
    title: 'QR Code Generator',
    category: 'utility',
    description: 'Create professional QR codes for links or text.',
    keywords: ['qr code', 'generate qr'],
    toolType: 'client'
  },

  // CALCULATORS
  {
    slug: 'age-calculator',
    title: 'Age Calculator',
    category: 'calculators',
    description: 'Calculate your exact age in years, months, and days.',
    keywords: ['age calc', 'birthday calculator'],
    toolType: 'client'
  },
  {
    slug: 'emi-calculator',
    title: 'EMI Calculator',
    category: 'calculators',
    description: 'Calculate monthly loan installments.',
    keywords: ['loan emi', 'mortgage calculator'],
    toolType: 'client'
  },
  {
    slug: 'percentage-calculator',
    title: 'Percentage Calculator',
    category: 'calculators',
    description: 'Calculate percentages, increases, and decreases.',
    keywords: ['percentage', 'math calculator'],
    toolType: 'client'
  },

  // SECURITY TOOLS
  {
    slug: 'password-generator',
    title: 'Password Generator',
    category: 'security',
    description: 'Create secure, random passwords.',
    keywords: ['password', 'secure generator'],
    toolType: 'client'
  },
  
  // NETWORK TOOLS
  {
    slug: 'my-ip-lookup',
    title: 'My IP Address Lookup',
    category: 'network',
    description: 'Find your public IP address and location details.',
    keywords: ['my ip', 'what is my ip'],
    toolType: 'client'
  },
  {
    slug: 'browser-info',
    title: 'Browser Info',
    category: 'network',
    description: 'View detailed information about your web browser and OS.',
    keywords: ['browser details', 'user agent'],
    toolType: 'client'
  }
];
