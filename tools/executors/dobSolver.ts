export function dobSolver({
  dob,
  referenceDate,
  minAge = 18,
  maxAge = 40
}: {
  dob: string;
  referenceDate: string;
  minAge: number;
  maxAge: number;
}) {
  const birth = new Date(dob);
  const ref = new Date(referenceDate);
  
  let age = ref.getFullYear() - birth.getFullYear();
  const m = ref.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && ref.getDate() < birth.getDate())) {
    age--;
  }

  const isEligible = age >= minAge && age <= maxAge;

  return {
    calculatedAge: `${age} years`,
    eligibility: isEligible ? "Eligible" : "Ineligible",
    reason: age < minAge ? `Too young by ${minAge - age} year(s).` : (age > maxAge ? `Exceeded limit by ${age - maxAge} year(s).` : "Meets criteria."),
    tip: "Double check if the portal uses 'Age as on' a specific date mentioned in the PDF."
  };
}