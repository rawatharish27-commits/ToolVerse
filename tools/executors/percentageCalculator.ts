export function percentageCalculator({
  oldValue,
  newValue,
  mode = "auto",
  precision = 2
}: {
  oldValue: number;
  newValue: number;
  mode?: "auto" | "increase" | "decrease";
  precision?: number;
}): {
  percentage: number;
  changeType: "increase" | "decrease" | "no-change";
  difference: number;
  formula: string;
} {
  if (oldValue === 0) {
    throw new Error("Old value cannot be zero");
  }

  const difference = newValue - oldValue;
  let percentage = (difference / oldValue) * 100;

  let changeType: "increase" | "decrease" | "no-change" = "no-change";

  if (mode === "auto") {
    if (percentage > 0) changeType = "increase";
    else if (percentage < 0) changeType = "decrease";
  } else {
    changeType = mode as any;
    percentage = Math.abs(percentage);
  }

  return {
    percentage: Number(Math.abs(percentage).toFixed(precision)),
    changeType,
    difference,
    formula: `(${newValue} - ${oldValue}) / ${oldValue} × 100`
  };
}