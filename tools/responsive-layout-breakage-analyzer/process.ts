
export async function process(input:{viewportWidth:number}) {
  return {
    broken: input.viewportWidth < 360,
    reason: "Very small screens break layout"
  };
}
