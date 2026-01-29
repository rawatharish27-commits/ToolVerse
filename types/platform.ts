
export type ToolCategory = 'image' | 'pdf' | 'finance' | 'ai' | 'dev' | 'utility' | 'seo';

export interface ToolMetadata {
  name: string;
  slug: string;
  category: ToolCategory;
  subcategory: string;
  keywords: string[];
  related: string[];
  inputType: string;
  outputType: string;
  complexity: 'low' | 'medium' | 'high';
}

export interface ExecutionResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  explanation?: string;
  stage?: 'validation' | 'normalization' | 'processing' | 'verification';
}

export interface ToolPipeline<I, O> {
  validate: (input: I) => { valid: boolean; error?: string };
  normalize: (input: I) => I;
  process: (input: I, options?: any) => Promise<O>;
  verify: (output: O) => { secure: boolean; error?: string };
  explain: (output: O) => string;
}
