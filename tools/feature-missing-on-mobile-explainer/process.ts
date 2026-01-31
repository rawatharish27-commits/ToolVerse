
export async function process(input:{mobile:boolean}) {
  return {
    missing: input.mobile,
    reason: input.mobile ? "Feature disabled for mobile optimization" : "Feature available"
  };
}
