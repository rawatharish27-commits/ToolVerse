import { Tool } from '../types';
import { imageCluster } from '../tools/executors/imageCluster';
import { pdfCluster } from '../tools/executors/pdfCluster';
import { calculatorCluster } from '../tools/executors/calculatorCluster';
import { aiCluster } from '../tools/executors/aiCluster';
import { utilityCluster } from '../tools/executors/utilityCluster';
import { dataCluster } from '../tools/executors/dataCluster';
import { networkCluster } from '../tools/executors/networkCluster';
import { dailyLifeCluster } from '../tools/executors/dailyLifeCluster';
import { financeCluster } from '../tools/executors/financeCluster';
import { officeCluster } from '../tools/executors/officeCluster';
import { seoCluster } from '../tools/executors/seoCluster';
import { businessCluster } from '../tools/executors/businessCluster';
import { socialCluster } from '../tools/executors/socialCluster';
import { governmentCluster } from '../tools/executors/governmentCluster';
import { careerCluster } from '../tools/executors/careerCluster';
import { educationCluster } from '../tools/executors/educationCluster';
import { securityCluster } from '../tools/executors/securityCluster';

/**
 * TOOLVERSE MASTER REGISTRY v400.0
 * Standard: Work-Based Action Naming (User-Friendly Functional Protocol)
 */

