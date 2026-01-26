
import { 
  salaryCalculatorConfig, roiCalculatorConfig, inflationCalculatorConfig,
  ageCalculatorConfig, emiCalculatorConfig, emiHighExplainerConfig,
  interestAnalyzerConfig, hiddenChargesDiscoveryConfig
} from '../config/calculatorTools';

export const TOOL_CONFIG_REGISTRY: Record<string, any> = {
  'why-upload-rejected-analyzer': {
    slug: 'why-upload-rejected-analyzer',
    title: 'Upload Rejection Analyzer',
    description: 'Deep audit of file compliance.',
    icon: '🔍',
    colorClass: 'bg-rose-600',
    options: [
      { id: 'portalType', type: 'select', label: 'Target Portal', values: ['Govt/SSC', 'UPSC', 'Job/ATS', 'Bank'], default: 'Govt/SSC' }
    ]
  },
  'resume-rejection-analyzer': {
    slug: 'resume-rejection-analyzer',
    title: 'Resume Rejection Analyzer',
    description: 'Analyze keywords and ATS compatibility.',
    icon: '🚫',
    colorClass: 'bg-indigo-600',
    options: [
      { id: 'targetRole', type: 'text', label: 'Target Role', default: 'Software Engineer' },
      { id: 'exp', type: 'number', label: 'Years of Experience', default: 2 }
    ]
  },
  'why-emi-high-explainer': emiHighExplainerConfig,
  'no-cost-emi-reality-checker': {
    slug: 'no-cost-emi-reality-checker',
    title: 'No-Cost EMI Reality Checker',
    description: 'Find hidden interest traps.',
    icon: '🕵️',
    colorClass: 'bg-rose-500',
    options: [
      { id: 'price', type: 'number', label: 'MRP', default: 50000 },
      { id: 'emi', type: 'number', label: 'Monthly EMI', default: 4500 }
    ]
  },
  'salary-calculator': salaryCalculatorConfig,
};

export const getToolConfig = (slug: string) => {
  return TOOL_CONFIG_REGISTRY[slug] || {
    title: slug.replace(/-/g, ' '),
    icon: "🛠️",
    description: "Diagnostic logic node.",
    colorClass: "bg-indigo-600",
    options: []
  };
};
