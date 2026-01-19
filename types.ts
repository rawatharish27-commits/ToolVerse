
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

export interface Tool {
  slug: string;
  title: string;
  category: CategorySlug;
  description: string;
  longDescription?: string;
  keywords: string[];
  toolType: ToolType;
  icon?: string;
  howTo?: string[];
  faqs?: { q: string; a: string }[];
}

export interface Breadcrumb {
  label: string;
  href: string;
}
