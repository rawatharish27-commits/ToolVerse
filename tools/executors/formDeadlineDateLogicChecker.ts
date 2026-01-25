type Context = "application" | "dob" | "eligibility";
type Timezone = "IST" | "UTC" | "portal-local";

function parseWithCutoff(dateStr: string, cutoffTime = "23:59", tz: Timezone) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const [hh, mm] = cutoffTime.split(":").map(Number);
  return new Date(Date.UTC(y, m - 1, d, hh, mm));
}

export function formDeadlineDateLogicChecker({
  context,
  deadlineDate,
  userDate,
  cutoffTime = "23:59",
  timezone = "portal-local",
  inclusive = true
}: {
  context: Context;
  deadlineDate: string;
  userDate: string;
  cutoffTime?: string;
  timezone?: Timezone;
  inclusive?: boolean;
}) {
  const deadline = parseWithCutoff(deadlineDate, cutoffTime, timezone);
  const user = parseWithCutoff(userDate, cutoffTime, timezone);

  let valid = false;
  let reason = "";
  let fix = "";

  if (inclusive) {
    valid = user.getTime() <= deadline.getTime();
  } else {
    valid = user.getTime() < deadline.getTime();
  }

  if (valid) {
    return {
      valid: true,
      reason: "Your date falls within the allowed deadline window.",
      fix: "No action needed.",
      note: "Many portals treat the end date as inclusive up to the cutoff time."
    };
  }

  if (user.getTime() > deadline.getTime()) {
    reason = "Your date/time is after the portal deadline considering the cutoff time.";
    fix = `Use a date/time on or before ${deadlineDate} ${cutoffTime}.`;
  } else {
    reason = "Your date does not satisfy the portal’s date rule.";
    fix = "Re-check the date format and portal instructions.";
  }

  if (context === "dob") {
    reason = "Date of birth does not meet the eligibility cut-off defined by the portal.";
    fix = "Check the exact eligibility cut-off date mentioned in the notification.";
  }

  return {
    valid: false,
    reason,
    fix,
    note: timezone !== "portal-local" ? "Timezone differences can cause same-day submissions to fail." : "Some portals use exclusive end-date rules."
  };
}