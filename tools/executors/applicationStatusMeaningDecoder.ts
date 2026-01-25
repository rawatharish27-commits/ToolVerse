type Portal = "government" | "job" | "bank" | "university" | "other";

const STATUS_MAP: Record<string, any> = {
  "scrutiny": {
    meaning: "Manual verification in progress.",
    backend: "Officer is cross-checking your documents with official databases.",
    normalDays: 14,
    next: "Check back after 10 working days. No action needed now."
  },
  "objection": {
    meaning: "Missing or incorrect information detected.",
    backend: "The system flagged a mismatch in your file or data fields.",
    normalDays: 2,
    next: "Check 'Notices' or 'Inbox' on the portal immediately to re-upload."
  },
  "provisional": {
    meaning: "Accepted temporarily, pending final check.",
    backend: "Initial validation passed. Final audit happens before card/result generation.",
    normalDays: 5,
    next: "Keep original physical documents ready for verification."
  },
  "dispatched": {
    meaning: "Physical document is with the carrier.",
    backend: "Printing completed. Handed over to Postal/Courier services.",
    normalDays: 7,
    next: "Track using the Speed Post or Courier ID provided via SMS."
  },
  "rejected": {
    meaning: "Final denial of application.",
    backend: "Ineligible criteria or fraudulent/unclear documents detected.",
    normalDays: 0,
    next: "Download the 'Rejection Letter' to see the specific clause."
  }
};

export function applicationStatusMeaningDecoder({
  portal,
  status,
  daysInStatus
}: {
  portal: Portal;
  status: string;
  daysInStatus?: number;
}) {
  const normalized = status.toLowerCase();
  const key = Object.keys(STATUS_MAP).find(k => normalized.includes(k)) || "default";

  const info = STATUS_MAP[key] || {
    meaning: "Standard workflow processing.",
    backend: "Your application is in the queue for the next available desk officer.",
    normalDays: 10,
    next: "Wait for official SMS or email notification."
  };

  const isDelayNormal = daysInStatus === undefined ? true : daysInStatus <= info.normalDays;

  return {
    "Human Meaning": info.meaning,
    "Backend Activity": info.backend,
    "Time Status": isDelayNormal ? "Normal Delay" : "Exceeds standard SLA (Slow)",
    "Recommended Action": info.next,
    "Commonly seen in": portal
  };
}