import { Tool } from '../types';

export const TOOLS: Tool[] = [
  // --- AI HUB ---
  { slug: 'ai-article-writer-pro', title: 'AI Article Writer Pro', category: 'ai', priority: 100, description: 'Generate high-quality, SEO-optimized articles using Gemini 3.0.', keywords: ['ai writer', 'blog generator', 'content creator'], toolType: 'ai' },
  { slug: 'ai-code-debugger', title: 'AI Code Debugger', category: 'ai', priority: 95, description: 'Fix programming errors instantly with AI-powered analysis.', keywords: ['debug', 'code fixer', 'programming'], toolType: 'ai' },
  { slug: 'ai-image-generator', title: 'AI Image Studio', category: 'ai', priority: 98, description: 'Generate stunning visuals from text prompts.', keywords: ['image gen', 'stable diffusion', 'ai art'], toolType: 'ai' },
  { slug: 'ai-email-assistant', title: 'AI Email Assistant', category: 'ai', priority: 90, description: 'Write professional emails in seconds.', keywords: ['email_ai', 'professional', 'writing'], toolType: 'ai' },

  // --- IMAGE LAB ---
  { slug: 'image-compressor', title: 'Smart Image Compressor', category: 'image', priority: 100, description: 'Compress PNG/JPG/WebP without quality loss.', keywords: ['compress', 'optimization', 'tinypng'], toolType: 'client' },
  { slug: 'background-remover', title: 'AI Background Remover', category: 'image', priority: 99, description: 'Remove backgrounds instantly with neural networks.', keywords: ['bg remover', 'transparent'], toolType: 'client' },
  { slug: 'image-resizer', title: 'Bulk Image Resizer', category: 'image', priority: 92, description: 'Resize hundreds of images to custom dimensions.', keywords: ['resize', 'scaling', 'dimensions'], toolType: 'client' },
  { slug: 'image-cropper', title: 'Image Cropper Pro', category: 'image', priority: 91, description: 'Crop images with precision for any aspect ratio.', keywords: ['crop', 'cut', 'aspect ratio'], toolType: 'client' },
  { slug: 'image-converter', title: 'Image Converter Pro', category: 'image', priority: 90, description: 'Convert images between JPG, PNG, and WebP formats in bulk.', keywords: ['convert', 'format', 'webp converter'], toolType: 'client' },
  { slug: 'image-to-text-ocr', title: 'OCR Image to Text', category: 'image', priority: 95, description: 'Extract editable text from scans and photos.', keywords: ['ocr', 'extract text', 'scanner'], toolType: 'client' },

  // --- VIDEO LAB ---
  { slug: 'video-compressor', title: 'Professional Video Compressor', category: 'video', priority: 100, description: 'Reduce video file size without quality loss using browser-native FFmpeg.', keywords: ['video compress', 'reduce video size', 'mp4 compressor'], toolType: 'client' },
  { slug: 'video-converter', title: 'Video Converter Pro', category: 'video', priority: 95, description: 'Convert between MP4, WebM, AVI, and other major formats.', keywords: ['video convert', 'format changer', 'webm to mp4'], toolType: 'client' },
  { slug: 'video-trimmer', title: 'Video Trimmer Studio', category: 'video', priority: 92, description: 'Cut and trim video segments with professional precision.', keywords: ['video trim', 'cut video', 'video cropper'], toolType: 'client' },
  { slug: 'video-merger', title: 'Video Merger Pro', category: 'video', priority: 91, description: 'Combine multiple video clips into a single file seamlessly.', keywords: ['video merge', 'combine video', 'video joiner'], toolType: 'client' },
  { slug: 'video-to-gif-high-res', title: 'Video to GIF Studio', category: 'video', priority: 90, description: 'Convert any video clip into a high-quality animated GIF.', keywords: ['video to gif', 'gif maker', 'animated gif'], toolType: 'client' },

  // --- AUDIO LAB ---
  { slug: 'audio-converter', title: 'Pro Audio Converter', category: 'audio', priority: 98, description: 'Fast, browser-side audio format conversion. Supports MP3, WAV, AAC, and OGG.', keywords: ['audio converter', 'mp3 to wav', 'wav to mp3', 'audio format'], toolType: 'client' },
  { slug: 'audio-compressor', title: 'Smart Audio Compressor', category: 'audio', priority: 95, description: 'Reduce audio file size without losing quality using browser-native compression.', keywords: ['audio compress', 'reduce audio size', 'mp3 compressor'], toolType: 'client' },
  { slug: 'audio-cutter', title: 'Precision Audio Cutter', category: 'audio', priority: 92, description: 'Trim and cut audio files with professional precision directly in your browser.', keywords: ['audio cut', 'trim mp3', 'audio trimmer', 'mp3 cutter'], toolType: 'client' },
  { slug: 'audio-noise-remover', title: 'AI Audio Denoiser', category: 'audio', priority: 96, description: 'Remove background noise, hiss, and hum from your recordings instantly.', keywords: ['noise reduction', 'audio cleaner', 'remove background noise', 'denoise'], toolType: 'client' },
  { slug: 'audio-merger', title: 'Pro Audio Merger', category: 'audio', priority: 94, description: 'Merge multiple audio files into a single high-quality track seamlessly.', keywords: ['audio merge', 'combine mp3', 'join audio', 'mp3 merger'], toolType: 'client' },

  // --- FILE LAB ---
  { slug: 'file-converter', title: 'Professional File Converter', category: 'file', priority: 97, description: 'Convert between JSON, CSV, and Text formats instantly. High-speed browser-side processing.', keywords: ['file converter', 'json to csv', 'csv to json', 'json to txt'], toolType: 'client' },
  { slug: 'file-compressor', title: 'Pro File Compressor', category: 'file', priority: 96, description: 'Compress files into ZIP archives or extract files from ZIPs safely in your browser.', keywords: ['zip', 'compress file', 'unzip', 'file archiver'], toolType: 'client' },
  { slug: 'file-splitter', title: 'Precision File Splitter', category: 'file', priority: 93, description: 'Split large files into smaller manageable parts by size or count. 100% private and binary-safe.', keywords: ['file split', 'chunk file', 'large file splitter', 'split pdf'], toolType: 'client' },
  { slug: 'file-merger', title: 'Seamless File Merger', category: 'file', priority: 92, description: 'Recombine split file parts back into their original format. Binary-safe browser-side processing.', keywords: ['merge files', 'join files', 'combine parts', 'file joiner'], toolType: 'client' },
  { slug: 'file-hash-generator', title: 'File Hash Generator', category: 'file', priority: 91, description: 'Calculate MD5, SHA-1, and SHA-256 hashes for any file. Verify file integrity instantly in your browser.', keywords: ['checksum', 'md5', 'sha256', 'integrity', 'verify file'], toolType: 'client' },

  // --- DATA TOOLS ---
  { slug: 'csv-viewer', title: 'CSV Viewer', category: 'data', priority: 96, description: 'View CSV files in table format directly in your browser with auto-delimiter detection.', keywords: ['csv viewer', 'csv table', 'data view', 'excel viewer'], toolType: 'client' },
  { slug: 'csv-to-json', title: 'CSV to JSON Converter', category: 'data', priority: 95, description: 'Transform CSV data into structured JSON format with custom mapping.', keywords: ['csv to json', 'data converter', 'csv export', 'json tool'], toolType: 'client' },
  { slug: 'json-to-csv', title: 'JSON to CSV Converter', category: 'data', priority: 94, description: 'Transform structured JSON arrays into flat CSV format for spreadsheets.', keywords: ['json to csv', 'json converter', 'data export', 'spreadsheet tool'], toolType: 'client' },
  { slug: 'excel-viewer', title: 'Excel Viewer', category: 'data', priority: 93, description: 'Quickly view Excel (.xlsx, .xls) spreadsheets in your browser. Supports multiple sheets.', keywords: ['excel viewer', 'xlsx viewer', 'online excel', 'spreadsheet viewer'], toolType: 'client' },
  { slug: 'data-cleaner', title: 'Data Cleaner', category: 'data', priority: 92, description: 'Normalize and clean up messy CSV or text data by removing duplicates and trimming whitespace.', keywords: ['data cleaner', 'csv clean', 'deduplicate', 'text normalization'], toolType: 'client' },
  { slug: 'duplicate-remover', title: 'Duplicate Remover', category: 'data', priority: 91, description: 'Remove duplicate rows or entries from your lists and datasets instantly.', keywords: ['duplicate remover', 'dedupe', 'remove duplicates', 'list cleaner'], toolType: 'client' },
  { slug: 'chart-generator', title: 'Chart Generator', category: 'data', priority: 90, description: 'Turn your CSV data into beautiful bar or line charts instantly.', keywords: ['chart maker', 'graph generator', 'data visualization', 'csv to chart'], toolType: 'client' },

  // --- OFFICE TOOLS ---
  { slug: 'word-counter', title: 'Word Counter', category: 'office', priority: 98, description: 'Professional text analyzer for word count, character count, and reading time estimates.', keywords: ['word counter', 'character count', 'text statistics', 'writing tool'], toolType: 'client' },
  { slug: 'text-to-speech-reader', title: 'AI Voice Reader (TTS)', category: 'office', priority: 93, description: 'Convert text into natural sounding speech with customizable voice parameters.', keywords: ['tts', 'voice reader', 'speech synthesis', 'read aloud'], toolType: 'client' },
  { slug: 'text-compare', title: 'Text Compare', category: 'office', priority: 95, description: 'Compare two texts to find differences instantly. Professional side-by-side diff checker.', keywords: ['diff checker', 'compare text', 'text difference', 'plagiarism checker'], toolType: 'client' },

  // --- PDF SUITE ---
  { slug: 'pdf-merge', title: 'PDF Merger Tool', category: 'pdf', priority: 100, description: 'Combine multiple PDF files into a single document.', keywords: ['merge', 'combine', 'pdf joiner'], toolType: 'client' },
  { slug: 'pdf-to-word-converter', title: 'PDF to Word Converter', category: 'pdf', priority: 98, description: 'Convert PDF files to editable DOCX format.', keywords: ['pdf to word', 'converter', 'doc'], toolType: 'client' },
  { slug: 'pdf-split', title: 'PDF Splitter', category: 'pdf', priority: 90, description: 'Extract pages from PDF files effortlessly.', keywords: ['split', 'extract', 'pages'], toolType: 'client' },
  { slug: 'pdf-page-reorder', title: 'PDF Page Reorder', category: 'pdf', priority: 97, description: 'Rearrange and organize pages in your PDF document.', keywords: ['reorder', 'organize', 'pages', 'move'], toolType: 'client' },
  { slug: 'pdf-to-image', title: 'PDF to Image Converter', category: 'pdf', priority: 96, description: 'Convert your PDF pages into high-quality JPG or PNG images.', keywords: ['pdf to jpg', 'pdf to png', 'extract images'], toolType: 'client' },
  { slug: 'image-to-pdf', title: 'Image to PDF Converter', category: 'pdf', priority: 95, description: 'Combine multiple images into a single high-quality PDF document.', keywords: ['jpg to pdf', 'png to pdf', 'images to pdf'], toolType: 'client' },
  { slug: 'pdf-ocr', title: 'Pro PDF OCR', category: 'pdf', priority: 99, description: 'Convert scanned PDFs into searchable and editable text files.', keywords: ['pdf ocr', 'scanned pdf to text', 'extract text from pdf'], toolType: 'client' },

  // --- SEO & DEV HUB ---
  { slug: 'xml-sitemap-generator', title: 'XML Sitemap Generator', category: 'seo', priority: 98, description: 'Generate Google-ready XML sitemaps for any website.', keywords: ['sitemap', 'seo', 'google'], toolType: 'client' },
  { slug: 'json-ld-schema-pro', title: 'JSON-LD Schema Maker', category: 'seo', priority: 95, description: 'Create rich snippet schemas for better search rankings.', keywords: ['schema', 'json-ld', 'snippets'], toolType: 'client' },
  { slug: 'meta-tag-generator', title: 'SEO Meta Tag Generator', category: 'seo', priority: 97, description: 'Generate comprehensive meta tags to boost your social and search presence.', keywords: ['meta tags', 'seo generator', 'og tags', 'twitter card'], toolType: 'client' },
  { slug: 'json-formatter', title: 'JSON Formatter & Validator', category: 'dev', priority: 96, description: 'Prettify and validate JSON code instantly.', keywords: ['json', 'format', 'pretty'], toolType: 'client' },
  { slug: 'base64-encoder-decoder', title: 'Base64 Encoder / Decoder', category: 'dev', priority: 94, description: 'Encode or decode text and files using Base64 with high-speed local processing.', keywords: ['base64', 'encode', 'decode', 'binary to base64'], toolType: 'client' },
  { slug: 'jwt-decoder', title: 'JWT Decoder', category: 'dev', priority: 95, description: 'Decode JSON Web Tokens instantly and inspect payload data securely in your browser.', keywords: ['jwt', 'decode', 'token inspector', 'auth'], toolType: 'client' },
  { slug: 'regex-tester', title: 'Regex Tester', category: 'dev', priority: 93, description: 'Test, debug, and preview regular expressions with group highlighting and replacement support.', keywords: ['regex', 'regexp', 'regular expression', 'test', 'replace'], toolType: 'client' },
  { slug: 'url-encoder-decoder', title: 'URL Encoder / Decoder', category: 'dev', priority: 92, description: 'Encode or decode URLs and parameters instantly for safe web transmission.', keywords: ['url encode', 'url decode', 'uri encoder', 'percent encoding'], toolType: 'client' },
  { slug: 'password-strength-checker', title: 'Advanced Password Auditor', category: 'security', priority: 94, description: 'Check password entropy and security levels.', keywords: ['password', 'security', 'bits'], toolType: 'client' },

  // --- CALCULATORS HUB ---
  { slug: 'emi-calculator', title: 'EMI Calculator', category: 'calculators', priority: 100, description: 'Calculate monthly loan EMIs with total interest breakdown.', keywords: ['emi', 'loan', 'bank', 'calculator'], toolType: 'client' },
  { slug: 'sip-calculator', title: 'SIP Calculator', category: 'calculators', priority: 98, description: 'Estimate your future wealth with our mutual fund SIP return calculator.', keywords: ['sip', 'mutual fund', 'investment', 'returns'], toolType: 'client' },
  { slug: 'gst-calculator', title: 'GST Calculator (India)', category: 'calculators', priority: 97, description: 'Calculate GST amounts for any product or service according to Indian tax slabs.', keywords: ['gst', 'tax', 'inclusive', 'exclusive', 'india'], toolType: 'client' },
  { slug: 'bmi-calculator', title: 'BMI Calculator', category: 'calculators', priority: 94, description: 'Track your health and fitness with a precise BMI assessment.', keywords: ['bmi', 'body mass index', 'health', 'fitness', 'weight'], toolType: 'client' },
  { slug: 'currency-converter', title: 'Currency Converter', category: 'calculators', priority: 93, description: 'Convert between major world currencies with standard exchange rates instantly.', keywords: ['currency', 'forex', 'converter', 'money'], toolType: 'client' },

  // --- UNIT CONVERTERS ---
  { slug: 'length-converter', title: 'Length Converter', category: 'unit-converters', priority: 98, description: 'Convert between meters, kilometers, miles, inches, and other length units instantly.', keywords: ['length', 'distance', 'converter', 'metric to imperial'], toolType: 'client' },
  { slug: 'weight-converter', title: 'Weight Converter', category: 'unit-converters', priority: 97, description: 'Convert between kilograms, grams, pounds, ounces, and other weight units accurately.', keywords: ['weight', 'mass', 'converter', 'kg to lb'], toolType: 'client' },
  { slug: 'temperature-converter', title: 'Temperature Converter', category: 'unit-converters', priority: 96, description: 'Convert temperatures between Celsius, Fahrenheit, and Kelvin scales instantly.', keywords: ['temperature', 'celsius', 'fahrenheit', 'kelvin'], toolType: 'client' },
  { slug: 'data-size-converter', title: 'Data Size Converter', category: 'unit-converters', priority: 92, description: 'Convert between digital units (B, KB, MB, GB, TB) with binary precision.', keywords: ['data size', 'bytes', 'megabytes', 'gigabytes', 'converter'], toolType: 'client' },

  // --- UTILITY HUB ---
  { slug: 'qr-code-generator', title: 'QR Code Pro Studio', category: 'utility', priority: 97, description: 'Generate high-res QR codes for URLs and text.', keywords: ['qr', 'generator', 'barcode'], toolType: 'client' },
  { slug: 'what-is-my-ip', title: 'IP Lookup Tool', category: 'network', priority: 100, description: 'Check your public IP and network details.', keywords: ['myip', 'lookup', 'network'], toolType: 'client' },
];