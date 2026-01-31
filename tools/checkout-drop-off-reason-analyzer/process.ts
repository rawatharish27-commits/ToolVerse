
export async function process(input:{fields:number}) {
  return {
    dropOffRisk: input.fields > 5,
    reason: "Too many form fields increase abandonment"
  };
}
