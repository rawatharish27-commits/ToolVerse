
export type CategorySlug = 
  | 'ai' 
  | 'image' 
  | 'video' 
  | 'pdf' 
  | 'dev' 
  | 'seo' 
  | 'calculators' 
  | 'utility' 
  | 'security' 
  | 'network' 
  | 'office' 
  | 'education';

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
