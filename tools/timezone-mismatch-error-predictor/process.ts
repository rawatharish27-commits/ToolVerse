
export async function process(input: { localTz: string, serverTz: string }) {
  const mismatch = input.localTz !== input.serverTz;
  return {
    mismatch,
    authRisk: mismatch ? "Session/OTP token timing error likely" : "Low",
    fix: "Align system clock to Auto/Network time."
  };
}
