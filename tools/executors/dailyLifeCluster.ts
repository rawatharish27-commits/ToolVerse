
export function internetSlowAnalyzer({ connectionType }: any) {
  const symptoms = [
    "DNS Latency: Speed is high but 'lookup' takes 5 seconds.",
    "ISP Throttling: High speed on SpeedTest but slow on 4K Video.",
    "Hardware Bottleneck: Wi-Fi interference on 2.4GHz band."
  ];
  
  return {
    "Likely Bottleneck": connectionType === 'Wi-Fi' ? "Congestion / Signal Interference" : "ISP Peering Latency",
    "Hidden Reasons": symptoms,
    "The Fix": [
      "Change DNS to 1.1.1.1 (Cloudflare) or 8.8.8.8 (Google).",
      "Switch to 5GHz band if using Wi-Fi.",
      "Check 'Bufferbloat' metrics—high speed doesn't mean stable flow."
    ]
  };
}

export function otpNotComingAnalyzer() {
  return {
    "Network Block Points": [
      "DND (Do Not Disturb) Filter: Carrier level blocking.",
      "SMS Inbox Full: Device storage limit reached.",
      "International Roaming: Latency in cross-border handshakes."
    ],
    "The Trace Fix": [
      "Send 'START 0' to 1909 to reset DND (India).",
      "Toggle Airplane mode for 10s to force re-registration on cell tower.",
      "Verify 'Premium SMS' permissions in Android settings."
    ]
  };
}

export function emailBounceDecoder(errorMessage: string) {
  const low = errorMessage.toLowerCase();
  let cause = "Generic SMTP Failure";
  let fix = "Verify the recipient address.";

  if (low.includes("550")) { cause = "Mailbox Unavailable / Blocked"; fix = "The user has deleted the account or blocked your domain."; }
  if (low.includes("4.2.2") || low.includes("quota")) { cause = "Recipient Mailbox Full"; fix = "The user needs to delete old emails before they can receive yours."; }
  if (low.includes("spf") || low.includes("dkim")) { cause = "Security Filter Fail"; fix = "Your mail server is not authenticated; recipients are marking you as spam."; }

  return {
    "Technical Diagnosis": cause,
    "Error Logic": "The receiving server rejected the handshake based on the stated code.",
    "Recommended Action": fix
  };
}

// --- FIX: Exporting dailyLifeCluster as expected by master registry ---
export const dailyLifeCluster = {
  execute: async (slug: string, input: any, options: any) => {
    switch (slug) {
      case 'internet-slow-analyzer':
        return internetSlowAnalyzer(options);
      case 'otp-not-coming-analyzer':
        return otpNotComingAnalyzer();
      case 'email-bounce-decoder':
        return emailBounceDecoder(input);
      default:
        return { status: "Daily Life Resolved", slug };
    }
  }
};
