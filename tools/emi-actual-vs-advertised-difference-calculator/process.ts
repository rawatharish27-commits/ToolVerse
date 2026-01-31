
export async function process(input: { loan: number, rate: number, months: number }) {
  const flatEmi = (input.loan + (input.loan * input.rate * (input.months / 12) / 100)) / input.months;
  
  // Reducing Balance Approximation
  const reducingEmi = (input.loan * (input.rate/1200) * Math.pow(1+input.rate/1200, input.months)) / (Math.pow(1+input.rate/1200, input.months)-1);
  
  return {
    "Advertised EMI": `₹${Math.round(flatEmi).toLocaleString()}`,
    "Standard Bank EMI": `₹${Math.round(reducingEmi).toLocaleString()}`,
    "Hidden Interest Gap": `₹${Math.round(flatEmi - reducingEmi).toLocaleString()}`,
    "Effective Rate": `${(input.rate * 1.8).toFixed(1)}% Reducing`,
    "Verdict": "Flat rates are misleading; you pay ~80% more than quoted."
  };
}
