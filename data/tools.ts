
import { Tool } from '../types';
import * as Utils from '../tools/executors/utilityCluster';
import * as SEO from '../tools/executors/seoCluster';
import * as Net from '../tools/executors/networkCluster';
import * as DataX from '../tools/executors/dataCluster';
import * as FileX from '../tools/executors/fileCluster';
import * as Rules from '../tools/executors/rulesCluster';
import { GoogleGenAI } from "@google/genai";
import QRCode from 'qrcode';

// Unified AI Helper for Professional Content
const runAIPro = async (slug: string, input: string, options: any) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Professional Logic Task: ${slug}\nInput: ${input}\nParams: ${JSON.stringify(options)}`,
    config: {
      systemInstruction: "You are a specialized ToolVerse intelligence node. Generate high-value, structured professional output. No conversational fillers.",
      temperature: 0.7,
    },
  });
  return response.text;
};

/**
 * TOOLVERSE MASTER REGISTRY v20.0
 * The Ultimate Utility Ecosystem (500+ Nodes)
 * Total Implementation: 88 New High-Traffic Tools Added
 */
export const TOOLS: Tool[] = [
  // --- 🖼️ IMAGE TOOLS (MEGA EXPANSION) ---
  { slug: 'image-size-reducer-kb-selector', title: 'Image Size Reducer (KB Selector)', category: 'image', description: 'Compress images to exact KB targets (20KB, 50KB) for government forms using binary search logic.', keywords: ['compress', 'kb', 'image', 'resize'], toolType: 'client', priority: 98 },
  { slug: 'image-format-converter-generic', title: 'Universal Image Converter', category: 'image', description: 'Lossless transcoding between JPG, PNG, WEBP, HEIC, and TIFF formats.', keywords: ['convert', 'format', 'image'], toolType: 'client' },
  { slug: 'image-metadata-viewer-lite', title: 'Image Metadata Viewer', category: 'image', description: 'Inspect hidden camera metadata, GPS locations, and editing history.', keywords: ['exif', 'metadata', 'image'], toolType: 'client' },
  { slug: 'image-print-size-calculator', title: 'Image Print Size Calculator', category: 'image', description: 'Calculate physical dimensions in inches/cm based on pixel resolution and DPI settings.', keywords: ['print', 'dpi', 'inches'], toolType: 'client' },
  { slug: 'image-authenticity-analyzer', title: 'Image Authenticity Analyzer', category: 'image', description: 'Analyze pixel consistency and metadata to detect AI generation or editing tampering.', keywords: ['fake', 'detection', 'edit'], toolType: 'ai' },
  { slug: 'image-upload-failure-debugger', title: 'Image Upload Failure Debugger', category: 'image', description: 'Identify why your image is rejected by portals (Dimensions, Size, or Header errors).', keywords: ['reject', 'upload', 'error'], toolType: 'client' },
  { slug: 'form-image-auto-fixer', title: 'Form Image Auto-Fixer', category: 'image', description: 'One-click fix for signatures and ID photos to meet portal upload requirements.', keywords: ['ssc', 'upsc', 'fix', 'form'], toolType: 'client' },
  { slug: 'image-dpi-myth-breaker', title: 'Image DPI Myth Breaker Tool', category: 'image', description: 'Educational tool to verify if DPI settings actually affect your specific upload portal.', keywords: ['dpi', 'myth', 'resolution'], toolType: 'client' },
  { slug: 'image-stretching-predictor', title: 'Image Stretching Issue Predictor', category: 'image', description: 'Predict if your photo will look squashed or stretched after portal upload.', keywords: ['aspect ratio', 'stretch', 'distort'], toolType: 'client' },
  { slug: 'pixel-to-kb-calculator', title: 'Exact Pixel → KB Calculator', category: 'image', description: 'Calculate the mathematical limit of quality for a specific resolution and KB target.', keywords: ['calculator', 'pixel', 'kb'], toolType: 'client' },
  { slug: 'camera-vs-screenshot-quality', title: 'Camera vs Screenshot Quality Tool', category: 'image', description: 'Compare technical clarity differences and why portals reject screenshots.', keywords: ['screenshot', 'camera', 'quality'], toolType: 'client' },
  { slug: 'mobile-camera-setting-advisor', title: 'Mobile Camera Setting Advisor', category: 'image', description: 'Get the best camera settings for your specific device to capture portal-ready photos.', keywords: ['iphone', 'android', 'camera', 'settings'], toolType: 'ai' },
  { slug: 'background-rejection-predictor', title: 'Background Rejection Predictor', category: 'image', description: 'Predict if your photo background will cause an automated rejection based on contrast rules.', keywords: ['background', 'white', 'reject'], toolType: 'client' },
  { slug: 'image-blurry-after-upload-simulator', title: 'Upload Blur Simulator', category: 'image', description: 'See how social platforms or portals will degrade your image quality after upload.', keywords: ['blur', 'compression', 'social'], toolType: 'client' },

  // --- 📄 PDF TOOLS (MEGA EXPANSION) ---
  { slug: 'jpg-to-pdf-converter-pro', title: 'JPG to PDF Converter', category: 'pdf', description: 'Combine multiple JPG/PNG images into a single, high-fidelity PDF document.', keywords: ['jpg', 'pdf', 'convert'], toolType: 'client', priority: 97 },
  { slug: 'pdf-size-reducer-mb-target', title: 'PDF Size Reducer (MB target)', category: 'pdf', description: 'Compress PDF to specific MB targets (e.g., 2MB) for legal and academic submissions.', keywords: ['compress', 'pdf', 'mb'], toolType: 'client' },
  { slug: 'pdf-compare-tool-pro', title: 'PDF Compare Tool', category: 'pdf', description: 'Visual and textual comparison of two PDF versions side-by-side.', keywords: ['compare', 'diff', 'pdf'], toolType: 'client' },
  { slug: 'pdf-compliance-checker', title: 'PDF Compliance Checker', category: 'pdf', description: 'Audit PDF for PDF/A compliance, accessibility tags, and font embedding.', keywords: ['compliance', 'standards', 'pdfa'], toolType: 'client' },
  { slug: 'pdf-page-extractor-standalone', title: 'PDF Page Extractor', category: 'pdf', description: 'Extract specific pages or ranges into a separate, lightweight document.', keywords: ['extract', 'pages', 'pdf'], toolType: 'client' },
  { slug: 'pdf-compatibility-analyzer', title: 'PDF Compatibility Level Analyzer', category: 'pdf', description: 'Detect PDF version (1.4, 1.7) and identifies potential opening errors.', keywords: ['version', 'engine', 'compatibility'], toolType: 'client' },
  { slug: 'pdf-upload-time-estimator', title: 'PDF Upload Time Estimator', category: 'pdf', description: 'Estimate upload duration based on file size and current internet bandwidth.', keywords: ['time', 'upload', 'estimator'], toolType: 'client' },
  { slug: 'pdf-print-cutoff-predictor', title: 'PDF Print Cut-Off Predictor', category: 'pdf', description: 'Check if your PDF margins are safe for A4 or Letter size printing.', keywords: ['print', 'margins', 'cutoff'], toolType: 'client' },
  { slug: 'font-not-supported-decoder', title: 'Font Not Supported Error Decoder', category: 'pdf', description: 'Decode cryptic font errors and fix rendering issues for portal uploads.', keywords: ['font', 'error', 'decoder'], toolType: 'client' },
  { slug: 'pdf-bw-print-preview', title: 'PDF Black & White Print Preview', category: 'pdf', description: 'Preview how your colored PDF will look when printed in grayscale.', keywords: ['bw', 'grayscale', 'print'], toolType: 'client' },

  // --- 🔢 CALCULATORS (MEGA EXPANSION) ---
  { slug: 'simple-interest-calculator-pro', title: 'Simple Interest Calculator', category: 'calculators', description: 'Quick calculation of basic interest on principal amounts.', keywords: ['interest', 'si', 'calculator'], toolType: 'client' },
  { slug: 'compound-interest-calculator-pro', title: 'Compound Interest Calculator', category: 'calculators', description: 'Advanced compound interest modeling with periodic contribution support.', keywords: ['compound', 'ci', 'investment'], toolType: 'client' },
  { slug: 'loan-calculator-standard', title: 'Loan Calculator', category: 'calculators', description: 'General loan evaluator for non-EMI repayment structures.', keywords: ['loan', 'credit', 'calculator'], toolType: 'client' },
  { slug: 'date-difference-calculator-pro', title: 'Date Difference Calculator', category: 'calculators', description: 'Calculate exact days, weeks, and months between two dates.', keywords: ['date', 'days', 'duration'], toolType: 'client' },
  { slug: 'age-difference-calculator-pro', title: 'Age Difference Calculator', category: 'calculators', description: 'Compare two dates of birth or age spans precisely.', keywords: ['age', 'diff', 'compare'], toolType: 'client' },
  { slug: 'working-days-calculator-pro', title: 'Working Days Calculator', category: 'calculators', description: 'Calculate business days between two dates, excluding weekends and holidays.', keywords: ['working', 'days', 'business'], toolType: 'client' },
  { slug: 'time-duration-calculator-pro', title: 'Time Duration Calculator', category: 'calculators', description: 'Sum or subtract time intervals for project management and logging.', keywords: ['time', 'duration', 'calc'], toolType: 'client' },
  { slug: 'event-countdown-timer-generator', title: 'Event Countdown Timer Generator', category: 'calculators', description: 'Generate custom live countdown timers for exams or deadlines.', keywords: ['countdown', 'timer', 'exam'], toolType: 'client' },

  // --- 🛠️ UTILITY TOOLS (MEGA EXPANSION) ---
  { slug: 'word-counter-pro', title: 'Word Counter', category: 'utility', description: 'High-precision word, character, and paragraph counter with reading time estimation.', keywords: ['word', 'count', 'text'], toolType: 'client' },
  { slug: 'text-case-converter-pro', title: 'Text Case Converter', category: 'utility', description: 'Transform text between UPPERCASE, lowercase, camelCase, and snake_case.', keywords: ['case', 'upper', 'lower'], toolType: 'client' },
  { slug: 'file-size-converter-pro', title: 'File Size Converter', category: 'utility', description: 'Convert between Bytes, KB, MB, GB, and TB with binary precision.', keywords: ['convert', 'size', 'bytes'], toolType: 'client' },
  { slug: 'qr-code-generator-pro', title: 'QR Code Generator', category: 'utility', description: 'Generate high-res QR codes for URLs, text, or WiFi access.', keywords: ['qr', 'code', 'generator'], toolType: 'client', priority: 95 },
  { slug: 'random-password-generator-pro', title: 'Random Password Generator', category: 'utility', description: 'Create cryptographically secure passwords locally in your browser.', keywords: ['password', 'secure', 'random'], toolType: 'client' },
  { slug: 'document-upload-readiness-pro', title: 'Document Upload Readiness Checker', category: 'utility', description: 'Verify if your documents meet global standard portal specs before uploading.', keywords: ['ready', 'upload', 'check'], toolType: 'client' },
  { slug: 'device-compatibility-checker-pro', title: 'Device Compatibility Checker', category: 'utility', description: 'Analyze your browser and hardware capabilities for specific web applications.', keywords: ['compat', 'browser', 'device'], toolType: 'client' },

  // --- 📱 SOCIAL / CREATOR TOOLS (MEGA EXPANSION) ---
  { slug: 'youtube-video-idea-generator-pro', title: 'YouTube Video Idea Generator', category: 'social', description: 'Generate 10 viral video concepts based on trending niches.', keywords: ['youtube', 'ideas', 'viral'], toolType: 'ai' },
  { slug: 'youtube-description-generator-pro', title: 'YouTube Description Generator', category: 'social', description: 'Create SEO-optimized video descriptions with timestamps.', keywords: ['youtube', 'seo', 'description'], toolType: 'ai' },
  { slug: 'instagram-caption-generator-pro', title: 'Instagram Caption Generator', category: 'social', description: 'Generate high-engagement captions with emojis and hashtags.', keywords: ['instagram', 'caption', 'ai'], toolType: 'ai' },
  { slug: 'comment-reply-generator-pro', title: 'Comment Reply Generator', category: 'social', description: 'Automate thoughtful replies to boost your social media engagement.', keywords: ['reply', 'comment', 'social'], toolType: 'ai' },
  { slug: 'hashtag-generator-pro', title: 'Hashtag Generator', category: 'social', description: 'Find trending hashtags across Instagram, TikTok, and X.', keywords: ['hashtags', 'trends', 'social'], toolType: 'ai' },
  { slug: 'social-media-bio-formatter-pro', title: 'Social Media Bio Formatter', category: 'social', description: 'Draft high-converting bios for multiple platforms.', keywords: ['bio', 'profile', 'social'], toolType: 'ai' },

  // --- 🔍 SEO TOOLS (MEGA EXPANSION) ---
  { slug: 'meta-description-length-checker-pro', title: 'Meta Description Length Checker', category: 'seo', description: 'Validate meta length to ensure zero truncation in SERPs.', keywords: ['seo', 'meta', 'length'], toolType: 'client' },
  { slug: 'serp-snippet-preview-tool-pro', title: 'SERP Snippet Preview Tool', category: 'seo', description: 'Visualize how your page will look in real Google search results.', keywords: ['serp', 'google', 'preview'], toolType: 'client' },
  { slug: 'internal-link-generator-pro', title: 'Internal Link Generator', category: 'seo', description: 'Map semantic internal links to boost authority and rankings.', keywords: ['seo', 'links', 'internal'], toolType: 'ai' },
  { slug: 'keyword-difficulty-checker-pro', title: 'Keyword Difficulty Checker', category: 'seo', description: 'Analyze competition levels for any target keyword.', keywords: ['seo', 'keywords', 'difficulty'], toolType: 'ai' },
  { slug: 'breadcrumb-schema-generator-pro', title: 'Breadcrumb Schema Generator', category: 'seo', description: 'Generate valid JSON-LD breadcrumb schemas instantly.', keywords: ['schema', 'jsonld', 'breadcrumb'], toolType: 'client' },

  // --- 🌐 NETWORK / SECURITY (MEGA EXPANSION) ---
  { slug: 'ssl-expiry-checker-pro', title: 'SSL Expiry Checker', category: 'network', description: 'Monitor SSL certificate validity and expiration dates.', keywords: ['ssl', 'https', 'security'], toolType: 'client' },
  { slug: 'http-header-checker-pro', title: 'HTTP Header Checker', category: 'network', description: 'Inspect server response headers for security and caching.', keywords: ['http', 'headers', 'check'], toolType: 'client' },
  { slug: 'url-safety-checker-pro', title: 'URL Safety Checker', category: 'network', description: 'Scan URLs for phishing risks and malicious intent patterns.', keywords: ['url', 'safety', 'phishing'], toolType: 'client' },
  { slug: 'hash-identifier-pro', title: 'Hash Identifier', category: 'network', description: 'Detect algorithm type (MD5, SHA) of any hash string.', keywords: ['hash', 'crypto', 'identify'], toolType: 'client' },
  { slug: 'email-header-analyzer-pro', title: 'Email Header Analyzer', category: 'network', description: 'Trace email origin and verify authentication headers.', keywords: ['email', 'header', 'trace'], toolType: 'client' },
  { slug: 'ip-address-info-tool-pro', title: 'IP Address Info Tool', category: 'network', description: 'Basic IP metadata classification based on offline patterns.', keywords: ['ip', 'geo', 'network'], toolType: 'client' },

  // --- 📊 DATA / FILE / OFFICE (MEGA EXPANSION) ---
  { slug: 'json-validator-pro', title: 'JSON Validator', category: 'dev', description: 'Strict syntax validation for JSON structures.', keywords: ['json', 'validate', 'syntax'], toolType: 'client' },
  { slug: 'file-format-converter-pro', title: 'File Format Converter', category: 'file', description: 'Convert between XML, CSV, JSON, and YAML formats.', keywords: ['convert', 'format', 'data'], toolType: 'client' },
  { slug: 'csv-cleaner-tool-pro', title: 'CSV Cleaner Tool', category: 'data', description: 'Sanitize datasets by fixing encoding and duplicates.', keywords: ['csv', 'clean', 'data'], toolType: 'client' },
  { slug: 'excel-to-pdf-converter-pro', title: 'Excel to PDF Converter', category: 'office', description: 'Transform workbooks into printable PDF documents.', keywords: ['excel', 'pdf', 'convert'], toolType: 'client' },
  { slug: 'docx-metadata-viewer-pro', title: 'DOCX Metadata Viewer', category: 'office', description: 'View hidden properties of Word documents.', keywords: ['word', 'metadata', 'docx'], toolType: 'client' },

  // --- 🧠 AI & PAIN-POINT TOOLS (MEGA EXPANSION) ---
  { slug: 'ai-resume-bullet-generator-pro', title: 'AI Resume Bullet Generator', category: 'ai', description: 'Create high-impact bullet points for any job role.', keywords: ['resume', 'cv', 'bullets'], toolType: 'ai' },
  { slug: 'ai-whatsapp-reply-generator-pro', title: 'AI WhatsApp Reply Generator', category: 'ai', description: 'Generate smart, contextual replies for messaging apps.', keywords: ['whatsapp', 'reply', 'ai'], toolType: 'ai' },
  { slug: 'ai-content-rewriter-pro', title: 'AI Content Rewriter', category: 'ai', description: 'Paraphrase and optimize content for better flow and SEO.', keywords: ['rewrite', 'article', 'ai'], toolType: 'ai' },
  { slug: 'ai-text-summarizer-pro', title: 'AI Text Summarizer', category: 'ai', description: 'Condense long documents into actionable executive summaries.', keywords: ['summary', 'text', 'ai'], toolType: 'ai' },
  { slug: 'why-upload-rejected-analyzer-pro', title: 'Why My Upload Is Rejected?', category: 'utility', description: 'Diagnose why a portal rejected your document.', keywords: ['reject', 'portal', 'ssc', 'upsc'], toolType: 'ai' },
  { slug: 'govt-form-rule-decoder-pro', title: 'Govt Form Rule Decoder', category: 'utility', description: 'Translate complex recruitment rules into simple specs.', keywords: ['rules', 'notification', 'govt'], toolType: 'ai' },
  { slug: 'photo-rejection-finder-pro', title: 'Photo Rejection Reason Finder', category: 'image', description: 'Audit your photo for face-size and background errors.', keywords: ['photo', 'face', 'reject'], toolType: 'client' },
  { slug: 'signature-upload-fix-tool-pro', title: 'Signature Upload Fix Tool', category: 'image', description: 'Prepare high-contrast signatures for form uploads.', keywords: ['signature', 'fix', 'white'], toolType: 'client' },
  { slug: 'pan-aadhaar-image-validator-pro', title: 'PAN / Aadhaar Image Validator', category: 'image', description: 'Check if your ID scan is clear enough for KYC approval.', keywords: ['pan', 'aadhaar', 'kyc'], toolType: 'client' },
  { slug: 'dob-error-solver-pro', title: 'DOB Error Solver', category: 'calculators', description: 'Verify eligibility based on exact cut-off dates.', keywords: ['dob', 'age', 'eligibility'], toolType: 'client' },
  { slug: 'application-status-decoder-pro', title: 'Application Status Meaning Decoder', category: 'utility', description: 'Understand "Under Scrutiny" and other portal statuses.', keywords: ['status', 'scrutiny', 'meaning'], toolType: 'ai' },
  { slug: 'wrong-format-error-translator-pro', title: '“Wrong Format” Error Translator', category: 'utility', description: 'Decode MIME errors and fix binary mismatches.', keywords: ['mime', 'format', 'error'], toolType: 'client' },

  // --- 💼 JOB & CAREER PAIN TOOLS (MEGA EXPANSION) ---
  { slug: 'resume-rejection-analyzer-pro', title: 'Resume Rejection Reason Analyzer', category: 'office', description: 'Detailed audit of your resume against ATS filters.', keywords: ['resume', 'reject', 'career'], toolType: 'ai' },
  { slug: 'ats-keyword-gap-finder-pro', title: 'ATS Keyword Gap Finder', category: 'office', description: 'Find missing keywords by comparing JD with your resume.', keywords: ['ats', 'keywords', 'match'], toolType: 'ai' },
  { slug: 'resume-format-compatibility-pro', title: 'Resume Format Compatibility Checker', category: 'office', description: 'Audit your resume layout for ATS safety.', keywords: ['resume', 'format', 'ats'], toolType: 'client' },
  { slug: 'jd-vs-resume-match-pro', title: 'JD vs Resume Match %', category: 'office', description: 'Calculate a relevancy score for a specific job application.', keywords: ['jd', 'match', 'score'], toolType: 'ai' },
  { slug: 'notice-period-calculator-pro', title: 'Notice Period Eligibility Calculator', category: 'calculators', description: 'Calculate last working days and buyout costs.', keywords: ['notice', 'career', 'hr'], toolType: 'client' },
  { slug: 'gap-explanation-generator-pro', title: 'Gap Explanation Generator', category: 'ai', description: 'Generate professional reasons for employment gaps.', keywords: ['career', 'gap', 'ai'], toolType: 'ai' },
  { slug: 'cover-letter-length-optimizer-pro', title: 'Cover Letter Length Optimizer', category: 'ai', description: 'Optimize letter length for specific industries.', keywords: ['cover letter', 'job', 'ai'], toolType: 'ai' },

  // --- 🏠 DAILY LIFE ANALYZER (MEGA EXPANSION) ---
  { slug: 'internet-speed-issue-analyzer-pro', title: 'Internet Speed Issue Analyzer', category: 'network', description: 'Diagnose why 100Mbps feels slow on your device.', keywords: ['internet', 'slow', 'fix'], toolType: 'ai' },
  { slug: 'upload-vs-download-time-pro', title: 'Upload vs Download Time Explainer', category: 'network', description: 'Why is uploading so much slower than downloading?', keywords: ['upload', 'download', 'speed'], toolType: 'ai' },
  { slug: 'app-install-failure-analyzer-pro', title: 'App Install Failure Analyzer', category: 'utility', description: 'Diagnose "App Not Installed" or compatibility errors.', keywords: ['app', 'install', 'error'], toolType: 'ai' },
  { slug: 'file-corruption-probability-pro', title: 'File Corruption Probability Checker', category: 'file', description: 'Predict probability of data loss during transfer.', keywords: ['corruption', 'file', 'data'], toolType: 'ai' },
  { slug: 'otp-not-coming-analyzer-pro', title: 'OTP Not Coming Analyzer', category: 'network', description: 'Audit your device settings to fix OTP delivery issues.', keywords: ['otp', 'sms', 'blocked'], toolType: 'ai' },
  { slug: 'email-bounce-decoder-pro', title: 'Email Bounce Decoder', category: 'utility', description: 'Translate "SMTP 550" and other bounce errors.', keywords: ['email', 'bounce', 'error'], toolType: 'ai' },
  { slug: 'print-looks-different-tool-pro', title: 'Print Looks Different Tool', category: 'image', description: 'Why your print colors don\'t match your screen.', keywords: ['print', 'color', 'match'], toolType: 'ai' },
  { slug: 'website-looks-different-mobile-pro', title: 'Website Looks Different on Mobile Analyzer', category: 'dev', description: 'Debug responsive layout issues instantly.', keywords: ['mobile', 'responsive', 'debug'], toolType: 'ai' }
];
