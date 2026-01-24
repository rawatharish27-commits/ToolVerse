
import { Tool } from '../types';

export const TOOLS: Tool[] = [
  // --- AI TEXT & GENERATION HUB ---
  { slug: 'ai-article-generator', title: 'AI Article Writer Pro', category: 'ai', priority: 100, description: 'Generate structured, 1500+ word SEO articles with full orchestration logic.', keywords: ['blog', 'writer', 'content generator'], toolType: 'ai' },
  { slug: 'ai-article-rewriter', title: 'Smart Content Rewriter', category: 'ai', priority: 95, description: 'Rewrite existing content to improve readability, flow, and unique impact.', keywords: ['rewrite', 'paraphrase', 'spin text'], toolType: 'ai' },
  { slug: 'ai-grammar-fixer', title: 'Professional Proofreader', category: 'ai', priority: 90, description: 'Fix grammar, spelling, and punctuation while maintaining your unique voice.', keywords: ['grammar', 'fix typos', 'spellcheck'], toolType: 'ai' },
  { slug: 'ai-tone-converter', title: 'Tone Shifter', category: 'ai', priority: 85, description: 'Transform any text into Formal, Friendly, Professional, or Marketing tones.', keywords: ['tone', 'style', 'writing style'], toolType: 'ai' },
  { slug: 'ai-seo-optimizer', title: 'SEO Content Enhancer', category: 'ai', priority: 98, description: 'Inject keywords and optimize structure for better search engine rankings.', keywords: ['seo', 'keyword optimization', 'ranking'], toolType: 'ai' },
  { slug: 'ai-email-generator', title: 'AI Email Assistant', category: 'ai', priority: 92, description: 'Generate high-conversion cold emails and professional correspondence.', keywords: ['email', 'outreach', 'writing'], toolType: 'ai' },
  { slug: 'ai-resume-writer', title: 'Resume Bullet Optimizer', category: 'ai', priority: 88, description: 'Turn simple tasks into high-impact professional accomplishments for your CV.', keywords: ['resume', 'cv', 'job search'], toolType: 'ai' },
  { slug: 'ai-story-generator', title: 'Creative Story Studio', category: 'ai', priority: 80, description: 'Create engaging short stories and fiction based on simple plot ideas.', keywords: ['story', 'fiction', 'creative writing'], toolType: 'ai' },
  { slug: 'ai-youtube-script', title: 'YouTube Script Architect', category: 'ai', priority: 94, description: 'Plan and write scripts for viral videos including hooks and CTAs.', keywords: ['youtube', 'script', 'video content'], toolType: 'ai' },
  { slug: 'ai-product-description', title: 'E-commerce Copywriter', category: 'ai', priority: 91, description: 'Generate persuasive product descriptions that drive sales and clicks.', keywords: ['product', 'description', 'copywriting'], toolType: 'ai' },

  // --- SOCIAL MEDIA HUB ---
  { slug: 'social-caption-generator', title: 'AI Social Caption Master', category: 'social', priority: 100, description: 'Generate platform-optimized, high-engagement captions using engagement psychology.', keywords: ['caption generator', 'social media copy'], toolType: 'ai' },
  { slug: 'social-hashtag-generator', title: 'AI Social Hashtag Architect', category: 'social', priority: 98, description: 'Generate relevant hashtags to maximize organic reach.', keywords: ['hashtag generator', 'reach'], toolType: 'ai' },
  { slug: 'social-bio-generator', title: 'AI Social Bio Architect', category: 'social', priority: 96, description: 'Generate professional, conversion-oriented bios for all platforms.', keywords: ['bio generator', 'profile optimization'], toolType: 'ai' },
  { slug: 'social-reel-idea-generator', title: 'AI Reel Idea Architect', category: 'social', priority: 95, description: 'Generate viral reel concepts with hooks and scene flows.', keywords: ['reel ideas', 'tiktok hooks'], toolType: 'ai' },
  { slug: 'social-poll-creator', title: 'AI Social Poll Architect', category: 'social', priority: 89, description: 'Generate high-engagement poll questions for Stories and Community tabs.', keywords: ['poll creator', 'engagement'], toolType: 'ai' },

  // --- IMAGE & DESIGN HUB ---
  { slug: 'image-compressor', title: 'Smart Image Compressor', category: 'image', priority: 100, description: 'Compress PNG/JPG/WebP without quality loss. Native processing.', keywords: ['compress', 'optimization'], toolType: 'client' },
  { slug: 'background-remover', title: 'Local Background Remover', category: 'image', priority: 99, description: 'Remove backgrounds instantly with neural networks in your browser.', keywords: ['bg remover', 'transparent'], toolType: 'client' },
  { slug: 'image-resizer', title: 'Bulk Image Resizer', category: 'image', priority: 95, description: 'Resize images to custom dimensions or percentage scale.', keywords: ['resize', 'scale'], toolType: 'client' },
  { slug: 'image-cropper', title: 'Image Cropper Pro', category: 'image', priority: 93, description: 'Precision cropping for social media and web assets.', keywords: ['crop', 'edit'], toolType: 'client' },
  { slug: 'image-converter', title: 'Image Converter Pro', category: 'image', priority: 92, description: 'Convert images between JPG, PNG, WebP and more.', keywords: ['convert', 'format'], toolType: 'client' },
  { slug: 'ai-image-generator', title: 'AI Image Studio (Prompts)', category: 'image', priority: 97, description: 'Architect high-fidelity prompts for Midjourney, DALL-E, and more.', keywords: ['prompt', 'ai image'], toolType: 'ai' },

  // --- PDF & DOCUMENT HUB ---
  { slug: 'pdf-merge', title: 'PDF Merger Tool', category: 'pdf', priority: 100, description: 'Combine multiple PDF files into a single document.', keywords: ['merge', 'pdf joiner'], toolType: 'client' },
  { slug: 'pdf-split', title: 'PDF Splitter Pro', category: 'pdf', priority: 98, description: 'Extract specific pages or split PDF into separate files.', keywords: ['split', 'extract'], toolType: 'client' },
  { slug: 'pdf-compressor', title: 'PDF Size Optimizer', category: 'pdf', priority: 97, description: 'Reduce PDF file size for easier sharing and storage.', keywords: ['pdf compress', 'reduce size'], toolType: 'client' },
  { slug: 'pdf-to-word', title: 'PDF to Word Converter', category: 'pdf', priority: 95, description: 'Convert PDF documents into editable Word files.', keywords: ['pdf converter', 'docx'], toolType: 'client' },
  { slug: 'pdf-ocr', title: 'Pro PDF OCR', category: 'pdf', priority: 94, description: 'Extract text from scanned PDF documents using AI.', keywords: ['ocr', 'pdf to text'], toolType: 'client' },

  // --- DEVELOPER & DATA HUB ---
  { slug: 'json-formatter', title: 'JSON Formatter & Validator', category: 'dev', priority: 100, description: 'Beautify, minify, and validate JSON code structures.', keywords: ['json', 'beautify'], toolType: 'client' },
  { slug: 'base64-encoder', title: 'Base64 Encoder / Decoder', category: 'dev', priority: 95, description: 'Encode or decode text and binary files to Base64.', keywords: ['base64', 'encode'], toolType: 'client' },
  { slug: 'html-minifier', title: 'HTML / CSS Minifier', category: 'dev', priority: 90, description: 'Compress web code for faster site performance.', keywords: ['minify', 'optimize'], toolType: 'client' },
  { slug: 'js-minifier', title: 'JavaScript Optimizer', category: 'dev', priority: 89, description: 'Minify and obfuscate JS code for production.', keywords: ['javascript', 'minify'], toolType: 'client' },
  { slug: 'regex-tester', title: 'Regex Tester & Debugger', category: 'dev', priority: 88, description: 'Test regular expressions with live highlighting.', keywords: ['regex', 'test'], toolType: 'client' },
  { slug: 'csv-to-json', title: 'CSV to JSON Converter', category: 'data', priority: 95, description: 'Transform CSV data into structured JSON objects.', keywords: ['csv', 'json', 'data'], toolType: 'client' },
  { slug: 'json-to-csv', title: 'JSON to CSV Converter', category: 'data', priority: 94, description: 'Convert JSON arrays into clean CSV spreadsheets.', keywords: ['json', 'csv'], toolType: 'client' },

  // --- SEO & MARKETING HUB ---
  { slug: 'meta-tag-generator', title: 'AI Meta Tag Architect', category: 'seo', priority: 100, description: 'Generate click-worthy SEO meta tags for any page.', keywords: ['meta tags', 'seo architect'], toolType: 'ai' },
  { slug: 'xml-sitemap-generator', title: 'XML Sitemap Architect', category: 'seo', priority: 98, description: 'Create search-engine compliant sitemaps with AI priority.', keywords: ['sitemap', 'seo'], toolType: 'ai' },
  { slug: 'robots-txt-generator', title: 'Robots.txt Crawl Architect', category: 'seo', priority: 95, description: 'Generate high-precision crawl instructions for bots.', keywords: ['robots', 'crawler'], toolType: 'ai' },
  { slug: 'keyword-density-checker', title: 'Keyword Density Expert', category: 'seo', priority: 92, description: 'Analyze content for optimal keyword distribution.', keywords: ['density', 'keyword'], toolType: 'ai' },

  // --- SECURITY & UTILITY HUB ---
  { slug: 'password-strength-checker', title: 'AI Password Risk Auditor', category: 'security', priority: 100, description: 'Deep analysis of password entropy and risk.', keywords: ['password', 'security'], toolType: 'ai' },
  { slug: 'security-hash-generator', title: 'AI Hash Generator', category: 'security', priority: 95, description: 'Generate MD5, SHA-256 and other secure hashes.', keywords: ['hash', 'crypto'], toolType: 'ai' },
  { slug: 'qr-code-generator', title: 'QR Code Pro Studio', category: 'utility', priority: 97, description: 'Generate high-res QR codes for URLs and text.', keywords: ['qr', 'generator'], toolType: 'client' },
  { slug: 'lorem-ipsum-generator', title: 'Placeholder Text Lab', category: 'utility', priority: 80, description: 'Generate filler text for designs and layouts.', keywords: ['lorem', 'dummy text'], toolType: 'client' },
  { slug: 'password-generator', title: 'Secure Vault Generator', category: 'utility', priority: 90, description: 'Generate cryptographically strong random passwords.', keywords: ['password', 'secure'], toolType: 'client' },

  // --- FINANCE & CALCULATORS ---
  { slug: 'compound-interest-calc', title: 'Compound Interest Architect', category: 'calculators', priority: 100, description: 'Calculate future wealth with periodic contributions.', keywords: ['interest', 'compound'], toolType: 'ai' },
  { slug: 'mortgage-calculator', title: 'Mortgage Amortization Pro', category: 'calculators', priority: 98, description: 'Detailed home loan repayment and tax analysis.', keywords: ['mortgage', 'loan'], toolType: 'ai' },
  { slug: 'income-tax-planner', title: 'Global Income Tax Planner', category: 'calculators', priority: 95, description: 'Estimate net income and tax optimization paths.', keywords: ['tax', 'planner'], toolType: 'ai' },
  { slug: 'emi-calculator', title: 'Professional EMI Calculator', category: 'calculators', priority: 90, description: 'Calculate monthly loan repayments with accuracy.', keywords: ['emi', 'repayment'], toolType: 'ai' },

  // --- NETWORK HUB ---
  { slug: 'ip-lookup', title: 'IP Intelligence Lookup', category: 'network', priority: 100, description: 'Deep analysis of IP addresses for security and location.', keywords: ['ip', 'lookup'], toolType: 'ai' },
  { slug: 'dns-lookup', title: 'DNS Record Analyzer', category: 'network', priority: 95, description: 'Inspect DNS records and infrastructure health.', keywords: ['dns', 'dig'], toolType: 'ai' },
  { slug: 'what-is-my-ip', title: 'IP Lookup Tool', category: 'network', priority: 90, description: 'Check your public IP and network details.', keywords: ['myip', 'lookup'], toolType: 'client' }
];
