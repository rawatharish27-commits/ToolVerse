
export async function process(input:{blocked:boolean}) {
  return {
    failed: input.blocked,
    reason: input.blocked ? "Script blocked by network or extension" : "Loaded successfully"
  };
}
