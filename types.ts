export type CategorySlug = 
  | 'ai' 
  | 'image' 
  | 'video' 
  | 'audio'
  | 'pdf' 
  | 'dev' 
  | 'seo' 
  | 'calculators' 
  | 'unit-converters'
  | 'utility' 
  | 'security' 
  | 'network' 
  | 'office' 
  | 'education'
  | 'file'
  | 'data';

export interface ToolCategory {
  id: CategorySlug;
  name: string;
  description: string;
  icon: string;
  color: string;
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
  priority?: number; // Higher number = higher visibility (High CPM priority)
}

export interface Breadcrumb {
  label: string;
  href: string;
}