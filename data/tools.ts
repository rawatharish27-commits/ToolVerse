
import { Tool } from '../types';

export const TOOLS: Tool[] = [
  // --- IMAGE CLUSTER ---
  { slug: 'image-kb-reducer', title: 'Image Size Reducer (Exact KB)', category: 'image', priority: 100, description: 'Hit target KB limits (20KB/50KB) for government forms.', keywords: ['ssc', 'upsc', 'kb reducer'], toolType: 'client' },
  { slug: 'passport-size-photo-maker', title: 'Passport Photo Maker', category: 'image', priority: 99, description: 'Indian and US standard passport photo generator.', keywords: ['passport', 'visa'], toolType: 'client' },
  { slug: 'signature-upload-fixer', title: 'Signature Fix Tool', category: 'image', priority: 98, description: 'Enhance ink and remove shadows for form signatures.', keywords: ['sign', 'upload fix'], toolType: 'client' },
  { slug: 'background-remover-non-ai', title: 'BG Remover (Smart Mask)', category: 'image', priority: 97, description: 'Fast, non-AI solid background removal.', keywords: ['remove bg'], toolType: 'client' },
  { slug: 'image-metadata-remover', title: 'Image Privacy Scrubber', category: 'image', priority: 96, description: 'Strip EXIF and GPS data from your photos.', keywords: ['privacy', 'exif'], toolType: 'client' },
  { slug: 'image-authenticity-analyzer', title: 'Authenticity Analyzer', category: 'image', priority: 95, description: 'Detect if image was edited in Canva or Photoshop.', keywords: ['fake detect'], toolType: 'client' },
  { slug: 'image-to-webp', title: 'Image to WebP', category: 'image', priority: 90, description: 'Convert to next-gen WebP for faster loading.', keywords: ['webp'], toolType: 'client' },
  { slug: 'image-compressor', title: 'Smart Compressor', category: 'image', priority: 89, description: 'Visual fidelity controlled compression.', keywords: ['compress'], toolType: 'client' },
  
  // --- PDF CLUSTER ---
  { slug: 'pdf-ocr-tool', title: 'Pro PDF OCR (Scan to Text)', category: 'pdf', priority: 100, description: 'Extract text from scanned PDF images locally.', keywords: ['ocr', 'scanned pdf'], toolType: 'client' },
  { slug: 'pdf-compare-tool', title: 'Visual PDF Compare', category: 'pdf', priority: 99, description: 'Highlight text differences between two PDFs.', keywords: ['compare', 'diff'], toolType: 'client' },
  { slug: 'pdf-compliance-checker', title: 'Govt PDF Compliance', category: 'pdf', priority: 98, description: 'Check if PDF meets SSC/UPSC portal standards.', keywords: ['ssc', 'upsc'], toolType: 'client' },
  { slug: 'pdf-page-order-solver', title: 'Page Order Solver', category: 'pdf', priority: 97, description: 'Fix duplex and manual scan reordering.', keywords: ['page flip', 'duplex'], toolType: 'client' },
  { slug: 'pdf-compressor', title: 'PDF Size Reducer', category: 'pdf', priority: 90, description: 'Optimize PDF structure to save space.', keywords: ['shrink pdf'], toolType: 'client' },
  { slug: 'pdf-merger', title: 'PDF Merger', category: 'pdf', priority: 89, description: 'Combine multiple documents accurately.', keywords: ['merge'], toolType: 'client' },

  // --- FINANCE CLUSTER ---
  { slug: 'salary-calculator', title: 'India Salary Calculator', category: 'calculators', priority: 100, description: 'CTC to In-Hand breakdown for FY 2024-25.', keywords: ['salary', 'tax'], toolType: 'client' },
  { slug: 'job-offer-comparison', title: 'Offer Comparison Engine', category: 'calculators', priority: 99, description: 'Compare LPA, Stocks, and Bonuses side-by-side.', keywords: ['offer', 'hiring'], toolType: 'client' },
  { slug: 'roi-calculator', title: 'ROI Calculator', category: 'calculators', priority: 98, description: 'Calculate investment returns and CAGR.', keywords: ['investment', 'roi'], toolType: 'client' },
  { slug: 'inflation-impact-calculator', title: 'Inflation Impact Engine', category: 'calculators', priority: 97, description: 'Visualize the future value of your money.', keywords: ['inflation'], toolType: 'client' },
  { slug: 'hidden-charges-calculator', title: 'Hidden Charges Finder', category: 'calculators', priority: 96, description: 'Find the real cost of "Zero Interest" EMIs.', keywords: ['emi', 'hidden cost'], toolType: 'client' },
  { slug: 'emi-calculator', title: 'Standard EMI Calc', category: 'calculators', priority: 90, description: 'Bank-grade loan installment math.', keywords: ['loan'], toolType: 'client' },

  // --- DEV & SEO CLUSTER ---
  { slug: 'json-formatter', title: 'JSON Formatter', category: 'dev', priority: 100, description: 'Beautify and validate JSON data.', keywords: ['json', 'pretty'], toolType: 'client' },
  { slug: 'html-minifier', title: 'HTML Minifier', category: 'dev', priority: 99, description: 'Compress markup for production.', keywords: ['minify'], toolType: 'client' },
  { slug: 'regex-tester', title: 'Regex Debugger', category: 'dev', priority: 98, description: 'Test and debug regular expressions.', keywords: ['regex'], toolType: 'client' },
  { slug: 'xml-sitemap-generator', title: 'XML Sitemap Maker', category: 'seo', priority: 100, description: 'Automate search engine URL mapping.', keywords: ['seo', 'sitemap'], toolType: 'client' },
  { slug: 'serp-snippet-preview-tool', title: 'SERP Preview', category: 'seo', priority: 99, description: 'Visualize your Google search result.', keywords: ['meta', 'preview'], toolType: 'client' },

  // --- UTILITY CLUSTER ---
  { slug: 'qr-code-generator', title: 'QR Code Architect', category: 'utility', priority: 100, description: 'Generate high-res offline QR codes.', keywords: ['qr maker'], toolType: 'client' },
  { slug: 'time-zone-converter', title: 'Global Time Zone', category: 'utility', priority: 99, description: 'Synchronize time across global cities.', keywords: ['timezone'], toolType: 'client' },
  { slug: 'event-countdown-timer', title: 'Event Countdown', category: 'utility', priority: 98, description: 'Generate timer links for your deadlines.', keywords: ['timer', 'deadline'], toolType: 'client' },
  { slug: 'word-counter', title: 'Word Counter Pro', category: 'utility', priority: 97, description: 'Detailed text frequency and analysis.', keywords: ['counter', 'words'], toolType: 'client' },
  { slug: 'password-generator', title: 'Secure Password Gen', category: 'utility', priority: 96, description: 'Entropy-rich credential generation.', keywords: ['passwords'], toolType: 'client' },
  { slug: 'working-days-calculator', title: 'Working Days Calc', category: 'utility', priority: 95, description: 'Calculate net work days excluding weekends.', keywords: ['hr', 'days'], toolType: 'client' },

  // --- DATA CLUSTER ---
  { slug: 'csv-to-excel-converter', title: 'CSV to Excel', category: 'data', priority: 100, description: 'Convert large CSVs to styled workbooks.', keywords: ['csv', 'excel'], toolType: 'client' },
  { slug: 'data-deduplication-tool', title: 'Data Deduplication', category: 'data', priority: 99, description: 'Remove duplicate records from datasets.', keywords: ['cleanup'], toolType: 'client' },
  { slug: 'data-masking-tool', title: 'PII Data Masking', category: 'data', priority: 98, description: 'Anonymize sensitive emails and numbers.', keywords: ['pii', 'security'], toolType: 'client' },

  // --- OFFICE CLUSTER ---
  { slug: 'resume-builder', title: 'AI Resume Builder', category: 'office', priority: 100, description: 'Architect ATS-friendly professional resumes.', keywords: ['jobs', 'cv'], toolType: 'ai' },
  { slug: 'invoice-generator', title: 'Invoice Generator', category: 'office', priority: 99, description: 'Professional multi-currency business billing.', keywords: ['billing', 'invoice'], toolType: 'ai' },
  { slug: 'text-to-docx-converter', title: 'Text to DOCX', category: 'office', priority: 98, description: 'Convert Markdown to Microsoft Word.', keywords: ['word', 'docx'], toolType: 'client' },
  { slug: 'resume-rejection-analyzer', title: 'Resume Auditor', category: 'office', priority: 97, description: 'Find why your resume is failing ATS.', keywords: ['audit'], toolType: 'ai' },

  // --- EDUCATION CLUSTER ---
  { slug: 'edu-study-planner', title: 'AI Study Planner', category: 'education', priority: 100, description: 'Custom examination preparation schedules.', keywords: ['study', 'exams'], toolType: 'ai' },
  { slug: 'edu-summary-generator', title: 'Notes Summarizer', category: 'education', priority: 99, description: 'Synthesize long text into key takeaways.', keywords: ['notes', 'summarize'], toolType: 'ai' },
  { slug: 'edu-math-solver', title: 'Math Logic Solver', category: 'education', priority: 98, description: 'Step-by-step logic for complex math.', keywords: ['math', 'solver'], toolType: 'ai' }
];
