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
  // Real-world protocol overhead (TCP, SSL, API handshake)
  let overhead = 1.3; 
  if (stability === "poor") overhead = 1.7;
  if (stability === "good") overhead = 1.15;

  // Bandwidth sharing for multiple tabs or background sync
  const effectiveSpeedMbps = uploadSpeedMbps / Math.max(1, concurrentUploads);

  // Time in seconds = (Size in Megabits) / Speed in Megabits per second
  const seconds = ((fileSizeMB * 8) / Math.max(0.1, effectiveSpeedMbps)) * overhead;

  // Portal timeout assumptions (seconds before portal kicks you out)
  const portalTimeout = (portal === "government" || portal === "bank") ? 120 : 300;

  let risk: "Low" | "Medium" | "High" = "Low";
  if (seconds > portalTimeout) risk = "High";
  else if (seconds > portalTimeout * 0.7) risk = "Medium";

  const tips: string[] = [];
  if (risk !== "Low") {
    tips.push("Reduce PDF file size below 2MB before uploading.");
    tips.push("Upload during off-peak hours (Late night/Early morning) when portal load is low.");
  }
  if (stability === "poor") {
    tips.push("Switch to a stable Broadband/Fiber network instead of Mobile Hotspot.");
  }
  if (concurrentUploads > 1) {
    tips.push("Pause other active uploads or downloads to prioritize this file.");
  }

  const safeSizeMB = Math.floor((portalTimeout * effectiveSpeedMbps) / (8 * overhead)) || 1;

  return {
    "Estimated Duration": seconds < 60 ? `${Math.ceil(seconds)} seconds` : `${Math.ceil(seconds / 60)}m ${Math.ceil(seconds % 60)}s`,
    "Portal Timeout Risk": risk.toUpperCase(),
    "Network Bottleneck": stability === "poor" ? "High Packet Loss Expected" : "Standard Latency",
    "Optimization Steps": tips,
    "Recommended File Cap": `${safeSizeMB} MB for this connection`
  };
}