
import { Tool, ToolCategory } from '../types';

/**
 * TOOLVERSE MASTER REGISTRY v20.0
 * single source of truth for discovery, routing, and SEO.
 */

export const CATEGORIES: ToolCategory[] = [
  { id: 'upload-rejection', name: 'Upload & Rejection', description: 'Analyze why files are being rejected by portals.', icon: '📤', color: 'bg-rose-500' },
  { id: 'pdf-diagnostics', name: 'PDF & Documents', description: 'Deep structural analysis of document files.', icon: '📄', color: 'bg-red-500' },
  { id: 'media-acceptance', name: 'Image & Media', description: 'Verify photo acceptance for official use.', icon: '🖼️', color: 'bg-emerald-500' },
  { id: 'career-diagnostics', name: 'Resume & Career', description: 'ATS optimization and career growth logic.', icon: '🚀', color: 'bg-indigo-600' },
  { id: 'connectivity', name: 'Network & Connectivity', description: 'Diagnose internet and OTP delivery issues.', icon: '🌐', color: 'bg-blue-500' },
  { id: 'platform-conflicts', name: 'Platform Conflicts', description: 'Resolve Browser, OS, and App mismatches.', icon: '💻', color: 'bg-slate-700' },
  { id: 'finance-analysis', name: 'Finance & Logic', description: 'Mathematical and tax analysis nodes.', icon: '💸', color: 'bg-emerald-600' }
];

export const TOOLS: Tool[] = [
  // High Traffic Pillar Tools
  { slug: 'image-size-reducer-kb', title: 'Photo KB Size Reducer', category: 'media-acceptance', description: 'Target 20kb, 50kb, or 100kb limits for govt forms.', keywords: ['20kb', '50kb', 'compress'], icon: '📉', priority: 100 },
  { slug: 'otp-delay-probability-calculator', title: 'OTP Arrival Probability', category: 'connectivity', description: 'Calculate SMS delivery success based on carrier load.', keywords: ['otp', 'sms delay'], icon: '🌐', priority: 95 },
  { slug: 'emi-actual-vs-advertised-calculator', title: 'EMI Reality Checker', category: 'finance-analysis', description: 'Expose hidden interest in flat-rate loan offers.', keywords: ['emi', 'loan interest'], icon: '📊', priority: 98 },
  { slug: 'resume-ats-score-analyzer', title: 'Resume ATS Score', category: 'career-diagnostics', description: 'Audit resume structure for automated hiring bots.', keywords: ['ats', 'resume score'], icon: '🚀', priority: 95 },
  
  // Replication Nodes (Stubs)
  { slug: 'gst-calculator-india', title: 'GST Calculator (India)', category: 'finance-analysis', description: 'Multi-slab tax breakdown for FY 24-25.', keywords: ['gst', 'tax'], icon: '🏷️' },
  { slug: 'pdf-to-word-high-fidelity', title: 'PDF to Editable Word', category: 'pdf-diagnostics', description: 'Convert document while preserving layout logic.', keywords: ['pdf', 'word'], icon: '📄' },
  { slug: 'email-spam-trigger-checker', title: 'Email Spam Detector', category: 'connectivity', description: 'Check content for ISP spam triggers.', keywords: ['spam', 'email'], icon: '📧' },
  { slug: 'website-uptime-simulator', title: 'Server Uptime Probability', category: 'connectivity', description: 'Predict downtime during peak traffic cycles.', keywords: ['uptime', 'ping'], icon: '⚡' },
  { slug: 'dark-pattern-detector', title: 'UX Dark Pattern Auditor', category: 'platform-conflicts', description: 'Identify predatory UI tricks on websites.', keywords: ['ux', 'audit'], icon: '🕵️' }
];

export const ToolRegistry = {
  getTools: () => TOOLS,
  getCategories: () => CATEGORIES,
  getToolBySlug: (slug: string) => TOOLS.find(t => t.slug === slug),
  getCategoryById: (id: string) => CATEGORIES.find(c => c.id === id),
  getToolsByCategory: (id: string) => TOOLS.filter(t => t.category === id),
  getTrendingTools: (limit = 8) => [...TOOLS].sort((a, b) => (b.priority || 0) - (a.priority || 0)).slice(0, limit)
};
