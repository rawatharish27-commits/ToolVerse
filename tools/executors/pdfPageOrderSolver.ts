type Creation = "scan" | "merge" | "export" | "print-to-pdf";
type ScanType = "single-side" | "duplex";
type Pattern = "reversed" | "odd-even" | "random";

type Issue = {
  reason: string;
  fix: string;
  score: number;
};

export function pdfPageOrderSolver({
  creationMethod,
  scanType,
  feederUsed,
  patternObserved,
  pageNumbersVisible
}: {
  creationMethod: Creation;
  scanType?: ScanType;
  feederUsed?: boolean;
  patternObserved?: Pattern;
  pageNumbersVisible?: boolean;
}) {
  const issues: Issue[] = [];

  // Duplex scanning logic
  if (creationMethod === "scan" && scanType === "duplex") {
    issues.push({
      reason: "Duplex scan reordered even pages during auto-collating.",
      fix: "Split PDF into individual pages, then re-merge by alternating Front (Odd) and Back (Even) stacks.",
      score: 10
    });
  }

  // Feeder vs flatbed logic
  if (creationMethod === "scan" && feederUsed === false) {
    issues.push({
      reason: "Manual flatbed scanning often results in descending (N to 1) order.",
      fix: "Use our 'PDF Reverser' logic by re-merging split pages in descending order.",
      score: 8
    });
  }

  // Merge logic (alphabetical pitfalls)
  if (creationMethod === "merge") {
    issues.push({
      reason: "Files merged alphabetically (Page 1, Page 10, Page 2).",
      fix: "Rename source files with zero-padding (e.g., 001.pdf, 002.pdf) before merging.",
      score: 7
    });
  }

  // Print-to-PDF pitfalls
  if (creationMethod === "print-to-pdf") {
    issues.push({
      reason: "Print engine reordered pages for 'Booklet' or 'Multiple per sheet' layout.",
      fix: "Use 'Save As' or 'Export to PDF' directly from your application to maintain flow.",
      score: 6
    });
  }

  // Pattern detection
  if (patternObserved === "odd-even") {
    issues.push({
      reason: "Odd and even pages were scanned as two separate batches.",
      fix: "Interleave the two batches using a 'Shuffle Merge' tool (1-odd, 2-even, etc.).",
      score: 9
    });
  }

  if (patternObserved === "reversed") {
    issues.push({
      reason: "Stack was fed into the tray backwards.",
      fix: "Reverse the page order of the final PDF instantly.",
      score: 7
    });
  }

  if (issues.length === 0) {
    return {
      "Status": "Solved",
      "Finding": "No structural order issue detected. Your page flow appears standard.",
      "Future Best Practice": "Always number your physical pages lightly with a pencil before scanning large stacks."
    };
  }

  issues.sort((a, b) => b.score - a.score);

  return {
    "Primary Order Conflict": issues[0].reason,
    "Secondary Contributors": issues.slice(1).map(i => i.reason),
    "Recommended Reorder Strategy": issues[0].fix,
    "Pro-Tip": "Enable OCR before reordering to help identify 'Page X of Y' markers automatically.",
    "Accepted Profile": "Sequential, Ascending, Single-side Logic"
  };
}