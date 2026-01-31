
export async function process(input:{extensions:number}) {
  return {
    conflictLikely: input.extensions > 5,
    recommendation: "Disable unnecessary extensions"
  };
}
