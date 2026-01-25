type Portal = "ssc" | "upsc" | "banking" | "state-govt" | "other";
type FileType = "photo" | "signature" | "pdf";

const DEFAULT_RULES = {
  photo: {
    sizeKB: [20, 50],
    formats: ["jpg", "jpeg"],
    dpi: [100, 300],
    dimensions: "square or as specified"
  },
  signature: {
    sizeKB: [10, 50],
    formats: ["jpg", "jpeg"],
    dpi: [100, 300],
    dimensions: "rectangular"
  },
  pdf: {
    sizeKB: [50, 500],
    formats: ["pdf"],
    dpi: null,
    dimensions: "A4"
  }
};

export function govtFormFileRuleDecoder({
  portal,
  fileType,
  fileSizeKB,
  widthPx,
  heightPx,
  dpi,
  format
}: {
  portal: Portal;
  fileType: FileType;
  fileSizeKB?: number;
  widthPx?: number;
  heightPx?: number;
  dpi?: number;
  format?: string;
}) {
  const rules = DEFAULT_RULES[fileType];
  const issues: string[] = [];

  if (fileSizeKB) {
    if (fileSizeKB < rules.sizeKB[0] || fileSizeKB > rules.sizeKB[1]) {
      issues.push(`File size must be between ${rules.sizeKB[0]}KB and ${rules.sizeKB[1]}KB`);
    }
  }

  if (format && !rules.formats.includes(format.toLowerCase())) {
    issues.push(`Allowed formats: ${rules.formats.join(", ")}`);
  }

  if (dpi && rules.dpi) {
    if (dpi < rules.dpi[0] || dpi > rules.dpi[1]) {
      issues.push(`DPI should be between ${rules.dpi[0]} and ${rules.dpi[1]}`);
    }
  }

  return {
    portal,
    fileType,
    allowedRules: rules,
    validation: issues.length === 0 ? "Your file meets common government form rules" : "Your file does not meet the following rules",
    issues,
    fix: issues.length === 0 ? "No action needed" : "Resize, convert format, or adjust DPI as per allowed rules"
  };
}