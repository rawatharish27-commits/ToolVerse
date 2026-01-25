function parseDate(date: string, format: string) {
  const parts = date.split(/[\/\-]/).map(Number);
  if (format === "DD/MM/YYYY") return new Date(parts[2], parts[1] - 1, parts[0]);
  if (format === "MM/DD/YYYY") return new Date(parts[2], parts[0] - 1, parts[1]);
  return new Date(date); // YYYY-MM-DD
}

export function invalidDobErrorSolver({
  dob,
  cutoffDate,
  rule,
  dateFormat = "YYYY-MM-DD",
  minAgeYears,
  maxAgeYears
}: {
  dob: string;
  cutoffDate: string;
  rule: "on-or-before" | "on-or-after";
  dateFormat?: "DD/MM/YYYY" | "MM/DD/YYYY" | "YYYY-MM-DD";
  minAgeYears?: number;
  maxAgeYears?: number;
}) {
  const dobDate = parseDate(dob, dateFormat);
  const cutoff = new Date(cutoffDate);

  let eligible = true;
  let reason = "Date of birth meets the eligibility rule.";
  let fix = "No action needed.";

  if (rule === "on-or-before" && dobDate > cutoff) {
    eligible = false;
    reason = "Date of birth is after the allowed cut-off date.";
    fix = "Check if you entered DOB in correct format or eligibility criteria.";
  }

  if (rule === "on-or-after" && dobDate < cutoff) {
    eligible = false;
    reason = "Date of birth is before the allowed cut-off date.";
    fix = "Verify eligibility rule mentioned in notification.";
  }

  if (minAgeYears || maxAgeYears) {
    const age = cutoff.getFullYear() - dobDate.getFullYear() - (cutoff < new Date(cutoff.getFullYear(), dobDate.getMonth(), dobDate.getDate()) ? 1 : 0);

    if (minAgeYears && age < minAgeYears) {
      eligible = false;
      reason = "Age is less than the minimum required age.";
      fix = `Minimum required age is ${minAgeYears} years.`;
    }
    if (maxAgeYears && age > maxAgeYears) {
      eligible = false;
      reason = "Age exceeds the maximum allowed age.";
      fix = `Maximum allowed age is ${maxAgeYears} years.`;
    }
  }

  return {
    eligible,
    reason,
    fix,
    note: "Most portals calculate age as completed years on the cut-off date."
  };
}