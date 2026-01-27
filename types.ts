
export type CategorySlug = 
  | 'image' 
  | 'pdf' 
  | 'calculators' 
  | 'utility'
  | 'data' 
  | 'network' 
  | 'security' 
  | 'seo' 
  | 'social' 
  | 'education' 
  | 'business'
  | 'career'
  | 'government'
  | 'daily-life'
  | 'ai'
  | 'office'
  | 'finance'
  | 'miscellaneous';

export interface ToolCategory {
  id: CategorySlug;
  name: string;
  description: string;
  icon: string;
  color: string;
  images: string[];
}

export type ToolType = 'client' | 'ai' | 'server';

export interface ToolFAQ {
  q: string;
  a: string;
}

export interface Tool {
  slug: string;
  title: string;
  category: CategorySlug;
  description: string;
  seoTitle?: string;
  seoDescription?: string;
  useCases?: string[];
  longDescription?: string;
  keywords: string[];
  toolType: ToolType;
  icon?: string;
  howTo?: string[];
  features?: string[];
  faqs?: ToolFAQ[];
  priority?: number; // Higher number = higher visibility
  execute?: (input: any, options?: any) => Promise<any>;
}

export interface Breadcrumb {
  label: string;
  href: string;
}
