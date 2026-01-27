
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
  'pdf-compliance-check': PDF.pdfCompareConfig,
  // Fix: Property 'pdfComplianceConfig' does not exist in PDF module. Mapping to 'pdfCompatibilityConfig' which handles standard compliance.
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
  'subscription-trap-analyzer': Calc.subscriptionTrapConfig,

  // AI CLUSTER
  // Fix: Property 'aiResumeBulletGeneratorConfig' does not exist in AI module. Mapping to 'aiResumeWriterConfig' which generates achievement bullets.
  'ai-res-bul': AI.aiResumeWriterConfig,
  'ai-wa-rep': { title: "AI WhatsApp Reply", icon: "💬", colorClass: "bg-indigo-600", options: [] },
  'ai-email-writ': AI.aiEmailGeneratorConfig,
  'ai-article-generator': AI.aiArticleGeneratorConfig,
  'ai-grammar-fix': AI.aiGrammarConfig,

  // CAREER & GOVT & LIFE (Diagnostic Mapping)
  'why-rej-gov': { title: "Upload Rejection", icon: "🚫", colorClass: "bg-rose-600", options: [] },
  'rule-dec-gov': { title: "Rule Decoder", icon: "📜", colorClass: "bg-indigo-700", options: [] },
  'res-rej-node': Office.resumeRejectionAnalyzerConfig,
  'net-speed-life': Util.internetSlowConfig,
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
