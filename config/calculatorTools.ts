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

export const hiddenChargesConfig = {
  slug: "hidden-charges-calculator",
  title: "Hidden Charges Calculator",
  description: "Find the real cost of 'Zero Interest' EMIs and personal loans by exposing processing fees and hidden interest.",
  icon: "🕵️",
  colorClass: "bg-rose-600",
  options: [
    { id: "productPrice", type: "number", label: "Product Price", default: 50000 },
    { id: "emiAmount", type: "number", label: "Monthly EMI", default: 4500 },
    { id: "tenure", type: "number", label: "Tenure (Months)", default: 12 },
    { id: "processingFee", type: "number", label: "Processing Fee / Upfront", default: 1500 }
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

export const durationCalculatorConfig = {
  slug: "time-duration-calculator",
  title: "Time Duration Calculator",
  description: "Find the total hours, minutes, and seconds between two specific timestamps.",
  icon: "⏲️",
  colorClass: "bg-slate-600",
  options: [
    { id: "startTime", type: "text", label: "Start Time", default: "09:00" },
    { id: "endTime", type: "text", label: "End Time", default: "17:30" }
  ]
};

export const percentageCalculatorConfig = {
  slug: "percentage-calculator",
  title: "Percentage Calculator Pro",
  description: "Solve percentage problems: X% of Y, percentage increase/decrease, or what % is X of Y.",
  icon: "🔢",
  colorClass: "bg-indigo-600",
  options: [
    { id: "mode", type: "select", label: "Operation", values: ["Find Value (X% of Y)", "Find Percentage (X is what % of Y)", "Percentage Change (Increase/Decrease)"], default: "Find Value (X% of Y)" },
    { id: "valX", type: "number", label: "Value X", default: 10 },
    { id: "valY", type: "number", label: "Value Y", default: 100 },
    { id: "precision", type: "select", label: "Decimals", values: [0, 1, 2, 4], default: 2 }
  ]
};

export const simpleInterestConfig = {
  slug: "simple-interest-calc",
  title: "Simple Interest Master",
  description: "Calculate basic interest on principal for loans or investments with annual/monthly breakdown.",
  icon: "🧮",
  colorClass: "bg-indigo-500",
  options: [
    { id: "principal", type: "number", label: "Principal Amount (₹)", default: 100000 },
    { id: "rate", type: "slider", label: "Annual Rate (%)", min: 1, max: 50, default: 8 },
    { id: "tenure", type: "number", label: "Time (Years)", default: 1 },
    { id: "tax", type: "number", label: "TDS / Tax (%)", default: 0 }
  ]
};

export const compoundInterestConfig = {
  slug: "compound-interest-calc",
  title: "Compound Interest Architect",
  description: "Visualize compounding wealth. Calculate future value with periodic contributions and frequency control.",
  icon: "💎",
  colorClass: "bg-indigo-700",
  options: [
    { id: "principal", type: "number", label: "Initial Investment (₹)", default: 50000 },
    { id: "rate", type: "slider", label: "Return Rate (%)", min: 1, max: 30, default: 12 },
    { id: "tenure", type: "number", label: "Time Period (Years)", default: 10 },
    { id: "frequency", type: "select", label: "Compounding", values: ["Yearly", "Half-Yearly", "Quarterly", "Monthly"], default: "Monthly" },
    { id: "contribution", type: "number", label: "Monthly Addition (₹)", default: 2000 }
  ],
};

export const ageCalculatorConfig = {
  slug: "age-calculator",
  title: "Age Calculator Pro",
  description: "Calculate your exact age in years, months, and days. Includes birthday countdowns and zodiac hints.",
  icon: "📅",
  colorClass: "bg-orange-500",
  options: [
    { id: "dob", type: "text", label: "Date of Birth (YYYY-MM-DD)", default: "1995-01-01" },
    { id: "targetDate", type: "text", label: "Age at Date", default: new Date().toISOString().split('T')[0] }
  ]
};

export const discountCalculatorConfig = {
  slug: "discount-calculator",
  title: "Smart Discount Calculator",
  description: "Calculate final price after multiple discounts and sales tax instantly.",
  icon: "🏷️",
  colorClass: "bg-rose-500",
  options: [
    { id: "price", type: "number", label: "Original Price (₹)", default: 1999 },
    { id: "discount", type: "slider", label: "Primary Discount (%)", min: 1, max: 99, default: 20 },
    { id: "tax", type: "number", label: "Sales Tax / GST (%)", default: 18 },
    { id: "extraOff", type: "number", label: "Flat Discount (₹)", default: 0 }
  ]
};

export const emiCalculatorConfig = {
  slug: "emi-calculator",
  title: "Professional EMI Calculator",
  description: "Bank-grade monthly installment calculator for Home, Car, or Personal loans.",
  icon: "💰",
  colorClass: "bg-blue-600",
  options: [
    { id: "principal", label: "Loan Amount (₹)", type: "number", default: 1000000 },
    { id: "rate", label: "Interest Rate (%)", type: "slider", min: 5, max: 25, default: 8.5 },
    { id: "tenure", label: "Tenure (Years)", type: "number", default: 10 },
    { id: "processingFee", label: "Processing Fee (%)", type: "number", default: 1 }
  ],
};

export const bmiCalculatorConfig = {
  slug: "bmi-calculator",
  title: "Health & BMI Analyzer",
  description: "Calculate Body Mass Index and get WHO health categories and weight targets.",
  icon: "⚖️",
  colorClass: "bg-emerald-600",
  options: [
    { id: "weight", label: "Weight (kg)", type: "number", default: 70 },
    { id: "height", label: "Height (cm)", type: "number", default: 175 },
    { id: "age", label: "Age", type: "number", default: 25 },
    { id: "gender", label: "Gender", type: "select", values: ["Male", "Female"], default: "Male" }
  ],
};

export const gstCalculatorConfig = {
  slug: "gst-calculator",
  title: "Advanced GST Calculator",
  description: "Calculate GST amount with CGST, SGST, and IGST breakup for Inclusive or Exclusive pricing.",
  icon: "🇮🇳",
  colorClass: "bg-indigo-600",
  options: [
    { id: "amount", label: "Base Amount (₹)", type: "number", default: 10000 },
    { id: "rate", label: "GST Slab (%)", type: "select", values: ["5", "12", "18", "28"], default: "18" },
    { id: "mode", label: "Calculation Type", values: ["Exclusive (Add GST)", "Inclusive (Remove GST)"], default: "Exclusive (Add GST)" },
    { id: "state", label: "Transaction", type: "select", values: ["Intra-State", "Inter-State"], default: "Intra-State" },
  ],
};

export const profitLossConfig = {
  slug: "profit-loss-calculator",
  title: "Profit & Loss Analyzer",
  description: "Analyze business performance. Calculate net margins and overhead impact.",
  icon: "💹",
  colorClass: "bg-emerald-700",
  options: [
    { id: "cp", label: "Cost Price (₹)", type: "number", default: 800 },
    { id: "sp", label: "Selling Price (₹)", type: "number", default: 1200 },
    { id: "overhead", label: "Expenses (₹)", type: "number", default: 50 },
  ]
};

export const loanCalculatorConfig = {
  slug: "loan-calculator",
  title: "Loan Eligibility & Cost Evaluator",
  description: "Evaluate total borrowing cost and interest-saving strategies for long-term loans.",
  icon: "🏦",
  colorClass: "bg-blue-800",
  options: [
    { id: "amount", label: "Loan Principal (₹)", type: "number", default: 500000 },
    { id: "rate", label: "Interest Rate (%)", type: "slider", min: 1, max: 25, default: 10.5 },
    { id: "tenure", label: "Tenure (Years)", type: "number", default: 5 },
  ],
};