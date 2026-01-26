
import { Tool } from '../types';

/**
 * TOOLVERSE MASTER LOGIC REGISTRY
 * All tool implementations reside here for a single source of truth.
 * High-performance browser-native logic using WASM, WebCrypto, and Heuristic Engines.
 */
export const TOOLS: Tool[] = [
  // ==========================================
  // GOVERNMENT / FORM PAIN CLUSTER (1-10)
  // ==========================================
  {
    slug: 'why-upload-rejected-analyzer',
    title: 'Why My Upload Is Rejected? Analyzer',
    category: 'utility',
    description: 'Stop the rejection loop. Analyze your file against 15+ common portal rules to find hidden errors.',
    keywords: ['rejected', 'error', 'upload', 'government', 'ssc'],
    toolType: 'client',
    priority: 100,
    execute: async (file: File, options: any) => {
      const { govtCluster } = await import('../tools/executors/govtCluster');
      return govtCluster.analyzeRejection(file, options);
    }
  },
  {
    slug: 'govt-form-rule-decoder',
    title: 'Govt Form File Rule Decoder',
    category: 'utility',
    description: 'Get exact technical specs for UPSC, SSC, Banking, and State portals in plain English.',
    keywords: ['rules', 'decoder', 'portal', 'dimensions'],
    toolType: 'client',
    priority: 95,
    execute: async (options: any) => {
      const { govtCluster } = await import('../tools/executors/govtCluster');
      return govtCluster.decodeRules(options);
    }
  },
  {
    slug: 'signature-upload-fix-tool',
    title: 'Signature Upload Fix Tool',
    category: 'image',
    description: 'Auto-adjust contrast and crop signatures to meet strict government portal guidelines.',
    keywords: ['signature', 'fix', 'crop', 'ink'],
    toolType: 'client',
    priority: 98,
    execute: async (file: File) => {
      const { govtCluster } = await import('../tools/executors/govtCluster');
      return govtCluster.fixSignature(file);
    }
  },

  // ==========================================
  // IMAGE / MEDIA VIRAL PROBLEMS (11-20)
  // ==========================================
  {
    slug: 'blurry-after-upload-simulator',
    title: 'Why Image Looks Blurry After Upload? Simulator',
    category: 'image',
    description: 'See how Instagram or WhatsApp compression will affect your photo before you hit send.',
    keywords: ['blurry', 'compression', 'simulator', 'whatsapp', 'instagram'],
    toolType: 'client',
    priority: 92,
    execute: async (file: File, options: any) => {
      const { mediaAdvancedCluster } = await import('../tools/executors/mediaAdvancedCluster');
      return mediaAdvancedCluster.simulateBlur(file, options);
    }
  },
  {
    slug: 'image-stretching-predictor',
    title: 'Image Stretching Issue Predictor',
    category: 'image',
    description: 'Predict if your photo will look "squashed" or "stretched" on a portal based on aspect ratios.',
    keywords: ['stretch', 'aspect ratio', 'distortion'],
    toolType: 'client',
    execute: async (options: any) => {
      const { mediaAdvancedCluster } = await import('../tools/executors/mediaAdvancedCluster');
      return mediaAdvancedCluster.predictStretch(options);
    }
  },

  // ==========================================
  // PDF / DOCUMENT PAIN CLUSTER (21-30)
  // ==========================================
  {
    slug: 'pdf-not-opening-checker',
    title: 'Why PDF Is Not Opening on Portal? Checker',
    category: 'pdf',
    description: 'Diagnose structural errors, version mismatch, or encryption locks in PDF files.',
    keywords: ['pdf', 'not opening', 'error', 'portal'],
    toolType: 'client',
    execute: async (file: File) => {
      const { pdfAdvancedCluster } = await import('../tools/executors/pdfAdvancedCluster');
      return pdfAdvancedCluster.checkOpening(file);
    }
  },
  {
    slug: 'pdf-print-cutoff-predictor',
    title: 'PDF Print Cut-Off Predictor',
    category: 'pdf',
    description: 'Will your header or footer get sliced? Predict printer behavior based on margins.',
    keywords: ['print', 'cutoff', 'margins', 'pdf'],
    toolType: 'client',
    execute: async (options: any) => {
      const { pdfAdvancedCluster } = await import('../tools/executors/pdfAdvancedCluster');
      return pdfAdvancedCluster.predictCutoff(options);
    }
  },

  // ==========================================
  // JOB / CAREER PAIN CLUSTER (31-40)
  // ==========================================
  {
    slug: 'resume-rejection-analyzer',
    title: 'Resume Rejection Reason Analyzer',
    category: 'office',
    description: 'Identify ATS gaps, formatting risks, and keyword misses that get resumes rejected.',
    keywords: ['resume', 'rejection', 'ats', 'job', 'hiring'],
    toolType: 'client',
    priority: 99,
    execute: async (options: any) => {
      const { careerAdvancedCluster } = await import('../tools/executors/careerAdvancedCluster');
      return careerAdvancedCluster.analyzeResume(options);
    }
  },
  {
    slug: 'ats-keyword-gap-finder',
    title: 'ATS Keyword Gap Finder',
    category: 'office',
    description: 'Find missing skills in your resume compared to a Job Description.',
    keywords: ['ats', 'keywords', 'resume', 'skills'],
    toolType: 'client',
    execute: async (input: string) => {
      const { careerAdvancedCluster } = await import('../tools/executors/careerAdvancedCluster');
      return careerAdvancedCluster.findKeywordGap(input);
    }
  },

  // ==========================================
  // FINANCE CONFUSION CLUSTER (41-50)
  // ==========================================
  {
    slug: 'why-emi-high-explainer',
    title: 'Why EMI So High? Explainer Tool',
    category: 'calculators',
    description: 'Uncover the math of front-loaded interest and loan tenures.',
    keywords: ['emi', 'loan', 'interest', 'high emi'],
    toolType: 'client',
    priority: 88,
    execute: async (options: any) => {
      const { financeAdvancedCluster } = await import('../tools/executors/financeAdvancedCluster');
      return financeAdvancedCluster.explainEmi(options);
    }
  },
  {
    slug: 'no-cost-emi-reality-checker',
    title: '“No Cost EMI” Reality Checker',
    category: 'calculators',
    description: 'Expose hidden processing fees and pre-discount traps in "Zero Interest" deals.',
    keywords: ['no cost emi', 'hidden cost', 'emi reality'],
    toolType: 'client',
    execute: async (options: any) => {
      const { financeAdvancedCluster } = await import('../tools/executors/financeAdvancedCluster');
      return financeAdvancedCluster.checkNoCostEmi(options);
    }
  },

  // ==========================================
  // DAILY LIFE CLUSTER (51-60)
  // ==========================================
  {
    slug: 'internet-slow-analyzer',
    title: 'Why Internet Slow Despite High Speed? Analyzer',
    category: 'network',
    description: 'Diagnose DNS latency, ISP throttling, and hardware bottlenecks.',
    keywords: ['slow internet', 'wifi', 'dns', 'buffer'],
    toolType: 'client',
    execute: async (options: any) => {
      const { dailyLifeAdvancedCluster } = await import('../tools/executors/dailyLifeAdvancedCluster');
      return dailyLifeAdvancedCluster.analyzeInternet(options);
    }
  },
  {
    slug: 'otp-not-coming-flow-analyzer',
    title: 'Why OTP Not Coming? Flow Analyzer',
    category: 'network',
    description: 'Trace potential blocks like DND, carrier filters, or signal latency.',
    keywords: ['otp', 'sms', 'not coming', 'dnd'],
    toolType: 'client',
    execute: async () => {
      const { dailyLifeAdvancedCluster } = await import('../tools/executors/dailyLifeAdvancedCluster');
      return dailyLifeAdvancedCluster.analyzeOtpFlow();
    }
  },

  // Maintain core legacy tools
  { 
    slug: 'salary-calculator', 
    title: 'Salary Calculator (CTC to In-Hand)', 
    category: 'calculators', 
    description: 'India-specific tax breakdown FY 24-25.', 
    keywords: ['salary', 'tax', 'in-hand'], 
    toolType: 'client',
    execute: async (options: any) => {
      const { financeAdvancedCluster } = await import('../tools/executors/financeAdvancedCluster');
      return financeAdvancedCluster.calcSalary(options);
    }
  }
];
