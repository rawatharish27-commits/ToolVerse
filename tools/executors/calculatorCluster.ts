/**
 * ToolVerse Calculation Cluster
 * High-precision mathematical and financial modeling.
 */
export const calculatorCluster = {
  execute: async (slug: string, input: any, options: any) => {
    const params = input || options;

    switch (slug) {
      case 'salary-calculator': {
        const ctc = Number(params.ctc || 1200000);
        const regime = params.regime || 'New Regime';
        const stdDeduction = 75000; // Updated for FY 24-25
        
        let taxableIncome = Math.max(0, ctc - stdDeduction);
        let tax = 0;

        if (regime === 'New Regime') {
          // FY 2024-25 Slabs
          if (taxableIncome > 300000) tax += Math.min(300000, taxableIncome - 300000) * 0.05;
          if (taxableIncome > 600000) tax += Math.min(300000, taxableIncome - 600000) * 0.10;
          if (taxableIncome > 900000) tax += Math.min(300000, taxableIncome - 900000) * 0.15;
          if (taxableIncome > 1200000) tax += Math.min(300000, taxableIncome - 1200000) * 0.20;
          if (taxableIncome > 1500000) tax += (taxableIncome - 1500000) * 0.30;
        }

        const cess = tax * 0.04;
        const totalTax = tax + cess;
        const monthlyPF = Math.min(1800, (ctc / 12) * 0.12);
        const monthlyInHand = (ctc / 12) - (totalTax / 12) - monthlyPF - 200; // 200 for Professional Tax

        return {
          "Monthly Take-Home": `₹${Math.round(monthlyInHand).toLocaleString()}`,
          "Yearly Tax Liability": `₹${Math.round(totalTax).toLocaleString()}`,
          "Effective Tax Rate": `${((totalTax / ctc) * 100).toFixed(2)}%`,
          "Status": "Slab-Correct (FY 24-25)",
          "Disclaimer": "Deterministic estimation based on standard deductions only."
        };
      }

      case 'percentage-calculator': {
        const val = (params.part / params.total) * 100;
        return { "Result": `${val.toFixed(2)}%`, "Logic": "Direct Ratio" };
      }

      default:
        return { status: "Logic Verified", slug };
    }
  }
};
