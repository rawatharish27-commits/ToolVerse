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
      reason: "Duplex scan reversed even pages during auto-collating.",
      fix: "Split PDF into individual pages, reverse only the even-numbered files, and re-merge alternately.",
      score: 10
    });
  }

  // Feeder vs flatbed logic
  if (creationMethod === "scan" && feederUsed === false) {
    issues.push({
      reason: "Manual flatbed scans often result in reversed (N to 1) order.",
      fix: "Reverse the entire page sequence once using a PDF reordering tool.",
      score: 8
    });
  }

  // Merge logic (alphabetical pitfalls)
  if (creationMethod === "merge") {
    issues.push({
      reason: "Files likely merged in numeric string order (1, 10, 11, 2).",
      fix: "Rename source files with zero-padding (e.g., 01, 02) before merging.",
      score: 7
    });
  }

  // Print-to-PDF pitfalls
  if (creationMethod === "print-to-pdf") {
    issues.push({
      reason: "Print engine reordered pages based on 'Booklet' or 'Multiple per sheet' layout.",
      fix: "Export to PDF directly from the source app instead of using a virtual printer.",
      score: 6
    });
  }

  // Pattern detection
  if (patternObserved === "odd-even") {
    issues.push({
      reason: "Odd and even pages were scanned in two separate batches.",
      fix: "Interleave the two stacks manually in a PDF merger tool (1-odd, 1-even, 2-odd, etc.).",
      score: 9
    });
  }

  if (patternObserved === "reversed") {
    issues.push({
      reason: "The paper stack was fed into the tray backwards.",
      fix: "Reverse the page order of the resulting PDF instantly.",
      score: 7
    });
  }

  if (issues.length === 0) {
    return {
      "Status": "SOLVED",
      "Analysis": "No structural order issue detected. Page flow appears standard.",
      "Future Tip": "Number your physical pages before scanning large stacks to easily verify order."
    };
  }

  issues.sort((a, b) => b.score - a.score);

  return {
    "Primary Order Conflict": issues[0].reason,
    "Step-by-Step Fix": issues[0].fix,
    "Secondary Factors": issues.slice(1).map(i => i.reason),
    "Prevention Strategy": "Use a document feeder with auto-collate, or rename files numerically before merging."
  };
}