import { Tool } from '../types';

export const TOOLS: Tool[] = [
  // --- AI HUB (High Priority) ---
  { slug: 'ai-article-writer-pro', title: 'AI Article Writer Pro', category: 'ai', priority: 100, description: 'Generate high-quality, SEO-optimized articles using Gemini 3.0.', keywords: ['ai writer', 'blog generator', 'content creator'], toolType: 'ai' },
  { slug: 'ai-code-debugger', title: 'AI Code Debugger', category: 'ai', priority: 95, description: 'Fix programming errors instantly with AI-powered analysis.', keywords: ['debug', 'code fixer', 'programming'], toolType: 'ai' },
  { slug: 'ai-image-generator', title: 'AI Image Studio', category: 'ai', priority: 98, description: 'Generate stunning visuals from text prompts.', keywords: ['image gen', 'stable diffusion', 'ai art'], toolType: 'ai' },
  { slug: 'ai-email-assistant', title: 'AI Email Assistant', category: 'ai', priority: 90, description: 'Write professional emails in seconds.', keywords: ['email ai', 'professional', 'writing'], toolType: 'ai' },

  // --- IMAGE LAB ---
  { slug: 'image-compressor', title: 'Smart Image Compressor', category: 'image', priority: 100, description: 'Compress PNG/JPG/WebP without quality loss.', keywords: ['compress', 'optimization', 'tinypng'], toolType: 'client' },
  { slug: 'background-remover', title: 'AI Background Remover', category: 'image', priority: 99, description: 'Remove backgrounds instantly with neural networks.', keywords: ['bg remover', 'transparent'], toolType: 'client' },
  { slug: 'image-resizer', title: 'Bulk Image Resizer', category: 'image', priority: 92, description: 'Resize hundreds of images to custom dimensions.', keywords: ['resize', 'scaling', 'dimensions'], toolType: 'client' },
  { slug: 'image-to-text-ocr', title: 'OCR Image to Text', category: 'image', priority: 95, description: 'Extract editable text from scans and photos.', keywords: ['ocr', 'extract text', 'scanner'], toolType: 'client' },

  // --- PDF SUITE ---
  { slug: 'pdf-merge', title: 'PDF Merger Tool', category: 'pdf', priority: 100, description: 'Combine multiple PDF files into a single document.', keywords: ['merge', 'combine', 'pdf joiner'], toolType: 'client' },
  { slug: 'pdf-to-word-converter', title: 'PDF to Word Converter', category: 'pdf', priority: 98, description: 'Convert PDF files to editable DOCX format.', keywords: ['pdf to word', 'converter', 'doc'], toolType: 'client' },
  { slug: 'pdf-split', title: 'PDF Splitter', category: 'pdf', priority: 90, description: 'Extract pages from PDF files effortlessly.', keywords: ['split', 'extract', 'pages'], toolType: 'client' },

  // --- SEO & DEV HUB ---
  { slug: 'xml-sitemap-generator', title: 'XML Sitemap Generator', category: 'seo', priority: 98, description: 'Generate Google-ready XML sitemaps for any website.', keywords: ['sitemap', 'seo', 'google'], toolType: 'client' },
  { slug: 'json-ld-schema-pro', title: 'JSON-LD Schema Maker', category: 'seo', priority: 95, description: 'Create rich snippet schemas for better search rankings.', keywords: ['schema', 'json-ld', 'snippets'], toolType: 'client' },
  { slug: 'json-formatter', title: 'JSON Formatter & Validator', category: 'dev', priority: 96, description: 'Prettify and validate JSON code instantly.', keywords: ['json', 'format', 'pretty'], toolType: 'client' },
  { slug: 'password-strength-checker', title: 'Advanced Password Auditor', category: 'security', priority: 94, description: 'Check password entropy and security levels.', keywords: ['password', 'security', 'bits'], toolType: 'client' },

  // --- UTILITY HUB ---
  { slug: 'qr-code-generator', title: 'QR Code Pro Studio', category: 'utility', priority: 97, description: 'Generate high-res QR codes for URLs and text.', keywords: ['qr', 'generator', 'barcode'], toolType: 'client' },
  { slug: 'what-is-my-ip', title: 'IP Lookup Tool', category: 'network', priority: 100, description: 'Check your public IP and network details.', keywords: ['myip', 'lookup', 'network'], toolType: 'client' },
  { slug: 'text-to-speech-reader', title: 'AI Voice Reader (TTS)', category: 'office', priority: 93, description: 'Convert text to natural human-like speech.', keywords: ['tts', 'voice', 'speech'], toolType: 'client' },
  
  // NOTE: More tools can be added following this pattern up to 500+
];