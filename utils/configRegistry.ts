
import { 
  salaryCalculatorConfig, roiCalculatorConfig, inflationCalculatorConfig,
  ageCalculatorConfig, emiCalculatorConfig, emiHighExplainerConfig
} from '../config/calculatorTools';

import {
  charCounterConfig, wordCounterConfig, caseConverterConfig,
  dateDiffConfig, fileSizeConfig, uuidGeneratorConfig,
  qrCodeConfig, urlEncoderConfig, passwordStrengthConfig,
  workingDaysConfig
} from '../config/utilityTools';

import {
  csvToExcelConfig, excelDataCleanerConfig, dataDeduplicationConfig,
  csvViewerConfig, csvToJsonConfig, jsonToCsvConfig, excelViewerConfig
} from '../config/dataTools';

import {
  fileFormatConverterConfig, zipExtractorConfig, zipCreatorConfig,
  fileConverterConfig, fileCompressorConfig
} from '../config/fileTools';

import {
  textToDocxConfig, docxMetadataConfig, resumeBuilderConfig,
  invoiceGeneratorConfig, resumeRejectionAnalyzerConfig
} from '../config/officeTools';

import {
  jsonValidatorConfig, jsonFormatterConfig, htmlCssFormatterConfig
} from '../config/devTools';

import {
  seoTitleCheckerConfig, seoMetaCheckerConfig, serpPreviewToolConfig,
  internalLinkGeneratorConfig, keywordDifficultyConfig, keywordDensityConfig,
  robotsTxtConfig, xmlSitemapConfig, faqSchemaConfig, breadcrumbSchemaConfig
} from '../config/seoTools';

import {
  aiArticleGeneratorConfig, aiRewriterConfig, aiGrammarConfig,
  aiEmailGeneratorConfig, aiResumeWriterConfig, aiYoutubeScriptConfig
} from '../config/aiTools';

import {
  imageSizeReducerKbSelectorConfig, imageDpiCheckerNewConfig, imageCompressorQcConfig,
  imageFormatNewConfig, imageMetadataViewerNewConfig, imageKbReducerConfig,
  passportPhotoConfig, imageToWebpConfig, imageDpiConfig, imageCompressorConfig,
  imageFormatConverterConfig, imageMetadataViewerConfig, dpiMythBreakerConfig,
  mobileCameraAdvisorConfig, backgroundPredictorConfig, cameraVsScreenshotConfig,
  photoClarityConfig, printVsScreenConfig, socialCompressionPreviewConfig,
  stretchingPredictorConfig, pixelToKbConfig, blurSimulatorConfig,
  signatureFixerConfig, imageAuthenticityConfig, formImageFixerConfig,
  imageUploadFailureConfig, imageMetadataRemoverConfig, backgroundRemoverNonAIConfig
} from '../config/imageTools';

import {
  pdfToJpgConfig, jpgToPdfConfig, pdfWatermarkConfig, pdfSplitterConfig,
  pdfCompressorConfig, pdfMergerConfig, pdfProtectConfig, pdfUnlockConfig,
  pdfMetadataConfig, pdfOpeningCheckerConfig, pdfCompatibilityConfig,
  scannedPdfReadabilityConfig, pdfSizeIncreaseExplainerConfig,
  pdfPrintCutoffConfig, pdfFontErrorDecoderConfig, pdfBwPreviewConfig,
  pdfUploadTimeConfig, pdfOcrConfig, excelToPdfConfig
} from '../config/pdfTools';

import {
  instagramHashtagAnalyzerConfig, reelHookGeneratorConfig, youtubeIdeaGeneratorConfig,
  viralCaptionFormatterConfig, socialBioFormatterConfig, youtubeTitleGeneratorConfig,
  youtubeDescriptionGeneratorConfig, instagramCaptionGeneratorConfig,
  commentReplyGeneratorConfig, generalHashtagGeneratorConfig
} from '../config/socialTools';

import {
  ipLookupConfig, dnsLookupConfig, sslCheckerConfig, uaParserConfig,
  portCheckerConfig, headerCheckerConfig, urlSafetyConfig, internetSpeedTestConfig,
  emailHeaderAnalyzerConfig, ipInfoOfflineConfig
} from '../config/networkTools';

