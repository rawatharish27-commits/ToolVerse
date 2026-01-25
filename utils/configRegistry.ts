import { aiArticleGeneratorConfig, aiRewriterConfig, aiGrammarConfig, aiToneConverterConfig, aiSeoOptimizerConfig, aiEmailGeneratorConfig, aiResumeWriterConfig, aiStoryGeneratorConfig, aiYoutubeScriptConfig, aiProductDescConfig } from '../config/aiTools';
import { instagramHashtagAnalyzerConfig, reelHookGeneratorConfig, youtubeIdeaGeneratorConfig, viralCaptionFormatterConfig, socialBioFormatterConfig, youtubeTitleGeneratorConfig, youtubeDescriptionGeneratorConfig, instagramCaptionGeneratorConfig, commentReplyGeneratorConfig, generalHashtagGeneratorConfig } from '../config/socialTools';
import { eduStudyPlannerConfig, eduSummaryGeneratorConfig, eduEssayGraderConfig, eduMathSolverConfig, eduQuizGeneratorConfig, eduCitationConfig, eduAssignmentFormatterConfig, eduResearchAssistantConfig, eduLanguageTutorConfig, eduConceptExplainerConfig, eduCodingTutorConfig, eduEquationSolverConfig, eduFormulaGeneratorConfig, eduUnitPracticeConfig, eduFlashcardGeneratorConfig } from '../config/educationTools';
import { ageCalculatorConfig, percentageCalculatorConfig, discountCalculatorConfig, simpleInterestConfig, emiCalculatorConfig, bmiCalculatorConfig, gstCalculatorConfig, compoundInterestConfig, profitLossConfig, loanCalculatorConfig, roiCalculatorConfig, durationCalculatorConfig, salaryCalculatorConfig, offerComparisonConfig, hiddenChargesConfig, inflationCalculatorConfig } from '../config/calculatorTools';
import { 
  imageKbReducerConfig, imageDpiConfig, imageToWebpConfig, passportPhotoConfig, 
  imageFormatConverterConfig, imageMetadataViewerConfig, imageCompressorConfig, 
  backgroundBlurConfig, imageNoiseReducerConfig, imagePaletteExtractorConfig, 
  imageShadowGeneratorConfig, imagePerspectiveConfig, imagePrintSizeConfig,
  imageAuthenticityConfig, imageUploadFailureConfig, imageMetadataRemoverConfig,
  backgroundRemoverNonAIConfig, formImageFixerConfig, signatureFixerConfig,
  blurSimulatorConfig, socialCompressionPreviewConfig, stretchingPredictorConfig, pixelToKbConfig,
  cameraVsScreenshotConfig, photoClarityConfig, printVsScreenConfig
} from '../config/imageTools';
import { pdfPageNumbersConfig, pdfWatermarkProConfig, pdfToImageConfig, imageToPdfConfig, pdfSizeReducerConfig, pdfSplitterConfig, pdfProtectConfig, pdfUnlockConfig, pdfMetadataConfig, pdfCompareConfig, pdfOcrConfig, excelToPdfConfig, pdfCompressorConfig, pdfMergerConfig, pdfComplianceConfig } from '../config/pdfTools';
import { 
  passwordStrengthConfig, charCounterConfig, wordCounterConfig, caseConverterConfig, 
  dateDiffConfig, fileSizeConfig, randomNumberConfig, uuidGeneratorConfig, 
  qrCodeConfig, urlEncoderConfig as utilityUrlEncoderConfig, timeZoneConverterConfig, 
  ageDiffConfig, htmlMinifierConfig, cssBeautifierConfig, textSummarizerConfig, 
  countdownGeneratorConfig, workingDaysConfig, docReadinessConfig, deviceCompatConfig,
  uploadRejectionConfig, govtRuleDecoderConfig, dpiConflictConfig, statusDecoderConfig, formatTranslatorConfig
} from '../config/utilityTools';
import { 
  seoTitleCheckerConfig, seoMetaCheckerConfig, serpPreviewToolConfig, 
  internalLinkGeneratorConfig, keywordDifficultyConfig, keywordDensityConfig, 
  robotsTxtConfig, xmlSitemapConfig, faqSchemaConfig, breadcrumbSchemaConfig 
} from '../config/seoTools';
import { 
  csvToExcelConfig, excelDataCleanerConfig, dataDeduplicationConfig, 
  csvViewerConfig, csvToJsonConfig, jsonToCsvConfig, excelViewerConfig, 
  dataCleanerConfig, chartGeneratorConfig 
} from '../config/dataTools';
import { 
  fileFormatConverterConfig, zipExtractorConfig, zipCreatorConfig, 
  fileConverterConfig, fileCompressorConfig, fileSplitterConfig, 
  fileMergerConfig, fileHashConfig, fileTypeIdentifierConfig 
} from '../config/fileTools';
import { invoiceGeneratorConfig, resumeBuilderConfig, textToDocxConfig, docxMetadataConfig } from '../config/officeTools';
import { 
  ipLookupConfig, dnsLookupConfig, sslCheckerConfig, uaParserConfig, 
  headerCheckerConfig, urlSafetyConfig, internetSpeedTestConfig, portCheckerConfig, 
  emailHeaderAnalyzerConfig, ipInfoOfflineConfig, dataMaskingConfig 
} from '../config/networkTools';
import { jsonValidatorConfig, jsonFormatterConfig, htmlCssFormatterConfig, jsMinifierConfig, base64Config, jwtDecoderConfig, regexTesterConfig, urlEncoderConfig as devUrlEncoderConfig, apiResponseViewerConfig } from '../config/devTools';

