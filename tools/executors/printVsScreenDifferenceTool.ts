type Output = "screen" | "print";
type Paper = "plain" | "glossy" | "matte";
type Printer = "inkjet" | "laser";
type ColorMode = "rgb" | "cmyk";

export function printVsScreenDifferenceTool({
  output,
  paperType = "plain",
  printerType = "inkjet",
  widthPx,
  heightPx,
  dpi,
  colorMode = "rgb",
  brightnessAdjusted
}: {
  output: Output;
  paperType?: Paper;
  printerType?: Printer;
  widthPx?: number;
  heightPx?: number;
  dpi?: number;
  colorMode?: ColorMode;
  brightnessAdjusted?: boolean;
}) {
  const differences: string[] = [];
  const causes: string[] = [];
  const prep: string[] = [];
  const avoid: string[] = [];

  // Core differences
  if (output === "print") {
    differences.push("Prints often appear significantly darker and less vibrant than they do on screen.");
    causes.push("Screens are emissive (emit light), while prints are reflective (reflect ambient light).");
  } else {
    differences.push("Screens appear brighter and more saturated due to the sRGB color gamut.");
  }

  // DPI & resolution
  if (dpi && dpi < 200) {
    differences.push("Detail loss and soft edges in the final print.");
    causes.push("Printing requires roughly 3-4x higher pixel density than typical screen viewing.");
    prep.push("Export your final image at 300 DPI (Dots Per Inch) for professional results.");
    avoid.push("Printing low-resolution files enlarged to fit the paper size.");
  }

  // Color mode
  if (output === "print" && colorMode === "rgb") {
    differences.push("Noticeable color shifts, especially in bright blues and greens.");
    causes.push("Printers use CMYK inks which cannot replicate the full range of RGB screen colors.");
    prep.push("Slightly increase brightness and saturation by 5-10% to compensate for the ink absorbing light.");
  }

  // Paper effects
  if (paperType === "matte") {
    differences.push("Matte paper absorbs more ink, resulting in flatter blacks and lower contrast.");
    prep.push("Increase the 'Black Point' or contrast slightly if printing on heavy matte cardstock.");
  }
  if (paperType === "glossy") {
    differences.push("Glossy paper reflects more light, enhancing perceived sharpness and depth.");
  }

  // Printer effects
  if (printerType === "laser") {
    differences.push("Laser printers can sometimes struggle with smooth gradients compared to inkjet.");
  }

  // Brightness handling
  if (!brightnessAdjusted && output === "print") {
    prep.push("Boost overall exposure slightly before sending to print.");
    avoid.push("Assuming your screen's brightness level matches the paper's reflectance.");
  }

  // Resolution sanity
  if (widthPx && heightPx && (widthPx < 1200 || heightPx < 1200)) {
    avoid.push("Using small web images for high-quality A4 or larger prints.");
  }

  if (prep.length === 0) {
    prep.push("Use standard print settings and perform a small test strip before the final run.");
  }

  return {
    "Key Observations": differences,
    "Scientific Causes": causes,
    "Preparation Checklist": prep,
    "Common Mistakes": avoid,
    "Final Recommendation":
      "Always perform a small sample print. Every printer and ink-set has unique calibration characteristics."
  };
}