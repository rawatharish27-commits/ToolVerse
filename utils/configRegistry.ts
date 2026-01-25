
// ... existing imports
import { 
  ageCalculatorConfig, percentageCalculatorConfig, discountCalculatorConfig, 
  simpleInterestConfig, emiCalculatorConfig, bmiCalculatorConfig, 
  gstCalculatorConfig, compoundInterestConfig, profitLossConfig, 
  loanCalculatorConfig, roiCalculatorConfig, durationCalculatorConfig, 
  salaryCalculatorConfig, inflationCalculatorConfig, emiHighExplainerConfig
} from '../config/calculatorTools';
import { 
  jsonFormatterConfig, htmlCssFormatterConfig, jsMinifierConfig, 
  base64Config, regexTesterConfig
} from '../config/devTools';

export const TOOL_CONFIG_REGISTRY: Record<string, any> = {
  // Existing ...
  'salary-calculator': salaryCalculatorConfig,
  'roi-calculator': roiCalculatorConfig,
  'json-formatter': jsonFormatterConfig,
  'html-minifier': {
    slug: 'html-minifier',
    title: 'HTML Minifier',
    description: 'Compress HTML for production use.',
    icon: '📦',
    colorClass: 'bg-amber-600',
    options: []
  },
  'css-beautifier': {
    slug: 'css-beautifier',
    title: 'CSS Beautifier',
    description: 'Format CSS into readable blocks.',
    icon: '🌈',
    colorClass: 'bg-blue-500',
    options: []
  },
  'time-zone-converter': {
    slug: 'time-zone-converter',
    title: 'Global Time Zone Converter',
    description: 'Real-time city clock conversion.',
    icon: '🌍',
    colorClass: 'bg-cyan-600',
    options: []
  },
  'password-generator': {
    slug: 'password-generator',
    title: 'Secure Password Generator',
    description: 'Generate entropy-rich passwords.',
    icon: '🔑',
    colorClass: 'bg-indigo-600',
    options: []
  }
};

export const getToolConfig = (slug: string) => {
  return TOOL_CONFIG_REGISTRY[slug] || {
    title: slug.replace(/-/g, ' '),
    icon: "🛠️",
    colorClass: "bg-indigo-600",
    options: []
  };
};
