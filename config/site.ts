/**
 * ToolVerse Global Site Configuration
 * Update 'currentDomain' when migrating to your custom domain.
 */
export const SITE_CONFIG = {
  name: 'ToolVerse',
  shortName: 'ToolVerse',
  currentDomain: 'toolverse-4gr.pages.dev', // e.g., 'toolverse.tools'
  protocol: 'https',
  get baseUrl() {
    return `${this.protocol}://${this.currentDomain}`;
  },
  author: 'ToolVerse Engineering',
  twitterHandle: '@ToolVerseOfficial',
  themeColor: '#4f46e5'
};