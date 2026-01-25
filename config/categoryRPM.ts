import { CategorySlug } from '../types';

export type RPMLevel = 'HIGH' | 'MEDIUM' | 'LOW';

export const CATEGORY_RPM: Record<CategorySlug, RPMLevel> = {
  'ai': 'HIGH',
  'business': 'HIGH',
  'calculators': 'HIGH',
  'unit-converters': 'HIGH',
  'seo': 'HIGH',
  'social': 'HIGH',
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