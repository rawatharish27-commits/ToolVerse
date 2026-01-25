type Format = "jpg" | "png" | "webp";

function estimateBytes(pixels: number, format: Format, quality?: number) {
  if (format === "png") {
    return pixels * 3 * 0.6; // Average PNG compression factor
  }
  if (format === "webp") {
    const q = quality ?? 75;
    return pixels * 3 * (0.15 + (100 - q) / 500);
  }
  // jpg
  const q = quality ?? 80;
  return pixels * 3 * (0.2 + (100 - q) / 400);
}

export function pixelToKbCalculator({
  widthPx,
  heightPx,
  format = "jpg",
  quality
}: {
  widthPx: number;
  heightPx: number;
  format?: Format;
  quality?: number;
}) {
  const pixels = widthPx * heightPx;
  const bytes = estimateBytes(pixels, format, quality);
  const kb = bytes / 1024;

  const rangeLow = Math.max(1, Math.round(kb * 0.8));
  const rangeHigh = Math.round(kb * 1.2);

  return {
    "Estimated Size": `${rangeLow}–${rangeHigh} KB`,
    "Total Pixel Count": `${(pixels / 1000000).toFixed(2)} MP (${pixels.toLocaleString()} px)`,
    "Selected Format": format.toUpperCase(),
    "Relationship Logic": format === "png" ? "PNG is lossless; size is driven mainly by color complexity." : "Lossy formats reduce size based on quality quantization.",
    "Optimization Tips": [
      "Reduce dimensions to reliably hit KB limits.",
      format !== "png" ? "Lower quality slightly (5–10%) to save KB." : "Use JPG/WEBP for smaller file footprints."
    ],
    "Variable Disclaimer": "Actual size varies by content complexity and encoder efficiency."
  };
}