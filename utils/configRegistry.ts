import * as Calc from '../config/calculatorTools';
import * as Util from '../config/utilityTools';
import * as Data from '../config/dataTools';
import * as File from '../config/fileTools';
import * as Office from '../config/officeTools';
import * as Dev from '../config/devTools';
import * as SEO from '../config/seoTools';
import * as AI from '../config/aiTools';
import * as Image from '../config/imageTools';
import * as PDF from '../config/pdfTools';
import * as Social from '../config/socialTools';
import * as Net from '../config/networkTools';

export const TOOL_CONFIG_REGISTRY: Record<string, any> = {
  // IMAGE CLUSTER
  'image-size-reducer-kb': Image.imageSizeReducerKbSelectorConfig,
  'image-to-webp-converter': Image.imageToWebpConfig,
  'passport-photo-maker': Image.passportPhotoConfig,
  'image-dpi-checker': Image.imageDpiConfig,
  'image-compressor-smart': Image.imageCompressorConfig,
  'image-format-universal': Image.imageFormatConverterConfig,
  'image-metadata-viewer': Image.imageMetadataViewerConfig,
  'image-metadata-remover': Image.imageMetadataRemoverConfig,
  'image-palette-extractor': Image.imagePaletteExtractorConfig,
  'image-shadow-gen': Image.imageShadowGeneratorConfig,
  'image-perspective-fix': Image.imagePerspectiveConfig,
  'background-remover-native': Image.backgroundRemoverNonAIConfig,
  'image-noise-reducer': Image.imageNoiseReducerConfig,
  'image-print-size-calc': Image.imagePrintSizeConfig,
  'image-authenticity-analyzer': Image.imageAuthenticityConfig,
  'image-upload-debugger': Image.imageUploadFailureConfig,
  'form-image-autofix': Image.formImageFixerConfig,
  'dpi-myth-breaker': Image.dpiMythBreakerConfig,
  'image-stretch-predictor': Image.stretchingPredictorConfig,
  'pixel-to-kb-calc': Image.pixelToKbConfig,
  'camera-vs-screenshot': Image.cameraVsScreenshotConfig,
  'mobile-camera-advisor': Image.mobileCameraAdvisorConfig,
  'bg-rejection-predictor': Image.backgroundPredictorConfig,
  'upload-blur-sim': Image.blurSimulatorConfig,
  'social-compression-preview': Image.socialCompressionPreviewConfig,
  'why-not-clear-analyzer': Image.photoClarityConfig,
  'print-vs-screen-diff': Image.printVsScreenConfig,

  // PDF CLUSTER
  'pdf-to-jpg-pro': PDF.pdfToJpgConfig,
  'jpg-to-pdf-pro': PDF.jpgToPdfConfig,
  'pdf-size-reducer-mb': PDF.pdfCompressorConfig,
  'pdf-watermark-smart': PDF.pdfWatermarkConfig,
  'pdf-merger-heavy': PDF.pdfMergerConfig,
  'pdf-splitter-precise': PDF.pdfSplitterConfig,
  'pdf-protector-aes': PDF.pdfProtectConfig,
  'pdf-unlocker-perm': PDF.pdfUnlockConfig,
  'pdf-metadata-view': PDF.pdfMetadataConfig,
  'pdf-ocr-local': PDF.pdfOcrConfig,
  'pdf-compare-diff': PDF.pdfCompareConfig,
  'pdf-compliance-check': PDF.pdfCompatibilityConfig,
  'pdf-version-analyze': PDF.pdfCompatibilityConfig,
  'pdf-upload-estimator': PDF.pdfUploadTimeConfig,
  'pdf-margin-cutoff': PDF.pdfPrintCutoffConfig,
  'pdf-font-decoder': PDF.pdfFontErrorDecoderConfig,
  'pdf-bw-preview': PDF.pdfBwPreviewConfig,
  'pdf-portal-check': PDF.pdfOpeningCheckerConfig,
  'pdf-selectable-explainer': PDF.pdfTextSelectableConfig,
  'pdf-order-solver': PDF.pdfPageOrderConfig,
  'pdf-readability-test': PDF.scannedPdfReadabilityConfig,

  // CALCULATORS
  'percent-calc': { title: "Percentage", icon: "📊", colorClass: "bg-orange-500", options: [] },
  'si-calc': { title: "Simple Interest", icon: "🔢", colorClass: "bg-orange-500", options: [] },
  'ci-calc': Calc.compoundInterestCalculatorConfig,
  'age-calc': Calc.ageCalculatorConfig,
  'emi-calc-pro': Calc.emiCalculatorConfig,
  'salary-calc-hand': Calc.salaryCalculatorConfig,
  'roi-calc-pro': Calc.roiCalculatorConfig,
  'inflation-calc': Calc.inflationCalculatorConfig,
  'why-emi-high': Calc.emiHighExplainerConfig,
  'actual-interest-analyzer': Calc.interestAnalyzerConfig,
  'offer-price-truth': Calc.offerPriceTruthConfig,
  'refund-diff-explainer': Calc.refundAmountConfig,
  'subscription-trap-ana': Calc.subscriptionTrapConfig,

  // UTILITY CLUSTER
  'word-counter-adv': Util.wordCounterConfig,
  'case-converter-text': Util.caseConverterConfig,
  'pass-strength-audit': Util.passwordStrengthConfig,
  'qr-arch-gen': Util.qrCodeConfig,
  'file-size-transcode': Util.fileSizeConfig,
  'uuid-v4-gen': Util.uuidGeneratorConfig,
  'url-transcoder': Util.urlEncoderConfig,
  'random-pass-node': Util.passwordStrengthConfig,
  'doc-ready-audit': Util.docReadinessConfig,
  'browser-compat-audit': Util.deviceCompatConfig,

  // AI CLUSTER
  'ai-verb-metrics': AI.aiResumeWriterConfig,
  'ai-context-reply': { title: "AI WhatsApp Reply", icon: "💬", colorClass: "bg-indigo-600", options: [] },
  'ai-template-mail': AI.aiEmailGeneratorConfig,
  'ai-para-pro': AI.aiRewriterConfig,
  'ai-condense-node': { title: "AI Summarizer", icon: "📝", colorClass: "bg-indigo-600", options: [] },
  'ai-syntax-fixer': AI.aiGrammarConfig,

  // GOVT CLUSTER
  'why-rej-gov-audit': { title: "Upload Rejection", icon: "🚫", colorClass: "bg-rose-600", options: [] },
  'rule-dec-portal': { title: "Rule Decoder", icon: "📜", colorClass: "bg-indigo-700", options: [] },
  'photo-rej-finder': { title: "Photo Reject", icon: "📸", colorClass: "bg-rose-500", options: [] },
  'sig-fix-govt': { title: "Signature Fix", icon: "🖋️", colorClass: "bg-indigo-600", options: [] },
  'dpi-size-conflict': Util.dpiConflictConfig,
  'status-meaning-dec': Util.statusDecoderConfig,

  // CAREER CLUSTER
  'ats-res-builder': Office.resumeBuilderConfig,
  'rejection-audit-node': Office.resumeRejectionAnalyzerConfig,
  'keyword-gap-res': Office.atsKeywordGapConfig,
  'layout-compat-check': Office.resumeFormatConfig,
  'jd-res-match': { title: "JD vs Resume Match", icon: "🎯", colorClass: "bg-indigo-600", options: [] },
  'exp-resolver-hr': Office.experienceResolverConfig,
  'notice-period-ana': Office.noticePeriodConfig,

  // DAILY LIFE CLUSTER
  'slow-net-diag': Util.internetSlowConfig,
  'asym-speed-ana': Util.upDownExplainerConfig,
  'install-fail-diag': Util.appInstallConfig,
  'data-integrity-life': Util.fileCorruptionConfig,
  'sms-wait-trace': Util.otpAnalyzerConfig,
  'mail-fail-decoder': Util.emailBounceConfig,
  'responsive-view-ana': Util.responsiveAnalyzerConfig,
};

export const getToolConfig = (slug: string) => {
  return TOOL_CONFIG_REGISTRY[slug] || {
    title: slug.replace(/-/g, ' '),
    icon: "🛠️",
    description: "Logic node initialized and ready for execution.",
    colorClass: "bg-indigo-600",
    options: []
  };
};
