import { Tool } from '../types';

export const TOOLS: Tool[] = [
  // --- PREVIOUS TOOLS ---
  { slug: 'image-compressor', title: 'Image Compressor', category: 'image', priority: 100, description: 'Compress images without quality loss.', keywords: ['compress', 'jpg', 'png'], toolType: 'client' },
  { slug: 'image-resizer', title: 'Image Resizer', category: 'image', priority: 95, description: 'Change dimensions of any image.', keywords: ['resize', 'dimensions'], toolType: 'client' },
  { slug: 'background-remover', title: 'Background Remover', category: 'image', priority: 98, description: 'Remove backgrounds using AI.', keywords: ['bg remover', 'transparent'], toolType: 'client' },
  { slug: 'ai-image-generator', title: 'AI Image Generator', category: 'image', priority: 99, description: 'Generate images from text prompts.', keywords: ['ai', 'generate', 'dalle'], toolType: 'ai' },
  
  // --- SECURITY HUB (EXPANDED) ---
  { slug: 'password-strength-checker', title: 'Password Strength Meter', category: 'security', priority: 95, description: 'Check the security level of your passwords.', keywords: ['security', 'password', 'check'], toolType: 'client' },
  { slug: 'sha256-hash-generator', title: 'SHA-256 Generator', category: 'security', priority: 92, description: 'Secure SHA-256 hash generation.', keywords: ['sha256', 'hash', 'security'], toolType: 'client' },
  { slug: 'file-hash-checker', title: 'File Hash Checker', category: 'security', priority: 90, description: 'Verify file integrity with SHA-256.', keywords: ['hash', 'integrity', 'file'], toolType: 'client' },
  { slug: 'secure-token-generator', title: 'Random Token Generator', category: 'security', priority: 80, description: 'Create cryptographically secure tokens.', keywords: ['token', 'random', 'key'], toolType: 'client' },
  { slug: 'jwt-decoder', title: 'JWT Decoder Pro', category: 'security', priority: 88, description: 'Decode JSON Web Tokens instantly.', keywords: ['jwt', 'decode', 'json'], toolType: 'client' },
  { slug: 'binary-to-text', title: 'Binary to Text', category: 'security', priority: 70, description: 'Convert binary code to readable text.', keywords: ['binary', 'text', 'code'], toolType: 'client' },
  { slug: 'text-to-binary', title: 'Text to Binary', category: 'security', priority: 70, description: 'Convert text to binary code.', keywords: ['text', 'binary', 'encode'], toolType: 'client' },

  // --- NETWORK LAB (EXPANDED) ---
  { slug: 'what-is-my-ip', title: 'What is my IP?', category: 'network', priority: 100, description: 'Check your public IP address and location.', keywords: ['ip', 'myip', 'location'], toolType: 'client' },
  { slug: 'ip-lookup-pro', title: 'IP Address Lookup', category: 'network', priority: 95, description: 'Find details about any IP address.', keywords: ['ip', 'lookup', 'geo'], toolType: 'client' },
  { slug: 'subnet-calculator', title: 'IPv4 Subnet Calculator', category: 'network', priority: 90, description: 'Calculate network ranges and masks.', keywords: ['subnet', 'ip', 'network'], toolType: 'client' },
  { slug: 'dns-checker-online', title: 'DNS Records Checker', category: 'network', priority: 85, description: 'Lookup DNS records (A, MX, TXT).', keywords: ['dns', 'records', 'domain'], toolType: 'client' },
  { slug: 'url-encoder-pro', title: 'URL Encoder', category: 'network', priority: 80, description: 'Encode strings for URL usage.', keywords: ['url', 'encode', 'link'], toolType: 'client' },
  { slug: 'url-decoder-pro', title: 'URL Decoder', category: 'network', priority: 80, description: 'Decode URL-encoded strings.', keywords: ['url', 'decode', 'link'], toolType: 'client' },
  { slug: 'base64-to-image', title: 'Base64 to Image', category: 'network', priority: 75, description: 'Decode Base64 strings to images.', keywords: ['base64', 'image', 'preview'], toolType: 'client' },

  // --- OFFICE SUITE (EXPANDED) ---
  { slug: 'csv-to-json-pro', title: 'CSV to JSON', category: 'office', priority: 98, description: 'Convert CSV data to JSON format.', keywords: ['csv', 'json', 'convert'], toolType: 'client' },
  { slug: 'json-to-csv-pro', title: 'JSON to CSV', category: 'office', priority: 98, description: 'Convert JSON objects to CSV files.', keywords: ['json', 'csv', 'convert'], toolType: 'client' },
  { slug: 'json-to-xml', title: 'JSON to XML', category: 'office', priority: 90, description: 'Transform JSON data into XML tags.', keywords: ['json', 'xml', 'data'], toolType: 'client' },
  { slug: 'excel-to-json-pro', title: 'Excel to JSON', category: 'office', priority: 92, description: 'Extract JSON from Excel sheets.', keywords: ['excel', 'json', 'data'], toolType: 'client' },
  { slug: 'bulk-email-extractor', title: 'Email Extractor', category: 'office', priority: 95, description: 'Extract emails from large text blocks.', keywords: ['email', 'extract', 'leads'], toolType: 'client' },
  { slug: 'word-to-pdf-lite', title: 'Word to PDF', category: 'office', priority: 85, description: 'Simple Word document to PDF conversion.', keywords: ['word', 'pdf', 'office'], toolType: 'client' },
  { slug: 'markdown-to-html', title: 'Markdown to HTML', category: 'office', priority: 82, description: 'Convert Markdown to valid HTML code.', keywords: ['markdown', 'html', 'docs'], toolType: 'client' },

  // --- PREVIOUS UTILITIES ---
  { slug: 'pdf-merge', title: 'PDF Merge', category: 'pdf', priority: 100, description: 'Combine multiple PDFs into one.', keywords: ['merge', 'combine'], toolType: 'client' },
  { slug: 'ai-article-writer', title: 'AI Article Writer', category: 'ai', priority: 99, description: 'Generate long-form blog posts.', keywords: ['writer', 'blog'], toolType: 'ai' },
  { slug: 'json-formatter', title: 'JSON Formatter', category: 'dev', priority: 88, description: 'Beautify and validate JSON.', keywords: ['json', 'pretty'], toolType: 'client' },
  { slug: 'emi-calculator', title: 'EMI Calculator', category: 'calculators', priority: 100, description: 'Calculate loan installments.', keywords: ['loan', 'finance'], toolType: 'client' },
  { slug: 'qr-code-generator', title: 'QR Code Generator', category: 'utility', priority: 92, description: 'Create QR codes for URLs.', keywords: ['qr', 'scan'], toolType: 'client' }
];