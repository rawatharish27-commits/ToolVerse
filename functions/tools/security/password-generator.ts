
export default async function execute(input: any) {
  const length = Math.min(Math.max(input.length || 16, 8), 64);
  const charset = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*()_+-=";
  let password = "";

  const array = new Uint32Array(length);
  crypto.getRandomValues(array);

  for (let i = 0; i < length; i++) {
    password += charset[array[i] % charset.length];
  }

  // Calculate Entropy
  const entropy = Math.floor(Math.log2(charset.length) * length);

  return { 
    password, 
    entropy,
    strength: entropy > 80 ? "Critical-Strength" : "Standard",
    bits: `${entropy} bits`
  };
}
