export const emiHighExplainerConfig = {
  slug: "why-emi-high-explainer",
  title: "Why EMI So High Explainer",
  description: "Find out if your loan EMI is high because of hidden interest or a short tenure.",
  icon: "📈",
  colorClass: "bg-rose-600",
  options: [
    { id: "loanAmount", type: "number", label: "Total Loan (Principal)", default: 500000 },
    { id: "tenureYears", type: "number", label: "Time (Years)", default: 3 },
    { id: "interestRate", type: "number", label: "Interest Rate (%)", default: 12 }
  ]
};

export const hiddenChargesDiscoveryConfig = {
  slug: "hidden-charges-discovery",
  title: "Hidden Charges Discovery Tool",
  description: "Upload your loan paper to find hidden insurance, processing, or convenience fees.",
  icon: "🕵️",
  colorClass: "bg-rose-500",
  options: []
};

export const interestAnalyzerConfig = {
  slug: "actual-interest-analyzer",
  title: "Bank Interest vs Actual Interest Analyzer",
  description: "Check if the 'Flat Rate' you were told is actually much higher.",
  icon: "⚖️",
  colorClass: "bg-rose-700",
  options: [
    { id: "quotedRate", type: "number", label: "Flat Rate Quoted (%)", default: 8 },
    { id: "tenureMonths", type: "number", label: "Time (Months)", default: 24 }
  ]
};

export const offerPriceTruthConfig = {
  slug: "offer-price-truth-calculator",
  title: "Offer Price Truth Calculator",
  description: "Calculate the real price after GST, fees, and handling charges are added.",
  icon: "🏷️",
  colorClass: "bg-rose-800",
  options: [
    { id: "mrp", type: "number", label: "MRP Price", default: 1000 },
    { id: "discount", type: "number", label: "Discount (%)", default: 20 },
    { id: "gst", type: "number", label: "GST (%)", default: 18 },
    { id: "fees", type: "number", label: "Other Fees", default: 50 }
  ]
};

export const subscriptionTrapConfig = {
  slug: "subscription-trap-analyzer",
  title: "Subscription Trap Analyzer",
  description: "Check if an app will auto-deduct money or is hard to cancel.",
  icon: "🕸️",
  colorClass: "bg-rose-900",
  options: [
    { id: "renewalType", type: "select", label: "Deduction Type", values: ["Manual", "Auto-Debit", "Lifetime"], default: "Auto-Debit" }
  ]
};

export const refundAmountConfig = {
  slug: "refund-amount-explainer",
  title: "Refund Amount Difference Explainer",
  description: "Find out why you received less refund than the total amount you paid.",
  icon: "💸",
  colorClass: "bg-rose-500",
  options: [
    { id: "paid", type: "number", label: "Total Paid", default: 1000 },
    { id: "refunded", type: "number", label: "Amount Refunded", default: 800 }
  ]
};

export const salaryCalculatorConfig = {
  slug: "salary-calculator",
  title: "Salary Calculator",
  description: "Calculate how much money you will actually get every month after PF and Tax.",
  icon: "💰",
  colorClass: "bg-emerald-600",
  options: [
    { id: "ctc", type: "number", label: "Yearly CTC (₹)", default: 1200000 },
    { id: "regime", type: "select", label: "Tax System", values: ["New Regime", "Old Regime"], default: "New Regime" },
    { id: "bonus", type: "number", label: "Yearly Bonus", default: 0 }
  ]
};

export const offerComparisonConfig = {
  slug: "job-offer-comparison",
  title: "Compare Two Job Offers",
  description: "See which job offer is better for your wallet and life.",
  icon: "⚖️",
  colorClass: "bg-indigo-600",
  options: [
    { id: "base1", type: "number", label: "Offer 1 Base (LPA)", default: 15 },
    { id: "stocks1", type: "number", label: "Offer 1 Stocks (Yearly)", default: 2 },
    { id: "base2", type: "number", label: "Offer 2 Base (LPA)", default: 18 },
    { id: "stocks2", type: "number", label: "Offer 2 Stocks (Yearly)", default: 0 }
  ]
};

export const inflationCalculatorConfig = {
  slug: "inflation-impact-calculator",
  title: "Inflation Calculator",
  description: "See how much ₹1 Lakh today will be worth 10 years from now.",
  icon: "🎈",
  colorClass: "bg-orange-600",
  options: [
    { id: "amount", type: "number", label: "Current Money (₹)", default: 100000 },
    { id: "years", type: "number", label: "Years in Future", default: 10 },
    { id: "rate", type: "slider", label: "Expected Inflation (%)", min: 1, max: 15, default: 6 }
  ]
};

export const roiCalculatorConfig = {
  slug: "roi-calculator",
  title: "ROI Calculator",
  description: "Calculate how much profit you made on your investment.",
  icon: "📈",
  colorClass: "bg-indigo-600",
  options: [
    { id: "amountInvested", type: "number", label: "Money Invested (₹)", default: 100000 },
    { id: "amountReturned", type: "number", label: "Money Received (₹)", default: 150000 },
    { id: "tenureYears", type: "number", label: "Time (Years)", default: 3 }
  ]
};

export const ageCalculatorConfig = {
  slug: "age-calculator",
  title: "Age Calculator",
  description: "Find out your exact age in years, months, and days.",
  icon: "📅",
  colorClass: "bg-orange-500",
  options: [
    { id: "dob", type: "text", label: "Date of Birth (YYYY-MM-DD)", default: "1995-01-01" },
    { id: "targetDate", type: "text", label: "Age at Date", default: new Date().toISOString().split('T')[0] }
  ]
};

export const emiCalculatorConfig = {
  slug: "emi-calculator",
  title: "EMI Calculator",
  description: "Calculate monthly installments for Home, Car, or Personal loans.",
  icon: "💰",
  colorClass: "bg-blue-600",
  options: [
    { id: "loanAmount", label: "Loan Amount (₹)", type: "number", default: 1000000 },
    { id: "interestRate", label: "Interest Rate (%)", type: "slider", min: 5, max: 25, default: 8.5 },
    { id: "tenureYears", label: "Time (Years)", type: "number", default: 10 }
  ],
};

export const compoundInterestCalculatorConfig = {
  slug: "compound-interest-calculator",
  title: "Compound Interest Calculator",
  description: "See how your money grows over time with compound interest.",
  icon: "📈",
  colorClass: "bg-indigo-700",
  options: [
    { id: "principal", label: "Starting Money", type: "number", default: 10000 },
    { id: "rate", label: "Interest Rate (%)", type: "number", default: 8 },
    { id: "time", label: "Time (Years)", type: "number", default: 10 },
    { id: "frequency", label: "Compounding Type", type: "select", values: [1, 2, 4, 12], default: 1 }
  ]
};

export const loanCalculatorConfig = {
  slug: "loan-calculator-standard",
  title: "Loan Calculator",
  description: "Basic calculator for loan principal and interest repayments.",
  icon: "💳",
  colorClass: "bg-indigo-600",
  options: [
    { id: "loanAmount", label: "Total Loan", type: "number", default: 100000 },
    { id: "interestRate", label: "Interest Rate (%)", type: "number", default: 10 },
    { id: "tenureYears", label: "Time (Years)", type: "number", default: 5 }
  ]
};