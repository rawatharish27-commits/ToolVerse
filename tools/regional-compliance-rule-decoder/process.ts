
export async function process(input:{region:string}) {
  const rules:any = {
    IN: "PAN/Aadhaar mandatory",
    EU: "GDPR consent required",
    US: "SSN validation required"
  };
  return {
    requirement: rules[input.region] || "Standard compliance"
  };
}
