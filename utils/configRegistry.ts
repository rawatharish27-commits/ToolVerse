import { aiArticleGeneratorConfig, aiRewriterConfig, aiGrammarConfig, aiToneConverterConfig, aiSeoOptimizerConfig, aiEmailGeneratorConfig, aiResumeWriterConfig, aiStoryGeneratorConfig, aiYoutubeScriptConfig, aiProductDescConfig } from '../config/aiTools';
import { socialCaptionGeneratorConfig, socialHashtagGeneratorConfig, socialBioGeneratorConfig, socialReelIdeaGeneratorConfig, socialCommentGeneratorConfig, socialPostSchedulerConfig, socialThumbnailPreviewerConfig, socialImageRatioConfig, socialEmojiPickerConfig, socialPollCreatorConfig } from '../config/socialTools';
import { eduStudyPlannerConfig, eduSummaryGeneratorConfig, eduEssayGraderConfig, eduMathSolverConfig, eduQuizGeneratorConfig, eduCitationConfig, eduAssignmentFormatterConfig } from '../config/educationTools';
import { ageCalculatorConfig, percentageCalculatorConfig, discountCalculatorConfig, simpleInterestConfig } from '../config/calculatorTools';
import { imageKbReducerConfig, imageDpiConfig, imageToWebpConfig, passportPhotoConfig, imageFormatConverterConfig, imageMetadataViewerConfig } from '../config/imageTools';
import { pdfPageNumbersConfig, pdfWatermarkProConfig, pdfToImageConfig, imageToPdfConfig, pdfSizeReducerConfig, pdfSplitterConfig, pdfProtectConfig, pdfUnlockConfig, pdfMetadataConfig } from '../config/pdfTools';

/**
 * ToolVerse Config Registry v6.1
 * Maps slugs to specialized UI configurations.
 */
export const TOOL_CONFIG_REGISTRY: Record<string, any> = {
  // Calculators
  'age-calculator': ageCalculatorConfig,
  'percentage-calculator': percentageCalculatorConfig,
  'discount-calculator': discountCalculatorConfig,
  'simple-interest-calc': simpleInterestConfig,

  // Images
  'image-kb-reducer': imageKbReducerConfig,
  'image-dpi-checker': imageDpiConfig,
  'image-to-webp': imageToWebpConfig,
  'passport-size-photo-maker': passportPhotoConfig,
  'image-format-converter': imageFormatConverterConfig,
  'image-metadata-viewer': imageMetadataViewerConfig,

  // PDF
  'pdf-page-numbers': pdfPageNumbersConfig,
  'pdf-page-number-adder': pdfPageNumbersConfig,
  'pdf-watermark-pro': pdfWatermarkProConfig,
  'pdf-watermark': pdfWatermarkProConfig,
  'pdf-to-jpg': pdfToImageConfig,
  'pdf-to-image': pdfToImageConfig,
  'image-to-pdf': imageToPdfConfig,
  'jpg-to-pdf': imageToPdfConfig,
  'pdf-size-reducer': pdfSizeReducerConfig,
  'pdf-compressor': pdfSizeReducerConfig,
  'pdf-splitter': pdfSplitterConfig,
  'pdf-split': pdfSplitterConfig,
  'pdf-password-protect': pdfProtectConfig,
  'pdf-protect': pdfProtectConfig,
  'pdf-password-remover': pdfUnlockConfig,
  'pdf-metadata-viewer': pdfMetadataConfig,

  // ... (rest of registry preserved)
  'ai-article-generator': aiArticleGeneratorConfig,
  'ai-article-rewriter': aiRewriterConfig,
  'ai-grammar-fixer': aiGrammarConfig,
  'ai-tone-converter': aiToneConverterConfig,
  'ai-seo-optimizer': aiSeoOptimizerConfig,
  'ai-email-generator': aiEmailGeneratorConfig,
  'ai-resume-writer': aiResumeWriterConfig,
  'ai-story-generator': aiStoryGeneratorConfig,
  'ai-youtube-script': aiYoutubeScriptConfig,
  'ai-product-description': aiProductDescConfig,

  // Social Cluster
  'social-caption-generator': socialCaptionGeneratorConfig,
  'social-hashtag-generator': socialHashtagGeneratorConfig,
  'social-bio-generator': socialBioGeneratorConfig,
  'social-reel-idea-generator': socialReelIdeaGeneratorConfig,
  'social-comment-generator': socialCommentGeneratorConfig,
  'social-post-scheduler': socialPostSchedulerConfig,
  'social-thumbnail-previewer': socialThumbnailPreviewerConfig,
  'social-image-ratio-tool': socialImageRatioConfig,
  'social-emoji-picker': socialEmojiPickerConfig,
  'social-poll-creator': socialPollCreatorConfig,

  // Edu Cluster
  'edu-study-planner': eduStudyPlannerConfig,
  'edu-summary-generator': eduSummaryGeneratorConfig,
  'edu-essay-grader': eduEssayGraderConfig,
  'edu-math-solver': eduMathSolverConfig,
  'edu-quiz-generator': eduQuizGeneratorConfig,
  'edu-citation-architect': eduCitationConfig,
  'edu-assignment-formatter': eduAssignmentFormatterConfig,
};

export const getToolConfig = (slug: string) => {
  return TOOL_CONFIG_REGISTRY[slug] || {
    title: slug.replace(/-/g, ' '),
    icon: "🛠️",
    colorClass: "bg-indigo-600",
    options: []
  };
};