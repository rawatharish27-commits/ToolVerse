
import { CategorySlug } from '../types';

export type RPMLevel = 'HIGH' | 'MEDIUM' | 'LOW';

// Realigned CATEGORY_RPM keys with the CategorySlug type defined in types.ts
export const CATEGORY_RPM: Record<CategorySlug, RPMLevel> = {
  'upload-rejection': 'HIGH',
  'pdf-diagnostics': 'MEDIUM',
  'media-acceptance': 'MEDIUM',
  'career-diagnostics': 'HIGH',
  'connectivity': 'LOW',
  'email-comms': 'MEDIUM',
  'platform-conflicts': 'MEDIUM',
  'finance-analysis': 'HIGH',
  'ux-performance': 'MEDIUM'
};