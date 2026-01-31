
export async function process(input:{base:number, final:number}) {
  return {
    hiddenCharges: input.final - input.base,
    detected: input.final > input.base
  };
}
