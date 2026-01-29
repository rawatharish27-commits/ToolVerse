
import { LIMITS } from './limits';

export async function process(file: File) {
  const sizeKB = file.size / 1024;
  const findings = [];
  
  if (sizeKB > LIMITS.maxSizeKB) findings.push(`Size over limit: ${Math.round(sizeKB)}KB (Max 50KB)`);
  if (sizeKB < LIMITS.minSizeKB) findings.push(`Size under limit: ${Math.round(sizeKB)}KB (Min 20KB)`);
  if (!LIMITS.formats.includes(file.type)) findings.push(`Invalid format: ${file.type} (Expected JPEG)`);

  return {
    findings,
    passed: findings.length === 0,
    metrics: { size: Math.round(sizeKB) }
  };
}
