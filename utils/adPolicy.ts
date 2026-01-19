
import { CATEGORY_RPM, RPMLevel } from '../config/categoryRPM';
import { CategorySlug } from '../types';

export type AdSlotType = 'header' | 'mid_content' | 'sidebar' | 'footer';

/**
 * Returns which ad slots should be visible for a given category
 */
export function getEnabledAdSlots(category: CategorySlug): AdSlotType[] {
  const level = CATEGORY_RPM[category] || 'LOW';

  switch (level) {
    case 'HIGH':
      return ['header', 'mid_content', 'sidebar', 'footer'];
    case 'MEDIUM':
      return ['header', 'mid_content', 'footer'];
    case 'LOW':
    default:
      return ['header', 'footer'];
  }
}

/**
 * Checks if a specific slot is enabled for a category
 */
export function isAdSlotEnabled(category: CategorySlug, slot: AdSlotType): boolean {
  return getEnabledAdSlots(category).includes(slot);
}
