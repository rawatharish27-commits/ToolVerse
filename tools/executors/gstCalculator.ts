export function gstCalculator({
  amount,
  gstRate,
  mode = "add",
  taxType = "cgst_sgst",
  precision = 2
}: {
  amount: number;
  gstRate: number;
  mode?: "add" | "remove";
  taxType?: "cgst_sgst" | "igst";
  precision?: number;
}): {
  baseAmount: number;
  gstAmount: number;
  cgst?: number;
  sgst?: number;
  igst?: number;
  finalAmount: number;
  formula: string;
} {
  if (amount <= 0 || gstRate < 0) {
    throw new Error("Invalid input values. Amount must be positive.");
  }

  let baseAmount: number;
  let gstAmount: number;

  if (mode === "add") {
    gstAmount = (amount * gstRate) / 100;
    baseAmount = amount;
  } else {
    baseAmount = amount / (1 + gstRate / 100);
    gstAmount = amount - baseAmount;
  }

  let cgst, sgst, igst;

  if (taxType === "cgst_sgst") {
    cgst = gstAmount / 2;
    sgst = gstAmount / 2;
  } else {
    igst = gstAmount;
  }

  const finalAmount = mode === "add" ? baseAmount + gstAmount : amount;

  return {
    baseAmount: Number(baseAmount.toFixed(precision)),
    gstAmount: Number(gstAmount.toFixed(precision)),
    cgst: cgst ? Number(cgst.toFixed(precision)) : undefined,
    sgst: sgst ? Number(sgst.toFixed(precision)) : undefined,
    igst: igst ? Number(igst.toFixed(precision)) : undefined,
    finalAmount: Number(finalAmount.toFixed(precision)),
    formula: mode === "add"
      ? "GST = Amount × Rate / 100"
      : "Base = Amount / (1 + Rate/100)"
  };
}