export const TOOLS: Tool[] = [
  // --- CATEGORY 1: IMAGE TOOLS ---
  { slug: 'image-size-reducer-kb', title: 'Image Size Reducer (KB selector)', category: 'image', description: 'Compress photos to the exact KB size required for forms.', keywords: ['20kb', '50kb', 'compress'], toolType: 'client', priority: 100 },
  { slug: 'image-to-webp-converter', title: 'Image to WebP Converter', category: 'image', description: 'Convert standard images to high-performance WebP format.', keywords: ['webp', 'convert'], toolType: 'client', priority: 80 },
  { slug: 'passport-size-photo-maker', title: 'Passport Size Photo Maker', category: 'image', description: 'Auto-crop and scale photos to official passport dimensions.', keywords: ['passport', 'crop'], toolType: 'client', priority: 90 },
  { slug: 'image-dpi-checker', title: 'Image DPI Checker', category: 'image', description: 'Verify and fix image resolution density for printing.', keywords: ['300dpi', 'checker'], toolType: 'client', priority: 85 },
  { slug: 'image-compressor', title: 'Image Compressor', category: 'image', description: 'Reduce image file size with optimal quality balancing.', keywords: ['shrink', 'compress'], toolType: 'client', priority: 80 },
  { slug: 'image-format-converter', title: 'Image Format Converter', category: 'image', description: 'Switch between JPG, PNG, and WebP instantly.', keywords: ['format', 'convert'], toolType: 'client', priority: 75 },
  { slug: 'image-metadata-viewer', title: 'Image Metadata Viewer', category: 'image', description: 'See hidden location and camera data in your photos.', keywords: ['exif', 'metadata'], toolType: 'client', priority: 60 },
  { slug: 'image-metadata-remover', title: 'Image Metadata Remover', category: 'image', description: 'Protect privacy by stripping EXIF data from images.', keywords: ['privacy', 'strip'], toolType: 'client', priority: 60 },
  { slug: 'image-palette-extractor', title: 'Image Palette Extractor', category: 'image', description: 'Identify and extract a professional color palette from any photo.', keywords: ['colors', 'hex'], toolType: 'client', priority: 50 },
  { slug: 'image-shadow-generator', title: 'Image Shadow Generator', category: 'image', description: 'Add realistic 3D drop shadows to your logos or products.', keywords: ['depth', 'style'], toolType: 'client', priority: 40 },
  { slug: 'image-perspective-fixer', title: 'Image Perspective Fixer', category: 'image', description: 'Straighten tilted document scans and perspective shots.', keywords: ['tilt', 'fix'], toolType: 'client', priority: 40 },
  { slug: 'background-remover-non-ai', title: 'Background Remover (Non-AI)', category: 'image', description: 'Instantly cutout subjects from plain backgrounds.', keywords: ['cut', 'transparent'], toolType: 'client', priority: 70 },
  { slug: 'image-noise-reducer', title: 'Image Noise Reducer', category: 'image', description: 'Clean up grainy photos and reduce digital noise.', keywords: ['denoise', 'sharp'], toolType: 'client', priority: 50 },
  { slug: 'image-print-size-calculator', title: 'Image Print Size Calculator', category: 'image', description: 'Find out the maximum high-quality print size for your image.', keywords: ['print', 'inches'], toolType: 'client', priority: 40 },
  { slug: 'image-authenticity-analyzer', title: 'Image Authenticity Analyzer', category: 'image', description: 'Analyze images for digital manipulation signatures.', keywords: ['fake', 'verify'], toolType: 'client', priority: 50 },
  { slug: 'image-upload-failure-debugger', title: 'Image Upload Failure Debugger', category: 'image', description: 'Diagnose why a website is refusing to upload your photo.', keywords: ['error', 'upload'], toolType: 'client', priority: 60 },
  { slug: 'form-image-auto-fixer', title: 'Form Image Auto-Fixer', category: 'image', description: 'One-click solution for common government portal upload rules.', keywords: ['auto', 'forms'], toolType: 'client', priority: 80 },
  { slug: 'image-dpi-myth-breaker', title: 'Image DPI Myth Breaker Tool', category: 'image', description: 'Check if changing DPI will actually help your specific upload case.', keywords: ['myth', 'truth'], toolType: 'client', priority: 30 },
  { slug: 'image-stretching-issue-predictor', title: 'Image Stretching Issue Predictor', category: 'image', description: 'Predict if a portal will distort your photo based on dimensions.', keywords: ['distort', 'aspect'], toolType: 'client', priority: 40 },
  { slug: 'pixel-to-kb-calculator', title: 'Exact Pixel to KB Relationship Calculator', category: 'image', description: 'Mathematically calculate file size based on resolution and format.', keywords: ['math', 'size'], toolType: 'client', priority: 30 },
  { slug: 'camera-vs-screenshot-quality', title: 'Camera vs Screenshot Quality Analyzer', category: 'image', description: 'Compare quality loss between real captures and screenshots.', keywords: ['comparison', 'audit'], toolType: 'client', priority: 30 },
  { slug: 'mobile-camera-setting-advisor', title: 'Mobile Camera Setting Advisor', category: 'image', description: 'Get the best camera settings for official form photography.', keywords: ['settings', 'mobile'], toolType: 'client', priority: 40 },
  { slug: 'background-rejection-predictor', title: 'Background Rejection Predictor', category: 'image', description: 'Check if your background meets passport or visa rules.', keywords: ['reject', 'visa'], toolType: 'client', priority: 50 },
  { slug: 'image-looks-blurry-simulator', title: 'Image Looks Blurry After Upload Simulator', category: 'image', description: 'See how a website will compress and blur your photo.', keywords: ['simulator', 'blur'], toolType: 'client', priority: 40 },
  { slug: 'social-media-compression-preview', title: 'Social Media Compression Preview Tool', category: 'image', description: 'Preview how Instagram or WhatsApp will treat your image.', keywords: ['social', 'preview'], toolType: 'client', priority: 60 },
  { slug: 'why-my-photo-is-not-clear', title: 'Why My Photo Is Not Clear Analyzer', category: 'image', description: 'Diagnose the root cause of image blur and pixelation.', keywords: ['diagnose', 'clarity'], toolType: 'client', priority: 60 },
  { slug: 'print-vs-screen-difference', title: 'Print vs Screen Image Difference Tool', category: 'image', description: 'Why your printed photo looks different from your screen.', keywords: ['print', 'visual'], toolType: 'client', priority: 40 },

  // --- CATEGORY 2: PDF TOOLS ---
  { slug: 'pdf-to-jpg-converter', title: 'PDF to JPG Converter', category: 'pdf', description: 'Extract high-quality images from any PDF document.', keywords: ['pdf to image'], toolType: 'client', priority: 80 },
  { slug: 'jpg-to-pdf-converter', title: 'JPG to PDF Converter', category: 'pdf', description: 'Combine multiple images into one clean PDF document.', keywords: ['make pdf'], toolType: 'client', priority: 80 },
  { slug: 'pdf-size-reducer-mb', title: 'PDF Size Reducer (MB target)', category: 'pdf', description: 'Shrink PDF files to meet strict MB upload limits.', keywords: ['compress', 'small'], toolType: 'client', priority: 90 },
  { slug: 'pdf-watermark-tool', title: 'PDF Watermark Tool', category: 'pdf', description: 'Protect your documents with custom text or image watermarks.', keywords: ['stamp', 'protect'], toolType: 'client', priority: 60 },
  { slug: 'pdf-merger', title: 'PDF Merger', category: 'pdf', description: 'Combine separate PDF files into a single master document.', keywords: ['join', 'merge'], toolType: 'client', priority: 90 },
  { slug: 'pdf-splitter', title: 'PDF Splitter', category: 'pdf', description: 'Break a large PDF into individual pages or sections.', keywords: ['split', 'cut'], toolType: 'client', priority: 80 },
  { slug: 'pdf-password-protect', title: 'PDF Password Protector', category: 'pdf', description: 'Secure your PDF files with military-grade encryption passwords.', keywords: ['encrypt', 'lock'], toolType: 'client', priority: 85 },
  { slug: 'pdf-password-remover', title: 'PDF Password Remover', category: 'pdf', description: 'Remove passwords and restrictions from your PDF files.', keywords: ['unlock', 'decrypt'], toolType: 'client', priority: 85 },
  { slug: 'pdf-metadata-viewer', title: 'PDF Metadata Viewer', category: 'pdf', description: 'See hidden document properties and creator information.', keywords: ['info', 'details'], toolType: 'client', priority: 50 },
  { slug: 'pdf-metadata-editor', title: 'PDF Metadata Editor', category: 'pdf', description: 'Modify PDF titles, authors, and keywords locally.', keywords: ['edit', 'change'], toolType: 'client', priority: 50 },
  { slug: 'pdf-ocr-tool', title: 'PDF OCR Tool', category: 'pdf', description: 'Make scanned PDFs searchable and selectable using OCR.', keywords: ['text', 'scan'], toolType: 'client', priority: 70 },
  { slug: 'pdf-compare-tool', title: 'PDF Compare Tool', category: 'pdf', description: 'Visually compare two PDF versions for changes.', keywords: ['diff', 'compare'], toolType: 'client', priority: 60 },
  { slug: 'pdf-compliance-checker', title: 'PDF Compliance Checker', category: 'pdf', description: 'Verify if a PDF meets governmental archival standards.', keywords: ['archival', 'check'], toolType: 'client', priority: 75 },
  { slug: 'pdf-page-extractor', title: 'PDF Page Extractor', category: 'pdf', description: 'Save specific pages from a PDF as a new document.', keywords: ['select', 'grab'], toolType: 'client', priority: 60 },
  { slug: 'pdf-compatibility-level-analyzer', title: 'PDF Compatibility Level Analyzer', category: 'pdf', description: 'Check if your PDF version is compatible with old portals.', keywords: ['version', 'check'], toolType: 'client', priority: 50 },
  { slug: 'pdf-upload-time-estimator', title: 'PDF Upload Time Estimator', category: 'pdf', description: 'Estimate upload duration based on size and connection speed.', keywords: ['speed', 'estimate'], toolType: 'client', priority: 40 },
  { slug: 'pdf-print-cutoff-predictor', title: 'PDF Print Cut-Off Predictor', category: 'pdf', description: 'Predict if margins will cut off text during printing.', keywords: ['margin', 'print'], toolType: 'client', priority: 50 },
  { slug: 'pdf-font-error-decoder', title: 'Font Not Supported Error Decoder', category: 'pdf', description: 'Fix "Font Not Supported" errors in portal PDF viewers.', keywords: ['font', 'error'], toolType: 'client', priority: 60 },
  { slug: 'pdf-bw-print-preview', title: 'PDF Black & White Print Preview Tool', category: 'pdf', description: 'Preview how your color PDF will look on B&W printers.', keywords: ['grayscale', 'print'], toolType: 'client', priority: 50 },
  { slug: 'pdf-not-opening-checker', title: 'PDF Not Opening on Portal Checker', category: 'pdf', description: 'Identify technical reasons why a PDF won\'t load on a website.', keywords: ['error', 'load'], toolType: 'client', priority: 70 },
  { slug: 'pdf-text-selectable-explainer', title: 'PDF Text Not Selectable Explainer', category: 'pdf', description: 'Find out why you cannot select or copy text in a PDF.', keywords: ['select', 'lock'], toolType: 'client', priority: 50 },
  { slug: 'pdf-page-order-solver', title: 'PDF Page Order Confusion Solver', category: 'pdf', description: 'Fix jumbled or reversed page sequences in scanned PDFs.', keywords: ['fix', 'order'], toolType: 'client', priority: 60 },
  { slug: 'scanned-pdf-readability-tester', title: 'Scanned PDF Readability Tester', category: 'pdf', description: 'Ensure your scanned document is clear enough for official verification.', keywords: ['read', 'clarity'], toolType: 'client', priority: 70 },

  // --- CATEGORY 3: CALCULATORS ---
  { slug: 'percentage-calculator', title: 'Percentage Calculator', category: 'calculators', description: 'Quickly calculate increases, decreases, and ratios.', keywords: ['pct'], toolType: 'client', priority: 80 },
  { slug: 'simple-interest-calculator', title: 'Simple Interest Calculator', category: 'calculators', description: 'Calculate basic interest on loans or savings.', keywords: ['si'], toolType: 'client', priority: 70 },
  { slug: 'compound-interest-calculator', title: 'Compound Interest Calculator', category: 'calculators', description: 'Project long-term wealth with compounding interest.', keywords: ['comp'], toolType: 'client', priority: 75 },
  { slug: 'age-calculator', title: 'Age Calculator', category: 'calculators', description: 'Calculate exact age in years, months, and days.', keywords: ['dob'], toolType: 'client', priority: 95 },
  { slug: 'age-difference-calculator', title: 'Age Difference Calculator', category: 'calculators', description: 'Find the precise age gap between two individuals.', keywords: ['diff'], toolType: 'client', priority: 60 },
  { slug: 'date-difference-calculator', title: 'Date Difference Calculator', category: 'calculators', description: 'Count days, weeks, and months between two dates.', keywords: ['days'], toolType: 'client', priority: 80 },
  { slug: 'working-days-calculator', title: 'Working Days Calculator', category: 'calculators', description: 'Count business days excluding weekends and holidays.', keywords: ['work'], toolType: 'client', priority: 70 },
  { slug: 'discount-calculator', title: 'Discount Calculator', category: 'calculators', description: 'Calculate final shopping price after discounts.', keywords: ['sale'], toolType: 'client', priority: 85 },
  { slug: 'emi-calculator', title: 'EMI Calculator', category: 'calculators', description: 'Calculate monthly loan installments for home or car.', keywords: ['emi'], toolType: 'client', priority: 90 },
  { slug: 'loan-calculator-standard', title: 'Loan Calculator', category: 'calculators', description: 'Plan your debt repayment with interest and principal breakdown.', keywords: ['loan'], toolType: 'client', priority: 85 },
  { slug: 'bmi-calculator', title: 'BMI Calculator', category: 'calculators', description: 'Check your Body Mass Index for health tracking.', keywords: ['health'], toolType: 'client', priority: 80 },
  { slug: 'gst-calculator', title: 'GST Calculator', category: 'calculators', description: 'Calculate net or gross price with GST inclusion/exclusion.', keywords: ['gst'], toolType: 'client', priority: 95 },
  { slug: 'profit-loss-calculator', title: 'Profit & Loss Calculator', category: 'calculators', description: 'Evaluate business margins and markup ratios.', keywords: ['pnl'], toolType: 'client', priority: 80 },
  { slug: 'roi-calculator', title: 'ROI Calculator', category: 'calculators', description: 'Calculate the return on your investment ventures.', keywords: ['roi'], toolType: 'client', priority: 85 },
  { slug: 'inflation-impact-calculator', title: 'Inflation Calculator', category: 'calculators', description: 'Adjust future money value based on inflation rates.', keywords: ['inflation'], toolType: 'client', priority: 70 },
  { slug: 'salary-calculator', title: 'Salary Calculator', category: 'finance', description: 'Calculate in-hand salary after PF, Tax, and Deductions.', keywords: ['inhand'], toolType: 'client', priority: 95 },
  { slug: 'time-duration-calculator', title: 'Time Duration Calculator', category: 'calculators', description: 'Calculate hours and minutes elapsed between two times.', keywords: ['hours'], toolType: 'client', priority: 70 },
  { slug: 'event-countdown-timer-generator', title: 'Event Countdown Timer Generator', category: 'calculators', description: 'Create a live countdown timer for your milestones.', keywords: ['timer'], toolType: 'client', priority: 50 },
  { slug: 'hidden-charges-discovery', title: 'Hidden Charges Discovery Tool', category: 'calculators', description: 'Expose processing fees and hidden costs in loan agreements.', keywords: ['hidden'], toolType: 'client', priority: 80 },
  { slug: 'actual-interest-analyzer', title: 'Bank Interest vs Actual Interest Analyzer', category: 'calculators', description: 'The truth about Flat vs Reducing interest rates.', keywords: ['truth'], toolType: 'client', priority: 85 },
  { slug: 'tax-slab-confusion-explainer', title: 'Tax Slab Confusion Explainer', category: 'calculators', description: 'Understand which tax regime is better for your bracket.', keywords: ['tax'], toolType: 'client', priority: 90 },
  { slug: 'why-emi-high-explainer', title: 'Why EMI So High Explainer', category: 'calculators', description: 'Analyze the variables making your loan expensive.', keywords: ['why'], toolType: 'client', priority: 80 },
  { slug: 'offer-price-truth-calculator', title: 'Offer Price Truth Calculator', category: 'calculators', description: 'Calculate the real cost after GST and delivery fees.', keywords: ['price'], toolType: 'client', priority: 80 },
  { slug: 'refund-amount-explainer', title: 'Refund Amount Difference Explainer', category: 'calculators', description: 'Why you received a partial refund instead of full amount.', keywords: ['refund'], toolType: 'client', priority: 70 },
  { slug: 'subscription-trap-analyzer', title: 'Subscription Trap Analyzer', category: 'calculators', description: 'Audit auto-renewal terms to avoid hidden recurring charges.', keywords: ['trap'], toolType: 'client', priority: 60 },

  // --- CATEGORY 4: UTILITY TOOLS ---
  { slug: 'password-strength-checker', title: 'Password Strength Checker', category: 'security', description: 'Analyze password entropy for security breaches.', keywords: ['pass'], toolType: 'client', priority: 80 },
  { slug: 'character-counter', title: 'Character Counter', category: 'utility', description: 'Real-time character and space counter.', keywords: ['chars'], toolType: 'client', priority: 70 },
  { slug: 'word-counter', title: 'Word Counter', category: 'utility', description: 'Professional word count and reading time analysis.', keywords: ['word'], toolType: 'client', priority: 70 },
  { slug: 'text-case-converter', title: 'Text Case Converter', category: 'utility', description: 'Convert text to Upper, Lower, or Title case.', keywords: ['case'], toolType: 'client', priority: 75 },
  { slug: 'file-size-converter', title: 'File Size Converter', category: 'utility', description: 'Convert between Bytes, KB, MB, GB, and TB.', keywords: ['size'], toolType: 'client', priority: 80 },
  { slug: 'uuid-generator', title: 'UUID Generator', category: 'utility', description: 'Generate unique random identifiers for developers.', keywords: ['uuid'], toolType: 'client', priority: 60 },
  { slug: 'qr-code-generator', title: 'QR Code Generator', category: 'utility', description: 'Generate high-res QR codes for any link or text.', keywords: ['qr'], toolType: 'client', priority: 85 },
  { slug: 'url-encoder-decoder', title: 'URL Encoder / Decoder', category: 'utility', description: 'Make URL strings safe for browser transport.', keywords: ['url'], toolType: 'client', priority: 70 },
  { slug: 'password-generator', title: 'Random Password Generator', category: 'security', description: 'Create unhackable passwords with local logic.', keywords: ['pass'], toolType: 'client', priority: 85 },
  { slug: 'document-upload-readiness-checker', title: 'Document Upload Readiness Checker', category: 'utility', description: 'Test if your file is valid for portal submission.', keywords: ['upload'], toolType: 'client', priority: 70 },
  { slug: 'device-compatibility-checker', title: 'Device Compatibility Checker', category: 'utility', description: 'Check if this tool ecosystem is supported by your browser.', keywords: ['comp'], toolType: 'client', priority: 40 },
  { slug: 'file-format-converter', title: 'File Format Converter', category: 'utility', description: 'Transcode logic files between standard formats.', keywords: ['convert'], toolType: 'client', priority: 80 },
  { slug: 'zip-file-creator', title: 'ZIP File Creator', category: 'utility', description: 'Bundle multiple files into a compressed ZIP archive.', keywords: ['zip'], toolType: 'client', priority: 80 },
  { slug: 'zip-file-extractor', title: 'ZIP File Extractor', category: 'utility', description: 'Unpack ZIP archives instantly in your browser.', keywords: ['unzip'], toolType: 'client', priority: 80 },
  { slug: 'file-type-identifier', title: 'File Type Identifier', category: 'utility', description: 'Detect the real format of any unknown file binary.', keywords: ['mime'], toolType: 'client', priority: 60 },
  { slug: 'text-to-docx-converter', title: 'Text to DOCX Converter', category: 'office', description: 'Convert plain text into professional Word documents.', keywords: ['word'], toolType: 'client', priority: 75 },
  { slug: 'excel-to-pdf-converter', title: 'Excel to PDF Converter', category: 'office', description: 'Convert spreadsheet tables to clean PDF reports.', keywords: ['excel'], toolType: 'client', priority: 75 },
  { slug: 'docx-metadata-viewer', title: 'DOCX Metadata Viewer', category: 'office', description: 'See the edit history and author of Word files.', keywords: ['metadata'], toolType: 'client', priority: 50 },
  { slug: 'csv-cleaner-tool', title: 'CSV Cleaner Tool', category: 'data', description: 'Format and normalize messy CSV data exports.', keywords: ['clean'], toolType: 'client', priority: 80 },
  { slug: 'data-masking-tool', title: 'Data Masking Tool', category: 'security', description: 'Hide sensitive info in datasets before sharing.', keywords: ['hide'], toolType: 'client', priority: 60 },
  { slug: 'file-corruption-probability-checker', title: 'File Corruption Probability Checker', category: 'utility', description: 'Analyze file bits for data corruption risks.', keywords: ['error'], toolType: 'client', priority: 40 },
  { slug: 'file-not-opening-cause-finder', title: 'File Not Opening Cause Finder', category: 'utility', description: 'Identify why your device won\'t open a specific file.', keywords: ['fix'], toolType: 'client', priority: 60 },
  { slug: 'print-looks-different-tool', title: 'Print Looks Different Tool', category: 'utility', description: 'Predict visual changes from digital to printed output.', keywords: ['print'], toolType: 'client', priority: 40 },
  { slug: 'website-looks-different-on-mobile-analyzer', title: 'Website Looks Different on Mobile Analyzer', category: 'utility', description: 'Diagnose mobile responsive layout issues.', keywords: ['mobile'], toolType: 'client', priority: 40 },

  // --- CATEGORY 5: DATA TOOLS ---
  { slug: 'json-formatter', title: 'JSON Formatter', category: 'data', description: 'Prettify and organize messy JSON code.', keywords: ['json'], toolType: 'client', priority: 85 },
  { slug: 'json-validator', title: 'JSON Validator', category: 'data', description: 'Strictly validate JSON syntax against standard rules.', keywords: ['valid'], toolType: 'client', priority: 85 },
  { slug: 'csv-to-excel-converter', title: 'CSV to Excel Converter', category: 'data', description: 'Transform flat CSV data into professional Excel workbooks.', keywords: ['excel'], toolType: 'client', priority: 80 },
  { slug: 'excel-data-cleaner', title: 'Excel Data Cleaner', category: 'data', description: 'Scrub spreadsheet columns for better analysis.', keywords: ['trim'], toolType: 'client', priority: 80 },
  { slug: 'data-deduplication-tool', title: 'Data Deduplication Tool', category: 'data', description: 'Remove duplicate entries from any dataset.', keywords: ['dedupe'], toolType: 'client', priority: 80 },
  { slug: 'date-mismatch-error-resolver', title: 'Date Mismatch Error Resolver', category: 'data', description: 'Fix DD/MM vs MM/DD date format conflicts.', keywords: ['date'], toolType: 'client', priority: 60 },
  { slug: 'upload-vs-download-time-explainer', title: 'Upload vs Download Time Explainer', category: 'data', description: 'Why your upload speed is slower than download.', keywords: ['speed'], toolType: 'client', priority: 40 },
  { slug: 'internet-speed-issue-analyzer', title: 'Internet Speed Issue Analyzer', category: 'data', description: 'Identify root causes of slow internet latency.', keywords: ['lag'], toolType: 'client', priority: 60 },
  { slug: 'ip-info-tool', title: 'IP Address Info Tool (Offline)', category: 'network', description: 'Analyze IP metadata without external network calls.', keywords: ['ip'], toolType: 'client', priority: 70 },
  { slug: 'otp-not-coming-analyzer', title: 'OTP Not Coming Analyzer', category: 'daily-life', description: 'Diagnose why you aren\'t receiving SMS verification codes.', keywords: ['otp'], toolType: 'client', priority: 80 },
  { slug: 'email-bounce-decoder', title: 'Email Bounce Decoder', category: 'daily-life', description: 'Translate cryptic email delivery error codes.', keywords: ['bounce'], toolType: 'client', priority: 80 },

  // --- CATEGORY 6: SEO TOOLS ---
  { slug: 'seo-title-length-checker', title: 'Check SEO Title Length', category: 'seo', description: 'Audit page titles for Google Search optimization.', keywords: ['title'], toolType: 'client', priority: 80 },
  { slug: 'meta-description-length-checker', title: 'Check Meta Description', category: 'seo', description: 'Validate meta snippets for high CTR.', keywords: ['meta'], toolType: 'client', priority: 80 },
  { slug: 'serp-snippet-preview-tool', title: 'Preview Google Search Result', category: 'seo', description: 'Visualize how your site looks in real search results.', keywords: ['preview'], toolType: 'client', priority: 85 },
  { slug: 'internal-link-generator', title: 'Generate Internal Link Suggestions', category: 'seo', description: 'Architect site hierarchy with semantic links.', keywords: ['linking'], toolType: 'ai', priority: 70 },
  { slug: 'keyword-difficulty-checker', title: 'Check Keyword Difficulty', category: 'seo', description: 'Estimate how hard it is to rank for a target term.', keywords: ['difficulty'], toolType: 'client', priority: 80 },
  { slug: 'keyword-density-checker', title: 'Analyze Keyword Density', category: 'seo', description: 'Avoid keyword stuffing and optimize frequency.', keywords: ['density'], toolType: 'client', priority: 70 },
  { slug: 'robots-txt-generator', title: 'Generate Robots.txt', category: 'seo', description: 'Create perfectly formatted instructions for crawlers.', keywords: ['robots'], toolType: 'client', priority: 75 },
  { slug: 'xml-sitemap-generator', title: 'Generate XML Sitemap', category: 'seo', description: 'Create a search-engine ready logic map of your site.', keywords: ['sitemap'], toolType: 'client', priority: 85 },
  { slug: 'faq-schema-generator', title: 'Generate FAQ Schema', category: 'seo', description: 'Get rich snippets with valid FAQ JSON-LD.', keywords: ['schema'], toolType: 'client', priority: 75 },
  { slug: 'breadcrumb-schema-generator', title: 'Generate Breadcrumb Schema', category: 'seo', description: 'Improve navigation hierarchy visibility in SERPs.', keywords: ['breadcrumb'], toolType: 'client', priority: 70 },

  // --- CATEGORY 7: SOCIAL MEDIA ---
  { slug: 'instagram-hashtag-analyzer', title: 'Analyze Instagram Hashtags', category: 'social', description: 'Find the best engagement mix of tags.', keywords: ['hashtags'], toolType: 'client', priority: 80 },
  { slug: 'reel-hook-generator', title: 'Generate Reel Hooks', category: 'social', description: 'Psychological hooks for the first 3 seconds of video.', keywords: ['hooks'], toolType: 'ai', priority: 90 },
  { slug: 'youtube-video-idea-generator', title: 'Generate YouTube Video Ideas', category: 'social', description: 'Viral content concepts based on niche trends.', keywords: ['ideas'], toolType: 'ai', priority: 85 },
  { slug: 'viral-caption-formatter', title: 'Format Viral Captions', category: 'social', description: 'Add line breaks and emojis for better engagement.', keywords: ['captions'], toolType: 'client', priority: 80 },
  { slug: 'social-media-bio-formatter', title: 'Format Social Bio', category: 'social', description: 'Catchy bios within strict character limits.', keywords: ['bio'], toolType: 'client', priority: 75 },
  { slug: 'youtube-title-generator', title: 'Generate YouTube Titles', category: 'social', description: 'High-CTR, search-optimized titles.', keywords: ['titles'], toolType: 'ai', priority: 85 },
  { slug: 'youtube-description-generator', title: 'Generate YouTube Descriptions', category: 'social', description: 'SEO-ready descriptions with timestamps.', keywords: ['desc'], toolType: 'ai', priority: 80 },
  { slug: 'instagram-caption-generator', title: 'Generate Instagram Captions', category: 'social', description: 'AI-written trendy captions for posts.', keywords: ['insta'], toolType: 'ai', priority: 85 },
  { slug: 'comment-reply-generator', title: 'Generate Comment Replies', category: 'social', description: 'Engagement boosting replies for followers.', keywords: ['reply'], toolType: 'ai', priority: 70 },
  { slug: 'hashtag-generator', title: 'Generate Hashtags for Posts', category: 'social', description: 'Reach-based tag generation for any platform.', keywords: ['tags'], toolType: 'client', priority: 75 },

  // --- CATEGORY 8: EDUCATION TOOLS ---
  { slug: 'edu-study-planner', title: 'Create Study Plan', category: 'education', description: 'Personalized exam preparation schedule.', keywords: ['plan'], toolType: 'ai', priority: 90 },
  { slug: 'edu-summary-generator', title: 'Summarize Study Notes', category: 'education', description: 'Condense long text into exam takeaways.', keywords: ['summary'], toolType: 'ai', priority: 95 },
  { slug: 'edu-essay-grader', title: 'Grade Academic Essay', category: 'education', description: 'Get a score and critique for your writing.', keywords: ['grade'], toolType: 'ai', priority: 85 },
  { slug: 'edu-math-solver', title: 'Solve Math Problems', category: 'education', description: 'Step-by-step logic for math word problems.', keywords: ['solve'], toolType: 'ai', priority: 90 },
  { slug: 'edu-equation-solver', title: 'Solve Mathematical Equations', category: 'education', description: 'Visual steps for algebraic solving.', keywords: ['equation'], toolType: 'ai', priority: 80 },
  { slug: 'edu-formula-generator', title: 'Generate Subject Formulas', category: 'education', description: 'Exhaustive list of formulas for any topic.', keywords: ['formula'], toolType: 'ai', priority: 75 },
  { slug: 'edu-unit-practice', title: 'Practice Unit Questions', category: 'education', description: 'Self-assessment questions with solutions.', keywords: ['practice'], toolType: 'ai', priority: 80 },
  { slug: 'edu-quiz-generator', title: 'Generate Study Quiz', category: 'education', description: 'MCQs and True/False learning tests.', keywords: ['quiz'], toolType: 'ai', priority: 85 },
  { slug: 'edu-flashcard-generator', title: 'Create Study Flashcards', category: 'education', description: 'Active recall cards with memory aids.', keywords: ['recall'], toolType: 'ai', priority: 80 },
  { slug: 'edu-assignment-formatter', title: 'Format Academic Assignment', category: 'education', description: 'Professional structure for submissions.', keywords: ['format'], toolType: 'ai', priority: 80 },
  { slug: 'edu-citation-architect', title: 'Generate Academic Citations', category: 'education', description: 'Perfect APA/MLA bibliography nodes.', keywords: ['cite'], toolType: 'ai', priority: 70 },
  { slug: 'edu-research-assistant', title: 'Academic Research Assistant', category: 'education', description: 'Thesis mapping and source strategizing.', keywords: ['research'], toolType: 'ai', priority: 75 },
  { slug: 'edu-language-tutor', title: 'Language Learning Tutor', category: 'education', description: 'Expert coaching for global languages.', keywords: ['tutor'], toolType: 'ai', priority: 80 },
  { slug: 'edu-concept-explainer', title: 'Explain Complex Concepts (ELI5)', category: 'education', description: 'Simplification engine for hard theories.', keywords: ['eli5'], toolType: 'ai', priority: 85 },
  { slug: 'edu-coding-tutor', title: 'Coding Logic Tutor', category: 'education', description: 'Mental models for programming logic.', keywords: ['code'], toolType: 'ai', priority: 80 },

  // --- CATEGORY 9: BUSINESS TOOLS ---
  { slug: 'swot-analysis-generator', title: 'Generate SWOT Analysis', category: 'business', description: 'Strategize with internal/external audit.', keywords: ['swot'], toolType: 'client', priority: 80 },
  { slug: 'profit-margin-calculator', title: 'Calculate Profit Margin', category: 'business', description: 'Determine markup and net margins.', keywords: ['profit'], toolType: 'client', priority: 85 },
  { slug: 'business-name-generator', title: 'Generate Business Names', category: 'business', description: 'Creative names for startups and products.', keywords: ['naming'], toolType: 'client', priority: 80 },
  { slug: 'break-even-calculator', title: 'Calculate Break Even Point', category: 'business', description: 'Find sales target for zero-loss.', keywords: ['break-even'], toolType: 'client', priority: 70 },
  { slug: 'mission-statement-generator', title: 'Generate Mission Statements', category: 'business', description: 'Professional core purpose drafting.', keywords: ['mission'], toolType: 'ai', priority: 60 },
  { slug: 'business-risk-analyzer', title: 'Analyze Business Risks', category: 'business', description: 'Identify operational and market threats.', keywords: ['risk'], toolType: 'ai', priority: 70 },
  { slug: 'launch-plan-generator', title: 'Create Product Launch Plan', category: 'business', description: 'Step-by-step roadmap for new items.', keywords: ['launch'], toolType: 'ai', priority: 75 },
  { slug: 'market-competition-evaluator', title: 'Evaluate Market Competition', category: 'business', description: 'Heuristic audit of market rivals.', keywords: ['rivals'], toolType: 'ai', priority: 70 },
  { slug: 'clv-calculator', title: 'Calculate Customer Lifetime Value', category: 'business', description: 'Predict long-term client revenue.', keywords: ['clv'], toolType: 'client', priority: 65 },
  { slug: 'business-email-templates', title: 'Generate Business Email Templates', category: 'business', description: 'Standardized comms for operations.', keywords: ['email'], toolType: 'ai', priority: 80 },

  // --- CATEGORY 10: CAREER TOOLS ---
  { slug: 'resume-filename-checker', title: 'Check Resume Filename', category: 'career', description: 'Audit professionalism of file naming.', keywords: ['naming'], toolType: 'client', priority: 70 },
  { slug: 'experience-dispute-resolver', title: 'Resolve Experience Disputes', category: 'career', description: 'Calculate net work years precisely.', keywords: ['exp'], toolType: 'client', priority: 70 },
  { slug: 'resume-format-checker', title: 'Check Resume Format', category: 'career', description: 'Test ATS layout compatibility.', keywords: ['ats'], toolType: 'client', priority: 80 },
  { slug: 'notice-period-calculator', title: 'Calculate Notice Period', category: 'career', description: 'Calculate last working day logically.', keywords: ['notice'], toolType: 'client', priority: 75 },
  { slug: 'cover-letter-optimizer', title: 'Optimize Cover Letter', category: 'career', description: 'Audit impact and tone for hiring.', keywords: ['letter'], toolType: 'ai', priority: 80 },
  { slug: 'gap-explanation-generator', title: 'Explain Career Gaps', category: 'career', description: 'Professional wording for job breaks.', keywords: ['gaps'], toolType: 'ai', priority: 80 },
  { slug: 'professional-bio-generator', title: 'Generate Professional Bio', category: 'career', description: 'Authoritative summaries for profiles.', keywords: ['bio'], toolType: 'ai', priority: 75 },
  { slug: 'interview-answer-prepper', title: 'Prepare Interview Answers', category: 'career', description: 'AI-guided STAR method responses.', keywords: ['answers'], toolType: 'ai', priority: 85 },
  { slug: 'mock-interview-simulator', title: 'Practice Mock Interviews', category: 'career', description: 'Interactive career logic coaching.', keywords: ['practice'], toolType: 'ai', priority: 80 },
  { slug: 'jd-keyword-analyzer', title: 'Analyze Job Description Keywords', category: 'career', description: 'Find missing terms for ATS ranking.', keywords: ['skills'], toolType: 'ai', priority: 85 },

  // --- CATEGORY 11: GOVERNMENT TOOLS ---
  { slug: 'govt-rule-decoder', title: 'Decode Govt Form Rules', category: 'government', description: 'Translate cryptic portal rules into steps.', keywords: ['rules'], toolType: 'client', priority: 85 },
  { slug: 'dpi-size-conflict-explainer', title: 'Resolve Size vs DPI Conflict', category: 'government', description: 'Expert advice on conflicting requirements.', keywords: ['conflict'], toolType: 'client', priority: 80 },
  { slug: 'deadline-checker', title: 'Check Form Deadline Logic', category: 'government', description: 'Urgency alerts for portal cut-offs.', keywords: ['time'], toolType: 'client', priority: 75 },
  { slug: 'dob-solver', title: 'Solve Invalid DOB Errors', category: 'government', description: 'Calculate exact eligibility as on date.', keywords: ['dob'], toolType: 'client', priority: 90 },
  { slug: 'id-validator', title: 'Validate PAN & Aadhaar Images', category: 'government', description: 'Pre-upload check for official IDs.', keywords: ['id'], toolType: 'client', priority: 80 },
  { slug: 'status-decoder', title: 'Decode Application Status Meaning', category: 'government', description: 'Understand "Scrutiny" or "Objection".', keywords: ['status'], toolType: 'client', priority: 70 },
  { slug: 'format-translator', title: 'Translate Wrong Format Errors', category: 'government', description: 'Why a website says "MIME Type Invalid".', keywords: ['mime'], toolType: 'client', priority: 70 },
  { slug: 'background-predictor', title: 'Predict Background Rejection', category: 'government', description: 'Check photo background compliance.', keywords: ['reject'], toolType: 'client', priority: 60 },
  { slug: 'signature-fixer', title: 'Fix Signature Scanner Issues', category: 'government', description: 'Whiten paper and darken ink scans.', keywords: ['fix'], toolType: 'client', priority: 80 },
  { slug: 'validity-checker', title: 'Check Document Validity Dates', category: 'government', description: 'Passport/DL expiry audits.', keywords: ['expiry'], toolType: 'client', priority: 50 },

  // --- CATEGORY 12: DAILY LIFE TOOLS ---
  { slug: 'internet-slow-analyzer', title: 'Analyze Internet Speed Issues', category: 'daily-life', description: 'Diagnose lag and bandwidth drops.', keywords: ['speed'], toolType: 'client', priority: 80 },
  { slug: 'email-bounce-decoder', title: 'Decode Email Bounce Errors', category: 'daily-life', description: 'Translate mail delivery failures.', keywords: ['email'], toolType: 'client', priority: 80 },
  { slug: 'otp-not-coming-analyzer', title: 'Analyze OTP Delivery Failures', category: 'daily-life', description: 'Troubleshoot SMS verification delays.', keywords: ['otp'], toolType: 'client', priority: 85 },
  { slug: 'timezone-converter', title: 'Convert Time Zones', category: 'daily-life', description: 'Coordinate meetings across regions.', keywords: ['time'], toolType: 'client', priority: 70 },
  { slug: 'cooking-converter', title: 'Calculate Cooking Measurements', category: 'daily-life', description: 'Cups to grams and volume units.', keywords: ['cooking'], toolType: 'client', priority: 60 },
  { slug: 'grocery-list-generator', title: 'Generate Grocery Lists', category: 'daily-life', description: 'Categorized lists for shopping.', keywords: ['grocery'], toolType: 'client', priority: 50 },
  { slug: 'expense-tracker', title: 'Track Daily Expenses', category: 'daily-life', description: 'Local logging for personal finance.', keywords: ['money'], toolType: 'client', priority: 60 },
  { slug: 'meal-planner', title: 'Plan Weekly Meals', category: 'daily-life', description: 'Nutrition-focused meal scheduling.', keywords: ['meal'], toolType: 'client', priority: 65 },
  { slug: 'tip-calculator', title: 'Calculate Tip Amount', category: 'daily-life', description: 'Split bills and calculate gratuity.', keywords: ['tip'], toolType: 'client', priority: 70 },
  { slug: 'decision-maker', title: 'Generate Random Decision Maker', category: 'daily-life', description: 'Unbiased outcome generators.', keywords: ['choice'], toolType: 'client', priority: 50 },

  // --- CATEGORY 13: AI TOOLS ---
  { slug: 'ai-image-generator', title: 'Generate AI Images (Prompt)', category: 'ai', description: 'Architect cinematic visual prompts.', keywords: ['image'], toolType: 'ai', priority: 100 },
  { slug: 'ai-background-remover', title: 'Remove Background with AI', category: 'ai', description: 'Neural subject isolation engine.', keywords: ['remove'], toolType: 'ai', priority: 95 },
  { slug: 'ai-image-enhancer', title: 'Enhance Image with AI', category: 'ai', description: 'Upscale and de-blur using neural logic.', keywords: ['enhance'], toolType: 'ai', priority: 90 },
  { slug: 'ai-image-upscaler', title: 'Upscale Image with AI', category: 'ai', description: 'Convert low-res to high-fidelity 4K.', keywords: ['upscale'], toolType: 'ai', priority: 85 },
  { slug: 'ai-image-recolor', title: 'Recolor Image with AI', category: 'ai', description: 'Context-aware color replacement.', keywords: ['color'], toolType: 'ai', priority: 75 },
  { slug: 'ai-face-retouch', title: 'Retouch Face with AI', category: 'ai', description: 'Natural beauty and skin optimization.', keywords: ['face'], toolType: 'ai', priority: 70 },
  { slug: 'ai-style-transfer', title: 'Transfer Image Style with AI', category: 'ai', description: 'Apply artistic styles to any photo.', keywords: ['style'], toolType: 'ai', priority: 65 },
  { slug: 'ai-thumbnail-generator', title: 'Generate AI Video Thumbnails', category: 'ai', description: 'High-CTR thumbnail architect.', keywords: ['youtube'], toolType: 'ai', priority: 85 },
  { slug: 'ai-image-caption-generator', title: 'Generate AI Image Captions', category: 'ai', description: 'Write engaging text for visuals.', keywords: ['caption'], toolType: 'ai', priority: 80 },
  { slug: 'ai-meme-generator', title: 'Generate AI Meme Concepts', category: 'ai', description: 'Viral humor and template logic.', keywords: ['meme'], toolType: 'ai', priority: 80 },

  // --- CATEGORY 14: OFFICE TOOLS ---
  { slug: 'invoice-generator', title: 'Generate Professional Invoices', category: 'office', description: 'Draft business billing docs.', keywords: ['invoice'], toolType: 'client', priority: 85 },
  { slug: 'resume-builder', title: 'Build AI Resumes', category: 'office', description: 'Architect ATS-optimized CVs.', keywords: ['cv'], toolType: 'ai', priority: 95 },
  { slug: 'word-frequency-analyzer', title: 'Analyze Text Word Frequency', category: 'office', description: 'Audit keyword usage in docs.', keywords: ['words'], toolType: 'client', priority: 70 },
  { slug: 'character-counter-pro', title: 'Count Professional Characters', category: 'office', description: 'Strict limit auditing for forms.', keywords: ['count'], toolType: 'client', priority: 75 },
  { slug: 'text-cleaner', title: 'Clean Professional Text', category: 'office', description: 'Normalize spacing and characters.', keywords: ['clean'], toolType: 'client', priority: 80 },
  { slug: 'case-converter-v2', title: 'Convert Text Case (Upper/Lower)', category: 'office', description: 'Batch case transformation.', keywords: ['case'], toolType: 'client', priority: 70 },
  { slug: 'find-replace', title: 'Search & Replace Professional Text', category: 'office', description: 'Mass editing via pattern matching.', keywords: ['replace'], toolType: 'client', priority: 65 },
  { slug: 'duplicate-line-remover', title: 'Remove Duplicate List Lines', category: 'office', description: 'Scrub spreadsheets and lists.', keywords: ['dedupe'], toolType: 'client', priority: 80 },
  { slug: 'text-to-speech-reader', title: 'AI Voice Reader (TTS)', category: 'office', description: 'Listen to document contents.', keywords: ['tts'], toolType: 'ai', priority: 80 },
  { slug: 'text-compare', title: 'Side-by-Side Text Diff Checker', category: 'office', description: 'Visual version comparison.', keywords: ['diff'], toolType: 'client', priority: 75 },

  // --- CATEGORY 15: FINANCE TOOLS ---
  { slug: 'why-emi-high-explainer', title: 'Explain High EMI Reasons', category: 'finance', description: 'Audit loan interest burdens.', keywords: ['emi'], toolType: 'client', priority: 90 },
  { slug: 'actual-interest-analyzer', title: 'Analyze Real vs Quoted Interest', category: 'finance', description: 'Flat vs Reducing rates truth.', keywords: ['truth'], toolType: 'client', priority: 85 },
  { slug: 'no-cost-emi-reality-checker', title: 'Check No-Cost EMI Reality', category: 'finance', description: 'Expose hidden discount costs.', keywords: ['emi'], toolType: 'client', priority: 80 },
  { slug: 'inflation-impact-calculator', title: 'Calculate Future Money Inflation', category: 'finance', description: 'Future value projections.', keywords: ['future'], toolType: 'client', priority: 75 },
  { slug: 'roi-calculator', title: 'Calculate Investment ROI', category: 'finance', description: 'Performance audit of assets.', keywords: ['roi'], toolType: 'client', priority: 85 },
  { slug: 'job-offer-comparison', title: 'Compare Job Salary Offers', category: 'finance', description: 'In-hand vs CTC modeling.', keywords: ['salary'], toolType: 'client', priority: 90 },
  { slug: 'salary-calculator', title: 'Calculate Monthly In-Hand Salary', category: 'finance', description: 'FY 24-25 slab compliance.', keywords: ['inhand'], toolType: 'client', priority: 95 },
  { slug: 'tax-slab-analyzer', title: 'Calculate Tax Slabs', category: 'finance', description: 'Income tax liability audits.', keywords: ['tax'], toolType: 'client', priority: 90 },
  { slug: 'refund-amount-explainer', title: 'Predict Refund Differences', category: 'finance', description: 'Explain partial refund logic.', keywords: ['refund'], toolType: 'client', priority: 70 },
  { slug: 'subscription-trap-analyzer', title: 'Analyze Subscription Traps', category: 'finance', description: 'Audit auto-debit vulnerabilities.', keywords: ['trap'], toolType: 'client', priority: 65 },

  // --- CATEGORY 16: SECURITY TOOLS ---
  { slug: 'password-strength-auditor', title: 'Audit Password Strength', category: 'security', description: 'Entropy based vulnerability check.', keywords: ['audit'], toolType: 'client', priority: 85 },
  { slug: 'hash-generator', title: 'Generate Secure Hashes', category: 'security', description: 'SHA-256 and MD5 local digests.', keywords: ['hash'], toolType: 'client', priority: 80 },
  { slug: 'hash-identifier', title: 'Identify Hash Type', category: 'security', description: 'Pattern matching for hash detection.', keywords: ['check'], toolType: 'client', priority: 70 },
  { slug: 'security-encryptor', title: 'Encrypt Private Text (AES-256)', category: 'security', description: 'Military grade local locking.', keywords: ['encrypt'], toolType: 'client', priority: 90 },
  { slug: 'security-decryptor', title: 'Decrypt Secure Text', category: 'security', description: 'Recover locked content safely.', keywords: ['decrypt'], toolType: 'client', priority: 90 },
  { slug: 'password-generator', title: 'Generate Random Secure Passwords', category: 'security', description: 'Local CSPRNG entropy source.', keywords: ['pass'], toolType: 'client', priority: 95 },
  { slug: 'pii-leak-checker', title: 'Check for PII Data Leaks', category: 'security', description: 'Audit logs for private info.', keywords: ['pii'], toolType: 'client', priority: 75 },
  { slug: 'data-masking-tool', title: 'Mask Sensitive Data', category: 'security', description: 'Sanitize logs and reports.', keywords: ['mask'], toolType: 'client', priority: 80 },
  { slug: 'phishing-risk-scanner', title: 'Scan for URL Phishing Risks', category: 'security', description: 'Heuristic domain auditing.', keywords: ['scan'], toolType: 'client', priority: 85 },
  { slug: 'device-security-status', title: 'Check Device Security Status', category: 'security', description: 'Browser sandbox health audit.', keywords: ['status'], toolType: 'client', priority: 60 },

  // --- CATEGORY 17: NETWORK TOOLS ---
  { slug: 'ip-to-location', title: 'Lookup IP Location', category: 'network', description: 'Geographic and ISP node identification.', keywords: ['ip'], toolType: 'client', priority: 85 },
  { slug: 'dns-lookup', title: 'Query DNS Records', category: 'network', description: 'Check A, MX, and TXT records.', keywords: ['dns'], toolType: 'client', priority: 80 },
  { slug: 'ssl-expiry-checker', title: 'Check SSL Certificate Expiry', category: 'network', description: 'Certificate health and trust audits.', keywords: ['ssl'], toolType: 'client', priority: 75 },
  { slug: 'user-agent-parser', title: 'Parse Device User-Agent', category: 'network', description: 'Hardware and OS node identification.', keywords: ['ua'], toolType: 'client', priority: 80 },
  { slug: 'port-checker', title: 'Scan Remote Ports', category: 'network', description: 'Network reachability diagnostics.', keywords: ['ports'], toolType: 'client', priority: 70 },
  { slug: 'http-header-checker', title: 'Inspect HTTP Headers', category: 'network', description: 'Security and caching directive audits.', keywords: ['headers'], toolType: 'client', priority: 75 },
  { slug: 'ping-tester', title: 'Test Connection Latency (Ping)', category: 'network', description: 'Network RTT performance auditing.', keywords: ['ping'], toolType: 'client', priority: 80 },
  { slug: 'traceroute-analyzer', title: 'Trace Network Route', category: 'network', description: 'Visualize hop-by-hop logic paths.', keywords: ['trace'], toolType: 'client', priority: 65 },
  { slug: 'local-ip-info', title: 'Analyze Local IP Info', category: 'network', description: 'Subnet and interface identification.', keywords: ['local'], toolType: 'client', priority: 70 },
  { slug: 'uptime-checker', title: 'Check Website Availability', category: 'network', description: 'Is-It-Down status monitoring.', keywords: ['uptime'], toolType: 'client', priority: 85 },

  // --- CATEGORY 18: MISCELLANEOUS ---
  { slug: 'md-to-html', title: 'Convert Markdown to HTML', category: 'miscellaneous', description: 'High-fidelity markdown rendering.', keywords: ['md'], toolType: 'client', priority: 70 },
  { slug: 'lorem-generator', title: 'Generate Lorem Ipsum Text', category: 'miscellaneous', description: 'Standard placeholder copy generator.', keywords: ['text'], toolType: 'client', priority: 75 },
  { slug: 'unit-converter', title: 'Convert Units (Length, Weight)', category: 'miscellaneous', description: 'Universal measurement transcoding.', keywords: ['convert'], toolType: 'client', priority: 90 },
  { slug: 'uuid-generator-v2', title: 'Generate UUID Codes', category: 'miscellaneous', description: 'Random unique ID identification.', keywords: ['uuid'], toolType: 'client', priority: 80 },
  { slug: 'file-type-identifier-v2', title: 'Identify Unknown File Types', category: 'miscellaneous', description: 'Binary signature pattern matching.', keywords: ['type'], toolType: 'client', priority: 70 },
  { slug: 'zip-file-creator-v2', title: 'Create ZIP Archives', category: 'miscellaneous', description: 'Local binary file packaging.', keywords: ['zip'], toolType: 'client', priority: 85 },
  { slug: 'zip-file-extractor-v2', title: 'Extract ZIP Archives', category: 'miscellaneous', description: 'High-speed local unpacking.', keywords: ['unzip'], toolType: 'client', priority: 85 },
  { slug: 'print-color-predictor', title: 'Predict Print Result Colors', category: 'miscellaneous', description: 'CMYK vs RGB visual auditing.', keywords: ['print'], toolType: 'client', priority: 60 },
  { slug: 'mobile-view-simulator', title: 'Simulate Mobile View Layouts', category: 'miscellaneous', description: 'Visual responsive check node.', keywords: ['mobile'], toolType: 'client', priority: 65 },
  { slug: 'pixel-kb-forecast', title: 'Forecast Pixel to KB Size', category: 'miscellaneous', description: 'Estimated size projections.', keywords: ['size'], toolType: 'client', priority: 50 }
];

