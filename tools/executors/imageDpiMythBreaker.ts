type UseCase = "online" | "government" | "print";

export function imageDpiMythBreaker({
  useCase,
  dpi,
  widthPx,
  heightPx,
  printSizeInches
}: {
  useCase: UseCase;
  dpi?: number;
  widthPx?: number;
  heightPx?: number;
  printSizeInches?: number;
}) {
  const myths: string[] = [];
  const facts: string[] = [];
  const doChange: string[] = [];
  const dontChange: string[] = [];

  // Universal myths
  myths.push("Increasing DPI always improves image quality.");
  facts.push("DPI does not add detail; pixels determine detail.");

  // Use-case specifics
  if (useCase === "online") {
    myths.push("Websites care about DPI.");
    facts.push("Online platforms ignore DPI and use pixel dimensions only.");
    doChange.push("Increase pixel dimensions if image looks small or blurry.");
    dontChange.push("Do not change DPI expecting better online quality.");
  }

  if (useCase === "government") {
    myths.push("Government portals reject images due to low DPI alone.");
    facts.push("Most portals validate pixel size and file size, not DPI.");
    doChange.push("Match required pixel dimensions and file size limits.");
    dontChange.push("Avoid only changing DPI without resizing pixels.");
  }

  if (useCase === "print") {
    facts.push("For print, DPI affects how pixels map to physical size.");
    doChange.push("Ensure enough pixels for desired print size (e.g., 300 DPI).");
    if (dpi && widthPx && printSizeInches) {
      const neededPx = Math.round(dpi * printSizeInches);
      facts.push(
        `At ${dpi} DPI, you need ~${neededPx}px on the print side for sharp output.`
      );
    }
  }

  // False confidence warning
  if (dpi && widthPx && heightPx && dpi > 300 && (widthPx < 1000 || heightPx < 1000)) {
    facts.push(
      "High DPI with low pixel resolution does not improve clarity."
    );
    dontChange.push("Do not rely on DPI alone to fix clarity issues.");
  }

  const takeaway =
    useCase === "print"
      ? "For print: pixels × DPI together matter."
      : "For online/forms: pixels matter; DPI mostly does not.";

  return {
    "Myths Busted": myths,
    "Core Facts": facts,
    "What to Change": doChange,
    "What NOT to Change": dontChange,
    "Final Takeaway": takeaway
  };
}