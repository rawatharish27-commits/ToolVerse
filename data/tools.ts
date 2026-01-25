
import { Tool } from '../types';

export const TOOLS: Tool[] = [
  // --- IMAGE CLUSTER ---
  { slug: 'image-kb-reducer', title: 'Image Size Reducer (Exact KB)', category: 'image', priority: 200, description: 'Hit target KB limits (20KB/50KB) for government forms.', keywords: ['ssc', 'upsc', 'kb reducer'], toolType: 'client' },
  { slug: 'passport-size-photo-maker', title: 'Passport Photo Maker', category: 'image', priority: 199, description: 'Indian and US standard passport photo generator.', keywords: ['passport', 'visa'], toolType: 'client' },
  { slug: 'image-dpi-checker', title: 'Image DPI Checker & Fixer', category: 'image', priority: 198, description: 'Check and modify image DPI metadata for print compliance.', keywords: ['dpi', '300dpi'], toolType: 'client' },
  { slug: 'signature-upload-fixer', title: 'Signature Fix Tool', category: 'image', priority: 197, description: 'Enhance ink and remove shadows for form signatures.', keywords: ['sign', 'upload fix'], toolType: 'client' },
  { slug: 'background-remover-non-ai', title: 'BG Remover (Smart Mask)', category: 'image', priority: 196, description: 'Fast, non-AI solid background removal.', keywords: ['remove bg'], toolType: 'client' },
  { slug: 'image-to-webp', title: 'Image to WebP Converter', category: 'image', priority: 195, description: 'Convert to next-gen WebP for faster loading.', keywords: ['webp'], toolType: 'client' },
  { slug: 'image-compressor', title: 'Smart Image Compressor', category: 'image', priority: 194, description: 'Visual fidelity controlled compression.', keywords: ['compress'], toolType: 'client' },
  { slug: 'image-metadata-remover', title: 'Image Privacy Scrubber', category: 'image', priority: 193, description: 'Strip EXIF and GPS data from your photos.', keywords: ['privacy', 'exif'], toolType: 'client' },
  { slug: 'image-authenticity-analyzer', title: 'Authenticity Analyzer', category: 'image', priority: 192, description: 'Detect if image was edited in Canva or Photoshop.', keywords: ['fake detect'], toolType: 'client' },
  { slug: 'image-blur-upload-simulator', title: 'Upload Blur Simulator', category: 'image', priority: 191, description: 'Why images lose quality after upload.', keywords: ['blur'], toolType: 'client' },
  { slug: 'social-media-compression-preview', title: 'Social Compression Preview', category: 'image', priority: 190, description: 'Quality preview for IG, WhatsApp, and X.', keywords: ['social preview'], toolType: 'client' },
  { slug: 'image-stretching-issue-predictor', title: 'Stretching Predictor', category: 'image', priority: 189, description: 'Predict aspect ratio distortion errors.', keywords: ['stretch'], toolType: 'client' },
  { slug: 'pixel-to-kb-calculator', title: 'Pixel → KB Calculator', category: 'image', priority: 188, description: 'Exact relationship between resolution and size.', keywords: ['pixels', 'kb'], toolType: 'client' },
  { slug: 'camera-vs-screenshot-quality-tool', title: 'Camera vs Screenshot Tool', category: 'image', priority: 187, description: 'Why screenshots get rejected in KYC.', keywords: ['screenshot'], toolType: 'client' },
  { slug: 'photo-clarity-analyzer', title: 'Photo Clarity Analyzer', category: 'image', priority: 186, description: 'Diagnose grain and noise issues.', keywords: ['clarity'], toolType: 'client' },
  { slug: 'image-color-palette-extractor', title: 'Color Palette Extractor', category: 'image', priority: 185, description: 'Get professional hex codes from any image.', keywords: ['palette'], toolType: 'client' },
  { slug: 'image-shadow-generator', title: 'Image Shadow Architect', category: 'image', priority: 184, description: 'Apply realistic shadows to images.', keywords: ['shadow'], toolType: 'client' },
  { slug: 'image-perspective-corrector', title: 'Perspective Corrector', category: 'image', priority: 183, description: 'Fix keystone distortion in document photos.', keywords: ['warp'], toolType: 'client' },
  { slug: 'image-print-size-calculator', title: 'Print Size Calculator', category: 'image', priority: 182, description: 'Max print size based on pixels/DPI.', keywords: ['print'], toolType: 'client' },

  // --- PDF CLUSTER ---
  { slug: 'pdf-ocr-tool', title: 'Pro PDF OCR (Scan to Text)', category: 'pdf', priority: 200, description: 'Extract text from scanned PDF images locally.', keywords: ['ocr', 'scanned pdf'], toolType: 'client' },
  { slug: 'pdf-compare-tool', title: 'Visual PDF Compare', category: 'pdf', priority: 199, description: 'Highlight text differences between two PDFs.', keywords: ['compare', 'diff'], toolType: 'client' },
  { slug: 'pdf-compliance-checker', title: 'Govt PDF Compliance', category: 'pdf', priority: 198, description: 'Check if PDF meets SSC/UPSC portal standards.', keywords: ['ssc', 'upsc'], toolType: 'client' },
  { slug: 'excel-to-pdf-converter', title: 'Excel to PDF Converter', category: 'pdf', priority: 197, description: 'Convert workbooks into printable PDFs.', keywords: ['excel', 'pdf'], toolType: 'client' },
  { slug: 'pdf-page-order-solver', title: 'Page Order Solver', category: 'pdf', priority: 196, description: 'Fix duplex and manual scan reordering.', keywords: ['page flip', 'duplex'], toolType: 'client' },
  { slug: 'pdf-compressor', title: 'PDF Size Reducer', category: 'pdf', priority: 195, description: 'Optimize PDF structure to save space.', keywords: ['shrink pdf'], toolType: 'client' },
  { slug: 'pdf-to-jpg-converter', title: 'PDF to JPG Converter', category: 'pdf', priority: 194, description: 'Extract pages as high-res images.', keywords: ['extract'], toolType: 'client' },
  { slug: 'jpg-to-pdf-converter', title: 'JPG to PDF Converter', category: 'pdf', priority: 193, description: 'Merge images into a structured PDF.', keywords: ['merge'], toolType: 'client' },
  { slug: 'pdf-watermark-tool', title: 'PDF Watermark Tool', category: 'pdf', priority: 192, description: 'Secure docs with custom text overlays.', keywords: ['watermark'], toolType: 'client' },
  { slug: 'pdf-splitter', title: 'PDF Splitter', category: 'pdf', priority: 191, description: 'Extract specific page ranges easily.', keywords: ['split'], toolType: 'client' },
  { slug: 'pdf-merger', title: 'PDF Merger', category: 'pdf', priority: 190, description: 'Combine multiple documents accurately.', keywords: ['merge'], toolType: 'client' },
  { slug: 'pdf-password-protect', title: 'PDF Password Protector', category: 'pdf', priority: 189, description: 'AES-256 encryption for documents.', keywords: ['lock'], toolType: 'client' },
  { slug: 'pdf-password-remover', title: 'PDF Password Remover', category: 'pdf', priority: 188, description: 'Unlock restricted PDF files.', keywords: ['unlock'], toolType: 'client' },
  { slug: 'pdf-opening-checker', title: 'PDF Opening Checker', category: 'pdf', priority: 187, description: 'Why PDF is not opening on portal.', keywords: ['fail'], toolType: 'client' },
  { slug: 'pdf-print-cutoff-predictor', title: 'Print Cut-Off Predictor', category: 'pdf', priority: 186, description: 'Predict A4 vs Letter margin slicing.', keywords: ['print'], toolType: 'client' },

  // --- FINANCE CLUSTER ---
  { slug: 'salary-calculator', title: 'India Salary Calculator', category: 'calculators', priority: 200, description: 'CTC to In-Hand breakdown for FY 2024-25.', keywords: ['salary', 'tax'], toolType: 'client' },
  { slug: 'job-offer-comparison', title: 'Offer Comparison Engine', category: 'calculators', priority: 199, description: 'Compare LPA, Stocks, and Bonuses side-by-side.', keywords: ['offer', 'hiring'], toolType: 'client' },
  { slug: 'roi-calculator', title: 'ROI Calculator', category: 'calculators', priority: 198, description: 'Calculate investment returns and CAGR.', keywords: ['investment', 'roi'], toolType: 'client' },
  { slug: 'inflation-impact-calculator', title: 'Inflation Impact Engine', category: 'calculators', priority: 197, description: 'Visualize the future value of your money.', keywords: ['inflation'], toolType: 'client' },
  { slug: 'hidden-charges-calculator', title: 'Hidden Charges Finder', category: 'calculators', priority: 196, description: 'Find the real cost of EMIs and loans.', keywords: ['emi', 'hidden cost'], toolType: 'client' },
  { slug: 'emi-calculator', title: 'Standard EMI Calc', category: 'calculators', priority: 195, description: 'Bank-grade loan installment math.', keywords: ['loan'], toolType: 'client' },
  { slug: 'gst-calculator', title: 'Advanced GST Calc', category: 'calculators', priority: 194, description: 'Inclusive and exclusive GST breakup.', keywords: ['gst'], toolType: 'client' },
  { slug: 'offer-price-truth-calculator', title: 'Effective Price Calculator', category: 'calculators', priority: 193, description: 'Final price after GST and hidden fees.', keywords: ['price'], toolType: 'client' },
  { slug: 'refund-amount-explainer', title: 'Refund Diff Explainer', category: 'calculators', priority: 192, description: 'Why refund is less than original price.', keywords: ['refund'], toolType: 'client' },
  { slug: 'subscription-trap-analyzer', title: 'Subscription Trap Finder', category: 'calculators', priority: 191, description: 'Detect dark patterns in auto-renewals.', keywords: ['trap'], toolType: 'client' },

  // --- DEV & SEO CLUSTER ---
  { slug: 'json-formatter', title: 'JSON Formatter', category: 'dev', priority: 200, description: 'Beautify and validate JSON data.', keywords: ['json', 'pretty'], toolType: 'client' },
  { slug: 'html-minifier', title: 'HTML Minifier', category: 'dev', priority: 199, description: 'Compress markup for production.', keywords: ['minify'], toolType: 'client' },
  { slug: 'css-beautifier', title: 'CSS Beautifier', category: 'dev', priority: 198, description: 'Format messy CSS into readable blocks.', keywords: ['css'], toolType: 'client' },
  { slug: 'regex-tester', title: 'Regex Debugger', category: 'dev', priority: 197, description: 'Test and debug regular expressions.', keywords: ['regex'], toolType: 'client' },
  { slug: 'base64-encoder-decoder', title: 'Base64 Transcoder', category: 'dev', priority: 196, description: 'Encode or decode data to Base64.', keywords: ['base64'], toolType: 'client' },
  { slug: 'xml-sitemap-generator', title: 'XML Sitemap Maker', category: 'seo', priority: 200, description: 'Automate search engine URL mapping.', keywords: ['seo', 'sitemap'], toolType: 'client' },
  { slug: 'serp-snippet-preview-tool', title: 'SERP Preview', category: 'seo', priority: 199, description: 'Visualize your Google search result.', keywords: ['meta', 'preview'], toolType: 'client' },
  { slug: 'keyword-density-checker', title: 'Keyword Density Analyzer', category: 'seo', priority: 198, description: 'Avoid SEO over-optimization.', keywords: ['density'], toolType: 'client' },

  // --- UTILITY CLUSTER ---
  { slug: 'qr-code-generator', title: 'QR Code Architect', category: 'utility', priority: 200, description: 'Generate high-res offline QR codes.', keywords: ['qr maker'], toolType: 'client' },
  { slug: 'time-zone-converter', title: 'Global Time Zone', category: 'utility', priority: 199, description: 'Synchronize time across global cities.', keywords: ['timezone'], toolType: 'client' },
  { slug: 'event-countdown-timer', title: 'Event Countdown', category: 'utility', priority: 198, description: 'Generate timer links for your deadlines.', keywords: ['timer', 'deadline'], toolType: 'client' },
  { slug: 'word-counter', title: 'Word Counter Pro', category: 'utility', priority: 197, description: 'Detailed text frequency and analysis.', keywords: ['counter', 'words'], toolType: 'client' },
  { slug: 'password-generator', title: 'Secure Password Gen', category: 'utility', priority: 196, description: 'Entropy-rich credential generation.', keywords: ['passwords'], toolType: 'client' },
  { slug: 'working-days-calculator', title: 'Working Days Calc', category: 'utility', priority: 195, description: 'Calculate net work days excluding weekends.', keywords: ['hr', 'days'], toolType: 'client' },
  { slug: 'file-type-identifier', title: 'File Type Identifier', category: 'utility', priority: 194, description: 'Detect format via magic numbers.', keywords: ['binary'], toolType: 'client' },
  { slug: 'internet-slow-analyzer', title: 'Internet Slow Analyzer', category: 'utility', priority: 193, description: 'Diagnose why high-speed feels slow.', keywords: ['internet'], toolType: 'client' },
  { slug: 'email-header-analyzer', title: 'Email Header Analyzer', category: 'utility', priority: 192, description: 'Track email origins and SPF/DKIM.', keywords: ['email'], toolType: 'client' },
  { slug: 'ip-info-tool', title: 'IP Address Info', category: 'utility', priority: 191, description: 'Offline IP version and class check.', keywords: ['ip'], toolType: 'client' },

  // --- DATA & OFFICE CLUSTER ---
  { slug: 'csv-to-excel-converter', title: 'CSV to Excel', category: 'data', priority: 200, description: 'Convert large CSVs to styled workbooks.', keywords: ['csv', 'excel'], toolType: 'client' },
  { slug: 'data-deduplication-tool', title: 'Data Deduplication', category: 'data', priority: 199, description: 'Remove duplicate records from datasets.', keywords: ['cleanup'], toolType: 'client' },
  { slug: 'csv-cleaner-tool', title: 'CSV Cleaner Pro', category: 'data', priority: 198, description: 'Normalize messy CSV datasets.', keywords: ['scrub'], toolType: 'client' },
  { slug: 'resume-builder', title: 'AI Resume Builder', category: 'office', priority: 200, description: 'Architect ATS-friendly professional resumes.', keywords: ['jobs', 'cv'], toolType: 'ai' },
  { slug: 'invoice-generator', title: 'Invoice Generator', category: 'office', priority: 199, description: 'Professional multi-currency business billing.', keywords: ['billing', 'invoice'], toolType: 'ai' },
  { slug: 'text-to-docx-converter', title: 'Text to DOCX', category: 'office', priority: 198, description: 'Convert Markdown to Microsoft Word.', keywords: ['word', 'docx'], toolType: 'client' },
  { slug: 'resume-rejection-analyzer', title: 'Resume Auditor', category: 'office', priority: 197, description: 'Find why your resume is failing ATS.', keywords: ['audit'], toolType: 'ai' },
  { slug: 'cover-letter-optimizer', title: 'Cover Letter Optimizer', category: 'office', priority: 196, description: 'Perfect your pitch length and tone.', keywords: ['jobs'], toolType: 'ai' },
  
  // --- SOCIAL MEDIA ---
  { slug: 'instagram-hashtag-analyzer', title: 'Hashtag Analyzer', category: 'social', priority: 200, description: 'Analyze tag efficacy and reach.', keywords: ['insta'], toolType: 'ai' },
  { slug: 'reel-hook-generator', title: 'Reel Hook Gen', category: 'social', priority: 199, description: 'Generate viral first-3-second hooks.', keywords: ['reels'], toolType: 'ai' },
  { slug: 'youtube-title-generator', title: 'YouTube Title Pro', category: 'social', priority: 198, description: 'High-CTR titles for videos.', keywords: ['youtube'], toolType: 'ai' }
];
