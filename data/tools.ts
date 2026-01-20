import { Tool } from '../types';

export const TOOLS: Tool[] = [
  // --- IMAGE TOOLS ---
  { slug: 'image-compressor', title: 'Image Compressor', category: 'image', priority: 100, description: 'Compress images without quality loss.', keywords: ['compress', 'jpg', 'png'], toolType: 'client' },
  { slug: 'image-resizer', title: 'Image Resizer', category: 'image', priority: 95, description: 'Change dimensions of any image.', keywords: ['resize', 'dimensions'], toolType: 'client' },
  { slug: 'jpg-to-png', title: 'JPG to PNG', category: 'image', priority: 90, description: 'Convert JPG images to PNG format.', keywords: ['converter', 'jpg', 'png'], toolType: 'client' },
  { slug: 'png-to-jpg', title: 'PNG to JPG', category: 'image', priority: 90, description: 'Convert PNG images to JPG format.', keywords: ['converter', 'png', 'jpg'], toolType: 'client' },
  { slug: 'image-to-pdf', title: 'Image to PDF', category: 'image', priority: 85, description: 'Convert images to PDF documents.', keywords: ['pdf', 'convert'], toolType: 'client' },
  { slug: 'background-remover', title: 'Background Remover', category: 'image', priority: 98, description: 'Remove backgrounds using AI.', keywords: ['bg remover', 'transparent'], toolType: 'client' },
  { slug: 'photo-enhancer', title: 'Photo Enhancer', category: 'image', priority: 80, description: 'Improve image quality and lighting.', keywords: ['enhance', 'sharp'], toolType: 'client' },
  { slug: 'image-cropper', title: 'Image Cropper', category: 'image', priority: 75, description: 'Crop images to any aspect ratio.', keywords: ['crop', 'cut'], toolType: 'client' },
  { slug: 'heic-to-jpg', title: 'HEIC to JPG', category: 'image', priority: 82, description: 'Convert iPhone photos to JPG.', keywords: ['iphone', 'heic'], toolType: 'client' },
  { slug: 'webp-converter', title: 'WebP Converter', category: 'image', priority: 80, description: 'Convert images to WebP format.', keywords: ['webp', 'next-gen'], toolType: 'client' },
  { slug: 'ai-image-generator', title: 'AI Image Generator', category: 'image', priority: 99, description: 'Generate images from text prompts.', keywords: ['ai', 'generate', 'dalle'], toolType: 'ai' },
  { slug: 'meme-generator', title: 'Meme Generator', category: 'image', priority: 85, description: 'Create viral memes instantly.', keywords: ['meme', 'funny'], toolType: 'client' },

  // --- PDF TOOLS ---
  { slug: 'pdf-merge', title: 'PDF Merge', category: 'pdf', priority: 100, description: 'Combine multiple PDFs into one.', keywords: ['merge', 'combine'], toolType: 'client' },
  { slug: 'pdf-split', title: 'PDF Split', category: 'pdf', priority: 95, description: 'Separate PDF pages into files.', keywords: ['split', 'extract'], toolType: 'client' },
  { slug: 'compress-pdf', title: 'Compress PDF', category: 'pdf', priority: 98, description: 'Reduce PDF file size.', keywords: ['compress', 'shrink'], toolType: 'client' },
  { slug: 'pdf-to-word', title: 'PDF to Word', category: 'pdf', priority: 92, description: 'Convert PDF to editable Word.', keywords: ['convert', 'docx'], toolType: 'client' },
  { slug: 'word-to-pdf', title: 'Word to PDF', category: 'pdf', priority: 92, description: 'Convert Word documents to PDF.', keywords: ['convert', 'doc'], toolType: 'client' },
  { slug: 'pdf-to-jpg', title: 'PDF to JPG', category: 'pdf', priority: 88, description: 'Convert PDF pages to images.', keywords: ['convert', 'image'], toolType: 'client' },
  { slug: 'unlock-pdf', title: 'Unlock PDF', category: 'pdf', priority: 80, description: 'Remove passwords from PDFs.', keywords: ['password', 'remove'], toolType: 'client' },
  { slug: 'protect-pdf', title: 'Protect PDF', category: 'pdf', priority: 80, description: 'Add passwords to your PDFs.', keywords: ['secure', 'encrypt'], toolType: 'client' },

  // --- AI TOOLS ---
  { slug: 'ai-article-writer', title: 'AI Article Writer', category: 'ai', priority: 99, description: 'Generate long-form blog posts.', keywords: ['writer', 'blog'], toolType: 'ai' },
  { slug: 'ai-paraphraser', title: 'Paraphrasing Tool', category: 'ai', priority: 90, description: 'Rewrite text professionally.', keywords: ['rewrite', 'spin'], toolType: 'ai' },
  { slug: 'grammar-checker', title: 'Grammar Checker', category: 'ai', priority: 95, description: 'Check grammar and spelling.', keywords: ['correct', 'spell'], toolType: 'ai' },
  { slug: 'plagiarism-checker', title: 'Plagiarism Checker', category: 'ai', priority: 92, description: 'Verify content originality.', keywords: ['unique', 'detect'], toolType: 'ai' },
  { slug: 'ai-resume-builder', title: 'AI Resume Builder', category: 'ai', priority: 88, description: 'Create pro resumes with AI.', keywords: ['career', 'cv'], toolType: 'ai' },
  { slug: 'ai-summarizer', title: 'AI Summarizer', category: 'ai', priority: 85, description: 'Condense long text into summaries.', keywords: ['shorten', 'tl;dr'], toolType: 'ai' },

  // --- SECURITY TOOLS ---
  { slug: 'password-strength-checker', title: 'Password Strength Meter', category: 'security', priority: 95, description: 'Check the security level of your passwords.', keywords: ['security', 'password', 'check'], toolType: 'client' },
  { slug: 'md5-hash-generator', title: 'MD5 Hash Generator', category: 'security', priority: 85, description: 'Generate MD5 cryptographic hashes.', keywords: ['hash', 'md5', 'crypto'], toolType: 'client' },
  { slug: 'sha256-hash-generator', title: 'SHA-256 Generator', category: 'security', priority: 92, description: 'Secure SHA-256 hash generation.', keywords: ['sha256', 'hash', 'security'], toolType: 'client' },
  { slug: 'secure-token-generator', title: 'Random Token Generator', category: 'security', priority: 80, description: 'Create cryptographically secure tokens.', keywords: ['token', 'random', 'key'], toolType: 'client' },
  { slug: 'jwt-decoder', title: 'JWT Decoder', category: 'security', priority: 88, description: 'Decode JSON Web Tokens instantly.', keywords: ['jwt', 'decode', 'json'], toolType: 'client' },
  { slug: 'base64-security-encoder', title: 'Secure Base64 Encoder', category: 'security', priority: 70, description: 'Encode data to Base64 format.', keywords: ['base64', 'encode'], toolType: 'client' },

  // --- NETWORK TOOLS ---
  { slug: 'what-is-my-ip', title: 'What is my IP?', category: 'network', priority: 100, description: 'Check your public IP address and location.', keywords: ['ip', 'myip', 'location'], toolType: 'client' },
  { slug: 'ip-lookup-pro', title: 'IP Address Lookup', category: 'network', priority: 95, description: 'Find details about any IP address.', keywords: ['ip', 'lookup', 'geo'], toolType: 'client' },
  { slug: 'dns-checker-online', title: 'DNS Records Checker', category: 'network', priority: 85, description: 'Lookup DNS records (A, MX, TXT).', keywords: ['dns', 'records', 'domain'], toolType: 'client' },
  { slug: 'url-encoder-pro', title: 'URL Encoder', category: 'network', priority: 80, description: 'Encode strings for URL usage.', keywords: ['url', 'encode', 'link'], toolType: 'client' },
  { slug: 'url-decoder-pro', title: 'URL Decoder', category: 'network', priority: 80, description: 'Decode URL-encoded strings.', keywords: ['url', 'decode', 'link'], toolType: 'client' },
  { slug: 'port-scanner-lite', title: 'Basic Port Scanner', category: 'network', priority: 75, description: 'Test connectivity to common ports.', keywords: ['port', 'scanner', 'network'], toolType: 'client' },

  // --- OFFICE TOOLS ---
  { slug: 'csv-to-json-pro', title: 'CSV to JSON', category: 'office', priority: 98, description: 'Convert CSV data to JSON format.', keywords: ['csv', 'json', 'convert'], toolType: 'client' },
  { slug: 'json-to-csv-pro', title: 'JSON to CSV', category: 'office', priority: 98, description: 'Convert JSON objects to CSV files.', keywords: ['json', 'csv', 'convert'], toolType: 'client' },
  { slug: 'excel-to-json-pro', title: 'Excel to JSON', category: 'office', priority: 92, description: 'Extract JSON from Excel sheets.', keywords: ['excel', 'json', 'data'], toolType: 'client' },
  { slug: 'bulk-email-extractor', title: 'Email Extractor', category: 'office', priority: 95, description: 'Extract emails from large text blocks.', keywords: ['email', 'extract', 'leads'], toolType: 'client' },
  { slug: 'text-to-html-pro', title: 'Text to HTML', category: 'office', priority: 80, description: 'Convert plain text to HTML tags.', keywords: ['html', 'text', 'code'], toolType: 'client' },

  // --- VIDEO TOOLS ---
  { slug: 'video-compressor', title: 'Video Compressor', category: 'video', priority: 96, description: 'Reduce video file size.', keywords: ['compress', 'mp4'], toolType: 'client' },
  { slug: 'video-to-mp3', title: 'Video to MP3', category: 'video', priority: 94, description: 'Extract audio from video.', keywords: ['extract', 'audio'], toolType: 'client' },
  { slug: 'video-cutter', title: 'Video Cutter', category: 'video', priority: 85, description: 'Trim and cut video clips.', keywords: ['trim', 'cut'], toolType: 'client' },
  { slug: 'gif-maker', title: 'GIF Maker', category: 'video', priority: 90, description: 'Convert video to animated GIF.', keywords: ['gif', 'animate'], toolType: 'client' },

  // --- DEVELOPER TOOLS ---
  { slug: 'json-formatter', title: 'JSON Formatter', category: 'dev', priority: 88, description: 'Beautify and validate JSON.', keywords: ['json', 'pretty'], toolType: 'client' },
  { slug: 'base64-encoder', title: 'Base64 Encoder', category: 'dev', priority: 80, description: 'Encode text to Base64.', keywords: ['base64', 'encode'], toolType: 'client' },
  { slug: 'base64-decoder', title: 'Base64 Decoder', category: 'dev', priority: 80, description: 'Decode Base64 to text.', keywords: ['base64', 'decode'], toolType: 'client' },
  { slug: 'html-minifier', title: 'HTML Minifier', category: 'dev', priority: 75, description: 'Compress HTML code.', keywords: ['minify', 'size'], toolType: 'client' },
  { slug: 'lorem-ipsum-generator', title: 'Lorem Ipsum Generator', category: 'dev', priority: 70, description: 'Generate dummy text.', keywords: ['placeholder', 'text'], toolType: 'client' },

  // --- SEO TOOLS ---
  { slug: 'meta-tag-generator', title: 'Meta Tag Generator', category: 'seo', priority: 85, description: 'Create SEO meta tags.', keywords: ['seo', 'tags'], toolType: 'client' },
  { slug: 'robots-generator', title: 'Robots.txt Generator', category: 'seo', priority: 80, description: 'Generate robots.txt file.', keywords: ['crawler', 'robots'], toolType: 'client' },
  { slug: 'sitemap-generator', title: 'Sitemap Generator', category: 'seo', priority: 82, description: 'Create XML sitemaps.', keywords: ['xml', 'indexing'], toolType: 'client' },

  // --- CALCULATORS ---
  { slug: 'emi-calculator', title: 'EMI Calculator', category: 'calculators', priority: 100, description: 'Calculate loan installments.', keywords: ['loan', 'finance'], toolType: 'client' },
  { slug: 'sip-calculator', title: 'SIP Calculator', category: 'calculators', priority: 95, description: 'Calculate investment returns.', keywords: ['investment', 'wealth'], toolType: 'client' },
  { slug: 'gst-calculator', title: 'GST Calculator', category: 'calculators', priority: 90, description: 'Calculate GST amount.', keywords: ['tax', 'india'], toolType: 'client' },
  { slug: 'bmi-calculator', title: 'BMI Calculator', category: 'calculators', priority: 85, description: 'Calculate body mass index.', keywords: ['health', 'fitness'], toolType: 'client' },
  { slug: 'age-calculator', title: 'Age Calculator', category: 'calculators', priority: 80, description: 'Calculate age from birthdate.', keywords: ['birthday', 'years'], toolType: 'client' },

  // --- UTILITY ---
  { slug: 'password-generator', title: 'Password Generator', category: 'utility', priority: 90, description: 'Generate secure passwords.', keywords: ['security', 'random'], toolType: 'client' },
  { slug: 'qr-code-generator', title: 'QR Code Generator', category: 'utility', priority: 92, description: 'Create QR codes for URLs.', keywords: ['qr', 'scan'], toolType: 'client' },
  { slug: 'word-counter', title: 'Word Counter', category: 'utility', priority: 85, description: 'Count words and characters.', keywords: ['text', 'count'], toolType: 'client' },
  { slug: 'case-converter', title: 'Case Converter', category: 'utility', priority: 80, description: 'Change text casing.', keywords: ['upper', 'lower'], toolType: 'client' },

  // --- STUDENT TOOLS ---
  { slug: 'percentage-calculator', title: 'Percentage Calculator', category: 'education', priority: 85, description: 'Calculate percentages easily.', keywords: ['math', 'school'], toolType: 'client' },
  { slug: 'gpa-calculator', title: 'GPA Calculator', category: 'education', priority: 80, description: 'Calculate grade point average.', keywords: ['grades', 'university'], toolType: 'client' },
  { slug: 'scientific-calculator', title: 'Scientific Calculator', category: 'education', priority: 75, description: 'Advanced math calculator.', keywords: ['math', 'advanced'], toolType: 'client' }
];