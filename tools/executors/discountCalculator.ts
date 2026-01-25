export function discountCalculator({
  originalPrice,
  discountPercent,
  discountAmount,
  multipleDiscounts,
  reverseMode = false,
  precision = 2
}: {
  originalPrice: number;
  discountPercent?: number;
  discountAmount?: number;
  multipleDiscounts?: number[];
  reverseMode?: boolean;
  precision?: number;
}): {
  finalPrice: number;
  totalDiscount: number;
  effectiveDiscountPercent: number;
} {
  if (originalPrice <= 0) {
    throw new Error("Original price must be greater than zero");
  }

  let price = originalPrice;

  if (reverseMode && discountAmount !== undefined) {
    const effectiveDiscountPercent =
      ((originalPrice - discountAmount) / originalPrice) * 100;

    return {
      finalPrice: discountAmount,
      totalDiscount: originalPrice - discountAmount,
      effectiveDiscountPercent: Number(effectiveDiscountPercent.toFixed(precision))
    };
  }

  if (multipleDiscounts && multipleDiscounts.length > 0) {
    multipleDiscounts.forEach(d => {
      price -= (price * d) / 100;
    });
  } else if (discountPercent !== undefined) {
    price -= (originalPrice * discountPercent) / 100;
  } else if (discountAmount !== undefined) {
    price -= discountAmount;
  }

  const totalDiscount = originalPrice - price;
  const effectiveDiscountPercent = (totalDiscount / originalPrice) * 100;

  return {
    finalPrice: Number(price.toFixed(precision)),
    totalDiscount: Number(totalDiscount.toFixed(precision)),
    effectiveDiscountPercent: Number(effectiveDiscountPercent.toFixed(precision))
  };
}