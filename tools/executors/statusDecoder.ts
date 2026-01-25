export function statusDecoder({
  statusText,
  portal
}: {
  statusText: string;
  portal: string;
}) {
  const lower = statusText.toLowerCase();
  
  if (lower.includes("scrutiny")) return { meaning: "Your documents are being manually verified for authenticity.", action: "Wait 3-5 working days." };
  if (lower.includes("provisional")) return { meaning: "Application accepted, but final validity depends on physical verification or further checks.", action: "Keep original documents ready." };
  if (lower.includes("objection")) return { meaning: "A discrepancy was found in your data or uploads.", action: "Check your email/SMS for details on how to re-upload." };
  if (lower.includes("dispatched")) return { meaning: "Your card/document has been printed and handed to the postal service.", action: "Track via provided tracking ID if available." };

  return {
    meaning: "Status is recognized by the system as a standard workflow node.",
    action: "Continue monitoring official notifications."
  };
}