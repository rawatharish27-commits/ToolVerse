export function whyEmiHighExplainer({ loanAmount, tenureYears, interestRate }: any) {
  const monthlyRate = interestRate / 12 / 100;
  const months = tenureYears * 12;
  const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  
  const totalInterest = (emi * months) - loanAmount;
  const interestRatio = (totalInterest / loanAmount) * 100;

  const reasons = [];
  if (tenureYears < 5) reasons.push("Aggressive Short Tenure: Your principal repayment is packed into fewer months.");
  if (interestRate > 12) reasons.push("High Interest Loading: Your rate exceeds standard bank benchmarks.");
  if (interestRatio > 40) reasons.push("Interest Overhead: You are paying back nearly 1.5x the principal.");

  return {
    "Calculated Monthly EMI": `₹${Math.round(emi).toLocaleString()}`,
    "Total Interest Burden": `₹${Math.round(totalInterest).toLocaleString()}`,
    "Interest-to-Principal Ratio": `${interestRatio.toFixed(1)}%`,
    "Root Causes": reasons.length > 0 ? reasons : ["Parameters are within standard ranges."],
    "Reduction Strategy": tenureYears < 10 ? "Increase tenure to lower monthly burden, but total interest will rise." : "Consider a balance transfer to a lower-interest lender."
  };
}

export function actualInterestAnalyzer({ quotedRate, tenureMonths }: any) {
  // Flat Rate to Reducing Rate Approximation
  // Real Rate ≈ Quoted Rate * (2 * n / (n + 1))
  const realRate = quotedRate * (2 * tenureMonths / (tenureMonths + 1));
  
  return {
    "Stated Flat Rate": `${quotedRate}%`,
    "Real Reducing Rate (Effective)": `${realRate.toFixed(2)}%`,
    "The 'Bank Trick'": "Banks quote flat rates to make the loan seem cheaper. On a reducing balance, you actually pay nearly double the quoted interest efficiency.",
    "Verdict": realRate > quotedRate * 1.7 ? "CRITICAL: Very Expensive Loan" : "Standard Flat-to-Reducing Ratio"
  };
}

export function noCostEmiRealityChecker({ productPrice, emiAmount, tenure }: any) {
  const totalPaid = emiAmount * tenure;
  const hiddenCost = totalPaid - productPrice;
  const effectiveInterest = ((hiddenCost / productPrice) * 100).toFixed(2);

  return {
    "Marketed Price": `₹${productPrice.toLocaleString()}`,
    "Total You Will Pay": `₹${totalPaid.toLocaleString()}`,
    "Hidden Interest Cost": hiddenCost > 0 ? `₹${hiddenCost.toLocaleString()}` : "True Zero Cost",
    "Real Interest Rate": `${effectiveInterest}%`,
    "Reality Check": hiddenCost > 0 ? "Not 'No Cost'. The discount given by the brand is being used to pay the bank's interest." : "Congratulations, this is a genuine zero-interest deal."
  };
}