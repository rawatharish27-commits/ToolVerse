export function profitLossCalculator({
  costPrice,
  sellingPrice,
  targetPercent,
  mode = "normal",
  precision = 2
}: {
  costPrice: number;
  sellingPrice?: number;
  targetPercent?: number;
  mode?: "normal" | "reverse";
  precision?: number;
}): {
  type: "profit" | "loss" | "no-change";
  amount: number;
  percentage: number;
  requiredSellingPrice?: number;
  formula: string;
} {
  if (costPrice <= 0) {
    throw new Error("Cost price must be greater than zero");
  }

  if (mode === "reverse" && targetPercent !== undefined) {
    const requiredSP = costPrice + (costPrice * targetPercent) / 100;
    return {
      type: targetPercent >= 0 ? "profit" : "loss",
      amount: Math.abs((costPrice * targetPercent) / 100),
      percentage: Math.abs(Number(targetPercent.toFixed(precision))),
      requiredSellingPrice: Number(requiredSP.toFixed(precision)),
      formula: "SP = CP ± (CP × % / 100)"
    };
  }

  if (sellingPrice === undefined) {
    throw new Error("Selling price is required for normal mode");
  }

  const diff = sellingPrice - costPrice;
  let type: "profit" | "loss" | "no-change" = "no-change";

  if (diff > 0) type = "profit";
  else if (diff < 0) type = "loss";

  const percentage = (Math.abs(diff) / costPrice) * 100;

  return {
    type,
    amount: Number(Math.abs(diff).toFixed(precision)),
    percentage: Number(percentage.toFixed(precision)),
    formula: "(SP − CP) / CP × 100"
  };
}