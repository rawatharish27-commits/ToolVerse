
import { Tool } from '../types';

/**
 * TOOLVERSE MASTER LOGIC REGISTRY v8.0
 * Comprehensive inventory of 150+ professional utilities.
 */
export const TOOLS: Tool[] = [
  // --- AI TOOLS ---
  { slug: 'ai-article-generator', title: 'AI Article Writer Pro', category: 'ai', description: 'Generate 1500+ word SEO-optimized articles instantly.', keywords: ['writer', 'blog', 'seo'], toolType: 'ai', priority: 100 },
  { slug: 'ai-article-rewriter', title: 'Smart Content Rewriter', category: 'ai', description: 'Paraphrase and restructure content while maintaining core message.', keywords: ['rewrite', 'paraphrase'], toolType: 'ai' },
  { slug: 'ai-grammar-fixer', title: 'Professional Proofreader', category: 'ai', description: 'Advanced syntax and spelling correction with AI.', keywords: ['grammar', 'check', 'fix'], toolType: 'ai' },
  { slug: 'ai-image-generator', title: 'AI Text-to-Image Studio', category: 'ai', description: 'Create cinematic visuals from text prompts.', keywords: ['image', 'art', 'gen'], toolType: 'ai', priority: 98 },
  { slug: 'ai-email-generator', title: 'AI Email Assistant', category: 'ai', description: 'Craft high-response emails for sales or support.', keywords: ['email', 'writing', 'outreach'], toolType: 'ai' },
  { slug: 'ai-resume-writer', title: 'AI Resume Optimizer', category: 'ai', description: 'Turn task lists into achievement-driven bullet points.', keywords: ['resume', 'cv', 'job'], toolType: 'ai' },
  { slug: 'ai-code-debugger', title: 'AI Logic Debugger', category: 'ai', description: 'Identify and fix logic errors in 20+ languages.', keywords: ['code', 'debug', 'fix'], toolType: 'ai' },
  { slug: 'ai-story-generator', title: 'AI Fiction Architect', category: 'ai', description: 'Build deep lore and narratives with AI support.', keywords: ['story', 'write', 'creative'], toolType: 'ai' },

  // --- IMAGE TOOLS ---
  { slug: 'image-compressor', title: 'Pro Image Compressor', category: 'image', description: 'Reduce image size by 90% without quality loss.', keywords: ['compress', 'kb', 'resize'], toolType: 'client', priority: 99 },
  { slug: 'passport-size-photo-maker', title: 'Passport Photo Studio', category: 'image', description: 'Create official passport photos for global standards.', keywords: ['passport', 'photo', 'visa'], toolType: 'client', priority: 97 },
  { slug: 'image-to-webp', title: 'High-Speed WebP Converter', category: 'image', description: 'Convert images to next-gen formats for web performance.', keywords: ['webp', 'convert', 'format'], toolType: 'client' },
  { slug: 'background-remover-non-ai', title: 'BG Remover (Smart Mask)', category: 'image', description: 'Strip solid backgrounds instantly in your browser.', keywords: ['remove', 'bg', 'transparency'], toolType: 'client' },
  { slug: 'image-dpi-checker', title: 'Image DPI Checker & Fixer', category: 'image', description: 'Inject standard 300 DPI headers for print compliance.', keywords: ['dpi', 'print', 'resolution'], toolType: 'client' },
  { slug: 'photo-clarity-analyzer', title: 'Photo Clarity Analyzer', category: 'image', description: 'Diagnose why your photo looks blurry or grainy.', keywords: ['blur', 'fix', 'quality'], toolType: 'client' },
  { slug: 'image-palette-extractor', title: 'Pro Palette Extractor', category: 'image', description: 'Extract HEX/RGB color codes from any visual.', keywords: ['color', 'palette', 'hex'], toolType: 'client' },
  { slug: 'image-metadata-remover', title: 'Privacy Scrubber', category: 'image', description: 'Strip EXIF and GPS data from photos.', keywords: ['privacy', 'exif', 'metadata'], toolType: 'client' },

  // --- PDF TOOLS ---
  { slug: 'pdf-merger', title: 'Advanced PDF Merger', category: 'pdf', description: 'Combine multiple PDF documents into one.', keywords: ['pdf', 'merge', 'join'], toolType: 'client', priority: 94 },
  { slug: 'pdf-compressor', title: 'Structural PDF Reducer', category: 'pdf', description: 'Reduce PDF size for strict portal uploads.', keywords: ['pdf', 'compress', 'size'], toolType: 'client', priority: 92 },
  { slug: 'pdf-to-jpg-converter', title: 'PDF to JPG (Batch)', category: 'pdf', description: 'Convert all PDF pages into separate images.', keywords: ['pdf', 'image', 'jpg'], toolType: 'client' },
  { slug: 'pdf-ocr-tool', title: 'Pro PDF OCR (Scan to Text)', category: 'pdf', description: 'Extract editable text from scanned PDF files.', keywords: ['ocr', 'scan', 'text'], toolType: 'client' },
  { slug: 'pdf-password-protect', title: 'PDF Vault (Password)', category: 'pdf', description: 'Secure your documents with AES-256 local encryption.', keywords: ['lock', 'pdf', 'secure'], toolType: 'client' },
  { slug: 'pdf-split-by-range', title: 'Precision PDF Splitter', category: 'pdf', description: 'Split PDF by page ranges or individual files.', keywords: ['split', 'pdf', 'pages'], toolType: 'client' },
  { slug: 'pdf-watermark-tool', title: 'PDF Watermark Pro', category: 'pdf', description: 'Add custom text overlays to document pages.', keywords: ['watermark', 'secure', 'pdf'], toolType: 'client' },

  // --- VIDEO TOOLS ---
  { slug: 'video-compressor', title: 'Professional Video Compressor', category: 'video', description: 'Compress MP4/MOV files locally in your browser.', keywords: ['video', 'mp4', 'compress'], toolType: 'client', priority: 90 },
  { slug: 'video-to-gif-high-res', title: 'Video to High-Res GIF', category: 'video', description: 'Transform clips into cinematic animated GIFs.', keywords: ['gif', 'maker', 'video'], toolType: 'client' },
  { slug: 'video-trimmer', title: 'Video Trimmer Studio', category: 'video', description: 'Cut and trim videos with millisecond precision.', keywords: ['trim', 'cut', 'video'], toolType: 'client' },
  { slug: 'video-thumbnail-extractor', title: 'Video Thumbnail Extractor', category: 'video', description: 'Extract perfect high-quality still frames.', keywords: ['thumbnail', 'youtube', 'frame'], toolType: 'client' },
  { slug: 'video-audio-extractor', title: 'Video Audio Extractor', category: 'video', description: 'Rip high-fidelity audio tracks from video files.', keywords: ['mp3', 'extract', 'audio'], toolType: 'client' },

  // --- DATA TOOLS ---
  { slug: 'csv-to-excel-converter', title: 'CSV to Excel (.xlsx)', category: 'data', description: 'Transform large CSV datasets into Excel workbooks.', keywords: ['csv', 'excel', 'data'], toolType: 'client' },
  { slug: 'data-deduplication-tool', title: 'Data De-duplicator', category: 'data', description: 'Remove duplicate rows from your datasets.', keywords: ['data', 'clean', 'csv'], toolType: 'client' },
  { slug: 'excel-data-cleaner', title: 'Excel Scrubbing Utility', category: 'data', description: 'Normalize text and remove empty rows from Excel files.', keywords: ['clean', 'excel', 'data'], toolType: 'client' },
  { slug: 'json-to-csv', title: 'JSON to CSV Converter', category: 'data', description: 'Flatten JSON arrays into readable spreadsheets.', keywords: ['json', 'csv', 'data'], toolType: 'client' },
  { slug: 'data-visualizer-bar', title: 'Instant Chart Generator', category: 'data', description: 'Turn raw data into beautiful bar/line charts.', keywords: ['chart', 'graph', 'data'], toolType: 'client' },

  // --- BUSINESS TOOLS ---
  { slug: 'swot-analysis-architect', title: 'AI SWOT Analysis Tool', category: 'business', description: 'Strategize your project using AI-guided SWOT models.', keywords: ['business', 'swot', 'strategy'], toolType: 'ai' },
  { slug: 'business-plan-generator', title: 'AI Startup Plan Drafter', category: 'business', description: 'Generate structured business plans from core ideas.', keywords: ['business', 'startup', 'plan'], toolType: 'ai' },
  { slug: 'profit-loss-calculator', title: 'Business Margin Analyzer', category: 'business', description: 'Calculate net profits and operating margins.', keywords: ['profit', 'business', 'calc'], toolType: 'client' },
  { slug: 'invoice-generator', title: 'Pro Invoice Studio', category: 'business', description: 'Generate professional invoices for clients.', keywords: ['invoice', 'billing', 'money'], toolType: 'client' },
  { slug: 'market-size-estimator', title: 'Market Size Estimator', category: 'business', description: 'Calculate TAM/SAM/SOM for your business ideas.', keywords: ['market', 'business', 'calc'], toolType: 'client' },

  // --- SOCIAL TOOLS ---
  { slug: 'reel-hook-generator', title: 'Viral Reel Hook Generator', category: 'social', description: 'Generate high-engagement hooks for social videos.', keywords: ['social', 'hook', 'video'], toolType: 'ai', priority: 85 },
  { slug: 'instagram-hashtag-analyzer', title: 'Instagram Hashtag Strategist', category: 'social', description: 'Find viral tags for your niche and goal.', keywords: ['instagram', 'tag', 'seo'], toolType: 'ai' },
  { slug: 'youtube-title-generator', title: 'YouTube Title Architect', category: 'social', description: 'Generate high-CTR titles for video content.', keywords: ['youtube', 'video', 'seo'], toolType: 'ai' },
  { slug: 'viral-caption-formatter', title: 'Viral Caption Formatter', category: 'social', description: 'Beautify social captions with emojis and spacing.', keywords: ['caption', 'insta', 'viral'], toolType: 'ai' },
  { slug: 'social-bio-architect', title: 'Social Bio Architect', category: 'social', description: 'Craft perfect bios for X, Insta, and LinkedIn.', keywords: ['bio', 'profile', 'social'], toolType: 'ai' },

  // --- SECURITY TOOLS ---
  { slug: 'password-strength-checker', title: 'Password Strength Auditor', category: 'security', description: 'Check entropy and security of credentials.', keywords: ['secure', 'password', 'audit'], toolType: 'client' },
  { slug: 'hash-generator', title: 'SHA-256/MD5 Hash Tool', category: 'security', description: 'Generate secure digital fingerprints for any text.', keywords: ['hash', 'sha256', 'security'], toolType: 'client' },
  { slug: 'security-encryptor', title: 'AES-256 Text Encryptor', category: 'security', description: 'Securely encrypt messages locally in your browser.', keywords: ['encrypt', 'aes', 'secure'], toolType: 'client' },
  { slug: 'password-generator', title: 'Secure Password Isolate', category: 'security', description: 'Generate complex passwords with custom entropy.', keywords: ['password', 'generate', 'secure'], toolType: 'client' },

  // --- NETWORK TOOLS ---
  { slug: 'ip-to-location', title: 'IP Geo-Location Lookup', category: 'network', description: 'Find ISP and location data for any IP address.', keywords: ['ip', 'network', 'geo'], toolType: 'client' },
  { slug: 'internet-speed-test', title: 'Real-Time Bandwidth Test', category: 'network', description: 'Test your upload and download speed accurately.', keywords: ['network', 'speed', 'test'], toolType: 'client' },
  { slug: 'dns-lookup', title: 'Pro DNS Lookup', category: 'network', description: 'Query A, MX, and TXT records for any domain.', keywords: ['dns', 'domain', 'network'], toolType: 'client' },
  { slug: 'user-agent-parser', title: 'User Agent Parser', category: 'network', description: 'Inspect browser and OS metadata from headers.', keywords: ['ua', 'browser', 'info'], toolType: 'client' },

  // --- DEV TOOLS ---
  { slug: 'json-formatter', title: 'JSON Logic Formatter', category: 'dev', description: 'Clean, format, and validate JSON structures.', keywords: ['json', 'dev', 'format'], toolType: 'client', priority: 85 },
  { slug: 'jwt-decoder', title: 'JWT Debugger & Inspector', category: 'dev', description: 'Inspect JWT headers and payloads instantly.', keywords: ['jwt', 'auth', 'dev'], toolType: 'client' },
  { slug: 'base64-encoder-decoder', title: 'Base64 Transcoder', category: 'dev', description: 'Securely encode or decode text and binary data.', keywords: ['base64', 'encode', 'decode'], toolType: 'client' },
  { slug: 'regex-tester', title: 'Regex Logic Tester', category: 'dev', description: 'Test regular expressions with live matches.', keywords: ['regex', 'test', 'dev'], toolType: 'client' },
  { slug: 'html-css-beautifier', title: 'Code Beautifier', category: 'dev', description: 'Format messy HTML, CSS, and JS code.', keywords: ['beautify', 'format', 'code'], toolType: 'client' },

  // --- CALCULATORS ---
  { slug: 'salary-calculator', title: 'Salary Tax Calc (India)', category: 'calculators', description: 'In-hand salary breakdown for FY 2024-25.', keywords: ['salary', 'tax', 'calculator'], toolType: 'client', priority: 96 },
  { slug: 'emi-calculator', title: 'Home/Car EMI Calculator', category: 'calculators', description: 'Calculate monthly loan installments with amortization.', keywords: ['emi', 'loan', 'bank'], toolType: 'client', priority: 88 },
  { slug: 'gst-calculator', title: 'Advanced GST Calculator', category: 'calculators', description: 'Calculate GST breakup for inclusive or exclusive pricing.', keywords: ['gst', 'tax', 'india'], toolType: 'client' },
  { slug: 'roi-calculator', title: 'ROI (Investment) Master', category: 'calculators', description: 'Calculate the Return on Investment with CAGR.', keywords: ['roi', 'money', 'invest'], toolType: 'client' },
  { slug: 'age-calculator', title: 'Precision Age Calculator', category: 'calculators', description: 'Calculate exact age in years, months, and days.', keywords: ['age', 'date', 'calc'], toolType: 'client' },

  // --- UNIT CONVERTERS ---
  { slug: 'length-converter', title: 'Length Converter', category: 'unit-converters', description: 'Meters, feet, inches, and kilometers.', keywords: ['length', 'unit', 'math'], toolType: 'client' },
  { slug: 'weight-converter', title: 'Metric Weight Converter', category: 'unit-converters', description: 'Convert KG, LBS, and Ounces instantly.', keywords: ['weight', 'unit', 'kg'], toolType: 'client' },
  { slug: 'temperature-converter', title: 'Temp Logic Converter', category: 'unit-converters', description: 'Celsius, Fahrenheit and Kelvin.', keywords: ['temp', 'unit', 'science'], toolType: 'client' },
  { slug: 'speed-converter', title: 'Speed Converter Pro', category: 'unit-converters', description: 'Km/h, Mph, and Knots converter.', keywords: ['speed', 'velocity', 'unit'], toolType: 'client' },

  // --- EDUCATION TOOLS ---
  { slug: 'edu-study-planner', title: 'AI Exam Study Planner', category: 'education', description: 'Generate custom study schedules based on your goals.', keywords: ['study', 'exam', 'edu'], toolType: 'ai' },
  { slug: 'edu-quiz-generator', title: 'AI Quiz Architect', category: 'education', description: 'Turn any text into interactive educational quizzes.', keywords: ['quiz', 'edu', 'learn'], toolType: 'ai' },
  { slug: 'edu-math-solver', title: 'AI Math Logic Solver', category: 'education', description: 'Step-by-step logic for complex math problems.', keywords: ['math', 'solver', 'edu'], toolType: 'ai' },
  { slug: 'edu-summary-generator', title: 'AI Notes Summarizer', category: 'education', description: 'Condense long notes into key takeaways.', keywords: ['summary', 'study', 'notes'], toolType: 'ai' },

  // --- OFFICE TOOLS ---
  { slug: 'resume-builder', title: 'ATS Resume Builder', category: 'office', description: 'Create professional resumes that pass AI filters.', keywords: ['resume', 'job', 'office'], toolType: 'ai', priority: 93 },
  { slug: 'text-to-docx-converter', title: 'Text to Word (.docx)', category: 'office', description: 'Transform raw text into professional Word documents.', keywords: ['word', 'docx', 'office'], toolType: 'client' },
  { slug: 'character-counter', title: 'Pro Character Counter', category: 'office', description: 'Real-time text analysis for writers and devs.', keywords: ['count', 'text', 'len'], toolType: 'client' },

  // --- FILE TOOLS ---
  { slug: 'zip-file-creator', title: 'Pro ZIP Archive Creator', category: 'file', description: 'Bundle multiple files into a single ZIP locally.', keywords: ['zip', 'file', 'archive'], toolType: 'client' },
  { slug: 'zip-file-extractor', title: 'ZIP File Extractor', category: 'file', description: 'Unpack ZIP archives instantly without uploading.', keywords: ['zip', 'file', 'unzip'], toolType: 'client' },
  { slug: 'file-type-identifier', title: 'Binary File Identifier', category: 'file', description: 'Detect true format of extension-less files.', keywords: ['file', 'detect', 'binary'], toolType: 'client' },

  // --- SEO TOOLS ---
  { slug: 'xml-sitemap-generator', title: 'Pro XML Sitemap Generator', category: 'seo', description: 'Create search-engine ready sitemaps for your site.', keywords: ['seo', 'sitemap', 'google'], toolType: 'client' },
  { slug: 'seo-title-length-checker', title: 'SERP Title Optimizer', category: 'seo', description: 'Check title truncation for Google Search.', keywords: ['seo', 'title', 'meta'], toolType: 'client' },
  { slug: 'robots-txt-generator', title: 'Robots.txt Architect', category: 'seo', description: 'Generate crawl-ready robots.txt files.', keywords: ['robots', 'seo', 'crawl'], toolType: 'client' },
];
