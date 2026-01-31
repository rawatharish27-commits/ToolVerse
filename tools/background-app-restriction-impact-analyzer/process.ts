
export async function process(input: { batterySaverOn: boolean, ramLimitMb: number }) {
  const killingRisk = input.batterySaverOn || input.ramLimitMb < 512;
  return {
    risk: killingRisk ? "High" : "Low",
    reason: input.batterySaverOn ? "Battery optimization active" : "Low RAM threshold",
    advice: "Exclude app from battery optimization in OS settings."
  };
}
