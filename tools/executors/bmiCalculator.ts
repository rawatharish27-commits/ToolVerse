export function bmiCalculator({
  height,
  weight,
  unit = "metric",
  precision = 2
}: {
  height: number | { feet: number; inches: number };
  weight: number;
  unit?: "metric" | "imperial";
  precision?: number;
}): {
  bmi: number;
  category: string;
  formula: string;
} {
  let heightMeters: number;
  let weightKg: number;

  if (unit === "metric") {
    if (typeof height !== "number") throw new Error("Invalid height format for metric unit");
    heightMeters = height / 100;
    weightKg = weight;
  } else {
    const h = height as { feet: number; inches: number };
    heightMeters = (h.feet * 12 + h.inches) * 0.0254;
    weightKg = weight * 0.453592;
  }

  if (heightMeters <= 0 || weightKg <= 0) {
    throw new Error("Invalid height or weight. Values must be greater than zero.");
  }

  const bmiValue = weightKg / (heightMeters * heightMeters);

  let category = "Normal";
  if (bmiValue < 18.5) category = "Underweight";
  else if (bmiValue < 25) category = "Normal";
  else if (bmiValue < 30) category = "Overweight";
  else category = "Obese";

  return {
    bmi: Number(bmiValue.toFixed(precision)),
    category,
    formula: "BMI = weight (kg) / height (m)²"
  };
}