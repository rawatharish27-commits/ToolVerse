
import { CategorySlug } from '../types';

// Fix: Change 'const' to 'type' for correct TypeScript union type definition
export type RPMLevel = 'HIGH' | 'MEDIUM' | 'LOW';

// Add missing 'data' category to mapping to ensure all CategorySlug values are covered
export const CATEGORY_RPM: Record<CategorySlug, RPMLevel> = {
  'ai': 'HIGH',
  'calculators': 'HIGH',
  'unit-converters': 'HIGH',
  'seo': 'HIGH',
  'pdf': 'MEDIUM',
  'image': 'MEDIUM',
  'video': 'MEDIUM',
  'audio': 'MEDIUM',
  'file': 'MEDIUM',
  'office': 'MEDIUM',
  'data': 'MEDIUM',
  'dev': 'LOW',
  'security': 'LOW',
  'utility': 'LOW',
  'network': 'LOW',
  'education': 'LOW'
};
