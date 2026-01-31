
// Fix: Import React to resolve 'Cannot find namespace React' error
import React, { lazy } from 'react';
import { Tool } from '../types';

export interface RegisteredTool extends Tool {
  component: React.ComponentType<any>;
}

/**
 * TOOLVERSE MASTER REGISTRY (Auto-Generated)
 * Total Active Nodes: 5
 */
export const TOOL_REGISTRY: RegisteredTool[] = [
  {
    slug: 'emi-actual-vs-advertised-calculator',
    title: 'EMI Actual vs Advertised Difference Calculator',
    category: 'finance-analysis' as any,
    description: 'The bank says 8% Flat Rate, but my EMI feels much higher. What is the real reducing rate?',
    icon: '📊',
    keywords: [],
    component: lazy(() => import('../tools/emi-actual-vs-advertised-calculator/index'))
  },
  {
    slug: 'gst-calculator-india',
    title: 'Gst Calculator India',
    category: 'finance-analysis' as any,
    description: 'Auto-fixed tool',
    icon: '🏷️',
    keywords: [],
    component: lazy(() => import('../tools/gst-calculator-india/index'))
  },
  {
    slug: 'image-size-reducer-kb',
    title: 'Image Size Reducer Kb',
    category: 'media-acceptance' as any,
    description: 'Auto-fixed tool',
    icon: '📉',
    keywords: [],
    component: lazy(() => import('../tools/image-size-reducer-kb/index'))
  },
  {
    slug: 'otp-delay-probability-calculator',
    title: 'OTP Delay Probability Calculator',
    category: 'connectivity' as any,
    description: 'Professional logic node.',
    icon: '🌐',
    keywords: [],
    component: lazy(() => import('../tools/otp-delay-probability-calculator/index'))
  },
  {
    slug: 'resume-ats-score-analyzer',
    title: 'Resume Ats Score Analyzer',
    category: 'career-diagnostics' as any,
    description: 'Auto-fixed tool',
    icon: '🚀',
    keywords: [],
    component: lazy(() => import('../tools/resume-ats-score-analyzer/index'))
  }
];

export const ToolRegistry = {
  getTools: () => TOOL_REGISTRY,
  getToolBySlug: (slug: string) => TOOL_REGISTRY.find(t => t.slug === slug),
  getToolsByCategory: (catId: string) => TOOL_REGISTRY.filter(t => t.category === catId)
};