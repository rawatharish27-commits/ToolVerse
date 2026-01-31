
export async function process(input: { hasChainError: boolean, clockMismatch: boolean }) {
  const causes = [];
  if (input.hasChainError) causes.push("Intermediate certificate missing in server config.");
  if (input.clockMismatch) causes.push("Local system clock is out of sync.");
  
  return {
    found: causes.length > 0,
    causes,
    fix: input.clockMismatch ? "Sync your PC clock" : "Update server bundle"
  };
}
