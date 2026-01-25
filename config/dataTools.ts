export const csvToExcelConfig = {
  slug: "csv-to-excel-converter",
  title: "CSV to Excel Converter",
  description: "Convert large CSV files into high-fidelity Excel (.xlsx) workbooks. Handles custom delimiters and encoding automatically.",
  icon: "📊",
  colorClass: "bg-emerald-600",
  options: [
    { id: "sheetName", type: "text", label: "Worksheet Name", default: "Data_Export" },
    { id: "autoWidth", type: "toggle", label: "Auto-adjust Column Width", default: true }
  ]
};

export const excelDataCleanerConfig = {
  slug: "excel-data-cleaner",
  title: "Excel Data Cleaner",
  description: "Scrub Excel data: remove empty rows, trim whitespace, fix date formats, and normalize text cases.",
  icon: "🧹",
  colorClass: "bg-cyan-600",
  options: [
    { id: "removeEmpty", type: "toggle", label: "Remove Empty Rows", default: true },
    { id: "trimText", type: "toggle", label: "Trim All Whitespace", default: true },
    { id: "normalizeDates", type: "toggle", label: "Normalize Date Formats", default: false }
  ]
};

export const dataDeduplicationConfig = {
  slug: "data-deduplication-tool",
  title: "Data Deduplication Tool",
  description: "Find and remove duplicate records from your datasets with column-level precision.",
  icon: "👯",
  colorClass: "bg-indigo-600",
  options: [
    { id: "matchMode", type: "select", label: "Match Mode", values: ["Exact Match", "Fuzzy (Coming Soon)"], default: "Exact Match" },
    { id: "caseSensitive", type: "toggle", label: "Case Sensitive", default: false }
  ]
};

export const csvViewerConfig = {
  slug: "csv-viewer",
  title: "Professional CSV Viewer",
  description: "Upload and view CSV files in a clean, paginated table format directly in your browser.",
  icon: "📊",
  colorClass: "bg-cyan-600",
  options: [
    { id: "pageSize", label: "Rows to Preview", type: "select", values: [50, 100, 500, 1000], default: 100 },
    { id: "autoDetect", label: "Auto-Detect Delimiter", type: "toggle", default: true }
  ],
};

export const csvToJsonConfig = {
  slug: "csv-to-json",
  title: "CSV to JSON Converter",
  description: "Convert CSV data into structured JSON objects.",
  icon: "📜",
  colorClass: "bg-indigo-600",
  options: [
    { id: "prettyPrint", label: "Pretty Print Output", type: "toggle", default: true },
    { id: "delimiter", label: "Delimiter", type: "select", values: ["Auto-Detect", ",", ";", "Tab", "|"], default: "Auto-Detect" }
  ],
};

export const jsonToCsvConfig = {
  slug: "json-to-csv",
  title: "JSON to CSV Converter",
  description: "Transform JSON arrays into clean, formatted CSV files.",
  icon: "📄",
  colorClass: "bg-emerald-600",
  options: [
    { id: "flatten", label: "Flatten Nested Objects", type: "toggle", default: true },
    { id: "delimiter", label: "CSV Delimiter", type: "select", values: [",", ";", "Tab", "|"], default: "," }
  ],
};

export const excelViewerConfig = {
  slug: "excel-viewer",
  title: "Professional Excel Viewer",
  description: "View Excel (.xlsx, .xls) files directly in your browser without any software.",
  icon: "📗",
  colorClass: "bg-emerald-700",
  options: [
    { id: "maxRows", label: "Max Row Preview", type: "select", values: [100, 500, 1000, 5000], default: 500 },
    { id: "renderRaw", label: "Show Raw Values", type: "toggle", default: false }
  ],
};

export const dataCleanerConfig = {
  slug: "data-cleaner",
  title: "Pro Data Cleaner",
  description: "Clean and normalize your CSV or text data.",
  icon: "🧹",
  colorClass: "bg-cyan-500",
  options: [
    { id: "trim", label: "Trim Whitespace", type: "toggle", default: true },
    { id: "lowercase", label: "Convert to Lowercase", type: "toggle", default: false }
  ],
};

export const chartGeneratorConfig = {
  slug: "chart-generator",
  title: "Smart Chart Generator",
  description: "Create beautiful visualizations from your data instantly.",
  icon: "📈",
  colorClass: "bg-indigo-600",
  options: [
    { id: "chartType", label: "Chart Type", type: "select", values: ["Bar", "Line"], default: "Bar" },
    { id: "color", label: "Theme Color", type: "select", values: ["#4f46e5", "#10b981", "#ef4444", "#f59e0b", "#06b6d4"], default: "#4f46e5" }
  ],
};