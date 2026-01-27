
export const emiHighExplainerConfig = {
  slug: "why-emi-high-explainer",
  title: "Why EMI So High? Explainer",
  description: "Identify mathematical reasons for high EMI like short tenure or front-loaded interest.",
  icon: "📈",
  colorClass: "bg-rose-600",
  options: [
    { id: "loanAmount", type: "number", label: "Principal", default: 500000 },
    { id: "tenureYears", type: "number", label: "Tenure (Years)", default: 3 },
    { id: "interestRate", type: "number", label: "Interest Rate (%)", default: 12 }
  ]
};

export const hiddenChargesDiscoveryConfig = {
  slug: "hidden-charges-discovery",
  title: "Hidden Charges Finder",
  description: "Analyze your bill or loan statement for insurance, processing, and convenience fees.",
  icon: "🕵️",
  colorClass: "bg-rose-500",
  options: []
};

export const interestAnalyzerConfig = {
  slug: "actual-interest-analyzer",
  title: "Bank vs Actual Rate Analyzer",
  description: "Calculates the real interest rate for flat-rate loans, which is often 2x the quoted rate.",
  icon: "⚖️",
  colorClass: "bg-rose-700",
  options: [
    { id: "quotedRate", type: "number", label: "Quoted Flat Rate (%)", default: 8 },
    { id: "tenureMonths", type: "number", label: "Tenure (Months)", default: 24 }
  ]
};

export const offerPriceTruthConfig = {
  slug: "offer-price-truth-calculator",
  title: "Effective Price Calculator",
  description: "What's the real cost after GST, convenience fees, and cashback offset?",
  icon: "🏷️",
  colorClass: "bg-rose-800",
  options: [
    { id: "mrp", type: "number", label: "MRP", default: 1000 },
    { id: "discount", type: "number", label: "Discount (%)", default: 20 },
    { id: "gst", type: "number", label: "GST (%)", default: 18 },
    { id: "fees", type: "number", label: "Handling Fees", default: 50 }
  ]
};

export const subscriptionTrapConfig = {
  slug: "subscription-trap-analyzer",
  title: "Subscription Trap Analyzer",
  description: "Checks for auto-renewal clauses and 'Difficult to Cancel' dark patterns.",
  icon: "🕸️",
  colorClass: "bg-rose-900",
  options: [
    { id: "renewalType", type: "select", label: "Renewal Type", values: ["Manual", "Auto-Debit", "Lifetime"], default: "Auto-Debit" }
  ]
};

export const refundAmountConfig = {
  slug: "refund-amount-explainer",
  title: "Refund Difference Explainer",
  description: "Why is your refund ₹800 when you paid ₹1000? Breakdown of non-refundable taxes and fees.",
  icon: "💸",
  colorClass: "bg-rose-500",
  options: [
    { id: "paid", type: "number", label: "Amount Paid", default: 1000 },
    { id: "refunded", type: "number", label: "Amount Refunded", default: 800 }
  ]
};

export const salaryCalculatorConfig = {
  slug: "salary-calculator",
  title: "Salary Calculator (CTC to In-Hand)",
  description: "Calculate your monthly take-home salary after PF, Professional Tax, and Income Tax deductions (India FY 2024-25).",
  icon: "💰",
  colorClass: "bg-emerald-600",
  options: [
    { id: "ctc", type: "number", label: "Annual CTC (₹)", default: 1200000 },
    { id: "regime", type: "select", label: "Tax Regime", values: ["New Regime", "Old Regime"], default: "New Regime" },
    { id: "bonus", type: "number", label: "Annual Bonus (included in CTC)", default: 0 }
  ]
};