export const TOOL_CONFIG_REGISTRY: Record<string, any> = {
  // Utility
  'dpi-size-conflict-explainer': dpiConflictConfig,
  'govt-rule-decoder': govtRuleDecoderConfig,
  'upload-rejection-analyzer': uploadRejectionConfig,
  'working-days-calculator': workingDaysConfig,
  'time-zone-converter': timeZoneConverterConfig,
  'age-difference-calculator': ageDiffConfig,
  'application-status-meaning-decoder': statusDecoderConfig,
  'wrong-format-error-translator': formatTranslatorConfig,
  
  // Image
  'signature-upload-fixer': signatureFixerConfig,
  'form-image-auto-fixer': formImageFixerConfig,
  'image-authenticity-analyzer': imageAuthenticityConfig,
  'image-upload-failure-debugger': imageUploadFailureConfig,
  'image-metadata-remover': imageMetadataRemoverConfig,
  'background-remover-non-ai': backgroundRemoverNonAIConfig,
  'image-noise-reducer': imageNoiseReducerConfig,
  'image-color-palette-extractor': imagePaletteExtractorConfig,
  'image-shadow-generator': imageShadowGeneratorConfig,
  'image-blur-upload-simulator': blurSimulatorConfig,
  'social-media-compression-preview': socialCompressionPreviewConfig,
  'image-stretching-issue-predictor': stretchingPredictorConfig,
  'pixel-to-kb-calculator': pixelToKbConfig,
  'camera-vs-screenshot-quality-tool': cameraVsScreenshotConfig,
  'photo-clarity-analyzer': photoClarityConfig,
  'print-vs-screen-image-difference-tool': printVsScreenConfig,
  
  // PDF
  'pdf-compliance-checker': pdfComplianceConfig,
  'pdf-compare-tool': pdfCompareConfig,
  'pdf-ocr-tool': pdfOcrConfig,

  // ... (maintain all others)
  'salary-calculator': salaryCalculatorConfig,
  'job-offer-comparison': offerComparisonConfig,
  'hidden-charges-calculator': hiddenChargesConfig,
  'inflation-impact-calculator': inflationCalculatorConfig,
  'csv-to-excel-converter': csvToExcelConfig,
  'invoice-generator': invoiceGeneratorConfig,
  'resume-builder': resumeBuilderConfig,
  'json-validator': jsonValidatorConfig,
  'roi-calculator': roiCalculatorConfig,
};

export const getToolConfig = (slug: string) => {
  return TOOL_CONFIG_REGISTRY[slug] || {
    title: slug.replace(/-/g, ' '),
    icon: "🛠️",
    colorClass: "bg-indigo-600",
    options: []
  };
};