
import { CategorySlug } from '../types';

export type RPMLevel = 'HIGH' | 'MEDIUM' | 'LOW';

// Fixed: Added missing 'audio' and 'file' property to CATEGORY_RPM to satisfy Record<CategorySlug, RPMLevel>
export const CATEGORY_RPM: Record<CategorySlug, RPMLevel> = {
  'ai': 'HIGH',
  'calculators': 'HIGH',
  'seo': 'HIGH',
  'pdf': 'MEDIUM',
  'image': 'MEDIUM',
  'video': 'MEDIUM',
  'audio': 'MEDIUM',
  'file': 'MEDIUM',
  'office': 'MEDIUM',
  'dev': 'LOW',
  'security': 'LOW',
  'utility': 'LOW',
  'network': 'LOW',
  'education': 'LOW'
};
