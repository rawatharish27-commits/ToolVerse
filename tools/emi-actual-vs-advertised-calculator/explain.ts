
export function explain(output: any): string {
  return `The advertised ${output.flatRate}% Flat Rate is actually ${output.reducingRate}% on a Reducing Balance (the standard for banks like HDFC/SBI). You are paying ${output.multiplier}x more interest than the face value suggests. For every ₹100 you borrowed, you are paying back ₹${100 + output.burden} total.`;
}
