
export async function process(input:{nominal:number, effective:number}) {
  return {
    difference: input.effective - input.nominal,
    explanation: "Compounding increases effective interest"
  };
}
