export function simpleInterestCalculator({
  principal,
  rate,
  time,
  timeUnit = "years",
  precision = 2
}: {
  principal: number;
  rate: number;
  time: number;
  timeUnit?: "years" | "months" | "days";
  precision?: number;
}): {
  interest: number;
  totalAmount: number;
  formula: string;
} {
  if (principal <= 0 || rate < 0 || time <= 0) {
    throw new Error("Invalid input values");
  }

  let timeInYears = time;

  if (timeUnit === "months") timeInYears = time / 12;
  if (timeUnit === "days") timeInYears = time / 365;

  const interest = (principal * rate * timeInYears) / 100;
  const totalAmount = principal + interest;

  return {
    interest: Number(interest.toFixed(precision)),
    totalAmount: Number(totalAmount.toFixed(precision)),
    formula: `(P × R × T) / 100`
  };
}