
export async function process(input: { errorCode: string }) {
  const codes: Record<string, string> = {
    "550": "Mailbox unavailable or deleted",
    "552": "Recipient storage full",
    "421": "Server temporarily busy",
    "554": "Spam filter rejection"
  };
  return {
    reason: codes[input.errorCode] || "Unknown SMTP error",
    isPermanent: input.errorCode.startsWith("5")
  };
}
