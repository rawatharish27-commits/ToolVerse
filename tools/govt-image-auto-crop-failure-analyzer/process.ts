
export async function process(input: { aspectError: number }) {
  const failure = input.aspectError > 0.05;
  return {
    willFail: failure,
    errorMargin: `${(input.aspectError * 100).toFixed(1)}%`,
    recommendation: failure ? "Adjust crop to exactly 3.5x4.5cm" : "Crop within tolerance"
  };
}
