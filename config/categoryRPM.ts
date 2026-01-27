import { CategorySlug } from '../types';

export type RPMLevel = 'HIGH' | 'MEDIUM' | 'LOW';

export const CATEGORY_RPM: Record<CategorySlug, RPMLevel> = {
  'ai': 'HIGH',
  'business': 'HIGH',
  'calculators': 'HIGH',
  // Fix: Removed 'unit-converters' as it is not a member of CategorySlug
  'seo': 'HIGH',
  'social': 'HIGH',
  // Fix: Added missing 'finance' category
  'finance': 'HIGH',
  'pdf': 'MEDIUM',
  'image': 'MEDIUM',
  // Fix: Removed 'video', 'audio', and 'file' as they are not members of CategorySlug
  'office': 'MEDIUM',
  'data': 'MEDIUM',
  // Fix: Added missing 'career' and 'government' categories
  'career': 'MEDIUM',
  'government': 'MEDIUM',
  // Fix: Removed 'dev' as it is not a member of CategorySlug
  'security': 'LOW',
  'utility': 'LOW',
  'network': 'LOW',
  'education': 'LOW',
  // Fix: Added missing 'daily-life' and 'miscellaneous' categories
  'daily-life': 'LOW',
  'miscellaneous': 'LOW'
};