export const offerComparisonConfig = {
  slug: "job-offer-comparison",
  title: "Offer Comparison Engine",
  description: "Compare two job offers side-by-side using quality of life, growth, and net financial metrics.",
  icon: "⚖️",
  colorClass: "bg-indigo-600",
  options: [
    { id: "base1", type: "number", label: "Offer 1 Base (LPA)", default: 15 },
    { id: "stocks1", type: "number", label: "Offer 1 Stocks/ESOPs (Yearly)", default: 2 },
    { id: "base2", type: "number", label: "Offer 2 Base (LPA)", default: 18 },
    { id: "stocks2", type: "number", label: "Offer 2 Stocks/ESOPs (Yearly)", default: 0 }
  ]
};

export const inflationCalculatorConfig = {
  slug: "inflation-impact-calculator",
  title: "Inflation Impact Calculator",
  description: "Visualize how much your money will be worth in the future based on historical inflation rates.",
  icon: "🎈",
  colorClass: "bg-orange-600",
  options: [
    { id: "amount", type: "number", label: "Current Amount (₹)", default: 100000 },
    { id: "years", type: "number", label: "Years in Future", default: 10 },
    { id: "rate", type: "slider", label: "Expected Inflation (%)", min: 1, max: 15, default: 6 }
  ]
};

export const roiCalculatorConfig = {
  slug: "roi-calculator",
  title: "ROI Calculator (Investment)",
  description: "Calculate the Return on Investment (ROI) and Annualized ROI with profit/loss metrics.",
  icon: "📈",
  colorClass: "bg-indigo-600",
  options: [
    { id: "amountInvested", type: "number", label: "Amount Invested (₹)", default: 100000 },
    { id: "amountReturned", type: "number", label: "Amount Returned (₹)", default: 150000 },
    { id: "tenureYears", type: "number", label: "Investment Tenure (Years)", default: 3 }
  ]
};

export const ageCalculatorConfig = {
  slug: "age-calculator",
  title: "Age Calculator Pro",
  description: "Calculate your exact age in years, months, and days. Includes birthday countdowns.",
  icon: "📅",
  colorClass: "bg-orange-500",
  options: [
    { id: "dob", type: "text", label: "Date of Birth (YYYY-MM-DD)", default: "1995-01-01" },
    { id: "targetDate", type: "text", label: "Age at Date", default: new Date().toISOString().split('T')[0] }
  ]
};

export const emiCalculatorConfig = {
  slug: "emi-calculator",
  title: "Professional EMI Calculator",
  description: "Bank-grade monthly installment calculator for Home, Car, or Personal loans.",
  icon: "💰",
  colorClass: "bg-blue-600",
  options: [
    { id: "loanAmount", label: "Loan Amount (₹)", type: "number", default: 1000000 },
    { id: "interestRate", label: "Interest Rate (%)", type: "slider", min: 5, max: 25, default: 8.5 },
    { id: "tenureYears", label: "Tenure (Years)", type: "number", default: 10 }
  ],
};

// Added compoundInterestCalculatorConfig
export const compoundInterestCalculatorConfig = {
  slug: "compound-interest-calculator",
  title: "Compound Interest Calculator",
  description: "Advanced investment modeling with periodic frequency.",
  icon: "📈",
  colorClass: "bg-indigo-700",
  options: [
    { id: "principal", label: "Principal Amount", type: "number", default: 10000 },
    { id: "rate", label: "Annual Interest Rate (%)", type: "number", default: 8 },
    { id: "time", label: "Time Period (Years)", type: "number", default: 10 },
    { id: "frequency", label: "Compounding Frequency (per year)", type: "select", values: [1, 2, 4, 12], default: 1 }
  ]
};

// Added loanCalculatorConfig
export const loanCalculatorConfig = {
  slug: "loan-calculator-standard",
  title: "Standard Loan Calculator",
  description: "Calculate loan details for principal and interest repayments.",
  icon: "💳",
  colorClass: "bg-indigo-600",
  options: [
    { id: "loanAmount", label: "Loan Amount", type: "number", default: 100000 },
    { id: "interestRate", label: "Annual Interest Rate (%)", type: "number", default: 10 },
    { id: "tenureYears", label: "Tenure (Years)", type: "number", default: 5 }
  ]
};