TOOLS.forEach(tool => {
  tool.execute = async (input, options) => {
    if (!input && !options) throw new Error("Logic Sync Failure: Input buffer empty.");

    switch (tool.category) {
      case 'image': return await imageCluster.execute(tool.slug, input, options);
      case 'pdf': return await pdfCluster.execute(tool.slug, input, options);
      case 'calculators': return await calculatorCluster.execute(tool.slug, input, options);
      case 'ai': return await aiCluster.execute(tool.slug, input, options);
      case 'utility': return await utilityCluster.execute(tool.slug, input, options);
      case 'data': return await dataCluster.execute(tool.slug, input, options);
      case 'network': return await networkCluster.execute(tool.slug, input, options);
      case 'office': return await officeCluster.execute(tool.slug, input, options);
      case 'seo': return await seoCluster.execute(tool.slug, input, options);
      case 'daily-life': return await dailyLifeCluster.execute(tool.slug, input, options);
      case 'business': return await businessCluster.execute(tool.slug, input, options);
      case 'social': return await socialCluster.execute(tool.slug, input, options);
      case 'government': return await governmentCluster.execute(tool.slug, input, options);
      case 'career': return await careerCluster.execute(tool.slug, input, options);
      case 'education': return await educationCluster.execute(tool.slug, input, options);
      case 'security': return await securityCluster.execute(tool.slug, input, options);
      case 'finance': return await financeCluster.execute(tool.slug, input, options);
      case 'miscellaneous': return await utilityCluster.execute(tool.slug, input, options);
      
      default: 
        if (tool.slug.includes('ai-') || tool.toolType === 'ai') {
          return await aiCluster.execute(tool.slug, input, options);
        }
        return { success: true, status: "Verified" };
    }
  };
});