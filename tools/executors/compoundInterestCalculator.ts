export function compoundInterestCalculator({
  principal,
  rate,
  time,
  timeUnit = "years",
  frequency = 1,
  precision = 2
}: {
  principal: number;
  rate: number;
  time: number;
  timeUnit?: "years" | "months";
  frequency?: number;
  precision?: number;
}): {
  finalAmount: number;
  interestEarned: number;
  formula: string;
} {
  if (principal <= 0 || rate < 0 || time <= 0 || frequency <= 0) {
    throw new Error("Invalid input values");
  }

  let timeInYears = time;
  if (timeUnit === "months") {
    timeInYears = time / 12;
  }

  const amount =
    principal *
    Math.pow(1 + rate / (100 * frequency), frequency * timeInYears);

  const interest = amount - principal;

  return {
    finalAmount: Number(amount.toFixed(precision)),
    interestEarned: Number(interest.toFixed(precision)),
    formula: `A = P (1 + R / (100 × n))^(n × t)`
  };
}