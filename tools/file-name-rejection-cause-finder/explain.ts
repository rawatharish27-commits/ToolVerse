
export function explain(output: any): string {
  if (output.safe) return "Your filename adheres to all standard operating procedures for web uploads.";
  return `Identified ${output.issues.length} structural risks. Portals use strict regex to prevent shell injection and path traversal. Recommendation: Rename to 'photo_user.jpg' (Alphanumeric only).`;
}
