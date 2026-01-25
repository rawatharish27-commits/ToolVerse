type Portal = "government" | "job" | "bank" | "university" | "other";
type Stability = "poor" | "average" | "good";

export function pdfUploadTimeEstimator({
  fileSizeMB,
  uploadSpeedMbps,
  portal = "other",
  stability = "average",
  concurrentUploads = 1
}: {
  fileSizeMB: number;
  uploadSpeedMbps: number;
  portal?: Portal;
  stability?: Stability;
  concurrentUploads?: number;
}) {
  // Real-world overhead factor (Handshake, SSL, API processing)
  let overhead = 1.3; 
  if (stability === "poor") overhead = 1.7;
  if (stability === "good") overhead = 1.15;

  // Bandwidth sharing
  const effectiveSpeedMbps = uploadSpeedMbps / Math.max(1, concurrentUploads);

  // Time in seconds: (Size in Megabits) / Speed in Mbps * overhead
  const seconds = ((fileSizeMB * 8) / Math.max(0.1, effectiveSpeedMbps)) * overhead;

  // Portal timeout assumptions (seconds)
  const portalTimeout = (portal === "government" || portal === "bank") ? 120 : 300;

  let risk: "Low" | "Medium" | "High" = "Low";
  if (seconds > portalTimeout) risk = "High";
  else if (seconds > portalTimeout * 0.7) risk = "Medium";

  const tips: string[] = [];
  if (risk !== "Low") {
    tips.push("Reduce PDF file size below 2MB before uploading.");
    tips.push("Upload during off-peak hours (Late night/Early morning).");
  }
  if (stability === "poor") {
    tips.push("Switch to a stable Broadband/Fiber network; avoid mobile hotspots.");
  }
  if (concurrentUploads > 1) {
    tips.push("Pause other active uploads to prioritize this session.");
  }

  const safeSizeMB = Math.floor((portalTimeout * effectiveSpeedMbps) / (8 * overhead)) || 1;

  return {
    "Estimated Time": seconds < 60 
      ? `${Math.ceil(seconds)} seconds` 
      : `${Math.ceil(seconds / 60)} minutes`,
    "Timeout Risk": risk.toUpperCase(),
    "Bottleneck Analysis": stability === "poor" ? "High Latency & Packet Loss" : "Standard Connection",
    "Actionable Tips": tips,
    "Safe File Suggestion": `${safeSizeMB} MB or smaller for this connection`
  };
}