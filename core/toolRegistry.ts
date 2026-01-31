
import { ToolMetadata } from '../types/platform';

/**
 * TOOLVERSE MASTER REGISTRY v12.0
 * This registry powers the Search Engine, Category Hubs, and Sitemaps.
 * 
 * To add a tool: 
 * 1. Generate folder via create-tool.js
 * 2. Add metadata entry below
 */
export const TOOL_REGISTRY: ToolMetadata[] = [
  {
    name: "Photo KB Size Reducer",
    slug: "image-size-reducer-kb",
    category: "image",
    subcategory: "compression",
    keywords: ["20kb", "50kb", "ssc photo", "upsc photo", "compress image"],
    related: ["passport-photo-maker", "image-dpi-checker"],
    inputType: "file",
    outputType: "file",
    complexity: "medium"
  },
  {
    name: "OTP Delay Probability",
    slug: "otp-delay-probability-calculator",
    category: "network",
    subcategory: "diagnostics",
    keywords: ["otp delay", "sms not coming", "jio otp", "airtel otp"],
    related: ["internet-speed-test", "ip-to-location"],
    inputType: "object",
    outputType: "object",
    complexity: "low"
  },
  {
    name: "EMI Reality Checker",
    slug: "emi-actual-vs-advertised-difference-calculator",
    category: "finance",
    subcategory: "loans",
    keywords: ["emi calculator", "flat vs reducing", "loan interest trick"],
    related: ["salary-calculator", "roi-calculator"],
    inputType: "object",
    outputType: "object",
    complexity: "high"
  }
  // BATCH 2: Add next 10 tools here...
];

export const getToolBySlug = (slug: string) => 
  TOOL_REGISTRY.find(t => t.slug === slug);
