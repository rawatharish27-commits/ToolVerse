
import { CategorySlug } from '../types';

export interface GuidedStep {
  toolSlug: string;
  instruction: string;
}

export interface ProblemHub {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: CategorySlug;
  flow: GuidedStep[];
}

export const PROBLEM_HUBS: ProblemHub[] = [
  {
    id: "govt-upload-failure-flow",
    title: "Government Upload Failure Flow",
    description: "Solve 'Invalid File' or 'Rejected' errors on SSC, UPSC, or State portals.",
    icon: "🏛️",
    category: "government",
    flow: [
      { toolSlug: "why-my-upload-is-rejected-analyzer", instruction: "Analyze the specific rejection pattern." },
      { toolSlug: "file-name-rejection-cause-finder", instruction: "Check for forbidden characters or length." },
      { toolSlug: "document-size-vs-dpi-conflict-explainer", instruction: "Resolve the mathematical conflict between size and DPI." },
      { toolSlug: "govt-image-compliance-tool", instruction: "Execute final image hardening for Govt standards." },
      { toolSlug: "govt-pdf-compliance-tool", instruction: "Execute final PDF hardening for Govt standards." },
      { toolSlug: "upload-success-probability-tool", instruction: "Calculate probability of acceptance." }
    ]
  },
  {
    id: "pdf-not-accepted-flow",
    title: "PDF Not Accepted Flow",
    description: "Fix PDF documents that portals refuse to load or display correctly.",
    icon: "📄",
    category: "pdf",
    flow: [
      { toolSlug: "pdf-upload-portal-acceptance-predictor", instruction: "Predict portal acceptance based on structure." },
      { toolSlug: "pdf-compliance-checker", instruction: "Verify ISO standard adherence." },
      { toolSlug: "pdf-font-embedding-risk-analyzer", instruction: "Audit font embedding health." },
      { toolSlug: "pdf-layering-issue-explainer", instruction: "Detect hidden layers or overprint issues." },
      { toolSlug: "pdf-security-flag-hidden-issue-detector", instruction: "Scan for owner locks and encryption flags." }
    ]
  },
  {
    id: "image-quality-rejection-flow",
    title: "Image Quality Rejection Flow",
    description: "Fix photos rejected due to 'Blur', 'Low Quality', or 'Wrong Dimensions'.",
    icon: "🖼️",
    category: "image",
    flow: [
      { toolSlug: "image-dpi-checker", instruction: "Check and fix pixel density metadata." },
      { toolSlug: "image-aspect-ratio-rejection-predictor", instruction: "Predict ratio-based failures." },
      { toolSlug: "image-color-space-rejection-analyzer", instruction: "Detect CMYK vs RGB conflicts." },
      { toolSlug: "image-transparency-rejection-predictor", instruction: "Identify alpha-channel rejection risks." },
      { toolSlug: "image-print-size-calculator", instruction: "Calculate physical output feasibility." }
    ]
  },
  {
    id: "resume-rejection-flow",
    title: "Resume Rejection Flow",
    description: "Optimize your resume to pass automated Applicant Tracking Systems (ATS).",
    icon: "🚀",
    category: "career",
    flow: [
      { toolSlug: "resume-parsing-preview", instruction: "View your resume through an ATS lens." },
      { toolSlug: "resume-keyword-over-optimization-detector", instruction: "Detect 'Keyword Stuffing' flags." },
      { toolSlug: "resume-section-ordering-impact-analyzer", instruction: "Analyze the impact of your section hierarchy." },
      { toolSlug: "resume-format-compatibility-checker", instruction: "Check for layout-based parsing errors." },
      { toolSlug: "resume-rejection-reason-analyzer", instruction: "Get a final strategic diagnostic." }
    ]
  },
  {
    id: "network-otp-failure-flow",
    title: "Network / OTP Failure Flow",
    description: "Diagnose why specific websites or OTP services are not working for you.",
    icon: "🌐",
    category: "network",
    flow: [
      { toolSlug: "internet-works-but-site-doesnt-analyzer", instruction: "Analyze DNS and CDN peering health." },
      { toolSlug: "otp-delay-probability-calculator", instruction: "Estimate SMS carrier delivery delay." },
      { toolSlug: "mobile-data-saver-impact-analyzer", instruction: "Audit data-saver corruption impacts." },
      { toolSlug: "browser-vs-app-behavior-difference-analyzer", instruction: "Identify protocol mismatches." }
    ]
  }
];
