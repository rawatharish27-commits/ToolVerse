
export function passwordGenerator(input: any) {
  const length = Math.min(Math.max(input.length || 16, 8), 64);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
  let pwd = "";

  const array = new Uint32Array(length);
  crypto.getRandomValues(array);

  for (let i = 0; i < length; i++) {
    pwd += chars[array[i] % chars.length];
  }

  return { password: pwd, entropy: Math.log2(chars.length ** length).toFixed(2) };
}
