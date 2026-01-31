
export async function process(input: { osVersion: string, lastUpdateDays: number }) {
  const isNew = input.lastUpdateDays < 7;
  return {
    stabilityRisk: isNew ? "Beta/Recent Update instability" : "Stable",
    advice: isNew ? "Wait for hotfix or check forum for common bugs." : "OS is likely stable."
  };
}
