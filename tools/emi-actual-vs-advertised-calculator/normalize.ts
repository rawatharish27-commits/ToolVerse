
export function normalize(input: any): any {
  return {
    amount: Number(input.amount),
    rate: Number(input.rate),
    months: Math.floor(Number(input.months))
  };
}
