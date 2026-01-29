
import { CategorySlug } from './types';

export interface GuidedStep {
  toolSlug: string;
  instruction: string;
  isOptional?: boolean;
}

export interface ProblemDefinition {
  slug: string;
  title: string;
  description: string;
  category: CategorySlug;
  icon: string;
  flow: GuidedStep[];
  seoKeywords: string[];
}
