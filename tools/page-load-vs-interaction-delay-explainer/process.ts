
export async function process(input:{loadMs:number, interactMs:number}) {
  return {
    delayed: input.interactMs > input.loadMs,
    reason: "Heavy JS delays interaction readiness"
  };
}
