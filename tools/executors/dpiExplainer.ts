export function dpiExplainer({
  targetSizeKB,
  targetDPI,
  widthCm,
  heightCm
}: {
  targetSizeKB: number;
  targetDPI: number;
  widthCm: number;
  heightCm: number;
}) {
  const widthIn = widthCm / 2.54;
  const heightIn = heightCm / 2.54;
  
  const totalPixels = (widthIn * targetDPI) * (heightIn * targetDPI);
  const rawSizeKB = (totalPixels * 3) / 1024; // 24-bit color estimate
  
  // Typical JPEG compression ratio is 10:1 to 20:1 for high quality
  const compressedSizeKB = rawSizeKB / 15;
  
  const isConflict = compressedSizeKB > targetSizeKB;
  const feasibility = isConflict ? "High Conflict" : "Feasible";

  return {
    verdict: feasibility,
    analysis: `At ${targetDPI} DPI, your image generates ${Math.round(totalPixels)} pixels. Raw data is ~${Math.round(rawSizeKB)}KB.`,
    explanation: isConflict 
      ? "Conflict: Your size limit is too tight for this DPI. Portals often ask for 300 DPI but <50KB, which is mathematically difficult without heavy blurring." 
      : "No conflict: These settings should work with standard JPEG compression.",
    sweetSpot: isConflict ? `Try reducing DPI to ${Math.round(targetDPI * (targetSizeKB / compressedSizeKB))} for better results.` : "Current settings are optimal."
  };
}