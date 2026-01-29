
import { Tool } from '../types';

/**
 * TOOLVERSE MASTER REGISTRY v15.0
 * 100% Problem-Centric Diagnostic Nodes
 */
export const TOOLS: Tool[] = [
  // 1-10: Portal Diagnostics
  { slug: 'govt-form-auto-fill-failure-analyzer', title: 'Govt Form Auto-Fill Failure Analyzer', category: 'utility', description: 'Diagnose why browser autofill fails on specific government portal inputs.', keywords: ['autofill fix', 'form error', 'ssc form'], toolType: 'client' },
  { slug: 'upload-rejected-even-after-correct-size-explainer', title: 'Upload Rejected Even After Correct Size Explainer', category: 'government', description: 'Find the hidden reason why your file is rejected despite meeting size rules.', keywords: ['rejected', 'upload', 'ssc photo'], toolType: 'client' },
  { slug: 'pdf-accepted-on-one-portal-but-rejected-on-another-analyzer', title: 'PDF Cross-Portal Rejection Analyzer', category: 'pdf', description: 'Analyze why a PDF works on one site but fails on another.', keywords: ['pdf', 'compatibility', 'upload error'], toolType: 'client' },
  { slug: 'resume-looks-correct-but-ats-rejects-explainer', title: 'Resume ATS Rejection Explainer', category: 'career', description: 'Identify structural errors making resumes unreadable to Applicant Tracking Systems.', keywords: ['ats', 'resume', 'cv fix'], toolType: 'client' },
  { slug: 'image-accepted-on-mobile-but-rejected-on-desktop-analyzer', title: 'Mobile vs Desktop Image Acceptance Analyzer', category: 'image', description: 'Diagnose resolution or metadata mismatches between device platforms.', keywords: ['mobile', 'desktop', 'upload'], toolType: 'client' },
  // Fix: Changed toolType from 'network' to 'client' to match ToolType definition in types.ts
  { slug: 'otp-delay-probability-calculator', title: 'OTP Delay Probability Calculator', category: 'network', description: 'Estimate OTP wait times based on carrier network traffic.', keywords: ['otp', 'sms', 'carrier delay'], toolType: 'client' },
  { slug: 'browser-vs-app-result-difference-analyzer', title: 'Browser vs App Result Difference Analyzer', category: 'network', description: 'Debug functionality gaps between mobile apps and web browsers.', keywords: ['browser', 'app'], toolType: 'client' },
  { slug: 'why-file-size-increases-after-compression-tool', title: 'Why File Size Increases After Compression Explainer', category: 'utility', description: 'Analyze binary headers to see why compression sometimes inflates size.', keywords: ['compress', 'error'], toolType: 'client' },
  { slug: 'pdf-text-visible-but-not-searchable-explainer', title: 'PDF Text Visible but Not Searchable Explainer', category: 'pdf', description: 'Diagnose font-to-pixel mapping errors in digital documents.', keywords: ['pdf', 'ocr'], toolType: 'client' },
  { slug: 'govt-website-peak-time-failure-predictor', title: 'Govt Website Peak-Time Failure Predictor', category: 'government', description: 'Predict server downtime based on historic traffic patterns.', keywords: ['ssc', 'upsc'], toolType: 'client' },

  // 11-20: Technical Audits
  { slug: 'image-dpi-vs-printer-acceptance-predictor', title: 'Image DPI vs Printer Acceptance Predictor', category: 'image', description: 'Verify if your DPI matches physical printing requirements.', keywords: ['dpi', 'print'], toolType: 'client' },
  { slug: 'file-name-rejection-cause-finder', title: 'File Name Rejection Cause Finder', category: 'utility', description: 'Check for forbidden characters or length issues in filenames.', keywords: ['filename', 'invalid'], toolType: 'client' },
  { slug: 'zip-upload-rejection-analyzer', title: 'ZIP Upload Rejection Analyzer', category: 'miscellaneous', description: 'Find internal file conflicts causing ZIP rejection.', keywords: ['zip', 'error'], toolType: 'client' },
  { slug: 'email-attachment-block-reason-analyzer', title: 'Email Attachment Block Reason Analyzer', category: 'utility', description: 'Identify why your provider is blocking specific attachments.', keywords: ['email', 'spam'], toolType: 'client' },
  { slug: 'resume-keyword-over-optimization-detector', title: 'Resume Keyword Over-Optimization Detector', category: 'career', description: 'Detect "Keyword Stuffing" flags in ATS systems.', keywords: ['ats', 'resume'], toolType: 'client' },
  { slug: 'image-auto-rotation-mismatch-detector', title: 'Image Auto-Rotation Mismatch Detector', category: 'image', description: 'Fix images that appear sideways after uploading to portals.', keywords: ['rotation', 'exif'], toolType: 'client' },
  { slug: 'pdf-font-embedding-risk-analyzer', title: 'PDF Font Embedding Risk Analyzer', category: 'pdf', description: 'Check if your fonts will break on the receiver system.', keywords: ['pdf', 'fonts'], toolType: 'client' },
  { slug: 'scanner-vs-mobile-scan-acceptance-analyzer', title: 'Scanner vs Mobile Scan Acceptance Analyzer', category: 'government', description: 'Audit mobile scans for professional document compliance.', keywords: ['scan', 'govt'], toolType: 'client' },
  { slug: 'form-field-dependency-error-visualizer', title: 'Form Field Dependency Error Visualizer', category: 'utility', description: 'Understand which fields are blocking your form submission.', keywords: ['form', 'debug'], toolType: 'client' },
  { slug: 'upload-retry-success-probability-tool', title: 'Upload Retry Success Probability Tool', category: 'network', description: 'Calculate if retrying an upload will actually work.', keywords: ['upload', 'retry'], toolType: 'client' },

  // 21-100: Strategic Utilities (Abridged for brevity, full list registered in routing)
  { slug: 'internet-works-but-website-doesnt-analyzer', title: 'Why My Internet Works but Website Doesn’t', category: 'network', description: 'Diagnose DNS, CDN, or regional ISP blocks.', keywords: ['dns', 'ping'], toolType: 'client' },
  { slug: 'mobile-data-saver-impact-analyzer', title: 'Mobile Data Saver Impact Analyzer', category: 'network', description: 'Check if data saver is ruining your image quality.', keywords: ['data', 'save'], toolType: 'client' },
  { slug: 'browser-cache-side-effect-analyzer', title: 'Browser Cache Side-Effect Analyzer', category: 'network', description: 'Audit how old cache breaks current sessions.', keywords: ['cache', 'refresh'], toolType: 'client' },
  { slug: 'session-timeout-behavior-explainer', title: 'Session Timeout Behavior Explainer', category: 'network', description: 'Predict when a portal will log you out.', keywords: ['timeout', 'session'], toolType: 'client' },
  { slug: 'image-color-space-rejection-analyzer', title: 'Image Color Space Rejection Analyzer', category: 'image', description: 'Check if CMYK vs RGB is causing rejection.', keywords: ['color', 'rgb'], toolType: 'client' },
  { slug: 'aspect-ratio-upload-failure-predictor', title: 'Aspect Ratio Upload Failure Predictor', category: 'image', description: 'Predict rejection based on image shape.', keywords: ['ratio', 'shape'], toolType: 'client' },
  { slug: 'transparency-channel-rejection-detector', title: 'Transparency Channel Rejection Detector', category: 'image', description: 'Identify if alpha channels cause portal errors.', keywords: ['png', 'alpha'], toolType: 'client' },
  { slug: 'govt-pdf-page-cut-off-simulator', title: 'Government PDF Page Cut-Off Simulator', category: 'pdf', description: 'Check if your margins are safe for printing.', keywords: ['pdf', 'margins'], toolType: 'client' },
  { slug: 'pdf-security-flag-hidden-issue-detector', title: 'PDF Security Flag Hidden Issue Detector', category: 'pdf', description: 'Scan for owner passwords or editing locks.', keywords: ['pdf', 'security'], toolType: 'client' },
  { slug: 'print-output-vs-screen-preview-difference-explainer', title: 'Print Output vs Screen Preview Difference Explainer', category: 'miscellaneous', description: 'Understand why prints look different than screens.', keywords: ['print', 'color'], toolType: 'client' },
  { slug: 'resume-parsing-preview-ats', title: 'Resume Parsing Preview (ATS Simulator)', category: 'career', description: 'See your resume exactly as the ATS parser reads it.', keywords: ['ats', 'parser'], toolType: 'client' },
  { slug: 'resume-section-ordering-impact-analyzer', title: 'Resume Section Ordering Impact Analyzer', category: 'career', description: 'Calculate score impact based on section order.', keywords: ['resume', 'order'], toolType: 'client' },
  { slug: 'resume-file-naming-impact-checker', title: 'Resume File Naming Impact Checker', category: 'career', description: 'Check if your filename sounds professional.', keywords: ['resume', 'filename'], toolType: 'client' },
  { slug: 'resume-upload-format-compatibility-analyzer', title: 'Resume Upload Format Compatibility Analyzer', category: 'career', description: 'Check if your layout is parser-safe.', keywords: ['resume', 'layout'], toolType: 'client' },
  { slug: 'ai-generated-content-detection-risk-estimator', title: 'AI-Generated Content Detection Risk Estimator', category: 'ai', description: 'Estimate risk of being flagged by AI detectors.', keywords: ['ai', 'detect'], toolType: 'ai' },
  { slug: 'video-upload-compression-loss-predictor', title: 'Video Upload Compression Loss Predictor', category: 'miscellaneous', description: 'Predict quality loss after upload.', keywords: ['video', 'quality'], toolType: 'client' },
  { slug: 'audio-track-loudness-rejection-analyzer', title: 'Audio Track Loudness Rejection Analyzer', category: 'miscellaneous', description: 'Check LUFS levels for platform compliance.', keywords: ['audio', 'loudness'], toolType: 'client' },
  { slug: 'subtitle-sync-failure-explainer', title: 'Subtitle Sync Failure Explainer', category: 'miscellaneous', description: 'Diagnose why subtitles drift.', keywords: ['subs', 'sync'], toolType: 'client' },
  { slug: 'frame-rate-mismatch-upload-analyzer', title: 'Frame Rate Mismatch Upload Analyzer', category: 'miscellaneous', description: 'Check if 24fps vs 60fps causes upload lag.', keywords: ['fps', 'lag'], toolType: 'client' },
  { slug: 'platform-specific-video-size-rule-decoder', title: 'Platform-Specific Video Size Rule Decoder', category: 'miscellaneous', description: 'Decode rules for Reels/Shorts/TikTok.', keywords: ['reels', 'shorts'], toolType: 'client' },
  { slug: 'image-blurry-after-upload-simulator', title: 'Image Blurry After Upload Simulator', category: 'image', description: 'Preview how blurry your photo will become.', keywords: ['blur', 'simulate'], toolType: 'client' },
  { slug: 'screenshot-vs-camera-image-rejection-explainer', title: 'Screenshot vs Camera Image Rejection Explainer', category: 'image', description: 'Understand why portals reject screenshots.', keywords: ['screenshot', 'govt'], toolType: 'client' },
  { slug: 'photo-background-rejection-predictor', title: 'Photo Background Rejection Predictor', category: 'government', description: 'Predict if background will be rejected.', keywords: ['photo', 'bg'], toolType: 'client' },
  { slug: 'govt-image-auto-crop-failure-analyzer', title: 'Govt Image Auto-Crop Failure Analyzer', category: 'government', description: 'Debug why auto-cropping failed.', keywords: ['photo', 'crop'], toolType: 'client' },
  { slug: 'face-detection-mismatch-analyzer', title: 'Face Detection Mismatch Analyzer', category: 'government', description: 'Find face detection errors in photos.', keywords: ['face', 'photo'], toolType: 'client' },
  { slug: 'shadow-lighting-rejection-predictor', title: 'Shadow / Lighting Rejection Predictor', category: 'government', description: 'Scan for shadows on face.', keywords: ['shadow', 'photo'], toolType: 'client' },
  { slug: 'color-saturation-acceptance-analyzer', title: 'Color Saturation Acceptance Analyzer', category: 'image', description: 'Check if colors are too vibrant for forms.', keywords: ['color', 'govt'], toolType: 'client' },
  { slug: 'print-size-vs-pixel-conflict-explainer', title: 'Print Size vs Pixel Conflict Explainer', category: 'image', description: 'Solve pixel-to-inch conversion errors.', keywords: ['print', 'size'], toolType: 'client' },
  { slug: 'passport-photo-auto-validation-simulator', title: 'Passport Photo Auto-Validation Simulator', category: 'government', description: 'Simulate official validation bot logic.', keywords: ['passport', 'bot'], toolType: 'client' },
  { slug: 'photo-compression-acceptance-predictor', title: 'Photo Compression Acceptance Predictor', category: 'image', description: 'Predict if quality is too low.', keywords: ['compress', 'low'], toolType: 'client' },
  { slug: 'why-downloaded-file-gets-corrupted-analyzer', title: 'Why Downloaded File Gets Corrupted Analyzer', category: 'utility', description: 'Diagnose bit-loss during download.', keywords: ['corrupt', 'fix'], toolType: 'client' },
  { slug: 'file-integrity-loss-after-whatsapp-share-analyzer', title: 'File Integrity Loss After WhatsApp Share Analyzer', category: 'miscellaneous', description: 'Check if WhatsApp compressed your headers.', keywords: ['whatsapp', 'loss'], toolType: 'client' },
  { slug: 'email-spam-trigger-word-detector', title: 'Email Spam Trigger Word Detector', category: 'utility', description: 'Audit email content for spam words.', keywords: ['email', 'spam'], toolType: 'client' },
  { slug: 'email-bounce-reason-decoder', title: 'Email Bounce Reason Decoder', category: 'utility', description: 'Decode SMTP bounce error codes.', keywords: ['email', 'error'], toolType: 'client' },
  { slug: 'attachment-size-vs-provider-limit-analyzer', title: 'Attachment Size vs Provider Limit Analyzer', category: 'utility', description: 'Check GMail/Outlook limits.', keywords: ['email', 'size'], toolType: 'client' },
  { slug: 'domain-email-reputation-risk-checker', title: 'Domain Email Reputation Risk Checker', category: 'utility', description: 'Check if your domain is blacklisted.', keywords: ['domain', 'risk'], toolType: 'client' },
  { slug: 'spf-dkim-misconfiguration-explainer', title: 'SPF/DKIM Misconfiguration Explainer', category: 'utility', description: 'Understand DNS email security.', keywords: ['dns', 'email'], toolType: 'client' },
  { slug: 'email-formatting-breakage-analyzer', title: 'Email Formatting Breakage Analyzer', category: 'utility', description: 'Check why HTML email looks broken.', keywords: ['email', 'html'], toolType: 'client' },
  { slug: 'mobile-mail-app-vs-web-mail-difference-tool', title: 'Mobile Mail App vs Web Mail Difference Tool', category: 'utility', description: 'Debug mobile email rendering.', keywords: ['mobile', 'email'], toolType: 'client' },
  { slug: 'attachment-renaming-impact-analyzer', title: 'Attachment Renaming Impact Analyzer', category: 'utility', description: 'Impact of changing extensions.', keywords: ['file', 'name'], toolType: 'client' },
  { slug: 'network-latency-vs-website-timeout-predictor', title: 'Network Latency vs Website Timeout Predictor', category: 'network', description: 'Predict timeout based on ping.', keywords: ['ping', 'time'], toolType: 'client' },
  { slug: 'isp-routing-issue-analyzer', title: 'ISP Routing Issue Analyzer', category: 'network', description: 'Analyze network hops to target site.', keywords: ['isp', 'route'], toolType: 'client' },
  { slug: 'dns-propagation-delay-explainer', title: 'DNS Propagation Delay Explainer', category: 'network', description: 'Check when your site will be live.', keywords: ['dns', 'time'], toolType: 'client' },
  { slug: 'ssl-valid-but-browser-shows-warning-analyzer', title: 'SSL Valid but Browser Shows Warning Analyzer', category: 'security', description: 'Fix intermediate certificate chain errors.', keywords: ['ssl', 'security'], toolType: 'client' },
  { slug: 'mixed-content-blocking-explainer', title: 'Mixed Content Blocking Explainer', category: 'security', description: 'Identify HTTP images on HTTPS sites.', keywords: ['ssl', 'mixed'], toolType: 'client' },
  { slug: 'vpn-impact-on-website-behavior-analyzer', title: 'VPN Impact on Website Behavior Analyzer', category: 'network', description: 'Check if VPN causes captcha/blocks.', keywords: ['vpn', 'ip'], toolType: 'client' },
  { slug: 'firewall-silent-block-detector', title: 'Firewall Silent Block Detector', category: 'network', description: 'Detect invisible corporate blocks.', keywords: ['firewall', 'block'], toolType: 'client' },
  { slug: 'corporate-network-restriction-explainer', title: 'Corporate Network Restriction Explainer', category: 'network', description: 'Understand office wifi limits.', keywords: ['office', 'wifi'], toolType: 'client' },
  { slug: 'packet-loss-impact-simulator', title: 'Packet Loss Impact Simulator', category: 'network', description: 'Simulate laggy connections.', keywords: ['lag', 'ping'], toolType: 'client' },
  { slug: 'cdn-geo-blocking-explainer', title: 'CDN Geo-Blocking Explainer', category: 'network', description: 'Identify location-based blocks.', keywords: ['geo', 'cdn'], toolType: 'client' },
  { slug: 'why-app-works-but-website-doesnt-analyzer', title: 'Why App Works but Website Doesn’t Analyzer', category: 'network', description: 'Identify API vs Web mismatches.', keywords: ['app', 'web'], toolType: 'client' },
  { slug: 'app-permission-conflict-detector', title: 'App Permission Conflict Detector', category: 'security', description: 'Debug silent permission failures.', keywords: ['permissions', 'os'], toolType: 'client' },
  { slug: 'background-app-restriction-impact-analyzer', title: 'Background App Restriction Impact Analyzer', category: 'miscellaneous', description: 'Check if OS is killing your app.', keywords: ['os', 'battery'], toolType: 'client' },
  { slug: 'os-update-compatibility-issue-explainer', title: 'OS Update Compatibility Issue Explainer', category: 'miscellaneous', description: 'Identify bugs caused by system updates.', keywords: ['os', 'update'], toolType: 'client' },
  { slug: 'timezone-mismatch-error-predictor', title: 'Timezone Mismatch Error Predictor', category: 'miscellaneous', description: 'Check if wrong clock causes errors.', keywords: ['time', 'zone'], toolType: 'client' },
  { slug: 'locale-vs-date-format-conflict-tool', title: 'Locale vs Date Format Conflict Tool', category: 'miscellaneous', description: 'Fix DD/MM vs MM/DD errors.', keywords: ['date', 'format'], toolType: 'client' },
  { slug: 'language-encoding-issue-analyzer', title: 'Language Encoding Issue Analyzer', category: 'miscellaneous', description: 'Fix broken special characters.', keywords: ['utf8', 'chars'], toolType: 'client' },
  { slug: 'regional-compliance-rule-decoder', title: 'Regional Compliance Rule Decoder', category: 'miscellaneous', description: 'Audit region-specific web rules.', keywords: ['compliance', 'geo'], toolType: 'client' },
  { slug: 'device-capability-limitation-analyzer', title: 'Device Capability Limitation Analyzer', category: 'miscellaneous', description: 'Check if phone hardware is enough.', keywords: ['hardware', 'limit'], toolType: 'client' },
  { slug: 'low-end-device-performance-risk-predictor', title: 'Low-End Device Performance Risk Predictor', category: 'miscellaneous', description: 'Predict lag on older phones.', keywords: ['perf', 'device'], toolType: 'client' },
  { slug: 'subscription-hidden-charge-discovery-tool', title: 'Subscription Hidden Charge Discovery Tool', category: 'finance', description: 'Audit billing for hidden fees.', keywords: ['money', 'fees'], toolType: 'client' },
  { slug: 'auto-renew-trap-analyzer', title: 'Auto-Renew Trap Analyzer', category: 'finance', description: 'Find hard-to-cancel traps.', keywords: ['cancel', 'money'], toolType: 'client' },
  { slug: 'emi-actual-vs-advertised-difference-calculator', title: 'EMI Actual vs Advertised Difference Calculator', category: 'finance', description: 'Check real interest rates.', keywords: ['emi', 'loan'], toolType: 'client' },
  { slug: 'offer-price-truth-analyzer', title: 'Offer Price Truth Analyzer', category: 'finance', description: 'Real price after hidden GST/fees.', keywords: ['price', 'truth'], toolType: 'client' },
  { slug: 'refund-delay-reason-predictor', title: 'Refund Delay Reason Predictor', category: 'finance', description: 'Predict when money will return.', keywords: ['refund', 'bank'], toolType: 'client' },
  { slug: 'payment-gateway-failure-cause-analyzer', title: 'Payment Gateway Failure Cause Analyzer', category: 'finance', description: 'Diagnose why pay failed.', keywords: ['payment', 'fail'], toolType: 'client' },
  { slug: 'bank-interest-vs-effective-interest-explainer', title: 'Bank Interest vs Effective Interest Explainer', category: 'finance', description: 'Understand reducing balance math.', keywords: ['bank', 'loan'], toolType: 'client' },
  { slug: 'wallet-vs-bank-payment-difference-tool', title: 'Wallet vs Bank Payment Difference Tool', category: 'finance', description: 'Compare UPI vs Wallet vs Card.', keywords: ['upi', 'card'], toolType: 'client' },
  { slug: 'transaction-reversal-probability-tool', title: 'Transaction Reversal Probability Tool', category: 'finance', description: 'Calculate refund success chance.', keywords: ['refund', 'reversal'], toolType: 'client' },
  { slug: 'checkout-drop-off-reason-analyzer', title: 'Checkout Drop-Off Reason Analyzer', category: 'finance', description: 'Debug e-commerce failures.', keywords: ['buy', 'cart'], toolType: 'client' },
  { slug: 'website-feature-missing-on-mobile-explainer', title: 'Website Feature Missing on Mobile Explainer', category: 'network', description: 'Find buttons hidden on mobile.', keywords: ['mobile', 'hidden'], toolType: 'client' },
  { slug: 'responsive-layout-breakage-analyzer', title: 'Responsive Layout Breakage Analyzer', category: 'network', description: 'Find layout shifts on phones.', keywords: ['ui', 'break'], toolType: 'client' },
  { slug: 'browser-extension-conflict-detector', title: 'Browser Extension Conflict Detector', category: 'network', description: 'Find if AdBlock breaks the site.', keywords: ['extension', 'block'], toolType: 'client' },
  { slug: 'ad-blocker-side-effect-analyzer', title: 'Ad-Blocker Side-Effect Analyzer', category: 'network', description: 'Analyze silent site errors.', keywords: ['adblock', 'error'], toolType: 'client' },
  { slug: 'cookie-consent-impact-explainer', title: 'Cookie Consent Impact Explainer', category: 'utility', description: 'Check if declining cookies breaks site.', keywords: ['cookie', 'logic'], toolType: 'client' },
  { slug: 'third-party-script-load-failure-analyzer', title: 'Third-Party Script Load Failure Analyzer', category: 'network', description: 'Check if scripts like Stripe/GA failed.', keywords: ['script', 'fail'], toolType: 'client' },
  { slug: 'page-load-vs-interaction-delay-explainer', title: 'Page Load vs Interaction Delay Explainer', category: 'network', description: 'Understand why buttons click slow.', keywords: ['fid', 'lag'], toolType: 'client' },
  { slug: 'cls-shift-cause-analyzer', title: 'CLS Shift Cause Analyzer', category: 'network', description: 'Find why page jumps after load.', keywords: ['cls', 'jump'], toolType: 'client' },
  { slug: 'user-input-lost-after-submit-analyzer', title: 'User Input Lost After Submit Analyzer', category: 'utility', description: 'Debug session loss errors.', keywords: ['form', 'lose'], toolType: 'client' },
  { slug: 'cross-browser-rendering-difference-simulator', title: 'Cross-Browser Rendering Difference Simulator', category: 'network', description: 'Why Safari looks different than Chrome.', keywords: ['safari', 'chrome'], toolType: 'client' }
];

export const MASTER_REGISTRY = TOOLS;

export const getAutoCategories = () => {
  const categories = Array.from(new Set(TOOLS.map(t => t.category)));
  return categories.map(cat => ({
    id: cat,
    name: cat.charAt(0).toUpperCase() + cat.slice(1) + ' Tools',
    slug: cat
  }));
};