export const TOOL_CONFIG_REGISTRY: Record<string, any> = {
  // 🖼️ Image Cluster
  'image-size-reducer-kb-selector': imageSizeReducerKbSelectorConfig,
  'image-format-converter-generic': imageFormatNewConfig,
  'image-metadata-viewer-lite': imageMetadataViewerNewConfig,
  'image-print-size-calculator': { title: "Print Size Calc", icon: "🖨️", colorClass: "bg-emerald-600", options: [{ id: "dpi", type: "select", label: "DPI", values: [72, 150, 300], default: 300 }] },
  'image-authenticity-analyzer': imageAuthenticityConfig,
  'image-upload-failure-debugger': imageUploadFailureConfig,
  'form-image-auto-fixer': formImageFixerConfig,
  'image-dpi-myth-breaker': dpiMythBreakerConfig,
  'image-stretching-predictor': stretchingPredictorConfig,
  'pixel-to-kb-calculator': pixelToKbConfig,
  'camera-vs-screenshot-quality': cameraVsScreenshotConfig,
  'mobile-camera-setting-advisor': mobileCameraAdvisorConfig,
  'background-rejection-predictor': backgroundPredictorConfig,
  'image-blurry-after-upload-simulator': blurSimulatorConfig,
  'image-compressor': imageCompressorConfig,
  'image-to-webp': imageToWebpConfig,
  'passport-size-photo-maker': passportPhotoConfig,

  // 📄 PDF Cluster
  'jpg-to-pdf-converter-pro': jpgToPdfConfig,
  'pdf-size-reducer-mb-target': pdfCompressorConfig,
  'pdf-compare-tool-pro': { title: "PDF Compare", icon: "⚖️", colorClass: "bg-red-700", options: [] },
  'pdf-compliance-checker': { title: "PDF Compliance", icon: "✅", colorClass: "bg-red-600", options: [] },
  'pdf-page-extractor-standalone': pdfSplitterConfig,
  'pdf-compatibility-analyzer': pdfCompatibilityConfig,
  'pdf-upload-time-estimator': pdfUploadTimeConfig,
  'pdf-print-cutoff-predictor': pdfPrintCutoffConfig,
  'font-not-supported-decoder': pdfFontErrorDecoderConfig,
  'pdf-bw-print-preview': pdfBwPreviewConfig,
  'pdf-merger': pdfMergerConfig,
  'pdf-ocr-tool': pdfOcrConfig,

  // 🔢 Calculators
  'simple-interest-calculator-pro': { title: "Simple Interest", icon: "🔢", colorClass: "bg-orange-500", options: [{ id: "p", type: "number", label: "Principal", default: 100000 }, { id: "r", type: "number", label: "Rate %", default: 8 }, { id: "t", type: "number", label: "Time (Y)", default: 1 }] },
  'compound-interest-calculator-pro': { title: "Compound Interest", icon: "💎", colorClass: "bg-indigo-700", options: [{ id: "p", type: "number", label: "Principal", default: 100000 }, { id: "r", type: "number", label: "Rate %", default: 12 }, { id: "t", type: "number", label: "Time (Y)", default: 10 }] },
  'loan-calculator-standard': emiCalculatorConfig,
  'date-difference-calculator-pro': dateDiffConfig,
  'age-difference-calculator-pro': { title: "Age Difference", icon: "📅", colorClass: "bg-orange-600", options: [] },
  'working-days-calculator-pro': workingDaysConfig,
  'time-duration-calculator-pro': { title: "Time Duration", icon: "⏲️", colorClass: "bg-slate-600", options: [] },
  'event-countdown-timer-generator': { title: "Countdown Gen", icon: "⏳", colorClass: "bg-indigo-500", options: [] },

  // 🛠️ Utility
  'word-counter-pro': wordCounterConfig,
  'text-case-converter-pro': caseConverterConfig,
  'file-size-converter-pro': fileSizeConfig,
  'qr-code-generator-pro': qrCodeConfig,
  'random-password-generator-pro': { title: "Password Gen", icon: "🔐", colorClass: "bg-indigo-600", options: [{ id: "len", type: "slider", label: "Length", min: 8, max: 64, default: 16 }] },
  'document-upload-readiness-pro': { title: "Upload Readiness", icon: "✅", colorClass: "bg-blue-600", options: [] },
  'device-compatibility-checker-pro': { title: "Device Compat", icon: "💻", colorClass: "bg-slate-700", options: [] },

  // 📱 Social
  'youtube-video-idea-generator-pro': youtubeIdeaGeneratorConfig,
  'youtube-description-generator-pro': youtubeDescriptionGeneratorConfig,
  'instagram-caption-generator-pro': instagramCaptionGeneratorConfig,
  'comment-reply-generator-pro': commentReplyGeneratorConfig,
  'hashtag-generator-pro': generalHashtagGeneratorConfig,
  'social-media-bio-formatter-pro': socialBioFormatterConfig,

  // 🔍 SEO
  'meta-description-length-checker-pro': seoMetaCheckerConfig,
  'serp-snippet-preview-tool-pro': serpPreviewToolConfig,
  'internal-link-generator-pro': internalLinkGeneratorConfig,
  'keyword-difficulty-checker-pro': keywordDifficultyConfig,
  'breadcrumb-schema-generator-pro': breadcrumbSchemaConfig,

  // 🌐 Network
  'ssl-expiry-checker-pro': sslCheckerConfig,
  'http-header-checker-pro': headerCheckerConfig,
  'url-safety-checker-pro': urlSafetyConfig,
  'hash-identifier-pro': { title: "Hash Identifier", icon: "🔎", colorClass: "bg-slate-700", options: [] },
  'email-header-analyzer-pro': { title: "Email Header", icon: "📨", colorClass: "bg-cyan-800", options: [] },
  'ip-address-info-tool-pro': ipInfoOfflineConfig,

  // 📊 Data & Office
  'json-validator-pro': jsonValidatorConfig,
  'file-format-converter-pro': fileFormatConverterConfig,
  'csv-cleaner-tool-pro': { title: "CSV Cleaner", icon: "🧹", colorClass: "bg-cyan-600", options: [] },
  'excel-to-pdf-converter-pro': excelToPdfConfig,
  'docx-metadata-viewer-pro': docxMetadataConfig,

  // 📜 Govt & Pain Points
  'why-upload-rejected-analyzer-pro': { title: "Rejection Analyzer", icon: "🚫", colorClass: "bg-rose-600", options: [] },
  'govt-form-rule-decoder-pro': { title: "Rule Decoder", icon: "📜", colorClass: "bg-indigo-700", options: [] },
  'photo-rejection-finder-pro': { title: "Photo Reject Finder", icon: "📸", colorClass: "bg-rose-500", options: [] },
  'signature-upload-fix-tool-pro': { title: "Signature Fixer", icon: "🖋️", colorClass: "bg-indigo-600", options: [] },
  'pan-aadhaar-image-validator-pro': { title: "ID Validator", icon: "🆔", colorClass: "bg-indigo-500", options: [] },
  'dob-error-solver-pro': { title: "DOB Solver", icon: "📅", colorClass: "bg-emerald-500", options: [] },
  'application-status-decoder-pro': { title: "Status Decoder", icon: "📄", colorClass: "bg-indigo-600", options: [] },
  'wrong-format-error-translator-pro': { title: "Format Translator", icon: "🔁", colorClass: "bg-rose-600", options: [] },

  // 💼 Career
  'resume-rejection-analyzer-pro': resumeRejectionAnalyzerConfig,
  'ats-keyword-gap-finder-pro': { title: "ATS Gap Finder", icon: "🔍", colorClass: "bg-indigo-700", options: [] },
  'resume-format-compatibility-pro': { title: "Format Compat", icon: "📋", colorClass: "bg-indigo-500", options: [] },
  'jd-vs-resume-match-pro': { title: "Resume Match %", icon: "🎯", colorClass: "bg-indigo-600", options: [] },
  'notice-period-calculator-pro': { title: "Notice Period", icon: "📅", colorClass: "bg-indigo-900", options: [] },
  'gap-explanation-generator-pro': { title: "Gap Explainer", icon: "🛠️", colorClass: "bg-indigo-700", options: [] },
  'cover-letter-length-optimizer-pro': { title: "Cover Letter Opt", icon: "✉️", colorClass: "bg-indigo-600", options: [] },

  // 🏠 Daily Life Analyzers
  'internet-speed-issue-analyzer-pro': { title: "Speed Analyzer", icon: "🚀", colorClass: "bg-cyan-600", options: [{id: "planSpeed", type: "number", label: "Plan Speed (Mbps)", default: 100}] },
  'upload-vs-download-time-pro': { title: "Upload vs Download Explainer", icon: "⏳", colorClass: "bg-indigo-500", options: [] },
  'app-install-failure-analyzer-pro': { title: "App Install Failure Analyzer", icon: "📲", colorClass: "bg-indigo-700", options: [{id: "os", type: "select", label: "Mobile OS", values: ["Android", "iOS"], default: "Android"}] },
  'file-corruption-probability-pro': { title: "File Corruption Checker", icon: "❌", colorClass: "bg-indigo-800", options: [] },
  'otp-not-coming-analyzer-pro': { title: "OTP Not Coming Analyzer", icon: "💬", colorClass: "bg-indigo-900", options: [] },
  'email-bounce-decoder-pro': { title: "Email Bounce Decoder", icon: "📨", colorClass: "bg-indigo-400", options: [] },
  'print-looks-different-tool-pro': { title: "Print Difference Analyzer", icon: "🖨️", colorClass: "bg-rose-500", options: [] },
  'website-looks-different-mobile-pro': { title: "Mobile Viewport Debugger", icon: "📱", colorClass: "bg-indigo-600", options: [] },
};

export const getToolConfig = (slug: string) => {
  return TOOL_CONFIG_REGISTRY[slug] || {
    title: slug.replace(/-/g, ' '),
    icon: "🛠️",
    description: "Diagnostic logic node initialized.",
    colorClass: "bg-indigo-600",
    options: []
  };
};
