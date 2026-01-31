
// Fix: Added CategorySlug mapping for all categories used across the app
export type CategorySlug = 
  | 'upload-rejection' 
  | 'pdf-diagnostics' 
  | 'media-acceptance' 
  | 'career-diagnostics'
  | 'connectivity' 
  | 'email-comms' 
  | 'platform-conflicts' 
  | 'finance-analysis' 
  | 'ux-performance'
  | 'ai' 
  | 'social' 
  | 'utility' 
  | 'seo' 
  | 'network' 
  | 'office';

export interface ToolCategory {
  id: CategorySlug;
  name: string;
  description: string;
  icon: string;
  color: string;
}

// Fix: Added FAQ interface for ToolSEOContent and metadata
export interface FAQ {
  q: string;
  a: string;
}

export interface Tool {
  slug: string;
  title: string;
  category: CategorySlug;
  description: string;
  keywords: string[];
  icon?: string;
  priority?: number;
  // Fix: Added missing properties required by SEO components and ToolCard
  faqs?: FAQ[];
  howTo?: string[];
  toolType?: 'ai' | 'client';
  // Fix: Added execute method for tools that perform logic directly (e.g., in FinanceTools.tsx)
  execute?: (input: any, options?: any) => Promise<any>;
}

// Fix: Exported ValidationResult for core/engine.ts and core/pipeline.ts
export interface ValidationResult {
  valid: boolean;
  error?: string;
}

// Fix: Exported VerificationResult for core/engine.ts and core/pipeline.ts
export interface VerificationResult {
  secure: boolean;
  error?: string;
}

export interface ExecutionResult<O> {
  success: boolean;
  data?: O;
  error?: string;
  explanation?: string;
  timing: number;
  // Fix: Added optional properties to support pipeline.ts requirements
  latency?: number;
  stage?: string;
}

export interface ToolPipeline<I, O> {
  // Fix: Aligned with core/engine.ts and core/executeTool.ts requirements
  validate?: (input: I) => ValidationResult;
  normalize?: (input: I) => I;
  process: (input: I, options?: any) => Promise<O>;
  verify?: (output: O) => VerificationResult;
  explain?: (output: O) => string;
}
