import { aiArticleGeneratorConfig, aiRewriterConfig, aiGrammarConfig, aiToneConverterConfig, aiSeoOptimizerConfig, aiEmailGeneratorConfig, aiResumeWriterConfig, aiStoryGeneratorConfig, aiYoutubeScriptConfig, aiProductDescConfig } from '../config/aiTools';
import { instagramHashtagAnalyzerConfig, reelHookGeneratorConfig, youtubeIdeaGeneratorConfig, viralCaptionFormatterConfig, socialBioFormatterConfig, youtubeTitleGeneratorConfig, youtubeDescriptionGeneratorConfig, instagramCaptionGeneratorConfig, commentReplyGeneratorConfig, generalHashtagGeneratorConfig } from '../config/socialTools';
import { eduStudyPlannerConfig, eduSummaryGeneratorConfig, eduEssayGraderConfig, eduMathSolverConfig, eduQuizGeneratorConfig, eduCitationConfig, eduAssignmentFormatterConfig, eduResearchAssistantConfig, eduLanguageTutorConfig, eduConceptExplainerConfig, eduCodingTutorConfig, eduEquationSolverConfig, eduFormulaGeneratorConfig, eduUnitPracticeConfig, eduFlashcardGeneratorConfig } from '../config/educationTools';
import { ageCalculatorConfig, percentageCalculatorConfig, discountCalculatorConfig, simpleInterestConfig, emiCalculatorConfig, bmiCalculatorConfig, gstCalculatorConfig, compoundInterestConfig, profitLossConfig, loanCalculatorConfig, roiCalculatorConfig, durationCalculatorConfig, salaryCalculatorConfig, offerComparisonConfig, hiddenChargesConfig, inflationCalculatorConfig, emiHighExplainerConfig, hiddenChargesDiscoveryConfig, interestAnalyzerConfig, offerPriceTruthConfig, subscriptionTrapConfig, refundAmountConfig } from '../config/calculatorTools';
import { 
  imageKbReducerConfig, imageDpiConfig, imageToWebpConfig, passportPhotoConfig, 
  imageFormatConverterConfig, imageMetadataViewerConfig, imageCompressorConfig, 
  backgroundBlurConfig, imageNoiseReducerConfig, imagePaletteExtractorConfig, 
  imageShadowGeneratorConfig, imagePerspectiveConfig, imagePrintSizeConfig,
  imageAuthenticityConfig, imageUploadFailureConfig, imageMetadataRemoverConfig,
  backgroundRemoverNonAIConfig, formImageFixerConfig, signatureFixerConfig,
  blurSimulatorConfig, socialCompressionPreviewConfig, stretchingPredictorConfig, pixelToKbConfig,
  cameraVsScreenshotConfig, photoClarityConfig, printVsScreenConfig,
  dpiMythBreakerConfig, mobileCameraAdvisorConfig, backgroundPredictorConfig
} from '../config/imageTools';
import { 
  pdfOpeningCheckerConfig, pdfCompatibilityConfig, scannedPdfReadabilityConfig, 
  pdfSizeIncreaseExplainerConfig, pdfPrintCutoffConfig, pdfFontErrorDecoderConfig, 
  pdfTextSelectableConfig, pdfBwPreviewConfig, pdfUploadTimeConfig, pdfPageOrderConfig,
  pdfSplitterConfig, pdfProtectConfig, pdfUnlockConfig, pdfMetadataConfig, 
  pdfCompareConfig, pdfOcrConfig, excelToPdfConfig, pdfCompressorConfig, 
  pdfMergerConfig, pdfComplianceConfig 
} from '../config/pdfTools';
import { 
  passwordStrengthConfig, charCounterConfig, wordCounterConfig, caseConverterConfig, 
  dateDiffConfig, fileSizeConfig, randomNumberConfig, uuidGeneratorConfig, 
  qrCodeConfig, urlEncoderConfig as utilityUrlEncoderConfig, timeZoneConverterConfig, 
  ageDiffConfig, htmlMinifierConfig, cssBeautifierConfig, textSummarizerConfig, 
  countdownGeneratorConfig, workingDaysConfig, docReadinessConfig, deviceCompatConfig,
  uploadRejectionConfig, govtRuleDecoderConfig, dpiConflictConfig, statusDecoderConfig, formatTranslatorConfig,
  internetSlowConfig, upDownExplainerConfig, appInstallConfig, fileCorruptionConfig, otpAnalyzerConfig, emailBounceConfig, responsiveAnalyzerConfig
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
import { invoiceGeneratorConfig, resumeBuilderConfig, textToDocxConfig, docxMetadataConfig, resumeRejectionAnalyzerConfig, atsKeywordGapConfig, resumeFormatConfig, experienceResolverConfig, noticePeriodConfig, resumeFilenameConfig, coverLetterOptimizerConfig, gapExplanationConfig } from '../config/officeTools';
import { 
  ipLookupConfig, dnsLookupConfig, sslCheckerConfig, uaParserConfig, 
  headerCheckerConfig, urlSafetyConfig, internetSpeedTestConfig, portCheckerConfig, 
  emailHeaderAnalyzerConfig, ipInfoOfflineConfig, dataMaskingConfig 
} from '../config/networkTools';
import { jsonValidatorConfig, jsonFormatterConfig, htmlCssFormatterConfig, jsMinifierConfig, base64Config, jwtDecoderConfig, regexTesterConfig, urlEncoderConfig as devUrlEncoderConfig, apiResponseViewerConfig } from '../config/devTools';

export const TOOL_CONFIG_REGISTRY: Record<string, any> = {
  // Utility & Daily Life
  'internet-slow-analyzer': internetSlowConfig,
  'upload-download-explainer': upDownExplainerConfig,
  'app-install-checker': appInstallConfig,
  'file-corruption-predictor': fileCorruptionConfig,
  'otp-not-coming-analyzer': otpAnalyzerConfig,
  'email-bounce-decoder': emailBounceConfig,
  'responsive-layout-analyzer': responsiveAnalyzerConfig,
  'dpi-size-conflict-explainer': dpiConflictConfig,
  'govt-rule-decoder': govtRuleDecoderConfig,
  'upload-rejection-analyzer': uploadRejectionConfig,
  'working-days-calculator': workingDaysConfig,
  'application-status-meaning-decoder': statusDecoderConfig,
  'wrong-format-error-translator': formatTranslatorConfig,
  
  // Job / Resume
  'ats-keyword-gap-finder': atsKeywordGapConfig,
  'resume-format-checker': resumeFormatConfig,
  'experience-dispute-resolver': experienceResolverConfig,
  'notice-period-calculator': noticePeriodConfig,
  'resume-filename-checker': resumeFilenameConfig,
  'cover-letter-optimizer': coverLetterOptimizerConfig,
  'gap-explanation-generator': gapExplanationConfig,
  'resume-rejection-analyzer': resumeRejectionAnalyzerConfig,

  // Finance
  'why-emi-high-explainer': emiHighExplainerConfig,
  'hidden-charges-discovery': hiddenChargesDiscoveryConfig,
  'actual-interest-analyzer': interestAnalyzerConfig,
  'offer-price-truth-calculator': offerPriceTruthConfig,
  'subscription-trap-analyzer': subscriptionTrapConfig,
  'refund-amount-explainer': refundAmountConfig,
  
  // ... maintain mapping for all other slugs
  'salary-calculator': salaryCalculatorConfig,
  'job-offer-comparison': offerComparisonConfig,
  'hidden-charges-calculator': hiddenChargesConfig,
  'inflation-impact-calculator': inflationCalculatorConfig,
};

export const getToolConfig = (slug: string) => {
  return TOOL_CONFIG_REGISTRY[slug] || {
    title: slug.replace(/-/g, ' '),
    icon: "🛠️",
    colorClass: "bg-indigo-600",
    options: []
  };
};