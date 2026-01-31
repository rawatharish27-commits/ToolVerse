
export async function process(input:{adBlockEnabled:boolean}) {
  return {
    affected: input.adBlockEnabled,
    reason: "Ad-blockers may block scripts and APIs"
  };
}
