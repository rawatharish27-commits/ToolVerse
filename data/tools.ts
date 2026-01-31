
import { Tool } from '../types';

export const TOOLS: Tool[] = [
  // 1-10: Diagnostics & Connectivity
  { slug: 'otp-delay-probability-calculator', title: 'OTP Delay Probability Calculator', category: 'connectivity', description: 'Estimate OTP arrival probability based on real-time network load and carrier type.', keywords: ['otp', 'sms', 'network delay'], icon: '🌐', priority: 95 },
  { slug: 'govt-form-auto-fill-failure-analyzer', title: 'Govt Form Auto-Fill Failure Analyzer', category: 'platform-conflicts', description: 'Diagnose why browser autofill fails on specific government portals.', keywords: ['autofill', 'ssc', 'upsc'], icon: '🏛️', priority: 95 },
  { slug: 'upload-rejected-even-after-correct-size-explainer', title: 'Upload Rejected After Correct Size Explainer', category: 'upload-rejection', description: 'Find hidden binary reasons for portal rejection despite matching size rules.', keywords: ['rejected', 'file size'], icon: '📤', priority: 90 },
  { slug: 'pdf-accepted-on-one-portal-but-rejected-on-another-analyzer', title: 'PDF Cross-Portal Compatibility Analyzer', category: 'pdf-diagnostics', description: 'Analyze binary headers for version mismatches across different portals.', keywords: ['pdf', 'compatibility'], icon: '📄', priority: 85 },
  { slug: 'resume-looks-correct-but-ats-rejects-explainer', title: 'Resume ATS Rejection Explainer', category: 'career-diagnostics', description: 'Identify structural parsing errors in resumes that bypass recruiter eyes.', keywords: ['ats', 'resume'], icon: '🚀', priority: 95 },
  { slug: 'image-accepted-on-mobile-but-rejected-on-desktop-analyzer', title: 'Mobile vs Desktop Image Acceptance Analyzer', category: 'media-acceptance', description: 'Identify resolution and EXIF mismatches between platforms.', keywords: ['image', 'mobile'], icon: '🖼️', priority: 80 },
  { slug: 'browser-vs-app-result-difference-analyzer', title: 'Browser vs App Result Difference Analyzer', category: 'platform-conflicts', description: 'Debug why features work in the app but fail in the browser.', keywords: ['browser', 'app'], icon: '💻', priority: 75 },
  { slug: 'why-file-size-increases-after-compression-tool', title: 'Why File Size Increases After Compression Tool', category: 'upload-rejection', description: 'Analyze why compression sometimes inflates file size.', keywords: ['compress', 'size'], icon: '📉', priority: 60 },
  { slug: 'pdf-text-visible-but-not-searchable-explainer', title: 'PDF Text Visible but Not Searchable Explainer', category: 'pdf-diagnostics', description: 'Identify font-to-pixel mapping errors in digital documents.', keywords: ['pdf', 'ocr'], icon: '🔎', priority: 65 },
  { slug: 'govt-website-peak-time-failure-predictor', title: 'Govt Website Peak-Time Failure Predictor', category: 'connectivity', description: 'Predict server downtime based on historic traffic cycles.', keywords: ['ssc', 'upsc', 'lag'], icon: '⚡', priority: 88 },
  
  // 11-20: Quality & Layout
  { slug: 'image-dpi-vs-printer-acceptance-predictor', title: 'Image DPI vs Printer Acceptance Predictor', category: 'media-acceptance', description: 'Verify if your DPI matches physical printing requirements.', keywords: ['dpi', 'print'], icon: '🖨️' },
  { slug: 'file-name-rejection-cause-finder', title: 'File Name Rejection Cause Finder', category: 'upload-rejection', description: 'Detect forbidden characters causing silent upload drops.', keywords: ['filename'], icon: '📛' },
  { slug: 'zip-upload-rejection-analyzer', title: 'ZIP Upload Rejection Analyzer', category: 'upload-rejection', description: 'Find internal file conflicts causing archive rejection.', keywords: ['zip', 'error'], icon: '📦' },
  { slug: 'email-attachment-block-reason-analyzer', title: 'Email Attachment Block Reason Analyzer', category: 'email-comms', description: 'Identify why providers block specific attachments.', keywords: ['email', 'block'], icon: '📧' },
  { slug: 'resume-keyword-over-optimization-detector', title: 'Resume Keyword Over-Optimization Detector', category: 'career-diagnostics', description: 'Detect "keyword stuffing" flags in modern hiring bots.', keywords: ['ats', 'resume'], icon: '🔍' },
  { slug: 'image-auto-rotation-mismatch-detector', title: 'Image Auto-Rotation Mismatch Detector', category: 'media-acceptance', description: 'Fix images that turn sideways after portal upload.', keywords: ['rotation', 'exif'], icon: '🔄' },
  { slug: 'pdf-font-embedding-risk-analyzer', title: 'PDF Font Embedding Risk Analyzer', category: 'pdf-diagnostics', description: 'Check if fonts will break on the receiver system.', keywords: ['pdf', 'fonts'], icon: '🔤' },
  { slug: 'scanner-vs-mobile-scan-acceptance-analyzer', title: 'Scanner vs Mobile Scan Acceptance Analyzer', category: 'media-acceptance', description: 'Audit mobile scans for document compliance.', keywords: ['scan'], icon: '📱' },
  { slug: 'form-field-dependency-error-visualizer', title: 'Form Field Dependency Error Visualizer', category: 'ux-performance', description: 'Understand which fields are blocking your form submission.', keywords: ['form'], icon: '🧩' },
  { slug: 'upload-retry-success-probability-tool', title: 'Upload Retry Success Probability Tool', category: 'connectivity', description: 'Calculate if retrying will work now or fail.', keywords: ['upload', 'retry'], icon: '🔃' },

  // Finance Cluster
  { slug: 'emi-actual-vs-advertised-difference-calculator', title: 'EMI Actual vs Advertised Difference Calculator', category: 'finance-analysis', description: 'Check real interest rates hidden in flat-rate quotes.', keywords: ['emi', 'interest'], icon: '📊', priority: 98 },
  { slug: 'subscription-hidden-charge-discovery-tool', title: 'Subscription Hidden Charge Discovery Tool', category: 'finance-analysis', description: 'Audit billing terms for hidden fees and traps.', keywords: ['finance', 'billing'], icon: '💳' },
  { slug: 'auto-renew-trap-analyzer', title: 'Auto-Renew Trap Analyzer', category: 'finance-analysis', description: 'Identify predatory auto-renewal policies in apps.', keywords: ['billing', 'trap'], icon: '🕸️' },
  { slug: 'offer-price-truth-analyzer', title: 'Offer Price Truth Analyzer', category: 'finance-analysis', description: 'Calculate final price after hidden taxes and handling fees.', keywords: ['price', 'gst'], icon: '🏷️' },
  { slug: 'refund-delay-reason-predictor', title: 'Refund Delay Reason Predictor', category: 'finance-analysis', description: 'Analyze bank cycles to predict when your money returns.', keywords: ['refund', 'bank'], icon: '⏳' },
  { slug: 'payment-gateway-failure-cause-analyzer', title: 'Payment Gateway Failure Cause Analyzer', category: 'finance-analysis', description: 'Diagnose specific failure codes at checkout.', keywords: ['payment', 'failed'], icon: '❌' },
  { slug: 'bank-interest-vs-effective-interest-explainer', title: 'Bank Interest vs Effective Interest Explainer', category: 'finance-analysis', description: 'Understand how compounding affects your real rate.', keywords: ['interest'], icon: '🏦' },
  { slug: 'wallet-vs-bank-payment-difference-tool', title: 'Wallet vs Bank Payment Difference Tool', category: 'finance-analysis', description: 'Compare speed and safety between payment methods.', keywords: ['payment', 'upi'], icon: '👛' },
  { slug: 'transaction-reversal-probability-tool', title: 'Transaction Reversal Probability Tool', category: 'finance-analysis', description: 'Estimate chance of automatic transaction reversal.', keywords: ['refund'], icon: '🔄' },
  { slug: 'checkout-drop-off-reason-analyzer', title: 'Checkout Drop-Off Reason Analyzer', category: 'finance-analysis', description: 'Audit your store for checkout friction points.', keywords: ['checkout', 'e-commerce'], icon: '🛒' },

  // Performance & UX Cluster
  { slug: 'feature-missing-on-mobile-explainer', title: 'Website Feature Missing on Mobile Explainer', category: 'ux-performance', description: 'Identify why desktop buttons vanish on smartphones.', keywords: ['mobile', 'ux'], icon: '❓' },
  { slug: 'responsive-layout-breakage-analyzer', title: 'Responsive Layout Breakage Analyzer', category: 'ux-performance', description: 'Detect layout shifts and overflows on mobile screens.', keywords: ['layout'], icon: '📱' },
  { slug: 'browser-extension-conflict-detector', title: 'Browser Extension Conflict Detector', category: 'platform-conflicts', description: 'Check if AdBlock or other extensions break site logic.', keywords: ['extension'], icon: '🧩' },
  { slug: 'ad-blocker-side-effect-analyzer', title: 'Ad-Blocker Side-Effect Analyzer', category: 'platform-conflicts', description: 'Analyze how content blockers break site features.', keywords: ['adblock'], icon: '🚫' },
  { slug: 'cookie-consent-impact-explainer', title: 'Cookie Consent Impact Explainer', category: 'ux-performance', description: 'Understand what features break if you decline cookies.', keywords: ['cookie'], icon: '🍪' },
  { slug: 'third-party-script-load-failure-analyzer', title: 'Third-Party Script Load Failure Analyzer', category: 'connectivity', description: 'Check if external libraries like GA or Stripe failed.', keywords: ['script'], icon: '📜' },
  { slug: 'page-load-vs-interaction-delay-explainer', title: 'Page Load vs Interaction Delay Explainer', category: 'ux-performance', description: 'Analyze why the site looks loaded but buttons are dead.', keywords: ['lag', 'perf'], icon: '⚡' },
  { slug: 'layout-shift-cls-cause-analyzer', title: 'Layout Shift (CLS) Cause Analyzer', category: 'ux-performance', description: 'Find elements causing page jumps after load.', keywords: ['cls', 'ux'], icon: '🦘' },
  { slug: 'user-input-lost-after-submit-analyzer', title: 'User Input Lost After Submit Analyzer', category: 'ux-performance', description: 'Debug why form data vanished after a submission error.', keywords: ['form'], icon: '💾' },
  { slug: 'cross-browser-rendering-difference-simulator', title: 'Cross-Browser Rendering Difference Simulator', category: 'platform-conflicts', description: 'Understand why Safari renders differently than Chrome.', keywords: ['browser', 'engine'], icon: '🌐' }
];
