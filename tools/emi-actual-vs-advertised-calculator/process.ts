
export async function process(input: any) {
  const { amount, rate, months } = input;

  // 1. Calculate Flat Rate Monthly EMI
  const totalInterestFlat = (amount * rate * (months / 12)) / 100;
  const emiFlat = (amount + totalInterestFlat) / months;

  // 2. Find the Reducing Balance Equivalent (Numerical Approximation)
  let low = 0.0001 / 12;
  let high = 1.0 / 12;
  let reducingRateMonthly = 0;

  // Binary search for the monthly rate that matches the emiFlat
  for (let i = 0; i < 20; i++) {
    const mid = (low + high) / 2;
    const emiCheck = (amount * mid * Math.pow(1 + mid, months)) / (Math.pow(1 + mid, months) - 1);
    if (emiCheck > emiFlat) {
      high = mid;
    } else {
      low = mid;
    }
  }
  
  reducingRateMonthly = (low + high) / 2;
  const reducingRateAnnual = reducingRateMonthly * 12 * 100;

  return {
    emi: Math.round(emiFlat),
    totalInterest: Math.round(totalInterestFlat),
    flatRate: rate,
    reducingRate: reducingRateAnnual.toFixed(2),
    multiplier: (reducingRateAnnual / rate).toFixed(2),
    burden: Math.round((totalInterestFlat / amount) * 100)
  };
}
