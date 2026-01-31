
import { CategorySlug } from '../types';

export type RPMLevel = 'HIGH' | 'MEDIUM' | 'LOW';

// Realigned CATEGORY_RPM keys with the CategorySlug type defined in types.ts
// Fix: Added missing properties ai, social, utility, seo, network, and office to satisfy Record<CategorySlug, RPMLevel> exhaustive type requirement
export const CATEGORY_RPM: Record<CategorySlug, RPMLevel> = {
  'upload-rejection': 'HIGH',
  'pdf-diagnostics': 'MEDIUM',
  'media-acceptance': 'MEDIUM',
  'career-diagnostics': 'HIGH',
  'connectivity': 'LOW',
  'email-comms': 'MEDIUM',
  'platform-conflicts': 'MEDIUM',
  'finance-analysis': 'HIGH',
  'ux-performance': 'MEDIUM',
  'ai': 'HIGH',
  'social': 'MEDIUM',
  'utility': 'LOW',
  'seo': 'MEDIUM',
  'network': 'LOW',
  'office': 'MEDIUM'
};
