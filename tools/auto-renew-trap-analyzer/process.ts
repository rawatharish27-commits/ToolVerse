
export async function process(input:{autoRenewEnabled:boolean}) {
  return {
    risk: input.autoRenewEnabled,
    recommendation: "Disable auto-renew if not required"
  };
}
