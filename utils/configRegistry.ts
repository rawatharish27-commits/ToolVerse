import * as Image from '../config/imageTools';
import * as PDF from '../config/pdfTools';
import * as Calc from '../config/calculatorTools';
import * as Util from '../config/utilityTools';
import * as AI from '../config/aiTools';

export const TOOL_CONFIG_REGISTRY: Record<string, any> = {
  // IMAGE CLUSTER
  'image-size-reducer-kb': Image.imageSizeReducerKbSelectorConfig,
  'image-to-webp-converter': Image.imageToWebpConfig,
  'passport-photo-maker': Image.passportPhotoConfig,
  'image-dpi-checker': Image.imageDpiConfig,
  'image-compressor': Image.imageCompressorConfig,
  'image-format-converter': Image.imageFormatConverterConfig,
  'image-metadata-viewer': Image.imageMetadataViewerConfig,
  'image-authenticity-analyzer': Image.imageAuthenticityConfig,
  
  // PDF CLUSTER
  'pdf-to-jpg-converter': PDF.pdfToJpgConfig,
  'jpg-to-pdf-converter': PDF.jpgToPdfConfig,
  'pdf-size-reducer-mb': PDF.pdfCompressorConfig,
  'pdf-merger': PDF.pdfMergerConfig,
  'pdf-splitter': PDF.pdfSplitterConfig,
  
  // CALCULATORS
  'percentage-calculator': { title: "Percentage", icon: "📊", colorClass: "bg-orange-500", options: [] },
  'salary-calculator': Calc.salaryCalculatorConfig,
  'emi-calculator': Calc.emiCalculatorConfig,
  'age-calculator': Calc.ageCalculatorConfig,
  
  // AI CLUSTER
  'ai-article-generator': AI.aiArticleGeneratorConfig,
  'ai-grammar-fixer': AI.aiGrammarConfig,
  'ai-email-generator': AI.aiEmailGeneratorConfig,
};

/**
 * Returns UI configuration for any registered slug.
 * Implements Rule E: Functional UI for EVERY tool.
 */
export const getToolConfig = (slug: string) => {
  if (TOOL_CONFIG_REGISTRY[slug]) return TOOL_CONFIG_REGISTRY[slug];
  
  // Default Configuration Generator for long-tail tools
  const name = slug.replace(/-/g, ' ');
  return {
    title: name.charAt(0).toUpperCase() + name.slice(1),
    icon: "🛠️",
    description: "Professional logic node initialized. Configure parameters to execute.",
    colorClass: "bg-indigo-600",
    options: [
      { id: "mode", type: "select", label: "Logic Mode", values: ["Standard", "Enterprise", "High-Precision"], default: "Standard" },
      { id: "strict", type: "toggle", label: "Enforce Standards", default: true }
    ]
  };
};
