export function pdfUploadEstimator(fileSize: number, connection: string) {
  const speeds: Record<string, number> = {
    "Mobile 3G": 0.5, // Mbps
    "Mobile 4G": 5,   // Mbps
    "Broadband (10Mbps)": 10,
    "High Speed (50Mbps+)": 50
  };

  const speed = speeds[connection] || 5;
  const sizeBits = fileSize * 8;
  const speedBits = speed * 1000 * 1000;
  
  const rawSeconds = sizeBits / speedBits;
  const overheadFactor = 1.3; // 30% overhead for TCP and portal processing
  const finalSeconds = Math.ceil(rawSeconds * overheadFactor);

  return {
    "Estimated Time": finalSeconds > 60 ? `${Math.floor(finalSeconds/60)}m ${finalSeconds%60}s` : `${finalSeconds} seconds`,
    "Connection Profile": connection,
    "Portal Latency": "Included (Estimated at 30%)",
    "Stability Warning": finalSeconds > 120 ? "High risk of session timeout. Ensure steady connection." : "Low risk of upload failure."
  };
}