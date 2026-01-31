
import { ToolMetadata } from '../types/platform';

/**
 * TOOLVERSE MASTER REGISTRY v12.5
 * Central index for all 500+ logic nodes.
 */
export const TOOL_REGISTRY: ToolMetadata[] = [
  {
    name: "Photo KB Size Reducer",
    slug: "image-size-reducer-kb",
    category: "image",
    subcategory: "compression",
    keywords: ["20kb", "50kb", "ssc photo", "compress image"],
    inputType: "file",
    outputType: "file",
    priority: 100,
    // Fix: Added missing properties 'related' and 'complexity'
    related: ["bulk-image-resizer-kb"],
    complexity: "medium"
  },
  {
    name: "OTP Delay Probability",
    slug: "otp-delay-probability-calculator",
    category: "network",
    subcategory: "diagnostics",
    keywords: ["otp delay", "sms delay"],
    inputType: "object",
    outputType: "object",
    priority: 95,
    // Fix: Added missing properties 'related' and 'complexity'
    related: ["email-spam-trigger-checker"],
    complexity: "medium"
  },
  {
    name: "EMI Reality Checker",
    slug: "emi-actual-vs-advertised-difference-calculator",
    category: "finance",
    subcategory: "loans",
    keywords: ["emi", "loan interest"],
    inputType: "object",
    outputType: "object",
    priority: 98,
    // Fix: Added missing properties 'related' and 'complexity'
    related: ["loan-eligibility-calculator"],
    complexity: "high"
  },
  // --- BATCH REPLICATION STUBS ---
  // Fix: Added missing properties 'related' and 'complexity' to all stubs
  { 
    name: "GST Calculator (India)", 
    slug: "gst-calculator-india", 
    category: "finance", 
    subcategory: "tax", 
    keywords: ["gst", "tax india"], 
    inputType: "object", 
    outputType: "object",
    related: [],
    complexity: "low"
  },
  { 
    name: "Resume ATS Score", 
    slug: "resume-ats-score-analyzer", 
    // Fix: Re-mapped invalid category 'career-diagnostics' to 'ai'
    category: "ai", 
    subcategory: "audit", 
    keywords: ["ats", "resume score"], 
    inputType: "text", 
    outputType: "object",
    related: [],
    complexity: "medium"
  },
  { 
    name: "PDF to Editable Word", 
    slug: "pdf-to-word-high-fidelity", 
    // Fix: Re-mapped invalid category 'pdf-diagnostics' to 'pdf'
    category: "pdf", 
    subcategory: "converter", 
    keywords: ["pdf", "word"], 
    inputType: "file", 
    outputType: "file",
    related: [],
    complexity: "high"
  },
  { 
    name: "Bulk Image Resizer", 
    slug: "bulk-image-resizer-kb", 
    // Fix: Re-mapped invalid category 'media-acceptance' to 'image'
    category: "image", 
    subcategory: "bulk", 
    keywords: ["resizer", "bulk"], 
    inputType: "file", 
    outputType: "file",
    related: ["image-size-reducer-kb"],
    complexity: "medium"
  },
  { 
    name: "Loan Eligibility", 
    slug: "loan-eligibility-calculator", 
    // Fix: Re-mapped invalid category 'finance-analysis' to 'finance'
    category: "finance", 
    subcategory: "eligibility", 
    keywords: ["loan", "home loan"], 
    inputType: "object", 
    outputType: "object",
    related: ["emi-actual-vs-advertised-difference-calculator"],
    complexity: "medium"
  },
  { 
    name: "Email Spam Checker", 
    slug: "email-spam-trigger-checker", 
    // Fix: Re-mapped invalid category 'email-comms' to 'network'
    category: "network", 
    subcategory: "spam", 
    keywords: ["spam", "email test"], 
    inputType: "text", 
    outputType: "object",
    related: [],
    complexity: "medium"
  },
  { 
    name: "Server Uptime Predictor", 
    slug: "website-uptime-simulator", 
    // Fix: Re-mapped invalid category 'connectivity' to 'network'
    category: "network", 
    subcategory: "network", 
    keywords: ["uptime", "server"], 
    inputType: "text", 
    outputType: "object",
    related: [],
    complexity: "medium"
  },
  { 
    name: "Dark Pattern Detector", 
    slug: "dark-pattern-detector", 
    // Fix: Re-mapped invalid category 'ux-performance' to 'dev'
    category: "dev", 
    subcategory: "audit", 
    keywords: ["dark patterns", "ui audit"], 
    inputType: "text", 
    outputType: "object",
    related: [],
    complexity: "medium"
  }
];

export const getToolBySlug = (slug: string) => 
  TOOL_REGISTRY.find(t => t.slug === slug);
