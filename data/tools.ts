import { Tool } from '../types';

export const TOOLS: Tool[] = [
  // --- PREVIOUS TOOLS ---
  { slug: 'image-compressor', title: 'Image Compressor', category: 'image', priority: 100, description: 'Compress images without quality loss.', keywords: ['compress', 'jpg', 'png'], toolType: 'client' },
  { slug: 'image-resizer', title: 'Image Resizer', category: 'image', priority: 95, description: 'Change dimensions of any image.', keywords: ['resize', 'dimensions'], toolType: 'client' },
  { slug: 'background-remover', title: 'Background Remover', category: 'image', priority: 98, description: 'Remove backgrounds using AI.', keywords: ['bg remover', 'transparent'], toolType: 'client' },
  
  // --- SECURITY HUB (NEW TOOLS) ---
  { slug: 'sha512-hash-generator', title: 'SHA-512 Generator', category: 'security', priority: 85, description: 'Generate high-security SHA-512 cryptographic hashes.', keywords: ['sha512', 'hash', 'encryption'], toolType: 'client' },
  { slug: 'password-entropy-analyzer', title: 'Password Entropy Analyzer', category: 'security', priority: 88, description: 'Calculate the mathematical strength (bits) of your password.', keywords: ['security', 'bits', 'entropy'], toolType: 'client' },
  { slug: 'base64-file-encoder', title: 'Base64 File Encoder', category: 'security', priority: 82, description: 'Convert any file to a Base64 string securely.', keywords: ['base64', 'file', 'binary'], toolType: 'client' },
  { slug: 'password-strength-checker', title: 'Password Strength Meter', category: 'security', priority: 95, description: 'Check the security level of your passwords.', keywords: ['security', 'password', 'check'], toolType: 'client' },
  { slug: 'sha256-hash-generator', title: 'SHA-256 Generator', category: 'security', priority: 92, description: 'Secure SHA-256 hash generation.', keywords: ['sha256', 'hash', 'security'], toolType: 'client' },
  { slug: 'jwt-decoder', title: 'JWT Decoder Pro', category: 'security', priority: 88, description: 'Decode JSON Web Tokens instantly.', keywords: ['jwt', 'decode', 'json'], toolType: 'client' },

  // --- NETWORK LAB (NEW TOOLS) ---
  { slug: 'http-header-inspector', title: 'HTTP Header Inspector', category: 'network', priority: 90, description: 'Inspect browser request headers in real-time.', keywords: ['http', 'headers', 'request'], toolType: 'client' },
  { slug: 'mac-address-generator', title: 'MAC Address Generator', category: 'network', priority: 70, description: 'Generate random valid MAC addresses.', keywords: ['mac', 'address', 'network'], toolType: 'client' },
  { slug: 'what-is-my-ip', title: 'What is my IP?', category: 'network', priority: 100, description: 'Check your public IP address and location.', keywords: ['ip', 'myip', 'location'], toolType: 'client' },
  { slug: 'ip-lookup-pro', title: 'IP Address Lookup', category: 'network', priority: 95, description: 'Find details about any IP address.', keywords: ['ip', 'lookup', 'geo'], toolType: 'client' },
  { slug: 'url-encoder-pro', title: 'URL Encoder', category: 'network', priority: 80, description: 'Encode strings for URL usage.', keywords: ['url', 'encode', 'link'], toolType: 'client' },

  // --- OFFICE SUITE (NEW TOOLS) ---
  { slug: 'json-to-yaml-pro', title: 'JSON to YAML', category: 'office', priority: 94, description: 'Convert JSON objects to YAML format.', keywords: ['json', 'yaml', 'convert'], toolType: 'client' },
  { slug: 'markdown-previewer', title: 'Markdown Previewer', category: 'office', priority: 80, description: 'Real-time Markdown to HTML renderer.', keywords: ['markdown', 'preview', 'html'], toolType: 'client' },
  { slug: 'text-to-speech-reader', title: 'TTS Reader', category: 'office', priority: 85, description: 'Listen to your text using high-quality browser voices.', keywords: ['tts', 'speech', 'voice'], toolType: 'client' },
  { slug: 'csv-to-json-pro', title: 'CSV to JSON', category: 'office', priority: 98, description: 'Convert CSV data to JSON format.', keywords: ['csv', 'json', 'convert'], toolType: 'client' },
  { slug: 'json-to-xml', title: 'JSON to XML', category: 'office', priority: 90, description: 'Transform JSON data into XML tags.', keywords: ['json', 'xml', 'data'], toolType: 'client' },
  { slug: 'bulk-email-extractor', title: 'Email Extractor', category: 'office', priority: 95, description: 'Extract emails from large text blocks.', keywords: ['email', 'extract', 'leads'], toolType: 'client' },

  // --- OTHERS ---
  { slug: 'pdf-merge', title: 'PDF Merge', category: 'pdf', priority: 100, description: 'Combine multiple PDFs into one.', keywords: ['merge', 'combine'], toolType: 'client' },
  { slug: 'ai-article-writer', title: 'AI Article Writer', category: 'ai', priority: 99, description: 'Generate long-form blog posts.', keywords: ['writer', 'blog'], toolType: 'ai' },
  { slug: 'qr-code-generator', title: 'QR Code Generator', category: 'utility', priority: 92, description: 'Create QR codes for URLs.', keywords: ['qr', 'scan'], toolType: 'client' }
];