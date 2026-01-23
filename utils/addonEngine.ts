import { getAttractionState, updateAttractionState, trackToolClick } from './attraction';

/**
 * ToolVerse Addon Engine v1.0
 * Handles the "Habit Loop" logic in a non-intrusive way.
 */

export const AddonEngine = {
  // 1. Get stats for badges
  getTrendingSlugs: () => {
    const state = getAttractionState();
    return Object.entries(state.clicks)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(e => e[0]);
  },

  // 2. Determine tool of the day
  getToolOfTheDay: (allTools: any[]) => {
    const date = new Date().toDateString();
    const seed = date.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return allTools[seed % allTools.length]?.slug;
  },

  // 3. Process a click (Addon proxy)
  processAddonAction: (slug: string, cat: string) => {
    trackToolClick(slug, cat);
    
    // Custom Addon Event
    const event = new CustomEvent('addon_reward', { 
      detail: { slug, points: 10 } 
    });
    window.dispatchEvent(event);
  }
};
