
import { Tool } from '../types';

/**
 * MANDATORY HIDDEN-DEMAND REGISTRY (Full 50-Tool Audit)
 */
const HIDDEN_DEMAND: Tool[] = [
  { slug: 'form-auto-fill-failure-analyzer', title: 'Form Auto-Fill Failure Reason Analyzer', category: 'utility', description: 'Diagnose why your browser autofill is not working on a specific form.', keywords: ['autofill', 'fix form'], toolType: 'client' },
  { slug: 'pdf-upload-portal-predictor', title: 'PDF Upload vs Portal Acceptance Predictor', category: 'pdf', description: 'Predict if a portal will reject your PDF based on its internal structure.', keywords: ['rejection', 'pdf error'], toolType: 'client' },
  { slug: 'resume-parsing-preview', title: 'Resume Parsing Preview (ATS View)', category: 'career', description: 'See your resume exactly how an automated ATS engine reads it.', keywords: ['ats', 'parser'], toolType: 'client' },
  { slug: 'image-auto-rotation-detector', title: 'Image Auto-Rotation Mismatch Detector', category: 'image', description: 'Fix images that appear sideways or upside down after upload.', keywords: ['rotation', 'exif'], toolType: 'client' },
  { slug: 'screenshot-rejection-explainer', title: 'Screenshot vs Camera Rejection Explainer', category: 'image', description: 'Understand why portals reject screenshots and how to fix them.', keywords: ['screenshot', 'fix'], toolType: 'client' },
  { slug: 'size-increase-after-compression-analyzer', title: 'Why My File Size Increased After Compression', category: 'utility', description: 'Analyze why compression sometimes makes files larger.', keywords: ['compression', 'bloat'], toolType: 'client' },
  { slug: 'browser-app-behavior-analyzer', title: 'Browser vs App Behavior Difference Analyzer', category: 'network', description: 'Fix issues that work on mobile apps but not mobile browsers.', keywords: ['debug', 'browser'], toolType: 'client' },
  { slug: 'otp-delay-probability-calculator', title: 'OTP Delay Probability Calculator', category: 'network', description: 'Estimate OTP wait times based on carrier network traffic.', keywords: ['otp', 'timer'], toolType: 'client' },
  { slug: 'govt-website-peak-time-predictor', title: 'Govt Website Peak-Time Failure Predictor', category: 'government', description: 'Know the best time to upload when servers are not lagging.', keywords: ['ssc', 'upsc', 'server status'], toolType: 'client' },
  { slug: 'pdf-copy-paste-breakage-analyzer', title: 'PDF Text Copy-Paste Breakage Analyzer', category: 'pdf', description: 'Fix corrupted text when copying from a PDF document.', keywords: ['encoding', 'fix pdf'], toolType: 'client' },
  { slug: 'form-field-dependency-visualizer', title: 'Form Field Dependency Visualizer', category: 'utility', description: 'Understand which hidden fields depend on your current input.', keywords: ['form logic'], toolType: 'client' },
  { slug: 'device-upload-result-comparator', title: 'Mobile vs Desktop Upload Result Comparator', category: 'network', description: 'Analyze why uploads fail on mobile but work on PC.', keywords: ['mobile fail'], toolType: 'client' },
  { slug: 'image-dpi-printer-predictor', title: 'Image DPI vs Printer Acceptance Predictor', category: 'image', description: 'Verify if your image DPI is enough for physical printing.', keywords: ['printing', 'dpi'], toolType: 'client' },
  { slug: 'resume-look-after-upload-tool', title: 'Why My Resume Looks Different After Upload', category: 'career', description: 'Diagnose font and layout shifts in recruiter portals.', keywords: ['rendering', 'resume'], toolType: 'client' },
  { slug: 'email-attachment-block-analyzer', title: 'Email Attachment Block Reason Analyzer', category: 'utility', description: 'Find out why your email provider is blocking an attachment.', keywords: ['spam', 'security'], toolType: 'client' },
  { slug: 'video-upload-compression-loss-predictor', title: 'Video Upload Compression Loss Predictor', category: 'miscellaneous', description: 'See how blurry your video will become after platform compression.', keywords: ['video', 'quality'], toolType: 'client' },
  { slug: 'file-name-rejection-cause-finder', title: 'File Name Rejection Cause Finder', category: 'utility', description: 'Check for forbidden symbols or length issues in your filename.', keywords: ['filename', 'invalid'], toolType: 'client' },
  { slug: 'zip-upload-not-accepted-explainer', title: 'ZIP Upload Not Accepted Explainer', category: 'miscellaneous', description: 'Fix ZIP files that portals reject due to internal file types.', keywords: ['zip', 'blocked'], toolType: 'client' },
  { slug: 'browser-cache-impact-analyzer', title: 'Browser Cache Impact Analyzer', category: 'network', description: 'Check if an old cached version is breaking your current session.', keywords: ['cache', 'refresh'], toolType: 'client' },
  { slug: 'portal-file-rule-decoder', title: 'Portal-Specific File Rule Decoder', category: 'government', description: 'Decode cryptic upload rules like "120x150, 4:3, <50KB".', keywords: ['rules', 'decode'], toolType: 'client' },
  { slug: 'internet-works-but-site-doesnt-analyzer', title: 'Why My Internet Works but Site Does not', category: 'network', description: 'Analyze DNS, CDN, or regional ISP blocks for a specific site.', keywords: ['internet', 'dns'], toolType: 'client' },
  { slug: 'govt-pdf-page-cutoff-simulator', title: 'Government PDF Page Cut-Off Simulator', category: 'pdf', description: 'Check if your PDF margins will be cut off by portal viewers.', keywords: ['print', 'cutoff'], toolType: 'client' },
  { slug: 'app-permission-misconfig-detector', title: 'App Permission Misconfiguration Detector', category: 'security', description: 'Debug silent upload failures caused by browser permissions.', keywords: ['permissions'], toolType: 'client' },
  { slug: 'resume-keyword-optimization-detector', title: 'Resume Keyword Over-Optimization Detector', category: 'career', description: 'Check if you are being flagged for "Keyword Stuffing".', keywords: ['ats', 'seo'], toolType: 'client' },
  { slug: 'ai-content-detection-risk-estimator', title: 'AI-Generated Content Detection Risk Estimator', category: 'ai', description: 'Estimate the probability of your content being flagged as AI.', keywords: ['ai detect'], toolType: 'ai' },
  { slug: 'download-corrupted-analyzer', title: 'Why My Download Is Corrupted Analyzer', category: 'utility', description: 'Diagnose bit-loss or network interruption during downloads.', keywords: ['corrupt'], toolType: 'client' },
  { slug: 'aspect-ratio-rejection-predictor', title: 'Image Aspect Ratio Rejection Predictor', category: 'image', description: 'Predict if a portal will reject your photo due to wrong ratio.', keywords: ['aspect ratio'], toolType: 'client' },
  { slug: 'browser-autofill-wrong-data-checker', title: 'Browser Autofill Wrong Data Risk Checker', category: 'utility', description: 'Ensure your browser is not putting wrong data in hidden fields.', keywords: ['autofill'], toolType: 'client' },
  { slug: 'email-spam-trigger-detector', title: 'Email Spam Trigger Word Detector', category: 'utility', description: 'Audit your emails to ensure they don\'t hit the spam folder.', keywords: ['spam', 'filter'], toolType: 'client' },
  { slug: 'upload-retry-success-probability', title: 'Upload Retry Success Probability Tool', category: 'network', description: 'Calculate if retrying now will work or if the server is down.', keywords: ['retry'], toolType: 'client' },
  { slug: 'pdf-layering-issue-explainer', title: 'PDF Layering Issue Explainer', category: 'pdf', description: 'Identify hidden layers making your PDF unreadable to portals.', keywords: ['layers', 'flatten'], toolType: 'client' },
  { slug: 'scanner-vs-mobile-acceptance-analyzer', title: 'Scanner vs Mobile Scan Acceptance Analyzer', category: 'government', description: 'Check if your mobile scan is professional enough for govt forms.', keywords: ['scanner', 'scan'], toolType: 'client' },
  { slug: 'website-feature-missing-on-mobile-explainer', title: 'Website Feature Missing on Mobile Explainer', category: 'network', description: 'Find desktop-only buttons or menus hidden on your phone.', keywords: ['responsive', 'fix'], toolType: 'client' },
  { slug: 'camera-app-setting-conflict-detector', title: 'Camera App Setting Conflict Detector', category: 'image', description: 'Debug why your phone photo is failing portal checks.', keywords: ['settings', 'fix'], toolType: 'client' },
  { slug: 'form-submission-silent-failure-debugger', title: 'Form Submission Silent Failure Debugger', category: 'utility', description: 'Find the hidden validation error stopping your form submit.', keywords: ['debug'], toolType: 'client' },
  { slug: 'system-locale-format-conflict-tool', title: 'System Locale vs Website Format Conflict Tool', category: 'miscellaneous', description: 'Fix errors caused by DD/MM vs MM/DD date conflicts.', keywords: ['locale', 'dates'], toolType: 'client' },
  { slug: 'pdf-readable-not-searchable-analyzer', title: 'Why My PDF Is Readable but Not Searchable', category: 'pdf', description: 'Analyze font-to-pixel mapping in your documents.', keywords: ['ocr', 'search'], toolType: 'client' },
  { slug: 'resume-section-ordering-analyzer', title: 'Resume Section Ordering Impact Analyzer', category: 'career', description: 'Calculate how ordering affects your ATS relevance score.', keywords: ['resume'], toolType: 'client' },
  { slug: 'file-integrity-whatsapp-share-analyzer', title: 'File Integrity Loss After WhatsApp Share Analyzer', category: 'miscellaneous', description: 'Check if sharing on WhatsApp ruined your file headers.', keywords: ['whatsapp', 'loss'], toolType: 'client' },
  { slug: 'image-transparency-rejection-predictor', title: 'Image Transparency Rejection Predictor', category: 'image', description: 'Identify if hidden transparency will cause portal errors.', keywords: ['png', 'alpha'], toolType: 'client' },
  { slug: 'browser-extension-conflict-detector', title: 'Browser Extension Conflict Detector', category: 'network', description: 'Find out if AdBlock or Dark Mode is breaking the website.', keywords: ['extension', 'bug'], toolType: 'client' },
  { slug: 'pdf-font-embedding-risk-analyzer', title: 'PDF Font Embedding Risk Analyzer', category: 'pdf', description: 'Verify if your fonts will display correctly on government servers.', keywords: ['fonts', 'pdf'], toolType: 'client' },
  { slug: 'timezone-mismatch-error-predictor', title: 'Timezone Mismatch Error Predictor', category: 'miscellaneous', description: 'Check if you are missing a deadline due to timezone shifts.', keywords: ['timezone'], toolType: 'client' },
  { slug: 'file-re-upload-acceptance-probability', title: 'File Re-Upload Acceptance Probability Calculator', category: 'government', description: 'Estimate success based on how many times you have retried.', keywords: ['re-upload'], toolType: 'client' },
  { slug: 'print-vs-screen-mismatch-explainer', title: 'Print Output vs Screen Preview Mismatch Explainer', category: 'miscellaneous', description: 'Understand why printed documents look different from your screen.', keywords: ['print'], toolType: 'client' },
  { slug: 'form-data-reset-after-submit-analyzer', title: 'Why My Form Data Reset After Submit Analyzer', category: 'utility', description: 'Identify session-loss bugs causing forms to clear silently.', keywords: ['session', 'reset'], toolType: 'client' },
  { slug: 'mobile-data-saver-impact-analyzer', title: 'Mobile Data Saver Impact Analyzer', category: 'network', description: 'Debug image/video corruption caused by "Data Saver" mode.', keywords: ['data saver'], toolType: 'client' },
  { slug: 'pdf-security-flag-issue-detector', title: 'PDF Security Flag Hidden Issue Detector', category: 'pdf', description: 'Identify hidden encryption flags that block portal access.', keywords: ['security', 'lock'], toolType: 'client' },
  { slug: 'image-color-space-rejection-analyzer', title: 'Image Color Space Rejection Analyzer', category: 'image', description: 'Check if CMYK vs RGB is causing your upload failure.', keywords: ['color', 'rgb'], toolType: 'client' },
  { slug: 'website-session-timeout-explainer', title: 'Website Session Timeout Behavior Explainer', category: 'network', description: 'Predict when a portal will kick you out based on inactivity.', keywords: ['timeout'], toolType: 'client' }
];

export const TOOLS: Tool[] = [
  ...HIDDEN_DEMAND,
  { slug: 'image-size-reducer-kb', title: 'Reduce Photo KB', category: 'image', description: 'Compress photos to exact 20kb or 50kb target.', keywords: ['20kb', '50kb'], toolType: 'client', priority: 100 },
  { slug: 'salary-calculator', title: 'In-Hand Salary Calculator', category: 'calculators', description: 'FY 24-25 Tax slabs for Indian professionals.', keywords: ['tax', 'ctc'], toolType: 'client', priority: 95 },
  // ... rest of the existing tools
];
