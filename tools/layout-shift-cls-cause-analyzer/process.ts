
export async function process(input:{adsInjected:boolean}) {
  return {
    clsRisk: input.adsInjected,
    recommendation: "Reserve fixed ad space to prevent layout shift"
  };
}
