import { Tool } from '../types';

export const TOOLS: Tool[] = [
  // PHASE-1: FINANCE & CALCULATOR TOOLS (Batch-6 - High CPC + High Traffic)
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