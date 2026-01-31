
export async function process(input:{consentGiven:boolean}) {
  return {
    limited: !input.consentGiven,
    reason: "Features disabled without cookie consent"
  };
}
