
export async function process(input:{pageReloaded:boolean}) {
  return {
    lost: input.pageReloaded,
    reason: "Form submission triggers page reload"
  };
}
