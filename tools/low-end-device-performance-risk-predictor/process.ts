
export async function process(input:{score:number}) {
  return {
    highRisk: input.score < 50,
    recommendation: "Use lightweight mode on low-end devices"
  };
}
