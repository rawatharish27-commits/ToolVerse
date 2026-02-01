
import { TOOL_REGISTRY } from './toolRegistry';

/**
 * TOOLVERSE CATEGORY REGISTRY v2.0
 * Defined clusters for 100% production coverage.
 */
export const CATEGORY_REGISTRY: Record<string, any> = {
  "finance-analysis": {
    id: "finance-analysis",
    name: "Finance Analysis",
    description: "Verified mathematical logic nodes for taxes, loans, and investment forecasting.",
    icon: "📊",
    color: "bg-emerald-600"
  },
  "pdf-diagnostics": {
    id: "pdf-diagnostics",
    name: "PDF & Documents",
    description: "WASM-native document utilities with 100% browser-side privacy.",
    icon: "📄",
    color: "bg-red-600"
  },
  "media-acceptance": {
    id: "media-acceptance",
    name: "Image & Media",
    description: "High-precision photo optimization for government and professional uploads.",
    icon: "🖼️",
    color: "bg-indigo-600"
  },
  "career-diagnostics": {
    id: "career-diagnostics",
    name: "Resume & Career",
    description: "AI-driven diagnostics for ATS compliance and strategic career growth.",
    icon: "🚀",
    color: "bg-indigo-700"
  },
  "ai": {
    id: "ai",
    name: "Neural AI Hub",
    description: "Advanced generative and analytical models powered by Gemini 3.0 Pro.",
    icon: "🧠",
    color: "bg-purple-600"
  },
  "seo": {
    id: "seo",
    name: "SEO & Visibility",
    description: "Industrial-grade search engine optimization and analytics nodes.",
    icon: "🌐",
    color: "bg-blue-600"
  },
  "connectivity": {
    id: "connectivity",
    name: "Network & Traffic",
    description: "Real-time network diagnostic and connectivity verification utilities.",
    icon: "📡",
    color: "bg-cyan-600"
  },
  "platform-conflicts": {
    id: "platform-conflicts",
    name: "Web Utilities",
    description: "Developer-centric utilities for data formatting and binary encoding.",
    icon: "💻",
    color: "bg-slate-800"
  }
};

export function getActiveCategories() {
  return Object.values(CATEGORY_REGISTRY).map(cat => ({
    ...cat,
    toolCount: TOOL_REGISTRY.filter(t => t.category === cat.id).length
  })).sort((a, b) => b.toolCount - a.toolCount);
}

export function getCategoryById(id: string) {
  const cat = CATEGORY_REGISTRY[id];
  if (!cat) return null;
  return {
    ...cat,
    tools: TOOL_REGISTRY.filter(t => t.category === id)
  };
}
