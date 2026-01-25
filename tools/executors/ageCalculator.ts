function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

export function ageCalculator({
  dob,
  referenceDate = new Date(),
  mode = "simple"
}: {
  dob: string | Date;
  referenceDate?: string | Date;
  mode?: "simple" | "detailed" | "advanced";
}): {
  years: number;
  months?: number;
  days?: number;
  totalDays?: number;
  nextBirthday?: string;
  daysToNextBirthday?: number;
} {
  const birthDate = new Date(dob);
  const refDate = new Date(referenceDate);

  if (birthDate > refDate) {
    throw new Error("Date of birth cannot be in the future");
  }

  let years = refDate.getFullYear() - birthDate.getFullYear();
  let months = refDate.getMonth() - birthDate.getMonth();
  let days = refDate.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    days += daysInMonth(refDate.getFullYear(), refDate.getMonth() - 1);
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const result: any = { years };

  if (mode !== "simple") {
    result.months = months;
    result.days = days;
  }

  if (mode === "advanced") {
    const diffMs = refDate.getTime() - birthDate.getTime();
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    result.totalDays = totalDays;

    const nextBirthday = new Date(refDate.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (nextBirthday < refDate) {
      nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }

    result.nextBirthday = nextBirthday.toDateString();
    result.daysToNextBirthday = Math.ceil(
      (nextBirthday.getTime() - refDate.getTime()) / (1000 * 60 * 60 * 24)
    );
  }

  return result;
}