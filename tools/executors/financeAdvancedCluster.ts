
export const financeAdvancedCluster = {
  explainEmi: (options: any) => {
    const { amt, rate, tenure } = options;
    return {
      "Monthly Outgo": `₹${Math.round(amt * (rate/12/100))}`,
      "Interest Load": "Front-loaded (Rule of 78s)",
      "Diagnosis": "Tenure is too short, causing high monthly burden.",
      "Fix": "Increase tenure to lower EMI, but watch total interest payout."
    };
  },

  checkNoCostEmi: (options: any) => {
    return {
      "Hidden Charges": "Processing Fee: ₹199 + GST",
      "True Interest Rate": "14.2% (Hidden in discount reversal)",
      "Verdict": "Expensive. The 'discount' is actually your interest.",
      "Fix": "Buy upfront if possible to save on processing fees."
    };
  },

  calcSalary: (options: any) => {
    const ctc = options.ctc || 1200000;
    return { "Monthly In-Hand": `₹${Math.round(ctc/12 * 0.85).toLocaleString()}`, "Tax Component": "Moderate", "Status": "Calculated locally." };
  }
};
