

export type CategorySlug = 
  | 'upload-rejection' 
  | 'pdf-diagnostics' 
  | 'media-acceptance' 
  | 'career-diagnostics'
  | 'connectivity' 
  | 'email-comms' 
  | 'platform-conflicts' 
  | 'finance-analysis' 
  | 'ux-performance';

export interface ToolCategory {
  id: CategorySlug;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export type ToolType = 'client' | 'ai' | 'server';

export interface Tool {
  slug: string;
  title: string;
  category: CategorySlug;
  description: string;
  keywords: string[];
  // Made toolType optional to support multiple registry sources (data/tools.ts vs core/toolRegistry.ts)
  toolType?: ToolType;
  // Added icon to Tool interface as it is used in registries and ToolPage
  icon?: string;
  priority?: number;
  // Added faqs and howTo to Tool interface to satisfy property access in SEO and UI components
  faqs?: { q: string; a: string }[];
  howTo?: string[];
  // Added execute property for calculators and local processing logic
  execute?: (input: any, options?: any) => Promise<any>;
}

// Fix: Export ToolEntry as an alias to Tool to resolve "no exported member 'ToolEntry'" error
export type ToolEntry = Tool;

export interface ValidationResult { valid: boolean; error?: string; }
export interface VerificationResult { secure: boolean; error?: string; }

export interface ToolPipeline<I, O> {
  validate: (input: I) => ValidationResult;
  normalize: (input: I) => I;
  process: (input: I, options?: any) => Promise<O>;
  verify: (output: O) => VerificationResult;
  explain: (output: O) => string;
}
