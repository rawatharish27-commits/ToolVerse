
/**
 * TOOLVERSE CATEGORY REGISTRY (Auto-Generated)
 * Total Active Clusters: 4
 */
export const CATEGORY_REGISTRY: Record<string, any> = {
  "finance-analysis": {
    "id": "finance-analysis",
    "name": "Finance Analysis",
    "description": "Professional Finance Analysis tools for administrative and creative workflows.",
    "icon": "📊",
    "color": "bg-indigo-600",
    "tools": [
      { "slug": "emi-actual-vs-advertised-calculator", "title": "EMI Actual vs Advertised Difference Calculator" },
      { "slug": "gst-calculator-india", "title": "Gst Calculator India" }
    ]
  },
  "media-acceptance": {
    "id": "media-acceptance",
    "name": "Media Acceptance",
    "description": "Professional Media Acceptance tools for administrative and creative workflows.",
    "icon": "📉",
    "color": "bg-indigo-600",
    "tools": [
      { "slug": "image-size-reducer-kb", "title": "Image Size Reducer Kb" }
    ]
  },
  "connectivity": {
    "id": "connectivity",
    "name": "Connectivity",
    "description": "Professional Connectivity tools for administrative and creative workflows.",
    "icon": "🌐",
    "color": "bg-indigo-600",
    "tools": [
      { "slug": "otp-delay-probability-calculator", "title": "OTP Delay Probability Calculator" }
    ]
  },
  "career-diagnostics": {
    "id": "career-diagnostics",
    "name": "Career Diagnostics",
    "description": "Professional Career Diagnostics tools for administrative and creative workflows.",
    "icon": "🚀",
    "color": "bg-indigo-600",
    "tools": [
      { "slug": "resume-ats-score-analyzer", "title": "Resume Ats Score Analyzer" }
    ]
  }
};

export function getActiveCategories() {
  return Object.values(CATEGORY_REGISTRY).sort((a, b) => b.tools.length - a.tools.length);
}

export function getCategoryById(id: string) {
  return CATEGORY_REGISTRY[id];
}
