
import { ToolCategory } from '../types';

export const CATEGORIES: ToolCategory[] = [
  { id: 'upload-rejection', name: 'Upload & Rejection', description: 'Analyze why files are being rejected by portals.', icon: '📤', color: 'bg-rose-500' },
  { id: 'pdf-diagnostics', name: 'PDF & Documents', description: 'Deep structural analysis of document files.', icon: '📄', color: 'bg-red-500' },
  { id: 'media-acceptance', name: 'Image & Media', description: 'Verify photo acceptance for official use.', icon: '🖼️', color: 'bg-emerald-500' },
  { id: 'career-diagnostics', name: 'Resume & Career', description: 'Optimize resumes for ATS and recruiters.', icon: '🚀', color: 'bg-indigo-600' },
  { id: 'connectivity', name: 'Network & Connectivity', description: 'Diagnose internet and OTP delivery issues.', icon: '🌐', color: 'bg-blue-500' },
  { id: 'email-comms', name: 'Email & Communication', description: 'Debug attachment and deliverability blocks.', icon: '📧', color: 'bg-amber-500' },
  { id: 'platform-conflicts', name: 'Platform Conflicts', description: 'Resolve Browser, OS, and App mismatches.', icon: '💻', color: 'bg-slate-700' },
  { id: 'finance-analysis', name: 'Finance & Transactions', description: 'Analyze payments, interest, and refunds.', icon: '💸', color: 'bg-emerald-600' },
  { id: 'ux-performance', name: 'UX & Performance', description: 'Audit layout shifts and interaction delays.', icon: '⚡', color: 'bg-purple-600' }
];
