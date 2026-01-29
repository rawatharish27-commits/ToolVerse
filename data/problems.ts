
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
    id: "govt-upload-fail",
    title: "Government Portal Upload Failure",
    description: "Your photo or PDF is being rejected by SSC, UPSC, or State Portals.",
    icon: "🏛️",
    category: "government",
    flow: [
      { toolSlug: "file-name-rejection-cause-finder", instruction: "Check for forbidden characters or length." },
      { toolSlug: "image-dpi-checker", instruction: "Ensure 300/600 DPI compliance." },
      { toolSlug: "size-vs-dpi-conflict-explainer", instruction: "Check if size is mathematically possible for your DPI." },
      { toolSlug: "govt-image-compliance-tool", instruction: "Verify final portal constraints." }
    ]
  },
  {
    id: "pdf-rejection",
    title: "PDF Not Accepted Flow",
    description: "Portal refuses to display or accept your PDF document.",
    icon: "📄",
    category: "pdf",
    flow: [
      { toolSlug: "pdf-security-flag-issue-detector", instruction: "Find hidden encryption or owner locks." },
      { toolSlug: "pdf-font-embedding-risk-analyzer", instruction: "Check if fonts will break on the server." },
      { toolSlug: "pdf-compliance-checker", instruction: "Run a full structure audit." }
    ]
  },
  {
    id: "resume-rejection",
    title: "Resume/ATS Rejection Flow",
    description: "Your resume is not getting parsed correctly by recruiter systems.",
    icon: "🚀",
    category: "career",
    flow: [
      { toolSlug: "resume-parsing-preview", instruction: "View your resume through an ATS lens." },
      { toolSlug: "resume-keyword-optimization-detector", instruction: "Check for keyword stuffing or absence." },
      { toolSlug: "resume-rejection-analyzer", instruction: "Get a final probability score." }
    ]
  }
];
