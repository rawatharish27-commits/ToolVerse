
import { CategorySlug } from '../types';

export type RPMLevel = 'HIGH' | 'MEDIUM' | 'LOW';

export const CATEGORY_RPM: Record<CategorySlug, RPMLevel> = {
  'ai': 'HIGH',
  'calculators': 'HIGH',
  'seo': 'HIGH',
  'pdf': 'MEDIUM',
  'image': 'MEDIUM',
  'video': 'MEDIUM',
  'office': 'MEDIUM',
  'dev': 'LOW',
  'security': 'LOW',
  'utility': 'LOW',
  'network': 'LOW',
  'education': 'LOW'
};
