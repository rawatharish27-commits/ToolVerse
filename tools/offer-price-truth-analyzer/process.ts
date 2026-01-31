
export async function process(input:{mrp:number, offer:number}) {
  return {
    discountPercent: ((input.mrp - input.offer) / input.mrp) * 100,
    valid: input.offer < input.mrp
  };
}
