export const passwordStrengthConfig = {
  slug: "password-strength-checker",
  title: "Password Strength Auditor",
  description: "Check security entropy and password strength using deep heuristic analysis.",
  icon: "🔐",
  colorClass: "bg-indigo-600",
  options: []
};

export const hashGeneratorConfig = {
  slug: "hash-generator",
  title: "Pro Hash Generator",
  description: "Generate MD5, SHA-1, SHA-256, and SHA-512 hashes for text and strings locally.",
  icon: "🔒",
  colorClass: "bg-teal-600",
  options: [
    { id: "algorithm", type: "select", label: "Algorithm", values: ["SHA-256", "SHA-1", "MD5", "SHA-512"], default: "SHA-256" },
    { id: "uppercase", type: "toggle", label: "Uppercase Output", default: false }
  ]
};

export const hashIdentifierConfig = {
  slug: "hash-identifier",
  title: "Hash Type Identifier",
  description: "Analyze a hash string to identify its probable encryption algorithm based on patterns.",
  icon: "🔎",
  colorClass: "bg-slate-700",
  options: []
};

export const encryptorConfig = {
  slug: "security-encryptor",
  title: "AES-256 Text Encryptor",
  description: "Securely encrypt text using authenticated AES-GCM encryption with local key derivation.",
  icon: "🔑",
  colorClass: "bg-indigo-700",
  options: [
    { id: "iterations", type: "select", label: "PBKDF2 Iterations", values: ["100000", "200000", "600000"], default: "200000" }
  ]
};

export const decryptorConfig = {
  slug: "security-decryptor",
  title: "AES-256 Text Decryptor",
  description: "Recover and verify encrypted content with automated integrity checks.",
  icon: "🔓",
  colorClass: "bg-indigo-800",
  options: []
};