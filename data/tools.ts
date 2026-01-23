import { Tool } from '../types';

export const TOOLS: Tool[] = [
  // --- AI TEXT HUB ---
  { slug: 'ai-article-generator', title: 'AI Article Writer Pro', category: 'ai', priority: 100, description: 'Generate structured, SEO-ready articles with full orchestrator insights.', keywords: ['blog', 'writer', 'content generator'], toolType: 'ai' },
  { slug: 'ai-article-rewriter', title: 'Smart Content Rewriter', category: 'ai', priority: 95, description: 'Rewrite existing content to improve readability, flow, and impact.', keywords: ['rewrite', 'paraphrase', 'spin text'], toolType: 'ai' },
  { slug: 'ai-grammar-fixer', title: 'Professional Proofreader', category: 'ai', priority: 90, description: 'Fix grammar, spelling, and punctuation while maintaining your unique voice.', keywords: ['grammar', 'fix typos', 'spellcheck'], toolType: 'ai' },
  { slug: 'ai-tone-converter', title: 'Tone Shifter', category: 'ai', priority: 85, description: 'Transform any text into Formal, Friendly, Professional, or Marketing tones.', keywords: ['tone', 'style', 'writing style'], toolType: 'ai' },
  { slug: 'ai-seo-optimizer', title: 'SEO Content Enhancer', category: 'ai', priority: 98, description: 'Inject keywords and optimize structure for better search engine rankings.', keywords: ['seo', 'keyword optimization', 'ranking'], toolType: 'ai' },
  { slug: 'ai-email-generator', title: 'AI Email Assistant', category: 'ai', priority: 92, description: 'Generate high-conversion cold emails and professional correspondence.', keywords: ['email', 'outreach', 'writing'], toolType: 'ai' },
  { slug: 'ai-resume-writer', title: 'Resume Bullet Optimizer', category: 'ai', priority: 88, description: 'Turn simple tasks into high-impact professional accomplishments for your CV.', keywords: ['resume', 'cv', 'job search'], toolType: 'ai' },
  { slug: 'ai-story-generator', title: 'Creative Story Studio', category: 'ai', priority: 80, description: 'Create engaging short stories and fiction based on simple plot ideas.', keywords: ['story', 'fiction', 'creative writing'], toolType: 'ai' },
  { slug: 'ai-youtube-script', title: 'YouTube Script Architect', category: 'ai', priority: 94, description: 'Plan and write scripts for viral videos including hooks and CTAs.', keywords: ['youtube', 'script', 'video content'], toolType: 'ai' },
  { slug: 'ai-product-description', title: 'E-commerce Copywriter', category: 'ai', priority: 91, description: 'Generate persuasive product descriptions that drive sales and clicks.', keywords: ['product', 'description', 'copywriting'], toolType: 'ai' },

  // --- SOCIAL MEDIA HUB ---
  { slug: 'social-caption-generator', title: 'AI Social Caption Master', category: 'social', priority: 100, description: 'Generate platform-optimized, high-engagement captions using engagement psychology.', keywords: ['caption generator', 'social media copy'], toolType: 'ai' },
  { slug: 'social-hashtag-generator', title: 'AI Social Hashtag Architect', category: 'social', priority: 98, description: 'Generate relevant hashtags to maximize organic reach.', keywords: ['hashtag generator', 'reach'], toolType: 'ai' },
  { slug: 'social-bio-generator', title: 'AI Social Bio Architect', category: 'social', priority: 96, description: 'Generate professional, conversion-oriented bios.', keywords: ['bio generator', 'profile optimization'], toolType: 'ai' },
  { slug: 'social-reel-idea-generator', title: 'AI Reel Idea Architect', category: 'social', priority: 95, description: 'Generate viral reel concepts with hooks and scene flows.', keywords: ['reel ideas', 'tiktok hooks'], toolType: 'ai' },
  { slug: 'social-poll-creator', title: 'AI Social Poll Architect', category: 'social', priority: 89, description: 'Generate high-engagement poll questions.', keywords: ['poll creator', 'engagement'], toolType: 'ai' },

  // --- EDUCATION HUB ---
  { slug: 'edu-study-planner', title: 'AI Study Planner', category: 'education', priority: 100, description: 'Generate custom study schedules and milestones.', keywords: ['study plan', 'student productivity'], toolType: 'ai' },
  { slug: 'edu-summary-generator', title: 'Notes Summarizer', category: 'education', priority: 98, description: 'Transform notes into concise summaries and key takeaways.', keywords: ['summarize', 'notes'], toolType: 'ai' },
  { slug: 'edu-quiz-generator', title: 'AI Quiz Generator', category: 'education', priority: 94, description: 'Generate MCQs and quizzes from any topic.', keywords: ['quiz generator', 'test creator'], toolType: 'ai' },
  { slug: 'edu-assignment-formatter', title: 'AI Assignment Formatter', category: 'education', priority: 92, description: 'Format raw content into submission-ready assignments.', keywords: ['assignment formatter', 'academic writing'], toolType: 'ai' },
  { slug: 'edu-citation-architect', title: 'AI Citation Architect', category: 'education', priority: 93, description: 'Generate perfect APA, MLA, or Chicago style citations.', keywords: ['citations', 'bibliography'], toolType: 'ai' },

  // --- FINANCE HUB (CALCULATORS) ---
  { slug: 'compound-interest-calc', title: 'Compound Interest Architect', category: 'calculators', priority: 100, description: 'Calculate the power of compounding with future value projections and AI growth strategy.', keywords: ['compound interest', 'investment calculator', 'savings planner', 'wealth architect'], toolType: 'ai' },
  { slug: 'mortgage-calculator', title: 'Mortgage Amortization Pro', category: 'calculators', priority: 98, description: 'Detailed home loan repayment analysis with amortization schedule and refinancing AI insights.', keywords: ['mortgage calculator', 'home loan', 'emi calculator', 'house loan'], toolType: 'ai' },
  { slug: 'income-tax-planner', title: 'Global Income Tax Planner', category: 'calculators', priority: 97, description: 'Estimate tax liability and explore AI-suggested tax-saving instruments and exemptions.', keywords: ['tax calculator', 'income tax', 'tax savings', 'tax planner'], toolType: 'ai' },
  { slug: 'inflation-calculator', title: 'Future Value & Inflation Core', category: 'calculators', priority: 95, description: 'Understand how inflation impacts your purchasing power and future savings goals.', keywords: ['inflation calculator', 'future value', 'money value'], toolType: 'ai' },
  
  // --- NETWORK HUB ---
  { slug: 'ip-lookup', title: 'IP Intelligence Lookup', category: 'network', priority: 100, description: 'Deep logical and heuristic analysis of IP addresses for security, geolocation, and risk signals.', keywords: ['ip lookup', 'ip info', 'ip intelligence', 'whois'], toolType: 'ai' },
  { slug: 'dns-lookup', title: 'DNS Lookup & Analyzer', category: 'network', priority: 95, description: 'Comprehensive DNS record analysis, security audit, and misconfiguration detection.', keywords: ['dns', 'nslookup', 'dig', 'mx record', 'spf'], toolType: 'ai' },
  { slug: 'whois-lookup', title: 'WHOIS Lookup & Analyzer', category: 'network', priority: 92, description: 'Detailed domain and IP registration intelligence, ownership history, and risk factor analysis.', keywords: ['whois', 'domain owner', 'registration info', 'ip owner'], toolType: 'ai' },
  { slug: 'ping-tool', title: 'AI Ping & Connectivity Analyzer', category: 'network', priority: 91, description: 'Analyze host reachability and latency quality using logical diagnostics and heuristic interpretation.', keywords: ['ping', 'connectivity', 'latency', 'reachability'], toolType: 'ai' },
  { slug: 'traceroute-tool', title: 'AI Traceroute Path Analyzer', category: 'network', priority: 89, description: 'Deep analysis of network paths and hop-by-hop bottlenecks using logical diagnostics and trace interpretation.', keywords: ['traceroute', 'network path', 'hop count', 'latency spike', 'bottleneck'], toolType: 'ai' },
  { slug: 'port-checker', title: 'AI Port Checker & Service Analyzer', category: 'network', priority: 88, description: 'Analyze network port exposure, map services, and identify security risks using scan data interpretation.', keywords: ['port checker', 'open ports', 'port scanner', 'service audit', 'nmap analyzer'], toolType: 'ai' },
  { slug: 'internet-speed-test', title: 'AI Internet Speed & Stability Analyzer', category: 'network', priority: 87, description: 'Evaluate connection quality, latency stability, and jitter performance with actionable performance insights.', keywords: ['speed test', 'bandwidth', 'latency', 'jitter', 'connection quality'], toolType: 'ai' },
  { slug: 'what-is-my-ip', title: 'IP Lookup Tool', category: 'network', priority: 90, description: 'Check your public IP and network details.', keywords: ['myip', 'lookup'], toolType: 'client' },

  // --- CLIENT SIDE HUB ---
  { slug: 'image-compressor', title: 'Smart Image Compressor', category: 'image', priority: 100, description: 'Compress PNG/JPG/WebP without quality loss.', keywords: ['compress', 'optimization'], toolType: 'client' },
  { slug: 'background-remover', title: 'Local Background Remover', category: 'image', priority: 99, description: 'Remove backgrounds instantly with neural networks.', keywords: ['bg remover', 'transparent'], toolType: 'client' },
  { slug: 'pdf-merge', title: 'PDF Merger Tool', category: 'pdf', priority: 100, description: 'Combine multiple PDF files into a single document.', keywords: ['merge', 'pdf joiner'], toolType: 'client' },
  { slug: 'qr-code-generator', title: 'QR Code Pro Studio', category: 'utility', priority: 97, description: 'Generate high-res QR codes for URLs and text.', keywords: ['qr', 'generator'], toolType: 'client' },
];