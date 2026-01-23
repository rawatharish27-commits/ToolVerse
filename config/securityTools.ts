export const passwordStrengthConfig = {
  slug: "password-strength-checker",
  title: "Password Strength & Risk Auditor",
  description: "Deep heuristic analysis of password complexity and resistance against automated attack models.",
  icon: "🔐",
  colorClass: "bg-indigo-600",
  options: [
    { id: "psLengthCheck", type: "select", label: "Length Audit", values: ["Check length", "Ignore length"], default: "Check length" },
    { id: "psCharset", type: "select", label: "Character Set Analysis", values: ["Lowercase only", "Mixed case", "Mixed + numbers", "Mixed + numbers + symbols"], default: "Mixed + numbers + symbols" },
    { id: "psPatternCheck", type: "select", label: "Pattern Detection", values: ["Detect patterns", "Ignore patterns"], default: "Detect patterns" },
    { id: "psDictionary", type: "select", label: "Dictionary Analysis", values: ["Detect common words", "Ignore dictionary"], default: "Detect common words" },
    { id: "psReuse", type: "select", label: "Cross-Service Reuse", values: ["Warn about reuse", "Ignore reuse"], default: "Warn about reuse" },
    { id: "psThreatModel", type: "select", label: "Threat Model", values: ["Casual attacker", "Skilled attacker", "Offline brute-force"], default: "Offline brute-force" },
    { id: "psOutput", type: "select", label: "Output Style", values: ["Readable report", "Scorecard"], default: "Readable report" },
    { id: "psLanguage", type: "select", label: "Output Language", values: ["English", "Hinglish"], default: "English" }
  ],
};

export const hashGeneratorConfig = {
  slug: "security-hash-generator",
  title: "AI Hash Generator & Integrity Auditor",
  description: "Generate cryptographic digests and analyze data integrity with expert context.",
  icon: "🔒",
  colorClass: "bg-teal-600",
  options: [
    { id: "hgAlgorithm", type: "select", label: "Hash Algorithm", values: ["MD5", "SHA-1", "SHA-256", "SHA-384", "SHA-512"], default: "SHA-256" },
    { id: "hgEncoding", type: "select", label: "Input Encoding", values: ["UTF-8", "ASCII"], default: "UTF-8" },
    { id: "hgSalt", type: "select", label: "Salt Usage", values: ["No salt", "Auto-generate salt"], default: "No salt" },
    { id: "hgSaltLength", type: "select", label: "Salt Length", values: ["8 bytes", "16 bytes"], default: "8 bytes" },
    { id: "hgUppercase", type: "select", label: "Hex Case", values: ["Lowercase hex", "Uppercase hex"], default: "Lowercase hex" },
    { id: "hgUseCase", type: "select", label: "Analysis Context", values: ["Integrity check", "Password hashing (demo)", "File verification"], default: "Integrity check" },
    { id: "hgOutput", type: "select", label: "Report Depth", values: ["Hash only", "Hash + explanation"], default: "Hash + explanation" },
    { id: "hgLanguage", type: "select", label: "Output Language", values: ["English", "Hinglish"], default: "English" }
  ],
};

export const encryptorConfig = {
  slug: "security-encryptor",
  title: "AI Text Encryptor (AES-256)",
  description: "High-security authenticated encryption using industry-standard AES-GCM and PBKDF2.",
  icon: "🔑",
  colorClass: "bg-indigo-700",
  options: [
    { id: "enAlgorithm", type: "select", label: "Algorithm Mode", values: ["AES-GCM (Recommended)", "AES-CBC (Legacy)"], default: "AES-GCM (Recommended)" },
    { id: "enIterations", type: "select", label: "PBKDF2 Iterations", values: ["100,000", "200,000", "600,000"], default: "200,000" },
    { id: "enOutputFormat", type: "select", label: "Output Format", values: ["Base64 String", "Hex String", "JSON Payload"], default: "Base64 String" },
    { id: "enUseCase", type: "select", label: "Security Intent", values: ["Personal notes", "Secure message transfer", "Offline storage"], default: "Personal notes" },
    { id: "enRiskCheck", type: "select", label: "Key Audit", values: ["Analyze key strength", "Skip audit"], default: "Analyze key strength" },
    { id: "enOutput", type: "select", label: "Report Detail", values: ["Detailed Report", "Minimalist"], default: "Detailed Report" },
    { id: "enLanguage", type: "select", label: "Output Language", values: ["English", "Hinglish"], default: "English" }
  ],
};

export const decryptorConfig = {
  slug: "security-decryptor",
  title: "AI Text Decryptor (AES-256)",
  description: "Recover and verify encrypted content with automated integrity checks and security insights.",
  icon: "🔓",
  colorClass: "bg-indigo-800",
  options: [
    { id: "deTamperCheck", type: "select", label: "Integrity Audit", values: ["High (Verify Tag)", "Standard"], default: "High (Verify Tag)" },
    { id: "deOutput", type: "select", label: "Report Depth", values: ["Security Insights", "Simple Result"], default: "Security Insights" },
    { id: "deLanguage", type: "select", label: "Output Language", values: ["English", "Hinglish"], default: "English" }
  ],
};