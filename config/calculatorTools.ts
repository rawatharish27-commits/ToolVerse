export const compoundInterestConfig = {
  slug: "compound-interest-calc",
  title: "Compound Interest Architect",
  description: "Visualize the power of compounding. Calculate future value with periodic contributions and AI-driven growth strategy.",
  icon: "💎",
  colorClass: "bg-indigo-600",
  options: [
    { id: "ciPrincipal", type: "number", label: "Initial Investment", default: 10000 },
    { id: "ciRate", type: "slider", label: "Annual Interest Rate (%)", min: 1, max: 40, default: 12 },
    { id: "ciTenure", type: "number", label: "Time Period (Years)", default: 10 },
    { id: "ciFrequency", type: "select", label: "Compounding Frequency", values: ["Yearly", "Half-Yearly", "Quarterly", "Monthly"], default: "Yearly" },
    { id: "ciContribution", type: "number", label: "Periodic Contribution", default: 1000 },
    { id: "ciContFreq", type: "select", label: "Contribution Frequency", values: ["Monthly", "Yearly"], default: "Monthly" },
    { id: "ciRisk", type: "select", label: "Investment Risk Profile", values: ["Conservative", "Moderate", "Aggressive"], default: "Moderate" },
    { id: "ciInflation", type: "toggle", label: "Adjust for Inflation (6%)", default: false }
  ],
};

export const mortgageCalculatorConfig = {
  slug: "mortgage-calculator",
  title: "Mortgage Amortization Pro",
  description: "Detailed home loan analysis with down payment impact, property taxes, and amortization schedules.",
  icon: "🏠",
  colorClass: "bg-indigo-700",
  options: [
    { id: "mgHomePrice", type: "number", label: "Home Price", default: 300000 },
    { id: "mgDownPayment", type: "number", label: "Down Payment", default: 60000 },
    { id: "mgRate", type: "slider", label: "Interest Rate (%)", min: 1, max: 15, default: 6.5 },
    { id: "mgTenure", type: "select", label: "Loan Term", values: ["10 Years", "15 Years", "20 Years", "30 Years"], default: "30 Years" },
    { id: "mgTax", type: "number", label: "Annual Property Tax", default: 3000 },
    { id: "mgInsurance", type: "number", label: "Annual Home Insurance", default: 1200 },
    { id: "mgRefi", type: "toggle", label: "Include Refinance Analysis", default: false }
  ],
};

export const incomeTaxPlannerConfig = {
  slug: "income-tax-planner",
  title: "Global Income Tax Planner",
  description: "Estimate net income after taxes and discover AI-suggested optimization paths for your specific slab.",
  icon: "🧾",
  colorClass: "bg-indigo-800",
  options: [
    { id: "taxIncome", type: "number", label: "Gross Annual Income", default: 75000 },
    { id: "taxRegion", type: "select", label: "Tax System / Region", values: ["USA", "India", "UK", "Generic 25% Flat"], default: "USA" },
    { id: "taxFiling", type: "select", label: "Filing Status", values: ["Single", "Married / Joint"], default: "Single" },
    { id: "taxInvest", type: "number", label: "Tax Deductible Investments", default: 5000 },
    { id: "taxGoal", type: "select", label: "Planner Goal", values: ["Maximize In-hand", "Maximize Long-term Savings"], default: "Maximize In-hand" }
  ],
};

export const inflationCalculatorConfig = {
  slug: "inflation-calculator",
  title: "Inflation & Future Value Core",
  description: "Calculate how inflation erodes your money's value over time or how much you need to match current lifestyle in future.",
  icon: "📉",
  colorClass: "bg-indigo-500",
  options: [
    { id: "infAmount", type: "number", label: "Current Amount", default: 1000 },
    { id: "infRate", type: "slider", label: "Avg Inflation Rate (%)", min: 1, max: 20, default: 6 },
    { id: "infYears", type: "number", label: "Years into Future", default: 10 },
    { id: "infMode", type: "select", label: "Calculation Mode", values: ["Future Buying Power", "Future Cost of Current Item"], default: "Future Buying Power" }
  ],
};

