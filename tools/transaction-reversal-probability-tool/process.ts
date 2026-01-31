
export async function process(input:{minutesSince:number}) {
  const prob = input.minutesSince < 5 ? 0.9 : input.minutesSince < 30 ? 0.5 : 0.1;
  return { probability: prob };
}
