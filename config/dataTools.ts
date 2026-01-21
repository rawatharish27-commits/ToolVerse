export const csvViewerConfig = {
  slug: "csv-viewer",
  title: "Professional CSV Viewer",
  description: "Upload and view CSV files in a clean, paginated table format directly in your browser. Auto-detects delimiters and handles large files safely.",
  icon: "📊",
  colorClass: "bg-cyan-600",
  options: [
    {
      id: "pageSize",
      label: "Rows to Preview",
      type: "select",
      values: [50, 100, 500, 1000],
      default: 100
    },
    {
      id: "autoDetect",
      label: "Auto-Detect Delimiter",
      type: "toggle",
      default: true
    }
  ],
};

export const csvToJsonConfig = {
  slug: "csv-to-json",
  title: "CSV to JSON Converter",
  description: "Convert CSV data into structured JSON objects. Perfect for developers and data analysts working with web APIs and modern applications.",
  icon: "📜",
  colorClass: "bg-indigo-600",
  options: [
    {
      id: "prettyPrint",
      label: "Pretty Print Output",
      type: "toggle",
      default: true
    },
    {
      id: "delimiter",
      label: "Delimiter",
      type: "select",
      values: ["Auto-Detect", ",", ";", "Tab", "|"],
      default: "Auto-Detect"
    },
    {
      id: "skipEmpty",
      label: "Skip Empty Lines",
      type: "toggle",
      default: true
    }
  ],
};

export const jsonToCsvConfig = {
  slug: "json-to-csv",
  title: "JSON to CSV Converter",
  description: "Transform JSON arrays into clean, formatted CSV files. Automatically flattens nested objects and generates headers.",
  icon: "📄",
  colorClass: "bg-emerald-600",
  options: [
    {
      id: "flatten",
      label: "Flatten Nested Objects",
      type: "toggle",
      default: true
    },
    {
      id: "delimiter",
      label: "CSV Delimiter",
      type: "select",
      values: [",", ";", "Tab", "|"],
      default: ","
    }
  ],
};

export const excelViewerConfig = {
  slug: "excel-viewer",
  title: "Professional Excel Viewer",
  description: "View Excel (.xlsx, .xls) files directly in your browser without any software. High-performance client-side rendering with sheet selection.",
  icon: "📗",
  colorClass: "bg-emerald-700",
  options: [
    {
      id: "maxRows",
      label: "Max Row Preview",
      type: "select",
      values: [100, 500, 1000, 5000],
      default: 500
    },
    {
      id: "renderRaw",
      label: "Show Raw Values",
      type: "toggle",
      default: false
    }
  ],
};

export const dataCleanerConfig = {
  slug: "data-cleaner",
  title: "Pro Data Cleaner",
  description: "Clean and normalize your CSV or text data. Remove duplicates, trim whitespace, and fix formatting instantly in your browser.",
  icon: "🧹",
  colorClass: "bg-cyan-500",
  options: [
    { id: "trim", label: "Trim Whitespace", type: "toggle", default: true },
    { id: "lowercase", label: "Convert to Lowercase", type: "toggle", default: false },
    { id: "removeEmpty", label: "Remove Empty Rows", type: "toggle", default: true },
    { id: "removeDuplicate", label: "Remove Duplicate Rows", type: "toggle", default: true },
  ],
};

export const duplicateRemoverConfig = {
  slug: "duplicate-remover",
  title: "Duplicate Remover",
  description: "Identify and remove duplicate entries from your data sets. Support for row-wise or column-specific deduplication.",
  icon: "👯",
  colorClass: "bg-indigo-500",
  options: [
    {
      id: "mode",
      label: "Deduplication Mode",
      type: "select",
      values: ["Full Row", "By Column"],
      default: "Full Row"
    },
    {
      id: "colIndex",
      label: "Column Index (0-based)",
      type: "number",
      default: 0
    },
    {
      id: "delimiter",
      label: "Delimiter",
      type: "select",
      values: [",", ";", "Tab", "|"],
      default: ","
    },
    {
      id: "caseSensitive",
      label: "Case Sensitive",
      type: "toggle",
      default: false
    }
  ],
};

export const chartGeneratorConfig = {
  slug: "chart-generator",
  title: "Smart Chart Generator",
  description: "Create beautiful visualizations from your data instantly. Supports bar and line charts with high-resolution export.",
  icon: "📈",
  colorClass: "bg-indigo-600",
  options: [
    {
      id: "chartType",
      label: "Chart Type",
      type: "select",
      values: ["Bar", "Line"],
      default: "Bar"
    },
    {
      id: "color",
      label: "Theme Color",
      type: "select",
      values: ["#4f46e5", "#10b981", "#ef4444", "#f59e0b", "#06b6d4"],
      default: "#4f46e5"
    },
    {
      id: "showValues",
      label: "Show Data Labels",
      type: "toggle",
      default: true
    }
  ],
};