export const emiCalculatorConfig = {
  slug: "emi-calculator",
  title: "Professional EMI Calculator",
  description: "Calculate monthly EMI, total interest, and total payable amount with standard banking accuracy.",
  icon: "💰",
  colorClass: "bg-orange-600",
  options: [
    { id: "principal", label: "Loan Amount (Principal)", type: "number", default: 1000000 },
    { id: "rate", label: "Interest Rate (% per annum)", type: "slider", min: 1, max: 30, default: 8.5 },
    { id: "tenure", label: "Loan Tenure (Years)", type: "number", default: 10 },
  ],
};

export const sipCalculatorConfig = {
  slug: "sip-calculator",
  title: "Mutual Fund SIP Calculator",
  description: "Calculate expected returns on your monthly SIP investments with compounding.",
  icon: "📈",
  colorClass: "bg-emerald-600",
  options: [
    { id: "monthly", label: "Monthly Investment", type: "number", default: 5000 },
    { id: "rate", label: "Expected Return Rate (%)", type: "slider", min: 1, max: 30, default: 12 },
    { id: "years", label: "Investment Period (Years)", type: "number", default: 10 },
  ],
};

export const gstCalculatorConfig = {
  slug: "gst-calculator",
  title: "India GST Calculator",
  description: "Calculate GST amount with CGST, SGST, and IGST breakup for inclusive and exclusive prices.",
  icon: "🇮🇳",
  colorClass: "bg-indigo-600",
  options: [
    { id: "amount", label: "Initial Amount", type: "number", default: 10000 },
    { id: "rate", label: "GST Rate (%)", type: "select", values: ["5", "12", "18", "28"], default: "18" },
    { id: "mode", label: "GST Mode", type: "select", values: ["Exclusive", "Inclusive"], default: "Exclusive" },
    { id: "type", label: "Tax Type", type: "select", values: ["CGST + SGST (Intra-state)", "IGST (Inter-state)"], default: "CGST + SGST (Intra-state)" },
  ],
};

export const loanCalculatorConfig = {
  slug: "loan-calculator",
  title: "Comprehensive Loan Calculator",
  description: "Detailed calculation of loan repayments, total interest burden, and amortization summary.",
  icon: "🏦",
  colorClass: "bg-blue-600",
  options: [
    { id: "amount", label: "Loan Principal Amount", type: "number", default: 500000 },
    { id: "rate", label: "Annual Interest Rate (%)", type: "slider", min: 1, max: 25, default: 10.5 },
    { id: "tenure", label: "Loan Duration (Years)", type: "number", default: 5 },
  ],
};

export const roiCalculatorConfig = {
  slug: "roi-calculator",
  title: "ROI Calculator",
  description: "Calculate Return on Investment (ROI) and annualized growth rate for any investment.",
  icon: "📊",
  colorClass: "bg-violet-600",
  options: [
    { id: "investment", label: "Investment Amount", type: "number", default: 100000 },
    { id: "returns", label: "Final Value / Returns", type: "number", default: 150000 },
    { id: "years", label: "Duration (Years)", type: "number", default: 1 },
  ],
};

export const bmiCalculatorConfig = {
  slug: "bmi-calculator",
  title: "Body Mass Index (BMI) Calculator",
  description: "Quickly calculate your BMI and determine your WHO health category based on height and weight.",
  icon: "⚖️",
  colorClass: "bg-pink-600",
  options: [
    { id: "weight", label: "Weight (kg)", type: "number", default: 70 },
    { id: "height", label: "Height (cm)", type: "number", default: 170 },
  ],
};

export const currencyConverterConfig = {
  slug: "currency-converter",
  title: "World Currency Converter",
  description: "Convert between major world currencies with standard exchange rates. Fast and privacy-safe browser conversion.",
  icon: "💱",
  colorClass: "bg-teal-600",
  options: [
    { id: "amount", label: "Amount to Convert", type: "number", default: 100 },
    { id: "from", label: "From Currency", type: "select", values: ["USD", "EUR", "GBP", "INR", "JPY", "CAD", "AUD"], default: "USD" },
    { id: "to", label: "To Currency", type: "select", values: ["USD", "EUR", "GBP", "INR", "JPY", "CAD", "AUD"], default: "INR" },
  ],
};