
export async function process(input: { oldExt: string, newExt: string }) {
  const dangerous = ["exe", "bat", "js", "vbs"];
  const isMismatched = input.oldExt !== input.newExt;
  const isDangerous = dangerous.includes(input.newExt.toLowerCase());

  return {
    mismatch: isMismatched,
    securityFlag: isDangerous,
    impact: isDangerous ? "Blocking likely by ISP" : (isMismatched ? "File corruption risk" : "Safe")
  };
}
