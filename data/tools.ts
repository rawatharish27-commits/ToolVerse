import { Tool } from '../types';

export const TOOLS: Tool[] = [
  // PHASE-2: SEO AUTOMATION & SCALE (Batch-11)
  {
    slug: 'xml-sitemap-generator',
    title: 'XML Sitemap Generator',
    category: 'seo',
    description: 'Generate a comprehensive XML sitemap for search engines to index your site better.',
    keywords: ['sitemap generator', 'xml sitemap', 'google indexing'],
    toolType: 'client'
  },
  {
    slug: 'json-ld-schema-pro',
    title: 'JSON-LD Schema Generator',
    category: 'seo',
    description: 'Create professional schema markup for WebApps, Articles, and Local Business.',
    keywords: ['schema markup', 'json-ld', 'structured data', 'google snippets'],
    toolType: 'client'
  },
  {
    slug: 'canonical-tag-generator',
    title: 'Canonical Tag Generator',
    category: 'seo',
    description: 'Prevent duplicate content issues by generating proper canonical tags.',
    keywords: ['canonical tag', 'seo meta', 'duplicate content'],
    toolType: 'client'
  },
  {
    slug: 'hreflang-tag-generator',
    title: 'Hreflang Tag Generator',
    category: 'seo',
    description: 'Optimize your site for international SEO with proper language tags.',
    keywords: ['hreflang', 'international seo', 'language tags'],
    toolType: 'client'
  },
  {
    slug: 'index-now-ping',
    title: 'IndexNow Pinger',
    category: 'seo',
    description: 'Instantly notify Bing and Yandex about your latest content updates.',
    keywords: ['indexnow', 'ping search engines', 'fast indexing'],
    toolType: 'client'
  },

  // PHASE-2: OFFICE & EBOOK TOOLS (Batch-10)
  {
    slug: 'csv-to-xlsx',
    title: 'CSV to Excel Converter',
    category: 'office',
    description: 'Convert plain CSV text files into formatted Excel (XLSX) workbooks.',
    keywords: ['csv to excel', 'convert csv', 'data tools'],
    toolType: 'client'
  },
  {
    slug: 'xlsx-to-csv',
    title: 'Excel to CSV Converter',
    category: 'office',
    description: 'Extract raw data from Excel spreadsheets and save as universal CSV.',
    keywords: ['excel to csv', 'xlsx to csv', 'data export'],
    toolType: 'client'
  },
  {
    slug: 'json-to-excel',
    title: 'JSON to Excel',
    category: 'office',
    description: 'Convert JSON data structures into organized Excel spreadsheets instantly.',
    keywords: ['json to excel', 'data conversion', 'json to xlsx'],
    toolType: 'client'
  },
  {
    slug: 'excel-to-pdf',
    title: 'Excel to PDF',
    category: 'office',
    description: 'Convert your Excel sheets into professional-grade PDF reports.',
    keywords: ['excel to pdf', 'xlsx to pdf', 'convert spreadsheet'],
    toolType: 'client'
  },
  {
    slug: 'word-to-pdf-converter',
    title: 'Word to PDF Pro',
    category: 'office',
    description: 'Convert Microsoft Word (DOCX) files to PDF format directly in your browser.',
    keywords: ['word to pdf', 'docx to pdf', 'office converter'],
    toolType: 'client'
  },
  {
    slug: 'pdf-to-docx-converter',
    title: 'PDF to Word Converter',
    category: 'office',
    description: 'Extract content from PDF files and convert them into editable DOCX files.',
    keywords: ['pdf to word', 'pdf to docx', 'convert pdf'],
    toolType: 'client'
  },
  {
    slug: 'vcard-generator',
    title: 'VCard Generator',
    category: 'office',
    description: 'Create professional electronic business cards (VCF) for your contacts.',
    keywords: ['vcard', 'vcf creator', 'business card'],
    toolType: 'client'
  },

  // PHASE-2: VIDEO & AUDIO PROFESSIONAL UPGRADE (Batch-9)
  {
    slug: 'video-converter-pro',
    title: 'Video Converter Pro',
    category: 'video',
    description: 'Convert videos between MP4, MKV, AVI, MOV, and WebM formats.',
    keywords: ['video converter', 'mp4 to webm', 'mkv to mp4', 'avi converter'],
    toolType: 'client'
  },
  {
    slug: 'audio-converter-pro',
    title: 'Audio Converter Pro',
    category: 'utility',
    description: 'Professional audio conversion between MP3, WAV, AAC, FLAC, and OGG.',
    keywords: ['audio converter', 'flac to mp3', 'wav to mp3', 'aac to wav'],
    toolType: 'client'
  },
  {
    slug: 'video-mute',
    title: 'Remove Audio from Video',
    category: 'video',
    description: 'Remove sound from any video file while maintaining video quality.',
    keywords: ['mute video', 'remove audio', 'silent video'],
    toolType: 'client'
  },
  {
    slug: 'video-merger',
    title: 'Video Merger',
    category: 'video',
    description: 'Combine multiple video clips into a single professional movie file.',
    keywords: ['merge video', 'combine clips', 'join video'],
    toolType: 'client'
  },
  {
    slug: 'video-speed-changer',
    title: 'Video Speed Changer',
    category: 'video',
    description: 'Create slow-motion or fast-forward effects for your video clips.',
    keywords: ['slow motion', 'fast forward', 'video speed', 'timelapse'],
    toolType: 'client'
  },
  {
    slug: 'audio-reverse',
    title: 'Reverse Audio',
    category: 'utility',
    description: 'Reverse any audio file for creative sound design or fun effects.',
    keywords: ['reverse audio', 'backwards sound', 'audio effect'],
    toolType: 'client'
  },
  {
    slug: 'video-to-gif-high-res',
    title: 'High-Res GIF Maker',
    category: 'image',
    description: 'Create high-quality animated GIFs with optimized color palettes.',
    keywords: ['video to gif', 'hq gif', 'animated gif creator'],
    toolType: 'client'
  },
  {
    slug: 'audio-noise-gate',
    title: 'Audio Noise Gate',
    category: 'utility',
    description: 'Reduce background hiss and low-level noise using DSP filters.',
    keywords: ['noise gate', 'clean audio', 'audio dsp', 'hiss removal'],
    toolType: 'client'
  },
  {
    slug: 'video-metadata-viewer',
    title: 'Video Metadata Viewer',
    category: 'video',
    description: 'Inspect deep technical metadata of video and audio files.',
    keywords: ['video info', 'ffprobe', 'metadata', 'codec info'],
    toolType: 'client'
  },
  {
    slug: 'audio-merger-pro',
    title: 'Audio Merger Pro',
    category: 'utility',
    description: 'Join multiple audio tracks into a single seamless audio file.',
    keywords: ['merge audio', 'join mp3', 'combine songs'],
    toolType: 'client'
  },

  // PHASE-2: PDF & DOCUMENT PROFESSIONAL UPGRADE (Batch-8)
  {
    slug: 'pdf-to-jpg',
    title: 'PDF to Image',
    category: 'pdf',
    description: 'Convert PDF pages into high-quality JPG or PNG images instantly.',
    keywords: ['pdf to jpg', 'pdf to png', 'extract images from pdf'],
    toolType: 'client'
  },
  {
    slug: 'pdf-compressor',
    title: 'Compress PDF',
    category: 'pdf',
    description: 'Reduce PDF file size by optimizing internal resources and images.',
    keywords: ['compress pdf', 'reduce pdf size', 'shrink pdf'],
    toolType: 'client'
  },
  {
    slug: 'pdf-to-text',
    title: 'PDF to Text (OCR)',
    category: 'pdf',
    description: 'Extract searchable text from scanned or regular PDF documents.',
    keywords: ['pdf to text', 'ocr pdf', 'extract text'],
    toolType: 'client'
  },
  {
    slug: 'pdf-rotate',
    title: 'Rotate PDF',
    category: 'pdf',
    description: 'Rotate PDF pages permanently and save the new document.',
    keywords: ['rotate pdf', 'fix orientation', 'flip pdf'],
    toolType: 'client'
  },
  {
    slug: 'word-to-pdf',
    title: 'Word to PDF',
    category: 'pdf',
    description: 'Convert DOCX files to professional PDF documents in your browser.',
    keywords: ['word to pdf', 'docx to pdf', 'convert docx'],
    toolType: 'client'
  },
  {
    slug: 'pdf-unlock',
    title: 'Unlock PDF',
    category: 'pdf',
    description: 'Remove passwords and restrictions from your PDF files.',
    keywords: ['unlock pdf', 'remove password', 'pdf security'],
    toolType: 'client'
  },
  {
    slug: 'pdf-protect',
    title: 'Protect PDF',
    category: 'pdf',
    description: 'Secure your PDF files with advanced AES encryption and passwords.',
    keywords: ['protect pdf', 'encrypt pdf', 'secure pdf'],
    toolType: 'client'
  },

  // PHASE-2: IMAGE TOOLS PROFESSIONAL UPGRADE (Batch-7)
  {
    slug: 'heic-to-jpg',
    title: 'HEIC to JPG Converter',
    category: 'image',
    description: 'Convert iPhone HEIC photos to standard JPG/PNG format instantly.',
    keywords: ['heic', 'iphone photo', 'convert heic', 'heif'],
    toolType: 'client'
  },
  {
    slug: 'background-remover',
    title: 'Magic Background Remover',
    category: 'image',
    description: 'Remove solid backgrounds or specific colors from images without AI.',
    keywords: ['remove bg', 'transparent background', 'png maker'],
    toolType: 'client'
  },
  {
    slug: 'photo-enhancer',
    title: 'Pro Photo Enhancer',
    category: 'image',
    description: 'Sharpen, brighten, and fix colors in your photos with professional filters.',
    keywords: ['enhance photo', 'fix blurry', 'brighten image', 'sharpen'],
    toolType: 'client'
  },
  {
    slug: 'passport-photo-maker',
    title: 'Passport Photo Maker',
    category: 'image',
    description: 'Crop and resize images to standard passport and visa dimensions.',
    keywords: ['passport photo', 'visa photo', 'id photo generator'],
    toolType: 'client'
  },
  {
    slug: 'image-color-extractor',
    title: 'Image Color Extractor',
    category: 'image',
    description: 'Extract dominant color palette and HEX codes from any image.',
    keywords: ['color palette', 'hex codes', 'design tool', 'color picker'],
    toolType: 'client'
  },
  {
    slug: 'image-resizer-pro',
    title: 'Image Resizer Pro',
    category: 'image',
    description: 'Resize images by pixels or percentage with aspect ratio lock.',
    keywords: ['resize', 'pixel resize', 'batch resize'],
    toolType: 'client'
  },
  {
    slug: 'watermark-adder',
    title: 'Watermark Adder',
    category: 'image',
    description: 'Protect your photos by adding text or image watermarks easily.',
    keywords: ['watermark', 'branding', 'copyright photo'],
    toolType: 'client'
  },
  {
    slug: 'image-to-text-ocr',
    title: 'Image to Text (OCR)',
    category: 'image',
    description: 'Extract text from scanned images and photos using high-speed OCR.',
    keywords: ['ocr', 'image to text', 'extract text'],
    toolType: 'client'
  },
  {
    slug: 'batch-image-converter',
    title: 'Batch Image Converter',
    category: 'image',
    description: 'Convert hundreds of images between WebP, PNG, JPG, and AVIF.',
    keywords: ['batch convert', 'webp to png', 'png to jpg'],
    toolType: 'client'
  },
  {
    slug: 'meme-generator-pro',
    title: 'Meme Generator Pro',
    category: 'image',
    description: 'Create viral memes with modern layouts, emojis, and custom fonts.',
    keywords: ['meme', 'generator', 'viral content'],
    toolType: 'client'
  },

  // PHASE-1: FINANCE & CALCULATOR TOOLS (Batch-6)
  {
    slug: 'emi-calculator',
    title: 'EMI Calculator',
    category: 'calculators',
    description: 'Calculate your monthly loan installments (EMI) for any bank loan.',
    keywords: ['emi', 'loan calculator', 'finance', 'mortgage'],
    toolType: 'client'
  },
  {
    slug: 'sip-calculator',
    title: 'SIP Calculator',
    category: 'calculators',
    description: 'Estimate the future value of your Systematic Investment Plan (SIP) investments.',
    keywords: ['sip', 'mutual funds', 'investment calculator', 'wealth'],
    toolType: 'client'
  },
  {
    slug: 'home-loan-calculator',
    title: 'Home Loan Calculator',
    category: 'calculators',
    description: 'Specialized calculator for calculating home loan EMIs and interest.',
    keywords: ['home loan', 'housing loan', 'emi', 'mortgage'],
    toolType: 'client'
  },
  {
    slug: 'personal-loan-calculator',
    title: 'Personal Loan Calculator',
    category: 'calculators',
    description: 'Quickly find out your personal loan monthly payments and total interest.',
    keywords: ['personal loan', 'quick loan', 'emi calculator'],
    toolType: 'client'
  },
  {
    slug: 'gst-calculator',
    title: 'GST Calculator',
    category: 'calculators',
    description: 'Add or remove GST from your product price instantly.',
    keywords: ['gst', 'tax calculator', 'vat', 'business tax'],
    toolType: 'client'
  },
  {
    slug: 'income-tax-calculator',
    title: 'Income Tax Estimator',
    category: 'calculators',
    description: 'Calculate your estimated income tax based on the latest tax slabs.',
    keywords: ['income tax', 'tax slab', 'finance', 'it calculator'],
    toolType: 'client'
  },
  {
    slug: 'roi-calculator',
    title: 'ROI Calculator',
    category: 'calculators',
    description: 'Calculate the Return on Investment (ROI) for your business or personal projects.',
    keywords: ['roi', 'investment return', 'profitability'],
    toolType: 'client'
  },
  {
    slug: 'fd-calculator',
    title: 'FD Calculator',
    category: 'calculators',
    description: 'Calculate the maturity amount and interest earned on your Fixed Deposits.',
    keywords: ['fixed deposit', 'fd maturity', 'interest calculator'],
    toolType: 'client'
  },
  {
    slug: 'cagr-calculator',
    title: 'CAGR Calculator',
    category: 'calculators',
    description: 'Determine the Compound Annual Growth Rate of your investments over time.',
    keywords: ['cagr', 'growth rate', 'investment growth'],
    toolType: 'client'
  },
  {
    slug: 'currency-converter',
    title: 'Currency Converter',
    category: 'calculators',
    description: 'Convert between different currencies with custom or live rates.',
    keywords: ['currency', 'forex', 'money converter', 'exchange rate'],
    toolType: 'client'
  },

  // PHASE-1: SEO & MARKETING TOOLS (Batch-5)
  {
    slug: 'keyword-density',
    title: 'Keyword Density Checker',
    category: 'seo',
    description: 'Analyze the frequency of keywords in your text for better SEO optimization.',
    keywords: ['keyword density', 'seo analysis', 'word frequency'],
    toolType: 'client'
  },
  {
    slug: 'meta-generator',
    title: 'Meta Tag Generator',
    category: 'seo',
    description: 'Generate high-quality meta tags for Title, Description and Keywords.',
    keywords: ['meta tags', 'seo generator', 'header tags'],
    toolType: 'client'
  },
  {
    slug: 'robots-generator',
    title: 'Robots.txt Generator',
    category: 'seo',
    description: 'Quickly create a standard robots.txt file to guide search engine crawlers.',
    keywords: ['robots.txt', 'crawler', 'seo indexing'],
    toolType: 'client'
  },
  {
    slug: 'sitemap-generator',
    title: 'Sitemap XML Generator',
    category: 'seo',
    description: 'Generate a basic XML sitemap snippet for your website pages.',
    keywords: ['sitemap', 'xml sitemap', 'seo tools'],
    toolType: 'client'
  },
  {
    slug: 'utm-builder',
    title: 'UTM Link Builder',
    category: 'seo',
    description: 'Track your marketing campaign performance with custom UTM parameters.',
    keywords: ['utm builder', 'tracking link', 'marketing campaign'],
    toolType: 'client'
  },
  {
    slug: 'serp-preview',
    title: 'Google SERP Preview',
    category: 'seo',
    description: 'Visualize how your webpage appears in Google search results.',
    keywords: ['serp preview', 'google search simulation', 'seo snippet'],
    toolType: 'client'
  },
  {
    slug: 'speed-test',
    title: 'Website Speed Test',
    category: 'seo',
    description: 'Check your website performance and speed score instantly.',
    keywords: ['page speed', 'performance', 'web vitals'],
    toolType: 'client'
  },
  {
    slug: 'broken-link',
    title: 'Broken Link Checker',
    category: 'seo',
    description: 'Identify and fix dead links on your website to improve user experience.',
    keywords: ['broken links', 'dead links', 'seo audit'],
    toolType: 'client'
  },
  {
    slug: 'schema-generator',
    title: 'Schema Markup Generator',
    category: 'seo',
    description: 'Create JSON-LD schema markup to help search engines understand your content.',
    keywords: ['schema markup', 'json-ld', 'structured data'],
    toolType: 'client'
  },
  {
    slug: 'og-generator',
    title: 'Open Graph Generator',
    category: 'seo',
    description: 'Generate Open Graph tags for better social media sharing previews.',
    keywords: ['open graph', 'social meta', 'og tags'],
    toolType: 'client'
  },

  // PHASE-1: VIDEO & AUDIO TOOLS (Batch-3)
  {
    slug: 'video-compressor',
    title: 'Video Compressor',
    category: 'video',
    description: 'Reduce video file size without losing significant quality.',
    keywords: ['video compress', 'shrink video', 'mp4 compressor'],
    toolType: 'client'
  },
  {
    slug: 'video-to-mp3',
    title: 'Video to MP3',
    category: 'video',
    description: 'Extract high-quality audio from any video file instantly.',
    keywords: ['video to mp3', 'extract audio', 'mp4 to mp3'],
    toolType: 'client'
  },
  {
    slug: 'audio-converter',
    title: 'Audio Converter',
    category: 'utility',
    description: 'Convert between MP3, WAV, AAC, and other audio formats.',
    keywords: ['audio converter', 'mp3 to wav', 'aac converter'],
    toolType: 'client'
  },
  {
    slug: 'video-cutter',
    title: 'Video Cutter',
    category: 'video',
    description: 'Trim and cut your videos to the perfect length.',
    keywords: ['trim video', 'cut video', 'video editor'],
    toolType: 'client'
  },
  {
    slug: 'audio-trimmer',
    title: 'Audio Trimmer',
    category: 'utility',
    description: 'Cut MP3 and other audio files for ringtones or clips.',
    keywords: ['trim audio', 'mp3 cutter', 'audio clip'],
    toolType: 'client'
  },
  {
    slug: 'gif-maker',
    title: 'GIF Maker',
    category: 'image',
    description: 'Create animated GIFs from videos or image sequences.',
    keywords: ['make gif', 'video to gif', 'animated gif'],
    toolType: 'client'
  },
  {
    slug: 'screen-recorder',
    title: 'Screen Recorder',
    category: 'video',
    description: 'Record your screen, webcam, or specific window for free.',
    keywords: ['record screen', 'screen capture', 'game recorder'],
    toolType: 'client'
  },
  {
    slug: 'voice-changer',
    title: 'AI Voice Changer',
    category: 'ai',
    description: 'Transform your voice using AI into different styles.',
    keywords: ['voice changer', 'ai voice', 'modify speech'],
    toolType: 'ai'
  },
  {
    slug: 'noise-remover',
    title: 'AI Noise Remover',
    category: 'ai',
    description: 'Remove background noise from audio using AI filters.',
    keywords: ['noise reduction', 'clean audio', 'clear speech'],
    toolType: 'ai'
  },
  {
    slug: 'video-resizer',
    title: 'Video Resizer',
    category: 'video',
    description: 'Change video aspect ratio for Instagram, YouTube, and TikTok.',
    keywords: ['resize video', 'aspect ratio', 'video scale'],
    toolType: 'client'
  },

  // PHASE-1: PDF TOOLS (Batch-2)
  {
    slug: 'pdf-merge',
    title: 'Merge PDF',
    category: 'pdf',
    description: 'Combine multiple PDF files into a single document in seconds.',
    keywords: ['merge pdf', 'combine', 'join pdf'],
    toolType: 'client'
  },
  {
    slug: 'pdf-split',
    title: 'Split PDF',
    category: 'pdf',
    description: 'Separate one page or a whole set for easy conversion into independent PDF files.',
    keywords: ['split pdf', 'extract pages', 'separate pdf'],
    toolType: 'client'
  },

  // PHASE-1: IMAGE TOOLS (Batch-1)
  {
    slug: 'image-compressor',
    title: 'Image Compressor',
    category: 'image',
    description: 'Compress JPG, PNG and WebP images while maintaining quality.',
    keywords: ['compress', 'image optimizer', 'shrink photo'],
    toolType: 'client'
  },
  {
    slug: 'meme-generator',
    title: 'Meme Generator',
    category: 'image',
    description: 'Create funny memes with custom text and popular templates.',
    keywords: ['meme', 'generator', 'funny', 'social media'],
    toolType: 'client'
  },

  // PREVIOUS CORE TOOLS
  {
    slug: 'ai-article-writer',
    title: 'AI Article & Blog Writer',
    category: 'ai',
    description: 'Generate high-quality, SEO-optimized blog posts instantly with AI.',
    keywords: ['ai writer', 'blog generator', 'article writer'],
    toolType: 'ai'
  },
  {
    slug: 'whiteboard',
    title: 'Online Whiteboard',
    category: 'utility',
    description: 'A simple digital canvas to sketch ideas and draw diagrams.',
    keywords: ['draw', 'canvas', 'whiteboard', 'sketch'],
    toolType: 'client'
  }
];