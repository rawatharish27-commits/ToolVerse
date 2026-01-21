export const emiCalculatorConfig = {
  slug: "emi-calculator",
  title: "Professional EMI Calculator",
  description: "Calculate monthly EMI, total interest, and total payable amount with standard banking accuracy.",
  icon: "💰",
  colorClass: "bg-orange-600",
  options: [
    {
      id: "principal",
      label: "Loan Amount (Principal)",
      type: "number",
      default: 1000000
    },
    {
      id: "rate",
      label: "Interest Rate (% per annum)",
      type: "slider",
      min: 1,
      max: 30,
      default: 8.5
    },
    {
      id: "tenure",
      label: "Loan Tenure (Years)",
      type: "number",
      default: 10
    },
  ],
};

export const sipCalculatorConfig = {
  slug: "sip-calculator",
  title: "Mutual Fund SIP Calculator",
  description: "Calculate expected returns on your monthly SIP investments with compounding.",
  icon: "📈",
  colorClass: "bg-emerald-600",
  options: [
    {
      id: "monthly",
      label: "Monthly Investment (₹)",
      type: "number",
      default: 5000
    },
    {
      id: "rate",
      label: "Expected Return Rate (% p.a)",
      type: "slider",
      min: 1,
      max: 30,
      default: 12
    },
    {
      id: "years",
      label: "Investment Period (Years)",
      type: "number",
      default: 10
    },
  ],
};

export const gstCalculatorConfig = {
  slug: "gst-calculator",
  title: "India GST Calculator",
  description: "Calculate GST amount with CGST, SGST, and IGST breakup for inclusive and exclusive prices.",
  icon: "🇮🇳",
  colorClass: "bg-indigo-600",
  options: [
    {
      id: "amount",
      label: "Initial Amount (₹)",
      type: "number",
      default: 10000
    },
    {
      id: "rate",
      label: "GST Rate (%)",
      type: "select",
      values: ["5", "12", "18", "28"],
      default: "18"
    },
    {
      id: "mode",
      label: "GST Mode",
      type: "select",
      values: ["Exclusive", "Inclusive"],
      default: "Exclusive"
    },
    {
      id: "type",
      label: "Tax Type",
      type: "select",
      values: ["CGST + SGST (Intra-state)", "IGST (Inter-state)"],
      default: "CGST + SGST (Intra-state)"
    },
  ],
};

export const loanCalculatorConfig = {
  slug: "loan-calculator",
  title: "Comprehensive Loan Calculator",
  description: "Detailed calculation of loan repayments, total interest burden, and amortization summary.",
  icon: "🏦",
  colorClass: "bg-blue-600",
  options: [
    {
      id: "amount",
      label: "Loan Principal Amount (₹)",
      type: "number",
      default: 500000
    },
    {
      id: "rate",
      label: "Annual Interest Rate (%)",
      type: "slider",
      min: 1,
      max: 25,
      default: 10.5
    },
    {
      id: "tenure",
      label: "Loan Duration (Years)",
      type: "number",
      default: 5
    },
  ],
};

export const roiCalculatorConfig = {
  slug: "roi-calculator",
  title: "ROI Calculator",
  description: "Calculate Return on Investment (ROI) and annualized growth rate for any investment.",
  icon: "📊",
  colorClass: "bg-violet-600",
  options: [
    {
      id: "investment",
      label: "Investment Amount (₹)",
      type: "number",
      default: 100000
    },
    {
      id: "returns",
      label: "Final Value / Returns (₹)",
      type: "number",
      default: 150000
    },
    {
      id: "years",
      label: "Duration (Years, optional)",
      type: "number",
      default: 1
    },
  ],
};

export const bmiCalculatorConfig = {
  slug: "bmi-calculator",
  title: "Body Mass Index (BMI) Calculator",
  description: "Quickly calculate your BMI and determine your WHO health category based on height and weight.",
  icon: "⚖️",
  colorClass: "bg-pink-600",
  options: [
    {
      id: "weight",
      label: "Weight (kg)",
      type: "number",
      default: 70
    },
    {
      id: "height",
      label: "Height (cm)",
      type: "number",
      default: 170
    },
  ],
};

export const currencyConverterConfig = {
  slug: "currency-converter",
  title: "World Currency Converter",
  description: "Convert between major world currencies with standard exchange rates. Fast and privacy-safe browser conversion.",
  icon: "💱",
  colorClass: "bg-teal-600",
  options: [
    {
      id: "amount",
      label: "Amount to Convert",
      type: "number",
      default: 100
    },
    {
      id: "from",
      label: "From Currency",
      type: "select",
      values: ["USD", "EUR", "GBP", "INR", "JPY", "CAD", "AUD"],
      default: "USD"
    },
    {
      id: "to",
      label: "To Currency",
      type: "select",
      values: ["USD", "EUR", "GBP", "INR", "JPY", "CAD", "AUD"],
      default: "INR"
    },
  ],
};
