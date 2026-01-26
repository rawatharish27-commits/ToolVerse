
import { Tool } from '../types';

/**
 * TOOLVERSE MASTER LOGIC REGISTRY v5.0
 * Populated to cover all 18 categories defined in the ecosystem.
 */
export const TOOLS: Tool[] = [
  // AI TOOLS
  { slug: 'ai-article-generator', title: 'AI Article Writer Pro', category: 'ai', description: 'Generate 1500+ word SEO-optimized articles instantly.', keywords: ['writer', 'blog', 'seo'], toolType: 'ai', priority: 100 },
  { slug: 'ai-code-debugger', title: 'AI Smart Code Debugger', category: 'ai', description: 'Fix complex logic bugs in 20+ programming languages.', keywords: ['debug', 'fix', 'code'], toolType: 'ai', priority: 95 },
  { slug: 'ai-image-generator', title: 'AI Text-to-Image Studio', category: 'ai', description: 'Create cinematic visuals from text prompts.', keywords: ['image', 'art', 'gen'], toolType: 'ai', priority: 98 },

  // IMAGE TOOLS
  { slug: 'image-compressor', title: 'Pro Image Compressor', category: 'image', description: 'Reduce image size by 90% without quality loss.', keywords: ['compress', 'kb', 'resize'], toolType: 'client', priority: 99 },
  { slug: 'passport-size-photo-maker', title: 'Passport Photo Studio', category: 'image', description: 'Create official passport photos for Indian & US standards.', keywords: ['passport', 'photo', 'govt'], toolType: 'client', priority: 97 },
  { slug: 'image-to-webp', title: 'High-Speed WebP Converter', category: 'image', description: 'Convert images to next-gen formats for web performance.', keywords: ['webp', 'convert', 'format'], toolType: 'client' },

  // VIDEO TOOLS
  { slug: 'video-compressor', title: 'Professional Video Compressor', category: 'video', description: 'Compress MP4/MOV files locally in your browser.', keywords: ['video', 'mp4', 'compress'], toolType: 'client', priority: 90 },
  { slug: 'video-to-gif-high-res', title: 'Video to High-Res GIF', category: 'video', description: 'Transform clips into cinematic animated GIFs.', keywords: ['gif', 'maker', 'video'], toolType: 'client' },

  // AUDIO TOOLS
  { slug: 'audio-converter', title: 'Pro Audio Converter', category: 'audio', description: 'Transcode between MP3, WAV, AAC, and OGG.', keywords: ['audio', 'mp3', 'wav'], toolType: 'client' },
  { slug: 'audio-noise-remover', title: 'AI Audio Denoiser', category: 'audio', description: 'Remove background hiss and hum from recordings.', keywords: ['audio', 'noise', 'clean'], toolType: 'ai' },

  // PDF TOOLS
  { slug: 'pdf-merger', title: 'Advanced PDF Merger', category: 'pdf', description: 'Combine multiple PDF documents into one.', keywords: ['pdf', 'merge', 'join'], toolType: 'client', priority: 94 },
  { slug: 'pdf-compressor', title: 'Structural PDF Reducer', category: 'pdf', description: 'Reduce PDF size for strict portal uploads.', keywords: ['pdf', 'compress', 'size'], toolType: 'client', priority: 92 },
  { slug: 'pdf-to-jpg-converter', title: 'PDF to JPG (Batch)', category: 'pdf', description: 'Convert all PDF pages into separate images.', keywords: ['pdf', 'image', 'jpg'], toolType: 'client' },

  // DEV TOOLS
  { slug: 'json-formatter', title: 'JSON Logic Formatter', category: 'dev', description: 'Clean, format, and validate JSON structures.', keywords: ['json', 'dev', 'format'], toolType: 'client', priority: 85 },
  { slug: 'jwt-decoder', title: 'JWT Debugger & Inspector', category: 'dev', description: 'Inspect JWT headers and payloads instantly.', keywords: ['jwt', 'auth', 'dev'], toolType: 'client' },

  // SEO TOOLS
  { slug: 'xml-sitemap-generator', title: 'Pro XML Sitemap Generator', category: 'seo', description: 'Create search-engine ready sitemaps for your site.', keywords: ['seo', 'sitemap', 'google'], toolType: 'client' },
  { slug: 'seo-title-length-checker', title: 'SERP Title Optimizer', category: 'seo', description: 'Check title truncation for Google Search.', keywords: ['seo', 'title', 'meta'], toolType: 'client' },

  // CALCULATORS
  { slug: 'salary-calculator', title: 'Salary Tax Calculator (India)', category: 'calculators', description: 'In-hand salary breakdown for FY 2024-25.', keywords: ['salary', 'tax', 'calculator'], toolType: 'client', priority: 96 },
  { slug: 'emi-calculator', title: 'Home/Car EMI Calculator', category: 'calculators', description: 'Calculate monthly loan installments with amortization.', keywords: ['emi', 'loan', 'bank'], toolType: 'client', priority: 88 },

  // UNIT CONVERTERS
  { slug: 'length-converter', title: 'Precision Length Converter', category: 'unit-converters', description: 'Convert meters, feet, and inches with high accuracy.', keywords: ['length', 'unit', 'math'], toolType: 'client' },
  { slug: 'weight-converter', title: 'Metric Weight Converter', category: 'unit-converters', description: 'Convert KG, LBS, and Ounces instantly.', keywords: ['weight', 'unit', 'kg'], toolType: 'client' },

  // UTILITY
  { slug: 'qr-code-generator', title: 'QR Code Architect', category: 'utility', description: 'Create offline high-res QR codes for any text or URL.', keywords: ['qr', 'utility', 'generate'], toolType: 'client', priority: 80 },
  { slug: 'password-generator', title: 'Secure Password Isolate', category: 'utility', description: 'Generate cryptographically strong passwords.', keywords: ['password', 'secure', 'utility'], toolType: 'client' },

  // SECURITY
  { slug: 'hash-generator', title: 'SHA-256/MD5 Hash Tool', category: 'security', description: 'Generate secure digital fingerprints for any text.', keywords: ['hash', 'sha256', 'security'], toolType: 'client' },
  { slug: 'security-encryptor', title: 'AES-256 Text Encryptor', category: 'security', description: 'Securely encrypt messages locally in your browser.', keywords: ['encrypt', 'aes', 'secure'], toolType: 'client' },

  // NETWORK
  { slug: 'ip-to-location', title: 'IP Geo-Location Lookup', category: 'network', description: 'Find ISP and location data for any IP address.', keywords: ['ip', 'network', 'geo'], toolType: 'client' },
  { slug: 'internet-speed-test', title: 'Real-Time Bandwidth Test', category: 'network', description: 'Test your upload and download speed accurately.', keywords: ['network', 'speed', 'test'], toolType: 'client' },

  // OFFICE TOOLS
  { slug: 'resume-builder', title: 'ATS-Friendly Resume Builder', category: 'office', description: 'Create professional resumes that pass AI filters.', keywords: ['resume', 'job', 'office'], toolType: 'ai', priority: 93 },
  { slug: 'text-to-docx-converter', title: 'Markdown to Word (.docx)', category: 'office', description: 'Convert text documents to standard Word format.', keywords: ['word', 'docx', 'office'], toolType: 'client' },

  // EDUCATION
  { slug: 'edu-study-planner', title: 'AI Exam Study Planner', category: 'education', description: 'Generate custom study schedules based on your goals.', keywords: ['study', 'exam', 'edu'], toolType: 'ai' },
  { slug: 'edu-quiz-generator', title: 'AI Quiz Architect', category: 'education', description: 'Turn any text into an interactive educational quiz.', keywords: ['quiz', 'edu', 'learn'], toolType: 'ai' },

  // FILE TOOLS
  { slug: 'zip-file-creator', title: 'Pro ZIP Archive Creator', category: 'file', description: 'Bundle multiple files into a single ZIP locally.', keywords: ['zip', 'file', 'archive'], toolType: 'client' },
  { slug: 'zip-file-extractor', title: 'ZIP File Extractor', category: 'file', description: 'Unpack ZIP archives instantly without uploading.', keywords: ['zip', 'file', 'unzip'], toolType: 'client' },

  // DATA TOOLS
  { slug: 'csv-to-excel-converter', title: 'CSV to Excel (.xlsx)', category: 'data', description: 'Transform large CSV datasets into Excel workbooks.', keywords: ['csv', 'excel', 'data'], toolType: 'client' },
  { slug: 'data-deduplication-tool', title: 'Data De-duplicator', category: 'data', description: 'Remove duplicate rows from your datasets.', keywords: ['data', 'clean', 'csv'], toolType: 'client' },

  // SOCIAL MEDIA
  { slug: 'reel-hook-generator', title: 'Viral Reel Hook Generator', category: 'social', description: 'Generate high-engagement hooks for social videos.', keywords: ['social', 'hook', 'video'], toolType: 'ai', priority: 85 },
  { slug: 'instagram-hashtag-analyzer', title: 'Instagram Hashtag Strategist', category: 'social', description: 'Find viral tags for your niche and goal.', keywords: ['instagram', 'tag', 'seo'], toolType: 'ai' },

  // BUSINESS
  { slug: 'invoice-generator', title: 'Professional Invoice Studio', category: 'business', description: 'Generate clean business invoices instantly.', keywords: ['invoice', 'business', 'money'], toolType: 'client', priority: 82 },
  { slug: 'swot-analysis-architect', title: 'AI SWOT Analysis Tool', category: 'business', description: 'Strategize your project using AI-guided SWOT models.', keywords: ['business', 'swot', 'strategy'], toolType: 'ai' },
  
  // LOGIC NODES FOR REJECTION ANALYZER (GOVT)
  { slug: 'why-upload-rejected-analyzer', title: 'Govt Form Rejection Analyzer', category: 'utility', description: 'Find why your file was rejected by portal rules.', keywords: ['govt', 'ssc', 'upsc'], toolType: 'client', priority: 100 },
  { slug: 'resume-rejection-analyzer', title: 'Resume Rejection Analyzer', category: 'office', description: 'Identify ATS gaps in your resume.', keywords: ['job', 'resume', 'ats'], toolType: 'client', priority: 99 },
];
