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
  'photo-clarity-analyzer': Image.photoClarityConfig,
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

  // CALCULATORS
  'percent-calc': { 
    title: "Percentage Calculator", icon: "📊", colorClass: "bg-orange-500", 
    options: [
      { id: "oldValue", type: "number", label: "Original Value", default: 100 },
      { id: "newValue", type: "number", label: "New Value", default: 120 },
      { id: "mode", type: "select", label: "Calculation Mode", values: ["auto", "increase", "decrease"], default: "auto" }
    ] 
  },
  'si-calc': { 
    title: "Simple Interest", icon: "🔢", colorClass: "bg-orange-500", 
    options: [
      { id: "principal", type: "number", label: "Principal (P)", default: 10000 },
      { id: "rate", type: "number", label: "Rate (R %)", default: 5 },
      { id: "time", type: "number", label: "Time (T)", default: 2 },
      { id: "timeUnit", type: "select", label: "Unit", values: ["years", "months", "days"], default: "years" }
    ] 
  },
  'ci-calc': Calc.compoundInterestCalculatorConfig,
  'age-calc': Calc.ageCalculatorConfig,
  'emi-calc-pro': Calc.emiCalculatorConfig,
  'salary-calc-hand': Calc.salaryCalculatorConfig,
  'roi-calc-pro': Calc.roiCalculatorConfig,
  'inflation-calc': Calc.inflationCalculatorConfig,
  'why-emi-high': Calc.emiHighExplainerConfig,
  'actual-interest-analyzer': Calc.interestAnalyzerConfig,

  // UTILITY CLUSTER
  'word-counter-adv': Util.wordCounterConfig,
  'case-converter-text': Util.caseConverterConfig,
  'pass-strength-audit': Util.passwordStrengthConfig,
  'qr-arch-gen': Util.qrCodeConfig,
  'file-size-transcode': Util.fileSizeConfig,
  'uuid-v4-gen': Util.uuidGeneratorConfig,

  // AI CLUSTER
  'ai-res-bul': AI.aiResumeWriterConfig,
  'ai-wa-rep': { title: "AI WhatsApp Reply", icon: "💬", colorClass: "bg-indigo-600", options: [] },
  'ai-email-writ': AI.aiEmailGeneratorConfig,
  'ai-article-generator': AI.aiArticleGeneratorConfig,
  'ai-grammar-fix': AI.aiGrammarConfig,

  // DIAGNOSTICS (Heuristic Mapping)
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
