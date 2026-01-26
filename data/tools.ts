
import { Tool } from '../types';

/**
 * TOOLVERSE MASTER LOGIC REGISTRY v6.0
 * Comprehensive inventory covering all 18 infrastructure categories.
 */
export const TOOLS: Tool[] = [
  // --- AI TOOLS ---
  { slug: 'ai-article-generator', title: 'AI Article Writer Pro', category: 'ai', description: 'Generate 1500+ word SEO-optimized articles instantly.', keywords: ['writer', 'blog', 'seo'], toolType: 'ai', priority: 100 },
  { slug: 'ai-code-debugger', title: 'AI Smart Code Debugger', category: 'ai', description: 'Fix complex logic bugs in 20+ programming languages.', keywords: ['debug', 'fix', 'code'], toolType: 'ai', priority: 95 },
  { slug: 'ai-image-generator', title: 'AI Text-to-Image Studio', category: 'ai', description: 'Create cinematic visuals from text prompts.', keywords: ['image', 'art', 'gen'], toolType: 'ai', priority: 98 },
  { slug: 'ai-grammar-fixer', title: 'Professional Proofreader', category: 'ai', description: 'Advanced syntax and spelling correction with AI.', keywords: ['grammar', 'check', 'fix'], toolType: 'ai' },
  { slug: 'ai-email-generator', title: 'AI Email Assistant', category: 'ai', description: 'Craft high-response emails for sales or support.', keywords: ['email', 'writing', 'outreach'], toolType: 'ai' },

  // --- IMAGE TOOLS ---
  { slug: 'image-compressor', title: 'Pro Image Compressor', category: 'image', description: 'Reduce image size by 90% without quality loss.', keywords: ['compress', 'kb', 'resize'], toolType: 'client', priority: 99 },
  { slug: 'passport-size-photo-maker', title: 'Passport Photo Studio', category: 'image', description: 'Create official passport photos for global standards.', keywords: ['passport', 'photo', 'visa'], toolType: 'client', priority: 97 },
  { slug: 'image-to-webp', title: 'High-Speed WebP Converter', category: 'image', description: 'Convert images to next-gen formats for web performance.', keywords: ['webp', 'convert', 'format'], toolType: 'client' },
  { slug: 'background-remover-non-ai', title: 'BG Remover (Smart Mask)', category: 'image', description: 'Strip solid backgrounds instantly in your browser.', keywords: ['remove', 'bg', 'transparency'], toolType: 'client' },
  { slug: 'image-dpi-checker', title: 'Image DPI Checker & Fixer', category: 'image', description: 'Inject standard 300 DPI headers for print compliance.', keywords: ['dpi', 'print', 'resolution'], toolType: 'client' },

  // --- VIDEO TOOLS ---
  { slug: 'video-compressor', title: 'Professional Video Compressor', category: 'video', description: 'Compress MP4/MOV files locally in your browser.', keywords: ['video', 'mp4', 'compress'], toolType: 'client', priority: 90 },
  { slug: 'video-to-gif-high-res', title: 'Video to High-Res GIF', category: 'video', description: 'Transform clips into cinematic animated GIFs.', keywords: ['gif', 'maker', 'video'], toolType: 'client' },
  { slug: 'video-trimmer', title: 'Video Trimmer Studio', category: 'video', description: 'Cut and trim videos with millisecond precision.', keywords: ['trim', 'cut', 'video'], toolType: 'client' },

  // --- AUDIO TOOLS ---
  { slug: 'audio-converter', title: 'Pro Audio Converter', category: 'audio', description: 'Transcode between MP3, WAV, AAC, and OGG.', keywords: ['audio', 'mp3', 'wav'], toolType: 'client' },
  { slug: 'audio-noise-remover', title: 'AI Audio Denoiser', category: 'audio', description: 'Remove background hiss and hum from recordings.', keywords: ['audio', 'noise', 'clean'], toolType: 'ai' },
  { slug: 'audio-merger', title: 'Seamless Audio Merger', category: 'audio', description: 'Join multiple audio clips into a single track.', keywords: ['merge', 'join', 'audio'], toolType: 'client' },

  // --- PDF TOOLS ---
  { slug: 'pdf-merger', title: 'Advanced PDF Merger', category: 'pdf', description: 'Combine multiple PDF documents into one.', keywords: ['pdf', 'merge', 'join'], toolType: 'client', priority: 94 },
  { slug: 'pdf-compressor', title: 'Structural PDF Reducer', category: 'pdf', description: 'Reduce PDF size for strict portal uploads.', keywords: ['pdf', 'compress', 'size'], toolType: 'client', priority: 92 },
  { slug: 'pdf-to-jpg-converter', title: 'PDF to JPG (Batch)', category: 'pdf', description: 'Convert all PDF pages into separate images.', keywords: ['pdf', 'image', 'jpg'], toolType: 'client' },
  { slug: 'pdf-ocr-tool', title: 'Pro PDF OCR (Scan to Text)', category: 'pdf', description: 'Extract editable text from scanned PDF files.', keywords: ['ocr', 'scan', 'text'], toolType: 'client' },

  // --- DEV TOOLS ---
  { slug: 'json-formatter', title: 'JSON Logic Formatter', category: 'dev', description: 'Clean, format, and validate JSON structures.', keywords: ['json', 'dev', 'format'], toolType: 'client', priority: 85 },
  { slug: 'jwt-decoder', title: 'JWT Debugger & Inspector', category: 'dev', description: 'Inspect JWT headers and payloads instantly.', keywords: ['jwt', 'auth', 'dev'], toolType: 'client' },
  { slug: 'base64-encoder-decoder', title: 'Base64 Transcoder', category: 'dev', description: 'Securely encode or decode text and binary data.', keywords: ['base64', 'encode', 'decode'], toolType: 'client' },

  // --- SEO TOOLS ---
  { slug: 'xml-sitemap-generator', title: 'Pro XML Sitemap Generator', category: 'seo', description: 'Create search-engine ready sitemaps for your site.', keywords: ['seo', 'sitemap', 'google'], toolType: 'client' },
  { slug: 'seo-title-length-checker', title: 'SERP Title Optimizer', category: 'seo', description: 'Check title truncation for Google Search.', keywords: ['seo', 'title', 'meta'], toolType: 'client' },
  { slug: 'robots-txt-generator', title: 'Robots.txt Architect', category: 'seo', description: 'Generate crawl-ready robots.txt files.', keywords: ['robots', 'seo', 'crawl'], toolType: 'client' },

  // --- CALCULATORS ---
  { slug: 'salary-calculator', title: 'Salary Tax Calculator (India)', category: 'calculators', description: 'In-hand salary breakdown for FY 2024-25.', keywords: ['salary', 'tax', 'calculator'], toolType: 'client', priority: 96 },
  { slug: 'emi-calculator', title: 'Home/Car EMI Calculator', category: 'calculators', description: 'Calculate monthly loan installments with amortization.', keywords: ['emi', 'loan', 'bank'], toolType: 'client', priority: 88 },
  { slug: 'gst-calculator', title: 'Advanced GST Calculator', category: 'calculators', description: 'Calculate GST breakup for inclusive or exclusive pricing.', keywords: ['gst', 'tax', 'india'], toolType: 'client' },

  // --- UNIT CONVERTERS ---
  { slug: 'length-converter', title: 'Precision Length Converter', category: 'unit-converters', description: 'Convert meters, feet, and inches with high accuracy.', keywords: ['length', 'unit', 'math'], toolType: 'client' },
  { slug: 'weight-converter', title: 'Metric Weight Converter', category: 'unit-converters', description: 'Convert KG, LBS, and Ounces instantly.', keywords: ['weight', 'unit', 'kg'], toolType: 'client' },
  { slug: 'temperature-converter', title: 'Temperature Logic Converter', category: 'unit-converters', description: 'Switch between Celsius, Fahrenheit and Kelvin.', keywords: ['temp', 'unit', 'science'], toolType: 'client' },

  // --- UTILITY ---
  { slug: 'qr-code-generator', title: 'QR Code Architect', category: 'utility', description: 'Create offline high-res QR codes for any text or URL.', keywords: ['qr', 'utility', 'generate'], toolType: 'client', priority: 80 },
  { slug: 'password-generator', title: 'Secure Password Isolate', category: 'utility', description: 'Generate cryptographically strong passwords.', keywords: ['password', 'secure', 'utility'], toolType: 'client' },
  { slug: 'character-counter', title: 'Pro Character Counter', category: 'utility', description: 'Real-time text analysis for writers and devs.', keywords: ['count', 'text', 'len'], toolType: 'client' },

  // --- SECURITY ---
  { slug: 'hash-generator', title: 'SHA-256/MD5 Hash Tool', category: 'security', description: 'Generate secure digital fingerprints for any text.', keywords: ['hash', 'sha256', 'security'], toolType: 'client' },
  { slug: 'security-encryptor', title: 'AES-256 Text Encryptor', category: 'security', description: 'Securely encrypt messages locally in your browser.', keywords: ['encrypt', 'aes', 'secure'], toolType: 'client' },

  // --- NETWORK ---
  { slug: 'ip-to-location', title: 'IP Geo-Location Lookup', category: 'network', description: 'Find ISP and location data for any IP address.', keywords: ['ip', 'network', 'geo'], toolType: 'client' },
  { slug: 'internet-speed-test', title: 'Real-Time Bandwidth Test', category: 'network', description: 'Test your upload and download speed accurately.', keywords: ['network', 'speed', 'test'], toolType: 'client' },

  // --- OFFICE TOOLS ---
  { slug: 'resume-builder', title: 'ATS-Friendly Resume Builder', category: 'office', description: 'Create professional resumes that pass AI filters.', keywords: ['resume', 'job', 'office'], toolType: 'ai', priority: 93 },
  { slug: 'invoice-generator', title: 'Professional Invoice Studio', category: 'office', description: 'Generate clean business invoices instantly.', keywords: ['invoice', 'business', 'money'], toolType: 'client' },

  // --- EDUCATION ---
  { slug: 'edu-study-planner', title: 'AI Exam Study Planner', category: 'education', description: 'Generate custom study schedules based on your goals.', keywords: ['study', 'exam', 'edu'], toolType: 'ai' },
  { slug: 'edu-quiz-generator', title: 'AI Quiz Architect', category: 'education', description: 'Turn any text into interactive quizzes.', keywords: ['quiz', 'edu', 'learn'], toolType: 'ai' },

  // --- FILE TOOLS ---
  { slug: 'zip-file-creator', title: 'Pro ZIP Archive Creator', category: 'file', description: 'Bundle multiple files into a single ZIP locally.', keywords: ['zip', 'file', 'archive'], toolType: 'client' },
  { slug: 'zip-file-extractor', title: 'ZIP File Extractor', category: 'file', description: 'Unpack ZIP archives instantly without uploading.', keywords: ['zip', 'file', 'unzip'], toolType: 'client' },

  // --- DATA TOOLS ---
  { slug: 'csv-to-excel-converter', title: 'CSV to Excel (.xlsx)', category: 'data', description: 'Transform large CSV datasets into Excel workbooks.', keywords: ['csv', 'excel', 'data'], toolType: 'client' },
  { slug: 'data-deduplication-tool', title: 'Data De-duplicator', category: 'data', description: 'Remove duplicate rows from your datasets.', keywords: ['data', 'clean', 'csv'], toolType: 'client' },

  // --- SOCIAL MEDIA ---
  { slug: 'reel-hook-generator', title: 'Viral Reel Hook Generator', category: 'social', description: 'Generate high-engagement hooks for social videos.', keywords: ['social', 'hook', 'video'], toolType: 'ai', priority: 85 },
  { slug: 'instagram-hashtag-analyzer', title: 'Instagram Hashtag Strategist', category: 'social', description: 'Find viral tags for your niche and goal.', keywords: ['instagram', 'tag', 'seo'], toolType: 'ai' },

  // --- BUSINESS ---
  { slug: 'swot-analysis-architect', title: 'AI SWOT Analysis Tool', category: 'business', description: 'Strategize your project using AI-guided SWOT models.', keywords: ['business', 'swot', 'strategy'], toolType: 'ai' },
  { slug: 'business-plan-generator', title: 'AI Business Model Canvas', category: 'business', description: 'Draft professional business plans from core ideas.', keywords: ['business', 'startup', 'plan'], toolType: 'ai' },
];
