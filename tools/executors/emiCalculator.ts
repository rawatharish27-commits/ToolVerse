export function emiCalculator({
  loanAmount,
  annualRate,
  tenure,
  tenureUnit = "years",
  precision = 2
}: {
  loanAmount: number;
  annualRate: number;
  tenure: number;
  tenureUnit?: "years" | "months";
  precision?: number;
}): {
  emi: number;
  totalPayment: number;
  totalInterest: number;
  formula: string;
} {
  if (loanAmount <= 0 || annualRate <= 0 || tenure <= 0) {
    throw new Error("Invalid input values");
  }

  const months =
    tenureUnit === "years" ? tenure * 12 : tenure;

  const monthlyRate = annualRate / (12 * 100);

  const emi =
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);

  const totalPayment = emi * months;
  const totalInterest = totalPayment - loanAmount;

  return {
    emi: Number(emi.toFixed(precision)),
    totalPayment: Number(totalPayment.toFixed(precision)),
    totalInterest: Number(totalInterest.toFixed(precision)),
    formula: "EMI = [P × r × (1+r)^n] / [(1+r)^n − 1]"
  };
}